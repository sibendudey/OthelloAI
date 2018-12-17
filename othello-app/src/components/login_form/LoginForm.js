import React from 'react';
import {withRouter} from 'react-router-dom';
import {
  FormGroup,
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';
import {Link} from 'react-router-dom';
import swal from 'sweetalert'

import {connect} from "react-redux";
import $ from 'jquery';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import './loginForm.scss';
import {login, updateLoginForm} from "./LoginActions";

function LoginForm(props) {
  
  function update(ev) {
    props.dispatchUpdateLoginForm(ev);
  }
  
  function create_token(ev) {
    //Login Validation
    //Validating empty fields
    var emptyRegex = new RegExp(/^\s+$/);
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var email = props.login.emailid;
    // This regular expression has been done for password
    // var pass = props.login.password;
    // if((emptyRegex.test(email) || email == "") && (emptyRegex.test(pass) || pass == "")){
    //     swal("None of the field should be empty");
    // }
    // else
    if(email === ""){
      swal("Email field can't be empty");
    }
    else if(!emailRegex.test(email))
    {
      swal("That's an invalid email format.");
    }
    else{
      // Take care of login here, but I think this needs to be moved.
      props.dispatchLogin(props.login, props.history);
    }
  }
  
  return (<div className="login-form-container">
          <TextField label='Email' value={props.login.emailid} onChange={update}/>
          <div className="login-button">
          <Button variant='contained' className="mr-2 text-center" color="primary" onClick={create_token}>Log In</Button>
          </div>
      </div>);
}

export const mapStateToProps = (state) => ({
  login: state.login,
});

export const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateLoginForm: (event) => dispatch(updateLoginForm(event)),
  dispatchLogin: () => dispatch(login()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
