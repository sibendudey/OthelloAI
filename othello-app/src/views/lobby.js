import React from 'react';
import {connect} from 'react-redux';
import { Card, CardDeck, Button, CardTitle, CardText } from 'reactstrap';
import {fetchGames, getStats} from "../actions/lobby";
import {ListGame} from "../components/listgame";
import { Container, Row, Col, Input } from 'reactstrap';
import {newGame} from "../actions/game";
import {withRouter} from "react-router-dom";

class LobbyView extends React.Component {

    constructor(props)  {
        super(props);
        this.state = {
            gameName: '',
        };
        this.startNewGame = this.startNewGame.bind(this);
        this.fetchStats = this.fetchStats.bind(this);
        this.onGameNameChange = this.onGameNameChange.bind(this);
        this.renderCurrentGames = this.renderCurrentGames.bind(this);
    }

    onGameNameChange(ev)  {
        const gameName = $(ev.target).val();
        this.setState({gameName});
    }

    componentDidMount() {
        const {profile} = this.props;
        this.props.dispatchFetchGames(profile);
    }

    render() {
        const {lobby, dispatch} = this.props;
        return (
            <div className="lobby_view">
              <div className="row">
                  <CardDeck>
                      <Card body>
                          <CardTitle>Join or Watch a Game?</CardTitle>
                          <CardText>You can join or watch games</CardText>
                          <CardText>{this.renderCurrentGames()}</CardText>
                      </Card>
                      <Card body>
                          <CardTitle>Start a new game?</CardTitle>
                          <CardText>
                              <Input type="text" placeholder="Enter a name for the game" onChange={this.onGameNameChange.bind(this)}/></CardText>
                          <Button onClick={this.startNewGame}>Start</Button>
                      </Card>
                      <Card body>
                          <CardTitle>Watch Your Stats</CardTitle>
                          <Button onClick={this.fetchStats}>Click here</Button>
                      </Card>
                  </CardDeck>
              </div>
            </div>
        );
    }

    fetchStats()    {
        // getStats(this.props.lobby, this.props.profile.id);
        this.props.dispatchGetStats(this.props.lobbyClient, this.props.profile.id);
    }

    renderCurrentGames() {
        const {games} = this.props;
        if (games.length === 0) return "No Games Currently being played";
        const gamesList = games.map((game) => (
                <ListGame
                    history={this.props.history}
                    userid={this.props.profile.id}
                    key={game.name + game.inProgress}
                    game={game}/>
        ));
        return gamesList;
    }

    startNewGame()  {
        this.props.dispatchNewGame(this.gameName, this.props.profile.id);
    }
}

function mapStateToProps(state) {
    return Object.assign({}, state.lobby, {profile: state.profile});
}

const mapDispatchToProps = (dispatch) => ({
    dispatchGetStats: (lobbyClient, userId) => dispatch(getStats(lobbyClient, userId)),
    dispatchFetchGames: (profile) => dispatch(fetchGames(profile.client)),
    dispatchNewGame: (gameName, id) => dispatch(newGame(gameName, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LobbyView);
