package com.othelloai.user;

import com.othelloai.game.Game;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<UserService.GameStatsData> userStats(long userId) {
        User user = userRepository.findOneById(userId);
        final List<GameStatsData> gameStatsDataList = new ArrayList<>();
        user.getGames1()
                .stream()
                .filter(g -> g.finished())
                .forEach((g) -> gameStatsDataList.add(GameStatsDataFactory.createGameStatsData(g)));

        user.getGames2()
                .stream()
                .forEach(g -> gameStatsDataList.add(GameStatsDataFactory.createGameStatsData(g)));

        return gameStatsDataList;
    }

    private static class GameStatsDataFactory {
        public static GameStatsData createGameStatsData(Game g) {
            return new GameStatsData(g.getWinner().getUserName(),
                    g.getWinner().equals(g.getPlayer1()) ? g.getPlayer2().getUserName() : g.getPlayer1().getUserName(),
                    g.getWinner().getId());
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
