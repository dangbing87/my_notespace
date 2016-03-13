///<reference path="../typings/react/react-global" />
///<reference path="../typings/react-router/react-router" />
///<reference path="ui_interface" />

import Router = ReactRouter.Router;
import Route = ReactRouter.Route;
import Link = ReactRouter.Link;
import IndexRoute = ReactRouter.IndexRoute;
import IndexLink = ReactRouter.IndexLink;

class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                <AppHeader>
                    <IndexLink>Todo List</IndexLink>
                    <Link to="/complete_list/">Complete List</Link>
                </AppHeader>
                {this.props.children}
                <AppFooter></AppFooter>
            </div>
        );
    }
}

ReactDOM.render(
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={TodoList} />
            <Route path="complete_list" component={CompletedList} />
        </Route>
    </Router>,
    document.body
);
