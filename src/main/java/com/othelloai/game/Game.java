package com.othelloai.game;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.othelloai.user.User;
import lombok.Data;
import javax.persistence.*;
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
    @JsonIgnore
    private int turn;

    @ManyToOne
    @JsonIgnore
    private User player1;

    @ManyToOne
    @JsonIgnore
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

    @JsonGetter("score2")
    public int getScore2()  {
        return this.board.chars().map(sqr -> {
            if (sqr == SQUARE.BLACK.getValue()) return 1;
            else return 0;
        }).sum();
    }

    @JsonGetter("player1info")
    public PlayerInfo getPlayerInfo1()   {
        return new PlayerInfo(player1.getId(), player1.getUserName(), turn == 0, getScore1());
    }

    @JsonGetter("player2info")
    public PlayerInfo getPlayerInfo2()   {
        if (player2 == null) return null;
        return new PlayerInfo(player2.getId(), player2.getUserName(), turn == 1, getScore2());
    }

    // Guy choosing black color is assigned to player1
    // Guy playing with white color is assigned

    // Represent the board as a string.
    private String board = getInitialBoard();

    private String getInitialBoard()   {
//        if (this.board == null)  {
            StringBuilder board = new StringBuilder(INITIAL_BOARD);
            board.setCharAt(27, SQUARE.WHITE.getValue());
            board.setCharAt(28, SQUARE.BLACK.getValue());
            board.setCharAt(35, SQUARE.BLACK.getValue());
            board.setCharAt(36, SQUARE.WHITE.getValue());
            board.setCharAt(19, SQUARE.PLAYABLE.getValue());
            board.setCharAt(26, SQUARE.PLAYABLE.getValue());
            board.setCharAt(44, SQUARE.PLAYABLE.getValue());
            board.setCharAt(37, SQUARE.PLAYABLE.getValue());
//            this.board = board.toString();
//        }
        return board.toString();
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

    public Game mark(int row, int col) {
        int pos = row * BOARD_SIZE + col;
        switch (turn) {
            case PLAYER_1_TURN: {
                char boardChar[] = board.toCharArray();
                boardChar[pos] = SQUARE.BLACK.getValue();
                this.board = new String(boardChar);
                turn = PLAYER_2_TURN;
                break;
            }
            case PLAYER_2_TURN: {
                char boardChar[] = board.toCharArray();
                boardChar[pos] = SQUARE.WHITE.getValue();
                this.board = new String(boardChar);
                turn = PLAYER_1_TURN;
            }
        }

        return this;
    }

    private class PlayerInfo {
        @JsonProperty
        Long id;
        @JsonProperty
        String userName;
        @JsonProperty
        boolean isTurn;
        @JsonProperty
        int score;

        PlayerInfo()    {}

        PlayerInfo(Long id, String userName, boolean isTurn, int score) {
            this.id = id;
            this.userName = userName;
            this.isTurn = isTurn;
            this.score = score;
        }

    }
}