package com.othelloai.players;

import com.othelloai.game.Game;
import com.othelloai.user.User;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@DiscriminatorColumn(name = "player_type")
public abstract class AbstractPlayer implements Player {
    @GeneratedValue @Id private long UUID;

    @OneToOne
    protected User user;

    AbstractPlayer()    {}
    AbstractPlayer(User user)   {
        this.user = user;
    }

    @Override
    public User user() {
        return user;
    }

    public abstract Game nextMove(int row, int col, Game game);
}
