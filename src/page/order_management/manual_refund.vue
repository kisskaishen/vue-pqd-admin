<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
.config_left_right_warp{
  overflow:hidden;
  padding:10px 0;
  .left_warp{
    float:left;
    width:100px;
    text-align: right;
    font-weight:bold;
  }
  .right_warp{
    float:left;
    margin-left:10px;
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
					趣多多赚优惠券
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>订单编号</span>
					<div class="width-120">
						<el-input v-model="form.order_sn" placeholder="订单编号"></el-input>
					</div>
				</div>
  				<div class="search_content">
  					<span>用户昵称</span>
  					<div class="width-120">
  						<el-input v-model="form.nickname" placeholder="用户昵称"></el-input>
  					</div>
  				</div>
    				<div class="search_content">
    					<span>商家ID</span>
    					<div class="width-120">
    						<el-input v-model="form.store_id" placeholder="商家ID"></el-input>
    					</div>
    				</div>
      				<div class="search_content">
      					<span>商家名称</span>
      					<div class="width-120">
      						<el-input v-model="form.store_name" placeholder="商家名称"></el-input>
      					</div>
      				</div>
        				<div class="search_content">
        					<span>处理人</span>
        					<div class="width-120">
        						<el-input v-model="form.processing_name" placeholder="处理人"></el-input>
        					</div>
        				</div>
        				<div class="search_content">
        					<span>退款原因</span>
        					<div class="width-120">
                    <el-select v-model="form.remark" placeholder="请选择退款原因">
                      <el-option v-for="(item,index) in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
        					</div>
        				</div>
                <picker style="float:left;margin-bottom:10px;" :title="titleLabel" @onPassByVal='getTime'></picker>
					<el-button style="float:left;margin-left:10px" type="primary" @click="searchListData()">查询</el-button>
    <el-button style="float:left;margin-left:10px" type="primary" @click="manualRefund()">手动退款</el-button>
			</div>
			<!-- <div class="table_title">
				<div class="table_title_left">
					<div class="table_title_left_title">优惠券列表</div>
				</div>
				<div class="table_title_right"><el-button type="primary" @click="addCoupon()">+创建优惠券</el-button></div>
			</div> -->
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="return_sn"
				      label="退款编号"
              width="180px">
				    </el-table-column>
				    <el-table-column
				      prop="order_sn"
				      label="订单编号"
              width="180px">
				    </el-table-column>
				    <el-table-column
				      prop="return_money"
				      label="退款金额(元)"
              width="120px">
				    </el-table-column>
				    <el-table-column
				      prop="store_id"
				      label="商家ID"
              width="80px">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商家名称"
              width="160px">
				    </el-table-column>
				    <el-table-column
				      prop="nickname"
				      label="用户昵称"
              width="80px">
				    </el-table-column>
				    <el-table-column
				      prop="processing_type"
				      label="退款原因"
              width="260px">
				    </el-table-column>
				    <el-table-column
				      prop="processing_name"
				      label="处理人"
              width="100px">
				    </el-table-column>
				    <el-table-column
				      prop="update_time"
				      label="处理时间"
              width="160px">
				    </el-table-column>
				    <el-table-column
				      label="操作"
              width="80px">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="detailCoupon(scope.row)">详情</el-button>
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
		</div>
	</div>

  <el-dialog
  title="手动退款"
  :visible.sync="dialogVisible"
  width="30%">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="订单编号" prop="order_sn" style="margin-bottom:20px;">
      <el-input :maxLength="40" v-model="ruleForm.order_sn"></el-input>
    </el-form-item>
    <el-form-item label="退款金额" prop="bond" style="margin-bottom:20px;">
      <el-input :maxLength="4" v-model="ruleForm.bond"></el-input>
    </el-form-item>
    <el-form-item label="退款原因" prop="remark" style="margin-bottom:20px;">
      <el-select v-model="ruleForm.remark" placeholder="请选择退款原因">
        <el-option v-for="(item,index) in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述" style="margin-bottom:20px;">
      <el-input :maxLength="250" type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item label="凭证" style="margin-bottom:20px;">
      <approval-up-load :explain="explain" :upLoadData="upLoadData1" @addImg="addImg" @deleteImg="deleteImg"></approval-up-load>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </span>
  </el-dialog>
  <el-dialog
  title="详情"
  :visible.sync="dialogVisibleDetail"
  width="500px">
  <div class="config_left_right_warp">
      <div class="left_warp">退款编号</div>
      <div class="right_warp">{{detailForm.return_sn}}</div>
  </div>
  <div class="config_left_right_warp">
      <div class="left_warp">订单编号</div>
      <div class="right_warp">{{detailForm.order_sn}}</div>
  </div>
  <div class="config_left_right_warp">
      <div class="left_warp">退款金额</div>
      <div class="right_warp">{{detailForm.return_money}}</div>
  </div>
  <div class="config_left_right_warp">
      <div class="left_warp">商家ID</div>
      <div class="right_warp">{{detailForm.store_id}}</div>
  </div>
  <div class="config_left_right_warp">
      <div class="left_warp">商家名称</div>
      <div class="right_warp">{{detailForm.store_name}}</div>
  </div>
  <div class="config_left_right_warp">
      <div class="left_warp">用户昵称</div>
      <div class="right_warp">{{detailForm.nickname}}</div>
  </div>
  <div class="config_left_right_warp">
      <div class="left_warp">退款原因</div>
      <div class="right_warp">{{detailForm.processing_type}}</div>
  </div>
  <div class="config_left_right_warp">
      <div class="left_warp">具体描述</div>
      <div class="right_warp">{{detailForm.description}}</div>
  </div>
  <div class="config_left_right_warp">
      <div class="left_warp">凭证</div>
      <div class="right_warp">
        <img style="height:100px;margin-left:10px;" v-for="child in detailForm.proof_imgs" :src="child" alt="">
      </div>
  </div>
  <div class="config_left_right_warp">
      <div class="left_warp">处理人</div>
      <div class="right_warp">{{detailForm.processing_name}}</div>
  </div>
  <div class="config_left_right_warp">
      <div class="left_warp">处理时间</div>
      <div class="right_warp">{{detailForm.update_time}}</div>
  </div>
  </el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';
import close_brush from '../../js/close_brush';

import approvalUpLoad from '../../components/manual_refund_load';
import orderList from '../../js/order_list';
 export default {
   data () {
     return {
       explain:[{
          value:"图片大小为500K以内，最多上传5张"
       }],
       detailForm:{
          return_sn:'',
          order_sn:'',
          return_money:'',
          processing_type:'',
          store_id:'',
          store_name:'',
          nickname:'',
          processing_name:'',
          update_time:'',
          description:'',
          proof_imgs:[],
       },
       dialogVisibleDetail:false,
        titleLabel:"处理时间",
         statusOption:[],
         upLoadData1:{
           type:"default",
         },
          rules: {
            order_sn: [
              { required: true, message: '请输入订单编号', trigger: 'blur' },
              { min: 10, max:40, message: '长度在 10 到 40 个字符', trigger: 'blur' }
            ],
            bond: [
              { required: true, message: '请输入金额', trigger: 'blur' },
              { min: 1, max:4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
            ],
            remark: [
              { required: true, message: '请选择退款原因', trigger: 'change' }
            ],
        },
         ruleForm: {
           proof_imgs:[],
            order_sn: '',
            remark:'',
            bond:'',
            desc:''
          },
          form:{
              order_sn: '',
              nickname: '',
              store_id: '',
              store_name: '',
              processing_name: '',
              start_time: '',
              stop_time: '',
              remark:''
          },
         dialogVisible:false,
     	  currentPage:1,
    		totals:0,
    		pageSize:10,
     	  tableData: [],
        content_title:{
    			title1: "手动退款",
    			title2: "",
    			path1:'/home/orderManagement/manual_refund',
    			path2:''
    		}
     }
   },
   created(){
         var token = localStorage.getItem("token");
         if(token){
           this.upLoadData1.Authorization = token;
         }
     this.fetch();
     close_brush.searchManualReturnMoneyStatus("OrderService/searchManualReturnMoneyStatus",this);
   },
   components: {
      breadcrumb,picker,approvalUpLoad
   },
   methods:{
     addImg(val){
        this.ruleForm.proof_imgs = val;
     },
    deleteImg(val){
       this.ruleForm.proof_imgs = val;
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = {
              reason:this.ruleForm.remark,
              order_sn:this.ruleForm.order_sn,
              return_money:this.ruleForm.bond,
              description:this.ruleForm.desc,
              proof_imgs:this.ruleForm.proof_imgs,
            }
            close_brush.manualReturnMoney("OrderService/manualReturnMoney",data,this);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    manualRefund(){
        this.dialogVisible = true;
    },
   	getTime(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN NaN-0NaN-0NaN'){
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
    fetch(val){
   		var data = {
   			page:val?val:this.currentPage,
   			rows:this.pageSize,
        order_sn:this.form.order_sn,
        nickname:this.form.nickname,
        store_id:this.form.store_id,
        store_name	:this.form.store_name,
        remark	:this.form.remark,
        start_time:this.form.start_time,
        stop_time	:this.form.stop_time,
   		}
   		orderList.manualReturnMoneyList("OrderService/manualReturnMoneyList",data,this);
    },
   	searchListData(){
        this.fetch();
   	},
   	detailCoupon(params){
      this.detailForm.return_sn = params.return_sn;
      this.detailForm.order_sn = params.order_sn;
      this.detailForm.return_money = params.return_money;
      this.detailForm.processing_type = params.processing_type;
      this.detailForm.store_id = params.store_id;
      this.detailForm.store_name = params.store_name;
      this.detailForm.nickname = params.nickname;
      this.detailForm.remark = params.remark;
      this.detailForm.update_time = params.update_time;
      this.detailForm.description = params.description;
      this.detailForm.proof_imgs = params.proof_imgs;
      this.dialogVisibleDetail = true;
   	},
    handleCurrentChange(val) {
        this.fetch(val);
    }
   }
 }
</script>
