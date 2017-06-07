 var  whole  = (function(){
 	  function whole (){};
 	
 	
 	//、、、点击判断用户是否登录
 	whole.loginFn = function () {
 		var user = JSON.parse(sessionS.getItemFns("user"));
 		if(user){
 		   return true;
 		}else{
 			window.location.href="login.html";
 			return false;
 		}
 	}
 	//、、、、判断手机格式是否正确
 	whole.phoneFormat = function (phone){
 		var reg=/^1[34578]\d{9}$/;
 		if(phone.trim() == ""){
 		 	layer.open({
			    content: '电话不能为空！'
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
           });
           return false;
 		}else if(!reg.test(phone)){
 			layer.open({
			    content: '手机号码格式不正确！',
			    skin: 'msg',
			    time: 2 //2秒后自动关闭
           });
           return false;
 		}else{
 			return true;
 		}
 	}
 	whole.NameFn = function (Name){
 		if(Name.trim() == ""){
 			layer.open({
			    content: '姓名不能为空！'
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
           });
           return false;
 		}else{
 			return true;
 		}
 	}
 	whole.identificationFN = function (Text){
 		 var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
 		 if(Text.trim() == ""){
 		 	layer.open({
			    content: '身份证不能为空！'
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
           });
           return false;
 		}else if(!reg.test(Text)){
 			layer.open({
			    content: '身份证格式不正确！',
			    skin: 'msg',
			    time: 2 //2秒后自动关闭
           });
           return false;
 		}else{
 			return true;
 		}
 	}
 	
 	whole.weight = function (Text){
 		
 		 if(Text.trim() == ""){
 		 	layer.open({
			    content: '体重不能为空'
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
           });
           return false;
 		}else if(isNaN(Text)){
 			layer.open({
			    content: '只能输入数字'
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
           });
           return false;
 		}else{
 			return true;
 		}
 	}
 	
 	whole.stature = function (Text){
 		
 		 if(Text.trim() == ""){
 		 	layer.open({
			    content: '身高不能为空'
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
           });
           return false;
 		}else if(isNaN(Text)){
 			layer.open({
			    content: '只能输入数字'
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
           });
           return false;
 		}else{
 			return true;
 		}
 	}
 	
 	
 	 return whole ;
 })()
