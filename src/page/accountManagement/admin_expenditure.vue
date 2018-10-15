<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
</style>
<template>
		<div class="search_admin_list_table">
			<div class="search_btn">
				<div class="search_content">
					<span>收支类型</span>
					<div class="width-120">
					  <el-select v-model="form.is_payment" placeholder="请选择">
					    <el-option
					      v-for="item in is_paymentOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>账号类型</span>
					<div class="width-120">
					  <el-select v-model="form.pay_code" placeholder="请选择">
					    <el-option
					      v-for="item in pay_codeOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>收支项目</span>
					<div class="width-120">
						<el-input v-model="form.payment_sn" placeholder="收支项目"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>支付流水号</span>
					<div class="width-120">
						<el-input v-model="form.serial_number" placeholder="支付流水号"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>收支明细</span>
					<div class="width-120">
					  <el-select v-model="form.payment_type" placeholder="请选择">
					    <el-option
					      v-for="item in payment_typeOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
					<picker style="float:left;margin-bottom:10px;" :sTime="sTime" :eTime="eTime" @onPassByVal="getTime" :title="titles"></picker>
					<el-button style="float:left;margin-left:10px;" type="primary" @click="searchListData()">查询</el-button>
			</div>
			<div class="record">
			   <el-tabs v-model="activeName" @tab-click="handleClick">
			   	<span v-for="item in searchList">
			    	<el-tab-pane :label="item.label" :name="item.time"></el-tab-pane>
			   	</span>
			    <!--<el-tab-pane label="昨日" name="second"></el-tab-pane>
			    <el-tab-pane label="本周" name="third"></el-tab-pane>
			    <el-tab-pane label="本月" name="fourth"></el-tab-pane>
			    <el-tab-pane label="其他时间" name="five"></el-tab-pane>
			    <el-tab-pane label="总计" name="six"></el-tab-pane>-->
			  </el-tabs>
			</div>
			<div class="account_cash">
				<ul class="list">
					<li>
						<div class="title">收入</div>
						<div class="cash">¥{{incomeExpenditure.income}}</div>
					</li>
					<li>
						<div class="title">支出</div>
						<div class="cash">¥{{incomeExpenditure.expense}}</div>
					</li>
				</ul>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="balance_payment_id"
				      label="ID">
				    </el-table-column>
				    <el-table-column
				      prop="payment_sn"
				      label="收支项目">
				    </el-table-column>
				    <el-table-column
				      prop="payment_type_name"
				      label="收支明细">
				    </el-table-column>
				    <el-table-column
				      prop="is_payment_name"
				      label="收支类型">
				    </el-table-column>
				    <el-table-column
				      prop="serial_number"
				      label="支付流水号">
				    </el-table-column>
				    <el-table-column
				      prop="price"
				      label="金额(元)">
				    </el-table-column>
				    <el-table-column
				      prop="pay_name"
				      label="支付方式">
				    </el-table-column>
				    <el-table-column
				      prop="add_username"
				      label="操作人">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="创建时间">
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
<el-dialog title="修改库存" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="商品库存" :label-width="formLabelWidth">
      <el-input v-model="form.store_count" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editStoreCountFun()">确 定</el-button>
  </div>
</el-dialog>

