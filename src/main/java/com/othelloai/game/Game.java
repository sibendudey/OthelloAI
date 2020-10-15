package com.othelloai.game;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.othelloai.players.AbstractPlayer;
import com.othelloai.players.Player;
import com.othelloai.game.gamerules.GameRule;
import lombok.Data;
import lombok.ToString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.stream.Stream;

@Data
@Entity
@ToString(exclude = {"player1", "player2"})
public class Game {

    private static final Logger logger = LoggerFactory.getLogger(Game.class.getName());
    private static final int BOARD_SIZE = 8;
    private static final int PLAYER_1_TURN = 0;
    private static final int PLAYER_2_TURN = 1;
    private static final String INITIAL_BOARD =
            String.join("", Collections.nCopies(64, String.valueOf(SQUARE.BLANK.getValue())));

    public enum GameType    {
        OneVsOne, OneVsAI, AIvsAI;
    }

    private GameType gameType;

    private @Id
    @GeneratedValue
    Long Id;

    @NotNull
    private String gameName;

    // 0 means 1st player turn and 1 means 2nd player turn
    @JsonIgnore
    private int turn;

    @ManyToOne(targetEntity = AbstractPlayer.class)
    @JoinColumn(name = "player1_fk")
    private Player player1;

    @ManyToOne(targetEntity = AbstractPlayer.class)
    @JoinColumn(name = "player2_fk")
    private Player player2;

    @OneToOne(targetEntity = com.othelloai.players.AbstractPlayer.class)
    private Player winner;
    // Represent the board as a string.
    private String board = getInitialBoard();

    @Transient
    @JsonIgnore
    private GameRule winnerRule = GameRule.oneOnOneGameRule();

    public Game() {
    }

    public Game(String gameName) {
        this.gameName = gameName;
    }

    @JsonIgnore
    public Player getWinner() {
        return winner;
    }

    @JsonIgnore
    public Player getPlayer1() {
        return player1;
    }

    @JsonProperty("player1")
    public void setPlayer1(Player player) {
        this.player1 = player;
    }

    @JsonIgnore
    public Player getPlayer2() {
        return player2;
    }

    @JsonProperty("player2")
    public void setPlayer2(Player user) {
        this.player2 = user;
    }

    @JsonGetter("score1")
    public int getScore1() {
        return this.board.chars().map(sqr -> {
            if (sqr == SQUARE.BLACK.getValue()) return 1;
            else return 0;
        }).sum();
    }

    @JsonGetter("winnerinfo")
    public JsonNode winnerId()  {
        if (winner != null) {
            ObjectMapper om = new ObjectMapper();
            JsonNode jsonNode = om.createObjectNode();
            ((ObjectNode) jsonNode).put("id", winner.user().getId());
            ((ObjectNode)jsonNode).put("userName", winner.user().getUserName());
            return jsonNode;
        }

        return null;
    }

    @JsonGetter("inProgress")
    public boolean inProgress() {
        return player2 != null && winner == null;
    }

    @JsonGetter("isFinished")
    public boolean finished() {
        return winner != null;
    }

    // Guy choosing black color is assigned to player1
    // Guy playing with white color is assigned

    @JsonGetter("score2")
    public int getScore2() {
        return this.board.chars().map(sqr -> {
            if (sqr == SQUARE.WHITE.getValue()) return 1;
            else return 0;
        }).sum();
    }

    @JsonGetter("player1info")
    public PlayerInfo getPlayerInfo1() {
        return new PlayerInfo(player1.user().getId(), player1.user().getUserName(), turn == 0, getScore1());
    }

    @JsonGetter("player2info")
    public PlayerInfo getPlayerInfo2() {
        if (player2 == null) return null;
        return new PlayerInfo(player2.user().getId(), player2.user().getUserName(), turn == 1, getScore2());
    }


    private String getInitialBoard() {
        StringBuilder board = new StringBuilder(INITIAL_BOARD);
        board.setCharAt(27, SQUARE.WHITE.getValue());
        board.setCharAt(28, SQUARE.BLACK.getValue());
        board.setCharAt(35, SQUARE.BLACK.getValue());
        board.setCharAt(36, SQUARE.WHITE.getValue());
        board.setCharAt(19, SQUARE.PLAYABLE.getValue());
        board.setCharAt(26, SQUARE.PLAYABLE.getValue());
        board.setCharAt(44, SQUARE.PLAYABLE.getValue());
        board.setCharAt(37, SQUARE.PLAYABLE.getValue());
        return board.toString();
    }

    public Game mark(int row, int col) {
        int pos = row * BOARD_SIZE + col;
        switch (turn) {
            case PLAYER_1_TURN: {
                char[] boardChar = board.toCharArray();
                boardChar[pos] = SQUARE.BLACK.getValue();
                this.board = new String(boardChar);
                break;
            }
            case PLAYER_2_TURN: {
                char[] boardChar = board.toCharArray();
                boardChar[pos] = SQUARE.WHITE.getValue();
                this.board = new String(boardChar);
            }
        }

        nextState(row, col);

        return this;
    }

