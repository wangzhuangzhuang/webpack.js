 
  var wei_cash = (function(){
  	
  	function wei_cash(){};
  	
  	
  	
  	wei_cash.init = function () {
  		this.ajaxFn();
  		this.dataBackfill();
  		this.verification();
  		this.countDown()
  	}
  	
  	
  	wei_cash.ajaxFn = function () {
  		
  		
  		$.ajax({
  			type:"post",
  			url:realm.Name +"withdrawals",
  			data:{
  				user_id : sessionS.cookie.get("encrypt_id")
  			},
  			dataType:"json",
  			success:function(e){
  				if(e.code == "10000"){
  					if(e.data.is_accout == 0){
  						window.location.href = "pc_weiying.html";
  					}else{
  						$(".wrap").show();
  					}
  					$.each(e.data.user_accout, function(i,v) {
  					
  					   if(v.accout_type == "1"){
  					   	$("#zhi_cash").show();
  					   	    
  					   }else if(v.accout_type == "2"){
  					       $("#wei_cash").show();
  					   }
  					});
  				}
  			}
  			
  		});
  		
  		
  	}
  	wei_cash.dataBackfill = function () {
  		
  		var balance_money = sessionS.cookie.get("balance_money");
  		var deposit;
  		var procedure;
  		$("#balance_money").text(balance_money);
  		
  		$("#deposit").on("input",function(){
  			var k = $(this).val()*1;
  			if(k>balance_money){
  			   $(this).val(balance_money);
  			};
            var l = Math.round((k*0.001)*100)/100 ;
                l = l.toFixed(2);
                $("#procedure").text(l);
  		});
  		
  		$("#cash_btn").on('click',function(){
  		    var len = $(".wei_cash_01").find("input:checked").length;
  		    var deposit = $("#deposit").val();
  		    if(len == 0){
  		    	alert('请选择收款方');
  		    	return false;
  		    };
  		    if(deposit<100){
  		    	alert("出入金额必须大于100");
  		    	return false;
  		    };
  		    $(".wei_cash_01").hide();
  		    $('.concrete_psd_02 ').show();
  		})
  		
  	};
  	
  	
  	wei_cash.verification = function () {
  		
  		$("#user_phone").text(sessionS.cookie.get("user_phone"));
  		$("#wei_cash_prev").on("click",function(){
  			$(".wei_cash_01").show();
  		    $('.concrete_psd_02').hide();
  		});
  		
  		$("#wei_cash_btn").on("click",function(){
  			
  			$.ajax({
  				type:"post",
  				url:realm.Name +"wd_request",
  				data:{
  					wd_money:$("#deposit").val(),
  					counter_fee:$("#procedure").text(),
  					check_code:$(".yzm_text").val(),
  					user_id:sessionS.cookie.get("encrypt_id"),
  					user_phone:sessionS.cookie.get("user_phone"),
  					accout_type:$(".wei_cash_01").find("input:checked").attr('data-accout_type')
  				},
  				dataType:"json",
  				success:function(e){
  					if(e.code == "-10008"){
  						$("#wei_cash_yzmText").show();
  						return false;
  					};
  					if(e.code == "10000"){
  						$(".concrete_psd_02").hide();
  						$(".concrete_psd_03").show();
  						$("#finish_cash").on("click",function(){
  							window.location.href = "wei_login.html";
  						});
  					};
  				}
  			});
  			
  		});

  		
  	};
  	//、、、倒计时;
  	wei_cash.countDown = function () {
  		var ts = this;
  		var wait = 60;  
  		$("#wei_cash_yzm").on("click",function(){
            	var that = this;
            	if(wait != 60) return false;
            	$.ajax({
            		url:realm.Name +"send_code",
            		type:"post",
            		dataType:"json",
            		data:{
            	      user_phone:sessionS.cookie.get("user_phone")
            		},
            		success:function(e){
            			console.log(e)
            		   if(e.code == '10000'){
            		   	   time(that);
            		   }
            		},
            		error:function(){
            		  alert(1000);
            	    }
            		
            	});
           });
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
  		
  	}
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	wei_cash.init();
  	return wei_cash;
  })()
