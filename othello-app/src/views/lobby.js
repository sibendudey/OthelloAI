import React from 'react';
import {connect} from 'react-redux';
import {fetchGames, getStats} from "../actions/lobby";
import ListGame from "../components/listgame";
import {newGame} from "../actions/game";
import $ from 'jquery';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import './lobby.scss';
import Button from "@material-ui/core/es/Button/Button";

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
        const {history} = this.props;
        return (<div className={"view-all-games-container"}>
            <Paper>
                <Table>
                    <TableBody>
                        {
                            this.renderCurrentGames()
                        }
                    </TableBody>
                </Table>
            </Paper>
            <div className='create-new-game'>
                <Button variant="contained" onClick={() => history.push('/create_game')}>Create new game</Button>
            </div>
        </div>);
    }

    fetchStats()    {
        this.props.dispatchGetStats(this.props.lobbyClient, this.props.profile.id);
    }

    renderCurrentGames() {
        const {games, history} = this.props;
        if (games.length === 0) return "No Games Currently being played";
        const gamesList = games.map((game) => (<TableRow>
            <ListGame
                userid={this.props.profile.id}
                key={game.name + game.inProgress}
                game={game}
                history={history}/>
          </TableRow>));
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
    dispatchFetchGames: (profile) => dispatch(fetchGames((profile || {}).client)),
    dispatchNewGame: (gameName, id) => dispatch(newGame(gameName, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LobbyView);
