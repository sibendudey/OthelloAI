package com.othelloai.game;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private SimpMessagingTemplate websocket;

    private final static String MESSAGE_PREFIX = "/games";

    @RequestMapping(value = "/game/fetchGames", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public JsonNode games() {
        ObjectMapper om = new ObjectMapper();
        JsonNode gameLinks = om.createArrayNode();
        for (Game g : gameRepository.findAll()) {
            JsonNode gameLink = om.createObjectNode();
            ((ObjectNode) gameLink).put("id", g.getId());
            ((ObjectNode) gameLink).put("name", g.getGameName());
            ((ObjectNode) gameLink).put("inProgress", g.inProgress());
            ((ArrayNode) gameLinks).add(gameLink);
        }

        return gameLinks;
    }

    @RequestMapping(value = "/game/markSquare", method = RequestMethod.POST, consumes = "application/json")
    public void markSquare(@RequestBody Square square)    {
        Game game = gameRepository.findOne(square.id);
        gameRepository.save(game.mark(square.i, square.j));
        this.websocket.convertAndSend(MESSAGE_PREFIX + "/" + game.getId() , game);
    }

    @Data
    private static class Square    {
        long id;
        int i, j;
        Square()    {}
        Square(long id, int i, int j)    {
            this.id = id;
            this.i = i;
            this.j = j;
        }
    }
}
