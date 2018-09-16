package com.example.myblog.webentity.responseEntity;

/**
 * @auther : Dewey
 * @date : 2018/9/14 16 21
 * @description :
 */
public class PageCount {

    private int PageNum;

    private long essayNum;

    public int getPageNum() {
        return PageNum;
    }

    public void setPageNum(int pageNum) {
        PageNum = pageNum;
    }

    public long getEssayNum() {
        return essayNum;
    }

    public void setEssayNum(long essayNum) {
        this.essayNum = essayNum;
    }
}
