package com.example.myblog.service.impl;

import com.example.myblog.entity.BlogEssay;
import com.example.myblog.repository.BlogEssayRepository;
import com.example.myblog.service.BlogEssayService;
import com.example.myblog.tools.Pic2base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/9/14 10 41
 * @description :
 */

@Service
public class BlogEssayServiceImpl implements BlogEssayService {


    @Autowired
    BlogEssayRepository blogEssayRepository;

    @Value("${picfile.path}")
    String filePathDir;

    @Override
    public List<BlogEssay> getEssayByPage(int size , int page, Sort sort) {

        Pageable pageable  = PageRequest.of(page,size,sort);

        List<BlogEssay> blogEssays = blogEssayRepository.findAll(pageable).getContent();


        //这里获取的是数据库中的图片路径
        int essaysSize = blogEssays.size();
        for (int i = 0 ; i<essaysSize;i++){

            String picpath = filePathDir + blogEssays.get(i).getPic();
            if(picpath!=null){
                blogEssays.get(i).setPic(Pic2base64.getPicBase64(picpath));
            }
        }
        return blogEssays;
    }

    @Override
    public long getPageNum() {



        return blogEssayRepository.count();
    }

    @Override
    public BlogEssay getEssayById(Long id) {
        return blogEssayRepository.findById(id).get();
    }

    @Transactional
    @Modifying
    public void saveOrUpdateBlogStatus(BlogEssay blogEssay){
        blogEssayRepository.save(blogEssay);
    };

    public List<BlogEssay> getHotBlogEssay(){

        return blogEssayRepository.findFirst3ByOrderByViewsNumDesc();
    }
}
