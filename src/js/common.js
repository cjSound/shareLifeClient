import hex_md5 from './md5';
import * as config from './define';
import  {Indicator,Toast}   from 'mint-ui';
import router from './../router/index'
import store from './../store/index'
/**
 * 整个框架父类
 */
var SY = {

};

SY.config = {
	user: 'userinfo',
	pager:{
		pageSize:10,//每次分页请求的数据数量
		page:1,//page  当前第几页
		index:1,//当前第几页
		allpage:''
	}
}
SY.code={
	timeout:'网络好像不太好的说~~'
}
SY.reg={
	up:/^\+?[1-9][0-9]*$/,
	phone:/^1[3|4|7|5|8][0-9]\d{8}$/,
	psw:/^[A-Za-z0-9]{6,20}$/,
	bank:/^\d{16}$|^\d{19}$/,
	email:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
}
/**
 * @description cookie模块
 */
SY.cookie = {
	set: function(c_name, value, expiredays) {
		var exdate = new Date()
		if(!expiredays) {
			document.cookie = c_name + "=" + escape(JSON.stringify(value)) + ";path=/;";
		} else {
			exdate.setDate(exdate.getDate() + expiredays * 1);
			document.cookie = c_name + "=" + escape(JSON.stringify(value)) +
				";expires=" + exdate.toGMTString()
		}
	},
	get: function(c_name) {
		var res = "";
		if(document.cookie.length > 0) {
			var c_start = document.cookie.indexOf(c_name + "=");
			if(c_start != -1) {
				c_start = c_start + c_name.length + 1
				var c_end = document.cookie.indexOf(";", c_start)
				if(c_end == -1) c_end = document.cookie.length
				res = unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return res;
	},
	del: function(c_name) {
		var exp = new Date();
		exp.setDate(exp.getDate() - 1);
		var cval = this.get(c_name);
		if(cval != null) {
			document.cookie = c_name + "=" + escape(cval) + ";expires=" + exp.toGMTString() + ";path=/;";
		}
	},
	clear: function() {
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if(keys) {
			for(var i = keys.length; i--;) {
				this.del(keys[i]);
			}
		}
	}
};

SY.localstorage = {
	getStarage: function() {
		return localStorage;
	},
	/**
	 * @description 存储key-value
	 * @param {String} key 存储的键值
	 * @param {String} value 存储的内容
	 */
	put: function(key, value) {
		this.getStarage().removeItem(key);
		var curTime = new Date().getTime();
		this.getStarage().setItem(key, JSON.stringify({data:value,time:curTime}));
	},
	/**
	 * @description 通过key值检索键值
	 * @param {String} key 存储的键值
	 * @return {String}
	 */
	get: function(key,exp) {
		var data = this.getStarage().getItem(key);
        var dataObj = JSON.parse(data);
        if(exp==null){
        	exp=365;
        }
       
        if(dataObj!=null &&dataObj!=''){
        	var time =new Date().getTime() - dataObj.time;
        	var data =time/1000/60/60/24.0;
        	if (data>exp) {
           	 console.log('信息已过期');
           	 return null;
	        }else{
	            return  dataObj.data;
	        }
        }else{
        	return null;
        }
         
	},
	/**
	 * @description 通过key值删除键值对
	 * @param {String} key 存储的键值
	 */
	remove: function(key) {
		this.getStarage().removeItem(key);
	},
	/**
	 * @description 获取storage中保存的键值对的数量
	 * @return {Number}
	 */
	getItemCount: function() {
		return this.getStarage().getLength();
	},
	/**
	 * @description 获取键值对中指定索引值的key值
	 * @return {String}
	 */
	key: function(index) {
		return this.getStarage().key(index);
	},
	/**
	 * @description 清除应用所有的键值对,不建议使用
	 */
	clearAll: function() {
		var user =SY.User.getUser();
		this.getStarage().clear();
		if(user!=null ){
			SY.User.setUser(user);
		}
	}

};
SY.log = {
	islog: config.debug,
	/**
	 * 信息分组开始
	 * @param {String} d
	 */
	group: function(d) {
		if(this.islog) {
			console.group(d)
		} 
	},

	/**
	 * 信息分组结束
	 */
	groupEnd: function() {
		if(this.islog) {
			console.groupEnd();
		}
	},
	/**
	 * 查询对象
	 * @param {String} d
	 */
	dir: function(d) {
		if(this.islog) {
			console.dir(d);
		}
	},
	/**
	 * 追踪函数的调用轨迹
	 */
	trace: function() {
		if(this.islog) {
			console.trace()
		}
	},
	/**
	 * @description 打印info日志
	 * @param {String} d 打印内容
	 */
	info: function(d) {
		if(this.islog) {
			console.info(d);
		}
	},
	/**
	 * @description 打印log日志
	 * @param {String} d 打印内容
	 * @param 可变参数 用于格式刷打印日志，比如：LF.log.log("%d年%d月%d日",2011,3,26); 结果是：2011年3月26日
	 * 支持的占位符有：字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）
	 */
	log: function(d, ...t) {
		if(this.islog) {
			console.log(d, ...t);
		}
	},
	/**
	 * @description 打印debug日志
	 * @param {String} d 打印内容
	 */
	debug: function(d) {
		if(this.islog) {
			console.debug(d);
		}
	},
	/**
	 * @description 打印warn日志
	 * @param {String} d 打印内容
	 */
	warn: function(d) {
		if(this.islog) {
			console.warn(d);
		}
	},
	/**
	 * @description 打印error日志
	 * @param {String} d 打印内容
	 */
	error: function(d) {
		if(this.islog) {
			console.error(d);
		}
	}
};
SY.User = {
	getUser: function() {
		var user =SY.localstorage.get(SY.config.user,3);
		if(user !=null && user !=''){
			return user;	
		}else{
			return  null;
		}
		
	},
	setUser: function(user) {
		SY.localstorage.put(SY.config.user, user);
	},
	removeUser(){
		SY.localstorage.remove(SY.config.user);
	},
	hasLogin:function(ts){
		var user =SY.User.getUser();
		if(user ==null){
			ts.$router.push({path: "/login"});
		}
	}
}
SY.animate = { //数字金额从0到当前位置的效果
	animate: function(opts) {
		var start = new Date
		var timer = setInterval(function() {
			var timePassed = new Date - start;
			var progress = timePassed / opts.duration;
			if(progress > 1) progress = 1;
			var delta = opts.delta(progress)
			opts.step(delta)
			if(progress == 1) {
				clearInterval(timer);
				opts.end();
			}
		}, opts.delay || 10)

	},
	change: function(element, from, to, delta, duration) {
		from = from || 0
		to = to || 80
		SY.animate.animate({
			delay: 20,
			duration: duration || 1000,
			delta: delta,
			step: function(delta) {
				element.innerHTML = parseInt(from + (to - from) * delta)
			},
			end: function() {
				element.innerHTML = to;
			}
		})

	}
}
SY.util = {
	isApp(){//判断是否是手机打开模式
		return  /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
	},
	pushUrl(obj){
		/*if(obj.path.indexOf("?")!=-1){
			obj.path=obj.path+="&hash="+SY.util.randomString(8);
		}else{
			obj.path=obj.path+="?hash="+SY.util.randomString(8);
		}*/
		router.push({path:obj.path});
	},
	getScrollTop() {
		var scrollPos;
		if (window.pageYOffset) {
		scrollPos = window.pageYOffset; }
		else if (document.compatMode && document.compatMode != 'BackCompat')
		{ scrollPos = document.documentElement.scrollTop; }
		else if (document.body) { scrollPos = document.body.scrollTop; } 
		return scrollPos; 
	},
	getScrollBottom() {
		var scrollPos;
		if (window.pageYOffset) {
		scrollPos = window.pageYOffset; }
		else if (document.compatMode && document.compatMode != 'BackCompat')
		{ scrollPos = document.documentElement.scrollBottom; }
		else if (document.body) { scrollPos = document.body.scrollBottom; } 
		return scrollPos; 
	},
	concatArrayToString(arr){
		var ars ="";
		if(arr==null||arr=='')
		return "";
		for(var i =0;i<arr.length;i++){
			ars+=arr[i];
			if(i!=arr.length-1){
				ars+="-";
			}
		}
		return ars;
	},
	clearObj(obj){
		for(var i in obj){
			obj[i]='';
		}
	},
	clearObj(obj){
		for(var key in obj) {
			if(obj[key] instanceof Array){
				obj[key]=[]
			}else if(typeof obj[key] === 'object' ){
				SY.util.clearObj(obj[key]);
			}else {
				obj[key]='';	
			}
		}
	},
	/*克隆一个对象*/
	cloneObj(obj) {
		var newObj = {};
		if(obj instanceof Array) {
			newObj = [];
		}
		for(var key in obj) {
			var val = obj[key];
			newObj[key] = typeof val === 'object' ? SY.util.cloneObj(val) : val;
		}
		return newObj;
	},
	/*对敏感信息 进行*号处理  比如id  身份证号,手机号*/
	infoPrivacy(el){
		let ht= el.innerHTML;
	    let ls =el.innerHTML.length;
	    let rep,length=0;
		if(ls>10){
			rep=ht.substring(0,ls-5);
			length=ls-5;
		}else if(ls<4){
			rep=ht.substring(1,ls-1);
			length=ls-2;
		}else{
			rep=ht.substring(2,ls-2);
			length=ls-4;
		}
		let repl ='';
		for(let i =0;i<length;i++){
			repl+='*';
		}
	    ht =ht.replace(rep,repl);
	    el.innerHTML=ht;
	},
	extend(destination, source){
		for (var property in destination) {
		    destination[property] = source[property];   // 利用动态语言的特性, 通过赋值动态添加属性与方法
		}
		return destination;
	},
	hex_md5:function(str){
		return hex_md5(str);
	},
	/*在传递数据的时候对对象进行中文编码处理*/
	encodeParemt(paremt){
		var a={};
		for(var i in paremt){
			a[i]=encodeURI(paremt[i]);
		}
		return  a;
	},
	getUrl:function(){
		return config.SERVER_BAS_URL;
	},
	/**
	 * 获取url后面的参数  返回json
	 */
	getParams: function() {
		var url = window.location.hash;
		var theRequest = null;
		if(url.indexOf("?") != -1) {
			url = url.split("?")[1];
			theRequest = new Object();
			var str = url.substr(0);
			var strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		if(theRequest != null)
			return theRequest;
		else
			return null;
	},
	formatDate: function(value,type) {
		if(value == null) {
			return '';
		}
		if(typeof(value)=='string' && value.indexOf(' 00:00')){
			value=value.split(' 00:00')[0];
			return value;
		}
		var  date=new Date(value);
		
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		var minute = date.getMinutes();
		minute = minute < 10 ? ('0' + minute) : minute;
		if(type==null||type==0){
			return y + '-' + m + '-' + d;
		}else if(type==1){
			return m + '-' + d;
		}else if(type==2){
			return d +":"+h;
		}else if (type==3){
			return y + '-' + m + '-' + d +" "+h+":"+minute;
		}else if (type==4){
			return    h+":"+minute;
		}
		
	},
	timeForLanguage(tim){
		var time =new Date()-tim;
		var m =Math.ceil(time/1000/60);
		if(m<60){
			return m+'分钟前'
		}else if(Math.ceil(time/1000/60/60)<24){
			return Math.ceil(time/1000/60/60)+'小时前'; 
		}else if(Math.ceil(time/1000/60/60/24)<365){
			return Math.ceil(time/1000/60/60/24)+'天前'; 
		}else{
			return Math.ceil(time/1000/60/60/24/365)+'年前'; 
		}
	},
	strToJson: function(jsonStr) {
		return JSON.parse(jsonStr);
	},
	jsonToStr: function(jsonObj) {
		return JSON.stringify(jsonObj);
	},
	//数组去重
	ArrayUnique: function(arr) {
		var res = [];
		var json = {};
		for(var i = 0; i < arr.length; i++) {
			if(!json[arr[i]]) {
				res.push(arr[i]);
				json[arr[i]] = 1;
			}
		}
		return res;
	},
	/**
	 * 数组删除指定的内容
	 */
	removeByValue: function(arr, val) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == val) {
				arr.splice(i, 1);
				break;
			}
		}
		return arr;
	},
	/**
	 * 手机上面   右滑返回事件
	 * @param {Object} id
	 */
	swipeBack: function(id) {
		var dom =document.getElementById(id);
		if(dom!=null){
			dom.addEventListener("swiperight", function(b) {
				window.history.back();
			})
		}
	},
	parseParam(queryConfig){//吧对象转为url字符拼接
	    var _str = ""; 
		for(var o in queryConfig){ 
			if(queryConfig[o] != -1){ 
				_str += o + "=" + queryConfig[o] + "&"; 
			} 
		} 
		var _str = _str.substring(0, _str.length-1); 
		return _str; 
	},
	randomString(len) {//生成一个随机字符串
	　　len = len || 32;
	　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	　　var maxPos = $chars.length;
	　　var pwd = '';
	　　for (let i = 0; i < len; i++) {
	　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	　　}
	　　return pwd;
	}
}
//通信模块 
SY.noop = function() {};
SY.net = {
	jsonType: 'application/json',
	htmlType: 'text/html',
	rscript: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	scriptTypeRE: /^(?:text|application)\/javascript/i,
	xmlTypeRE: /^(?:text|application)\/xml/i,
	blankRE: /^\s*$/,

	ajaxSettings: {
		type: 'GET',
		beforeSend: SY.noop,
		success: SY.noop,
		error: SY.noop,
		complete: SY.noop,
		context: null,
		xhr: function(protocol) {
			return new window.XMLHttpRequest();
		},
		accepts: {
			script: 'text/javascript, application/javascript, application/x-javascript',
			json: 'application/json',
			xml: 'application/xml, text/xml',
			html: 'text/html',
			text: 'text/plain'
		},
		timeout: 0,
		processData: true,
		cache: true
	},
	param: function(obj, traditional) {
		var params = [];
		params.add = function(k, v) {
			this.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
		};
		serialize(params, obj, traditional);
		return params.join('&').replace(/%20/g, '+');
	},
	serialize: function(params, obj, traditional, scope) {
		var seSY = this;
		var type, array = SY.util.isArray(obj),
			hash = SY.util.isPlainObject(obj);
		obj.forEach(function(key, value) {
			type = SY.util.type(value);
			if(scope) {
				key = traditional ? scope :
					scope + '[' + (hash || type === 'object' || type === 'array' ? key : '') + ']';
			}
			// handle data in serializeArray() format
			if(!scope && array) {
				seSY.params.add(value.name, value.value);
			}
			// recurse into nested objects
			else if(type === "array" || (!traditional && type === "object")) {
				seSY.serialize(params, value, traditional, key);
			} else {
				seSY.params.add(key, value);
			}
		});
	},
	appendQuery: function(url, query) {
		if(query === '') {
			return url;
		}
		return(url + '&' + query).replace(/[&?]{1,2}/, '?');
	},
	serializeData: function(options) {
		if(options.processData && options.data && typeof options.data !== "string") {
			var contentType = options.contentType;
			if(!contentType && options.headers) {
				contentType = options.headers['Content-Type'];
			}
			if(contentType && ~contentType.indexOf(jsonType)) { //application/json
				options.data = JSON.stringify(options.data);
			} else {
				//暂时不处理其他模式
				//				options.data = this.param(options.data, options.traditional);
			}
		}
		//		if(options.data && (!options.type || options.type.toUpperCase() === 'GET')) {
		//			options.url = appendQuery(options.url, options.data);
		//			options.data = undefined;
		//		}
	},
	ajaxBeforeSend: function(xhr, settings) {
		var context = settings.context
		if(settings.beforeSend.call(context, xhr, settings) === false) {
			return false;
		}
	},
	ajaxSuccess: function(data, xhr, settings) {
		settings.success.call(settings.context, data, 'success', xhr);
		this.ajaxComplete('success', xhr, settings);
	},
	// type: "timeout", "error", "abort", "parsererror"
	ajaxError: function(error, type, xhr, settings) {
		settings.error.call(settings.context, xhr, type, error);
		this.ajaxComplete(type, xhr, settings);
	},
	// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	ajaxComplete: function(status, xhr, settings) {
		settings.complete.call(settings.context, xhr, status);
	},
	_ajax: function(url, options = {}) {
		var seSY = this;
		if(typeof url === "object") {
			options = url;
			url = undefined;
		}
		var settings = options || {};
		settings.url = url || settings.url;

		for(var key in this.ajaxSettings) {
			if(settings[key] === undefined) {
				settings[key] = this.ajaxSettings[key];
			}
		}
		this.serializeData(settings);
		var dataType = settings.dataType;
		if(settings.cache === false || ((!options || options.cache !== true) && ('script' === dataType))) {
			settings.url = appendQuery(settings.url, '_=' + $.now());
		}
		var mime = settings.accepts[dataType && dataType.toLowerCase()];
		var headers = {};
		var setHeader = function(name, value) {
			headers[name.toLowerCase()] = [name, value];
		};
		var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
		var xhr = settings.xhr(settings);
		var nativeSetHeader = xhr.setRequestHeader;
		var abortTimeout;

		setHeader('Accept', mime || '*/*');
		if(!!(mime = settings.mimeType || mime)) {
			if(mime.indexOf(',') > -1) {
				mime = mime.split(',', 2)[0];
			}
			xhr.overrideMimeType && xhr.overrideMimeType(mime);
		}
		if(settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() !== 'GET')) {
			setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
		}
		if(settings.headers) {
			for(var name in settings.headers)
				setHeader(name, settings.headers[name]);
		}
		xhr.setRequestHeader = setHeader;

		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				xhr.onreadystatechange = SY.noop;
				clearTimeout(abortTimeout);
				var result, error = false;
				var isLocal = protocol === 'file:';
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && isLocal && xhr.responseText)) {
					dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
					result = xhr.responseText;
					try {
						if(dataType === 'script') {
							(1, eval)(result);
						} else if(dataType === 'xml') {
							result = xhr.responseXML;
						} else if(dataType === 'json') {
							result = seSY.blankRE.test(result) ? null : JSON.parse(result);
						}
					} catch(e) {
						error = e;
					}

					if(error) {
						seSY.ajaxError(error, 'parsererror', xhr, settings);
					} else {
						seSY.ajaxSuccess(result, xhr, settings);
					}
				} else {
					var status = xhr.status ? 'error' : 'abort';
					var statusText = xhr.statusText || null;
					if(isLocal) {
						status = 'error';
						statusText = '404';
					}
					seSY.ajaxError(statusText, status, xhr, settings);
				}
			}
		};
		if(seSY.ajaxBeforeSend(xhr, settings) === false) {
			xhr.abort();
			seSY.ajaxError(null, 'abort', xhr, settings);
			return xhr;
		}

		if(settings.xhrFields) {
			for(var name in settings.xhrFields) {
				xhr[name] = settings.xhrFields[name];
			}
		}

		var async = 'async' in settings ? settings.async : true;

		xhr.open(settings.type.toUpperCase(), settings.url, async, settings.username, settings.password);

		for(var name in headers) {
			if(headers.hasOwnProperty(name)) {
				nativeSetHeader.apply(xhr, headers[name]);
			}
		}
		if(settings.timeout > 0) {
			abortTimeout = setTimeout(function() {
				xhr.onreadystatechange = SY.noop;
				xhr.abort();
				seSY.ajaxError(null, 'timeout', xhr, settings);
			}, settings.timeout);
		}
		xhr.send(settings.data ? settings.data : null);
		return xhr;
	},
	ajax: function(url, {
		dataType = "json",
		type = "post",
		data = {},
		timeout = 10000,
		success,
		error,
		headers = {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		async = true
	} = {},filter) {
		if(url.indexOf("/") != 0) {
			url = "/" + url;
		}
		var action = url;
		url = config.SERVER_BAS_URL + url;
		
		SY.log.log("send[" + action + "]:" + SY.util.jsonToStr(data));
		var _success = function(data, textStatus, xhr) {
			SY.log.log("received[" + action + "]：" + JSON.stringify(data));
			Indicator.close();
			if(!(success === undefined)) {
				if(data.code==0){
					success(data);
				}else if(data.code==14){
					Toast({
					  	message: SY.app.code(data.s),
					  	iconClass: 'fa fa-power-off'
					});
					SY.localstorage.clearAll();
					router.push({path:'/login'});
				}else{
					Toast({
					  	message:  data.message,
					  	iconClass: 'fa fa-close '
					});
					//SY.localstorage.clearAll();
					//router.push({path:'/login'})
				}
			}
		}
		var _error = function(xhr, type, errorThrown) {
			SY.log.log("received[" + action + "]：" + type + "，errorThrown：" + errorThrown);
			Indicator.close();
			if(!(error === undefined)) {
				var o = {	
	
				}
				if(type == "timeout") {
					o.code = "999";
					o.errorMessage = "网络请求超时";
				} else if(type == "error") {
					o.code = "998";
					o.errorMessage = "网络请求错误";
				} else if(type == "abort") {
					o.code = "997";
					o.errorMessage = "网络请求取消";
				} else if(type == "parsererror") {
					o.code = "996";
					o.errorMessage = "解析json错误";
				} else {
					o.code = "995";
					o.errorMessage = "系统出错";
				}
				error(o);
			}
		}
		var options = {
			dataType,
			type,
			timeout,
			headers,
			async
		}
		
		if(filter!=null &&filter=='login'){
			var user =SY.User.getUser();
			if(user !=null){
				Indicator.open({
				  text: '加载中...',
				  spinnerType: 'snake'
				});
				options.data = SY.util.jsonToStr(data);
				options.success = _success;
				options.error = _error;
				this._ajax(url, options);	
			}else{
				console.log("没有登录");
				store.getters.login.state=true;
				console.log(store);
			}
		}else{
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'snake'
			});
			options.data = SY.util.jsonToStr(data);
			options.success = _success;
			options.error = _error;
			this._ajax(url, options);	
		}
		
	},
	post: function(url, data, success, error, timeout = 10000) {
		data = this.dodata(data);
		var type = "post";
		var options = {
			data,
			success,
			error,
			type,
			timeout
		};
		this.ajax(url, options);
	},
	get: function(url, data, success, error, timeout = 10000) {
		var sign = this.dodata(data);
		var type = "get";
		var options = {
			data,
			success,
			type,
			timeout
		};
		this.ajax(url, options);
	},
	getJSON: function(url, data, success, error,filter, type = "post", timeout = 30000) {

		var [sign, data] = this.dodata(data);
		/*url += "?sign="+sign;*/

		var sysid = SY.cookie.get("sydid");
		var id = config.PAREMENT_STRING;
		var headers = {
			'Content-Type': 'application/json;charset=UTF-8',
			'sys_param': id + "_" + sign
		};
		var options = {
			data,
			success,
			error,
			type,
			timeout,
			headers
		};
		this.ajax(url, options,filter);
	},
	dodata: function(data) {
		var defaule = config.REQUESTDATA;
		var user = SY.User.getUser();
		var tokenid=SY.localstorage.get('session');
		if(user!=null) {
			defaule.phone = user.phone;
			defaule.userid = user.id;
		}
		defaule.curTime = new Date().getTime();
		defaule.session=tokenid==null?'':tokenid;
		data = Object.assign({}, defaule, data);
		var strs = JSON.stringify(data);
		/*var keys  = Object.keys(data);
		keys.sort();
		var str = "";
		for(let i in keys){
			str += (keys[i]+"=");
			if(data[keys[i]]||data[keys[i]] == 0){
				str += data[keys[i]];
			}
		}
		str += config.DEFAULTSIGNATUREPWD;*/
		strs = strs.replace(/\"/g, "");
		//strs=encodeURI(strs); 
		strs += config.DEFAULTSIGNATUREPWD;
		SY.log.log("待加密字符串:" + strs);
		var sign = hex_md5(strs);
		return [sign, data];
	},
	upload: function(url, data, success, error, uploadProgress, uploadComplete, uploadFailed, uploadCanceled) {
		if(!SY.util.isFormData(data)) {
			var formData = new FormData();
			if(SY.util.isObject(data)) {
				formData.append(data.file_name, data.file);
				data = formData;
			} else if(SY.util.isArray(data)) {
				data.forEach(function(v) {
					formData.append(v.file_name, v.file);
				})
				data = formData;
			} else {
				SY.log.error("无上传文件数据或格式错误");
				return;
			}
		}
		if(url.indexOf("/") != 0) {
			url = "/" + url;
		}
		var action = url;
		url = config.SERVER_BAS_URL + url;

		var requestData = data;
		var request = new XMLHttpRequest();
		var xDomain = false;
		request.open("POST", url, true);
		request.timeout = 0;
		SY.log.log("send[" + action + "]文件上传");
		request.onreadystatechange = function handleLoad() {
			if(!request || (request.readyState !== 4 && !xDomain)) {
				return;
			}
			if(request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
				return;
			}
			var responseData = request.responseText;
			SY.log.log("received[" + action + "]：" + responseData);
			var rs = JSON.parse(responseData);
			if(typeof success === 'function') {
				success(rs);
			}
			request = null;
		};
		request.onerror = function handleError() {
			var rs = {
				code: '900',
				errorMessage: "系统异常"
			}
			if(typeof error === 'function') {
				error(rs);
			}
			request = null;
		};
		request.ontimeout = function handleTimeout() {
			var rs = {
				code: '901',
				errorMessage: "系统请求超时"
			}
			if(typeof error === 'function') {
				error(rs);
			}
			request = null;
		};

		request.setRequestHeader("Accept", "application/json, text/plain, */*");
		if(typeof uploadProgress === 'function') {
			request.addEventListener('progress', uploadProgress);
		}
		request.send(requestData);
	}
}

