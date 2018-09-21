import React from 'react';

import {connect} from 'react-redux';
import {login} from "../actions";

import GameView from './game';
import Lobby from './lobby';
import LoggedOut from '../components/loggedout';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import StatsPage from "./stats";

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
        if (this.props.profile)
            return <Router>
                    <div>
                    <Route path="/" exact={true} component={Lobby}/>
                    <Route path={"/games/:gameName"} render={(props) => {
                        return <GameView gameName={props.match.params.gameName}/>
                    }}/>
                    <Route path={"/stats"} component={StatsPage}/>
                    </div>
                </Router>;
        else
            return <LoggedOut login={this.props.login} dispatch={this.props.dispatch}
                          register={this.props.register} />
    }

}

export default connect(({register, login, profile}) => Object.assign({}, {register : register, login: login, profile: profile}))(Index);