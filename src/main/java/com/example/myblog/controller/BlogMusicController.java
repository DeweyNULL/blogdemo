package com.example.myblog.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.URL;

/**
 * @auther : Dewey
 * @date : 2018/9/11 19 28
 * @description :
 */
@RestController
public class BlogMusicController {
    @RequestMapping(value = "/getMusicList/{type}/{id}" ,method = RequestMethod.GET)
    public String test(@PathVariable(value = "id") String id , @PathVariable(value = "type") String type){
        String APIUrl="https://www.moerats.com/usr/themes/handsome/libs/Get.php?type="+type+"&media=netease &id="+id;
      // System.out.println(APIUrl);
      //  String APIUrl="http://localhost:8090/getMusic/"+type+"/"+id;
        String Result;
        try {
            URL url = new URL(APIUrl);
            java.net.HttpURLConnection conn = (java.net.HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("GET");
            java.io.BufferedReader in = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream(), "UTF-8"));
            String line;
            String json = "";
            while ((line = in.readLine()) != null) {
                json += line;
                //  System.out.println(line);
            }
            Result = json;
           // System.out.println(json);
            // 到这里需要一个json字符串转json对象的包 先暂停
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
            Result = null;
        }
        return  Result;
    }


}
