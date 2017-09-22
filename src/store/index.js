import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(VueResource)

const store = new Vuex.Store({
  state: {//包含所有应用级别状态的对象
  	//一些系统  统一显示信息
  	app:{
  		appname:'乐分享',
  		logo:'',
  		apptype:'',
  		tabbar:'',
  		num:0
  	},
  	perinfo:'',
  	login:{
  		state:false
  	},
  	publish:{
  		topid:'',
  		themeid:'',
  		tname:'',
  		state:false
  	},
  	router:{
  		topquery:0
  	},
  	/*个人信息*/
  	/**
  	 *公告信息 
  	 */
  	notice:{
  		
  	},
  	//自定义加载组件  目前两种加载方式 type=1,type=2
  	loading:{
  		state:false,
  		type:'1',
  		txt:'加载中...',
  		showbg:false
  	},
  	//路由切换动画效果
  	transitionName:'slide-left'
    
  },
  getters: {//Getters: 在组件内部获取 store 中状态的函数
    app: state=>state.app,
    perinfo:state=>state.perinfo,
    router: state=>state.router,
    login: state=>state.login,
    loading: state=>state.loading,
    publish: state=>state.publish,
    transitionName: state=>state.transitionName,
    notice:state=>state.notice
  },
  mutations: {//Mutations: 修改状态的事件回调函数
  	setApp(state, zy){
	    if(zy.appname!=null&&zy.appname!=''){
	    	state.app.appname=zy.appname;
	    }
	    if(zy.apptype!=null&&zy.apptype!=''){
	    	state.app.apptype=zy.apptype;
	    }
	    if(zy.tabbar!=null&&zy.tabbar!=''){
	    	state.app.tabbar=zy.tabbar;
	    }
	    if(zy.num!=null&&zy.num!=''){
	    	state.app.num=zy.num;
	    }
	    if(zy.logo!=null&&zy.logo!=''){
	    	state.app.logo=zy.logo;
	    }
   },
   setPerinfo(state,pinfo){
   	state.perinfo=pinfo;
   },
   setPublish(state,publish){
   	state.publish =publish;
   },
   setNotice(state,notice){
   	state.notice =notice;
   },
   setTransitionName(state, zy){
        state.transitionName= zy;
   },
   setLogin(state,zy){
   	console.log(zy);
      if(zy.state!=null&&zy.state!=''){
      	state.login.state=zy.state;
      }
   },
   setLoading(state,zy){
      state.loading.state= zy.state;
      if(zy.type!=null&&zy.type!=''){
      	state.loading.type=zy.type;
      }
      if(zy.txt!=null&&zy.txt!=''){
      	state.loading.txt=zy.txt;
      }
      if(zy.showbg!=null&&zy.showbg!=''){
      	state.loading.showbg=zy.showbg;
      }
    }
     
  },
  actions: {//Actions: 组件内部用来分发 mutations 事件的函数
	     
  }
});

export default store
