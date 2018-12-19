package com.example.myblog.repository;

import com.example.myblog.entity.BlogInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/9/26 10 37
 * @description :
 */
public interface BlogInfoRepository extends JpaRepository<BlogInfo,Long> {
    public List<BlogInfo> findByUsername(String username);
}
