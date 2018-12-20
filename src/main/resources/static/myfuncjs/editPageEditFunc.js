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
    });

    $("#submit").click(function () {
        blogSubmit();
    })

    $("#back").click(function () {
        window.location.href = localhostPaht +"/home";
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

function getPic() {
    var reader = new FileReader();
    var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
    var file = $("#image")[0].files[0];
    var imgUrlBase64;
    if (file) {
        //将文件以Data URL形式读入页面
        imgUrlBase64 = reader.readAsDataURL(file);
        reader.onload = function (e) {
            //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
            if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                alert( '上传失败，请上传不大于2M的图片！');
                return;
            }else{
                //执行上传操作
                console.log(reader.result);
                return reader.result;
            }
        }
    }
}


function blogSubmit() {
    var pic =  $("#image").val();
    var filename = pic.split("\\");
    var picflag = true;



    var formData = new FormData();
    formData.append("file",$("#image")[0].files[0]);
    console.log(formData);
    $.ajax({
        type: 'post',
        url: "/picUpload",
        data: formData,
        async:false,
        processData: false,
        contentType: false,
        success:function (resp) {
            if(resp.statusCode == "0"){
                picflag = false;
            }
            else {
                showLayerFailMsg(resp.resultData);
            }
        },
        error:function() {
            showLayerFailMsg("图片上传失败");
        }
    });

    if (picflag){
        return;
    }
    var data = {
        'auther_name':$("#auther_name").val(),
        'summary':$("#summary").val(),
        'pic':filename[filename.length-1],
        'essay_title':$("#essay_title").val(),
        'essay_type':$("#essay_type").val(),
        'essay_properties':$("#essay_properties").val(),
        'essay_content':editor.txt.html()
    };

    $.ajax({
        url:"/save",
        type:"POST",
        data:JSON.stringify(data),
        dataType : "json",
        contentType: "application/json",
        success:function (resp) {
            if(resp.statusCode == "0"){
                showLayerMsg(resp.resultData);
                $("#auther_name").val("");
                $("#summary").val("");
                $("#essay_title").val("");
                $("#essay_type").val("");
                $("#essay_properties").val("");
                $("#image").val("");
            }
            else {
                showLayerFailMsg(resp.resultData);
            }
        }
    });
    console.log(data);
}