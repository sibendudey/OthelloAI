import React from 'react';
import LoginForm from "../login_form/LoginForm";
import RegisterForm from "../register_form/RegisterForm";
import {Route, withRouter} from "react-router";
import {connect} from "react-redux";

const Routes = (props) => {
  const { profile } = props;
  return (<div>
    {
      !profile && <div>
        <Route exact path='/' component={LoginForm} />
        <Route path='/register' component={RegisterForm}/>
      </div>
    }
  </div>)
};


export const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default withRouter(connect(mapStateToProps)(Routes));