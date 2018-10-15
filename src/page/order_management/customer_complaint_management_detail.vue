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
					申诉订单详情
				</span>
			</div>
			<div class="order_detail_list">
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
											<td>优惠价格：</td>
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
												{{item.market_price}}
											</td>
											<td>
												{{item.coupon_price}}
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
						<div class="tits">申诉信息</div>
					</div>
					<div class="order_detail_table">
						<div class="current_system">			              
							<div class="warp" v-for="(child,index) in return_info_list">
								<div v-for="(its,index) in child.order_service_list">
				                     <div class="explain_warp">
				                     	<span class="item_title">{{its.title}}</span>
				                     	<span class="times">{{its.create_time}}</span>
				                     </div>
				                     <div class="content_warp">
				                        <div class="ites" v-for="(ite,index) in its.items">
				                            <div class="label">{{ite.left_name}}：</div>
				                            <div v-if="typeof(ite.right_name)=='object'">
				                            	<span v-for="imgs in ite.right_name">
							                        <img  @click="clickImg($event)" style="height:100px;margin-right:10px;" :src="imgs">
							                        <!-- 放大图片 -->
							                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
				                            	</span>
				                            </div>
				                            <div v-else class="label_name">{{ite.right_name}}</div>
				                        </div>
				                        <!--<div class="ites">
				                            <div class="label">凭证：</div>
				                            <div class="label_name">
				                            	<ul class="show_img">
			                            	        <li v-for="img in ite.proof_imgs"><img class="msg_logo_url" :src="img"/></li>	
				                            	</ul>
				                            	<span class="preview">
				                            		<a href="https://cdn2.pinquduo.cn/20180506231220736579.jpg" target="_blank " >预览图片<a>
				                            	</span>
				                            </div>
				                        </div>-->
				                      </div>
								</div>
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
import breadcrumb from '../../components/breadcrumb';
import orderList from '../../js/order_list';
import BigImg from '../../components/bigImg'
 export default {
   data () {
     return {
     	imgSrc:'',
         showImg:false,
     	order_info:{},
     	shipping_info:{},
     	goods_list:[],
     	return_info_list:[],
     	order_sn:'',
     	 tableData: [{
          id: '19724',
          name: '旺旺鞋铺',
        }, {
          id: '19724',
          name: '旺旺鞋铺',
        }, {
          id: '19724',
          name: '旺旺鞋铺',
        }, {
          id: '19724',
          name: '旺旺鞋铺',
        }],
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
   		this.order_sn = this.$route.query.order_sn;
		var data = {
			order_sn:this.order_sn
		}
		orderList.orderDetail("order/detail",data,this);
   },
   components: {
breadcrumb,BigImg
   },
   methods:{        
   		clickImg(e) {
            this.showImg = true;
            console.log(e.currentTarget.src)
            // 获取当前图片地址
            this.imgSrc = e.currentTarget.src;
        },
        viewImg(){
            this.showImg = false;
        },
		entryDetail(id){
			this.$router.push({name:'customer_complaint_management_detail',query:{id:id}})
		}
   }
 }
</script>
