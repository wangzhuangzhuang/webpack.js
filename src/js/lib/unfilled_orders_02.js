var  unfilled_orders =(function(){
  	 function unfilled_orders(){}
  	//、、、获取本地用户信息
  	unfilled_orders.user_id = sessionS.cookie.get("encrypt_id");
  	unfilled_orders.order_id = picture.GetQueryString("order_id");
  	unfilled_orders.prepare_num = picture.GetQueryString("prepare_num");
  	
  	//------------初始化-----------
  	unfilled_orders.init=function(){
  		
  		this.ajax_list();
  	}
  	//------------------请求数据------------
  	unfilled_orders.ajax_list=function(){
  		var that = this;
  		$.ajax({
  			url:realm.Name+"return_goods_mess",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id : that.user_id,
  				prepare_num : that.prepare_num
  			},
  			success:function(e){
  				console.log(e);
  				if( e.msg == "请求成功"){
  					that.listshop(e);
  					that.order_status(e);
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
  	}
  	//--------------数据结构------------
  	unfilled_orders.listshop=function(e){
  		var that = this;
    	var str = "";
    	var order_id = 0,order_sn = 0;
    	var data_time = 0;
    	var pay_time = 0;
    	var only_v = 0;
    	var pc_price = 0;
    	var detail_sp = 0;
    	
    	
    	var detail_v = e.data.sku_mess;
    	    data_time = new Date(e.data.add_time*1000);	
    	    $(".money_num").html(detail_v.all_return_price);
    	    $(".order_sn").html(e.data.order_num);
    	    $(".order_time").html(sessionS.time_list3(data_time));
    	   
    	   if(detail_v.pc_price != undefined){
	        	pc_price = detail_v.pc_price;
	       }else{
	        	pc_price = detail_v.app_price;
	       }
    	   str =
                 '<table>'+
					    '<tr>'+
							'<td>商品信息</td>'+
							'<td>商品规格</td>'+
							'<td>单价(元)</td>'+
							'<td>数量</td>'+
							'<td>总计(元)</td>'+
					   '</tr>'+
                        '<tr>'+
						'<td>'+
							'<dl>'+
								'<dt><img src="'+detail_v.goods_main_url+'"/></dt>'+
								'<dd>'+detail_v.goods_name+'</dd>'+
						  ' </dl>'+
						'</td>'+
						'<td>'+detail_v.sku_name+'</td>'+
						'<td>￥'+detail_v.one_price+'</td>'+
						'<td>×'+detail_v.nums+'</td>'+
						'<td>￥'+detail_v.all_return_price+'</td>'+
					'</tr>'+
	                  '</table>';
          

        
    	$(".shop_detail").append(str);
    	
  	}
  	
  	//---------------------订单状态------------
  	unfilled_orders.order_status=function(data){
  		var that = this;
  		$.each(data,function(i,v){
  			var status = v.apply_status;
  			
  			if(status == 7){
  				$(".status_sp").html("申请退货中");
  				$(".submit_order").html("取消申请");
  				$(".submit_order").on("click",function(){
  					$(".take_over").show();
  				})
  				$(".cancel_over").on("click",function(){
  					$(".take_over").hide();
  				})
  				$(".confirm_over").on("click",function(){
  					that.cancel_order(data);
  					$(".take_over").hide();
  				})
  				$(".cancel_order").hide();
  			}else if(status == 8){
  				$(".status_sp").html("申请成功");
  				$(".submit_order").html("取消申请");
  				$(".submit_order").on("click",function(){
  					
  						layer.confirm('是否取消申请？', {
				  		  	   	className:"aaa",
										  btn: ['确定','取消'] //按钮
										  }, function(){
										  	that.cancel_order(data);
										  
					 	      });
  					
  				})
  				
  				
  				$(".cancel_order").html("填写单号");
  				$(".cancel_order").on("click",function(){
  					var return_num = v.return_num;
  					window.location.href="file_seat.html?return_num="+return_num+"";
  				})
  				$("#shop_unfilled").find("span").eq(1).css({"background":"url(./imgs/unfill_02.png) no-repeat -298px 0"})
  			}else if(status == 9){
  				$(".status_sp").html("申请失败");
  				$(".submit_order").hide();
  				$(".cancel_order").html("您的退货申请未通过");
  				$(".cancel_order").css({"color":"#000","font-size":"14px"});
  				$("#shop_unfilled").find("span").eq(1).css({"background":"url(./imgs/unfill_02.png) no-repeat -298px 0"})
  				$(".shop_anarchy").find("li").eq(1).css({"color":"#ff9600"});
  				$(".shop_anarchy").find("li").eq(1).html("申请失败");
  			}else if(status == 10){
  				$(".status_sp").html("退货处理中");
  				$(".submit_order").hide();
  				$(".cancel_order").html("请您耐心等待~");
  				$(".cancel_order").css({"color":"#000","font-size":"14px"});
  				$("#shop_unfilled").find("span").eq(1).css({"background":"url(./imgs/unfill_02.png) no-repeat -298px 0"})
  				$("#shop_unfilled").find("span").eq(2).css({"background":"url(./imgs/unfill_02.png) no-repeat -608px 0"})
  				$(".shop_anarchy").find("li").eq(3).preAll().css({"color":"#ff9600"});
  			}else if(status == 11){
  				$(".status_sp").html("退货成功");
  				$(".submit_order").hide();
  				$(".cancel_order").html("我们会在3-5个工作日内给您处理完成并给您打款，请注意查收~");
  				$(".cancel_order").css({"color":"#000","font-size":"14px"});
  				$("#shop_unfilled").find("span").eq(1).css({"background":"url(./imgs/unfill_02.png) no-repeat -298px 0"})
  				$("#shop_unfilled").find("span").eq(2).css({"background":"url(./imgs/unfill_02.png) no-repeat -608px 0"})
  				$("#shop_unfilled").find("span").eq(3).css({"background":"url(./imgs/unfill_02.png) no-repeat -918px 0"})
  				$(".shop_anarchy").find("li").css({"color":"#ff9600"});
  			}else if(status == 12){
  				$(".status_sp").html("退货失败");
  				$(".submit_order").hide();
  				$(".cancel_order").html("失败原因：咏怀古迹");
  				$(".cancel_order").css({"color":"#000","font-size":"14px"});
  				$("#shop_unfilled").find("span").eq(1).css({"background":"url(./imgs/unfill_02.png) no-repeat -298px 0"})
  				$("#shop_unfilled").find("span").eq(2).css({"background":"url(./imgs/unfill_02.png) no-repeat -608px 0"})
  				$("#shop_unfilled").find("span").eq(3).css({"background":"url(./imgs/unfill_02.png) no-repeat -918px 0"})
  				$(".shop_anarchy").find("li").css({"color":"#ff9600"});
  				$(".shop_anarchy").find("li").eq(3).html("退货失败");
  			}else{
  				return status;
  			}
  		})
  	}
  	
  	//-------------------取消申请退货-------------------
  	unfilled_orders.cancel_order=function(data){
  		var that = this;
  		$.ajax({
  			url:realm.Name+"del_return_goods",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id : that.user_id,
  				apply_id : data.data.apply_id
  			},
  			success:function(e){
  				console.log(e);
  				if( e.msg == "请求成功"){
  					$(".success_order").show();
  					$(".cancel_window").on("click",function(){   	
  					   $(".success_order").hide();	
                  })
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
  	}
  	
    











    unfilled_orders.init();
  	
  	return unfilled_orders;
  })()