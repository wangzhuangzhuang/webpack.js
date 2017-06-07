var regin = (function(){
  	
  	  function regin(){};
      
     regin.init = function(){
	  	
	  	   //、、、倒计时
	  	   this.timeFn();
	  	   ////////文本
	  	   this.inputFn();
	  	   ///////
	  	   this.registerFn();//-------提交数据-----------
	  };
      
    /////////////////文本框
     regin.inputFn = function(){
     	$(".agree_go").click(function(){
		 	$(".user-agree").hide();
		 })
     	$("#eye_close").on("touchstart",function(){
        		var prev = $(this).prev();
        		var inputStyle = prev.attr("type");
        		if(inputStyle == "text"){
        			prev.attr("type","password")
        			$(this).find("img").eq(1).show().siblings().hide();
        		}else{
        			prev.attr("type","text");
        			$(this).find("img").eq(0).show().siblings().hide();
        		}
        	})
     };
     

     //--------验证手机号-----------
     regin.test_usernumber=function(){
     	if($(".user-phone2").val()==""){
		       	$(".same_number2").show();
       	    	$(".same_number2").html("请输入手机号码！")
		       	  	return false;
       	   }else{
       	   	var reg=/^1[34578]\d{9}$/;
       	   	if(!reg.test($(".user-phone2").val())){
				 $(".same_number2").show();
       	    	$(".same_number2").html("手机号码格式不正确！")
				 return false;
       	    }
       	   }
       	   return true;
     }
     
     //-------------验证信息--------------
     regin.test_yzm = function(){
         	if($(".user-phone2").val()==""){
		       	  	$(".same_number2").show();
       	    	$(".same_number2").html("请输入手机号码！");
       	    	$(".user-phone2").focus();
		       	  	return false;
       	   }else{
       	   	var reg=/^1[34578]\d{9}$/;
       	   	if(!reg.test($(".user-phone2").val())){
				 $(".same_number2").show();
       	    	$(".same_number2").html("手机号码格式不正确！");
       	    	$(".user-phone2").focus();
				 return false;
       	    }
       	   }
       	   if($("#pass_word2").val()==""){
       	      	   $(".same_number2").show();
       	    	$(".same_number2").html("请输入密码！")
		       	  	$("#pass_word2").focus();
		       	  	return false;
       	      }
       	   if($("#pass_word2").val().length<6){
       	      	$(".same_number2").show();
       	    	$(".same_number2").html("至少输入6位密码！");
       	    	$("#pass_word2").focus();
       	      	return false;
       	      }
       	       //验证码验证
       	     if($("#user-psd").val()==""){
       	    	$(".same_number2").show();
       	    	$(".same_number2").html("请输入验证码！");
       	    	$("#user-psd").focus();
       	    	return false;
       	    }
       	    
       	       //判断用户协议是否选中
       	       if($("#checked_xieyi").prop("checked")==false){
        		$(".agree_xieyi").show();
        		return false;
        	}
	       	return true; 
	       	$(".same_number2").hide();
	        $(".agree_xieyi").hide();
     };
        
     //、、、、、、、、、、、、、、、、、、、、、、、     倒计时
     regin.timeFn = function(){
	  	 var wait = 60; 
	  	 var that1=this;
            $(".test-btn").on("click",function(){
            if(!that1.test_usernumber()) return false;
            if(wait != 60) return false;
            	var that = this;
            	var user_phone = $(".user-phone2").val();
            	//console.log(user_phone);
            	$.ajax({
            		url:realm.Name+"send_code",
            		type:"post",
            		dataType:"json",
            		data:{
            	      user_phone:user_phone
            		},
            		success:function(e){
            			console.log(e)
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
	        }
	        
     };
     
     
     //-------提交数据-----------
     regin.registerFn = function(){
     	var that=this;
     	$(".login-btn").on("click",function(){
     		if(!that.test_yzm()) return false;
	  		var user_phone = $(".user-phone2").val();
	  		var user_psd = $("#pass_word2").val();
	  		var register_code = $("#user-psd").val();
           
            $.ajax({
            	url:realm.Name+"register",
            	type:"post",
            	dataType:"json",
            	data:{
            		user_phone:user_phone,
            		user_pwd:user_psd,
            		register_code:register_code
            	},
            	success:function(e){
            		console.log(e); 
            		console.log(e.code);            	
            		if(e.msg != "注册成功"){
            			if(e.code == "-10007"){
            				$(".same_number2").show();
            				$(".same_number2").html("该手机号已存在，您可以使用此手机号码直接<a href='pc_login.html' style='color:#3F231E'>登录</a>");
            			}
            			if(e.code == "-10008"){
            			   $(".same_number2").show();
       	    	           $(".same_number2").html(e.msg);
            			}
            		}else{
            			var obj = e.data;
            			var user = {			
	    	    	    	user_id :obj.user_id,
	    	    	    	user_image:obj.user_image,
	    	    	    	user_nickname :obj.user_nickname,
	    	    	    	user_phone:obj.user_phone
	    	    	    };
	    	    	    
	    	    	    sessionS.setItemFns("user",JSON.stringify(user));
	    	    	    setTimeout(function(){
	    	    	    	 window.location.href="pc_login.html";
	    	    	    },1000)
            		}
            				
            	},
            	error:function(e){
            		  alert(e.msg);
            	}
            });
	  		   
	  	})
     }
     
     
     
  	regin.init();
  	return regin;
  })()

