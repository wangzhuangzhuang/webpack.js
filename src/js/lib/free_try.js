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
   	  	  url:realm.Name+"list_free",
   	  	  type:"post",
   	  	  dataType:"json",
   	  	  data:{
   	  	  	special_id : that.commodity
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
   	  /*$(".freeTest").css({"background":"url("+data.special_top_url+")","background-size":"100% 100%"});*/
   	  $.each(data, function(i,v) {
   	  	
   	  	 str += '<div class="textPro" data-goods_id="'+v.goods_id+'">'+
			         '<div class="textPro_img">'+
			            '<img src="'+v.goods_main_url+'" class="samLazyImg"/>'+
			         '</div>'+
			        ' <div class=textProIn>'+
                       ' <ul>'+
                        	'<li class="sp_name">'+v.goods_name+'</li>'+
                            '<li class="textProIn_contro">限量'+v.stock_num+'件</li>'+
                        '</ul>'+
                       ' <ol class="textProIn_box">'+
                        	'<li>'+v.join_num+'人参与</li>'+
                        	'<li class="textProInBox_btn"><a href="#">立即试用</a><span>￥'+v.pc_price+'</span></li>'+
                        '</ol>'+
                     '</div>'+
                  '</div>'
   	  });
     
     $(".testProduces_box").append(str);
     $(".textPro").on("click",function(){
   	  	  			var goods_id = $(this).attr("data-goods_id");
   	  	  			window.open("details.html?goods_id="+goods_id+"");
   	  	  		})
     //this.lazyload();
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
  	
  	//、、、、、图片懒加载插件   
  	free_trial.lazyload=function(){
  	   	
  	  $('.samLazyImg').picLazyLoad();
  	   
  	}


   	
   
   
   free_trial.init();
   return free_trial;	
   })()
