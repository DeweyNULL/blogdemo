package com.example.myblog.tools;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.safety.Whitelist;

/**
 * @program myblog
 * @description: 用来清理部分html标签
 * @author: xielinzhi
 * @create: 2018/12/17 16:32
 */

public class JsoupCleanUtil {

    private static final Whitelist whitelist = Whitelist.relaxed();

    /** 配置过滤化参数,不对代码进行格式化 */
    private static final Document.OutputSettings outputSettings = new Document.OutputSettings().prettyPrint(false);

    static {
        whitelist.addAttributes(":all","style");
    }

    public static String clean(String content){

        if(NullTool.isNotNull(content)) {
            content = content.trim();
        }

        return Jsoup.clean(content,"",whitelist,outputSettings);

    }
}
