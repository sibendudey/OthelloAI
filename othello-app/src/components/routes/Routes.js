import React from 'react';
import LoginForm from "../login_form/LoginForm";
import RegisterForm from "../register_form/RegisterForm";
import {Redirect, Route, withRouter} from "react-router";
import {connect} from "react-redux";
import ProfilePage from "../profile_page/ProfilePage";
import LobbyView from '../../views/lobby';
import Game from '../../views/game';
import CreateGame from "../create_game/CreateGame";

const Routes = (props) => {
  const {profile} = props;
  return (<div>
    {
      !profile && <Redirect to='/login'/>
    }
    <Route exact path='/login' component={LoginForm}/>
    <Route path='/register' component={RegisterForm}/>
    {profile &&
    <React.Fragment>
      <Route path='/profile' component={ProfilePage}/>
      <Route path='/lobby' component={LobbyView}/>
      <Route path='/create_game' component={CreateGame} />
      <Route path='/games/:gameName' component={Game} />
    </React.Fragment>}
  </div>);
};


export const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default withRouter(connect(mapStateToProps)(Routes));