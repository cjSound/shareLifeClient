<template>
	<div class="datearea" >
		<div class="show">
			<i class="fa fa-calendar searchtime"  @click="opens"  ></i>
		</div>
		<div class="content" v-show="open">
			<header id="header" class="mui-bar mui-bar-nav">
				<h1 class="mui-title">时间范围选择</h1>
			</header>
			<ul class="mui-table-view " style="margin-top: 45px;">
				<li class="mui-table-view-cell" @click="changestart">
						开始时间：
					<span class="mui-pull-right" style="color: #323232;padding-right: 30px;">{{showtime.start}}</span>
				</li>
				<li class="mui-table-view-cell" @click="changeend">
						结束时间：
					<span class="mui-pull-right" style="color: #323232;padding-right: 30px;">{{showtime.end}}</span>
				</li>
			</ul>
			<span class="fullbtn" style="margin-top: 50px;" @click="gettime">确认</span>
		</div>
		
	</div>
</template>

<script>
	import Vue from 'vue'
	import SY from 'sy'
	import mui from   './../assets/js/mui.min.js'
	import   './../assets/js/mui.picker.min.js'
	import  {Toast}   from 'mint-ui';
	export default {
    	props:[
    		
        ],
        data () {
            return {
            	open:false,
            	time:{
            		start:new Date(),
            		end:new Date()
            	},
            	showtime:{
            		start:'',
            		end:''
            	}
            }
        },
        computed: {
        	 
        },
        methods: {
        	gettime(){
        		if(this.showtime.start==''){
        			Toast({
					  	message: '开始时间不能为空',
					  	iconClass: 'fa fa-bullhorn'
					});
        		}else if(this.showtime.end==''){
        			Toast({
					  	message: '结束时间不能为空',
					  	iconClass: 'fa fa-bullhorn'
					});
        		}else{
        			this.$emit('change', this.showtime);
        			this.open=false;	
        		}
        		
        	},
        	opens(){
        		this.open=true;
        	},
        	changestart(val){
        		var picker = new mui.DtPicker({type:'date', endDate: new Date()});
				var _this =this ;
				if(_this.showtime.start!=''){
					picker.setSelectedValue(_this.showtime.start)	
				}
				picker.show(function(rs) {
					if(_this.showtime.end===''||new Date(rs.text).getTime()-new Date(_this.time.end)<=0){
		    			_this.showtime.start=rs.text;
		    		}else{
		    			Toast({
						  	message: '开始时间不能大于结束时间',
						  	iconClass: 'fa fa-bullhorn'
						});
		    		}
				});
        	},
        	changeend(val){
        		var picker = new mui.DtPicker({type:'date', endDate: new Date()});
				var _this =this ;
				if(_this.showtime.end!=''){
					picker.setSelectedValue(_this.showtime.end)	
				}
				picker.show(function(rs) {
					if(_this.showtime.start===''|| new Date(rs.text).getTime()-new Date(_this.showtime.start)>=0){
	        			_this.showtime.end=rs.text;	
	        		}else{
	        			Toast({
						  	message: '结束时间不能小于开始时间',
						  	iconClass: 'fa fa-bullhorn'
						});
	        		}
				});
        		
        	}
        },
        mounted(){
        	
        }
    }
</script>

<style scoped="">
 .datearea .content{
 	position: fixed;
    height: 100%;
    width: 100%;
    background-color: #FFFFFF;
    top: 0;
    z-index: 999;
 }
</style>