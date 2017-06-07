
  var carTop = (function(){
  	function carTop(){};
  	
  	carTop.user_id = sessionS.cookie.get("encrypt_id");
  	carTop.init = function (){
  		
  		carTop.cartHTML();
  		
  	};
  	
  	
  	
  	//、、、购物车结构
  	
  	carTop.cartHTML = function () {
  		
  		$.ajax({
  			type:"post",
  			url: realm.Name + "my_cart",
  			async:false,
  			data:{
  				user_id:carTop.user_id
  			},
  			dataType:"json",
  			success:function(e){
  				if(e.code == "10000"){
  					
  					carTop.HotSale(e.data.guess_like);
  					carTop.carFn(e.data.cart_goods);
  				};
  			}
  		});
  		
  	};
  	
    //、、、购物车列表
    carTop.carHTML = ""
    
    carTop.carFn = function (data){
    	if(data.length == 0){
    		$("html,body").ready(function(){
    			  $(".no_sp").show();
    			  $(".have_sp").hide();
    		});
    		return false;
    	}
    	var str = '';
    	var Nostr = '';
    	$.each(data, function(i,v) {
    		if(v.warehouse_name != "无效宝贝"){
    		str += '<div class="assem_sp_list" data-warehouse_id="'+v.warehouse_id+'" data-warehouse_cross_id="'+v.warehouse_cross_id+'">'+	
            		'<div class="warehouse_01">'+
            			'<p><input type="checkbox" name="" class="entrepotKed" value=""><label for="warehouse">'+v.warehouse_name+'</label></p>'+
            		'</div>'+
            		'<div class="car_list">';
            		$.each(v.warehouse_goods, function(x,y) {
            			
            			if(y.grade_goods){ //、、组合够
            				
            				str += carTop.groupHTML(y)
            				
            			}else{//、、、、单品
            				
            				str += 	carTop.oneHTML(y)
            			}
            			
            		});
            			
            			
            		
            		str +='</div>'+
            	 '</div>'
    		}else{
    			var bool = 1;
    			Nostr += '<div class="assem_sp_list NoAssem_sp_list" >'+	
            		'<div class="warehouse_01">'+
            			'<p><label for="warehouse">无效商品</label><span id="emptyBtn"><a href = "javascript:;" style="color:#666">清空</a></span></p>'+
            		'</div>'+
            		'<div class="car_list">';
            		$.each(v.warehouse_goods, function(x,y) {
            			
            			if(y.grade_goods){ //、、组合够
            				
            				Nostr += carTop.groupHTML(y,bool)
            				
            			}else{//、、、、单品
            				
            				Nostr += 	carTop.oneHTML(y,bool)
            			}
            			
            		});
            			
            			
            		
            		Nostr +='</div>'+
            	 '</div>'
    			
    			
    		}
    	});
    	
    	carTop.carHTML = str+Nostr;
    };
  	
  	//、、、组合够HTML
  	carTop.groupHTML = function (data,bool) {
  		var str = '<div class="duble_sp"  data-grade_id="'+data.grade_id+'">'+
            			'<table class="assem_list">'+
            				'<tbody>'+
            				''+carTop.groupListHTML(data.grade_goods)+''+
            			'</tbody></table>'+
            			'<ul class="pinda_price">';
            			if(!bool){
            				str += '<li><input type="checkbox" class="pinda"><label for="pinda">拼搭价</label></li>'+
            			         '<li></li>'+
            			         '<li>￥<span>'+data.grade_price+'</li>'+
            			         '<li style="position:relative"><button class="delBtn">-</button><input type="text" value="'+data.grade_buy_num+'" class="inpText"><button class="addBtn">+</button><div class="reminderBox">商品限购<span>'+data.grade_person_buy+'</span>件</div></li>'+
            			         '<li>￥<span class="Spcost">'+(data.grade_price*data.grade_buy_num)+'</span></li><li class="deleteBtn">删除</li>';
            			}else{
            				str += '<li><label for="pinda">拼搭价</label></li>'+
            				       '<li></li>'+
            				       '<li>￥<span>'+data.grade_price+'</span></li>'+
            			         '<li><button>-</button><input type="text" value="'+data.grade_buy_num+'" class="inpText"><button>+</button></li>'+
            			         '<li>￥'+(data.grade_price*data.grade_buy_num)+'</li><li></li>';
            			}
            			
            			str +='</ul>'+
            			'</div>';
        return str; 
  	};
  	
  	//、、、组合够商品列表HTML
  	carTop.groupListHTML = function (data) {
  		
  		var str = '';
  		
  		$.each(data, function(k,y) {
  			
  			str +=  '<tr data-sku_id="'+y.sku_id+'" data-goods_id="'+y.goods_id+'">'+
					'<td><img src="'+y.goods_main_url+'"></td>'+
					'<td><p>'+y.goods_name+'</p><span>'+y.sku_name+'</span></td>'+
					'<td><num>￥'+y.market_price+'</num><span>￥'+y.pc_price+'</span></td>'+
					'<td></td>'+
					'<td></td>'+
					'<td></td>'+
            		'</tr>';
  		});
  		
  		return str;
  		
  		
  	};
  	
  	//、、、单品
  	carTop.oneHTML = function (data,bool) {
  		var str;
  		if(!bool){
  			         str = '<div class="single_sp" data-sku_id="'+data.sku_id+'" data-goods_id="'+data.goods_id+'">'+
            		 	'<table>'+
            		 		'<tbody><tr>'+
            		 			'<td><input type="checkbox"><img src="'+data.goods_main_url+'"></td>'+
            		 			'<td><p>'+data.goods_name+'</p><span>'+data.sku_name+'</span></td>'+
            		 			'<td><num>￥'+data.market_price+'</num>￥<span>'+data.pc_price+'</span></td>';
            		 			if(data.sale_num){
            		 				str += '<td style="position:relative"><button class="delBtn">-</button><input type="text" value="'+data.sku_buy_num+'" class="inpText"><button class="addBtn">+</button><div class="reminderBox2">商品限购<span>'+data.sale_num+'</span>件</div></td>';
            		 			}else{
            		 				str += '<td style="position:relative"><button class="delBtn">-</button><input type="text" value="'+data.sku_buy_num+'" class="inpText"><button class="addBtn">+</button><div class="reminderBox2">超过最大限购数</div></td>';
            		 			};
            		 			str += '<td>￥<span class="Spcost">'+(data.sku_buy_num*data.pc_price)+'</span></td>'+
            		 			'<td class="deleteBtn">删除</td>'+
            		 		'</tr>'+
            		 	'</tbody></table>'+
            		'</div>';
  		}else{
  			
  			 str = '<div class="single_sp" data-sku_id="'+data.sku_id+'" data-goods_id="'+data.goods_id+'">'+
            		 	'<table>'+
            		 		'<tbody><tr>'+
            		 			'<td><img src="'+data.goods_main_url+'"></td>'+
            		 			'<td><p>'+data.goods_name+'</p><span>'+data.sku_name+'</span></td>'+
            		 			'<td>￥<num>'+data.pc_price+'</num>￥<span>'+data.pc_price+'</span></td>'+
            		 			'<td><button>-</button><span>'+data.sku_buy_num+'</span><button>+</button></td>'+
            		 			'<td>￥'+(data.sku_buy_num*data.pc_price)+'</td>'+
            		 			'<td></td>'+
            		 		'</tr>'+
            		 	'</tbody></table>'+
            		'</div>';
  		}
  		
  		return str;
  		
  	};
  	
  	//、、猜你喜欢
  	carTop.HotSaleHTML = "";
    carTop.HotSale = function (data) {
    	
    	var str = '';
    	
    	$.each(data, function(i,v) {
    		str += 	'<a href="details.html?goods_id='+v.goods_id+'" class="spStyle" data-goods_id="'+v.goods_id+'" target="view_window">'+
	                        '<dl>'+
	                        	'<dt>'+
	                        		'<img src="'+v.goods_main_url+'">'+
	                        	'</dt>'+
	                        	'<dd>'+
	                        		'<h1>'+v.goods_name+'</h1>'+
	                        		'<p class="original">￥'+v.pc_price+'<span>￥'+v.market_price+'</span></p>'+
	                        	'</dd>'+
	                        '</dl>'+
                       ' </a>';
    	});
    	
    	carTop.HotSaleHTML = str;
    	
    	
    };
  	
  	
  	carTop.init();
  	return carTop;
  })()
