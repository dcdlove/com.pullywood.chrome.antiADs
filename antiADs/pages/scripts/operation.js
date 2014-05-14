/**
 * Copyright © 普利坞(Pullywood.com)
 * Site: http://www.pullywood.com/
 * Coded By 睡虫子(Joey)
 * 你可以在遵守如下约定的前提下重用本扩展资源文件及脚本代码：
 * 1、保留本声明；
 * 2、不以本扩展及代码为基础加入功能无关的损害用户利益的恶意代码，包括但不限于收集个人隐私数据、
 *    以用户身份进行自动化的社交网络操作、修改或重定向正常功能链接为网络推广链接；
 * 3、扩展加入广告等相关元素需征得用户同意并提供可关闭选项；
 * 4、不以我方名义重新发布修改过的扩展；
 * 
 **/
$(function() {

	$( "#accordion" ).accordion({
		collapsible: true,
		heightStyle: "content",
		active: 1
	});
	
	$( "#configure" ).accordion({
		collapsible: true,
		heightStyle: "content",
		active: 1
	});
	

	$(".feedback").button({
		icons: {
			primary: "ui-icon-note"
		}
	}).bind("click", function() {
		window.location.href = "http://www.pullywood.com/publish/archive/pullywood_ad_block_plugin_for_youku_tudou_iqiyi_ku6_etc.html";
	});

	$(".clearCache").button({
		icons: {
			primary: "ui-icon-trash"
		}
	}).bind("click", function() {

		$("#tabs").tabs("option", "active", 1);

		console.log("clear cache to make sure function works normally.");
		$("#msgBox").addClass("console");
		$("#msgBox").html("正在清空缓存……<br />\n");
		chrome.extension.getBackgroundPage().clearCache(function() {
			$("#msgBox").append("缓存已经清空……");
		});
	});
	
	$(".donateAuthor").button({
		icons: {
			primary: "ui-icon-heart"
		}
	}).bind("click", function() {
		$("#tabs").tabs("option", "active", 3);
	});
		
	$( "#tabs" ).tabs({
		collapsible: false
	});

	var showMsg = getQueryString("showMsg");
	if(showMsg != null && showMsg == "installed") {
		$( ".ui-tab" ).tabs({ active: 2 });
	} else {
		// 默认显示的标签
		$( ".ui-tab" ).tabs({ active: 1 });
	}

	$(".cacheMode").change(function(){
		var currentMode = $(this).prop("value");
		chrome.extension.getBackgroundPage().setCacheMode(currentMode);
	});
	$(".cacheMode").each(function() {
		var cacheMode = chrome.extension.getBackgroundPage().getCacheMode();
		if(cacheMode == $(this).val()) {
			$(this).prop("checked",true);
		}
	});

	$(".proxyMode").change(function(){
		var currentMode = $(this).prop("value");
		if(currentMode == "release") {
			chrome.extension.getBackgroundPage().releaseProxy();
		} else {
			chrome.extension.getBackgroundPage().controlProxy();
		}
	});
	$(".proxyMode").each(function() {
		var proxyMode = chrome.extension.getBackgroundPage().getProxyMode();
		if(proxyMode == $(this).val()) {
			$(this).prop("checked",true);
		}
	});

	$(".playerLocationMode").change(function(){
		var currentMode = $(this).prop("value");
		chrome.extension.getBackgroundPage().setPlayerLocationMode(currentMode);
	});
	$(".playerLocationMode").each(function() {
		var playerLocationMode = chrome.extension.getBackgroundPage().getPlayerLocationMode();
		if(playerLocationMode == $(this).val()) {
			$(this).prop("checked",true);
		}
	});
	
	
	$(".noticeMode").change(function(){
		var currentMode = $(this).prop("value");
		chrome.extension.getBackgroundPage().setNoticeMode(currentMode);
	});
	$(".noticeMode").each(function() {
		var noticeMode = chrome.extension.getBackgroundPage().getNoticeMode();
		if(noticeMode == $(this).val()) {
			$(this).prop("checked",true);
		}
	});

});


function getQueryString(name) {
	// 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
	if(location.href.indexOf("?") == -1 || location.href.indexOf(name + '=') == -1)
	{
		return "";
	}

	// 获取链接中参数部分
	var queryString = location.href.substring(location.href.indexOf("?")+1);

	// 分离参数对 ?key=value&key2=value2
	var parameters = queryString.split("&");

	var pos, paraName, paraValue;
	for(var i=0; i<parameters.length; i++)
	{
		// 获取等号位置
		pos = parameters[i].indexOf('=');
		if(pos == -1) { continue; }

		// 获取name 和 value
		paraName = parameters[i].substring(0, pos);
		paraValue = parameters[i].substring(pos + 1);

		// 如果查询的name等于当前name，就返回当前值，同时，将链接中的+号还原成空格
		if(paraName == name)
		{
			return unescape(paraValue.replace(/\+/g, " "));
		}
	}
	return "";
};
