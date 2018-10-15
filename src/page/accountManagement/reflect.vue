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
					提现审核
				</span>
			</div>
			<div class="record">
			   <el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane v-for="items in optionsListStatus" :label="items.label" :key="items.value" :name="items.value">
			    	<div v-show="items.value=='0'">
						<div class="search_btn">
							<div class="search_content">
								<span>提现ID</span>
								<div class="width-120">
									<el-input v-model="form.sw_id" placeholder="提现ID"></el-input>
								</div>
							</div>
							<div class="search_content">
								<span>提现商家</span>
								<div class="width-120">
									<el-input v-model="form.merchant_name" placeholder="提现商家"></el-input>
								</div>
							</div>
							<div class="search_content">
								<span>商家ID</span>
								<div class="width-120">
									<el-input v-model="form.merchant_id" placeholder="商品ID"></el-input>
								</div>
							</div>
							<div class="search_content">
								<span>提现账号</span>
								<div class="width-120">
									<el-input v-model="form.withdrawal_code" placeholder="提现账号"></el-input>
								</div>
							</div>
							<div class="search_content">
								<span>账号类型</span>
								<div class="width-120">
								  <el-select v-model="form.withdrawal_type" placeholder="请选择">
								    <el-option
								      v-for="item in is_on_sale"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
								</div>
							</div>
			    				<picker style="float:left;margin-bottom:10px" title="提现时间" @onPassByVal = "onPassByVal1" :sTime="form.start_time_withdrawal" :eTime="form.end_time_withdrawal" ></picker>
                  <el-button style="float:left;margin-left:20px" type="primary" @click="searchListData('1')">查询</el-button>
						</div>
						<div class="account_cash">
							<ul class="list_3">
								<li>
									<div class="title">提现待审金额合计</div>
									<div class="cash">¥{{count.total_withdrawal_money}}</div>
								</li>
							</ul>
						</div>
			    	</div>
			   	<div v-show="items.value=='1'">
					<div class="search_btn">
						<div class="search_content">
							<span>提现ID</span>
							<div class="width-120">
								<el-input v-model="form.sw_id" placeholder="提现编号"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>提现商家</span>
							<div class="width-120">
								<el-input v-model="form.merchant_name" placeholder="提现商家"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>商家ID</span>
							<div class="width-120">
								<el-input v-model="form.merchant_id" placeholder="商家ID"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>提现账号</span>
							<div class="width-120">
								<el-input v-model="form.withdrawal_code" placeholder="提现账号"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>账号类型</span>
							<div class="width-120">
							  <el-select v-model="form.withdrawal_type" placeholder="请选择">
							    <el-option
							      v-for="item in is_on_sale"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
							</div>
						</div>
			    				<picker style="float:left;margin-bottom:10px" title="审核时间" @onPassByVal = "onPassByVal2"  :sTime="form.start_time_audit" :eTime="form.end_time_audit" ></picker>
                <el-button style="float:left;margin-left:20px" type="primary" @click="searchListData('2')">查询</el-button>
					</div>
					<div class="account_cash">
						<ul class="list_3">
							<li>
								<div class="title">提现待付款金额合计</div>
								<div class="cash">¥{{count.total_withdrawal_money}}</div>
							</li>
						</ul>
					</div>
				</div>
			   	<div v-show="items.value=='2'">
					<div class="search_btn">
						<div class="search_content">
							<span>提现ID</span>
							<div class="width-120">
								<el-input v-model="form.sw_id" placeholder="提现编号"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>提现商家</span>
							<div class="width-120">
								<el-input v-model="form.merchant_name" placeholder="提现商家"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>商家ID</span>
							<div class="width-120">
								<el-input v-model="form.merchant_id" placeholder="商品ID"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>提现账号</span>
							<div class="width-120">
								<el-input v-model="form.withdrawal_code" placeholder="提现账号"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>账号类型</span>
							<div class="width-120">
							  <el-select v-model="form.withdrawal_type" placeholder="请选择">
							    <el-option
							      v-for="item in is_on_sale"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
							</div>
						</div>
              <el-button style="float:left" type="primary" @click="searchListData('3')">查询</el-button>
					</div>
					<div class="account_cash">
						<ul class="list_3">
							<li>
								<div class="title">拒绝提现金额合计</div>
								<div class="cash">¥{{count.total_withdrawal_money}}</div>
							</li>
						</ul>
					</div>
				</div>
			   	<div v-show="items.value=='3'">
					<div class="search_btn">
						<div class="search_content">
							<span>提现ID</span>
							<div class="width-120">
								<el-input v-model="form.sw_id" placeholder="提现编号"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>提现商家</span>
							<div class="width-120">
								<el-input v-model="form.merchant_name" placeholder="提现商家"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>商家ID</span>
							<div class="width-120">
								<el-input v-model="form.merchant_id" placeholder="商品ID"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>提现账号</span>
							<div class="width-120">
								<el-input v-model="form.withdrawal_code" placeholder="提现账号"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>账号类型</span>
							<div class="width-120">
							  <el-select v-model="form.withdrawal_type" placeholder="请选择">
							    <el-option
							      v-for="item in is_on_sale"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
							</div>
						</div>
              <el-button style="float:left" type="primary" @click="searchListData('3')">查询</el-button>
					</div>
					<div class="account_cash">
						<ul class="list_3">
							<li>
								<div class="title">提现已汇款金额合计</div>
								<div class="cash">¥{{count.total_withdrawal_money}}</div>
							</li>
						</ul>
					</div>
				</div><div v-show="items.value=='4'">
					<div class="search_btn">
						<div class="search_content">
							<span>商家id</span>
							<div class="width-120">
								<el-input v-model="form.store_id" placeholder="商家id"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>店铺名称</span>
							<div class="width-120">
								<el-input v-model="form.store_name" placeholder="店铺名称"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>提现账号</span>
							<div class="width-120">
								<el-input v-model="form.withdrawal_code" placeholder="提现账号"></el-input>
							</div>
						</div>
							<picker style="float:left;margin-bottom:10px" :sTime="form.add_time_start" :eTime="form.add_time_end" :title="titleLabel" @onPassByVal='getTimes'></picker>
              <el-button style="float:left;margin-left:20px" type="primary" @click="searchListData('4')">查询</el-button>
					</div>
					<div class="account_cash">
						<ul class="list_4">
							<li>
								<div class="title">进账总额</div>
								<div class="cash">¥{{account4.total_withdrawal_money}}</div>
							</li>
							<li>
								<div class="title">待审核提现</div>
								<div class="cash">¥{{account4.examine_withdrawal_money}}</div>
							</li>
							<li>
								<div class="title">已提现总额</div>
								<div class="cash">¥{{account4.agree_withdrawal_money}}</div>
							</li>
							<li>
								<div class="title">可提现余额</div>
								<div class="cash">¥{{account4.can_withdrawal_money}}</div>
							</li>
						</ul>
					</div>
				</div>
			    </el-tab-pane>
			  </el-tabs>
			</div>
			<div class="table_list" v-show="tableData.length!=0">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="sw_id"
				      label="提现ID">
				    </el-table-column>
				    <el-table-column
				      prop="merchant_name"
				      label="提现商家">
				    </el-table-column>
				    <el-table-column
				      prop="merchant_status_desc"
				      label="营业状态">
				    </el-table-column>
				    <el-table-column
				      prop="merchant_id"
				      label="商家ID">
				    </el-table-column>
				    <el-table-column
				      prop="withdrawal_code"
				      label="提现账号">
				    </el-table-column>
				    <el-table-column
				      prop="withdrawal_name"
				      label="账户名称">
				    </el-table-column>
				    <el-table-column
				      prop="withdrawal_type"
				      label="账号类型">
				    </el-table-column>
				    <el-table-column
				      prop="withdrawal_money"
				      label="提现金额(元)">
				    </el-table-column>
				    <el-table-column
				      prop="display_money"
				      label="到账金额">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="提现时间">
				    </el-table-column>
				    <el-table-column
				      prop="audit_time"
				      label="审核时间">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button v-show="scope.row.status==0" type="text" size="small" @click="entryDetail(scope.row)">{{scope.row.status_desc}}</el-button>
				        <el-button v-show="scope.row.status==1" type="text" size="small" @click="entryDetails(scope.row)">{{scope.row.status_desc}}</el-button>
				        <div v-show="scope.row.status==2">{{scope.row.status_desc}}</div>
				        <div v-show="scope.row.status==3">{{scope.row.status_desc}}</div>
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

			<div class="table_list" v-show="tableData1.length!=0">
				  <el-table
				    :data="tableData1"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="serial_number"
				      label="帐单号">
				    </el-table-column>
				    <el-table-column
				      prop="sw_id"
				      label="流水id">
				    </el-table-column>
				    <el-table-column
				      prop="withdrawal_money"
				      label="金额">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="进账时间">
				    </el-table-column>
				    <el-table-column
				      prop="audit_remark"
				      label="备注">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <div @click="searchDetail(scope.row)">查看明细</div>
				      </template>
				    </el-table-column>
				  </el-table>
			       <div class="pagination">
			        <el-pagination
			          @current-change="handleCurrentChange1"
			          :current-page="currentPage"
			          :page-size = 'pageSize'
			          layout="total, prev, pager, next, jumper"
			          :total='totals1'>
			        </el-pagination>
			      </div>
			</div>
		</div>
	</div>
