import React from 'react';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import {withRouter} from "react-router-dom";
import $ from 'jquery';
import {TextField, Button} from "@material-ui/core";
import './registerForm.scss';
import {registration, updateRegisterForm} from "./RegisterFormActions";
import {Redirect} from "react-router";

function RegisterForm(props) {
  
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatchUpdateRegisterForm(data);
  }
  
  function create_token(ev) {
    var emptyRegex = new RegExp(/^\s+$/);
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var phoneRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g);
    var email = props.register.emailid;
    // var pass = props.register.password;
    var name = props.register.username;
    if(emptyRegex.test(email) || email === ""){
      swal("Email field can't be empty");
    }
    else if(emptyRegex.test(name) || name === ""){
      swal("Name field can't be empty");
    }
    else if(!emailRegex.test(email))
    {
      swal("That's an invalid email format.");
    }
    else{
      // Move the registation out of here
      props.dispatchRegistration();
    }
  }
  
  
  return (<div className={"register-form-container"}>
    {
      props.profile && <Redirect to='/profile' />
    }
    <TextField label='Username' name='username' value={props.register.username} onChange={update}/>
    <TextField label='Email' name='emailid' value={props.register.emailid} onChange={update}/>
    <div className="register-button">
      <Button variant='contained' className="mr-2 text-center" color="primary" onClick={create_token}>Register</Button>
    </div>
  </div>);
}

export const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateRegisterForm: (data) => dispatch(updateRegisterForm(data)),
  dispatchRegistration: () => dispatch(registration()),
});

export const mapStateToProps = (state) => ({
  register: state.register,
  profile: state.profile,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));