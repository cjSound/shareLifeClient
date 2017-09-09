<template>
	<div class="themeinfo ">
		<header id="header" class="mui-bar mui-bar-nav">
			<a  href="javaScript:void(0)" class=" mui-icon mui-icon-left-nav mui-pull-left" @click="$router.go(-1)"></a>
			<h1 class="mui-title"  >回复</h1>
		</header>
			
		<div  class="mui-scroll-wrapper" id="themeback" :style="{height: srcollHeight+'px'}">
			<div class="mui-scroll">
				<div class="sharecnt">
					<!--回复专区-->
					<div class="rbackinfo"  v-if="item!=''"  >
						<div class="backuser">
							<div class="left">
								<img :src="url+'/'+item.icon" alt="" class="userimg" />
								<div class="info">
									<div>{{item.username}}</div>
									<p>{{item.create_time|lgtime}}</p>
								</div>	
							</div>
							<div class="right">
								<i class="iblack fa fa-thumbs-o-up click"  :class="{'icolor':item.good!=null}" @click="tgood(index)"></i>
								<i class="iblack">{{item.goods,item.bads |goods }}</i>
								<i class="iblack fa fa-thumbs-o-down click" :class="{'icolor':item.bad!=null}" @click="tbads(index)"></i>
							</div>
							
						</div>
						<div class="backcnt">
							<dim  :show="true" :item="item" :type="3" @cntclick="tobackback"></dim>	
						</div>
						
					</div>	
					<div class="rbackinfo bback"  v-if="list!=''" v-for="(item,index) in list">
						<div class="backuser">
							<div class="left">
								<img :src="url+'/'+item.icon" alt="" class="userimg" />
								<div class="info">
									<div>{{item.username}}</div>
									<p class="bbtime">{{item.create_time|lgtime}}</p>
								</div>	
							</div>
							<div class="right">
								<i class="iblack fa fa-thumbs-o-up click"  :class="{'icolor':item.good!=null}" @click="backgood(index)"></i>
								<i class="iblack">{{item.goods,item.bads |goods }}</i>
								<i class="iblack fa fa-thumbs-o-down click" :class="{'icolor':item.bad!=null}" @click="backbads(index)"></i>
							</div>
							
						</div>
						<div class="backcnt">
							<dim  :show="true" :item="item" :type="3" :totalk="true" @cntclick="tobackback"></dim>	
						</div>
						
					</div>	
				</div>
				
			</div>
			
		</div>
		<div class="fixreply fixwid">
			<div class="input">
				<input type="text" @focus="showback"  :placeholder="backshow" />
			</div>
		</div>
		<transition name="slide-bottom">
			<reback v-if="backstate" :type="2"  @close="closeback" @save="reback"></reback>
		</transition>
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
            	item:'',
            	backstate:false,
            	srcollHeight: '',
            	backinfo:{
            		lcontent:'',
            		imgs:'',
            		videos:'',
            		backid:'',
            		slife_id:'',
            		to_userid:'',
            		to_id:''
            	},
            	backshow:'回复评论',
            	pager:SY.util.cloneObj(SY.config.pager),
            	list:[]
            }
        },
        components: {dim,upload,reback},
        computed: {
        	 
        },
        methods: {  
        	init(){
        		this.pullinit();
        	},
        	backgood(index){//帖子  点赞
        		var item =this.list[index];
        		if(item.good!=null){
        			this.$router.push({path:'/commom/goodbad?sid='+item.id+'&type=5'});
        		}else if(item.bad!=null){
        			this.$router.push({path:'/commom/goodbad?sid='+item.id+'&type=6'});
        		}else{
        			SY.net.getJSON("/api/sharerbackbk/goods",  { bback_id:item.id, author_id:item.userid } , res => {
	        			if(res.data==0){
	        				this.list[index].good=1;
	        				this.list[index].goods++;
	        			}else{
	        				this.list[index].good=null;
	        				this.list[index].goods--;
	        			}
				    }, res => {
						mui.toast("请检查下网络撒");
				    },'login');
        		}
        	},
        	backbads(index){
        		var item =this.list[index];
        		if(item.good!=null){
        			this.$router.push({path:'/commom/goodbad?sid='+item.id+'&type=5'});
        		}else if(item.bad!=null){
        			this.$router.push({path:'/commom/goodbad?sid='+item.id+'&type=6'});
        		}else{
        			SY.net.getJSON("/api/sharerbackbk/bad",  { bback_id:item.id, author_id:item.userid } , res => {
	        			if(res.data==0){
	        				this.list[index].bad=1;
	        				this.list[index].bads++;
	        			}else{
	        				this.list[index].bad=null;
	        				this.list[index].bads--;
	        			}
				    }, res => {
						mui.toast("请检查下网络撒");
				    },'login');
        		}
        	}, 
        	tgood(index){//帖子  点赞
        		var item =this.item;
        		if(item.good!=null){
        			this.$router.push({path:'/commom/goodbad?sid='+item.id+'&type=3'});
        		}else if(item.bad!=null){
        			this.$router.push({path:'/commom/goodbad?sid='+item.id+'&type=4'});
        		}else{
        			SY.net.getJSON("/api/shareback/goods",  { tlife_id:item.slife_id,rback_id:item.id, author_id:item.userid } , res => {
	        			if(res.data==0){
	        				item.good=1;
	        				item.goods++;
	        			}else{
	        				item.good=null;
	        				item.goods--;
	        			}
				    }, res => {
						mui.toast("请检查下网络撒");
				    },'login');
        		}
        	},
        	tbads(index){
        		var item =this.item;
        		if(item.good!=null){
        			this.$router.push({path:'/commom/goodbad?sid='+item.id+'&type=3'});
        		}else if(item.bad!=null){
        			this.$router.push({path:'/commom/goodbad?sid='+item.id+'&type=4'});
        		}else{
        			SY.net.getJSON("/api/shareback/bad",  { tlife_id:item.slife_id,rback_id:item.id, author_id:item.userid } , res => {
	        			if(res.data==0){
	        				item.bad=1;
	        				item.bads++;
	        			}else{
	        				item.bad=null;
	        				item.bads--;
	        			}
				    }, res => {
						mui.toast("请检查下网络撒");
				    },'login');
        		}
        	}, 
        	tobackback(item){
        		this.backshow='回复：'+item.username;
        		this.backinfo.to_userid=item.userid;
        		this.backinfo.to_id=item.id;
        	},
        	showback(){
        		this.backstate=true;
        	},
        	//回复相关信息
        	closeback(){
        		this.backstate=false;
        	},
        	reback(item){//回复信息
        		this.backinfo.backid=this.item.id;
        		this.backinfo.slife_id=this.item.slife_id;
        		this.backinfo.lcontent=item.lcontent;
        		
    			if(this.item &&this.item.imgs){
    				this.backinfo.imgs =SY.util.concatArrayToString(item.result);
    			}
    			console.log(this.backinfo);
    			SY.net.getJSON("/api/sharerbackbk/save",  this.backinfo , res => {
    				this.pullinit();
    				this.backstate=false;
    				mui.toast("回复成功");		
			    }, res => {
					mui.toast(SY.code.timeout);			   
			    });
        		 
        	},
        	//获取楼主信息
        	getThemeInfo(){
        		var param =SY.util.getParams();
        		SY.net.getJSON("/api/shareback/getShareBackInfo",  {id:param.sid} , res => {
		        	res.data.imgs=res.data.imgs.split('-');
		        	if(res.data.imgs[0]==""){
						res.data.imgs=[];		        		
		        	}
		        	res.data.videos=res.data.videos.split('-');
		        	if(res.data.videos[0]==""){
						res.data.videos=[];		        		
		        	}
		        	this.item=res.data;
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
        	},
        	pullinit(){//初始化mui   下拉刷新控件 
				var _this =this ;
				this.getThemeInfo();
				var param =SY.util.getParams();
				var ids ='#themeback';
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
					_this.pager.backid=param.sid;
					_this.list='';
					SY.net.getJSON("/api/sharerbackbk/getRbkback",  _this.pager , res => {
		        		_this.list=_this.formatData(res.data.pageData);
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
						SY.net.getJSON("/api/sharerbackbk/getRbkback",  _this.pager , res => {
				        	_this.list=_this.list.concat(_this.formatData(res.data.pageData));
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