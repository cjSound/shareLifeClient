import Vue from 'vue'
import SY from 'sy'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

var  index =Math.random(1000);
const router = new VueRouter({
	routes:[
		{
	    	path:'*',redirect:'/login'
	  	},{
	    	path:'/login',component:require('../components/tologin')
	  	},{
	    	path:'/sign',component:require('../components/sign')
	  	},{
	    	path:'/forget',component:require('../components/forget')
	  	},
	  	/*登陆注册模块*/
	  	
	  	{
	    	path:'/main',meta:{},component:require('../components/main')
	  	},{
	    	path:'/theme/themeinfo',meta:{},component:require('../apps/theme/themeinfo')
	  	},{
	    	path:'/theme/themeback',meta:{},component:require('../apps/theme/themeback')
	  	},{
	    	path:'/theme/talkinfo',meta:{},component:require('../apps/theme/talkinfo')
	  	},
	  	/*发现*/
	  	{
	    	path:'/find/find',meta:{},component:require('../apps/find/find')
	  	}, {
	    	path:'/focus/focus',meta:{},component:require('../apps/focus/focus')
	  	}, {
	    	path:'/commom/goodbad',meta:{},component:require('../apps/commom/goodbad')
	  	},
	  	
	]
});
/*覆盖router  go 默认的跳转方式*/
VueRouter.prototype.go = function (el) {
  if(el==-1)(
  	window.isBack = true
  )
  window.history.go(el);
}
/*覆盖mui  调用back方法默认的跳转方式*/
window.history.back=function(){
	window.isBack = true;
	window.history.go(-1);
}
router.beforeEach((to, from, next) => {
//	ZY.util.swipeBack(id);
	if(to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
		var user =SY.localstorage.get("logo");
		if(user ==null){//判断是否已经登录
			next({ path: '/login' })
		}else{
			next()
		}
	} else {
		next()
	}
})
 


export default router;
