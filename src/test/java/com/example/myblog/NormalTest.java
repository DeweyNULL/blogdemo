package com.example.myblog;

import org.junit.Test;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @auther : Dewey
 * @date : 2018/9/3 17 26
 * @description :
 */
public class NormalTest {

    @Test
    public void formatDateTest(){
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(currentTime);
        ParsePosition pos = new ParsePosition(8);
        Date currentTime_2 = formatter.parse(dateString, pos);

        System.out.println(currentTime_2.toString());
    }
}
