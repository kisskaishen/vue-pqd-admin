
<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
@import "../../less/coupon/coupon";
.issuance_warp{
	background:#fff;
	padding:10px;
	.issuance_warp_content{
		overflow:hidden;
		padding:30px;
		.issuance_warp_lable{
			margin-top:20px;
			float:left;
			width:100px;
		}
		.issuance_warp_right{
			padding-left:100px;
			.issuance_warp_right_select{
				overflow: hidden;
				li{
					float:left;
					margin-right:20px;
					margin-top:20px;
					border:1px solid #eee;
					padding:5px 10px;
					position: relative;
					.delete{
						position: absolute;
						top:-8px;
						right:-8px;
						width:16px;
						height:16px;
						background:red;
						border-radius: 50%;
						text-align: center;
						line-height: 16px;
						color:#fff;
						cursor: pointer;
					}
				}
			}
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
					创建/编辑优惠券
				</span>
			</div>
		</div>
		<div class="issuance_warp">
			<div class="issuance_warp_content">
				<div class="issuance_warp_lable">
					选择优惠券
				</div>
				<div class="issuance_warp_right">
					<ul class="issuance_warp_right_select">
						<li v-for="(item,index) in selectCouponList">{{item.coupon_name}}<div class="delete" @click="clickCoupon(selectCouponList,index)">x</div></li>
						<!--<li>
							22334
							<div class="delete" @click="clickCoupon()">x</div>
						</li>-->
					</ul>
					<div class="btn_margin">
						<el-button @click="addCouponBtn()" type="primary">+添加优惠券</el-button>
					</div>
				</div>
			</div>
			<div class="issuance_warp_content">
				<div class="issuance_warp_lable">
					选择用户
				</div>
				<div class="issuance_warp_right">
					<ul class="issuance_warp_right_select">
						<li v-for="(item,index) in selectUserList">{{item.nickname}}<div class="delete" @click="clickCoupon(selectUserList,index)">x</div></li>
					</ul>
					<div class="btn_margin">
						<el-button @click="addUserBtn()" type="primary">+添加用户</el-button>
					</div>
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
					  v-model="form.remark">
					</el-input>
				</div>
			</div>
			<div class="issuance_warp_content">
				<div class="issuance_warp_lable">
				</div>
				<div class="issuance_warp_right">
					<el-button @click="sendCoupon()" type="danger">立即发放</el-button>
				</div>
			</div>
		</div>
	</div>
<el-dialog width="80%" title="添加优惠券" :visible.sync="dialogAddCoupon">  <el-form :model="form" class="search_admin_list_table">
	<div class="search_btn">
		<div class="search_content">
			<span>优惠券名称</span>
			<div class="width-120">
				<el-input v-model="couponForm.key_word" placeholder="优惠券名称"></el-input>
			</div>
		</div>
		<div class="search_content">
			<el-button type="primary" @click="searchListData('coupon')">查询</el-button>
		</div>
	</div>
  </el-form>
  <!--tooltip-effect="dark"-->
	      <!--:reserve-selection="true"
	    row-key='id'-->
  <div class="dialog_table">
  	  <el-table
	    ref="multipleTable"
	    :data="tableDataDialog"
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange">
	    <el-table-column
	      type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      prop="coupon_name"
	      label="优惠券名称">
	    </el-table-column>
	    <el-table-column
	      prop="origin_type_name"
	      label="优惠券类型">
	    </el-table-column>
	    <el-table-column
	      prop="money"
	      label="优惠券金额(元)">
	    </el-table-column>
	    <el-table-column
	      prop="condition"
	      label="使用条件">
	    </el-table-column>
	    <el-table-column
	      prop="add_time"
	      label="创建日期">
	    </el-table-column>
	    <el-table-column
	      prop="store_name"
	      label="发券用户">
	    </el-table-column>
	    <el-table-column
	      label="数量">
	      <template slot-scope="scope">
	      	<el-input-number size="small" v-model="scope.row.num" :min="1" :max="5" label="描述文字"></el-input-number>
	      </template>
	    </el-table-column>
	  </el-table>
       <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChangeCategory"
          :current-page="currentPage"
          :page-size = 'pageSize'
          layout="total, prev, pager, next, jumper"
          :total='totals'>
        </el-pagination>
      </div>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogAddCoupon = false">取 消</el-button>
    <el-button type="primary" @click="selectGoods('coupon')">确 定</el-button>
  </div>
</el-dialog>

<el-dialog width="80%" title="添加用户" :visible.sync="dialogAddUser">  
	<el-form :model="form" class="search_admin_list_table">
	<div class="search_btn">
		<div class="search_content">
			<span>会员昵称</span>
			<div class="width-120">
				<el-input v-model="userForm.key_word" placeholder="会员昵称"></el-input>
			</div>
		</div>
		<div class="search_content">
			<span>ID</span>
			<div class="width-120">
				<el-input v-model="userForm.user_id" placeholder="ID"></el-input>
			</div>
		</div>
		<div class="search_content">
			<span>注册类型</span>
			<div class="width-120">
			  <el-select v-model="userForm.reg_type" placeholder="全部">
			    <el-option
			      v-for="item in reg_typeOption"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</div>
		</div>
		<div class="search_content">
			<picker :title="titleLabelOne" @onPassByVal='getTime'></picker>
		</div>
		<div class="search_content">
			<el-button type="primary" @click="searchListData('user')">查询</el-button>
		</div>
	</div>
  </el-form>
  <div class="dialog_table">
  	  <el-table
	    ref="multipleTables"
	    :data="userListDialog"
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChangeUser">
	    <el-table-column
	      type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      prop="user_id"
	      label="ID">
	    </el-table-column>
	    <el-table-column
	      prop="nickname"
	      label="会员昵称">
	    </el-table-column>
	    <el-table-column
	      prop="total_amount"
	      label="累计消费(元)">
	    </el-table-column>
	    <el-table-column
	      prop="oauth"
	      label="注册类型">
	    </el-table-column>
	    <el-table-column
	      prop="reg_time"
	      label="注册日期">
	    </el-table-column>
	  </el-table>
       <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChangeCategoryUser"
          :current-page="currentPageUser"
          :page-size = 'pageSize'
          layout="total, prev, pager, next, jumper"
          :total='totalsUser'>
        </el-pagination>
      </div>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogAddUser = false">取 消</el-button>
    <el-button type="primary" @click="selectGoods('user')">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';

import issuance from '../../js/coupon_issuance';
import coupon from '../../js/coupon';
 export default {
	data(){
		return{
			titleLabelOne:'注册日期',
			reg_typeOption:[],
	     	couponTypeOption:[],
	     	couponOption:[],
	     	store_fromOption:[],
	     	store_typeOption:[],
			multipleSelectionUser:[],
			multipleSelection: [],
			couponForm:{
				key_word:'',
				couponIdsSelect:''
			},
			dialogAddUser:false,//用户dialog
			currentPageUser:1,
			totalsUser:1,
			selectUserList:[],//选中用户
			userListDialog:[],//列表
			userForm:{
				key_word:'',
				user_id:'',
				reg_type:'',
				reg_time:'',
				couponIds:'',
				userIdsSelect:''
			},
			currentPage:1,
			pageSize:10,
			totals:1,
			selectCouponList:[],//选中优惠券
			tableDataDialog:[],//优惠券列表
			dialogAddCoupon:false,//优惠券dialog
			form:{
				remark:'',
				userIds:'',
				couponIdsSelect:'',
			},
			content_title:{
				title1: "优惠券发放列表",
				title2: "",
				path1:'/home/couponManager/couponList',
				path2:''
			}
		}
	},
	created(){
		coupon.searchConf("Coupon/searchConf",this);
	},
	methods:{
		clickCoupon(data,count){
			data.splice(count,1);
		},
		searchListData(type){
			var that = this;
			if(type=="coupon"){
				this.getCouponList();
			}else if(type=="user"){
				this.getUserList();
			}
		},
		sendCoupon(){
			var that = this;
			that.form.couponIds = '';
			that.form.userIds = '';
			this.selectCouponList.forEach((item,val)=>{
				that.form.couponIds += item.id+'@'+item.num+',';
			})
			this.selectUserList.forEach((item,val)=>{
				that.form.userIds += item.user_id+',';
			})
			var userIds = this.form.userIds;
			var couponIds = this.form.couponIds;
			userIds = userIds.substr(0,userIds.length-1);
			couponIds = couponIds.substr(0,couponIds.length-1);
			var data = {
				couponIds:couponIds,
				userIds:userIds,
				remark:this.form.remark,
			}
			console.log(JSON.stringify(data))
			issuance.insertCoupon("Couponsend/insertCoupon",data,this)
		},
		getUserList(val){
			var that = this;
			that.userForm.userIdsSelect = '';
			this.selectUserList.forEach((item,val)=>{
				that.userForm.userIdsSelect += item.user_id+',';
			})
			this.userForm.userIdsSelect = this.userForm.userIdsSelect.substr(0,this.userForm.userIdsSelect.length-1);
			var data = {
				key_word:this.userForm.key_word,
				user_id:this.userForm.user_id,
				reg_type:this.userForm.reg_type,
				reg_time:this.userForm.reg_time,
				userIds:this.userForm.userIdsSelect,
				page:val?val:this.currentPage,
				rows:this.pageSize,
			}
			issuance.getUser("Couponsend/getUser",data,this)
		},
		addUserBtn(){
			this.userForm.key_word = '';
			this.userForm.user_id = '';
			this.userForm.reg_type = '';
			this.userForm.reg_time = '';
			this.getUserList();
		},
		selectGoods(type){
			var that = this;
			if(type=="coupon"){
				this.multipleSelection.forEach((item,val)=>{
					that.selectCouponList.push(item);
				})
				this.dialogAddCoupon = false;
			}else if(type=="user"){
				this.multipleSelectionUser.forEach((item,val)=>{
					that.selectUserList.push(item);
				})
				this.dialogAddUser = false;
			}
		},
		addCouponBtn(){
			this.couponForm.key_word = '';
			this.getCouponList();
		},
		getCouponList(val){
			var that = this;
			that.couponForm.couponIdsSelect = '';
			this.selectCouponList.forEach((item,val)=>{
				that.couponForm.couponIdsSelect += item.id + ',';
			})
			this.couponForm.couponIdsSelect = this.couponForm.couponIdsSelect.substr(0,this.couponForm.couponIdsSelect.length-1);
			var data = {
				key_word:this.couponForm.key_word,
				couponIds:this.couponForm.couponIdsSelect,
				page:val?val:this.currentPage,
				rows:this.pageSize,
			}
			issuance.getCouponList("Couponsend/getCoupon",data,this)
		},
		handleSelectionChange(val){
			this.multipleSelection = val;
		},
		handleSelectionChangeUser(val){
			this.multipleSelectionUser = val;
		},
		handleCurrentChangeCategoryUser(val){
			this.getUserList(val)
		},
		handleCurrentChangeCategory(val){
			this.getCouponList(val)
		},
		getTime(msg){
	   		if(msg!=undefined){
		   		if(msg[0]!='NaN-0NaN-0NaN'){
		   			this.userForm.reg_time = msg[0]+'/'+msg[1];
		        }else{
		   			this.userForm.reg_time = '';
		        }
	        }else{
		   			this.userForm.reg_time = '';
	        }
	   	},
	},
   components: {
		breadcrumb,picker
   },
 }
</script>

