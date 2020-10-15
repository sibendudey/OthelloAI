package com.othelloai.game.gamerules;

import com.othelloai.game.Game;

public interface GameRule {
    boolean gameRule(Game game);

    static GameRule oneOnOneGameRule() {
        return game -> game.getBoard().chars().noneMatch(c -> c == Game.SQUARE.PLAYABLE.getValue());
    }
}
