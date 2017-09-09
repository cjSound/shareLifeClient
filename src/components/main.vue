<template>
	<div class="app-content zymain">
		<div class="mui-content">
			<div id="slider" class="mui-slider">
				<div class="menuhear">
					<div class="menuleft menuitem">
						<i class="fa fa-search"></i>
					</div>
					<div class="menuright menuitem">
						<publish ref="publish" @init="publishInit" @close="init"></publish>
					</div>
					<div class="menu">
						<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
							<a class="mui-control-item" href="#item1mobile"> 图文 </a>
							<a class="mui-control-item" href="#item2mobile"> 视频 </a>
						</div>
						<div id="sliderProgressBar" class="mui-slider-progress-bar mui-col-xs-6"></div>	
					</div>
				</div>
				<div class="mui-slider-group" :style="{height: srcollHeight+'px'}">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<themes  :ids="'imgtheme'" :type="1" v-if="tabmenu.state & tabmenu.index==1"></themes>
					</div>
					<div id="item2mobile" class="mui-slider-item mui-control-content">
						<themes :ids="'videotheme'" :type="2" v-if="tabmenu.state & tabmenu.index==2"></themes>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Vue from 'vue'
	import  mui from './../assets/js/mui.min.js'
	import publish from './publish.vue'
	import themes from './../apps/main/themeMain.vue'
	import themelist from './../apps/commom/themeList.vue'
	import  {Indicator,Toast}   from 'mint-ui';
	
	import SY from 'sy'
	export default {
		data() {
			return {
				srcollHeight: '',
				tabmenu:{
					index:1,
					state:true
				},
				listData:[],
				listDatas:[],
				pager:SY.config.newpager,
				pagers:SY.config.newpager,
			}
		},
		computed: {
			...mapGetters(['app','perinfo'])
		},
		components:{publish,themes,themelist },
		methods: {
			init(){
				this.tabmenu.state=true;
				this.menuInit();
			},
			publishInit(){
				this.tabmenu.state=false;
			},
			menuInit(){
				var _this =this ;
				mui(".mui-slider").slider(), mui(".mui-scroll-wrapper.mui-slider-indicator.mui-segmented-control").scroll({
					scrollY: !1,
					scrollX: !0,
					indicators: !1,
					snap: ".mui-control-item"
				})
				document.getElementById('slider').addEventListener('slide', function(e) {
					if (e.detail.slideNumber === 0) {
						_this.tabmenu.index=1;
					} else if (e.detail.slideNumber === 1) {
						_this.tabmenu.index=2;
					}
				});
			},
		},
		mounted() {
			this.srcollHeight=window.bodyHeight-50-40;
			this.$store.getters.app.tabbar='1';
			this.init();
		},
		beforeRouteLeave(to, from, next) {
			let isBack = window.isBack;
			if(isBack) {
				this.$store.commit("setTransitionName", "slide-right");
			} else {
				this.$store.commit("setTransitionName", "slide-left");
			}
			if(to.query.close==null){//如果是跳转到首页的其他的界面   就吧下面的菜单关闭掉，  如果是跳转到其他的按钮  不控制
				this.$store.getters.app.tabbar=''	
			}
			//this.$destroy();
			// 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
			window.isBack = false
			next()
		}
	}
</script>

<style scoped="">
	.mentmore{
		overflow: hidden;
		width: 100%;
		padding: 0;	
	}
	.mentmore li i{
        font-size: 34px;
	    padding: 12px;
	    border: 1px solid #d1d1d1;
	    border-radius: 10px;
	    color: #485a75;
	}
	.mentmore li{
		list-style: none;
		display: inline-block;
		width: 25%;
		float: left;
		margin-bottom: 5px;
	}
	#imgcards{
		height: 130px;
	}
	#imgcards img{
		width: 100%;
		height: 130px;
	}
	#notice{
		overflow: hidden;
		width: 85%;
		height: 30px;
		position: absolute;
	    left: 35px;
	}
	.notice{
		height: 30px;
		line-height: 30px;
		position: relative;
	}
	.notice .left{
		font-size: 18px;
		float: left;
	    line-height: 30px;
	    padding-left: 16px;
	}
	.notice .right{
		font-size: 24px;
	    line-height: 40px;
	    position: absolute;
	    right: 20px;
	    top: -6px;
	}
	.notice .oneline{
	  overflow:hidden;
	  width: 85%;
	  padding-left: 10px;
	  color: #000;
	  text-align: left;
	  text-overflow:ellipsis;
	  -o-text-overflow:ellipsis;
	  -webkit-text-overflow:ellipsis;
	  -moz-text-overflow:ellipsis;
	  white-space:nowrap;
	}
	.mainmun{
		color: #FFFFFF;
	}
	.mainmun .money{
		font-weight: 600;
		font-size: 30px;
	}
	.info .center{
		margin: auto;
	    position: absolute;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    width: 200px;
	    right: 0;
	    height: 40px;
	}
	.info .mininfo{
		padding-top: 4px;
	}
	.info .bottom{
		position: absolute;
	    width: 95%;
	    bottom: 15px;
	}
	.zymain {
		font-size: 14px;
	}
	.hds .msg{
		float: right;
		padding-right: 10px;
		position: relative;
	}
	.hds .msg i{
		font-size: 32px;
	    color: #fff;
	}
	.hds .msg span{
		position: absolute;
		top: 0;
		padding: 1px 4px;
		right: 8px;
	}
	.agentinfo {
		text-align: center;
	}
	
	.agentinfo .info {
		font-size: 14px;
		position: relative;
		background-color: #0979cc;
		height: 270px;
	}
	
	.agentinfo .info img {
		height: 40px;
		width: 40px;
		border-radius: 40px;
		float: left;
		margin-right: 10px;
	}
	.agentinfo .info .img{
		float: left;
	}
	.agentnum .el-row {
		padding: 16px 0;
	}
	.agentinfo .info{
		    overflow: hidden;
    padding: 8px;
	}
	.agentinfo .info .perinfo{
		float: left;
		text-align: left;
    	font-size: 14px;
    	color: #FFFFFF;
	}
	.mui-table-view-cell {
		text-align: left;
	}
	
	.mui-table-view-cell i {
		font-size: 18px;
		padding-right: 8px;
		width: 25px;
		text-align: center;
	}
	/*通知*/
	.inform{
		margin: 0;
		padding-left: 0;
	}
	
	 
</style>