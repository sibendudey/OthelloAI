package com.othelloai.socket;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.othelloai.game.Game;
import com.othelloai.game.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @RequestMapping(value = "/games/fetchGames", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public JsonNode games() {
        ObjectMapper om = new ObjectMapper();
        JsonNode gameLinks = om.createArrayNode();
        for (Game g : gameRepository.findAll()) {
            JsonNode gameLink = om.createObjectNode();
            ((ObjectNode) gameLink).put("name", g.getGameName());
            ((ObjectNode) gameLink).put("inProgress", true);
            ((ArrayNode) gameLinks).add(gameLink);
        }

        return gameLinks;
    }
}
