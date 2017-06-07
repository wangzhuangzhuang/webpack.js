var keep_sp = (function(){
	
      function keep_sp(){};
     keep_sp.commodity = sessionS.cookie.get("commodity");
     keep_sp.user = sessionS.cookie.get("encrypt_id");
     console.log(keep_sp.user);
     keep_sp.init = function(){
	  	
	  	this.splist();//收藏商品列表
	  	
	  	$(".shou_sp").click(function(){
	   	 keep_sp.splist();
	   	 }) 
	   	$(".shou_pin").click(function(){
	   	 keep_sp.brandlist();	
	   	}) 
	   	$(".keep_sp ul").on("click","li",function(){
	   		$(this).addClass("border");
	   		$(this).parent("a").siblings().find("li").removeClass("border");
	   	})
	  };
	  //、、page
     keep_sp.page = 0;
	  
	  //-----------收藏品牌---------
	  keep_sp.brandlist=function(){
	  	  var that = this;
	  	  //$(".shou_pin").click(function(){
	  	  	$(".no_sp").hide();
	  	  	$(".classify-content").hide();
	  	  	$(".keep_brand").show();
	  	  $.ajax({
            		url:realm.Name+"brand_collection",
            		type:"post",
            		dataType:"json",
            		data:{
            	      user_id:that.user,
            	      page:that.page
            		},
            		success:function(e){
            			console.log(e)
            		   if(e.code == '10000'){
            		   	  that.pinpai(e.data);
            		   	  $(".no_sp").hide();
            		   	$(".pin_sp").on("click",function(){
            		   		var brand_id = $(this).attr("data-brand_id");
            		   		window.open("preference.html?brand_id="+brand_id+"");
            		   	})
            		   }else if(e.code == '-10015'){
            		   	 $(".no_sp").show().html('您还没有收藏的品牌哦~ <a href="#">去逛逛吧</a>') 
            		   }else{
            		   	alert(e.msg);
            		   }
            		},
            		error:function(){
            		  alert(e.msg);
            	}
            		
            	});
          //})
	  }
	  //------------------收藏品牌的结构------------
	  keep_sp.pinpai=function(data){
	  	var that = this;
	  	 var str = '';
	  	 $.each(data.brand_list, function(i,v) {
	  	 str += '<a href="javascript:;" class="pin_sp" data-sp_name='+v.brand_ch_name+' data-brand_id='+v.brand_id+'>'+
            		'<dl>'+
            			'<dt><img src='+v.brand_logo_url+'></dt>'+
            			'<dd><span>商品数 '+v.all_count+'</span><num>收藏数 '+v.brand_follow_num+'</num>'+
            				'<button class="cancel_brand">取消收藏</button>'+
            			'</dd>'+
            		'</dl>'+
	                        '<div class="popup">'+
	                        	'<p>确定取消收藏？</p>'+
	                        	'<button class="delete_btn">确定</button><button class="cancel_btn">取消</button>'+
	                       ' </div>'+
            	'</a>'
          
         })
	  	  $(".keep_brand").html(str); 
	  	  $(".cancel_brand").on("click",function(){
	  	  	 event.stopPropagation();
	  	  	$(this).parents(".pin_sp").find(".popup").show();
	  	  })
	  	  $(".cancel_btn").on("click",function(){
	  	  	 event.stopPropagation();
	  	  	$(this).parent(".popup").hide();
	  	  })
	  	  that.cancel_brand();
	  }
	  
	  //------------取消收藏品牌---------
	  keep_sp.cancel_brand=function(){
	  	var that=this;
	  	$(".delete_btn").click(function(){
	  		event.stopPropagation();
	  		var that2=$(this);
	  		var brand_id=$(this).parents(".pin_sp").attr("data-brand_id");
	  		$.ajax({
            		url:realm.Name+"collection_brand",
            		type:"post",
            		dataType:"json",
            		data:{
            	      user_id:that.user,
            	      brand_id:brand_id
            		},
            		success:function(e){
            			console.log(e)
            		   if(e.code == '10000'){
            		   	  that2.parents(".pin_sp").remove();
            		   }else{
            		   	alert(e.msg);
            		   }
            		},
            		error:function(e){
            		  alert(e.msg);
            	}
            		
            	});
	  	})
	  }
	  
	  //------------收藏商品列表---------
	  
	  keep_sp.splist=function(){
	  	var that=this;
	  	  	$(".classify-content").show();
	  	  	$(".keep_brand").hide();
	  	  $.ajax({
            		url:realm.Name+"goods_collection",
            		type:"post",
            		dataType:"json",
            		data:{
            	      user_id:that.user,
            	      page:that.page
            		},
            		success:function(e){
            			console.log(e)
            		   if(e.code == '10000'){
            		   	  that.structSp(e.data);
            		   	  $(".no_sp").hide();
            		   	  $(".spStyle").on("click",function(){
   	  	  			var goods_id = $(this).attr("data-goods_id");
   	  	  			window.open("details.html?goods_id="+goods_id+"");
   	  	  		})
            		   }else if(e.code == '-10015'){
            		   	 $(".no_sp").show();
            		   }else{ 
            		   	console.log(e.msg);
            		   }
            		},
            		error:function(e){
            		  alert(e.msg);
            	}
            		
            	});
	  }
	  
	  //------------------收藏商品的结构------------
	 keep_sp.structSp=function(data){
	  	var that = this;
	  	var str2 = '';
	  	$.each(data, function(i,v) {
	  	 str2 += '<a href="javascript:;" class="spStyle" data-goods_id="'+v.goods_id+'">'+
	                        '<dl>'+
	                        	'<dt>'+
	                        		'<img src="'+v.goods_main_url+'">'+
	                        	'</dt>'+
	                        	'<dd>'+
	                        		'<h1>'+v.goods_name+'</h1>'+
	                        		'<p class="original">'+v.app_price+'<span>'+v.market_price+'</span></p>'+
	                        	'</dd>'+
	                        '</dl>'+
	                        '<img src="imgs/slice.png" alt="" class="slice_sp">'+
	                        '<div class="popup">'+
	                        	'<p>确定删除此商品？</p>'+
	                        	'<button class="delete_btn">确定</button><button class="cancel_btn">取消</button>'+
	                       ' </div>'+
                        '</a>'
                
              })
	  	$(".classify-content").html(str2); 
	  	$(".slice_sp").on("click",function(){
	  		 event.stopPropagation();
			$(this).parent("a").find(".popup").css({"display":"block"});
		})
	  	$(".cancel_btn").on("click",function(){
	  		 event.stopPropagation();
	  	  	$(this).parent(".popup").hide();
	  	  })
	  	that.cancel_sp();
	  }
	  
	  //------------取消收藏商品---------
	  keep_sp.cancel_sp=function(){
	  	var that=this;
	  	$(".delete_btn").click(function(){
	  		 event.stopPropagation();
	  		var that2=$(this);
	  		var goods_id=$(this).parents(".spStyle").attr("data-goods_id");
	  		$.ajax({
            		url:realm.Name+"collection_goods",
            		type:"post",
            		dataType:"json",
            		data:{
            	      user_id:that.user,
            	      goods_id:goods_id
            		},
            		success:function(e){
            			console.log(e)
            		   if(e.code == '10000'){
            		   	   that2.parents(".spStyle").remove();
            		   }else{
            		   	alert(e.msg);
            		   }
            		},
            		error:function(e){
            		  alert(e.msg);
            	}
            		
            	});
	  	})
	  }
	  
	  
  	
  	
  	keep_sp.init();
  	return keep_sp;
  })()