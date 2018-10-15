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
				<span>助力状态</span>
				<div class="width-120">  
				      <el-select v-model="ruleForm.is_ok" placeholder="请选择">
					    <el-option
					      v-for="item in options3"
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
			      label="助力ID">
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
			      prop="user_id"
			      label="用户ID">
			    </el-table-column>
			    <el-table-column
			      prop="user_nickname"
			      label="用户昵称"
			      width="200">
			    </el-table-column>
			    <el-table-column
			      prop="spec_num"
			      label="助力商品数量"
			      width="200">
			    </el-table-column>
			    <el-table-column
			      prop="spec_key"
			      label="规格key">
			    </el-table-column>
			    <el-table-column
			      prop="limit_reach"
			      label="助力达成人数"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="curent_reach"
			      label="当前助力人数"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="limit_price"
			      label="助力价格">
			    </el-table-column>
			    <el-table-column
			      prop="add_time"
			      label="助力开始时间"
			      width="160">
			    </el-table-column>
			    <el-table-column
			      prop="end_time"
			      label="助力截至时间"
			      width="160">
			    </el-table-column>
			    <el-table-column
			      prop="left_time"
			      label="助力剩余时间"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="prosess"
			      label="助力状态">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="100">
			      <template slot-scope="scope">
			        <a target = "_blank" :href="'/home/orderManagement/orderList/orderListDetail?order_id='+scope.row.order_sn">查看</a>
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
import Market from '../../js/marketing';
export default{
	data(){
		return{
			examineData3:[],
			total3:0,
	     	pageSize:10,
	     	currentPage:1,
	     	options3:[
	     		{
	     			label:"成功",
	     			value:1
	     		},
	     		{
	     			label:"失败",
	     			value:0
	     		},
	     		{
	     			label:"助力中",
	     			value:2
	     		},
	     	],
			ruleForm:{
				goods_id:'',
				goods_name:'',
				order_sn:'',
				is_ok:''
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
      fetch(val){
        var data = {
        	activity_id:this.activity_id,
			action:this.action,
        	goods_id:this.ruleForm.goods_id,
        	goods_name:this.ruleForm.goods_name,
        	user_nickname:this.ruleForm.user_nickname,
        	order_sn:this.ruleForm.order_sn,
        	prosess:this.ruleForm.is_ok,
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