<template>
	<div class="theme" >
		<div class="showinfo" v-if="type==1">
			<span class="emptybtn" @click="changest">{{showinfo}}</span>
		</div>
		<transition name="slide-bottom">
		<div class="themecnt animations" :class="{'fixed':type==1}" v-show="state">
			<div class="mui-input-row mui-search mui-active">
				<input type="search" v-model="search" class="mui-input-clear" placeholder="搜索话题" @search="searchs">
			</div>
			<div class="mui-content mui-row mui-fullscreen" :style="{height: srcollHeight+'px'}">
				<div class="mui-col-xs-2">
					<div id="segmentedControls"   class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical">
						<a @tap="choice(index)" @click="choice(index)" :href="'#content'+item.id" class="mui-control-item click" v-for="(item,index) in topList">{{item.tname}}</a>
					</div>
				</div>
				<div id="segmentedControlContents" class="mui-col-xs-10" style="border-left: 1px solid #c8c7cc;">
					<div v-for="(item,index) in topList" :id="'content'+item.id" class="mui-control-content">
						<themelist :type="type" :topid="item.id"  @choise="itemgo" v-if="tindex==index"></themelist>
					</div>
					  
				</div>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
	import themelist from './themeList.vue'
	import SY from 'sy'
	export default {
    	props:[
            "type",//1 创建帖子的时候选择标签    2发现界面   所有的标签   3我的关注界面  //区分点击事件的不同，获取子标签  type不一样
            'imgList',//用来接受的地址列表
            'tname'
        ],
        data () {
            return {
            	state:true,
            	topList:[],
            	tindex:0,
            	srcollHeight:'',
            	search:'',
            	showinfo:'选择标签'
            }
        },
        computed: {
        	 
        },
        components:{themelist },
        methods: {
        	searchs(){//搜索
        		//alert(this.search);
        		this.themeInit(true);
        	},
        	init(){
        		if(this.tname!=''){
        			this.showinfo=this.tname;
        		}
        		if(this.type==1){
        			this.state=false;
        		}
        		this.themeInit();
        	},
        	choice(its){
        		this.tindex=its;
        	},
        	itemgo(it){//点击了具体的标签触发事件    
        		if(this.type==1){
        			this.showinfo=it.tname;
        			this.state=false;
        			this.$emit("choise",it);
        		}else{
        			this.$emit("choise",it);
        		}
        		
        	},
        	firstInit(){
        		var controls = document.getElementById("segmentedControls");
				var contents = document.getElementById("segmentedControlContents");
        		controls.querySelector('.mui-control-item').classList.add('mui-active');
				contents.querySelector('.mui-control-content').classList.add('mui-active');
				 
        	},
        	themeInit(state){
        		var _this =this ;
        		SY.net.getJSON("/api/theme/getTops",  {type:this.type,search:this.search} , res => {
		        	this.topList=res.data;
		        	if(state==null){
		        		setTimeout(function(){
					    	_this.firstInit();	
					    },1000);	
		        	}
			    }, res => {
					mui.toast(SY.code.timeout);			   
			    });
			   
			    
        	},
        	changest(){
        		this.state=true;
        	}
        },
        beforeMount(){
        	
        },
        mounted(){
        	if(this.type=='2'){
        		this.srcollHeight=window.bodyHeight -35 -50;	
        	}else{
        		this.srcollHeight=window.bodyHeight -45 ;
        	}
        	this.init();
        },
        destroyed(){
        }
    }
</script>

<style scoped="">
input[type=search]{
	background: #FFFFFF;
}
.mui-control-item{
 	width: 100%;
 	border-bottom: none!important;
}
.mui-fullscreen >div{
 	height: 100%;
 	overflow: scroll;
}
.mui-segmented-control{
 	background: #efeff4;
}
.mui-segmented-control .mui-control-item.mui-active{
	background: #FFFFFF; 	
}
.mui-fullscreen{
	top: auto;	
	border-top: 1px solid #D1D1D1;
	line-height: normal;
}
</style>