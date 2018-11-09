package com.example.myblog;

import com.example.myblog.entity.Comment;
import com.example.myblog.repository.CommentRepository;
import com.example.myblog.service.CommentService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MyblogApplicationTests {

    @Value("${picfile.path}")
    String picpath;

    @Autowired
    CommentService commentService;

    @Autowired
    CommentRepository commentRepository;
    @Test
    public void contextLoads() {
        System.out.println(picpath);
    }

    @Test
    public void commentServiceTest(){
        Comment comment = new Comment();
        comment.setEssayId(Long.valueOf(1));
        comment.setTime(new Date());
        comment.setCommentRec(Long.valueOf(0));
        comment.setCommentContent("hello world");
        comment.setUserEmail("123");
        comment.setUserName("xlz");
        comment.setUserWeb("123123");
        commentService.commentSave(comment);

        for (int i = 1; i<5;i++){
            comment.setCommentRec(Long.valueOf(i));
            commentService.commentSave(comment);
        }

        List<Comment> latestComment = commentService.getLatestSomeComment();
        System.out.println(latestComment.toString());



       // commentService.commentDelete(comment);
    }

    @Test
    public void queryTest(){
        List<Integer> queryList = commentRepository.getByEssayId(Long.valueOf(1));
        System.out.println(queryList.toString());
    }

    @Test
    public void testSort(){

        System.out.println(commentRepository.findByEssayIdOrderByCommentIdDescCommentRecDesc(Long.valueOf(1)).toString());
    }

    @Test
    public void serviceTest(){
        commentService.getAllCommentByBlogId(1L);
    }
}
