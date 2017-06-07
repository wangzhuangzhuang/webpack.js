
  var wei_login = (function(){
  	function wei_login(){};
  	

  	
  	
  	//、、、、、、初始化
  	wei_login.init = function () {
  		
  		this.ajaxFn();
  		
  	};
  	
  	//、、、、、、调用ajax
  	wei_login.ajaxFn = function () {
  		$.ajax({
  			type:"post",
  			url:realm.Name +"micro_homepage",
  			data:{
  				user_id:sessionS.cookie.get("encrypt_id")
  			},
  			dataType:"json",
  			success:function(e){
  				if(e.code == "10000"){
  					$(".wrap").show();
  					if(e.data.is_micro == 1){
  					   sessionS.cookie.set("balance_money",e.data.balance_money,10);
  					   sessionS.cookie.set("card_num",e.data.card_num,10);
  					   sessionS.cookie.set("card_name",e.data.card_name,10);
  					   sessionS.cookie.set("isbang",e.data.isbang,10);
  					   window.location.href = "wei_detail.html";
  					}else if(e.data.is_micro == 2){
  						$(".apply_wei").text('申请正在审核中');
  					}else if(e.data.is_micro == 3){
  						$(".apply_wei").text('帐号已被冻结请联系客服');
  					}else if(e.data.is_micro == 4){
  						$(".apply_wei").text('申请已被拒绝');
  					}else if(e.data.is_micro == 0){
  						 $("#phone").text(sessionS.cookie.get("user_phone"));
  						 $("#user_Name").text(sessionS.cookie.get("user_nickname"));
  						 $("#user_img").attr("src",sessionS.cookie.get("user_image"));
  						 $(".apply_wei").on("click",function(){
							    	$(".wei_banner").hide();
							 	    $(".wei_regin").show();
		          });
  					};
  				};
  			}
  		});
  		
  	}
  	
  	
  	//、、、提交
  	wei_login.saveFn = function(src1,src2){
  		$.ajax({
  			type:"post",
  			url:realm.Name +"micro_add",
  			data:{
  				user_id:sessionS.cookie.get("encrypt_id"),
  				card_name:$("#add_name").val(),
  				card_num:$("#add_number").val(),
  				card_just_url:src1,
  				card_back_url:src2
  			},
  			dataType:"json",
  			success:function(e){
  				
  				if(e.code == "10000"){
  					$("#wei_suc").show();
  					setTimeout(function(){
  						 window.location.reload();
  					},1500)
  				};
  				
  			},
  			error:function(){
  				
  			}
  		});
  		
  	}
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	wei_login.init();
  	return wei_login;
  })()
