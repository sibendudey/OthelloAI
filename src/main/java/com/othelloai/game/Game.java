package com.othelloai.game;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
    private int turn;
    // 0 means 1st player turn and 1 means 2nd player turn

    private long player1;
    private long player2;
    // Represent the board as a string.

    @JsonGetter("score1")
    public int getScore1()  {
        return this.board.chars().map(sqr -> {
            if (sqr == SQUARE.BLACK.getValue()) return 1;
            else return 0;
        }).sum();
    }

    @JsonGetter("score2")
    public int getScore2()  {
        return this.board.chars().map(sqr -> {
            if (sqr == SQUARE.BLACK.getValue()) return 1;
            else return 0;
        }).sum();
    }


    private String board = INITIAL_BOARD;
    // Guy choosing black color is assigned to player1
    // Guy playing with white color is assigned


    private enum SQUARE {

        WHITE('O'), BLACK('X'), NON('|');
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
        System.out.println("Creating a new game");
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

    public String toJson() {
        ObjectMapper mapper = new ObjectMapper();

        SimpleModule module = new SimpleModule();
        module.addSerializer(Game.class, new GameSerializer());
        mapper.registerModule(module);

        try {
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return null;
    }

    private static class GameSerializer extends StdSerializer<Game> {

        public GameSerializer() {
            this(null);
        }

        public GameSerializer(Class<Game> t) {
            super(t);
        }

        @Override
        public void serialize(Game value, JsonGenerator gen, SerializerProvider provider) throws IOException {
            gen.writeStartObject();

            int score1 = value.board.chars().map(sqr -> {
                if (sqr == SQUARE.BLACK.getValue())
                    return 1;
                else return 0;
            }).sum();

            int score2 = value.board.chars().map(sqr -> {
                if (sqr == SQUARE.BLACK.getValue()) return 1;
                else return 0;
            }).sum();

//            gen.writeNumberField("player1", value.player1);
//            gen.writeNumberField("player2", value.player2);
//            gen.writeStringField("board", value.board);
//            gen.writeNumberField("turn", value.turn);
//            gen.writeNumberField("score1", score1);
//            gen.writeNumberField("score1", score2);

            // Testing purpose
            gen.writeStringField("gamename", value.gameName);
            gen.writeStringField("player1", "sibendu");
            gen.writeStringField("player2", "tinku");
            gen.writeStringField("board", value.board);
            gen.writeStringField("next_turn", "sibendu");
            gen.writeNumberField("score1", 2);
            gen.writeNumberField("score1", 2);
        }
    }
}