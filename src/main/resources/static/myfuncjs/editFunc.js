var basePath = "/";
var pageAmout;

$(function () {

    var blogId =$("#hasPageId").val();
    if(isNull(blogId)|| blogId == "${blogId}"){
        back2home();
    }
    else {
        readEssay(blogId);

    }



})
//判断为空
function isNull(data){
    if(data==undefined || data == null || data == ""){
        return true;
    }
    return false;
}

//初始化文章区域
function getEssay(pageNum) {
    $.ajax({
        url:basePath+"query/page/"+pageNum,
        success:function (result) {
            if(result.statusCode=="0"){

                //console.log(JSON.stringify(resultdata));
                for(var i = 0 ; i<result.resultData.length;i++){
                    printOutEssay(
                        result.resultData[i].pic,
                        result.resultData[i].essay_properties,
                        result.resultData[i].essay_title,
                        result.resultData[i].summary,
                        result.resultData[i].auther_name,
                        result.resultData[i].time,
                        result.resultData[i].comment_num,
                        result.resultData[i].id
                    )
                }


            }else {

            }
        }
    })
}

function getPageCount(getCount) {
    $.ajax({
        url:basePath+"getPageNum",
        success:function (responseData) {
            if (responseData.statusCode=="0" && getCount ==undefined ){
                //console.log(JSON.stringify(responseData));
                pageAmout = parseInt(responseData.resultData.pageNum);
                printOurPage(responseData.resultData.pageNum);

            } else if(getCount!=undefined){
                return responseData.resultData.pageNum;
            }
        }

    })
}


//返回需要的参数
//首页图片picUrl 文章属性(是否置顶) 文章标题title 文章summary 作者author 时间time 评论数commentNum 文章编号：id
function printOutEssay(picUrl,properties,title,summary,author , time , commentNum , id) {

    if(properties==null) {
        var httpstr =
            '<div class="panel">' +
            '<div class="index-post-img">' +
            '<a href="javascript:void(0);" onclick="readEssay('+id+')" >' +  //跳转到的文章页面
            '<div class="item-thumb lazy" style="background-image: url(data:image/png;base64,' +
            picUrl +
            ')"></div>' +
            '</a>' +
            '</div>' +
            '<div class="post-meta wrapper-lg">' +
            '<h2 class="m-t-none index-post-title"><a href="">' +
            title +
            '</a></h2>' + //跳转到的文章页面
            '<p class="summary">'+
            summary+'</p>' +
            '<div class="line line-lg b-b b-light"></div>' +
            '<div class="text-muted post-item-foot-icon">' +
            '<i class="glyphicon glyphicon-user text-muted"></i><span class="m-r-sm">&nbsp;<a href="">' +
            author +
            '</a></span>' +
            '<i class="layui-icon layui-icon-log text-muted"></i><span class="m-r-sm">&nbsp;' +
            time.split("T")[0] + '</span>' +
            '<a href="" class="m-l-sm"><i class="glyphicon glyphicon-comment text-muted"></i>&nbsp;' +
            commentNum +
            '条评论</a>' +
            '</div>' +
            '</div>' +
            '</div>';

        $("#EssayArea").append(httpstr);
    }
}

function printOurPage(pageNumber) {
    var mybar = $("#pageBar");

   // $("#pageBar").append(httpStr);

    //
    var options = {
        bootstrapMajorVersion: 3, //版本
        currentPage: 1, //当前页数
        numberOfPages:5,
        totalPages: pageNumber, //总页数
        itemTexts: function (type, page, current) {
            switch (type) {
                case "first":
                    return "首页";
                case "prev":
                    return "上一页";
                case "next":
                    return "下一页";
                case "last":
                    return "末页";
                case "page":
                    return page;
            }
        },//点击事件，用于通过Ajax来刷新整个list列表
        onPageClicked: function (event, originalEvent, type, page) {
            //console.log("into click" + page);
            getPageEssay(page);
        }
    };
    mybar.bootstrapPaginator(options);

}

function getPageEssay(pageNum) {

    $("li.current").removeClass();

    $("#page"+pageNum).addClass("current");

    $('#EssayArea').html("");
    getEssay(pageNum-1);

    //changePage(pageNum);
}

