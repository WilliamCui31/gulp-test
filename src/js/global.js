// JavaScript Document

$(document).ready(function(){
	$.logout();
	$.loginFlow();
	$.naviMenu();
	/*setInterval(function(){
		if($("#nail_bar").html()==null)
		$("#right_bar").css("right","27px").css("right","10px");
		$.autoWidth();
	},1);*/
	if($("#content_center").html()==null) $("#content").wrapInner("<div id='content_center' />");
	if($("#nail_bar").html()!=null) $("#header_center").append($("#nail_bar"));
})


//Jquery 扩展方法
$.extend({
	//logout退出确认
	logout:function(){
		$("#btnLogout").click(function(){
			$.confirm("你确定要退出吗？",'window.open("../login/newLogin.html","_top")');
		});
		$("#mainLogout").click(function(){
			$.confirm("你确定要退出吗？",'window.open("../login/newLogin.html","_top")');
		});
	},
	loginFlow:function(){
		var index=$("#content").attr("index");
		for(var i=1;i<=index;i++){
			$("#progress-bar li").eq(i).addClass("complete");
		}
	},
	//头部菜单切换
	naviMenu:function(){
		var name=$("#content").attr("name");
		$(".subMenu:last").siblings("a").addClass("last");
		$(".subMenu").find("a").each(function() {
			if($(this).attr("name")==name){
				$(this).addClass("selected");
				$(this).parents("ul.subMenu").siblings("a").addClass("selected");
			}
        });
		$("#navi li").not(".subMenu li").mouseenter(function(){
			$(this).find(".subMenu").siblings("a").addClass("mouseenter");
			$(this).find(".subMenu:hidden").fadeTo("fast",0.95);
		}).mouseleave(function(){
            $(this).find(".subMenu:visible").fadeOut("fast");
			$(this).find("a.mouseenter").removeClass("mouseenter");
        });
	},
	//添加pop滚动条
	scrollPane:function(obj){
		if(obj.height()>500){
			obj.addClass("scroll-pane");
			var bars= '.jspVerticalBar';
			$('.scroll-pane').bind('jsp-initialised', function (event, isScrollable) {
				//hide the scroll bar on first load
				//$(this).find(bars).hide();
				$(this).find(bars).show('fast');
			}).jScrollPane().hover(
				//hide show scrollbar
				function () {
					$(this).find(bars).show('fast');
				},
				function () {
					$(this).find(bars).hide('fast');
				}
			);
		}
	},
	//判断设备是不是ipad
	isIpad:function(){
		var sUserAgent= navigator.userAgent.toLowerCase();
		var iPad= sUserAgent.match(/ipad/i) == "ipad";
		return iPad;
	},
	//自定义alert pop
	alert:function(message,callback,title,btnValue){
		var faultTitle="Tips",
			faultBtnValue="Confirm";
		if($.language()=="zh"){
			faultTitle="提示";
			faultBtnValue="確認";
		}else if($.language()=="cn"){
			faultTitle="提示";
			faultBtnValue="确认";
		};
		var tit=title || faultTitle,
			btn=btnValue || faultBtnValue;
		var alertPop
		='<div class="alertDailog">'
			+'<div id="module"></div>'
			+'<div class="alertPop pop">'
				+'<div class="mainBox">'
					+'<div class="title">'+tit+'<span></span></div>'
					+'<div class="message">'+message+'</div>'
					+'<input type="button" value="'+btn+'" />'
				+'</div>'
			+'</div>'
		+'</div>';
		$("body").find(".alertDailog").remove();
		$("body").append(alertPop);
		$(".alertDailog input").click(function(){
			if($("iframe").html()!=null) $("iframe:visible").hidden();
			$(this).parents(".alertDailog").remove();
			eval(callback);
		});
	},
	//自定义 confirm pop
	confirm:function(message,confirmCallback,cancelCallback,title,confirmValue,cancelValue){
		var faultTitle="Confirm",
			faultConfirmValue="Confirm",
			faultCancelValue="Cancel";
		if($.language()=="zh"){
			faultTitle="確認",
			faultConfirmValue="確認",
			faultCancelValue="取消";
		}else if($.language()=="cn"){
			faultTitle="确认",
			faultConfirmValue="确认",
			faultCancelValue="取消";
		};
		var tit=title || faultTitle,
			confirmV=confirmValue || faultConfirmValue,
			cancelV=cancelValue || faultCancelValue,
		confirmPop
		='<div class="confirmDailog">'
			+'<div id="module"></div>'
			+'<div class="confirmPop pop">'
				+'<div class="mainBox">'
					+'<div class="title">'+tit+'<span></span></div>'
					+'<div class="message">'+message+'</div>'
					+'<input type="button" value="'+confirmV+'" class="confirm" />'
					+'<input type="button" value="'+cancelV+'" class="cancel" />'
				+'</div>'
			+'</div>'
		+'</div>';
		$("body").find(".confirmDailog").remove();
		$("body").append(confirmPop);
		$(".confirmDailog .cancel").click(function(){
			if($("iframe").html()!=null) $("iframe:visible").hidden();
			$(this).parents(".confirmDailog").remove();
			eval(cancelCallback);
		});
		$(".confirmDailog .confirm").click(function(){
			if($("iframe").html()!=null) $("iframe:visible").hidden();
			$(this).parents(".confirmDailog").remove();
			eval(confirmCallback);
		});
	},
	//获取当前语言
	language:function(){
		var language="en";
		if($("#language").find("a").eq(0).hasClass("selected")){ language="zh";}
		else if($("#language").find("a").eq(1).hasClass("selected")){ language="cn";};
		return language;
	},
	//判断ie版本
	isIE:function(n){
		var isIE=false;
		var browser=navigator.appName;
		var b_version=navigator.appVersion;
		var version=b_version.split(";");
		var trim_Version=version[1].replace(/[ ]/g,"");
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE"+n+".0"){
			isIE=true;
		}
		return isIE;
	}
})
