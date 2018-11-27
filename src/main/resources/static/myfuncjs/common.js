
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