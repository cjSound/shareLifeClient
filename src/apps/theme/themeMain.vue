<template>
	<div class="imgvideocnt" :style="{height: srcollHeight+'px'}">
		<header id="header" class="mui-bar mui-bar-nav "  >
			<span class="head-span   mui-pull-left" @click="toclose"  style="font-size: 18px;"> <i class="fa fa-close "></i></span>
			<h1 class="mui-title"  ></h1>
			<span class="head-span mui-pull-right icolor" @click="save">回复</span>
		</header>	
	</div>
</template>

<script>
	import SY from 'sy'
	export default {
    	props:[
    	
        ],
        data () {
            return {
            	srcollHeight:'',
            	theme:{
            		
            	}
            }
        },
        components: {},
        computed: {
        	 
        },
        methods: {  
        	init(){
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

</style>