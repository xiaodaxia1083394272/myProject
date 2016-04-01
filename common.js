if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

function transTimeFormart(time) {
    var new_date = new Date(time * 1000);
    return new_date.format('hh:mm')
}

function trans2WeekDayWithYear(book_date) {
    var new_date = new Date(book_date * 1000);
    Y = new_date.getFullYear() + '年';
    return Y + trans2WeekDay(book_date);
}

function trans2WeekDay(book_date) {
    var new_date = new Date(book_date * 1000);
    M = (new_date.getMonth() + 1) + '月';
    D = new_date.getDate() + '日';
    W = ""
    switch (new_date.getDay()) {
        case 0:
            W = "日";
            break;
        case 1:
            W = "一";
            break;
        case 2:
            W = "二";
            break;
        case 3:
            W = "三";
            break;
        case 4:
            W = "四";
            break;
        case 5:
            W = "五";
            break;
        case 6:
            W = "六";
            break;
    }
    return M + D + "(周" + W + ")";
}

function trans2Day(date) {
    var new_date = new Date(date * 1000);
    var Y = new_date.getFullYear() + '年';
    var M = (new_date.getMonth() + 1 < 10 ? '0' + (new_date.getMonth() + 1) : new_date.getMonth() + 1) + '月';
    var D = new_date.getDate() + '日';
    var YMD = Y + M + D;

    return YMD;
}

/*获取URL中的参数的值*/
function getURLInformation() {
    var urlMsg = {}; //定义一个空对象urlMsg
    if (window.location.href.split('#')[0].split('?')[1]) {
        var urlSearch = window.location.href.split('#')[0].split('?')[1].split('&');
    }
    if (urlSearch) {
        for (var i = 0; i < urlSearch.length; i++) {
            urlMsg[urlSearch[i].split('=')[0]] = urlSearch[i].split('=')[1] || "";
        }
    }
    return urlMsg;
}

// 是否手机号码 输入任意值 输出布尔值
function isPhoneNumber(num) {
    return !!(!isNaN(num - "0") == true && num.length == 11 && /13|14|15|17|18/i.test(num.substring(0, 2)) && num % 1 == 0)
}
//设置cookie
function setCookie(_key, _value, days, _tag, callback) {

    $.nmDebug.log("setCookies callback  ",callback);
    var Days = days || 30;
    var _expire = Days * 24 * 60 * 60 * 1000;
    // var exp = new Date();
    // exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    // if (path != "undefined"){
    //     document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=" + path;
    // }
    // else{
    //     document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    // }

    $.ajax({
        type: "get",
        async: true, //异步请求
        url: '/tools/setCookies?',
        data: {
            key: _key,
            value: _value,
            expire: _expire,
            tag: _tag,
            rondom: Math.random()
        },
        timeout: 3000,
        success: function(datas) {
            $.nmDebug.log("setCookies  datas", datas);
            if (datas.status == "0000") {
                $.nmDebug.log("setCookies", "success");
                if (callback != null)
                    callback();
            }
        },
        error: function() {
            $.nmDebug.log("setCookies", "失败，请稍后再试！");
        }
    });

}

//获取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//删除cookie
function deleteCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=v; expires=" + date.toGMTString();
}

/*  倒计时功能
 o:选择器对象
*/
function setCodeTimer(obj) {
    var t = 60;
    var text = obj.text();
    var tip = [text, '重新获取'];
    obj.prop("disabled", "true");
    obj.html(tip[1] + "(" + t + "秒)");
    obj.css("cursor", "default");
    var codeTimer = window.setInterval(function() {
        t--;
        obj.html(tip[1] + "(" + t + "秒)");
        if (t == 0) {
            window.clearInterval(codeTimer);
            obj.removeProp("disabled");
            obj.html(tip[0]);
            obj.css("cursor", "pointer");
        }
    }, 1000);
}

/**
 * 白色按钮的鼠标效果
 * @param btn
 */
