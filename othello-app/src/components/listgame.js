import React from 'react';
import {joinGame, spectateGame} from "../actions/game";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import Button from "@material-ui/core/Button";

export class ListGame extends React.Component {
    constructor(props) {
        super(props);
    }
    
    gameStatus = [
        {
            status: "join",
            onClick: (ev) => joinGame(this.props.game.id, this.props.userid, this.props.history),
        },
        {
            status: "rejoin",
            onClick: (ev) =>  spectateGame(this.props.history, this.props.game.id),
        },
        {
            status: "spectate",
            onClick: (ev) => spectateGame(this.props.history, this.props.game.id),
        }
    ];
    
    render() {
        const status = this.getStatus();
        const { game } = this.props;
        return (
          <React.Fragment>
            <TableCell>
            <h3>{game.gameName}</h3>
            </TableCell>
            <TableCell>
            <Button variant='contained' onClick={status.onClick}>
                { status.status }
            </Button>
            </TableCell>
          </React.Fragment>
        );
    }

    getStatus() {
        const { game, userid } = this.props;
        if (game.player1Id === userid || game.player2Id === userid)
            return this.gameStatus[1];
        else if (!game.inProgress)
            return this.gameStatus[0];
        else
            return this.gameStatus[2];
    }
}

export default ListGame;
