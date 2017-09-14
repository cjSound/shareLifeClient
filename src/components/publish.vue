<template>
	<div class="publish">
		<i class="fa fa-edit" @click="showpublish"></i>
		<transition name="slide-bottom">
			<div class="cnt animations " v-if="state||publish.state">
				<header id="header" class="mui-bar mui-bar-nav " v-if="state||publish.state">
					<span class="   mui-pull-left" @click="toclose"> <i class="fa fa-close "></i></span>
					<span class="mui-pull-right" @click="save">发表</span>
				</header>	
				<div class="cnt-content animations" >
					<div class="info">
						<textarea   rows="6" cols="" placeholder="你想说的话~~" v-model="info.lcontent">
							
						</textarea>
					</div>
					<theme :type="1" @choise="choise" :tname="transname"></theme>
					<upload :type="1" :allow="'jpg,png,gif'" :max="9" :maxSize="9" :filename="'fileList'" 
							:resultdata="'result'" :baseUrl="baseUrl" :imgList="imgList"	:url="uploadurl" @success="success"></upload>
					<upload :type="2" :allow="'mp4,mov,flv'" :max="120" :maxSize="9" :filename="'fileList'" 
							:resultdata="'result'" :showimg="'imgs'" :baseUrl="baseUrl" :imgList="vidList"	:url="videodurl" @success="success"></upload>
				</div>
			</div>
		</transition>
		
		<transition name="slide-bottom">
			<!--没有登录   直接调用登录组件-->
			<div class="animations fixed" v-if="haslogin">
				<login  @success="haslogin=false" :module="true"></login>
			</div>
		</transition>
	</div>
</template>

<script>
	import SY from 'sy'
	import {mapGetters} from 'vuex';
	import mui from './../assets/js/mui.min.js'
	import theme from './../apps/commom/theme.vue'
	import upload from './upload.vue'
	import login from './login.vue'
	export default {
		data() { 
			return {
				haslogin:false,
				state:false,
				transname:'',
				uploadurl:SY.util.getUrl()+"/apis/upload/updtheme",
				baseUrl:SY.util.getUrl(),
				videodurl:SY.util.getUrl()+"/apis/upload/updthemevideo",
				imgList:[],
				vidList:[],
				info:{
					themeid:'',
					topid:'',
					imgs:'',
					videos:'',
					lcontent:''
				}
			}
		},
		computed: {
	      ...mapGetters(['publish'])
	    },
		components:{theme ,upload,login},
		methods:{
			init(){
				//监听 首页其他的地方， 没有发布动态，直接通过触发全局事件来触发修改相关默认值
				this.$root.$on("publishInit",msg=>{
					//this.$emit("init");
					this.info.themeid=this.publish.themeid;
					this.info.topid=this.publish.topid;
					this.transname =this.publish.tname;
				});
			},
			showpublish(){
				var user =SY.User.getUser();
				this.$emit("init");
				if(user !=null){
					this.state=true;
				}else{
					this.haslogin=true;
				}
				
			},
			toclose(){
				var btnArray = ['否', '是'];
				var _this =this ;
				this.$root.$emit("closeTheme");
				mui.confirm('关闭不会保存已编辑的信息，确定吗？', '确认关闭', btnArray, function(e) {
					if (e.index == 1) {
						_this.close();
					}  
				})
			},
			close(){
				this.state=false;
				SY.util.clearObj(this.info);
				this.imgList=[];
				this.vidList=[];
				var publish={topid:'',themeid:'',tname:'',state:false};
				this.transname='';
				this.$store.commit("setPublish", publish);
				this.$emit("close")
			},
			save(){
				if(this.info.lcontent.length<14){
					mui.toast("冷静，再想想吧，凑个14个字撒");	
				}else if(this.imgList.length==0&&this.vidList.length==0){
					mui.toast("请上传要分享的图片或者视频吧");
				}else if(this.info.themeid==''){
					mui.toast("选择一个分享类别撒");
				}else{
					for(var i=0 ;i<this.imgList.length;i++){
						this.info.imgs+=this.imgList[i]+"-";
					}
					for(var i =0;i<this.vidList.length;i++){
						this.info.videos+=this.vidList[i]+"-";
					}
					this.$root.$emit("closeTheme");
					this.info.imgs=this.info.imgs==''?'':this.info.imgs.substring(0,this.info.imgs.length-1);
					this.info.videos=this.info.videos==''?'':this.info.videos.substring(0,this.info.videos.length-1);
					SY.net.getJSON("/api/share/save",  this.info , res => {
        				mui.toast("发布成功啦");
        				var info =SY.localstorage.get("info");
        				if(this.imgList.length>0){
        					var themes =info.themes;
	        				themes.push(this.info.themeid);
	        				info.themes=SY.util.ArrayUnique(themes);
        				}else if(this.vidList.length>0){
        					var themes =info.videos;
	        				themes.push(this.info.themeid);
	        				info.videos=SY.util.ArrayUnique(themes);
        				}
        				SY.localstorage.put("info",info);
        				this.close();
				    }, res => {
						mui.toast("网络有点小问题哦");
				    });	
				}
			},
			choise(item){
				this.info.themeid=item.id;
				this.info.topid=item.topid;
			},
			success(item){
				console.log(item);
			}
		},
		mounted(){
			this.init();
		}
	}
</script>
<style  >
.cnt{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 999;
}
.cnt-content{
	padding: 0 10px;
}
.info textarea{
	margin: 0;
	border: none;
	padding: 10px 0;
}
</style>

 