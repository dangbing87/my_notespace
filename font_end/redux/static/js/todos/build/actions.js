const ADD_TODO = 'ADD_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY';

const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

function addTodo(text) {
    return { type: ADD_TODO, text };
}

function completedTodo(index) {
    return { type: COMPLETE_TODO, index }
}

function setVisibilityFIlter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}
