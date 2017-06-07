var add_address = (function() {

	function add_address() {}
	//、、、获取本地用户信息
	add_address.encrypt_id = sessionS.cookie.get("encrypt_id"); //、、、用户Id

	//、、、、、初始化
	add_address.init = function() {
		_init_area("s_province", "s_city", "s_county"); //省市三级联动；
		this.identityAjax();
		this.addSite();
	}

	//----------判断数据是否完整-------------
	function pan_number() {
		var reg = /^1[34578]\d{9}$/;
		if($(".add_name").val() == " ") {
			{
				$(".imperfect").show();
				return false;
			}
		}
		if($(".add_phone").val() == " ") {
			{
				$(".imperfect").show();
				return false;
			}
		}

		if($("#add_detail").val() == " ") {
			{
				$(".imperfect").show();
				return false;
			}
		}
		if($("#s_province").val() == "省") {
			$(".imperfect").show();
			return false;
		}
		if($("#s_city").val() == "市") {
			$(".imperfect").show();
			return false;
		}
		if($("#s_county").val() == "区") {
			$(".imperfect").show();
			return false;
		}
		if(!reg.test($("#add_phone").val())) {
			$(".imperfect").show();
			$(".imperfect").html("手机号码格式不正确");
			return false;
		} else {
			$(".imperfect").hide();
			$(".imperfect").html("您填写的信息不完整");
			return true;
		}
	}
	//-----请求数据------
	add_address.identityAjax = function() {

			var that = this;
			$.ajax({
				url: realm.Name + "receipt_address",
				type: "post",
				dataType: "json",
				data: {
					user_id: add_address.encrypt_id
				},
				success: function(e) {
					console.log(e)
					if(e.msg == "请求成功") {
						console.log(e.data)
						that.free_trialHtml(e.data);
						that.default_block();
					}
					if(e.code == "-10015") {
						$(".idcard_list").hide();
					}
				},
				error: function(e) {
					alert("请求失败！");
				}
			});
		}
		//-----创建结构-------
	add_address.free_trialHtml = function(data) {

		var that = this;
		var str = '';
		$.each(data, function(i, v) {

			str += '<ol class="addressList-con" data-card_id="' + v.harvest_id + '" data-default_id="' + v.harvest_status + '">' +
				'<li>' + v.harvest_person + '</li>' +
				'<li>' + v.harvest_desc + '' + v.harvest_information + '</li>' +
				'<li>' + v.harvest_phone + '</li>' +
				'<li><a href="javascript:;"><span class="compileBtn">编辑</span></a>|<a href="javascript:;"><span class="deleteBtn">删除</span></a></li>' +
				'<li><button class="default_btn">设为默认地址</button></li>' +
				'</ol>'
		});

		$(".user_ads").append(str);
		$(document).ready(function() {
			that.removeIdentity();
			that.compileIdentity();
			that.default_address();
			if($(".user_ads ol").length == 0) {
				$(".user_ads").hide();
			}
		})

	}

	//-------添加地址-------
	add_address.addSite = function() {
		var that = this;
		$(".confirm_btn").on("click", function() {

			if(!pan_number()) return false;
			var user_id = add_address.encrypt_id; //、、、用户id/////////读取缓存的Id
			var harvest_desc = $("#s_province option:selected").val() + " " + $("#s_city option:selected").val() + " " + $("#s_county option:selected").val(); //、、、地址
			var harvest_information = $("#add_detail").val(); //、、、、详细地址
			var harvest_person = $("#add_name").val(); //、、、用户名
			var harvest_phone = $("#add_phone").val(); //、、、、电话
			var default_check = null;
			if($("#default_check").prop("checked") == true) {
				default_check = 1;
			} else {
				default_check = 0;
			}

			var data = {
				user_id: user_id,
				harvest_desc: harvest_desc,
				harvest_information: harvest_information,
				harvest_person: harvest_person,
				harvest_phone: harvest_phone,
				harvest_status: default_check
			}

			$.ajax({

				url: realm.Name + "add_address",
				type: "post",
				dataType: "json",
				data: data,
				success: function(e) {
					console.log(e);
					location.reload();
				}
			});

		})
	}

	//、、、、、、、、点击删除----

	add_address.removeIdentity = function() {
		var ts = this;
		$(".user_ads").on("click", ".deleteBtn", function(e) {
			//console.log(sessionS.removeItemFns())

			e.preventDefault();
			e.stopPropagation();
			var that = $(this);
			var harvest_id = $(this).parents(".addressList-con").attr("data-card_id");

			layer.confirm('确定删除该地址？', {
				className: "aaa",
				btn: ['确定', '取消'] //按钮
			}, function() {

				$.ajax({
					url: realm.Name + "del_address",
					type: "post",
					dataType: "json",
					async: true,
					data: {
						user_id: add_address.encrypt_id,
						harvest_id: harvest_id
					},
					success: function(e) {
						console.log(e);
						if(e.msg == "删除成功") {
							window.location.reload();
						}
					}
				});

			});

			
		})

	}

	//、、、、点击编辑

	add_address.compileIdentity = function() {
		var that = this;
		var harvest_id = null;
		$(".user_ads .compileBtn").off("click");

		$(".user_ads .compileBtn").on("click", function() {

			harvest_id = $(this).parents(".addressList-con").attr("data-card_id");

			$.ajax({
				url: realm.Name + "select_old_address",
				type: "post",
				dataType: "json",
				data: {
					user_id: add_address.encrypt_id,
					harvest_id: harvest_id
				},
				success: function(e) {
					console.log(e);
					//if(e.code == "10000"){
					$.each(e, function(i, v) {
						var dress = "" + v.harvest_desc + "";
						var arr = dress.split(" ");

						$("#add_name").val(v.harvest_person);
						$("#add_phone").val(v.harvest_phone);
						$("#add_detail").val(v.harvest_information);
						$("#s_province option").each(function(i, v) {
							if($(this).val() == arr[0]) {
								$(this).prop("selected", true);
								change(1);
							}
						})
						$("#s_city option").each(function(i, v) {
							if($(this).val() == arr[1]) {
								$(this).prop("selected", true);
								change(2);
							}
						})
						$("#s_county option").each(function(i, v) {
							if($(this).val() == arr[2]) {
								$(this).prop("selected", true);
							}
						})

						if(v.harvest_status == 1) {
							$("#default_check").prop("checked", true);
							$(this).parents(".addressList-con").attr("data-card_id", v.harvest_status);
						} else {
							$("#default_check").prop("checked", false);
							$(this).parents(".addressList-con").attr("data-card_id", v.harvest_status);
						}
					})
					that.bianji_add(harvest_id);
					//}

				}
			});

		});

	}

	//----------编辑之后保存-----------------
	add_address.bianji_add = function(harvest_id) {
		var that = this;
		var harvest_id = harvest_id;
		$(".confirm_btn").off("click");
		$(".confirm_btn").click(function() {

			var user_id = add_address.encrypt_id; //、、、用户id/////////读取缓存的Id
			var harvest_desc = $("#s_province option:selected").val() + " " + $("#s_city option:selected").val() + " " + $("#s_county option:selected").val(); //、、、地址
			var harvest_information = $("#add_detail").val(); //、、、、详细地址
			var harvest_person = $("#add_name").val(); //、、、用户名
			var harvest_phone = $("#add_phone").val(); //、、、、电话
			var harvest_status = null;
			if($("#default_check").prop("checked") == true) {
				harvest_status = 1;
			} else {
				harvest_status = 0;
			}
			var data = {
				user_id: user_id,
				harvest_desc: harvest_desc,
				harvest_information: harvest_information,
				harvest_person: harvest_person,
				harvest_phone: harvest_phone,
				harvest_status: harvest_status,
				harvest_id: harvest_id
			}

			$.ajax({

				url: realm.Name + "update_address",
				type: "post",
				dataType: "json",
				data: data,
				success: function(e) {
					console.log(e);
					if(!pan_number()) return false;
					if(e.code == "10000") {

						if($("#default_check").prop("checked") == true) {
							$(this).parents(".addressList-con").attr("data-card_id", harvest_status);
						} else {
							$(this).parents(".addressList-con").attr("data-card_id", harvest_status);
						}
						location.reload();
					} else {
						console.log(e);
					}

				}
			});

		})
	}

	//-----------设为默认地址-----------
	add_address.default_address = function() {
		var ts = this;
		$(".default_btn").click(function() {
			//var locdress_id  = ts.commodity.harvest_id;
			var that = $(this);
			var user_id = add_address.encrypt_id;
			var harvest_id = $(this).parents(".addressList-con").attr("data-card_id");
			$.ajax({
				url: realm.Name + "default_address",
				type: "post",
				dataType: "json",
				data: {
					user_id: user_id,
					harvest_id: harvest_id
				},
				success: function(e) {
					console.log(e);
					if(e.code == "10000") {
						//alert(that.parents(".addressList-con").attr("data-default_id"))
						that.parents(".addressList-con").attr("data-default_id", 1);
						that.parents(".addressList-con").siblings().find(".default_btn").show();
						that.hide();
					}

				}
			});
		})
	};

	//---------判断设为默认按钮是否显示-----------
	add_address.default_block = function() {
		$(".addressList-con").each(function(i, v) {
			if($(this).attr("data-default_id") == 1) {
				$(this).find(".default_btn").hide();
			} else {
				$(this).find(".default_btn").show();
			}
		})
	}

	add_address.init();

	return add_address;
})()