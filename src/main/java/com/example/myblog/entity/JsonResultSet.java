package com.example.myblog.entity;


/**
 * @auther : Dewey
 * @date : 2018/9/14 10 43
 * @description :
 */
public class JsonResultSet {

    private String statusCode;

    private Object resultData ;

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public Object getResultData() {
        return resultData;
    }

    public void setResultData(Object resultData) {
        this.resultData = resultData;
    }
}
