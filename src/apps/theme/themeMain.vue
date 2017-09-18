<template>
	<div class="imgvideocnt" >
		<header id="header" class="mui-bar mui-bar-nav "  >
			<a  href="javaScript:void(0)" class=" mui-icon mui-icon-left-nav mui-pull-left" @click="$router.go(-1)"></a>
			<h1 class="mui-title"  @click="totop">{{scoll.tit}}</h1>
			<span class="head-span mui-pull-right icolor"  >
				<publish ref="publish"  @init="initpbls"  @close="init"></publish>
			</span>
		</header>	
		<div class="themes" >
			<div id="themeinfo" >
				<div class="th-main">
					<img :src="baseurl+theme.icon" alt="" />
					<div class="info">
						<div class="tit">{{theme.tname}}</div>
						<p>{{theme.tdesc}}</p>
					</div>
				</div>
				<div class="attents click"  @click="goto('')">
					<p style="float: right;" v-if="attent!=''">
						<img :src="baseurl+item.icon" alt=""  v-for="(item,index) in attent.data.pageData"/>
						<span style="float: right;">
							{{attent.data.total}}&nbsp;
							{{theme.othername}}>
						</span>
					</p>
				</div>
				<div class="line"></div>
			</div>
			<!------------------------------------以上 帖子信息     以下 列表---------------------------------->
			<div id="thememain-slider" class="mui-slider" style="background: #FFFFFF;" :style="{height: infoHeight+'px'}">
				<div class="menu">
					<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
						<a class="mui-control-item" href="#thememainnew"> 最新 </a>
						<a class="mui-control-item" href="#thememainhot"> 热门 </a>
					</div>
					<div id="sliderProgressBar" class="mui-slider-progress-bar mui-col-xs-6"></div>	
				</div>
				<div id="sgroup" class="mui-slider-group"   :style="{height: srcollHeight+'px'}" v-if="param!=''"  >
					<div id="thememainnew" class="mui-slider-item mui-control-content mui-active">
						<div   :class="{'fixSrcoll':scoll.state}"></div>
						<themes  :ids="'themenew'" :ttype="1" :themeid="param.id" :type="3" v-if="tabmenu.state & tabmenu.index==1"></themes>
					</div>
					<div id="thememainhot" class="mui-slider-item mui-control-content">
						<div  :class="{'fixSrcoll':scoll.state}"></div>
						<themes  :ids="'themehot'" :ttype="2" :themeid="param.id" :type="3" v-if="tabmenu.state & tabmenu.index==2"></themes>
					</div>
				</div>
			</div>
			<totop @top="tops" :id="'sgroup'"></totop>
		</div>
	</div>
</template>

<script>
	import SY from 'sy'
	import publish from './../../components/publish.vue'
	import mui from './../../assets/js/mui.min.js'
	import themes from './../main/themeMain.vue'
	import totop from './../../components/util/totop.vue'
	export default {
    	props:[
    	
        ],
        data () {
            return {
            	srcollHeight:'',
            	infoHeight:'',
            	baseurl:SY.util.getUrl(),
            	theme:{},
            	attent:'',
            	param:'',
            	tabmenu:{
					index:1,
					state:true
				},
				scoll:{state:true,tit:''}
            }
        },
        components: {publish,themes,totop},
        computed: {
        	 
        },
        methods: {  
        	init(){
        		this.getThemeTop();
        		this.menuInit();
        		this.scrollNow();
        	},
        	tops(){
        		this.scoll.tit='';
        		this.scoll.state=true;
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
        		this.param=SY.util.getParams();
        		SY.net.getJSON("/api/theme/getThemeInfosById",  { id:this.param.id } , res => {
	        		this.theme=res.theme;
	        		this.attent=res.attent;
			    }, res => {
					mui.toast("请检查下网络撒");
			    });
        	},
        	menuInit(){
				var _this =this ;
				mui(".mui-slider").slider(), mui(".mui-scroll-wrapper.mui-slider-indicator.mui-segmented-control").scroll({
					scrollY: !1,
					scrollX: !0,
					indicators: !1,
					snap: ".mui-control-item"
				})
				document.getElementById('thememain-slider').addEventListener('slide', function(e) {
					if (e.detail.slideNumber === 0) {
						_this.tabmenu.index=1;
					} else if (e.detail.slideNumber === 1) {
						_this.tabmenu.index=2;
					}
				});
			},
			scrollNow(){
				var _this =this;
				setTimeout(function(){
					window.onscroll = ()=> {
			          if(document.body.scrollTop>130){
			          	_this.scoll.state=false;
			          	_this.scoll.tit=_this.theme.tname;
			          }
			        }
				},1000);
			},
			totop(){
				this.scoll.tit='';
        		this.scoll.state=true;
				document.documentElement.scrollTop = document.body.scrollTop =0;
			}
        },
        mounted(){
        	let tm =document.getElementById('themeinfo');
        	this.infoHeight=window.bodyHeight-45;
        	this.srcollHeight=window.bodyHeight-45-40;
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
		   	}else if(to.path.indexOf('focus')){
		   		this.$store.getters.app.tabbar='2';
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
		max-width: 23%;
		border-radius: 8px;
	}
	.info{
		float: left;
		width: 77%;
		padding-left: 10px;
	}
}
.attents{
	text-align: right;
	overflow: hidden;
	height: 35px;
	margin: 5px 0;
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
.fixSrcoll{
	position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: .1;
    z-index: 3;
}
</style>