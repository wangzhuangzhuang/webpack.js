
$(function(){
	
	
	var hotword = (function(){
		
	function hotword(){}
	hotword.k = picture.GetQueryString2("k");	
	hotword.init = function () {
		
		hotword.backfillFn();
		
	};
	
	hotword.backfillFn = function () {
		
		 $("#searchInp").val(hotword.k);
		 $("#selectBox li").eq(0).text(hotword.k);
		 $("#selectBox li").eq(0).css('padding-left',"25px");
		 this.ajaxFn(hotword.k,0);
		 this.clickFn();
		
	};
	hotword.bool = true;
	hotword.page = 0;
	hotword.ajaxFn = function (k,sort){
		
		$.ajax({
			type:"post",
			url: realm.Name + "sy_ssy_list",
			data:{
				keyword:k,
				page:hotword.page,
				sort:sort
			},
			dataType:"json",
			success:function(e){
				
				if(e.code == "10000"){
					
					hotword.hotwordHTML(e.data.goods,e.data.count);
				   
				}else{
					 $(".sp_show").hide();
			         $(".classifyBox").html('<img src="./imgs/no_sp.png"/><p>抱歉，没有找到与'+k+'相关的商品</p>')
    		         return false;
		        }
				
			}
		});
		
	};
	
	hotword.hotwordHTML = function (data,num) {
		
		var str = "<div class='classify-content'>";
		    str += picture.commodityHTML(data);
		str += "</div>";
		$(".classifyBox").html(str);
		hotword.bool = true;
		$(".classifyBox img").each(function(i,v){
			var that = $(this);
			v.onload = function () {
			   that.css("opacity","1");
			};
		})
		if(hotword.page == 0){
			   
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
							$("html,body").scrollTop(0);
							$(".more_num").text(currentPage);
						  	hotword.page = currentPage-1;
						   	var sort = $(".sort_list li.active").attr("data-order");
						   	hotword.ajaxFn(hotword.k,sort);
						}
			  });
				
			};
		
	};
	
	hotword.clickFn = function () {
		 $(".btn_next").on("click",function(){
		  	$(".next").click();
		 });
		 $(".btn_prev").on("click",function(){
		  	  $(".prev").click();
		 });
		 $(".sort_list").on("click","li",function(){
		 	if($(this).hasClass("active")) return false;
		 	
			if(!hotword.bool) return false;
			hotword.bool = false;
		 	$(this).addClass("active").siblings().removeClass("active");
           
		   	var sort = $(this).attr("data-order");
		   	hotword.page = 0;
		   	$(".more_num").text("1");
		    hotword.ajaxFn(hotword.k,sort);
		 })
	}
	
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	
	
	
	hotword.init();
	return hotword;
	})()
	
	
})
