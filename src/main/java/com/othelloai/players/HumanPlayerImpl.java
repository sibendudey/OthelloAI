package com.othelloai.players;

import com.othelloai.game.Game;
import com.othelloai.user.User;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("HumanPlayer")
public class HumanPlayerImpl extends AbstractPlayer {
    public HumanPlayerImpl(User user) {
        super(user);
    }

    public HumanPlayerImpl()    {}

    @Override
    public Game nextMove(int row, int col, Game game) {
        return game.mark(row, col);
    }
}
