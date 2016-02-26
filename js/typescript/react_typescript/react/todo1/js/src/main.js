///<reference path="typings/jquery/jquery"/>
///<reference path="typings/react/react-global"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TodoBox = (function (_super) {
    __extends(TodoBox, _super);
    function TodoBox() {
        _super.apply(this, arguments);
    }
    TodoBox.prototype.handlerTodoState = function (e) {
        this.props.handlerRefreshState(e);
    };
    return TodoBox;
})(React.Component);
var FinishTodoBox = (function (_super) {
    __extends(FinishTodoBox, _super);
    function FinishTodoBox() {
        _super.apply(this, arguments);
    }
    FinishTodoBox.prototype.render = function () {
        var todo = this.props.todo;
        return (React.createElement("li", null, React.createElement("input", {"type": "checkbox", "name": todo.id.toString(), "checked": todo.isDone, "onChange": this.handlerTodoState.bind(this)}), React.createElement("del", null, todo.thing)));
    };
    return FinishTodoBox;
})(TodoBox);
var UnFinishTodoBox = (function (_super) {
    __extends(UnFinishTodoBox, _super);
    function UnFinishTodoBox() {
        _super.apply(this, arguments);
    }
    UnFinishTodoBox.prototype.render = function () {
        var todo = this.props.todo;
        return (React.createElement("li", null, React.createElement("input", {"type": "checkbox", "name": todo.id.toString(), "checked": todo.isDone, "onChange": this.handlerTodoState.bind(this)}), todo.thing));
    };
    return UnFinishTodoBox;
})(TodoBox);
var TodoList = (function (_super) {
    __extends(TodoList, _super);
    function TodoList() {
        _super.apply(this, arguments);
    }
    TodoList.prototype.handlerTodoState = function (e) {
        var todoId = e.target.name, todoStatus = e.target.checked;
        this.props.handlerRefreshState(todoId, todoStatus);
    };
    TodoList.prototype.render = function () {
        var _this = this;
        var todoNodes = this.props.data.map(function (todo) {
            if (todo.isDone) {
                return (React.createElement(FinishTodoBox, {"todo": todo, "handlerRefreshState": _this.handlerTodoState.bind(_this)}));
            }
            else {
                return (React.createElement(UnFinishTodoBox, {"todo": todo, "handlerRefreshState": _this.handlerTodoState.bind(_this)}));
            }
        });
        return (React.createElement("div", {"className": "todo-list"}, React.createElement("ul", null, todoNodes)));
    };
    return TodoList;
})(React.Component);
var TodoForm = (function (_super) {
    __extends(TodoForm, _super);
    function TodoForm() {
        _super.apply(this, arguments);
    }
    TodoForm.prototype.hanlderAddTodo = function (e) {
        e.preventDefault();
        var id = this.props.id, todo = this.refs.todoInput.value;
        this.props.handlerAddTodo(id, todo);
    };
    TodoForm.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("form", {"className": "todo-form", "onSubmit": this.hanlderAddTodo.bind(this)}, React.createElement("input", {"type": "hidden", "name": "id", "value": this.props.id.toString()}), React.createElement("input", {"type": "text", "placeholder": "todo ...", "ref": "todoInput"}), React.createElement("input", {"type": "submit", "value": "Add"}))));
    };
    return TodoForm;
})(React.Component);
var TodoListBox = (function (_super) {
    __extends(TodoListBox, _super);
    function TodoListBox() {
        _super.apply(this, arguments);
        this.state = { data: [] };
    }
    TodoListBox.prototype.componentDidMount = function () {
        this.setState({ data: todoArray });
    };
    TodoListBox.prototype.handlerRefreshState = function (id, isDone) {
        this.state.data.forEach(function (todo) {
            if (todo.id == id) {
                todo.isDone = isDone;
                return;
            }
        });
        this.setState({ data: this.state.data });
    };
    TodoListBox.prototype.handlerRefreshNewData = function (todoId, todoThing, todoState) {
        if (todoState === void 0) { todoState = false; }
        var newTodoItem = {
            id: todoId,
            thing: todoThing,
            isDone: todoState
        }, todoList = this.state.data;
        todoList.push(newTodoItem);
        this.setState({
            data: todoList
        });
    };
    TodoListBox.prototype.getLastId = function () {
        return this.state.data.length;
    };
    TodoListBox.prototype.render = function () {
        return (React.createElement("div", {"className": "todo-box"}, React.createElement("h1", null, "Todo List"), React.createElement(TodoList, {"data": this.state.data, "handlerRefreshState": this.handlerRefreshState.bind(this)}), React.createElement(TodoForm, {"id": this.getLastId(), "handlerAddTodo": this.handlerRefreshNewData.bind(this)})));
    };
    return TodoListBox;
})(React.Component);
var $todoBox = $("#todo-box")[0];
var todoArray = [
    { id: 1, thing: "test 1", isDone: false },
    { id: 2, thing: "test 2", isDone: false },
    { id: 3, thing: "test 3", isDone: false },
    { id: 4, thing: "test 4", isDone: false },
];
ReactDOM.render(React.createElement(TodoListBox, {"data": todoArray}), $todoBox);
