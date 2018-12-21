package com.example.myblog;

import com.example.myblog.entity.BlogEssay;
import com.example.myblog.repository.BlogEssayRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

/**
 * @program myblog
 * @description: 测试查询下一条的方法
 * @author: xielinzhi
 * @create: 2018/12/21 11:06
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class BlogEssayTest {

    @Autowired
    BlogEssayRepository blogEssayRepository;

    @Test
    public void testNext(){

        List<BlogEssay> blogEssay = blogEssayRepository.findnext(Long.valueOf("1"));

        System.out.println(blogEssay.size());

        blogEssay = blogEssayRepository.findpre(Long.valueOf("1"));

        System.out.println(blogEssay.size());
    }
}
