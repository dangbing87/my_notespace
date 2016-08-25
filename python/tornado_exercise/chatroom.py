#!/usr/bin/env python
# -*-coding:utf-8-*-

import os.path

import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
import tornado.options

from uuid import uuid4 as uuid
import json


class JsonMixin(object):
    __context = {
        'status': 'success',
        'message': ''
    }

    def set_error_message(self, message=None):

        if message is not None and not isinstance(message, dict):
            self.__context.update({ 'message': message })
        self.__context.update({ 'status': 'error'})

        return self.__context

    def set_context(self, context=None):
        if context is None:
            context = {}

        if not isinstance(context, dict):
            context.update({ 'data': context })
        self.__context.update(context)

        return self.__context


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r'/', IndexHandler)
        ]
        settings = {
            'debug': True,
            'static_path': os.path.join(os.path.dirname(__file__),
                                        'static'),
            'template_path': os.path.join(os.path.dirname(__file__),
                                          'templates')
        }

        tornado.web.Application.__init__(self, handlers, **settings)



class IndexHandler(tornado.web.RequestHandler, JsonMixin):
    def get(self):
        context = { 'session': uuid() }
        self.render('chatroom.html', **context)

    def post(self):
        data = self.request.arguments

        print data

        #  context = {}

        #  if not session.strip() == '' and not content.strip() == '':
            #  context = self.set_context()
        self.write('')


class ChatHandler(tornado.websocket.WebSocketHandler):
    def on_open(self):
        print 'a new client'

    def on_message(self, message):
        pass

    def on_close(self):
        print 'a client closed'


if __name__ == '__main__':
    tornado.options.parse_command_line()

    app = Application()
    server = tornado.httpserver.HTTPServer(app)
    server.listen(8000)
    tornado.ioloop.IOLoop.instance().start()

