///<reference path = "todo_models" />

/* Component */
interface AppHeader {}
interface AppFooter {}

interface TodoList {}
interface CompleteList {}

/* Component state && Component props */
interface AppHeaderProps {
    children: any;
}

interface AppHeaderState {}

interface AppFooterProps {}

interface AppFooterState {}

interface TodoListContainerProps {
    children: any;
}

interface TodoListContainerState {}

interface TodoItemProps {
    todo: TodoModel;
    handlerCompleted;
    handlerChangeMatter;
    handlerDeleteItem;
}

interface TodoItemState {}

interface AddTodoFormProps {
    handlerAddTodo;
}

interface AddTodoFormState {}

interface TodoListProps {}

interface TodoListState {
    data: Array<TodoModel>;
}

interface CompletedListProps {}

interface CompletedListState {
    data: Array<TodoModel>;
}
