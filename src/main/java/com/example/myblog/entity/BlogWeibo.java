package com.example.myblog.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * @program myblog
 * @description: 个人动态
 * @author: xielinzhi
 * @create: 2018/12/21 16:13
 */

@Entity(name = "blog_weibo")
public class BlogWeibo {

    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String userName;

    @Column(name = "weibo")
    private String weibo;

    @Column
    private Date time;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getWeibo() {
        return weibo;
    }

    public void setWeibo(String weibo) {
        this.weibo = weibo;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
