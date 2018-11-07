package com.example.myblog.entity.respVO;

import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/11/7 16 19
 * @description :
 */
public class RespCommentVO {
    private int commentNum ;
    private List<CommentVO> commentVOList;

    public int getCommentNum() {
        return commentNum;
    }

    public void setCommentNum(int commentNum) {
        this.commentNum = commentNum;
    }

    public List<CommentVO> getCommentVOList() {
        return commentVOList;
    }

    public void setCommentVOList(List<CommentVO> commentVOList) {
        this.commentVOList = commentVOList;
    }
}
