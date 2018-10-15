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
					管理员日志
				</span>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="log_id"
				      label="ID">
				    </el-table-column>
				    <el-table-column
				      prop="user_name"
				      label="角色名称">
				    </el-table-column>
				    <el-table-column
				      prop="log_info"
				      label="描述">
				    </el-table-column>
				    <el-table-column
				      prop="log_ip"
				      label="ip">
				    </el-table-column>
				    <el-table-column
				      prop="log_time"
				      label="操作时间">
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
     	role_id:'',
     	type:true,
     	rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          role_id: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
       	},
     	ruleForm:{},
     	dialogVisible:false,
     	keywords:'',
     	type:0,
     	next_id:'',
     	prev_id:'',
     	currentPage:1,
		totals:0,
		pageSize:10,
     	 tableData: [],
     	input:'',
     	value:'',
     	optionsRoles:[],
		content_title:{
			title1: "管理员日志",
			title2: "",
			path1:'/home/authority_management/administrator_log',
			path2:''
		}
     }
   },
   created(){
   		var data = {
   			page:this.currentPage,
   			rows:this.pageSize,
   		}
		Authority.logList("Admin/logList",data,this);
   },
   components: {
breadcrumb
   },
   methods:{
   	selectRoles(){
   	},
   	addListData(){
   		if(this.type){
   			/* 添加  */
	   		var data = {
	   			user_name:this.ruleForm.user_name,
	   			email:this.ruleForm.email,
	   			password:this.ruleForm.password,
	   			role_id:this.ruleForm.role_id,
	   		}
	   		Authority.addAdmin("Admin/addAdmin",data,this);
   		}else{
   			/* 编辑  */
	   		var data = {
	   			admin_id:this.ruleForm.admin_id,
	   			user_name:this.ruleForm.user_name,
	   			email:this.ruleForm.email,
	   			password:this.ruleForm.password,
	   			role_id:this.ruleForm.role_id,
	   		}
	   		Authority.editAdmin("Admin/editAdmin",data,this);
   		}
   	},
   	editDetail(data){
   		this.type = false;
   		this.ruleForm = data;
   		this.dialogVisible = true;
   	},
   	addData(){
   		this.type = true;
   		this.ruleForm = {};
   		this.dialogVisible = true;
   	},
   	searchListData(){
   		var data = {
   			page:this.currentPage,
   			rows:this.pageSize,
   			keywords:this.keywords,
   		}
		Authority.adminList("Admin/adminList",data,this);
   	},
	deleteDetail(id,tabledata,obj){
		this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
		var data = {
   			admin_id:id
		}
		Authority.deleteAdminList("Admin/delAdmin",data,this,tabledata,obj);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
	},
	handleCurrentChange(val) {
		var data = {
   			page:val,
   			rows:this.pageSize,
		}
		console.log(new Date())
		Authority.logList("Admin/logList",data,this);
      }
   }
 }
</script>
