import React from 'react';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import {connect} from 'react-redux';
import './createGame.scss';
import {createGame, updateCreateGameForm} from "./CreateGameActions";
import {withRouter} from "react-router";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const CreateGame = (props) => {
  const { dispatchUpdateCreateForm, dispatchCreateGame, history } = props;
  const { gamename, gameType } = props.createGame;
  return (<div className='create-game-container'>
    <TextField label='Game name' name='gamename' value={gamename}
    onChange={(ev) => dispatchUpdateCreateForm({ gamename: ev.target.value })} />
    <FormLabel component="legend">Game Type</FormLabel>
    <RadioGroup aria-label="gameType" name="gender1" value={gameType} onChange={(ev) => dispatchUpdateCreateForm({ gameType: ev.target.value })}>
      <FormControlLabel value="OneVsOne" control={<Radio />} label="1 vs 1" />
      <FormControlLabel value="OneVsAI" control={<Radio />} label="1 vs Computer" />
    </RadioGroup>
    <div className='create-game-button'>
      <Button variant='contained' disabled={gamename.length === 0}
      onClick={() => dispatchCreateGame(history)}>Play Game</Button>
    </div>
    <div>
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