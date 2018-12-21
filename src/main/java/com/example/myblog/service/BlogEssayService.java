package com.example.myblog.service;

import com.example.myblog.entity.BlogEssay;
import com.example.myblog.entity.respVO.BlogEssayRespVO;
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

    public BlogEssayRespVO getEssayById(Long id);

    public void saveOrUpdateBlogStatus(BlogEssay blogEssay);

    public List<BlogEssay> getHotBlogEssay();
}
