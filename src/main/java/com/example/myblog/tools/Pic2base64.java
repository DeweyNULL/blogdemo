package com.example.myblog.tools;

import java.io.FileInputStream;
import java.io.InputStream;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @auther : Dewey
 * @date : 2018/9/17 15 51
 * @description :
 */
public class Pic2base64 {

    private static Logger logger = LoggerFactory.getLogger("Pic2base64");

    public static synchronized String getPicBase64(String picfilepath){

        InputStream in = null;
        byte[] data = null;

        if(picfilepath.startsWith("no")){
            return null;
        }
        try {

            in = new FileInputStream(picfilepath);
            data  = new byte[in.available()];

            in.read(data);
            in.close();
        }catch (Exception e){
            logger.debug("no such file ： "+picfilepath);
            return null;
        }

        return new String(Base64.encodeBase64(data));
    }
}
