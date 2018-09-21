package com.example.myblog.tools;

import java.io.FileInputStream;
import java.io.InputStream;
import org.apache.commons.codec.binary.Base64;
/**
 * @auther : Dewey
 * @date : 2018/9/17 15 51
 * @description :
 */
public class Pic2base64 {

    public static synchronized String getPicBase64(String picfilepath){

        InputStream in = null;
        byte[] data = null;

        try {
            in = new FileInputStream(picfilepath);
            data  = new byte[in.available()];

            in.read(data);
            in.close();
        }catch (Exception e){
            e.printStackTrace();
        }

        return new String(Base64.encodeBase64(data));
    }
}