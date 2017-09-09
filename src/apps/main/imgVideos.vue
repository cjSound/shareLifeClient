<template>
	<div class="imgvideocnt">
		<div class="imgvid" :style="{width:widths,height:heights}" v-for="(item,index) in datalist" v-if="type==1">
			<img class="themeinfoimg" :src="url+'/'+item" alt=""  data-preview-src="" :data-preview-group="group" />
		</div>
		<div class="imgvid" :style="{width:widths,height:heights}" v-for="(item,index) in datalist" v-if="type==2">
			<video controls  preload="auto" :poster="imgs[index]"  >
			  <source :src="url+'/'+item"  type="video/mp4"></source>
			  <p class="vjs-no-js">
			  </p>
		</video>
		</div>
		<div class="imgvid" :style="{width:widths,height:heights}" v-for="(item,index) in imgvideo" v-if="type==3">
			<img v-if="item.type==1" class="themeinfoimg" :src="url+'/'+item.info" alt=""  data-preview-src="" :data-preview-group="group" />
			<video v-else controls  preload="auto" :poster="item.imgurl"  >
				  <source :src="url+'/'+item.info"  type="video/mp4"></source>
				  <p class="vjs-no-js"> 暂时不支持播放</p>
			</video>
		</div>
	</div>
</template>

<script>
	import SY from 'sy'
	import mui from './../../assets/js/mui.min.js'
	import  './../../assets/js/mui.zoom.js'
	import  './../../assets/js/mui.previewimage.js'
	export default {
    	props:[
    		'datalist',
    		'type',//type==1  图文  type==2视频 type==3  图文 视频 一起展示
    		'group' //  图片的分组信息，预览，放大  视频不需要
        ],
        data () {
            return {
            	url:SY.util.getUrl(),
            	widths:'',
            	heights:'',
            	imgs:[],
            	imgvideo:[]//展示视频和图片的时候  一起展示了
            }
        },
        computed: {
        	 
        },
        methods: {  
        	init(){
        		var lg=this.datalist.length;
        		if(this.type==3){
        			this.imgAndViedo();
        			lg=this.datalist.imgs.length+this.datalist.videos.length;
        		}else{
        			this.getimgs();
        		}
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
        	imgAndViedo(){
        		console.log(this.datalist);
        		for(var i in this.datalist.imgs){
        			this.imgvideo.push({type:'1',info:this.datalist.imgs[i]});
        		}
        		for(var i in this.datalist.videos){
        			var imgurl =this.url+"/"+this.datalist.videos[i].split(".")[0]+".png";
        			this.imgvideo.push({type:'2',imgurl:imgurl,info:this.datalist.videos[i]});
        		}
        	},
        	getimgs(){
        		for(var i in this.datalist){
        			this.imgs.push(this.url+"/"+this.datalist[i].split(".")[0]+".png");
        		}
        	}
        },
        mounted(){
        	this.init();
        },
        components: {
        }
    }
</script>

<style scoped="">
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