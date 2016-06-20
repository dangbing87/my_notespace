///<reference path="actions" />
var initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};
function todoApp(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, { visibilityFilter: action.filter });
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: state.todos.concat([{ text: action.text, completed: false }])
            });
        case COMPLETE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map(function (todo, index) {
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
