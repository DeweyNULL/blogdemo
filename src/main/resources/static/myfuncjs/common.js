
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
        '\t\t\t\t\t\t\t<h3 class="widget-title m-t-none text-md">博客信息</h3>\n' +
        '\t\t\t\t\t\t\t<ul class="list-group" id="blogInfo">\n' +
        '\t\t\t\t\t\t\t\t<li class="list-group-item"> <i class="glyphicon glyphicon-file text-muted"></i> <span class="badge\n' +
        '\t\t\t\t\t\t\t\t           pull-right">52</span>文章数目</li>\n' +
        '\t\t\t\t\t\t\t\t<li class="list-group-item"> <i class="glyphicon glyphicon-comment text-muted"></i> <span class="badge\n' +
        '\t\t\t\t\t\t\t\t           pull-right">0</span>评论数目</li>\n' +
        '\t\t\t\t\t\t\t\t<li class="list-group-item"> <i class="glyphicon glyphicon-equalizer text-muted"></i> <span class="badge\n' +
        '\t\t\t\t\t\t\t\t           pull-right">0天</span>运行天数</li>\n' +
        '\t\t\t\t\t\t\t\t<li class="list-group-item"> <i class="glyphicon glyphicon-refresh text-muted"></i> <span class="badge\n' +
        '\t\t\t\t\t\t\t\t           pull-right">0</span>最后更新</li>\n' +
        '\t\t\t\t\t\t\t</ul>\n' +
        '\t\t\t\t\t\t</section>\n' +
        '\t\t\t\t\t</div>\n' +
        '\t\t\t\t</aside>\n' +
        '\t\t\t</div>\n' +
        '\t\t</main>',
    "mainPerInfo":''
};