<el-dialog width="90%" title="账单明细" :visible.sync="dialogTableVisible">
<div class="order_detail_table">
	<div class="current_system">
		<div class="warp">
			<table class="show_list_table" border="0" cellspacing="" cellpadding="">
				<tbody>
					<tr>
						<td>订单号：</td>
						<td>支付方式：</td>
						<td>商品名称：</td>
						<td>购买数量：</td>
						<td>订单总价：</td>
						<td>平台优惠卷金额：</td>
						<td>商家优惠卷金额：</td>
						<td>应付金额：</td>
						<td>退款金额：</td>
						<td>可提现金额：</td>
					</tr>
					<tr v-for="item in gridData">
						<td>
							{{item.order_sn}}
						</td>
						<td>
							{{item.pay_name}}
						</td>
						<td>
							{{item.goods_name}}
						</td>
						<td>
							{{item.goods_num}}
						</td>
						<td>
							{{item.total_amount	}}
						</td>
						<td>
							{{item.pqd_coupon_price}}
						</td>
						<td>
							{{item.store_coupon_price}}
						</td>
						<td>
							{{item.order_amount}}
						</td>
						<td>
							{{item.expenses_money}}
						</td>
						<td>
							{{item.withdraw_money}}
						</td>
					</tr>
				</tbody>
			</table>
			       <div class="pagination">
				        <el-pagination
				          @current-change="handleCurrentChange2"
				          :current-page="currentPage"
				          :page-size = 'pageSize2'
				          layout="total, prev, pager, next, jumper"
				          :total='totals2'>
				        </el-pagination>
			      </div>
		</div>
	</div>
