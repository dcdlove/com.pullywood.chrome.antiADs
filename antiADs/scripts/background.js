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
document.write("<script language=\"javascript\" src=\"scripts/jquery.js\"></script>");

var intervalWorker;
var crossdomaincheck0 = 0;	// crossdomain.xml代理检查(0=未检查, 1=通过，2=不通过)
var crossdomaincheck1 = 0;	// crossdomain.xml代理检查(0=未检查, 1=通过，2=不通过)
 

var blockFilter = { urls: ["http://iamnotexist.web/"]};
var blockUrls = new Array();

var redirectFilter = {};
var redirectUrls = new Array();

// 配置请求阻断地址及flash重载地址
blockUrls["youku_sw"] = [
		// youku
		"http://valf.atm.youku.com/crossdomain.xml", 
		"http://*.l.ykimg.com/*", 
		"http://*.e.stat.ykimg.com/red/", 
		"http://*.f.youku.com/crossdomain.xml", 
		"http://*.atm.youku.com/*", 
		"http://realtime.monitor.ppweb.com.cn:6001/*"
];
redirectUrls["youku_sw"] = [
		// youku
		"http://static.youku.com/*/swf/loader.swf", 
		"http://static.youku.com/*/swf/loader.swf?*",
		"http://static.youku.com/*/swf/loaders.swf", 
		"http://static.youku.com/*/swf/loaders.swf?*", 
		"http://static.youku.com/*/swf/player*.swf", 
		"http://static.youku.com/*/swf/player*.swf?*"
];

blockUrls["tudou_sw"] = [
		// tudou
		"http://td.atm.youku.com/*object-subrequest*", 
		"http://js.tudouui.com/bin/player/*object*", 
		"http://*.tudou.com/*/outside.php*", 
		"http://player.pb.ops.tudou.com/*", 
		"http://adextensioncontrol.tudou.com/*", 
		"http://adplay.tudou.com/*", 
		"http://adcontrol.tudou.com/*", 
		"http://iwstat.tudou.com/*", 
		"http://nstat.tudou.com/*", 
		"http://stat.tudou.com/*", 
		"http://stats.tudou.com/*", 
		"http://*.p2v.tudou.com/*", 
		"http://valf.atm.youku.com/vf*"
];
redirectUrls["tudou_sw"] = [];

blockUrls["iqiyi_sw"] = [
		// iqiyi
		"http://ata.video.qiyi.com/videos/other/*object_subrequest*", 
		"http://*.iqiyi.com/*ts.swf*", 
		"http://msg.iqiyi.com/*",
		"http://static.qiyi.com/js/pingback/*", 
		"http://jsmsg.video.qiyi.com/*", 
		"http://msg.video.qiyi.com/*", 
		"http://uestat.video.qiyi.com/*", 
		"http://qiyipic.com/common/*object_subrequest*",
		"http://dispatcher.video.qiyi.com/dispn/*am*", 
		"http://www.iqiyi.com/player/cupid/common/*am*.swf"
];
redirectUrls["iqiyi_sw"] = [
		// iqiyi
		"http://www.iqiyi.com/player/*/Player.swf", 
		"http://www.iqiyi.com/player/*/Player.swf?*",
		"http://www.iqiyi.com/player/cupid/common/pps_flvplay_s.swf",
		"http://www.iqiyi.com/player/cupid/common/pps_flvplay_s.swf?*",
		
		"http://www.bilibili.tv/iqiyi.swf"
];

blockUrls["letv_sw"] = [
		"http://ark.letv.com/*"
];
redirectUrls["letv_sw"] = [
		// letv
		"http://player.letvcdn.com/p/*/LetvPlayer.swf",
		"http://player.letvcdn.com/p/*/LetvPlayer.swf?*"
];

blockUrls["sohu_sw"] = [];
redirectUrls["sohu_sw"] = [
		// sohu
		"http://tv.sohu.com/upload/swf/*/Main.swf", 
		"http://tv.sohu.com/upload/swf/*/Main.swf?*",
		"http://61.135.176.223/*/Main.swf",
		"http://61.135.176.223/*/Main.swf?*",
		"http://tv.sohu.com/upload/swf/*/Main.swf?*",
		"http://tv.sohu.com/upload/swf/*/PlayerShell.swf", 
		"http://tv.sohu.com/upload/swf/*/PlayerShell.swf?*"
];