function whiteBtnMouseEvent(btn) {
    btn.mouseover(function() {
        $(this).addClass("white-mouse-over");
        $(this).removeClass("white-mouse-click");
        $(this).children().addClass("white-mouse-text-color");
    });

    btn.mouseout(function() {
        $(this).removeClass("white-mouse-over");
        $(this).removeClass("white-mouse-click");
        $(this).children().removeClass("white-mouse-text-color");
    });

    btn.click(function() {
        $(this).addClass("white-mouse-click");
        $(this).removeClass("white-mouse-over");
        $(this).children().addClass("white-mouse-text-color");
    });
}

/**
 * 蓝色按钮的鼠标效果
 * @param btn
 */
function blueBtnMouseEvent(btn) {
    btn.mouseover(function() {
        if (btn.data("unable")) {
            return;
        }
        $(this).addClass("blue-mouse-over");
    });

    btn.mouseout(function() {
        $(this).removeClass("blue-mouse-over");
    });

    btn.click(function() {
        $(this).removeClass("blue-mouse-over");
    });
}

/*判断当前登录状态
  return true 登录了 false 未登录
*/
function isLogin() {

    if ($(".user-name").attr("data-user_id") > 0 || getCookie("is_login") == 1)
        return true;
    else
        return false;
}


jQuery.extend({
    nmDebug: {
        config: false,
        log: function log() {
            if (jQuery.nmDebug.config) {
                console.log(arguments);
            }
        }
    }
})

/*判断是否是ie9以下的浏览器*/
function isIELow() {
    if (!![].forEach) {
        return false;
    } else {
        return true;
    }
}
/*判断当前是什么浏览器，此方法不是特别准确，请慎用*/
function getOs() {

    if (!![].forEach) {
        if (isFirefox = navigator.userAgent.indexOf("Firefox") != -1) {
            return "Firefox";
        }
        if (isChrome = navigator.userAgent.indexOf("Chrome") != -1) {
            return "Chrome";
        }
        if (isSafari = navigator.userAgent.indexOf("Safari") != -1) {
            return "Safari";
        }
        if (isOpera = navigator.userAgent.indexOf("Opera") != -1) {
            return "Opera";
        }
    } else {
        return "IE";
    }
}



$(document).ready(function() {
    /*适配低版本 placeholder*/
    if (underIE9() || navigator.userAgent.indexOf("MSIE 9") > -1) {
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder') && this.type != "password") {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if ((input.val() == '' || input.val() == input.attr('placeholder')) && this.type != "password") {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();

        $(":password").each(function(index, el) {
            var $el = $(el);
            var pa = $el.parent("div");
            $el.addClass("password" + index).attr("data-class", "password" + index);
            var zIndex = $el.css("zIndex") * 1 > 0 ? $el.css("zIndex") + 1 : 999;
            var l = 0;
            if ($el.position().left < 0) {
                l = 0;
            }
            if (parseInt($el.css("left")) * 1 > 0) {
                l = $el.css("left");
            }
            var o = $("<span class=password" + index + "></span>").css({
                width: "100%",
                height: "100%",
                lineHeight: "40px",
                fontSize: $el.css("fontSize"),
                display: "block",
                textAlign: "left",
                position: "absolute",
                top: 0,
                left: "20px",
                zIndex: zIndex
            }).text($el.attr("placeholder"));
            pa.append(o);
        });

        $("body").on("click", "span[class^=password]", function() {
            $(this).hide();
            $('input.' + this.className).focus();
        })

        $('input[data-class]').focus(function() {
            var $el = $(this);
            if (!$el.val()) {
                $("span." + $el.attr("data-class")).hide();
            }
        })

        $('input[data-class]').blur(function() {
            var $el = $(this);
            if (!$el.val()) {
                $("span." + $el.attr("data-class")).show();
            }
        })
    }
});
/*获取屏幕高度*/
function getHeight() {
    if (window.innerHeight != undefined) {
        return window.innerHeight;
    } else {
        var B = document.body,
            D = document.documentElement;
        return Math.min(D.clientHeight, B.clientHeight);
    }
}

function underIE9() {
    var ie = !!window.ActiveXObject;
    var under = !!![].forEach;
    if (ie && under) {
        return true;
    } else {
        return false;
    }

}
