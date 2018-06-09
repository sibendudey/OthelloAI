/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.othelloai.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.othelloai.game.Game;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@ToString(exclude = {"games1", "games2", "winningGames"})
@EqualsAndHashCode(exclude = {"games1", "games2"})
public class User {

	private @Id @GeneratedValue Long id;
	private String userName;

    @Column(unique = true)
	private String email;

    @JsonIgnore
    @OneToMany(mappedBy = "player1")
	private Set<Game> games1;

    @JsonIgnore
    @OneToMany(mappedBy = "player2")
	private Set<Game> games2;

    @JsonIgnore
	@OneToMany(mappedBy = "winner")
	private Set<Game> winningGames;

	private User() {}

	public User(String userName, String email) {
		this.userName = userName;
		this.email = email;
	}
}