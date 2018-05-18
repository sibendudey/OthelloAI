import React from 'react';
import {connect} from 'react-redux';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import {fetchGames} from "../actions/lobby";
import {ListGame} from "../components/listgame";
import { Container, Row, Col, Input } from 'reactstrap';
import SockJS from 'sockjs-client';
import {Stomp} from 'stompjs/lib/stomp.js';
import {newGame} from "../actions/game";
import {withRouter} from "react-router-dom";

class LobbyView extends React.Component {

    constructor(props)  {
        super(props);
        this.gameName = "";
    }

    onGameNameChange(ev)  {
        this.gameName = $(ev.target).val();
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const socket = new SockJS('/gs-guide-websocket');
        let stompClient = Stomp.over(socket);
        dispatch(fetchGames(stompClient, socket));
    }

    render() {
        const {lobby, dispatch} = this.props;
        return (
            <div id="lobby_view">
              <div className="row">
                  <Col>
                      <Card body>
                          <CardTitle>Join or Watch a Game?</CardTitle>
                          <CardText>You can join or watch games</CardText>
                          <CardText>{this.renderCurrentGames()}</CardText>
                      </Card>
                  </Col>
                  <Col>
                      <Card body>
                          <CardTitle>Start a new game?</CardTitle>
                          <CardText>
                              <Input type="text" placeholder="Enter a name for the game" onChange={this.onGameNameChange.bind(this)}/></CardText>
                          <Button onClick={this.startNewGame.bind(this)}>Start</Button>
                      </Card>
                  </Col>
                  <Col>
                      <Card body>
                          <CardTitle>Watch Your Stats</CardTitle>
                          <Button>Click here</Button>
                      </Card>
                  </Col>
              </div>
            </div>
        );
    }
    // Attribution.
    // I would like to attribute this idea of showing the list
    // of games in the lobby page to the underlined link.
    // https://github.com/bigardone/phoenix-battleship
    renderCurrentGames() {
        const {games} = this.props;
        if (games.length === 0) return "No Games Currently being played";
        const gamesList = games.map(game => {
            return (
                <ListGame key={game.name + game.inProgress} game={game}/>
            );
        });
        return gamesList;
    }

    startNewGame()  {
        console.log(this.props);
        newGame(this.gameName, this.props.profile.id, this.props.history );
    }
}

function map(state) {
    return Object.assign({}, state.lobby, {profile: state.profile});
}

export default withRouter(connect(map)(LobbyView));
