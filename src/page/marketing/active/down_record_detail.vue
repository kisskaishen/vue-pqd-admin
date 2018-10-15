<style lang="less" scoped>
@import "../../../less/config.less";
@import "../../../less/business_management/business_listings";
</style>
<template>
 <div class="business_listings">
	<breadcrumb :content="content_title"></breadcrumb>
	<div class="container">
		<div class="search_admin_list_table">
			<div class="search_admin_list_table_title">
				<span>
					砍价详情
				</span>
			</div>
			<div class="order_detail_list">
				<div class="item_detail">
					<div class="title">
						<div class="tits">砍价信息</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>砍价记录ID：</td>
											<td>砍价开始时间：</td>
											<td>砍价结束时间：</td>
											<td>砍价初始价：</td>
											<td>砍价人数：</td>
											<td>已砍人数：</td>
											<td>砍价状态：</td>
											<td v-show="activity.status==3||activity.status==4">订单编号：</td>
											<td v-show="activity.status==4">购买金额：</td>
										</tr>
										<tr>
											<td>
												{{activity.id}}
											</td>
											<td>
												{{activity.add_time}}
											</td>
											<td>
												{{activity.end_time}}
											</td>
											<td>
												{{activity.price}}
											</td>
											<td>
												{{activity.active_num}}
											</td>
											<td>
												{{activity.active_people_num}}
											</td>
											<td>
												{{activity.statusText}}
											</td>
											<td v-show="activity.status==3||activity.status==4">
												{{activity.order_sn}}
											</td>
											<td v-show="activity.status==4">
												{{activity.total_amount}}
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
										</tr>
										<tr>
											<td>
												{{address.consignee}}
											</td>
											<td>
												{{address.mobile}}
											</td>
											<td>
												{{address.address_base}}
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
										</tr>
										<tr>
											<td>
												{{goods_info.goods_name}}
											</td>
											<td>
												{{goods_info.key_name}}
											</td>
											<td>
												{{goods_info.spec_num}}
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
						<div class="tits">砍价记录</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>砍价人员：</td>
											<td>砍价时间：</td>
										</tr>
										<tr v-for="item in activity_log">
											<td>
												{{item.nickname}}
											</td>
											<td>
												{{item.add_time}}
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
 </div>
</template>

<script>
import breadcrumb from '../../../components/breadcrumb';
import orderList from '../../../js/order_list';
import Market from '../../../js/marketing';
 export default {
   data () {
     return {
     	activity:{},
     	activity_log:[],
     	address:{},
     	goods_info:{},
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
			title1:"订单管理",
			title2:"订单详情",
		},
    action_name:'',
    id:''
     }
   },
   created(){
   		this.id = this.$route.query.id;
      this.action_name = this.$route.query.action;
		var data = {
			id:this.id,
      action:this.action_name
		}
		Market.orderDetail("Activities/userRecordDetails",data,this);
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
			console.log(JSON.stringify(data))
			orderList.addPunishment("Store/addPunishment",data,this);
		}
   }
 }
</script>
