package com.example.myblog.controller;

import com.example.myblog.entity.BlogEssay;
import com.example.myblog.entity.JsonResultSet;
import com.example.myblog.service.BlogEssayService;
import com.example.myblog.tools.Pic2base64;
import com.example.myblog.webentity.responseEntity.PageCount;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/9/14 10 42
 * @description :  blog文章的操作
 */


@Controller
public class BlogEssayController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    BlogEssayService blogEssayServiceImpl;

    @Value("${picfile.path}")
    String filePathDir;
    /*
        保存文章的操作 这个先放着 后面再做
     */
    @RequestMapping(value = "/save" , method = RequestMethod.POST)
    public ResponseEntity<JsonResultSet> saveEssay(@RequestBody BlogEssay blogEssay){
        JsonResultSet jsonResultSet = new JsonResultSet();
        try {
            blogEssayServiceImpl.saveOrUpdateBlogStatus(blogEssay);
            jsonResultSet.setStatusCode("0");
            jsonResultSet.setResultData("提交成功");
        }catch (Exception e){
            jsonResultSet.setStatusCode("1");
            jsonResultSet.setResultData(e.getMessage());
        }
        return ResponseEntity.ok(jsonResultSet);
    }

    /*
        根据页数获取文章 这里暂且只考虑用户只有我一个人 不然这里需要做人员校验
     */
    @RequestMapping(value = "/query/page/{pageNum}" , method = RequestMethod.GET)
    public ResponseEntity<JsonResultSet> queryByPage(@PathVariable(value = "pageNum")int pageNum , HttpServletRequest request){
        JsonResultSet  jsonResultSet = new JsonResultSet();

        int size = 8;
        Sort sort = new Sort(Sort.Direction.DESC,"id");
        List<BlogEssay> blogEssays = blogEssayServiceImpl.getEssayByPage(size,pageNum,sort);
        if(blogEssays.size()>0){
            jsonResultSet.setStatusCode("0");
            jsonResultSet.setResultData(blogEssays);
        }else {
            jsonResultSet.setStatusCode("1");
            String resultMsg = "找不到数据";
            jsonResultSet.setResultData(request);
        }
        return ResponseEntity.ok(jsonResultSet);
    }

    /*
        获取文章总数 返回文章数和页面数
     */
    @RequestMapping(value = "/getPageNum")
    public ResponseEntity<JsonResultSet> queryPageNum(){
        JsonResultSet jsonResultSet = new JsonResultSet();
        long essayNum = blogEssayServiceImpl.getPageNum();
        PageCount pageCount = new PageCount();
        pageCount.setEssayNum(essayNum);
        int pageNum = 0;
        if(essayNum%8!=0){
            pageNum = (int)essayNum/8 + 1;
        }else {
            pageNum = (int)essayNum/8;
        }
        pageCount.setPageNum(pageNum);
        jsonResultSet.setStatusCode("0");
        jsonResultSet.setResultData(pageCount);
        return ResponseEntity.ok(jsonResultSet);
    }

    @GetMapping(value = "/getBlog/{id}")
    public ResponseEntity<JsonResultSet> getBlog(@PathVariable(value = "id")Long id){
       // System.out.println("in to method :"+id);
        JsonResultSet jsonResultSet = new JsonResultSet();
        BlogEssay blogEssay = blogEssayServiceImpl.getEssayById(id);
        if(blogEssay!=null){
            //System.out.println(blogEssay.getViews_num());
            blogEssay.setViewsNum(blogEssay.getViewsNum()+1);
            blogEssayServiceImpl.saveOrUpdateBlogStatus(blogEssay);
            String picPath =filePathDir + blogEssay.getPic();
            blogEssay.setPic(Pic2base64.getPicBase64(picPath));
            jsonResultSet.setStatusCode("0");
            jsonResultSet.setResultData(blogEssay);
        }else {
            jsonResultSet.setStatusCode("1");
        }
        return ResponseEntity.ok(jsonResultSet);
    }

    @GetMapping(value = "/getHotBlog")
    ResponseEntity<JsonResultSet> getHotestBlog(){
        logger.info("into getHotestBlog");
        JsonResultSet jsonResultSet = new JsonResultSet();
        List<BlogEssay> blogEssays = new ArrayList<>();

        blogEssays = blogEssayServiceImpl.getHotBlogEssay();
        if (blogEssays!=null&&blogEssays.size()>0){
            logger.info(Integer.valueOf(blogEssays.size()).toString());
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
        return ResponseEntity.ok(jsonResultSet);
    }


}
