///<reference path = "../typings/react/react-global" />
///<reference path = "ui_interface" />
///<reference path = "todo_models" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var classesDivideChar = " ";
var todoArray = [
    { id: 1, matter: "one", completed: true },
    { id: 2, matter: "two", completed: false },
    { id: 3, matter: "three", completed: true },
    { id: 4, matter: "four", completed: false },
    { id: 5, matter: "five", completed: false }
];
var AppHeader = (function (_super) {
    __extends(AppHeader, _super);
    function AppHeader() {
        _super.apply(this, arguments);
    }
    AppHeader.prototype.render = function () {
        var childNodes = this.props.children.map(function (child) {
            return (React.createElement("li", {"className": "uk-parent"}, child));
        });
        return (React.createElement("header", null, React.createElement("nav", {"className": "uk-navbar"}, React.createElement("ul", {"className": "uk-navbar-nav"}, childNodes))));
    };
    return AppHeader;
})(React.Component);
var AppFooter = (function (_super) {
    __extends(AppFooter, _super);
    function AppFooter() {
        _super.apply(this, arguments);
        this.classes = [
            "uk-width-1",
            "uk-text-center"
        ].join(classesDivideChar);
    }
    AppFooter.prototype.render = function () {
        return (React.createElement("footer", {"className": this.classes}, "Todo List Footer"));
    };
    return AppFooter;
})(React.Component);
var TodoListContainer = (function (_super) {
    __extends(TodoListContainer, _super);
    function TodoListContainer() {
        _super.apply(this, arguments);
        this.containerClasses = [
            "uk-width-1",
            "uk-text-center",
            "todo-list-container"
        ].join(classesDivideChar);
        this.listClasses = [
            "uk-container-center",
            "uk-width-9-10",
            "uk-panel-box",
            "uk-margin-top",
            "uk-form"
        ].join(classesDivideChar);
    }
    TodoListContainer.prototype.render = function () {
        return (React.createElement("section", {"className": this.containerClasses}, React.createElement("div", {"className": this.listClasses}, this.props.children)));
    };
    return TodoListContainer;
})(React.Component);
var TodoListBase = (function (_super) {
    __extends(TodoListBase, _super);
    function TodoListBase() {
        _super.apply(this, arguments);
        this.ulClasses = [
            "uk-list",
            "uk-list-line",
            "todo-list"
        ].join(classesDivideChar);
    }
    return TodoListBase;
})(React.Component);
var TodoItem = (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem() {
        _super.apply(this, arguments);
    }
    TodoItem.prototype.handlerCompleted = function (e) {
        var todoId = this.refs.todoItem.dataset.todoId;
        this.props.handlerCompleted(todoId);
    };
    TodoItem.prototype.handlerChangeMatter = function (e) {
        var todoId = this.refs.todoItem.dataset.todoId, matter = e.target.value;
        this.props.handlerChangeMatter(todoId, matter);
    };
    TodoItem.prototype.handlerEditMode = function (e) {
        var $matterInput = $(e.target), isCompleted = this.refs.inputCheckBox.checked;
        if (!isCompleted) {
            $matterInput.addClass("edit-mode");
            $matterInput.attr("readonly", false);
        }
    };
    TodoItem.prototype.handlerNormalModel = function (e) {
        var $matterInput = $(e.target);
        $matterInput.removeClass("edit-mode");
        $matterInput.attr("readonly", true);
    };
    TodoItem.prototype.handlerDeleleItem = function (e) {
        var todoId = this.refs.todoItem.dataset.todoId;
        this.props.handlerDeleteItem(todoId);
    };
    TodoItem.prototype.render = function () {
        var todo = this.props.todo;
        return (React.createElement("li", {"className": this.liClasses, "data-todo-id": todo.id, "ref": "todoItem"}, React.createElement("label", null, React.createElement("input", {"type": "checkbox", "checked": todo.completed, "onClick": this.handlerCompleted.bind(this), "ref": "inputCheckBox"}), React.createElement("input", {"type": "text", "className": todo.completed && "completed", "readOnly": "readonly", "value": todo.matter, "onChange": this.handlerChangeMatter.bind(this), "onDoubleClick": this.handlerEditMode.bind(this), "onBlur": this.handlerNormalModel.bind(this)})), React.createElement("a", {"href": "javascript:;", "className": "delete-item", "onClick": this.handlerDeleleItem.bind(this)}, React.createElement("i", {"className": "uk-icon uk-icon-close"}))));
    };
    return TodoItem;
})(React.Component);
var AddTodoForm = (function (_super) {
    __extends(AddTodoForm, _super);
    function AddTodoForm() {
        _super.apply(this, arguments);
        this.formClasses = [
            "uk-form",
            "add-todo-form"
        ].join(classesDivideChar);
        this.submitButtonClasses = [
            "uk-button",
            "uk-button-primary",
            "uk-margin-left"
        ].join(classesDivideChar);
    }
    AddTodoForm.prototype.handlerAddTodo = function (e) {
        e.preventDefault();
        var todo, matter = this.refs.matter.value.trim(), completed = false;
        if (matter != "") {
            todo = {
                matter: matter,
                completed: completed
            };
            this.refs.matter.value = "";
            this.props.handlerAddTodo(todo);
        }
    };
    AddTodoForm.prototype.render = function () {
        return (React.createElement("form", {"className": this.formClasses, "onSubmit": this.handlerAddTodo.bind(this)}, React.createElement("input", {"type": "text", "className": "uk-width-1-2", "ref": "matter"}), React.createElement("input", {"type": "submit", "className": this.submitButtonClasses, "value": "Add"})));
    };
    return AddTodoForm;
})(React.Component);
var TodoList = (function (_super) {
    __extends(TodoList, _super);
    function TodoList() {
        _super.apply(this, arguments);
        this.state = { data: [] };
    }
    TodoList.prototype.componentDidMount = function () {
        this.setState({ data: todoArray });
    };
    TodoList.prototype.handlerAddTodo = function (todo) {
        var data = this.state.data, item;
        item = {
            id: data.length + 1,
            matter: todo.matter,
            completed: todo.completed
        };
        data.push(item);
        todoArray = data;
        this.setState({ data: data });
    };
    TodoList.prototype.handlerCompleted = function (id) {
        var data = this.state.data;
        data.forEach(function (todo) {
            if (todo.id == id) {
                todo.completed = !todo.completed;
                return;
            }
        });
        todoArray = data;
        this.setState({ data: data });
    };
    TodoList.prototype.handlerModifyTodo = function (id, matter) {
        var data = this.state.data;
        data.forEach(function (todo) {
            if (todo.id == id) {
                todo.matter = matter;
                return;
            }
        });
        todoArray = data;
        this.setState({ data: data });
    };
    TodoList.prototype.handlerDeleteItem = function (id) {
        var data = [];
        this.state.data.forEach(function (todo) {
            if (todo.id != id) {
                data.push(todo);
            }
        });
        todoArray = data;
        this.setState({ data: data });
    };
    TodoList.prototype.render = function () {
        var _this = this;
        var childNodes = this.state.data.map(function (todo) {
            return (React.createElement(TodoItem, {"todo": todo, "handlerCompleted": _this.handlerCompleted.bind(_this), "handlerChangeMatter": _this.handlerModifyTodo.bind(_this), "handlerDeleteItem": _this.handlerDeleteItem.bind(_this)}));
        });
        return (React.createElement(TodoListContainer, null, React.createElement(AddTodoForm, {"handlerAddTodo": this.handlerAddTodo.bind(this)}), React.createElement("ul", {"className": this.ulClasses}, childNodes)));
    };
    return TodoList;
})(TodoListBase);
var CompletedList = (function (_super) {
    __extends(CompletedList, _super);
    function CompletedList() {
        _super.apply(this, arguments);
        this.state = { data: [] };
    }
    CompletedList.prototype.componentDidMount = function () {
        this.setState({ data: todoArray });
    };
    CompletedList.prototype.render = function () {
        var childNodes = this.state.data.map(function (todo) {
            if (todo.completed) {
                return (React.createElement("li", {"className": this.liClasses}, todo.matter));
            }
        });
        return (React.createElement(TodoListContainer, null, React.createElement("ul", {"className": this.ulClasses}, childNodes)));
    };
    return CompletedList;
})(TodoListBase);
