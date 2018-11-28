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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class AccountController {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    AccountService accountService;

    @RequestMapping("/login")
    @ResponseBody
    public JsonResultSet tryLogin(@RequestBody User user, HttpServletRequest request){

        logger.info("user.password:"+user.getPassword());
        JsonResultSet jsonResultSet = new JsonResultSet();
        if (user!=null && NullTool.isNotNull(user.getUsername())){
            if(accountService.getAccountInfo(user)){
                jsonResultSet.setStatusCode("0");
                HttpSession session = request.getSession();
                session.setAttribute("ACCOUNT_IN_SESSION",user.getUsername()); //设置user
                jsonResultSet.setResultData("on");

            }else {
                jsonResultSet.setStatusCode("1");
                jsonResultSet.setResultData("off");
            }
        }
        return jsonResultSet;
    }

    @RequestMapping("/logout")
    @ResponseBody
    public JsonResultSet tryLogout(HttpServletRequest request){

        JsonResultSet jsonResultSet = new JsonResultSet();
        HttpSession session = request.getSession();
        session.removeAttribute("ACCOUNT_IN_SESSION");
        jsonResultSet.setStatusCode("0");
        return  jsonResultSet;
    }
}
