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
					关闭订单记录
				</span>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
			    row-key="order_sn"
				    style="width: 100%">    
				    <el-table-column
				      prop="order_sn"
				      label="订单编号"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="order_class_name"
				      label="订单类型">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="goods_id"
				      label="商品id">
				    </el-table-column>
				    <el-table-column
				      prop="goods_name"
				      label="商品名称" width="400">
				    </el-table-column>
				    <el-table-column
				      prop="consignee"
				      label="收货人">
				    </el-table-column>
				    <el-table-column
				      prop="goods_price"
				      label="单买价格">
				    </el-table-column>
				    <el-table-column
				      prop="goods_num"
				      label="购买数量">
				    </el-table-column>
				    <el-table-column
				      prop="order_amount"
				      label="应付金额">
				    </el-table-column>
				    <el-table-column
				      prop="status_name"
				      label="订单状态"
				      width="260">
				    </el-table-column>
				    <el-table-column
				      prop="order_service_name"
				      label="售后状态"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      prop="shipping_name"
				      label="配送方式"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="下单时间"
				      width="180">
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
import close_brush from '../../js/close_brush';
import breadcrumb from '../../components/breadcrumb';
 export default {
   data () {
     return {        
     	form:{
     		page_type:'',
     	},
     	tableData:[],
     	next_id:'',
     	prev_id:'',
     	type:0,
     	currentPage:1,
     	pageSize:2,
     	totals:0,
     	optionsSaleOper:[],
     	saleOptions2:'',		
		content_title:{
			title1: "关闭订单记录",
			title2: "",
			path1:'/home/closeBrushList',
			path2:''
		}
     }
 	},   
 	components: {
	breadcrumb
   },
 	created(){
   		this.fetch();
 	},
 	methods:{
 		fetch(id,tit){
	   		var data = {
	   			page_type:tit?tit:this.form.page_type,
	   			page_index:id,
	   			rows:this.pageSize,
	   		}
	   		close_brush.getCloseTheOrderList("Order/getCloseTheOrderList",data,this);
 		},
	   	pagination(id,tit){
	   		this.fetch(id,tit);
	   	}
 	}
}
</script>
