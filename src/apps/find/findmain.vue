<template>
	<div class="findcnt" :style="{height: srcollHeight+'px'}">
		<theme :type="2" @choise="choise" ></theme>
	</div>
</template>

<script>
	import SY from 'sy'
	import theme from './../commom/theme.vue'
	export default {
    	props:[
        ],
        data () {
            return {
            	srcollHeight:''
            }
        },
        components: {theme},
        computed: {
        	 
        },
        methods: {  
        	init(){
        		
        	},
        	choise(it){
        		this.$router.push({path:'/theme/themeMain?id='+it.id});
        	}
        },
        mounted(){
        	this.srcollHeight=window.bodyHeight-50;
        	this.$store.getters.app.tabbar='3'	
        	this.init();
        },
        beforeRouteLeave(to,from,next){
			let isBack = window.isBack;
		   	if (isBack) {
		   		this.$store.commit("setTransitionName","slide-right");
		   	} else {
		   		this.$store.commit("setTransitionName","slide-left");
		   	}
		   	window.isBack = false
	     	next()
		}
    }
</script>

<style scoped="">

</style>