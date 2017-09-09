<template>
	<div class="upload">
		<span>
			<!--<i class="fa">图片</i>-->
			<div v-if="type==1">图片</div>
			<div v-if="type==2">视频</div>
			<i v-if="type==3" class="fa fa-file-picture-o icolor"></i>
			<input type="file" :name="filename" multiple="multiple"   @change="change($event)"/>
		</span>
		<ul class="show" v-if="state">
			<li v-for="(item,index) in showList"><img :src="item" alt="" /></li>
		</ul>
	</div>
</template>

<script>
	import  {Indicator}   from 'mint-ui';
	export default {
    	props:[
    		/*允许上传的类型     可同时上传多张*/
            "allow",//例：jpeg,png
            'max',//图片大小允许  单位M
            'maxSize',//图片最多允许上传几张
            'filename',//file  名字  后台接收解析name
            'url',//上传路径
            'resultdata',//返回的图片的地址
            'baseUrl',//返回的基础地址
            'imgList',//用来接受的地址列表
            'type',//1只能传图片  2  只能传视频  3   图片视频都能传    样式外面自定义
			'showimg'            
        ],
        data () {
            return {
            	state:true,
            	showList:[],
            	videomax:100,
            	allowimg:'gif,jpg,jpeg,png,bmp',
            	allowvideo:'swf,flv,mp3,mp4,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb,mov'
            }
        },
        computed: {
        	 
        },
        methods: { 
        	change(even){
        		var emt =even.target;
        		var _this =this ;
        		for(var i =0;i<emt.files.length;i++){
        			if(!this.checkType(emt.files[i])){
        				alert("第"+(i+1)+"处存在格式错误，只允许"+_this.allow);
        				return ;
        			}
        		}
        		for(var i =0;i<emt.files.length;i++){
        		 	var res=this.checkSize(emt.files[i]);
        			if(!res.state){
        				alert("第"+(i+1)+"处"+res.type+"太大，最大只允许"+res.msg);
        				return ;
        			}
        		}
        		if(emt.files.length+_this.showList.length>_this.maxSize){
        			alert("最多允许上传"+_this.maxSize+"个资源");
        			return ;
        		}
        		var xmlhttp_request;
				if(window.XMLHttpRequest) { //非IE
					xmlhttp_request = new XMLHttpRequest();
				} else if(window.ActiveXObject) { //IE
					try {
						xmlhttp_request = new ActiveXObject("Msxml2.HTTP");
					} catch(e) {
						try {
							xmlhttp_request = new ActiveXObject("microsoft.HTTP");
						} catch(e) {
							mui.toast("请升级你的浏览器，以便支持ajax！");
						}
					}
				}
				Indicator.open({
				  text: '上传中...',
				  spinnerType: 'snake'
				});
				var url =this.url;
				var formNode = document.createElement('form');
				formNode.enctype = 'multipart/form-data';
				var formData = new FormData(formNode);
				for(var i =0;i<emt.files.length;i++){
					formData.append('fileList', emt.files[i]);	
				}
				xmlhttp_request.open('POST', url);
				xmlhttp_request.send(formData);
				xmlhttp_request.onload = function(reqs) {
					if(xmlhttp_request.readyState == 4 && xmlhttp_request.status == 200) {
						var data = JSON.parse(xmlhttp_request.response);
						_this.$emit('success', data);
						if(_this.type==1){
							for(var i =0;i<data[_this.resultdata].length;i++){
								var url=_this.baseUrl+"/"+data[_this.resultdata][i];
								_this.showList.push(url);
								if(_this.imgList!=null){
									_this.imgList.push(data[_this.resultdata][i]);	
								}
							}
						}else if(_this.type==2){
							for(var i =0;i<data[_this.resultdata].length;i++){
								var url=_this.baseUrl+"/"+data[_this.showimg][i];
								_this.showList.push(url);
								if(_this.imgList!=null){
									_this.imgList.push(data[_this.resultdata][i]);	
								}
								
							}
							
						}
						
					}
					Indicator.close();
				};
        	},
        	checkType(file){
        		var result =false;
        		var arr =this.allow.split(",");
        		var name =file.name.toLowerCase();
        		for(var i =0;i<arr.length;i++){
        			if(name.indexOf(arr[i])!=-1){
        				result =true;
        				break;
        			}	
        		}
        		return result;
        	},
        	checkSize(file){
        		var res ={};
        		var type =file.name.split(".")[1].toLocaleLowerCase();
        		if(this.allowimg.indexOf(type)!=-1){
        			res.state=file.size / 1024 / 1024 < this.max;
        			res.msg=this.max+"M";
        			res.type="图片";
        		}else if(this.allowvideo.indexOf(type)!=-1){
        			res.state=file.size / 1024 / 1024 < this.videomax;
        			res.msg=this.videomax+"M";
        			res.type="视频";
        		}
        		return res;
        	},
        	init(){
        		if(this.type==3){
        			this.state=false;
        		}
        		if(this.maxSize==''){
        			this.maxSize=2;
        		}else{
        			this.maxSize =parseInt(this.maxSize);
        		}
        		if(this.allow==''){
        			this.allow=this.allowimg;
        		}
        		if(this.filename==''){
        			this.filename='file';
        		}
        	}
        },
        beforeMount(){
        	
        },
        mounted(){
        	this.init();
        },
        destroyed(){
        },
        components: {}
    }
</script>

<style scoped="">
.upload span{
	height: 80px;
    width: 80px;
    display: inline-block;
    position: relative;
    text-align: center;
    border: 1px dotted #d1d1d1;
}
.upload input{
	opacity: 0;
	top:0;
    height: 100%;
    width: 100% !important;
    position: absolute;
    left: 0;
}
.upload div{
	padding-top: 20%;
    font-size: 16px;
    color: #948c8c;
}
.show{
	list-style: none;
	overflow: hidden;
	padding-left: 0;
}
.show li{
	float: left;
	padding-right: 10px;
}
.show li img{
	width: 60px;
	height: 60px;
}
.upload i{
	position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0%;
    font-size: 18px;
}
</style>