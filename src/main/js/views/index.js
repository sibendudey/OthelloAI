import React from 'react';

import {connect} from 'react-redux';
import {login} from "../actions";

import GameView from './game';
import Lobby from './lobby';
import LoggedOut from '../components/loggedout';
import { Route, Switch } from 'react-router';
import {ConnectedRouter} from 'connected-react-router';
import StatsPage from "./stats";

class Index extends React.Component {

    constructor(props)  {
        super(props);
    }

    componentDidMount() {
        let email = localStorage.getItem("email");
        const { dispatchLogin } = this.props;
        if (email)  {
            dispatchLogin({emailid: email});
        }
    }

    render()    {
        const { history } = this.props;
        if (this.props.profile)
            return <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" exact component={Lobby} />
                    <Route path="/stats" component={StatsPage}/>
                    <Route path="/games/:gameName" render={(props) => {
                        return <GameView gameName={props.match.params.gameName}/>
                    }}/>
                </Switch>
            </ConnectedRouter>;
        else
            return <LoggedOut
                        login={this.props.login}
                        dispatch={this.props.dispatch}
                        register={this.props.register} />
    }
}


const mapStateToProps = (state) => ({
    register: state.register,
    login: state.login,
    profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchLogin: (email) => dispatch(login(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);