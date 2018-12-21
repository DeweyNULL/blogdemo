package com.example.myblog.service;

import com.example.myblog.entity.BlogInfo;

/**
 *  博客 个人信息相关的东西
 */

public interface BlogInfoService {

    public BlogInfo getBlogInformation();

    public void saveOrUpdateInformationByUserName(BlogInfo blogInfo);

    public void saveOrUpdateBlogInformation(BlogInfo blogInfo);

    public BlogInfo getBlogInformationByUsername(String username);
}
