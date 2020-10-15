package com.othelloai.game.gamerules;

import com.othelloai.game.Game;
import com.othelloai.game.Game.SQUARE;
import org.springframework.stereotype.Component;

@Component("winnerRule")
public class WinnerRule implements GameRule {
    @Override
    public boolean gameRule(Game game) {
        // Declares a winner if none of them is able to make a move
        return game.getBoard().chars().noneMatch(c -> c == SQUARE.PLAYABLE.getValue());
    }
}