    private void nextState(final int row, final int col) {
        // Reverse the colors
        Stream.of(-1, 0, 1).forEach((i) -> {
            Stream.of(-1, 0, 1).forEach(j -> {
                if (i != 0 || j != 0) {
                    if (adjacentOppColor(row + i, col + j) && isPossibleDirection(row, col, i, j)) {
                        changeSquare(row, col, i, j);
                    }
                }
            });
        });

        convertAllPlayableToBlank();

        // Check for available moves
        // For every vacant box, for the next turn, see if it is a valid move,
        // if found any coordinates, return , or else try for same player
        turn = turn == PLAYER_1_TURN ? PLAYER_2_TURN : PLAYER_1_TURN;

        calculateAvailableMove();

        if (this.board.chars().noneMatch(c -> c == SQUARE.PLAYABLE.getValue()))  {
            turn = turn == PLAYER_1_TURN ? PLAYER_2_TURN : PLAYER_1_TURN;
            calculateAvailableMove();
        }

        // Declares a winner if none of them is able to make a move
        if (winnerRule.gameRule(this)) {
            declareWinner();
        }

    }

    private void convertAllPlayableToBlank() {
        this.board = board.chars().mapToObj(c -> {
            if (c == SQUARE.PLAYABLE.getValue())
                return SQUARE.BLANK.getValue();
            else
                return (char)c;
        }).collect(StringBuilder::new, StringBuilder::append, StringBuilder::append).toString();
    }

    private void declareWinner() {
        if (getScore1() > getScore2())  {
            winner = player1;
        }
        else    {
            winner = player2;
        }
    }

    public void dummyMove() {
        calculateAvailableMove();
    }

    private void calculateAvailableMove() {
        char[] squares = board.toCharArray();

        for (int i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
            if (squares[i] == SQUARE.BLANK.getValue() && nextAvailableSquare(i))
                squares[i] = SQUARE.PLAYABLE.getValue();
        }

        this.board = new String(squares);
    }

    private boolean nextAvailableSquare(int i) {
        int row = i / BOARD_SIZE;
        int col = i % BOARD_SIZE;

        for (int m = -1; m <= 1; m++) {
            for (int n = -1; n <= 1; n++) {
                if (adjacentOppColor(row + m, col + n) && isPossibleDirection(row, col, m, n))
                    return true;
            }
        }

        return false;
    }

    private void changeSquare(int row, int col, Integer i, Integer j) {

        // Problem lies here. ??
        char[] squares = board.toCharArray();

        row = row + i;
        col = col + j;

        while ((row >= 0 && row < BOARD_SIZE) && (col >= 0 && col < BOARD_SIZE)) {

            int pos = row * BOARD_SIZE + col;

            if (turn == PLAYER_1_TURN) {
                if (squares[pos] == SQUARE.BLACK.getValue()) {
                    this.board = new String(squares);
                    return;
                }
                logger.debug("Setting row: {}, col: {} to black", row, col);
                squares[row * BOARD_SIZE + col] = SQUARE.BLACK.getValue();
            } else if (turn == PLAYER_2_TURN) {
                if (squares[pos] == SQUARE.WHITE.getValue()) {
                    this.board = new String(squares);
                    return;
                }
                logger.debug("Setting row: {}, col: {} to white", row, col);
                squares[row * BOARD_SIZE + col] = SQUARE.WHITE.getValue();
            }

            row = row + i;
            col = col + j;
        }

    }

    private boolean isPossibleDirection(int row, int col, Integer i, Integer j) {

        logger.debug("is Possible direction, row: {}, col: {}, i: {}, j: {}", row, col, i, j);

        row = row + i;
        col = col + j;

        while ((row >= 0 && row < BOARD_SIZE) && (col >= 0 && col < BOARD_SIZE)) {

            if (board.charAt(row * BOARD_SIZE + col ) == SQUARE.BLANK.getValue())
                return false;

            if (turn == PLAYER_1_TURN) {
                if (board.charAt(row * BOARD_SIZE + col) == SQUARE.BLACK.getValue())
                    return true;
            } else if (turn == PLAYER_2_TURN) {
                if (board.charAt(row * BOARD_SIZE + col) == SQUARE.WHITE.getValue())
                    return true;
            }

            row = row + i;
            col = col + j;
        }

        logger.debug("Returning false!!!!");
        return false;
    }

    private boolean adjacentOppColor(int row, int col) {

        logger.debug("adjacentOppColor, row: {}, col: {}", row, col);

        if (turn == PLAYER_1_TURN) {
            return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE &&
                    board.charAt(row * BOARD_SIZE + col) == SQUARE.WHITE.getValue();
        } else if (turn == PLAYER_2_TURN) {
            return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE &&
                    board.charAt(row * BOARD_SIZE + col) == SQUARE.BLACK.getValue();
        }

        return false;
    }

    public enum SQUARE {

        WHITE('O'), BLACK('X'), BLANK('|'), PLAYABLE('?');
        private char aSquare;

        SQUARE(char s) {
            this.aSquare = s;
        }

        public char getValue() {
            return aSquare;
        }
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

        PlayerInfo() {
        }

        PlayerInfo(Long id, String userName, boolean isTurn, int score) {
            this.id = id;
            this.userName = userName;
            this.isTurn = isTurn;
            this.score = score;
        }
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof Game && this.Id.equals(((Game) obj).Id);
    }

    @Override
    public int hashCode() {
        return this.Id.hashCode();
    }
}