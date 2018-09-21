package com.example.myblog.service;

import com.example.myblog.entity.BlogEssay;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/9/14 10 40
 * @description :
 */
public interface BlogEssayService {


    public List<BlogEssay> getEssayByPage(int size , int page, Sort sort);

    public long getPageNum();


}
