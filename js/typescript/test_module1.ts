///<reference path="module_ex.d.ts"/>
import todo = require("./module_ex");

class TodoCtrl implements todo.TodoInterface {

    public todoList: Array<todo.TodoModel> = [];

    getTodo(id: number): todo.TodoModel {
        var todoInfo: todo.TodoModel;
        this.todoList.forEach(todoItem => {
            if (todoItem.id == id) {
                todoInfo = todoItem;
                return;
            }
        });

        return todoInfo;
    }

    addTodo(todo: todo.TodoModel): void {
        this.todoList.push(todo);
    }

    changeStatus(id: number, status: todo.TodoStatus): void {
        var todoItem = this.getTodo(id);
        todoItem.itemStatus = status;
    }

    deleteItem(id: number): void {
        var newTodoList: Array<todo.TodoModel> = [];

        this.todoList.forEach(todo=> {
            if (todo.id != id) {
                newTodoList.push(todo);
            }
        });
    }

    display(): void {
        this.todoList.forEach(todoItem => {
            var todoInfo = `id: ${todoItem.id}  item: ${todoItem.item}   status: ${todoItem.itemStatus}`;
            console.log(todoInfo);
        });
    }
}
