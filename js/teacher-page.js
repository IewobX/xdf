let calendar_;
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
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

    $("#class_code").spinnerBox({
        url: "/sms/spinner/grade", placeholderText: "班级编码", defaultValue: 1, onChange: function (code) {
            let type = $("#score_type").spinnerBox("getValue");
            if (type && code) {
                getChartsData(code, type)
            }

        }
    });
    $("#score_type").spinnerBox({
        placeholderText: "成绩类型", onChange: function (code) {
            let code_ = $("#class_code").spinnerBox("getValue");
            if (code_ && code) {
                getChartsData(code_, code)
            }
        }
    });
    $("#score_type").spinnerBox("loadData", [{dic_code: 0, dic_value: "平均成绩"}, {
        dic_code: 1,
        dic_value: "入门测"
    }, {dic_code: 2, dic_value: "出门测"}]);

    $("#score_type").spinnerBox("setValue", "0");

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
            url: '/sms/get/teacher/head/info',
            type: 'get',
            // data: {user: 'user'},
            success: function (result) {
                // console.log(result);
                if (result.isSuccess) {
                    scheduleTime = result.Data.scheduleTime;
                    studying = result.Data.studying;
                    taughtTime = result.Data.taughtTime;
                    $('.wrapper .row .col-lg-3 .panel .value h1')[0].innerText = studying;
                    $('.wrapper .row .col-lg-3 .panel .value h1')[2].innerText = taughtTime;
                    $('.wrapper .row .col-lg-3 .panel .value h1')[3].innerText = scheduleTime;
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
    function transform(arr) {
        /**
         * @author xubowei
         * 数组转化
         * */
        let i;
        for (i = 0; arr[i] === 0; i++) {
            arr[i] = NaN;
        }
        for (i = arr.length - 1; arr[i] === 0; i--) {
            arr[i] = NaN;
        }
        return arr;
    }

    function setCharts(x_axis, data) {
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

    function getChartsData(grade_id, type) {
        $.ajax({
            url: '/sms/get/line/graph/student/score',
            type: "post",
            // async: false,
            data: {"grade_id": grade_id, "type": type},
            success: function (result) {
                if (result.isSuccess) {
                    if(JSON.stringify(result.Data)==='{}'){
                        setCharts(null,null);
                        return;
                    }
                    for (let i = 0; i < result.Data.data.length; i++) {
                        result.Data.data[i].data = transform(result.Data.data[i].score);
                        delete result.Data.data[i].score;
                    }
                    setCharts(result.Data.x_axis, transform(result.Data.data));
                }
            }
        });
    }

    /**
     * @auther xubowei
     * 日历
     * */
    function renderCalendar(data) {
        calendar_= $('#calendar').calendar({
            data: data
        });

    }

    function getCalendarData(year, month) {
        $.ajax({
            url: "/sms/get/class/schedule",
            type: 'get',
            data: {year: year, month: month},
            success: function (result) {
                if (result.isSuccess) {
                    if(calendar_){
                        setTimeout(function () {
                            $('#calendar').calendar("setData", result.Data);
                        },500);
                        return;
                    }
                    renderCalendar(result.Data);

                }
            }
        })
    }

    getCalendarData(year, month);
    setTimeout(function () {
        // console.log($('#calendar').children('.calendar-inner'));
        $('#calendar .calendar-inner .calendar-views .view-date .calendar-hd .calendar-arrow .prev').click(function () {
            let year = $(this).parent().siblings('a')[0].innerText.slice(0, 4);
            let month = $(this).parent().siblings('a').children('span')[0].innerText;
            if (month !== '1') {
                month = month - 1
            }
            if (month === '1') {
                month = '12';
                year -= 1;
            }
            console.log(year,month);
            getCalendarData(year, month);
        });
        $('#calendar .calendar-inner .calendar-views .view-date .calendar-hd .calendar-arrow .next').click(function () {
            let year = $(this).parent().siblings('a')[0].innerText.slice(0, 4);
            let month = $(this).parent().siblings('a').children('span')[0].innerText;
            if (month !== '12') {
                month = parseInt(month) + 1
            }
            if (month === '12') {
                month = '1';
                year = parseInt(year) + 1;
            }
            console.log(year,month);
            getCalendarData(year, month);
        });
    }, 500);

    /**
     * @author xubowei
     * 标签页的徽章
     * */
    (function () {
        $.ajax({
            url: '/sms/get/teacher/class/condition/list',
            type: 'get',
            success: function (result) {
                let data = result.Data;
                if (result.isSuccess) {
                    let datalength = result.Data.length;
                    if (data) {
                        $('#LearningFeedback span')[0].className = 'badge bg-primary';
                        $('#LearningFeedback span')[0].innerHTML = datalength;
                    }
                }
            }
        });
    })();
    (function () {
        let data = {};
        data.correct_state = 1;
        data.start_date = year + "-" + month + "-" + day;
        data.end_date = year + "-" + month + "-" + day;
        $.ajax({
            url: '/sms/course/get/homeWork/list',
            type: 'post',
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (result) {
                let data = result.Data;
                if (result.isSuccess) {
                    let datalength = result.Data.length;
                    if (data) {
                        $('#CorrectHomework span')[0].className = 'badge bg-primary';
                        $('#CorrectHomework span')[0].innerHTML = datalength;
                    }
                }
            }
        });
    })();
    (function () {
        let data = {};
        // let date = new Date();
        // let year = date.getFullYear();
        let m_month = month < 10 ? "0" + month : month;
        let m_day = day < 10 ? "0" + day : day;
        data.start_date = year + '-' + m_month + '-' + m_day;
        data.end_date = year + '-' + m_month + '-' + m_day;
        data.exam_state = 1;
        data.student_code = null;
        data.student_name = null;
        data.grade_id = null;
        data.paper_type = null;
        $.post('/sms/auth/get/teacher/correct/paper/list', data,
            function (result) {
                if (result.isSuccess) {
                    let data = result.Data;
                    let datalength = result.Data.length;
                    if (data) {
                        $('#CorrectPaper span')[0].className = 'badge bg-primary';
                        $('#CorrectPaper span')[0].innerHTML = datalength;
                    }
                }
            })
    })();
    /**
     * @author xubowei
     * 表格
     * */
    let table;
    let tab = $('.wrapper .panel .table-response ul > .active ');
    getTableData(tab[0].id);

    let tabs = $('.wrapper .panel .table-response ul > li ');

    function renderTable(data, columns, columnsDefs) {
        table = $('#table').DataTable({
            data: data,
            destroy: true,
            searching: false,
            scrollX: true,
            scrollY: '250px',
            scrollCollapse: true,
            paging: false,
            columns: columns,
            columnDefs: columnsDefs

        });
        table.on("click", 'tr td:last-child', function () {
            let data = table.row(this).data();
            let id = $('.active')[0].id;
            if (id === 'LearningFeedback') {
                let date = new Date(data.course_date);
                let check = data.condition_check===null? 0 : data.condition_check;
                $('.modal-title').html("学情反馈");
                $('#stu').html(data.student_name);
                $('#class-code').html(data.grade_code);
                $("#myModal").data("course_id", data.course_id);
                $('#myModal').data('student_id', data.student_id);
                $('#class-time').html(date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate() + '&nbsp;' + data.course_begin_time + '-' + data.course_end_time);
                $($('.modal-body .classSituation .btn-group').children()[check]).addClass('active');
            }
            if (id === 'CorrectHomework') {
                window.location.href = "/sms/course/get/homeWork/page/" + data.id + '/' + data.course_id + "/" + data.student_id + "/" + 1;
            }
            if (id === 'CorrectPaper') {
                window.open("/sms/auth/get/teacher/read/paper/" + data.student_id + "," + data.course_paper_id + "," + data.student_name + "," + 1);
            }

        });
    }

    /**
     * @author xubowei
     * 学情反馈点击批改后的列表提交
     * */
    $('.modal .modal-dialog .modal-content .modal-footer .btn-primary').click(function () {
        let data = {};
        data.condition_manifestation = 1;
        data.condition_check = $(".btn-group .active input").attr("data-check");
        data.condition_comment = $('#classSummary').val();
        data.course_id = $("#myModal").data("course_id");
        data.student_id = $("#myModal").data("student_id");
        console.log(data);
        $.ajax({
            url: '/sms/auth/save/class/condition',
            type: 'post',
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data),
            success: function () {
                location.reload();
            }
        })
    });
    function getTableData(id) {
        let data;
        let columns = [];
        let columnsDefs;
        if (id === 'LearningFeedback') {
            $.ajax({
                url: '/sms/get/teacher/class/condition/list',
                type: 'get',
                success: function (result) {
                    if (result.isSuccess) {
                        data = result.Data;
                        let datalength = result.Data.length;
                        if (data) {
                            // console.log(data);
                            $('#LearningFeedback span')[0].className = 'badge bg-primary';
                            $('#LearningFeedback span')[0].innerHTML = datalength;
                        }
                        columns = [
                            {title: '学生姓名', data: 'student_name'},
                            {title: '学号', data: 'student_code'},
                            {title: '班级编码', data: 'grade_code'},
                            {title: '班级名称', data: 'grade_name'},
                            {title: '课程名称', data: 'course_name'},
                            {title: '上课日期', data: 'course_date'},
                            {title: '上课时间', data: 'course_begin_time'},
                            {title: '下课时间', data: 'course_end_time'},
                            {title: '上课地点', data: 'school_name'},
                            {title: '学管', data: 'management_name'},
                            {title: 'condition_id', data: 'condition_id'},
                            {title: 'student_id', data: 'student_id'},
                            {title: 'condition_check', data: 'condition_check'},
                            {title: 'condition_comment', data: 'condition_comment'},
                            {title: 'course_id',data: 'course_id'},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '操作'},
                        ];
                        columnsDefs = [
                            {
                                render: function (data, type, row) {
                                    let date = new Date(data);
                                    return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();
                                },
                                targets: 5
                            },
                            {
                                render: function (data, type, row) {
                                    return data + '-' + row.course_end_time;
                                },
                                targets: 6
                            },
                            {
                                targets: columns.length - 1,
                                data: null,
                                defaultContent: "<button class='my-button' data-toggle='modal' data-target='#myModal'>批改</button>"
                            },
                            {
                                visible: false,
                                targets: [7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
                            },
                            /**
                             * @author xubowei
                             * 禁用排序
                             * */
                            // {
                            //     orderable: false,
                            //     targets: []
                            // }
                        ];
                        renderTable(data, columns, columnsDefs);
                    }
                }
            });
        }
        if (id === 'CorrectHomework') {
            let data = {};
            // let date = new Date();
            // let year = date.getFullYear();
            // let month = date.getMonth() + 1;
            // let day = date.getDate();
            data.correct_state = 1;
            data.start_date = year + "-" + month + "-" + day;
            data.end_date = year + "-" + month + "-" + day;
            $.ajax({
                url: '/sms/course/get/homeWork/list',
                type: 'post',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(data),
                success: function (result) {
                    if (result.isSuccess) {
                        data = result.Data;
                        let datalength = result.Data.length;
                        if (data) {
                            // console.log(data);
                            $('#CorrectHomework span')[0].className = 'badge bg-primary';
                            $('#CorrectHomework span')[0].innerHTML = datalength;
                        }
                        columns = [
                            {title: '课程名称', data: 'course_name'},
                            {title: '班级编码', data: 'grade_code'},
                            {title: '班级名称', data: 'grade_name'},
                            {title: '学生姓名', data: 'student_name'},
                            {title: '任课老师', data: 'teacher_name'},
                            {title: '学生学号', data: 'student_code'},
                            {title: 'id', data: 'id'},
                            {title: 'course_id', data: 'course_id'},
                            {title: 'course_code', data: 'course_code'},
                            {title: 'grade_id', data: 'grade_id'},
                            {title: 'student_id', data: 'student_id'},
                            {title: 'user_name', data: 'user_name'},
                            {title: 'correct_state', data: 'correct_state'},
                            {title: 'corrector', data: 'corrector'},
                            {title: 'corrector_name', data: 'corrector_name'},
                            {title: 'correct_time', data: 'correct_time'},
                            {title: 'teacher_id', data: 'teacher_id'},
                            {title: 'correct_comment', data: 'correct_comment'},
                            {title: 'create_time', data: 'create_time'},
                            {title: 'courses', data: 'courses'},
                            {title: 'start_date', data: 'start_date'},
                            {title: 'end_date', data: 'end_date'},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '',data: null},
                            {title: '操作'}
                        ];
                        columnsDefs = [
                            {
                                targets: columns.length - 1,
                                data: null,
                                defaultContent: "<button class='my-button'>批改</button>"
                            },
                            {
                                visible: false,
                                targets: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
                            }
                        ];
                        renderTable(data, columns, columnsDefs);
                    }
                }
            });
        }
        if (id === 'CorrectPaper') {
            let data = {};
            // let date = new Date();
            // let year = date.getFullYear();
            let m_month = month < 10 ? "0" + month : month;
            let m_day = day < 10 ? "0" + day : day;
            data.start_date = year + '-' + m_month + '-' + m_day;
            data.end_date = year + '-' + m_month + '-' + m_day;
            data.exam_state = 1;
            data.student_code = null;
            data.student_name = null;
            data.grade_id = null;
            data.paper_type = null;
            $.post('/sms/auth/get/teacher/correct/paper/list', data,
                function (result) {
                    if (result.isSuccess) {
                        data = result.Data;
                        let datalength = result.Data.length;
                        if (data) {
                            $('#CorrectPaper span')[0].className = 'badge bg-primary';
                            $('#CorrectPaper span')[0].innerHTML = datalength;
                        }
                        columns = [
                            {title: '考试时间', data: 'exam_begin'},
                            {title: '试卷名称', data: 'exam_name'},
                            {title: '姓名', data: 'student_name'},
                            {title: '学号', data: 'student_code'},
                            {title: '班级编码', data: 'grade_code'},
                            {title: 'exam_id', data: 'exam_id'},
                            {title: 'course_id', data: 'course_id'},
                            {title: 'course_paper_id', data: 'course_paper_id'},
                            {title: 'paper_id', data: 'paper_id'},
                            {title: 'exam_time', data: 'exam_time'},
                            {title: 'exam_date', data: 'exam_date'},
                            {title: 'exam_end', data: 'exam_end'},
                            {title: 'exam_subject', data: 'exam_subject'},
                            {title: 'exam_typeone', data: 'exam_typeone'},
                            {title: 'exam_typetwo', data: 'exam_typetwo'},
                            {title: 'exam_achievement', data: 'exam_achievement'},
                            {title: 'exam_teacher', data: 'exam_teacher'},
                            {title: 'exam_estimate', data: 'exam_estimate'},
                            {title: 'exam_type', data: 'exam_type'},
                            {title: 'exam_score', data: 'exam_score'},
                            {title: 'student_id', data: 'student_id'},
                            {title: 'exam_state', data: 'exam_state'},
                            {title: 'teacher_comment', data: 'teacher_comment'},
                            {title: 'paper_score', data: 'paper_score'},
                            {title: 'correct_user', data: 'correct_user'},
                            {title: 'correct_name', data: 'correct_name'},
                            {title: 'correct_date', data: 'correct_date'},
                            {title: 'studentAnswerList', data: 'studentAnswerList'},
                            {title: 'course_order', data: 'course_order'},
                            {title: 'teacher_id', data: 'teacher_id'},
                            {title: 'grade_id', data: 'grade_id'},
                            {title: 'paper_type', data: 'paper_type'},
                            {title: 'rank', data: 'rank'},
                            {title: '操作'}

                        ];
                        columnsDefs = [
                            {
                                render: function (data, type, row) {
                                    let date = new Date(data);
                                    return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate() +' '+ date.getHours() + ':' + date.getMinutes();
                                },
                                targets: 0
                            },
                            {
                                targets: columns.length - 1,
                                data: null,
                                defaultContent: "<button class='my-button'>批改</button>"
                            },
                            {
                                visible: false,
                                targets: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
                            }
                        ];
                        renderTable(data, columns, columnsDefs);
                    }
                });
            //
        }
    }

    tabs.click(function () {
        getTableData($(this)[0].id);
    });


})();