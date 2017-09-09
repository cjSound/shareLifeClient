import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'

require('./assets/sass/app.scss');
import './assets/css/common.css'
import 'element-ui/lib/theme-default/index.css'
import 'mint-ui/lib/style.min.css'
import  SY from   'sy'
Vue.use(VueResource)

 
Vue.directive('privacy', {
  // 隐私保护，  对id 和金额 需要的   中间部分加*处理
  inserted: function (el,binding) {
   	SY.util.infoPrivacy(el);
  }
});

Vue.filter('goods', function(good,bad) {
	// 点赞   最少为0哦
	good =good?good:0;
	bad =bad?bad:0;
//	console.log(good)
//	console.log(bad)
	if(bad>good){
		return 0;
	}else{
		return good-bad;
	}
});
Vue.filter('time', function(tms,type) {
	// 时间格式化  多种格式方式
	return SY.util.formatDate(tms,type);
});
Vue.filter('lgtime', function(tms) {
	// 时间格式化  多种格式方式
	return SY.util.timeForLanguage(tms);
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  mounted(){
  	var _this =this ;
  	
		
  	/*mui.plusReady(function(){
  		//是否启动全屏
  		//plus.navigator.setFullscreen(true);	
  	})*/
   
  }
})
 