import {Redirect} from "react-router";
import React from 'react';
import {profileReset} from "../profile_page/ProfilePageActions";
import {connect} from "react-redux";

export const Logout = (props) => {
  props.dispatchProfileReset();
  return <Redirect to='/login'/>;
};

export const mapDispatchToProps = (dispatch) => ({
  dispatchProfileReset: () => dispatch(profileReset()),
});

export default connect(null, mapDispatchToProps)(Logout);