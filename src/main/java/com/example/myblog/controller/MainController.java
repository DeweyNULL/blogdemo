package com.example.myblog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
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

    @RequestMapping("/home/blog/{id}")
    public String jump2BlogPage(@PathVariable Long id,Model model){
        String blogId = id.toString();
        model.addAttribute("blogId",blogId);
        return "laydemo";
    }

    @RequestMapping("/write")
    public String jump2BlogWrite(){
        return "editPage";
    }
}
