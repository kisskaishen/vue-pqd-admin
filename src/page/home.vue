<template>
 <div class="pinquduo_admin">
	<div class="home">
		<div class="admin_top">
			<admin-top></admin-top>
		</div>
		<div class="admin_content">
			<div class="admin_left">
					<admin-left-menu></admin-left-menu>
			</div>
			<div class="admin_right">
				<div class="scroll_style">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
 </div>
</template>
<style lang="less" scoped>
@import "../less/home.less";
</style>
<script>
	import adminTop from '../components/admin_top';
	import adminLeftMenu from '../components/admin_left_menu';
 export default {
   data () {
     return {

     }
   },
   created(){

   },
   components: {
		adminTop,adminLeftMenu
   },
   methods:{

   }
 }
</script>
















