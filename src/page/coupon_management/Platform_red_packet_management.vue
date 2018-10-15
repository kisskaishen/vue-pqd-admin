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
					红包列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>红包名称</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="红包名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary">查询</el-button>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="entryDetail('4556')">添加红包</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="id"
				      label="优惠券名称">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="面额">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="使用条件">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="红包状态">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="发放总数">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="创建日期">
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
			title2:"红包列表"
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
			this.$router.push({name:'Platform_red_packet_management_detail',query:{id:id}})
		},
   }
 }
</script>
