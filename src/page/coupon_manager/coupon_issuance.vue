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
						<el-input v-model="form.couponName" placeholder="优惠券名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>优惠券类型</span>
					<div class="width-120">
					  <el-select v-model="form.type" placeholder="全部">
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
					<span>发放用户</span>
					<div class="width-120">
						<el-input v-model="form.userName" placeholder="发放用户"></el-input>
					</div>
				</div>
				<div class="search_content">
					<picker :title="titleLabelOne" @onPassByVal='getTime'></picker>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchListData()">查询</el-button>
				</div>
			</div>
			<div class="table_title">
				<div class="table_title_left">
					<div class="table_title_left_title">优惠券发放列表</div>
				</div>
				<div class="table_title_right"><el-button type="primary" @click="addCoupon()">+发放优惠券</el-button></div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="add_time"
				      label="发放时间">
				    </el-table-column>
				    <el-table-column
				      prop="coupon_name"
				      label="优惠券名称">
				    </el-table-column>
				    <el-table-column
				      prop="condition"
				      label="优惠券总金额(元)">
				    </el-table-column>
				    <el-table-column
				      prop="user_name"
				      label="发放用户">
				    </el-table-column>
				    <el-table-column
				      prop="num"
				      label="发放用户数">
				    </el-table-column>
				    <el-table-column
				      prop="total"
				      label="发放总金额(元)">
				    </el-table-column>
				    <el-table-column
				      prop="remark"
				      label="备注">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="editCoupon(scope.row.id)">编辑</el-button>
				        <el-button type="text" size="small" @click="detailCoupon(scope.row.id)">详情</el-button>
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

import issuance from '../../js/coupon_issuance';
import coupon from '../../js/coupon';
 export default {
   data () {
     return {
     	couponTypeOption:[],
     	couponOption:[],
     	store_fromOption:[],
     	store_typeOption:[],
     	form:{
     		sendTime:'',
     		couponName:'',
     		type:'',
     		userName:'',
     	},
     	titleLabelOne:'发放优惠券时间',
     	currentPage:1,
		totals:0,
		pageSize:10,
     	tableData: [],
		content_title:{
			title1: "优惠券发放列表",
			title2: "",
			path1:'/home/couponManager/coupon_issuance',
			path2:''
		}
     }
   },
   created(){
		this.fetch();
		coupon.searchConf("Coupon/searchConf",this);
   },
   methods:{
   	fetch(val){
   		var data = {
   			couponName:this.form.couponName,
   			type:this.form.type	,
   			userName:this.form.userName,
   			sendTime:this.form.sendTime,
   			page:val?val:this.currentPage,
   			rows:this.pageSize,
   		}
   		issuance.Couponsend("Couponsend/listCoupon",data,this);
   	},
   	getTime(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.sendTime = msg[0]+'/'+msg[1];
	        }else{
	   			this.form.sendTime = '';
	        }
        }else{
	   			this.form.sendTime = '';
        }
   	},
   	searchListData(){
		this.fetch();
   	},
   	detailCoupon(id){
   		this.$router.push({name:'issuance_detail',query:{coupon_id:id,pageDetail:'detail'}})
   	},
   	addCoupon(){
   		this.$router.push({name:'issuance'})
   	},
	editCoupon(id){
		this.$router.push({name:'issuance_detail',query:{coupon_id:id,pageDetail:'edit'}})
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
   },
   components: {
		breadcrumb,picker
   },
 }
</script>
