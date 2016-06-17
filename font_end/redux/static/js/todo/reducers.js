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
        default:
            return state;
    }
}
