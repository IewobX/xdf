/**
 * @auther xubowei
 * 下拉列表*/
(function () {
    let select = $('.wrapper .me-nav .choose-schoolArea .select');
    let option = $('.wrapper .me-nav .choose-schoolArea .option');
    let optionItem = $('.wrapper .me-nav .choose-schoolArea .option .option-item');

    select.click(function () {
        // alert(111);
        $(this).siblings()[0].className = 'option';
    });
    option.mouseleave(function () {
        $(this)[0].className = 'option hidden';
    });
    optionItem.click(function () {
        select[0].children[0].innerHTML = $(this)[0].innerHTML;
        $(this).parent()[0].className = 'option hidden';
    });
})();

/**
 * @auther xubowei
 * 设置默认当天日期
 * */
//选择年月的    startView: 3,   minView: 3, format: 'yyyymm',
// let date = new Date();
// $('#datetimepicker').datetimepicker({
//     format: 'yyyy-mm',
//     autoclose: true,
//     startView: 3,
//     minView: 3,
//     endDate: date,
//     todayBtn: true,
//     keyboardNavigation: true,
//     pickerPosition: 'bottom-left',
//     // initialDate: date,
//     todayHighlight:true,
//     forceParse: false,
//     language: 'zh-CN'
// });
(function () {
    let thisYears = new Date().getFullYear();
    let thisMonths = new Date().getMonth()+1;
    $('.wrapper .me-nav .choose-date .years')[0].innerHTML = thisYears;
    $('.wrapper .me-nav .choose-date .months')[0].innerHTML = thisMonths;


    $('.wrapper .me-nav .choose-date .prev').click(function () {
        let years = parseInt($(this).siblings()[0].innerHTML);
        let months = parseInt($(this).siblings()[2].innerHTML);
        if(--months<1){
            months = 12;
            years--;
        }
        $(this).siblings()[0].innerHTML = years;
        $(this).siblings()[2].innerHTML = months;

    });

    $('.wrapper .me-nav .choose-date .next').click(function () {
        let years = parseInt($(this).siblings()[1].innerHTML);
        let months = parseInt($(this).siblings()[3].innerHTML);
        let thisYears = new Date().getFullYear();
        let thisMonths = new Date().getMonth()+1;
        if(++months>12){
            months = 1;
            years++;
        }
        if(years===thisYears){
            if(months>thisMonths){
                months--;
            }
        }
        $(this).siblings()[1].innerHTML = years;
        $(this).siblings()[3].innerHTML = months;
    })
})();

/**
 * @auther xubowei
 * 图表
 * */

(function () {
/**
 * @auther xubowei
 * 使用chartjs建立统计图 canvas图像
 * */
    // Chart.scaleService.updateScaleDefaults('linear', {});
    // let ctx = $('#myCharts')[0].getContext('2d');
    // let data = {
    //     labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    //     datasets: [{
    //         label: null,
    //         scaleOverride : false,
    //         scaleSteps : 10,
    //         scaleStepWidth : 10,
    //         scaleStartValue : 10,
    //         backgroundColor: '#b4e2db',
    //         pointBackgroundColor: '#8acbc2',
    //         pointBorderColor: '#8acbc2',
    //         borderColor: '#8acbc2',
    //         data: [4, 20, 38, 47, 42, 32, 21, 21, 32, 38, 37, 28, 18, 20, 40, 41, 32, 21, 21, 28, 35, 37, 23, 20, 18, 5, 17, 34, 48, 47, 50],
    //     }]
    // };
    // let myChart = new Chart(ctx, {
    //     type: 'line',
    //     data: data,
    //     options:{
    //         layout: {
    //             padding: {
    //                 left: 0,
    //                 right: 0,
    //                 top: 20,
    //                 bottom: 0
    //             }
    //         },
    //         legend:{
    //             display: false
    //         },
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     max: 60,
    //                     min: 0,
    //                     stepSize: 20
    //                 }
    //             }]
    //         }
    //     }
    // });
/**
 * @auther xubowei
 * 使用hightcharts建立统计图 生成svg图像
 * */
    let options = {
        chart: {
            type: 'areaspline'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        },
        yAxis: {
            title: {
                text: null
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: '在读',
            data: [4, 20, 38, 47, 42, 32, 21, 21, 32, 38, 37, 28, 18, 20, 40, 41, 32, 21, 21, 28, 35, 37, 23, 20, 18, 5, 17, 34, 48, 47, 50],
            color: '#b4e2db'
        }],
        credits: {
            enabled: false
        },
    };
    let chart = Highcharts.chart('container', options);

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
        // $(this).siblings().remove();
        for(j=0;j<3;j++){
            $(this).siblings()[j].className = '';
            tabs_context[i].className = 'show';
            tabs_context.siblings()[j].className = 'hidden';
        }
    })
})();
/**
 * @auther xubowei
 * 表格
 * */
