///<reference path="../typings/react/react-global"/>
///<reference path="../typings/react-router/react-router"/>

import Router = ReactRouter.Router;
import Route = ReactRouter.Route;
import Link = ReactRouter.Link;
import IndexRoute = ReactRouter.IndexRoute;

class Message extends React.Component<any, any> {
    render() {
        return (
            <div>
                <p>{this.props.params.id || "message" }</p>
            </div>
        );
    }
}

class About extends React.Component<any, any> {
    render() {
        return (
            <div>
                <p>about</p>
            </div>
        );
    }
}

class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/message/1">Message</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    <Router>
        <Route path="/" component={App}>
            <Route path="message/:id" component={Message} />
            <Route path="about" component={About} />
        </Route>
    </Router>,
    document.body
);
