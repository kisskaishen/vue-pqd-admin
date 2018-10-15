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
					  <el-select v-model="store_detail.is_payment" placeholder="请选择">
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
					<span>收支明细</span>
					<div class="width-120">
					  <el-select v-model="store_detail.withdrawal_payment_type" placeholder="请选择">
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
					<span>商家ID</span>
					<div class="width-120">
						<el-input v-model="store_detail.store_id" placeholder="商家ID"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>店铺名称</span>
					<div class="width-120">
						<el-input v-model="store_detail.store_name" placeholder="店铺名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>流水号</span>
					<div class="width-120">
						<el-input v-model="store_detail.payment_sn" placeholder="流水号"></el-input>
					</div>
				</div>
					<picker style="float:left;margin-bottom:10px;" :sTime="sTime" :eTime="eTime" @onPassByVal="getTime" :title="titles"></picker>
					<el-button style="float:left;margin-left:20px;" type="primary" @click="searchListData()">查询</el-button>
			</div>
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
				      label="店铺名称">
				    </el-table-column>
				    <el-table-column
				      prop="payment_sn"
				      label="流水号">
				    </el-table-column>
				    <el-table-column
				      prop="is_payment"
				      label="收支类型">
				    </el-table-column>
				    <el-table-column
				      prop="payment_type"
				      label="收支明细">
				    </el-table-column>
				    <el-table-column
				      prop="price"
				      label="发生金额(元)">
				    </el-table-column>
				    <el-table-column
				      prop="account_balance"
				      label="可提现余额">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="发生时间">
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
</template>

<script>
import account from '../../js/account.js';
import picker from '../../components/picker';
 export default {
   data () {
     return {
       is_paymentOptions:[],
       pay_codeOptions:[],
        currentPage:1,
        totals:0,
        pageSize:10,
        tableData: [],
        sTime:'',
        eTime:'',
        titles:'日期',
        store_detail:{
          store_id:'',
          store_name:'',
          is_payment:'',
          withdrawal_payment_type:'',
          payment_sn:'',
          start_time:'',
          end_time:'',
        }
     }
   },
   created(){
     this.fetch();
       this.config();
   },
   components: {
		  picker
   },
   methods:{
        config(){
            account.storeBalanceSearchStatus("FundManagement/storeBalanceSearchStatus",this);
        },
        fetch(val){
            var data = {
                store_id:this.store_detail.store_id,
                store_name:this.store_detail.store_name,
                is_payment:this.store_detail.is_payment,
                withdrawal_payment_type:this.store_detail.withdrawal_payment_type,
                payment_sn:this.store_detail.payment_sn,
                start_time:this.store_detail.start_time=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?'':this.store_detail.start_time,
                end_time:this.store_detail.end_time=="NaN-0NaN-0NaN 0NaN:0NaN:0NaN"?'':this.store_detail.end_time,
                page:val?val:this.currentPage,
                rows:this.pageSize
            }
            account.storeBalanceHistory("FundManagement/storeBalanceHistory",data,this);
        },
        getTime(msg){
            if(msg!=undefined){
              if(msg[0]!='NaN-0NaN-0NaN'){
                  this.store_detail.start_time = msg[0];
                  this.store_detail.end_time = msg[1];
              }else{
                  this.store_detail.start_time = '';
                  this.store_detail.end_time = '';
              }
            }else{
                this.store_detail.start_time = '';
                this.store_detail.end_time = '';
            }
        },
        searchListData(){
              this.fetch();
        },
        handleCurrentChange(val) {
            this.fetch(val);
        }
   }
 }
</script>