(function () {
    let dataSet = [{"studentName": "xbw","studentNumber": "20155939","classNumber": "xh2b","className": "xg","schoolAddress": "黑龙江","startLessonDate": "20150901","endLessonDate": "20190631","totalLesson": "100","restLesson": "200","manager": "123","adviser": "asd","operation": "查看"},{"studentName": "xbw","studentNumber": "20155936","classNumber": "xh2b","className": "xg","schoolAddress": "黑龙江","startLessonDate": "20150901","endLessonDate": "20190631","totalLesson": "100","restLesson": "200","manager": "123","adviser": "asd","operation": "查看"},{"studentName": "xbw","studentNumber": "20155939","classNumber": "xh2b","className": "xg","schoolAddress": "黑龙江","startLessonDate": "20150901","endLessonDate": "20190631","totalLesson": "100","restLesson": "200","manager": "123","adviser": "asd","operation": "查看"},{"studentName": "xbw","studentNumber": "20155939","classNumber": "xh2b","className": "xg","schoolAddress": "黑龙江","startLessonDate": "20150901","endLessonDate": "20190631","totalLesson": "100","restLesson": "200","manager": "123","adviser": "asd","operation": "查看"},{"studentName": "xbw","studentNumber": "20155939","classNumber": "xh2b","className": "xg","schoolAddress": "黑龙江","startLessonDate": "20150901","endLessonDate": "20190631","totalLesson": "100","restLesson": "200","manager": "123","adviser": "asd","operation": "查看"},{"studentName": "xbw","studentNumber": "20155939","classNumber": "xh2b","className": "xg","schoolAddress": "黑龙江","startLessonDate": "20150901","endLessonDate": "20190631","totalLesson": "100","restLesson": "200","manager": "123","adviser": "asd","operation": "查看"},{"studentName": "xbw","studentNumber": "20155939","classNumber": "xh2b","className": "xg","schoolAddress": "黑龙江","startLessonDate": "20150901","endLessonDate": "20190631","totalLesson": "100","restLesson": "200","manager": "123","adviser": "asd","operation": "查看"},{"studentName": "xbw","studentNumber": "20155939","classNumber": "xh2b","className": "xg","schoolAddress": "黑龙江","startLessonDate": "20150901","endLessonDate": "20190631","totalLesson": "100","restLesson": "200","manager": "123","adviser": "asd","operation": "查看"}];
    $(document).ready(function() {
        $('#lessonStartReminding').dataTable( {

            searching: false,
            scrollCollapse: true,
            scrollY: 240,
            paging: false,
            data: dataSet,
            // aoColumnDefs: [{ "bSortable": false, "aTargets": [0]}],
            columns: [
                { title: "学生姓名",data: "studentName" },
                { title: "学号",data: "studentNumber" },
                { title: "班级编码",data: "classNumber"},
                { title: "班级名称",data: "className" },
                { title: "校区",data: "schoolAddress" },
                { title: "开课日期",data: "startLessonDate" },
                { title: "结束日期",data: "endLessonDate"},
                { title: "总课时",data: "totalLesson"},
                { title: "剩余课时",data: "restLesson"},
                { title: "学管",data: "manager"},
                { title: "顾问",data: "adviser"},
                { title: "操作",data: "operation"}
            ],
            columnDefs: [
                {targets: 0, orderable: false},
                {targets: 1, orderable: false},
                {targets: 3, orderable: false},
                {targets: 4, orderable: false},
                {targets: 9, orderable: false},
                {targets: 10, orderable: false},
                {targets: 11, orderable: false}
            ]
        } );
    } );

})();
