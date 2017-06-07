//密码可见
     $("#eye_close").on("click",function(){
     	//alert($("#pass_word").attr("type"))
     	if($("#eye_close img").eq(0).css("display")=="block"){
     	  $("#eye_close img").eq(0).css("display","none");
     	  $("#eye_close img").eq(1).css("display","block");
     	  $("#pass_word").attr("type","text");
       }else{
       	$("#eye_close img").eq(0).css("display","block");
       	$("#eye_close img").eq(1).css("display","none");
     	  $("#pass_word").attr("type","password");
       } 
     })
     
    //$("input").focus(function(){$(".footer").hide();});