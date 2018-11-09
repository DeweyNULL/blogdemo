package com.example.myblog;

import com.example.myblog.tools.Pic2base64;
import org.junit.Test;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @auther : Dewey
 * @date : 2018/9/3 17 26
 * @description :
 */
public class NormalTest {

//    @Test
//    public void formatDateTest(){
//        Date currentTime = new Date();
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        String dateString = formatter.format(currentTime);
//        ParsePosition pos = new ParsePosition(8);
//        Date currentTime_2 = formatter.parse(dateString, pos);
//
//        System.out.println(currentTime_2.toString());
//    }


//    //base64加密图像的一个实验：
//    @Test
//    public void base64pictest(){
//        String picbase64 = Pic2base64.getPicBase64("C:\\work\\GoogleDownload\\img\\00.jpg");
//        System.out.println(picbase64);
//    }

    @Test
    public void andOrTest(){
        List<String> tempList = null;

        if(true||tempList.size()>1){
            System.out.println(" or ");
        }

        if(false &&tempList.size()>0){
            System.out.println("and");
        }

        try{
            if(tempList.size()>0 ||true){
                System.out.println("list");
            }
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("Exception:"+e.getMessage());

        }
    }
}
