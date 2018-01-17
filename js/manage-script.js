(function () {
    let url = "http://10.117.70.237:8080/sms/get/";


    /**
     * @auther xubowei
     *
     * 下拉列表控件
     *
     * */
    // let dic_version;
    // let dic_data;
    // $.getJSON('json/dic.json',function (result) {
    //     dic_data = result;
    //     // console.log(dic_data);
    //     window.localStorage.dic_data = JSON.stringify(result);
    // });
    // $("#school").spinnerBox({controlCode:"school",placeholderText:"学校"});
    // let value=$("#school").spinnerBox("getValue");
    // let text=$("#school").spinnerBox("getText");
/**
 * @auther xubowei
 * **************************************************************************** bug： ajax数据无法渲染到页面上 ********************************************************************************************************
 * */
    let wait;
    let studying;
    let away;
    let studied;
    $.ajax({
        url: url + 'test1',
        type: 'get',
        // async: false,
        success: function (result) {
            // console.log(result);
            if(result.isSuccess){
                wait = result.Data.wait;
                $('.wrapper .row .col-lg-3 .panel .value .timer')[0].innerText = 132;
                // console.log($($('.wrapper .row .col-lg-3 .panel .value .timer')[0]).html());
        }
        }
    });
    // console.log(wait);
/**
 * *************************************************************************************** end **********************************************************************************************************************
 * */

/**
 * @auther xubowei
 * 设置默认当天日期
 * */

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
    function setCharts(day,number) {
        /**
         * @author xubowei
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
                categories: day,
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
                data: number,
                color: '#b4e2db'
            }],
            credits: {
                enabled: false
            },
        };
        let chart = Highcharts.chart('container', options);
    }
    function getChartsData(year,month) {
        let resultdata;
        $.ajax({
            url: url + 'test2',
            type: "post",
            // async: false,
            data: {"year": year,"month": month},
            success: function (result) {
                if(result.isSuccess){
                    // resultdata = result.Data;

                    setCharts(result.Data.day,transform(result.Data.number));
                }

            }
        });
    }
    function Dramatize() {
        let year = $($(this).siblings('.years')).html();
        let month = $($(this).siblings('.months')).html();
        getChartsData(year,month);
    }


    let year = $('.wrapper .me-nav .choose-date .years').html();
    let month = $('.wrapper .me-nav .choose-date .months').html();
    getChartsData(year,month);

    $('.wrapper .me-nav .choose-date .prev').click(Dramatize);
    $('.wrapper .me-nav .choose-date .next').click(Dramatize);
/**
 * @auther xubowei
 * 表格
 * */
    // (function () {
    //     let dataSet = [
    //         {
    //             "student_id": "185",
    //             "student_code": "HZ2399928",
    //             "student_name": "小明",
    //             "grade_id": "106",
    //             "grade_code": "TFB018",
    //             "grade_name": "TOEFL中级班（美高预备二阶）",
    //             "grade_report_date": "2018-01-18 00:00:00.0",
    //             "grade_begin_date": "2018-01-18 00:00:00.0",
    //             "grade_end_date": "2018-01-18 00:00:00.0",
    //             "grade_order": "60",
    //             "student_admin_name": null,
    //             "class_away": 70,
    //             "class_away_wait": 68,
    //             "school_name": null
    //         }
    //     ];
    //     $('#lessonStartReminding').dataTable( {
    //         searching: false,
    //         scrollCollapse: true,
    //         scrollY: 240,
    //         paging: false,
    //         data: dataSet,
    //         columns: [
    //             { title: "学生姓名",data: "student_id" },
    //             { title: "学号",data: "student_code" },
    //             { title: "班级编码",data: "student_name"},
    //             { title: "班级名称",data: "grade_id" },
    //             { title: "校区",data: "grade_code" },
    //             { title: "开课日期",data: "grade_name" },
    //             { title: "结束日期",data: "grade_report_date"},
    //             { title: "总课时",data: "grade_begin_date"},
    //             { title: "剩余课时",data: "grade_end_date"},
    //             { title: "学管",data: "grade_order"},
    //             { title: "顾问",data: "student_admin_name"},
    //             { title: "操作",data: "class_away"},
    //             { title: "123",data: "class_away_wait"},
    //             { title: "123",data: "school_name"}
    //         ],
    //         columnDefs: [
    //             {targets: 0, orderable: false},
    //             {targets: 1, orderable: false},
    //             {targets: 3, orderable: false},
    //             {targets: 4, orderable: false},
    //             {targets: 9, orderable: false},
    //             {targets: 10, orderable: false},
    //             {targets: 11, orderable: false}
    //         ]
    //     });
    // })();


    function setlessonStartReminding(data) {
        $('#lessonStartReminding').dataTable( {
            searching: false,
            // scrollCollapse: true,
            // scrollY: 240,
            // paging: false,
            data: data,
            columns: [
                { title: "学生姓名",data: "student_name" },
                { title: "学号",data: "student_code" },
                { title: "班级编码",data: "grade_code"},
                { title: "班级名称",data: "grade_name" },
                { title: "校区",data: "school_name" },
                { title: "开课日期",data: "grade_begin_date" },
                { title: "结束日期",data: "grade_end_date"},
                { title: "总课时",data: "class_away"},
                { title: "剩余课时",data: "class_away_wait"},
                { title: "学管",data: "student_admin_name"},
                { title: "顾问",data: "student_admin_name"},
                { title: "操作",data: "grade_order"},
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
        });
    }
    function getlessonStartReminding() {
        $.ajax({
            url: url + 'test3',
            type: 'get',
            success: function (result) {
                if(result.isSuccess){
                    console.log(result);
                    setlessonStartReminding(result.Data);
                }
            }
        })
    }
    function setlessonEndReminding(data) {
        $('#lessonEndReminding').dataTable( {
            searching: false,
            // scrollCollapse: true,
            // scrollY: 240,
            // paging: false,
            data: data,
            columns: [
                { title: "学生姓名",data: "student_name" },
                { title: "学号",data: "student_code" },
                { title: "班级编码",data: "grade_code"},
                { title: "班级名称",data: "grade_name" },
                { title: "校区",data: "school_name" },
                { title: "开课日期",data: "grade_begin_date" },
                { title: "结束日期",data: "grade_end_date"},
                { title: "总课时",data: "class_away"},
                { title: "剩余课时",data: "class_away_wait"},
                { title: "学管",data: "student_admin_name"},
                { title: "顾问",data: "student_admin_name"},
                { title: "操作",data: "grade_order"},
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
        });
    }
    function getlessonEndReminding() {
        $.ajax({
            url: url + 'test4',
            type: 'get',
            success: function (result) {
                if(result.isSuccess){
                    console.log(result);
                    setlessonEndReminding(result.Data);
                }
            }
        })
    }
    getlessonStartReminding();
    getlessonEndReminding();











})();