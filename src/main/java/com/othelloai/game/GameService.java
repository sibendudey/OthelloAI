package com.othelloai.game;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public List<GameInfo> gamesForLobby()   {
        List<GameInfo> gameInfos = new ArrayList<>();
        for (Game g : gameRepository.findAll()) {
            GameInfo gameInfo = new GameInfo();
            gameInfo.id = g.getId();
            gameInfo.gameName = g.getGameName();
            gameInfo.inProgress = g.inProgress();

            if (g.getPlayer1() != null)
                gameInfo.player1Id = g.getPlayer1().getId();

            if (g.getPlayer2() != null)
                gameInfo.player2Id = g.getPlayer2().getId();

            gameInfos.add(gameInfo);
        }
        return gameInfos;
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
