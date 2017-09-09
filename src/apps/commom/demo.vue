<template>
	<div class="imgvideocnt" :style="{height: srcollHeight+'px'}">
	
	</div>
</template>

<script>
	import SY from 'sy'
	export default {
    	props:[
    	
        ],
        data () {
            return {
            	srcollHeight:''
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