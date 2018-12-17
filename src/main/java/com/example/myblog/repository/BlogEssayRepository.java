package com.example.myblog.repository;

import com.example.myblog.entity.BlogEssay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/9/14 10 33
 * @description :
 */


public interface BlogEssayRepository extends JpaRepository<BlogEssay , Long> {
    public List<BlogEssay> findFirst3ByOrderByViewsNumDesc();

    public List<BlogEssay> findFirst1ByOrderByTimeDesc();
}
