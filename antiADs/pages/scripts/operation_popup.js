

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