package com.example.myblog.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @auther : Dewey
 * @date : 2018/11/6 16 52
 * @description :
 */
@Controller
public class EditController {

    Logger logger = LoggerFactory.getLogger(getClass());

    @RequestMapping("/editSave")
    @ResponseBody
    public String editSave(@RequestBody String content){

        logger.info(content);
        return content;
    }
}
