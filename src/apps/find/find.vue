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
        		console.log(it)
        	}
        },
        mounted(){
        	this.srcollHeight=window.bodyHeight-50;
        	this.$store.getters.app.tabbar='3'	
        	this.init();
        }
    }
</script>

<style scoped="">

</style>