<template>
	<div></div>
</template>

<script>
	import SY from 'sy'
	export default {
		data() {
			return {
			}
		},
		mounted(){
			SY.util.pushUrl({path:"/login"});
		}
	}
</script>

 