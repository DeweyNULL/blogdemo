package com.example.myblog.entity;

import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

import static javax.persistence.GenerationType.AUTO;
import static javax.persistence.GenerationType.IDENTITY;

/**
 * @auther : Dewey
 * @date : 2018/9/14 10 13
 * @description : 对应数据库字段表
 */

@Entity(name = "blog_essay")
public class BlogEssay {

    @Id
    private Long id;

    private String auther_name;

    @Type(type = "text")
    private String summary;

    private String pic;

    private String essay_title;

    private Date time;

    private int comment_num;

    private int essay_num;

    private String essay_type;


    @Column(name ="views_num")
    private int viewsNum;

    private String essay_properties;

    @Type(type = "text")
    private String essay_content;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuther_name() {
        return auther_name;
    }

    public void setAuther_name(String auther_name) {
        this.auther_name = auther_name;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public String getEssay_title() {
        return essay_title;
    }

    public void setEssay_title(String essay_title) {
        this.essay_title = essay_title;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public int getComment_num() {
        return comment_num;
    }

    public void setComment_num(int comment_num) {
        this.comment_num = comment_num;
    }

    public int getEssay_num() {
        return essay_num;
    }

    public void setEssay_num(int essay_num) {
        this.essay_num = essay_num;
    }

    public String getEssay_type() {
        return essay_type;
    }

    public void setEssay_type(String essay_type) {
        this.essay_type = essay_type;
    }

    public int getViewsNum() {
        return viewsNum;
    }

    public void setViewsNum(int viewsNum) {
        this.viewsNum = viewsNum;
    }


    public String getEssay_properties() {
        return essay_properties;
    }

    public void setEssay_properties(String essay_properties) {
        this.essay_properties = essay_properties;
    }

    public String getEssay_content() {
        return essay_content;
    }

    public void setEssay_content(String essay_content) {
        this.essay_content = essay_content;
    }

    @Override
    public String toString() {
        return "BlogEssay{" +
                "id=" + id +
                ", auther_name='" + auther_name + '\'' +
                ", summary='" + summary + '\'' +
                ", pic='" + pic + '\'' +
                ", essay_title='" + essay_title + '\'' +
                ", time=" + time +
                ", comment_num=" + comment_num +
                ", essay_num=" + essay_num +
                ", essay_type='" + essay_type + '\'' +
                ", views_num=" + viewsNum +
                ", essay_properties='" + essay_properties + '\'' +
                ", essay_content='" + essay_content + '\'' +
                '}';
    }
}
