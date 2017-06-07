var  unfilled_orders =(function(){
  	 function unfilled_orders(){}
  	//、、、获取本地用户信息
  	unfilled_orders.user_id = sessionS.cookie.get("encrypt_id");
  	unfilled_orders.order_id = picture.GetQueryString("order_id");
  	unfilled_orders.order_sn = picture.GetQueryString("order_sn");
  	unfilled_orders.sku_id = picture.GetQueryString("sku_id");
  	unfilled_orders.prepare_num = picture.GetQueryString("prepare_num");
  	
  	//------------初始化-----------
  	unfilled_orders.init=function(){
  		
  		this.ajax_list();
  	}
  	//------------------请求数据------------
  	unfilled_orders.ajax_list=function(){
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
  				if( e.msg == "请求成功"){
  				var sp_len = 0,add_len = 0;
  					that.listshop(e,sp_len,add_len);
  					that.num_change();
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
  	}
  	//--------------数据结构------------
  	unfilled_orders.listshop=function(data,sp_len,add_len){
  		var that = this;
  		var str = "",str2 = "";
  		var data_time = 0;
    	var pay_time = 0;
    	var pc_price = 0;
    	var rowspan = [];
  		$.each(data,function(i,v){
  			data_time = new Date(v.add_time*1000);	
    	   pay_time = new Date((v.end_time-v.add_time)*1000);
    	   if(v.order_list != undefined){
    	   	 sp_len = v.order_list.length;
    	   }
    	   
  		   $(".shop_status").html(v.order_sn);	
  		   $(".shop_ordertime").html(sessionS.time_list(data_time));
  		   
  		   	$.each(v.order_list,function(i,v){
  		   	   if(v.warehouse_goods != undefined){
    	   	       sp_len = v.warehouse_goods.length;
    	      }
  		   		 
				str = 
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
			  
			  	$.each(v.grade_goods,function(i,v){
			  		var pc_price = 0;
			  		if(v.pc_price == undefined){
	        		    pc_price = v.app_price;
		        	}else{
		        		pc_price = v.pc_price;
		        	}
		        	if(v.sku_id == that.sku_id){
			  	  str += '<tr class="zu_group">'+
						'<td>'+
							'<dl>'+
								'<dt><img src="'+v.goods_main_url+'"/></dt>'+
								'<dd>'+v.goods_name+'</dd>'+
						  ' </dl>'+
						'</td>'+
						'<td>'+v.sku_name+'</td>'+
						'<td>￥'+pc_price+'</td>'+
						'<td rowspan="'+sp_len+'">×'+sp_v.grade_buy_num+'</td>'+
						'<td rowspan="'+sp_len+'">￥'+sp_v.grade_price+'</td>'+
						'</tr>';
					}
			  	})
			  	

			  }
	        })
	        str += '</table>';
			})
                             
  		})
  		$(".user_sp_order").html(str);
    	//$(".zu_group").eq(0).append(str2);
    	$(".submit_btn").on("click","button",function(){
  			var grade_len = sp_len;  
  			 console.log(grade_len);
  			  if(grade_len >= $(".return_num").html()){
  				  	that.ajax_shop(data);
  				  	$(".up_num").next().hide();
  			  }else{
  				  	$(".up_num").next().show();
  				  	return false;
  			   }
  				  	
  				})
  	}
  	
  	
  	//------------------传输数据------------
  	unfilled_orders.ajax_shop=function(data){
  		var that = this;
  		var prepare_num,return_question,nums,is_return_card,return_reason,apply_img;
  		/*$.each(data,function(i,v){
  		  $.each(v.order_list,function(i,v){
  			$.each(v.warehouse_goods,function(i,v){
  			  if(v.grade_goods == undefined){
	  			  	prepare_num = v.prepare_num;
  			  }
  			  if(v.grade_goods != undefined){
  			  	$.each(v.grade_goods,function(i,v){
	  			  	prepare_num = v.prepare_num;
  			  	})
  			  }
  		})
  		})
  		})*/
  		return_question = $(".text_order").val();
  		nums = $(".return_num").html();
  		return_reason = $(".tui_cause").find("select option:selected").html();
  		  if($(".free_return").find("select option:selected").html() == "不使用"){
  		  	  is_return_card = 0;
  		  }else{
  		  	  is_return_card = 1;
  		  }
  		  apply_img = $("#imghead").attr("src");
  		var data = {
  			         user_id : that.user_id,
  			        order_id : that.order_id,
  		              sku_id : that.sku_id,
  			     prepare_num : that.prepare_num,
  			 return_question : return_question,
  			            nums : nums,
  			  is_return_card : is_return_card,
  			   return_reason : return_reason,
  			       apply_img : apply_img
  		}
    	$.ajax({
  			url:realm.Name+"return_goods",
  			type:"post",
  			dataType:"json",
  			data:data,
  			success:function(e){
  				console.log(e);
  				if( e.code == "10000"){
                  $(".success_order").show();
                  $(".cancel_window").on("click",function(){   	window.location.href="unfilled_orders_02.html?order_id="+that.order_id+"&order_sn="+that.order_sn+"&prepare_num="+that.prepare_num+"";
                  })
                    
  				}
  				if(e.code == "-10068"){
  					alert(e.msg);
  				}
  				if(e.code == "-10066"){
  					alert(e.msg);
  				}
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
  	}

     //-----------------数量变化--------------
     unfilled_orders.num_change=function(){
     	var num = 0;
     	$(".text_order").on("input",function(){
  			$(".text_num").html($(this).val().length);
  		})
  		$(".up_num").on("click",function(){
  			num++;
  			$(this).prev().html(num);
  		})
  		$(".down_num").on("click",function(){
  			num--;
  			if(num<1){
  				num = 1;
  			}
  			$(this).next().html(num);
  		})
     }











    unfilled_orders.init();
  	
  	return unfilled_orders;
  })()