import React from 'react';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import {connect} from 'react-redux';
import './createGame.scss';
import {createGame, updateCreateGameForm} from "./CreateGameActions";
import {withRouter} from "react-router";

const CreateGame = (props) => {
  const { dispatchUpdateCreateForm, dispatchCreateGame, history } = props;
  const { gamename } = props.createGame;
  return (<div className='create-game-container'>
    <TextField label='Game name' name='gamename' value={gamename}
    onChange={(ev) => dispatchUpdateCreateForm({ gamename: ev.target.value })}/>
    <div className='create-game-button'>
      <Button variant='contained' disabled={gamename.length === 0}
      onClick={() => dispatchCreateGame(history)}>Play Game</Button>
    </div>
  </div>);
};

export const mapStateToProps = (state) => ({
  createGame: state.createGame,
});
export const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateCreateForm: (obj) => dispatch(updateCreateGameForm(obj)),
  dispatchCreateGame: (history) => dispatch(createGame(history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGame));