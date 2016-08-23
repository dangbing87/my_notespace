#!/usr/bin/env python
# -*-coding:utf-8-*-

import os.path

import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
import tornado.options


class Cart(object):
    callbacks = []

    def __init__(self):
        self.__total = 100

    def register(self, callback):
        self.callbacks.append(callback)

    def unregister(self, callback):
        self.callbacks.remove(callback)

    @property
    def total(self):
        return self.__total

    def add_order(self):
        if not self.total == 0:
            self.__total -= 1

        self.notify()

    def cancel_order(self):
        if not self.total == 100:
            self.__total += 1

        self.notify()

    def notify(self):
        for callback in self.callbacks:
            callback(self.__total)


class Index(tornado.web.RequestHandler):
    def get(self):
        context = {
            'total': self.application.cart.total
        }
        self.render('cart.html', **context)

    def post(self):
        action = self.get_argument('action')

        if action == 'add':
            self.add_order()
        elif action == 'remove':
            self.cancel_order()
        else:
            self.set_status(400)

    def add_order(self):
        self.application.cart.add_order()
        self.write('success')

    def cancel_order(self):
        self.application.cart.cancel_order()
        self.write('success')


class CartStatusHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        self.application.cart.register(self.callback)

    def on_close(self):
        self.application.cart.unregister(self.callback)

    def on_message(self, message):
        pass

    def callback(self, count):
        self.write_message('{"count" :%d}' %count)


class Application(tornado.web.Application):
    def __init__(self):

        self.cart = Cart()

        handlers = [
            (r'/', Index),
            (r'/cart/detail', CartStatusHandler)
        ]

        settings = {
            'debug': True,
            'template_path': os.path.join(os.path.dirname(__file__),
                                          'templates'),
            'static_path': os.path.join(os.path.dirname(__file__),
                                        'static')
        }

        tornado.web.Application.__init__(self, handlers, **settings)

if __name__ == '__main__':
    tornado.options.parse_command_line()

    app = Application()
    server = tornado.httpserver.HTTPServer(app)
    server.listen(8000)
    tornado.ioloop.IOLoop.instance().start()
