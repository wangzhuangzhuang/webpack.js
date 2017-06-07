
  var user_centre = (function(){
  	
    function  user_centre(){};  
  	
  	
  	
  	 user_centre.init = function () {
  	 	 
  	 	 this.hrefFn();
  	 	
  	 }
  	 
  	 
  	 
  	 
  	 //、、、点击列表跳对应页面
  	
  	user_centre.hrefFn = function () {
  		
  		$("#hrefBox").on("click","a",function(){

             var href = $(this).data("href");
    	      
             $.ajax({
             	url:href,
             	success:function(e){
             		setTimeout(function(){$("#user_detail").html(e)},1000)
             	    
             	}
             });
		
  		})
  		
  		
  		$("#user_order").click();
  		
  	}
  	
  	
  	
  	
  	
  	
  	
  	
  	
  	 user_centre.init()
  	return user_centre;
  })()
