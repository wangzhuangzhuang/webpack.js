var show = (function() {
	function show() {};
	show.index = 1;
	show.init = function() {
		    this.Banner();
			this.hot();
			this.specialModule();
			this.BaoPin();
			/*this.storeyFn();*/
			this.sy_coverFn();
            this.clickFn();
            this.Boutique()
            $("img.lazy").lazyload({
            	 effect : "fadeIn"
                });
		}
		/////热门品牌
	show.hot = function() {
		$.ajax({
			type: "post",
			url: realm.Name + "hot_brand",
			dataType: "json",
			success: function(e) {

				if(e.code == "10000") {
					show.hotHTML(e.data);
				}

			},
			error: function() {

			}

		});

	};
	//、、、热门品牌HTML
	show.hotHTML = function(data) {
			var headerhtml = "";
			$.each(data.hot_brand, function(i,v) {
				headerhtml += '<a href="preference.html?brand_id='+v.brand_id+'">'+v.brand_ch_name+'</a>';
			});
			$("#hot_header").html(headerhtml);

			var hot_big_brand = '';
			var brand_goods = '';
			var small_brand = '';
			$.each(data.big_brand, function(i, v) {

				hot_big_brand += '<li><a data-brand_id="' + v.brand_id + '" href="preference.html?brand_id='+v.brand_id+'" target="view_window"><img class="lazy" data-original="' + v.brand_img + '"></a></li>'

			});

			$.each(data.brand_goods, function(i, v) {

				brand_goods += '<a href="details.html?goods_id='+v.goods_id+'" target="view_window"><dl>' +
					'<dt><img  class="lazy" data-original="' + v.goods_main_url + '"></dt>' +
					'<dd>' +
					'<h2>' + v.sku_goods_name + '</h2>' +
					'<h5>' + v.goods_name + '</h5>' +
					'<p class="original">￥123<span>￥155</span></p>' +

					'</dd>' +
					' </dl></a>'

			})

			$.each(data.small_brand, function(i, v) {

				small_brand += '<a href="preference.html?brand_id='+v.brand_id+'" target="view_window"><dl>' +
					'<dt><img class="lazy" data-original="' + v.brand_img + '"></dt>' +
					'<dd>' + v.brand_mark_name + '</dd>' +
					'</dl></a>';

			});

			$("#hot_big_brand").html(hot_big_brand);

			$("#brand_goods").html(brand_goods);

			$("#hot").ready(function() {
                  $("#hot img.lazy").lazyload({
            	        effect : "fadeIn"
                  });
				show.hotFn();
			})

			$("#small_brand").html(small_brand);
			$("#small_brand").ready(function(){
				 $("#small_brand img.lazy").lazyload({
            	        effect : "fadeIn"
                 });
			})

		}
		//、、、、5大模块
	show.specialModule = function() {

		$.ajax({
			url: realm.Name + "hot_cate",
			type: "post",
			dataType: "json",
			success: function(e) {
				if(e.code == "10000") {
					show.specialModuleHTML(e.data);
				}
			}
		});

	};
	//、、、、5大模块HTML 
	show.specialModuleHTML = function(data) {
        
        if(data.length == 2){
        	$("#nutrition").remove();
        	$("#cate").remove();
        };
		var threeArr = data.slice(0, 2);
		var threeArr2 = data.slice(2);
		var threeClass = ["infant", "makeUp"];
		var threeClass2 = ["nutrition","cate"];
		$.each(threeArr, function(i, v) {
			v.className = threeClass[i]
		});
		$.each(threeArr2, function(i, v) {
			v.className2 = threeClass[i]
		});

		$.each(threeArr, function(i, v) {
			var headerhtml = sessionS.Handlebarsfn("#specialModule", threeArr[i]);
			$("#" + threeClass[i]).html(headerhtml);
			$("#" + threeClass[i]).ready(function(){
				$("#" + threeClass[i]).find("img.lazy").lazyload({
            	 effect : "fadeIn"
                });
			})

		});
		$.each(threeArr2, function(i, v) {
			var headerhtml = sessionS.Handlebarsfn("#specialModule2", threeArr2[i]);
			$("#" + threeClass2[i]).html(headerhtml);
			$("#" + threeClass2[i]).ready(function(){
				$("#" + threeClass2[i]).find("img.lazy").lazyload({
            	 effect : "fadeIn"
                });
			})

		});

	};
    //精品
    show.Boutique = function () {
    	
    	$.ajax({
			url: realm.Name + "sy_special",
			type: "post",
			dataType: "json",
			success: function(e) {
				if(e.code == "10000") {
					show.BoutiqueHTML(e.data);
				};
			},
			error: function() {

			}

		});
    	
    };
     show.BoutiqueHTML = function (data) {
     	
     	var str = '';
     	$.each(data, function(i,v) {
     		
     		str += '<a href="seminar_ti.html?special_id='+v.special_id+'" target="_blank"><img  class="lazy" data-original="'+v.special_img+'"></a>';
     		
     	});
     	
     	$("#BoutiqueBox").html(str);
     	$("#BoutiqueBox").ready(function(){
     		$("#BoutiqueBox img.lazy").lazyload({
            	        effect : "fadeIn"
            });
     	})
     	
     	
     }
	//、、、爆品
	show.BaoPin = function() {

		$.ajax({
			url: realm.Name + "hot_sale",
			type: "post",
			dataType: "json",
			success: function(e) {
				if(e.code == "10000") {
					show.BaoPinHTML(e.data);
				}
			},
			error: function() {

			}

		});

	};
	//、、、暴品HTML
	show.BaoPinHTML = function(data) {
			var html = sessionS.Handlebarsfn("#BaoPin", data);
			$("#BaoPinBox").html(html);
			$("#BaoPinBox").ready(function(){
				$("#BaoPinBox").find("img.lazy").lazyload({
            	 effect : "fadeIn"
                });
			})
			  

	};
	//、、、、封面
	show.sy_coverFn = function () {
		$.ajax({
			url: realm.Name + "sy_cover",
			type: "post",
			dataType: "json",
			success: function(e) {
				if(e.code == "10000") {
					show.sy_coverHTML(e.data);
				}
			},

		});
	};
	show.sy_coverHTML = function (data){
		
		var str = '';
		$.each(data, function(i,v) {
			console.log(data);
			str += '<li>'+
			       '<a href="javascript:;" target="_blank">'+
			       '<img class="lazy" data-original="'+v.cover_img+'">'+
			       '</a>'+
			       '</li>';
			
		});
		
		
		$("#styleBox").html(str);
		$("#styleBox").find("a").eq(0).attr("href","limit_time.html");
		$("#styleBox").find("a").eq(1).attr("href","chop_hand.html");
		$("#styleBox").find("a").eq(2).attr("href","chop_mixup.html");
		$("#styleBox").find("a").eq(3).attr("href","free_try.html");
		$("#styleBox").ready(function(){
			 $("#styleBox img.lazy").lazyload({
            	 effect : "fadeIn"
             });
		})
		 
	};
		////banner轮播
	show.Banner = function() {
		//、、、z-index值
		this.BannerHTML();
		show.index = 1;
		this.bottomClick();
		this.timerFn();
		this.mouseFn();

	};
	/////轮播的HTML
	show.BannerHTML = function (){
		
		$.ajax({
			type:"post",
			url: realm.Name + "sy_banner",
			dataType:"json",
			success:function(e){
				if(e.code == "10000"){
					 var str  = "";
					 var str2 = "";
					 $.each(e.data, function(i,v) {
					 	 
					 	 str += '<li data-banner_type="'+v.banner_type+'">' +
					 	           '<a href="javascript:;">'+
					 	               '<img class="lazy" data-original="'+v.banner_img+'">'+
					 	           '</a>'+
					 	        '</li>';
					 	 if(i == 0){
					 	 	 str2 += "<li class='current'></li>";
					 	 }else{
					 	 	 str2 += "<li></li>";
					 	 }
					 	    
					 });
					 
					 $("#imgBox-img").html(str);
					 $("#imgBox-bottomNav div").html(str2);
					 $("#imgBox-bottomNav div").ready(function(){
					 	$("#imgBox-img img.lazy").lazyload({
            	             effect : "fadeIn"
                        });
					 })
					 
					
				};
			}
		});
		
	};
	////轮播变化
	show.change = function(k) {
		$("#imgBox-bottomNav li").eq(k).addClass("current").siblings().removeClass()
		$("#imgBox-img li").eq(k).css({
			"z-index": this.index,
			"display": "none"
		});
		$("#imgBox-img li").eq(k).fadeIn("500");

	};
	////轮播下导航
	show.bottomClick = function() {
		var that = this;
		$("#imgBox-bottomNav").on("click", "li", function() {
			if($(this).hasClass("current")) return false;
			var k = $(this).index();
			that.index++;
			that.change(k)

		})
	};
	//、、、定时器
	show.timerName = null;
	show.timerFn = function() {
			var that = this;
			show.timerName = setInterval(function() {
				var k = $("#imgBox-bottomNav li.current").index() * 1 + 1;
				var imgLength = $("#imgBox-bottomNav li").length;
				if(k >= imgLength) k = 0;
				that.index++;
				that.change(k)

			}, 2000)
		}
		//鼠标划过停止定时器 离开启动

	show.mouseFn = function() {
		var that = this;
		$("#imgBox").hover(
			function() {
				clearInterval(that.timerName);
			},
			function() {
				that.timerFn();
			}
		)
	};
	//、左右切换
	show.hotFn = function() {
		var widthBox = $(".dlBox dl:first-child").width();
		var lengthBox = $(".dlBox dl").length;
		$(".dlBox").width(widthBox * lengthBox);
		this.tabFn($(".dlBox"), widthBox);

	};
	//、、点击左右切换
	show.tabFn = function(obj, w) {
		obj.siblings(".nextBtn").on("click", function() {
			$("#brand_goods img.lazy").lazyload({
            	 effect : "fadeIn"
            });
			var that = $(this);
			$(this).attr("disabled", "disabled");
			obj.stop().animate({
				'left': -w + "px"
			}, 500, function() {
				obj.find("a:first-child").appendTo(obj)
				obj.css("left", "0")
				that.attr("disabled", false);
			})
		})
		obj.siblings(".prevBtn").on("click", function() {
			$("#brand_goods img.lazy").lazyload({
            	 effect : "fadeIn"
            });
			var that = $(this);
			$(this).attr("disabled", "disabled");
			var that = $(this);
			obj.find("a:last-child").prependTo(obj);
			obj.css("left", -w + "px");
			obj.animate({
				'left': "0px"
			}, 500, function() {
				that.attr("disabled", false);
			});
		})
	};
	//、、、楼层控件
	show.storeyFn = function() {
		var distance = $("#styleBox").offset().top * 1 + $("#styleBox").outerHeight(true);
		var TopArray = [];
		
		var sizeL = $("#storey article").length * 1 - 2;
		$(document).ready(function() {

			$(".classifyBox").each(function() {
				TopArray.push($(this).offset().top);
			})
			window.onscroll = function(e) {
				var topValue = $(window).scrollTop();

				if(topValue >= distance) {
					$("#storey").show();
					$.each(TopArray, function(i, v) {
						if(topValue >= TopArray[i + 1] && topValue <= TopArray[i + 2]) {
							$("#storey article").eq(i).addClass("Aclick").siblings().removeClass("Aclick");
						}
					});
					
				} else {
					$("#storey").hide();
				}
			}

		})

		$("#storey article").hover(function() {
			$(this).addClass("Ahover").siblings().removeClass("Ahover")
		}, function() {
			$(this).removeClass("Ahover");
		})

	};
	show.clickFn = function () {
		$(".close-close").on('click',function(){
			$(this).off("click");
			$(".footer").remove();
		});
		
	};

	show.init();
	return show;
})()