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
					退货单列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>状态</span>
					<div class="width-120">
					  <el-select v-model="value" placeholder="未处理">
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
					<span>订单编号</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="申诉用户"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商户号</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="申诉订单编号"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商户ID</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="申诉状态"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary">查询</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="order_sn"
				      label="订单编号">
				    </el-table-column>
				    <el-table-column
				      prop="goods_name"
				      label="商品名称">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称">
				    </el-table-column>
				    <el-table-column
				      prop="order_service_name"
				      label="类型">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="申请日期">
				    </el-table-column>
				    <el-table-column
				      prop="service_type_name"
				      label="状态">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="entryDetail('456489')">查看</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
				  <div class="pagination">
					<el-row>
					  <el-button @click="pagination(prev_id,'prev')">上一页</el-button>
					  <el-button @click="pagination(next_id,'next')">下一页</el-button>
					 </el-row>
					</div>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import orderList from '../../js/order_list';
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
     	value:'',
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
			title1:"订单管理",
			title2:"退货申请列表"
		}
     }
   },
   created(){
		var data = {
			rows:this.pageSize,
			is_apply:0,
		}
		orderList.serviceList("Order/serviceList",data,this);
   },
   components: {
breadcrumb
   },
   methods:{   	
   	pagination(id,tit){
		var data = {
			rows:this.pageSize,
			page_index:id,
			page_type:tit,
			is_apply:0,
		}
		orderList.serviceList("Order/serviceList",data,this);
   	},
	entryDetail(id){
		this.$router.push({name:'list_of_returns_detail',query:{id:id}})
	},
   }
 }
</script>
