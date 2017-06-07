var picture = (function() {

	function picture() {};

	picture.index = 1;
	////初始化
	picture.init = function(){
		this.classifyNav();
        this.searchFn();
        this.loginFn();
        this.seekBtn(); 
	};

	//////分类导航
	picture.classifyNav = function() {

			$.ajax({
				url: realm.Name + "sy_cate_show",
				type: "post",
				dataType: "json",
				success: function(e) {
					if(e.code == "10000") {
						picture.classifyNavHTML(e.data);
					}
				}
			});

		}
	//、、、分类的HTML
	picture.classifyNavHTML = function(data) {
		var str = '';
		$.each(data, function(i, v) {
			str += '<li>' +
				'<p>' +
				'<a href="pc_classify.html?p='+v.category_id+'&n='+v.category_name+'" target="_blank">' + v.category_name + '</a>' +
				'</p>' +
				'<p>';
			$.each(v.two_cate[0], function(k, y) {
				str += '<a href="pc_classify.html?category_id='+y.category_id+'&k='+y.category_name+'&p='+v.category_id+'&n='+v.category_name+'" data-category_parent_id="' + y.category_parent_id + '" target="_blank">' + y.category_name + '</a>';
			});
			str += '</p>' +
				'<div class="commodity-style-content">' +
				'<div class="commodity-style-content-top">' +
				'<h1>分类</h1>' +
				'<ol>';
			$.each(v.two_cate[0], function(k, y) {
				str += '<li><a href="pc_classify.html?category_id='+y.category_id+'&k='+y.category_name+'&p='+v.category_id+'&n='+v.category_name+'" data-category_parent_id="' + y.category_parent_id + '" target="_blank">' + y.category_name + '</a></li>';

			});

			str += '</ol>' +
				'</div>' +
				'<div class="commodity-style-content-bottom">' +
				'<h1>品牌</h1>' +
				'<ol>';
			$.each(v.tj_brand[0], function(n, m) {
				str += '<li data-brand_id="' + m.brand_id + '"><a href="preference.html?brand_id='+m.brand_id+'" target="_blank"><img src="' + m.brand_logo_url + '"></a></li>';
			})
			str += '</ol>' +
				'</div>' +
				'</div>' +
				'</li>';
		});

		$("#commodity-style").html(str);
		$("#commodity-style").ready(function(){
			$("#commodity-style").find("a").on("click",function(){
				
			});
		});
		$("#commodity-style").hide();
		picture.hoverFn();
	}

	///鼠标划过显示
	picture.hoverFn = function() {
		var k = 1;
		$("#commodityS").hover(function() {
			$("#commodity-style").show();
			$("#commodity-style>li").each(function() {
   
			$(this).children("p").eq(1).children("a").each(function() {
				       
				var k = 0;
				$(this).prevAll().each(function() {
					k += $(this).outerWidth(true) * 1;
				});
				if(k >= 170){
					$(this).nextAll().remove();
					$(this).prev().remove();
					$(this).remove();
				}

			})

		});
		}, function() {
            $("#commodity-style").hide();
			$("#commodity-style>li>div").hide()
		});
		var m = 1;
		$("#commodity-style>li").hover(function() {
			var that = $(this);
			that.children("div").mousemove(function() {
				m = 0;
				that.addClass("hoverStyle").siblings().removeClass("hoverStyle");
			
			})
			setTimeout(function() {
				if(m == 0) return false;
				that.addClass("hoverStyle").siblings().removeClass("hoverStyle")
				that.children("div").show();
				that.siblings().children("div").hide()
				
				
			},150)
		}, function() {
			m = 1;
			$(this).removeClass("hoverStyle")
		})
	};
    //、、、、时间转变
    picture.getNowFormatDate = function(tiem) {
		    var date = new Date(time);
		    var seperator1 = "-";
		    var seperator2 = ":";
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		            + " " + date.getHours() + seperator2 + date.getMinutes()
		            + seperator2 + date.getSeconds();
		    return currentdate;
    };
    //、、、、判断手机格式是否正确
 	picture.phoneFormat = function (obj){
 		var phone = obj.val();
 		var reg=/^1[34578]\d{9}$/;
 		if(phone.trim() == ""){
 			$("#prompt").show();
 			$("#prompt").text("手机不能为空");
           return false;
 		}else if(!reg.test(phone)){
 			$("#prompt").show();
 			$("#prompt").text("手机号格式不正确");
           return false;
 		}else{
 			return true;
 		}
 	}
 	picture.NameFn = function (obj){
 
 		var Name = obj.val();
 		if(Name.trim() == ""){
            $("#prompt").show();
 			$("#prompt").text("姓名不能为空");
           return false;
 		}else{
 			return true;
 		}
 	};
 	picture.identificationFN = function (obj){
 		 var Text = obj.val();
 		 var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
 		 if(Text.trim() == ""){
 		 	$("#prompt").show();
 			$("#prompt").text("身份证不能为空");
 		 
           return false;
 		}else if(!reg.test(Text)){
 			$("#prompt").show();
 			$("#prompt").text("身份证格式不正确");
           return false;
 		}else{
 			return true;
 		}
 	};
	
	//、、、搜索
	picture.searchFn = function () {
		$(document).on("click",function(e){
			e.stopPropagation();
			$("#searchResult-list").hide();
		})
		$("#searchInp").on("input",function(e){
			e.stopPropagation();
			var texts = $(this).val();
			var that = $(this);
			$.ajax({
				type:"post",
				url:realm.Name + "sy_ssy",
				data:{
					seachtext:texts
				},
				dataType:"json",
				success:function(e){
					
					if(e.code == "10000"){
						$(".searchResult").show();
						var str  = "";
						$.each(e.data, function(i,v) {
							str += '<li data-key_id="'+v.key_id+'" data-type="'+v.type+'"><span>'+v.name+'</span></li>'
						});
						$("#searchResult-list").html(str);
						$("#searchResult-list").show();
						$("#searchResult-list").ready(function(){
							$("#searchResult-list").on("click","li",function(){
								var Ktext  = $(this).find("span").text();
								that.val(Ktext);
							    var Dtype = $(this).data("type");
							    if(Dtype == 1){
							    	window.location.href = "hotword.html?K="+Ktext;
							    }else if(Dtype == 2){
							    	var brand_id = $(this).data("key_id");
							    	window.location.href = "preference.html?brand_id="+brand_id;
							    }else if(Dtype == 3){
							    	var brand_id = $(this).data("key_id");
							    	window.location.href = "details.html?goods_id="+brand_id;
							    };
								$("#searchResult-list").html("");
							})
						})
					}else{
						$("#searchResult-list").html("");
					}
				}
			});
			
			
		});
		
	};
	
	
	//、、、、获取地址参数
	picture.GetQueryString = function(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
	};
	picture.GetQueryString2 = function(name){
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
	};
	
	
	//、、、判断用户受否登录
	picture.loginFn = function () {
		
		var login = sessionS.cookie.get("encrypt_id");
		
		if(!login){
			$(".hrefB").on("click",function(){
				window.location.href = "pc_login.html";
			});
		}else{
			$("#loginBtn").hide();
			$('#reginBtn').hide();
			$(".Tuser_name").text(sessionS.cookie.get("user_nickname"));
			$(".cartAmount").text("("+sessionS.cookie.get("cart_num")+")");
		}
		
	};
	picture.loginClick = function (ts) {
		var login = sessionS.cookie.get("encrypt_id");
		if(!login){
			window.location.href = 'pc_login.html';
		}else{
			$.ajax({
  			type:"post",
  			url:realm.Name +"micro_homepage",
  			data:{
  				user_id:sessionS.cookie.get("encrypt_id")
  			},
  			dataType:"json",
  			success:function(e){
  				if(e.code == "10000"){
  					if(e.data.is_micro == 1){
  					   sessionS.cookie.set("balance_money",e.data.balance_money,1);
  					   sessionS.cookie.set("card_num",e.data.card_num,1);
  					   sessionS.cookie.set("card_name",e.data.card_name,1);
  					   sessionS.cookie.set("isbang",e.data.isbang,1);
  					   window.location.href = "wei_detail.html";
  					}else{
  					   window.location.href = "wei_login.html";
  					}
  				};
  			}
  		    });
			
		};
	};
	
	//、、、点击搜索
	picture.seekBtn = function () {
		
		$("#seekBtn").on('click',function(){
			var searchInp = $("#searchInp").val();
			if(searchInp.trim() == "") return false;
			
			window.open("hotword.html?k="+searchInp+"");
		})
		
	}
	
	//、、、商品的HTML结构 
	picture.commodityHTML = function (data) {
		var str = '';
		 $.each(data, function(j, v) {
			str += "<a href='details.html?goods_id="+v.goods_id+"' class='spStyle' data-goods_id='" + v.goods_id + "' target='_blank'>" +
				"<dl>" +
				"<dt>" +
				"<img src='" + v.goods_main_url + "' style='opacity:0'>" +
				"</dt>" +
				"<dd>" +
				"<h1>" + v.goods_name + "</h1>" +
				"<p class='original'>" + v.pc_price + "<span>" + v.market_price + "</span></p>" +
				"</dd>" +
				"</dl>" +
				"</a>"

		});
		
		return str;
		
	}
	
	//、、、添加地址
	picture.saveSite = function () {
  		
  		$(".wzconfirm_btn").on("click",function(){
  			
  			var ajaxurl = "";
  			var data = null ;
  			var harvest_person = $(this).parent().parent().find(".harvest_person").val();
  			var harvest_phone  = $(this).parent().parent().find(".harvest_phone").val();
  			var harvest_information = "";
  			var harvest_desc = ""
  			$(this).parent().parent().find("select").each(function(){
  				harvest_desc += $(this).val()+" ";
  			});
  			harvest_information = $(this).parent().parent().find(".particular").val();
  			var strarr = harvest_desc.split(" ");
  			var bool = true;
  		    
 
  			
  			if(harvest_person.trim() == ""){
  				alert("用户名不能为空");
  				return false;
  			}else if(harvest_phone.trim() == ""){
  				alert('电话不能为空');
  				return false;
  			}else if(strarr[0] == "省" || strarr[1] == "市" || strarr[2] == "区" || harvest_information == " "){
  				alert("地址不完整");
  				return false;
  			};
  			var harvest_status;
  			if($(this).parent().parent().find("input[type=checkbox]").is(":checked")){
  				harvest_status = 1;
  			}else{
  				harvest_status = 0;
  			};
  			if($(".add_dress").attr("data-clickStyle") == 1){
  				  ajaxurl = "add_address";
  				  data = {
			  			user_id            : sessionS.cookie.get("encrypt_id"),
			  			harvest_desc       : harvest_desc,
			  			harvest_information: harvest_information,
			  			harvest_person     : harvest_person,
			  			harvest_phone      : harvest_phone,
			  			harvest_status     : harvest_status
	  		      };
  			}else{
  				  ajaxurl = "update_address";
  				  data = {
			  			user_id            : sessionS.cookie.get("encrypt_id"),
			  			harvest_desc       : harvest_desc,
			  			harvest_information: harvest_information,
			  			harvest_person     : harvest_person,
			  			harvest_phone      : harvest_phone,
			  			harvest_status     : harvest_status,
			  			harvest_id         : $(".add_dress").attr("data-harvest_id")
	  		     };
  			}
  	
  			$.ajax({
	  			
	  			url:realm.Name+ajaxurl,
	  			type:"post",
	  			dataType:"json",
	  			data:data,
	  			success:function(e){
	  				
	  				if(e.code == "10000"){
	  					window.location.reload();
	  				}
	  				
	  			}
	  		});
  			
  		})
  		
  	};
  	picture.collectFn = function (user_id,id,fn) {
  		$.ajax({
    		type:"post",
    		url:realm.Name+"collect_goods",
    		data:{
    			user_id : user_id,
    			goods_id : id
    		},
    		dataType:"json",
    		success:function(e){
	    		 if(e.code == "10000"){
	    		 	fn(e.data)
	    	    };
    		}
    	});
  		
  	}
  	
	picture.init();
	return picture;
})()
