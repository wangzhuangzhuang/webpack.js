
accessid= 'LTAITI1Y0ZqtVVlC';
accesskey= 'lNdOB7RZbj04R6L7TkVR5IFwncqzWZ';
host = 'https://yangwoer.oss-cn-beijing.aliyuncs.com';

g_dirname = ''
g_object_name = ''
g_object_name_type = ''
now = timestamp = Date.parse(new Date()) / 1000; 
var bb;
var aa = function (e){
	bb =e
}

var policyText = {
    "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
};

var policyBase64 = Base64.encode(JSON.stringify(policyText)),
message = policyBase64 
var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
var signature = Crypto.util.bytesToBase64(bytes);

function check_object_radio() {
   
            g_object_name_type = "random_name";
    
}

function get_dirname()
{
    dir = "user_micro";
    if (dir != '' && dir.indexOf('/') != dir.length - 1)
    {
        dir = dir + '/'
    }
    //alert(dir)
    g_dirname = dir
}

function random_string(len) {
　　len = len || 32;
　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
　　var maxPos = chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename)
{
    if (g_object_name_type == 'local_name')
    {
        g_object_name += "${filename}"
    }
    else if (g_object_name_type == 'random_name')
    {
        suffix = get_suffix(filename)
        g_object_name = g_dirname + random_string(10) + suffix
    }
    return ''
}

function get_uploaded_object_name(filename)
{
    if (g_object_name_type == 'local_name')
    {
        tmp_name = g_object_name
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name
    }
    else if(g_object_name_type == 'random_name')
    {
        return g_object_name
    }
}

function set_upload_param(up, filename, ret)
{
    g_object_name = g_dirname;
    if (filename != '') {
        suffix = get_suffix(filename)
        calculate_object_name(filename)
    }
    new_multipart_params = {
        'key' : g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid, 
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'signature': signature,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}

var uploader = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button :'selectfiles', 
	//multi_selection: false,
	container: document.getElementById('container'),
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
    url : 'http://oss.aliyuncs.com',

	init: {
		PostInit: function() {
			document.getElementById('ossfile').innerHTML = '';
			document.getElementById('saveBtn').onclick = function() {
				 var card_name       = $("#add_name").val();
 	 	         var card_num        = $("#add_number").val();
				if(!whole.NameFn(card_name)) return false;
				if(!whole.identificationFN(card_num)) return false;
				var commodity = JSON.parse(sessionS.getItemFns("commodity"));
                var imgArray  = commodity.imgArray;  
                 
                if(imgArray[0] != "" && imgArray[1] != ""){
                	alter_card.saveFn(imgArray[0],imgArray[1]);
                	return false;
                }
                var ls = $(".fileBox .inputBox img").length;
                if(ls == 0){
                	add_card.saveFn("","")
                }else if(ls == 1){
                	layer.open({
						    content: '请选择两张身份证照片',
						    skin: 'msg',
						    time: 2 //2秒后自动关闭
                   });
                }else{
                   set_upload_param(uploader, '', false);
                }
               
                
               return false;
			};
		},

		FilesAdded: function(up, files) {
		  var commodity = JSON.parse(sessionS.getItemFns("commodity"));
          var imgArray  = commodity.imgArray;  
           if(imgArray[0] != "" && imgArray[1] != ""){
              imgArray[0]="";
              sessionS.setItemFns("commodity",JSON.stringify(commodity));
              $("#sec2").html("");
           }
            
		   if($("#sec1>div").length >= 1){
		   	  up.files.shift();
		     
		   	  
		   }
		
			plupload.each(files, function(file) {
		   
			  
				
			});
		},

		BeforeUpload: function(up, file) {
            check_object_radio();
            get_dirname();
            set_upload_param(up, "123"+file.name, true);
        },

		UploadProgress: function(up, file) {
		  
		  
			
			
		},

		FileUploaded: function(up, file, info) {
            if (info.status == 200)
            {
                src1 = "http://yangwoer.oss-cn-beijing.aliyuncs.com/"+get_uploaded_object_name(file.name);
                $("#postfiles2").click();
            }
            
		},

		Error: function(up, err) {
			
		}
	}
});
var uploader2 = new plupload.Uploader({
	runtimes : 'html5,flash,silverlight,html4',
	browse_button :'selectfiles2', 
	container: document.getElementById('container2'),
	flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
    url : 'http://oss.aliyuncs.com',
   
	init: {
		PostInit: function() {
			document.getElementById('ossfile').innerHTML = '';
			document.getElementById('postfiles2').onclick = function() {
			
		    
		    
			
			  set_upload_param(uploader2, '', false);
			
           
            return false;
			};
		},

		FilesAdded: function(up, files) {
		   var commodity = JSON.parse(sessionS.getItemFns("commodity"));
           var imgArray  = commodity.imgArray;  
             if(imgArray[0] != "" && imgArray[1] != ""){
                 imgArray[1]="";
                 sessionS.setItemFns("commodity",JSON.stringify(commodity));
                 $("#sec1").html("");
             }
		   if($("#sec2>div").length >= 1){
		   	  up.files.shift();
		    
		   	  
		   }
		
			plupload.each(files, function(file) {
		       
               
			    
				
				
			});
		},

		BeforeUpload: function(up, file) {
            check_object_radio();
            get_dirname();
            set_upload_param(up, file.name, true);
        },

		UploadProgress: function(up, file) {
		  
		  
			
			
		},

		FileUploaded: function(up, file, info) {
            if (info.status == 200)
            {
             
              src2 = "http://yangwoer.oss-cn-beijing.aliyuncs.com/"+get_uploaded_object_name(file.name);              
              alter_card.saveFn(src1,src2)
              
              
            }
            else
            {
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
            } 
		},

		Error: function(up, err) {
			
		}   
	}
});
uploader2.init();
uploader.init();

function imgSS(that,imgSrc){
	var wzK = that.parent().parent();
		
		var wzM = wzK.children().first();
		
		wzM.children().first().html("<img src='"+imgSrc+"'>");
}

