///<reference path="../typings/react/react-global"/>

var groceryItems:Array<number> = [1,3,4,5];

class GroceryList extends React.Component<any, any> {
    handlerClick(i) {
        console.log(this.props.item[i]);
    }

    render() {
        return (
            <div>
            {
                this.props.items.map((item, i) => {
                    return <div onClick={this.handlerClick.bind(this, i)}>{item}</div>
                }, this)
            }
            </div>
        );
    }
}

class TodoItem extends React.Component<any, any> {
    state: any = {
        isEdit: false,
        itemText: this.props.item.item
    };

    handlerToggle() {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    handlerChangeValue(e) {
        this.setState({
            itemText: e.target.value
        });
    }

    render() {
        return (
            <div className={this.state.isEdit ? "editing" : ""} onClick={this.handlerToggle.bind(this)}>
                <span>{this.state.itemText}</span>
                <input type="text" value={this.state.itemText} onChange={this.handlerChangeValue.bind(this)} />
            </div>
        );
    }
}

ReactDOM.render(
    <GroceryList items={groceryItems} />,
    document.getElementsByClassName("grocery-list")[0]
);

var todoItem: any = {
    item: "121"
};

ReactDOM.render(
    <TodoItem item={todoItem} />,
    document.getElementsByClassName("toggle-input")[0]
);
