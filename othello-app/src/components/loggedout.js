import React from 'react';
import {Row, Col} from 'reactstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import RegisterTask from './register-user';
import LoginForm from './login-form';

export default function loggedOut(props)    {
    return <Router>
        <div className="loginBackground container2">
            <Route path="/register" exact={true} render={({history}) => <div className="container2">
                <RegisterTask dispatch={props.dispatch} register={props.register} history={history} />
            </div>}/>
            <Route path="/" exact={true} render={({history}) => <LoginForm login={props.login} history={history} dispatch={props.dispatch}/>} />
        </div>
    </Router>;
}