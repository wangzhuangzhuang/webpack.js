$(function(){
	
	var preference = (function(){
	function preference(){};
	preference.init = function () {
		
		this.ajaxFn();
		this.collectFn();
	};
		
	preference.ajaxFn = function () {
		
		
		$.ajax({
			type:"post",
			url: realm.Name + "brand_division",
			data:{
				brand_id:picture.GetQueryString("brand_id"),
				user_id:sessionS.cookie.get("encrypt_id")
			},
			dataType:"json",
			success:function(e){
				
				if(e.code == "10000"){
					preference.backfill(e.data);
					$(".spStyle").on("click",function(){
   	  	  			var goods_id = $(this).attr("data-goods_id");
   	  	  			window.open("details.html?goods_id="+goods_id+"");
   	  	  		})
				};
			}
		});
		
	};
	
	//、、、、
	preference.backfill = function (data) {
		
		preference.brandHTML(data.brand);
		preference.commodityHTML(data.goods_list);
		
	};
	
	preference.brandHTML = function (data){
		var brand_id = data.brand_id;
		var brand_ch_name = data.brand_ch_name;
		var brand_en_name = data.brand_en_name;
		var brand_desc    = data.brand_desc;
		var brand_logo_url= data.brand_logo_url;
		var brand_follow_num = data.brand_follow_num;
		var is_collect = data.is_collect;
		
		$(".collect dl img").attr('src',brand_logo_url);
		$(".collect dl dd").html(brand_en_name+"&nbsp;&nbsp;&nbsp;&nbsp;"+brand_ch_name+"&nbsp;&nbsp;&nbsp;&nbsp;"+brand_desc);
		$("#number").text(brand_follow_num);
		if(!is_collect || is_collect == "0" ) return false;
		$("#collect").prop("checked","checked");
	};
	
	preference.commodityHTML = function (data) {
		
		var str = picture.commodityHTML(data);
		$(".sp-list").html(str);
		$(".sp-list img").each(function(i,v){
			var that = $(this);
			v.onload = function (){
				that.css("opacity","1");
			}
		})
	};
	
	preference.collectFn = function (){
		
		$('#collect').on("change",function(e){
			var that = $(this);
			$.ajax({
				type:"post",
				url:realm.Name+"collection_brand",
				data:{
					user_id:sessionS.cookie.get("encrypt_id"),
					brand_id:picture.GetQueryString("brand_id")
				},
				dataType:"json",
				success:function(e){
					if(e.code != "10000"){
						window.location.href="pc_login.html"
					}
				}
			});
			
		})
		
	}
	
		
		
		
		
		
		
		
		
		
		
		
		
		
	preference.init();	
	return preference;	
	})()
	
})
