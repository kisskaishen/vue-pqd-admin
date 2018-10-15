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
					账户管理123
				</span>
			</div>
			<div class="account_cash">
				<ul class="list">
					<li>
						<div class="title">销售总收入</div>
						<div class="cash">¥{{statistics1.total_receivable_money}}</div>
					</li>
					<li>
						<div class="title">退款总计</div>
						<div class="cash">¥{{statistics2.total_return_money}}</div>
					</li>
				</ul>
			</div>
			<div class="item_detail">
				<div class="title">
					<div class="tits">账户记录</div>
				</div>
			</div>
			<div class="record">
			  <el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="订单记录" name="first">
					<div class="search_btn">
						<div class="search_content">
							<span>交易状态</span>
							<div class="width-120">
								  <el-select v-model="form.trading_status" placeholder="全部">
								    <el-option
								      v-for="item in the_raiseOption"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
							</div>
						</div>
						<div class="search_content">
							<span>交易用户</span>
							<div class="width-120">
								<el-input v-model="form.nickname" placeholder="交易用户"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>商家名称</span>
							<div class="width-120">
								<el-input v-model="form.merchant_name" placeholder="商户名"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>商家ID</span>
							<div class="width-120">
								<el-input v-model="form.merchant_id" placeholder="商品ID"></el-input>
							</div>
						</div>
						<!--<div class="search_content">
							<span>交易方式</span>
							<div class="width-120">
							  <el-select v-model="form.pay_type" placeholder="全部">
							    <el-option
							      v-for="item in is_on_saleOption"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
							</div>
						</div>-->
						<div class="search_content">
							<span>订单编号</span>
							<div class="width-120">
								<el-input v-model="form.order_sn" placeholder="订单编号"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>流水号</span>
							<div class="width-120">
								<el-input v-model="form.serial_number" placeholder="流水号"></el-input>
							</div>
						</div>
						<!--<div class="search_content">-->
							<datepick title="日期" :sTime="sTime"  :eTime="eTime"  @onPassByVal='getTimeOrder'></datepick>
							<!--<picker :sTime="sTime" :eTime="eTime" @onPassByVal="getTimeOrder" :title="titles"></picker>-->
						<!--</div>-->
						<div class="search_content">
							<el-button type="primary" @click="searchListDataFirst()">查询</el-button>
						</div>
					</div>
					<div class="account_cash" style="color:red">
						注：查询时间最长为180天(如：2018年1月1日-2018年6月30日)
					</div>
					<!--<div class="account_cash">
						<ul class="list_3">
							<li>
								<div class="title">销售总收入</div>
								<div class="cash">¥{{statistics1.total_amount}}</div>
							</li>
							<li>
								<div class="title">平台优惠券总计</div>
								<div class="cash">¥{{statistics1.total_pqd_coupon_money}}</div>
							</li>
							<li>
								<div class="title">销售实际总收入</div>
								<div class="cash">¥{{statistics1.total_sales_money}}</div>
							</li>
						</ul>
					</div>-->
					<div class="table_list">
						  <el-table
						    :data="tableData1"
						    border
						    style="width: 100%">
						    <el-table-column
						      prop="order_sn"
						      label="订单编号">
						    </el-table-column>
						    <el-table-column
						      prop="serial_number"
						      label="流水号">
						    </el-table-column>
						    <el-table-column
						      prop="trading_type"
						      label="交易类型">
						    </el-table-column>
						    <el-table-column
						      prop="merchant_id"
						      label="商家ID">
						    </el-table-column>
						    <el-table-column
						      prop="merchant_name"
						      label="交易商家">
						    </el-table-column>
						    <el-table-column
						      prop="pay_type"
						      label="交易方式">
						    </el-table-column>
						    <el-table-column
						      prop="total_amount"
						      label="交易金额(元)">
						    </el-table-column>
						    <el-table-column
						      prop="pqd_coupon_price"
						      label="优惠金额(元)">
						    </el-table-column>
						    <el-table-column
						      prop="order_amount"
						      label="实际支付(元)">
						    </el-table-column>
						    <el-table-column
						      prop="trading_status"
						      label="交易状态">
						    </el-table-column>
						    <el-table-column
						      prop="add_time"
						      label="交易时间">
						    </el-table-column>
						    <!--<el-table-column
						      label="操作">
						      <template slot-scope="scope">
						        <el-button type="text" size="small" @click="entryDetail5(scope.row,'order')">查看</el-button>
						      </template>
						    </el-table-column>-->
						  </el-table>
					       <div class="pagination" v-show="totals1!=0">
					        <el-pagination
					          @current-change="handleCurrentChange1"
					          :current-page="currentPage1"
					          :page-size = 'pageSize'
					          layout="total, prev, pager, next, jumper"
					          :total='totals1'>
					        </el-pagination>
					      </div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="退款记录" name="second">
				<div class="search_btn">
					<div class="search_content">
						<span>交易状态</span>
						<div class="width-120">
							  <el-select v-model="form2.trading_status" placeholder="全部">
							    <el-option
							      v-for="item in the_raiseOptionReturn"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
						</div>
					</div>
					<div class="search_content">
						<span>交易商家</span>
						<div class="width-120">
							<el-input v-model="form2.store_name" placeholder="商户名"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>商家ID</span>
						<div class="width-120">
							<el-input v-model="form2.store_id" placeholder="商品ID"></el-input>
						</div>
					</div>
					<!--<div class="search_content">
						<span>交易方式</span>
						<div class="width-120">
						  <el-select v-model="form.is_on_sale" placeholder="全部">
						    <el-option
						      v-for="item in is_on_saleOption"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						</div>
					</div>-->
					<div class="search_content">
						<span>退款编号</span>
						<div class="width-120">
							<el-input v-model="form2.return_sn" placeholder="退款编号"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>订单编号</span>
						<div class="width-120">
							<el-input v-model="form2.order_sn" placeholder="订单编号"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>流水号</span>
						<div class="width-120">
							<el-input v-model="form2.serial_number" placeholder="流水号"></el-input>
						</div>
					</div>
						<!--<div class="search_content">-->
        					<datepick title="日期：" :sTime="sTime"  :eTime="eTime"  @onPassByVal='getTimerefund'></datepick>
							<!--<picker :sTime="sTime" :eTime="eTime" @onPassByVal="getTimerefund" :title="titles"></picker>-->
						<!--</div>-->
					<div class="search_content">
						<el-button type="primary" @click="searchListDataSecond()">查询</el-button>
					</div>
				</div>
					<div class="account_cash" style="color:red">
						注：查询时间最长为180天(如：2018年1月1日-2018年6月30日)
					</div>
				<!--<div class="account_cash">
					<ul class="list">
						<li>
							<div class="title">退款金额</div>
							<div class="cash">¥{{statistics2.totalCouponPrice}}</div>
						</li>
						<li>
							<div class="title">退款优惠券金额</div>
							<div class="cash">¥{{statistics2.totalReturnMoney}}</div>
						</li>
					</ul>
				</div>-->
				<div class="table_list">
						  <el-table
						    :data="tableData2"
						    border
						    style="width: 100%">
						    <el-table-column
						      prop="return_sn"
						      label="退款编号">
						    </el-table-column>
						    <el-table-column
						      prop="order_sn"
						      label="订单编号">
						    </el-table-column>
						    <el-table-column
						      prop="serial_number"
						      label="流水号">
						    </el-table-column>
						    <el-table-column
						      prop="trading_type"
						      label="交易类型">
						    </el-table-column>
						    <el-table-column
						      prop="merchant_id"
						      label="商家ID">
						    </el-table-column>
						    <el-table-column
						      prop="merchant_name"
						      label="交易商家">
						    </el-table-column>
						    <el-table-column
						      prop="pay_name"
						      label="交易方式">
						    </el-table-column>
						    <el-table-column
						      prop="return_money"
						      label="退款金额(元)">
						    </el-table-column>
						    <el-table-column
						      prop="pqd_coupon_price"
						      label="优惠金额(元)">
						    </el-table-column>
						    <el-table-column
						      prop="trading_status"
						      label="交易状态">
						    </el-table-column>
						    <el-table-column
						      prop="add_time"
						      label="创建时间">
						    </el-table-column>
						    <!--<el-table-column
						      label="操作">
						      <template slot-scope="scope">
						        <el-button type="text" size="small" @click="entryDetail5(scope.row,'return')">查看</el-button>
						      </template>
						    </el-table-column>-->
						  </el-table>
					       <div class="pagination" v-show="totals2!=0">
					        <el-pagination
					          @current-change="handleCurrentChange2"
					          :current-page="currentPage2"
					          :page-size = 'pageSize'
					          layout="total, prev, pager, next, jumper"
					          :total='totals2'>
					        </el-pagination>
					      </div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="提现记录" name="third">
				<div class="search_btn">
					<div class="search_content">
						<span>提现状态</span>
						<div class="width-120">
							  <el-select v-model="forwardForm.status" placeholder="全部">
							    <el-option
							      v-for="item in the_raiseOptionPresent"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
						</div>
					</div>
					<div class="search_content">
						<span>提现账号</span>
						<div class="width-120">
							<el-input v-model="forwardForm.withdrawal_code" placeholder="提现账号"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>提现商家</span>
						<div class="width-120">
							<el-input v-model="forwardForm.merchant_name" placeholder="提现商家"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>商家ID</span>
						<div class="width-120">
							<el-input v-model="forwardForm.merchant_id" placeholder="商品ID"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>支付流水号</span>
						<div class="width-120">
							<el-input v-model="forwardForm.serial_number" placeholder="支付流水号"></el-input>
						</div>
					</div>
						<!--<div class="search_content">-->
        					<datepick title="日期：" :sTime="sTime"  :eTime="eTime"  @onPassByVal='getTimeforward'></datepick>
							<!--<picker :sTime="sTime" :eTime="eTime" @onPassByVal="getTimeforward" :title="titles"></picker>-->
						<!--</div>-->
					<div class="search_content">
						<el-button type="primary" @click="searchListDataThird()">查询</el-button>
					</div>
				</div>
					<div class="account_cash" style="color:red">
						注：查询时间最长为180天(如：2018年1月1日-2018年6月30日)
					</div>
				<!--<div class="account_cash">
					<ul class="list_3">
						<li>
							<div class="title">已提现金额</div>
							<div class="cash">¥{{statistics3.use_withdraw_money}}</div>
						</li>
						<li>
							<div class="title">提现待审核金额</div>
							<div class="cash">¥{{statistics3.wait_audit_money}}</div>
						</li>
						<li>
							<div class="title">剩余可提现金额</div>
							<div class="cash">¥{{statistics3.surplus_money}}</div>
						</li>
					</ul>
				</div>-->
					<div class="table_list">
						  <el-table
						    :data="tableData3"
						    border
						    style="width: 100%">
						    <el-table-column
						      prop="serial_number"
						      label="提现编号">
						    </el-table-column>
						    <el-table-column
						      prop="merchant_id"
						      label="商家ID">
						    </el-table-column>
						    <el-table-column
						      prop="merchant_name"
						      label="提现商家">
						    </el-table-column>
						    <el-table-column
						      prop="withdrawal_code"
						      label="提现账号">
						    </el-table-column>
						    <el-table-column
						      prop="withdrawal_name"
						      label="提现账号名称">
						    </el-table-column>
						    <el-table-column
						      prop="withdrawal_money"
						      label="提现金额(元)">
						    </el-table-column>
						    <el-table-column
						      prop="status"
						      label="提现状态">
						    </el-table-column>
						    <el-table-column
						      prop="add_time"
						      label="提现申请时间">
						    </el-table-column>
						    <el-table-column
						      prop="audit_time"
						      label="提现审核时间">
						    </el-table-column>
						    <!--<el-table-column
						      label="操作">
						      <template slot-scope="scope">
						        <el-button type="text" size="small" @click="entryDetail5(scope.row,withdrawal)">查看</el-button>
						      </template>
						    </el-table-column>-->
						  </el-table>
					       <div class="pagination" v-show="totals3.length!=0">
					        <el-pagination
					          @current-change="handleCurrentChange3"
					          :current-page="currentPage3"
					          :page-size = 'pageSize'
					          layout="total, prev, pager, next, jumper"
					          :total='totals3'>
					        </el-pagination>
					      </div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="罚款记录" name="fourth">
					<div class="search_btn">
						<div class="search_content">
							<span>状态</span>
							<div class="width-120">
								  <el-select v-model="form4.status" placeholder="全部">
								    <el-option
								      v-for="item in store_status"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
							</div>
						</div>
						<div class="search_content">
							<span>违规类型</span>
							<div class="width-120">
								  <el-select v-model="form4.type" placeholder="全部">
								    <el-option
								      v-for="item in store_type"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
							</div>
						</div>
						<div class="search_content">
							<span>订单编号</span>
							<div class="width-120">
								<el-input v-model="form4.order_sn" placeholder="订单编号"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>商户名称</span>
							<div class="width-120">
								<el-input v-model="form4.store_name" placeholder="商户名称"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>商户id</span>
							<div class="width-120">
								<el-input v-model="form4.store_id" placeholder="所属商户"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>违规编号</span>
							<div class="width-120">
								<el-input v-model="form4.punishment_sn" placeholder="违规编号"></el-input>
							</div>
						</div>
						<!--<div class="search_content">-->
        					<datepick title="日期：" :sTime="sTime"  :eTime="eTime"  @onPassByVal='getTime'></datepick>
							<!--<picker :sTime="sTime" :eTime="eTime" @onPassByVal="getTime" :title="titles"></picker>-->
						<!--</div>-->
						<div class="search_content">
							<el-button type="primary" @click="searchListDataFourth()">查询</el-button>
						</div>
					</div>
					<div class="account_cash" style="color:red">
						注：查询时间最长为180天(如：2018年1月1日-2018年6月30日)
					</div>
					<!--<div class="account_cash">
						<ul class="list_3">
							<li>
								<div class="title">罚款总计</div>
								<div class="cash">¥{{total_punish_price}}</div>
							</li>
						</ul>
					</div>-->
					<div class="table_list">
						  <el-table
						    :data="Storepunishment"
						    border
						    style="width: 100%">
						    <el-table-column
						      prop="punishment_sn"
						      label="违规编号">
						    </el-table-column>
						    <el-table-column
						      prop="store_id"
						      label="商家ID">
						    </el-table-column>
						    <el-table-column
						      prop="store_name"
						      label="违规商家">
						    </el-table-column>
						    <el-table-column
						      prop="order_sn"
						      label="订单编号">
						    </el-table-column>
						    <el-table-column
						      prop="reason"
						      label="惩罚理由">
						    </el-table-column>
						    <el-table-column
						      prop="sp_penal_sum"
						      label="惩罚金额(元)">
						    </el-table-column>
						    <el-table-column
						      prop="admin_name"
						      label="处理人">
						    </el-table-column>
						    <el-table-column
						      prop="datetime"
						      label="处理时间">
						    </el-table-column>
						    <el-table-column
						      prop="status_name"
						      label="状态">
						    </el-table-column>
						    <!--<el-table-column
						      label="操作">
						      <template slot-scope="scope">
						        <el-button type="text" size="small" @click="entryDetail5(scope.row,'punishment')">查看</el-button>
						      </template>
						    </el-table-column>-->
						  </el-table>
					       <div class="pagination">
					        <el-pagination
					          @current-change="handleCurrentChange4"
					          :current-page="currentPage4"
					          :page-size = 'pageSize'
					          layout="total, prev, pager, next, jumper"
					          :total='totals4'>
					        </el-pagination>
					      </div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="保证金" name="five">
					<div class="search_btn">
						<div class="search_content">
							<span>交易方式</span>
							<div class="width-120">
								  <el-select v-model="storedepositForm.pay_code" placeholder="全部">
								    <el-option
								      v-for="item in status_typeOption"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
							</div>
						</div>
						<div class="search_content">
							<span>交易编号</span>
							<div class="width-120">
								<el-input v-model="storedepositForm.order_sn" placeholder="交易编号"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>商家ID</span>
							<div class="width-120">
								<el-input v-model="storedepositForm.store_id" placeholder="商家ID"></el-input>
							</div>
						</div>
						<div class="search_content">
							<span>店铺名称</span>
							<div class="width-120">
								<el-input v-model="storedepositForm.store_name" placeholder="店铺名称"></el-input>
							</div>
						</div>
						<!--<div class="search_content">-->
        					<datepick title="日期：" :sTime="sTime"  :eTime="eTime"  @onPassByVal='getTimeStoredeposit'></datepick>
							<!--<picker @onPassByVal="getTimeStoredeposit" :title="titles"></picker>-->
						<!--</div>-->
						<div class="search_content">
							<el-button type="primary" @click="searchListDataFive()">查询</el-button>
						</div>
					</div>
					<div class="account_cash" style="color:red">
						注：查询时间最长为180天(如：2018年1月1日-2018年6月30日)
					</div>
					<!--<div class="account_cash">
						<ul class="list_3">
							<li>
								<div class="title">保证金总计</div>
								<div class="cash">¥{{total_deposit_price}}</div>
							</li>
						</ul>
					</div>-->
					<div class="table_list">
						  <el-table
						    :data="StoredepositData"
						    border
						    style="width: 100%">
						    <el-table-column
						      prop="txt_sn"
						      label="流水号">
						    </el-table-column>
						    <el-table-column
						      prop="store_id"
						      label="商家ID">
						    </el-table-column>
						    <el-table-column
						      prop="store_name"
						      label="店铺名称">
						    </el-table-column>
						    <el-table-column
						      prop="company_user_name"
						      label="店铺联系人">
						    </el-table-column>
						    <el-table-column
						      prop="show_ower_mobile"
						      label="店铺联系电话">
						    </el-table-column>
						    <el-table-column
						      prop="pay_name"
						      label="交易方式">
						    </el-table-column>
						    <el-table-column
						      prop="price"
						      label="缴纳金额(元)">
						    </el-table-column>
						    <el-table-column
						      prop="status_name"
						      label="交易状态">
						    </el-table-column>
						    <el-table-column
						      prop="updated_at"
						      label="交易时间">
						    </el-table-column>
						    <el-table-column
						      prop="updated_at"
						      label="备注">
						    </el-table-column>
						    <!--<el-table-column
						      label="操作">
						      <template slot-scope="scope">
						        <el-button type="text" size="small" @click="entryDetail5(scope.row)">查看</el-button>
						      </template>
						    </el-table-column>-->
						  </el-table>
					       <div class="pagination">
					        <el-pagination
					          @current-change="handleCurrentChange5"
					          :current-page="currentPage5"
					          :page-size = 'pageSize'
					          layout="total, prev, pager, next, jumper"
					          :total='totals5'>
					        </el-pagination>
					      </div>
					</div>
			    </el-tab-pane>
			  </el-tabs>
			</div>
		</div>
	</div>
