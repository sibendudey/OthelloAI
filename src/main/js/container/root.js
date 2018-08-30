import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LobbyView from '../views/lobby';
import GameView from '../views/game';
import IndexView from '../views/index';

export const Root = (props) => {
    const {store} = this.props;
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path={"/"} component={IndexView}/>
                    <Route exact path={"/lobby"} component={LobbyView}/>
                    <Route path={"/games/:gameName"} render={(props) => {
                        return <GameView gameName={props.match.params.gameName}/>
                    }}/>
                </div>
            </Router>
        </Provider>
    );
};
