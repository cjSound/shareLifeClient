<template>
	<div class="zlogin app-content"   >
		<div class="mui-content" style="background-color: #efeff4;">
			<div class="logintit" >
				<div class="img"> <img :src="app.logo" alt="" /> </div>
				 <div v-html="app.appname"></div>
		 	</div>
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>手机号</label>
					<input  type="number" class="mui-input-clear mui-input" placeholder="请输入手机号" v-model="user.userId">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input   type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="user.password">
				</div>
			</form>
			<form class="mui-input-group">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell">
						记住密码
						<div id="autoLogin"  style="position: absolute;top: 50%;right: 15px;-webkit-transform: translateY(-50%);transform: translateY(-50%);">
							<el-switch
							  v-model="setpsw"
							  on-color="#13ce66"
							  off-color="#d1d1d1">
							</el-switch>
						</div>
					</li>
				</ul>
			</form>
			<div class="mui-content-padded">
				<button @click="tologin" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
				<div class="link-area"><a @click="gosign" href="javaScript:void(0)" >注册账号</a> <span class="spliter">|</span> <a href="javaScript:void(0)"  @click="toforget">忘记密码</a>
				</div>
			</div>
			<div class="mui-content-padded oauth-area">
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {mapGetters} from 'vuex';
    import mui from './../assets/js/mui.min.js'
    import {Switch} from 'element-ui'
    Vue.use(Switch)
    import SY from 'sy'
	
	export default {
		props:[
			'module'//是否是当做组件在调用
        ],
		data() {
			return {
				user:{
					userId:'',
					password:''
				},
				setpsw:false
				
			};
		},
		computed: {
	      ...mapGetters(['app'])
	    },
		methods: {
			gosign(){
				SY.util.pushUrl({path: "/sign"});
			},
			toforget(){
				SY.util.pushUrl({path: "/forget"});
			},
			tologin(){
				var _this =this ;
				if(_this.user.userId==''){
					mui.toast('请输入手机号' );	
				}else if(!(SY.reg.phone.test(_this.user.userId))){
	    	 		mui.toast('输入的手机号码格式不正确');
	    	 	}else if(_this.user.password==''){
					mui.toast('请输入密码' );	
				}else{
					SY.net.getJSON("/api/user/tologin", this.user, res => {
			 			mui.toast("登陆成功");
			 			res.data.user.setpsw=_this.setpsw;
			 			res.data.user.pp=_this.user.password;
			 			SY.User.setUser(res.data.user);
			 			_this.$store.commit("setPerinfo",res.data.user);
			 			SY.localstorage.put("info",res.data.info);
			 			if(_this.module){
			 				_this.$emit('success');
			 			}else{
			 				SY.util.pushUrl({path: "/main"});
			 			}
			 			
		            }, res => {
		            	mui.toast('连接超时，请重试' );	
		                SY.log.log("error：" + JSON.stringify(res));
		            });
				}
			}
		},
		mounted(){
			var _this =this ;
			if(!this.module)
			this.$store.getters.app.tabbar='';
			var user =SY.User.getUser();
			if(user!=null&&user.setpsw){
				this.user.userId=user.phone;
				this.setpsw=user.setpsw;
				this.user.password=user.pp;
			}
		},
		beforeRouteEnter(to,from,next){
			if(from.path.indexOf('/perinfo')!=-1){
				window.location.reload();
			}
	     	next()
		},
	   beforeRouteLeave(to,from,next){
			let isBack = window.isBack;
		   	if (isBack) {
		   		this.$store.commit("setTransitionName","slide-right");
		   	} else {
		   		this.$store.commit("setTransitionName","slide-left");
		   	}
		   	this.$destroy();
		   	// 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
		   	window.isBack = false
	     	next()
		}
	}

</script>

<style scoped="">
	.logintit{
		text-align: center;
		position: relative;
		padding-bottom: 20px;
	}
	.logintit .img{
		padding: 20px 0 10px 0;
	}
	.logintit .img img{
		height: 100px;
		width: 100px;
		border-radius: 50px;
	}
	.ui-page-login,
body {
	width: 100%;
	height: 100%;
	margin: 0px;
	padding: 0px;
}
.mui-content{height: 100%;}
	.area {
		margin: 20px auto 0px auto;
	}
	
	.mui-input-group {
		margin-top: 10px;
	}
	
	.mui-input-group:first-child {
		margin-top: 20px;
	}
	
	.mui-input-group label {
		width: 22%;
	}
	
	.mui-input-row label~input,
	.mui-input-row label~select,
	.mui-input-row label~textarea {
		width: 78%;
	}
	
	.mui-checkbox input[type=checkbox],
	.mui-radio input[type=radio] {
		top: 6px;
	}
	
	.mui-content-padded {
		margin-top: 25px;
	}
	
	.mui-btn {
		padding: 10px;
	}
	
	.link-area {
		display: block;
		margin-top: 25px;
		text-align: center;
	}
	
	.spliter {
		color: #bbb;
		padding: 0px 8px;
	}
	
	.oauth-area {
		position: absolute;
		bottom: 20px;
		left: 0px;
		text-align: center;
		width: 100%;
		padding: 0px;
		margin: 0px;
	}
	
	.oauth-area .oauth-btn {
		display: inline-block;
		width: 50px;
		height: 50px;
		background-size: 30px 30px;
		background-position: center center;
		background-repeat: no-repeat;
		margin: 0px 20px;
		/*-webkit-filter: grayscale(100%); */
		border: solid 1px #ddd;
		border-radius: 25px;
	}
	
	.oauth-area .oauth-btn:active {
		border: solid 1px #aaa;
	}
	
	.oauth-area .oauth-btn.disabled {
		background-color: #ddd;
	}
</style>