<el-dialog
  :title="titlesDialog"
  :visible.sync="dialogVisible"
  width="80%">
<div class="list_info">
	<div class="list_info_item">
		<div class="title">店铺信息</div>
		<div class="content">
			<span>店铺名称：{{order_storeInfo.store_name}}</span>
			<span>店铺联系人：{{order_storeInfo.show_ower_name}}</span>
			<span>店铺联系电话：{{order_storeInfo.show_ower_mobile}}</span>
		</div>
	</div>
	<div class="list_info_item">
		<div class="title">订单信息</div>
		<div class="content">
			<span>订单编号：{{order_orderInfo.order_sn}}</span>
			<span>下单时间：{{order_orderInfo.add_time}}</span>
			<span>成单时间：{{order_orderInfo.success_time}}</span>
			<span>支付方式：{{order_orderInfo.pay_name}}</span>
			<span>支付时间：{{order_orderInfo.pay_time}}</span>
			<span>发货时间：{{order_orderInfo.delivery_time}}</span>
		</div>
	</div>
	<div class="order_detail_table">
		<div class="current_system">
			<div class="warp">
				<table class="show_list_table" border="0" cellspacing="" cellpadding="">
					<tbody>
						<tr>
							<td>商品名称：</td>
							<td>规格属性：</td>
							<td>商品单价(元)：</td>
							<td>数量：</td>
							<td>优惠：</td>
							<td>类型：</td>
							<td>订单状态：</td>
							<td>商品总价(元)：</td>
						</tr>
						<tr>
							<td>{{order_goodsInfo.goods_name}}</td>
							<td>{{order_goodsInfo.spec_key_name}}</td>
							<td>{{order_goodsInfo.goods_price}}</td>
							<td>{{order_goodsInfo.goods_num}}</td>
							<td>{{order_goodsInfo.coupon_price}}</td>
							<td>{{order_goodsInfo.order_type}}</td>
							<td>{{order_goodsInfo.order_status}}</td>
							<td>{{order_goodsInfo.total_amount}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="list_info_item" v-show="order_logisticInfo!=''">
		<div class="title">物流信息</div>
		<div class="content">
			<span>物流单号：{{order_logisticInfo.logistics_order_sn}}</span>
		</div>
		<div class="content">
			<span>物流公司：{{order_logisticInfo.logistics_name}}</span>
		</div>
		<div class="content">
			<span>收货人：{{order_logisticInfo.consignee}}（{{order_logisticInfo.mobile}}）</span>
		</div>
		<div class="content">
			<span>物流地址：{{order_logisticInfo.address}}</span>
		</div>
	</div>
</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import Account from '../../js/account.js';
import breadcrumb from '../../components/breadcrumb';
//import picker from '../../components/picker';
import datepick from '../../components/datepick.vue';
 export default {
   data () {
     return {
     	status_typeOption:[],
     	titlesDialog:'订单详情',
     	order_goodsInfo:{
     	},
     	order_logisticInfo:{
     	},
     	order_orderInfo:{
     	},
     	order_storeInfo:{
     	},
     	the_raiseOptionPresent:[],
     	the_raiseOptionReturn:[],
     	store_status:[],
     	store_type:[],
     	total_expenses_money:'',
     	total_sales_money:'',
        refundForm:{
            trading_status: '',
            store_name:'',
            store_id: '',
            pay_type: '',
            serial_number:'',
            order_sn: '',
            return_Sn:'',
            start_time: '',
            stop_time: '',
            is_export: '',
        },
        forwardForm:{
			serial_number:'',
			withdrawal_code:'',
			merchant_id:'',
			status:'',
			audit_start_time:'',
			audit_stop_time:'',
        },
        tableData3:[],
     	tableData2:[],
     	tableData1:[],
     	statistics3:{},
     	statistics2:{
     		total_return_money:0
     	},
     	statistics1:{
     		total_receivable_money:0
     	},
		pageSize:10,
		currentPage1:1,
		totals1:0,
		currentPage2:1,
		totals2:0,
		currentPage3:1,
		totals3:0,
		currentPage4:1,
		totals4:0,
		currentPage5:1,
		totals5:0,
     	titles:'日期',
     	eTime:'',
     	sTime:'',
     	the_raiseOption:[],
     	is_on_saleOption:[],
     	activeName: 'first',//  five   fourth   first   second  third
     	dialogVisible:false,
     	storedepositForm:{
 			store_id:'',
			store_name:'',
			order_sn:'',
			status:'',
			created_at_start:'',
			created_at_end:'',
     	},
     	is_export:'',
     	form2:{
 			trading_status:'',
			store_name:'',
			store_id:'',
			return_sn:'',
			order_sn:'',
			serial_number:'',
     	},
     	form4:{
			status:'',
			store_name:'',
			type:'',
			store_id:'',
			punishment_sn:'',
 			trading_status:'',
			nickname:'',
			serial_number:'',
			pay_type:'',
			order_sn:'',
			datetime_start:'',
			datetime_end:'',
     	},
     	form:{
     		serial_number:'',
			the_raise:'',
			is_on_sale:'',
			wait_audit:'',//待审核
			pass_audit:'',//已审核待支付
			remittance:'',//已汇款
			wait_pay_withdrawal:'',//待提现金额
			punishment_sn:'',//罚款记录
			order_sn:'',
			store_id:'',
			type:'',
			datetime_start:'',
			datetime_end:'',
			store_name:'',
			status:'',
     	},
     	formLabelWidth:'100px',
     	dialogFormVisible:false,
     	storePaymentOrderListData:[],
     	total_punish_price:'',
     	Storepunishment:[],
     	total_deposit_price:'',
     	StoredepositData:[],
     	orderServiceListData:[],//退款
     	tableData: [],
     	options:[
     		{label:'',
     		name:''}
     	],
     	optionsCategory:[],
		content_title:{
			title1: "账户管理",
			title2: "",
			path1:'/home/accountManagement/account',
			path2:''
		}
     }
   },
   created(){
		this.setTime();
   		/*订单记录状态*/
        Account.orderTransactionStatus('Fundmanagement/orderTransactionStatus',this)
		Account.returnStatus('Fundmanagement/returnStatus',this);
		Account.withdrawalAuditStatus('Fundmanagement/withdrawalAuditStatus',this);
		Account.storeSearchConf('Storepunishment/searchConf',this);
		Account.StoredepositSearchConf('Storedeposit/searchConf',this);
		// Withdraw/withdrawalList
		if(this.activeName=='first'){
			this.getlist1()
		}else if(this.activeName=='second'){
			this.getlist2()
		}else if(this.activeName=='third'){
			this.getlist3()
		}else if(this.activeName=='fourth'){
			this.getlist4()
		}else if (this.activeName=='five'){
			this.getlist5()
		}
   },
   components: {
		breadcrumb,datepick
   },
   methods:{
	setTime(){
    	var currentData = new Date();
    	var longTime = new Date(new Date()-7*24*60*60*1000);

    	var yearCurrent = currentData.getFullYear();
		var monthCurrent = currentData.getMonth() + 1;
		var dayCurrent = currentData.getDate();

    	var yearLongTime = longTime.getFullYear();
		var monthLongTime = longTime.getMonth() + 1;
		var dayLongTime = longTime.getDate();

		var monthCurr = monthCurrent > 9 ? monthCurrent : "0"+monthCurrent;
		var daysCurr = dayCurrent > 9 ? dayCurrent : "0"+dayCurrent;

		var monthLong = monthLongTime > 9 ? monthLongTime : "0"+monthLongTime;
		var daysLong = dayLongTime > 9 ? dayLongTime : "0"+dayLongTime;

		var strDate = yearLongTime + '-' + monthLong + '-'+dayLongTime;
		var strDateCurrent = yearCurrent + '-' + monthCurr +'-'+daysCurr;

		this.sTime = strDate;
		this.eTime = strDateCurrent;

		this.form.start_time = strDate;
		this.form.stop_time = strDateCurrent;

		this.form2.datetime_start = strDate;
		this.form2.datetime_end = strDateCurrent;

		this.forwardForm.audit_start_time = strDate;
		this.forwardForm.audit_stop_time = strDateCurrent;

		this.form4.datetime_start = strDate;
		this.form4.datetime_end = strDateCurrent;

		this.storedepositForm.created_at_start = strDate;
		this.storedepositForm.created_at_end = strDateCurrent;
	},
   	checkTime(start_time,stop_time){
		var str = start_time;
		var stramp = new Date(str).getTime();
		var str1 = stop_time;
		var stramp1 = new Date(str1).getTime();
		if(stramp1-stramp>180*24*60*60*1000){
			this.$message({
				type:'info',
				message:'查询范围为180天之内'
			})
			return false
		}else if(stramp1-stramp<0){
			this.$message({
				type:'info',
				message:'截止时间不能小于开始时间'
			})
			return false
		}else{
			return true
		}
   	},
   	getlist1(val){
   		var flag = this.checkTime(this.form.start_time,this.form.stop_time);
   		if(flag){
			var data = {
				trading_status:this.form.trading_status,
				nickname:this.form.nickname,
				serial_number:this.form.serial_number,
				merchant_name:this.form.merchant_name,
				merchant_id:this.form.merchant_id,
				pay_type:this.form.pay_type,
				order_sn:this.form.order_sn,
				start_time:this.form.start_time,
				stop_time:this.form.stop_time,
				is_export:this.is_export,
				page:val?val:this.currentPage1,
				rows:this.pageSize,
			}
			Account.storePaymentOrderList('Fundmanagement/storePaymentOrderList',data,this);
   		}
   	},
   	getlist2(val){
   		var flag = this.checkTime(this.form2.datetime_start,this.form2.datetime_end);
   		if(flag){
			var data = {
				trading_status:this.form2.trading_status,
				store_name:this.form2.store_name,
				store_id:this.form2.store_id,
				pay_type:this.form2.pay_type,
				serial_number:this.form2.serial_number,
				order_sn:this.form2.order_sn,
				return_Sn:this.form2.return_sn,
				start_time:this.form2.datetime_start,
				stop_time:this.form2.datetime_end,
				is_export:this.is_export,
				page:val?val:this.currentPage2,
				rows:this.pageSize,
			}
			Account.orderServiceList('Fundmanagement/orderServiceList',data,this);
   		}
   	},
   	getlist3(val){
   		var flag = this.checkTime(this.forwardForm.audit_start_time,this.forwardForm.audit_stop_time);
   		if(flag){
			var data = {
				serial_number: this.forwardForm.serial_number,
	            withdrawal_code: this.forwardForm.withdrawal_code,
	            merchant_id:this.forwardForm.merchant_id,
	            merchant_name:this.forwardForm.merchant_name,
	            status: this.forwardForm.status,
	            start_time: this.forwardForm.start_time,
	            stop_time: this.forwardForm.stop_time,
	            audit_start_time: this.forwardForm.audit_start_time,
	            audit_stop_time: this.forwardForm.audit_stop_time,
	            is_export: this.is_export,
	            page: val?val:this.currentPage3,
	            rows: this.pageSize,
			}
			Account.withdrawHistory('Fundmanagement/withdrawHistory',data,this);
   		}
   	},
   	getlist4(val){
   		var flag = this.checkTime(this.form4.datetime_start,this.form4.datetime_end);
   		if(flag){
			var data = {
				punishment_sn:this.form4.punishment_sn,
				order_sn:this.form4.order_sn,
				store_id:this.form4.store_id,
				type:this.form4.type,
				datetime_start:this.form4.datetime_start,
				datetime_end:this.form4.datetime_end,
				store_name:this.form4.store_name,
				status:this.form4.status,
				page:val?val:this.currentPage,
				rows:this.pageSize,
			}
			Account.Storepunishment('Storepunishment/list',data,this);
   		}
   	},
   	getlist5(val){
		var data = {
			store_id:this.storedepositForm.store_id,
			store_name:this.storedepositForm.store_name,
			order_sn:this.storedepositForm.order_sn,
			status:this.storedepositForm.status,
			pay_code:this.storedepositForm.pay_code,
			created_at_start:this.storedepositForm.created_at_start,
			created_at_end:this.storedepositForm.created_at_end,
			page:val?val:this.currentPage,
			rows:this.pageSize,
		}
		Account.Storedeposit('Storedeposit/list',data,this);
   	},
   	entryDetail5(params,str){
   		console.log(str)
   		if(str=='order'){
   			this.titlesDialog = "订单详情"
	     	var data = {
	   			order_sn:params.order_sn
	   		}
	   		Account.FundmanagementOrderInfo('Fundmanagement/orderInfo',data,this);
   		}else if(str=='return'){
   			this.titlesDialog = "退款订单详情"
	     	var data = {
	   			return_sn:params.return_sn
	   		}
	   		Account.FundmanagementOrderServiceInfo('Fundmanagement/orderServiceInfo',data,this);
   		}else if(str=='punishment'){
   			this.titlesDialog = "罚款详情"
	     	var data = {
	   			return_sn:params.return_sn
	   		}
	   		Account.FundmanagementOrderServiceInfo('Fundmanagement/orderServiceInfo',data,this);
   		}

   	},
   	searchListDataFive(){
			this.getlist5()
   	},
   	searchListDataThird(){
			this.getlist3()
   	},
   	searchListDataSecond(){
			this.getlist2()
   	},
   	searchListDataFirst(){
			this.getlist1()
   	},
   	searchListDataFourth(){
			this.getlist4()
   	},
   	getTimeStoredeposit(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.storedepositForm.created_at_start = msg[0];
	   			this.storedepositForm.created_at_end = msg[1];
	        }else{
	   			this.storedepositForm.created_at_start = '';
	   			this.storedepositForm.created_at_end = '';
	        }
        }else{
	   			this.storedepositForm.created_at_start = '';
	   			this.storedepositForm.created_at_end = '';
        }
   	},
   	getTimeforward(msg){
   		 if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.forwardForm.audit_start_time = msg[0];
	   			this.forwardForm.audit_stop_time = msg[1];
	        }else{
	   			this.forwardForm.audit_start_time = '';
	   			this.forwardForm.audit_stop_time = '';
	        }
        }else{
	   			this.forwardForm.audit_start_time = '';
	   			this.forwardForm.audit_stop_time = '';
        }
   	},
   	getTimerefund(msg){
   		 if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form2.datetime_start = msg[0];
	   			this.form2.datetime_end = msg[1];
	        }else{
	   			this.form2.datetime_start = '';
	   			this.form2.datetime_end = '';
	        }
        }else{
	   			this.form2.datetime_start = '';
	   			this.form2.datetime_end = '';
        }
   	},
   	getTimeOrder(msg){
   		 if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.start_time = msg[0];
	   			this.form.stop_time = msg[1];
	        }else{
	   			this.form.start_time = '';
	   			this.form.stop_time = '';
	        }
        }else{
	   			this.form.start_time = '';
	   			this.form.stop_time = '';
        }
   	},
   	getTime(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form4.datetime_start = msg[0];
	   			this.form4.datetime_end = msg[1];
	        }else{
	   			this.form4.datetime_start = '';
	   			this.form4.datetime_end = '';
	        }
        }else{
	   			this.form4.datetime_start = '';
	   			this.form4.datetime_end = '';
        }
   	},
      handleClick(tab, event) {
        if(tab.name=='first'){
			this.getlist1()
        }else if(tab.name=='second'){
			this.getlist2()
        }else if(tab.name=='third'){
			this.getlist3()
        }else if(tab.name=='fourth'){
			this.getlist4()
        }else if(tab.name=='five'){
			this.getlist5()
        }
      },
		entryDetail(id){
			this.$router.push({name:'list_of_goods_detail',query:{id:id}})
		},
      handleCurrentChange1(val) {
			this.getlist1(val)
      },
      handleCurrentChange2(val) {
			this.getlist2(val)
      },
      handleCurrentChange3(val) {
			this.getlist3(val)
      },
      handleCurrentChange5(val) {
			this.getlist5(val)
      },
      handleCurrentChange4(val){
			this.getlist4(val)
      }
   }
 }
</script>
