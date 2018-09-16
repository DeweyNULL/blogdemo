package com.example.myblog.entity;


/**
 * @auther : Dewey
 * @date : 2018/9/14 10 43
 * @description :
 */
public class JsonResultSet {

    private String statusCode;

    private Object resuitData ;

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public Object getResuitData() {
        return resuitData;
    }

    public void setResuitData(Object resuitData) {
        this.resuitData = resuitData;
    }
}