SY.GVerify = {
	GVerify: function(options) { //创建一个图形验证码对象，接收options对象为参数
		this.options = { //默认options参数值
			id: "", //容器Id
			canvasId: "verifyCanvas", //canvas的ID
			width: "100", //默认canvas宽度
			height: "30", //默认canvas高度
			type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
			code: ""
		}

		if(Object.prototype.toString.call(options) == "[object Object]") { //判断传入参数类型
			for(var i in options) { //根据传入的参数，修改默认参数值
				this.options[i] = options[i];
			}
		} else {
			this.options.id = options;
		}
		console.log(this);
		this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
		this.options.letterArr = SY.GVerify.getAllLetter();

		this._init();
		this.refresh();
	},
	getAllLetter: function() {
		var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
		return letterStr.split(",");
	},
	/**生成一个随机数**/
	randomNum: function(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	},
	/**生成一个随机色**/
	randomColor: function(min, max) {
		var r = SY.GVerify.randomNum(min, max);
		var g = SY.GVerify.randomNum(min, max);
		var b = SY.GVerify.randomNum(min, max);
		return "rgb(" + r + "," + g + "," + b + ")";
	}
}
SY.GVerify.GVerify.prototype = {
	version: '1.0.0',
	_init: function() {
		var con = document.getElementById(this.options.id);
		var canvas = document.createElement("canvas");
		this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
		this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
		canvas.id = this.options.canvasId;
		canvas.width = this.options.width;
		canvas.height = this.options.height;
		canvas.style.cursor = "pointer";
		canvas.innerHTML = "您的浏览器版本不支持canvas";
		con.appendChild(canvas);
		var parent = this;
		canvas.onclick = function() {
			parent.refresh();
		}
	},
	/**生成验证码**/
	refresh: function() {
		this.options.code = "";
		var canvas = document.getElementById(this.options.canvasId);
		if(canvas.getContext) {
			var ctx = canvas.getContext('2d');
		} else {
			return;
		}

		ctx.textBaseline = "middle";

		ctx.fillStyle = SY.GVerify.randomColor(180, 240);
		ctx.fillRect(0, 0, this.options.width, this.options.height);

		if(this.options.type == "blend") { //判断验证码类型
			var txtArr = this.options.numArr.concat(this.options.letterArr);
		} else if(this.options.type == "number") {
			var txtArr = this.options.numArr;
		} else {
			var txtArr = this.options.letterArr;
		}

		for(var i = 1; i <= 4; i++) {
			var txt = txtArr[SY.GVerify.randomNum(0, txtArr.length)];
			this.options.code += txt;
			ctx.font = SY.GVerify.randomNum(this.options.height / 2, this.options.height) + 'px SimHei'; //随机生成字体大小
			ctx.fillStyle = SY.GVerify.randomColor(50, 160); //随机生成字体颜色		
			ctx.shadowOffsetX = SY.GVerify.randomNum(-3, 3);
			ctx.shadowOffsetY = SY.GVerify.randomNum(-3, 3);
			ctx.shadowBlur = SY.GVerify.randomNum(-3, 3);
			ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
			var x = this.options.width / 5 * i;
			var y = this.options.height / 2;
			var deg = SY.GVerify.randomNum(-30, 30);
			/**设置旋转角度和坐标原点**/
			ctx.translate(x, y);
			ctx.rotate(deg * Math.PI / 180);
			ctx.fillText(txt, 0, 0);
			/**恢复旋转角度和坐标原点**/
			ctx.rotate(-deg * Math.PI / 180);
			ctx.translate(-x, -y);
		}
		/**绘制干扰线**/
		for(var i = 0; i < 4; i++) {
			ctx.strokeStyle = SY.GVerify.randomColor(40, 180);
			ctx.beginPath();
			ctx.moveTo(SY.GVerify.randomNum(0, this.options.width), SY.GVerify.randomNum(0, this.options.height));
			ctx.lineTo(SY.GVerify.randomNum(0, this.options.width), SY.GVerify.randomNum(0, this.options.height));
			ctx.stroke();
		}
		/**绘制干扰点**/
		for(var i = 0; i < this.options.width / 4; i++) {
			ctx.fillStyle = SY.GVerify.randomColor(0, 255);
			ctx.beginPath();
			ctx.arc(SY.GVerify.randomNum(0, this.options.width), SY.GVerify.randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
			ctx.fill();
		}
	},
	/**验证验证码**/
	validate: function(code) {
		var code = code.toLowerCase();
		var v_code = this.options.code.toLowerCase();
		if(code == v_code) {
			return true;
		} else {
			this.refresh();
			return false;
		}
	}
}
SY.Scroll = {
	$: function(element) {
		if(arguments.length > 1) {
			for(var i = 0, length = arguments.length, elements = []; i < length; i++) {
				elements.push($(arguments[i]));
			}
			return elements;
		}
		if(typeof element == "string") {
			return document.getElementById(element);
		} else {
			return element;
		}
	},
	Class: {
		create: function() {
			return function() {
				this.initialize.apply(this, arguments);
			}
		}
	},
	Scroll: function() {
		this.initialize.apply(this, arguments);
	}
}
SY.Scroll.Scroll.prototype = {
	initialize: function(element, height,th) {
		this.element = SY.Scroll.$(element);
		this.element.innerHTML += this.element.innerHTML;
		this.height = height;
		this.maxHeight = this.element.scrollHeight / 2;
		this.counter = 0;
		this.scroll();
		this.timer = "";
		this.element.onmouseover = this.stop.bind(this);
		var li =this.element.querySelectorAll('li')
		for(var i=0;i<li.length;i++ ){
			li[i].onclick= function(){
				th.$router.push({path:'/system/noticeShow?id='+this.getAttribute("ids")});
			};
		}
		
		this.element.onmouseout = function() {
			this.timer = setTimeout(this.scroll.bind(this), 1000);
		}.bind(this);
	},
	scroll: function() {
		if(this.element.scrollTop < this.maxHeight) {
			this.element.scrollTop++;
			this.counter++;
		} else {
			this.element.scrollTop = 0;
			this.counter = 0;
		}
		if(this.counter < this.height) {
			this.timer = setTimeout(this.scroll.bind(this), 20);
		} else {
			this.counter = 0;
			this.timer = setTimeout(this.scroll.bind(this), 3000);
		}
	},
	stop: function() {
		clearTimeout(this.timer);
	}
}
/*同意处理程序内ajax请求返回的编码*/
SY.app = {
	code: function(cod) {
		var msg = config.CODE[cod];
		if(msg != null && msg != '') {
			return msg;
		} else {
			return config.CODE.error;
		}
	},
	success:function(msg){
		
	}
}
export default SY;