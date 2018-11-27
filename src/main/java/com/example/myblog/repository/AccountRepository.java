package com.example.myblog.repository;

import com.example.myblog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<User,Long> {

    public User getByUsername(String username);
}
