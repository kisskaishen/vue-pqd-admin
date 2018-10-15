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
					订单列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<div class="width-120">
					  <el-select v-model="value" placeholder="支付方式">
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
					<div class="width-120">
					  <el-select v-model="value" placeholder="发货状态">
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
					<span>收件人</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="收件人"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>订单编号</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="订单编号"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>下单日期</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="下单日期"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary">查询</el-button>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="entryDetail('4556')">添加订单</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="id"
				      label="订单编号">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="收货人">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="总金额">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="应付金额">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="发货状态">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="支付方式">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="配送方式">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="下单时间">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small">编辑</el-button>
				        <el-button type="text" size="small">删除</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
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
			title1:"活动管理",
			title2:"订单列表"
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
			this.$router.push({name:'give_me_favor_pay_order_detail',query:{id:id}})
		},
   }
 }
</script>
