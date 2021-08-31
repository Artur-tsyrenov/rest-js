package ru.javamentor.restjs.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.javamentor.restjs.models.User;
import ru.javamentor.restjs.service.UserService;

@Controller
@RequestMapping("/")
public class ViewController {

    private final UserService userService;

    @Autowired
    public ViewController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String pageForUser() {
        return "myPage";
    }

    @GetMapping("findOne")
    public User findOne(int id) {
        return userService.findById(id);
    }
}
