#!/usr/bin/env python
# -*-coding:utf-8-*-

from flask import Flask
from flask.ext.pymongo import PyMongo

from flask import request
from flask import jsonify
from flask import render_template

from flask.ext.pymongo import ObjectId

from gevent import monkey
from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler
from flask_sockets import Sockets

import time
import json

monkey.patch_all()
app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'todo'

mongo = PyMongo(app)
sockets = Sockets(app)

app.config.update(
    DEBUG=True
)


def get_todo_list(**kwargs):
    todo_list = mongo.db.todo_list.find(kwargs)
    count = todo_list.count()
    data = []

    for todo in todo_list:
        data.append({
            'id': str(todo.get('_id', '')),
            'matter': todo.get('matter', ''),
            'completed': todo.get('completed', '')
        })
    return data, count


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/todo/all/', methods=['GET'])
def get_all_list():
    if request.method == 'GET':
        todo_list, count = get_todo_list()
        return jsonify(data=todo_list,
                       count=count)


@app.route('/todo/completed/', methods=['GET'])
def get_completed_list():
    if request.method == 'GET':
        todo_list, count = get_todo_list(completed=True)
        return jsonify(data=todo_list,
                       count=count)


@app.route('/todo/state/modify/', methods=['PUT'])
def modify_state():
    if request.method == 'PUT':
        todo_id = request.form.get('id', '')
        todo_status = int(request.form.get('isCompleted', 0))

        todo_status = bool(todo_status)
        todo_objectid = ObjectId(todo_id)

        mongo.db.todo_list.update({'_id': todo_objectid},
                                  {'$set': {'completed': todo_status}})
        return jsonify(status='success')


@app.route('/todo/add/', methods=['POST'])
def add_todo():
    if request.method == 'POST':
        matter = request.form.get('matter', '')
        completed = False

        mongo.db.todo_list.insert({
            'matter': matter,
            'completed': completed
        })

        todo_list, count = get_todo_list()
        return jsonify(data=todo_list,
                       count=count)


@app.route('/todo/delete/', methods=['DELETE'])
def delete_todo():
    if request.method == 'DELETE':
        todo_id = request.form.get('id', '')
        todo_objectid = ObjectId(todo_id)
        mongo.db.todo_list.remove({'_id': todo_objectid})

        todo_list, count = get_todo_list()
        return jsonify(data=todo_list,
                       count=count)


@app.route('/todo/matter/modify/', methods=['PUT'])
def modify_matter():
    if request.method == 'PUT':
        todo_id = request.form.get('id', '')
        matter = request.form.get('matter', '')
        todo_objectid = ObjectId(todo_id)

        mongo.db.todo_list.update({'_id': todo_objectid},
                                  {'$set': {'matter': matter}})

        todo_list, count = get_todo_list()
        return jsonify(data=todo_list,
                       count=count)


@app.route('/asyn/1/', methods=['GET'])
def test_asyn_one():
    if request.method == 'GET':
        time.sleep(10)
        return 'hello asyn'


@app.route('/test/', methods=['GET'])
def test():
    return 'hello test'


@app.route('/test/websocket/page/')
def test_websocket_page():
    return render_template('test_websocket.html')


@sockets.route('/test/websocket/')
def test_websocket(ws):
    data = None

    while not ws.closed:
        todo_list, count = get_todo_list()

        if not data == todo_list:
            data = todo_list
            send_data = {
                'data': data,
                'count': count
            }

            ws.send(json.dumps(send_data))

if __name__ == "__main__":
    # app.run()
    http_server = WSGIServer(('', 5000), app, handler_class=WebSocketHandler)
    http_server.serve_forever()
