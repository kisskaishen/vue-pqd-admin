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
					销售排行
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<el-button type="primary">商户排行</el-button>
				</div>
				<div class="search_content">
					<el-button type="primary">商品排行</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="id"
				      label="销量排行">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="名称">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="销售量">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="销售额">
				    </el-table-column>
				  </el-table>
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
			title1:"报表统计",
			title2:"销售排行"
		}
     }
   },
   created(){

   },
   components: {
breadcrumb
   },
   methods:{

   }
 }
</script>
