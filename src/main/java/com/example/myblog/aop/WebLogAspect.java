package com.example.myblog.aop;


import org.apache.log4j.Logger;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;



/**
 * @auther : Dewey
 * @date : 2018/9/6 14 18
 * @description :
 */

@Aspect
@Component
public class WebLogAspect {

    private Logger logger = Logger.getLogger(getClass());


}
