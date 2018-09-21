
var pageAmout;

$(function () {
    getEssay(0);
    getPageCount();
})


//初始化文章区域
function getEssay(pageNum) {
    $.ajax({
        url:"query/page/"+pageNum,
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
                        result.resultData[i].comment_num
                    )
                }

            }else {

            }
        }
    })
}

function getPageCount(getCount) {
    $.ajax({
        url:"getPageNum",
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
//首页图片picUrl 文章属性(是否置顶) 文章标题title 文章summary 作者author 时间time 评论数commentNum
function printOutEssay(picUrl,properties,title,summary,author , time , commentNum) {

    if(properties==null) {
        var httpstr =
            '<div class="panel">' +
            '<div class="index-post-img">' +
            '<a href="">' +  //跳转到的文章页面
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

    changePage(pageNum)
}

