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
					订单详情
				</span>
			</div>
			<div class="order_detail_list">
				<div class="item_detail" v-show="group_info!=false">
					<div class="title">
						<div class="tits">团购信息</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>团购ID：</td>
											<td>开团时间：</td>
											<td>结束时间：</td>
											<td>商品参团数：</td>
											<td>已下单数：</td>
											<td>团购价格：</td>
											<td>开团人/参团人：</td>
											<td>是否成团：</td>
										</tr>
										<tr>
											<td>
												{{group_info.group_id}}
											</td>
											<td>
												{{group_info.start_time}}
											</td>
											<td>
												{{group_info.end_time}}
											</td>
											<td>
												{{group_info.goods_num}}
											</td>
											<td>
												{{group_info.order_num}}
											</td>
											<td>
												{{group_info.group_price}}
											</td>
											<td>
												{{group_info.group_role}}
											</td>
											<td>
												{{group_info.group_status_name}}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="item_detail">
					<div class="title">
						<div class="tits">订单信息</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>订单ID：</td>
											<td>订单号：</td>
											<td>总计：</td>
											<td>订单状态：</td>
											<td>下单时间：</td>
											<td>支付时间：</td>
											<td>支付方式：</td>
										</tr>
										<tr>
											<td>
												{{order_info.order_id}}
											</td>
											<td>
												{{order_info.order_sn}}
											</td>
											<td>
												{{order_info.total_amount}}
											</td>
											<td>
												{{order_info.order_status_name}}
											</td>
											<td>
												{{order_info.add_time}}
											</td>
											<td>
												{{order_info.pay_time}}
											</td>
											<td>
												{{order_info.pay_name}}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="item_detail">
					<div class="title">
						<div class="tits">收货信息</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>收货人：</td>
											<td>联系方式：</td>
											<td>地址：</td>
											<td>配送方式：</td>
											<td>物流单号：</td>
										</tr>
										<tr>
											<td>
												{{shipping_info.consignee}}
											</td>
											<td>
												{{shipping_info.mobile}}
											</td>
											<td>
												{{shipping_info.full_address}}
											</td>
											<td>
												{{shipping_info.shipping_name}}
											</td>
											<td>
												{{shipping_info.shipping_order}}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="item_detail">
					<div class="title">
						<div class="tits">商品信息</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>商品名称：</td>
											<td>规格：</td>
											<td>数量：</td>
											<td>单品价格：</td>
											<td>单品小计：</td>
										</tr>
										<tr v-for="item in goods_list">
											<td>
												{{item.goods_name}}
											</td>
											<td>
												{{item.spec_key_name}}
											</td>
											<td>
												{{item.goods_num}}
											</td>
											<td>
												{{item.goods_price}}
											</td>
											<td>
												{{item.goods_total_price}}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="item_detail">
					<div class="title">
						<div class="tits">费用信息</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>优惠：</td>
											<td>总计：</td>
										</tr>
										<tr>
											<td>
												{{order_info.coupon_price}}
											</td>
											<td>
												{{order_info.total_amount}}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="item_detail">
					<div class="title">
						<div class="tits">操作信息</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<!--<tr>
											<td>操作备注：</td>
											<td>
												<el-input
												  type="textarea"
												  :autosize="{ minRows: 2, maxRows: 4}"
												  placeholder="请输入内容"
												  v-model="textarea3">
												</el-input>
											</td>
										</tr>-->
										<tr>
											<td>
												当前可执行操作：
											</td>
											<td>
												<!--<el-button type="primary">去发货</el-button>-->
												<el-button type="primary" @click="punishment()">惩罚</el-button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="item_detail">
					<div class="title">
						<div class="tits">操作记录</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>操作者：</td>
											<td>操作时间：</td>
											<td>订单状态：</td>
											<td>付款状态：</td>
											<td>发货状态：</td>
											<td>描述：</td>
											<td>备注：</td>
										</tr>
										<tr v-for="child in action_log">
											<td>
												{{child.admin_username}}
											</td>
											<td>
												{{child.log_time}}
											</td>
											<td>
												{{child.order_status}}
											</td>
											<td>
												{{child.pay_status}}
											</td>
											<td>
												{{child.shipping_status}}
											</td>
											<td>
												{{child.status_desc}}
											</td>
											<td>
												{{child.action_note}}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<el-dialog title="惩罚" :visible.sync="dialogFormVisible">
	  <el-form :model="form">
	    <el-form-item style="margin-bottom:10px;" label="订单编号" :label-width="formLabelWidth">
	      <el-input disabled v-model="form.order_sn" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item style="margin-bottom:10px;" label="商户名" :label-width="formLabelWidth">
	      <el-input disabled v-model="form.good_name" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item style="margin-bottom:10px;" label="下单时间" :label-width="formLabelWidth">
	      <el-input disabled v-model="form.add_time" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item style="margin-bottom:10px;" label="订单金额" :label-width="formLabelWidth">
	      <el-input disabled v-model="form.order_amount" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="惩罚方式" :label-width="formLabelWidth">
	      <el-select style="margin-bottom:10px;" @change="changeType(form.type)" v-model="form.type" placeholder="">
	            <el-option
			      v-for="item in typeOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
	      </el-select>
	      <el-select @change="changeDay(form.day)" style="margin-bottom:10px;" v-show="isShow" v-model="form.day" placeholder="">
	            <el-option
			      v-for="item in dayOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
	      </el-select>
	    </el-form-item>
	    <el-form-item style="margin-bottom:10px;" label="惩罚基数" :label-width="formLabelWidth">
	      <el-input disabled v-model="form.cardinality" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item style="margin-bottom:10px;" label="惩罚金额" :label-width="formLabelWidth">
	      <el-input disabled v-model="form.cash" auto-complete="off"></el-input>
	    </el-form-item>
	    <el-form-item style="margin-bottom:10px;" label="添加备注" :label-width="formLabelWidth">
	      <el-input
			  type="textarea"
			  :rows="2"
			  placeholder="请输入内容"
			  v-model="form.text">
			</el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="punishmentBtn()">确 定</el-button>
	  </div>
	</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import orderList from '../../js/order_list';
 export default {
   data () {
     return {
     	isShow:true,
     	typeOptions:[{
          value: '0',
          label: '延迟发货'
        },{
          value: '1',
          label: '虚假发货'
        },{
          value: '2',
          label: '假货处理'
        },],
     	dayOptions:[{
          value: '1',
          label: '1天'
        },{
          value: '2',
          label: '2天'
        },{
          value: '3',
          label: '3天'
        },{
          value: '4',
          label: '4天'
        },{
          value: '5',
          label: '5天及以上'
        },],
     	formLabelWidth:'100px',
     	form:{
     		day:'1',
     		type:'0',
     		cardinality:'10',
     		cash:'10',
     	},
     	dialogFormVisible:false,
     	action_log:[],
     	goods_list:[],
     	group_info:{},
     	order_info:{},
     	store_info:{},
     	return_info_list:[],
     	shipping_info:{},
     	user_info:{},
     	order_id:'',
     	textarea3:'',
		content_title:{
			title1: "订单列表",
			title2: "",
			path1:'/home/orderManagement/orderList',
			path2:''
		},
		title:''
     }
   },
   created(){
   		this.order_id = this.$route.query.order_id;
   		this.title = this.$route.query.title;
		var data = {
			order_sn:this.order_id
		}
		orderList.orderDetail("order/detail",data,this);
   },
   components: {
		breadcrumb
   },
   methods:{
	   	changeDay(val){
	   		/*延迟发货*/
			this.form.cardinality = 10;
			this.form.cash = val*10;
	   	},
   		changeType(val){
   			if(val!=0){
   				this.isShow = false;
   				if(val=='1'){
					if(this.form.cardinality<50){
	   					this.form.cardinality = 10;
	   					this.form.cash = 10;
					}else if(this.form.cardinality>=50&&this.form.cardinality<100){
	   					this.form.cardinality = 20;
	   					this.form.cash = 20;
					}else if(this.form.cardinality>=100&&this.form.cardinality<300){
	   					this.form.cardinality = 30;
	   					this.form.cash = 30;
					}else{
	   					this.form.cardinality = 40;
	   					this.form.cash = 40;
					}
   				}else if(val=='2'){
   					/*假货罚十*/
   					this.form.cardinality = '10';
   					this.form.cash = this.form.order_amount*10;
   				}
   			}else{
   				this.isShow = true;
   			}
   		},
		punishment(){
			this.form.order_sn = this.order_info.order_sn;
			this.form.good_name = this.store_info.store_name;
			this.form.add_time = this.order_info.add_time;
			this.form.order_amount = this.order_info.order_amount;
			this.dialogFormVisible = true;
		},
		punishmentBtn(){
			/* 惩罚操作  */
			var data = {
				order_sn:this.form.order_sn,
				type:this.form.type,
				day:this.form.day,
				money:this.form.cash,
				text:this.form.text,
			}
			orderList.addPunishment("Store/addPunishment",data,this);
		}
   }
 }
</script>
