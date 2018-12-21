package com.example.myblog.service.impl;

import com.example.myblog.entity.BlogEssay;
import com.example.myblog.entity.BlogRightList;
import com.example.myblog.entity.respVO.BlogEssayRespVO;
import com.example.myblog.repository.BlogEssayRepository;
import com.example.myblog.repository.BlogRightListRepository;
import com.example.myblog.service.BlogEssayService;
import com.example.myblog.tools.Pic2base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/9/14 10 41
 * @description :
 */

@Service
public class BlogEssayServiceImpl implements BlogEssayService {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    BlogEssayRepository blogEssayRepository;

    @Autowired
    BlogRightListRepository blogRightListRepository;

    @Value("${picfile.path}")
    String filePathDir;

    @Override //分页获取文章
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

    @Override //获取总页数
    public long getPageNum() {
        return blogEssayRepository.count();
    }

    @Override  //根据文章ID获取文章
    public BlogEssayRespVO getEssayById(Long id) {
        BlogEssayRespVO blogEssayRespVO = new BlogEssayRespVO();

        blogEssayRespVO.setBlogEssay(blogEssayRepository.findById(id).get());

        List<BlogEssay> blogEssays = blogEssayRepository.findnext(id);
        if(blogEssays.size()>0){
            blogEssayRespVO.setNext(blogEssays.get(0).getId().toString());
        }
        blogEssays = blogEssayRepository.findpre(id);
        if(blogEssays.size()>0) {
            blogEssayRespVO.setPrev(blogEssays.get(0).getId().toString());
        }
        return blogEssayRespVO;
    }

    @Transactional
    @Modifying  //修改或者保存文章
    public void saveOrUpdateBlogStatus(BlogEssay blogEssay){
        logger.debug(blogEssay.toString());


        if(stringIsNull(blogEssay.getEssay_title())){
            logger.debug("缺少标题 不准许入库");
            return;
        }
        if(blogEssay.getId() == null){
            List<BlogEssay> blogEssays = blogEssayRepository.findFirst1ByOrderByTimeDesc();
            if(blogEssays!=null) logger.debug(Integer.valueOf(blogEssays.size()).toString());

            Long id = blogEssays.get(0).getId()+1;
            blogEssay.setId(id);
            blogEssay.setTime(new Date());
            logger.debug("存入数据库的："+blogEssay.toString());
        }
        blogEssayRepository.saveAndFlush(blogEssay);

        List<BlogRightList> blogRightLists = blogRightListRepository.findAll();
        if(blogRightLists!=null && blogRightLists.size()>0) {
            BlogRightList blogRightList = blogRightLists.get(0);
            blogRightList.setLastTime(new Date());
            int essayNum = blogRightList.getEssayNum() + 1;
            blogRightList.setEssayNum(essayNum);

            blogRightListRepository.saveAndFlush(blogRightList);
        }
    };

    public List<BlogEssay> getHotBlogEssay(){

        return blogEssayRepository.findFirst3ByOrderByViewsNumDesc();
    }

    private boolean stringIsNull(String temp){
        return (temp==null ||"".equals(temp));
    }
}
