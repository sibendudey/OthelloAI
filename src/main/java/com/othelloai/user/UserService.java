package com.othelloai.user;

import com.othelloai.game.Game;
import com.othelloai.game.GameRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    GameRepository gameRepository;

    public List<UserService.GameStatsData> userStats(long userId) {

        return gameRepository.findAllByPlayer1OrPlayer2(userId, userId)
                .stream()
                .map(GameStatsDataFactory::createGameStatsData)
                .collect(Collectors.toList());
    }

    private static class GameStatsDataFactory {
        public static GameStatsData createGameStatsData(Game g) {
            return new GameStatsData(g.getWinner().user().getUserName(),
                    g.getWinner().equals(g.getPlayer1()) ? g.getPlayer2().user().getUserName() : g.getPlayer1().user().getUserName(),
                    g.getWinner().user().getId());
        }
    }

    @Data
    public static class GameStatsData {
        private String winner;
        private String loser;
        private Long winnerId;

        public GameStatsData(String winner, String loser, Long winnerId) {
            this.winner = winner;
            this.loser = loser;
            this.winnerId = winnerId;
        }
    }


}
