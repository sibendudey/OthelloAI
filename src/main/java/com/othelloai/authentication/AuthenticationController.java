package com.othelloai.authentication;

import com.othelloai.exceptions.UserNotFoundException;
import com.othelloai.user.User;
import com.othelloai.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @Autowired
    UserRepository userRepository;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/signup", method = RequestMethod.POST, consumes = "text/plain")
    public User signUp(@RequestBody String emailId)  {
        User user;
        if ( (user = userRepository.findOneByEmail(emailId)) != null)    {
            return user;
        }
        else    {
            throw new UserNotFoundException();
        }
    }
}
