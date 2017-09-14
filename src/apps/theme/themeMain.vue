<template>
	<div class="imgvideocnt" :style="{height: srcollHeight+'px'}">
		<header id="header" class="mui-bar mui-bar-nav "  >
			<a  href="javaScript:void(0)" class=" mui-icon mui-icon-left-nav mui-pull-left" @click="$router.go(-1)"></a>
			<h1 class="mui-title"  ></h1>
			<span class="head-span mui-pull-right icolor"  >
				<publish ref="publish"  @init="initpbls"  @close="init"></publish>
			</span>
		</header>	
		<div class="themes">
			<div class="th-main">
				<img :src="baseurl+theme.icon" alt="" />
				<div class="info">
					<div class="tit">{{theme.tname}}</div>
					<p>{{theme.tdesc}}</p>
				</div>
			</div>
			<div class="attents click"  @click="goto('')">
				<p style="float: right;">
					<img :src="baseurl+item.icon" alt="" v-for="(item,index) in attent.data.pageData"/>
					<span style="float: right;">
						{{attent.data.total}}&nbsp;
						{{theme.othername}}>
					</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import SY from 'sy'
	import publish from './../../components/publish.vue'
	export default {
    	props:[
    	
        ],
        data () {
            return {
            	srcollHeight:'',
            	baseurl:SY.util.getUrl(),
            	theme:{},
            	attent:{}
            }
        },
        components: {publish},
        computed: {
        	 
        },
        methods: {  
        	init(){
        		this.getThemeTop();
        	},
        	goto(url){
        		this.$router.push({path:url});
        	},
        	initpbls(){
        		let publish={
				  		topid:this.theme.topid,
				  		themeid:this.theme.id,
				  		tname:this.theme.othername,
				  		state:true
				  	}
        		_this.$root.$emit("publishInit",publish);
        	},
        	getThemeTop(){
        		let param=SY.util.getParams();
        		SY.net.getJSON("/api/theme/getThemeInfosById",  { id:param.id } , res => {
	        		this.theme=res.theme;
	        		this.attent=res.attent;
			    }, res => {
					mui.toast("请检查下网络撒");
			    });
        	}
        },
        mounted(){
        	this.srcollHeight=window.bodyHeight;
        	this.init();
        	this.$store.getters.app.tabbar='';
        },
	   	beforeRouteLeave(to,from,next){
			let isBack = window.isBack;
		   	if (isBack) {
		   		this.$store.commit("setTransitionName","slide-right");
		   	} else {
		   		this.$store.commit("setTransitionName","slide-left");
		   	}
		   	if(to.path.indexOf('findmain')){
		   		this.$store.getters.app.tabbar='3';
		   	}
		   	this.$destroy();
		   	window.isBack = false
	     	next()
		}
    }
</script>

<style scoped="" lang="scss">
.th-main{
	overflow: hidden;
	width: 95%;
	margin: 0 auto;
	padding-top: 5px;
	img{
		width: 80px;
		height: 80px;
		float: left;	
		border-radius: 8px;
	}
	.info{
		float: left;
		padding-left: 10px;
	}
}
.attents{
	text-align: right;
	overflow: hidden;
	
	padding-right: 10px;
	p{
		height: 35px;
		line-height: 35px;
		margin: 0;
	}
	img{
		width: 35px;
		height:35px;
		border-radius: 35px;
		margin-right: 10px;
	}
}
</style>