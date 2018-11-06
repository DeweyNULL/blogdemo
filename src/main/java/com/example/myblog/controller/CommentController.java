package com.example.myblog.controller;

import com.example.myblog.entity.Comment;
import com.example.myblog.entity.JsonResultSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * @auther : Dewey
 * @date : 2018/11/6 10 25
 * @description :
 */

@Controller
@RequestMapping("home")
public class CommentController {

    Logger logger = LoggerFactory.getLogger(getClass());

    @RequestMapping("/blog/{id}/saveComment")
    public ResponseEntity<JsonResultSet> commentSave(@PathVariable Long id, @RequestBody Comment comment , HttpServletRequest request){
        JsonResultSet jsonResultSet = new JsonResultSet();

        logger.info(id.toString());
        logger.info(comment.toString());
        if(!id.equals(comment.getEssayId())){  //如果这里不相等说明有抓包修改
            jsonResultSet.setStatusCode("1");
            jsonResultSet.setResultData("对不上文章编号");
            return ResponseEntity.ok(jsonResultSet);
        }

        return ResponseEntity.ok(jsonResultSet);
    }
}
