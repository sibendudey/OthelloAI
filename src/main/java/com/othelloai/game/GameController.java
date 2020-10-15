package com.othelloai.game;

import com.othelloai.players.AbstractPlayerRepository;
import com.othelloai.user.UserRepository;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.rest.core.event.AfterSaveEvent;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
public class GameController {

    private final Logger log = LoggerFactory.getLogger(this.getClass().getName());

    private final SimpMessagingTemplate websocket;

    private final static String MESSAGE_PREFIX = "/games";

    private final ApplicationEventPublisher publisher;

    final GameService gameService;

    private final UserRepository userRepository;
    private final AbstractPlayerRepository abstractPlayerRepository;


    @Autowired
    public GameController(GameRepository gameRepository,
                          SimpMessagingTemplate websocket,
                          ApplicationEventPublisher publisher,
                          GameService gameService,
                          UserRepository userRepository, AbstractPlayerRepository abstractPlayerRepository) {
        this.websocket = websocket;
        this.publisher = publisher;
        this.gameService = gameService;
        this.userRepository = userRepository;
        this.abstractPlayerRepository = abstractPlayerRepository;
    }

    @GetMapping(value = "/game/fetchGames", produces = "application/json")
    @ResponseBody
    public List<GameService.GameInfo> games() {
        return gameService.gamesForLobby();
    }

    @PostMapping(value = "/game/markSquare", consumes = "application/json")
    public void markSquare(@RequestBody Square square) {
        Game game = gameService.makeMove(square);
        publisher.publishEvent(new AfterSaveEvent(game));
    }

    @PostMapping(value = "/game/createGame", consumes = "application/json")
    public Game createGame(@RequestBody CreateGame createGame) {
        log.info("Request for creation of game with the following parameters: {}", createGame);
        Game game = new Game(createGame.gameName);
        game.setGameType(createGame.gameType);
        return gameService.createGame(game, createGame.userId);
    }

    @Data
    static class CreateGame {
        String gameName;
        Long userId;
        Game.GameType gameType;

        CreateGame() { }

        CreateGame(String gameName, Long userId, Game.GameType gameType) {
            this.gameName = gameName;
            this.userId = userId;
            this.gameType = gameType;
        }

        @Override
        public String toString() {
            return ("GameName: " + gameName) + "," + ("Player userId: " + userId) + "," + ("gameType: " + gameType.toString());
        }
    }

    @Data
    static class Square {
        Long id;
        Integer i, j;

        Square() {
        }

        Square(Long id, Integer i, Integer j) {
            this.id = id;
            this.i = i;
            this.j = j;
        }
    }
}
