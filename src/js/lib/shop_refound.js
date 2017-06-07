var  shop_refound =(function(){
  	 function shop_refound(){}
  	//、、、获取本地用户信息
  	shop_refound.user_id = sessionS.cookie.get("encrypt_id");
  	shop_refound.order_id = picture.GetQueryString("order_id");
  	shop_refound.order_sn = picture.GetQueryString("order_sn");
  	
//------------初始化-----------
  	shop_refound.init=function(){
  		this.ajax_shop();
  		
  	}
  	

 //------------请求数据----------
    shop_refound.ajax_shop=function(){
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
  					that.apply_status(e);
  				$(".submit_over").on("click",function(){
  			var order_reason = $("#refund_explain").find("select option:selected").html();
  			if(order_reason != "请选择退货原因"){
  				that.submit_over(order_reason);
  				window.location.reload();
  			}else{
  				$(".choose_over").show();
  				return false;
  			}
  					
  				})
  					
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
    }
    
    
    //---------数据列表----------
    shop_refound.listshop=function(data){
    	var that = this;
    	var str = "",str2 = "";
    	$.each(data,function(i,v){
    		var time_list = new Date((v.add_time)*1000);
    		var time_list2 = new Date((v.end_time-v.add_time)*1000);
    		
    		$(".shop_order").html(that.order_sn);
    		$(".order_time").html(sessionS.time_list3(time_list));
    		
    		$.each(v.order_list,function(i,v){
				str = '<div class="shop_bay" data-warehouse_cross_id="'+v.warehouse_cross_id+'">由<span>'+v.warehouse_name+'</span>发货</div> '+
				     '<table>'+
					    '<tr>'+
							'<td>商品信息</td>'+
							'<td>商品规格</td>'+
							'<td>单价(元)</td>'+
							'<td>数量</td>'+
							'<td>总计(元)</td>'+
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
	        	str += '<tr>'+
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
				}
	        	//-----------組合购商品列表----------
			  if(v.grade_goods != undefined){
			  	var sp_len = v.grade_goods.length;console.log(sp_len);
			  	$.each(v.grade_goods,function(i,v){
			  		var pc_price = 0;
			  		if(v.pc_price == undefined){
	        		    pc_price = v.app_price;
		        	}else{
		        		pc_price = v.pc_price;
		        	}
			  	  str += '<tr class="zu_group">'+
						'<td>'+
							'<dl>'+
								'<dt><img src="'+v.goods_main_url+'"/></dt>'+
								'<dd>'+v.goods_name+'</dd>'+
						  ' </dl>'+
						'</td>'+
						'<td>'+v.sku_name+'</td>'+
						'<td>￥'+pc_price+'</td>'+
						'</tr>';
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
    	$(".in_bond").html(str);
    	$(".zu_group").eq(0).append(str2);
    	
    }
    
    //--------------------提交申请-------------
    
    shop_refound.submit_over=function(order_reason){
    	var that = this;
    	
    	$.ajax({
  			url:realm.Name+"return_money",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id : that.user_id,
  				order_id : that.order_id,
  				order_reason : order_reason
  			},
  			success:function(e){
  				console.log(e);
  				if( e.code == "10000"){
  					//console.log(e.msg);
  					that.apply_status(e);
  					
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
    }
    
    
    //------------------申请状态----------------
    shop_refound.apply_status=function(data){
    	$.each(data,function(i,v){
    		var order_status = v.order_status;
    		if(order_status == 5){
    			$("#shop_refund").find("span").eq(1).css({"background":"url(./imgs/2222.png)"});
    			$(".status_sp").html("退款处理中");
    			$(".refound_sp").html("正在处理中，请耐心等待~");
    			$(".submit_over").hide();
    			$("#shop_refund").find("li").eq(1).css({"color":"#ff9600"});
    		}else if(order_status == 6){
    			$("#shop_refund").find("span").eq(1).css({"background":"url(./imgs/2222.png)"});
    			$("#shop_refund").find("span").eq(2).css({"background":"url(./imgs/3333.png)"});
    			$(".status_sp").html("退款完成");
    			$(".refound_sp").html("已退款，请注意查收~");
    			$("#shop_refund").find("li").css({"color":"#ff9600"});
    		}else{
    			return order_status;
    		}
    	})
    }





















     shop_refound.init();
  	
  	return shop_refound;
  })()