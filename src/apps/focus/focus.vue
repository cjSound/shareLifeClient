<template>
	<div class="app-content zymain">
		<div class="mui-content">
			<div id="slider" class="mui-slider">
				<div class="menuhear">
					<div class="menuleft menuitem">
						<i class="fa fa-search"></i>
					</div>
					<div class="menuright menuitem">
					</div>
					<div class="menu">
						<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
							<a class="mui-control-item" href="#themecnt"> 标签 </a>
							<a class="mui-control-item" href="#lifecnt"> 小圈圈 </a>
						</div>
						<div id="sliderProgressBar" class="mui-slider-progress-bar mui-col-xs-6"></div>	
					</div>
				</div>
				<div class="mui-slider-group" :style="{height: srcollHeight+'px'}">
					<div id="themecnt" class="mui-slider-item mui-control-content mui-active">
						<div id="focustheme" class="mui-scroll-wrapper" :style="{height: srcollHeight+'px'}">
						<div class="mui-scroll"  >
							<ul class="mui-table-view">
							<li class="mui-table-view-cell mui-media click" v-for="(item,index) in list" @click="tothememain(item)">
								<img class="mui-media-object mui-pull-left" :src="url+item.icon">
								<div class="mui-media-body">
									<p class="tit">
										{{item.tname}}
										<span class="">{{item.fnum}} <i class="fa fa-tint"></i></span>
									</p>
									<p class='mui-ellipsis'>{{item.tdesc}}</p>
								</div>
							</li>
							</ul>
						</div>
					</div>
					</div>
					<div id="lifecnt" class="mui-slider-item mui-control-content">
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
	import  mui from './../../assets/js/mui.min.js'
	import themes from './../main/themeMain.vue'
	import themelist from './../commom/themeList.vue'
	import  {Indicator,Toast}   from 'mint-ui';
	
	import SY from 'sy'
	export default {
		data() {
			return {
				srcollHeight: '',
				url:SY.util.getUrl(),
				tabmenu:{
					index:1,
					state:true
				},
				list:[],
				pager:SY.config.pager
			}
		},
		computed: {
			...mapGetters(['app','perinfo'])
		},
		components:{themes,themelist },
		methods: {
			init(){
				this.tabmenu.state=true;
				this.menuInit();
				this.pullinit();
			},
			publishInit(){
				this.tabmenu.state=false;
			},
			tothememain(it){
				this.$router.push({path:'/theme/themeMain?id='+it.themeid});
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
			pullinit(){//初始化mui   下拉刷新控件 
				var _this =this ;
				var ids ='#themecnt';
				mui.init({
					pullRefresh: {
						container: ids,
						down: {
							height:100,//可选.
							callback: pulldownRefresh
						},
						up: {
							height:100,//可选.
							contentrefresh: '正在加载...',
							callback: pullupRefresh
						}
					}
				});
				//真垃圾，mui给刷新content全部绑定的tap事件，需要重新触发点击事件，这里给a标签触发点击事件
				if(SY.util.isApp()){
					mui(ids).on("tap",'.click',function(){
					this.click();
				})}
				pulldownRefresh();
				function pulldownRefresh(state){//下拉刷新的方法     读取首页  更新数据
					_this.pager.page=1;
					_this.pager.topid=_this.tpid;
					SY.net.getJSON("/api/focus/getmyfouces",  _this.pager , res => {
		        		_this.list=res.data.pageData;
		        		_this.pager.allpage=res.data.total;
		        		mui(ids).pullRefresh().endPulldownToRefresh(); //refresh completed
		        		mui(ids).pullRefresh().refresh(true);//重新打开上拉加载	
				    }, res => {
						mui.toast(SY.code.timeout);		    	
				    });
 				}
				function pullupRefresh(){
					_this.pager.type=_this.type;
					_this.pager.page++;
					if(_this.pager.page<=_this.pager.allpage){
						SY.net.getJSON("/api/focus/getmyfouces",  _this.pager , res => {
				        	_this.list=_this.list.concat(res.data.pageData);
				        	if(_this.pager.page<_this.pager.allpage){
				        		mui(ids).pullRefresh().endPullupToRefresh();	
				        	}else{
								mui(ids).pullRefresh().endPullupToRefresh(true);				        		
				        	}
					    }, res => {
							mui.toast(SY.code.timeout);
							mui(ids).pullRefresh().endPullupToRefresh();
					    });
					}else{
						mui(ids).pullRefresh().endPullupToRefresh(true);
					}
				}
			}
		},
		mounted() {
			this.srcollHeight=window.bodyHeight-50-40;
			this.$store.getters.app.tabbar='2';
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
			this.$destroy();
			// 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
			window.isBack = false
			next()
		}
	}
</script>

<style scoped="">
	.mui-table-view img{
	 	height: 42px;
	 	width: 42px;
	}
	.mui-media-body .tit{
		color: #000000; 	
	}
	.mui-media-body .tit span{
		color: #007AFF;
		float: right;
		padding-right: 25px;
	}
</style>