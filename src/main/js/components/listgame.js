import React from 'react';
import {Link} from 'react-router-dom';
import {joinGame, spectateGame} from "../actions/game";
import {Button} from 'reactstrap';

export class ListGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.game;
    }

    render() {
        console.log(this.state);
        return (
          <table className="card">
            <tr className="card-header">
              <td>
                <h5>{this.state.name}</h5>
              </td>
              <td>
                <Button className='btn btn-primary' role="button" onClick={this.handleClick.bind(this)}>
                  {!this.state.inProgress ? "Join" : "Spectate"}
                </Button>
              </td>
            </tr>
          </table>
        );
    }

    handleClick()   {
        this.state.inProgress ?
            spectateGame(this.props.history, this.state.id) :
            joinGame(this.state.id, this.props.userid, this.props.history);
    }
}


function getLink(gameName) {
    return "/games/" + gameName;
}
