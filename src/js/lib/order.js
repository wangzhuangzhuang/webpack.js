 

  var order = (function(){
  	
  	function order(){};
  	
  	order.init = function () {
  		
  		order.addSite();
  		picture.saveSite();
  		order.costCount();
  		order.indentStorage();
  	};
  	
  	order.addSite = function () {
  		
  		
  		$("#addSiteBtn").on("click",function(){
  			$(".add_dress").show();
  			$(".add_dress").find(".harvest_person").val("");
  			$(".add_dress").find(".particular").val("");
  			$(".add_dress").find(".harvest_phone").val("");
  			$(".add_dress").find("input[type=checkbox]").prop("checked",false);
  			$(".add_dress").attr("data-clickStyle",'1');
  			 _init_area("s_province2","s_city2","s_county2"); //省市三级联动；
  		});
  		$(".cancel_btn").on('click',function(){
  			$(".add_dress").hide();
  		})
  		
  	};
  	
  	order.saveFn = function (src1,src2) {
  		 var card_name = $("#add_name").val();
  		 var card_num  = $("#add_number").val();
  		 var ajaxurl = "";
  		 var data = null ;
  		 if($("#wzadd_add_idcard").attr("data-card_id")){
  		 	ajaxurl = realm.Name+"update_card";
  		 	data = {
  		 		user_id : sessionS.cookie.get("encrypt_id"),
  		 		card_name : card_name,
  		 		card_num : card_num,
  		 		card_just_url : src1,
  		 		card_back_url : src2,
  		 		card_id:$("#wzadd_add_idcard").attr("data-card_id")
  		 	  };
  		 }else{
  		 	ajaxurl = realm.Name+"add_card";
  		 	data = {
  		 		user_id : sessionS.cookie.get("encrypt_id"),
  		 		card_name : card_name,
  		 		card_num : card_num,
  		 		card_just_url : src1,
  		 		card_back_url : src2
  		 	  };
  		 }
  		 $.ajax({
  		 	type:"post",
  		 	url:ajaxurl,
  		 	data:data,
  		 	dataType:"json",
  		 	success:function(e){
  		 		if(e.code == "10000"){
  		 			window.location.reload();
  		 		}else{
  		 			$("#sec1").html("");
  		 			$("#sec2").html("");
  		 			alert(e.msg);
  		 		};
  		 	}
  		 });
  	};
  	
  	
  	//、、、价格计算
  	order.costCount = function () {
  		$('#privilegeBtn').on("change",function(){
  			var k = $(this).find("option:selected").attr("data-favoured_policy_money");
  			var m = orderHTML.order_total-k;
  			$("#order_total").text(m.toFixed(2));
  		})
  		
  	};
  	
  	order.indentStorage = function () {
  		
  		$("#storageBtn").on("click",function(){
  		     if(orderHTML.bool  == 0){
  		     	layer.msg("此地区不支持发货！", {time:1000});
  		     	return false;
  		     };
  			 var obj = $("#siteList a.active");
             var cardObj = $("#cardList a.active");
             var siteObj = $("#siteList a.active");
  			 var topURl = document.referrer;
		     var shop_car = "shop_car";
		     var data = null;
		     if(siteObj.length == 0){
		     	$("html,body").scrollTop(0);
		     	$(".sitePrompt").show();
		     	return false;
		     }else{
		     	$(".sitePrompt").hide();
		     };
		     if(cardObj.length == 0){
		     	$("html,body").scrollTop(0);
		     	$(".userPrompt").show();
		     	return false;
		     }else{
		     	$(".userPrompt").hide();
		     };
		     
		     
		    if(topURl.indexOf(shop_car) != -1) {
			 
			  data = {
  		   	   "user_id"              :  sessionS.cookie.get("encrypt_id"),
  		   	   "harvest_person"       :  obj.find("span").text(),
  		   	   "harvest_information"  :  obj.find("p").eq(0).text().split(" ")[3],
  		   	   "harvest_desc"         :  obj.find("p").eq(0).text().split(" ").slice(0,3).join(" "),
  		   	   "harvest_phone"        :  obj.find("p").eq(1).text(),
  		   	   "sku_id"               :	 sessionS.cookie.get("sku_id"),
		  	   "grade_id"             :  sessionS.cookie.get("grade_id"),
		  	   "card_name"            :  cardObj.find("span").text(),
		  	   "card_num"             :  cardObj.find("p").eq(0).text(),
		  	   "order_total"          :  $("#order_total").text(),
		  	   "freight_money"        :  $("#freight_money").attr("data-freight_money"),
		  	   "coupon_id"            :  $("#privilegeBtn").find("option:selected").attr("data-coupon_id")

			 };

		} else {
			
			 data = {
  		   	   "user_id"              :  sessionS.cookie.get("encrypt_id"),
  		   	   "harvest_person"       :  obj.find("span").text(),
  		   	   "harvest_information"  :  obj.find("p").eq(0).text().split(" ")[3],
  		   	   "harvest_desc"         :  obj.find("p").eq(0).text().split(" ").slice(0,3).join(" "),
  		   	   "harvest_phone"        :  obj.find("p").eq(1).text(),
  		   	   "sku_id"               :	 sessionS.cookie.get("sku_id"),
		  	   "grade_id"             :  sessionS.cookie.get("grade_id"),
		  	   "card_name"            :  cardObj.find("span").text(),
		  	   "card_num"             :  cardObj.find("p").eq(0).text(),
		  	   "order_total"          :  $("#order_total").text(),
		  	   "freight_money"        :  $("#freight_money").attr("data-freight_money"),
		  	   "coupon_id"            :  $("#privilegeBtn").find("option:selected").attr("data-coupon_id"),
               "H5"                   :  1
  		   };
			
		};
           
  		$.ajax({
			type: "post",
			url: realm.Name + "commit_order",
			data: data,
			dataType: "json",
			success: function(e) {

				if(e.code != "10000"){
					$("html,body").scrollTop(0);
					layer.msg(e.msg, {time:1000});
				}else if(e.code == "10000"){
					sessionS.cookie.set("order_sn",e.data.order_sn,1);
					sessionS.cookie.set("total_fee",$("#order_total").text(),1);
					window.location.href = "payment.html";
				};

			}
		});
  		   
  		})
  		
  	};
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	order.init();
  	return order;
  })()
