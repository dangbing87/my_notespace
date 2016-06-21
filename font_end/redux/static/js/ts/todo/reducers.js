var combineReducers = Redux.combineReducers;
var initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};
function todos(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case ADD_TODO:
            return state.concat([{ text: action.text, completed: false }]);
        case COMPLETE_TODO:
            return state.map(function (todo, index) {
                if (index === action.index) {
                    return Object.assign({}, todo, { completed: !todo.completed });
                }
                return todo;
            });
        default:
            return state;
    }
}
function visibilityFilter(state, action) {
    if (state === void 0) { state = VisibilityFilters.SHOW_ALL; }
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.text;
        default:
            return state;
    }
}
var todoApp = combineReducers({
    visibilityFilter: visibilityFilter,
    todos: todos
});
