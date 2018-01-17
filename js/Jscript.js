/**
 * @auther xubowei
 * 下拉列表*/
(function () {
    let select = $('.wrapper .me-nav .select');
    let option = $('.wrapper .me-nav .option');
    let optionItem = $('.wrapper .me-nav  .option .option-item');
    select.click(function () {
        $(this).siblings()[0].className = 'option';
        // console.log($(this).parent().siblings().children());
        for(let i = 1;i<$(this).parent().siblings().children().length;i=i+2){
            $(this).parent().siblings().children()[i].className = 'option hidden';
        }
    });

    option.mouseleave(function () {
        $(this)[0].className = 'option hidden';
    });


    optionItem.click(function () {
        $(this).parent().siblings()[0].innerHTML = "<span class='"+"lesson"+"'>"+$(this)[0].innerHTML+"</span><span class='"+"down"+"'></span>";
        $(this).parent()[0].className = 'option hidden';
    });
})();


/**
 * @auther xubowei
 * 下边标签页
 * */
(function() {
    let tabs = $('.wrapper .panel .table-response ul > li ');
    let tabs_context = $('.wrapper .panel .table-response > div > div');
    tabs.click(function () {
        let i = $(this).index();
        tabs[i].className = 'active';
        tabs_context[i].className = 'show';
        for(let j=0;j<$(this).siblings().length;j++){
            $(this).siblings()[j].className = '';
            $(tabs_context[i]).siblings()[j].className = 'hidden';
        }
    })
})();
