 
  var wei_detail = (function(){
  	function wei_detail(){};
  	
  	
  
  	
  	wei_detail.init = function () {
  		this.dataBackfill();
  		this.deal();
  		this.liClick();
  	    this.deposit();
  		this.buttonClick();
  		this.filtrateBtn();
  		wei_detail.timeFn();
  	}
  	//、、、、时间选择
 	wei_detail.timeArray = [];
 	//、、、、时间判断 
 	wei_detail.timeFn = function (){
 		    var now = new Date(); //当前日期
			var nowDayOfWeek = now.getDay()-1; //今天本周的第几天
			var nowDay = now.getDate(); //当前日
			var nowMonth = now.getMonth(); //当前月
			var nowYear = now.getYear(); //当前年
			nowYear += (nowYear < 2000) ?1900 : 0; //
			var lastMonthDate = new Date(); //上月日期
			lastMonthDate.setDate(1);
			lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
			var lastYear = lastMonthDate.getYear();
			var lastMonth = lastMonthDate.getMonth();
			//格式化日期：yyyy-MM-dd
			function formatDate(date) {
			var myyear = date.getFullYear();
			var mymonth = date.getMonth()+1;
			var myweekday = date.getDate();
			if(mymonth < 10){
			mymonth = "0" + mymonth;
			}
			if(myweekday < 10){
			myweekday = "0" + myweekday;
			}
			return (myyear+"-"+mymonth + "-" + myweekday);
			}
			//获得某月的天数
			function getMonthDays(myMonth){
			var monthStartDate = new Date(nowYear, myMonth, 1);
			var monthEndDate = new Date(nowYear, myMonth + 1, 1);
			var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
			return days;
			}
			//获得本季度的开始月份
			function getQuarterStartMonth(){
			var quarterStartMonth = 0;
			if(nowMonth<3){
			quarterStartMonth = 0;
			}
			if(2<nowMonth && nowMonth<6){
			quarterStartMonth = 3;
			}
			if(5<nowMonth && nowMonth<9){
			quarterStartMonth = 6;
			}
			if(nowMonth>8){
			quarterStartMonth = 9;
			}
			return quarterStartMonth;
			}
			
			//获得本周的开始日期
			function getWeekStartDate() {
			var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
			return formatDate(weekStartDate);
			}
			
			//获得本周的结束日期
			function getWeekEndDate() {
			var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
			return formatDate(weekEndDate);
			}
			
			//获得本月的开始日期
			function getMonthStartDate(){
			var monthStartDate = new Date(nowYear, nowMonth, 1);
			return formatDate(monthStartDate);
			}
			
			//获得本月的结束日期
			function getMonthEndDate(){
			var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
			return formatDate(monthEndDate);
			}
			//获得上月开始时间
			function getLastMonthStartDate(){
			var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
			return formatDate(lastMonthStartDate);
			}
			//获得上月结束时间
			function getLastMonthEndDate(){
			var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
			return formatDate(lastMonthEndDate);
			}
			//获得本季度的开始日期
			function getQuarterStartDate(){
			var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
			return formatDate(quarterStartDate);
			}
			//或的本季度的结束日期
			function getQuarterEndDate(){
			var quarterEndMonth = getQuarterStartMonth() + 2;
			var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
			return formatDate(quarterStartDate);
			}
			
		   this.timeArray = [
		      {
		        "start_time":	new Date(getWeekStartDate()+" "+"00:00:00")*1/1000,
		        "end_time"  :    new Date(getWeekEndDate()+" "+"23:59:59")*1/1000 
		      },
		      {
		        "start_time":	new Date(getMonthStartDate()+" "+"00:00:00")*1/1000,
		        "end_time"  :    new Date(getMonthEndDate()+" "+"23:59:59")*1/1000
		      },
		      {
		        "end_time":	Math.round(new Date()*1/1000),
		        "start_time"  :    Math.round(new Date()*1/1000 - (60*60*24*90))
		      },
		      {
		        "end_time":	Math.round(new Date()*1/1000),
		        "start_time"  :    Math.round(new Date()*1/1000 -(60*60*24*180))
		      },
		      {
		        "end_time":	Math.round(new Date()*1/1000),
		        "start_time"  :    Math.round((new Date()*1/1000) - (60*60*24*365))
		      }
		   ]
 	
 		
 	}
 	
  	//、、数据回填
  	wei_detail.dataBackfill = function () {
  		
  		var name       = sessionS.cookie.get("user_nickname");
  		var user_phone = sessionS.cookie.get("user_phone");
  		var user_image = sessionS.cookie.get("user_image");
  		var card_name  = sessionS.cookie.get("card_name");
  		var card_num   = sessionS.cookie.get("card_num");
  		var balance_money  = sessionS.cookie.get("balance_money");
  		var isbang         = sessionS.cookie.get("isbang");
  		$("#phone").text(user_phone);
		$("#user_Name").text(name);
		$("#user_img").attr("src",user_image);
  		$("#card_name").text(card_name);
  		$("#card_num").text(card_num);
  		$("#balance_money").text("￥"+balance_money);
  		
  		if(balance_money > 100){
  			$("#balance_money").next().hide();
  		}
  		if(balance_money > 100 && isbang > 0){
  			$("#deposit").addClass("active");
  		}
  		
  		
  		
  	}
  	
  	//、、、调用交易明细
  	wei_detail.dealPage = 0;
  	wei_detail.deal = function () {
		$.ajax({
			url:realm.Name +"transaction_detailed",
			type:"post",
			data:{
			   user_id : sessionS.cookie.get("encrypt_id"),
			   page    : wei_detail.dealPage
			   
			},
			dataType:"json",
			success:function(e){
				if(e.code == "10000"){
					wei_detail.dealHTML(e.data.record,e.data.count);
				};
			}
		});
  		
  	};
  	//、、、创建调用交易明细HTML
    wei_detail.dealHTML = function (data,len) {
    	var str = '';
    	if(data.length == 0){
    		$("#deal").html("<tr><td colspan='4' style='text-align:center'>无交易记录</td></tr>");
    		return false;
    	}
    	if( len > 20 && wei_detail.dealPage == 0){
    		var k = Math.ceil(len/20);
    		wei_detail.pageFn("pager-list",k,"dealPage","deal");
    	};
    	
    	$.each(data, function(i,v) {
    		str += '<tr>'+
		    			'<td>'+picture.getNowFormatDate(v.deal_time*1000)+'</td>'+
		    			'<td><label>'+v.order_list_goods+'</label></td>'+
		    			'<td>'+v.actual_price+'</td>'+
		    			'<td>'+v.deal_profit+'</td>'+
		    		'</tr>';
    	});
    	
    	$("#deal").html(str);
    };
    
    //、、、提现明细
    wei_detail.depositPage = 0;
    wei_detail.deposit = function () {
    	
    	$.ajax({
			url:realm.Name +"withdrawals_detailed",
			type:"post",
			data:{
			   user_id : sessionS.cookie.get("encrypt_id"),
			   page    : wei_detail.depositPage
			   
			},
			dataType:"json",
			success:function(e){
				if(e.code == "10000"){
					wei_detail.depositHTML(e.data.list,e.data.count);
				};
			}
		});
    	
    };
    wei_detail.depositHTML = function (data,len) {
    	
    	if(data.length == 0){
    		$("#depositBox").html("<tr><td colspan='4' style='text-align:center'>无交易记录</td></tr>");
    		return false;
    	}
    	if( len >20 && wei_detail.depositPage == 0){
    		var k = Math.ceil(len/20);
    		wei_detail.pageFn("pagerbox2",k,"depositPage","deposit");
    	};
    	
    	var str = '';
    	
    	$.each(data, function(i,v) {
    		        str += '<tr>'+
	    		            '<td>'+v.accout_type+'</td>'+
			    			'<td>'+v.wd_money+'</td>'+
			    			'<td>'+picture.getNowFormatDate(v.wd_time*1000)+'</td>'+
		    		        '</tr>';
    	});
    	
    	$("#depositBox").html(str);
    	
    };
    //、、、分页 
    wei_detail.pageFn = function (name,k,page,fn) {

				    $('.'+name).pageList({  
				        prevText: '<img src="imgs/fenlei_47.png"/>上一页',  
				        nextText: '下一页<img src="imgs/fenlei_50.png"/>',  
				        recordText: '共{0}页',  
				        totalCount: k,  
				        goInputType: 'text',  
				        showGoLink: true,  
				        showPageRange: 1,  
				        pageSize:1,
				        renderPerCall: true,  
				        clickCallback: function (currentPage) {  
				             wei_detail[page] = currentPage-1;
				             wei_detail[fn]();
				        }  
				    }); 
       
    	
    }
  	
  	//、、、点击切换
  	wei_detail.liClick = function(){
  		$(".detail_list").on("click","li",function(){
  			var i = $(this).index();
  			$(".table_list").find("section").eq(i).show().siblings().hide();
  		});
  	};
  	
  	//、、、点击button
  	wei_detail.buttonClick = function () {
  	   
  	   $("#binding").on("click",function(){
  	   	  window.location.href = "pc_weiying.html";
  	   });
  	   
  	   $("#deposit.active").on("click",function(){
  	   	  window.location.href = "wei_cash.html";
  	   });
  	   
  	};
  	
  	//、、、点击筛选
  	wei_detail.filtrateBtn = function () {
  		var k;
  		var data;
  		$("#filtrateBtn").on("click",function(){
  			$(".time_choose").show();
  		})
  		$('#TimeZone').on("click","li",function(){
  			$(this).addClass("active").siblings().removeClass("active");
  			k = $(this).index();
  		})
  		$(".inputWrap input").on("change",function(){
  			$('#TimeZone li').removeClass("active");
  		})
  		$("#timeConfirm").on("click",function(){
  			
  			wei_detail.depositPage = 0;
  			if($('#TimeZone li.active').length == 1){
  				data = wei_detail.timeArray[k];
  				data.user_id = sessionS.cookie.get("encrypt_id");
  				data.page = wei_detail.depositPage;
  			}else{
  				data = {};
  				data.user_id = sessionS.cookie.get("encrypt_id");
  				data.page = wei_detail.depositPage;
  				data.StartDate =new Date($("inputWrap input").eq(0).val())*1/1000;
  				data.EndDate = new Date($("inputWrap input").eq(1).val())*1/1000;
  			}
  			$.ajax({
				url:realm.Name +"transaction_detailed",
				type:"post",
				data:data,
				dataType:"json",
				success:function(e){
					if(e.code == "10000"){
						wei_detail.dealHTML(e.data.record,e.data.count);
						$(".time_choose").hide();
					};
				}
		   });
  		})
  		
  	}
  	
  	wei_detail.init();
  	return wei_detail;
  })()
