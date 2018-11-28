package com.example.myblog.configuration;

import com.example.myblog.controller.interceptor.EditDecInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @program myblog
 * @description: 拦截器的配置
 * @author: xielinzhi
 * @create: 2018/11/28 09:55
 */

@Configuration
public class MyWebInterceptorConf implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new EditDecInterceptor()).addPathPatterns("/write/**");
    }
}
