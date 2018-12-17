import React from 'react';
import {joinGame, spectateGame} from "../actions/game";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import Button from "@material-ui/core/Button";


// TODO
// Make it a stateless component
export class ListGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.game;
    }

    render() {
        return (
          <React.Fragment>
            <TableCell>
            <h3>{this.state.gameName}</h3>
            </TableCell>
            <TableCell>
            <Button variant='contained' onClick={this.handleClick.bind(this)}>
              {!this.state.inProgress ? "Join" :
                  (this.props.userid === this.state.player1Id ||
                      this.props.userid === this.state.player2Id) ? "Rejoin" : "Spectate" }
            </Button>
            </TableCell>
          </React.Fragment>
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
