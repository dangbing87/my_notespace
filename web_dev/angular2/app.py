#/usr/bin/env python
#coding:utf-8

import os.path

import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
import tornado.options

import bson
from pymongo import MongoClient

from utils.utils import JsonHandler
from forms.forms import ModifyTitleForm


class Application(tornado.web.Application):
    """
    Over tornado.web.Application
    """
    def __init__(self):
        handlers = [
            (r'/', IndexHandler),
            (r'/todo/list', GetTodoListHandler),
            (r'/todo/title', TodoTitleHandler),
        ]
        settings = {
            'debug': True,
            'static_path': os.path.join(os.path.dirname(__file__),
                                        'static'),
            'template_path': os.path.join(os.path.dirname(__file__),
                                          'html')
        }

        tornado.web.Application.__init__(self, handlers, **settings)


class IndexHandler(tornado.web.RequestHandler):
    """
    Index handler
    """
    def get(self):
        self.render('index.html')


class GetTodoListHandler(JsonHandler):
    """
    Get todo list handler
    """
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

        return self.ajax_response(context)


class TodoTitleHandler(JsonHandler):
    """
    Modify todo title handler
    """

    def put(self):
        """
        update todo title
        """
        modify_result = {}

        request_params = self.get_request_params()
        form = ModifyTitleForm(**request_params)
        object_id = None

        if not form.validate():
            return self.error_response(message=form.errors)

        try:
            object_id = bson.ObjectId(form.data['todo_id'])
        except bson.errors.InvalidId:
            return self.error_response('invalid id')
        else:
            modify_result = self.modify_title(object_id, form.data['title'])

            if not modify_result['status']:
                return self.error_response('1111')
            return self.success_response()

    def modify_title(self, object_id, title):
        """
        @param object_id {ObjectId}
        @param title {string}
        @return result {status: bool, message: string}
        """
        result = {
            'status': True,
            'message': ''
        }

        filter_query = {'_id': object_id}
        update_query = {'title': title}
        todo = self.collection.find_one(filter_query)

        if todo is not None:
            self.collection.update_one(filter_query, {
                '$set': update_query
            })
        else:
            result.update({
                'status': False,
                'message': u'todo does not exist'
            })
        return result


if __name__ == '__main__':
    tornado.options.parse_command_line()

    app = Application()
    server = tornado.httpserver.HTTPServer(app)

    server.listen(8000)
    tornado.ioloop.IOLoop.instance().start()
