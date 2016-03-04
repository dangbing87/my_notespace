///<reference path="../typings/react/react-global" />
///<reference path="ui_interface" />

private var classesDivideChar = " ";

class AppHeader extends React.Component<any, any> implements AppHeader {
    render() {
        var childNodes = this.props.children.map((child) => {
            return (
                <li className="uk-parent">{child}</li>
            );
        });
        return (
            <header>
                <nav className="uk-navbar">
                    <ul className="uk-navbar-nav">
                    {childNodes}
                    </ul>
                </nav>
            </header>
        );
    }
}

class AppFooter extends React.Component<any, any> implements AppFooter {
    public classes:Array<string> = [
        "uk-position-bottom",
        "uk-width-1",
        "uk-text-center"
    ].join(classesDivideChar);

    public divStyle = {
        background: "#f5f5f5",
        border: "1px solid rgba(0,0,0,.06)",
        padding: "10px 0"
    };

    render() {
        return (
            <footer className={this.classes} style={this.divStyle}>Todo List Footer</footer>
        );
    }
}

class TodoListContainer extends React.Component<any, any> {
    public containerClasses: Array<string> = [
        "uk-width-1",
        "uk-text-center"
    ].join(classesDivideChar);

    public listClasses: Array<string> = [
        "uk-container-center",
        "uk-width-9-10",
        "uk-panel-box",
        "uk-margin-top"
    ].join(classesDivideChar);


    public listDivStyle = {
        textAlign: "left"
    };

    render() {
        return (
            <section className={this.containerClasses}>
                <div className={this.listClasses} style={this.listDivStyle}>{this.props.children}</div>
            </section>
        );
    }
}

class TodoListBase extends React.Component<any, any> {
    public ulClasses: Array<string> = [
        "uk-list",
        "uk-list-line"
    ].join(classesDivideChar);

    public liClasses: Array<string> = [
        "uk-margin"
    ];
}

class AddTodoForm extends React.Component<any, any> {
    public formClasses: Array<string> = [
        "uk-form",
    ].join(classesDivideChar);

    public submitButtonClasses: Array<string> = [
        "uk-button",
        "uk-button-primary",
        "uk-margin-left"
    ].join(classesDivideChar)

    render() {
        return (
            <form className={this.formClasses}>
                <input type="text"
                 className="uk-width-1-2" />
                <input type="button"

                 className={this.submitButtonClasses}
                 value="Add" />
            </form>
        );
    }
}

class TodoList extends TodoListBase implements TodoList {
    render() {
        return (
            <TodoListContainer>
                <AddTodoForm />

                <ul className={this.ulClasses}>
                    <li className={this.listClasses}>aaa</li>
                    <li className={this.listClasses}>aaa</li>
                    <li className={this.listClasses}>aaa</li>
                    <li className={this.listClasses}>aaa</li>
                </ul>
            </TodoListContainer>
        );
    }
}

class CompleteList extends TodoListBase implements CompleteList {
    render() {
        return (
            <TodoListContainer>
                <ul className={this.ulClasses}>
                    <li className={this.listClasses}>bbb</li>
                    <li className={this.listClasses}>bbb</li>
                    <li className={this.listClasses}>bbb</li>
                    <li className={this.listClasses}>bbb</li>
                </ul>
            </TodoListContainer>
        );
    }
}
