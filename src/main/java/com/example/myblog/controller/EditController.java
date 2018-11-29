package com.example.myblog.controller;

import com.example.myblog.entity.JsonResultSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @auther : Dewey
 * @date : 2018/11/6 16 52
 * @description :
 */
@Controller
public class EditController {

    @Value("${picfile.path}")
    String picpath;

    Logger logger = LoggerFactory.getLogger(getClass());

    @RequestMapping("/editSave")
    @ResponseBody
    public String editSave(@RequestBody String content){

        logger.info(content);
        return content;
    }

    // 文件上传
    @RequestMapping(value = "/picUpload" , method = RequestMethod.POST)
    @ResponseBody
    public JsonResultSet picUpload(@RequestParam("file")MultipartFile file){
       JsonResultSet jsonResultSet = new JsonResultSet();
       if(!file.isEmpty()){
            try {
                byte[] bytes = file.getBytes();
                Path path = Paths.get(file.getOriginalFilename());
                if(!picpath.startsWith("no")){
                   path = Paths.get(picpath+file.getOriginalFilename());
                }
                if(path.isAbsolute()){
                    logger.info("into isAbsolute");
                }
                Files.write(path,bytes);

                jsonResultSet.setStatusCode("0");
                jsonResultSet.setResultData("上传成功!");
            }catch (Exception e){
                e.printStackTrace();
            }
       }else {
           jsonResultSet.setStatusCode("1");
           jsonResultSet.setResultData("文件为空!");
       }


       return jsonResultSet;
    }
}
