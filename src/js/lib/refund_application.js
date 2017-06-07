var  refound_applic =(function(){
  	 function refound_applic(){}
  	//、、、获取本地用户信息
  	refound_applic.user_id = sessionS.cookie.get("encrypt_id");
  	refound_applic.order_id = picture.GetQueryString("order_id");
  	refound_applic.prepare_num = picture.GetQueryString("prepare_num");
  	
  	//------------初始化-----------
  	refound_applic.init=function(){
  		
  		this.ajax_list();
  	}
  	//------------------请求数据------------
  	refound_applic.ajax_list=function(){
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
  	refound_applic.listshop=function(e){
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
    	    $(".apply_content").html(e.data.apply_content);
    	    $(".nums").html(e.data.nums);
    	    $(".apply_reason").html(e.data.apply_reason);
    	    $(".order_img").attr("src",e.data.img);
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
          

        //})
    	$(".shop_detail").append(str);
    	
  	}
  	
  	//---------------------订单状态------------
  	refound_applic.order_status=function(data){
  		var that = this;
  		$.each(data,function(i,v){
  			var status = v.apply_status;
  			if(status == 7){
  				btn();
  			}else if(status == 8){
  				btn();
				$("#shop_unfilled").find("span").eq(1).css({"background":"url(./imgs/unfill_02.png) no-repeat -298px 0"})
  				$(".shop_anarchy").find("li").eq(1).css({"color":"#ff9600"});
  			}else if(status == 9){
  				$(".whrite_num").hide();
  				$(".cancel_sub").hide();
				$("#shop_unfilled").find("span").eq(1).css({"background":"url(./imgs/unfill_02.png) no-repeat -298px 0"})
  				$(".shop_anarchy").find("li").eq(1).css({"color":"#ff9600"});
  				$(".shop_anarchy").find("li").eq(1).html("申请失败");
  			}else if(status == 10){
  				$(".whrite_num").hide();
  				$(".cancel_sub").hide();
				$("#shop_unfilled").find("span").eq(1).css({"background":"url(./imgs/unfill_02.png) no-repeat -298px 0"})
				$("#shop_unfilled").find("span").eq(2).css({"background":"url(./imgs/unfill_02.png) no-repeat -608px 0"})
  				$("#shop_unfilled").find("li").eq(3).prevAll().css({"color":"#ff9600"});
  			}else if(status == 11){
  				$(".whrite_num").hide();
  				$(".cancel_sub").hide();
				$("#shop_unfilled").find("span").eq(1).css({"background":"url(./imgs/unfill_02.png) no-repeat -298px 0"})
				$("#shop_unfilled").find("span").eq(2).css({"background":"url(./imgs/unfill_02.png) no-repeat -608px 0"})
				$("#shop_unfilled").find("span").eq(3).css({"background":"url(./imgs/unfill_02.png) no-repeat -918px 0"})
  				$(".shop_anarchy").find("li").css({"color":"#ff9600"});
  			}else if(status == 12){
  				$(".whrite_num").hide();
  				$(".cancel_sub").hide();
				$("#shop_unfilled").find("span").eq(1).css({"background":"url(./imgs/unfill_02.png) no-repeat -298px 0"})
				$("#shop_unfilled").find("span").eq(2).css({"background":"url(./imgs/unfill_02.png) no-repeat -608px 0"})
				$("#shop_unfilled").find("span").eq(3).css({"background":"url(./imgs/unfill_02.png) no-repeat -918px 0"})
  				$(".shop_anarchy").find("li").css({"color":"#ff9600"});
  				$(".shop_anarchy").find("li").eq(3).html("退货失败");
  			}else{
  				return status;
  			}
  		})
  		
  		function btn(){
  			$(".whrite_num").hide();
  			$(".cancel_sub").on("click",function(){

  				layer.confirm('是否取消申请？', {
				  		  	   	className:"aaa",
										  btn: ['确定','取消'] //按钮
										  }, function(){
										  	that.cancel_order(data);
										  
					 	});
				 })
  		}
  	}
  	
  	//-------------------取消申请退货-------------------
  	refound_applic.cancel_order=function(data){
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
  					console.log(e.msg);
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
  	}
  	
    











    refound_applic.init();
  	
  	return refound_applic;
  })()