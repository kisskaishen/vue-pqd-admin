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
					订单详情
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<el-button type="primary">打印订单</el-button>
				</div>
			</div>
			<div class="order_detail_list">
				<div class="item_detail">
					<div class="title">
						<div class="tits">订单信息</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>配送方式：</td>
											<td>  <el-select v-model="value" placeholder="请选择">
											    <el-option
											      v-for="item in options"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
											</td>
											<td>下单时间：</td>
											<td>2018-04-12 18:41</td>
										</tr>
										<tr>
											<td>配送单号：</td>
											<td><el-input v-model="input" placeholder="请输入内容"></el-input></td>
											<td>订单号：</td>
											<td>456456456456456456645</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="item_detail">
					<div class="title">
						<div class="tits">收货信息</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>收货人：</td>
											<td>wangqin</td>
										</tr>
										<tr>
											<td>联系方式：</td>
											<td>wangqin</td>
										</tr>
										<tr>
											<td>地址：</td>
											<td>wangqin</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="item_detail">
					<div class="title">
						<div class="tits">商品信息</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>商品：</td>
											<td>属性：</td>
											<td>购买数量：</td>
											<td>商品单价：</td>
										</tr>
										<tr>
											<td>
												56456
											</td>
											<td>
												56456
											</td>
											<td>
												56456
											</td>
											<td>
												56456
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="height_32_table_bottom">
					<el-button type="danger">确认发货</el-button>
					<el-button type="danger">返回</el-button>
				</div>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
 export default {
   data () {
     return {
     	textarea3:'',
     	 tableData: [{
          id: '19724',
          name: '旺旺鞋铺',
        }, {
          id: '19724',
          name: '旺旺鞋铺',
        }, {
          id: '19724',
          name: '旺旺鞋铺',
        }, {
          id: '19724',
          name: '旺旺鞋铺',
        }],
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
			title2:"订单详情"
		}
     }
   },
   created(){

   },
   components: {
breadcrumb
   },
   methods:{
entryDetail(id){
	this.$router.push({name:'customer_complaint_management_detail',query:{id:id}})
}
   }
 }
</script>
