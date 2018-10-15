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
					趣多多赚优惠券
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>商家ID</span>
					<div class="width-120">
						<el-input v-model="form.store_id" placeholder="商家ID"></el-input>
					</div>
				</div>
  				<div class="search_content">
  					<span>商家名称</span>
  					<div class="width-120">
  						<el-input v-model="form.store_name" placeholder="商家名称"></el-input>
  					</div>
  				</div>
    				<div class="search_content">
    					<span>商品ID</span>
    					<div class="width-120">
    						<el-input v-model="form.goods_id" placeholder="商品ID"></el-input>
    					</div>
    				</div>
				<div class="search_content">
					<span>领取状态</span>
					<div class="width-120">
					  <el-select v-model="form.coupon_status" placeholder="全部">
					    <el-option
					      v-for="item in couponTypeOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
					<el-button style="float:left;margin-left:10px" type="primary" @click="searchListData()">查询</el-button>
			</div>
			<!-- <div class="table_title">
				<div class="table_title_left">
					<div class="table_title_left_title">优惠券列表</div>
				</div>
				<div class="table_title_right"><el-button type="primary" @click="addCoupon()">+创建优惠券</el-button></div>
			</div> -->
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="store_id"
				      label="商家ID">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商家名称">
				    </el-table-column>
				    <el-table-column
				      prop="goods_id"
				      label="商品ID">
				    </el-table-column>
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
				      prop="is_hide_name"
				      label="是否展示">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <!-- <el-button type="text" size="small" @click="editCoupon(scope.row.id)">编辑</el-button> -->
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

import make_fun from '../../js/make_fun';
import coupon from '../../js/coupon';
 export default {
   data () {
     return {
     	form:{
     		goods_id:'',
     		store_id:'',
     		store_name:'',
     		coupon_status:'',
     	},
     	couponTypeOption:[],
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
			path1:'/home/quduoduo/coupon_manager_quduoduo',
			path2:''
		}
     }
   },
   created(){
     this.fetch();
		 make_fun.searchConf("Coupon/searchConf",this);
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
    fetch(val){
   		var data = {
   			page:val?val:this.currentPage,
   			rows:this.pageSize,
        coupon_status:this.form.coupon_status,
        store_name:this.form.store_name,
        store_id:this.form.store_id,
        goods_id:this.form.goods_id,
   		}
   		make_fun.couponList("Coupon/promotionList",data,this);
    },
   	searchListData(){
        this.fetch();
   	},
   	detailCoupon(id){
   		this.$router.push({name:'detail_coupon',query:{coupon_id:id,title:"quduoduo"}})
   	},
   	addCoupon(){
   		this.$router.push({name:'coupon_list_detail',query:{title:"quduoduo"}})
   	},
  	editCoupon(id){
  		this.$router.push({name:'coupon_list_detail',query:{coupon_id:id,title:"quduoduo"}})
  	},
  	deleteCoupon(params){
  		var data = {
  			id:params.id
  		}
  		coupon.delCoupon("Coupon/delCoupon",data,this,this.tableData,params);
  	},
    handleCurrentChange(val) {
        this.fetch(val);
    }
   }
 }
</script>
