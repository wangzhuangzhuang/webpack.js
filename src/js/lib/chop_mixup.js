var  free_trial = (function(){
   
   function free_trial(){};
   free_trial.commodity = sessionS.cookie.get("commodity");
   free_trial.user_id = sessionS.cookie.get("encrypt_id");
   //、、初始化
   free_trial.init = function (){
   	
   	 this.free_trialAjax();
   	
   };
   //、、page
   free_trial.page = 0;
   //、、free_trialAjax
   
   free_trial.free_trialAjax = function (ts){
   	  var that = this;
   	  $.ajax({
   	  	  url:realm.Name+"list_togther",
   	  	  type:"post",
   	  	  dataType:"json",
   	  	  data:{
   	  	  	special_id:that.commodity
   	  	  },
   	  	  success:function(e){
   	  	  	console.log(e)
   	  	  	if(e.msg == "请求成功"){
   	  	  		that.free_trialHtml(e.data);
	
   	  	  	}
   	  	  },
   	  	  error:function(){
   	  	  	alert("数据请求失败！")
   	  	  }
   	  })
   }
   
   //、、、、、、、初始化结构
   free_trial.free_trialHtml = function (data) {
   	
   	  var that = this;
   	  var str = '';
   	  /*$("#chop_mixup_banner").css({"background":"url("+data.special_top_url+")","background-size":"100% 100%"});*/
   	  $.each(data, function(i,v) {
   	  	
   	  	 str += '<a href="javascript:;" data-goods_id="'+v.goods_id+'" class="detail_shop">'+
	           		'<dl>'+
	           			'<dt><img src="'+v.grade_main_url+'"/></dt>'+
	           			'<dd>'+
	           				'<h1>'+v.grade_price+'</h1> <span>'+v.prime_price+'</span><small>节省'+v.save_price+'元</small>'+
	           				'<h2>'+v.grade_name+'</h2>'+
	           			'</dd>'+
	           		'</dl>'+
	           	'</a>'
   	  });
     
     $(".chop_mix_list").append(str);
     $(".detail_shop").on("click",function(){
   	  	  			var goods_id = $(this).attr("data-goods_id");
   	  	  			window.open("details.html?goods_id="+goods_id+"");
   	  	  		})
     
   }
    //、、、、、、mui下拉加载更多
  	free_trial.muiFn = function () {
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
  	
 
   free_trial.init();
   return free_trial;	
   })()
