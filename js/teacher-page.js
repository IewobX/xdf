(function () {
/**
 * @author xubowei
* url 定义在Jscript.js文件中
 * */


/**
 * @auther xubowei
 *
 * 下拉列表控件
 *
 * */

    $("#class_code").spinnerBox({url:"http://10.117.2.7:8080/sms/spinner/school",placeholderText:"班级编码",defaultValue:1});
    $("#score_type").spinnerBox({url:"http://10.117.2.7:8080/sms/spinner/school",placeholderText:"成绩类型",defaultValue:1});



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
    // getChartsData(96,0);
    setTimeout(function () {
        let classCode = $("#class_code").spinnerBox('getValue');
        let scoreType = $("#score_type").spinnerBox('getValue');
        getChartsData(96,0);

        $('#class_code .dropdown-menu li').click(function () {
            classCode = $("#class_code").spinnerBox('getValue');
            getChartsData(96,0);
        });

        $('#score_type .dropdown-menu li').click(function () {
            scoreType = $("#score_type").spinnerBox('getValue');
            getChartsData(96,0);
        });
    },50);






/**
 * @auther xubowei
 * 日历
 * */
    // let calendar;
    // (function () {
    //     calendar = $('#calendar').calendar({
    //         width: 320,
    //         height: 320,
    //     })
    // })();

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
    getcalendarData(new Date().getFullYear(),new Date().getMonth()+1);
/**
 * @author xubowei
 * 标签页的徽章
 * */
    $.ajax({
        url: url + 'test8',
        type: 'get',
        success: function (result) {
            if(result.isSuccess){
                let data = result.Data.length;
                if(data){
                    // console.log(data);
                    $('#LearningFeedback span')[0].className = 'badge bg-primary';
                    $('#LearningFeedback span')[0].innerHTML = data;
                }
            }
        }
    });




/**
 * @author xubowei
 * 表格
 * */
    let table;
    let tab = $('.wrapper .panel .table-response ul > .active ');
    getTableData(tab[0].id);

    let tabs = $('.wrapper .panel .table-response ul > li ');

    function renderTable(data,columns,columnsDefs) {
        table = $('#table').DataTable({
            data: data,
            destroy: true,
            searching: false,

            scrollX: true,
            scrollY: '250px',
            scrollCollapse: true,
            paging: false,
            columns: columns,
            columnDefs:columnsDefs

        });
        table.on("click",'tr td:last-child',function () {
            let data = table.row( this ).data();
            let id = $('.active')[0].id;
            if(id === 'LearningFeedback'){
                let date = new Date(data.course_date);
                $('.modal-title').html("学情反馈");
                $('#stu').html(data.student_name);
                $('#class-code').html(data.grade_code);
                $("#myModal").data("course_id",data.course_id);
                $('#myModal').data('student_id',data.student_id);
                $('#class-time').html(date.getFullYear()+'-'+(date.getMonth()+1)+"-"+date.getDate()+'&nbsp;'+data.course_begin_time+'-'+data.course_end_time);
            }


        });
    }
    $('.modal .modal-dialog .modal-content .modal-footer .btn-primary').click(function () {
        let data={};
        data.condition_manifestation = 1;
        data.condition_check= $(".btn-group .active input").attr("data-check");
        data.condition_comment = $('#classSummary').val();
        data.course_id = $("#myModal").data("course_id");
        data.student_id = $("#myModal").data("student_id");
        // $.post()
        location.reload();
        // $.ajax({
        //     url: url +  'auth/save/class/condition',
        //     type: 'post',
        //     contentType: "application/json",
        //     dataType: "json",
        //     data: JSON.stringify(data),
        //     success: function (result) {
        //
        //     }
        // })
    });




    function getTableData(id){
        let data;
        let columns = [];
        let columnsDefs;
        let test;
        if(id === 'LearningFeedback'){
            test = 'test8';
            $.ajax({
                url: url + test,
                type: 'get',
                success: function (result) {
                    if(result.isSuccess){
                        data = result.Data;
                        columns = [
                            {title: 'condition_id',data: 'condition_id'},
                            {title: 'student_id',data: 'student_id'},
                            {title: '学生姓名',data: 'student_name'},
                            {title: '学号',data: 'student_code'},
                            {title: 'condition_check',data: 'condition_check'},
                            {title: 'condition_comment',data: 'condition_comment'},
                            {title: '班级编码',data: 'grade_code'},
                            {title: '班级名称',data: 'grade_name'},
                            {title: '课程名称',data: 'course_name'},
                            {title: '上课日期',data: 'course_date'},
                            {title: '上课时间',data: 'course_begin_time'},
                            {title: '下课时间',data: 'course_end_time'},
                            {title: '上课地点',data: 'school_name'},
                            {title: '学管',data: 'management_name'},
                            {title: '操作'}
                        ];
                        columnsDefs = [
                            {
                                render: function ( data, type, row ) {
                                    let date = new Date(data);
                                    return date.getFullYear()+'-'+date.getMonth()+1+'-'+date.getDate();
                                },
                                targets: 9
                            },
                            {
                                render: function ( data, type, row ) {
                                    return data + '-' +row.course_end_time;
                                },
                                targets: 10
                            },
                            {
                                targets: columns.length-1,
                                data: null,
                                defaultContent: "<button class='my-button' data-toggle='modal' data-target='#myModal'>批改</button>"
                            },
                            {
                                visible: false, targets: 0
                            },
                            {
                                visible: false, targets: 1
                            },
                            {
                                visible: false, targets: 4
                            },
                            {
                                visible: false, targets: 5
                            },
                            {
                                visible: false, targets: 11
                            }
                        ];
                        renderTable(data,columns,columnsDefs);
                    }
                }
            });
        }
        // if(id === 'CorrectHomeword'){
        //     test = 'course/get/homeWork/list';
        //     $.ajax({
        //         url: url + test,
        //         type: 'get',
        //         success: function (result) {
        //             if(result.isSuccess){
        //                 data = result.Data;
        //                 columns = [
        //                     {title: 'condition_id',data: 'condition_id'},
        //                     {title: 'student_id',data: 'student_id'},
        //                     {title: '学生姓名',data: 'student_name'},
        //                     {title: '学号',data: 'student_code'},
        //                     {title: 'condition_check',data: 'condition_check'},
        //                     {title: 'condition_comment',data: 'condition_comment'},
        //                     {title: '班级编码',data: 'grade_code'},
        //                     {title: '班级名称',data: 'grade_name'},
        //                     {title: '课程名称',data: 'course_name'},
        //                     {title: '上课日期',data: 'course_date'},
        //                     {title: '上课时间',data: 'course_begin_time'},
        //                     {title: '下课时间',data: 'course_end_time'},
        //                     {title: '上课地点',data: 'school_name'},
        //                     {title: '学管',data: 'management_name'},
        //                     {title: '操作'}
        //                 ];
        //                 columnsDefs = [
        //                     {
        //                         render: function ( data, type, row ) {
        //                             let date = new Date(data);
        //                             return date.getFullYear()+'/'+date.getMonth()+1+'/'+date.getDate();
        //                         },
        //                         targets: 9
        //                     },
        //                     {
        //                         render: function ( data, type, row ) {
        //                             return data + '-' +row.course_end_time;
        //                         },
        //                         targets: 10
        //                     },
        //                     {
        //                         targets: columns.length-1,
        //                         data: null,
        //                         defaultContent: "<a href='javascript: void(0);' class='my-link'>批改</a>"
        //                     },
        //                     {
        //                         visible: false, targets: 0
        //                     },
        //                     {
        //                         visible: false, targets: 1
        //                     },
        //                     {
        //                         visible: false, targets: 4
        //                     },
        //                     {
        //                         visible: false, targets: 5
        //                     },
        //                     {
        //                         visible: false, targets: 11
        //                     }
        //                 ];
        //                 renderTable(data,columns,columnsDefs);
        //             }
        //         }
        //     });
        // }
        // if(id === 'CorrectPaper'){
        //    test = 'auth/get/teacher/correct/paper/list';
        //     $.ajax({
        //         url: url + test,
        //         type: 'get',
        //         success: function (result) {
        //             if(result.isSuccess){
        //                 data = result.Data;
        //                 columns = [
        //                     {title: 'condition_id',data: 'condition_id'},
        //                     {title: 'student_id',data: 'student_id'},
        //                     {title: '学生姓名',data: 'student_name'},
        //                     {title: '学号',data: 'student_code'},
        //                     {title: 'condition_check',data: 'condition_check'},
        //                     {title: 'condition_comment',data: 'condition_comment'},
        //                     {title: '班级编码',data: 'grade_code'},
        //                     {title: '班级名称',data: 'grade_name'},
        //                     {title: '课程名称',data: 'course_name'},
        //                     {title: '上课日期',data: 'course_date'},
        //                     {title: '上课时间',data: 'course_begin_time'},
        //                     {title: '下课时间',data: 'course_end_time'},
        //                     {title: '上课地点',data: 'school_name'},
        //                     {title: '学管',data: 'management_name'},
        //                     {title: '操作'}
        //                 ];
        //                 columnsDefs = [
        //                     {
        //                         render: function ( data, type, row ) {
        //                             let date = new Date(data);
        //                             return date.getFullYear()+'/'+date.getMonth()+1+'/'+date.getDate();
        //                         },
        //                         targets: 9
        //                     },
        //                     {
        //                         render: function ( data, type, row ) {
        //                             return data + '-' +row.course_end_time;
        //                         },
        //                         targets: 10
        //                     },
        //                     {
        //                         targets: columns.length-1,
        //                         data: null,
        //                         defaultContent: "<a href='javascript: void(0);' class='my-link'>批改</a>"
        //                     },
        //                     {
        //                         visible: false, targets: 0
        //                     },
        //                     {
        //                         visible: false, targets: 1
        //                     },
        //                     {
        //                         visible: false, targets: 4
        //                     },
        //                     {
        //                         visible: false, targets: 5
        //                     },
        //                     {
        //                         visible: false, targets: 11
        //                     }
        //                 ];
        //                 renderTable(data,columns,columnsDefs);
        //             }
        //         }
        //     });
        // }


    }
    tabs.click(function () {
        getTableData($(this)[0].id);
    });






























})();