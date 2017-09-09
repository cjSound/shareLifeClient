<template>
	<div class="app-content forget">
		<header id="header" class="mui-bar mui-bar-nav">
			<a  href="javaScript:void(0)" class=" mui-icon mui-icon-left-nav mui-pull-left" @click="$router.go(-1)"></a>
			<h1 class="mui-title">忘记密码</h1>
		</header>
		<div>
		<form class="mui-input-group"  >
			<div class="mui-input-row ">
				<label>手机号：</label>
				<input type="tel" class="mui-input-clear" placeholder="手机号"  v-model="sign.phone">
			</div>
			<div class="mui-input-row  ">
				<label>验证码：</label>
				<input type="text" class="mint-input" placeholder="请输入图形验证码" v-model="sign.code">
				<div class="mint-right">
					<div id="imgcode" class="imgcode" style="width: 26%;height: 38px;float: right;"></div>
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
				<input type="password" class="  mui-input-clear" placeholder="请输入6-20位密码" v-model="sign.password">
			</div>
			<div class="mui-input-row  ">
				<label>重复密码：</label>
				<input type="password" class="  mui-input-clear" placeholder="重新输入密码" v-model="sign.passwordAgain">
			</div>
			 
			<div class="mui-button-row">
				<button type="button" class="mui-btn mui-btn-primary mui-btn-block"  @click="pswnext">下一步</button>&nbsp;&nbsp;
			</div>
		</form>
		 
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {mapGetters} from 'vuex';
    import mui from './../assets/js/mui.min.js'
    import SY from 'sy'
	export default {
		data() {
			return {
				send:{
		      		msg:"获取验证码",
		      		state:false
	      		},
	      		sign:{
	      			type:'2',
	      			phone:'',
	      			userId:'',
	      			code:'',
	      			checkCode:'',
	      			password:'',
	      			passwordAgain:''
	      		},
	      		verifyCode:'',
			}
		},
		computed: {
	      ...mapGetters(['app'])
	    },
	    components: {
	    	
	    },
		methods: {
			pswnext(){
				var _this =this;
				var param =SY.reg.psw;
	    	 		if(_this.sign.phone==''){
	    	 			mui.toast('请输入手机号码');
	    	 		}else if(!(SY.reg.phone.test(_this.sign.phone))){
	    	 			mui.toast('输入的手机号码格式不正确');
	    	 		}else if(_this.sign.code==''){
	    	 			mui.toast('请输入图形验证码');
	    	 		}else if(!_this.verifyCode.validate(_this.sign.code)){
	    	 			mui.toast('图形验证码错误');
	    	 		}else if(!(param.test(_this.sign.password))){
	    	 			mui.toast('请输入6-20 位字母或数字');
	    	 		}else if(_this.sign.password==''){
	    	 			mui.toast('请输入新密码密码');
	    	 		}else if(_this.sign.password!=_this.sign.passwordAgain){
	    	 			mui.toast('两次输入密码不一样');
	    	 		}else{
	    	 			SY.net.getJSON("/api/user/forgetpsw", this.sign, res => {
	    	 					mui.toast('修改密码成功');	
	    	 					this.$router.go(-1);
			            }, res => {
			            	mui.toast('连接超时，请重试' );	
			                SY.log.log("error：" + JSON.stringify(res));
			            });
		        		
	    	 		}
			},
			sendmsg(){//发送验证码
	    	 	var _this =this;
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
	    	 			SY.net.getJSON("/api/msg/sendfoegetmsg", this.sign, res => {
	    	 					mui.toast('发送验证码成功，有效期十五分钟');	
			            }, res => {
			            	mui.toast('连接超时，请重试' );	
			                SY.log.log("error：" + JSON.stringify(res));
			            });
	    	 		}
	    	 }
		},
		mounted(){
			var _this =this ;
		 	this.setPsw=false;
		 	this.verifyCode = new SY.GVerify.GVerify("imgcode");
		},
	   beforeRouteLeave(to,from,next){
			let isBack = window.isBack;
		   	if (isBack) {
		   		this.$store.commit("setTransitionName","slide-right");
		   	} else {
		   		this.$store.commit("setTransitionName","slide-left");
		   	}
		   	window.isBack = false
	     	next()
		}
	}
</script>

<style scoped="">
	.forget .mint-input{
		width: 35%;
		float: left;
	}
	.mui-input-group:after{
		background-color: #FFFFFF;
	}
	.imgcode{
		height: 33px;
	    margin-top: 3px;
	    float: right;
	    margin-right: 10px;
	    width: 96px;
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
	}
	.mui-input-group[placeholder]{
		font-size: 14px;
	}
	.forget input::placeholder{
		font-size: 14px;
	}
	.mui-button-row{
		margin-top: 60px;
	}
	.mui-btn-block{
		font-size: 16px;
	}
</style>