import React from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Form , FormGroup, Button, Input} from 'reactstrap';

import {login, registration} from "../actions";

import {setSession} from "../actions/session";
import Lobby from './lobby';
import LoggedOut from '../components/loggedout';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class Index extends React.Component {

    constructor(props)  {
        super(props);
    }

    componentDidMount() {
        let email = localStorage.getItem("email");
        if (email)  {
            login({emailid: email}, null);
        }
    }

    render()    {
        // TODO : Fix to avoid using window object
        // window.history.pushState({}, "", "/");
        // this.props.history.push("/");
        if (this.props.profile)
            return <Router>
                    <Route path="/" exact={true} component={Lobby}/>
                </Router>;
        else
            return <LoggedOut login={this.props.login} dispatch={this.props.dispatch}
                          register={this.props.register} />
    }

}

export default connect(({register, login, profile}) => Object.assign({}, {register : register, login: login, profile: profile}))(Index);