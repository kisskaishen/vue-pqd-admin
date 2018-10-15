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
					商品列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<div class="width-120">
					  <el-select v-model="value" placeholder="全部">
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
					  <el-select v-model="value" placeholder="全部">
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
					  <el-select v-model="value" placeholder="全部">
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
					<span>商户名</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="商户名"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>关键词</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="关键词"></el-input>
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
				      prop="id"
				      label="ID">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="商品名称">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="商户名称">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="分类">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="价格">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="库存">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="上架">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="推荐">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="是否显示">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="排序">
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
			title2:"商品列表"
		}
     }
   },
   created(){

   },
   components: {
breadcrumb
   },
   methods:{

   }
 }
</script>
