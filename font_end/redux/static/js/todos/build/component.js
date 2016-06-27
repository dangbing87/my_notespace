const todos = [
    {
        text: "test test one",
        completed: false
    },
    {
        text: "test test two",
        completed: false
    },
    {
        text: "test test three",
        completed: false
    },
    {
        text: "test test four",
        completed: false
    }
];

var AddTodoBoxComponent = React.createClass({displayName: "AddTodoBoxComponent",
    render: function() {
        return (
            React.createElement("form", {className: "am-form"}, 
                React.createElement("fieldset", {
                className: "am-g"}, 
                    React.createElement("label", {
                    className: "am-u-sm-10"
                    }, 
                        React.createElement("input", {
                        type: "text"})
                    ), 

                    React.createElement("button", {
                    className: "am-btn am-btn-primary am-u-sm-2"}, 
                        "Save"
                    )
                )
            )
        );
    }
});

var TodoComponent = React.createClass({displayName: "TodoComponent",
    render: function() {
        return (
            React.createElement("li", {
            style: {
                textDecoration: this.props.completed ? 'line-through' : 'none',
                cursor: this.props.completed ? 'default' : 'pointer'
            }
            }, 
            this.props.text
            )
        );
    }
});

var TodoListComponent = React.createClass({displayName: "TodoListComponent",
    render: function() {
        var todoNodes;
        todoNodes = this.props.todos.map(function(todo, i) {
            return (
                React.createElement(TodoComponent, {
                key: i, 
                completed: todo.completed, 
                text: todo.text})
            );
        });

        return (
            React.createElement("ul", {className: "am-list am-list-static"}, 
                todoNodes
            )
        );
    }
});

var Footer = React.createClass({displayName: "Footer",
    renderFilter: function(filter, name) {
        if (filter === this.props.filter) {
            return (
                React.createElement("button", {type: "button", 
                className: "am-btn am-btn-secondary am-u-sm-3", 
                disabled: "disabled"
                }, 
                name
                )
            );
        }

        return (
            React.createElement("button", {
            type: "button", 
            className: "am-btn am-btn-secondary am-u-sm-3"
            }, 
            name
            )
        );
    },

    renderPlaceholder: function() {
        return (
            React.createElement("div", {className: "am-u-sm-1"}, " ")
        );
    },

    render: function() {
        return (
            React.createElement("footer", {className: "am-g"}, 
                this.renderFilter("SHOW_ALL", "ALl"), 
                this.renderPlaceholder(), 
                this.renderFilter("SHOW_COMPLETED", "Completed"), 
                this.renderPlaceholder(), 
                this.renderFilter("SHOW_ACTIVE", "Active"), 
                this.renderPlaceholder()
            )
        );
    }
});

var App = React.createClass({displayName: "App",
    render: function() {
        return (
            React.createElement("div", {className: "am-u-sm-centered am-u-sm-6"}, 
                React.createElement(AddTodoBoxComponent, null), 
                React.createElement(TodoListComponent, {todos: todos}), 
                React.createElement(Footer, null)
            )
        );
    }
});

ReactDOM.render(
    React.createElement(App, null),
    document.getElementById("app")
);