blockUrls["ku6_sw"] = [
		// ku6 
		"http://*.aa.sdo.com/*",
		"http://st.vq.ku6.cn/*", 
		"http://stat.ku6.com/*/object_subrequest", 
		"http://gug.ku6cdn.com/*", 
		"http://m.ku6.com/statics/js/official_install_beacon.js",
		"http://*.acs86.com/*", 
		"http://*.snyu.com/*"
];
redirectUrls["ku6_sw"] = [
		// ku6
		"http://player.ku6cdn.com/default/common/*/player.swf", // 精力有限，仅从本地加载通用播放器，音乐播放从官方加载
		"http://player.ku6cdn.com/default/common/*/player.swf?*",
		"http://player.ku6cdn.com/default/loader/*/v.swf",
		"http://player.ku6cdn.com/default/loader/*/v.swf?*",
		"http://player.ku6cdn.com/default/loader/*/loader.swf",
		"http://player.ku6cdn.com/default/loader/*/loader.swf?*",
		//"http://player.ku6.com/inside/*/v.swf",
		//"http://player.ku6.com/inside/*/v.swf?*",
];
// 配置请求阻断地址及flash重载地址


//********阻断广告内容请求*******************************/

var block_InfoSpec = ["blocking"];

var blockCallback = function(details) {
	return {cancel: true};
};
//********阻断广告内容请求*******************************/


//********加载本地播放器****************************/

var opt_extraInfoSpec = ["blocking"];


