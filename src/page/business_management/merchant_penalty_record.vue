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
					商户惩罚列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>状态</span>
					<div class="width-120">
					  <el-select v-model="statu" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>商户名称</span>
					<div class="width-120">
						<el-input v-model="store_name" placeholder="商户名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>订单号</span>
					<div class="width-120">
						<el-input v-model="order_sn" placeholder="订单号"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchPunishmentList()">查询</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="sp_id"
				      label="记录id">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称">
				    </el-table-column>
				    <el-table-column
				      prop="order_sn"
				      label="订单编号">
				    </el-table-column>
				    <el-table-column
				      prop="order_amount"
				      label="订单应付金额">
				    </el-table-column>
				    <el-table-column
				      prop="sp_penal_sum"
				      label="惩罚金额">
				    </el-table-column>
				    <el-table-column
				      prop="reason"
				      label="惩罚理由">
				    </el-table-column>
				    <el-table-column
				      prop="status_name"
				      label="状态">
				    </el-table-column>
				    <el-table-column
				      prop="admin_name"
				      label="平台处理人员">
				    </el-table-column>
				    <el-table-column
				      prop="datetime"
				      label="处理时间">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="editStatus(scope.row.sp_id)">编辑</el-button>
				        <el-button type="text" size="small" @click="deleteStatus(scope.row.sp_id,scope.$index)">删除</el-button>
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
  title="修改商户惩罚状态"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="warp_dialog">
  	  <el-radio v-model="radio" label="1">已处理</el-radio>
  	  <el-radio v-model="radio" label="2">已撤销</el-radio>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editFun()">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
	import Penalty from '../../js/merchant_penalty_record.js'
import breadcrumb from '../../components/breadcrumb';
 export default {
   data () {
     return {			
		currentPage:1,
		totals:0,
		pageSize:10,
     	order_sn:'',
     	statu:'',
     	store_name:'',//商户名称
     	sp_id:'',//操作id
     	dialogVisible:false,
     	radio:'1',
     	 tableData: [],
     	options:[
     		{
     			value: '',
          		label: '全部'
     		},
     		{
     			value: '1',
          		label: '已处理'
     		},
     		{
     			value: '2',
          		label: '已撤销'
     		}
     	],
		content_title:{
			title1: "商户惩罚列表",
			title2: "",
			path1:'/home/businessManagement/merchantPenaltyRecord',
			path2:''
		}
     }
   },
   created(){
		/* 商户惩罚记录列表  Store/punishmentList  */
		var data = {
			page:'1',
			rows:'10'
		}
		Penalty.punishmentList("Store/punishmentList",data,this)
   },
   components: {
		breadcrumb
   },
   methods:{
	      handleCurrentChange(val) {
				var data = {
					page:val,
					rows:this.pageSize,
				store_name:this.store_name,
				order_sn:this.order_sn,
				status:this.statu,
				}
				Penalty.punishmentList("Store/punishmentList",data,this)
	      },
   		deleteStatus(id,index){
   			/* 删除惩罚记录状态  */
   			        this.$confirm('您确定要删除么, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			   			var data = {
			   				id:id
			   			}
			   			Penalty.delPunishment("Store/delPunishment",data,this,index);
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });          
			        });
   		},
   		searchPunishmentList(){
   			/* 查询惩罚记录状态  */
			var data = {
				page:'1',
				rows:'10',
				store_name:this.store_name,
				order_sn:this.order_sn,
				status:this.statu,
			}
			Penalty.punishmentList("Store/punishmentList",data,this)
   		},
	   	editFun(){
	   		/* 修改惩罚记录状态  */
	   		var data = {
	   			id:this.sp_id,
	   			status:this.radio
	   		}
	   		Penalty.changePunishmentStatus("Store/changePunishmentStatus",data,this)
	   	},
		editStatus(id){
			/*   */
			this.sp_id = id;
			this.dialogVisible = true;
		}
   }
 }
</script>
