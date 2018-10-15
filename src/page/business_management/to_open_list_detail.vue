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
					保证金详情
				</span>
			</div>
			<div class="table_list">
				<div class="current_system">
					<div class="warp">
						<table class="show_list_table_info" border="0" cellspacing="" cellpadding="">
							<tbody>
								<tr>
									<td>保证金额：</td>
									<td>
										<div class="width-120-warp">
											<div class="width-120">
												<el-input v-model="margin" placeholder="请输入内容"></el-input>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>支付宝账号：</td>
									<td>
										<div class="width-120-warp">
											<div class="width-120">
												<el-input v-model="buyer_email" placeholder="请输入内容"></el-input>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>支付宝流水号：</td>
									<td>
										<div class="width-120-warp">
											<div class="width-120">
												<el-input v-model="trade_no" placeholder="请输入内容"></el-input>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>支付时间：</td>
									<td>
										<div class="width-120-warp">
											<!--<div class="width-120">-->
												    <el-date-picker
												    	style="width:200px"
												      v-model="notify_time"
												      type="datetime"
												      value-format = "yyyy-MM-dd HH:mm:ss"
												      placeholder="选择日期时间">
												    </el-date-picker>
												<!--<el-input v-model="notify_time" placeholder="请输入内容"></el-input>-->
											<!--</div>-->
											<span>格式：2017-XX-XX XX:XX</span>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="height-32">
											<el-button type="danger" @click="openUp()">保存</el-button>
										</div>
									</td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import Store from '../../js/business_listings';
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';
 export default {
   data () {
     return {
     	store_id:'',
     	notify_time:'',
     	trade_no:'',
     	margin:'',
     	buyer_email:'',
     	textarea:'',
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
			title1:"商户管理",
			title2:"站内信列表"
		}
     }
   },
   created(){
   	this.store_id = this.$route.query.store_id;

   },
   components: {
breadcrumb
   },
   methods:{
		openUp(){
			var data = {
				id:this.store_id,
				notify_time:this.notify_time,
				trade_no:this.trade_no,
				margin:this.margin,
				buyer_email:this.buyer_email,
			}
			Store.editOpenInfo("Store/editOpenInfo",data,this);
		}
   }
 }
</script>
