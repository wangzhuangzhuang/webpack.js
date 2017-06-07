
  var add_card = (function(){
  	
  	 function add_card(){};
  	 add_card.user = sessionS.cookie.get("encrypt_id");
   	 //add_card.commodity = JSON.parse(sessionS.getItem("commodity"));
  	 //、、、、、初始化
  	add_card.init = function (){
  		this.identityAjax();
  	};
  	//、、、、、            获取身份证信息
  	
  	add_card.identityAjax = function (){
  		 
  		var  that = this;
  		$.ajax({
  			url:realm.Name+"user_card",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id:that.user
  			},
  			success:function(e){
  				console.log(e)
  				if( e.msg == "请求成功"){
  					console.log(e.data)
  					that.free_trialHtml(e.data);
  				}else if(e.code == "-10015"){
  					$(".idcard_list").hide();
  				}
  			},
  			error:function(e){
  				alert("请求失败！");
  			}
  		});
  	}
  	
  	//、、、、、、、创建结构
   add_card.free_trialHtml = function (data) {
   	
   	  var that = this;
   	  var str = '';
   	  $.each(data, function(i,v) {
   	  	
   	  	 str +=' <ol class="addressList-con" data-card_id="'+v.card_id+'" data-user_id="'+v.user_id+'">'+
						'<li>'+v.card_name+'</li>'+
						'<li>'+v.card_num+'</li>'+
						'<li><span><a href="javascript:;" class="compileBtn">编辑</a></span>|<label><a href="javascript:;" class="deleteBtn">删除</a></label></li>'+
					'</ol>'
   	  });
     
     $("#user_cardnum").append(str);
     $(document).ready(function(){
  			that.removeIdentity();
  			that.compileIdentity();
  		   if($("#user_cardnum ol").length == 0){
  		   	$("#user_cardnum").hide();
  		   }
  		})
  		
   }
  	 //、、、、、、保存
  	 add_card.saveFn = function (src1,src2){
  	 	  var that = this;
  	 		var card_name = $("#add_name").val();
  	 		var card_num = $("#add_number").val();
  	 		var data = null;
  	 		var ajaxurl = "";
  	 		 if($("#add_idcard").attr("data-card_id")){
  	 		 	ajaxurl = realm.Name+"update_card";
  		 	  data = {
		  		 		user_id : that.user,
		  		 		card_name:card_name,
		  		 		card_num:card_num,
		  		 		card_just_url:src1,
		  		 		card_back_url:src2,
		  		 		card_id:$("#add_idcard").attr("data-card_id")
  		 	  };
  	 		 	  
  	 		 }else{
  	 		 	  ajaxurl = realm.Name+"add_card";
  	 		 	  data = {
	  			     user_id    : that.user,
	  			     card_name  : card_name,
	  			     card_num  : card_num ,
	  			     card_just_url   : src1,
	  			     card_back_url   : src2
	  		    }
  	 		 }
  	 	     
  	 	   $.ajax({
	  	 	   	url:ajaxurl,
	  	 	   	type:"post",
	  	 	   	dataType:"json",
	  	 	   	data:data,
	  	 	   	success:function(e){
	  	 	   		console.log(e);
	  	 	   		 if(e.code == "10000"){
	  	 	   		 	 location.reload() ;
	  	 	   		 }else if(e.code == "-10066"){
	  	 	   		 	 $("#sec1").html("");
	  	 	   		 	 $("#sec2").html("");
	  	 	   		 }
	  	 	   		
	  	 	   	}
  	 	   });
  	
  	 	
  	 	
  	 
  	 	
  	 }
  	 
  	
  	function pan_name(){
  		     if($("#add_name").val()==""){
	  	 	   		alert("请填写姓名");
	  	 	   		$("#add_name").focus();
	  	 	   	return false;
	  	 	   }
  		     var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
	  	 	 if($("#add_number").val()==""){
	  	 	   		 alert("请填写身份证");
	  	 	   		 $("#add_number").focus();
	  	 	   	return false;
	  	 	   	}
	  	 	 if(!reg.test($("#add_number").val())){
	  	 	 	alert("身份证格式不正确！");
	  	 	 	$("#add_number").focus();
	  	 	 	return false;
	  	 	 }
	  	 	 return true;
  	}
  //、、、、、、、、点击删除身份证
  	 
  	 add_card.removeIdentity = function () {
  	         var ts = this;
  	 	  $("#user_cardnum").on("click",".deleteBtn",function(e){
  	 	  	   //console.log(sessionS.removeItemFns())

  	 	  	   e.preventDefault();
  	 	  	   e.stopPropagation();
  	 	  	   //var locCard_id  = ts.commodity.user_card_id;
  	 	  	   var that = $(this);
  	 	  	   var card_id = $(this).parents(".addressList-con").attr("data-card_id");
  	 	  	   //console.log(locCard_id)
  	 	  	   //console.log(card_id)

				layer.confirm('确定删除该身份证？', {
						className: "aaa",
						btn: ['确定', '取消'] //按钮
					}, function() {
		
						$.ajax({
						       	  url:realm.Name+"del_card",
						       	  type:"post",
						       	  dataType:"json",
						       	  async:true, 
						       	  data:{
						       			user_id:ts.user,
						       			card_id:card_id
						       		},
						       		success:function(e){
						       			console.log(e.msg);
						       			 if(e.msg == "删除成功"){
						       			 	/*if(locCard_id == card_id && locCard_id){
						       			 	    //console.log(ts.commodity)
							       			 	delete ts.commodity.user_card_id;
							       			 	delete ts.commodity.user_Text;
							       			 	delete ts.commodity.user_card;
							       			 	//console.log(ts.commodity)
									    	    sessionS.setItemFns("commodity",JSON.stringify(ts.commodity));
						    	            }*/
						       			 	  window.location.reload();
						       			 	  
						       			 }
						       		}
						       });

			});
								       				            
  	 	  })
  	 	
  	 }
  	 
  	 
  	 
     //、、、、点击编辑
     
     add_card.compileIdentity = function () {
     	    var that = this;
     	   $("#user_cardnum .compileBtn").off("click");
     	   
     	   $("#user_cardnum .compileBtn").on("click",function(){
     	   	  var  user_card_id = $(this).parents(".addressList-con").attr("data-card_id");
     	   	  $("#add_idcard").attr("data-k",1);
     	   	  $("#add_idcard").attr("data-card_id",user_card_id);
     	   	  //that.commodity.user_card_id = user_card_id;
     	   	  //that.commodity.change_card_id  = user_card_id;
     	   	  //sessionS.setItemFns("commodity",JSON.stringify(that.commodity));
     	   	  $.ajax({
	  	 	   	url:realm.Name+"select_old_card",
	  	 	   	type:"post",
	  	 	   	dataType:"json",
	  	 	   	data:{
	  	 	   		user_id : that.user,
	  	 	   		card_id : user_card_id
	  	 	   	},
	  	 	   	success:function(e){
	  	 	   		console.log(e);
	  	 	   		//if(e.code == "10000"){
	  	 	    	$.each(e, function(i,v) {
	  	 	   		  $("#add_name").val(v.card_name);
	  	 		      $("#add_number").val(v.card_num);
	  	 		      $("#sec1").html("<img src='"+v.card_just_url+"'>");
	  	 		      $("#sec2").html("<img src='"+v.card_back_url+"'>"); 
	  	 		      $(this).parents(".addressList-con").attr("data-card_id",v.card_id);
	  	 		      $(this).parents(".addressList-con").attr("data-user_id",v.user_id);
	  	 		     }) 
	  	 		     that.saveFn_bian(user_card_id);
	  	 	   	//	}
	  	 	   	  
	  	 	   	}
  	 	   });
  	 	   
     	   	
     	   });
     	
     }	
  	 //、、、、、、编辑保存
  	 add_card.saveFn_bian = function (user_card_id) {
  	 	var that = this;
  	 	$(".confirm_btn").click(function(){
  	 		var card_name = $("#add_name").val();
  	 		var card_num = $("#add_number").val();
  	 		var src1 = $("#imghead").attr("src");
  	 		var src2 = $("#imghead_02").attr("src");
  	 	  var data = {
	  			     user_id    : that.user,
	  			     card_id    : user_card_id, 
	  			     card_name  : card_name,
	  			      card_num  : card_num ,
	  			card_just_url   : src1,
	  			card_back_url   : src2
	  		}
  	 	   $.ajax({
	  	 	   	url:realm.Name+"update_card",
	  	 	   	type:"post",
	  	 	   	dataType:"json",
	  	 	   	data:data,
	  	 	   	success:function(e){
	  	 	   		console.log(e.msg);
	  	 	   		if(!pan_name()) return false;
	  	 	   		 if(e.msg == "修改成功"){
	  	 	   		 	 location.reload() ;
	  	 	   		 } 	
	  	 	   		
	  	 	   	}
  	 	   });
  	
  	 	})
  	 	
  	 
  	 	
  	 }
  	 
  	 
  
  	add_card.init();
  	return add_card;
  })()
