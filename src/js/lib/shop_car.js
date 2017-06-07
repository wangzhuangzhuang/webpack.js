
  var car = (function(){
  	function car(){};
  	
  	car.init = function (){
  		$(".classify-content").html(carTop.HotSaleHTML)
  		$(".assem_sp").html(carTop.carHTML)
  		setTimeout(function(){
  			car.feature();
  			car.calculate();
  			car.deleteClick();
  			car.ClearingFn();
  		})
  		
  	};
  	
  	
  	car.feature = function (){
  		
  		$(".checkAll").on("change",function(){
  			var bool = $(this).prop("checked");
  			$(".have_sp input[type=checkbox]").prop("checked",bool);
  			car.calculate();
  		})
  		
  		$(".warehouse_01").each(function(){
  			$(this).find(".entrepotKed").on("change",function(){
  			    var bool = $(this).prop("checked");
  			    $(this).parent().parent().next().find("input[type=checkbox]").prop("checked",bool);
  			    car.calculate();
  			});
  		})
  		
  		$(".assem_sp input[type=checkbox]").on("change",function(){
  			var clen  = $(this).parents(".car_list").find("input[type=checkbox]").length;
  			var czlen = $(this).parents(".car_list").find("input:checked").length;
  			
  			if(clen == czlen){
  				$(this).parents(".car_list").prev().find("input").prop("checked",true);
  			}else{
  				$(this).parents(".car_list").prev().find("input").prop("checked",false);
  			}
  			var len  = $(".assem_sp input[type=checkbox]").length;
  			var zlen = $(".assem_sp input:checked").length;
  			if(len == zlen){
  				$(".checkAll").prop("checked",true);
  			}else{
  				$(".checkAll").prop("checked",false);
  			};
  			car.calculate();
  		});
  		
  		
  		$(".addBtn").on("click",function(){
  		  var k = $(this).prev().val();
  		  if($(this).parents(".single_sp").length == 1){
  		  	var sku_id = $(this).parents(".single_sp").data("sku_id");
  		  	car.compile("sku_id",sku_id,++k,$(this));
  		  }else{
  		  	var grade_id =  $(this).parents(".duble_sp").data("grade_id");
  		  	car.compile("grade_id",grade_id,++k,$(this))
  		  }
  		  
  		});
  		$(".delBtn").on("click",function(){
  		  var k = $(this).next().val();
  		  if( k == 1) return false;
  		  if($(this).parents(".single_sp").length == 1){
  		  	var sku_id = $(this).parents(".single_sp").data("sku_id");
  		  	car.compile("sku_id",sku_id,--k,$(this));
  		  }else{
  		  	var grade_id =  $(this).parents(".duble_sp").data("grade_id");
  		  	car.compile("grade_id",grade_id,--k,$(this));
  		  }
  		  
  		});
  		
  		$(".inpText").on("change",function(){
  			 var k = $(this).val();
  		   if(k < 1 ){
  		   	  $(this).val("1");
  		   	  k = $(this).val();
  		   }
  		    if($(this).parents(".single_sp").length == 1){
  		  	var sku_id = $(this).parents(".single_sp").data("sku_id");
  		  	car.compile("sku_id",sku_id,k,$(this));
  		    }else{
  		  	var grade_id =  $(this).parents(".duble_sp").data("grade_id");
  		  	car.compile("grade_id",grade_id,k,$(this));
  		   }
  		   
  		})
  	};
  	
  	
  	//、、编辑的
  	car.compile = function (typeName,value,num,obj) {
 
  		 if(typeName  == "sku_id"){
	  		 	   $.ajax({
	  		 	   	type:"post",
	  		 	   	url: realm.Name + "cart_edit",
	  		 	   	data:{
	  		 	   		user_id:carTop.user_id,
	  		 	   		sku_id : value,
	  		 	   		update_num:num
	  		 	   	},
	  		 	   	dataType:"json",
	  		 	    success:function(e){
	  		 	    	if(e.code == "10000"){
	  		 	    		   obj.parent().find("input").val(num);
	  		 	    		   var m = obj.parent().prev().find("span").text();
  		               obj.parent().next().find("span").text(num*m);
  		               car.calculate();
  		               obj.siblings("div").hide();
	  		 	    	}else if(e.code == "-10021"){
	  		 	    	
	  		 	    		   var k = obj.siblings("div").find("span").text();
	  		 	    		   obj.siblings("div").show();
	  		 	    		   obj.parent().find("input").val(k);
	  		 	    		   var m = obj.parent().prev().find("span").text();
  		               obj.parent().next().find("span").text(k*m);
	  		 	    		   car.calculate()
	  		 	    	}else if(e.code == "-10022"){
	  		 	    		  obj.siblings("div").show();
	  		 	    		  obj.parent().find("input").val(1);
	  		 	    		  var m = obj.parent().prev().find("span").text();
  		              obj.parent().next().find("span").text(1*m);
	  		 	    		  car.calculate()
	  		 	    	}
	  		 	    }
  		 	   });
  		 	
  		 }else{
  		 	  
  		 	   $.ajax({
	  		 	   	type:"post",
	  		 	   	url: realm.Name + "cart_edit",
	  		 	   	data:{
	  		 	   		user_id:carTop.user_id,
	  		 	   		grade_id : value,
	  		 	   		update_num:num
	  		 	   	},
	  		 	   	dataType:"json",
	  		 	    success:function(e){
	  		 	    	if(e.code == "10000"){
	  		 	    		   obj.parent().find("input").val(num);
	  		 	    		   var m = obj.parent().prev().find("span").text();
  		               obj.parent().next().find("span").text(num*m);
  		               obj.parents("ul").css("height","49px");
  		               car.calculate();
  		               obj.siblings("div").hide();
	  		 	    	}else if(e.code == "-10021"){
	  		 	    		   var k = obj.siblings("div").find("span").text();
	  		 	    		   obj.siblings("div").show();
	  		 	    		   obj.parent().find("input").val(k);
	  		 	    		   var m = obj.parent().prev().find("span").text();
	  		 	    		   obj.parents("ul").css("height","68px");
  		               obj.parent().next().find("span").text(k*m);
	  		 	    		   car.calculate()
	  		 	    	}else if(e.code == "-10022"){
	  		 	    		    obj.siblings("div").show();
	  		 	    		    obj.parent().find("input").val(1);
	  		 	    		    var m = obj.parent().prev().find("span").text();
  		                obj.parent().next().find("span").text(1*m);
	  		 	    		    car.calculate();
	  		 	    	}
	  		 	    }
  		 	   });
  		 	  
  		 }
  		  
  		
  	};
  	//、、、、计算的样式
  	car.calculate = function () {
  		var Zcost = 0;
  		var spLength = 0;
  		$(".Spcost").each(function(){
  			  if($(this).parent().parent().find("input[type=checkbox]").is(":checked")){
  			  	Zcost += Number($(this).text());
  			  };
  		});
  	  $("#Zcost").html("￥"+Zcost.toFixed(2));
  	  $("#spLength").text($(".car_list input:checked").length);
  	};
  	
  	//、、、点击删除
  	
  	car.deleteClick = function () {
  	
  		  $(".deleteBtn").on("click",function(){
  		  	    var that = $(this);
             	if($(this).parents(".single_sp").length == 1){
			  		  	var sku_id = $(this).parents(".single_sp").data("sku_id");
			  		  	 	layer.confirm('确定删除该商品？', {
				  		  	   	className:"aaa",
										  btn: ['确定','取消'] //按钮
										  }, function(){
										  car.deleteFn("sku_id",sku_id,that);
					 	      });
			  		  
			  		  }else{
			  		  	var grade_id =  $(this).parents(".duble_sp").data("grade_id");
			  		  	 	layer.confirm('确定删除该商品？', {
				  		  	   	className:"aaa",
										  btn: ['确定','取消'] //按钮
										  }, function(){
										  car.deleteFn("grade_id",grade_id,that);
										 
					      	});
			  		  }
  		  	  
  		  });
  		  
  		  
  		  $("#deleteAll").on("click",function(){
  		  	 var sku_id = [];
  		  	 var grade_id = [];
  		  	  $(".single_sp").each(function(){
  		  	  	
  		  	  	if($(this).find("input[type=checkbox]").is(":checked")){
  		  	  		sku_id.push($(this).attr("data-sku_id"));
  		  	  	}
  		  	  	
  		  	  });
  		  	  
  		  	   $(".duble_sp").each(function(){
  		  	  	
  		  	  	if($(this).find("input[type=checkbox]").is(":checked")){
  		  	  		grade_id.push($(this).attr("data-grade_id"));
  		  	  	}
  		  	  	
  		  	  });
  		  	  if(sku_id == 0 && grade_id == 0){
  		  	  	   layer.msg('请选择商品', {time:1000});
  		  	  	   return false;
  		  	  };
  		  	  
  		  	  layer.confirm('确定删除该商品？', {
				  		  	   	className:"aaa",
										  btn: ['确定','取消'] //按钮
										 }, function(){	
			  		  	  $.ajax({
			  		  	  	type:"post",
			  		  	  	url: realm.Name + "cart_del",
			  		  	  	data:{
			  		  	  		user_id:carTop.user_id,
			  		  	  		sku_id:sku_id.toString(),
			  		  	  		grade_id:grade_id.toString()
			  		  	  	},
			  		  	  	dataType:"json",
			  		  	  	success:function(e){
			  		  	  		 window.location.href = 'shop_car.html';
			  		  	  	}
			  		  	  });
  		  	});  
  		  	
  		  });
  		  
  		  
  		  $("#emptyBtn").on("click",function(){
  		  	   var sku_id = [];
  		  	   var grade_id = [];
  		  	   
  		  	   $(".NoAssem_sp_list .duble_sp").each(function(){
  		  	     	grade_id.push($(this).attr("data-grade_id"));
  		  	   });
  		  	   $(".NoAssem_sp_list .single_sp").each(function(){
  		  	     	sku_id.push($(this).attr("data-sku_id"));
  		  	   });
  		  	   $.ajax({
			  		  	  	type:"post",
			  		  	  	url: realm.Name + "cart_del",
			  		  	  	data:{
			  		  	  		user_id:carTop.user_id,
			  		  	  		sku_id:sku_id.toString(),
			  		  	  		grade_id:grade_id.toString()
			  		  	  	},
			  		  	  	dataType:"json",
			  		  	  	success:function(e){
			  		  	  		  layer.msg('清空完成', {time:1000}); 
			  		  	  		  $(".NoAssem_sp_list").remove();
			  		  	  	}
			  		  	  
			  		  	  })
  		  	   
  		  	   
  		  })
  		
  	};
  	
  	car.deleteFn = function (typeName,num,obj) {
  		
  		  if(typeName == "sku_id"){
  		  	
  		  	  $.ajax({
  		  	  	type:"post",
  		  	  	url: realm.Name + "cart_del",
  		  	  	data:{
  		  	  		user_id:carTop.user_id,
  		  	  		sku_id:num
  		  	  	},
  		  	  	dataType:"json",
  		  	  	success:function(e){
  		  	  		if(e.code == "10000"){
  		  	  			 layer.msg('删除成功', {icon: 1});
                  /* if(obj.parents(".assem_sp_list").find(".single_sp").length == 1){
  		  	  			 	  obj.parents(".assem_sp_list").remove();
  		  	  			 }else{
  		  	  			 		obj.parents(".single_sp").remove();
  		  	  			 }*/
  		  	  			if(obj.parents(".car_list").children("div").length == 1){
  		  	  				obj.parents(".assem_sp_list").remove();
  		  	  			}else{
  		  	  				obj.parents(".single_sp").remove();
  		  	  			}
  		  	  			car.calculate()
  		  	  		
  		  	  		
  		  	  			/*if(obj.parents(".car_list").find("div").length == 0){
  		  	  				obj.parents(".car_list").remove();
  		  	  			};
  		  	  			 if(obj.parents(".assem_sp_list").children("div").length == 1){
  		  	  			 	 obj.parents(".assem_sp_list").remove();
  		  	  			 };*/
  		  	  		};
  		  	  	},
  		  	  	error:function(){
  		  	  		
  		  	  	}
  		  	  });
  		  	
  		  }else if(typeName == "grade_id"){
  		  	 
  		  	  $.ajax({
  		  	  	type:"post",
  		  	  	url: realm.Name + "cart_del",
  		  	  	data:{
  		  	  		user_id:carTop.user_id,
  		  	  		grade_id:num
  		  	  	},
  		  	  	dataType:"json",
  		  	  	success:function(e){
  		  	  		if(e.code == "10000"){
  		  	  			 layer.msg('删除成功', {icon: 1});
  		  	  			 if(obj.parents(".car_list").children("div").length == 1){
  		  	  				obj.parents(".assem_sp_list").remove();
  		  	  			}else{
  		  	  				 obj.parents(".duble_sp").remove();
  		  	  			}
  		  	  			car.calculate();
  		  	  			
  		  	  		}
  		  	  	},
  		  	  	error:function(){
  		  	  		
  		  	  	}
  		  	  });
  		  	
  		  };
  		
  	};
 
  	car.ClearingFn = function(){
  		
  		$("#Clearing").on("click",function(){
  			 	 var sku_id = [];
  		  	 var grade_id = [];
  		  	  $(".single_sp").each(function(){
  		  	  	
  		  	  	if($(this).find("input[type=checkbox]").is(":checked")){
  		  	  		sku_id.push($(this).attr("data-sku_id"));
  		  	  	}
  		  	  	
  		  	  });
  		  	  
  		  	   $(".duble_sp").each(function(){
  		  	  	
  		  	  	if($(this).find("input[type=checkbox]").is(":checked")){
  		  	  		grade_id.push($(this).attr("data-grade_id"));
  		  	  	}
  		  	  	
  		  	  });
  		  	  if(sku_id == 0 && grade_id == 0){
  		  	  	   layer.msg('请选择商品', {time:1000});
  		  	  	   return false;
  		  	  };
  		  	  
  		  	  $.ajax({
  		  	  	type:"post",
  		  	  	url: realm.Name + "confirm_order",
  		  	  	data:{
  		  	  		user_id:carTop.user_id,
  		  	  		sku_id:sku_id.toString(),
			  		  	grade_id:grade_id.toString()
  		  	  	},
  		  	  	dataType:"json",
  		  	    success:function(e){
  		  	  		
  		  	  		if(e.code == "10000"){
  		  	  			 sessionS.cookie.set("sku_id",sku_id.toString(),1);
  		  	  			 sessionS.cookie.set("grade_id",grade_id.toString(),1);
  		  	  			 window.location.href = "recipient_address.html";
  		  	  		}else{
  		  	  			 layer.msg(e.msg, {time:1000});
  		  	  		}
  		  	  		
  		  	  	}
  		  	  });
  			 
  		  
  		})
  		
  	};
  	
  	
  	
  	
  	
  	
  	car.init();
  	return car;
  })()
