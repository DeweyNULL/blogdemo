package com.example.myblog.controller;

import com.example.myblog.entity.BlogEssay;
import com.example.myblog.entity.BlogRightList;
import com.example.myblog.entity.Comment;
import com.example.myblog.entity.JsonResultSet;
import com.example.myblog.entity.respVO.BlogRightListRespVO;
import com.example.myblog.service.BlogEssayService;
import com.example.myblog.service.BlogRightListService;
import com.example.myblog.service.CommentService;
import com.example.myblog.tools.Pic2base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @program myblog
 * @description: 查询获取右侧信息列表
 * @author: xielinzhi
 * @create: 2018/12/20 17:05
 */

@RestController
public class BlogRightListController {
    @Value("${picfile.path}")
    String filePathDir;
    @Autowired
    BlogRightListService blogRightListService;
    @Autowired
    BlogEssayService blogEssayServiceImpl;
    @Autowired
    CommentService commentService;

    @RequestMapping(value = "/getRightListInfo" , method = RequestMethod.GET)
    public JsonResultSet getRightListInfo(){
        JsonResultSet jsonResultSet = new JsonResultSet();
        try {
            BlogRightList blogRightList = blogRightListService.getBlogRightList();
            List<BlogEssay> blogEssays = blogEssayServiceImpl.getHotBlogEssay();
            List<Comment> comments = commentService.getLatestSomeComment();
            BlogRightListRespVO blogRightListRespVO = new BlogRightListRespVO();

            if (blogEssays!=null&&blogEssays.size()>0){
                int size = blogEssays.size();
                for (int i = 0; i < size; i++) {
                    String picPath = filePathDir + blogEssays.get(i).getPic();
                    blogEssays.get(i).setPic(Pic2base64.getPicBase64(picPath));
                }
                blogRightListRespVO.setBlogEssays(blogEssays);
            }

            if (blogRightList!=null){
                Date date = new Date();
                int days = differentDays(blogRightList.getStartTime(),date);
                blogRightListRespVO.setDays(days);
                blogRightListRespVO.setBlogRightList(blogRightList);
            }

            if (comments!=null&&comments.size()>0){
                blogRightListRespVO.setComments(comments);
            }
            jsonResultSet.setStatusCode("0");
            jsonResultSet.setResultData(blogRightListRespVO);
        }catch (Exception e){
            jsonResultSet.setStatusCode("1");
            jsonResultSet.setResultData("服务错误");
        }

        return jsonResultSet;
    }

    public int differentDays(Date date1,Date date2) {
        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(date1);

        Calendar cal2 = Calendar.getInstance();
        cal2.setTime(date2);
        int day1= cal1.get(Calendar.DAY_OF_YEAR);
        int day2 = cal2.get(Calendar.DAY_OF_YEAR);

        int year1 = cal1.get(Calendar.YEAR);
        int year2 = cal2.get(Calendar.YEAR);
        if(year1 != year2) {
            int timeDistance = 0 ;
            for(int i = year1 ; i < year2 ; i ++)
            {
                if(i%4==0 && i%100!=0 || i%400==0)
                {
                    timeDistance += 366;
                }
                else    //不是闰年
                {
                    timeDistance += 365;
                }
            }
            return timeDistance + (day2-day1) ;
        }
        else {
            return day2-day1;
        }
    }
}
