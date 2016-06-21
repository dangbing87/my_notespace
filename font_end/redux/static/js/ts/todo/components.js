var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Provider = ReactRedux.Provider;
var todoList = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: [{ text: 'one', completed: false }, { text: 'two', completed: false }]
};
var AddTodo = (function (_super) {
    __extends(AddTodo, _super);
    function AddTodo() {
        _super.apply(this, arguments);
    }
    AddTodo.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("input", {type: "text"}), React.createElement("button", null, "Add Todo")));
    };
    return AddTodo;
}(React.Component));
var TodoItem = (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem() {
        _super.apply(this, arguments);
    }
    TodoItem.prototype.render = function () {
        return (React.createElement("li", {style: {
            textDecoration: this.props.completed ? 'line-through' : 'none',
            cursor: this.props.completed ? 'default' : 'pointer'
        }}, "￼", this.props.text));
    };
    return TodoItem;
}(React.Component));
var TodoList = (function (_super) {
    __extends(TodoList, _super);
    function TodoList() {
        _super.apply(this, arguments);
    }
    TodoList.prototype.render = function () {
        var chiidrenNodes = this.props.todos.map(function (todo, index) {
            return (React.createElement(TodoItem, {text: todo.text, completed: todo.completed}));
        });
        return (React.createElement("ul", null, chiidrenNodes));
    };
    return TodoList;
}(React.Component));
var Footer = (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        _super.apply(this, arguments);
    }
    Footer.prototype.renderFilter = function (filter, name) {
        var _this = this;
        if (filter === this.props.filter) {
            return name;
        }
        return (React.createElement("a", {href: "#", onClick: function (e) {
            e.preventDefault(), _this.props.onChangeFilter(filter);
        }}, name));
    };
    Footer.prototype.render = function () {
        return (React.createElement("p", null, this.renderFilter(VisibilityFilters.SHOW_ALL, 'all'), ' ', this.renderFilter(VisibilityFilters.SHOW_COMPLETE, 'completed'), ' ', this.renderFilter(VisibilityFilters.SHOW_ACTIVE, 'active')));
    };
    return Footer;
}(React.Component));
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.onChangeFilter = function (filter) {
        console.log(filter);
    };
    App.prototype.render = function () {
        return (React.createElement("div", null, React.createElement(AddTodo, null), React.createElement(TodoList, {todos: todoList.todos, visibilityFilter: todoList.visibilityFilter}), React.createElement(Footer, {filter: VisibilityFilters.SHOW_ALL, onChangeFilter: this.onChangeFilter.bind(this)})));
    };
    return App;
}(React.Component));
var store = Redux.createStore(todoApp);
var rootElement = document.getElementById("main");
ReactDOM.render(React.createElement(Provider, {store: store}, React.createElement(App, null)), rootElement);
