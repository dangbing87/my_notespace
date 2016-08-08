#!/usr/bin/env ptpython
# -*-coding:utf8-*-

import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import tornado.gen
import tornado.websocket

from tornado.options import define, options

import time
import datetime

define("port", default=8000, help="run on the given port", type=int)


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        #  self.render('ex1_index.html')
        date = datetime.datetime.now()
        date = date.strftime('%c')
        self.write(date)


class AsynchronousHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):

        yield tornado.gen.Task(
            tornado.ioloop.IOLoop.instance().add_timeout, time.time() + 30)

        date = datetime.datetime.now()
        date = date.strftime('%c')
        self.write(date)


class WebSocketIndexHandler(tornado.websocket.WebSocketHandler):
    def get(self):
        self.render('ex1_websocket.html')


class WebSocketHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        print 'connected'

    def on_message(self, message):
        self.write_message(message)

if __name__ == '__main__':
    tornado.options.parse_command_line()

    app = tornado.web.Application(
        handlers=[
            (r'/', IndexHandler),
            (r'/asynchronous', AsynchronousHandler),
            (r'/websocket', WebSocketIndexHandler),
            (r'/websocket/socket', WebSocketHandler)
        ],
        debug=True,
        template_path=os.path.join(os.path.dirname(__file__), 'templates'),
        static_path=os.path.join(os.path.dirname(__file__), 'static')
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
