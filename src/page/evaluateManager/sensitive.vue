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
					敏感词管理
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>敏感词查询</span>
					<div class="width-120">
						<el-input v-model="form.keyword" placeholder="输入敏感词"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchList()">查询</el-button>
					<el-button type="primary" @click="addList()">添加敏感词</el-button>
				</div>
			</div>
			<div class="table_list" style="width:371px;">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      type="index"
				      width="50"
				      label="序号">
				    </el-table-column>
				    <el-table-column
				      prop="keyword"
				      width="200"
				      label="敏感词">
				    </el-table-column>
				    <el-table-column
				      width="100"
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="deleteRow(scope.row,scope.$index)">删除</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
				  <div class="pagination" v-show="tableData.length!=0">
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
<el-dialog :title="titles" :visible.sync="dialogFormVisible" width="400px">
  <el-form :model="form">
    <el-form-item :label="labels" :label-width="formLabelWidth">
      <el-input placeholder="6个字以内" :maxlength=6 v-model="dialogForm.keyword" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addFun()">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import sensitive from '../../js/sensitive.js';
 export default {
   data () {
     return {
     	titles:'增加敏感词',
     	labels:'输入敏感词',
		formLabelWidth:'100px',
		dialogFormVisible:false,
		dialogForm:{
			keyword:'',
		},
     	form:{
     		keyword:'',
     	},
     	currentPage:1,
		totals:0,
		pageSize:10,
     	 tableData: [],
		content_title:{
			title1: "评价管理",
			title2: "",
			path1:'/home/haitao/sea_good_list',
			path2:''
		}
     }
   },
   created(){
		this.fetch();
   },
   methods:{ 
	   	addList(){
	   		this.dialogFormVisible = true;
	   	},
	   	addFun(){
	   		var data = {
	   			keyword:this.dialogForm.keyword
	   		}
	   		sensitive.addKeyWord("Keywords/addKeyWord",data,this);
	   	},
	   	fetch(val){
	   		var data = {
	   			keyword:this.form.keyword,
	   			page:val?val:this.currentPage,
	   			rows:this.pageSize,
	   		}
	   		sensitive.keywordsList("keywords/list",data,this);
	   	},
	   	deleteRow(params,index){
	   		this.$confirm('此操作将永久删除, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
				var data = {
					kid:params.id
				}
				sensitive.KeywordsDel("Keywords/del",data,this);
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	   	},
	   	searchList(){
			this.fetch();
	   	},
		handleCurrentChange(val) {
			this.fetch(val);
		},
   },
   components: {
		breadcrumb
   },
 }
</script>
