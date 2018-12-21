package com.example.myblog.entity.respVO;

import com.example.myblog.entity.BlogEssay;

/**
 * @program myblog
 * @description: readessay返回实体
 * @author: xielinzhi
 * @create: 2018/12/21 11:25
 */

public class BlogEssayRespVO {

    private BlogEssay blogEssay;
    private String next;
    private String prev;

    public BlogEssay getBlogEssay() {
        return blogEssay;
    }

    public void setBlogEssay(BlogEssay blogEssay) {
        this.blogEssay = blogEssay;
    }

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }

    public String getPrev() {
        return prev;
    }

    public void setPrev(String prev) {
        this.prev = prev;
    }
}
