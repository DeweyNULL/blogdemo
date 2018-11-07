package com.example.myblog.service;

import com.example.myblog.entity.Comment;
import com.example.myblog.entity.respVO.CommentVO;
import com.example.myblog.entity.respVO.RespCommentVO;

import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/11/7 10 03
 * @description :
 */
public interface CommentService {

    //保存评论
    public void commentSave(Comment comment);

    //获取某个文章块下所有评论
    public RespCommentVO getAllCommentByBlogId(Long id);

    //获取最新评论
    public List<Comment> getLatestSomeComment();

    //删除某个评论
    public void commentDelete(Comment comment);
}
