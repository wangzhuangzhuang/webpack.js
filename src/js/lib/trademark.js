 

  var trademark = (function(){
  	
  	function trademark(){};
  	
  	//、、、、初始化
  	trademark.init = function (){
  		
	  		 /*  commonality.tabFn({
					navBox:$("#brand-nav"),//、、、、、选择开头部 对象
					active:"active",
					incident:"click"
				})*/
	  		   
	  		   
	  		   
	  		   this.ajaxFn();
			
  	};
  	
  	trademark.ajaxFn = function () {
  		
  		$.ajax({
  			type:"post",
  			url: realm.Name + "brand_list",
  			dataType:"json",
  			data:{
  				user_id:""
  			},
  			success:function(e){
  				
  				if(e.code == "10000"){
  					trademark.backfillFn(e.data);
  				}
  				
  			}
  		});
  		
  		
  	};
  	//、、、数据回填
  	trademark.backfillFn = function (data) {
  		
  		trademark.bigBrand(data.brand_list);
  		trademark.brandStyle(data.plist);
  	};
  	//、、、大品牌特惠;
  	trademark.bigBrand = function (data){
  		var str = '';
  		$.each(data, function(i,v) {
  			
  			str += '<li class="brand-img-list" data-brand_id="'+v.brand_id+'">'+
  			       '<img src="'+v.brand_image+'">'+
  			       '<div class="brand-nav-wrap">'+
  			       ' <ul class="brand-nav-wrap-list">';
  			    $.each(v.goods_list,function(k,y){
  			    	str += '<li class="active">'+
  			    	          '<a href="#">'+
  			    	             '<img src="'+y.goods_main_url+'" />'+
  			    	             '<p>￥'+y.pc_price+'</p>'+
  			    	        '</li>';     
  			    })
  			    console.log(v.is_collect)
  			str += '</ul>'+
  			       '<div class="brand-nav-wrap-text">'+
  			       '<span class="monicker-text">'+v.brand_ch_name+'</span>'+
  			       '<label class="collect-btn">';
  			       if(v.is_collect == "0" || !v.is_collect){
  			       	str +='<input type="checkbox" name="a"/>';
  			       }else if(v.is_collect == "1"){
  			       	str +='<input type="checkbox" name="a" checked="checked"/>';
  			       };
  			       
  			       str += '<span>收藏品牌</span>'+
  			       '</label>'+
  			       '<a href="#" class="go-A">进入卖场  ></a>'+
  			       '</div></div></li>'
  		}); 	
  		$("#brand-img").html(str); 	
  		$("#brand-img").ready(function(){
  			  $("#brand-img").on("click",".active,.go-A",function(){
  			  	   var brand_id = $(this).parents("li").data('brand_id');
  			  	   window.open("preference.html?brand_id="+brand_id);
  			  })
  		});
	    trademark.hoverShow();
  		
  		
  	};
  	
  	trademark.hoverShow = function () {
  		
  		$("#brand-img").on("mouseenter",".brand-img-list",function(){
  			
  			$(this).find(".brand-nav-wrap").stop().fadeIn();
  		})
  		$("#brand-img").on("mouseleave",".brand-img-list",function(){

  			$(this).find(".brand-nav-wrap").stop().fadeOut();
  		})
  		
  	};
  	
  	trademark.brandStyle = function (data) {
  		var str = '';
  		console.log(data)
  		$.each(data, function(i,v) {
  			
  			str += '<section class="brand" data-pc_brand_id='+v.pc_brand_id+'>'+
                   '<header class="brand-header">'+
				   '<h1>'+v.category_name+'</h1>'+
				   '</header>'+
				   '<nav class="brand-nav"  data-tab="brand-content">';
				   $.each(v.jlist, function(k,y) {
				   	  
				   	  str += '<div data-brand_id='+y.brand_id+'><a href="preference.html?brand_id='+y.brand_id+'"><img src="'+y.brand_logo+'"></a></div>';
				   	 
				   });
					str += '</nav>'+
					'<div class="brand-content">'+
						'<div class="brand-content-list leftRight-box">'+
							'<div class="brand-content-list-left leftBox">'+
								'<a href="preference.html?brand_id='+v.brand_id+'">'+
									'<img src="'+v.brand_img+'"/>'+
								'</a>'+
							'</div>'+
							'<div class="brand-content-list-right rightBox">';
							
							$.each(v.glist, function(n,m) {
								
								str += '<a href="details.html?goods_id='+m.goods_id+'" data-goods_id="'+m.goods_id+'">'+
								       '<h1>'+m.goods_name+'</h1>'+
								       '<p class="original">￥'+m.pc_price+'<span>￥'+m.market_price+'</span></p>'+
								       '<img src="'+m.goods_main_url+'"/ class="iM">'+
								       '</a>';
							});
							str += '</div>'+
						'</div>'+
					'</div>'+
				'</section>';
  			
  		});
  		
  		
  		$(".content").append(str);
  	};
  	
  	

  	

  	
  	
  	
  	
  	
  	return trademark
  	
  })()
