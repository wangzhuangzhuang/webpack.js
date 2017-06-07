$(function(){
	
	
  var  details =(function(){
  	
  	function details(){};
  	//、、、获取本地用户信息
    details.user_id = sessionS.cookie.get("encrypt_id");
    details.goods_id = picture.GetQueryString("goods_id");
    
    //、、、、、商品详情页初始化
    details.init = function () {
   	   this.ajaxFn();
   	   this.user_comment();
   	   this.imgHover();
   	   this.standardClick();
   	   this.numberClick();
   	   this.addCar();
       commonality.tabFn({
				navBox:$(".tabList"),//、、、、、选择开头部 对象
				active:"active",
				incident:"click",
				clickFn:function(e){
					//$(window).scrollTop("1154");
				}
			})
        this.clickStyle();
       	
    
    }
    
    //、、、、、鼠标划过显示对应的图片
    
    details.imgHover = function () {
    	
    	$("#small_imglist").on("mouseenter","li",function(){
    		 $(this).css({"cursor":"pointer"});
    		 var  Src = $(this).find("img").attr("src");
    		 var img = new Image();  
    		 $(this).addClass("active").siblings().removeClass("active");
                 img.onload = function(){
                 	$("#details-box-left-imgBox-img").html(this);
                 };
                 img.src=Src;  
    	})
    	
    	
    	
    	$("#textBox-list").on("click",".personage-littleImg>li",function(){
    		if(!$(this).hasClass("active")){
    			var img_src = $(this).find("img").attr("src");
    			$(this).addClass("active").siblings().removeClass("active");
    		    $(this).parent().next().show();
    		    $(this).parent().next().find("img").attr("src",img_src);
    		    $(this).removeClass("add");
    		 	$(this).addClass("cut");
    		}else{
    			$(this).removeClass("active");
    		    $(this).parent().next().hide();
    		    $(this).removeClass("cut");
    		 	$(this).addClass("add");
    		}
    		
    	})
    	$("#textBox-list").on("mouseenter",".personage-littleImg>li",function(){
    		 if($(this).hasClass("active")){
    		 	$(this).removeClass("add");
    		 	$(this).addClass("cut");
    		 }else{
    		 	$(this).removeClass("cut");
    		 	$(this).addClass("add");
    		 }
    	})
    	
    }
    
    //、、、、调用ajax
    details.ajaxFn = function () {
    	var that = this;
    	$.ajax({
    		type:"post",
    		url:realm.Name+"goods_details",
    		data:{
    			encrypt_id : that.user_id,
    			goods_id : that.goods_id
    		},
    		dataType:"json",
    		success:function(e){
    			console.log(e);
    			if(e.code == "10000"){
    				that.backfillFn(e.data);
    			};
    			
    		}
    	});
    	
    }
    
    //、、、、数据回填
    details.backfillFn = function (data,goods_id) {
    	var that = this;
    	var goods_name,goods_main_url,pc_price,goods_id,sku_id,market_price,tax_pric,sku="";
    	var cate_one          = data.cate_one.category_name;   //、、、一级名称
    	var cate_two          = data.cate_two.category_name;   //、、、二级名称
    	var goods_photo       = data.goods_photo;              //、、、商品小图片
    	var goods_type        = data.goods_type;               //、、、商品类型
    	var user_status       = data.user_status;               //、、、、判断用户是否登录
        //----------分类面包屑---------
			$(".cate_one").html(cate_one);
			$(".cate_two ").html(cate_two );
			if(data.cate_three != undefined){
				$(".details-header").append("<li>"+data.cate_three.category_name+"</li>");
			}
			
		//----------商品图片列表---------
    	   $.each(data.goods_photo,function(i,v){
    	   	//console.log(v,data.goods_photo.length);
	    		if(data.goods_photo.length == 1){
	    			$("#small_imglist").hide();
	    			$("#commodityIMgBox").css("width","402px");
	    		}else{
	    			$("#small_imglist").attr("src",v);
	    		}
    	  })
    	
    	
    	//--------------品牌专区---------------------
    	var brand_goods_num = data.goods_brand.brand_goods_num;//品牌数量
    	var brand_logo_url = data.goods_brand.brand_logo_url;//品牌图片地址
    	var brand_mark_name = data.goods_brand.brand_mark_name;//品牌名称;
    	var brand_user_num = data.goods_brand.brand_user_num;//关注人数;
    	var goods_brand_id = data.goods_brand.goods_brand_id;//品牌ID;
    	    $("#brand_img").attr("src",brand_logo_url);
    	    $("#brand_user_num").html(brand_user_num);
    	    $("#brand_goods_num").html(brand_goods_num);
    	    $("#preferenceBtn").attr("href","preference.html?brand_id="+goods_brand_id);
    	    
    	//---------------相关推荐----------------------------
    	 var str = "";
    	  $.each(data.tj_goods,function(i,v){
    		str += '<a href="javascript:;" class="detail_shop" data-goods_id='+v.goods_id+'>'+
    		       '<li>'+
				    	'<img src="'+v.goods_main_url+'"/>'+
				    	'<p class="apostropheText">'+v.goods_name+'</p>'+		
				    	'<p class="original">￥'+v.pc_price+'<span></span></p>'+
				   '</li>'+
				   '</a>';
    	});
    	  $(".correlation-wrap").html(str);
    	
    	//-----------------图片详情---------------------
    	  $(".imgList").html(data.pic_detail);
    	
    	//-----------单个商品------------------
    	if(data.goods_detail != undefined){
	    	 goods_name        = data.goods_detail.goods_name;  //、、、商品名称
	    	 goods_main_url    = data.goods_detail.goods_main_url;  //、、、商品图片
	    	 goods_id          = data.goods_detail.goods_id;    //、、、商品Id
	    	 pc_price          = data.goods_detail.pc_price;    //、、、商品现价;
	    	 market_price      = data.goods_detail.market_price;//、、、商品原价;
	    	 tax_price         = data.goods_detail.tax_price;//跨境税
	    	 
	    	 $.each(data.goods_sku,function(i,v){
    	 	      sku += '<li data-sku_id="'+v.sku_id+'">'+v.sku_name+'</li>';
    	 	      sku_id = v.sku_id;
    	      })
    	  }
    	 //-----------组合购商品------------------
    	if(data.grade_arr != undefined){
	    	 goods_name        = data.grade_arr.show_sku.goods_name;  //、、、商品名称
	    	 goods_main_url    = data.grade_arr.show_sku.goods_main_url;  //、、、商品图片
	    	 goods_id          = data.grade_arr.show_sku.goods_id;    //、、、商品Id
	    	 pc_price          = data.grade_arr.show_sku.pc_price;    //、、、商品现价;
	    	 market_price      = data.grade_arr.show_sku.market_price;//、、、商品原价;
	    	 tax_price         = data.grade_arr.show_sku.tax_price;//跨境税
	    	 sku_id            = data.grade_arr.show_sku.sku_id; 
	    	$.each(data.grade_arr.goods_sku,function(i,v){
    	 	      sku += '<li data-sku_id="'+v.sku_id+'">'+v.sku_name+'</li>';
    	    })
	    	
	    	$(".overbalance").show();
	    	$(".grade_price").html("￥"+data.grade_arr.grade_price);
	    	$(".yj_price").html("￥"+data.grade_arr.yj_price);
	    	$(".jy_price").html("￥"+data.grade_arr.jy_price);
	    	var str2 = "";
	    	$.each(data.grade_arr.arr_sku,function(i,v){
	    		
	    	 str2 += '<div data-grade_id="'+v.grade_id+'">'+
	    	              '<a href="javascript:;" class="detail_shop" data-goods_id="'+v.goods_id+'" >'+
				     		'<dl>'+
				     			'<dt>'+
				     				'<img src="'+v.goods_main_url+'" />'+
				     			'</dt>'+
				     			'<dd>'+
				     				'<p class="original">￥'+v.pc_price+'<span></span></p>'+
				     				'<p class="apostropheText">'+v.goods_name+'</p>'+
				     			'</dd>'+
				     		'</dl>'+
				     		'</a>'+
				     '</div>';
	          })
	    	$("#overbalance-content-left").html(str2);
    	  }
    	
    	//-----------限时商品------------------
    	  if(data.goods_limit != undefined){
    	  	 goods_name        = data.goods_limit.goods_name;  //、、、商品名称
	    	 goods_main_url    = data.goods_limit.goods_main_url;  //、、、商品图片
	    	 goods_id          = data.goods_limit.sku_id;    //、、、商品Id
	    	 pc_price          = data.goods_limit.activity_price;    //、、、商品现价;
	    	 market_price      = data.goods_limit.pc_price;//、、、商品原价;
	    	 tax_price         = data.goods_limit.tax_price;//跨境税
	    	 
	    	  $.each(data.goods_limit.goods_sku,function(i,v){
    	 	      sku += '<li data-sku_id="'+v.sku_id+'">'+v.sku_name+'</li>';
    	 	      sku_id = v.sku_id;
    	      })
	    	 
	    	 $(".limit_time_btn").show();
	    	 $(".sale_price").append('<label class="limit_price">限时特价</label>');
	    	var over_time = data.goods_limit.until_end;
	    	var start_time = new Date(data.goods_limit.start_time*1000);
	    	var sale_status = data.goods_limit.sale_status;
	    	    
	    	 if(sale_status == "未开始"){
	    	 	    $(".limit_time_btn").html(sessionS.time_list5(start_time)+"开始限时特价"+"￥"+pc_price);
	    	 }else if(sale_status == "正在进行"){
	    	 	    setInterval(function(){
	    	 	   	  $(".limit_time_btn").html("还剩"+sessionS.time_list4(over_time--)+"结束"+" "+"恢复￥"+market_price+"，不能同享其他优惠");
	    	 	   },1000);
	    	 	   
	    	 	   if(over_time == 0){
	    	     	window.location.reload();
	    	       }
	    	 	
	    	 }else if(sale_status == "已抢光"){
	    	 	setInterval(function(){
	    	 	    $(".limit_time_btn").html("还剩"+sessionS.time_list4(over_time--)+"结束，"+"商品已抢光，恢复"+market_price);
	    	 	 },1000);
	    	 	 
		    	    if(over_time == 0){
		    	      window.location.reload();
		    	    }
	    	 }else{
	    	 	  $(".limit_time_btn").hide();
	    	 	  $(".limit_price").remove();
	    	 }
    	  }
    	 
    	 
    	 //---------------商品规格-------------------------
	    	$("#standard").html(sku);
    	    $("#standard").find("li").eq(0).addClass("active");
    	 //-----------商品描述--------------
	    	$(".details-box-right-title").find("span").html(goods_name);
	    	$(".now").html("<b>￥</b>"+pc_price);
	    	$(".before_price").html("<b>￥</b>"+market_price);
	    	$(".big_imglist").attr("src",goods_main_url);
	    	$(".freight").find("b").html("￥"+data.freight);
	    	$("#purchase").on("click",function(){
	    		sku_id = $("#standard li.active").attr("data-sku_id");
	    		var buy_num = $("#numberText").val();
	    		if(user_status != 3){
		    	 sessionS.cookie.set("grade_id","");
		         sessionS.cookie.set("sku_id",sku_id);
		         sessionS.cookie.set("buy_num",buy_num);
		   	    window.location.href = "recipient_address.html";	
	    		}else{
	    		window.location.href = "pc_login.html";	
	    		}
	         
	       })
	    	
	    	$(".detail_shop").on("click",function(){
	         var goods_id=$(this).attr("data-goods_id");
	         window.open("details.html?goods_id="+goods_id+"");
	    	})
	    	
	    //、、、、、、、、、、、、用户是否收藏-----------
    	
    	    if(user_status == 1){
    	       $(".share-collect").find("img").attr("src","./imgs/coll_ok.png");
    	    }else if(user_status == 2){
    	       $(".share-collect").find("img").attr("src","./imgs/coll_no.png");
    	    };
    		$(".share-collect").on("click","a",function(){
    		if(user_status == 3){
    	   	  window.location.href="pc_login.html";
    	    }else{
    	        picture.collectFn(that.user_id,that.goods_id,function(i){
    	      	   if(i == 1){
	    	   	      $(".share-collect").find("img").attr("src","./imgs/coll_ok.png");
	    	   
		    	   }else if(i == 2){
		    	   	  $(".share-collect").find("img").attr("src","./imgs/coll_no.png");
		    	   	
		    	   }
    	        }); 
    	    };
    	      
        });
    	
	    
	    //--------------商品类型------------------
	      if(goods_type == "跨境商品"){
	      	$(".tax").html("￥"+tax_price);
	      }else{
	      	$(".row2").hide();
	      };
	      
	      
	    details.windowScroll();
    }
    
	 //------------------收藏商品----------------
	

    
    //-----------用户评论--------------------
    details.user_comment=function(){
    	var that = this;
    	$.ajax({
    		type:"post",
    		url:realm.Name+"goods_comment",
    		data:{
    			page : 0,
    			goods_id : that.goods_id
    		},
    		dataType:"json",
    		success:function(e){
    			console.log(e);
    			if(e.code == "10000"){
    				that.comment_detail(e.data);
    			};
    			
    		}
    	});
    };
    
    //--------------评论详情--------------------
    
    details.comment_detail=function(data){
    	if(data.length == 0){
    		$("#textBox-list").html('<div class="user_word"><img src="./imgs/no_infor.png"/><p>暂无评论！</p></div>')
    		return false;
    	}
    	var str3 = "";
    	$.each(data,function(i,v){
    		var evaluate_time = new Date(v.evaluate_time*1000);
    		str3 += '<div class="personage" data-evaluate_id="'+v.evaluate_id+'">'+
				    	  '<img class="personage-head"  src="'+v.user_image+'"/>'+
				    	  '<h1><span>'+v.user_nickname+'</span><time>'+sessionS.time_list3(evaluate_time)+'</time></h1>'+
				    	  '<p class="text">'+v.evaluate_desc+'</p>'+
				    	  '<ol class="personage-littleImg">';
			$.each(v.evaluate_img,function(i,v){
				    str3 += ' <li>'+
				    	         '<img src="'+v.evaluate_img+'" />'+
				    	    '</li>';
			 })
				    str3 += '</ol>'+
				    	   '<ul class="personage-bigImg">'+
				    	        '<li>'+
				    	          '<img src="" />'+
				    	        '</li>'+
				    	  ' </ul>'+
				   ' </div>';
    	})
    	
    	$("#textBox-list").html(str3);
    }
    
    //、、、、、、点击选取商品规格
    
    details.standardClick = function () {
    	
    	$("#standard").on("click","li",function(){
    		
    		$(this).addClass("active").siblings().removeClass("active");
    		
    	})
    	
    }
    
    //、、、、、、选择商品的数量
    
    details.numberClick = function () {
    	var N=$("#numberText");
    	var k = N.val()*1;
    	$("#add").on("click",function(){
    		    
    		    k++;
    		    N.val(k);
    		
    	})
    	$("#cut").on("click",function(){
    		
    		  if(k <= 0){
    		  	k=1;
    		  };
    		     k--;
    		     N.val(k);
    		
    	})
    	
    }
    
    //、、、、、、、滚动条事件
    
    details.windowScroll = function () {
    	
    	var t = $("#imgText-header");
    	var i = $("#imgText-tabBox");
    	var TopK = t.offset().top;
    	
    	$(window).on("scroll",function(e){
    		var T = $(this).scrollTop();
    		if(T >= TopK){
    			t.addClass("activeFixed");
    			i.addClass("imgText-tabBoxP");
    			$(".addShop").show();
    		}else{
    			t.removeClass("activeFixed");
    			i.removeClass("imgText-tabBoxP");
    			$(".addShop").hide();
    		}
    	})
    	
    }
    
    details.clickStyle = function(){
    	
        $("#purchase").mouseFn("clickStyle");
        $("#add").mouseFn("addClick");
        $("#cut").mouseFn("cutClick");
        
       
        
    };
    details.addCar = function () {
    	
    	$(".join").on("click",function(){
    		
    		  var sku_id = $("#standard li.active").attr("data-sku_id");
    		  var buy_num = $("#numberText").val();
    		  $.ajax({
    		  	type:"post",
    		  	url:realm.Name+"shopping_sku_cart",
    		  	data:{
    		  		"sku_id" : sku_id,
    		  		"buy_num": buy_num,
    		  		user_id  : details.user_id
    		  	},
    		    dataType:"json",
    		    success:function(e){
    		    	if(e.code == "10000"){
    		    		layer.msg('购物车加入成功', {time:1000});
    		    	}else{
    		    		layer.msg(e.msg, {time:1000});
    		    	};
    		    }
    		  });
    		
    	});
    	
    	
    	$("#groupBtn").on("click",function(){
    		
    		  var grade_id = $("#overbalance-content-left>div").eq(0).attr('data-grade_id');
    		  $.ajax({
    		  	type:"post",
    		  	url:realm.Name+"shopping_grade_cart",
    		  	data:{
    		  		"grade_id" : grade_id,
    		  		"grade_buy_num":1,
    		  		"user_id"  : details.user_id
    		  	},
    		    dataType:"json",
    		    success:function(e){
    		    	if(e.code == "10000"){
    		    		layer.msg('购物车加入成功', {time:1000});
    		    	}else{
    		    		layer.msg(e.msg, {time:1000});
    		    	};
    		    }
    		  });
    		
    	});
    	
    };
   
  
  
    details.init();
    return details;
  })()
	
	
	
})
