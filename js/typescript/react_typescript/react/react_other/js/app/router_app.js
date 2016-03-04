///<reference path="../typings/react/react-global"/>
///<reference path="../typings/react-router/react-router"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Message = (function (_super) {
    __extends(Message, _super);
    function Message() {
        _super.apply(this, arguments);
    }
    Message.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("p", null, this.props.params.id || "message")));
    };
    return Message;
})(React.Component);
var About = (function (_super) {
    __extends(About, _super);
    function About() {
        _super.apply(this, arguments);
    }
    About.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("p", null, "about")));
    };
    return About;
})(React.Component);
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("h1", null, "App"), React.createElement("ul", null, React.createElement("li", null, React.createElement(Link, {"to": "/about"}, "About")), React.createElement("li", null, React.createElement(Link, {"to": "/message/1"}, "Message"))), this.props.children));
    };
    return App;
})(React.Component);
ReactDOM.render(React.createElement(Router, null, React.createElement(Route, {"path": "/", "component": App}, React.createElement(Route, {"path": "message/:id", "component": Message}), React.createElement(Route, {"path": "about", "component": About}))), document.body);
