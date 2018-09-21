package com.othelloai.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static java.lang.Long.parseLong;

@RestController
public class UserController {

    @Autowired UserService userService;

        @RequestMapping(value = "/user/stats/{userId}", method = RequestMethod.GET)
    public List<UserService.GameStatsData> userGameStats(@PathVariable("userId") String userId)  {
        return userService.userStats(parseLong(userId));
    }
}
