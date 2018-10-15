<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
.warp_dialog{
	margin-bottom:20px;
	overflow:hidden;
	.width_guding{
		width:70px;
		float:left;
		display: inline-block;
	}
	.reason_text{
		float:left;
	}
}
</style>
<template>
 <div class="business_listings">
	<breadcrumb :content="content_title"></breadcrumb>
	<div class="container">
		<div class="search_admin_list_table">
			<div class="search_admin_list_table_title">
				<span>
					虚拟销量记录表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>商品名称</span>
					<div class="width-120">
						<el-input v-model="form.goods_name" placeholder="商品名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商品ID</span>
					<div class="width-120">
						<el-input v-model="form.goods_id" placeholder="商品ID"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>操作人</span>
					<div class="width-120">
						    <el-select v-model="form.operator_id" placeholder="请选择">
						    <el-option
						      v-for="item in optionsSaleOper"
						      :key="item.admin_id"
						      :label="item.user_name"
						      :value="item.admin_id">
						    </el-option>
						  </el-select>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchListData()">查询</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="goods_id"
				      label="商品ID">
				    </el-table-column>
				    <el-table-column
				      prop="goods_name"
				      label="商品名称"
				      width="300px">
				    </el-table-column>
				    <el-table-column
				      prop="type_name"
				      label="增减类型">
				    </el-table-column>
				    <el-table-column
				      prop="sale"
				      label="数量">
				    </el-table-column>
				    <el-table-column
				      prop="desc"
				      label="理由">
				    </el-table-column>
				    <el-table-column
				      prop="operator"
				      label="操作人">
				    </el-table-column>
				  </el-table>
				       <div class="pagination" v-show="totals!=0">
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
</template>

<script>
import Goods from '../../js/list_of_goods.js';
import breadcrumb from '../../components/breadcrumb';
 export default {
   data () {
     return {        
     	form:{
     		goods_name:'',
     		goods_id:'',
     		operator_id:'',
     	},
     	tableData:[],
     	currentPage:1,
     	pageSize:10,
     	totals:0,
     	optionsSaleOper:[],
     	saleOptions2:'',		
		content_title:{
			title1: "销量纪录",
			title2: "",
			path1:'/home/commodityManagement/sale_list',
			path2:''
		}
     }
 	},   
 	components: {
	breadcrumb
   },
 	created(){
 		Goods.operatorList("goods/operatorList",this)
 		var data = {
 			goods_name:this.form.goods_name,
 			goods_id:this.form.goods_id,
 			operator_id:this.form.operator_id,
 			page:this.currentPage,
 			rows:this.pageSize,
 		}
 		Goods.saleList("goods/saleList",data,this);
 	},
 	methods:{
 		searchListData(){
	 		var data = {
	 			goods_name:this.form.goods_name,
	 			goods_id:this.form.goods_id,
	 			operator_id:this.form.operator_id,
	 			page:1,
	 			rows:this.pageSize,
	 		}
 			Goods.saleList("goods/saleList",data,this);
 		},
 		handleCurrentChange(val){
	 		var data = {
	 			goods_name:this.form.goods_name,
	 			goods_id:this.form.goods_id,
	 			operator_id:this.form.operator_id,
	 			page:val,
	 			rows:this.pageSize,
	 		}
 			Goods.saleList("goods/saleList",data,this);
 		}
 	}
}
</script>
