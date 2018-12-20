package com.example.myblog.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;


/**
 * @program myblog
 * @description: 博客右侧显示的信息
 * @author: xielinzhi
 * @create: 2018/12/20 16:42
 */
@Entity(name = "blog_right_list")
public class BlogRightList {

    @Id
    private String userName;

    @Column(name="essay_num")
    private Integer essayNum;

    @Column(name="comment_num")
    private Integer commentNum;

    @Column(name="start_time")
    private Date startTime;

    @Column(name="last_time")
    private Date lastTime;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getEssayNum() {
        return essayNum;
    }

    public void setEssayNum(Integer essayNum) {
        this.essayNum = essayNum;
    }

    public Integer getCommentNum() {
        return commentNum;
    }

    public void setCommentNum(Integer commentNum) {
        this.commentNum = commentNum;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getLastTime() {
        return lastTime;
    }

    public void setLastTime(Date lastTime) {
        this.lastTime = lastTime;
    }

    @Override
    public String toString() {
        return "BlogRightList{" +
                "userName='" + userName + '\'' +
                ", essayNum=" + essayNum +
                ", commentNum=" + commentNum +
                ", startTime=" + startTime +
                ", lastTime=" + lastTime +
                '}';
    }
}
