(function () {



/**
 * @auther xubowei
 * **************************************************************************** bug： ajax数据无法渲染到页面上 *********************************************************************************************************
 * *********************************************************************** 解决方法： 可以使用取消元素class的timer属性 **************************************************************************************************
 * ******************************************************************************* 但是元素就无法从0开始计数 ***********************************************************************************************************
 * */
    (function () {
        let scheduleTime;
        let studying;
        let taughtTime;
        $.ajax({
            url: url + 'test5',
            type: 'get',
            // data: {user: 'user'},
            success: function (result) {
                // console.log(result);
                if(result.isSuccess){
                    scheduleTime = result.Data.scheduleTime;
                    studying = result.Data.studying;
                    taughtTime = result.Data.taughtTime;
                    $('.wrapper .row .col-lg-3 .panel .value h1')[0].innerText = studying;
                    $('.wrapper .row .col-lg-3 .panel .value h1')[2].innerText = taughtTime;
                    $('.wrapper .row .col-lg-3 .panel .value h1')[3] .innerText = scheduleTime;
                    // console.log($($('.wrapper .row .col-lg-3 .panel .value .timer')[0]).html());
                }
            }
        });
    })();
/**
 * *************************************************************************************** end **********************************************************************************************************************
 * */

/**
 * @author xubowei
 * 图表
 * */
    function transform(arr){
        /**
         * @author xubowei
         * 数组转化
         * */
        let i;
        for(i=0;arr[i]===0;i++){
            arr[i] = NaN;
        }
        for(i=arr.length-1;arr[i]===0;i--){
            arr[i] = NaN;
        }
        return arr;
    }

    function setCharts(x_axis,data) {
        /**
         * @author xubowei
         * 使用hightcharts建立统计图 生成svg图像
         * */
        let options = {
            chart: {
                type: 'line'
            },
            title: {
                text: null
            },
            xAxis: {
                categories: x_axis,
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: data,
            credits: {
                enabled: false
            },
        };
        let chart = Highcharts.chart('container', options);
    }
    function getChartsData(grade_id,type) {
        $.ajax({
            url: url + 'test7',
            type: "post",
            // async: false,
            data: {"grade_id": grade_id,"type": type},
            success: function (result) {
                if(result.isSuccess){
                    for(let i=0;i<result.Data.data.length;i++){
                        result.Data.data[i].data = transform(result.Data.data[i].score);
                        delete result.Data.data[i].score;
                    }
                    setCharts(result.Data.x_axis,transform(result.Data.data));
                }
            }
        });
    }
    let optionItem = $('.wrapper .me-nav .option .option-item');
    let gradeId = $('#grade_id .select .selected')[0].innerHTML;
    let subject = $('#subject .select .selected')[0].innerHTML;
    let type = $('#type .select .selected')[0].innerHTML;
    getChartsData(96,0);
    optionItem.click(function () {
        let id = $(this).parent().parent()[0].id;
        if(id === 'grade_id'){
            gradeId = $(this)[0].innerHTML;
        }
        if(id === 'subject'){
            subject = $(this)[0].innerHTML;
        }
        if(id === 'type'){
            if($(this)[0].innerHTML==='入门测'){
                type = '0';
            }
            if($(this)[0].innerHTML==='出门测'){
                type = '1';
            }
            if($(this)[0].innerHTML==="TOP模考"){
                type = '2'
            }
        }

        console.log(id);
        console.log(gradeId);
        console.log(subject);
        console.log(type);
        getChartsData(gradeId,type);

    });



/**
 * @auther xubowei
 * 日历
 * */
    let calendar;
    (function () {
        calendar = $('#calendar').calendar({
            width: 320,
            height: 320,
        })
    })();

    function renderCalendar(data) {
        // console.log(data);
        $('#calendar').calendar({
            width: 320,
            height: 320,
            data: data
        })
    }
    function getcalendarData(year,month) {

        $.ajax({
            url: url + 'test6',
            type: 'get',
            data: {year: year,month: month},
            success: function (result) {
                if(result.isSuccess){
                    renderCalendar(result.Data);
                }
            }
        })
    }
    getcalendarData(2018,1);


/**
 * @author xubowei
 * 表格
 * */
function renderTable(data) {

    table = $('#table').DataTable({
        data: data,
        destroy: true,
        searching: false,
        scrollY: '200',
        scrollCollapse: true,
        paging: false,
        columns: [
            {title: 'condition_id',data: 'condition_id'},
            {title: 'student_id',data: 'student_id'},
            {title: 'student_code',data: 'student_code'},
            {title: 'student_name',data: 'student_name'},
            {title: 'condition_check',data: 'condition_check'},
            {title: 'condition_comment',data: 'condition_comment'},
            {title: 'grade_name',data: 'grade_name'},
            {title: 'grade_code',data: 'grade_code'},
            {title: 'course_begin_time',data: 'course_begin_time'},
            {title: 'course_end_time',data: 'course_end_time'},
            {title: 'course_date',data: 'course_date'},
            {title: 'management_name',data: 'management_name'},
            {title: 'course_name',data: 'course_name'},
            {title: 'school_name',data: 'school_name'},
        ]
    });
    table.on("click",'tr',function () {
        console.log( table.row( this ).data());
    })
}
    function getTableData(){
        let test = 'test8';
        let data;
        // if(id === 'StartReminding'){
        //     test = 'test3';
        // }
        // if(id === 'EndReminding'){
        //     test = 'test4';
        // }
        // console.log(id);
        // if(id){
            $.ajax({
                url: url + test,
                type: 'get',
                success: function (result) {
                    if(result.isSuccess){
                        data = result.Data;
                        renderTable(data);
                    }
                }
            });
        // }

    }
    getTableData();






























})();