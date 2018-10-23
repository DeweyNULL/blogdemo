var basePath = "/";
var pageAmout;

$(function () {
    getEssay(0);
    getPageCount();
})


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

    if(pageNumber<=1){
        return;
    }
    var loopPage="";
    var j = 0;
    for (var i = 1; i<=pageNumber ; i++,j++ ){

        if(j<4){

            loopPage=loopPage+'<li id="page'+i+'"><a href="javascript:void(0)" onclick="getPageEssay('+ i +')">'+i+'</a></li>';
        }else {
            loopPage=loopPage+'</li><li><span>...</span></li>';
            break;
        }
    }

    if (pageNumber>4){
        loopPage=loopPage+'<li id="page'+pageNumber+'"><a href="javascript:void(0)" onclick="getPageEssay('+ pageNumber +')">'+pageNumber+'</a></li>';
    }

    loopPage=loopPage+'<li class="next"><a href=""><i class="glyphicon glyphicon-chevron-right"></i></a></li>';


    var httpStr = '<nav class="text-center m-t-lg m-b-lg" role="navigation" id = "pagebar">'+
        '<ol class="page-navigator">'+
        loopPage+
        '</ol></nav>';

    $("#pageBar").append(httpStr);
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
        '<!-- 描述：分页-->\n' +
        '<div id="pageBar"></div>\n' +
        '</div>';
    blogControl.html("");
    blogControl.append(httpStr);
    getEssay(0);
    getPageCount();
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
        '             <li class="meta-views"><i class="glyphicon glyphicon-eye-open" aria-hidden="true"></i>&nbsp;<span class="meta-value">'+blog.views_num+'&nbsp;次浏览</span></li>\n' +
        '             <!--评论数-->\n' +
        '             <li class="meta-comments"><i class="glyphicon glyphicon-comment text-muted" aria-hidden="true"></i>&nbsp;<a class="meta-value" href="#comments">'+blog.comment_num+'&nbsp;</a></li>\n' +
        '             <!--分类-->\n' +
        '             <li class="meta-categories"><i class="\tglyphicon glyphicon-tags" aria-hidden="true"></i> <span class="sr-only">分类：</span> <span class="meta-value"><a >'+blog.essay_type+'</a></span></li>\n' +
        '         </ul>\n' +
        '      </header>'+
        '</div >';

    blogControl.html("");
    blogControl.append(httpString);
   // window.location.replace("http://localhost:9099/home/blog/"+blog.id);
    var stateObject = {id: "http://localhost:9099/home/blog/"+blog.id};
    var title = "标题 "+"http://localhost:9099/home/blog/"+blog.id;
    var newUrl = "http://localhost:9099/home/blog/"+blog.id;
    history.pushState(stateObject,title,newUrl);
}


