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
					资金数据
				</span>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="name"
				      label="累计已结算订单数">
				    </el-table-column>
				    <el-table-column
				      prop="origin_type_name"
				      label="当前待结算订单数">
				    </el-table-column>
				    <el-table-column
				      prop="money"
				      label="累计已失效订单数">
				    </el-table-column>
				    <el-table-column
				      prop="condition"
				      label="累计推广佣金">
				    </el-table-column>
				    <el-table-column
				      prop="coupon_status"
				      label="平台累计赚取">
				    </el-table-column>
				    <el-table-column
				      prop="use_display_str"
				      label="平台累计分佣">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="累计提现">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="待结算">
				    </el-table-column>
				  </el-table>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';

import coupon from '../../js/coupon';
 export default {
   data () {
     return {
     	form:{
     		name:'',
     		coupon_status:'',
     		coupon_type:'',
     		use_start_time:'',
     		use_end_time:'',
     		add_start_time:'',
     		add_end_time:'',
     		store_id:'',
     	},
     	couponOption:[],
     	couponTypeOption:[
     		{
     			label:'平台',
     			value:'1'
     		},
     		{
     			label:'商家',
     			value:'2'
     		}
     	],
     	couponOption:[
     		{
     			label:'领取中',
     			value:'1'
     		},
     		{
     			label:'使用',
     			value:'2'
     		},
     		{
     			label:'已结束',
     			value:'3'
     		}
     	],
     	order_service:'',
     	titleLabelOne:'使用优惠券时间',
     	titleLabelTwo:'发放优惠券时间',
     	currentPage:1,
		totals:0,
		pageSize:10,
     	tableData: [],
		content_title:{
			title1: "优惠券列表",
			title2: "",
			path1:'/home/couponManager/couponList',
			path2:''
		}
     }
   },
   created(){
		var data = {
			page:this.currentPage,
			rows:this.pageSize
		}
		coupon.couponList("Coupon/list",data,this);
		coupon.searchConf("Coupon/searchConf",this);
   },
   components: {
breadcrumb,picker
   },
   methods:{
   	getTime(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.use_start_time = msg[0];
	   			this.form.use_end_time = msg[1];
	        }else{
	   			this.form.use_start_time = '';
	   			this.form.use_end_time = '';
	        }
        }else{
   			this.form.use_start_time = '';
   			this.form.use_end_time = '';
        }
   	},
   	getTimes(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.add_start_time = msg[0];
	   			this.form.add_end_time = msg[1];
	        }else{
	   			this.form.add_start_time = '';
	   			this.form.add_end_time = '';
	        }
        }else{
   			this.form.add_start_time = '';
   			this.form.add_end_time = '';
        }
   	},
   	searchListData(){
   		var data = {
   			origin_type:this.form.coupon_type,
   			name:this.form.name,
   			use_start_time:this.form.use_start_time,
   			use_end_time:this.form.use_end_time,
   			add_start_time:this.form.add_start_time,
   			add_end_time:this.form.add_end_time,
   			coupon_status:this.form.coupon_status,
   			store_id:this.form.store_id,
   			page:this.currentPage,
   			rows:this.pageSize,
   		}
		coupon.couponList("Coupon/list",data,this);
   	},
   	detailCoupon(id){
   		this.$router.push({name:'detail_coupon',query:{coupon_id:id}})
   	},
   	addCoupon(){
   		this.$router.push({name:'coupon_list_detail'})
   	},
	editCoupon(id){
		this.$router.push({name:'coupon_list_detail',query:{coupon_id:id}})
	},
	deleteCoupon(params){
		var data = {
			id:params.id
		}
		coupon.delCoupon("Coupon/delCoupon",data,this,this.tableData,params);
	},
  handleCurrentChange(val) {
	var data = {
		page:val,
		rows:this.pageSize,
   			origin_type:this.form.coupon_type,
   			name:this.form.name,
   			use_start_time:this.form.use_start_time,
   			use_end_time:this.form.use_end_time,
   			add_start_time:this.form.add_start_time,
   			add_end_time:this.form.add_end_time,
   			coupon_status:this.form.coupon_status,
   			store_id:this.form.store_id,
	}
	coupon.couponList("Coupon/list",data,this);
  }
   }
 }
</script>
