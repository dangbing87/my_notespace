#/usr/bin/env python
#coding:utf-8

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


class BaseHandler(tornado.web.RequestHandler):
    @property
    def collection(self):
        clinet = MongoClient('mongodb://localhost:27017/')
        db = clinet.todos
        collection = db.todos

        return collection

    def get_todo_by_id(self, todo_id):
        errors = {
            'invalidId': u'id错误'
        }

        if not isinstance(todo_id, bson.ObjectId):
            try:
                todo_id = bson.ObjectId(todo_id)
            except bson.errors.InvalidId:
                return  errors.get('invalidId', None)
            
        return self.collection.find_one({'_id': todo_id})


class JsonHandler(BaseHandler):

    __response_context = {
        'status': 'success',
        'message': '',
    }

    def get_request_params(self):
        return json.loads(self.request.body)
    
    def success_response(self, context=None):
        context = self.get_response_context(context)
        self.ajax_response(context)

    def error_response(self, message, context=None):
        context = self.get_response_context(context)

        context.update({
            'status': 'error',
            'meesage': message,
        })
        self.ajax_response(context)
        
    def get_response_context(self, context=None):
        if context is None:
            context = {}

        if not isinstance(context, dict):
            context = {
                'data': context
            }

        return context

    def ajax_response(self, context=None):
        if isinstance(context, dict):
            self.__response_context.update(context)
        elif context is not None:
            self.__response_context.update({
                'data': context
            })

        self.write(json.dumps(self.__response_context))


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')


class GetTodoListHandler(BaseHandler, JsonMixin):
    def get(self):
        data = []
        todos = self.collection.find()
        for todo in todos:
            data.append({
                'id': bson.ObjectId(todo['_id']).__str__(),
                'title': todo['title'],
                'completed': todo['completed']
            })

        self.write(self.get_context(data))


class ModifyTodoTitleHandler(BaseHandler, JsonMixin):
    def post(self):
        context = {}
        
        request_params = json.loads(self.request.body)
        todo_id = request_params.get('id', '')
        title = request_params.get('title')

        object_id = None
        
        try:
            object_id = bson.ObjectId(todo_id)
        except bson.errors.InvalidId:
            context = self.get_error_context('invalid id')
            self.write(context)
        else:
            self.modify_title(object_id, title)
            self.write(self.get_context())
            
    def modify_title(self, object_id, title): 
        todo = self.get_todo_by_id(object_id)
        query = {'_id': object_id}

        if todo is not None:
            todo.update({
                'title': title if title is not None else todo['title']
            })
        self.collection.update(query, todo)


if __name__ == '__main__':
    tornado.options.parse_command_line()

    app = Application()
    server = tornado.httpserver.HTTPServer(app)

    server.listen(8000)
    tornado.ioloop.IOLoop.instance().start()
