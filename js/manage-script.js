(function () {

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
    function renderTable(data,columns) {
        table = $('#table').DataTable({
            data: data,
            destroy: true,
            searching: false,

            scrollX: true,
            scrollY: '200',
            scrollCollapse: true,
            paging: false,
            columns: columns,
            columnDefs: [
                {
                    render: function ( data, type, row ) {
                        let date = new Date(data);
                        return date.getFullYear()+'/'+date.getMonth()+1+'/'+date.getDate();
                    },
                    targets: 10
                },
                {
                    targets: 14,
                    data: null,
                    defaultContent: "<a class='my-link'>查看</a>"
                }
            ]
        });

        table.on("click",'tr td:last-child',function () {
            console.log( table.row( this ).data());
        })
    }

    function getTableData(id){
        let data;
        let columns = [];
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
                            {title: 'student_id',data: result.Data.student_id},
                            {title: 'student_code',data: result.Data.student_code},
                            {title: 'student_name',data: result.Data.student_name},
                            {title: 'grade_id',data: result.Data.grade_id},
                            {title: 'grade_code',data: result.Data.grade_code},
                            {title: 'grade_name',data: result.Data.grade_name},
                            {title: 'grade_report_date',data: result.Data.grade_report_date},
                            {title: 'grade_begin_date',data: result.Data.grade_begin_date},
                            {title: 'grade_end_date',data: result.Data.grade_end_date},
                            {title: 'grade_order',data: result.Data.grade_order},
                            {title: 'student_admin_name',data: result.Data.student_admin_name},
                            {title: 'class_away',data: result.Data.class_away},
                            {title: 'class_away_wait',data: result.Data.class_away_wait},
                            {title: 'school_name',data: result.Data.school_name},
                        ];
                        renderTable(data,columns);
                    }
                }
            })
        }


    }
    tabs.click(function () {
        getTableData($(this)[0].id);
    });

})();