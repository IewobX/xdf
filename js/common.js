/**
 * Created by freedom on 17/1/16.
 */
$(function () {
    //判断用户是否登录
    if (!$.cookie('_reamuser')) {
        console.log($.cookie('_reamuser'));
        //window.location.href="login.html"
    }else{
        console.log("cookie value:"+$.cookie('_reamuser'));
    }

    //根据菜单加载网页内容
    $("#sidebar .child-list a").click(function () {
        var hash = document.URL.substr(document.URL.indexOf('#')+1)
        console.log(hash);
        //$(this).addClass("active");
        $(".wrapper").load("/components/" + hash + ".html");
    })


    //登出
    $('#logout').click(function () {
        console.log('logout');
//            $.removeCookie('reamuser', { path: '/' });
        $.cookie("_reamuser", null, {path: '/'});
        console.log($.cookie('reamuser'));
        window.location.href = "login.html"
    })


})
