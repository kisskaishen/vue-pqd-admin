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
					会员列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<div class="width-120">
					  <el-select v-model="optionsTimeValue" placeholder="注册时间">
					    <el-option
					      v-for="item in optionsTime"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<div class="width-120">
					  <el-select v-model="optionsStatusValue" placeholder="注册方式">
					    <el-option
					      v-for="item in optionsStatus"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>会员数</span>
					<div class="width-120">
						<el-input disabled v-model="totals" placeholder="0"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchListData()">查询</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="user_id"
				      label="ID">
				    </el-table-column>
				    <el-table-column
				      prop="nickname"
				      label="会员昵称">
				    </el-table-column>
				    <el-table-column
				      prop="total_amount"
				      label="累计消费">
				    </el-table-column>
				    <el-table-column
				      prop="oauth"
				      label="注册类型">
				    </el-table-column>
				    <el-table-column
				      prop="reg_time"
				      label="注册日期">
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
import Member from '../../js/member_management.js';
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
     	optionsTimeValue:'',
     	optionsStatusValue:'',
     	optionsStatus:[],
     	optionsTime:[],
		content_title:{
			title1: "会员列表",
			title2: "",
			path1:'/home/member_management/member_management',
			path2:''
		}
     }
   },
   created(){
		var data = {
			rows:this.pageSize,
			page:0,
   			reg_time:this.optionsTimeValue,
   			reg_type:this.optionsStatusValue,
		}
		Member.getMemberList("user/list",data,this);
		Member.getMemberconf("user/conf",this);
   },
   components: {
breadcrumb
   },
   methods:{
   	handleCurrentChange(val){
		var data = {
			rows:this.pageSize,
			page:val,
   			reg_time:this.optionsTimeValue,
   			reg_type:this.optionsStatusValue,
		}
		Member.getMemberList("user/list",data,this);
   	},
   	searchListData(){
   		var data = {
   			reg_time:this.optionsTimeValue,
   			reg_type:this.optionsStatusValue,
   			page:this.currentPage,
   			rows:this.pageSize,
   		}
   		console.log(JSON.stringify(data))
		Member.getMemberList("user/list",data,this);
   	},
   }
 }
</script>
