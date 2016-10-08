#/usr/bin/env python
# -*-code: utf-8-*-

import os.path
import json

import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
import tornado.options

import bson
from pymongo import MongoClient

class Application(tornado.web.Application):
    def __init__(self):
        self.collection = self.get_collection()
       
        handlers = [
            (r'/', IndexHandler),
            (r'/todo/list', GetTodoListHandler),
            (r'/todo/title', ModifyTodoTitleHandler)
        ]
        settings = {
            'debug': True,
            'static_path': os.path.join(os.path.dirname(__file__),
                                        'static'),
            'template_path': os.path.join(os.path.dirname(__file__),
                                          'html')
        }

        tornado.web.Application.__init__(self, handlers, **settings)

    def get_collection(self):
        clinet = MongoClient('mongodb://localhost:27017/')
        db = clinet.todos
        collection = db.todos

        return collection


class JsonMixin(object):
    context = {
        'status': 'success',
        'message': '',
    }

    def get_context(self, context=None):
        self.context.update({
            'data': context
        })
        return json.dumps(self.context)
     
    def get_error_context(self, context=None):
        data = {
            'status': 'error'
        }

        if context is not None:
            if isinstance(context, dict):
                data.update(data)
            else:
                data.update({
                    'message': context
                })

        self.context.update(data)
        print self.context
        return json.dumps(self.context)


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')


class GetTodoListHandler(tornado.web.RequestHandler, JsonMixin):
    def get(self):
        data = []
        todos = self.application.collection.find()
        for todo in todos:
            data.append({
                'id': bson.ObjectId(todo['_id']).__str__(),
                'title': todo['title'],
                'completed': todo['completed']
            })

        self.write(self.get_context(data))


class ModifyTodoTitleHandler(tornado.web.RequestHandler, JsonMixin):
    def post(self):
        context = {}
        todo_id = self.get_argument('id')
        object_id = None
        
        try:
            object_id = bson.ObjectId(todo_id)
        except bson.errors.InvalidId:
            context = self.get_error_context('invalid id')
            self.write(context)
        else:
            todo = self.application.collection.find_one({
                '_id': bson.ObjectId(todo_id)
            })
            context = self.get_context({
                'title': todo['title'],
                'completed': todo['completed']
            })
            self.write(context)

if __name__ == '__main__':
    tornado.options.parse_command_line()

    app = Application()
    server = tornado.httpserver.HTTPServer(app)

    server.listen(8000)
    tornado.ioloop.IOLoop.instance().start()