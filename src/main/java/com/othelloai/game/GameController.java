package com.othelloai.game;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @RequestMapping(value = "/game/fetchGames", method = RequestMethod.GET, produces = "application/json")
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

    @RequestMapping(value = "/game/newgame", method = RequestMethod.POST, produces="application/json")
    @ResponseBody
    public String newGame(@RequestBody String gameName) {
        Game game = new Game(gameName);
        gameRepository.save(game);
//        String json = game.toJson();
//        System.out.println(json);
//        return game.toJson();
        return null;
    }
}
