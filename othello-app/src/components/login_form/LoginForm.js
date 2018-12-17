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
import swal from 'sweetalert';

import {connect} from "react-redux";
import $ from 'jquery';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import './loginForm.scss';
import {login, updateLoginForm} from "./LoginActions";
import {Redirect} from "react-router";

class LoginForm extends React.Component {
  constructor(props)  {
    super(props);
    this.update = this.update.bind(this);
    this.create_token = this.create_token.bind(this);
  }
  
  componentDidMount() {
    let email = localStorage.getItem("email");
    const { dispatchLogin, dispatchUpdateLoginForm } = this.props;
    if (email)  {
        dispatchUpdateLoginForm({target: {value: email}})
        dispatchLogin();
    }
  }
  
  update(ev) {
    this.props.dispatchUpdateLoginForm(ev);
  }
  
  create_token(ev) {
    //Login Validation
    //Validating empty fields
    const { login } = this.props;
    var emptyRegex = new RegExp(/^\s+$/);
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var email = login.emailid;
    // This regular expression has been done for password
    // var pass = props.login.password;
    // if((emptyRegex.test(email) || email == "") && (emptyRegex.test(pass) || pass == "")){
    //     swal("None of the field should be empty");
    // }
    // else
    if (email === "") {
      swal("Email field can't be empty");
    } else if (!emailRegex.test(email)) {
      swal("That's an invalid email format.");
    } else {
      // Take care of login here, but I think this needs to be moved.
      this.props.dispatchLogin();
    }
  }
  
  render()  {
    const { login, profile } = this.props;
    return (<div className="login-form-container">
      {
        profile && <Redirect to='/profile'/>
      }
      <TextField label='Email' value={login.emailid} onChange={this.update}/>
      <div className="login-button">
        <Button variant='contained' className="mr-2 text-center" color="primary" onClick={this.create_token}>Log In</Button>
      </div>
    </div>);
  }
  
}

export const mapStateToProps = (state) => ({
  login: state.login,
  profile: state.profile,
});

export const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateLoginForm: (event) => dispatch(updateLoginForm(event)),
  dispatchLogin: () => dispatch(login()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
