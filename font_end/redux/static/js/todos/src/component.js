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

var AddTodoBoxComponent = React.createClass({
    render: function() {
        return (
            <form className="am-form">
                <fieldset
                className="am-g">
                    <label
                    className="am-u-sm-10"
                    >
                        <input
                        type="text" />
                    </label>

                    <button
                    className="am-btn am-btn-primary am-u-sm-2">
                        Save
                    </button>
                </fieldset>
            </form>
        );
    }
});

var TodoComponent = React.createClass({
    render: function() {
        return (
            <li
            style={{
                textDecoration: this.props.completed ? 'line-through' : 'none',
                cursor: this.props.completed ? 'default' : 'pointer'
            }}
            >
            {this.props.text}
            </li>
        );
    }
});

var TodoListComponent = React.createClass({
    render: function() {
        var todoNodes;
        todoNodes = this.props.todos.map(function(todo, i) {
            return (
                <TodoComponent
                key={i}
                completed={todo.completed}
                text={todo.text} />
            );
        });

        return (
            <ul className="am-list am-list-static">
                {todoNodes}
            </ul>
        );
    }
});

var Footer = React.createClass({
    renderFilter: function(filter, name) {
        if (filter === this.props.filter) {
            return (
                <button type="button"
                className="am-btn am-btn-secondary am-u-sm-3"
                disabled="disabled"
                >
                {name}
                </button>
            );
        }

        return (
            <button
            type="button"
            className="am-btn am-btn-secondary am-u-sm-3"
            >
            {name}
            </button>
        );
    },

    renderPlaceholder: function() {
        return (
            <div className="am-u-sm-1">&nbsp;</div>
        );
    },

    render: function() {
        return (
            <footer className="am-g">
                {this.renderFilter("SHOW_ALL", "ALl")}
                {this.renderPlaceholder()}
                {this.renderFilter("SHOW_COMPLETED", "Completed")}
                {this.renderPlaceholder()}
                {this.renderFilter("SHOW_ACTIVE", "Active")}
                {this.renderPlaceholder()}
            </footer>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className="am-u-sm-centered am-u-sm-6">
                <AddTodoBoxComponent />
                <TodoListComponent todos={todos} />
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById("app")
);