<el-dialog
  title="修改商户审核状态"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="warp_dialog">
  	  <el-radio v-model="radio" label="0">待审核</el-radio>
  	  <el-radio v-model="radio" label="1">已审核</el-radio>
  	  <el-radio v-model="radio" label="2">审核拒绝</el-radio>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="examineDataFun()">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import account from '../../js/account.js';
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';
 export default {
   data () {
     return {
     	sTime:'',
     	eTime:'',
     	titles:'日期',
		currentPage:1,
		totals:0,
		pageSize:10,
     	searchList:[],
     	is_paymentOptions:[],
     	pay_codeOptions:[],
     	payment_typeOptions:[],
     	incomeExpenditure:{},
     	form:{
			payment_type:'',
			is_payment:'',
			payment_sn:'',
			serial_number:'',
			pay_code:'',
			add_time_start:'',
			add_time_end:'',
     	},
      activeNameExpenditure:"statementIncomeExpenditure",
     	activeName: '/',
     	the_raise:[],
     	is_special:[],
     	is_on_sale:[],
     	haitao_cat:[],
     	goodstatus:[],
     	exclusive_cat:[],
     	selectedOptions2:[],
     	radio:'0',
     	dialogVisible:false,
     	nameStr:'',
     	rowData:{
     		store_count:0
     	},
     	formLabelWidth:'100px',
     	dialogFormVisible:false,
     	 tableData: [],
     	input:'',
     	value:'',
     	options:[
     		{label:'',
     		name:''}
     	],
     	optionsCategory:[],
		content_title:{
			title1: "收支报表",
			title2: "",
			path1:'/home/accountManagement/income',
			path2:''
		}
     }
   },
   created(){
   		/* 商品列表 goods/list */
		var data = {
			payment_type:this.form.payment_type,
			is_payment:this.form.is_payment,
			payment_sn:this.form.payment_sn,
			serial_number:this.form.serial_number,
			pay_code:this.form.pay_code,
			add_time_start:this.form.add_time_start,
			add_time_end:this.form.add_time_end,
			page:this.currentPage,
			rows:this.pageSize
		}
		account.BalancepaymentList("Balancepayment/list",data,this);
		account.searchConf("Balancepayment/searchConf",this);
		account.countInfo("Balancepayment/countInfo",data,this);
   },
   components: {
		breadcrumb,picker
   },
   methods:{
   	getTime(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.add_time_start = msg[0];
	   			this.form.add_time_end = msg[1];
	        }else{
	   			this.form.add_time_start = '';
	   			this.form.add_time_end = '';
	        }
        }else{
	   			this.form.add_time_start = '';
	   			this.form.add_time_end = '';
        }
   	},
	searchListData(){
	   	var data = {
			payment_type:this.form.payment_type,
			is_payment:this.form.is_payment,
			payment_sn:this.form.payment_sn,
			serial_number:this.form.serial_number,
			pay_code:this.form.pay_code,
			add_time_start:this.form.add_time_start,
			add_time_end:this.form.add_time_end,
			page:this.currentPage,
			rows:this.pageSize
		}
		account.BalancepaymentList("Balancepayment/list",data,this);
		account.countInfo("Balancepayment/countInfo",data,this);
	},
	handleClick(tab, event) {
		var str = tab.name;
	    if(str!='/'){
	    	var msg = str.split('/')
    		this.sTime = msg[0];
   			this.eTime = msg[1];
		    var data = {
				payment_type:this.form.payment_type,
				is_payment:this.form.is_payment,
				payment_sn:this.form.payment_sn,
				serial_number:this.form.serial_number,
				pay_code:this.form.pay_code,
				add_time_start:msg[0],
				add_time_end:msg[1],
				page:this.currentPage,
				rows:this.pageSize
			}
			account.BalancepaymentList("Balancepayment/list",data,this);
		    account.countInfo("Balancepayment/countInfo",data,this);
	    }else{
	    	this.sTime = '';
   			this.eTime = '';
   			var data = {
				payment_type:this.form.payment_type,
				is_payment:this.form.is_payment,
				payment_sn:this.form.payment_sn,
				serial_number:this.form.serial_number,
				pay_code:this.form.pay_code,
				add_time_start:'',
				add_time_end:'',
				page:this.currentPage,
				rows:this.pageSize
			}
			account.BalancepaymentList("Balancepayment/list",data,this);
		    account.countInfo("Balancepayment/countInfo",data,this);
	    }
	},
	entryDetail(id){
		this.$router.push({name:'list_of_goods_detail',query:{id:id}})
	},
	handleCurrentChange(val) {
		var data = {
			payment_type:this.form.payment_type,
			is_payment:this.form.is_payment,
			payment_sn:this.form.payment_sn,
			serial_number:this.form.serial_number,
			pay_code:this.form.pay_code,
			add_time_start:this.form.add_time_start,
			add_time_end:this.form.add_time_end,
			page:val,
			rows:this.pageSize
		}
		account.BalancepaymentList("Balancepayment/list",data,this);
	}
   }
 }
</script>
