import React from 'react';

import {connect} from 'react-redux';
import {Form , FormGroup, Button, Input} from 'reactstrap';

import {registration} from "../actions";

import {setSession} from "../actions/session";

class Index extends React.Component {


    constructor(props)  {
        super(props);
        this.form = {};
    }


    handleChange(ev) {
        // console.log($(ev.target).attr('name'));
        // let name = $(ev.target).val();
        this.form[$(ev.target).attr('name')] = $(ev.target).val();
    }


    handleSubmit(event)  {
        registration(this.form);
        event.preventDefault();
    }

    render()    {
    return <div className="home_div">
        <div className= "index_othello">
          <div className="row">
            <div className="col-xs-8 index_page text-center">
              <h1>Welcome!</h1>
              <h4>First up, we need your name:</h4>
              <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup>
              <Input type="text" name="firstName" placeholder = "First Name" defaultValue="" onChange={this.handleChange.bind(this)}/>
                  <Input type="text" name="lastName" placeholder = "Last Name" defaultValue="" onChange={this.handleChange.bind(this)}/>
                  <Input type="email" name="email" placeholder = "Email" defaultValue="" onChange={this.handleChange.bind(this)}/>
                  <Input type="password" name="password" placeholder = "password" defaultValue="" onChange={this.handleChange.bind(this)}/>
              </FormGroup>
              <Button type="submit" className="btn btn-primary btn-lg">
              Enter Lobby
              </Button>
              </Form>
            </div>
          </div>
        </div>
    </div>;
   }
}

export default connect(({login}) => Object.assign({}, {login : login}))(Index);