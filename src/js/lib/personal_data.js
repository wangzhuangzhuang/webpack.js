;
var personal_data = (function() {
	function personal_data() {}
	//、、、获取本地用户信息
	personal_data.user = sessionS.cookie.get("encrypt_id");
	//、、、、、初始化
	personal_data.obj;
	personal_data.init = function() {
		var that = this;
		this.addSite();
		this.identityAjax();
		this.clickFn();
		this.imgUploading();

	}

	//、、、、点击事件
	personal_data.clickFn = function() {
		//、、、点击切换
		var that = this;
		$(".basic_data").on("click", function() {
			$(".user_preser").eq(0).show();
			$(".user_preser").eq(1).hide();
		})
		$(".user_headimg").on("click", function() {
			$(".user_preser").eq(0).hide();
			$(".user_preser").eq(1).show();
			$("#wzbox").remove();
			$.ajax({
				type:"post",
				url: realm.Name + "update_img",
				async:true,
				data:{
				   user_id: that.user,
				   is_type: "1"
				},
				dataType:"json",
				success:function(e){
					
					if(e.code == "10000"){
					            
								$(".update_imgbtn").before(personal_data.imgHTML(e.data.user_image));
							    personal_data.Jcrop();
			            
			            	
			          
					}
					
				}
			});
			
			
		})

		$(".update_imgbtn").on("click", function() {

			var img = $(".jcrop-preview")[0];
               
			var w = $(".jcrop-preview").width();
			var h = $(".jcrop-preview").height();
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.save();
			canvas.width = 127;
			canvas.height = 127;
			ctx.translate(-Math.round(rx * cc.x), -Math.round(ry * cc.y));
			getImageWidth($(".jcrop-preview").attr("src"), function(k, y) {
				ctx.scale(w / k, h / y);
			});
			ctx.drawImage(img, 0, 0);
			ctx.restore();
			
			var dataURL = canvas.toDataURL(1);
			personal_data.ossFn(dataURL);
			

		})

		function getImageWidth(url, callback) {
			var img = new Image();
			img.src = url;

			// 如果图片被缓存，则直接返回缓存数据
			if(img.complete) {
				callback(img.width, img.height);
			} else {
				// 完全加载完毕的事件
				img.onload = function() {
					callback(img.width, img.height);
				}
			}

		}

	};
	//、、、、图片裁剪的HTML
	personal_data.imgHTML = function(url) {

		var str = '<div style="width:952px;" id="wzbox">' +
			'<div class="update_img">' +
			'<div id="preview" class="wei_img zhifu_img">' +
			'<img id="imghead" src="">' +
			'</div>' +
			'<img src="'+url+'" id="target" alt="[Jcrop Example]" />' +
			'<div id="preview-pane">' +
			'<span>效果预览：</span>' +
			'<div class="preview-container">' +
			'<img src="'+url+'" class="jcrop-preview" alt="Preview" />' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>';

		return str;
	};
	//、、、图片裁剪的功能
	personal_data.Jcrop = function() {

		jQuery(function($) {

			// Create variables (in this scope) to hold the API and image size
			var jcrop_api,
				boundx,
				boundy,

				// Grab some information about the preview pane
				$preview = $('#preview-pane'),
				$pcnt = $('#preview-pane .preview-container'),
				$pimg = $('#preview-pane .preview-container img'),

				xsize = $pcnt.width(),
				ysize = $pcnt.height();

			//console.log('init',[xsize,ysize]);
			$('#target').Jcrop({
				onChange: updatePreview,
				onSelect: updatePreview,
				aspectRatio: xsize / ysize,
				bgFade: true,
				bgOpacity: .7,
				setSelect: [110, 110, 350, 350]
			}, function() {
				// Use the API to get the real image size
				var bounds = this.getBounds();
				boundx = bounds[0];
				boundy = bounds[1];
				// Store the API in the jcrop_api variable
				jcrop_api = this;
				personal_data.obj = this;
				// Move the preview into the jcrop container for css positioning
				$preview.appendTo(jcrop_api.ui.holder);
			});

			function updatePreview(c) {
				cc = c;
				if(parseInt(c.w) > 0) {
					rx = xsize / c.w;
					ry = ysize / c.h;

					$pimg.css({
						width: Math.round(rx * boundx) + 'px',
						height: Math.round(ry * boundy) + 'px',
						marginLeft: '-' + Math.round(rx * c.x) + 'px',
						marginTop: '-' + Math.round(ry * c.y) + 'px'
					});
				}
			};

		});

	};
	//-------个人资料列表--------
	personal_data.identityAjax = function() {
		var that = this;
		$(".preser_btn").on("click", function() {
			//-------获取用户基本信息----------
			var user_nickname = $("#user_nickname").val();
			var user_autograph = $("#user_autograph").val();
			var user_phone = $("#user_phone").text();
			var user_sex = null;
			if($("#sex_lady").prop("checked") == true) {
				user_sex = 0;
			} else if($("#sex_boy").prop("checked") == true) {
				user_sex = 1;
			} else {
				user_sex = 2;
			};
			var user_birthdate = $("#select_year2 option:selected").val() + "-" + $("#select_month2 option:selected").val() + "-" + $("#select_day2 option:selected").val();
			var data = {
				user_id: that.user,
				user_nickname: user_nickname,
				user_autograph: user_autograph,
				user_sex: user_sex,
				user_birthdate: user_birthdate,
				is_type: 2
			};
			$.ajax({
				url: realm.Name + "update_user",
				type: "post",
				dataType: "json",
				data: data,
				success: function(e) {
					console.log(e)
					if(e.code == "10000") {
						alert(e.msg);
					}

				},
				error: function(e) {
					alert("请求失败！");
				}
			});
		})

	}
    personal_data.imageType="";
	//、、、图片上传
	personal_data.imgUploading = function() {
			var src;
			$("#img_change").on("change", function() {
				$(".update_imgbtn").show();
				previewImage(this)
			});

			function previewImage(file) {
				var MAXWIDTH = 260;
				var MAXHEIGHT = 180;
				var div = document.getElementById('preview');
				personal_data.imageType = file.files[0].type.substr(6);
				if(file.files && file.files[0]) {

					div.innerHTML = '<img id=imghead>';
					var img = document.getElementById('imghead');
					img.onload = function() {
						var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
						img.width = rect.width;
						img.height = rect.height;
						//                 img.style.marginLeft = rect.left+'px';
						img.style.marginTop = rect.top + 'px';
					}
					var reader = new FileReader();

					reader.onload = function(evt) {
						$("#wzbox").remove();
						$(".update_imgbtn").before(personal_data.imgHTML());
						img.src = evt.target.result;
						$("#target").attr("src", evt.target.result).css({
							"display": "none"
						});
						$(".jcrop-tracker").next().next().attr("src", evt.target.result);
						$(".jcrop-holder").find("img").eq(0).attr("src", evt.target.result)
						$(".jcrop-preview").attr("src", evt.target.result);
						personal_data.Jcrop();
					}
					reader.readAsDataURL(file.files[0]);

					$("#target").attr("src", "imgs/" + file.files[0])
				} else //兼容IE
				{

					var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
					file.select();
					src = document.selection.createRange().text;

					div.innerHTML = '<img id=imghead>';
					var img = document.getElementById('imghead');
					img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
					var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
					status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
					div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
				}

			}

			function clacImgZoomParam(maxWidth, maxHeight, width, height) {

				var param = {
					top: 0,
					left: 0,
					width: width,
					height: height
				};
				if(width > maxWidth || height > maxHeight) {
					rateWidth = width / maxWidth;
					rateHeight = height / maxHeight;

					if(rateWidth > rateHeight) {
						param.width = maxWidth;
						param.height = Math.round(height / rateWidth);
					} else {
						param.width = Math.round(width / rateHeight);
						param.height = maxHeight;
					}
				}

				param.left = Math.round((maxWidth - param.width) / 2);
				param.top = Math.round((maxHeight - param.height) / 2);
				return param;
			}
		}
		//------------基本资料--------------
	personal_data.addSite = function() {
		var that = this;
		$.ajax({
			url: realm.Name + "update_user",
			type: "post",
			dataType: "json",
			data: {
				user_id: that.user,
				is_type: 1
			},
			success: function(e) {
				console.log(e)
				if(e.code == "10000") {
				        var v = e.data;
						$("#user_nickname").val(v.user_nickname);
						$("#user_phone").html(v.user_phone);
						$("#user_autograph").val(v.user_autograph);
						if(v.user_sex == 0) {
							$("#sex_lady").prop("checked", true);
						} else if(v.user_sex == 1) {
							$("#sex_boy").prop("checked", true);
						} else {
							$("#sex_lady").prop("checked", false);
							$("#sex_boy").prop("checked", false);
						}

						var brithday = "" + v.user_birthdate + "";
						var arr = brithday.split("-");
						$("#select_year2 option").each(function(i, v) {
							if($(this).val() == arr[0]) {
								$(this).prop("selected", true);
							}
						})
						$("#select_month2 option").each(function(i, v) {
							if(arr[1] < 10) {
								var brith_date = "0" + $(this).val();
							} else {
								var brith_date = $(this).val();
							}
							if(brith_date == arr[1]) {
								$(this).prop("selected", true);
							}
						})
						$("#select_day2 option").each(function(i, v) {
							if(arr[2] < 10) {
								var brith_day = "0" + $(this).val();
							} else {
								var brith_day = $(this).val();
							}
							if(brith_day == arr[2]) {
								$(this).prop("selected", true);
							}
						})

				
				}

			},
			error: function(e) {
				alert("请求失败！");
			}
		});

	};
	
	personal_data.ossFn = function (data) {
		
		var accesskey= 'lNdOB7RZbj04R6L7TkVR5IFwncqzWZ';
		var policyText = {
		        "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
		        "conditions": [
		        ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
		        ]
            };
        var policyBase64 = Base64.encode(JSON.stringify(policyText))  ;
        var message = policyBase64;
        var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
        var signature = Crypto.util.bytesToBase64(bytes);
        var files = data;
		lrz(files, {width: 200, fieldName: 'osstest'})
		.then(function (rst) {
                var ossData = new FormData();
                // 先请求授权，然后回调
                
                    // 添加配置参数
                    ossData.append('OSSAccessKeyId', "LTAITI1Y0ZqtVVlC");
                    ossData.append('policy', policyBase64);
                    ossData.append('Signature', signature);
                    ossData.append('key', "user_micro/${filename}");
                    ossData.append('success_action_status', 201); // 指定返回的状态码
                    ossData.append('file', rst.file, new Date()*1+"."+personal_data.imageType);

                    $.ajax({
                        url: "https://yangwoer.oss-cn-beijing.aliyuncs.com",
                        data: ossData,
                        dataType: 'xml', // 这里加个对返回内容的类型指定
                        processData: false,
                        contentType: false,
                        type: 'POST'
                    }).done(function(data){
                        var imgURl = $(data).find("Location").text();
                        
                        $.ajax({
							type:"post",
							url: realm.Name + "update_img",
							async:true,
							data:{
							   user_id: personal_data.user,
							   is_type: "2",
							   user_img:imgURl
							},
							dataType:"json",
							success:function(e){
								layer.msg('修改成功', {time:1000});
								$(".update_imgbtn").hide();
								
							}
						});
                        // 返回的上传信息
                       /* if ($(data).find('PostResponse')) {
                            var res = $(data).find('PostResponse');
                            console.info('Bucket：' + res.find('Bucket').text() );
                            console.info('Location：' + res.find('Location').text() );
                            console.info('Key：' + res.find('Key').text() );
                            console.info('ETag：' + res.find('ETag').text() );
                        }*/
                        // 图片预览
                        
                    });
               
                return rst;
            })
            .catch(function (err) {
                // 万一出错了，这里可以捕捉到错误信息
                // 而且以上的then都不会执行
                alert('ERROR:'+err);
            })
            .always(function () {
                // 不管是成功失败，这里都会执行
            });
	};
	
    
    
     
	personal_data.init();

	return personal_data;
})()