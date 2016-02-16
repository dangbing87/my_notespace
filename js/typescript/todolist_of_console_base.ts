enum Status {
    done,
    doing,
    dont,
};


interface TodoModel {
    id: number;
    item: string;
    status: Status;
}


interface TodoList {
    todoList: Array<TodoModel>;

    getTodo(id: number): TodoModel;
    addTodo(todo: TodoModel): void;
    changeStatus(id: number, status: Status): void;
    deleteItem(id: number): void;
    display(): void;
}


class TodoCtrl implements TodoList {
    todoList: Array<TodoModel>;

    constructor() {
        this.todoList = [];
    }

    getTodo(id: number): TodoModel {
        var todoInfo: TodoModel;
        this.todoList.forEach(todo=> {
            if (todo.id == id) {
                todoInfo = todo;
                return;
            }
        });

        return todoInfo;
    }

    addTodo(todo: TodoModel): void {
        this.todoList.push(todo);
    }

    changeStatus(id: number, status: Status): void {
        var todoItem = this.getTodo(id);
        todoItem.status = status;
    }

    deleteItem(id: number): void {
        var newTodoList: Array<TodoModel> = [];
        this.todoList.forEach(todo=> {
            if (todo.id != id) {
                newTodoList.push(todo);
            }
        });
    }

    display(): void {
        this.todoList.forEach(todo=> {
            var todoInfo = `id: ${todo.id}  item: ${todo.item}   status: ${todo.status}`;
            console.log(todoInfo);
        });
    }
}


function setTodoList(todoObject: TodoCtrl): void {
    var todo: TodoModel;

    for(var i=0; i<=5; i++) {
        todo = {
            id: i,
            item: `todo ${i + 1}`,
            status: Status.dont,
        };
        todoObject.addTodo(todo);
    }
}

var todoList = new TodoCtrl();
setTodoList(todoList);

todoList.display();

todoList.deleteItem(1);
todoList.display();
