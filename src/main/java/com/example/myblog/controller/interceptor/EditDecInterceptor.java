package com.example.myblog.controller.interceptor;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @program myblog
 * @description: 编辑界面需要拦截
 * @author: xielinzhi
 * @create: 2018/11/27 17:15
 */

public class EditDecInterceptor implements HandlerInterceptor {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // TODO Auto-generated method stub
        //logger.debug("into interceptor");

        HttpSession session = request.getSession();
        String username = (String) session.getAttribute("ACCOUNT_IN_SESSION");
        String url = request.getRequestURI();
        //logger.debug("username:"+username);
        if (stringIsNull(username) ) {
            response.sendRedirect("home");
            return false;
        } else {
            return true;
        }

    }

    private boolean stringIsNull(String temp){
        return ("".equals(temp) || null == temp);
    }
}
