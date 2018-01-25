(function () {

/**
 * @auther xubowei
 *
 * 下拉列表控件
 *
 * */

    $("#school").spinnerBox({url:"http://10.117.2.7:8080/sms/spinner/school",placeholderText:"学校",defaultValue:1});
/**
 * @auther xubowei
 * **************************************************************************** bug： ajax数据无法渲染到页面上 *********************************************************************************************************
 * *********************************************************************** 解决方法： 可以使用取消元素class的timer属性 **************************************************************************************************
 * ******************************************************************************* 但是元素就无法从0开始计数 ***********************************************************************************************************
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
                studying = result.Data.studying;
                away = result.Data.away;
                studied = result.Data.studyed;
                $('.wrapper .row .col-lg-3 .panel .value h1')[0].innerText = wait;
                $('.wrapper .row .col-lg-3 .panel .value h1')[1].innerText = studying;
                $('.wrapper .row .col-lg-3 .panel .value h1')[2].innerText = away;
                $('.wrapper .row .col-lg-3 .panel .value h1')[3].innerText = studied;
                // console.log($($('.wrapper .row .col-lg-3 .panel .value .timer')[0]).html());
        }
        }
    });
    // console.log(wait);

    // console.log($('.wrapper .row .col-lg-3 .panel .value h1')[0].innerText);
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
        $.ajax({
            url: url + 'test2',
            type: "post",
            // async: false,
            data: {"year": year,"month": month},
            success: function (result) {
                if(result.isSuccess){

                    setCharts(result.Data.day,result.Data.number);
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
 * @author xubowei
 * 标签页的徽章
 * */
    $.ajax({
        url: url + 'test3',
        type: 'get',
        success: function (result) {
            if(result.isSuccess){
                let data = result.Data.length;

                if(data){
                    console.log(data);
                    $('#StartReminding span')[0].className = 'badge bg-primary';
                    $('#StartReminding span')[0].innerHTML = data;
                }
            }
        }
    });
    $.ajax({
        url: url + 'test4',
        type: 'get',
        success: function (result) {
            if(result.isSuccess){
                let data = result.Data.length;

                if(data){
                    console.log(data);
                    $('#EndReminding span')[0].className = 'badge bg-primary';
                    $('#EndReminding span')[0].innerHTML = data;
                }
            }
        }
    });
/**
 * @auther xubowei
 * 表格
 * */
    let table;
    let tab = $('.wrapper .panel .table-response ul > .active ');
    getTableData(tab[0].id);                                                                                            //初始化表格
    let tabs = $('.wrapper .panel .table-response ul > li ');
    function renderTable(data,columns,columnsDefs) {
        table = $('#table').DataTable({
            data: data,
            destroy: true,
            searching: false,

            scrollX: true,
            scrollY: '200',
            scrollCollapse: true,
            paging: false,
            columns: columns,
            columnDefs: columnsDefs,

        });

        table.on("click",'tr td:last-child',function () {
            console.log( table.row( this ).data());
        })
    }

    function getTableData(id){
        let data;
        let columns = [];
        let columnsDefs = [];
        let test;
        if(id === 'StartReminding'){
            test = 'test3';
        }
        if(id === 'EndReminding'){
            test = 'test4';
        }
        // if(id ==='ExamReminding' ){
        //     test = '';
        // }
        // if(id ==='Warning' ){
        //     test = '';
        //     $.ajax({
        //         url: url + '',
        //         type: 'get',
        //         success: function (result) {
        //             if(result.isSuccess){
        //                 data = result.Data;
        //                 renderTable(data);
        //             }
        //         }
        //     })
        // }

        if(id){
            $.ajax({
                url: url + test,
                type: 'get',
                success: function (result) {
                    if(result.isSuccess){
                        data = result.Data;
                        columns = [
                            {title: '学生id',data: result.Data.student_id},//
                            {title: '学生姓名',data: result.Data.student_name},
                            {title: '学号',data: result.Data.student_code},
                            {title: '班级id',data: result.Data.grade_id},//
                            {title: '班级编码',data: result.Data.grade_code},
                            {title: '班级名称',data: result.Data.grade_name},
                            {title: '校区',data: result.Data.school_name},
                            {title: '报名日期',data: result.Data.grade_report_date},//
                            {title: '开课日期',data: result.Data.grade_begin_date},
                            {title: '结课日期',data: result.Data.grade_end_date},
                            {title: '班级order',data: result.Data.grade_order},//
                            {title: '总课时',data: result.Data.class_away},
                            {title: '剩余课时',data: result.Data.class_away_wait},
                            {title: '学管',data: result.Data.student_admin_name},
                        ];
                        columnsDefs = [
                            {
                                render: function ( data, type, row ) {
                                    let date = new Date(data);
                                    return date.getFullYear()+'/'+date.getMonth()+1+'/'+date.getDate();
                                },
                                targets: 8
                            },
                            {
                                render: function ( data, type, row ) {
                                    let date = new Date(data);
                                    return date.getFullYear()+'/'+date.getMonth()+1+'/'+date.getDate();
                                },
                                targets: 9
                            },

                            {
                                visible: false, targets: 0
                            },
                            {
                                visible: false, targets: 3
                            },
                            {
                                visible: false, targets: 7
                            },
                            {
                                visible: false, targets: 10
                            }
                        ];
                        renderTable(data,columns,columnsDefs);
                    }
                }
            })
        }


    }
    tabs.click(function () {
        getTableData($(this)[0].id);
    });

})();