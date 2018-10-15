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
					退换货
				</span>
			</div>
			<div class="table_list">
				<div class="current_system">
					<div class="warp">
						<table class="show_list_table" border="0" cellspacing="" cellpadding="">
							<tbody>
								<tr>
									<td>订单编号：</td>
									<td>
										456456456
									</td>
								</tr>
								<tr>
									<td>用户：</td>
									<td>
										发生的发生
									</td>
								</tr>
								<tr>
									<td>申请日期：</td>
									<td>
										发生的发生
									</td>
								</tr>
								<tr>
									<td>商品名称：</td>
									<td>
										发生的发生
									</td>
								</tr>
								<tr>
									<td>退换货：</td>
									<td>
										发生的发生
									</td>
								</tr>
								<tr>
									<td>退换金额：</td>
									<td>
										发生的发生
									</td>
								</tr>
								<tr>
									<td>退货描述：</td>
									<td>
										<el-input
										  type="textarea"
										  :autosize="{ minRows: 2, maxRows: 4}"
										  placeholder="请输入内容"
										  v-model="textarea3">
										</el-input>
									</td>
								</tr>
								<tr>
									<td>买家描述：</td>
									<td>
										<el-input
										  type="textarea"
										  :autosize="{ minRows: 2, maxRows: 4}"
										  placeholder="请输入内容"
										  v-model="textarea3">
										</el-input>
									</td>
								</tr>
								<tr>
									<td>用户上传照片：</td>
									<td>
										发生的发生
									</td>
								</tr>
								<tr>
									<td>状态：</td>
									<td>
										  <el-select v-model="value" placeholder="请选择">
										    <el-option
										      v-for="item in options"
										      :key="item.value"
										      :label="item.label"
										      :value="item.value">
										    </el-option>
										  </el-select>
									</td>
								</tr>
								<tr>
									<td>处理备注：</td>
									<td>
										<el-input
										  type="textarea"
										  :autosize="{ minRows: 2, maxRows: 4}"
										  placeholder="请输入内容"
										  v-model="textarea3">
										</el-input>
									</td>
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
import breadcrumb from '../../components/breadcrumb';
 export default {
   data () {
     return {
     	textarea3:'',
     	value:'',
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
			title2:"退换货列表"
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
	this.$router.push({name:'list_of_returns_detail',query:{id:id}})
}
   }
 }
</script>
