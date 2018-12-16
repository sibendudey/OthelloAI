import React from 'react';
import {withRouter} from 'react-router-dom';
import {
  Button,
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

function LoginForm(props) {
  
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({type: 'UPDATE_LOGIN_FORM', login: data});
  }
  
  // function create_token(ev) {
  // // /   api.submit_login(props.login, props.history);
  // }
  
  function create_token(ev) {
    //Login Validation
    //Validating empty fields
    var emptyRegex = new RegExp(/^\s+$/);
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var email = props.login.emailid;
    // var pass = props.login.password;
    // if((emptyRegex.test(email) || email == "") && (emptyRegex.test(pass) || pass == "")){
    //     swal("None of the field should be empty");
    // }
    // else
    if(emptyRegex.test(email) || email == ""){
      swal("Email field can't be empty");
    }
    else if(!emailRegex.test(email))
    {
      swal("That's an invalid email format.");
    }
    else{
      // api.submit_login(props.login, null);
      // Take care of login here, but I think this needs to be moved.
      // login(props.login, props.history);
    }
  }
  
  return <div className="d-flex h-100 py-5">
    <div className="d-flex flex-column mx-auto">
      <h3 className="text-center font-weight-bold h3 pt-3">  Get Set Othello!!! </h3>
      <div className="row justify-content-center">
        <Form className="mt-4">
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  email
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="emailid" placeholder="email" value={props.login.emailid} onChange={update}/>
            </InputGroup>
          </FormGroup>
          <FormGroup className="text-center pt-3">
            <Button className="mr-2 text-center" color="primary" onClick={create_token}>Log In</Button>
            <Link to="/register" className="btn btn-secondary  text-center" color="secondary">Register</Link>
          </FormGroup>
        </Form>
      </div>
    </div>
  </div>;
}

export const mapStateToProps = (state) => ({
  login: state.login,
});

export const mapDispatchToProps = (dispatch) => ({

});
export default withRouter(connect(mapStateToProps, null)(LoginForm));
