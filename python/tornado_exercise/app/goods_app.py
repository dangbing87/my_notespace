#!/usr/bin/env python
# -*-coding:utf-8-*-

import os.path

import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
import tornado.options

import tornado.httpclient

from uuid import uuid4 as uuid
import json


class Cart(object):
    clients = []

    def __init__(self):
        self.__total = 100

    def register(self, client):
        self.clients.append(client)

    def unregister(self, current_clients):
        for client in self.clients:
            if client.session == current_clients.session:
                self.clients.remove(client)

    @property
    def total(self):
        return self.__total

    def add_order(self, customer_session):
        if not self.total == 0:
            self.__total -= 1

        self.notify(customer_session)

    def cancel_order(self, customer_session):
        if not self.total == 100:
            self.__total += 1

        self.notify(customer_session)

    def notify(self, customer_session):
        for client in self.clients:
            client.callback(customer_session, self.total)


class Index(tornado.web.RequestHandler):
    def get(self):
        context = {
            'session': uuid(),
            'total': self.application.cart.total
        }
        self.render('cart.html', **context)

    def post(self):
        action = self.get_argument('action')
        self.session = self.get_argument('session')

        if action == 'add':
            self.add_order()
        elif action == 'remove':
            self.cancel_order()
        else:
            self.set_status(400)

    def add_order(self):
        self.application.cart.add_order(self.session)
        self.write('success')

    def cancel_order(self):
        self.application.cart.cancel_order(self.session)
        self.write('success')


class CartStatusHandler(tornado.websocket.WebSocketHandler):
    session = ''

    def open(self):
        pass

    def on_close(self):
        self.application.cart.unregister(self)

    def on_message(self, message):
        data = json.loads(message)

        self.session = data.get('session')

        if data.get('status') == 'connected':
            if not data.get('session') == '':
                self.application.cart.register(self)

    def callback(self, customer, count):
        context = {
            'customer': customer,
            'count': count
        }
        self.write_message(json.dumps(context))


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
