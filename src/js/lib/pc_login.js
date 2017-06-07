var login = (function() {

	function login() {};

	login.init = function() {

		this.read_user();
		this.inputFn();
		this.ajaxFN();
		this.clickFn();
	};

	login.read_user = function() {
		if(document.cookie.indexOf("user_name") == -1) {
			$(".user-phone").val("");
			//$("#pass_word").val("");	
			$("#rember-user").prop("checked", false);
		} else {

			$(".user-phone").val(sessionS.cookie.get("user_name"));
			//$("#pass_word").val(this.cookie.get("user_psd"));
			$("#rember-user").prop("checked", true);
		}

	};

	login.inputFn = function() {

		$("#eye_close")[0].addEventListener("touchstart", function() {
			var prev = $(this).prev();
			var inputStyle = prev.attr("type");
			if(inputStyle == "text") {

				$(this).find("img").eq(1).show().siblings().hide();
				prev.attr("type", "password");
			} else {
				$(this).find("img").eq(0).show().siblings().hide();
				prev.attr("type", "text");
			};
		}, false);

	};

	login.ajaxFN = function() {

		var par = JSON.parse(sessionS.getItemFns("commodity")).par;
		var that = this;
		$(".login-btn").on("click", function() {
			if(!that.same()) return false;
			$(".point").hide();
			var userName = $(".user-phone").val();
			var Mypassword = $("#pass_word").val();

			$.ajax({
				url: realm.Name + "login",
				type: "post",
				dataType: "json",
				data: {
					user_phone: userName,
					user_pwd: Mypassword
				},
				success: function(e) {
					console.log(e);
					var obj = e.data;
					if(e.msg != "登录成功") {
						if(e.code == "-10002") {
							$(".point").show();
							$(".point").html(e.msg);
						}
						if(e.code == "-10000") {
							$(".point").show();
							$(".point").html("登录失败，请重新登录");
						}

					} else {
						
						$(".point").hide();
						sessionS.cookie.set("cart_num",obj.cart_num,10);
						sessionS.cookie.set("user_image",obj.user_image,10);
						sessionS.cookie.set("user_nickname",obj.user_nickname,10);
						sessionS.cookie.set("user_phone",obj.user_phone,10);
						sessionS.cookie.set("encrypt_id",obj.encrypt_id,10);
            
						//判断是否记住用户名
						var user_name = null,
							user_psd = null;
						if($("#rember-user").prop("checked") == true) {
							user_name = $(".user-phone").val();
							//user_psd=$("#pass_word").val();	
							document.cookie = "user_name=" + user_name + "";
							//document.cookie="user_psd="+user_psd+"";
							sessionS.cookie.set("user_name", user_name, 10);
							//that.cookie.set("user_psd",user_psd,10);
						} else {
							sessionS.cookie.delete("user_name");
							//that.cookie.delete("user_psd");
							$("#rember-user").prop("checked", false);
						}
						
						window.location.href = document.referrer;
					};

				}
			});

		});

	}

	login.same = function() {

		var reg = /^1[34578]\d{9}$/;
		if($(".user-phone").val() == "") {
			$(".point").show();
			$(".point").html("请输入手机号码");
			$(".user-phone").focus();
			return false;
		}
		if(!reg.test($(".user-phone").val())) {
			$(".point").show();
			$(".point").html("手机号码格式不正确");
			return false;
		}
		//密码验证
		if($("#pass_word").val() == "") {
			$(".point").show();
			$(".point").html("请输入密码");
			$("#pass_word").focus();
			return false;
		} else if($("#pass_word").val().length < 6) {
			$(".point").show();
			$(".point").html("请输入6-12位字符");
			$("#pass_word").focus();
			return false;
		} else {
			return true;
		}

	};
	login.clickFn = function () {
		var loginBox = $("#loginBox");
		var registerBox = $("#registerBox");
		var textBox = $("#textBox");
		$("#registerBtn").on("click",function(){
			loginBox.hide();
			registerBox.show();
			textBox.show();
		});
		
		$(".loginBtn").on("click",function(){
			loginBox.show();
			registerBox.hide();
		})
		
	}
	login.init();
	return login;
})()