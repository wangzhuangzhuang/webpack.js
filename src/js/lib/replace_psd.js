var replace_psd = (function() {
	function replace_psd() {};

	replace_psd.init = function() {
		picture.init();
		$("#commodityS").on("mouseenter", function() {
			$(this).find("ol").show();
		})
		$("#commodityS").on("mouseleave", function() {
			$(this).find("ol").hide();
		})
		replace_psd.clickFn();

	};

	replace_psd.clickFn = function() {

		$(".phone_btn").on("click", function() {
			if(!test_phone()) return false;
			$(".concrete").eq(0).hide();
			$(".concrete").eq(1).show();
			user_phone = $(".concrete").eq(0).find(".user_phone").val();
			str = user_phone.substr(0, 3) + "****" + user_phone.substr(7);
			$(".concrete").eq(1).find(".user_test").html(str);
			
			countdown = $(".concrete").eq(1).find(".phone_yzm").get(0);
			replace_psd.timeFn(countdown);
			$(".phone_yzm").click();
		});

		function test_phone() {
			if($(".user_phone").val() == "") {
				$(".test_point").show();
				$(".test_point").text("请输入手机号码！");
				return false;
			} else {
				var reg = /^1[34578]\d{9}$/;
				if(!reg.test($(".user_phone").val())) {
					$(".test_point").show();
					$(".test_point").text("手机号码格式不正确！");
					return false;
				};
			}
			$(".test_point").hide();
			return true;
		};

	
		
		if($(".user_phone").val() == "") {
			$(".user_phone").on("blur", function() {
				$(".test_point").hide();
			})
		};



		$(".prev_btn").on("click", function() {
			$(".concrete").eq(0).show();
			$(".concrete").eq(1).hide();
			//$(".concrete").eq(1).find(".phone_yzm").html("重新发送(59s)");
			wait = 0;
		})
		$(".next_btn").on("click", function() {
			$(".concrete").eq(2).show();
			$(".concrete").eq(1).hide();
		})

	};
    replace_psd.timeFn = function(that){
	  	 var wait = 60; 
	  	 $(".phone_yzm").on("click",function(){
            if(wait != 60) return false;
            	var user_phone = $(".user_phone").val();
            	//console.log(user_phone);
            	$.ajax({
            		url:realm.Name+"send_code",
            		type:"post",
            		dataType:"json",
            		data:{
            	      user_phone:user_phone
            		},
            		success:function(e){
            		   if(e.code == '10000'){
            		   	  time(that);
            		   }else{
            		   	  alert(e.msg);
            		   }
            		},
            		error:function(){
            		  console.log(e.msg);
            	}
            		
            	});
          }) 
            function time(o) {  
		        if (wait == 0) { 
		            o.removeAttribute("disabled");            
		            o.innerHTML="获取短信验证码";  
		            wait = 60;  
		        } else {  
		            o.setAttribute("disabled", true);  
		            o.innerHTML="重新发送" + wait +"s";  
		            wait--;  
		            setTimeout(function() {  
		                time(o);  
		            },  
		            1000)  
		        }  
	        };
	        
     };
	replace_psd.init();
	return replace_psd;
})()