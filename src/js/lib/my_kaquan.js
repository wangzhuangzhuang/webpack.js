 
 var  my_coupon = (function(){
   function my_coupon(){};
   my_coupon.commodity = JSON.parse(sessionS.getItemFns("commodity"));
   my_coupon.user = JSON.parse(sessionS.getItemFns("user"));
   //、、初始化
   my_coupon.init = function (){
   	 this.free_trialAjax();
   };
   //、、page
   my_coupon.page = 0;
   //、、free_trialAjax
   
   my_coupon.free_trialAjax = function (ts){
   	  var that = this;
   	  $.ajax({
   	  	  url:realm.Name+"mycoupon",
   	  	  type:"post",
   	  	  dataType:"json",
   	  	  data:{
   	  	  	user_id : sessionS.cookie.get("encrypt_id"),
   	  	  	   page : that.page
   	  	  },
   	  	  success:function(e){
   	  	  	console.log(e)
   	  	  	if(e.msg == "请求成功"){
   	  	  		that.free_trialHtml(e.data);
   	  	  	
   	  	  	}
   	  	  },
   	  	  error:function(){
   	  	  	alert("数据请求失败！");
   	  	  }
   	  })
   }
   
   //、、、、、、、初始化结构
   my_coupon.free_trialHtml = function (data) {
   	
   	  var that = this;
   	  var str = '';
   	  
   	  $.each(data,  function(i,v) {
   	  	  var date1 = new Date(v.use_start_time*1000);
				Y = date1.getFullYear() + '.';
				M = (date1.getMonth()+1 < 10 ? '0'+(date1.getMonth()+1) : date1.getMonth()+1) + '.';
				D = date1.getDate() ;
			var start_time=Y+M+D;
		  var date2 = new Date(v.use_end_time*1000);	
		        Y2 = date2.getFullYear() + '.';
				M2 = (date2.getMonth()+1 < 10 ? '0'+(date2.getMonth()+1) : date2.getMonth()+1) + '.';
				D2 = date2.getDate();
				var end_time=Y2+M2+D2;
   	  	 str += '<div class="kaquan">'+
					'<div class="cou_num">'+
                 			'<h2>¥</h2>'+
                 			'<h1>'+v.favoured_policy_money+'</h1>'+
                 		'</div>'+
                 		'<div class="cou_result">'+
                 			'全场通用'+
                 		'</div>'+
                 		'<h3><label>使用条件：</label><span>满'+v.use_condition_money+'元可用</span></h3>'+
                 		'<h3><label>使用时间：</label> <span>'+start_time+'-'+end_time+'</span></h3>'+
				'</div>'
   	  });
     
     $(".psd_box").append(str);
     
     //this.lazyload();
   }
    //、、、、、、mui下拉加载更多
  	my_coupon.muiFn = function () {
  	   	  var ts=this;
  	   		mui.init();
	        (function($$) {
	        	var deceleration = mui.os.ios?0.003:0.0009;
	        	$$.ready(function() {
	        		$$.each(document.querySelectorAll('#address_main'),function(index, pullRefreshEl){
                           $$(pullRefreshEl).pullToRefresh({
                           	up:{
                           		callback:function(){
                           				 ts.page++;
                           				 console.log(ts.page)
							      		 ts.free_trialAjax(this);
                           		}
                           	}
                           	
                           })
	        		})
	        	})
	        	
	        })(mui)
  	  }
  	
  	//、、、、、图片懒加载插件   
  	my_coupon.lazyload=function(){
  	   	
  	  $('.samLazyImg').picLazyLoad();
  	   
  	}
   	
   	
   
   
   my_coupon.init();
   return my_coupon;	
   })()
