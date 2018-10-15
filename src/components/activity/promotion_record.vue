<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
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
				<el-button type="primary" @click="searchListData3()">查询</el-button>
			</div>
		</div>
		<div class="table_record">
			  <el-table
			    :data="examineData3"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="order_sn"
			      label="订单编号">
			    </el-table-column>
			    <el-table-column
			      prop="order_class_name"
			      label="订单类型">
			    </el-table-column>
			    <el-table-column
			      prop="store_name"
			      label="商户名称">
			    </el-table-column>
			    <el-table-column
			      prop="goods_id"
			      label="商品ID">
			    </el-table-column>
			    <el-table-column
			      prop="goods_name"
			      label="商品名称"
			      width="400">
			    </el-table-column>
			    <el-table-column
			      prop="consignee"
			      label="收货人">
			    </el-table-column>
			    <el-table-column
			      prop="goods_price"
			      label="单买价格">
			    </el-table-column>
			    <el-table-column
			      prop="goods_num"
			      label="购买数量">
			    </el-table-column>
			    <el-table-column
			      prop="order_amount"
			      label="应付金额">
			    </el-table-column>
			    <el-table-column
			      prop="status_name"
			      label="订单状态">
			    </el-table-column>
			    <el-table-column
			      prop="order_service_name"
			      label="售后状态">
			    </el-table-column>
			    <el-table-column
			      prop="shipping_name"
			      label="配送方式">
			    </el-table-column>
			    <el-table-column
			      prop="add_time"
			      label="下单时间">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="100">
			      <template slot-scope="scope">

							<el-button @click="searchDetail(scope.row)">查看</el-button>
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
			},
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
	},
	methods:{
		searchDetail(params){
				this.$router.push({path:"/home/orderManagement/orderList/orderListDetail",query:{order_id:params.order_sn}})
		},
      fetch(val){
        var data = {
        	activity_id:this.activity_id,
					action:this.action,
        	goods_id:this.ruleForm.goods_id,
        	goods_name:this.ruleForm.goods_name,
        	user_nickname:this.ruleForm.user_nickname,
        	order_sn:this.ruleForm.order_sn,
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
