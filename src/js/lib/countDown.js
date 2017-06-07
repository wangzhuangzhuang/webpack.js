;(function(){
	
	/* ------------- 倒计时 ----------------------*/
	var countDownFn=function(that,obj,fn){
	    var size=that.find("li").size();
		var time=null;
		var timeCount=new Date(obj.uptoTime)*1;//截至日期的毫秒数
		    time=setInterval(function(){contTime()},1000)
		timeText();
		function contTime(){
	      
            timeText();  
		}
		
		function timeText(errand){
			var today=new Date()*1;//现在的毫秒数
			var errand=(timeCount-today)/1000;//相差的秒数
			var dd=Math.floor(errand/84600);
			var hh=Math.floor((errand-dd*84600)/3600);
			var mm=Math.floor((errand-dd*84600-hh*3600)/60);
			var ss=Math.floor((errand-dd*84600-hh*3600-mm*60));
			if(size==3){
					if(hh<=0){
						 that.find("li").eq(0).html("");
					}
					if(hh<=0 && mm<=0){
						 that.find("li").eq(1).html("");
					}
					if(errand<=0){
					   if(!fn()) return false;
					   clearInterval(time);
					    fn();
					}
					that.find("li").eq(0).find("span").html(hh)
		            that.find("li").eq(1).find("span").html(mm)
		            that.find("li").eq(2).find("span").html(ss)
           }else if(size==4){
           	       if(dd<=0){
           	       	 that.find("li").eq(0).html("");
           	       }
           	       if(hh<=0 && dd<=0){
						 that.find("li").eq(1).html("");
					}
					if(hh<=0 && mm<=0){
						 that.find("li").eq(2).html("");
					}
					if(errand<=0){
					   if(!fn()) return false;
					   clearInterval(time);
					    fn();
					}
					that.find("li").eq(0).find("span").html(dd)
					that.find("li").eq(1).find("span").html(hh)
		            that.find("li").eq(2).find("span").html(mm)
		            that.find("li").eq(3).find("span").html(ss)
           	
           }
	    }
	}
	
	$.fn.countDown=function(obj,fn){
		
		return new countDownFn($(this),obj,fn)
	
	}
	/* ------------- 倒计时 ----------------------*/
	
	/* ------------- 鼠标点击右键 ----------------------*/
    $.fn.mouseFn = function(classN){
      this.mousedown(function(e){
      	if(e.button != 0) return false;
      	
        $(this).addClass(classN);
        
      })
      
      this.mouseup(function(e){
        $(this).removeClass(classN);
        
      }) 	
    }
    
    /* ------------- 鼠标点击右键 ----------------------*/
	
	
})(jQuery)
