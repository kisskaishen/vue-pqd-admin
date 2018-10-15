<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
@import "../../less/marketing";
</style>
<template>
	<div>
		<div class="search_btn">
			<div class="search_content">
				<span>商品ID</span>
				<div class="width-120">
					<el-input v-model="ruleForm.goods_id" placeholder="商品ID"></el-input>
				</div>
			</div>
			<div class="search_content">
				<span>商品名称</span>
				<div class="width-120">
					<el-input v-model="ruleForm.goods_name" placeholder="商品名称"></el-input>
				</div>
			</div>
			<div class="search_content">
				<span>订单号</span>
				<div class="width-120">
					<el-input v-model="ruleForm.order_sn" placeholder="订单号"></el-input>
				</div>
			</div>
			<div class="search_content">
				<span>砍价状态</span>
				<div class="width-120">
			      <el-select v-model="ruleForm.active_status" placeholder="请选择">
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
				<el-button type="primary" @click="searchListData3()">查询</el-button>
			</div>
		</div>
		<div class="table_record">
			  <el-table
			    :data="examineData3"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="id"
			      label="砍价ID"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      prop="goods_id"
			      label="商品ID"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      prop="goods_name"
			      label="商品名称"
			      width="280">
			    </el-table-column>
			    <el-table-column
			      prop="user_id"
			      label="用户ID"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      prop="user_nickname"
			      label="用户昵称"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="spec_num"
			      label="砍价商品数量"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="spec_key"
			      label="规格key"
			      width="160">
			    </el-table-column>
			    <el-table-column
			      prop="active_people_num"
			      label="砍价人数"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      prop="price"
			      label="砍价初始价(元)"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="add_time"
			      label="开始时间"
			      width="160">
			    </el-table-column>
			    <el-table-column
			      prop="end_time"
			      label="截止时间"
			      width="160">
			    </el-table-column>
			    <el-table-column
			      prop="surplus_time"
			      label="剩余时间"
			      width="160">
			    </el-table-column>
			    <el-table-column
			      prop="bargain_price"
			      label="砍价剩余价格(元)"
			      width="140">
			    </el-table-column>
			    <el-table-column
			      prop="prosess"
			      label="砍价状态"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="100">
			      <template slot-scope="scope">
			        <el-button @click="entryDetail(scope.row)">订单详情</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
	        <div class="pagination" v-show="examineData3.length!=0">
	            <el-pagination
	                @current-change="handleCurrentChange3"
	                :current-page="currentPage"
	                :page-size='pageSize'
	                layout="total, prev, pager, next, jumper"
	                :total='total3'>
	            </el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import Market from '../../js/resource_activity';
export default{
	data(){
		return{
			examineData3:[],
			total3:0,
	     	pageSize:10,
	     	currentPage:1,
			ruleForm:{
				goods_id:'',
				goods_name:'',
				order_sn:'',
				order_sn:'',
				status:'',
				active_status:''
			},
			options:[],
			selectedOptions1:'',
			options1:'',
			activity_id:'',
			action:'',
		}
	},
	created(){
		this.activity_id = this.$route.query.activity_id;
		this.action = this.$route.query.action;
		this.fetch();
		var data = {
			action:this.action
		}
		Market.adminGetSearch('Activities/adminGetSearch',data,this);
	},
	methods:{
		entryDetail(params){
				this.$router.push({path:'/home/marketing/down_record_detail',query:{id:params.id,action:this.action}})
		},
      fetch(val){
        var data = {
        	activity_id:this.activity_id,
					action:this.action,
        	goods_id:this.ruleForm.goods_id,
        	goods_name:this.ruleForm.goods_name,
        	user_nickname:this.ruleForm.user_nickname,
        	order_sn:this.ruleForm.order_sn,
					active_status:this.ruleForm.active_status,
        	page:val?val:this.currentPage,
        	rows:this.pageSize,
        }
        Market.userHelpList('Activities/userRecords',data,this);
      },
		searchListData3(){
			this.fetch()
		},
		handleCurrentChange3(val){
			this.fetch(val)
		}
	},
	props:[

	]
}
</script>
