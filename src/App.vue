<template>
  <div id="app">
  		<!--<load></load>-->
  			<template v-if="type=='wx'">
  				 <keep-alive>
		        <router-view   ></router-view>
		      </keep-alive>
  			</template>
  		  <transition :name="transitionName" v-else>
			    <keep-alive>
		        <router-view class="child-view"  ></router-view>
		      </keep-alive>
			  </transition>
			 	<transition name="slide-bottom">
				 
					<div class="animations fixed" v-if="login.state">
						<login  @success="loginsuccess" :module="true"></login>
					</div>
				</transition>
      <tabbar></tabbar>
  </div>
</template>

<script  >
 	import mui from './assets/js/mui.min.js'
	import Vue from 'vue'
	import login from './components/login'
	import tabbar from './components/tabbar'
	import {mapGetters} from 'vuex';
	import  SY from   'sy'
	
	window.baseUrl=SY.util.getUrl();
 	window.urls="";
 	window.bodyHeight=document.body.scrollHeight==0?document.documentElement.scrollHeight:document.body.scrollHeight;
  export default {
    name: 'app',
    computed: {
	      ...mapGetters(['transitionName','app','login'])
	  },
	  data() {
			return {
				type:''
			}
		},
  	components: {
       tabbar,login
   	},
  	methods:{
  		judgeOS(){
  			var ua = window.navigator.userAgent.toLowerCase();
		  	var type ;
		  	//判断打开的浏览器类型，微信自带返回效果，不需要动画效果
				if(ua.match(/MicroMessenger/i) == 'micromessenger'){
					type ='wx'; 
				}
				this.type= type;
				this.$store.commit("setApp",{apptype:type});
  		},
  		loginsuccess(){
  			this.$store.getters.login.state=false;
  		},
  		getDefineInfo(){
  			var _this =this;
  			SY.net.getJSON("api/init/index", {cc:"(⊙o⊙^_^(*^__^*)"}, res => {
        		document.title=res.data.appname;
        		window.urls=SY.util.getUrl()+res.heads;
        		res.data.logo =SY.util.getUrl()+"/"+res.data.logo;
						this.$store.commit("setApp",res.data);
		    }, res => {
		      SY.log.log("error：" + JSON.stringify(res));
		    });
  		},
  		getLoginInfo(){
  			var roles =SY.localstorage.get("role");
  		}
  	},
	  mounted(){
	  	this.judgeOS();
			this.getDefineInfo();
			this.getLoginInfo();
			document.addEventListener('plusready',function () {
	        // 在这里调用plus api
	        plus.navigator.setStatusBarBackground("#0979cc");
	    },false);
			 
	  }
  }
</script>
<style>
 
	 
</style>

