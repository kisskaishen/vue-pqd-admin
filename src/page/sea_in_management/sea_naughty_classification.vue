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
					商品列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<el-button type="primary" @click="entryDetail('4556')">新增分类</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="id"
				      label="分类ID">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="分类名称">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="是否显示">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="排序">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small">编辑</el-button>
				        <el-button type="text" size="small">删除</el-button>
				      </template>
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
			title1:"优惠券管理",
			title2:"商品列表"
		}
     }
   },
   created(){

   },
   components: {
breadcrumb
   },
   methods:{

		entryDetail(id){
			this.$router.push({name:'sea_naughty_classification_detail',query:{id:id}})
		},
   }
 }
</script>