</div>
</el-dialog>
<el-dialog width="600px" :visible.sync="dialogFormVisible">
<div class="item_detail">
    <div class="title">
        <div class="tits">审核信息</div>
    </div>
</div>
<div class="examine_submit">
	<div class="content">
		<div class="containers">
			<div class="left">到账金额:</div>
			<div class="right">¥{{form.withdrawal_money}}</div>
		</div>
		<div class="containers">
			<div class="left">审核操作:</div>
			<div class="right">
				  <el-radio v-model="form.status" label="3">同意提现</el-radio>
  				  <el-radio v-model="form.status" label="2">拒绝提现</el-radio>
			</div>
		</div>
		<div class="containers">
			<div class="left">操作说明:</div>
			<div class="right">
				<el-input
				  type="textarea"
				  :autosize="{ minRows: 2, maxRows: 4}"
				  placeholder="请输入内容"
				  v-model="form.memo">
				</el-input>
			</div>
		</div>
		<div class="containers">
			<div class="left">&nbsp;</div>
			<div class="right"><el-button type="primary" @click="submitExamine()">提交</el-button></div>
		</div>
	</div>
</div>
<!--<div class="item_detail">-->
    <!--<div class="title">
        <div class="tits">订单信息</div>
    </div>
</div>
<div class="table_list">
	  <el-table
	    :data="tableDataDialog"
	    border
	    style="width: 100%">
	    <el-table-column
	      prop="order_sn"
	      label="订单编号">
	    </el-table-column>
	    <el-table-column
	      prop="goods_id"
	      label="商品ID">
	    </el-table-column>
	    <el-table-column
	      prop="goods_name"
	      label="商品名称">
	    </el-table-column>
	    <el-table-column
	      prop="spec_key_name"
	      label="商品规格">
	    </el-table-column>
	    <el-table-column
	      prop="goods_price"
	      label="商品单价(元)">
	    </el-table-column>
	    <el-table-column
	      prop="goods_num"
	      label="商品数量">
	    </el-table-column>
	    <el-table-column
	      prop="withdraw_money"
	      label="提现金额(元)">
	    </el-table-column>
	  </el-table>
       <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChangeDialog"
          :current-page="currentPageDialog"
          :page-size = 'pageSizeDialog'
          layout="total, prev, pager, next, jumper"
          :total='totalsDialog'>
        </el-pagination>
      </div>
