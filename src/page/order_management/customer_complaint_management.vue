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
					用户申诉单列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>申诉用户</span>
					<div class="width-120">
						<el-input v-model="form.user_name" placeholder="申诉用户"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>申诉订单编号</span>
					<div class="width-120">
						<el-input v-model="form.return_sn" placeholder="申诉订单编号"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>订单编号</span>
					<div class="width-120">
						<el-input v-model="form.order_sn" placeholder="订单编号"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>所属商家</span>
					<div class="width-120">
						<el-input v-model="form.store_name" placeholder="所属商家"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>售后类型</span>
					<div class="width-120">
					  <el-select v-model="form.service_type" placeholder="请选择">
					    <el-option
					      v-for="item in service_type"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>平台是否加入</span>
					<div class="width-120">
						<el-select v-model="form.is_apply" placeholder="平台是否加入">
						<el-option
					      v-for="item in is_apply"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
					<picker style="float:left;margin-bottom:10px;" :title="titleLabels" @onPassByVal="addTimeFun"></picker>
					<picker style="float:left;margin-bottom:10px;" :title="titleLabel" @onPassByVal="applyTimeFun"></picker>
					<el-button style="float:left;margin-left:10px;" type="primary" @click="searchList()">查询</el-button>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="return_sn"
				      label="申诉订单">
				    </el-table-column>
				    <el-table-column
				      prop="nickname"
				      label="申诉用户">
				    </el-table-column>
				    <el-table-column
				      prop="reason"
				      label="申诉内容">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="所属商家">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="申诉时间">
				    </el-table-column>
				    <el-table-column
				      prop="service_type_name"
				      label="申诉类型">
				    </el-table-column>
				    <el-table-column
				      prop="order_service_name"
				      label="申诉状态">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="entryDetail(scope.row.order_sn)">查看</el-button>
				        <!--<a target="_blank" :href="'/home/orderManagement/customerComplaintManagementDetail?order_sn='+scope.row.order_sn">编辑</a>-->
				        <span v-if="scope.row.platform_audit_show">
				        	<el-button type="text" size="small" @click="Examination(scope.row.return_sn)">审批</el-button>
				        </span>
				      </template>
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
<el-dialog
  title="审批"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="warp_dialog">
  	  <el-radio v-model="form.radio" label="1">申诉通过</el-radio>
  	  <el-radio v-model="form.radio" label="2">申诉拒绝</el-radio>
  </div>
  <div class="warp_dialog" style="padding:20px 0">
  	  <approval-up-load :imageArr = 'form.proof_imgs'  :type="customer" :upLoadData="upLoadData1" @deleteBig="deleteImg"></approval-up-load>
  </div>
  <div class="warp_dialog">
  	  <span>备注</span>
  	  <el-input
		  type="textarea"
		  :autosize="{ minRows: 2, maxRows: 4}"
		  placeholder="请输入内容"
		  v-model="form.textarea3">
		</el-input>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="examineDataFun()">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';
import approvalUpLoad from '../../components/approvalUpLoad';

import orderList from '../../js/order_list';
 export default {
   data () {
     return {
     	return_sn:'',
     	customer:'customer',
        upLoadData1:{
          type:"default",
        },
     	dialogVisible:false,
     	titleLabels:'售后时间',
     	titleLabel:'平台介入时间',
     	is_apply:[],
     	service_type:[],
     	form:{
     		user_name:'',
     		return_sn:'',
     		order_sn:'',
     		store_name:'',
     		service_type:'',
     		add_time:'',
     		is_apply:'',
     		apply_time:'',
     		store_id:'',
     		user_id:'',
     		radio:'1',
     		textarea3:'',
     		proof_imgs:''
     	},
     	type:0,
     	next_id:'',
     	prev_id:'',
     	currentPage:1,
		totals:0,
		pageSize:10,
     	 tableData: [],
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
			title1: "用户申诉单列表",
			title2: "",
			path1:'/home/orderManagement/customerComplaintManagement',
			path2:''
		}
     }
   },
   created(){
		var data = {
			rows:this.pageSize,
			is_apply:'',
		}
		orderList.serviceList("Order/serviceList",data,this);
		orderList.serviceSearchConf("order/serviceSearchConf",this);
   },
   components: {
		breadcrumb,picker,approvalUpLoad
   },
   methods:{
   	deleteImg(val){
   		if(val.length!=0){
   			this.form.proof_imgs = val[0];
   		}
   	},
   	examineDataFun(){
   		var data = {
   			return_sn:this.return_sn,
   			action:this.form.radio,
   			description:this.form.textarea3,
   			proof_imgs:this.form.proof_imgs,
   		}
   		console.log(JSON.stringify(data))
   		orderList.handleServiceOrder("Order/handleService",data,this);
   	},
   	Examination(return_sn){
   		this.dialogVisible = true;
   		this.return_sn = return_sn;
   	},
   	addTimeFun(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.add_time = msg[0]+'/'+msg[1];
	        }else{
	   			this.form.add_time = '';
	        }
        }else{
   			this.form.add_time = '';
        }
   	},
   	applyTimeFun(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.apply_time = msg[0]+'/'+msg[1];
	        }else{
	   			this.form.apply_time = '';
	        }
        }else{
   			this.form.apply_time = '';
        }
   	},
   	searchList(){
		var data = {
			rows:this.pageSize,
			is_apply:1,
			user_id:this.form.user_id,
			user_name:this.form.user_name,
			return_sn:this.form.return_sn,
			order_sn:this.form.order_sn,
			store_name:this.form.store_name,
			store_id:this.form.store_id,
			service_type:this.form.service_type,
			add_time:this.form.add_time,
			is_apply:this.form.is_apply,
			apply_time:this.form.apply_time,
		}
		orderList.serviceList("Order/serviceList",data,this);
   	},
   	pagination(id,tit){
   		console.log(id)
// 		if(id!=''){
			var data = {
				page_index:id,
				page_type:tit,
				rows:this.pageSize,
				is_apply:1,
				user_id:this.form.user_id,
				user_name:this.form.user_name,
				return_sn:this.form.return_sn,
				order_sn:this.form.order_sn,
				store_name:this.form.store_name,
				store_id:this.form.store_id,
				service_type:this.form.service_type,
				add_time:this.form.add_time,
				is_apply:this.form.is_apply,
				apply_time:this.form.apply_time,
			}
			orderList.serviceList("Order/serviceList",data,this);
// 		}
   	},
	entryDetail(id){
		this.$router.push({name:'customer_complaint_management_detail',query:{order_sn:id}})
	},
   }
 }
</script>
