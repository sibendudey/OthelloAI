import React from 'react';
import {connect} from 'react-redux';

import {Row, Card, CardText} from 'reactstrap';

export class StatsPage extends React.Component {
    constructor(props) {
        super(props);
        this.getText = this.getText.bind(this);
    }

    render() {

        if (!this.props.statsGames)
            return <div>
                You have not completed any game
            </div>;


        return <div>
            this.props.statsGames.map((g) =>
             return <Row>
                <Card body>
                    <CardText>{this.getText(g)}</CardText>
                </Card>
                </Row>;
        );
        </div>;
    }

    getText(game) {
        return this.props.profile.id === game.winnerId ?
            "You defeated " + game.loser : "You were defeated by " + loser;
    }
}

export default connect(({profile, gameStats}) => Object.assign({}, {profile, gameStats}))(StatsPage);



