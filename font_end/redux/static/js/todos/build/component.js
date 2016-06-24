var AddTodoBoxComponent = React.createClass({displayName: "AddTodoBoxComponent",
    render: function() {
        return (
            React.createElement("div", null,
                React.createElement("input", {type: "text"}),
                React.createElement("button", null, "Save")
            )
        );
    }
});

var TodoComponent = React.createClass({displayName: "TodoComponent",
    render: function() {
        return (
            React.createElement("li", null, this.props.text)
        );
    }
});

var TodoListComponent = React.createClass({displayName: "TodoListComponent",
    render: function() {
        var todoNodes = this.props.map(function(todo) {
            return (React.createElement(TodoComponent, {text: todo.text}));
        });

        return (
            React.createElement("ul", null,
                todoNodes
            )
        );
    }
});

var App = React.createClass({displayName: "App",
    render: function() {
        return (
            React.createElement("div", null,
                React.createElement(AddTodoBoxComponent, null),
                React.createElement(TodoListComponent, null)
            )
        );
    }
});

ReactDOM.render(
    React.createElement(App, null),
    document.getElementById("app")
);
