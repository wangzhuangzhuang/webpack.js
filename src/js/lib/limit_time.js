;
var limit_time = (function() {
	function limit_time() {};
	//、、、、、初始化
	limit_time.init=function(){
		var that = this;
		this.time_ajax();
		$(".lastMinute_lists").on("click","li",function(){
			$(this).addClass(".active").parent("a").siblings().find("li").removeClass();
			that.time_ajax();
		})
	}
	//、、、、、调取接口
	limit_time.time_ajax=function(){
		var that = this;
		$.ajax({
			url:realm.Name+"list_kill",
			type:"post",
			data:"",
			dataType:"json",
			success:function(e){
				console.log(e);
				that.struct_list(e);
				//that.sp_list(e.data,percent,sp_btn,div_class);
			}
		});
	}
	//、、、、创建结构
    limit_time.struct_list=function(e){
    
		var that = this;
		console.log(e.data)
		var dataObj = e.data["0"]; //、请求的数据内容
		 var nowTime = (e.data.now_time)*1000;      //、获取服务器的时间
	
		var startTimeArr = e.data["start_time"]; //、获取开始时间数组
		var endTimeArr = e.data["end_time"]; //、获取结束时间数组
        var str = "",word,word2,word_time,percent,sp_btn,div_class;
        str += '<a href="javascript:;"><li>';
         $.each(e.data.start_time,function(i,v){
         	var data_time = new Date(v*1000);console.log(data_time,v);
         	str += '<p>今日'+that.time_list(data_time)+'</p>';
         })
         
		$.each(startTimeArr,function(i,v){
			console.log(nowTime);
			var data_now = new Date(endTimeArr[i]*1000 - nowTime*1000);console.log(data_now);
			var data_end = new Date(v*1000 - nowTime*1000);console.log(data_end);
			if(nowTime >= v && nowTime < v){
			   word = "抢购中";
			   word2 = "距结束";
			   word_time = that.time_list(data_now);
			   $.each(e.data.kill_goods,function(i,v){
			   	percent = (Math.floor(v.xs_num/v.activity_stock).toFixed(2))*100+"%";
			   	if(percent == 100+"%"){
			   		sp_btn = "去逛逛";
			   		div_class = "lastMinProLists_finished";
			   	}else{
			   		sp_btn = "立即购买";
			   		div_class = "lastMinProLists_on";
			   	}
			   })
			}else if(nowTime > v){
				word = "已结束";
				word2 = "已结束";
			    word_time = '';
			    sp_btn = "原价购买";
			    div_class = "lastMinProLists_over";
			    percent = "";
			}else{
				word = "即将开始";
				word2 = "距开始";
			    word_time = that.time_list(data_end);
			    sp_btn = "即将开始";
			    div_class = "lastMinProLists_will";
			    percent = "";
			}
		  
		   str += '<span>'+word+'</span>';
		})
		   str += '</li></a>';
		$(".lastMinShop_min").html(word2);
		$(".lastMinShopTime").html(word_time);
		$(".lastMinute_lists").html(str);
		that.sp_list(e.data,percent,sp_btn,div_class);
	}
	//、、、、、、、、时间段转换
	limit_time.time_list=function(now){
		function add0(m){return m<10?'0'+m:m }
		var   year=now.getYear();     
              var   month=now.getMonth()+1;     
              var   date=now.getDate();     
              var   hour=now.getHours();     
              var   minute=now.getMinutes();     
              var   second=now.getSeconds();     
         return  add0(hour)+":"+add0(minute)+":"+add0(second); 
	}
	//、、、、、商品列表、、、、
	limit_time.sp_list=function(data,percent,sp_btn,div_class){
			var str2 = "";
			var that = this;
			console.log(data["0"]["0"].kill_goods);
			$.each(data["0"]["0"].kill_goods, function(i, v) {
				
				str2 += '<div class="'+div_class+'" data-goods_id="'+v.goods_id+'">'+
                     ' <div class="lastMinProList_img">'+
                           '<img src="'+v.goods_main_url+'">'+
                      '</div>'+
                      '<div class="lastMinProList_info">'+
                          '<ul class="lmpli_show">'+
                          	   '<li class="lmpliShow_tit">'+v.goods_name+'</li>'+
                          	   '<li class="lmpliShow_price">抢购价：<span>'+v.activity_price+'</span><i>'+v.pc_price+'</i></li>'+
                          	   '<li class="lmpliShow_num">已抢购'+v.xs_num+'件</li>'+
                          '</ul>'+
                          '<div class="lmpli_play">'+
                              '<p class="lmpliPlay_sche"><i></i><span>'+percent+'</span></p>'+
                              '<a href="#"><p class="lmpliPlay_next">'+sp_btn+'</p></a>'+
                          '</div>'+
                      '</div>'+
                 '</div>'
			})
			$(".lastMinPro").html(str2);
	}
	
	
	
	
	
	
	
	
	

	limit_time.init();

	return limit_time();
})()