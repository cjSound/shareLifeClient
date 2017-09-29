<template>
		<div class="zy-content" id="perinfo">
		<div class="info">
			<div class="content">
				<img class="bg" src="../../assets/images/pf1.jpg" alt="" />
				<div class="pinfo" v-if="perinfo!=''">
					<img :src="perinfo.icon" alt="" />
				</div>
				<div class="pinfo" v-else="">
					<span><img src="../../assets/images/heads.jpg" alt="" /></span>
					<div class="pp">
						<div class="name">请登录</div>
						<div class="desc">每个人都温柔以待，想心中所乐每个人都温柔以待每个人都温柔以待</div>
					</div>
				</div>
			</div>
			<div class="pmenu">
					<ul class="">
						<li class="menu">
							<div class="num">1</div>
							<div class="name">帖子</div>
							<i class="right-line"></i>
						</li>
						<li class="menu">
							<div class="num">1</div>
							<div class="name">获赞</div>
							<i class="right-line"></i>
						</li>
						<li class="menu">
							<div class="num">1</div>
							<div class="name">关注</div>
							<i class="right-line"></i>
						</li>
						<li class="menu">
							<div class="num">1</div>
							<div class="name">粉丝</div>
						</li>
					</ul>
				</div>
		</div>
		<div class="line"></div>
		<div class="mui-content">
			<ul class="mui-table-view  ">
				<li class="mui-table-view-cell"  >
					<a class="mui-navigate-right click" @click="goto('perinfo/mybankcard')">
						<i class="fa fa-address-card-o"></i>我的银行卡
					</a>
				</li>
				<li class="mui-table-view-cell"  >
					<a class="mui-navigate-right click" @click="goto('perinfo/myinfo')">
						<i class="fa fa-folder-open-o"></i> 我的资料
					</a>
				</li>
				<li class="mui-table-view-cell"  >
					<a class="mui-navigate-right click" @click="goto('perinfo/changepsw')">
						<i class="fa fa-street-view"></i> 修改登录密码
					</a>
				</li>
				<li class="mui-table-view-cell"  >
					<a class="mui-navigate-right click" @click="goto('perinfo/opinionback')">
						 <i class="fa  fa-envelope-open-o"></i>意见反馈
					</a>
				</li>
			</ul>
			<ul class="mui-table-view "  >
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right click" @click="goto('perinfo/aboutus')">
						<i class="fa fa-ticket"> </i> 关于我们
					</a>
				</li>
			 	 
			</ul>
		</div>
		</div>
		
		 

</template>

<script>
	import mui from './../../assets/js/mui.min.js'
	import { mapGetters } from 'vuex';
	import SY from 'sy'
	export default {
		data() {
			return {
				srcollHeight:''
			}
		},
	    computed: {
			...mapGetters(['perinfo'])
		},
		methods: {
			 goto(url) {
				SY.util.pushUrl({ path: "/" + url });
			},
			exit(){
				SY.localstorage.clearAll();
				SY.util.pushUrl({ path: "/login"  });
				window.location.reload();
			}
		},
		mounted(){
			this.$store.getters.app.tabbar='5'	
			this.srcollHeight=window.bodyHeight- 45;
		},
	   	beforeRouteLeave(to,from,next){
			let isBack = window.isBack;
		   	if (isBack) {
		   		this.$store.commit("setTransitionName","slide-right");
		   	} else {
		   		this.$store.commit("setTransitionName","slide-left");
		   	}
		   	if(to.fullPath.indexOf('/main')!=-1){
		   		this.$store.getters.app.tabbar='5'	
		   	}
		   	// 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
		   	window.isBack = false
	     	next();
		}
	}
</script>

<style   scoped="" lang="scss">
.mui-table-view  {
	margin-top: 20px;
}
.mui-table-view-cell{
	font-size: 15px;
	color: #807676;
}
.mui-table-view-cell i{
	padding-right: 10px;
}
 
.content{
    margin: 0 auto;
    text-align: center;
    height: 200px;
    position: relative;
    margin-bottom: 45px;
}
.info img.bg{
	width: 100%;
	height: 100%;
	z-index: -1;
}
.info .pinfo{
	position: absolute;
    z-index: 1;
    bottom: -40px;
    height: 80px;
    img{
    	height: 80px;
    	width: 80px;
    	border-radius: 80px;	
    	float: left;
    	padding: 3px;
    }
    span{
    	background: #FFFFFF;
    	overflow: hidden;
    	display: inline-block;
    	float: left;
    	border-radius: 80px;
    	margin:0 10px 0 20px;
    }
    .pp{
    	float: left;
    	height: 80px;
    	line-height: 40px;
    	text-align: left;
    	max-width: 230px;
    	.name{
    		color: #FFFFFF;
    		font-size: 16px;
    	}
    	.desc{
    		color: #1F2D3D;	
    		overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
    	}
    }
}
.pmenu{
	margin-bottom: 10px;
	ul{
		padding: 0;
		margin: 0;
		overflow: hidden;
		text-align: center;
	}
	.right-line{
		position: absolute;
	    border-right: 1px solid #d1d1d1;
	    width: 1px;
	    height: 20px;
	    right: 0;
	    top: 12px;
	}
	.menu{
		list-style: none;	
		width: 25%;
		float: left;
		position: relative;
		.num{
			color: #5f5959;
		}
		.name{
			color: #9c9696;
		}
	}
}
.bottoms{
	position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
}
</style>