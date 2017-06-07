
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
			document.getElementById('saveBtn').onclick = function() {
				
				 set_upload_param(uploader, '', false);
               
                
               return false;
			};
		},

		FilesAdded: function(up, files) {
		   
		   
		   if(up.files.length > 1){
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
                 pc_weiying.weiXAjax(src1);
            }
            
		},

		Error: function(up, err) {
			
		}
	}
});


uploader.init();

function imgSS(that,imgSrc){

        $(".shili").find("img").attr("src",imgSrc);
		
}

