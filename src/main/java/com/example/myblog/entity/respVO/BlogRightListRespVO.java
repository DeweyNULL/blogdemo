package com.example.myblog.entity.respVO;

import com.example.myblog.entity.BlogEssay;
import com.example.myblog.entity.BlogRightList;
import com.example.myblog.entity.Comment;

import java.util.List;

/**
 * @program myblog
 * @description: 作为右侧返回实体的vo
 * @author: xielinzhi
 * @create: 2018/12/21 09:14
 */

public class BlogRightListRespVO {

    private List<Comment> comments;

    private List<BlogEssay> blogEssays;

    private BlogRightList blogRightList;

    private int days;

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<BlogEssay> getBlogEssays() {
        return blogEssays;
    }

    public void setBlogEssays(List<BlogEssay> blogEssays) {
        this.blogEssays = blogEssays;
    }

    public BlogRightList getBlogRightList() {
        return blogRightList;
    }

    public void setBlogRightList(BlogRightList blogRightList) {
        this.blogRightList = blogRightList;
    }

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }
}
