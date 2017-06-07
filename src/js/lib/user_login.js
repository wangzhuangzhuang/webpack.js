
 var user_login = (function(){
 	 function user_login(){};
 	var i = sessionS.cookie.get("encrypt_id");
 	user_login.init = function () {
 		var that = this;
 		if(!i){
 			window.location.href = "pc_login.html";
 		}
 		$(document).on("click",".revision_btn",function(){
 			if(!user_login.num_null()) return false;
 			that.update(); 
 		 })
 	};
 	
 	user_login.num_null=function(){
 		if($(".former_psd").val() == ""){
 			$(".pwd_no").show();
 			$(".pwd_no").html("请输入原密码");
            return false;
 		}else if($(".revision_new_psd").val() == "" || $(".revision_new_second").val() == ""){
 			$(".pwd_same").show();
 			$(".pwd_same").html("请输入新密码");
 			return false;
 		}else if($(".revision_new_psd").val() != $(".revision_new_second").val()){
 			$(".pwd_same").show();
 			$(".pwd_same").html("两次密码不一致");
 			return false;
 		}else{
 			$(".pwd_no").hide();
 			$(".pwd_no").html("与原密码不符");
 			$(".pwd_same").hide();
 			$(".pwd_same").html("两次密码不一致");
 			return true;
 		}
 	}
 	
 	user_login.update=function(){
 		var that = this;
 		var old_pwd = $(".former_psd").val();
 		var new_pwd = $(".revision_new_psd").val();
 		var second_pwd = $(".revision_new_second").val();
 		
 		$.ajax({
			type: "post",
			url: realm.Name + "update_pwd",
			data:{
				user_id : i,
				old_pwd : old_pwd,
				new_pwd : new_pwd
			},
			dataType: "json",
			success: function(e) {

              if(e.code == "10000"){

			 			$(".pwd_same").hide();
			 			layer.msg('修改成功', {time:1000});
	
              }
              if(e.code == "-10060"){
              			$(".pwd_no").show();
              			return false;
              		}else{
              			$(".pwd_no").hide();
              			return true;
              		}
				
			}
		});
 	}
 	
 	
 	
 	
 	
 	user_login.init();
 	return user_login;
 })()
