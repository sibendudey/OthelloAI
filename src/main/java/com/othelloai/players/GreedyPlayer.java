package com.othelloai.players;

import com.othelloai.game.Game;
import com.othelloai.game.GameHelper;
import com.othelloai.user.User;

import javax.persistence.Entity;
import java.awt.*;
import java.util.ArrayList;

@Entity
public class GreedyPlayer extends AbstractPlayer {

    public GreedyPlayer(User user) {
        super(user);
    }

    public GreedyPlayer()  {}

    @Override
    public Game nextMove(int row, int col, Game game) {

        int[][] board = new int[8][8];

        for (int i = 0 ; i < 8 ; i ++)  {
            for (int j = 0 ; j < 8 ; j++)   {
                 char posOccupied = game.getBoard().charAt(i * 8 + j);
                 if (posOccupied == Game.SQUARE.BLACK.getValue())  {
                     board[i][j] = 1;
                 }
                 else if (posOccupied == Game.SQUARE.WHITE.getValue())  {
                     board[i][j] = 2;
                 }
            }
        }

        // Assuming greedy player is always player number 2.
        ArrayList<Point> myPossibleMoves = GameHelper.getAllPossibleMoves(board, 2);

        Point bestMove = null;
        int bestValue = 0;

        for (Point move : myPossibleMoves) {
            int val = GameHelper.getReversePoints(board, 2, move.x, move.y).size();
            if (val > bestValue) {
                bestValue = val;
                bestMove = move;
            }
        }

        return game.mark(bestMove.x, bestMove.y);
    }
}
