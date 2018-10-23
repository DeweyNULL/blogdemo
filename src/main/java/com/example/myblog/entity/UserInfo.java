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

@Entity(name = "user_info")
public class UserInfo {

    @Id
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "user_nick_name")
    private String userNickName;

    @Column(name = "user_mail")
    private String userMail;

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

    public String getUserNickName() {
        return userNickName;
    }

    public void setUserNickName(String userNickName) {
        this.userNickName = userNickName;
    }

    public String getUserMail() {
        return userMail;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", userNickName='" + userNickName + '\'' +
                ", userMail='" + userMail + '\'' +
                '}';
    }
}
