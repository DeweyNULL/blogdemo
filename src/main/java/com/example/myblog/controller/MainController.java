package com.example.myblog.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * @auther : Dewey
 * @date : 2018/9/11 19 30
 * @description :
 */


@Controller
public class MainController {

    Logger logger = LoggerFactory.getLogger(getClass());


    @RequestMapping("/home")
    public String jump2home(Model model , HttpServletRequest request){
        HttpSession session = request.getSession();
        String username = (String) session.getAttribute("ACCOUNT_IN_SESSION");
        if(!stringIsNull(username)){
            StringBuffer url = request.getRequestURL();
            logger.info(url.toString());
            url.replace(url.length()-4,url.length(),"write");
            logger.info(url.toString());
            model.addAttribute("editAddr",url.toString());
        }
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

    private boolean stringIsNull(String temp){
        return (temp==null || "".equals(temp));
    }
}
