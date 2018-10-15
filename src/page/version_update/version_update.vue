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
					版本更新
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<el-button type="primary" @click="entryDetail('4556')">添加更新信息</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="id"
				      label="版本ID"
				      width="70px">
				    </el-table-column>
				    <el-table-column
				      prop="version"
				      label="版本号"
				      width="70px">
				    </el-table-column>
				    <el-table-column
				      prop="versionname"
				      label="版本名称"
				      width="80px">
				    </el-table-column>
				    <el-table-column
				      prop="file"
				      label="安卓更新的文件"
				      width="400px">
				    </el-table-column>
				    <el-table-column
				      prop="versiondesc"
				      label="版本信息"
				      width="400px">
				    </el-table-column>
				    <el-table-column
				      prop="force_name"
				      label="是否强制更新 "
				      width="100px">
				    </el-table-column>
				    <el-table-column
				      prop="terminal_name"
				      label="显示终端"
				      width="100px">
				    </el-table-column>
				    <el-table-column
				      prop="type_name"
				      label="类型"
				      width="100px">
				    </el-table-column>
				    <el-table-column
				      prop="username"
				      label="创建人">
				    </el-table-column>
				    <el-table-column
				      prop="createtime"
				      label="创建时间">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="deleteRows(scope.row.id,scope.row)">删除</el-button>
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
import Version from '../../js/version_update.js';
 export default {
   data () {
     return {
     	 tableData: [],
     	input:'',
     	value:'',
		currentPage:1,
		totals:0,
		pageSize:10,
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
			title1: "版本更新",
			title2: "",
			path1:'/home/versionUpdate/versionUpdate',
			path2:''
		}
     }
   },
   created(){
		/* 版本列表  Version/list  */
		var data = {
			page:1,
			rows:this.pageSize
		}
		Version.menuList("Version/list",data,this);

   },
   components: {
		breadcrumb
   },
   methods:{
   	deleteRows(id,params){
			var data = {
				id:id
			}
			Version.delVersion("Version/delVersion",data,this,params);
   	},
		entryDetail(id){
			this.$router.push({name:'version_update_detail',query:{id:id}})
		},
	      handleCurrentChange(val) {
			var data = {
				page:val,
				rows:this.pageSize
			}
			Version.menuList("Version/list",data,this);
	      }
   }
 }
</script>
