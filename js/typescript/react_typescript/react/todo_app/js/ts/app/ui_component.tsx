///<reference path="../typings/react/react-global" />
///<reference path="ui_interface" />
///<reference path="todo_models" />

private const classesDivideChar = " ";
private var todoArray: Array<TodoModel> = [
    { id: 1, matter: "one", completed: false }
    { id: 2, matter: "two", completed: false }
    { id: 3, matter: "three", completed: false }
    { id: 4, matter: "four", completed: false }
    { id: 5, matter: "five", completed: false }
];

class AppHeader extends React.Component<any, any> implements AppHeader {
    render() {
        var childNodes = this.props.children.map((child) => {
            return (
                <li className="uk-parent">{child}</li>
            );
        });
        return (
            <header>
                <nav className="uk-navbar">
                    <ul className="uk-navbar-nav">
                    {childNodes}
                    </ul>
                </nav>
            </header>
        );
    }
}

class AppFooter extends React.Component<any, any> implements AppFooter {
    public classes:Array<string> = [
        "uk-position-bottom",
        "uk-width-1",
        "uk-text-center"
    ].join(classesDivideChar);

    public divStyle = {
        background: "#f5f5f5",
        border: "1px solid rgba(0,0,0,.06)",
        padding: "10px 0"
    };

    render() {
        return (
            <footer className={this.classes} style={this.divStyle}>Todo List Footer</footer>
        );
    }
}

class TodoListContainer extends React.Component<any, any> {
    public containerClasses: Array<string> = [
        "uk-width-1",
        "uk-text-center"
    ].join(classesDivideChar);

    public listClasses: Array<string> = [
        "uk-container-center",
        "uk-width-9-10",
        "uk-panel-box",
        "uk-margin-top"
    ].join(classesDivideChar);


    public listDivStyle = {
        textAlign: "left"
    };

    render() {
        return (
            <section className={this.containerClasses}>
                <div className={this.listClasses} style={this.listDivStyle}>{this.props.children}</div>
            </section>
        );
    }
}

class TodoListBase extends React.Component<any, any> {
    public ulClasses: Array<string> = [
        "uk-list",
        "uk-list-line"
    ].join(classesDivideChar);

    public liClasses: Array<string> = [
        "uk-margin"
    ];
}

class AddTodoForm extends React.Component<any, any> {
    public formClasses: Array<string> = [
        "uk-form",
    ].join(classesDivideChar);

    public submitButtonClasses: Array<string> = [
        "uk-button",
        "uk-button-primary",
        "uk-margin-left"
    ].join(classesDivideChar)

    public state: TodoModel;

    handleAddTodo(e) {
        e.preventDefault();

        var todo: TodoModel,
            matter: string = this.refs.matter.value.trim(),
            completed: boolean = false;

        if (matter != "") {
            todo = {
                matter: matter,
                completed: completed
            };

            this.refs.matter.value = "";

            this.props.handlerRefreshState(todo);
        }
    }

    render() {
        return (
            <form className={this.formClasses} onSubmit={this.handleAddTodo.bind(this)}>
                <input type="text"
                 className="uk-width-1-2"
                 ref="matter" />
                <input type="submit"
                 className={this.submitButtonClasses}
                 value="Add" />
            </form>
        );
    }
}

class TodoList extends TodoListBase implements TodoList {
    public state = { data: [] };

    componentDidMount() {
        this.setState({ data: todoArray });
    }

    handlerRefreshState(todo: TodoModel) {
        var data = this.state.data;

        data.push(todo);
        this.setState({ data: data });
    }

    render() {
        var childNodes = this.state.data.map((todo) => {
            return (
                <li className={this.liClasses}>
                    <label>
                        <input type="checkbox" onChange={} />
                        {todo.matter}
                    </label>
                </li>
            );
        });

        return (
            <TodoListContainer>
                <AddTodoForm handlerRefreshState={this.handlerRefreshState.bind(this)} />
                <ul className={this.ulClasses}>
                    {childNodes}
                </ul>
            </TodoListContainer>
        );
    }
}

class CompleteList extends TodoListBase implements CompleteList {
    public state = { data: [] };

    componentDidMount() {
        this.setState({ data: todoArray });
    }

    render() {
        var childNodes = this.state.data.map((todo) => {
            if (todo.completed) {
                return (
                    <li className={this.liClasses}>{todo.matter}</li>
                );
            }
        });

        return (
            <TodoListContainer>
                <ul className={this.ulClasses}>
                    {childNodes}
                </ul>
            </TodoListContainer>
        );
    }
}
