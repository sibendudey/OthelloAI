package com.othelloai.players;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AbstractPlayerRepository extends CrudRepository<AbstractPlayer, Long> {
    Optional<AbstractPlayer> findAbstractPlayerByUser_Id(Long userId);
}
