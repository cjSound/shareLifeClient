<template>
	<div class="click" :class="{'dim':state}" @click="toshare"> 
		<div class="shareinfo click" >
			<span class="click" @click="toshow" v-if="item.toName!=null" style="padding-right: 10px;">回复：<span class="icolor">{{item.toName}}</span> </span>
			<span class="click" @click="toshow">{{item.lcontent}}</span>
		</div>
		<div class="imgvideocnt">
			<div class="imgvid" :style="{width:widths,height:heights}" v-for="(ite,index) in item.imgs" v-if="type==1">
				<img class="themeinfoimg" :src="url+'/'+ite" alt=""  data-preview-src="" :data-preview-group="item.id" />
			</div>
			<div class="imgvid" :style="{width:widths,height:heights}" v-for="(ite,index) in item.videos" v-if="type==2">
				<video controls  preload="auto" :poster="imgs[index]"  >
				  <source :src="url+'/'+ite"  type="video/mp4"></source>
				  <p class="vjs-no-js">
				  </p>
			</video>
			</div>
			<div class="imgvid" :style="{width:widths,height:heights}" v-for="(ite,index) in item.imgs" v-if="type==3">
				<img  class="themeinfoimg" :src="url+'/'+ite" alt=""  data-preview-src="" :data-preview-group="roudom+item.id" />
			</div>
			<div class="imgvid" :style="{width:widths,height:heights}" v-for="(ite,index) in item.videos" v-if="type==3">
				<video   controls  preload="auto" :poster="imgs[index]"  >
					  <source :src="url+'/'+ite.info"  type="video/mp4"></source>
					  <p class="vjs-no-js"> 暂时不支持播放</p>
				</video>
			</div>
		</div>
		<p v-if="item.toName!=null &totalk" @click="showtalk" class="icolor click" style="padding-top: 10px;">查看完整会话</p>
	</div>
</template>

<script>
	import SY from 'sy'
	import imgvideo from './imgVideos.vue'
	import mui from './../../assets/js/mui.min.js'
	export default {
    	props:[
    		'type',//type==1  图文  type==2视频  type==3  都显示
    		'item',//sharelife  对象
    		'show',//只是单纯的展示，不要有相关的事件操作
    		'totalk'
        ],
        data () {
            return {
            	url:SY.util.getUrl(),
            	state:true,//判断是否需要模糊处理
            	widths:'',
            	heights:'',
            	imgs:[],
            	roudom:Math.ceil(Math.random(10)*100)+'',
            	imgvideo:[]//展示视频和图片的时候  一起展示了
            }
        },
        components: {imgvideo},
        methods: {  
        	init(){
        		this.judegLook();
        		this.imginit();
        	},
        	showtalk(){
        		this.$router.push({path:'/theme/talkinfo?sid='+this.item.id});
        	},
        	toshare(){
        		if(!this.show){
        			if(this.state){
        				var btnArray = ['否', '是'];
						var _this =this ;
						var  publish={
					  		topid:this.item.topid,
					  		themeid:this.item.themeid,
					  		tname:this.item.themeName,
					  		state:true
					  	}
						mui.confirm('检测到还没有在该主题发过动态，现在立即前往发布吧', '提示', btnArray, function(e) {
							if (e.index == 1) {
								
								_this.$store.commit("setPublish", publish);
								//初始化主题信息
								_this.$root.$emit("publishInit",publish);
							}  
						})
        			} 
        		}
        	},
        	toshow(){
        		this.$emit("cntclick",this.item);
        	},
        	judegLook(){
        		var user =SY.User.getUser();
        		if(user ==null ){
        			return ;
        		}else{
        			var themes ;
        			if(this.type==1){
        				themes=SY.localstorage.get("info").themes;
        			}else{
        				themes=SY.localstorage.get("info").videos;
        			}
        			if(this.item.userid==user.id){
        				this.state=false;
        			}else if(user.defult_share==1){
        				for(var i in themes){
        					if(themes[i]==this.item.themeid){
        						this.state=false;
        						break;
        					}
        				}
        			}
        			if(this.show){
        				this.state=false;
        			}
        		}
        	},
        	imginit(){
        		var lg;
        		/*if(this.type==3){
        			this.getimgs();
        			lg=this.item.imgs.length+this.item.videos.length;
        		}else if(this.type==2){
        			this.getimgs();
        			lg=this.item.videos.length;
        		}else{
        			lg=this.item.imgs.length;
        		}*/
        		//上面的代码呢。哎呀   好可惜  控制一张图  大图 酱紫的
        		lg=3;
        		if(lg==1){
        			this.widths='100%';
        			this.heights='240px';
        		}else if(lg==2){
        			this.widths='50%';
        			this.heights='120px';
        		}else {
        			this.widths='33%';
        			this.heights='80px';
        		}
        		if(this.type==1||this.type==3){
        		 	mui.previewImage();
        		}
        	},
        	getimgs(){
        		for(var i in this.item.videos){
        			this.imgs.push(this.url+"/"+this.item.videos[i].split(".")[0]+".png");
        		}
        	}
        },
        mounted(){
        	this.init();
        }
    }
</script>

<style scoped="">
.shareinfo{
	overflow: hidden;
}
.imgvideocnt{
	width: 100%;
	max-height: 240px;
}
.imgvideocnt{
	overflow: hidden;
	padding: 5px 0;
}
.imgvid{
	float: left;
	padding: 2px;
}
.imgvid img{
	width: 100%;
	height: 100%;
	border-radius: 3px;
}
.mui-slider .mui-slider-group .mui-slider-item .imgvid img{
	border-radius: 4px;
	height: 100%;
	width: 100%;
}
.imgvid video{
	width: 100%;
	height: 100%;
}
</style>