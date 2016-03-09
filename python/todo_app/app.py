#!/usr/bin/env python
# -*-coding:utf-8-*-

from flask import Flask
from flask.ext.pymongo import PyMongo

from flask import request
from flask import jsonify
from flask import render_template

from flask.ext.pymongo import ObjectId

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'todo'
mongo = PyMongo(app)

app.config.update(
    DEBUG=True
)


def get_todo_list():
    todo_list = mongo.db.todo_list.find()
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
        todo_list = mongo.db.todo_list.find({'completed': True})

        todo_list, count = get_todo_list()
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

if __name__ == "__main__":
    app.run()
