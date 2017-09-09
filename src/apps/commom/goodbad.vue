<template>
	<div class="goodbad"  >
		<header id="header" class="mui-bar mui-bar-nav "  >
			<a  href="javaScript:void(0)" class=" mui-icon mui-icon-left-nav mui-pull-left" @click="$router.go(-1)"></a>
			<span class="head-span mui-pull-right icolor" @click="change">{{typetxt}}</span>
		</header>	
		<div  class="mui-scroll-wrapper" id="goodbad" :style="{height: srcollHeight+'px'}">
			<div class="mui-scroll">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media" v-for="(item,index) in list">
						<img class="mui-media-object mui-pull-left" :src="burl+'/'+item.icon" alt="" />
						<div class="mui-media-body">
							{{item.username}}
							<p class="mui-ellipsis">{{item.signs}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import SY from 'sy'
	import mui from './../../assets/js/mui.min.js'
	export default {
        data () {
            return {
            	srcollHeight:'',
            	burl:SY.util.getUrl(),
            	urls:'',
            	list:[],
            	pager:SY.util.cloneObj(SY.config.pager),
            	typetxt:''
            }
        },
        components: {},
        computed: {
        	 
        },
        methods: {  
        	init(){
				var param =SY.util.getParams();
				if(param.type==1){
					this.urls="/api/share/getGoods";
					this.typetxt="取消赞"
				}else if (param.type==2){
					this.urls="/api/share/getBads";
					this.typetxt="取消踩";
				}else if(param.type==3){
					this.urls="/api/shareback/getGoods";
					this.typetxt="取消赞";
				}else if(param.type==4){
					this.urls="/api/shareback/getBads";
					this.typetxt="取消踩";
				}else if(param.type==5){
					this.urls="/api/sharerbackbk/getGoods";
					this.typetxt="取消赞";
				}else if(param.type==6){
					this.urls="/api/sharerbackbk/getBads";
					this.typetxt="取消踩";
				}
				this.pullinit();
        	},
        	change(){
        		var url ;
        		var param =SY.util.getParams();
        		var pms ={};
        		if(param.type==1){
        			url="/api/share/goods";
        			pms={ slife_id:param.sid };
        		}else if(param.type==2){
        			url="/api/share/bad";
        			pms={ slife_id:param.sid };
        		}else  if(param.type==3){
        			url="/api/shareback/goods";
        			pms={ rback_id:param.sid};
        		}else  if(param.type==4){
        			url="/api/shareback/bad";
        			pms={ rback_id:param.sid};
        		}else  if(param.type==5){
        			url="/api/sharerbackbk/goods";
        			pms={ bback_id:param.sid};
        		}else  if(param.type==6){
        			url="/api/sharerbackbk/bad";
        			pms={ bback_id:param.sid};
        		}else{
        			//404 错误界面
        			this.$router.go(-1);
        		}
        		var param =SY.util.getParams();
        		SY.net.getJSON(url,  pms , res => {
        			if(res.code==0){
        				mui.toast("取消成功");
        				this.$router.go(-1);
        			}
			    }, res => {
					mui.toast("请检查下网络撒");
			    },'login');
        	},
        	pullinit(){//初始化mui   下拉刷新控件 
				var _this =this ;
				var ids ='#goodbad';
				var param =SY.util.getParams();
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
				function pulldownRefresh(){//下拉刷新的方法     读取首页  更新数据
					_this.pager.page=1;
					_this.pager.lifeid=param.sid;
					_this.list='';
					SY.net.getJSON(_this.urls,  _this.pager , res => {
		        		_this.list=res.data.pageData;
		        		_this.pager.allpage=res.data.total;
		        		mui(ids).pullRefresh().endPulldownToRefresh(); //refresh completed
		        		mui(ids).pullRefresh().refresh(true);//重新打开上拉加载	
				    }, res => {
						mui.toast(SY.code.timeout);			    	
				    });
 				}
				function pullupRefresh(){
					_this.pager.page++;
					if(_this.pager.page<=_this.pager.allpage){
						SY.net.getJSON(_this.urls,  _this.pager , res => {
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
        mounted(){
        	this.srcollHeight=window.bodyHeight;
        	this.init();
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
	img.mui-media-object{
		border-radius: 6px;
	}
</style>