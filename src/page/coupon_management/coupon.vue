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
					优惠券列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>优惠券名称</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="优惠券名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>发券商户ID</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="发券商户ID"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>优惠券创建时间</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="发券商户ID"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>优惠券类型</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="优惠券类型"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>优惠券领用状态</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="全部"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary">查询</el-button>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="entryDetail('4556')">添加优惠券</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="id"
				      label="优惠券名称">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="优惠券类型">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="面额">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="使用需满金额">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="发放总数">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="已领取数">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="已使用">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="展现方式">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="优惠券创建日期">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="发放开始日期">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="发放结束日期">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="发放商户">
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
			title1:"优惠券管理",
			title2:"优惠券列表"
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
			this.$router.push({name:'coupon_detail',query:{id:id}})
		},
   }
 }
</script>
