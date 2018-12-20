import React from 'react';
import {connect} from 'react-redux';
import {markSquare, subscribeToGameChanges, fetchGameData} from "../actions/game";
import {withRouter} from "react-router";
import Paper from "@material-ui/core/es/Paper/Paper";
import Grid from "@material-ui/core/Grid";

class Game extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const {profile, dispatchFetchGameData, dispatchSubscribeToGameChanges} = this.props;
    const {gameName} = this.props.match.params;
    dispatchFetchGameData(gameName);
    dispatchSubscribeToGameChanges(profile, gameName);
  }
  
  render() {
    if (this.props.gameData == null) return null;
    
    return (
      <div className="game">
        <Grid container direction='column' spacing={24}>
          <Grid item xs={12}>
            <Paper>
              <div className="shadow-board">
                {this.getBoard()}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              {this.getInfo()}
            </Paper>
          </Grid>
        </Grid>
      </div>
      //     {/*<div className="chat">*/}
      //     {/*<div className="chat_heading">*/}
      //     {/*<h4>*/}
      //     {/*CHAT*/}
      //     {/*</h4>*/}
      //     {/*</div>*/}
      //     {/*<ChatView dispatch={this.props.dispatch} gameChannel={this.props.gameChannel}*/}
      //     {/*messages={this.props.messages}/>*/}
      //     {/*</div>*/}
      // </div>
    );
  }
  
  getInfo() {
    return (
      <div style={{padding: "10px 10px 10px 10px"}}>
        <h4>
          <u>
            How to Play Othello
          </u>
        </h4>
        <p>
          Players battle to finish the game with more of their own pieces on
          the board than their opponent. The game is classed as finished when
          there are no spaces left on the board or there are no more possible
          legal moves for either competitor.
        </p>
        <h4>
          <u>
            The Game
          </u>
        </h4>
        <p>
          A legal move is one that consists of, for example, a black piece
          being placed on the board that creates a straight line
          (vertical, horizontal or diagonal) made up of a black piece at
          either end and only white pieces in between. When a player
          achieves this, any white pieces between the two black are turned
          black so that the line becomes entirely black. Same applies if you
          play as white.
        </p>
      </div>
    
    );
  }
  
  getBoard() {
    let player1 = this.props.gameData.player1info;
    let player2 = this.props.gameData.player2info;
    
    if (player1.id === this.props.profile.id) {
      return player1.isTurn ? <MyTurnBoard dispatch={this.props.dispatch}
                                           gameData={this.props.gameData}
                                           gameChannel={this.props.gameChannel}
                                           profile={this.props.profile}/>
        : <OppositeTurnBoard dispatch={this.props.dispatch}
                             gameChannel={this.props.gameChannel}
                             gameData={this.props.gameData}
                             profile={this.props.profile}/>;
    } else if (player2.id === this.props.profile.id) {
      return player2.isTurn ? <MyTurnBoard dispatch={this.props.dispatch}
                                           gameData={this.props.gameData}
                                           gameChannel={this.props.gameChannel}
                                           profile={this.props.profile}/>
        : <OppositeTurnBoard dispatch={this.props.dispatch}
                             gameChannel={this.props.gameChannel}
                             gameData={this.props.gameData}
                             profile={this.props.profile}/>;
    } else {
      return (
        <SpectatorBoard dispatch={this.props.dispatch}
                        gameChannel={this.props.gameChannel}
                        gameData={this.props.gameData}
                        profile={this.props.profile}/>
      );
    }
  }
}


class Board extends React.Component {
  
  renderRow(r) {
    var row = [];
    for (var i = 0; i < 8; i++) {
      row.push(this.renderSquare(r, i));
    }
    return (
      <Grid item xs={24} container direction='row' key={'row' + r}>
        {row}
      </Grid>
    );
  }
  
  renderRows() {
    var rows = [];
    for (var i = 0; i < 8; i++) {
      rows.push(this.renderRow(i));
    }
    return (
      <Grid container direction='column'>
        {rows}
      </Grid>
    );
  }
  
  getColor(board, pos) {
    let c = board.charAt(pos);
    switch (c) {
      case '|' :
        return "";
      case 'X' :
        return "black";
      case 'O' :
        return "white";
      case '?' :
        return "nextTurn";
    }
  }
  
  render() {
    return (
      <div style={{display: "flex", flexFlow: "column"}}>
        <div className="visible" id="info_board">
          {this.get_info()}
        </div>
        <div style={{margin: "auto"}}>
          {this.renderRows()}
          {score_board(this.props.gameData.player1info,
            this.props.gameData.player2info,
            this.props.gameData.inProgress,
            this.props.gameData.isFinished)}
        </div>
      </div>
    );
  }
  
}

const white = "⚪";
const black = "⚫";

class Square extends React.Component {
  
  Click() {
    if (this.props.value.color === "nextTurn" && this.props.clickable) {
      markSquare(this.props.value.i, this.props.value.j, this.props.value.gameid);
    } else {
      window.alert("You are not allowed to click here");
    }
  }
  
