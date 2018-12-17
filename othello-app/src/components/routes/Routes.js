import React from 'react';
import LoginForm from "../login_form/LoginForm";
import RegisterForm from "../register_form/RegisterForm";
import {Route, withRouter} from "react-router";
import {connect} from "react-redux";
import ProfilePage from "../profile_page/ProfilePage";
import LobbyView from '../../views/lobby';

const Routes = (props) => {
  const { profile } = props;
  return (<div>
    {
      !profile && <div>
        <Route exact path='/' component={LoginForm} />
        <Route path='/register' component={RegisterForm}/>
      </div>
    }
    {
      profile && <div>
        <Route exact path='/' component={ProfilePage} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/lobby' component={LobbyView} />
      </div>
    }
  </div>)
};


export const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default withRouter(connect(mapStateToProps)(Routes));