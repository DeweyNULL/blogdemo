package com.example.myblog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class HelloWorldController {
    @RequestMapping("/hello")
    public String helloController(){
        return "home";
    }

    @RequestMapping("/edit")
    public String jump2edit(){return "editPage";}
}
