///<reference path="typings/jquery/jquery"/>
///<reference path="typings/react/react-global"/>

interface TodoModel {
    id: number;
    thing: string;
    isDone: boolean;
}

interface TodoListProps {
    data: Array<TodoModel>;
    handlerRefreshState?: any;
}

interface TodoListBoxProps {
    data: Array<TodoModel>;
}

interface TodoBoxProps {
    todo: TodoModel;
    handlerRefreshState?: any;

}

interface TodoFormProps {
    id: number;
    handlerAddTodo? : any;
}

interface TodoListState {
    data: Array<TodoModel>;
}


class TodoBox extends React.Component<TodoBoxProps, any> {
    handlerTodoState(e) {
        this.props.handlerRefreshState(e);
    }
}


class FinishTodoBox extends TodoBox {
    render() {
        var todo:TodoModel = this.props.todo;

        return (
            <li>
                <input type="checkbox"
                name={todo.id.toString()}
                checked={todo.isDone}
                onChange={this.handlerTodoState.bind(this)}
                />
                <del>{todo.thing}</del>
            </li>
        );
    }
}


class UnFinishTodoBox extends TodoBox {
    render() {
        var todo:TodoModel = this.props.todo;

        return (
            <li>
                <input type="checkbox"
                name={todo.id.toString()}
                checked={todo.isDone}
                onChange={this.handlerTodoState.bind(this)}
                />
                {todo.thing}
            </li>
        );
    }
}


class TodoList extends React.Component<TodoListProps, any> {
    handlerTodoState(e) {
        var todoId: number = e.target.name,
            todoStatus: boolean = e.target.checked;

        this.props.handlerRefreshState(todoId, todoStatus);
    }

    render() {
        var todoNodes: Array<any> = this.props.data.map((todo) => {
            if (todo.isDone) {
                return (
                    <FinishTodoBox todo={todo}
                    handlerRefreshState={this.handlerTodoState.bind(this)}
                    />
                );
            } else {
                return (
                    <UnFinishTodoBox todo={todo}
                    handlerRefreshState={this.handlerTodoState.bind(this)}
                    />
                );
            }
        });

        return (
            <div className="todo-list">
                <ul>
                    {todoNodes}
                </ul>
            </div>
        );
    }
}


class TodoForm extends React.Component<TodoFormProps, any> {
    hanlderAddTodo(e) {
        e.preventDefault();

        var id: number = this.props.id,
            todo: string = this.refs.todoInput.value;

        this.props.handlerAddTodo(id, todo);
    }

    render() {
        return (
            <div>
                <form className="todo-form" onSubmit={this.hanlderAddTodo.bind(this)}>
                    <input type="hidden" name="id" value={this.props.id.toString()} />
                    <input type="text" placeholder="todo ..." ref="todoInput" />
                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}


class TodoListBox extends React.Component<TodoListBoxProps, any> {
    state: TodoListState = { data: []};

    componentDidMount() {
        this.setState({data: todoArray});
    }

    handlerRefreshState(id: number, isDone: boolean) {
        this.state.data.forEach((todo) => {
            if (todo.id == id) {
                todo.isDone = isDone;
                return;
            }
        });

        this.setState({data: this.state.data});
    }

    handlerRefreshNewData(todoId: number, todoThing: string, todoState: boolean = false) {
        var newTodoItem: TodoModel = {
            id: todoId,
            thing: todoThing,
            isDone: todoState
        },
        todoList:Array<TodoModel> = this.state.data;

        todoList.push(newTodoItem);

        this.setState({
            data: todoList
        });
    }

    getLastId() {
        return this.state.data.length;
    }

    render() {
        return (
            <div className="todo-box">
                <h1>Todo List</h1>
                <TodoList data={this.state.data} handlerRefreshState={this.handlerRefreshState.bind(this)} />
                <TodoForm id={this.getLastId()} handlerAddTodo={this.handlerRefreshNewData.bind(this)} />
            </div>
        );
    }
}


var $todoBox: Element = $("#todo-box")[0];
var todoArray: Array<TodoModel> = [
    {id: 1, thing: "test 1", isDone: false},
    {id: 2, thing: "test 2", isDone: false},
    {id: 3, thing: "test 3", isDone: false},
    {id: 4, thing: "test 4", isDone: false},
];

ReactDOM.render(
    <TodoListBox data={todoArray} />,
    $todoBox
);
