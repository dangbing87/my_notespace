#!/usr/bin/env ptpython
# -*-coding:utf8-*-

import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import tornado.gen

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

if __name__ == '__main__':
    tornado.options.parse_command_line()

    app = tornado.web.Application(
        handlers=[
            (r'/', IndexHandler),
            (r'/asynchronous', AsynchronousHandler)
        ],
        debug=True,
        template_path=os.path.join(os.path.dirname(__file__), "templates")
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
