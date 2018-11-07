package com.example.myblog.service.impl;

import com.example.myblog.entity.Comment;
import com.example.myblog.entity.respVO.CommentVO;
import com.example.myblog.entity.respVO.RespCommentVO;
import com.example.myblog.repository.CommentRepository;
import com.example.myblog.service.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/11/7 10 09
 * @description :
 */
@Service
public class CommentServiceImpl implements CommentService {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    CommentRepository commentRepository;

    @Override
    @Transactional
    @Modifying
    //保存评论
    public void commentSave(Comment comment) {

        if(comment.getCommentId()==null){
            List<Integer> comments = commentRepository.countCommentIdByEssayId(comment.getEssayId());
            logger.info(comments.toString());
            comment.setCommentId(Long.valueOf(comments.size()+1));
        }
        commentRepository.saveAndFlush(comment);
    }

    @Override
    public RespCommentVO getAllCommentByBlogId(Long id) {
        RespCommentVO respCommentVO = new RespCommentVO();
        List<Comment> comments = commentRepository.findByEssayIdOrderByCommentIdDescCommentRecAsc(id);
        List<CommentVO> commentVOs = new ArrayList<>(); //最终返回的结果集的子属性
        Long commentId =Long.valueOf(-1); //判定需要添加到结果集的标志
        CommentVO commentVO = new CommentVO(); //添加到结果集的子元素
        List<Comment> childrenComment = new ArrayList<>();
        for (Comment tempComment : comments){
            tempComment.setUserEmail("***");//不暴露邮箱
            //每次改变commentId并且 commentId不为初始值的时候就添加到结果集
            if(!commentId.equals(tempComment.getCommentId()) && !commentId.equals(Long.valueOf(-1))){
                commentVO.setChildrenComment(childrenComment);  //设置子串评论
                commentVOs.add(commentVO);
                childrenComment.clear();
            }
            if(tempComment.getCommentRec()==0){
                commentVO = new CommentVO();
                commentId=tempComment.getCommentId();//设置父评论
                commentVO.setSuperComment(tempComment);
                childrenComment.clear();
                continue;
            }
            childrenComment.add(tempComment);
        }
        commentVO.setChildrenComment(childrenComment);  //设置子串评论
        commentVOs.add(commentVO);

        respCommentVO.setCommentNum(comments.size());
        respCommentVO.setCommentVOList(commentVOs);


        return respCommentVO;

    }

    @Override  //返回最近5条评论
    public List<Comment> getLatestSomeComment() {
        return commentRepository.findFirst5ByOrderByTime();
    }

    @Override @Transactional @Modifying  //删除某条评论
    public void commentDelete(Comment comment) {
        commentRepository.delete(comment);
    }
}
