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
    }

    @Test
    public void batchSaveTest(){
        List<BlogEssay> blogEssays = new ArrayList<>();

        for (Integer i = 0 ; i<50;i++){
            BlogEssay blogEssay = new BlogEssay();
            blogEssay.setEssay_title(new String(i.toString()));
            blogEssays.add(blogEssay);
        }
        blogEssayRepository.saveAll(blogEssays);
    }

    @Test
    public void getCount(){
        System.out.println(blogEssayRepository.count());
    }
}
