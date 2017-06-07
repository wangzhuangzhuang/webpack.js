;(function($){
	
	
	
	
	 var dataTableFn=function(that,parameter){
	 	////设置默认的数据
	     var defaultS = {
	     	amount:1,////默认显示10条数据
	        index:0//默认显示第一页数据
	     }
	     
	     defaultS=$.extend(true, defaultS, parameter);
	     
	     this.obj = that;
	     this.defaultS=defaultS;
	     this.trLegnth=0;//、、tr的长度
	     this.pagingBtn=0;//、、分页数
	     this.init()
	     
	 }
	 
	 dataTableFn.prototype={
	 	
	 	init:function(){//、、、初始化
	 		
	 		this.defaultHide();
	 		
	 		this.footerHTML();
	 		
	 		this.pagingBtnFn();
	 		
	 		this.BtnStyleFn();
	 		
	 	},
	 	
	 	
	 	defaultHide:function(){//、、默认隐藏
	 		
	 		var tr = this.obj.find("tbody").find("tr");
	 		var prevK = this.defaultS.index*this.defaultS.amount;
	 		var nextK = prevK+this.defaultS.amount*1-1;
	 		this.trLegnth = tr.length;
	 		tr.show();
	 		tr.eq(prevK).prevAll().hide();
	 		tr.eq(nextK).nextAll().hide();
	 		
	 	},
	 	
	 	
	 	footerHTML:function(){//、、创建分页按钮
	 		
         var footerHTML="<div class='pagingfooter'>"+
                        "<div class='pagingfooter-left'>"+
                            '显示<span>1</span>到<span>10</span> 共<span>'+this.trLegnth+'</span>条'+
                         "</div>"+
                        "<div class='pagingfooter-right'>"+
                        "<button href='javascript:;' class='prevBtn'>上一页</button>";
                        
             this.pagingBtn=Math.ceil(this.trLegnth/this.defaultS.amount);
              
             for(var i=1; i <= this.pagingBtn;i++){
             	
             	footerHTML += "<a  href='javascript:;'>"+i+"</a>"
             	
             }
                footerHTML += "<button href='javascript:;' class='nextBtn'>下一页</button></div></div>";
              this.obj.next().remove();
              this.obj.after(footerHTML);
              

         
	 	},
	 	
	 	pagingBtnFn:function(){
	 		var that=this;
	 		$(".pagingfooter-right").find("a").eq(0).addClass("active");
	 		$(".pagingfooter-right").on("click","a",function(){
	 	
	 			$(this).addClass("active").siblings().removeClass("active");
	 			if($(this).text() == "...") return false;
	 			var  k = $(this).index("a");
		 			 that.defaultS.index = k;
		 			 that.defaultHide();
		 	    var p = k*that.defaultS.amount
		 	    var n = k*that.defaultS.amount+that.defaultS.amount;
	 			    if(p == 0){
	 			    	p = 1;
	 			    }
	 			    if( k ==  that.pagingBtn-1){
	 			    	
	 			    	n=that.trLegnth
	 			    }
	 			    $(".pagingfooter-left").find("span").eq(0).text(p);
	 			    $(".pagingfooter-left").find("span").eq(1).text(n);
	 			    that.BtnStyleFn()
	 		})
	 		//、、、向上点击
	 		$(".prevBtn").on("click",function(){
	 			that.BtnStyleFn()
	 			var  obj=$(this).siblings("a.active");
	 			
	 			     if(obj.index('a') == 0) return false;

	 			      obj.prev().click()
	 		})
	 		
	 		//、、、向下点击
	 		$(".nextBtn").on("click",function(){
	 			that.BtnStyleFn()
	 			var  obj=$(this).siblings("a.active");
	 			
	 			     if(obj.index('a') == that.pagingBtn-1) return false;

	 			      obj.next().click()
	 		})
	 		
	 		
	 		
	 	},
	 	
	 	BtnStyleFn:function(){
	 	   var obj=$(".pagingfooter-right a.active");
	 	   var texts=obj.text()*1;
	 	    console.log(texts)
	 	    $(".pagingfooter-right a").show();
	 	     $(".pagingfooter-right a").eq(2).text("3");
	 	    if(texts<10){
	 	    	console.log("Assas")
	 	   	  $(".pagingfooter-right a").eq(10).text("...");
	 	   	  $(".pagingfooter-right a").eq(10).nextAll("a").hide();
	 	   	  $(".pagingfooter-right a:last").show();
	 	   	  $(".pagingfooter-right a:last").prev().show();
	 	   	    $(".pagingfooter-right a").eq(57).text("58");
	 	    }else if(texts>=50){
	 	    	$(".pagingfooter-right a").hide();
	 	    	$(".pagingfooter-right a").eq(49).nextAll("a").show();
	 	    	$(".pagingfooter-right a:first").show();
	 	   	    $(".pagingfooter-right a:first").next().show();
	 	   	    $(".pagingfooter-right a:first").next().next().show().text("...")
	 	   	    $(".pagingfooter-right a").eq(10).text("11");
	 	   	      $(".pagingfooter-right a").eq(57).text("58");
	 	    }else{
	 	    	 $(".pagingfooter-right a").hide();
	 	    	 $(".pagingfooter-right a").eq(2).show()
	 	    	 $(".pagingfooter-right a").eq(2).text("...");
	 	    	 $(".pagingfooter-right a:last").prev().prev().show();
	 	    	 $(".pagingfooter-right a:last").prev().prev().text("...");
	 	    	 $(".pagingfooter-right a").eq(10).text("11");
	 	    	 $(".pagingfooter-right a").eq(0).show()
	 	    	 $(".pagingfooter-right a").eq(1).show()
	 	    	 $(".pagingfooter-right a:last").show();
	 	    	 $(".pagingfooter-right a:last").prev().show();
	 	    	 obj.next().show();
	 	    	 obj.next().next().show();
	 	    	 obj.next().next().show();
	 	    	 obj.prev().show();
	 	    	 obj.prev().prev().show();
	 	    	 obj.prev().prev().show();
	 	    	 obj.show();
	 	    	
	 	    }
	 	}
	 	
	 	
	 	
	 	
	 }
	 
	 
	
	
	
	
	
	
	
	
	
	$.fn.dataTable=function(parameter){
		
		return  new dataTableFn($(this),parameter)
		
	}
	
	
	
	
	
})(jQuery)
