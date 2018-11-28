//获取当前页面的完整路径
var nowPath=window.location.href;
var pathName=window.document.location.pathname;

var pos=nowPath.indexOf(pathName);
var localhostPaht=nowPath.substring(0,pos);

$(function () {
    $("#logout").click(function () {
        layer.confirm('是否退出当前账户？',{icon: 7, title:'提示'},
            function(index) {

                $.ajax({
                    type : "GET",
                    url:"/logout",
                    async: false,
                    success : function(json) {
                        if(json.statusCode=="0"){

                            window.location.href = localhostPaht +"/home";
                        }

                    }
                });
                layer.close(index);
            },function(index){
                layer.close(index);
            });

    })
});

function textsubmit() {
    var content = editor.txt.html();
    console.log(content);
    $.ajax({
        type:"post",
        url:"/editSave",
        data:content,
        contentType: "application/json",
        success:function (data) {
            $("#contentHtml").html("");
            $("#contentHtml").append(data);
        },
        error:function () {
            $('#text2').val("error!");
        }
    })
}