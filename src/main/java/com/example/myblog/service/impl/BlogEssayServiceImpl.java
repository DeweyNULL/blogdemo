package com.example.myblog.service.impl;

import com.example.myblog.entity.BlogEssay;
import com.example.myblog.repository.BlogEssayRepository;
import com.example.myblog.service.BlogEssayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

/**
 * @auther : Dewey
 * @date : 2018/9/14 10 41
 * @description :
 */

@Service
public class BlogEssayServiceImpl implements BlogEssayService {


    @Autowired
    BlogEssayRepository blogEssayRepository;

    @Override
    public Page<BlogEssay> getEssayByPage(int size , int page, Sort sort) {

        Pageable pageable  = PageRequest.of(page,size,sort);

        Page<BlogEssay> blogEssays = blogEssayRepository.findAll(pageable);

        return blogEssays;
    }

    @Override
    public long getPageNum() {



        return blogEssayRepository.count();
    }


}