function back2home() {
    var blogControl = $('#blogControl');
    var httpStr = '<header class="bg-light lter b-b wrapper-md">\n' +
        '<h1 class="m-n font-thin h3 text-black l-h"></h1>\n' +
        '<small class="text-muted letterspacing indexWords">Hello world……</small>\n' +
        '</header>\n' +
        '<div class="wrapper-md" id="post-panel">\n' +
        '<!--首页输出文章-->\n' +
        '<div class="blog-post" id="EssayArea">\n' +
        '<!--  文章输出地方-->\n' +
        '</div>\n' +
        '<!-- 描述：分页-->\n' +'<div class="text-center">'+
        '<ul id="pageBar"></ul>\n' +'</div>'+
        '<div id="comment"></div>'+
        '</div>';
    blogControl.html("");
    blogControl.append(httpStr);
    getEssay(0);
    getPageCount();
    setRightColunm();
    var stateObject = {id: "http://localhost:9099/home"};
    var title = "标题 "+"http://localhost:9099/home";
    var newUrl = "http://localhost:9099/home";
    history.pushState(stateObject,title,newUrl);

}
//输出blog内容
function readEssay(id) {
    //console.log("in blog");
    $.ajax({
        url:basePath+"getBlog/"+id,
        success:function (result) {
           // console.log(result.statusCode);
            //console.log(result.resultData);
            if(result.statusCode=="0"){ // 输出文章
                printOurBlog(result.resultData);
            }
        }
    })
    //console.log(id);
    setRightColunm();
}

//文章页面打印
function printOurBlog(blog) {
    var blogControl = $('#blogControl');
    if(blog.essay_type==null) blog.essay_type = "未分类";
    var httpString =
        ' <style>\n' +
        '        .mdx-si-head .cover{\n' +
        '            object-fit: cover;\n' +
        '            width: 100%;\n' +
        '            height: 100%\n' +
        '        }\n' +
        '</style>'+
        '<header id="small_widgets" class="bg-light lter b-b wrapper-md">\n' +
        '             <h1 class="entry-title m-n font-thin h3 text-black l-h">'+ blog.essay_title+'</h1>' +
        '                  <ul class="entry-meta text-muted list-inline m-b-none small\n' +
        '             post-head-icon">\n' +
        '             <!--作者-->\n' +
        '             <li class="meta-author"><i class="glyphicon glyphicon-user text-muted" aria-hidden="true"></i><span class="sr-only">博主：</span> <a class="meta-value" > '+blog.auther_name+'</a></li>\n' +
        '             <!--发布时间-->\n' +
        '             <li class="meta-date"><i class="layui-icon layui-icon-log text-muted" aria-hidden="true"></i>&nbsp;<span class="sr-only">发布时间：</span><time class="meta-value">'+blog.time.split("T")[0]+'</time></li>\n' +
        '             <!--浏览数-->\n' +
        '             <li class="meta-views"><i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i>&nbsp;<span class="meta-value">'+blog.viewsNum+'&nbsp;次浏览</span></li>\n' +
        '             <!--评论数-->\n' +
        '             <li class="meta-comments"><i class="glyphicon glyphicon-comment text-muted" aria-hidden="true"></i>&nbsp;<a class="meta-value" href="#comments">'+blog.comment_num+'&nbsp;</a></li>\n' +
        '             <!--分类-->\n' +
        '             <li class="meta-categories"><i class="\tglyphicon glyphicon-tags" aria-hidden="true"></i> <span class="sr-only">分类：</span> <span class="meta-value"><a >'+blog.essay_type+'</a></span></li>\n' +
        '         </ul>\n' +
        '      </header>'+
        '<div class="wrapper-md" id="post-panel">'+
        '<ol class="breadcrumb bg-white b-a" itemscope=""><li>\n' +
        '            <a href="javascript:void(0);" onclick="back2home()" itemprop="breadcrumb" title="" data-toggle="tooltip" data-original-title="返回首页"><i class="glyphicon glyphicon-home " aria-hidden="true"></i>&nbsp;首页</a>\n' +
        '        </li><li class="active">正文&nbsp;&nbsp;</li></ol>\n' +
        '        <div id="postpage" class="blog-post" style="font-size: 14px;">\n' +
        '            <article class="panel">\n' +
        '                <!--文章页面的头图-->\n' +
        '                <div class="entry-thumbnail" aria-hidden="true"><div class="item-thumb lazy" style="background-image: url(data:image/png;base64,'+blog.pic+')"></div></div> '+
        '<div id="post-content" class="wrapper-lg">\n' +
        '                    <div class="entry-content l-h-2x">\n' +
        blog.essay_content+
        '</div></div>'+
        ' </article>\n' +
        '        </div>'+
        '<nav class="m-t-lg m-b-lg">\n' +
        '        <ul class="pager">\n' +
        '        <li class="next"> <a href="javascript:void(0)" title="" data-toggle="tooltip" data-original-title="上一篇"> 下一篇 </a></li>   <li class="previous"> <a href="javascript:void(0)" title="" data-toggle="tooltip" data-original-title="下一篇"> 上一篇 </a></li>\n' +
        '        </ul>\n' +
        '       </nav>'+
        '</div>' ;



    blogControl.html("");
    blogControl.append(httpString);
    printOutCommentAreaHttp(blog.id);
   // window.location.replace("http://localhost:9099/home/blog/"+blog.id);
    var stateObject = {id: "http://localhost:9099/home/blog/"+blog.id};
    var title = "标题 "+"http://localhost:9099/home/blog/"+blog.id;
    var newUrl = "http://localhost:9099/home/blog/"+blog.id;
    history.pushState(stateObject,title,newUrl);
}


