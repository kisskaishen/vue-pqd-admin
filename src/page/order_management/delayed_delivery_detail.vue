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
					延迟发货订单列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>订单编号</span>
					<div class="width-120">
						<el-input v-model="form.order_sn" placeholder="订单编号"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>订单类型</span>
					<div class="width-120">
					  <el-select v-model="form.order_class" placeholder="全部">
					    <el-option
					      v-for="item in orderstatus"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>收货人</span>
					<div class="width-120">
						<el-input v-model="form.consignee" placeholder="订单类型"></el-input>
					</div>
				</div>
				<div class="search_content">
					<picker :sTime="sTime" :eTime="eTime" :title="titleLabel" @onPassByVal='getTimes'></picker>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchListData()">查询</el-button>
				</div>
			</div>
			<div class="order_detail_table" style="margin:0 20px;">
						<div class="current_system">
							<div class="warp">
								<!--<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>订单编号：</td>
											<td style="width:100px">订单类型：</td>
											<td>商户名称：</td>
											<td>商品ID：</td>
											<td>商品名称：</td>
											<td>收货人：</td>
											<td>单买价格：</td>
											<td>购买数量：</td>
											<td>应付金额：</td>
											<td>订单状态：</td>
											<td>售后状态：</td>
											<td>下单时间：</td>
											<td>成团时间：</td>
										</tr>
										<tr v-for="item in tableData">
											<td>
												{{item.order_sn}}
											</td>
											<td>
												{{item.order_class_name}}
											</td>
											<td>
												{{item.store_name}}
											</td>
											<td>
												{{item.goodslist[0].goods_id}}
											</td>
											<td>
												{{item.goodslist[0].goods_name}}
											</td>
											<td>
												{{item.consignee}}
											</td>
											<td>
												{{item.goodslist[0].goods_price}}
											</td>
											<td>
												{{item.goodslist[0].goods_num}}
											</td>
											<td>
												{{item.order_amount}}
											</td>
											<td>
												{{item.order_status_name}}
											</td>
											<td>
												{{item.order_service_name}}
											</td>
											<td>
												{{item.add_time}}
											</td>
											<td>
												{{item.add_time}}
											</td>
										</tr>
									</tbody>
								</table>-->
							  <el-table
							    :data="tableData"
							    border
							    style="width: 100%">
							    <el-table-column
							      prop="order_sn"
							      label="订单编号"
							      width="170">
							    </el-table-column>
							    <el-table-column
							      prop="order_class_name"
							      label="订单类型"
							      width="100">
							    </el-table-column>
							    <el-table-column
							      prop="store_name"
							      label="商户名称"
							      width="180">
							    </el-table-column>
							    <el-table-column
							      label="商品ID"
							      width="100">
							      <template slot-scope="scope">
							        <div v-for="child in scope.row.goodslist">
							        	{{child.goods_id}}
							        </div>
							      </template>
							    </el-table-column>
							    <el-table-column
							      label="商品名称"
							      width="300">
							      <template slot-scope="scope">
							        <div v-for="child in scope.row.goodslist">
							        	{{child.goods_name}}
							        </div>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="consignee"
							      label="收货人"
							      width="120">
							    </el-table-column>
							    <el-table-column
							      prop="order_amount"
							      label="单买价格"
							      width="120">
							      <template slot-scope="scope">
							        <div v-for="child in scope.row.goodslist">
							        	{{child.goods_price}}
							        </div>
							      </template>
							    </el-table-column>
							    <el-table-column
							      label="购买数量"
							      width="100">
							      <template slot-scope="scope">
							        <div v-for="child in scope.row.goodslist">
							        	{{child.goods_num}}
							        </div>
							      </template>
							    </el-table-column>
							    <el-table-column
							      prop="order_amount"
							      label="应付金额"
							      width="100">
							    </el-table-column>
							    <el-table-column
							      prop="order_status_name"
							      label="订单状态"
							      width="160">
							    </el-table-column>
							    <el-table-column
							      prop="order_service_name"
							      label="售后状态"
							      width="120">
							    </el-table-column>
							    <el-table-column
							      prop="add_time"
							      label="下单时间"
							      width="160">
							    </el-table-column>
							    <el-table-column
							      prop="add_time"
							      label="成团时间"
							      width="160">
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
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';
import Delayed from '../../js/delayed_delivery.js';
export default{
	data(){
		return {
			add_time_map:"",
			sTime:'',
			eTime:'',
     		titleLabel:'下单时间 ',
			orderstatus:[],
			day:'',
			store_id:'',
			currentPage:1,
			pageSize:10,
			totals:0,
			tableData:[],
			form:{
				consignee:'',
				order_sn:'',
				order_class:'',
			},
			content_title:{
				title1:"延迟发货订单",
				title2:"",
				path1:'/home/orderManagement/delayedDelivery',
				path2:''
			},
		}
	},
	created(){
		this.store_id = this.$route.query.store_id;
		this.day = this.$route.query.days;
		Delayed.orderClass("order/orderClass",this)
		this.fetch(1);
	},
	methods:{
		fetch(val){
			var data = {
				page:val,
				rows:this.pageSize,
				store_id:this.store_id,
				day:this.day,
				consignee:this.form.consignee,
				order_sn:this.form.order_sn,
				add_time_map:this.add_time_map,
				order_class:this.form.order_class,
			}
			Delayed.storeList("order/storeList",data,this)
		},   	
		getTimes(msg){
	   		if(msg!=undefined){
		   		if(msg[0]!='NaN-0NaN-0NaN'){
		   			this.add_time_map = msg[0]+'/'+msg[1];
		        }else{
		   			this.add_time_map = '';
		        }
	        }else{
	   			this.add_time_map = '';
	        }
	   	},
		searchListData(){
			this.fetch(1);
		},
		handleCurrentChange(val){
			this.fetch(val);
		}
	},
   components: {
		breadcrumb,picker
   },
}
</script>

<style>
</style>