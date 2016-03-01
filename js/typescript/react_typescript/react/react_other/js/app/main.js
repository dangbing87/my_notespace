///<reference path="../typings/react/react-global"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var groceryItems = [1, 3, 4, 5];
var GroceryList = (function (_super) {
    __extends(GroceryList, _super);
    function GroceryList() {
        _super.apply(this, arguments);
    }
    GroceryList.prototype.handlerClick = function (i) {
        console.log(this.props.item[i]);
    };
    GroceryList.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null, this.props.items.map(function (item, i) {
            return React.createElement("div", {"onClick": _this.handlerClick.bind(_this, i)}, item);
        }, this)));
    };
    return GroceryList;
})(React.Component);
var TodoItem = (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem() {
        _super.apply(this, arguments);
        this.state = {
            isEdit: false,
            itemText: this.props.item.item
        };
    }
    TodoItem.prototype.handlerToggle = function () {
        this.setState({
            isEdit: !this.state.isEdit
        });
    };
    TodoItem.prototype.handlerChangeValue = function (e) {
        this.setState({
            itemText: e.target.value
        });
    };
    TodoItem.prototype.render = function () {
        return (React.createElement("div", {"className": this.state.isEdit ? "editing" : "", "onClick": this.handlerToggle.bind(this)}, React.createElement("span", null, this.state.itemText), React.createElement("input", {"type": "text", "value": this.state.itemText, "onChange": this.handlerChangeValue.bind(this)})));
    };
    return TodoItem;
})(React.Component);
ReactDOM.render(React.createElement(GroceryList, {"items": groceryItems}), document.getElementsByClassName("grocery-list")[0]);
var todoItem = {
    item: "121"
};
ReactDOM.render(React.createElement(TodoItem, {"item": todoItem}), document.getElementsByClassName("toggle-input")[0]);
