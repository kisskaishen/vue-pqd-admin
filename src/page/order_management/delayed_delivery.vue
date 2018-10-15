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
					延迟发货店铺列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>商家ID</span>
					<div class="width-120">
						<el-input v-model="form.store_id" placeholder="商家ID"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商户名称</span>
					<div class="width-120">
						<el-input v-model="form.store_name" placeholder="商户名"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchListData()">查询</el-button>
				</div>
			</div>
			<div class="order_detail_table" style="margin:0 20px;">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>商家ID：</td>
											<td>商家名称：</td>
											<td>延迟1天：</td>
											<td>延迟2天：</td>
											<td>延迟3天：</td>
											<td>延迟4天：</td>
											<td>延迟5天及以上：</td>
										</tr>
										<tr v-for="item in tableData">
											<td>
												{{item.store_id}}
											</td>
											<td>
												{{item.store_name}}
											</td>
											<td>
												<router-link :to="{path:'/home/orderManagement/delayedDeliveryDetail',query:{store_id:item.store_id,days:'1'}}">
													{{item.delay_day1}}
												</router-link>单
											</td>
											<td>
												<router-link :to="{path:'/home/orderManagement/delayedDeliveryDetail',query:{store_id:item.store_id,days:'2'}}">
													{{item.delay_day2}}
												</router-link>单
											</td>
											<td>
												<router-link :to="{path:'/home/orderManagement/delayedDeliveryDetail',query:{store_id:item.store_id,days:'3'}}">
													{{item.delay_day3}}
												</router-link>单
											</td>
											<td>
												<router-link :to="{path:'/home/orderManagement/delayedDeliveryDetail',query:{store_id:item.store_id,days:'4'}}">
													{{item.delay_day4}}
												</router-link>单
											</td>
											<td>
												<router-link :to="{path:'/home/orderManagement/delayedDeliveryDetail',query:{store_id:item.store_id,days:'5'}}">
													{{item.delay_day5}}
												</router-link>单
											</td>
										</tr>
									</tbody>
								</table>			       
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
import Delayed from '../../js/delayed_delivery.js';
export default{
	data(){
		return {
			currentPage:1,
			pageSize:10,
			totals:0,
			tableData:[],
			form:{
				store_id:'',
				store_name:''
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
		this.fetch(1);
	},
	methods:{
		fetch(val){
			var data = {
				page:val,
				rows:this.pageSize,
				store_id:this.form.store_id,
				store_name:this.form.store_name,
			}
			Delayed.lastOrder("Order/lastOrder",data,this)
		},
		searchListData(){
			this.fetch(1);
		},
		handleCurrentChange(val){
			this.fetch(val);
		}
	},
   components: {
		breadcrumb
   },
}
</script>

<style>
</style>