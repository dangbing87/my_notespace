var AddTodoBoxComponent = React.createClass({
    render: function() {
        return (
            <div>
                <input type="text" />
                <button>Save</button>
            </div>
        );
    }
});

var TodoComponent = React.createClass({
    render: function() {
        return (
            <li>{this.props.text}</li>
        );
    }
});

var TodoListComponent = React.createClass({
    render: function() {
        var todoNodes = this.props.map(function(todo) {
            return (<TodoComponent text={todo.text} />);
        });

        return (
            <ul>
                {todoNodes}
            </ul>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div>
                <AddTodoBoxComponent />
                <TodoListComponent />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById("app")
);
