import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux'
import invariant from 'invariant';
import {RoutingContext} from 'react-router';
import LobbyView from '../views/lobby';
import GameView from '../views/game';
import IndexView from '../views/index';

// The configuration for react-redux and organization of the javascript code
// folder structure like actions, reducers, store, views etc
// has been inspired from this repo.
// https://github.com/bigardone/phoenix-battleship
export default class Root extends React.Component {
    _renderRouter() {
        invariant(this.props.routerHistory,
            '<Root /> needs either a routingContext or routerHistory to render.'
        );

        return (
            <Router>
                <div>
                    <Route exact path={"/"} component={IndexView}/>
                    <Route exact path={"/lobby"} component={LobbyView}/>
                    <Route path={"/games/:gameName"} render={(props) => {
                        return <GameView gameName={props.match.params.gameName}/>
                    }}/>
                </div>
            </Router>
        );
    }

    render() {
        const {store} = this.props;
        return (
            <Provider store={store}>
                {this._renderRouter()}
            </Provider>
        );
    }
}
