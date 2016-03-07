

  //转换时间戳
  Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
        "w": this
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function timeStampToDate(timeStampString) {
  return new Date(parseInt(timeStampString) * 1000);     
}

//调用方法
var date = timeStampToDate(item.add_time);//后台返回的字符串时间戳参数
date.Format("yyyy年MM月dd日 hh:mm:ss"); //随便拼接



  //转换时间戳
  function b(data){
              var new_date = new Date(data*1000);
              N = new_date.getFullYear()+'年';
              M = new_date.getMonth()+'月';
              D = new_date.getDate()+'日';
              switch(new_date.getDay())
              {
                case 0:
                  W="日";
                  break;
                case 1:
                  W="一";
                  break;
                case 2:
                  W="二";
                  break;
                case 3:
                  W="三";
                  break;
                case 4:
                  W="四";
                  break;
                case 5:
                  W="五";
                  break;
                case 6:
                  W="六";
                  break;
              }
              return N+M+D+"(周"+W+")";
            }












