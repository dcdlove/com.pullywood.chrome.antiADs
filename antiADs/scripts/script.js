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

// 播放器地址替换
// Added By Joey 2014-02-23
function replacePlayer(codeUrl, orignalUrl, replaceUrl) {
	
	if(codeUrl && codeUrl.length > 0) {
		orignalUrl = codeUrl;
	}
	
	//********播放器替换****************************/
	// embed嵌入方式
	replaceAttribute("embed[type='application/x-shockwave-flash']", "src", orignalUrl, replaceUrl);
	// object嵌入方式
	replaceAttribute("object[type='application/x-shockwave-flash']", "data", orignalUrl, replaceUrl);
	// param嵌入方式(属性名src)
	replaceAttribute("param[name='src']", "value", orignalUrl, replaceUrl);
	// param嵌入方式(属性名movie)
	replaceAttribute("param[name='movie']", "value", orignalUrl, replaceUrl);
	//********播放器替换****************************/
	
}

// 替换指包含指定属性值的指定元素的指定属性值，此方法要求使用jQuery及选择器方式参数
// Added By Joey 2014-02-24
function replaceAttribute(jQuerySelector, attribute, oldValue, newValue) {
	$(jQuerySelector).each(function() {
		/** 酷6小朋友不按标准格式写播放器flash的URL会导致URL匹配失败，固用不使用如下匹配方式
		if($(this).attr(attribute) == oldValue) {
			$(this).attr(attribute, newValue);
		}
		**/
		if(oldValue.indexOf($(this).attr(attribute)) > -1) {
			$(this).attr(attribute, newValue);
			reloadElement($(this).get(0));
		}
	});
}

// 重载元素(_element要求为DOM对象)
// Added By Joey 2014-02-24
function reloadElement(_element) {
	var $_element = $(_element);
	var content = $_element.parent().html();
	$_element.parent().html(content);
}

