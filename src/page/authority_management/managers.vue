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
					管理员列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<el-input v-model="keywords" placeholder="用户名"></el-input>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchListData()">提交</el-button>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="addData()">添加管理员</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="admin_id"
				      label="ID">
				    </el-table-column>
				    <el-table-column
				      prop="user_name"
				      label="用户名">
				    </el-table-column>
				    <el-table-column
				      prop="role_name"
				      label="所属角色">
				    </el-table-column>
				    <el-table-column
				      prop="email"
				      label="Email地址">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="加入时间">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="editDetail(scope.row)">编辑</el-button>
				        <el-button v-show="scope.row.admin_id!=1" type="text" size="small" @click="deleteDetail(scope.row.admin_id,tableData,scope.row)">删除</el-button>
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
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="500px">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	  <!--<el-form-item label="用户名" prop="name">
	    <el-input v-model="ruleForm.user_name"></el-input>
	  </el-form-item>-->
	  <div class="search_btn">
		<div class="search_contents">
			<span>用户名</span>
			<div class="width-120">
				<el-input :maxlength="20" v-model="ruleForm.role_name"></el-input>
			</div>
		</div>
		<div class="search_contents">
			<span>Email地址</span>
			<div class="width-120">
				<el-input :maxlength="40" v-model="ruleForm.email"></el-input>
			</div>
		</div>
		<div class="search_contents">
			<span>登录密码</span>
			<div class="width-120">
				<el-input :maxlength="18" type="password" v-model="ruleForm.password"></el-input>
			</div>
		</div>
		<div class="search_contents">
			<span>所属角色</span>
			<div class="width-120">
			  <el-select @change="selectRoles(ruleForm.role_id)" v-model="ruleForm.role_id" placeholder="">
			    <el-option
			      v-for="item in optionsRoles"
			      :key="item.role_id"
			      :label="item.role_name"
			      :value="item.role_id">
			    </el-option>
			  </el-select>
			</div>
		</div>
	 </div>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addListData()">确 定</el-button>
  </span>
</el-dialog>
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
			title1: "管理员列表",
			title2: "",
			path1:'/home/authority_management/managers',
			path2:''
		}
     }
   },
   created(){
   		var data = {
   			page:this.currentPage,
   			rows:this.pageSize,
   			keywords:this.keywords,
   		}
		Authority.adminList("Admin/adminList",data,this);
   		var opTdata = {
   			page:this.currentPage,
   			rows:this.pageSize,
   		}
   		Authority.getAllRoleList("Admin/getAllRoleList",opTdata,this);
   },
   components: {
breadcrumb
   },
   methods:{
   	selectRoles(val){
   		this.ruleForm.role_id = val;
   	},
   	addListData(){
   		if(this.type){
   			/* 添加  */
	   		var data = {
	   			user_name:this.ruleForm.role_name,
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
	   			role_id:this.ruleForm.role_id
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
   			keywords:this.keywords,
		}
		Authority.adminList("Admin/adminList",data,this);
      }
   }
 }
</script>
