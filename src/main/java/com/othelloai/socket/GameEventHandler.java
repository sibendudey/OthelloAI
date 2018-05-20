package com.othelloai.socket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.fasterxml.jackson.databind.util.JSONWrappedObject;
import com.othelloai.game.Game;
import com.othelloai.game.GameRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler(Game.class)
public class GameEventHandler {

    private final Logger log = LoggerFactory.getLogger(this.getClass().getName());
    private final SimpMessagingTemplate websocket;
    private final EntityLinks entityLinks;
    private final static String MESSAGE_PREFIX = "/games";

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    public GameEventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks)   {
        this.entityLinks = entityLinks;
        this.websocket = websocket;
    }

    @HandleAfterCreate
    public void newGame(Game game) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/newGame", getGames());
    }

    @HandleAfterDelete
    public void deleteGame(Game game) {
        this.websocket.convertAndSend(
                MESSAGE_PREFIX + "/deleteGame", getPath(game));
    }

    @HandleAfterSave
    public void updateGame(Game game) {
//        this.websocket.convertAndSend(
//                MESSAGE_PREFIX + "/updateGame", getPath(game));

        this.websocket.convertAndSend(MESSAGE_PREFIX + "/" + game.getId() , game);
    }

    /**
     * Take an {@link Game} and get the URI using
     * Spring Data REST's {@link EntityLinks}.
     *
     * @param game
     */
    private String getPath(Game game) {
        return this.entityLinks.linkForSingleResource(game.getClass(),
                game.getId()).toUri().getPath();
    }

    private JsonNode getGames()   {
        ObjectMapper om = new ObjectMapper();
        JsonNode gameLinks = om.createArrayNode();


        for (Game g : gameRepository.findAll()) {
            JsonNode gameLink = om.createObjectNode();
            ((ObjectNode) gameLink).put("name", g.getGameName());
            ((ObjectNode) gameLink).put("inProgress", g.inProgress());
            ((ArrayNode) gameLinks).add(gameLink);
        }

        return gameLinks;
    }
}
