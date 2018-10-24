package com.example.myblog;

import com.example.myblog.entity.BlogEssay;
import com.example.myblog.repository.BlogEssayRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/9/14 11 28
 * @description :
 */

@RunWith(SpringJUnit4ClassRunner.class)

@SpringBootTest

public class MyBlogQueryTest {

    @Autowired
    BlogEssayRepository blogEssayRepository;
    /*
        分页查询
     */
    @Test
    public void pageTest(){
        int page = 0;
        int size = 8;
        Sort sort = new Sort(Sort.Direction.DESC,"id");
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<BlogEssay> pageList = blogEssayRepository.findAll(pageable);

        for (BlogEssay pageblog: pageList) {
            System.out.println(pageblog.toString());
        }

        for (int i = 0 ; i < pageList.getSize();i++){

        }
    }

    @Test
    public void saveTest(){
        BlogEssay blogEssay = new BlogEssay();
        blogEssay.setSummary("Hello world First Test");
        blogEssay.setAuther_name("Dewey");
        blogEssay.setPic("C:\\work\\GoogleDownload\\img\\TIM20180829130315.png");
        blogEssay.setEssay_title("第一篇测试文章");
        blogEssay.setEssay_content("Hello world First Test");
        blogEssay.setViewsNum(1);
        blogEssay.setEssay_num(1);
        blogEssay.setComment_num(0);
        blogEssay.setTime(new Date());

        blogEssayRepository.save(blogEssay);

    }
    @Test
    public void batchSaveTest(){
        List<BlogEssay> blogEssays = new ArrayList<>();

        for (Integer i = 0 ; i<50;i++){
            BlogEssay blogEssay = new BlogEssay();
            blogEssay.setSummary("Hello world First Test");
            blogEssay.setAuther_name("Dewey");
            blogEssay.setPic("C:\\work\\GoogleDownload\\img\\TIM20180829130315.png");
            blogEssay.setEssay_title("第"+i+"篇测试文章");
            blogEssay.setEssay_content("Hello world "+i+" Test");
            blogEssay.setViewsNum(1);
            blogEssay.setEssay_num(1);
            blogEssay.setComment_num(0);
            blogEssay.setTime(new Date());
            blogEssays.add(blogEssay);
        }
        for (BlogEssay temp: blogEssays) {
            System.out.println(temp.toString());
        }
        blogEssayRepository.saveAll(blogEssays);
    }

    @Test
    public void getCount(){
        System.out.println(blogEssayRepository.count());
    }
}
