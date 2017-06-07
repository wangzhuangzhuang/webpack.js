var  file_seat =(function(){
  	 function file_seat(){}
  	//、、、获取本地用户信息
    file_seat.user_id = sessionS.cookie.get("encrypt_id");
    file_seat.return_num = picture.GetQueryString("return_num");
    file_seat.init=function(){
    	this.ajax_file();
    }
    
    file_seat.ajax_file=function(){
    	var that = this;
    	var logistics_num = $("#logistics_num").val();
    	var company = $("#company").val();
      	 $.ajax({
  			url:realm.Name+"add_logistics",
  			type:"post",
  			dataType:"json",
  			data:{
  				user_id : that.user_id,
  		  logistics_num : logistics_num,
  			 return_num : that.return_num,
  				company : company
  			},
  			success:function(e){
  				console.log(e);
  				if( e.code == "10000"){
  					//alert(e.msg);
  					window.location.reload();
  				}	
  			},
  			error:function(e){	
  				alert("请求失败！");
  			}
  		});
    }





file_seat.init();
  	
  	return file_seat;
  })()