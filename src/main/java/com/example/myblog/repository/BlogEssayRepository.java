package com.example.myblog.repository;

import com.example.myblog.entity.BlogEssay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/9/14 10 33
 * @description :
 */


public interface BlogEssayRepository extends JpaRepository<BlogEssay , Long> {
    public List<BlogEssay> findFirst3ByOrderByViewsNumDesc();

    public List<BlogEssay> findFirst1ByOrderByTimeDesc();

    @Query(value = "SELECT * FROM blog_essay WHERE id>:Id Limit 1",nativeQuery=true)
    public List<BlogEssay> findnext(@Param("Id") Long id);

    @Query(value = "SELECT * FROM blog_essay WHERE id<:Id ORDER BY id DESC Limit 1",nativeQuery=true)
    public List<BlogEssay> findpre(@Param("Id") Long id);
}
