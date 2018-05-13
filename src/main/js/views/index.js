import React from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Form , FormGroup, Button, Input} from 'reactstrap';

import {registration} from "../actions";

import {setSession} from "../actions/session";

import LoggedOut from '../components/loggedout';

class Index extends React.Component {


   //  constructor(props)  {
   //      super(props);
   //      // this.form = {};
   //  }
   //
   //  handleChange(ev) {
   //      console.log("Handle change called");
   //      this.props.register[$(ev.target).attr('name')] = $(ev.target).val();
   //      this.props.dispatch({
   //          type: "UPDATE_FORM",
   //          register: this.props.register
   //      })
   //  }
   //
   //  handleSubmit(event)  {
   //      registration(this.props.register, this.props.history);
   //      event.preventDefault();
   //  }
   //
   //  render()    {
   //
   //
   //  return <div className="home_div">
   //      <div className= "index_othello">
   //        <div className="row">
   //          <div className="col-xs-8 index_page text-center">
   //            <h1>Welcome!</h1>
   //            <h4>First up, we need your name:</h4>
   //            <Form onSubmit={this.handleSubmit.bind(this)}>
   //            <FormGroup>
   //            <Input type="text" name="firstName" placeholder = "First Name" value={this.props.register.firstName} onChange={this.handleChange.bind(this)}/>
   //                <Input type="text" name="lastName" placeholder = "Last Name" value={this.props.register.lastName} onChange={this.handleChange.bind(this)}/>
   //                <Input type="email" name="email" placeholder = "Email" value={this.props.register.email} onChange={this.handleChange.bind(this)}/>
   //                <Input type="password" name="password" placeholder = "password" value={this.props.register.password} onChange={this.handleChange.bind(this)}/>
   //            </FormGroup>
   //            <Button type="submit" className="btn btn-primary btn-lg">
   //            Enter Lobby
   //            </Button>
   //            </Form>
   //          </div>
   //        </div>
   //      </div>
   //  </div>;
   // }
    render()    {
        // TODO : Fix to avoid using window object
        // window.history.pushState({}, "", "/");
        // this.props.history.push("/");
        return <LoggedOut login={this.props.login} dispatch={this.props.dispatch}
                          register={this.props.register} />
    }

}

export default connect(({register, login}) => Object.assign({}, {register : register, login: login}))(Index);