package com.example.myblog.repository;

import com.example.myblog.entity.Comment;
import com.example.myblog.entity.IdClass.IdComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/11/5 15 13
 * @description :
 */
public interface CommentRepository extends JpaRepository<Comment, IdComment> {

    public List<Comment> findByEssayIdOrderByCommentIdDescCommentRecDesc(Long essayId);

    public List<Comment> findFirst5ByOrderByTime();

    @Query("select " +
            "count (commentId)  " +
            "from " +
            "t_comment t " +
            "where " +
            "t.essayId = ?1 " +
            "group by  " +
            "t.commentId")
    public List<Integer> countCommentIdByEssayId(@Param(value = "essayId") Long essayId);

    @Query("select count (t) from t_comment t where t.essayId =?1")
    public List<Integer> getByEssayId(@Param("essayId") Long essayId);
}
