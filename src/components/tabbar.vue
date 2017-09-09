<template>
	<nav class="zy-bar" v-if="app.tabbar!=''">
		<a class="zy-tab-item "  :class="{'zy-active':app.tabbar=='1'}" @click="goto('main?close=no',1)">
			<span class="mui-icon mui-icon-home"></span>
			<span class="mui-tab-label">推荐</span>
		</a>
		<a class="zy-tab-item"  :class="{'zy-active':app.tabbar=='2'}" @click="goto('focus/focus?close=no',2)">
			<span class="mui-icon mui-icon-extra mui-icon-extra-heart"> </span>
			<span class="mui-tab-label">关注</span>
		</a>
		<a class="zy-tab-item"   :class="{'zy-active':app.tabbar=='3'}" @click="goto('find/find?close=no',3)">
			<span class="mui-icon mui-icon-paperplane"></span>
			<span class="mui-tab-label">发现</span>
		</a>
		<a class="zy-tab-item"   :class="{'zy-active':app.tabbar=='4'}" @click="goto('myplayer/pleayerMain?close=no',4)">
			<span class="mui-icon mui-icon-chatbubble"></span>
			<span class="mui-tab-label">消息</span>
		</a>
		<a class="zy-tab-item"  :class="{'zy-active':app.tabbar=='5'}" @click="goto('operations?close=no',5)">
			<span class="mui-icon mui-icon-gear"></span>
			<span class="mui-tab-label">我的</span>
		</a>
	</nav>
</template>

<script>
	import {mapState} from 'vuex';
	import  mui from './../assets/js/mui.min.js'
	import SY from 'sy'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['app'])
		},
		methods:{
			goto(url,item) {
				this.$store.getters.app.tabbar=item;
				SY.util.pushUrl({path: "/" + url });
			},
		},
		mounted(){
			var _this=this ;
	  	}
	}
</script>

<style scoped="">
	.mui-bar{
		background: #FFFFFF;
	}
	.zy-bar{
		bottom: 0;
	    display: table;
	    width: 100%;
	    height: 50px;
	    padding: 0;
	    table-layout: fixed;
	    border-top: 0;
	    border-bottom: 0;
	    -webkit-touch-callout: none;
	    position: fixed;
	    z-index: 0;
	    right: 0;
	    left: 0;
	    height: 44px;
	    padding-right: 10px;
	    padding-left: 10px;
	    border-bottom: 0;
	    background-color: #FFFFFF;
	    -webkit-box-shadow: 0 0 1px rgba(0,0,0,.85);
	    box-shadow: 0 0 1px rgba(0,0,0,.85);
	    -webkit-backface-visibility: hidden;
	    backface-visibility: hidden;
	}
	.zy-bar .zy-tab-item{
		display: table-cell;
	    overflow: hidden;
	    width: 1%;
	    height: 50px;
	    text-align: center;
	    vertical-align: middle;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    color: #929292;
	}
	.zy-bar .zy-active{
		    color: #007aff;
	}
	.zy-bar .mui-icon{
		top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
	}
	.zy-bar .mui-tab-label{
		font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
	}
</style>