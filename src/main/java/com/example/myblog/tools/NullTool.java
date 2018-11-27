package com.example.myblog.tools;

/**
 * @program myblog
 * @description: 判断字符串是否为null或者不为null
 * @author: xielinzhi
 * @create: 2018/11/23 14:57
 */

public class NullTool {

    public static boolean isNull(String temp){
        if(temp==null || "".equals(temp)){
            return  true;
        }
        return false;
    }

    public static boolean isNotNull(String temp){
        if(temp!=null && !"".equals(temp)){
            return true;
        }
        return false;
    }
}
