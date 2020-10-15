package com.othelloai.dataloader;

import com.othelloai.players.HumanPlayerImpl;
import com.othelloai.game.Game;
import com.othelloai.game.GameRepository;
import com.othelloai.user.User;
import com.othelloai.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

// Uncomment the annotation if you want to load the DB in your env
//@Component
public class DatabaseLoader implements CommandLineRunner {

	private final GameRepository repository;
	@Autowired
	private UserRepository userRepository;

	@Autowired
	public DatabaseLoader(GameRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
        User player1 = this.userRepository.save(new User("sibendu", "sibendu.dey@gmail.com"));
        User player2 = this.userRepository.save(new User("dey", "deys@gmail.com"));

        Game game  = new Game("game1");

        game.setPlayer1(new HumanPlayerImpl(player1));
        game.setPlayer2(new HumanPlayerImpl(player2));
        game.setBoard("OOOOOOOXOOOOOOXXOXOXOXOXOOOOOOXXOOOOOOXXOOXOOOXXOOOOOOXXOOOXOO|X");
        game.dummyMove();
		repository.save(game);
	}
}