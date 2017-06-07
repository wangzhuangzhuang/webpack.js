 

  var commonality = (function(){
  	
  	function commonality(){};
  	
  	
  	//、、、、、tab选项卡切换
  	commonality.tabFn = function (option) {
  		
  		var header=option.navBox;//、、、tab选项的头部
  		var classStyle = option.active;//、
  		var incident = option.incident;//、
  		var clickFn =  option.clickFn;
  		
  		header.each(function(){
  			
  			var contetn=$("#"+$(this).data("tab"))//、、内容的盒子
  			
  			$(this).children().on(incident,function(){
  				if($(this).hasClass(classStyle)) return false;
  				var k=$(this).index();//、、下标
  				
  				contetn.children().eq(k).show().siblings().hide();//、、内容盒子显示隐藏
  				
  				$(this).addClass(classStyle).siblings().removeClass(classStyle);
  				clickFn && clickFn($(this));
  			})
  			
  		})
  	}
  	

  	
  	
  	
  	
  	
  	return commonality
  	
  })()
