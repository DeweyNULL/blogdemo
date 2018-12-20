package com.example.myblog.service.impl;

import com.example.myblog.entity.BlogRightList;
import com.example.myblog.repository.BlogRightListRepository;
import com.example.myblog.service.BlogRightListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @program myblog
 * @description: 获取博客右侧所有信息
 * @author: xielinzhi
 * @create: 2018/12/20 16:49
 */

@Service
public class BlogRightListServiceImpl implements BlogRightListService {

    @Autowired
    BlogRightListRepository blogRightListRepository;


    @Override
    public BlogRightList getBlogRightList() {
        List<BlogRightList> blogRightLists = blogRightListRepository.findAll();
        if(blogRightLists!=null && blogRightLists.size()>0) {
            BlogRightList blogRightList = blogRightLists.get(0);
            blogRightList.setUserName("***");
            return blogRightList;
        }
        return null;
    }
}
