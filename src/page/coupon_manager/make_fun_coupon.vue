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
						<el-input v-model="form.name" placeholder="商家ID"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商家名称</span>
					<div class="width-120">
						<el-input v-model="form.name" placeholder="商家名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商品ID</span>
					<div class="width-120">
						<el-input v-model="form.name" placeholder="商品ID"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>领取状态</span>
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
					<el-button type="primary" @click="searchListData()">查询</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="name"
				      label="商家ID">
				    </el-table-column>
				    <el-table-column
				      prop="origin_type_name"
				      label="商家名称">
				    </el-table-column>
				    <el-table-column
				      prop="money"
				      label="使用范围">
				    </el-table-column>
				    <el-table-column
				      prop="condition"
				      label="类型">
				    </el-table-column>
				    <el-table-column
				      prop="coupon_status"
				      label="活动名称">
				    </el-table-column>
				    <el-table-column
				      prop="use_display_str"
				      label="创建时间">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="活动时间">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="面额(元)">
				    </el-table-column>
				    <el-table-column
				      prop="is_hide_name"
				      label="限领/人">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="发行量">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="领取量">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="使用量">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="状态">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="searchCoupon(scope.row)">查看</el-button>
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
<el-dialog
  title="查看优惠券"
  :visible.sync="dialogVisible"
  width="680px">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
   <div class="make_fun_coupon_warp">
   		<div class="make_fun_coupon_warp_left">
		  <el-form-item label="优惠券名称" prop="name">
		    <el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
   		</div>
   		<div class="make_fun_coupon_warp_right">
   			注：该名称仅商家可见
   		</div>
   </div>
   <div class="make_fun_coupon_warp">
   		<div class="make_fun_coupon_warp_left">
		  <el-form-item label="面额" prop="name">
		    <el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
   		</div>
   		<div class="make_fun_coupon_warp_right">
			  <el-form-item label="使用条件  满" prop="name">
			    <el-input style="width:80px;" v-model="ruleForm.name"></el-input><span class="text">元才能使用</span>
			  </el-form-item>
   		</div>
   </div>
   <div class="make_fun_coupon_warp">
   		<div class="make_fun_coupon_warp_lefts">
			  <el-form-item label="活动时间" required>
			    <el-col :span="11">
			      <el-form-item prop="date1">
			        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.name" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			    <el-col class="line" :span="2">-</el-col>
			    <el-col :span="11">
			      <el-form-item prop="date2">
			        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.name" style="width: 100%;"></el-time-picker>
			      </el-form-item>
			    </el-col>
			  </el-form-item>
   		</div>
   </div>
   <div class="make_fun_coupon_warp">
   		<div class="make_fun_coupon_warp_left">
			  <el-form-item label="发行张数" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>	
   		</div>
   </div>
   <div class="make_fun_coupon_warp">
   		<div class="make_fun_coupon_warp_left">
			  <el-form-item label="每人限领" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
   		</div>
   </div>
  <el-form-item>
    <el-button @click="dialogVisible=false">关闭</el-button>
  </el-form-item>
</el-form>
</el-dialog>	
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';

import coupon from '../../js/coupon';
 export default {
   data () {
     return {
     	dialogVisible:true,
        ruleForm: {
          name: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },
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
   	searchCoupon(){
   		
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
