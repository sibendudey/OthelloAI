package com.othelloai.authentication;

import com.othelloai.exceptions.UserNotFoundException;
import com.othelloai.user.User;
import com.othelloai.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class AuthenticationController {

    UserRepository userRepository;

    @Autowired
    public AuthenticationController(UserRepository userRepository)  {
        this.userRepository = userRepository;
    }

    @PostMapping(value = "/signup", consumes = "text/plain")
    public User signUp(@RequestBody String emailId) {
        Optional<User> user = userRepository.findOneByEmail(emailId);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new UserNotFoundException();
        }
    }
}
