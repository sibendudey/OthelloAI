package com.othelloai.players;

import com.othelloai.game.Game;
import com.othelloai.user.User;

public class AIPlayer extends AbstractPlayer{

    public AIPlayer(User user) {
        super(user);
    }

    // Don't do anything for now.
    @Override
    public Game nextMove(int row, int col, Game game) {
        return game;
    }
}
