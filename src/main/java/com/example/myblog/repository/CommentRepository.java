package com.example.myblog.repository;

import com.example.myblog.entity.Comment;
import com.example.myblog.entity.IdClass.IdComment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @auther : Dewey
 * @date : 2018/11/5 15 13
 * @description :
 */
public interface CommentRepository extends JpaRepository<Comment, IdComment> {

}
