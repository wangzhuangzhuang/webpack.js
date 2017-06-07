 
  var pc_classify = (function(){
  	
  	function pc_classify(){};
  	
  	
  	pc_classify.init = function () {
  		
  		
  		var category_id = picture.GetQueryString("category_id");
  		var parentId = picture.GetQueryString("p");
  		if(!category_id){
  			this.commodityAJAX(parentId,"","",0);
  			this.ajaxFn(parentId);
  		}else{
  			this.commodityAJAX(category_id,"","",0);
  			this.ajaxFn(category_id);
  		}
  		
  		this.dataDackfill()
  		
  	};
  	
  	//、、、初始化
  	pc_classify.ajaxFn = function (ID) {
  		$.ajax({
	  			type:"post",
	  			url:realm.Name + "goods_cate",
	  			data:{
	  				category_id: ID
	  			},
	  			async:true,
	  			dataType:"json",
	  			success:function(e){
	  				
	  				if(e.code == "10000");
	  				pc_classify.selectHTML(e.data);
	  				pc_classify.selectClick();
	  				
	  			}
	  		});
  	};
  	//、、、创建选择的HTML 
  	pc_classify.selectHTML = function (data) {
  		
  		 var str2 = '<li class="country"><label>国家：</label><div><a href="javascript:;">澳大利亚</a><a href="javascript:;">新西兰</a></div></li><li><label>品牌：</label><div>';
		       $.each(data.brand, function(i, v) {
			          str2 += '<a href="javascript:;" data-brand_id="' + v.brand_id + '">' + v.brand_mark_name + '</a>';
		       })
		       str2 += '</div></li><li><label>分类：</label><div>';
		       $.each(data.two, function(i, v) {
			         str2 += '<a href="javascript:;" data-category_id="' + v.category_id + '">' + v.category_name + '</a>';
		       });
		       str2 += '</div></li>';
		       $(".sp_name").html(str2);
  		
  	};
  	pc_classify.page = 0;
  	pc_classify.commodityAJAX = function (category_id,guo,brand_id,order){
  		
  		$.ajax({
  			type:"post",
  			url: realm.Name + "cate_search",
  			async:true,
  			dataType:"json",
  			data:{
  				category_id  : category_id?category_id:"",
  				guo          : guo?guo:"",
  				brand_id     : brand_id?brand_id:"",
  				order        : order?order:"",
  				page         : pc_classify.page
  			},
  			success:function(e){
  				
  				 if(e.code == "10000"){
  				 	 
  				 	   pc_classify.commodityHTML(e.data.goods_list,e.data.num);
  				 	
  				 };
  				
  			}
  		});
  		
  	};
  	pc_classify.commodityHTML = function (data,num) {
  		if(data == 0){
  			$(".classifyBox").html("无商品");
  			$('div.pager-list').pageList({
					
						prevText: '<img src="./imgs/fenlei_47.png"/>上一页',
						nextText: '下一页<img src="./imgs/fenlei_50.png"/>',
						recordText: '共{0}页',
						totalCount: 0,
						goInputType: 'text',
						showGoLink: true,
						showPageRange: 1,
						pageSize: 1,
						renderPerCall: true,
						clickCallback: function(currentPage) {
							$(".more_num").text(currentPage);
						  	pc_classify.page = currentPage-1;
						   	    pc_classify.slesctFn();
						}
			  });
  			return false;
  		}
  		var str = "<div class='classify-content'>";
  	  
  	        str += picture.commodityHTML(data);
			str += "</div>";
			$(".classifyBox").html(str);
			$(".classifyBox img").each(function(i,v){
				var that = $(this);
			    v.onload = function () {
			        that.css("opacity","1");
			    };
			});
			if(pc_classify.page == 0){
				var ye = Math.floor(num/10);
				$('.figured_num').text("/"+ye);
				$('div.pager-list').pageList({
					
						prevText: '<img src="./imgs/fenlei_47.png"/>上一页',
						nextText: '下一页<img src="./imgs/fenlei_50.png"/>',
						recordText: '共{0}页',
						totalCount: ye,
						goInputType: 'text',
						showGoLink: true,
						showPageRange: 1,
						pageSize: 1,
						renderPerCall: true,
						clickCallback: function(currentPage) {
							$(".more_num").text(currentPage);
						  	pc_classify.page = currentPage-1;
						   	    pc_classify.slesctFn();
						}
			  });
				
			};
				
  	
  	};
  	//、、、数据回填
  	pc_classify.dataDackfill = function () {
  		
  		  var category_id = picture.GetQueryString("category_id");
  		  var k           = picture.GetQueryString2("k");
  		  var parentId    = picture.GetQueryString("p");
  		  var n           = picture.GetQueryString2("n");
  		  console.log(category_id)
  		  console.log(k)
  		  console.log(parentId)
  		  console.log(n)
  		  if(category_id){
  		  	$("#selectBox li").eq(0).attr("data-category_id",parentId);
  		    $("#selectBox li").eq(0).html('<img src="./imgs/fenlei_14.png" class="zhi"><span data-idx="1">'+n+'</span>');
  		    $("#selectBox li").eq(1).attr("data-category_id",category_id);
  		    $("#selectBox li").eq(1).html('<img src="./imgs/fenlei_14.png" class="zhi"><span data-idx="1">'+k+'<img src="./imgs/fenlei_03.png" class="close"></span>');
  		  }else{
  		  	$("#selectBox li").eq(0).attr("data-category_id",parentId);
  		    $("#selectBox li").eq(0).html('<img src="./imgs/fenlei_14.png" class="zhi"><span data-idx="1">'+n+'</span>');
  		  }
  		  
  	},
  	//、、、点击分类类型;
  	pc_classify.selectClick = function () {
  		
  		$(".sp_name li").on("click", "a", function() {
					var sp_text = $(this).text();
					var	li_index = $(this).parents("li").index()+1;
					
					if(li_index == 3){
						var	category_id = $(this).data('category_id');
						$("#selectBox li").eq(1).attr('data-category_id',category_id);
						$("#selectBox li").eq(1).html('<img src="./imgs/fenlei_14.png" class="zhi"><span>'+sp_text+'<img src="./imgs/fenlei_03.png" class="close"></span>');
					}else{
						var	brand_id = $(this).data('brand_id');
				    $("#selectBox li").eq(li_index+1).attr('data-brand_id',brand_id);
					  $("#selectBox li").eq(li_index+1).html('<img src="./imgs/fenlei_14.png" class="zhi"><span>'+sp_text+'<img src="./imgs/fenlei_03.png" class="close"></span>');
					};
					pc_classify.page = 0;
					pc_classify.slesctFn();
		  })
			$(".sp_result").on("click", ".close", function() {
				var ind = $(this).parents("li").index();
				if(ind == 0){
					$(this).parents("li").attr("data-category_id","");
					$(this).parents("li").html("");
				}else if( ind == 1){
					$(this).parents("li").attr("data-category_id","");
					$(this).parents("li").html("");
				}else if( ind == 2){
					$(this).parents("li").attr("data-brand_id","");
					$(this).parents("li").html("");
				}else if(ind == 3){
					$(this).parents("li").attr("data-brand_id","");
					$(this).parents("li").html("");
				}
			  
			    $(".sp_name li").eq(ind).show();
			    pc_classify.page = 0;
			    pc_classify.slesctFn();
			});
			
		  $(".sort_list").on("click","li",function(){
		  	if($(this).hasClass("active")) return false;
		  	pc_classify.page = 0;
		  	$(this).addClass("active").siblings().removeClass("active");
		  	pc_classify.slesctFn();
		  });
		  
		  $(".btn_next").on("click",function(){
		  	 
		  	  $(".next").click();
		  });
		  $(".btn_prev").on("click",function(){
		  	  $(".prev").click();
		  });
  		
  	};
  	
  	
  	//、、、删选条件
  	pc_classify.slesctFn = function () {
        var category_id = $("#selectBox li").eq(1).attr("data-category_id")?$("#selectBox li").eq(1).attr("data-category_id"):$("#selectBox li").eq(0).attr("data-category_id");
		var guo = $("#selectBox li").eq(2).find("span").text()?$("#selectBox li").eq(2).find("span").text():"";
		var brand_id = $("#selectBox li").eq(3).attr("data-brand_id")?$("#selectBox li").eq(3).attr("data-brand_id"):"";
		var order    = $(".sort_list li.active").attr("data-order");
		pc_classify.commodityAJAX(category_id,guo,brand_id,order);
  		
  	};
  	
  	
  	pc_classify.init();
  	return pc_classify;
  })()
