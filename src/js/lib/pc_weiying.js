 
  var pc_weiying = (function(){
  	
  	function pc_weiying(){};
  	
  	
  	
  	pc_weiying.init = function () {
  		
  		this.ajaxFn();
  		
  	};
  	
  	
  	pc_weiying.ajaxFn = function () {
  		
  		
  		$.ajax({

  			url:realm.Name +"receivables_accout",
  			type:"post",
  			data:{
  			   user_id:sessionS.cookie.get("encrypt_id")
  			},
  			dataType:"json",
  			success:function(e){
  				
  				if(e.code == "10000"){
  					pc_weiying.bindHTML(e.data);
  					pc_weiying.bindClick();
  					pc_weiying.weiXBtn();
  					pc_weiying.zhifXBtn();
  					pc_weiying.unbundingFn();
  				};
  				
  			}
  		});
  		
  	};
  	
  	pc_weiying.bindHTML = function (data) {
  		
  		if(data.is_accout != 0){
  			//、、、判断用户绑定的类型
  			$.each(data.user_accout, function(i,v) {
  				if(v.accout_type == 1){
  					$(".zhifu_band").attr("data-accout_id",v.accout_id);
  					$(".zhifu_band").find("span").text(v.accout_phone);
  					$(".zhifu_band").find('button').show();
  					$(".zhifu_band").removeClass("active");
  				}else if(v.accout_type == 2){
                    $(".weixin_band").attr("data-accout_id",v.accout_id)
  					$(".weixin_band").find("span").text(v.accout_name);
  					$(".weixin_band").find('button').show();
  					$(".weixin_band").removeClass("active");
  				}
  			});
  			
  			if(data.user_accout.length == 2){
  				$(".next_weibtn").hide();
  			}
  		}
  		
  	};
  	
  	//、、、点击选择绑定的类型
  	pc_weiying.bindClick = function () {
  		
  		$(".wei_band").on("click","div",function(){
  			if(!$(this).data("accout_id")){
  				$(this).addClass("active").siblings("div").removeClass("active");
  			}
  		})
  		$(".next_weibtn").on("click",function(){
  			var type = $(".wei_band>div.active").attr("data-accout_type");
  			
  			if(type == "2"){
  				$("#bindShow").hide();
  				$("#weiBox").show();
  				$("#weiBox>div").eq(0).show().siblings("div").hide();
  			}else{
  				$("#bindShow").hide();
  				$("#zhiBox").show();
  				$("#zhiBox>div").eq(0).show().siblings("div").hide();
  			}
  		})
  	};
  	
  	pc_weiying.weiXBtn = function () {
  		var name;
  		$(".wei_nextbtn").on("click",function(){
  		
        	name = $("#weiXname").val();
        	if(name.trim() == ""){
        		$("#wei_hint").css("opacity","1");
        		return false;
        	}
  			$("#weiBox>div").eq(1).show().siblings("div").hide();
  		});
  		$(".wei_imgbtn_next").on("click",function(){
  			var imgsrc = $(".shili").find("img").attr("src");
  			if(imgsrc == "imgs/weiying_00.png"){
  				$("#wei_img_hint").css("opacity","1");
  				return false;
  			}
  			$("#weiImg").attr("src",imgsrc);
  			$("#addweiName").text(name);
  			$("#weiBox>div").eq(2).show().siblings("div").hide();
  		});
  		$(".wei_prevbtn").on("click",function(){
  			$("#bindShow").show();
  			$("#weiBox>div").eq(0).hide();
  		})
  		$(".wei_imgbtn_prev").on("click",function(){
  			$("#wei_hint").css("opacity","0");
  			$("#weiBox>div").eq(0).show();
  			$("#weiBox>div").eq(1).hide();
  		})	
  	}
  	
	pc_weiying.zhifXBtn = function () {
		var name;
		var phoneText;
		var reg=/^1[34578]\d{9}$/;
  		$(".zhif_nextbtn").on("click",function(){
  			name = $("#zhifName").val();
  			if(name.trim() == ""){
        		$("#zhif_hint").css("opacity","1");
        		return false;
        	}
  			$("#zhiBox>div").eq(1).show().siblings("div").hide();
  		});
  		$(".zhi_phone_nextbtn").on("click",function(){
  		    phoneText = $("#phoneText").val();
  		    if(phoneText.trim() == ""){
        		$("#zhif_phone_hint").css("opacity","1");
        		return false;
        	}
  		    if(!reg.test(phoneText)){
        		$("#zhif_phone_hint").css("opacity","1");
        		$("#zhif_phone_hint").text("手机号格式不正确");
        		return false;
        	}
  			$("#addzhiFName").text(name);
  			$("#addzhiFPhone").text(phoneText);
  			$("#zhiBox>div").eq(2).show().siblings("div").hide();
  		});
  		$(".zhif_prevbtn").on("click",function(){
  			$("#bindShow").show();
  			$("#zhiBox>div").eq(0).hide();
  		})
  		$(".wzhi_phone_prevbtn").on("click",function(){
  			$("#zhif_phone_hint").css("opacity","0");
  			$("#zhiBox>div").eq(0).show();
  			$("#zhiBox>div").eq(1).hide();
  		})	
  		
  		$(".zhi_bandbtn").on("click",function(){
  			
  			$.ajax({
  				type:"post",
  				url:realm.Name +"binding_accout",
  				data:{
  					user_id:sessionS.cookie.get("encrypt_id"),
  					accout_name:name,
  					accout_phone:phoneText
  				},
  				dataType:"json",
  				success:function(e){
  					if(e.code == "10000"){
  					window.location.reload();
  				   }
  				}
  			});
  			
  		})
	};
  	pc_weiying.weiXAjax = function (src) {
  		
  		$.ajax({
  			type:"post",
  			url:realm.Name +"binding_accout",
  			data:{
  				user_id:sessionS.cookie.get("encrypt_id"),
  				accout_name:$("#addweiName").text(),
  				accout_code:src
  				
  			},
  			dataType:"json",
  			success:function(e){
  				if(e.code == "10000"){
  					window.location.reload();
  				}
  			}
  		});
  		
  	};
  	pc_weiying.unbundingFn = function () {
  		
  		$(".unbunding").on("click",function(){
  			var accout_id = $(this).parent().attr("data-accout_id");
  			var parent = $(this).parent();
  			var that = $(this);
  			$.ajax({
  				type:"post",
  				url:realm.Name +"unbunding_accout",
  				data:{
  					user_id:sessionS.cookie.get("encrypt_id"),
  					accout_id:accout_id
  				},
  				dataType:"json",
  				success:function(e){
  					
  					if(e.code == "10000"){
  						that.hide();
  						parent.data("accout_id","false");
  						parent.find('span').text("未绑定");
  						$(".next_weibtn").show();
  						$(".wei_band").on("click","div",function(){
  							if($(this).data("accout_id") == "false"){
  				                 $(this).addClass("active").siblings("div").removeClass("active");
  			                };
  						});
  					};
  					
  				}
  			});
  		})
  		
  	};
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	pc_weiying.init();
  	return pc_weiying;
  })()