function setRightColunm() {
    $("#mostViewsBlog").html("");
    $.ajax({
        url:basePath+"getHotBlog",
        success:function (data) {
            if (data.statusCode=='0'){
                var httpOutPrint = "";
                for (var i = 0 ; i < data.resultData.length;i++){
                    var httpstr = '<li class="list-group-item">\n' +
                        '<a href="javascript:void(0)" onclick="readEssay('+data.resultData[i].id+')"class="pull-left thumb-sm m-r"><img style="height: 40px!important;width: 40px!important;" src="/static/img/-643b0d1dc704d923.jpg" class="img-circle"></a>\n' +
                        '<div class="clear">\n' +
                        '<h4 class="h5 l-h"> <a href="javascript:void(0)" onclick="readEssay('+data.resultData[i].id+')" title="'+data.resultData[i].essay_title+'"> '+data.resultData[i].essay_title+' </a></h4>\n' +
                        '<small class="text-muted post-head-icon">\n' +
                        '                    <span class="meta-views"> <i class="glyphicon glyphicon-comment" aria-hidden="true"></i> <span class="sr-only">评论数：</span> <span class="meta-value">'+data.resultData[i].comment_num+'</span>\n' +
                        '                    </span>\n' +
                        ' <span class="meta-date m-l-sm"> <i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i> <span class="sr-only">浏览次数:</span> <span class="meta-value">'+data.resultData[i].viewsNum+'</span>\n' +
                        '                    </span>\n' +
                        '</small>\n' +
                        '</div>\n' +
                        '</li>';
                    httpOutPrint+=httpstr;
                }
                $("#mostViewsBlog").append(httpOutPrint);
            }
        }
        
    });
    


}

