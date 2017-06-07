
  var sessionS = (function () {
      function sessionS(){};
    
      sessionS.objs = window.sessionStorage;
      
      
      sessionS.setItemFns = function(name,value){
      	
      	this.objs.setItem(name,value);
      	
      };
      sessionS.getItemFns = function(name){
      	
      	if(!this.objs.getItem(name)){
      		this.objs.setItem(name,JSON.stringify({}));
      	}
      		return  this.objs.getItem(name);
      };
      
      sessionS.removeItemFns = function (name){
      	
        	this.objs.removeItem(name);
        	return 111;
        	
      };
      sessionS.cookie = {
  	 	   //设置cookie方法
		    set:function(key,val,time){
		        var date=new Date(); //获取当前时间
		        var expiresDays=time;  //将date设置为n天以后的时间
		        date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
		        document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
		    },
		    //获取cookie方法
		    get:function(key){/*获取cookie参数*/
		        //获取cookie，并且将获得的cookie格式化，去掉空格字符
		        var getCookie = document.cookie.replace(/[ ]/g,"");
		        //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
		        var arrCookie = getCookie.split(";")  
		        var tips;  //声明变量tips
		        //使用for循环查找cookie中的tips变量
		        for(var i=0;i<arrCookie.length;i++){ 
		        //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
		            var arr=arrCookie[i].split("="); 
		        //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
		            if(key==arr[0]){  
		        //将cookie的值赋给变量tips
		                tips=arr[1]; 
		        //终止for循环遍历        
		                break;   
		            }
		        }
		        return tips;
		    },
		      //删除cookie方法
		      delete:function(key){ 
		         var date = new Date(); //获取当前时间
		         date.setTime(date.getTime()-10000); //将date设置为过去的时间
		         document.cookie = key + "=v; expires =" +date.toGMTString();//设置cookie
		        }
  	 	
  	 	
  	 	
  	 };
      
      sessionS.Handlebarsfn = function (dataId,obj) {
      	
      	  var source   =  $(dataId).html();
  	      var template = Handlebars.compile(source);
  	      var html = template(obj);
      	  return html;
      
      }
      //-----------订单生产时间-----------
    sessionS.time_list=function(now){
		function add0(m){return m<10?'0'+m:m }
		          var   year=now.getFullYear();     
              var   month=now.getMonth()+1;     
              var   date=now.getDate();         
         return  year+"-"+add0(month)+"-"+add0(date); 
	}
    //----------订单支付截止时间-------
   sessionS.time_list2=function(end){
		function add0(m){return m<10?'0'+m:m }    
              var   minute=end.getMinutes();     
              var   second=end.getSeconds();     
         return  add0(minute)+"分钟"+add0(second)+"秒"; 
	}
   //----------订单生成时间-------
   sessionS.time_list3=function(now){
		function add0(m){return m<10?'0'+m:m }
		          var   year=now.getFullYear();     
              var   month=now.getMonth()+1;     
              var   date=now.getDate(); 
              var   hour=now.getHours();     
              var   minute=now.getMinutes();     
              var   second=now.getSeconds();     
         return  year+"-"+add0(month)+"-"+add0(date)+" "+add0(hour)+":"+add0(minute)+":"+add0(second); 
	}
   //------------限时秒杀时间---------------
    
   sessionS.time_list4=function(errand){
		function add0(m){return m<10?'0'+m:m }   
              var dd=Math.floor(errand/84600);
			        var hh=Math.floor((errand-dd*84600)/3600);
			        var mm=Math.floor((errand-dd*84600-hh*3600)/60);
			        var ss=Math.floor((errand-dd*84600-hh*3600-mm*60));
         return add0(hh)+"小时"+add0(mm)+"分"+add0(ss)+"秒"; 
	 }
   sessionS.time_list5=function(now){
		function add0(m){return m<10?'0'+m:m }    
              var   month=now.getMonth()+1;     
              var   date=now.getDate(); 
              var   hour=now.getHours();          
         return add0(month)+"月"+add0(date)+"日"+add0(hour)+"点"; 
	};
	
	sessionS.time_list6=function(errand){
		function add0(m){return m<10?'0'+m:m }   
              var dd=Math.floor(errand/84600);
			        var hh=Math.floor((errand-dd*84600)/3600);
			        var mm=Math.floor((errand-dd*84600-hh*3600)/60);
			        var ss=Math.floor((errand-dd*84600-hh*3600-mm*60));
         return add0(mm)+"分"+add0(ss)+"秒"; 
	};
      
      
      
    return sessionS;
  })();
   var realm  = (function(){ 
   	
     function realm (){}
          //realm.Name = "https://ywdev.youngworld.com.cn/ywapi/server.php/pc/";
          realm.Name = "https://ywapi.youngworld.com.cn/server.php/pc/";
     return realm ;
     
   })()
   
    //身份证上传
		 //图片上传预览    IE是用了滤镜。
        function previewImage(file)
        {
          var MAXWIDTH  = 260; 
          var MAXHEIGHT = 180;
          var div = document.getElementById('preview');
          if (file.files && file.files[0])
          {
              div.innerHTML ='<img id=imghead>';
              var img = document.getElementById('imghead');
              img.onload = function(){
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width  =  rect.width;
                img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
                //img.style.marginTop = rect.top+'px';
                $(".file").css({"background":"none"});
              }
              var reader = new FileReader();
              reader.onload = function(evt){img.src = evt.target.result;}
              reader.readAsDataURL(file.files[0]);
          }
          else //兼容IE
          {
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=imghead>';
            var img = document.getElementById('imghead');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
            div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
          }
        }
         function previewImage2(file)
        {
          var MAXWIDTH  = 260; 
          var MAXHEIGHT = 180;
          var div = document.getElementById('preview_02');
          if (file.files && file.files[0])
          {
              div.innerHTML ='<img id=imghead_02>';
              var img = document.getElementById('imghead_02');
              img.onload = function(){
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width  =  rect.width;
                img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
                //img.style.marginTop = rect.top+'px';
                $(".file_02").css({"background":"none"});
              }
              var reader = new FileReader();
              reader.onload = function(evt){img.src = evt.target.result;}
              reader.readAsDataURL(file.files[0]);
          }
          else //兼容IE
          {
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=imghead_02>';
            var img = document.getElementById('imghead_02');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
            div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
          }
        }
        function clacImgZoomParam( maxWidth, maxHeight, width, height ){
            var param = {top:0, left:0, width:width, height:height};
            if( width>maxWidth || height>maxHeight )
            {
                rateWidth = width / maxWidth;
                rateHeight = height / maxHeight;
                 
                if( rateWidth > rateHeight )
                {
                    param.width =  maxWidth;
                    param.height = Math.round(height / rateWidth);
                }else
                {
                    param.width = Math.round(width / rateHeight);
                    param.height = maxHeight;
                }
            }
             
            param.left = Math.round((maxWidth - param.width) / 2);
            param.top = Math.round((maxHeight - param.height) / 2);
            return param;
        }
