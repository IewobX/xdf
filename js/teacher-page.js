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
            console.log(result);
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
















(function () {
    /**
     * @auther xubowei
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
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        },
        yAxis: {
            title: {
                text: null
            }
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 40
        },
        series: [{
            name: '在读',
            data: ['null', 20, 38, 47, 42, 0, 21, 21, 32, 38, 37, 28, 18, 20, 40, 41, 32, 21, 21, 28, 0, 37, 23, 20, 18, 5, 17, 34, 48, 47, 50],
            color: '#b4e2db'
        },
            {
                name: '在读',
                data: [4, 2, 35, 47, 42, 0, 21, 28, 32, 38, 39, 28, 18, 24, 40, 41, 32, 21, 21, 28, 0, 37, 23, 20, 18, 5, 17, 34, 48, 47, 50],
                color: '#04f2fb'
            }],

        credits: {
            enabled: false
        },
    };
    let chart = Highcharts.chart('container', options);
})();

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
    console.log(data);
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
