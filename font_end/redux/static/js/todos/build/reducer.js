/*
 * state格式
 *
 * {
 *   visibilityFilter: 'SHOW_ALL',
 *   todos: [
 *     {
 *       text: 'Consider using Redux',
 *       completed: true,
 *     },
 *     {
 *       text: 'Keep all state in a single tree',
 *       completed: false
 *     }
 *   ]
 * }
 */

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};
