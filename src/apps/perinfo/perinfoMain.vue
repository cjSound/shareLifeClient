<template>
		<div class="zy-content" id="perinfo">
		<div class="info">
			<div class="content">
				 
			</div>
		</div>
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

<style   scoped="">
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
.info img{
	    width: 60px;
    height: 60px;
    border-radius: 50px;
}
.content{
    margin: 0 auto;
    text-align: center;
    height: 200px;
}
.info{
}
.info .show{
	font-size: 15px;
	padding: 2px 0;
}
.bottoms{
	    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
}
</style>