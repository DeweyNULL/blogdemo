package com.example.myblog.entity.respVO;

import com.example.myblog.entity.Comment;

import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/11/7 14 58
 * @description :
 */
public class CommentVO {

    private Comment superComment;
    private List<Comment> childrenComment;

    public Comment getSuperComment() {
        return superComment;
    }

    public void setSuperComment(Comment superComment) {
        this.superComment = superComment;
    }

    public List<Comment> getChildrenComment() {
        return childrenComment;
    }

    public void setChildrenComment(List<Comment> childrenComment) {
        this.childrenComment = childrenComment;
    }


}
