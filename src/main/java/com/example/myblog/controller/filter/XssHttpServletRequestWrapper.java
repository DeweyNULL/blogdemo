package com.example.myblog.controller.filter;

import com.example.myblog.tools.JsoupCleanUtil;
import com.example.myblog.tools.NullTool;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

/**
 * @program myblog
 * @description: 重写请求参数
 * @author: xielinzhi
 * @create: 2018/12/17 16:43
 */

public class XssHttpServletRequestWrapper extends HttpServletRequestWrapper {

    HttpServletRequest orgRequest = null;
    public XssHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
        orgRequest = request;
    }

    public String getParameter(String name){
        Boolean flag = ("content".equals(name) || name.endsWith("WithHtml"));
        if( flag){
            return super.getParameter(name);
        }
        name = JsoupCleanUtil.clean(name);
        String value = super.getParameter(name);
        if (NullTool.isNotNull(value)) {
            value = JsoupCleanUtil.clean(value);
        }
        return value;

    }

    @Override
    public String[] getParameterValues(String name) {
        String[] arr = super.getParameterValues(name);
        if(arr != null){
            for (int i=0;i<arr.length;i++) {
                arr[i] = JsoupCleanUtil.clean(arr[i]);
            }
        }
        return arr;
    }


    /**
     * 覆盖getHeader方法，将参数名和参数值都做xss过滤。
     * 如果需要获得原始的值，则通过super.getHeaders(name)来获取
     * getHeaderNames 也可能需要覆盖
     */
    @Override
    public String getHeader(String name) {
        name = JsoupCleanUtil.clean(name);
        String value = super.getHeader(name);
        if (NullTool.isNotNull(value)) {
            value = JsoupCleanUtil.clean(value);
        }
        return value;
    }

    /**
     * 获取最原始的request
     *
     * @return
     */
    public HttpServletRequest getOrgRequest() {
        return orgRequest;
    }

    /**
     * 获取最原始的request的静态方法
     *
     * @return
     */
    public static HttpServletRequest getOrgRequest(HttpServletRequest req) {
        if (req instanceof XssHttpServletRequestWrapper) {
            return ((XssHttpServletRequestWrapper) req).getOrgRequest();
        }

        return req;
    }


}
