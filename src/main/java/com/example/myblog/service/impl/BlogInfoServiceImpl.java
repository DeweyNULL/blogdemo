package com.example.myblog.service.impl;

import com.example.myblog.entity.BlogInfo;
import com.example.myblog.repository.BlogInfoRepository;
import com.example.myblog.service.BlogInfoService;
import com.example.myblog.tools.NullTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * @program myblog
 * @description: 博客 个人信息方法的实现
 * @author: xielinzhi
 * @create: 2018/12/19 11:38
 */

@Service
public class BlogInfoServiceImpl implements BlogInfoService {

    @Autowired
    BlogInfoRepository blogInfoRepository;

    @Override
    public BlogInfo getBlogInformation() {
      List<BlogInfo> blogInfos = blogInfoRepository.findAll();
      if(blogInfos!=null && blogInfos.size()>0){
          BlogInfo blogInfo = blogInfos.get(0);
          blogInfo.setId(null);
          blogInfo.setUserMail("***");
          blogInfo.setUsername("***");
      }
      return null;
    }



    @Override
    @Transactional
    @Modifying
    //这个是保存
    public void saveOrUpdateInformationByUserName(BlogInfo blogInfo) {

    }

    @Override
    @Transactional
    @Modifying
    public void saveOrUpdateBlogInformation(BlogInfo blogInfo) {

        List<BlogInfo> blogInfos = blogInfoRepository.findAll();
        if(blogInfos!=null && blogInfos.size()>0){
          BlogInfo tempBlogInfo = blogInfos.get(0);

          if(NullTool.isNotNull(blogInfo.getBlogInfo())){
              tempBlogInfo.setBlogInfo(blogInfo.getBlogInfo());
          }

          if(NullTool.isNotNull(blogInfo.getUserSignature())){
              tempBlogInfo.setUserSignature(blogInfo.getUserSignature());
          }

          blogInfoRepository.save(tempBlogInfo);
        }

    }
}
