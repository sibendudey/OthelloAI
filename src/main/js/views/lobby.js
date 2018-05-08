import React from 'react';
import {connect} from 'react-redux';
// import {Socket} from "../../../../../deps/phoenix/assets/js/phoenix";
import {fetchGames} from "../actions/lobby";
import {ListGame} from "../components/listgame";

import SockJS from 'sockjs-client';
import {Stomp} from 'stompjs/lib/stomp.js';

class LobbyView extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props;
        //
        // if (lobby == null) {
        //     const socket = new Socket("/socket", {params: {playerName: window.playerName}});
        //     socket.connect();
        //     let lobby = socket.channel("lobby:join");
        //     lobby.join();
        //     dispatch(fetchGames(lobby))
        // } else dispatch(fetchGames(lobby));
        console.log("Component Mounted");
        const socket = new SockJS('/gs-guide-websocket');
        let stompClient = Stomp.over(socket);
        dispatch(fetchGames(stompClient, socket));
        // stompClient.connect({}, function (frame) {
        //     setConnected(true);
        //
        //     // stompClient.subscribe('/game/fetchGames', function (games) {
        //     //     showGreeting(JSON.parse(greeting.body).content);
        //     // });
        // });

    }

    render() {
        const {lobby, dispatch} = this.props;
        return (
            <div id="lobby_view">
              <div className="row">
                <div className="col-xl-6 current_game text-center">
                  <div id="current_games">
                    <table>
                      <tbody>
                        <tr>
                          <th>
                            Current Games
                          </th>
                          <th>
                          </th>
                        </tr>
                        {this.renderCurrentGames()}
                      </tbody>
                    </table>
                  </div>
                </div>
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

        console.log(games);

        if (games.length === 0) return "No Games Currently being played";

        const gamesList = games.map(game => {
            return (
                <ListGame key={game.name + game.inProgress} game={game}/>
            );
        });

        return gamesList
    }

}

function map(state) {
    return Object.assign({}, state.lobby);
}

export default connect(map)(LobbyView);
