package com.example.myblog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @auther : Dewey
 * @date : 2018/9/11 19 30
 * @description :
 */


@Controller
public class MainController {
    @RequestMapping("/home")
    public String jump2home(){
        return "laydemo";
    }

}
