/// <reference path="actions.ts" />
/// <reference path="../typings/redux/redux.d.ts"/>

import combineReducers = Redux.combineReducers;

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

function todos(state: Array<Todo> = [], action: Action): Array<Todo> {
    switch (action.type) {
        case ADD_TODO:
            return  [ ...state, { text: action.text, completed: false }]

        case COMPLETE_TODO:
            return state.map(function(todo, index) {
                if (index === action.index) {
                    return Object.assign({}, todo, { completed: !todo.completed });
                }
                return todo;
            });
        default:
            return state;
    }
}

function visibilityFilter(state: string = VisibilityFilters.SHOW_ALL, action: Action): string {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.text;
        default:
            return state;
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
});
