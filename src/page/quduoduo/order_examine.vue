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
					订单审核列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>订单编号</span>
					<div class="width-120">
						<el-input v-model="form.order_sn" placeholder="订单编号"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>推广者ID</span>
					<div class="width-120">
						<el-input v-model="form.promotion_id" placeholder="推广者ID"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商户名称</span>
					<div class="width-120">
						<el-input v-model="form.store_name" placeholder="商户名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>审核状态</span>
					<div class="width-120">
					  <el-select v-model="form.is_prom_check_status" placeholder="全部">
					    <el-option
					      v-for="item in isPromCheckStatus_option"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
					<picker style="float:left;margin-bottom:10px;" :title="titleLabelOne" @onPassByVal='getTime1'></picker>
					<picker style="float:left;margin-bottom:10px;" :title="titleLabelTwo" @onPassByVal='getTime2'></picker>
					<picker style="float:left;margin-bottom:10px;" :title="titleLabelThree" @onPassByVal='getTime3'></picker>
					<el-button style="float:left" type="primary" @click="searchListData()">查询</el-button>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="order_sn"
				      label="订单编号">
				    </el-table-column>
				    <el-table-column
				      prop="develop_app_id"
				      label="推广者ID"
              width="80">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称"
              width="180">
				    </el-table-column>
				    <el-table-column
				      prop="confirm_time_name"
				      label="收货时间"
              width="160">
				    </el-table-column>
				    <el-table-column
				      prop="prom_check_time_name"
				      label="审核时间"
              width="160">
				    </el-table-column>
				    <el-table-column
				      prop="add_time_name"
				      label="创建时间"
              width="160">
				    </el-table-column>
				    <el-table-column
				      prop="goods_id"
				      label="商品ID">
				    </el-table-column>
				    <el-table-column
				      prop="goods_name"
				      label="推广商品"
              width="360">
				    </el-table-column>
				    <el-table-column
				      prop="total_amount"
				      label="订单金额(元)">
				    </el-table-column>
				    <el-table-column
				      prop="goods_num"
				      label="成交商品数">
				    </el-table-column>
				    <el-table-column
				      prop="promotion_rate_name"
				      label="佣金比率">
				    </el-table-column>
				    <el-table-column
				      prop="promotion_amount"
				      label="佣金金额(元)">
				    </el-table-column>
				    <el-table-column
				      prop="prom_check_username"
				      label="审核人">
				    </el-table-column>
				    <el-table-column
				      prop="is_prom_check_status_name"
				      label="状态"
              width="80">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="editStatus(scope.row)">修改状态</el-button>
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
    title="修改商品审核状态"
    :visible.sync="dialogVisible"
    width="30%">
    <div class="warp_dialog">
    	  <el-radio v-model="examineForm.radio" label="1">审核通过</el-radio>
    	  <el-radio v-model="examineForm.radio" label="2">审核拒绝</el-radio>
    </div>
    <div class="warp_dialog">
    	  <span class="width_guding">拒绝原因：</span>
    	  <span class="reason_text">
  		<textarea v-model="examineForm.reason" style="height: 50px;width: 370px;resize: none;"></textarea>
    	  </span>
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

import make_fun from '../../js/make_fun.js';
 export default {
   data () {
     return {
       examineForm:{
         radio:1,
         reason:'',
       },
       dialogVisible:false,
        isPromCheckStatus_option:[],
       	form:{
         		order_sn:'',
         		is_prom_check_status:'',
         		promotion_id:'',
         		store_name:'',
         		add_time_map:'',
         		confirm_time_map:'',
         		prom_check_time_map:'',
       	},
     	  titleLabelOne:'创建时间',
     	  titleLabelTwo:'收货时间',
     	  titleLabelThree:'审核时间',
     	  currentPage:1,
    		totals:0,
    		pageSize:10,
     	  tableData: [],
    		content_title:{
    			title1: "趣多多赚",
    			title2: "",
    			path1:'/home/marketing/make_fun',
    			path2:''
    		}
     }
   },
   created(){
       this.fetch();
		   make_fun.searchConfExamine("order/searchConf",this);
   },
   components: {
        breadcrumb,picker
   },
   methods:{
     examineDataFun(){
        var data = {
          order_sn:this.examineForm.order_sn,
          remarks:this.examineForm.reason,
          type:this.examineForm.radio,
        }
    		make_fun.orderOrderAudit("order/orderAudit",data,this);
     },
     editStatus(params){
       this.examineForm.radio = params.is_prom_check_status,
       this.examineForm.order_sn = params.order_sn,
       this.dialogVisible = true;
     },
     searchListData(){
       this.fetch();
     },
     handleCurrentChange(val){
       this.fetch(val);
     },
     fetch(val){
    		var data = {
    			page:val?val:this.currentPage,
    			rows:this.pageSize,
          order_sn:this.form.order_sn,
          is_prom_check_status:this.form.is_prom_check_status,
          promotion_id:this.form.promotion_id,
          store_name:this.form.store_name,
          add_time_map:this.form.add_time_map=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN/NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.add_time_map,
          confirm_time_map:this.form.confirm_time_map=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN/NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.confirm_time_map,
          prom_check_time_map:this.form.prom_check_time_map=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN/NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.prom_check_time_map,
    		}
    		make_fun.orderPromotionList("Order/promotionList",data,this);
     },
     	getTime1(msg){
     		if(msg!=undefined){
  	   		if(msg[0]!='NaN-0NaN-0NaN'){
  	   			     this.form.add_time_map = msg[0] +'/'+ msg[1];
  	        }else{
  	   			     this.form.add_time_map = '';
  	        }
          }else{
     			    this.form.add_time_map = '';
          }
     	},
    	getTime2(msg){
    		if(msg!=undefined){
 	   		if(msg[0]!='NaN-0NaN-0NaN'){
 	   			     this.form.confirm_time_map = msg[0] +'/'+ msg[1];
 	        }else{
 	   			     this.form.confirm_time_map = '';
 	        }
         }else{
    			    this.form.confirm_time_map = '';
         }
    	},
    	getTime3(msg){
    		if(msg!=undefined){
 	   		if(msg[0]!='NaN-0NaN-0NaN'){
 	   			     this.form.prom_check_time_map = msg[0] +'/'+ msg[1];
 	        }else{
 	   			     this.form.prom_check_time_map = '';
 	        }
         }else{
    			    this.form.prom_check_time_map = '';
         }
    	}
   }
 }
</script>