var redirectCallback = function(details) {
	var redirectUrl = details.url;
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////播放器加载配置//////////////////////////////////////////////////////////////////////////////////////////
	if(details.url.indexOf("youku.com") > -1) {
		// youku
		redirectUrl = parsePlayerUrl("flashes/youku/" + details.url.replace(/[^?]*\//, ""));
		// 检查扩展中是否未包含的播放器使用默认
		var players = ["player.swf", "player_touch.swf", "player_yk.swf", "player_yknpsv.swf"];
		var regexp = /player[_a-zA-Z0-9]*\.swf/;
		var pUrl = details.url;
		var player = pUrl.match(regexp);
		if(!player || players.indexOf(player[0]) == -1) {
			// 扩展中未收入该播放器
			redirectUrl = redirectUrl.replace(regexp, "player.swf");
		}
		// 检查扩展中是否未包含的播放器使用默认
		console.log("load from youku: " + details.url);
	}else if(details.url.indexOf("http://www.bilibili.tv/iqiyi.swf") > -1) {
		redirectUrl = parsePlayerUrl("flashes/iqiyi/" + details.url.replace(/[^?]*\/iqiyi\.swf/, "bilibili_iqiyi.swf"));
		console.log("load from iqiyi: " + details.url);
	} else if(details.url.indexOf("iqiyi.com") > -1) {
		// iqiyi
		if(details.url.match("Player.swf\\?[a-zA-Z]=") != null) {
			redirectUrl = parsePlayerUrl("flashes/iqiyi/" + details.url.replace(/[^?]*\/Player.swf/, "pps_Player.swf"));
			console.log("load from iqiyi: " + details.url);
		} else if(details.url.indexOf("vid=") > -1) {
			redirectUrl = parsePlayerUrl("flashes/iqiyi/" + details.url.replace(/[^?]*\/Player.swf/, "bilibili_Player.swf"));
			console.log("load from iqiyi: " + details.url);
		} else {
			redirectUrl = parsePlayerUrl("flashes/iqiyi/" + details.url.replace(/[^?]*\//, ""));
			console.log("load from iqiyi: " + details.url);
		}
	} else if(details.url.indexOf("ku6cdn.com") > -1) {
		// ku6
		redirectUrl = parsePlayerUrl("flashes/ku6/" + details.url.replace(/[^?]*\//, ""));
		console.log("load from ku6: " + details.url);
	} else if(details.url.indexOf("letvcdn.com") > -1 || details.url.indexOf("letv.com") > -1) {
		// letv
		redirectUrl = parsePlayerUrl("flashes/letv/" + details.url.replace(/[^?]*\//, ""));
		console.log("load from letv: " + details.url);
	} else if(details.url.indexOf("sohu.com") > -1 || details.url.indexOf("61.135.176.223") > -1) {
		// sohu
		redirectUrl = parsePlayerUrl("flashes/sohu/" + details.url.replace(/[^?]*\//, ""));
		console.log("load from sohu: " + details.url);
	}
	////////播放器加载配置//////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	if(redirectUrl != details.url) {
		// 页面中播放器地址替换, 以修复新版chrome中flash扩展阻止页面中flash请求重定向导致本地播放器无法加载的问题
		// 此处要求Tabs权限
		// Added By Joey 2014-02-23
		chrome.tabs.executeScript(details.tabId, {
			allFrames: true, 
			code: "replacePlayer(" + createVarNameWithRequestId(details.requestId) + ", \"" + details.url + "\", \"" + redirectUrl + "\");", 
		});
		
		/**
		 * Commented By Joey 2014-03-26
		 * 此方法会遗漏URL跳转时的情形
		// 针对直接请求flash播放器(相对页面内嵌)的情况替换播放器地址
		 **/
		chrome.tabs.get(details.tabId, function(tab){
			// 检查url是否与需重定向的地址一致，如果是则替换重新加载
			if(tab.url == details.url) {
				// 播放器地址替换
				console.log("replace tab url: " + redirectUrl);
				chrome.tabs.update(tab.id, {url: redirectUrl});
			}
		});
	};
	
	// 新版chrome中flash插件不再支持页面内嵌的flash资源重定向(表现为自动取消请求)，固不再进行请求重定向
	// return {redirectUrl: redirectUrl};
	
};
//********加载本地播放器****************************/


//********记录本地文件载入情况(DEBUG)****************************/
var logcallback = function(details) {
	console.log("load from extension: " + details.url);
};
var logfilter = {
	urls: [chrome.extension.getURL("") + "*"]
};
var log_extraInfoSpec = ["blocking"];
chrome.webRequest.onBeforeRequest.addListener(logcallback, logfilter, log_extraInfoSpec);
//********记录本地文件载入情况(DEBUG)****************************/

//********crossdomain.xml*******************************/
var crossdomain_config = {
  mode: "pac_script",
  pacScript: {
    data: "function FindProxyForURL(url, host) {\n" +
    			"	 var regexStr = /.*?:\\/\\/.*?(youku|qiyi|iqiyi|letv|sohu|ku6|ku6cdn|pps)\\.(com|tv)\\/crossdomain\\.xml/;\n" + 
          "  if(regexStr.test(url)){\n " +
          "    return 'PROXY api.youku.com:80';\n" +
          "  }\n" + 
          "  return 'DIRECT';\n" +
          "}"
  }
};
//********crossdomain.xml*******************************/

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////////////////////////////////////////////////////////////
statusChange();//-扩展初始化时默认执行一次statusChange配置---
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////////////////////////////////////////////////////////////

// 添加代理变动监听器
chrome.proxy.settings.onChange.addListener(checkConfig);
function checkConfig(config){
	// 代理设置变动时，执行状态变更函数
	statusChange();
}

function statusChange() {
	// 状态变动时，统一移除监听器
	chrome.webRequest.onBeforeRequest.removeListener(blockCallback);
	chrome.webRequest.onBeforeRequest.removeListener(redirectCallback);
	
	// 图标先显示为正常
	setPopupNormal();
	
	// 取得当前配置的模式
	var proxyMode = getProxyMode();
	
	// block地址过滤器及redirect地址过滤器更新
	updateBlockFilterAndRedirectFilter();
		
	// 依据配置操作
	if(proxyMode == "control") {
		// 控制模式
		chrome.proxy.settings.get({incognito: false}, function(config){
			if(config.levelOfControl == "controlled_by_other_extensions") {
				// 没有控制权限，显示提示
				setPopupError();
			} else {
				// 本扩展已经获得proxy控制权限，显示正常
				setPopupNormal();
				// 拥有控制权，添加监听器
				chrome.webRequest.onBeforeRequest.addListener(blockCallback, blockFilter, block_InfoSpec);
				chrome.webRequest.onBeforeRequest.addListener(redirectCallback, redirectFilter, opt_extraInfoSpec);
			}
		});
	} else {
		// 代理模式
		chrome.webRequest.onBeforeRequest.addListener(blockCallback, blockFilter, block_InfoSpec);
		chrome.webRequest.onBeforeRequest.addListener(redirectCallback, redirectFilter, opt_extraInfoSpec);
		// 停止之前的定时器(如果有)。
		clearInterval(intervalWorker);
		intervalWorker = setInterval(function() {
			$.get("http://v.youku.com/crossdomain.xml", function(data){
				var policy = data.getElementsByTagName("allow-access-from")[0].getAttribute("domain")
				if(policy != null && policy == "*") {
					crossdomaincheck0 = 1;
				} else {
					crossdomaincheck0 = 2
				}
				doProxyModeCheck();
			});
			$.get("http://ku6cdn.com/crossdomain.xml", function(data){
				var policy = data.getElementsByTagName("allow-access-from")[0].getAttribute("domain")
				if(policy != null && policy == "*") {
					crossdomaincheck1 = 1;
				} else {
					crossdomaincheck1 = 2
				}
				doProxyModeCheck();
			});
		}, 2500);
	}
	// 检测开关状态，如果所有开关都关闭，则让出代理控制权(如果已经控制)。
	if(redirectFilter.urls.length <= 1) {
		// 让出代理控制权
		chrome.proxy.settings.clear({scope: "regular"});
	}
	
	// 清空缓存
	// 由于不主动清理缓存将可能经常导致无法工作，固恢复自动清理缓存功能
	if(getCacheMode() =="auto") {
		console.log("auto clean cache...");
		clearCache();
	}
}

// block地址过滤器及redirect地址过滤器更新
function updateBlockFilterAndRedirectFilter() {
	
	var _blockFilter = ["http://iamnotexist.web/"];
	for(variable in blockUrls) {
		// 逐条检查开关状态
		var sw_status = getSW_status(variable);
		if(typeof sw_status != "undefined" && sw_status == "on") {
			// 添加规则
			_blockFilter = _blockFilter.concat(blockUrls[variable]);
		}
	}
	blockFilter = { urls: _blockFilter };
	
	var _redirectFilter = ["http://iamnotexist.web/"];
	for(variable in redirectUrls) {
		// 逐条检查开关状态
		var sw_status = getSW_status(variable);
		if(typeof sw_status != "undefined" && sw_status == "on") {
			// 添加规则
			_redirectFilter = _redirectFilter.concat(redirectUrls[variable]);
		}
	}
	redirectFilter = { urls: _redirectFilter };
}


// 获取开关属性值(storage)
function getSW_status(id) {
	if(typeof id == "undefined" || id.length <= 0) {
		return;
	} else {
		var sw_status = localStorage[id];
		if(typeof sw_status == "undefined") {
			sw_status = "on";
		} else if(sw_status != "off" && sw_status != "on") {
			sw_status = "on";
		}
		return sw_status;
	}
}

// 代理模式下检查配置
function doProxyModeCheck() {
	if(crossdomaincheck0 == 1 && crossdomaincheck1 == 1) {
		// 代理模式用户设置正常
		setPopupNormal();
		clearInterval(intervalWorker);
	} else if(crossdomaincheck0 == 2 && crossdomaincheck1 == 2) {
		// 代理模式用户设置异常
		setPopupWarning();
		
		// 设置异常，停止工作
		// Added By Joey 2014-02-25
		chrome.webRequest.onBeforeRequest.removeListener(blockCallback);
		chrome.webRequest.onBeforeRequest.removeListener(redirectCallback);
	}
}

// popup页配置
function setPopupNormal() {
	// 功能正常使用
	chrome.browserAction.setIcon({path :"images/icon.png"});
	chrome.browserAction.setPopup({popup: "pages/popup.html"});
	chrome.browserAction.setBadgeText({text:""});
	chrome.browserAction.setBadgeBackgroundColor({color:"#008000"});
}
function setPopupError() {
	// 正常模式，但没有取得代理控制权
	chrome.browserAction.setIcon({path :"images/icon_error.png"});
	chrome.browserAction.setPopup({popup: "pages/popup_error.html"});
	chrome.browserAction.setBadgeText({text:"stop"});
	chrome.browserAction.setBadgeBackgroundColor({color:"#ff8000"});
}
function setPopupWarning() {
	// 代理模式，但代理控制扩展的配置有问题
	chrome.browserAction.setIcon({path :"images/icon_warning.png"});
	chrome.browserAction.setPopup({popup: "pages/popup_warning.html"});
	chrome.browserAction.setBadgeText({text:"issu"});
	chrome.browserAction.setBadgeBackgroundColor({color:"#ff8000"});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// 模式变更
function controlProxy() {
	// 控制代理
	localStorage["proxyMode"] = "control";
	chrome.proxy.settings.set({value: crossdomain_config, scope: "regular"}, function(details) {});
	statusChange();
}
function releaseProxy() {
	// 释放代理
	localStorage["proxyMode"] = "release";
	chrome.proxy.settings.clear({scope: "regular"});
	statusChange();
}
function getProxyMode() {
	// 取得当前配置的模式
	var proxyMode = localStorage["proxyMode"];
	if(proxyMode == null || proxyMode == "" || (proxyMode != "control" && proxyMode != "release")) {
		proxyMode = "control";
	}
	return proxyMode;
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////////////////////////////////////////////////////////////
initalProxy();//-扩展初始化时默认执行一次initalProxy配置---
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////////////////////////////////////////////////////////////
function initalProxy() {
	var proxyMode = getProxyMode();
	
	if(proxyMode == "control") {
		// 控制模式
		controlProxy();
	} else {
		// 代理模式
		releaseProxy();
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// 安装/升级 后提示
function clearCache(callback) {
	// 清空缓存	
	chrome.browsingData.removeCache({}, callback);
	console.log("clear cache to make sure function works normally.");
}

function getCacheMode() {
	// 获取缓存模式
	var cacheMode = localStorage["cacheMode"];
	if(cacheMode == null || cacheMode == "" || (cacheMode != "auto" && cacheMode != "manual")) {
		// 设定默认值，默认值为 auto
		cacheMode = "auto";
		localStorage["cacheMode"] = cacheMode;
	}
	return cacheMode;
}
function setCacheMode(cacheMode) {
	// 设置缓存模式
	if(cacheMode == "auto" || cacheMode == "manual") {
		localStorage["cacheMode"] = cacheMode;
	}
}

function getNoticeMode() {
	// 获取通知模式
	var noticeMode = localStorage["noticeMode"];
	if(noticeMode == null || noticeMode == "" || (noticeMode != "popup" && noticeMode != "silent")) {
		// 设定默认值
		noticeMode = "popup";
		localStorage["noticeMode"] = noticeMode;
	}
	return noticeMode;
}
function setNoticeMode(noticeMode) {
	// 设置通知模式
	if(noticeMode == "popup" || noticeMode == "silent") {
		localStorage["noticeMode"] = noticeMode;
	}
}

	// 安装提示
function noticeInstalled() {
  var currVersion = chrome.app.getDetails().version;
  var prevVersion = localStorage["version"]
  if (currVersion != prevVersion && getNoticeMode() == "popup") {
    if (typeof prevVersion == "undefined") {
      chrome.tabs.create({url: "pages/options.html?showMsg=installed"});
    } else {
      chrome.tabs.create({url: "pages/options.html?showMsg=installed"});
    }
    localStorage["version"] = currVersion;
    // 好吧，本不应该把这行放到这里来的 Added By Joey 2014-04-12
    clearCache();
  }
}

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
  	  noticeInstalled();
    } else if (details.reason == "update"){
  	  noticeInstalled();
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//********调整播放器加载方式：请求跳转跟踪****************************/
var _lab_callback = function(details) {
	
	console.log("_orignal_url: " + details.url);
	console.log("_redirect_Url: " + details.redirectUrl);
	
	// 存储跳转前地址至页面
	
	// Added By Joey 2014-02-23
	// 注：应该在manifest.json里加入Tabs权限。
	chrome.tabs.executeScript(details.tabId, {
		allFrames: true,
		code: createVarNameWithRequestId(details.requestId) + " = \"" + details.url + "\" ;"
	});
	
};
// 检查所有页面以保证外链页面也能正常播放
var _lab_filter = {
	urls: [
		"http://*/*"
	]
};
//********调整播放器加载方式：请求跳转跟踪****************************/
chrome.webRequest.onBeforeRedirect.addListener(_lab_callback, _lab_filter);

// 加载方式：在线
// localStorage["playerLocationMode"] = "online";	// online | offline

function getPlayerLocationMode() {
	// 获取播放器地址配置
	var playerLocationMode = localStorage["playerLocationMode"];
	if(playerLocationMode == null || playerLocationMode == "" || (playerLocationMode != "offline" && playerLocationMode != "online")) {
		// 设定默认值
		playerLocationMode = "offline";
		localStorage["playerLocationMode"] = playerLocationMode;
	}
	return playerLocationMode;
}
function setPlayerLocationMode(playerLocationMode) {
	// 设置播放器地址配置
	if(playerLocationMode == "online" || playerLocationMode == "offline") {
		localStorage["playerLocationMode"] = playerLocationMode;
	}
}

// 生成播放器地址
function parsePlayerUrl(relativePath) {
	if(localStorage["playerLocationMode"] == "offline") {
		// 离线加载
		return chrome.extension.getURL(relativePath);
	} else {
		// 在线加载播放器位置
		return "http://api.pullywood.com:1010/antiADs/" + relativePath;
	}
}


// 扩展加载时生成变量随机前缀
var _static_Prefix = randomChar(16) + "_";
function createVarNameWithRequestId(requestId) {
	return "window[\"" + _static_Prefix + requestId + "\"]";
}

// 生成指定长度的随机字符串
function  randomChar(l)  {
	var x="0123456789qwertyuioplkjhgfdsazxcvbnm";
	var tmp="";
	for(var i=0;i< l;i++)  {
		tmp += x.charAt(Math.ceil(Math.random()*100000000)%x.length);
	}
	return tmp;
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++