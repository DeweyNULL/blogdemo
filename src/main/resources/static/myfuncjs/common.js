
function showLayerSucessMsg(msg){
    layer.confirm(msg,{icon: 1, title:'提示',//失败图标
        btn : [ '确定' ]//按钮
    },function(index) {
        layer.close(index);
    });
}
function showLayerMsg(msg, time){
    layer.msg(msg, {
        icon: 1,//成功图标
        time: time || 2000 //2秒关闭（如果不配置，默认是3秒）
    });
}
function showLayerFailMsg(msg){
    layer.confirm(msg,{icon: 2, title:'提示',//失败图标
        btn : [ '确定' ]//按钮
    },function(index) {
        layer.close(index);
    });
}


var main = {
    "mainblog":'<main class="app-content-body animated ng-enter">\n' +
        '\t\t\t<div class="hbox hbox-auto-xs hbox-auto-sm" >\n' +
        '\t\t\t\t<div class="col center-part" id="blogControl">\n' +
        '\t\t\t\t\t<header class="bg-light lter b-b wrapper-md">\n' +
        '\t\t\t\t\t\t<h1 class="m-n font-thin h3 text-black l-h"></h1>\n' +
        '\t\t\t\t\t\t<small class="text-muted letterspacing indexWords" id="blogInfo"></small>\n' +
        '\t\t\t\t\t</header>\n' +
        '\t\t\t\t\t<div class="wrapper-md" id="post-panel">\n' +
        '\t\t\t\t\t\t<!--首页输出文章-->\n' +
        '\t\t\t\t\t\t<div class="blog-post" id="EssayArea">\n' +
        '\t\t\t\t\t\t\t<!--  文章输出地方-->\n' +
        '\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t<!-- 描述：分页-->\n' +
        '\n' +
        '\t\t\t\t\t\t<ul id="mybar"></ul>\n' +
        '\n' +
        '\n' +
        '\t\t\t\t\t</div>\n' +
        '\n' +
        '\n' +
        '\t\t\t\t</div>\n' +
        '\n' +
        '\t\t\t\t<!-- 首页右侧栏目 -->\n' +
        '\t\t\t\t<aside class="asideBar col w-md bg-white-only b-l bg-auto no-border-xs" role="complementary">\n' +
        '\t\t\t\t\t<div id="sidebar">\n' +
        '\t\t\t\t\t\t<section id="tabs-4" class="widget widget_tabs clear">\n' +
        '\t\t\t\t\t\t\t<div class="nav-tabs-alt no-js-hide">\n' +
        '\t\t\t\t\t\t\t\t<ul class="nav nav-tabs nav-justified" role="tablist">\n' +
        '\t\t\t\t\t\t\t\t\t<li class="active" role="presentation">\n' +
        '\t\t\t\t\t\t\t\t\t\t<a href="#widget-tabs-4-hots" role="tab" aria-controls="widget-tabs-4-hots" aria-expanded="true" data-toggle="tab"> <i class="glyphicon glyphicon-fire text-md text-muted wrapper-sm" aria-hidden="true"></i> <span class="sr-only">热门文章</span> </a>\n' +
        '\t\t\t\t\t\t\t\t\t</li>\n' +
        '\t\t\t\t\t\t\t\t\t<li role="presentation" class="">\n' +
        '\t\t\t\t\t\t\t\t\t\t<a href="#widget-tabs-4-comments" role="tab" aria-controls="widget-tabs-4-comments" aria-expanded="false" data-toggle="tab"> <i class="glyphicon glyphicon-comment text-md text-muted wrapper-sm" aria-hidden="true"></i> <span class="sr-only">最新评论</span> </a>\n' +
        '\t\t\t\t\t\t\t\t\t</li>\n' +
        '\t\t\t\t\t\t\t\t</ul>\n' +
        '\t\t\t\t\t\t\t</div>\n' +
        '\n' +
        '\t\t\t\t\t\t\t<div class="tab-content">\n' +
        '\t\t\t\t\t\t\t\t<!--热门文章-->\n' +
        '\t\t\t\t\t\t\t\t<div id="widget-tabs-4-hots" class="tab-pane  fade in wrapper-md active" role="tabpanel">\n' +
        '\t\t\t\t\t\t\t\t\t<h3 class="widget-title m-t-none text-md">热门文章</h3>\n' +
        '\t\t\t\t\t\t\t\t\t<ul class="list-group no-bg no-borders pull-in m-b-none" id="mostViewsBlog">\n' +
        '\n' +
        '\t\t\t\t\t\t\t\t\t</ul>\n' +
        '\t\t\t\t\t\t\t\t</div>\n' +
        '\n' +
        '\t\t\t\t\t\t\t\t<div id="widget-tabs-4-comments" class="tab-pane  fade in wrapper-md " role="tabpanel">\n' +
        '\t\t\t\t\t\t\t\t\t<h3 class="widget-title m-t-none text-md">最新评论</h3>\n' +
        '\t\t\t\t\t\t\t\t\t<ul class="list-group no-bg no-borders pull-in m-b-none" id="latestComment">\n' +
        '\n' +
        '\t\t\t\t\t\t\t\t\t</ul>\n' +
        '\t\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t</div>\n' +
        '\n' +
        '\n' +
        '\t\t\t\t\t\t</section>\n' +
        '\n' +
        '\t\t\t\t\t\t<!-- 博客信息-->\n' +
        '\t\t\t\t\t\t<section id="categories-2" class="widget widget_categories wrapper-md clear">\n' +
        '\t\t\t\t\t\t</section>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</aside>\n' +
        '\t\t\t</div>\n' +
        '\t\t</main>',
    "mainPerInfo":'<main class="app-content-body animated ng-enter">\n' +
        '    <div class="hbox hbox-auto-xs hbox-auto-sm">\n' +
        '        <div class="col center-part">\n' +
        '            <div style="background:url(/static/img/2B1.jpg) center center; background-size:cover">\n' +
        '                <div class="wrapper-lg bg-white-opacity">\n' +
        '                    <div class="row m-t">\n' +
        '                        <div class="col-sm-7">\n' +
        '                            <a class="thumb-lg pull-left m-r">\n' +
        '                                <img class="img-circle" src="/static/img/2B1.jpg" id="userAvatarMainInfo">\n' +
        '                            </a>\n' +
        '                            <div class="clear m-b">\n' +
        '                                <div class="m-b m-t-sm">\n' +
        '                                    <span class="h3 text-black">Dewey</span>\n' +
        '                                    <small class="m-l" id="userSignatureMainInfo"></small>\n' +
        '                                </div>\n' +
        '                                <p class="m-b">\n' +
        '                                    <a target="_blank" title="twitter" href="Javascript:void(0)" class="btn btn-sm btn-bg btn-rounded btn-default btn-icon"><i class="fa fa-twitter"></i></a><a target="_blank" title="facebook" href="Javascript:void(0)" class="btn btn-sm btn-bg btn-rounded btn-default btn-icon"><i class="fa fa-facebook"></i></a><a target="_blank" title="googlepluse" href="Javascript:void(0)" class="btn btn-sm btn-bg btn-rounded btn-default btn-icon"><i class="fa fa-google-plus"></i></a>                                    </p>\n' +
        '                                <a target="blank" href="Javascript:void(0)" class="btn btn-sm btn-success btn-rounded">github</a>                                </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-sm-5">\n' +
        '                            <div class="pull-right pull-none-xs text-center">\n' +
        '                                <a class="m-b-md inline m">\n' +
        '                                    <span class="h3 block font-bold"> </span>\n' +
        '                                    <small>comments</small>\n' +
        '                                </a>\n' +
        '                                <a class="m-b-md inline m">\n' +
        '                                    <span class="h3 block font-bold"> </span>\n' +
        '                                    <small>articles</small>\n' +
        '                                </a>\n' +
        '                                <a class="m-b-md inline m">\n' +
        '                                    <span class="h3 block font-bold"> </span>\n' +
        '                                    <small>weibo</small>\n' +
        '                                </a>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="wrapper bg-white b-b">\n' +
        '                <ul class="nav nav-pills nav-sm" id="funcList">\n' +
        '                </ul>\n' +
        '\n' +
        '            </div>\n' +
        '            <div class="padder" id="funcArea">\n' +
        '\n' +
        '\n' +
        '\n' +
        '                </div><!--end of #pedder-->\n' +
        '        </div>\n' +
        '        <div class="col w-lg bg-light lter b-l bg-auto">\n' +
        '            <div class="wrapper">\n' +
        '                <div class="">\n' +
        '                    <h4 class="m-t-xs m-b-xs">联系方式</h4>\n' +
        '                    <ul class="list-group no-bg no-borders pull-in">\n' +
        '                        <li class="list-group-item"><a target="_blank" href="Javascript:void(0)" class="pull-left thumb-sm avatar m-r"><img src="https://ww4.sinaimg.cn/large/a15b4afegy1fg2pmtjbaej201s01s0aw" class="img-circle"><i class="on b-white bottom"></i></a><div class="clear"><div><a target="_blank" href="Javascript:void(0)">email</a></div><small class="text-muted">你的邮箱地址</small></div></li><li class="list-group-item"><a target="_blank" href="Javascript:void(0)" class="pull-left thumb-sm avatar m-r"><img src="https://ww4.sinaimg.cn/large/a15b4afegy1fg2pnirhr2j201s01va9u" class="img-circle"><i class="on b-white bottom"></i></a><div class="clear"><div><a target="_blank" href="Javascript:void(0)">QQ</a></div><small class="text-muted">你的QQ号</small></div></li><li class="list-group-item"><a target="_blank" href="Javascript:void(0)" class="pull-left thumb-sm avatar m-r"><img src="https://ww4.sinaimg.cn/large/a15b4afegy1fg2pofbz5fj201s01swe9" class="img-circle"><i class="on b-white bottom"></i></a><div class="clear"><div><a target="_blank" href="Javascript:void(0)">微博</a></div><small class="text-muted">你微博账号</small></div></li><li class="list-group-item"><a target="_blank" href="Javascript:void(0)" class="pull-left thumb-sm avatar m-r"><img src="https://ww4.sinaimg.cn/large/a15b4afegy1fg2pouholzj201s01s0ja" class="img-circle"><i class="on b-white bottom"></i></a><div class="clear"><div><a target="_blank" href="Javascript:void(0)">网易云音乐</a></div><small class="text-muted">你的网易云账号</small></div></li>                        </ul>\n' +
        '                </div>\n' +
        '\n' +
        '\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</main>',
    "weiboSubmit":'<div id="weibo" class="">\n' +
        '                    <div id="respond-post" class="respond comment-respond">\n' +
        '\n' +
        '                        <h4 id="reply-title" class="comment-reply-title m-t-lg m-b">发表动态\n' +
        '                        </h4>\n' +
        '                        <form id="weibo_form" action="" class="comment-form" role="form">\n' +
        '                            <div class="comment-form-comment form-group">\n' +
        '                                <label for="weibotxt">动态                            <span class="required text-danger">*</span></label>\n' +
        '                                <textarea id="weibotxt" class="textarea form-control OwO-textarea" name="text" rows="5" placeholder="……" onkeydown="if(event.ctrlKey&amp;&amp;event.keyCode==13){document.getElementById(\'weiboSubmit\').click();return false};"></textarea>\n' +
        '                            </div>\n' +
        '                            <!--提交按钮-->\n' +
        '                            <div class="form-group">\n' +
        '                                <button type="button" name="weiboSubmit" id="weiboSubmit" class=" btn btn-success padder-lg" onclick="commentSubmitEvent()">\n' +
        '                                    <span class="text">提交</span>\n' +
        '                                </button>\n' +
        '                                <i class="animate-spin fontello fontello-spinner hide" id="spin"></i>\n' +
        '                            </div>\n' +
        '                        </form>\n' +
        '                    </div>\n' +
        '                </div>',
    "weiboShow":'<div  class="timeMachine">\n' +
        '                    <div class="streamline b-l b-info m-l-lg m-b padder-v">\n' +
        '                        <ol class="comment-list" id="weibo" >\n' +
        '                            \n' +
        '                        </ol>\n' +
        '                    </div>\n' +
        '                    <nav class="text-center m-b-lg" role="navigation">\n' +
        '                    </nav>\n' +
        '                </div>'
};