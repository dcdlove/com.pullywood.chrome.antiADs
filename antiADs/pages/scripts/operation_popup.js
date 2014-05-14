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
 

var _static_center_SW_key = "pullywood_sw";
var _static_item_SW_key = ".switchBtn";

$(function() {
	renderBtnUI();
	
	$(_static_item_SW_key).click(function() {
		var id = $(this).attr("id");
		if(typeof id == "undefined" || id.length <= 0) {
			return;
		} else {
			var sw_status = getSW_status(id);
			// 反转状态值
			if(sw_status == "on") {
				sw_status = "off";
			} else {
				sw_status = "on";
			}
			setSW_status(id, sw_status);
			
			// 更新视图
			renderBtnUI();
			// 更新后台工作状态
			chrome.extension.getBackgroundPage().statusChange();
		}
	});
});

// 更新UI
function renderBtnUI() {
	$(_static_item_SW_key).each(function() {
		var id = $(this).attr("id");
		if(typeof id == "undefined" || id.length <= 0) {
			return;
		} else {
			var sw_status = getSW_status(id);
			if(sw_status == "on") {
				$(this).removeClass("button_sw_0").addClass("button_sw_1");
			} else {
				$(this).removeClass("button_sw_1").addClass("button_sw_0");
			}
		}
	});
}

// 获取属性值(storage)
function getSW_status(id) {
	if(typeof id == "undefined" || id.length <= 0) {
		return;
	} else if(id == _static_center_SW_key) {
		// 获取全局开关值，此值需依页面元素id从storage中获取
		var $elements = $(_static_item_SW_key);
		var sw_status = "on";
		for(var i = 0; i < $elements.length; i++) {
			var itemId = $($elements[i]).attr("id");
			if(typeof itemId == "undefined" || itemId == id) {
				// 此处谨防递归死循环
				continue;
			}
			var item_status = getSW_status(itemId);
			if(item_status == "off") {
				sw_status = "off";
				break;
			}
		}
		return sw_status;
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

// 存储属性值(storage)
function setSW_status(id, sw_status) {
	if(typeof id == "undefined" || id.length <= 0) {
		return;
	} else if(id == _static_center_SW_key) {
		// 获取全局开关值，此值需依页面元素id从storage中获取
		var $elements = $(_static_item_SW_key);
		for(var i = 0; i < $elements.length; i++) {
			var itemId = $($elements[i]).attr("id");
			if(typeof itemId == "undefined" || itemId == id) {
				// 此处谨防递归死循环
				continue;
			}
			setSW_status(itemId, sw_status);
		}
	} else {
		if(typeof sw_status == "undefined") {
			sw_status = "on";
		} else if(sw_status != "off" && sw_status != "on") {
			sw_status = "on";
		}
		localStorage[id] = sw_status;
	}
}