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
            (r'/todo/title', ModifyTodoTitleHandler),
        ]
        settings = {
            'debug': True,
            'static_path': os.path.join(os.path.dirname(__file__),
                                        'static'),
            'template_path': os.path.join(os.path.dirname(__file__),
                                          'html')
        }

        tornado.web.Application.__init__(self, handlers, **settings)


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

    status = 'success'
    message = ''

    def get_request_params(self):
        return json.loads(self.request.body)
    
    def success_response(self, context=None):
        context = self.get_response_context(context)
        self.ajax_response(context)

    def error_response(self, message=None, context=None):
        context = self.get_response_context(context)

        self.status = 'error'
        self.message = message if message is not None else ''
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
        context = self.get_response_context(context)
        context.update({
            'status': self.status,
            'message': self.message
        })
        self.write(json.dumps(context))


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')


class GetTodoListHandler(JsonHandler):
    def get(self):
        context = {}
        data = []

        todos = self.collection.find()

        for todo in todos:
            data.append({
                'id': bson.ObjectId(todo['_id']).__str__(),
                'title': todo['title'],
                'completed': todo['completed']
            })

        context.update({
            'data': data
        })

        self.ajax_response(context)

class ModifyTodoTitleHandler(JsonHandler):
    def post(self):
        request_params = self.get_request_params()
        todo_id = request_params.get('id', '')
        title = request_params.get('title')

        object_id = None
        
        try:
            object_id = bson.ObjectId(todo_id)
        except bson.errors.InvalidId:
            self.error_response('invalid id')
        else:
            self.modify_title(object_id, title)
            self.success_response()
            
    def modify_title(self, object_id, title): 
        filter_query = {'_id': object_id}
        update_query = { 'title': title }

        self.collection.update_one(filter_query, {
            '$set': update_query
        })

if __name__ == '__main__':
    tornado.options.parse_command_line()

    app = Application()
    server = tornado.httpserver.HTTPServer(app)

    server.listen(8000)
    tornado.ioloop.IOLoop.instance().start()
