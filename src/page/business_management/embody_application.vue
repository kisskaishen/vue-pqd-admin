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
					提现申请列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<div class="width-120">
					  <el-select v-model="status" placeholder="请选择">
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
						<el-input v-model="key_word" placeholder="商户关键词"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchList()">查询</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="sw_id"
				      label="申请ID">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称">
				    </el-table-column>
				    <el-table-column
				      prop="withdrawal_money"
				      label="提现金额">
				    </el-table-column>
				    <el-table-column
				      prop="withdrawal_type"
				      label="提现方式">
				    </el-table-column>
				    <el-table-column
				      prop="withdrawal_code"
				      label="提现账号">
				    </el-table-column>
				    <el-table-column
				      prop="withdrawal_name"
				      label="账号姓名">
				    </el-table-column>
				    <el-table-column
				      prop="datetime"
				      label="申请时间">
				    </el-table-column>
				    <el-table-column
				      prop="status"
				      label="提现状态">
				    </el-table-column>
				    <el-table-column
				      prop="handletime"
				      label="处理时间">
				    </el-table-column>
				    <el-table-column
				      prop="admin_name"
				      label="处理人">
				    </el-table-column>
				    <el-table-column
				      label="对账单">
				      <template slot-scope="scope">
				      	<!--http://admin.dev-pqd.com/store/downloadStatements?id=7674-->
				      	<a :href="headerCommon+'/store/downloadStatements?store_id='+scope.row.store_id">下载</a>
				        <!--<router-link :to="{path: 'headerCommon+'"'/store/downloadStatements?id='"'+scope.row.sw_id'}">下载</router-link>-->
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="提现记录">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="search(scope.row.store_id)">查看</el-button>
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="editStore(scope.row.sw_id)">编辑</el-button>
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
  title="修改提现申请状态"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="warp_dialog">
  	  <el-radio v-model="radio" label="0">申请中</el-radio>
  	  <el-radio v-model="radio" label="1">同意提现</el-radio>
  	  <el-radio v-model="radio" label="2">拒绝提现</el-radio>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editOperation()">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import Embody from '../../js/embody_application.js';	
import breadcrumb from '../../components/breadcrumb';
 export default {
   data () {
     return {
		currentPage:1,
		totals:0,
		pageSize:10,
     	current_sw_id:'',//申请id
     	status:'',//提现状态
     	key_word:'',//关键词
     	dialogVisible:false,
     	 radio:'0',
     	 tableData: [],
     	options:[
     		{
     			value: '',
          		label: '全部'
     		},
     		{
     			value: '0',
          		label: '申请中'
     		},
     		{
     			value: '1',
          		label: '同意申请'
     		},
     		{
     			value: '2',
          		label: '拒绝申请'
     		}
     	],
		content_title:{
			title1:"商户管理",
			title2:"提现申请列表"
		}
     }
   },
   created(){
		/*  用户提现申请列表  Store/withdrawalsList */
		var data = {
			page:'1',
			rows:'10'
		}
		Embody.withdrawalsList("Store/withdrawalsList",data,this)
   },
   components: {
	breadcrumb
   },
   methods:{
      handleCurrentChange(val) {
			var data = {
				page:val,
				rows:this.pageSize,
				key_word:this.key_word,
				status:this.status
			}
			Embody.withdrawalsList("Store/withdrawalsList",data,this)
      },
	   	editOperation(){
	   		/* 修改用户提现申请记录状态  Store/changeWithdrawalsStatus  */
	   		var data = {
	   			sw_id:this.current_sw_id,
	   			status:this.radio
	   		}
	   		console.log(JSON.stringify(data))
	   		Embody.changeWithdrawalsStatus("Store/changeWithdrawalsStatus",data,this)
	   	},
	   	editStore(id){
	   		this.current_sw_id = id;
	   		this.dialogVisible = true;
	   	},
	   	searchList(){
	   		var data = {
				page:'1',
				rows:'10',
				key_word:this.key_word,
				status:this.status
			}
			Embody.withdrawalsList("Store/withdrawalsList",data,this)
	   	},
		search(id){
			var data = {
				page:'1',
				rows:'10',
				store_id:id,
				key_word:this.key_word,
				status:this.status
			}
			Embody.withdrawalsList("Store/withdrawalsList",data,this)
		}
   }
 }
</script>
