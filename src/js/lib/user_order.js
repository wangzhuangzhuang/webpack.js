   var  user_order =(function(){
  	 function user_order(){}
  	//、、、获取本地用户信息
    user_order.user_id = sessionS.cookie.get("encrypt_id");

  	//、、、、、初始化
  	 user_order.init = function(){
  	 	var type = 0;
  	 	var that = this;
  	 	var order_id = 0,order_sn = 0;
  	 	var order_status = 0;
  		this.identityAjax();
  		this.all_orderAjax(type);
       $(".li_list").on("click","li",function(){
       
       	$(this).addClass("border_list").siblings().removeClass("border_list");
    	type = $(this).attr("data-type");
    	that.all_orderAjax(type);
    	})
      
       
  	}
  	
  	//-------个人资料列表--------
  	user_order.identityAjax = function(){
  	 	 var that=this;
  	 	 $.ajax({
  			url:realm.Name+"personal",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id:sessionS.cookie.get("encrypt_id")
  			},
  			success:function(e){
  				console.log(e)
  				if( e.msg == "请求成功"){
  					//console.log(e.data)
  					that.addSite(e);
  				}
  				
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
  
  	}
  	
  	//------------个人资料结构--------------
  	user_order.addSite=function(data){
  		var str=" ";
  		$.each(data,function(i,v){
  			
  			str = '<dl>'+
                  	'<dt><img src="'+v.user_image+'"/></dt>'+
                  	'<dd>'+
                  	'<h1>'+v.user_nickname+'</h1>'+
                  	'<div style="padding-top:40px;"><a href="#">个人资料</a><a href="#">修改密码</a></div>'+
                  	'</dd>'+
                  '</dl>'+
                 ' <div class="user_balance">'+
                     '<h1>账户余额</h1>'+
                     '<h2>余额：<span>'+v.balance_money+'</span></h2>'+
                     '<p>余额低于100无法提现</p>'+
                     '<a href="wei_cash.html">提现</a><a href="pc_weiying.html">绑定账户</a>'+
                  '</div>'+
                  '<div class="user_else">'+
                    ' <h1>其他信息</h1>'+
                     '<label> 优惠券：<span>'+v.mycoupon+'</span></label>'+
                    '<label>收藏商品：<span>'+v.goods_count+'</span></label>'+
                   ' <label>收藏品牌：<span>'+v.brand_count+'</span></label>'+
                  '</div>'
  		})
  		$(".order_head").html(str);
  	}
     
     
     
    //----------全部订单请求数据-------------
    user_order.all_orderAjax=function(type){
    	var that = this;
    	
  	 	 $.ajax({
  			url:realm.Name+"all_order",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id : sessionS.cookie.get("encrypt_id"),
  				   type : type 
  			},
  			success:function(e){
  				if( e.msg == "请求成功"){
  					console.log(e);
  					that.all_orderList(e.data);
                    that.order_status(e.data);
  				}
  				
  				if(e.code == "-10064"){
  					var no_sp = '<div class="no_sporder">您还没有相关的订单 <a href="javascript:;">去逛逛吧~</a></div>';
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
    user_order.all_orderList=function(data){
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
    		$(".li_list>li").eq(i).find("span").html("("+v+")");
    	})
    	
    	$.each(data.all,function(i,v){
    	   data_time = new Date(v.add_time*1000);	
    	   pay_time = new Date((v.end_time-v.add_time)*1000);
    	   add_len = v.order_goods.length;//console.log(add_len);
    	   only_v = v;
    	   arr.push(v.actual_price);
    	   arr2.push(v.order_freight);   
    	   str += 
                 '<div class="user_all_order" data-order_status="'+only_v.order_status+'">'+
                  '<p class="thead"><time>'+sessionS.time_list(data_time)+'</time><span>订单号：'+only_v.order_sn+'</span></p>'+
                  '<table class="more_sporder">'+
                   ' <tbody>';
             $.each(v.order_goods,function(i,v){
                detail_sp = v;
	        	if(v.pc_price != undefined){
	        		pc_price = v.pc_price;
	        	}else{
	        		pc_price = v.app_price;
	        	}
             	if(v.grade_goods == undefined){
              str +=  ' <tr data-goods_id="'+v.goods_id+'" data-order_id="'+only_v.order_id+'" data-order_sn="'+only_v.order_sn+'">'+
                      	'<td><img src="'+v.goods_main_url+'"/></td>'+
                      	'<td><h1>'+v.goods_name+'</h1><span>'+v.sku_name+'</span></td>'+
                      	'<td><h6>原价：<span>155.21</span></h6>￥'+pc_price+'</td>'+
                      	'<td>×'+v.sku_buy_num+'</td>'+
                      	'</tr>';
                    }
                    })  
           
    
           $.each(v.order_goods,function(i,v){
           	var detail_v = v;
    	    if(v.grade_goods != undefined){
    	     grade_len = v.grade_goods.length;//console.log(grade_len);
           	 $.each(v.grade_goods,function(i,v){
           	 	
           	 	var pc_price1 = 0;
	        	if(v.pc_price != undefined){
	        		pc_price1 = v.pc_price;
	        	}else{
	        		pc_price1 = v.app_price;
	        	}

            str += ' <tr data-goods_id="'+v.goods_id+'" data-order_id="'+only_v.order_id+'" data-order_sn="'+only_v.order_sn+'">'+
                      	'<td><img src="'+v.goods_main_url+'"/></td>'+
                      	'<td><h1>'+v.goods_name+'</h1><span>'+v.sku_name+'</span></td>'+
                      	'<td><h6>原价：<span>'+pc_price1+'</span></h6>￥'+pc_price1+'</td>'+
                      	'<td>×'+detail_v.grade_buy_num+'</td>'+
                      	'</tr>';
             }) 
              
             }
    	   
           })
                
           str += '</tbody>'+
                  '</table>'+
                  '</div>';
          
         rowspan.push((grade_len + add_len)-1);
        })
    	$(".user_sp_order").html(str);
    	 $(".more_sporder").each(function(i,v){
    	 
         str2 =  '<td rowspan="'+rowspan[i]+'"><h2>￥'+arr[i]+'</h2><p>(含运费<label>'+arr2[i]+'</label>元)</p></td>'+
                      	'<td rowspan="'+rowspan[i]+'" class="order_status"><span>等待付款</span><a href="javascript:;" class="order_detail">订单详情</a><a href="#" class="look_logis">查看物流</a></td>'+
                 '<td rowspan="'+rowspan[i]+'" class="pay_order"><div>请在<small>'+sessionS.time_list2(pay_time)+'</small>内付款</div><button>立即付款</button><a href="#">取消订单</a></td>'; 
    		$(this).find("tr").eq(0).append(str2);
    	}) 
        
    }
    

    //------------订单状态--------------
    user_order.order_status=function(data){
    	var that = this;
    	var status = 0;
    	var order_id = 0,order_sn = 0,order_status = 0;
    	$(".user_all_order").each(function(i,v){
    	 var con_order = $(this);
    	 status = $(this).attr("data-order_status");
    	 
    	if(status == 13){
    		$(this).find(".order_status span").html("交易失败");
    		$(this).find(".pay_order").html("");
    		$(this).on("click",".order_detail",function(){
             order_id = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_id");
    	     order_sn = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_sn");
    	     order_status = $(this).parents(".user_all_order").attr("data-order_status");
window.location.href='shopping_detail.html?order_id='+order_id+'&order_sn='+order_sn+'&order_status='+order_status+'';
    		})
    	}else if(status == 0){
    		$(this).on("click",".order_detail",function(){
    		order_id = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_id");
    	     order_sn = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_sn");
    	     order_status = $(this).parents(".user_all_order").attr("data-order_status");
			window.location.href='shopping_detail.html?order_id='+order_id+'&order_sn='+order_sn+'&order_status='+order_status+'';
    		})
    		
    		var return_pay = $(this).find(".pay_order").find("button");
    		return_pay.on("click",function(){
            var order_id = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_id");
            var order_sn = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_sn");
            sessionS.cookie.set("order_sn",order_sn,1);
            window.location.href='payment.html';
    		});
    		
    		var cancel_pay = $(this).find(".pay_order").find("a");
    		cancel_pay.on("click",function(){
    			var order_id = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_id");
            var order_sn = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_sn");
            $(".away_order").show();
            that.cancel_btn(order_id,order_sn);
    		})
    		
    	}else if(status == 1){
    		$(this).find(".order_status span").html("等待发货");
    		$(this).find(".pay_order").find("div").hide();
    		$(this).find(".pay_order").find("a").hide();
    		$(this).find(".pay_order").find("button").html("申请退款");
    		var return_pay = $(this).find(".pay_order").find("button");
    		return_pay.on("click",function(){
            var order_id = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_id");
            var order_sn = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_sn");
            window.location.href='shop_refund.html?order_id='+order_id+'&order_sn='+order_sn+'';
    		})
    		$(this).on("click",".order_detail",function(){
    		order_id = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_id");
    	     order_sn = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_sn");
    	     order_status = $(this).parents(".user_all_order").attr("data-order_status");
			window.location.href='shopping_detail.html?order_id='+order_id+'&order_sn='+order_sn+'&order_status='+order_status+'';
    		})
    	}else if(status == 2){
    		$(this).find(".order_status span").html("卖家已发货");
    		$(this).find(".look_logis").show();
    		//$(this).find(".pay_order").find("div").html("");
    		$(this).find(".pay_order").find("div").hide();
    		$(this).find(".pay_order").find("a").hide();
    		$(this).find(".pay_order").find("button").html("确认收货");
    		$(this).on("click",".look_logis",function(){
  	  		   window.location.href="trade_track.html";
  	  	    })
    		var confirm = $(this).find(".pay_order").find("button");
    		confirm.on("click",function(){
    		
    	     //console.log(order_id,order_sn);
  	  		
  	  		 	             layer.confirm('请确认是否已收到货？？', {
				  		  	   	className:"aaa",
								btn: ['确定','取消'] //按钮
								}, function(){
								  	 order_id = confirm.parents("tr").attr("data-order_id");
	                                 order_sn = confirm.parents("tr").attr("data-order_sn");
								     that.refound(order_id,order_sn);
					 	         });
  	  	    })
  	  	    $(this).on("click",".order_detail",function(){
  	  	    order_id = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_id");
    	    order_sn = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_sn");
    	    order_status = $(this).parents(".user_all_order").attr("data-order_status");
			window.location.href='shopping_detail.html?order_id='+order_id+'&order_sn='+order_sn+'&order_status='+order_status+'';
    		})
    	}else if(status == 3){
    		$(this).find(".order_status span").html("已签收");
    		$(this).find(".pay_order").html("");
    		//$(this).find(".pay_order").find("a").hide();
    		//$(this).find(".pay_order").find("button").hide();
    		var return_pay = $(this).find(".pay_order").find("button");
    		return_pay.on("click",function(){
            var order_id = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_id");
            var order_sn = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_sn");
            window.location.href='unfilled_orders.html?order_id='+order_id+'&order_sn='+order_sn+'';
    		})
    		$(this).on("click",".order_detail",function(){
    		order_id = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_id");
    	    order_sn = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_sn"); 
    	    order_status = $(this).parents(".user_all_order").attr("data-order_status");
    	    window.location.href='shopping_detail.html?order_id='+order_id+'&order_sn='+order_sn+'&order_status='+order_status+'';
    		})
    	}else if(status == 4){
    		$(this).find(".order_status span").html("交易成功");
    		$(this).find(".look_logis").show();
    		$(this).find(".pay_order").html("");
    		$(this).on("click",".order_detail",function(){
    		order_id = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_id");
    	    order_sn = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_sn");
    	    order_status = $(this).parents(".user_all_order").attr("data-order_status");
			window.location.href='shopping_detail.html?order_id='+order_id+'&order_sn='+order_sn+'&order_status='+order_status+'';
    		})
    	}else if(status == 5){
    		$(this).find(".order_status span").html("退款处理中");
    		$(this).find(".pay_order").html("");
    		$(this).on("click",".order_detail",function(){
    		order_id = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_id");
    	     order_sn = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_sn");
    	     order_status = $(this).parents(".user_all_order").attr("data-order_status");
			window.location.href='shop_refund.html?order_id='+order_id+'&order_sn='+order_sn+'&order_status='+order_status+'';
    		})
    	}else if(status == 6){
    		$(this).find(".order_status span").html("退款成功");
    		$(this).find(".pay_order").html("");
    		$(this).on("click",".order_detail",function(){
    		order_id = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_id");
    	     order_sn = $(this).parents(".more_sporder").find("tr").eq(0).attr("data-order_sn");
    	     order_status = $(this).parents(".user_all_order").attr("data-order_status");
			window.location.href='shop_refund.html?order_id='+order_id+'&order_sn='+order_sn+'&order_status='+order_status+'';
    		})
    	}else{
    		return status;
    	}
      })
    }
    
    //------------确认订单-------------
      user_order.refound=function(order_id,order_sn){
      	var that = this;
      	 $.ajax({
  			url:realm.Name+"ok_order",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id : that.user_id,
  				order_id : order_id,
  				order_sn : order_sn
  			},
  			success:function(e){
  				console.log(e);
  				if( e.code == "10000"){
  					//alert(e.msg);
  					window.location.reload();
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
      }
      
      //---------订单弹窗------------------
    user_order.cancel_btn=function(order_id,order_sn){
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
    		 that.cancel_order(order_id,order_sn);
    		$(".away_order").hide();	
    		}
    		
    	})
    }
    
    //------------取消订单请求数据-------------
     user_order.cancel_order=function(order_id,order_sn){
     	var that = this;
    	$.ajax({
  			url:realm.Name+"del_order",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id : that.user_id,
  				order_id : order_id,
  				order_sn : order_sn
  			},
  			success:function(e){
  				console.log(e);
  				if( e.code == "10000"){
  					alert("申请提交");
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
     }


  	user_order.init();
  	
  	return user_order;
  })()
