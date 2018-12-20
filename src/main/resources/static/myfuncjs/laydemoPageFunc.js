//获取当前页面的完整路径
var nowPath=window.location.href;
var pathName=window.document.location.pathname;

var pos=nowPath.indexOf(pathName);
var localhostPaht=nowPath.substring(0,pos);

$(function(){

    if($.cookie('isLogin') == 1){
        $("#navbar-login-user").attr("disabled","disabled");
        $("#navbar-login-password").attr("disabled","disabled");
        $("#submitLogin").attr("disabled","disabled");
        $("#loginbtntxt").text("已登录");
    }


    $("#submitLogin").click(function(){
        tryLogin();
    })

    $("#navbar-login-user").keyup(function(even){
        if(even.keyCode=="13"){
            $("#navbar-login-password").focus();
        }
    });

    $("#navbar-login-password").keyup(function(even){
        if(even.keyCode=="13"){
            tryLogin();
        }
    });
});

function tryLogin() {

    var username = $("#navbar-login-user").val();
    var password = $("#navbar-login-password").val();

    if(isNull(username)){
        showLayerFailMsg("请输入用户名");
        return;
    }

    if(isNull(password)){
        showLayerFailMsg("请输入密码");
        return;
    }

    var data = {
        "username": username,
        "password": sha256_digest(sha256_digest(password))
    };

    $.ajax({
        async:false,
        type:"post",
        url:basePath+"login",
        data:JSON.stringify(data),
        contentType : "application/json; charset=utf-8",
        success:function (respData) {
            console.log(respData);
            if(respData.statusCode=="0"){

                showLayerSucessMsg("登录成功");
                back2home();
                $("#navbar-login-user").attr("disabled","disabled");
                $("#navbar-login-password").attr("disabled","disabled");
                $("#submitLogin").attr("disabled","disabled");
                $("#loginbtntxt").text("已登录");
            }else {
                $("#navbar-login-user").val("");
                $("#navbar-login-password").val("");
                showLayerFailMsg(respData.resultData);
            }
        }
    })
}
