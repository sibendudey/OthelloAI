package com.othelloai.user;

import com.othelloai.game.Game;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    User findOneByEmail(String email);
    User findOneById(Long id);
}
