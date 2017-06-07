var orderHTML = (function() {

	function orderHTML() {};

	orderHTML.data = null;
	orderHTML.commodityHTML = "";
	orderHTML.bool = 0;
	orderHTML.init = function() {
		var topURl = document.referrer;
		var shop_car = "shop_car";
		if(topURl.indexOf(shop_car) != -1) {
			orderHTML.data = {
				user_id: sessionS.cookie.get("encrypt_id"),
				sku_id: sessionS.cookie.get("sku_id"),
				grade_id: sessionS.cookie.get("grade_id")
			};

		} else {
			if(sessionS.cookie.get("sku_id") == ""){
				orderHTML.data = {
					user_id: sessionS.cookie.get("encrypt_id"),
					grade_id: sessionS.cookie.get("grade_id"),
					H5 :1
				}
			}else{
				orderHTML.data = {
					user_id: sessionS.cookie.get("encrypt_id"),
					sku_id: sessionS.cookie.get("sku_id"),
					H5 :1
				}
			}
		};

		$.ajax({
			type: "post",
			url: realm.Name + "confirm_order",
			data: orderHTML.data,
			dataType: "json",
			async: false,
			success: function(e) {

				if(e.code == "10000") {
					$("html,body").ready(function() {
						$(".car_box").show();
					})
					
					orderHTML.bool = e.data.support_desc;
					orderHTML.commodityFn(e.data.order_goods); //、、、商品HTML
					orderHTML.siteHTML(e.data.user_address, e.data.is_address);
					orderHTML.cardHTML(e.data.user_card, e.data.is_card);
					orderHTML.indentHTML(e.data);
				}else if (e.code == "-10026"){
					$("html,body").ready(function() {
						$(".car_box").remove();
					    $(".NoBox").show();
					});
					
				}

			}
		});

	};

	orderHTML.siteHTML = function(data, is_address) {

		if(is_address == 0) {
			$("html,body").ready(function() {
				$("#addsite").show();
				_init_area("s_province", "s_city", "s_county"); //省市三级联动；
			});
		} else {

			var str = '';
			$.each(data, function(i, v) {
				if(v.harvest_status == 1) {
					str += '<a href="javascript:;" data-harvest_id="' + v.harvest_id + '" class="active"><li>' +
						'<h2><span>' + v.harvest_person + '</span>收 <label>默认地址</label></h2>' +
						'<p>' + v.harvest_desc + " " + v.harvest_information + '</p>' +
						'<p>' + v.harvest_phone + '</p>' +
						'<small href="#">编辑</small>' +
						'</li>' +
						'</a>';
				} else {
					str += '<a href="javascript:;" data-harvest_id="' + v.harvest_id + '"><li>' +
						'<h2><span>' + v.harvest_person + '</span>收 <label>设为默认地址</label></h2>' +
						'<p>' + v.harvest_desc + " " + v.harvest_information + '</p>' +
						'<p>' + v.harvest_phone + '</p>' +
						'<small href="#">编辑</small>' +
						'</li>' +
						'</a>';
				};

			});
			$("html,body").ready(function() {
				$("#amendSite").show();
				$("#siteList").html(str);
				$("#siteList a").eq(3).nextAll().hide();
				if(data.length > 4) {
					var o = 1;
					$("#AllShow").show();
					$("#AllShow").on("click", function() {
						if(o == 1) {
							o = 2;
							$("#siteList a").show();
							$("#AllShow span").text("隐藏地址");
						} else {
							o = 1;
							$("#siteList a").eq(3).nextAll().hide();
							$("#AllShow span").text("显示全部地址");
						}

					})
				};

				$("#siteList").on("click", "a", function(e) {
					e.stopPropagation();
					orderHTML.data.harvest_desc = $(this).find("p").eq(0).text().split(" ").slice(0,3).join(" ");
					$.ajax({
						type:"post",
						url: realm.Name + "confirm_order",
						data:orderHTML.data,
						dataType:"json",
						success:function(e){
							 orderHTML.bool = e.data.support_desc
						     if(e.data.support_desc == 0){
						     	orderHTML.commodityFn(e.data.order_goods);
						     	$(".shop_addprice").hide();
						     }else{
						        orderHTML.commodityFn(e.data.order_goods);
						     	$(".shop_addprice").show()
						     	if(e.data.freight_money == 0) {
								$("#freight_money").text("包邮");
								$("#freight_money").attr("data-freight_money","0");
							    } else {
								$("#freight_money").text(e.data.freight_money);
								$("#freight_money").attr("data-freight_money",e.data.freight_money);
							    };
						     }
							 
						}
					});
				   
					$(this).addClass("active").siblings().removeClass("active");
				});
				orderHTML.defaultSite();
				orderHTML.compileSite();
			});
		}

	};
	//、、、设置默认地址
	orderHTML.defaultSite = function() {
		$("#siteList").on("click", "a label", function(e) {
			e.stopPropagation();
			var harvest_id = $(this).parents("a").attr("data-harvest_id");
			var that = $(this);
			$.ajax({
				type: "post",
				url: realm.Name + "default_address",
				data: {
					user_id: sessionS.cookie.get("encrypt_id"),
					harvest_id: harvest_id
				},
				dataType: "json",
				success: function(e) {
					if(e.code == "10000") {
						that.text("默认地址");
						that.parents("a").siblings().find("label").text("设为默认地址")
					}
				}
			});
		});
	};
	//、、、编辑地址
	orderHTML.compileSite = function() {

		$("#siteList").on("click", "a small", function(e) {
			e.stopPropagation();
			_init_area("s_province2", "s_city2", "s_county2"); //省市三级联动；
			var harvest_person = $(this).parents("a").find("span").text(); //、、名
			var harvest_phone = $(this).parents("a").find("p").eq(1).text(); //、、电话
			var harvest_desc = $(this).parents("a").find("p").eq(0).text().split(" ");
			var harvest_information = $(this).parents("a").find("p").eq(0).text().split(" ")[3];
			var harvest_status;
			var harvest_id = $(this).parents("a").attr("data-harvest_id");
			if($(this).parents("a").find("label").text() == "默认地址") {
				harvest_status = 1;
			} else {
				harvest_status = 0
			};

			$("#s_province2 option").each(function() {
				if($(this).val() == harvest_desc[0]) {
					$(this).prop("selected", true);
					$("#s_province2").change();
					$("#s_city2 option").each(function() {
						if($(this).val() == harvest_desc[1]) {
							$(this).prop("selected", true);
							$("#s_city2").change();
							$("#s_county2 option").each(function() {
								if($(this).val() == harvest_desc[2]) {
									$(this).prop("selected", true);
									return false;
								}
							})
							return false;
						}
					})

					return false;
				}
			});

			$(".add_dress").show();
			$(".add_dress").find("h1").text("修改收货地址");
			$(".add_dress").attr("data-harvest_id", harvest_id);
			$(".add_dress").attr("data-clickStyle", "2");
			$(".harvest_person").val(harvest_person);
			$(".particular").val(harvest_information);
			$(".harvest_phone").val(harvest_phone);
			if(harvest_status == 1) {
				$(".moren_address input").prop("checked", true);
			};
		})

	};

	orderHTML.cardHTML = function(data, is_card) {
		if(is_card == 1) {
			$("html,body").ready(function() {
				$("#recip_idcard").show();
				$("#add_idcard").remove();
				$("#add_idBtn").on("click", function() {
					if($("#wzadd_add_idcard>div>h1").length >= 1) {
						$("#wzadd_add_idcard").show();
						$("#add_name").val("");
						$("#add_number").val("");
						$("#sec1").html("");
						$("#sec2").html("");
						$("#wzadd_add_idcard").removeAttr("data-card_id");
						$("#wzadd_add_idcard").find("h1").text("编辑身份证");
						$("#wzadd_add_idcard").removeAttr("data-k", 1);
					} else {
						$.ajax({
							type: "get",
							url: "add_id.html",
							success: function(e) {
								$("#wzadd_add_idcard>div").html(e);
								$("#wzadd_add_idcard").show();
							}
						});
					}
				});
				$("#wzadd_add_idcard").on("click", ".abolish", function() {
					$("#wzadd_add_idcard").hide();
				})
			});
			var str = '';
			$.each(data, function(i, v) {

				str += '<a href="javascript:;" data-card_id="' + v.card_id + '">' +
					'<li>' +
					'<h2><span>' + v.card_name + '</span></h2>' +
					'<p>' + v.card_num + '</p>' +
					'<p><img src="' + v.card_just_url + '"><img src="' + v.card_back_url + '"></p>' +
					'<small href="#">编辑</small>' +
					'</li>' +
					'</a>';
			});
		} else {
			$("html,body").ready(function(){
				$("body").append('<script type="text/javascript" src="./js/weiImg.js?v=9559c82c7c"></script>');
				$("#add_idcard").show();
				$("#wzadd_add_idcard").remove();
			});
		};
		$("html,body").ready(function() {
			$("#cardList").html(str);
			$("#cardList a").eq(3).nextAll().hide();
			if(data.length > 4) {
				var o = 1;
				$("#AllShow2").show();
				$("#AllShow2").on("click", function() {
					if(o == 1) {
						o = 2;
						$("#cardList a").show();
						$("#AllShow2 span").text("隐藏身份证");
					} else {
						o = 1;
						$("#cardList a").eq(3).nextAll().hide();
						$("#AllShow2 span").text("显示全部身份证");
					}

				})
			};
			$("#cardList").on('click', "a", function(e) {
				e.stopPropagation();
				$(this).addClass("active").siblings().removeClass("active");
			})

			orderHTML.compileCard();
		});

	};

	//、、编辑身份证
	orderHTML.compileCard = function() {

		$("#cardList").on("click", "small", function(e) {
			e.stopPropagation();
			var card_id = $(this).parents("a").attr("data-card_id");
			var card_name = $(this).parents("a").find("span").text();
			var card_num = $(this).parents("a").find("p").eq(0).text();
			var card_just_url = $(this).parents("a").find("p").eq(1).find("img").eq(0).attr("src");
			var card_back_url = $(this).parents("a").find("p").eq(1).find("img").eq(1).attr("src");
			if($("#wzadd_add_idcard>div>h1").length >= 1) {
				$("#wzadd_add_idcard").show();
				$("#add_name").val(card_name);
				$("#add_number").val(card_num);
				$("#sec1").html("<img src='" + card_just_url + "'>");
				$("#sec2").html("<img src='" + card_back_url + "'>");
				$("#wzadd_add_idcard").attr("data-card_id", card_id);
				$("#wzadd_add_idcard").find("h1").text("修改身份证");
				$("#wzadd_add_idcard").attr("data-k", 1);
			} else {
				$.ajax({
					type: "get",
					url: "add_id.html",
					success: function(e) {
						$("#wzadd_add_idcard>div").html(e);
						$("#wzadd_add_idcard").show();
						$("#add_name").val(card_name);
						$("#add_number").val(card_num);
						$("#sec1").html("<img src='" + card_just_url + "'>");
						$("#sec2").html("<img src='" + card_back_url + "'>");
						$("#wzadd_add_idcard").attr("data-card_id", card_id);
						$("#wzadd_add_idcard").find("h1").text("修改身份证");
						$("#wzadd_add_idcard").attr("data-k", 1);
					}
				});
			}

		});

	};

	orderHTML.commodityFn = function(data) {

		var str = '';

		$.each(data, function(i, v) {

			str += '<div class="assem_sp_list" data-warehouse_id="' + v.warehouse_id + '" data-warehouse_cross_id="' + v.warehouse_cross_id + '">' +
				'<div class="warehouse_01">' + v.warehouse_name + '</div>';
			$.each(v.warehouse_goods, function(x, y) {

				if(y.grade_goods) { //、、组合够

					str += orderHTML.groupHTML(y)

				} else { //、、、、单品

					str += orderHTML.oneHTML(y)
				}

			});
		});
		str += '</div></div>';
		$("html,body").ready(function() {
			$(".have_sp").html(str);
		})

	};

	//、、、组合够HTML
	orderHTML.groupHTML = function(data) {
		var str = '<div class="duble_sp"  data-grade_id="' + data.grade_id + '">' +
			'<table class="assem_list">' +
			'<tbody>' +
			'' + orderHTML.groupListHTML(data.grade_goods) + '' +
			'</tbody></table>' +
			'<ul class="pinda_price">';
		str += '<li><label for="pinda">拼搭价</label></li>' +
			'<li></li>' +
			'<li>￥<span>' + data.grade_price + '</li>' +
			'<li style="position:relative">' + data.grade_buy_num + '</li>' +
			'<li>￥<span class="Spcost">' + (data.grade_price * data.grade_buy_num) + '</span></li><li class="deleteBtn"></li>';

		str += '</ul>' +
			'</div>';
		return str;
	};

	//、、、组合够商品列表HTML
	orderHTML.groupListHTML = function(data) {

		var str = '';

		$.each(data, function(k, y) {

			str += '<tr data-sku_id="' + y.sku_id + '" data-goods_id="' + y.goods_id + '">' +
				'<td><img src="' + y.goods_main_url + '"></td>' +
				'<td><p>' + y.goods_name + '</p><span>' + y.sku_name + '</span></td>' +
				'<td><num>￥' + y.market_price + '</num><span>￥' + y.pc_price + '</span></td>' +
				'<td></td>' +
				'<td></td>' +
				'<td></td>' +
				'</tr>';
		});

		return str;

	};

	//、、、单品
	orderHTML.oneHTML = function(data) {

		var str = '<div class="single_sp" data-sku_id="' + data.sku_id + '" data-goods_id="' + data.goods_id + '">' +
			'<table>' +
			'<tbody><tr>' +
			'<td style="text-align:center"><img src="' + data.goods_main_url + '"></td>' +
			'<td><p>' + data.goods_name + '</p><span>' + data.sku_name + '</span></td>' +
			'<td><num>￥' + data.market_price + '</num>￥<span>' + data.pc_price + '</span></td>';
		if(data.sale_num) {
			str += '<td style="position:relative"><button class="delBtn">-</button><input type="text" value="' + data.sku_buy_num + '" class="inpText"><button class="addBtn">+</button><div class="reminderBox2">商品限购<span>' + data.sale_num + '</span>件</div></td>';
		} else {
			str += '<td style="position:relative">' + data.sku_buy_num + '</td>';
		};
		str += '<td>￥<span class="Spcost">' + (data.sku_buy_num * data.pc_price) + '</span></td>' +
			'<td class="deleteBtn"></td>' +
			'</tr>' +
			'</tbody></table>' +
			'</div>';

		return str;
	};

	//、、、订单价格
	orderHTML.order_total = 0;
	orderHTML.indentHTML = function(data) {
         
         
         
		$("html,body").ready(function() {
			if(data.support_desc == 0){
         	$(".shop_addprice").hide();
         	return false;
            }
			if(data.is_coupon == 0) {
				$(".wzfavorable").find("div").text("暂不可用优惠券");
			} else {
				var str = "";
				$.each(data.user_coupon, function(e, v) {

					str += "<option data-coupon_id='" + v.coupon_id + "' data-favoured_policy_money='" + v.favoured_policy_money + "'>" + v.coupon_name + "</option>"

				});
				$(".wzfavorable").find("select").html(str);

			}
			orderHTML.order_total = data.order_total;
			$("#order_total").text(data.order_total);
			if(data.freight_money == 0) {
				$("#freight_money").text("包邮");
				$("#freight_money").attr("data-freight_money","0");
			} else {
				$("#freight_money").text(data.freight_money);
				$("#freight_money").attr("data-freight_money",data.freight_money);
			};
			if(data.tax == 0) {
				$("#tax").text("免税");
				$("#tax").attr("data-tax",0)
			} else {
				$("#tax").text(data.tax);
				$("#tax").attr("data-tax",data.tax)
			}

		});

	}

	orderHTML.init();
	return orderHTML;
})()