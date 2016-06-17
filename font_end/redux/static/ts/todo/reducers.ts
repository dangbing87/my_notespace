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
        default:
            return state;
    }
}