  renderDisc() {
    if (this.props.value.color == null) {
      return "";
    }
    if (this.props.value.color === "white") {
      return white;
    }
    if (this.props.value.color === "black") {
      return black;
    }
  }
  
  render() {
    
    return (
      <Grid item xs className='square' style={this.setStyle()} onClick={this.Click.bind(this)}>
        {this.renderDisc()}
      </Grid>
    );
  }
  
  setStyle() {
    return this.props.value.color === "nextTurn" ? {backgroundColor: '#B20000'} : null;
  }
}

class OppositeTurnBoard extends Board {
  
  renderSquare(i, j) {
    return <Square key={'square' + i + j}
                   value={{color: this.getColor(this.props.gameData.board, i * 8 + j)}}
                   gameChannel={this.props.gameChannel}
                   clickable={false}
                   dispatch={this.props.dispatch}/>;
  }
  
  get_info() {
    if (this.props.gameData.winnerinfo != null) {
      return declare_winner(this.props.gameData.winnerinfo, this.props.profile.id);
    }
    
    let player1 = this.props.gameData.player1info;
    let player2 = this.props.gameData.player2info;
    
    return "This is "
      + (player1.isTurn === true ? player1.userName : player2.userName)
      + "'s" + " turn";
  }
  
  declare_winner() {
    return <h3>
      Sorry. You Lost the game :(
    </h3>;
  }
}

class SpectatorBoard extends Board {
  renderSquare(i, j) {
    return <Square key={'square' + i + j}
                   value={{color: this.getColor(this.props.gameData.board, i * 8 + j)}}
                   gameChannel={this.props.gameChannel}
                   dispatch={this.props.dispatch}
                   clickable={false}/>;
  }
  
  get_info() {
    
    if (this.props.gameData.winnerinfo != null) {
      return declare_winner(this.props.gameData.winnerinfo, this.props.profile.id);
    }
    
    const {player1info, player2info} = this.props.gameData;
    const nextTurn = player1info.isTurn ? player1info : player2info;
    return "This is "
      + nextTurn.userName
      + "'s" + " turn";
  }
  
  declare_winner() {
    return <h3>
      {this.props.gameData.winnerinfo.userName + " Won The Game"}
    </h3>;
  }
}


class MyTurnBoard extends Board {
  
  constructor(props) {
    super(props);
  }
  
  renderSquare(i, j) {
    return <Square key={'square' + i + j}
                   value={{
                     color: this.getColor(this.props.gameData.board, i * 8 + j),
                     gameid: this.props.gameData.id,
                     i: i,
                     j: j
                   }}
                   gameChannel={this.props.gameChannel}
                   dispatch={this.props.dispatch}
                   clickable={this.props.gameData.inProgress && true}/>;
  }
  
  get_info() {
    
    if (this.props.gameData.winnerinfo != null) {
      return declare_winner(this.props.gameData.winnerinfo, this.props.profile.id);
    }
    
    if (!this.props.gameData.inProgress && !this.props.gameData.isFinished)
      return (
        <div>
          <h4>
            Waiting for Player 2 to Join
          </h4>
        </div>);
    else
      return (
        <div>
          <b>
            This is your turn
          </b>
        </div>);
  }
  
  // declare_winner()  {
  //
  //     return <h3>
  //         Congratulations!!! You Win !!!
  //     </h3>
  //     // if (this.props.gameData.winnerinfo === this.props.profile.id)
  //     //     return (  <div className = "card card-header visible">
  //     //         <h3>
  //     //             Congratulations!! You Win!!!
  //     //         </h3>
  //     //     </div>);
  //     // else
  //     //     return (
  //     //         <div className = "card card-header visible">
  //     //             <h2>
  //     //                 {}
  //     //             </h2>
  //     //         </div>)
  // }
  
}

function declare_winner(winner, playerId) {
  if (winner.id === playerId)
    return (<div className="card card-header visible">
      <h3>
        Congratulations!! You Win!!!
      </h3>
    </div>);
  else
    return (
      <div className="card card-header visible">
        <h2>
          {winner.userName + " won the game"}
        </h2>
      </div>);
}


function score_board(player1, player2, in_progress, isFinished) {
  if (isFinished || in_progress) {
    return (
      <div class="score_card" id="score_board">
        <div className="card card-header scores1 col" id="score_player_1">
          <h5>
            
            Name(⚫):
            <b>
              {player1.userName}
            </b>
          </h5>
          <h5>
            Score:
            <b>
              {player1.score}
            </b>
          </h5>
        </div>
        
        <div className="card card-header scores2 col" id="score_player_2">
          <h5>
            Name(⚪):
            <b>
              {player2.userName}
            </b>
          </h5>
          <h5>
            Score: <b>{player2.score}</b>
          </h5>
        </div>
      </div>
    );
  }
  
  return null;
}


const mapDispatchToProps = (dispatch) => ({
  dispatchFetchGameData: (gameName) => dispatch(fetchGameData(gameName)),
  dispatchSubscribeToGameChanges: (profile, gameId) => dispatch(subscribeToGameChanges((profile || {}).client, gameId)),
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, state.game, props, state.lobby, {profile: state.profile});
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
