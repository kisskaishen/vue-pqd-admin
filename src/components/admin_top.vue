<template>
	<div class="admin_top">
		<div class="admin_top_content">
			<div class="admin_top_left">
				<img class="logo" src="../images/logo/logo.png" alt="" />
			</div>
			<div class="admin_top_right">
				<ul class="admin_top_right_items">
					<!--<li @click="gotoStore()"><i class="el-icon-warning"></i>客服系统</li>
					<li><i class="el-icon-warning"></i>清除缓存</li>-->
					<li><i class="el-icon-warning"></i><el-button v-popover:popover2>欢迎：{{adminName}}</el-button></li>
				</ul>
			</div>
		</div>
		<el-popover
		  ref="popover2"
		  placement="bottom"
		  width="40"
		  trigger="click">
		  <el-button @click="goOut()">退出</el-button>
		</el-popover>
	</div>
</template>

<style lang="less" scoped>
	@import "../less/config.less";
	.admin_top{

		.admin_top_content{
		background:#f39c12;
			overflow:hidden;
			.admin_top_left{
				width:230px;
				float:left;
				img.logo{
					margin:2px auto;
					width:115px;
					height:45px;
					display:block;
				}
			}
			.admin_top_right{
				float:right;
				.admin_top_right_items{
					line-height: 50px;
					overflow: hidden;
					li{
						float:left;
						padding:0 20px;
						color:#fff;
						cursor: pointer;
						i{
							margin-right:10px;
						}
					}
				}
			}
		}
	}
</style>

<script>
	import Login from '../js/login.js';
	export default {
		data() {
			return {

			}
		},
		created() {
				this.adminName = localStorage.getItem("adminName");
		},
		components: {

		},
		methods: {
			gotoStore(){
				window.location.href = "http://localhost:8089";
			},
			goOut(){
				Login.logout("passport/logout",this);
			}
		}
	}
</script>