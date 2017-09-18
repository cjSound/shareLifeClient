<template>
	<div class="themecnt">
		<div :id="ids" class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<div class="sharecnt">
					<div class="tms" v-for="(item,index) in listDatas">
						<!--内容 个人信息-->
						<div class="pinfo click"  >
							<div class="img"><img :src="url+item.icon" alt="" /></div>
							<div class="name">{{item.username}}</div>
							<div class="theme click" @click="totheme(item.themeid)"><span class="smbtn">{{item.themeName}}</span></div>
						</div>
						<!--图片展示-->
						<dim ref="imgtheme" :item="item" :type="type" @cntclick="tothemeinfo"></dim>
						<!--点赞  回复数量等-->
						<div class="thememunu">
							<span class="float-left">
								<i class="fa good fa-comments-o" style="padding-right: 5px;"></i>
								<i class="good">{{item.reback}}</i>
								<i class="fa good fa-eye" style="padding-right: 5px;"></i>
								<i class="good">{{item.looks}}</i>
							</span>
							<span class="updown">
								<i class="iblack fa fa-thumbs-o-up click" :class="{'icolor':item.good!=null}" @click="togood(index)" ></i>
								<i class="iblack">{{item.goods,item.bads |goods   }} </i>
								<i class="iblack fa fa-thumbs-o-down click" :class="{'icolor':item.bad!=null}" @click="tobad(index)"></i>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mui from './../../assets/js/mui.min.js'
	import imgvideo from './imgVideos.vue'
	import dim from './dim.vue'
	import SY from 'sy'
	export default {
    	props:[
			'ids',
			'type',//1 首页 图文  2首页视频    3  
			'themeid',//具体的帖子
			'ttype'//1最新  2最热
        ],
        data () {
            return {
            	url:SY.util.getUrl(),
            	srcollHeight: '',
            	listDatas:[],
            	geturl:'',
            	pager:SY.util.cloneObj(SY.config.pager),
            }
        },
        computed: {
        	 
        },
        components: {imgvideo,dim},
        methods: {
        	init(){
        		this.pullinit();
        	},
        	tothemeinfo(item){
        		this.$router.push({path:'/theme/themeinfo?id='+item.id});
        	},
        	togood(index){
        		var item =this.listDatas[index];
        		if(item.good!=null){
        			this.$router.push({path:'/commom/goodbad?sid='+item.id+'&type=1'});
        		}else if(item.bad!=null){
        			this.$router.push({path:'/commom/goodbad?sid='+item.id+'&type=2'});
        		}else{
        			SY.net.getJSON("/api/share/goods",  { slife_id:item.id,   author_id:item.userid } , res => {
	        			if(res.data==0){
	        				this.listDatas[index].good=1;
	        				this.listDatas[index].goods++;
	        			}else{
	        				this.listDatas[index].good=null;
	        				this.listDatas[index].goods--;
	        			}
				    }, res => {
						mui.toast("请检查下网络撒");
				    },'login');
        		}
        		
        	},
        	tobad(index){
        		var item =this.listDatas[index];
        		if(item.good!=null){
        			this.$router.push({path:'/commom/goodbad?sid='+item.id+'&type=1'});
        		}else if(item.bad!=null){
        			this.$router.push({path:'/commom/goodbad?sid='+item.id+'&type=2'});
        		}else{
        			SY.net.getJSON("/api/share/bad",  { slife_id:item.id,   author_id:item.userid } , res => {
	        			if(res.data==0){
	        				this.listDatas[index].bad=1;
	        				this.listDatas[index].bads++;
	        			}else{
	        				this.listDatas[index].bad=null;
	        				this.listDatas[index].bads--;
	        			}
				    }, res => {
						mui.toast("请检查下网络撒");
				    },'login');
        		}
        	},
        	totheme(id){
        		console.log(id)
        	},
        	formatDatas(data){
        		for(var i =0;i<data.length;i++){
        			data[i].imgs=data[i].imgs.split('-');
        			data[i].videos=data[i].videos.split('-');
        		}
        		return data;
        	},
        	pullinit(){//初始化mui   下拉刷新控件
				var _this =this ;
				var ids="#"+this.ids;
				mui.init({
					pullRefresh: {
						container: ids,
						down: {
							height:100,
							callback: pulldownRefresh
						},
						up: {
							contentrefresh: '正在加载...',
							height:100,//可选.
							callback: pullupRefresh
						}
					}
				});
				if(SY.util.isApp()){
					mui(".mui-scroll-wrapper").on("tap",'.click',function(){
						this.click(); 
					})
				}
				function pulldownRefresh() {//下拉刷新的方法     读取首页  更新数据
					_this.pager.page=1;
					if(_this.themeid!=null){//只有当type 3时时候有themeid  和ttype类型 （  1最新  2最热排序）
						_this.pager.themeid=_this.themeid;
						_this.pager.ttype=_this.ttype;
					} 
					_this.pager.type=_this.type;
					SY.net.getJSON("/api/share/getShare", _this.pager   , res => {
						_this.listDatas=_this.formatDatas(res.data.pageData);
						_this.pager.allpage=res.data.total;
						mui(ids).pullRefresh().endPulldownToRefresh(); //refresh completed
		        		mui(ids).pullRefresh().refresh(true);//重新打开上拉加载	
				    }, res => {
						mui.toast("网络有点小问题哦");
				    });	
				}
				mui(".mui-slider").slider()
				pulldownRefresh();
				function pullupRefresh() {
					_this.pager.page++;
					//这里可能要获取很多的信息
					if(_this.pager.page<=_this.pager.allpage){
						SY.net.getJSON("/api/share/getShare",  _this.pager , res => {
//							list=res.
				        	if(_this.pager.page<_this.pager.allpage){
				        		mui(ids).pullRefresh().endPullupToRefresh();	
				        	}else{
								mui(ids).pullRefresh().endPullupToRefresh(true);				        		
				        	}
					    }, res => {
							mui.toast("请检查下网络撒");
							mui(ids).pullRefresh().endPullupToRefresh();
					    });
					}else{
						mui(ids).pullRefresh().endPullupToRefresh(true);
					}
				}
			}
        },
        mounted(){
        	this.srcollHeight=window.bodyHeight-50-40;
        	this.init();
        	var _this =this ;
        }
    }
</script>

<style >
.tms{
	padding: 5px;
	background: #FFFFFF;
	margin-bottom: 5px;
}
.tms .pinfo{
	overflow: hidden;
	padding-right: 10px;
	padding-bottom: 5px;
}
.tms .pinfo .img{
	float: left;
	height: 40px;
}
.tms .pinfo .img img{
	height: 40px;
	width: 40px;
	border-radius: 50px;
}
.tms .pinfo .name{
	float: left;
	height: 40px;
	padding-left: 10px;
}
.tms .pinfo .theme{
	float: right;
	height: 40px;
	line-height: 40px;
}
</style>