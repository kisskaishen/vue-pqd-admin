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
						<el-input v-model="form.name" placeholder="优惠券名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>优惠券类型</span>
					<div class="width-120">
					  <el-select v-model="form.coupon_type" placeholder="全部">
					    <el-option
					      v-for="item in couponTypeOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>优惠券领取状态</span>
					<div class="width-120">
					  <el-select v-model="form.coupon_status" placeholder="全部">
					    <el-option
					      v-for="item in couponOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<picker :title="titleLabelOne" @onPassByVal='getTime'></picker>
				</div>
				<div class="search_content">
					<picker :title="titleLabelTwo" @onPassByVal='getTimes'></picker>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchListData()">查询</el-button>
				</div>
			</div>
			<div class="table_title">
				<div class="table_title_left">
					<div class="table_title_left_title">优惠券列表</div>
				</div>
				<div class="table_title_right"><el-button type="primary" @click="addCoupon()">+创建优惠券</el-button></div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="name"
				      label="优惠券名称">
				    </el-table-column>
				    <el-table-column
				      prop="origin_type_name"
				      label="优惠券类型">
				    </el-table-column>
				    <el-table-column
				      prop="money"
				      label="优惠券金额(元)">
				    </el-table-column>
				    <el-table-column
				      prop="condition"
				      label="使用条件">
				    </el-table-column>
				    <el-table-column
				      prop="coupon_status"
				      label="优惠券领用状态">
				    </el-table-column>
				    <el-table-column
				      prop="use_display_str"
				      label="发放|领取|使用">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="创建日期">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="发券用户">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="editCoupon(scope.row.id)">编辑</el-button>
				        <el-button type="text" size="small" @click="detailCoupon(scope.row.id)">详情</el-button>
				        <el-button type="text" size="small" @click="deleteCoupon(scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
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
		coupon.searchConf("Coupon/searchConf",data,this);
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
