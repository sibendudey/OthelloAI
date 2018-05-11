import React from 'react';
import {Link} from 'react-router-dom';

export class ListGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.game;
    }

    render() {
        return (
          <table className="card">
            <tr className="card-header">
              <td>
                <h5>{this.state.name}</h5>
              </td>
              <td>
                <Link to={getLink(this.state.name)} className='btn btn-primary' role="button">
                  {!this.state.inProgress ? "Join" : "Spectate"}
                </Link>
              </td>
            </tr>
          </table>
        );
    }
}


function getLink(gameName) {
    return "/games/" + gameName;
}
