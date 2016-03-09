///<reference path = "../typings/react/react-global" />
///<reference path = "ui_interface" />
///<reference path = "todo_models" />

private const classesDivideChar = " ";
private var todoArray: Array<TodoModel> = [
    { id: 1, matter: "one", completed: true },
    { id: 2, matter: "two", completed: false },
    { id: 3, matter: "three", completed: true },
    { id: 4, matter: "four", completed: false },
    { id: 5, matter: "five", completed: false }
];

class AppHeader extends React.Component<AppHeaderProps, AppHeaderState> implements AppHeader {
    public render() {
        var childNodes = this.props.children.map((child) => {
            return (
                <li className = "uk-parent">{child}</li>
            );
        });

        return (
            <header>
                <nav className = "uk-navbar">
                    <ul className = "uk-navbar-nav">
                    {childNodes}
                    </ul>
                </nav>
            </header>
        );
    }
}

class AppFooter extends React.Component<AppFooterProps, AppFooterState> implements AppFooter {
    public classes:Array<string> = [
        "uk-width-1",
        "uk-text-center"
    ].join(classesDivideChar);

    public render() {
        return (
            <footer className = {this.classes}>Todo List Footer</footer>
        );
    }
}

class TodoListContainer extends React.Component<TodoListContainerProps, TodoListContainerState> {
    public containerClasses: Array<string> = [
        "uk-width-1",
        "uk-text-center",
        "todo-list-container"
    ].join(classesDivideChar);

    public listClasses: Array<string> = [
        "uk-container-center",
        "uk-width-9-10",
        "uk-panel-box",
        "uk-margin-top",
        "uk-form"
    ].join(classesDivideChar);

    public render() {
        return (
            <section className = {this.containerClasses}>
                <div className = {this.listClasses}>{this.props.children}</div>
            </section>
        );
    }
}

class TodoListBase extends React.Component<any, any> {
    public ulClasses: Array<string> = [
        "uk-list",
        "uk-list-line",
        "todo-list"
    ].join(classesDivideChar);
}

class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
   public handlerCompleted(e) {
        var todoId: number = this.refs.todoItem.dataset.todoId;
        this.props.handlerCompleted(todoId);
    }

   public handlerChangeMatter(e) {
        var todoId: number = this.refs.todoItem.dataset.todoId,
            matter: string = e.target.value;
        this.props.handlerChangeMatter(todoId, matter);
    }

   public handlerEditMode(e) {
        var $matterInput: any = $(e.target),
            isCompleted: boolean = this.refs.inputCheckBox.checked;

        if (!isCompleted) {
            $matterInput.addClass("edit-mode");
            $matterInput.attr("readonly", false);
        }
    }

   public handlerNormalModel(e) {
        var $matterInput: any = $(e.target);

        $matterInput.removeClass("edit-mode");
        $matterInput.attr("readonly", true);
    }

   public handlerDeleleItem(e) {
        var todoId: number = this.refs.todoItem.dataset.todoId;
        this.props.handlerDeleteItem(todoId);
    }

    public render() {
        var todo: TodoModel = this.props.todo;

        return (
            <li
             className = {this.liClasses}
             data-todo-id = {todo.id}
             ref = "todoItem">
                <label>
                    <input type = "checkbox"
                     checked = {todo.completed}
                     onClick = {this.handlerCompleted.bind(this)}
                     ref = "inputCheckBox" />

                    <input type = "text"
                     className = {todo.completed && "completed" }
                     readOnly = "readonly"
                     value  = {todo.matter}
                     onChange = {this.handlerChangeMatter.bind(this)}
                     onDoubleClick = {this.handlerEditMode.bind(this)}
                     onBlur = {this.handlerNormalModel.bind(this)} />
                </label>
                <a href = "javascript:;"
                 className = "delete-item"
                 onClick = {this.handlerDeleleItem.bind(this)}>
                    <i className = "uk-icon uk-icon-close"></i>
                </a>
            </li>
        );
    }
}

class AddTodoForm extends React.Component<AddTodoFormProps, AddTodoFormState> {
    public formClasses: Array<string> = [
        "uk-form",
        "add-todo-form"
    ].join(classesDivideChar);

    public submitButtonClasses: Array<string> = [
        "uk-button",
        "uk-button-primary",
        "uk-margin-left"
    ].join(classesDivideChar)

    public handlerAddTodo(e) {
        e.preventDefault();

        var todo: TodoModel,
            matter: string  =  this.refs.matter.value.trim(),
            completed: boolean  =  false;

        if (matter != "") {
            todo = {
                matter: matter,
                completed: completed
            };

            this.refs.matter.value = "";

            this.props.handlerAddTodo(todo);
        }
    }

    public render() {
        return (
            <form className = {this.formClasses} onSubmit = {this.handlerAddTodo.bind(this)}>
                <input type = "text"
                 className = "uk-width-1-2"
                 ref = "matter" />
                <input type = "submit"
                 className = {this.submitButtonClasses}
                 value = "Add" />
            </form>
        );
    }
}

class TodoList extends TodoListBase<TodoListProps, TodoListState> implements TodoList {
    public state: TodoListContainerState = { data: [] };

    public componentDidMount() {
        this.setState({ data: todoArray });
    }

    public handlerAddTodo(todo: TodoModel) {
        var data: Array<TodoModel> = this.state.data,
            item: TodoModel;

        item = {
            id: data.length+1,
            matter: todo.matter,
            completed: todo.completed
        };

        data.push(item);

        todoArray = data;
        this.setState({ data: data });
    }

    public handlerCompleted(id: number) {
        var data: Array<TodoModel> = this.state.data;

        data.forEach((todo) => {
            if (todo.id  ==  id) {
                todo.completed = !todo.completed;
                return;
            }
        });

        todoArray = data;
        this.setState({ data: data });
    }

    public handlerModifyTodo(id: number, matter: string) {
        var data: Array<TodoModel> = this.state.data;

        data.forEach((todo) => {
            if (todo.id == id) {
                todo.matter = matter;
                return;
            }
        });

        todoArray  =  data;
        this.setState({ data: data });
    }

    public handlerDeleteItem(id: number) {
        var data: Array<TodoModel> = [];

        this.state.data.forEach((todo) => {
            if (todo.id != id) {
                data.push(todo);
            }
        });

        todoArray = data;
        this.setState({ data: data });
    }

    public render() {
        var childNodes = this.state.data.map((todo) => {
            return (
                <TodoItem
                 todo = {todo}
                 handlerCompleted = {this.handlerCompleted.bind(this)}
                 handlerChangeMatter = {this.handlerModifyTodo.bind(this)}
                 handlerDeleteItem= {this.handlerDeleteItem.bind(this)} />
            );
        });

        return (
            <TodoListContainer>
                <AddTodoForm handlerAddTodo = {this.handlerAddTodo.bind(this)} />
                <ul className = {this.ulClasses}>
                {childNodes}
                </ul>
            </TodoListContainer>
        );
    }
}

class CompletedList extends TodoListBase<CompletedListProps, CompletedListState> implements CompletedList {
    public state: CompletedListState = { data: [] };

    public componentDidMount() {
        this.setState({ data: todoArray });
    }

    public render() {
        var childNodes = this.state.data.map((todo)  => {
            if (todo.completed) {
                return (
                    <li className = {this.liClasses}>{todo.matter}</li>
                );
            }
        });

        return (
            <TodoListContainer>
                <ul className = {this.ulClasses}>
                {childNodes}
                </ul>
            </TodoListContainer>
        );
    }
}
