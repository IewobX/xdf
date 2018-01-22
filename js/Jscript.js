let url = "http://10.117.2.7:8080/sms/get/";
/**
 * @author xubowei
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
 * @author xubowei
 * 下边标签页
 * */
(function() {
    let tabs = $('.wrapper .panel .table-response ul > li ');
    tabs.click(function () {
        $(this).children('span')[0].className = 'badge bg-primary hidden';
        let i = $(this).index();
        tabs[i].className = 'active';
        for(let j=0;j<$(this).siblings().length;j++){
            $(this).siblings()[j].className = '';
        }
    })
})();
