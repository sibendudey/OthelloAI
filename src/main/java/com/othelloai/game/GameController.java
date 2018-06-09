package com.othelloai.game;

import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.rest.core.event.AfterSaveEvent;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

import static java.lang.Long.parseLong;

@RestController
public class GameController {

    private final Logger log = LoggerFactory.getLogger(this.getClass().getName());
    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private SimpMessagingTemplate websocket;

    private final static String MESSAGE_PREFIX = "/games";

    @Autowired
    private ApplicationEventPublisher publisher;

    @Autowired
    GameService gameService;

    @RequestMapping(value = "/game/fetchGames", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<GameService.GameInfo> games() {
        return gameService.gamesForLobby();
    }

    @RequestMapping(value = "/game/markSquare", method = RequestMethod.POST, consumes = "application/json")
    public void markSquare(@RequestBody Square square)    {
        Game game = gameRepository.findOne(square.id);
        gameRepository.save(game.mark(square.i, square.j));
        publisher.publishEvent(new AfterSaveEvent(game));
    }

    @Data
    private static class Square    {
        Long id;
        Integer i, j;
        Square()    {}
        Square(Long id, Integer i, Integer j)    {
            this.id = id;
            this.i = i;
            this.j = j;
        }
    }
}
