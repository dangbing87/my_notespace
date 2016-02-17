export enum TodoStatus {
    done,
    doing,
    dont,
}

export interface TodoModel {
    id: number;
    item: string;
    itemStatus: TodoStatus;
}

export interface TodoInterface {
    todoList: Array<TodoModel>;

    getTodo(id: number): TodoModel;
    addTodo(todo: TodoModel): void;
    changeStatus(id: number, itemStatus: TodoStatus): void;
    deleteItem(id: number): void;
    display(): void;
}
