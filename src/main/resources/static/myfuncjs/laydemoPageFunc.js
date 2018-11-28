//获取当前页面的完整路径
var nowPath=window.location.href;
var pathName=window.document.location.pathname;

var pos=nowPath.indexOf(pathName);
var localhostPaht=nowPath.substring(0,pos);

$(function(){
    $("#submitLogin").click(function(){
        tryLogin();
    })

});

function tryLogin() {
    var data = {
        "username": $("#navbar-login-user").val(),
        "password": sha256_digest(sha256_digest( $("#navbar-login-password").val()))
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
                showLayerFailMsg("账号或密码错误!");
            }
        }
    })
}
