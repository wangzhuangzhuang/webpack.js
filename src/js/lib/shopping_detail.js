var  shop_detail =(function(){
  	 function shop_detail(){}
  	//、、、获取本地用户信息
  	shop_detail.user_id = sessionS.cookie.get("encrypt_id");
  	shop_detail.order_id = picture.GetQueryString("order_id");
  	shop_detail.order_sn = picture.GetQueryString("order_sn");
  	shop_detail.order_status = picture.GetQueryString("order_status");
  	//console.log(shop_detail.order_sn);
  	//------------初始化-----------
  	shop_detail.init=function(){
  		this.ajax_shop();
  	}
     
     //------------请求数据----------
    shop_detail.ajax_shop=function(){
    	var that = this;
    	$.ajax({
  			url:realm.Name+"pay_money",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id : that.user_id,
  				order_id : that.order_id,
  				order_sn : that.order_sn
  			},
  			success:function(e){
  				console.log(e);
  				if( e.code == "10000"){
  					//console.log(e);
  					that.listshop(e);
  					that.cancel_btn();
  					that.flow(e);
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
    }
    
    //---------数据列表----------
    shop_detail.listshop=function(data){
    	var str = "",str2,str3;
    	var order_sta = 0;
    	var only = 0;
    	$.each(data,function(i,v){
    		only = v;
    		order_sta = v.order_status;
    		var time_list = new Date((v.add_time)*1000);
    		var time_list2 = new Date((v.end_time-v.add_time)*1000);
    		str = '<div class="order_inform">'+
					'<div class="shop_inform">'+
						'<h1>订单信息</h1>'+
						'<p><label>收货地址:</label><span>'+v.order_address+'</span></p>'+
						'<p>订单编号:<span>'+v.order_sn+'</span></p>'+
						'<p>下单时间:<span>'+sessionS.time_list3(time_list)+'</span></p>'+
						'<p class="deliver_time">发货时间:<span>'+sessionS.time_list3(time_list)+'</span></p>'+
					'</div>'+
					'<div class="shop_oblig">'+
						'<img src="./imgs/zhtai.png" alt="" />'+
						'<div class="shop_nopay">'+
							'<p>当前状态：<span class="status_sp">等待买家付款</span></p>'+
							'<small class="order_word">还有<span>'+sessionS.time_list2(time_list2)+'</span>进行付款，若未及时付款，系统将自动取消订单</small>'+
							'<a href="javascript:;" class="pay_money">立即付款</a><button class="cancel_btn">取消订单</button>'+
						'</div>'+
					'</div>'+
				'</div>';
			$.each(v.order_list,function(i,v){
				str += '<div class="shop_bay" data-warehouse_cross_id="'+v.warehouse_cross_id+'">由<span>'+v.warehouse_name+'</span>发货</div> '+
				     '<table>'+
					    '<tr>'+
							'<td>商品信息</td>'+
							'<td>商品规格</td>'+
							'<td>单价(元)</td>'+
							'<td>数量</td>'+
							'<td>总计(元)</td>'+
							'<td class="handle">操作</td>'+
					   '</tr>';
	        $.each(v.warehouse_goods,function(i,v){
	        	var pc_price = 0;
	        	var sp_v = v;
	        	if(v.pc_price == undefined){
	        		pc_price = v.app_price;
	        	}else{
	        		pc_price = v.pc_price;
	        	}
	        	//-----------单个商品列表----------
	        	if(v.grade_goods == undefined){
	        	str += '<tr class="zu_handle" data-order_id="'+only.order_id+'" data-order_sn="'+only.order_sn+'" data-sku_id="'+v.sku_id+'" data-prepare_num="'+v.prepare_num+'">'+
						'<td>'+
							'<dl>'+
								'<dt><img src="'+v.goods_main_url+'"/></dt>'+
								'<dd>'+v.goods_name+'</dd>'+
						  ' </dl>'+
						'</td>'+
						'<td>'+v.sku_name+'</td>'+
						'<td>￥'+pc_price+'</td>'+
						'<td>×'+v.sku_buy_num+'</td>'+
						'<td>￥'+pc_price+'</td>'+
					'</tr>';
					str3 = '<td class="refound_order"><a href="javascript:;">申请退货</a></td>';
				}
	        	//-----------組合购商品列表----------
			  if(v.grade_goods != undefined){
			  	var sp_len = v.grade_goods.length;
			  	$.each(v.grade_goods,function(i,v){
			  		var pc_price = 0;
			  		if(v.pc_price == undefined){
	        		    pc_price = v.app_price;
		        	}else{
		        		pc_price = v.pc_price;
		        	}
			  	  str += '<tr class="zu_group zu_handle" data-order_id="'+only.order_id+'" data-order_sn="'+only.order_sn+'" data-sku_id="'+v.sku_id+'" data-return_status="'+v.return_status+'" data-prepare_num="'+v.prepare_num+'">'+
						'<td>'+
							'<dl>'+
								'<dt><img src="'+v.goods_main_url+'"/></dt>'+
								'<dd>'+v.goods_name+'</dd>'+
						  ' </dl>'+
						'</td>'+
						'<td>'+v.sku_name+'</td>'+
						'<td>￥'+pc_price+'</td>'+
						'</tr>';
				  str3 = '<td class="refound_order"><a href="javascript:;">申请退货</a></td>';		
			  	})
			  	
			  	//--------组合购的总价格显示结构------------
			  	 str2 = 
						'<td rowspan="'+sp_len+'">×'+v.grade_buy_num+'</td>'+
						'<td rowspan="'+sp_len+'">￥'+v.grade_price+'</td>';
				
			  }
	        })
	        str += '</table>';
			})
			str += '<div class="shop_total">'+
					'<p><label>税费：</label><span>￥'+v.order_tax+'</span></p>'+
					'<p><label>使用优惠券：</label><span>不可用</span></p>'+
					'<p><label>配送方式：</label><span>默认EMS包邮</span></p>'+
					'<p><label>应付金额：</label><span>￥'+v.actual_price+'</span></p>'+
				'</div>'	
				
		  
    	})
    	$(".sp_list").html(str);
    	$(".zu_group").eq(0).append(str2);	
		if(order_sta == 2 || order_sta == 3){
			$(".handle").show();
			$(".handle").css({"text-align":"center","width":"200px"});
		  	$(".zu_handle").append(str3);
		  	$(".refound_order").each(function(){
		     var order_id = $(this).parent("tr").attr("data-order_id");
		     var order_sn = $(this).parent("tr").attr("data-order_sn");
		     var sku_id = $(this).parent("tr").attr("data-sku_id");
		     var prepare_num = $(this).parent("tr").attr("data-prepare_num");
		     $(this).find("a").attr("href","unfilled_orders.html?order_id="+order_id+"&order_sn="+order_sn+"&sku_id="+sku_id+"&prepare_num="+prepare_num+"");
		  	})
		  	
		  }
    }

    
     //------------取消订单请求数据-------------
     shop_detail.cancel_order=function(order_reason){
     	var that = this;
    	$.ajax({
  			url:realm.Name+"del_order",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id : that.user_id,
  				order_id : that.order_id,
  				order_sn : that.order_sn
  			},
  			success:function(e){
  				console.log(e);
  				if( e.code == "10000"){
  					alert("申请提交");
  					window.location.reload();
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
     }
     

     //---------订单弹窗------------------
    shop_detail.cancel_btn=function(){
    	var that = this;
    	$(".cancel_btn").on("click",function(){
    		$(".away_order").show();
    		
    	})
    	$(".cancel_infor").on("click",function(){
    		$(".away_order").hide();
    	})
    	$(".confirm_infor").on("click",function(){
    		if($(".choose_select option:selected").html() == "请选择退货原因"){
    			$(".choose_infor").show();
    		}else{
    		var order_reason = 	$(".choose_select option:selected").html();
    		 that.cancel_order(order_reason);
    		$(".away_order").hide();	
    		}
    		
    	})
    }


      shop_detail.flow=function(data){
      	var that = this;
      	var order_status = 0;
      $.each(data,function(i,v){
      	order_status = v.order_status;
      
      if(order_status == 1){
  	  	$(".shop_anarchy span").eq(1).css({"background":"url(./imgs/22.png)"});
  	  	$(".status_sp").html("等待卖家发货");
  	  	$(".order_word").html("请您耐心等待~");
  	  	$(".pay_money").html("申请退款");
  	  	$(".pay_money").attr("href",'shop_refund.html?order_id='+that.order_id+'&order_sn='+that.order_sn+'&order_status='+that.order_status+'');
  	  	$(".cancel_btn").hide();
  	  	$(".deliver_time").hide();
  	  }else if(order_status == 13){
  	  	$(".status_sp").html("交易失败");
  	  	$(".order_word").html("失败原因：买家取消订单");
  	  	$(".cancel_btn").hide();
  	  	$(".pay_money").hide();
  	  	$(".deliver_time").hide();
  	  }else if(order_status == 2){
  	  	$(".shop_anarchy span").eq(1).css({"background":"url(./imgs/22.png)"});
  	  	$(".shop_anarchy span").eq(2).css({"background":"url(./imgs/33.png)"});
  	  	$(".status_sp").html("卖家已发货");
  	  	$(".order_word").html("请您耐心等待~");
  	  	$(".cancel_btn").html("查看物流");
  	  	$(".cancel_btn").on("click",function(){
  	  		$(".away_order").hide();
  	  		window.location.href="trade_track.html";
  	  	})
  	  	$(".pay_money").html("确认收货");
  	  	$(".pay_money").on("click",function(){
  	  		$(".take_over").show();
  	  	})
  	  	$(".cancel_over").on("click",function(){
  	  		$(".take_over").hide();
  	  	})
  	  	$(".confirm_over").on("click",function(){
  	  		that.refound();
  	  		$(".take_over").hide();
  	  	})
  	  	$(".deliver_time").show();
  	  }else if(order_status == 3){
  	  	$(".shop_anarchy span").eq(1).css({"background":"url(./imgs/22.png)"});
  	  	$(".shop_anarchy span").eq(2).css({"background":"url(./imgs/33.png)"});
  	  	$(".shop_anarchy span").eq(3).css({"background":"url(./imgs/44.png)"});
  	  	$(".status_sp").html("确认收货");
  	  	$(".order_word").html("您已收货成功");
  	  	$(".cancel_btn").html("查看物流");
  	  	$(".cancel_btn").on("click",function(){
  	  		$(".away_order").hide();
  	  		window.location.href="trade_track.html";
  	  	})
  	  	$(".pay_money").hide();
  	  	$(".deliver_time").show();
  	  }else{
  	  	return this.order_status;
  	  }
  	  })
      
      $(".zu_group").each(function(){
      	var return_status = $(this).attr("data-return_status");
      	if( return_status == 7){
      		$(this).find(".refound_order a").html("申请退货中");
      		$(this).find(".refound_order a").attr("href","");
      	}else if(return_status == 8){
      		$(this).find(".refound_order a").html("退货申请成功");
      	}
      	else if(return_status == 9){
      		$(this).find(".refound_order a").html("退货申请失败");
      	}
      	else if(return_status == 10){
      		$(this).find(".refound_order a").html("退货中");
      	}
      	else if(return_status == 11){
      		$(this).find(".refound_order a").html("退货成功");
      	}
      	else if(return_status == 12){
      		$(this).find(".refound_order a").html("退货失败");
      	}else{
      		return return_status;
      	}
      })
  	    }


     //------------确认订单-------------
      shop_detail.refound=function(){
      	var that = this;
      	 $.ajax({
  			url:realm.Name+"ok_order",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id : that.user_id,
  				order_id : that.order_id,
  				order_sn : that.order_sn
  			},
  			success:function(e){
  				console.log(e);
  				if( e.code == "10000"){
  					console.log(e.msg);
  					window.location.reload();
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
      }





  	shop_detail.init();
  	
  	return shop_detail;
  })()