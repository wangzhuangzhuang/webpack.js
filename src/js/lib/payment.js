 
  var payment = (function(){
  	function payment(){};
  	
  	payment.init = function (){
  		
  		payment.ajaxFn();
  		
  	};
  	payment.out_trade_no;
  	payment.total_fee;
  	payment.ajaxFn = function () {
  		
  		       $.ajax({
						type:"post",
						url: realm.Name + "wait_pay",
						data:{
							"order_sn":sessionS.cookie.get("order_sn"),
							"user_id":   sessionS.cookie.get("encrypt_id")
						},
						dataType:"json",
						success:function(e){
						
							if(e.code == "10000"){
								
								payment.HTMLFn(e.data)
								
							};
							
						}
					});
  		
  	};
  	
  	payment.HTMLFn = function (data) {
  		var str = "";
  	
  		$.each(data.goods_list,function(i,v){
  			
  			$.each(v.goods_name, function(x,y){
  				
  				str += '<p>'+y+'<span>'+v.warehouse_name+'</span></p>'
  				
  			});
  			
  		});
  		$("#message").before(str);
  		$("#message").find("span").eq(0).text(data.user_information.order_person);
  		$("#message").find("span").eq(1).text(data.user_information.order_phone);
  		$("#address").text(data.user_information.order_address);
  		$("#sum").text("￥"+data.user_information.order_price);
  		payment.total_fee = data.user_information.order_price;
  		payment.out_trade_no = data.user_information.order_sn;
  		payment.paymentClick();
  	};
  	
  	
  	/////点击支付
  	payment.paymentClick = function () {
  		$("#paymentBtn").on("click",function(){
  			$(".zhifu_detail03").show().siblings().hide();
  			$.ajax({
  				type:"post",
  				url:realm.Name + "found_orderPC",
  				data:{
  					"out_trade_no" : payment.out_trade_no,
  					"total_fee"    : payment.total_fee
  				},
  				dataType:"json",
  		        success:function(e){
  		        	if(e.code == "10000"){
  		        		$("#codeImg").html(e.data.html);
  		        		$("#trade_no").text("订单号："+payment.out_trade_no);
  		        		$("#total_fee").text("￥"+payment.total_fee);
  		        		var m = e.data.diff_time*1;
  		        		var k = 1800-m;
  		        		var time = null;
  		        	    tiem = setInterval(function(){
  		        			k--;
  		        			$("#timeBox").text(sessionS.time_list6(k));
  		        			$.ajax({
  		        				type:"post",
  		        				url:realm.Name + "sel_orderPC",
  		        				data:{
  		        				  "out_trade_no" : payment.out_trade_no
  		        				},
  		        				dataType:"json",
  		        				success:function(e){
  		        					console.log(e);
  		        					if(e.code == "10000"){
  		        						 $(".zhifu_suc").show().siblings().hide();
  		        						 clearInterval(tiem);
  		        					};
  		        				}
  		        			});
  		        		},1000);
  		        	};
  		        }
  			});
  		});
  		
  	}
  	
  	
  	
  	
  	
  	
  	
  	
  	payment.init();
  	return payment;
  })()
