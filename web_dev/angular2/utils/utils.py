#coding:utf-8

import tornado.web
from pymongo import MongoClient
import json


class BaseHandler(tornado.web.RequestHandler):
    @property
    def collection(self):
        clinet = MongoClient('mongodb://localhost:27017/')
        db = clinet.todos
        collection = db.todos

        return collection


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
        return self.write(json.dumps(context))
