/**
 * Created by huangjiaroro on 2017/7/13.
 * 自定义控件
 */
(function ($) {

    //自定义下拉控件
    $.fn.spinnerBox = function (options, param) {
        var defaults = {
            controlCode: "",
            valueField: "dic_code",
            textField: "dic_value",
            defaultValue: null,
            placeholderText: "全部",
            onChange: null
        };
        if (typeof options == 'string') {
            var method = $.fn.spinnerBox.methods[options];
            if (method) {
                return method(this, param);
            }
        } else {
            var $this = $(this);
            if ($this.find("button").length > 0) {
                return;
            }
            $this.addClass("btn-group");
            options = $.extend(defaults, options);
            $this.data("options", options);
            var html = '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'
                + options.placeholderText
                + '<span class="caret"></span></button><ul class="dropdown-menu" aria-labelledby="dLabel" role="menu"></ul>';
            $this.html(html);
            //从字典dic_data 中获取相应的列表值 modify 2017=09-29 huangjiaroro
            if (window.localStorage.dic_data) {
                var dicData = JSON.parse(window.localStorage.dic_data);
                var _data = dicData[options.controlCode];
                loadSpinnerBoxData($this, _data);
                // $this.dropdown();
                if (options.defaultValue != null) {
                    $this.spinnerBox("setValue", options.defaultValue)
                }
            } else if (JSON.stringify(parent.window.dic_data != "{}")) {
                var _data = parent.window.dic_data[options.controlCode];
                loadSpinnerBoxData($this, _data);
                // $this.dropdown();
                if (options.defaultValue != null) {
                    $this.spinnerBox("setValue", options.defaultValue)
                }
            } else {//在某些单独打开的页面取不到缓存数据时
                $.ajax({
                        url: "dic/" + options.controlCode,
                        success: function (req) {
                            if (req.isSuccess) {
                                loadSpinnerBoxData($this, req.Data);
                                // $this.dropdown();
                                if (options.defaultValue != null) {
                                    $this.spinnerBox("setValue", options.defaultValue)
                                }
                            }
                        }
                    }
                )
            }
        }
    };

    $.fn.spinnerBox.methods = {
        setValue: function (jq, value) {
            var options = jq.data("options");
            if (value == null || value == '') {
                jq.data("fileValue", "");
                jq.data("fileText", "");
                jq.find("button").html(options.placeholderText + '<span class="caret"></span>');
                if (options.onChange != null) {
                    options.onChange("", "")
                }
                return
            }
            jq.find("li").each(function () {
                if ($(this).attr("fileValue") == value) {
                    jq.data("fileValue", value);
                    jq.data("fileText", $(this).attr("fileText"));
                    jq.find("button").html($(this).attr("fileText") + '<span class="caret"></span>');
                    if (options.onChange != null) {
                        options.onChange(value, $(this).attr("fileText"))
                    }
                    return false;
                }
            })
        },
        getValue: function (jq) {
            var value = "";
            if (jq.data("fileValue")) {
                value = jq.data("fileValue")
            }
            return value;
        },
        getText: function (jq) {
            return jq.data("fileText");
        },
        loadData: function (jq, data) {
            loadSpinnerBoxData(jq, data)
        },
        setReadOnly: function (jq, value) {
            if (value == true) {
                if (!jq.hasClass("readonly_select")) {
                    jq.addClass("readonly_select")
                }
            } else {
                jq.removeClass("readonly_select")
            }
            jq.find("select").attr("readonly", value);
        }
    };

    function loadSpinnerBoxData(jq, data) {
        if (!data) {
            return;
        }
        var options = jq.data("options");
        var html = '';
        jq.find("ul").html(html);
        html = html + '<li><a href="javascript:void(0)" onclick="setSpinnerBoxValue(this,' + null + ')">全部</a></li>';
        for (var i = 0; i < data.length; i++) {
            var _data = data[i];
            var _text, _value;
            for (var key in _data) {
                if (key == options.valueField) {
                    _value = _data[key];
                }
                if (key == options.textField) {
                    _text = _data[key];
                }
            }
            html = html + '<li fileText="' + _text + '" fileValue="' + _value + '">'
                + '<a href="javascript:void(0)" onclick="setSpinnerBoxValue(this,' + "'" + _value + "'" + ')">' + _text + '</a></li>'
        }
        jq.find("ul").html(html);

    }
})
(jQuery);

function setSpinnerBoxValue(jq, value) {
    $(jq).parents(".btn-group").spinnerBox("setValue", value)
}
