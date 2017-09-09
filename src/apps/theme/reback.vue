<template>
	<div class="cnt animations " style="margin: 0;" >
		<header id="header" class="mui-bar mui-bar-nav "  >
			<span class="head-span   mui-pull-left" @click="toclose"  style="font-size: 18px;"> <i class="fa fa-close "></i></span>
			<h1 class="mui-title"  >信息分享</h1>
			<span class="head-span mui-pull-right icolor" @click="save">回复</span>
		</header>	
		<div class="cnt-content animations" >
			<div class="info">
				<textarea   rows="6" cols="" placeholder="你想说的话~~" v-model="info.lcontent">
					
				</textarea>
			</div>
			<upload v-if="type==1" :type="3" :allow="'jpg,png,gif,mp4,mov,flv'" :max="3"  :maxSize="9" :filename="'fileList'" 
						:resultdata="'result'" :showimg="'imgs'" :baseUrl="baseUrl" 	:url="uploadurl" @success="success"></upload>		
			<upload v-if="type==2" :type="1" :allow="'jpg,png,gif'" :max="3"  :maxSize="9" :filename="'fileList'" 
						:resultdata="'result'" :showimg="'imgs'" :baseUrl="baseUrl" 	:url="imgurl" @success="success"></upload>
			 
		</div>
	</div>
</template>

<script>
	import SY from 'sy'
	import {mapGetters} from 'vuex';
	import upload from './../../components/upload.vue'
	import mui from './../../assets/js/mui.min.js'
	export default {
		props:[
			"type"
        ],
		data() { 
			return {
				uploadurl:SY.util.getUrl()+"/apis/upload/upload",
				imgurl:SY.util.getUrl()+"/apis/upload/updtheme",
				baseUrl:SY.util.getUrl(),
				info:{
					lcontent:''
				}
			}
		},
		computed: {
	      ...mapGetters(['publish'])
	    },
		components:{upload},
		methods:{
			toclose(){
				this.$emit("close");
			},
			save(){
				this.$emit("save",this.info);
			},
			success(item){
				var i =this.info.lcontent;
				this.info=item;
				this.info.lcontent=i;
			}
		},
		mounted(){
		}
	}
</script>
<style  >
</style>

 