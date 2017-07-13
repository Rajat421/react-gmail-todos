
import React from "react";
import createBrowserHistory from "history/createBrowserHistory";
import Login from "./components/Login/login";
import TodoList      from "./components/todos/todos-list"
import {BrowserRouter as Router, Route} from "react-router-dom";
const history = createBrowserHistory();
export default props => (
    <Router history={history}>
        <div>

            <Route exact path={'/'} component={Login}/>
            { /**
             exact is used because every route contains the
             root-path('/') so with every route app component
             will be activated but with "exact" keyword we can
             stop this and app component will only be activated
             if path exactly matches this("/")
             **/
            }
            <Route exact path={'/todos'} component={TodoList}/>



        </div>
    </Router>

)