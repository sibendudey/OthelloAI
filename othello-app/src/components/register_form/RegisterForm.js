import React from 'react';
import {connect} from 'react-redux';
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
import {Link, Route, Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import {withRouter} from "react-router-dom";
// import {registration} from "../actions";
import $ from 'jquery';

function RegisterForm(props) {
  
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({type: 'UPDATE_REGISTER_FORM', register: data});
  }
  
  function create_token(ev) {
    var emptyRegex = new RegExp(/^\s+$/);
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var phoneRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g);
    var email = props.register.emailid;
    // var pass = props.register.password;
    var name = props.register.username;
    if(emptyRegex.test(email) || email == ""){
      swal("Email field can't be empty");
    }
    else if(emptyRegex.test(name) || name == ""){
      swal("Name field can't be empty");
    }
    else if(!emailRegex.test(email))
    {
      swal("That's an invalid email format.");
    }
    else{
      // Move the registation out of here
      // registration(props.register, props.history);
    }
  }
  
  return <div className="d-flex  h-100 py-5 loginBackground">
    <div className="d-flex flex-column mx-auto">
      <h3 className="text-center font-weight-bold h3 pt-3">Register to Bus Tracker App</h3>
      <div className="row justify-content-center">
        <Form className="mt-4">
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  Username
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" name="username" placeholder="username" value={props.register.username} onChange={update}/>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="material-icons">
                  email
                </InputGroupText>
              </InputGroupAddon>
              <Input type="email" name="emailid" placeholder="email" value={props.register.emailid} onChange={update}/>
            </InputGroup>
          </FormGroup>
          
          <FormGroup className="text-center">
            <Button className="mr-2" color="primary" onClick={create_token}>Register</Button>
            <Link to="/" className="btn btn-secondary  text-center" color="secondary">Back to Login</Link>
          </FormGroup>
        </Form>
      </div>
    </div>
  </div>;
}

export const mapStateToProps = (state) => ({
  register: state.register,
});

export default withRouter(connect(mapStateToProps)(RegisterForm));