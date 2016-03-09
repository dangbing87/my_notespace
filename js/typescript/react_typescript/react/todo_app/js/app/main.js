///<reference path="../typings/react/react-global" />
///<reference path="../typings/react-router/react-router" />
///<reference path="ui_interface" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var IndexLink = ReactRouter.IndexLink;
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        return (React.createElement("div", null, React.createElement(AppHeader, null, React.createElement(IndexLink, null, "Todo List"), React.createElement(Link, {"to": "/complete_list/"}, "Complete List")), this.props.children, React.createElement(AppFooter, null)));
    };
    return App;
})(React.Component);
ReactDOM.render(React.createElement(Router, null, React.createElement(Route, {"path": "/", "component": App}, React.createElement(IndexRoute, {"component": TodoList}), React.createElement(Route, {"path": "complete_list", "component": CompletedList}))), document.body);
