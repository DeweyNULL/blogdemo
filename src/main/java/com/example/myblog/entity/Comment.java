package com.example.myblog.entity;

import com.example.myblog.entity.IdClass.IdComment;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;
import java.util.Date;

/**
 * @auther : Dewey
 * @date : 2018/11/5 15 01
 * @description :
 */
@Entity(name="t_comment")
@IdClass(IdComment.class)
public class Comment implements Serializable {

    @Id@Column(name = "essay_id")
    private Long essayId;

    @Id@Column(name="comment_id")
    private Long commentId;

    @Id@Column(name="comment_rec")
    private Long commentRec;

    @Column(name="comment_content")
    private String commentContent;

    @Column(name="user_name")
    private String userName;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="comment_pic")
    private String commentPic;

    @Column(name="user_id")
    private String userId;

    @Column(name="user_web")
    private String userWeb;

    @Column(name="time")
    private Date time;

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

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserWeb() {
        return userWeb;
    }

    public void setUserWeb(String userWeb) {
        this.userWeb = userWeb;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getCommentPic() {
        return commentPic;
    }

    public void setCommentPic(String commentPic) {
        this.commentPic = commentPic;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "essayId=" + essayId +
                ", commentId=" + commentId +
                ", commentRec=" + commentRec +
                ", commentContent='" + commentContent + '\'' +
                ", userName='" + userName + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", commentPic='" + commentPic + '\'' +
                ", userId='" + userId + '\'' +
                ", userWeb='" + userWeb + '\'' +
                ", time=" + time +
                '}';
    }
}
