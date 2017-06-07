var  after_sales =(function(){
  	 function after_sales(){}
  	//、、、获取本地用户信息
    after_sales.user_id = sessionS.cookie.get("encrypt_id");
    //、、、、、初始化
  	after_sales.init = function(){
  	 	this.all_orderAjax();
  	 }

     //----------全部订单请求数据-------------
    after_sales.all_orderAjax=function(type){
    	var that = this;
    	
  	 	 $.ajax({
  			url:realm.Name+"all_order",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id : sessionS.cookie.get("encrypt_id"),
  				   type : 5 
  			},
  			success:function(e){
  				if( e.msg == "请求成功"){
  					console.log(e);
  					that.all_orderList(e.data);
                    that.order_status(e.data);
  				}
  				
  				if(e.code == "-10064"){
  					var no_sp = '<div class="no_sporder">您还没有相关的订单 </div>';
  					$(".user_sp_order").html(no_sp);
  					$(".nosp_list").hide();
  				}
  				
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
    }
    
    //----------全部订单列表结构--------------
    after_sales.all_orderList=function(data){
    	var that = this;
    	var str = "",str2 = "";
    	var order_id = 0,order_sn = 0;
    	var arr = [],arr2 = [];
    	var grade_len = 0,add_len = 0;
    	var data_time = 0;
    	var pay_time = 0;
    	var only_v = 0;
    	var pc_price = 0;
    	var detail_sp = 0;
    	var rowspan = [];
    	$.each(data.count,function(i,v){
    		$(".li_list>a").eq(i).find("span").html("("+v+")");
    	})
    	$.each(data.all,function(i,v){
    	   only_v = v;
    	   data_time = new Date(v.add_time*1000);	
    	   pay_time = new Date((v.end_time-v.add_time)*1000);
    	   arr.push(v.sku_mess.all_return_price);
    	   arr2.push(v.send_freight); 
    	   
    	   str += 	
                 '<div class="user_all_order" data-order_status="'+only_v.apply_status+'" data-prepare_num="'+only_v.prepare_num+'">'+
                  '<p class="thead"><time>'+sessionS.time_list(data_time)+'</time><span>订单号：'+only_v.order_num+'</span></p>'+
                  '<table class="more_sporder">'+
                   ' <tbody>';
             
                detail_sp = v;
	        	if(v.sku_mess.pc_price != undefined){
	        		pc_price = v.sku_mess.pc_price;
	        	}else{
	        		pc_price = v.sku_mess.app_price;
	        	}
             	if(v.sku_mess.grade_goods == undefined){
              str +=  ' <tr data-goods_id="'+v.sku_mess.goods_id+'" data-order_id="'+only_v.apply_id+'" data-order_sn="'+only_v.order_num+'">'+
                      	'<td><img src="'+v.sku_mess.goods_main_url+'"/></td>'+
                      	'<td><h1>'+v.sku_mess.goods_name+'</h1><span>'+v.sku_mess.sku_name+'</span></td>'+
                      	'<td><h6>原价：<span>'+pc_price+'</span></h6>￥'+v.sku_mess.one_price+'</td>'+
                      	'<td>×'+v.sku_mess.sku_buy_num+'</td>'+
                      	'</tr>';
                    }
                     
           
    
         
           	var detail_v = v.sku_mess;
    	    
    	   
         
                
           str += '</tbody>'+
                  '</table>'+
                  '</div>';
          
        
    		
        })
    	$(".user_sp_order").html(str);
    	$(".more_sporder").each(function(i,v){
    		 str2 =  '<td rowspan="'+rowspan[i]+'"><h2>￥'+arr[i]
+'</h2><p>(含运费<label>'+arr2[i]+'</label>元)</p></td>'+
                      	'<td rowspan="'+rowspan[i]+'" class="order_status"><span>等待付款</span><a href="javascript:;" class="order_detail">订单详情</a><a href="#" class="look_logis">查看物流</a></td>'+
                 '<td rowspan="'+rowspan[i]+'" class="pay_order"><div></div><button>立即付款</button><a href="#">取消订单</a></td>'; 
    		$(this).find("tr").eq(0).append(str2);
    	})
    	
        
    }
    
    //------------订单状态--------------
    after_sales.order_status=function(data){
    	var that = this;
    	var status = 0;
    	var order_id = 0,order_sn = 0;
    	$(".user_all_order").each(function(i,v){
    	 var con_order = $(this);
    	 //console.log($(this));
    	 status = $(this).attr("data-order_status");
    	 var sub_btn = $(this).find(".pay_order").find("button");
    	if(status == 13){
    		$(this).find(".order_status span").html("交易失败");
    		$(this).find(".pay_order").html("");
    	}else if(status == 7){
    		$(this).find(".order_status span").html("退货申请中");
    		$(this).find(".order_detail").html("查看详情");
    		$(this).find(".pay_order").find("div").html("");
    		$(this).find(".pay_order").find("div").hide();
    		$(this).find(".pay_order").find("a").hide();
    		sub_btn.html("取消申请");
    		sub_btn.on("click",function(){
    			layer.confirm('是否取消申请？', {
				  		  	   	className:"aaa",
										  btn: ['确定','取消'] //按钮
										  }, function(){
										  	that.cancel_order(data);
										  
					 	      });
    		})
    	}else if(status == 8){
    		$(this).find(".order_status span").html("退货申请成功");
    		$(this).find(".order_detail").html("查看详情");
    		$(this).find(".pay_order").find("div").html("");
    		$(this).find(".pay_order").find("div").hide();
    		$(this).find(".pay_order").find("a").html("填写单号");
    		var file_seat = $(this).find(".pay_order").find("a");
    		file_seat.on("click",function(){
    			var return_num = 0;
    		 $.each(data.all,function(i,v){
    			var return_num = v.return_num;
    		 })
  				window.location.href="file_seat.html?return_num="+return_num+"";
  				})
    		sub_btn.html("取消申请");
    		sub_btn.on("click",function(){
    			layer.confirm('是否取消申请？', {
				  		  	   	className:"aaa",
										  btn: ['确定','取消'] //按钮
										  }, function(){
										  	that.cancel_order(data);
										  
					 	      });
    		})
    	}else if(status == 9){
    		$(this).find(".order_status span").html("退货申请失败");
    		$(this).find(".order_detail").html("查看详情");
    		$(this).find(".pay_order").find("div").html("");
    		$(this).find(".pay_order").find("div").hide();
    		$(this).find(".pay_order").find("a").hide();
    		sub_btn.hide();
    		
    	}else if(status == 10){
    		$(this).find(".order_status span").html("退货中");
    		$(this).find(".order_detail").html("查看详情");
    		$(this).find(".pay_order").find("div").html("");
    		$(this).find(".pay_order").find("div").hide();
    		$(this).find(".pay_order").find("a").hide();
    		sub_btn.hide();
    	}else if(status == 11){
    		$(this).find(".order_status span").html("退货成功");
    		$(this).find(".order_detail").html("查看详情");
    		$(this).find(".pay_order").find("div").html("");
    		$(this).find(".pay_order").find("div").hide();
    		$(this).find(".pay_order").find("a").hide();
    		sub_btn.hide();
    	}else if(status == 12){
    		$(this).find(".order_status span").html("退货失败");
    		$(this).find(".order_detail").html("查看详情");
    		$(this).find(".pay_order").find("div").html("");
    		$(this).find(".pay_order").find("div").hide();
    		$(this).find(".pay_order").find("a").hide();
    		sub_btn.hide();
    	}else{
    		return status;
    	}
    	
    	if($(this).find(".order_detail").html() == "查看详情"){
    		$(".order_detail").on("click",function(){
    		var prepare_num = $(this).parents(".user_all_order").attr("data-prepare_num");
			window.location.href="refund_application.html?user_id="+that.user_id+"&prepare_num="+prepare_num+"";
    		})
    	}
      })
    }
    
    //-------------------取消申请退货-------------------
  	after_sales.cancel_order=function(data){
  		var that = this;
  		var apply_id;
  		$.each(data.all,function(i,v){
  			apply_id = v.apply_id;
  		})
  		$.ajax({
  			url:realm.Name+"del_return_goods",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id : that.user_id,
  				apply_id : apply_id
  			},
  			success:function(e){
  				console.log(e);
  				if( e.msg == "请求成功"){
  					$(".success_order").show();
  					$(".cancel_window").on("click",function(){   	
  					   $(".success_order").hide();	
  					   window.location.reload();
                  })
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
  	}
    
   














    after_sales.init();
  	
  	return after_sales;
  })()