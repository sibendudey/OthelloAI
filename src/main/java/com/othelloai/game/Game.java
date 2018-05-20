package com.othelloai.game;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.othelloai.user.User;
import lombok.Data;

import javax.persistence.*;
import java.io.IOException;
import java.util.Collections;

@Data
@Entity
public class Game{

    private static final int BOARD_SIZE = 8;
    private static final int PLAYER_1_TURN = 0;
    private static final int PLAYER_2_TURN = 1;
    private static final String INITIAL_BOARD =
            String.join("", Collections.nCopies(64, String.valueOf(SQUARE.NON.getValue())));

    private @Id @GeneratedValue Long Id;
    private String gameName;
    // 0 means 1st player turn and 1 means 2nd player turn
    private int turn;

//    private boolean inProgress;
//    private boolean isCompleted;

    @ManyToOne
    private User player1;

    @ManyToOne
    private User player2;

    @OneToOne
    private User winner;

    @JsonGetter("score1")
    public int getScore1()  {
        return this.board.chars().map(sqr -> {
            if (sqr == SQUARE.BLACK.getValue()) return 1;
            else return 0;
        }).sum();
    }

    @JsonGetter("inProgress")
    public boolean inProgress() {
        return player2 != null && winner == null;
    }

    @JsonGetter("isFinished")
    public boolean finished()   {
        return winner != null;
    }

//    @JsonGetter("player1id")
//    public long player1Id(){
//        return player1 == null ? -1 : player1.getId();
//    }
//
//    @JsonGetter("player2id")
//    public long player2Id(){
//        return player2 == null ? -1 : player2.getId();
//    }

    @JsonGetter("score2")
    public int getScore2()  {
        return this.board.chars().map(sqr -> {
            if (sqr == SQUARE.BLACK.getValue()) return 1;
            else return 0;
        }).sum();
    }

    @JsonGetter("player1info")
    public PlayerInfo getPlayerInfo1()   {
        return new PlayerInfo(player1.getId(), player1.getUserName(), turn == 0);
    }

    @JsonGetter("player2info")
    public PlayerInfo getPlayerInfo2()   {
        if (player2 == null) return null;
        return new PlayerInfo(player2.getId(), player2.getUserName(), turn == 1);
    }

    // Guy choosing black color is assigned to player1
    // Guy playing with white color is assigned

    // Represent the board as a string.
    private String board;

    @JsonGetter("board")
    public String board()   {
        if (this.board == null)  {
            StringBuilder board = new StringBuilder(INITIAL_BOARD);
            board.setCharAt(27, SQUARE.WHITE.getValue());
            board.setCharAt(28, SQUARE.BLACK.getValue());
            board.setCharAt(35, SQUARE.BLACK.getValue());
            board.setCharAt(36, SQUARE.WHITE.getValue());
            board.setCharAt(19, SQUARE.PLAYABLE.getValue());
            board.setCharAt(26, SQUARE.PLAYABLE.getValue());
            board.setCharAt(44, SQUARE.PLAYABLE.getValue());
            board.setCharAt(37, SQUARE.PLAYABLE.getValue());
            this.board = board.toString();
        }
        return this.board;
    }

    private enum SQUARE {

        WHITE('O'), BLACK('X'), NON('|'), PLAYABLE('?');
        private char square;

        SQUARE(char s) {
            this.square = s;
        }

        public char getValue() {
            return square;
        }

    }

    public Game()   {

    }

    public Game(String gameName) {
        this.gameName = gameName;
    }

    public void mark(int row, int col) {
        int pos = row * BOARD_SIZE + col;
        switch (turn) {
            case PLAYER_1_TURN: {
                char boardChar[] = board.toCharArray();
                boardChar[pos] = SQUARE.BLACK.getValue();
                this.board = new String(boardChar);
                break;
            }
            case PLAYER_2_TURN: {
                char boardChar[] = board.toCharArray();
                boardChar[pos] = SQUARE.WHITE.getValue();
                this.board = new String(boardChar);
            }
        }
    }


    private class PlayerInfo {
        @JsonProperty
        Long id;
        @JsonProperty
        String userName;
        @JsonProperty
        boolean isTurn;

        PlayerInfo()    {}

        PlayerInfo(Long id, String userName, boolean isTurn) {
            this.id = id;
            this.userName = userName;
            this.isTurn = isTurn;
        }
    }

//    public String toJson() {
//        ObjectMapper mapper = new ObjectMapper();
//
//        SimpleModule module = new SimpleModule();
//        module.addSerializer(Game.class, new GameSerializer());
//        mapper.registerModule(module);
//
//        try {
//            return mapper.writeValueAsString(this);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        return null;
//    }
//
//    private static class GameSerializer extends StdSerializer<Game> {
//
//        public GameSerializer() {
//            this(null);
//        }
//
//        public GameSerializer(Class<Game> t) {
//            super(t);
//        }
//
//        @Override
//        public void serialize(Game value, JsonGenerator gen, SerializerProvider provider) throws IOException {
//            gen.writeStartObject();
//
//            int score1 = value.board.chars().map(sqr -> {
//                if (sqr == SQUARE.BLACK.getValue())
//                    return 1;
//                else return 0;
//            }).sum();
//
//            int score2 = value.board.chars().map(sqr -> {
//                if (sqr == SQUARE.BLACK.getValue()) return 1;
//                else return 0;
//            }).sum();
//
////            gen.writeNumberField("player1", value.player1);
////            gen.writeNumberField("player2", value.player2);
////            gen.writeStringField("board", value.board);
////            gen.writeNumberField("turn", value.turn);
////            gen.writeNumberField("score1", score1);
////            gen.writeNumberField("score1", score2);
//
//            // Testing purpose
//            gen.writeStringField("gamename", value.gameName);
//            gen.writeStringField("player1", "sibendu");
//            gen.writeStringField("player2", "tinku");
//            gen.writeStringField("board", value.board);
//            gen.writeStringField("next_turn", "sibendu");
//            gen.writeNumberField("score1", 2);
//            gen.writeNumberField("score1", 2);
//        }
//    }
}