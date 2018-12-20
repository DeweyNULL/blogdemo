package com.example.myblog.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * @auther : Dewey
 * @date : 2018/9/26 10 37
 * @description :
 */

@Entity(name = "blog_info")
public class BlogInfo {

    @Id
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "user_mail")
    private String userMail;

    @Column(name="blog_info")
    private String blogInfo;

    @Column(name = "user_avatar")
    private String userAvatar;

    @Column(name="user_signature")
    private String userSignature;

    @Column(name="user_back")
    private String userBack;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserMail() {
        return userMail;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    public String getBlogInfo() {
        return blogInfo;
    }

    public void setBlogInfo(String blogInfo) {
        this.blogInfo = blogInfo;
    }

    public String getUserSignature() {
        return userSignature;
    }

    public void setUserSignature(String userSignature) {
        this.userSignature = userSignature;
    }

    public String getUserAvatar() {
        return userAvatar;
    }

    public void setUserAvatar(String userAvatar) {
        this.userAvatar = userAvatar;
    }

    public String getUserBack() {
        return userBack;
    }

    public void setUserBack(String userBack) {
        this.userBack = userBack;
    }

    @Override
    public String toString() {
        return "BlogInfo{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", userMail='" + userMail + '\'' +
                ", blogInfo='" + blogInfo + '\'' +
                ", userAvatar='" + userAvatar + '\'' +
                ", userSignature='" + userSignature + '\'' +
                ", userBack='" + userBack + '\'' +
                '}';
    }
}