</div>-->
</el-dialog>

<el-dialog
  title="汇款"
  :visible.sync="dialogVisible"
  width="30%">
<div class="examine_submit">
	<div class="content">
		<div class="containers">
			<div class="left">到账金额:</div>
			<div class="right">¥{{remitMoney.withdrawal_money}}</div>
		</div>
		<div class="containers">
			<div class="left">汇款说明:</div>
			<div class="right">
				<el-input
				  type="textarea"
				  :autosize="{ minRows: 2, maxRows: 4}"
				  placeholder="请输入内容"
				  v-model="remitMoney.memo">
				</el-input>
			</div>
		</div>
		<div class="containers">
			<div class="left">&nbsp;</div>
			<div class="right"><el-button type="primary" @click="Remittance()">确认付款</el-button></div>
		</div>
	</div>
</div>
</el-dialog>
 </div>
</template>

<script>

import Withdraw from '../../js/Withdraw.js';
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';
 export default {
   data () {
     return {
     	current_sw_id:'',
     	totals2:0,
     	pageSize2:10,
     	titleLabel:'进账时间 ',
     	sTime:'',
     	eTime:'',
     	account4:{},
     	gridData:{},
     	dialogTableVisible:false,
     	status:0,
     	optionsListStatus:[],
     	tableDataDrawal:[],
     	totalsDrawal:0,
     	count:{
     		pass_audit:0,
     		remittance:0,
     		wait_audit:0,
     		wait_pay_withdrawal:0,
     		total_withdrawal_money:0,
     	},
     	textarea3:'',
     	radio: '1',
     	activeName: '0',
     	form:{
     		sw_id:'',
     		merchant_id:'',
     		withdrawal_id:'',
     		withdrawal_money:'',
     		status:'3',
     		memo:'',
     		store_name:'',
     		withdrawal_number:'',
     		store_id:'',
     		withdrawal_code:'',
     		withdrawal_type:'',
     		start_time_withdrawal:'',
     		withdrawal_number:'',
     		start_time_withdrawal:'',
     		end_time_withdrawal:'',
     		is_export:'',
     	},
     	is_on_sale:[
     		{
     			value:'alipay',
     			label:'支付宝'
     		},
     		{
     			value:'weixin',
     			label:'微信'
     		}
     	],
     	dialogVisible:false,
     	tableDataDialog:[],
     	totalsDialog:0,
     	currentPageDialog:1,
     	pageSizeDialog:10,
     	tableData:[],
     	tableData1:[],
     	remitMoney:{
   			withdrawal_id:'',
   			display_money:0,
   			memo:'',
   			withdrawal_id:'',
     	},
     	totals:0,
     	totals1:0,
     	currentPage:1,
     	pageSize:10,
     	dialogFormVisible:false,
		content_title:{
			title1: "提现审核",
			title2: "",
			path1:'/home/accountManagement/reflect',
			path2:''
		}
     }
   },
   created(){
   		var data = {
   			status:this.status,
   			sw_id:this.form.sw_id,
  			withdrawal_number:this.form.withdrawal_number,
  			store_name:this.form.merchant_name,
  			store_id:this.form.store_id,
  			withdrawal_code:this.form.withdrawal_code,
  			withdrawal_type:this.form.withdrawal_type,
  			start_time_withdrawal:this.form.start_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.start_time_withdrawal,
  			end_time_withdrawal:this.form.end_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.end_time_withdrawal,
  			start_time_audit:this.form.start_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.start_time_withdrawal,
  			end_time_audit:this.form.end_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.end_time_withdrawal,
  			is_export:this.form.is_export,
   		}
    		Withdraw.getWithdrawalStatistics("Withdraw/withdrawalStatistics",data,this);
    		Withdraw.listStatus("Withdraw/listStatus",this);
    		var datas = {
    			page:this.currentPage,
    			rows:this.pageSize,
       			status:this.status,
    		}
    		Withdraw.getWithdrawalList("Withdraw/withdrawalList",datas,this);
   },
   components: {
		breadcrumb,picker
   },
   methods:{
   	searchDetail(params){
   		this.current_sw_id = params.sw_id;
   		var data = {
   			sw_id : params.sw_id,
  			page:this.currentPage,
  			rows:this.pageSize2,
   		}
   		Withdraw.Storepoconfirmwithdrawalorderlist("Storepoconfirmwithdrawalorderlist/getInfo",data,this);
   	},
   	Remittance(){
   		var data = {
   			withdrawal_id:this.remitMoney.withdrawal_id,
   			display_money:this.remitMoney.withdrawal_money,
   			memo:this.remitMoney.memo,
   		}
		Withdraw.remitMoney("Withdraw/remitMoney",data,this);
   	},
   	onPassByVal2(val){
   		if(val[0]!='NaN-0NaN-0NaN 0NaN:0NaN:0NaN'){
	   		this.form.start_time_audit = val[0];
	   		this.form.end_time_audit = val[1];
   		}else{
	   		this.form.start_time_audit = '';
	   		this.form.end_time_audit = '';
   		}
   	},
   	onPassByVal1(val){
   		if(val[0]!='NaN-0NaN-0NaN 0NaN:0NaN:0NaN'){
	   		this.form.start_time_withdrawal = val[0];
	   		this.form.end_time_withdrawal = val[1];
   		}else{
	   		this.form.start_time_withdrawal = '';
	   		this.form.end_time_withdrawal = '';
   		}
   	},
   	getTimes(val){

   		if(val[0]!='NaN-0NaN-0NaN 0NaN:0NaN:0NaN'){
	   		this.form.add_time_start = val[0];
	   		this.form.add_time_end = val[1];
   		}else{
	   		this.form.add_time_start = '';
	   		this.form.add_time_end = '';
   		}
   	},
   	searchListData(id){
     		if(id==4){
     			var data = {
  				store_id:this.form.store_id,
  				store_name:this.form.store_name,
          add_time_start:this.form.add_time_start=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.add_time_start,
          add_time_end:this.form.add_time_end=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.add_time_end,
  				withdrawal_code:this.form.withdrawal_code,
  				page:this.currentPage,
  				rows:this.pageSize,
  			}
  			Withdraw.getBalancepaymentList("Storepoconfirm/getList",data,this);
  			Withdraw.getStatistics("Storepoconfirm/getStatistics",data,this);
   		}else{
	   		var data = {
	   			status:this.status,
	   			sw_id:this.form.sw_id,
  				withdrawal_number:this.form.withdrawal_number,
  				store_name:this.form.merchant_name,
  				store_id:this.form.merchant_id,
  				withdrawal_code:this.form.withdrawal_code,
  				withdrawal_type:this.form.withdrawal_type,
  				start_time_withdrawal:this.form.start_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.start_time_withdrawal,
  				end_time_withdrawal:this.form.end_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.end_time_withdrawal,
  				start_time_audit:this.form.start_time_audit=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.start_time_audit,
  				end_time_audit:this.form.end_time_audit=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.end_time_audit,
  				is_export:this.form.is_export,
	   		}
			     Withdraw.getWithdrawalList("Withdraw/withdrawalList",data,this);
   		}
   	},
   	submitExamine(){
   		var data = {
   			withdrawal_id:this.form.withdrawal_id,
   			status:this.form.status,
   			withdrawal_money:this.form.withdrawal_money,
   			memo:this.form.memo,
   		}
   		console.log(JSON.stringify(data))
   		Withdraw.subWithdrawAudit("Withdraw/withdrawAudit",data,this);
   	},
		handleCurrentChange1(val){
			var data = {
				store_id:this.form.store_id,
				store_name:this.form.store_name,
        add_time_start:this.form.add_time_start=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.add_time_start,
        add_time_end:this.form.add_time_end=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.add_time_end,
				withdrawal_code:this.form.withdrawal_code,
				page:val,
				rows:this.pageSize,
			}
			Withdraw.getBalancepaymentList("Storepoconfirm/getList",data,this);
			Withdraw.getStatistics("Storepoconfirm/getStatistics",data,this);
		},
		handleCurrentChange2(val){
	   		var data = {
	   			sw_id : this.current_sw_id,
				page:val,
				rows:this.pageSize2,
	   		}
	   		Withdraw.Storepoconfirmwithdrawalorderlist("Storepoconfirmwithdrawalorderlist/getInfo",data,this);
		},
      handleClick(tab, event) {
    		this.status = tab.name;
    		this.form.start_time_withdrawal = '';
    		this.form.end_time_withdrawal = '';
    		this.form.start_time_audit = '';
    		this.form.end_time_audit = '';
    		this.form.store_id = '';
    		this.form.store_name = '';
    		this.form.add_time_start = '';
    		this.form.add_time_end = '';
    		this.form.withdrawal_code = '';
    		if(tab.name==4){
    			var data = {
    				store_id:this.form.store_id,
    				store_name:this.form.store_name,
    				add_time_start:this.form.add_time_start=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.add_time_start,
    				add_time_end:this.form.add_time_end=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.add_time_end,
    				withdrawal_code:this.form.withdrawal_code,
    				page:this.currentPage,
    				rows:this.pageSize,
    			}
			Withdraw.getBalancepaymentList("Storepoconfirm/getList",data,this);
			Withdraw.getStatistics("Storepoconfirm/getStatistics",data,this);
		}else{
	   		var data = {
	   			status:tab.name,
	   			sw_id:this.form.sw_id,
  				withdrawal_number:this.form.withdrawal_number,
  				store_name:this.form.merchant_name,
  				store_id:this.form.merchant_id,
  				withdrawal_code:this.form.withdrawal_code,
  				withdrawal_type:this.form.withdrawal_type,
  				start_time_withdrawal:this.form.start_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.start_time_withdrawal,
  				end_time_withdrawal:this.form.end_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.end_time_withdrawal,
  				start_time_audit:this.form.start_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.start_time_withdrawal,
  				end_time_audit:this.form.end_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.end_time_withdrawal,
  				is_export:this.form.is_export,
	   		}
			Withdraw.getWithdrawalList("Withdraw/withdrawalList",data,this);
		}
      },
		entryDetail(data){
			this.form.withdrawal_money = data.display_money;
			this.form.withdrawal_id = data.sw_id;
			var data = {
   				sw_id:this.form.sw_id,
  				withdrawal_number:this.form.withdrawal_number,
  				store_name:this.form.merchant_name,
  				store_id:this.form.merchant_id,
  				withdrawal_code:this.form.withdrawal_code,
  				withdrawal_type:this.form.withdrawal_type,
  				start_time_withdrawal:this.form.start_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.start_time_withdrawal,
  				end_time_withdrawal:this.form.withdrawal_number=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.withdrawal_number,
  				start_time_audit:this.form.start_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.start_time_withdrawal,
  				end_time_audit:this.form.end_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.end_time_withdrawal,
  				is_export:this.form.is_export,
  				status:this.status,
  				page:this.currentPageDialog,
  				rows:this.pageSizeDialog,
  				withdrawal_id:this.form.withdrawal_id,
  				is_export:this.form.is_export,
			}
			Withdraw.withdrawalOrderList("Withdraw/withdrawalOrderList",data,this);
		},
		entryDetails(data){
			console.log(JSON.stringify(data))
   			this.remitMoney.withdrawal_id = data.sw_id;
   			this.remitMoney.withdrawal_money = data.display_money;
			this.dialogVisible = true;
		},
		handleCurrentChange(val) {
			var datas = {
   				sw_id:this.form.sw_id,
				withdrawal_number:this.form.withdrawal_number,
				store_name:this.form.merchant_name,
				store_id:this.form.merchant_id,
				withdrawal_code:this.form.withdrawal_code,
				withdrawal_type:this.form.withdrawal_type,
				start_time_withdrawal:this.form.start_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.start_time_withdrawal,
				end_time_withdrawal:this.form.withdrawal_number=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.withdrawal_number,
				start_time_audit:this.form.start_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.start_time_withdrawal,
				end_time_audit:this.form.end_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.end_time_withdrawal,
				is_export:this.form.is_export,
				status:this.status,
				page:val,
				rows:this.pageSize,
			}
			Withdraw.getWithdrawalList("Withdraw/withdrawalList",datas,this);
		},
		handleCurrentChangeDialog(val) {
			var data = {
   				sw_id:this.form.sw_id,
				withdrawal_number:this.form.withdrawal_number,
				store_name:this.form.merchant_name,
				store_id:this.form.merchant_id,
				withdrawal_code:this.form.withdrawal_code,
				withdrawal_type:this.form.withdrawal_type,
				start_time_withdrawal:this.form.start_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.start_time_withdrawal,
				end_time_withdrawal:this.form.withdrawal_number=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.withdrawal_number,
				start_time_audit:this.form.start_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.start_time_withdrawal,
				end_time_audit:this.form.end_time_withdrawal=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?"":this.form.end_time_withdrawal,
				is_export:this.form.is_export,
				status:this.status,
				page:this.currentPageDialog,
				rows:this.pageSizeDialog,
				withdrawal_id:this.form.withdrawal_id,
				is_export:this.form.is_export,
			}
			Withdraw.withdrawalOrderList("Withdraw/withdrawalOrderList",data,this);
		}
   }
 }
</script>
