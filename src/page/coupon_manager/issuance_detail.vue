<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
@import "../../less/coupon/coupon";
.issuance_warp_detail{
	background:#fff;
	padding:10px;
	.issuance_warp_content{
		overflow:hidden;
		padding:10px;
		.issuance_warp_lable{
			float:left;
			width:100px;
		}
		.issuance_warp_right{
			padding-left:100px;
			.btn_margin{
				margin-top:20px;
			}
		}
	}
}
</style>
<template>
 <div class="business_listings">
	<breadcrumb :content="content_title"></breadcrumb>
	<div class="container">
		<div class="search_admin_list_table">
			<div class="search_admin_list_table_title">
				<span>
					发放优惠券详情
				</span>
			</div>
		</div>
		<div class="issuance_warp_detail">
			<div class="issuance_warp_content">
				<div class="issuance_warp_lable">
					发放时间
				</div>
				<div class="issuance_warp_right">
					{{couponDetail.time}}
				</div>
			</div>
			<div class="issuance_warp_content">
				<div class="issuance_warp_lable">
					优惠券名称
				</div>
				<div class="issuance_warp_right">
					<span v-for="item in couponDetail.couponName">{{item}}</span>
				</div>
			</div>
			<div class="issuance_warp_content">
				<div class="issuance_warp_lable">
					优惠券类型
				</div>
				<div class="issuance_warp_right">
					{{couponDetail.couponType}}
				</div>
			</div>
			<div class="issuance_warp_content">
				<div class="issuance_warp_lable">
					优惠券总金额
				</div>
				<div class="issuance_warp_right">
					{{couponDetail.mony}}
				</div>
			</div>
			<div class="issuance_warp_content">
				<div class="issuance_warp_lable">
					发放用户
				</div>
				<div class="issuance_warp_right">
					<el-input
					  type="textarea"
					  disabled
					  :rows="5"
					  placeholder="请输入内容"
					  v-model="couponDetail.user_name">
					</el-input>
				</div>
			</div>
			<div class="issuance_warp_content">
				<div class="issuance_warp_lable">
					备注
				</div>
				<div class="issuance_warp_right">
					<el-input
					  type="textarea"
					  :rows="2"
					  placeholder="请输入内容"
					  v-model="couponDetail.remark">
					</el-input>
				</div>
			</div>
			<div class="issuance_warp_content" v-show="pageDetail=='edit'">
				<div class="issuance_warp_lable">
				</div>
				<div class="issuance_warp_right">
					<el-button @click="saveCoupon()" type="danger">保存</el-button>
				</div>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';

import issuance from '../../js/coupon_issuance';
 export default {
	data(){
		return{
			couponDetail:{
				couponName:'',
				couponType:'',
				mony:'',
				remark:'',
				time:'',
			},
			form:{
				remark:'',
			},
			content_title:{
				title1: "优惠券发放列表",
				title2: "",
				path1:'/home/couponManager/coupon_issuance',
				path2:''
			},
			pageDetail:''
		}
	},
	created(){
		this.couponId = this.$route.query.coupon_id;
		this.pageDetail = this.$route.query.pageDetail;
		var data = {
			couponId:this.couponId
		}
		issuance.toUpdateCoupon("Couponsend/toUpdateCoupon",data,this)
	},
	methods:{
		saveCoupon(){
			var data = {
				remark:this.couponDetail.remark,
				couponId:this.couponId,
			}
			issuance.updateCoupon("Couponsend/updateCoupon",data,this)
		}
	},
   components: {
		breadcrumb,picker
   },
 }
</script>