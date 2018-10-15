<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
</style>
<template>
 <div class="business_listings">
	<breadcrumb :content="content_title"></breadcrumb>
	<div class="container">
		<div class="search_admin_list_table">
			<div class="search_admin_list_table_title">
				<span>
					插件列表
				</span>
			</div>
			<div class="table_list">
				  <el-tabs v-model="activeName" @tab-click="handleClick">
				    <el-tab-pane label="支付插件" name="first">支付插件</el-tab-pane>
				    <el-tab-pane label="登陆插件" name="second">登陆插件</el-tab-pane>
				    <el-tab-pane label="物流插件" name="third">物流插件</el-tab-pane>
				    <el-tab-pane label="功能插件" name="fourth">功能插件</el-tab-pane>
				    <el-tab-pane label="云插件" name="five">云插件</el-tab-pane>
				  </el-tabs>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
 export default {
   data () {
     return {
     	activeName: 'second',
     	 tableData: [{
          id: '19724',
          name: '旺旺鞋铺',
        }, {
          id: '19724',
          name: '旺旺鞋铺',
        }, {
          id: '19724',
          name: '旺旺鞋铺',
        }, {
          id: '19724',
          name: '旺旺鞋铺',
        }],
     	input:'',
     	value:'',
     	options:[
     		{
     			value: '0',
          		label: '状态'
     		},
     		{
     			value: '1',
          		label: '停业'
     		},
     		{
     			value: '-1',
          		label: '营业'
     		}
     	],
		content_title:{
			title1:"工具管理",
			title2:"插件列表"
		}
     }
   },
   created(){

   },
   components: {
breadcrumb
   },
   methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
   }
 }
</script>
