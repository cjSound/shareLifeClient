/**
 * Created by caojie on 2017/6/1.
 */

//开发服务器路径
var SERVER_BAS_URL ="";//开发


var REQUESTDATA = {
	"curTime":"",
	"session":""
};
var debug = true;
var DEFAULTSIGNATUREPWD = "cjSoundSY";
var PAREMENT_STRING="sySound"

if(process.env.NODE_ENV==="production"){
	debug=false;
	SERVER_BAS_URL="http://192.168.1.26:8081/ShareLife";//生产
}else{
	SERVER_BAS_URL="http://192.168.1.154:8081/ShareLife";//开发
}

var CODE={
	error:'系统错误',
}
export {CODE,SERVER_BAS_URL,REQUESTDATA,DEFAULTSIGNATUREPWD,PAREMENT_STRING,debug};