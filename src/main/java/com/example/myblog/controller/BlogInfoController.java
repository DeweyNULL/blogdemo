package com.example.myblog.controller;

import com.example.myblog.entity.BlogInfo;
import com.example.myblog.entity.JsonResultSet;
import com.example.myblog.service.BlogInfoService;
import com.example.myblog.tools.NullTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * @program myblog
 * @description: 博客 个人信息的controller
 * @author: xielinzhi
 * @create: 2018/12/19 14:14
 */

@Controller
public class BlogInfoController {

    @Autowired
    BlogInfoService blogInfoService;

    @RequestMapping(value = "getBlogInfo" , method = RequestMethod.GET)
    @ResponseBody
    public JsonResultSet getBlogInfo(HttpServletRequest request){
        JsonResultSet jsonResultSet = new JsonResultSet();

        try {
            BlogInfo blogInfo = blogInfoService.getBlogInformation();
            if(blogInfo!=null){
                jsonResultSet.setStatusCode("0");
                jsonResultSet.setResultData(blogInfo);
            }else {
                jsonResultSet.setStatusCode("1");
                jsonResultSet.setResultData("查询数据为空");
            }
        }catch (Exception e){
            jsonResultSet.setStatusCode("1");
            jsonResultSet.setResultData("服务错误");
        }

        return jsonResultSet;
    }


    @RequestMapping(value = "saveBlogInfo" , method = RequestMethod.POST)
    @ResponseBody
    public JsonResultSet saveBlogInfo(@RequestBody BlogInfo blogInfo , HttpServletRequest request){
        JsonResultSet jsonResultSet = new JsonResultSet();
        if(NullTool.isNull(blogInfo.getUsername())){
            try {
                blogInfoService.saveOrUpdateBlogInformation(blogInfo);
                jsonResultSet.setStatusCode("0");
                jsonResultSet.setResultData("保存成功");
            }catch (Exception e){
                jsonResultSet.setStatusCode("1");
                jsonResultSet.setResultData("服务错误");
            }
        }else {
            jsonResultSet.setStatusCode("1");
            jsonResultSet.setResultData("暂时不提供这类服务");
        }

        return jsonResultSet;
    }
}
