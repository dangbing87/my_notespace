///<reference path="actions" />

interface Todo {
    text: string;
    completed: boolean;
}

interface TodoState {
    visibilityFilter: string;
    todos: Array<Todo>;
}

interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}

const initialState: TodoState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

function todoApp(state: TodoState = initialState, action: Action): TodoState {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, { visibilityFilter: action.filter });
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: [ ...state.todos, { text: action.text, completed: false }]
            });
        case COMPLETE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map((todo, index) => {
                    if (index === action.index) {
                        return Object.assign({}, todo, { completed: !todo.completed });
                    }
                    return todo;
                })
            });
        default:
            return state;
    }
}
