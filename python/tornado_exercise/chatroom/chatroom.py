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
        context = self.__context.copy()

        if message is not None and not isinstance(message, dict):
            context.update({'message': message})
        context.update({'status': 'error'})

        return context

    def set_context(self, context=None):
        if context is None:
            context = {}

        if not isinstance(context, dict):
            context.update({'data': context})
        self.__context.update(context)

        return self.__context


class Application(tornado.web.Application):
    def __init__(self):
        self.chat_room = ChatRoom()

        handlers = [
            (r'/', IndexHandler),
            (r'/chat_room', ChatHandler)
        ]
        settings = {
            'debug': True,
            'static_path': os.path.join(os.path.dirname(__file__),
                                        'static'),
            'template_path': os.path.join(os.path.dirname(__file__),
                                          'templates')
        }

        tornado.web.Application.__init__(self, handlers, **settings)


class NotifyMixin(object):
    notify_code = {
        'message_list': 0,
        'online_session_list': 1
    }


class ChatRoom(NotifyMixin):
    clients = []

    def register(self, current_client):
        self.clients.append(current_client)
        self.notify_online_list()

    def unregister(self, current_client):
        for client in self.clients:
            if client.session == current_client.session:
                self.clients.remove(current_client)

    def notify(self, message):
        for client in self.clients:
            client.send(message)

    def notify_online_list(self):
        context = {
            'code': self.notify_code.get('online_session_list'),
            'online_list': []
        }
        online_session_list = []

        for client in self.clients:
            online_session_list.append({
                'session': client.session,
                'username': client.username,
            })

        context.update({
            'online_list': online_session_list
        })

        self.notify(context)


class IndexHandler(tornado.web.RequestHandler, JsonMixin, NotifyMixin):
    def get(self):
        context = {'session': uuid()}
        self.render('chatroom.html', **context)

    def post(self):
        context = {}

        data = self.request.arguments
        is_validate = self.validator(data)

        if is_validate:
            context = self.set_context()
            self.application.chat_room.notify({
                'code': self.notify_code.get('message_list'),
                'content': data.get('content')[0],
                'session': data.get('session')[0],
                'username': data.get('username')[0],
            })
        else:
            context = self.set_error_message(u'数据不合法')
        self.write(context)

    def validator(self, data):
        session = data.get('session')
        content = data.get('content')

        session = session is not None and session[0] or ''
        content = content is not None and content[0] or ''

        return not session.strip() == '' and not content.strip() == ''


class ChatHandler(tornado.websocket.WebSocketHandler):
    session = ''
    username = ''

    def on_open(self):
        pass

    def on_close(self):
        self.application.chat_room.unregister(self)

    def on_message(self, message):
        message = json.loads(message)

        if message.get('status') == 'register':
            self.register(message)

    def register(self, data):
        if data.get('username') is None              \
                or data.get('username').strip() == '':
            self.on_close()
            return
        elif data.get('session') is None or data.get('session').strip() == '':
            self.on_close()
            return

        self.session = data.get('session')
        self.username = data.get('username')

        self.application.chat_room.register(self)

    def send(self, message):
        self.write_message(json.dumps(message))


if __name__ == '__main__':
    tornado.options.parse_command_line()

    app = Application()
    server = tornado.httpserver.HTTPServer(app)

    server.listen(8000)
    tornado.ioloop.IOLoop.instance().start()
