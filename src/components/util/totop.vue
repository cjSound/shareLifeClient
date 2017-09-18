<template>
	<div class="totop" @click="cnttop">
		<i class="fa fa-arrow-up"></i>
	</div>
</template>

<script>
import mui from './../../js/mui.min.js'
export default {
	props:[
		'id'
        ],
	data () {
        return {
        	timer:'',
        }
    },
	methods: {
		cnttop(){
			mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1000)
			mui.scrollTo(0,200);
			this.$emit("top");
		},
	  	totop(){
	  		var  _this =this;
	  		
			cancelAnimationFrame(this.timer);
			this.timer = requestAnimationFrame(function fn() {
				var oTop = document.body.scrollTop || document.documentElement.scrollTop;
				if(oTop > 0) {
					document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
					_this.timer = requestAnimationFrame(fn);
				} else {
					cancelAnimationFrame(_this.timer);
				}
			});
		},
	}
}
</script>

<style scoped="">
	.totop{
		position: fixed;
	    bottom: 40px;
	    right: 20px;
	    width: 40px;
	    height: 40px;
	    z-index: 999;
	    text-align: center;
	    line-height: 35px;
	    background: #d1d1d1;
	    border-radius: 7px;
	    font-size: 22px;
	    color: #fff;
	    opacity: .7;
	}
</style>