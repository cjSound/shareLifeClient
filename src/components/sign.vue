<template>
	<div class="app-content sign">
		<header id="header" class="mui-bar mui-bar-nav">
			<a  href="javaScript:void(0)" class=" mui-icon mui-icon-left-nav mui-pull-left" @click="$router.go(-1)"></a>
			<h1 class="mui-title"  >注册</h1>
		</header>
		 <div class="logintit" v-html="app.appname">
		 </div>
		 <form class="mui-input-group">
			<div class="mui-input-row ">
				<label>手机号：</label>
				<input type="tel" class="mui-input-clear" placeholder="手机号" v-model="sign.phone">
			</div>
			<div class="mui-input-row  ">
				<label>验证码：</label>
				<input type="text" class=" mint-input" placeholder="请输入图形验证码"  v-model="sign.code">
				<div class="mint-right">
					<!--<img class="imgcode" src="../assets/images/heads.jpg" alt="" />-->
					<div id="imgcode" class="imgcode" style="width: 26%;height: 38px;float: right;margin-right: 10px;"></div>
				</div>
			</div>
			<div class="mui-input-row">
				<label>短信验证码：</label>
				<input type="number" class="mui-input-clear mint-input" placeholder="请输入短信验证码" v-model="sign.checkCode"> 
				<div class="mint-right">
					<span  ></span>
					<button type="button" @click="sendmsg" :class="{nosend:send.state}" class="msgcode mui-btn-blue">{{send.msg}}</button>
				</div>
			</div>
			<div class="mui-input-row  ">
				<label>设置密码：</label>
				<input type="password" class="  mui-input-clear" placeholder="请输入6-16位密码" v-model="sign.password">
			</div>
			<p class="text-center" style="padding-top: 10px;">
				<el-checkbox v-model="checked">我已经同意</el-checkbox>  <font style="color: #0062CC;">《用户代理协议》</font>  </p>
			<div class="mui-button-row">
				<span class="fullbtn" :class="{'nones':!checked}" @click="regist">注册</span>
			</div>
		</form>
		
	</div>
</template>

<script>
	import Vue from 'vue'
	import {mapGetters} from 'vuex';
    import mui from './../assets/js/mui.min.js'
    import {Checkbox } from 'element-ui'
    import SY from 'sy'
    Vue.use(Checkbox)
	export default {
		data() {
			return {
				send:{
		      		msg:"获取验证码",
		      		state:false
	      		},
	      		checked:false,
				sign:{
					userId:'',
					parentId:'',
					phone:'',
					checkCode:'',
					code:'',
					password:'',
					type:'1'
				},
				verifyCode:''
			}
		},
		computed: {
	      ...mapGetters(['app'])
	    },
	    components: {
	    	
	    },
		methods: {
		 
			sendmsg(){//发送验证码
	    	 	var _this =this;
	    	 	
	    	 	if(!_this.send.state){
	    	 		if(_this.sign.phone==''){
	    	 			mui.toast('请输入手机号码');
	    	 		}else if(!(SY.reg.phone.test(_this.sign.phone))){
	    	 			mui.toast('输入的手机号码格式不正确');
	    	 		}else if(_this.sign.code==''){
	    	 			mui.toast('请输入图形验证码');
	    	 		}else if(!_this.verifyCode.validate(_this.sign.code)){
	    	 			mui.toast('图形验证码错误');
	    	 		}else{
	    	 			_this.send.state=true;
	    	 			var se=60;
		    	 		var inv =setInterval(inf=>{
		    	 			se=--se;
		    	 			_this.send.msg=se+"  S   重发";
		    	 			if(se==0){
		    	 				_this.send.msg="重新发送";
		    	 				_this.send.state=false;
		    	 				clearInterval(inv);
		    	 			}
		    	 		},1000);
	    	 			SY.net.getJSON("/api/msg/sendypmsg", this.sign, res => {
	    	 					mui.toast('发送验证码成功，有效期十分钟');	
			            }, res => {
			            	mui.toast('连接超时，请重试' );	
			                SY.log.log("error：" + JSON.stringify(res));
			            });
		        		
	    	 		}
	    	 	}
	    	 },
	    	 regist(){//注册
	    	 	var _this =this;
	    	 	if(this.checked){
	    	 		if(_this.sign.phone==''){
	    	 			mui.toast('请输入手机号码');
	    	 		}else if(!(SY.reg.phone.test(_this.sign.phone))){
	    	 			mui.toast('输入的手机号码格式不正确');
	    	 		}else if(_this.sign.code==''){
	    	 			mui.toast('请输入图形验证码');
	    	 		}else if(!_this.verifyCode.validate(_this.sign.code)){
	    	 			mui.toast('图形验证码错误');
	    	 		}else if(_this.sign.checkCode==''){
	    	 			mui.toast('请输入手机验证码');
	    	 		}else{
	    	 			SY.net.getJSON("/api/user/signuser", this.sign, res => {
    	 					mui.toast('注册成功');	
    	 					this.$router.go(-1);
			            }, res => {
			            	mui.toast('连接超时，请重试' );	
			                SY.log.log("error：" + JSON.stringify(res));
			            });
		        		
	    	 		}
	    	 	}else{
	    	 		mui.toast('请同意用户代理协议');	
	    	 	}
	    	 	
	    	 }
		},
		mounted(){
			var _this =this ;
		 	this.verifyCode = new SY.GVerify.GVerify("imgcode");
		},
	   beforeRouteLeave(to,from,next){
			let isBack = window.isBack;
		   	if (isBack) {
		   		this.$store.commit("setTransitionName","slide-right");
		   	} else {
		   		this.$store.commit("setTransitionName","slide-left");
		   	}
		   	this.$destroy();
		   	window.isBack = false
	     	next()
		}
	}
</script>

<style scoped="">
	 .mint-input{
		width: 35%;
		float: left;
	}
	.mui-input-group:after{
		background-color: #FFFFFF;
	}
	 
	.nosend{
		background: #C4C4C4;
		border: #C4C4C4;
	}
	.msgcode{
		float: right;
	    margin-top: 3px;
	    margin-right: 10px;
	        width: 26%;
	}
	.logintit{
		color: #403838;;
	    text-align: center;
	    font-size: 20px;
	    height: 10rem;
	    line-height: 10rem;
	}
	.mui-input-group{
		font-size: 14px;
		height: 100%;
	}
	.mui-input-group[placeholder]{
		font-size: 14px;
	}
	.sign input::placeholder{
		font-size: 14px;
	}
	.mui-button-row{
		margin-top: 20px;
	}
	.nones{
		background: #a3aab1;
		border: 1px solid #a3aab1;
	}
</style>