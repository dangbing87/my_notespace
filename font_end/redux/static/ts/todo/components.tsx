/// <reference path="../typings/react/react-global.d.ts"/>
/// <reference path="../typings/redux/redux.d.ts"/>
/// <reference path="../typings/react-redux/react-redux.d.ts"/>

/// <reference path="./actions.ts"/>
/// <reference path="./reducers.ts"/>

import Provider = ReactRedux.Provider;

interface TodoProp extends Todo {
}

interface TodoListProp extends TodoState {
}

interface FilterProp {
    filter: string;
    onChangeFilter(filter: string): void;
}

var todoList: TodoState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: [ { text: 'one', completed: false}, { text: 'two', completed: false} ]
};

class AddTodo extends React.Component<any, any> {
    public render(): any {
        return (
            <div>
                <input type="text" />
                <button>Add Todo</button>
            </div>
        );
    }
}

class TodoItem extends React.Component<TodoProp, any> {
    public render(): any {
        return (
            <li style={{
                textDecoration: this.props.completed ? 'line-through' : 'none',
                cursor: this.props.completed ? 'default' : 'pointer'
            }}>￼
                {this.props.text}
            </li>
        );
    }
}

class TodoList extends React.Component<TodoListProp, any> {
    public render(): any {
        let chiidrenNodes = this.props.todos.map((todo, index) => {
            return (<TodoItem text={todo.text} completed={todo.completed} />);
        });

        return (
            <ul>
                {chiidrenNodes}
            </ul>
        );
    }
}

class Footer extends React.Component<FilterProp, any> {
    private renderFilter(filter: string, name: string): any {
        if (filter === this.props.filter) {
            return name;
        }

        return (
            <a href="#"
            onClick={e => {e.preventDefault(), this.props.onChangeFilter(filter)
            }}>
                {name}
            </a>
        );
    }

    public render(): any {
        return (
            <p>
                {this.renderFilter(VisibilityFilters.SHOW_ALL, 'all')}
                {' '}
                {this.renderFilter(VisibilityFilters.SHOW_COMPLETE, 'completed')}
                {' '}
                {this.renderFilter(VisibilityFilters.SHOW_ACTIVE, 'active')}
            </p>
        );
    }
}

class App extends React.Component<any, any> {
    private onChangeFilter(filter: string) {
        console.log(filter);
    }

    public render(): any {
        return (
            <div>
                <AddTodo />
                <TodoList todos={todoList.todos} visibilityFilter={todoList.visibilityFilter} />
                <Footer filter={VisibilityFilters.SHOW_ALL} onChangeFilter={this.onChangeFilter.bind(this)} />
            </div>
        );
    }
}

let store = Redux.createStore(todoApp);
let rootElement = document.getElementById("main");

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    rootElement
);
