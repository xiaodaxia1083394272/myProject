

 //历史记录数据接口
 function requestHistoryList(){

  var page = page || 1;
  
  $.ajax({

    type:"get",
    async:true,
    dataType:"json",
    url:'/user/userlog?page='+click_page,
    data:$.param({
        password:$('input[id=recharge-input]').val()

    success:function(response,status,xhr){

      if(response.status=="0000"){
        if(response.data.list.length > 0){ //pc的数组一定是length而不是count，切记
              
              $('#balance-detail').html('余额 :'+'￥'+response.data.balance.toFixed(2));
              var tbody=$('.table-body').empty();
              $.each(response.data.list,function(idx,item){
                var color = "";
                var icon = "";
                
                if(parseFloat(item.type)>0){
                  color = "#4f6dcf";
                  icon = "+￥"
                }else{
                  icon ="-￥";
                }

                var date = timeStampToDate(item.add_time);

                tbody.append("<tr>"+
                  "<td>"+date.Format("yyyy年MM月dd日 hh:mm:ss")+"</td>"+
                  "<td>"+item.description+"</td>"+
                  "<td style='color:"+ color +";text-align:right;'>"+icon+Math.abs(item.money).toFixed(2)+"</td>"+
                  "</tr>");

              });

        }else{
           
           //弹框定时取消
        setTimeout(close_background,4000);
               
          // alert('你暂无历史记录');
        }
      
        

      }
    },
    error:function(status){
      // alert('status');

    }
  });