// 评论区：
function printOutCommentAreaHttp(Id){
    var postpanel = $("#post-panel");
    var commentHttp='<div id="comments" class="">'+
        '<div id="respond-post" class="respond comment-respond">\n' +
        '\n' +
        '                <h4 id="reply-title" class="comment-reply-title m-t-lg m-b">发表评论 \n' +
        '                </h4>\n' +
        '                <form id="comment_form"  action="" class="comment-form" role="form">\n' +
        '                    <div class="comment-form-comment form-group">\n' +
        '                        <textarea id="repContent" class="textarea form-control OwO-textarea" name="text" rows="5" ></textarea>\n' +
        '                        <label for="comment">评论                            <span class="required text-danger">*</span></label>\n' +
        '                        <textarea id="comment" class="textarea form-control OwO-textarea" name="text" rows="5" placeholder="说点什么吧……" onkeydown="if(event.ctrlKey&amp;&amp;event.keyCode==13){document.getElementById(\'commentSubmit\').click();return false};"></textarea>\n' +
        '                    </div>\n' +
        '                    <!--判断是否登录-->\n' +
        '                                                                <div id="author_info" class="row row-sm">\n' +
        '                                                        <div class="comment-form-author form-group col-sm-6 col-md-4">\n' +
        '                                <label for="author">名称                                    <span class="required text-danger">*</span></label>\n' +
        '                                <div>\n' +
        '                                                                        <img class="author-avatar" src="https://cdn.v2ex.com/gravatar/d41d8cd98f00b204e9800998ecf8427e?s=65&amp;r=G&amp;d=" nogallery="">\n' +
        '                                <input id="author" class="form-control" name="author" type="text" value="" maxlength="245" placeholder="姓名或昵称">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '\n' +
        '                            <div class="comment-form-email form-group col-sm-6 col-md-4">\n' +
        '                                <label for="email">邮箱                                    <span class="required text-danger">*</span>\n' +
        '                                </label>\n' +
        '                                <input type="text" name="mail" id="mail" class="form-control" placeholder="邮箱 (必填,将保密)" value="">\n' +
        '                            </div>\n' +
        '\n' +
        '                            <div class="comment-form-url form-group col-sm-12 col-md-4">\n' +
        '                                <label for="url">地址</label>\n' +
        '                                <input id="url" class="form-control" name="url" type="url" value="" maxlength="200" placeholder="网站或博客"></div>\n' +
        '                        </div>\n' +
        '                                                <!--提交按钮-->\n' +
        '                        <div class="form-group">\n' +
        '                            <button type="button" name="commentSubmit" id="commentSubmit" class=" btn btn-success padder-lg" onclick="commentSubmitEvent()">\n' +
        '                                <span class="text">发表评论</span>\n' +
        '                                <span class="text-active">提交中...</span>\n' +
        '                            </button>\n' +
        '                            <i class="animate-spin fontello fontello-spinner hide" id="spin"></i>\n' +
        '                            <input type="hidden" name="comment_post_ID" id="comment_post_ID">\n' +
        '                            <input type="hidden" name="comment_parent" id="comment_parent">\n' +
        '                            <input type="hidden" name="comment_replyTo" id="comment_replyTo">\n' +
        '                        </div>\n' +
        '                </form>\n' +
        '            </div>'+
        '</div>';
    postpanel.append(commentHttp);
    $.ajax({
        url:"/blogComment/"+Id,
        success:function (respData) {
            //console.log(respData);
            if(respData.statusCode=="0"){
                printOutCommentContent(respData.resultData);
            }
        }
    });
}

function commentSubmitEvent() {
    //console.log("into comment");
    //將表單序列化成json
    var form = $("#comment_form").serializeJSON();
    var url = window.location.href.split("/");
    //console.log(form);
    var data = {
        "essayId": url[url.length-1],
        "commentId":form.comment_post_ID,
        "commentRec":form.comment_parent,
        "commentContent":form.text,
        "userName":form.author,
        "userEmail":form.mail,
        "userWeb":form.url
    };
    //console.log(data);
    $.ajax({
        type:"post",
        url:window.location.href+"/saveComment/"+form.comment_replyTo,
        data:JSON.stringify(data),
        dataType:'json',
        contentType: "application/json",
        success:function(resp){
            document.getElementById("comment_form").reset()
        },
        error:function () {
            console.log("未知錯誤");
        }
    })
    //console.log(form);
}


