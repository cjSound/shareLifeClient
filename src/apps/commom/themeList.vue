<template>
	<div :id="'themelist'+topid" class="mui-scroll-wrapper" :style="{height: srcollHeight+'px'}">
		<div class="mui-scroll"  >
			<div class="scontent">
				<div class="themedetails" v-for="(item,index) in list">
					<div class="tag click"  @click="tagemit(item)">
							<div class="img">
								<div class="imgcnt"><img class="" :src="baseUrl+item.icon" alt="" /></div>
							</div>
							<div class="tag-info">
								<div class="name">{{item.tname}}</div>
								<div class="desc">{{item.tdesc}}</div>
							</div>
					</div>
					
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
	import mui from './../../assets/js/mui.min.js'
	import SY from 'sy'
	export default {
    	props:[
            "type",//1 创建帖子的时候选择标签    2发现界面   所有的标签   3我的关注界面  //区分点击事件的不同，获取子标签  type不一样
            "topid"
        ],
        data () {
            return {
            	pager:SY.util.cloneObj(SY.config.pager),
            	list:[],
            	tpid:'',
            	baseUrl:SY.util.getUrl()
            }
        },
        computed: {
        	 
        },
        methods: {
        	init(){
        		this.tpid=this.topid;
        		this.pullinit();
        	},
        	tagemit(it){
        		this.$emit('choise', it);
        	},
        	pullinit(){//初始化mui   下拉刷新控件 
				var _this =this ;
				var ids ='#themelist'+this.tpid;
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
					_this.pager.type=_this.type;
					_this.pager.page=1;
					_this.pager.topid=_this.tpid;
					SY.net.getJSON("/api/theme/getThemeByTops",  _this.pager , res => {
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
						SY.net.getJSON("/api/theme/getThemeByTops",  _this.pager , res => {
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
        beforeMount(){
        	
        },
        mounted(){
        	this.srcollHeight=window.bodyHeight ;
        	this.init();
        } 
    }
</script>

<style scoped="">
.mui-control-item{
 	width: 100%;
}
.tag{
	overflow: hidden;
	border-bottom: 1px solid #D1D1D1;
	padding: 5px 0;
}
.tag .img{
	float: left;
	width: 20%;
	margin: 0 auto;
}
.tag .img div{
	width: 100%;
        height: 0px;
        padding-bottom: 100%;
        overflow:hidden;
        margin: 0;
        position:relative;
}
.tag img{
	position:absolute;
    width: 100%;
    height: 100%;
	border-radius: 13px;
	padding: 5px;
}
.tag .tag-info{
	float: left;
    width: 80%;
    padding-left: 5px;
    line-height: 25px;
    padding-top: 5px;
    
}
.tag .tag-info .name{
	color: #222222;
}
.tag .tag-info>div{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

</style>