package com.example.myblog.repository;

import com.example.myblog.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/9/26 10 37
 * @description :
 */
public interface UserInfoRepository extends JpaRepository<UserInfo,Long> {
    public List<UserInfo> findByUsername(String username);
}
