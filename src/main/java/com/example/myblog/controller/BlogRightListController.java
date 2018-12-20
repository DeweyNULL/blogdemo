package com.example.myblog.controller;

import com.example.myblog.entity.BlogEssay;
import com.example.myblog.entity.BlogRightList;
import com.example.myblog.entity.JsonResultSet;
import com.example.myblog.service.BlogEssayService;
import com.example.myblog.service.BlogRightListService;
import com.example.myblog.tools.Pic2base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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


    @RequestMapping(value = "/getRightListInfo" , method = RequestMethod.GET)
    public JsonResultSet getRightListInfo(){
        JsonResultSet jsonResultSet = new JsonResultSet();
        try {
            BlogRightList blogRightList = blogRightListService.getBlogRightList();
            List<BlogEssay> blogEssays = blogEssayServiceImpl.getHotBlogEssay();
            //commentService.getLatestSomeComment();
            if (blogEssays!=null&&blogEssays.size()>0){

                int size = blogEssays.size();
                for (int i = 0; i < size; i++) {
                    String picPath = filePathDir + blogEssays.get(i).getPic();
                    blogEssays.get(i).setPic(Pic2base64.getPicBase64(picPath));
                }
                jsonResultSet.setStatusCode("0");
                jsonResultSet.setResultData(blogEssays);
            }else {
                jsonResultSet.setStatusCode("1");
            }
            if (blogRightList!=null){
                jsonResultSet.setStatusCode("0");
                jsonResultSet.setResultData(blogRightList);
            }else {
                jsonResultSet.setStatusCode("1");
                jsonResultSet.setResultData("博客信息数据不存在！");
            }
        }catch (Exception e){
            jsonResultSet.setStatusCode("1");
            jsonResultSet.setResultData("服务错误");
        }

        return jsonResultSet;
    }
}
