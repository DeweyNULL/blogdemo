/**
 * @program myblog
 * @description: for user login & logout
 * @author: xielinzhi
 * @create: 2018/11/22 14:42
 */


package com.example.myblog.controller;

import com.example.myblog.entity.JsonResultSet;
import com.example.myblog.entity.User;
import com.example.myblog.service.AccountService;
import com.example.myblog.tools.NullTool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class AccountController {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    AccountService accountService;

    @RequestMapping("/login")
    @ResponseBody
    public JsonResultSet tryLogin(@RequestBody User user, HttpServletRequest request , HttpServletResponse response){

        logger.debug("user.password:"+user.getPassword());
        JsonResultSet jsonResultSet = new JsonResultSet();
        if (user!=null && NullTool.isNotNull(user.getUsername())){
            HttpSession session = request.getSession();
            String username = (String) session.getAttribute("ACCOUNT_IN_SESSION");
            if(!NullTool.isNull(username)){
                jsonResultSet.setStatusCode("1");
                jsonResultSet.setResultData("用户已经登录！");
            }
            else if(accountService.getAccountInfo(user)){
                jsonResultSet.setStatusCode("0");
                session.setAttribute("ACCOUNT_IN_SESSION",user.getUsername()); //设置user
                session.setMaxInactiveInterval(60*15);
                Cookie cookie = new Cookie("isLogin","1");
                cookie.setMaxAge(60*15);
                response.addCookie(cookie);
                jsonResultSet.setResultData("on");

            }else {
                jsonResultSet.setStatusCode("1");
                jsonResultSet.setResultData("账号或者密码错误");
            }
        }
        else{
            jsonResultSet.setStatusCode("1");
            jsonResultSet.setResultData("hehe");
        }
        return jsonResultSet;
    }

    @RequestMapping("/logout")
    @ResponseBody
    public JsonResultSet tryLogout(HttpServletRequest request,HttpServletResponse response){

        JsonResultSet jsonResultSet = new JsonResultSet();
        HttpSession session = request.getSession();
        session.removeAttribute("ACCOUNT_IN_SESSION");
        Cookie cookie = new Cookie("isLogin","0");
        cookie.setMaxAge(1);
        response.addCookie(cookie);
        jsonResultSet.setStatusCode("0");
        return  jsonResultSet;
    }
}
