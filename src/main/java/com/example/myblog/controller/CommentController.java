package com.example.myblog.controller;

import com.example.myblog.entity.Comment;
import com.example.myblog.entity.JsonResultSet;
import com.example.myblog.entity.respVO.CommentVO;
import com.example.myblog.service.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * @auther : Dewey
 * @date : 2018/11/6 10 25
 * @description :
 */

@Controller
public class CommentController {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    CommentService commentService;

    @RequestMapping("/home/blog/{id}/saveComment/{commentReplyTo}")
    public ResponseEntity<JsonResultSet> commentSave(@PathVariable Long id, @PathVariable Long commentReplyTo,@RequestBody Comment comment , HttpServletRequest request){
        JsonResultSet jsonResultSet = new JsonResultSet();
        logger.info(commentReplyTo.toString());
        logger.info(id.toString());
        logger.info(comment.toString());
        if(!id.equals(comment.getEssayId())){  //如果这里不相等说明有抓包修改
            jsonResultSet.setStatusCode("1");
            jsonResultSet.setResultData("对不上文章编号");
            return ResponseEntity.ok(jsonResultSet);
        }

        return ResponseEntity.ok(jsonResultSet);
    }

    @RequestMapping(value = "/blogComment/{id}" ,method = RequestMethod.GET)
    public ResponseEntity<JsonResultSet> commentGet(@PathVariable Long id){
        JsonResultSet jsonResultSet = new JsonResultSet();

        try{
            jsonResultSet.setStatusCode("0");
            jsonResultSet.setResultData(commentService.getAllCommentByBlogId(id));
        }catch (Exception e){
            jsonResultSet.setStatusCode("1");
            jsonResultSet.setResultData(e.toString());
        }

        return ResponseEntity.ok(jsonResultSet);
    }

}
