//获取当前页面的完整路径
var nowPath=window.location.href;
var pathName=window.document.location.pathname;

var pos=nowPath.indexOf(pathName);
var localhostPaht=nowPath.substring(0,pos);

$(function(){
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
                var writePath = localhostPaht +"/write";
                //console.log(writePath);
                $("#writeSwitch").attr('href',writePath);
                $("#easyLogin").removeClass("dropdown");
                showLayerSucessMsg("登录成功");
            }else {
                $("#navbar-login-user").val("");
                $("#navbar-login-password").val("");
                showLayerFailMsg(respData.resultData);
            }
        }
    })
}
