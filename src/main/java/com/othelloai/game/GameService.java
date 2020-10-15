package com.othelloai.game;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.othelloai.players.*;
import com.othelloai.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.rest.core.event.AfterSaveEvent;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class GameService {

    private AbstractPlayer greedyPlayer;

    @Autowired
    private GameRepository gameRepository;


    @Autowired
    private AbstractPlayerRepository abstractPlayerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    ApplicationEventPublisher applicationEventPublisher;

    private ScheduledExecutorService executorService;

    @PostConstruct
    public void init()  {
        Optional<AbstractPlayer> player = abstractPlayerRepository.findAbstractPlayerByUser_Id(Long.valueOf(5));
        greedyPlayer = player.orElseGet(() -> abstractPlayerRepository.save(new GreedyPlayer(userRepository.findOne(Long.valueOf(5)))));
        executorService = Executors.newSingleThreadScheduledExecutor();
    }

    public List<GameInfo> gamesForLobby()   {
        List<GameInfo> gameInfos = new ArrayList<>();
        for (Game g : gameRepository.findByWinnerIsNull()) {
            GameInfo gameInfo = new GameInfo();
            gameInfo.id = g.getId();
            gameInfo.gameName = g.getGameName();
            gameInfo.inProgress = g.inProgress();

            if (g.getPlayer1() != null)
                gameInfo.player1Id = g.getPlayer1().user().getId();

            if (g.getPlayer2() != null)
                gameInfo.player2Id = g.getPlayer2().user().getId();

            gameInfos.add(gameInfo);
        }
        return gameInfos;
    }

    public Game makeMove(GameController.Square square) {
        Game game = gameRepository.findOne(square.id);
        Game nextState = game.mark(square.i, square.j);
        executorService.schedule(() -> {
            if (game.getGameType().equals(Game.GameType.OneVsAI))   {
                Game afterAIMoveState = gameRepository.save(greedyPlayer.nextMove(-1, -1, nextState));
                applicationEventPublisher.publishEvent(new AfterSaveEvent(afterAIMoveState));
            }
        }, 3, TimeUnit.SECONDS);

        return gameRepository.save(nextState);
    }

    public Game createGame(Game game, Long userId) {
        Optional<AbstractPlayer> player = abstractPlayerRepository.findAbstractPlayerByUser_Id(userId);
        AbstractPlayer humanPlayer = player.orElseGet(() -> new HumanPlayerImpl(userRepository.findOne(userId)));
        abstractPlayerRepository.save(humanPlayer);
        game.setPlayer1(humanPlayer);
        if (game.getGameType().equals(Game.GameType.OneVsAI))   {
            game.setPlayer2(greedyPlayer);
        }

        return gameRepository.save(game);
    }


    public static class GameInfo    {
        @JsonProperty
        Long id;
        @JsonProperty
        String gameName;
        @JsonProperty
        boolean inProgress;
        @JsonProperty
        Long player1Id;
        @JsonProperty
        Long player2Id;
    }
}
