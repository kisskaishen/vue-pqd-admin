<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
.show_img{
	display: inline-block;
	float:left;
}
</style>
<template>
 <div class="business_listings">
	<breadcrumb :content="content_title"></breadcrumb>
	<div class="container">
		<div class="search_admin_list_table">
			<div class="search_admin_list_table_title">
				<span>
					用户信息
				</span>
			</div>
			<div class="table_list">
				<table class="show_list_table_info" border="0" cellspacing="" cellpadding="">
					<tbody>
						<tr>
							<td>门店后台账号：</td>
							<td>{{storeData.merchant_name}}</td>
						</tr>
						<tr>
							<td>新密码：</td>
							<td><el-input maxLength='20' @blur="checkNumOrLetter(storeData.password,'密码')" type="password" v-model="storeData.password" placeholder="请输入内容"></el-input></td>
						</tr>
						<tr>
							<td>确认密码：</td>
							<td><el-input maxLength='20' @blur="checkNumOrLetter(storeData.password,'密码')" type="password" v-model="storeData.password2" placeholder="当您需要修改密码的时候请在这重复输入您的登录密码"></el-input></td>
						</tr>
						<tr>
							<td>店铺名称：</td>
							<td><el-input maxLength='20' v-model="storeData.store_name" placeholder="请输入内容"></el-input></td>
						</tr>
						<tr>
							<td>店铺LOGO：</td>
							<td>
								<div class="warp_upLoad">
									<div class="warp_upLoad_left">
										<!--<img :src="storeData.store_logo" alt="" />-->
										<img  @click="clickImg($event)" style="width:100px;height:100px;" :src="storeData.store_logo">
				                        <!-- 放大图片 -->
				                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
									</div>
									<!--<div class="warp_upLoad_right">
										<button>上传</button>
									</div>-->
								</div>
							</td>
						</tr>
						<tr>
							<td>店铺详情：</td>
							<td>
								<el-input
								  maxLength='200'
								  type="textarea"
								  :autosize="{ minRows: 2, maxRows: 4}"
								  placeholder="请输入内容"
								  v-model="storeData.introduce">
								</el-input>
							</td>
						</tr>
						<tr>
							<td>邮箱：</td>
							<td><el-input maxLength='20' @blur="checkEmail(storeData.email,'邮箱')" v-model="storeData.email" placeholder="请输入内容"></el-input></td>
						</tr>
						<tr>
							<td>状态：</td>
							<td>
								<!-- {{storeData.state_name}} -->
								  <el-radio v-model="storeData.state" label="0">停业</el-radio>
  								  <el-radio v-model="storeData.state" label="1">营业</el-radio>
							</td>
						</tr>
						<tr>
							<td>加入黑名单：</td>
							<td>
								  <el-radio v-model="storeData.is_blacklist" label="2">是</el-radio>
  								  <el-radio v-model="storeData.is_blacklist" label="1">否</el-radio>
  								  <span style="color:red;margin-left:40px;">(注：加入黑名单后，商家不可进行任何操作，包括提现)</span>
							</td>
						</tr>
						<tr>
							<td>手机：</td>
							<td><el-input maxLength='11' @blur="checkMobile(storeData.mobile,'手机号')" v-model="storeData.mobile" placeholder="请输入内容"></el-input></td>
						</tr>
						<tr>
							<td>商户类型：</td>
							<td v-show="storeData.store_from==0">
    							个人
							</td>
							<td v-show="storeData.store_from==1">
    							公司
							</td>
						</tr>
						<tr>
							<td>店铺类型：</td>
							<td>
								  <el-radio v-model="storeData.store_type" label="0">个人</el-radio>
  								  <el-radio v-model="storeData.store_type" label="1">旗舰店</el-radio>
								  <el-radio v-model="storeData.store_type" label="2">专卖店</el-radio>
  								  <el-radio v-model="storeData.store_type" label="3">专营店</el-radio>
  								  <el-radio v-model="storeData.store_type" label="4">普通店</el-radio>
							</td>
						</tr>
						<tr>
							<td>是否海淘：</td>
							<td>
  								  <el-radio v-model="storeData.is_haitao" label="0">非海淘</el-radio>
  								  <el-radio v-model="storeData.is_haitao" label="1">海淘</el-radio>
							</td>
						</tr>
						<tr>
							<td>保证金：</td>
							<td>{{storeData.margin}}</td>
						</tr>
						<tr>
							<td>流水单号：</td>
							<td>{{storeData.trade_no}}</td>
						</tr>
						<tr>
							<td>商铺地址：</td>
							<td><el-input maxLength='50' v-model="storeData.address" placeholder="请输入内容"></el-input></td>
						</tr>
						<tr>
							<td>最后修改人：</td>
							<td>{{storeData.operation_admin}}</td>
						</tr>
						<tr>
							<td>最后修改时间：</td>
							<td>{{storeData.operation_time}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="search_admin_list_table">
			<div class="search_admin_list_table_title">
				<span>
					企业商户信息
				</span>
			</div>
			<div class="table_list">
				<table class="show_list_table_info" border="0" cellspacing="" cellpadding="">
					<tbody>
						<tr  v-show="is_show_company">
							<td>企业法人姓名：</td>
							<td><el-input maxLength='20' v-model="storeData.company_user_name" placeholder="请输入内容"></el-input></td>
						</tr>
						<tr>
							<td>身份证号：</td>
							<td><el-input maxLength='18' @blur="checkIDCard(storeData.show_ower_idcard,'身份证')" v-model="storeData.show_ower_idcard" placeholder="请输入内容"></el-input></td>
						</tr>
						<tr>
							<td>身份证正面：</td>
							<td>
								<div class="warp_upLoad">
									<div class="warp_upLoad_left" v-show="storeData.idcard_img_1">
										<!--<img :src="storeData.idcard_img_1" alt="" />-->
										<img  @click="clickImg($event)" style="width:100px;height:100px;" :src="storeData.idcard_img_1">
				                        <!-- 放大图片 -->
				                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
									</div>
									<!--<div class="warp_upLoad_right">
										<button>上传</button>
									</div>-->
								</div>
							</td>
						</tr>
						<tr>
							<td>身份证反面：</td>
							<td>
								<div class="warp_upLoad">
									<div class="warp_upLoad_left" v-show="storeData.idcard_img_2">
										<!--<img :src="storeData.idcard_img_2" alt="" />-->
										<img  @click="clickImg($event)" style="width:100px;height:100px;" :src="storeData.idcard_img_2">
				                        <!-- 放大图片 -->
				                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
									</div>
									<!--<div class="warp_upLoad_right">
										<button>上传</button>
									</div>-->
								</div>
							</td>
						</tr>
						<tr>
							<td>手持身份证头部照：</td>
							<td>
								<div class="warp_upLoad">
									<div class="warp_upLoad_left" v-show="storeData.idcard_img_3">
										<!--<img :src="storeData.idcard_img_3" alt="" />-->
										<img  @click="clickImg($event)" style="width:100px;height:100px;" :src="storeData.idcard_img_3">
				                        <!-- 放大图片 -->
				                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
									</div>
									<!--<div class="warp_upLoad_right">
										<button>上传</button>
									</div>-->
								</div>
							</td>
						</tr>
						<tr v-show="is_show_siggle">
							<td>半身照片：</td>
							<td>
								<div class="warp_upLoad">
									<div class="warp_upLoad_left" v-show="storeData.idcard_img_4">
										<!--<img :src="storeData.idcard_img_4" alt="" />-->
										<img  @click="clickImg($event)" style="width:100px;height:100px;" :src="storeData.idcard_img_4">
				                        <!-- 放大图片 -->
				                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
									</div>
									<!--<div class="warp_upLoad_right">
										<button>上传</button>
									</div>-->
								</div>
							</td>
						</tr>
							<tr  v-show="is_show_company">
								<td>公司名称：</td>
								<td><el-input maxLength='60' v-model="storeData.company_name" placeholder="请输入内容"></el-input></td>
							</tr>
							<tr  v-show="is_show_company">
								<td>营业执照注册号：</td>
								<td><el-input maxLength='60' v-model="storeData.company_regiter_num" placeholder="请输入内容"></el-input></td>
							</tr>
							<tr  v-show="is_show_company">
								<td>组织机构代码：</td>
								<td><el-input maxLength='60' v-model="storeData.company_organ_code" placeholder="请输入内容"></el-input></td>
							</tr>
							<tr  v-show="is_show_company">
								<td>纳税人识别码：</td>
								<td><el-input maxLength='60' v-model="storeData.company_identi_code" placeholder="请输入内容"></el-input></td>
							</tr>
							<tr  v-show="is_show_company">
								<td>统一社会信用代码：</td>
								<td><el-input maxLength='60' v-model="storeData.company_credit_code" placeholder="请输入内容"></el-input></td>
							</tr>
							<tr  v-show="is_show_company">
								<td>营业执照：</td>
								<td>
									<div class="warp_upLoad" v-show="storeData.yyzz_img.length!=0||storeData.yyzz_img!=null">
										<div class="warp_upLoad_left" v-for="its1 in storeData.yyzz_img">
											<!--<img v-for="its1 in storeData.yyzz_img" :src="its1" alt="" />-->
												<img  @click="clickImg($event)" style="width:100px;height:100px;" :src="its1">
						                        <!-- 放大图片 -->
						                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
										</div>
										<!--<div class="warp_upLoad_right">
											<button>上传</button>
										</div>-->
									</div>
								</td>
							</tr>
							<tr  v-show="is_show_company">
								<td>组织架构：</td>
								<td>
									<div class="warp_upLoad" v-show="storeData.zzjg_img.length!=0||storeData.zzjg_img!=null">
										<div class="warp_upLoad_left" v-for="its1 in storeData.zzjg_img">
											<!--<img v-for="its2 in storeData.zzjg_img" :src="its2" alt="" />-->
												<img  @click="clickImg($event)" style="width:100px;height:100px;" :src="its1">
						                        <!-- 放大图片 -->
						                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
										</div>
										<!--<div class="warp_upLoad_right">
											<button>上传</button>
										</div>-->
									</div>
								</td>
							</tr>
							<tr  v-show="is_show_company">
								<td>社会信用：</td>
								<td>
									<div class="warp_upLoad" v-show="storeData.shxy_img.length!=0||storeData.shxy_img!=null">
										<div class="warp_upLoad_left" v-for="its3 in storeData.shxy_img">
											<!--<img v-for="its3 in storeData.shxy_img" :src="its3" alt="" />-->
												<img  @click="clickImg($event)" style="width:100px;height:100px;" :src="its3">
						                        <!-- 放大图片 -->
						                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
										</div>
										<!--<div class="warp_upLoad_right">
											<button>上传</button>
										</div>-->
									</div>
								</td>
							</tr>
							<tr  v-show="is_show_company">
								<td>商标注册证明：</td>
								<td>
									<div class="warp_upLoad" v-show="storeData.sbzm_imgs.length!=0||storeData.sbzm_imgs!=null">
										<div class="warp_upLoad_left" v-for="its1 in storeData.sbzm_imgs">
											<!--<img v-for="item in storeData.sbzm_imgs" :src="item" alt="" />-->
												<img  @click="clickImg($event)" style="width:100px;height:100px;" :src="its1">
						                        <!-- 放大图片 -->
						                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
										</div>
										<!--<div class="warp_upLoad_right">
											<button>上传</button>
										</div>-->
									</div>
								</td>
							</tr>
							<tr  v-show="is_show_company">
								<td>品牌授权证明：</td>
								<td>
									<div class="warp_upLoad" v-show="storeData.ppsq_imgs.length!=0||storeData.ppsq_imgs!=null">
										<div class="warp_upLoad_left" v-for="item in storeData.ppsq_imgs">
											<!--<img v-for="item in storeData.ppsq_imgs" :src="item" alt="" />-->
												<img  @click="clickImg($event)" style="width:100px;height:100px;" :src="item">
						                        <!-- 放大图片 -->
						                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
										</div>
										<!--<div class="warp_upLoad_right">
											<button>上传</button>
										</div>-->
									</div>
								</td>
							</tr>
							<tr  v-show="is_show_company">
								<td>质检报告：</td>
								<td>
									<div class="warp_upLoad" v-show="storeData.zjbg_imgs.length!=0||storeData.zjbg_imgs!=null">
										<div class="warp_upLoad_left" v-for="item in storeData.zjbg_imgs">
											<!--<img v-for="item in storeData.zjbg_imgs" :src="item" alt="" />-->
												<img  @click="clickImg($event)" style="width:100px;height:100px;" :src="item">
						                        <!-- 放大图片 -->
						                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
										</div>
										<!--<div class="warp_upLoad_right">
											<button>上传</button>
										</div>-->
									</div>
								</td>
							</tr>
					</tbody>
				</table>
			</div>
			<div class="height-32" style="padding:40px 0 60px;text-align: center;">
				<el-button type="danger" @click="save()">保存</el-button>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import Store from '../../js/business_listings';
import breadcrumb from '../../components/breadcrumb';
import BigImg from '../../components/bigImg'
 export default {
   data () {
     return {
     	is_show_siggle:false,
     	is_show_company:false,
         showImg:false,
     	store_id:'',
     	textarea3:'',
     	radio:'',
     	input:'',
     	 storeData: {},
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
			title1: "商户列表",
			title2: "",
			path1:'/home/businessManagement/businessListings',
			path2:''
		}
     }
   },
   created(){
   	/* Store/storeDetail  */
   	this.store_id = this.$route.query.store_id;
   	var data = {
   		id:this.store_id
   	}
	Store.getStoreDetail("Store/storeDetail",data,this)
   },
   components: {
		breadcrumb,BigImg
   },
   methods:{
	   	changeType(val){
	   		if(this.storeData.store_from==0){
	   			this.is_show_company = false;
				this.is_show_siggle = true;
	   		}else if(this.storeData.store_from==1){
	   			this.is_show_company = true;
				this.is_show_siggle = false;
	   		}
	   	},
        clickImg(e) {
            this.showImg = true;
            // 获取当前图片地址
            this.imgSrc = e.currentTarget.src;
        },
        viewImg(){
            this.showImg = false;
        },
	save(){
		if(this.storeData.password==''&&this.storeData.password!=this.storeData.password2){
			this.$message({
				type:"info",
				message:'两次密码不一致'
			})
			return
		}
		var data = {
			store_id:this.storeData.store_id,
			store_name:this.storeData.store_name,
			email:this.storeData.email,
			password:this.storeData.password,
			password2:this.storeData.password2,
			mobile:this.storeData.mobile,
			store_logo:this.storeData.store_logo,
			introduce:this.storeData.introduce,
			store_from:this.storeData.store_from,
			store_type:this.storeData.store_type,
			state:this.storeData.state,
			is_blacklist:this.storeData.is_blacklist,
			is_haitao:this.storeData.is_haitao,
			address:this.storeData.address,
			company_user_name:this.storeData.company_user_name,
			show_ower_idcard:this.storeData.show_ower_idcard,
			company_name:this.storeData.company_name,
			company_regiter_num:this.storeData.company_regiter_num,
			company_organ_code:this.storeData.company_organ_code,
			company_identi_code:this.storeData.company_identi_code,
			company_credit_code:this.storeData.company_credit_code,
		}
		Store.updateStore("Store/updateStore",data,this)
	}
   }
 }
</script>
