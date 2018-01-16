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
 * 日历
 * */
(function () {
    $('#calendar').calendar({
        width: 320,
        height: 320,
        data: [
            {
                date: '2015/12/24',
                value: 'Christmas Eve'
            },
            {
                date: '2015/12/25',
                value: 'Merry Christmas'
            },
            {
                date: '2016/01/01',
                value: 'Happy New Year'
            },
            {
                date: '2018/01/01',
                value: '1'
            }
        ],
    })
})();