//写出具体评论区
function printOutCommentContent(data) {
    var httpPreStr = '<h4 class="comments-title m-t-lg m-b">共有'+ data.commentNum+'条评论</h4>';
    var httpMidStr = '<ol class="comment-list">';
    for(var i=0 ; i<data.commentVOList.length;i++ ){
        var superCommentHttp = '<li  class="comment-body comment-parent comment-odd">'+
            '<div id="" class="comment-body">\n' +
            '\n' +
            '    <a class="pull-left thumb-sm">\n' +
            '        <img nogallery="" src="" class="avatar-40 photo img-circle" style="height:40px!important; width: 40px!important;">                </a>\n' +
            '    <div class="m-b m-l-xxl">\n' +
            '        <div class="comment-meta">\n' +
            '            <span class="comment-author vcard">\n' +
            '              <b class="fn"><a href="https://www.lolikong.pw" target="_blank" rel="external nofollow">'+
            data.commentVOList[i].superComment.userName+
                '</a></b>              </span>\n' +
            '            <div class="comment-metadata">\n' +
            '                <time class="format_time text-muted text-xs block m-t-xs" pubdate="pubdate" datetime="'+
            timeHandle(data.commentVOList[i].superComment.time)+'">'+timeHandle(data.commentVOList[i].superComment.time)+'</time>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <!--回复内容-->\n' +
            '        <div class="comment-content m-t-sm">\n' +
            '            <span class="comment-author-at"><b></b></span><span class="comment-content-true">\n' +
            '                            <p>'+
            data.commentVOList[i].superComment.commentContent+
            '</p>                        </span>\n' +
            '        </div>\n' +
            '        <!--回复按钮-->\n' +
            '        <div class="comment-reply m-t-sm">\n' +
            '            <a href="javascript:void(0)" rel="nofollow" onclick="reply('+i+','+(data.commentVOList[i].childrenComment.length+1)+',\''+data.commentVOList[i].superComment.userName+'//'+data.commentVOList[i].superComment.commentRec+'\')">回复</a>                    </div>\n' +
            '    </div>\n' +
            '\n' +
            '</div>';
        for(var j =0 ; j <data.commentVOList[i].childrenComment.length;j++){
           if(j==0){
               superCommentHttp+='<div class="comment-children list-unstyled m-l-xxl">\n' +
                   '    <ol class="comment-list">';
           }
           superCommentHttp+=
               '<li id="" class="comment-body comment-child comment-level-odd comment-odd comment-by-author">\n' +
               '            <div id="" class="comment-body">\n' +
               '\n' +
               '                <a class="pull-left thumb-sm">\n' +
               '                    <img nogallery="" src="" class="avatar-40 photo img-circle" style="height:40px!important; width: 40px!important;">                </a>\n' +
               '                <div class="m-b m-l-xxl">\n' +
               '                    <div class="comment-meta">\n' +
               '            <span class="comment-author vcard">\n' +
               '              <b class="fn">'+
               data.commentVOList[i].childrenComment[j].userName+
               '</b>             </span>\n' +
               '                        <div class="comment-metadata">\n' +
               '                            <time class="format_time text-muted text-xs block m-t-xs" pubdate="pubdate" datetime="">'+
               timeHandle(data.commentVOList[i].childrenComment[j].time)+
               '</time>\n' +
               '                        </div>\n' +
               '                    </div>\n' +
               '                    <!--回复内容-->\n' +
               '                    <div class="comment-content m-t-sm">\n' +
               '                        <span class="comment-author-at"></span><span class="comment-content-true">\n' +
               '                            <p>'+
               data.commentVOList[i].childrenComment[j].commentContent
               +'</p>                        </span>\n' +
               '                    </div>\n' +
               '                    <!--回复按钮-->\n' +
               '                    <div class="comment-reply m-t-sm">\n' +
               '                        <a href="javascript:void(0)" rel="nofollow" onclick="reply('+i+','+(data.commentVOList[i].childrenComment.length+1)+',\''+data.commentVOList[i].childrenComment[j].userName+'//'+data.commentVOList[i].childrenComment[j].commentRec+'\')">回复</a>                    </div>\n' +
               '                </div>\n' +
               '\n' +
               '            </div>\n' +
               '        </li>';
           if(j==data.commentVOList[i].childrenComment.length-1){
               superCommentHttp+='    </ol> <!-- 嵌套评论所有内容-->\n' +
                   '</div>';
           }

        }
        httpMidStr+=superCommentHttp;
    }
    httpPreStr=httpPreStr+httpMidStr+'</ol><nav class="text-center m-t-lg m-b-lg" role="navigation"></nav>';
    $("#post-panel").append(httpPreStr);

}

function reply(commentId,commentRep,replyto) {
    var comment = $("#comment");
    comment.focus();
    comment.val("@"+replyto.split("//")[0]+":");
    $("#comment_post_ID").val(commentId);
    $("#comment_parent").val(commentRep);
    $("#comment_replyTo").val(replyto.split("//")[1]);
    //$("#repContent").val();
    //document.getElementById("repContent").style.display="block";
}
function timeHandle(timeStr) {
    var timeYMS = timeStr.split("T")[0];
    var timeHMS = timeStr.split("T")[1].split(".000")[0];
    return timeYMS+"--"+timeHMS;
}