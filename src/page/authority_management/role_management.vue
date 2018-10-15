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
					角色管理
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<el-button type="primary" @click="searchListData()">添加角色</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="role_id"
				      label="ID">
				    </el-table-column>
				    <el-table-column
				      prop="role_name"
				      label="角色名称">
				    </el-table-column>
				    <el-table-column
				      prop="role_desc"
				      label="描述">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="editDetail(scope.row.role_id)">编辑</el-button>
				        <el-button type="text" size="small" @click="deleteDetail(scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
				       <div class="pagination">
				        <el-pagination
				          @current-change="handleCurrentChange"
				          :current-page="currentPage"
				          :page-size = 'pageSize'
				          layout="total, prev, pager, next, jumper"
				          :total='totals'>
				        </el-pagination>
				      </div>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import Authority from '../../js/authority_management.js';
 export default {
   data () {
     return {
     	type:0,
     	next_id:'',
     	prev_id:'',
     	currentPage:1,
		totals:0,
		pageSize:10,
     	 tableData: [],
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
			title1: "角色管理",
			title2: "",
			path1:'/home/authority_management/authority_management',
			path2:''
		}
     }
   },
   created(){
		var data = {
			page:this.currentPage,
			rows:this.pageSize
		}
		Authority.getRoleList("Admin/getRoleList",data,this);
   },
   components: {
breadcrumb
   },
   methods:{
   	pagination(id,tit){
		var data = {
			rows:this.pageSize,
			page_index:id,
			page_type:tit
		}
		orderList.orderList("Order/list",data,this);
   	},
   	searchListData(){
		this.$router.push({name:'role_management_detail'})
   	},
		editDetail(id){
			this.$router.push({name:'role_management_detail',query:{role_id:id}})
		},
		deleteDetail(params){
			var data = {
				role_id:params.role_id,
			}
			Authority.delRole("Admin/delRole",data,this,this.tableData,params);
		},
		handleCurrentChange(val) {
		var data = {
			page:val,
			rows:this.pageSize
		}
		Authority.getRoleList("Admin/getRoleList",data,this);
      }
   }
 }
</script>
