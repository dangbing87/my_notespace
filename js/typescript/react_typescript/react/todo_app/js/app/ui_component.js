///<reference path="../typings/react/react-global" />
///<reference path="ui_interface" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var classesDivideChar = " ";
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
            "uk-position-bottom",
            "uk-width-1",
            "uk-text-center"
        ].join(classesDivideChar);
        this.divStyle = {
            background: "#f5f5f5",
            border: "1px solid rgba(0,0,0,.06)",
            padding: "10px 0"
        };
    }
    AppFooter.prototype.render = function () {
        return (React.createElement("footer", {"className": this.classes, "style": this.divStyle}, "Todo List Footer"));
    };
    return AppFooter;
})(React.Component);
var TodoListContainer = (function (_super) {
    __extends(TodoListContainer, _super);
    function TodoListContainer() {
        _super.apply(this, arguments);
        this.containerClasses = [
            "uk-width-1",
            "uk-text-center"
        ].join(classesDivideChar);
        this.listClasses = [
            "uk-container-center",
            "uk-width-9-10",
            "uk-panel-box",
            "uk-margin-top"
        ].join(classesDivideChar);
        this.listDivStyle = {
            textAlign: "left"
        };
    }
    TodoListContainer.prototype.render = function () {
        return (React.createElement("section", {"className": this.containerClasses}, React.createElement("div", {"className": this.listClasses, "style": this.listDivStyle}, this.props.children)));
    };
    return TodoListContainer;
})(React.Component);
var TodoListBase = (function (_super) {
    __extends(TodoListBase, _super);
    function TodoListBase() {
        _super.apply(this, arguments);
        this.ulClasses = [
            "uk-list",
            "uk-list-line"
        ].join(classesDivideChar);
        this.liClasses = [
            "uk-margin"
        ];
    }
    return TodoListBase;
})(React.Component);
var AddTodoForm = (function (_super) {
    __extends(AddTodoForm, _super);
    function AddTodoForm() {
        _super.apply(this, arguments);
        this.formClasses = [
            "uk-form",
        ].join(classesDivideChar);
        this.submitButtonClasses = [
            "uk-button",
            "uk-button-primary",
            "uk-margin-left"
        ].join(classesDivideChar);
    }
    AddTodoForm.prototype.render = function () {
        return (React.createElement("form", {"className": this.formClasses}, React.createElement("input", {"type": "text", "className": "uk-width-1-2"}), React.createElement("input", {"type": "button", "className": this.submitButtonClasses, "value": "Add"})));
    };
    return AddTodoForm;
})(React.Component);
var TodoList = (function (_super) {
    __extends(TodoList, _super);
    function TodoList() {
        _super.apply(this, arguments);
    }
    TodoList.prototype.render = function () {
        return (React.createElement(TodoListContainer, null, React.createElement(AddTodoForm, null), React.createElement("ul", {"className": this.ulClasses}, React.createElement("li", {"className": this.listClasses}, "aaa"), React.createElement("li", {"className": this.listClasses}, "aaa"), React.createElement("li", {"className": this.listClasses}, "aaa"), React.createElement("li", {"className": this.listClasses}, "aaa"))));
    };
    return TodoList;
})(TodoListBase);
var CompleteList = (function (_super) {
    __extends(CompleteList, _super);
    function CompleteList() {
        _super.apply(this, arguments);
    }
    CompleteList.prototype.render = function () {
        return (React.createElement(TodoListContainer, null, React.createElement("ul", {"className": this.ulClasses}, React.createElement("li", {"className": this.listClasses}, "bbb"), React.createElement("li", {"className": this.listClasses}, "bbb"), React.createElement("li", {"className": this.listClasses}, "bbb"), React.createElement("li", {"className": this.listClasses}, "bbb"))));
    };
    return CompleteList;
})(TodoListBase);
