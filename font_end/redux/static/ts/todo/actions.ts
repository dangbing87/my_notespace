interface VisibilityFiltersType {
    SHOW_ALL: string;
    SHOW_COMPLETE: string;
    SHOW_ACTIVE: string;
}

interface Action {
    type: string;
    text?: string;
    index?: number;
    filter?: string;
}

const ADD_TODO: string = "ADD_TODO";
const COMPLETE_TODO: string = "COMPLETE_TODO";
const SET_VISIBILITY_FILTER: string = "SET_VISIBILITY_FILTER";

const VisibilityFilters: VisibilityFiltersType = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_COMPLETE: "SHOW_COMPLETE",
    SHOW_ACTIVE: "SHOW_ACTIVE"
};

function addTodo(text: string): Action {
    return { type: ADD_TODO, text };
}

function completeTodo(index: number): Action {
    return { type: COMPLETE_TODO, index };
}

function setVisibilytyFilter(filter: string): Action {
    return { type: SET_VISIBILITY_FILTER, filter };
}
