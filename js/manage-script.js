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
 * @auther xubowei
 * 表格
 * */
    let table;
    let tab = $('.wrapper .panel .table-response ul > .active ');
    getTableData(tab[0].id);                                                                                            //初始化表格


    let tabs = $('.wrapper .panel .table-response ul > li ');
    function renderTable(data) {

        table = $('#table').DataTable({
            data: data,
            destroy: true,
            searching: false,
            scrollY: '200',
            scrollCollapse: true,
            paging: false,
            columns: [
                {title: 'student_id',data: 'student_id'},
                {title: 'student_code',data: 'student_code'},
                {title: 'student_name',data: 'student_name'},
                {title: 'grade_id',data: 'grade_id'},
                {title: 'grade_code',data: 'grade_code'},
                {title: 'grade_name',data: 'grade_name'},
                {title: 'grade_report_date',data: 'grade_report_date'},
                {title: 'grade_begin_date',data: 'grade_begin_date'},
                {title: 'grade_end_date',data: 'grade_end_date'},
                {title: 'grade_order',data: 'grade_order'},
                {title: 'student_admin_name',data: 'student_admin_name'},
                {title: 'class_away',data: 'class_away'},
                {title: 'class_away_wait',data: 'class_away_wait'},
                {title: 'school_name',data: 'school_name'},
            ]
        });
        table.on("click",'tr',function () {
            console.log( table.row( this ).data());
        })
    }
    function getTableData(id){
        let test;
        let data;
        if(id === 'StartReminding'){
            test = 'test3';
        }
        if(id === 'EndReminding'){
            test = 'test4';
        }
        // console.log(id);
        if(id){
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
        }

    }
    tabs.click(function () {
        getTableData($(this)[0].id);
    });

})();