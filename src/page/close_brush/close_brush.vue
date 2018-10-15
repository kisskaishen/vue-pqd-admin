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
					关闭订单
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>订单号</span>
					<div class="width-120">
						<el-input v-model="form.order_sn" placeholder="订单号"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="closeOrder()">关闭订单</el-button>
				</div>
			</div>
		</div>
    <el-button type="primary" @click="manualRefund()">手动退款</el-button>
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
      <approval-up-load :upLoadData="upLoadData1" @addImg="addImg" @deleteImg="deleteImg"></approval-up-load>
    </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import close_brush from '../../js/close_brush';
import approvalUpLoad from '../../components/manual_refund_load';
 export default {
   data () {
     return {
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
       dialogVisible:false,
     	form:{
     		order:'',
     	},
  		content_title:{
  			title1: "关闭订单",
  			title2: "",
  			path1:'/home/closeBrush',
  			path2:''
  		}
     }
 	},
 	components: {
		breadcrumb,approvalUpLoad
   },
 	created(){
      var token = localStorage.getItem("token");
      if(token){
        this.upLoadData1.Authorization = token;
      }
    close_brush.searchManualReturnMoneyStatus("OrderService/searchManualReturnMoneyStatus",this);
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
 		closeOrder(){
        	if(this.form.order_sn==""||this.form.order_sn==undefined){
        		this.$message({
					type:"info",
					message:"请输入正确的订单号"
				})
        		return
        	}
 		this.$confirm('此操作将关闭订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
	 		var data = {
	 			order_sn:this.form.order_sn,
	 		}
 			close_brush.closeTheOrder("Order/closeTheOrder",data,this);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
 		},
 	}
}
</script>
