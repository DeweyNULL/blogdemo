package com.example.myblog.service.impl;

import com.example.myblog.entity.BlogRightList;
import com.example.myblog.entity.Comment;
import com.example.myblog.entity.respVO.CommentVO;
import com.example.myblog.entity.respVO.RespCommentVO;
import com.example.myblog.repository.BlogRightListRepository;
import com.example.myblog.repository.CommentRepository;
import com.example.myblog.service.CommentService;
import com.example.myblog.tools.NullTool;
import org.apache.ibatis.jdbc.Null;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
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
    @Autowired
    BlogRightListRepository blogRightListRepository;

    @Value("${picfile.somebodyPic}")
    String somebodyPic;

    @Override
    @Transactional
    @Modifying
    //保存评论
    public void commentSave(Comment comment) {

        if(comment.getCommentId()==null){
            List<Integer> comments = commentRepository.countCommentIdByEssayId(comment.getEssayId());
            logger.debug(comments.toString());
            logger.debug(Long.valueOf(comments.size()).toString());
            comment.setCommentId(Long.valueOf(comments.size()));
        }
        if(comment.getCommentRec()==null){
            comment.setCommentRec(Long.valueOf(0));
        }
        comment.setTime(new Date());

        commentRepository.saveAndFlush(comment);

        List<BlogRightList> blogRightLists = blogRightListRepository.findAll();
        if(blogRightLists!=null && blogRightLists.size()>0) {
            BlogRightList blogRightList = blogRightLists.get(0);
            int commentNum = blogRightList.getCommentNum() + 1;
            blogRightList.setCommentNum(commentNum);

            blogRightListRepository.saveAndFlush(blogRightList);
        }
    }

    @Override
    public RespCommentVO getAllCommentByBlogId(Long id) {
        RespCommentVO respCommentVO = new RespCommentVO();
        List<Comment> comments = commentRepository.findByEssayIdOrderByCommentIdDescCommentRecDesc(id);
        if(comments == null || comments.size()<1){
            return null;
        }
        logger.debug("一共查询到"+comments.size()+"条数据");
        List<CommentVO> commentVOs = new ArrayList<>(); //最终返回的结果集的子属性
        Long commentId =Long.valueOf(-1); //判定需要添加到结果集的标志
        List<Comment> childrenComment = new ArrayList<>();
        for (Comment tempComment : comments){
            logger.debug(tempComment.toString());
            tempComment.setUserEmail("***");//不暴露邮箱
            //每次改变commentId并且 commentId不为初始值的时候就添加到结果集
            if(tempComment.getCommentRec()==0){
                CommentVO commentVO = new CommentVO(); //添加到结果集的子元素
                commentVO.setSuperComment(tempComment);
                commentVO.setChildrenComment(childrenComment);  //设置子串评论
                commentVOs.add(commentVO);
                childrenComment = new ArrayList<Comment>();
                continue;
            }
            childrenComment.add(tempComment);
        }

        respCommentVO.setCommentNum(comments.size());
        respCommentVO.setCommentVOList(commentVOs);


        return respCommentVO;

    }

    @Override  //返回最近5条评论
    public List<Comment> getLatestSomeComment() {
        List<Comment> comments = commentRepository.findFirst5ByOrderByTimeDesc();
        if(comments!=null && comments.size()>0){
            int size = comments.size();
            for(int i = 0 ; i <size ; i++){
                comments.get(i).setUserEmail("**");
                comments.get(i).setUserWeb("**");
                if(NullTool.isNull(comments.get(i).getCommentPic())){
                    comments.get(i).setCommentPic(somebodyPic);
                }
            }
        }
        return comments;
    }

    @Override @Transactional @Modifying  //删除某条评论
    public void commentDelete(Comment comment) {
        commentRepository.delete(comment);
    }
}
