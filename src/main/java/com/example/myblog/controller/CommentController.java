package com.example.myblog.controller;

import com.example.myblog.entity.BlogInfo;
import com.example.myblog.entity.Comment;
import com.example.myblog.entity.JsonResultSet;
import com.example.myblog.service.BlogInfoService;
import com.example.myblog.service.CommentService;
import com.example.myblog.tools.NullTool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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

    @Autowired
    BlogInfoService blogInfoService;
    @Value("${picfile.somebodyPic}")
    String somebodyPic;

    //存评论
    @RequestMapping("/home/blog/{id}/saveComment/{commentReplyTo}")
    public ResponseEntity<JsonResultSet> commentSave(@PathVariable Long id, @PathVariable Long commentReplyTo,@RequestBody Comment comment , HttpServletRequest request){
        JsonResultSet jsonResultSet = new JsonResultSet();

        if(!id.equals(comment.getEssayId())){  //如果这里不相等说明有抓包修改
            jsonResultSet.setStatusCode("1");
            jsonResultSet.setResultData("对不上文章编号");
            return ResponseEntity.ok(jsonResultSet);
        }

        if(NullTool.isNull(comment.getUserId()) && NullTool.isNull(comment.getCommentPic())){
            HttpSession session = request.getSession();
            String username = (String)session.getAttribute("ACCOUNT_IN_SESSION");
            if(NullTool.isNull(username)){
                comment.setCommentPic(somebodyPic);
            }else {
                BlogInfo blogInfo = blogInfoService.getBlogInformationByUsername(username);
                comment.setCommentPic(blogInfo.getUserAvatar());
            }
        }else {
            jsonResultSet.setStatusCode("1");
            jsonResultSet.setResultData("非法操作");
            return ResponseEntity.ok(jsonResultSet);
        }
        commentService.commentSave(comment);
        //暂留消息队列提示用法
        jsonResultSet.setStatusCode("0");
        jsonResultSet.setResultData(commentService.getAllCommentByBlogId(id));

        return ResponseEntity.ok(jsonResultSet);
    }


    //获取所有评论
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

    //获取最新5条评论
    @RequestMapping(value = "/getLatestComment",method = RequestMethod.GET)
    @ResponseBody
    public JsonResultSet getLatestComment(){
        JsonResultSet jsonResultSet = new JsonResultSet();
        try {
            jsonResultSet.setStatusCode("0");
            jsonResultSet.setResultData(commentService.getLatestSomeComment());
        }catch (Exception e){
            jsonResultSet.setStatusCode("1");
            jsonResultSet.setResultData(e.toString());
        }

        return jsonResultSet;
    }

}
