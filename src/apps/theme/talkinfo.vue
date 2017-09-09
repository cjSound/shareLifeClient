<template>
	<div class="themeinfo ">
		<header id="header" class="mui-bar mui-bar-nav">
			<a  href="javaScript:void(0)" class=" mui-icon mui-icon-left-nav mui-pull-left" @click="$router.go(-1)"></a>
			<h1 class="mui-title"  >查看对话</h1>
		</header>
			
		<div  class="mui-scroll-wrapper" id="themeback" :style="{height: srcollHeight+'px'}">
			<div class="mui-scroll">
				<div class="sharecnt">
					<div class="rbackinfo bback"  v-if="list!=''" v-for="(item,index) in list">
						<div class="backuser">
							<div class="left">
								<img :src="url+'/'+item.icon" alt="" class="userimg" />
								<div class="info">
									<div>{{item.username}}</div>
									<p class="bbtime">{{item.create_time|lgtime}}</p>
								</div>	
							</div>
						</div>
						<div class="backcnt">
							<dim  :show="true" :item="item" :type="3"  ></dim>	
						</div>
						
					</div>	
				</div>
				
			</div>
			
		</div>
	 
	</div>
</template>

<script>
	import SY from 'sy'
	import dim from './../main/dim.vue'
	import upload from './../../components/upload.vue'
	import reback from './reback.vue'
	import mui from './../../assets/js/mui.min.js'
	export default {
    	props:[
        ],
        data () {
            return {
            	url:SY.util.getUrl(),
            	srcollHeight: '',
            	list:[]
            }
        },
        components: {dim,upload,reback},
        computed: {
        	 
        },
        methods: {  
        	init(){
        		this.getThemeInfo();
        	},
        	//获取回复信息
        	getThemeInfo(){
        		var param =SY.util.getParams();
        		SY.net.getJSON("/api/sharerbackbk/getRbkbackTalkInfo",  {id:param.sid} , res => {
		        	this.list=this.formatData(res.data);
			    }, res => {
					mui.toast(SY.code.timeout);			   
			    });
        	},
        	formatData(arr){
        		if(arr.length==0){
        			return '';
        		}
        		for(var i =0;i<arr.length;i++){
        			arr[i].imgs=arr[i].imgs.split("-");
        			if(arr[i].imgs[0]==""){
						arr[i].imgs=[];		        		
		        	}
        		}
        		return arr;
        	}
        	 
        },
        mounted(){
        	this.srcollHeight=window.bodyHeight-45-40;
        	this.init();
        } ,
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

<style scoped=""  lang="scss">
	.rbackinfo{
		padding: 5px 7px;
		border-top: 1px solid #DDDDDD;
		margin-bottom: 10px;
	}
	.userimg{
		height: 35px;
		width: 35px;
		border-radius:35px;
	}
	.backuser{
		overflow: hidden;
		height: 40px;
		margin-top: 5px;
	}
	.right{
		float: right;
		line-height: 40px;
		.good{
			font-size: 14px;
		}
	}
	.left{
		float: left;
		img{
			float: left;
		}
		.info{
			height: 35px;
			padding-left: 10px;
			float: left;
		}
	}
	.backcnt{
		padding: 3px 10px  0 40px;
	}
	.bback{
		background: rgba(221, 221, 221, 0.32);
		margin-bottom: 0;
	}
	.bbtime{
		font-size: 12px;
	}
	
</style>