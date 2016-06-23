/// <reference path="../typings/react/react-global.d.ts"/>
/// <reference path="../typings/redux/redux.d.ts"/>
/// <reference path="../typings/react-redux/react-redux.d.ts"/>

/// <reference path="./actions.ts"/>
/// <reference path="./reducers.ts"/>

import Provider = ReactRedux.Provider;
import Dispatch = Redux.Dispatch;
import connect = ReactRedux.connect;

interface TodoProp extends Todo {
}

interface TodoListProp extends TodoState {
}

interface AddTodoProp {
    addTodo: (text:string)=> any;
}

interface FilterProp {
    filter: string;
    onChangeFilter(filter: string): void;
}

interface AppProps {
  todos?: Todo[];
  dispatch?: Dispatch;
}

var todoList: TodoState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: [ { text: 'one', completed: false}, { text: 'two', completed: false} ]
};

class AddTodo extends React.Component<AddTodoProp, void> {
    private handleSave(e: Event): void {
        e.preventDefault();
        var text: string = this.refs.todoText.value;
        
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    }

    public render(): any {
        return (
            <div>
                <input type="text" ref="todoText" />
                <button onClick={this.handleSave.bind(this)}>Add Todo</button>
            </div>
        );
    }
}

class TodoItem extends React.Component<TodoProp, void> {
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

class TodoList extends React.Component<TodoListProp, void> {
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

class Footer extends React.Component<FilterProp, void> {
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

class App extends React.Component<AppProps, void> {
    private onChangeFilter(filter: string) {
        console.log(filter);
    }

    public render(): any {
        const { todos, dispatch } = this.props;

        return (
            <div>
                <AddTodo addTodo={(text: string) => dispatch(addTodo(text))} />
                <TodoList todos={todoList.todos} visibilityFilter={todoList.visibilityFilter} />
                <Footer filter={VisibilityFilters.SHOW_ALL} onChangeFilter={this.onChangeFilter.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
  todos: state.todos
});

connect(mapStateToProps)(App);

let store = Redux.createStore(todoApp);
let rootElement = document.getElementById("main");

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
