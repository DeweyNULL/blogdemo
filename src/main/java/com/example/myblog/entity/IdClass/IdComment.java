package com.example.myblog.entity.IdClass;

import java.io.Serializable;

/**
 * @auther : Dewey
 * @date : 2018/11/5 15 35
 * @description : 用来做复合主键的IDclass
 */


public class IdComment implements Serializable {

    private Long essayId;
    private Long commentId;
    private Long commentRec;

    public  IdComment(){

    }

    public IdComment(Long essayId, Long commentId, Long commentRec) {
        this.essayId = essayId;
        this.commentId = commentId;
        this.commentRec = commentRec;
    }

    public Long getEssayId() {
        return essayId;
    }

    public void setEssayId(Long essayId) {
        this.essayId = essayId;
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public Long getCommentRec() {
        return commentRec;
    }

    public void setCommentRec(Long commentRec) {
        this.commentRec = commentRec;
    }
}
