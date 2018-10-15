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
					限制店铺推广列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>商家ID</span>
					<div class="width-120">
						<el-input v-model="form.store_id" placeholder="商品ID"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商家名称</span>
					<div class="width-120">
						<el-input v-model="form.store_name" placeholder="商品名称"></el-input>
					</div>
				</div>
					<picker style="float:left;margin-bottom:10px;" :title="titleLabelOne" @onPassByVal='getTime'></picker>
					<el-button style="float:left;margin-left:10px;" type="primary" @click="searchListData()">查询</el-button>
					<el-button style="float:left;margin-left:10px;" type="primary" @click="addStore()">添加</el-button>
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
				      label="商户名称">
				    </el-table-column>
				    <el-table-column
				      prop="forbid_add_time_name"
				      label="更新时间">
				    </el-table-column>
				    <el-table-column
				      prop="forbid_remark"
				      label="限制推广备注">
				    </el-table-column>
				    <el-table-column
				      prop="is_forbid_name"
				      label="是否限制">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="editCoupon(scope.row)">限制推广</el-button>
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
  title="限制推广"
  :visible.sync="dialogVisible"
  width="600px">
  <el-form :model="addRuleForm" :rules="rules" ref="addRuleForm" label-width="100px" class="demo-ruleForm">
  <!-- <el-form-item label="店铺" prop="is_limited">
    <el-checkbox v-model="ruleForm.is_limited_store" :true-label="2" :false-label="1" name="type">限制推广</el-checkbox>
    <span>（若店铺限制推广，则该店铺所有商品限制推广）</span>
  </el-form-item> -->
  <!-- <el-form-item prop="name">
    <el-radio-group v-model="ruleForm.setTime">
      <el-radio :label="1">固定期限</el-radio>
      <el-radio :label="2">长期</el-radio>
    </el-radio-group>
  </el-form-item>
  <div class="" v-show="ruleForm.setTime==1">
    <picker title="限制时间" @onPassByVal='getTime'></picker>
  </div> -->
  <el-form-item label="填写店铺ID" prop="is_limited">
      <el-input size="small" v-model="addRuleForm.store_id" ></el-input>
  </el-form-item>
  <!-- <el-form-item label="店铺" prop="is_limited">
    <el-checkbox v-model="ruleForm.is_limited_goods" :checked="ruleForm.is_limited_goods=='2'" :true-label="'2'" :false-label="'1'" name="type">限制推广</el-checkbox>
  </el-form-item> -->
  <!-- <el-form-item prop="name">
    <el-radio-group v-model="ruleForm.setTime">
      <el-radio :label="1">固定期限</el-radio>
      <el-radio :label="2">长期</el-radio>
    </el-radio-group>
  </el-form-item>
  <div class="" v-show="ruleForm.setTime==1">
    <picker title="限制时间" @onPassByVal='getTime'></picker>
  </div> -->
  <el-form-item label="原因" prop="remake">
          <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="addRuleForm.remake">
      </el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('addRuleForm')">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';

import make_fun from '../../js/make_fun.js';
import Goods from '../../js/list_of_goods.js';
 export default {
   data () {
     return {
        addRuleForm:{
          store_id:'',
          remake:''
        },
      	propsDefault:{
      		value:'value',
      		label:'label',
      		children:'children'
      	},
        rules: {
          is_limited_store: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          is_limited_goods: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          remake: [
            { required: true, message: '请输入限制原因', trigger: 'blur' },
            { min: 3, max: 150, message: '长度在 3 到 150个字符', trigger: 'blur' }
          ],
        },
       ruleForm:{
         is_limited_store:'',
         is_limited_goods:'',
         remake:'',
       },
        dialogVisible:false,
        is_coupon_option:[],
        optionsCategory:[],
        is_promotion_option:[],
        status_option:[],
        cat_id_arr:[],
       	form:{
         		cat_id:[],
         		goods_id:'',
         		key_word:'',
         		is_coupon:'',
         		is_promotion:'',
         		is_up:'',
         		forbid_add_time:'',
       	},
     	  titleLabelOne:'更新时间',
     	  currentPage:1,
    		totals:0,
    		pageSize:10,
     	  tableData: [],
    		content_title:{
    			title1: "趣多多赚",
    			title2: "",
    			path1:'/home/marketing/make_fun',
    			path2:''
    		},
        is_store_limite:true,//默认取消限制
     }
   },
   created(){
       this.fetch();
   },
   components: {
        breadcrumb,picker
   },
   methods:{
     addStore(){
         this.addRuleForm.store_id = '';
         this.addRuleForm.remake = '';
         this.is_store_limite = false;
         this.ruleForm.is_limited_goods = 2;
         this.ruleForm.store_id = '';
         this.dialogVisible = true;
     },
     limitedShopPromotion(){
        this.$router.push({path:"/home/quduoduo/shopPromotion"})
     },
     handleChange(val){
       this.form.cat_id = val;
     },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.is_limited_goods==2){
                var data = {
                  store_id:this.addRuleForm.store_id,
                  remake:this.addRuleForm.remake,
                }
            		make_fun.promotionListSavePromot("Promotion/addStore",data,this);
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
     editCoupon(params){
        this.$confirm('您确定要取消店铺推广限制, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              var data = {
                store_id:params.store_id,
              }
              make_fun.promotionListSavePromot("Promotion/cancelStore",data,this);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
       // this.is_store_limite = true;
       // this.ruleForm.is_limited_goods = 1;
       // this.ruleForm.store_id = params.store_id;
       // this.dialogVisible = true;
     },
     searchListData(){
       this.fetch();
     },
     handleCurrentChange(val){
       this.fetch(val);
     },
     fetch(val){
    		var data = {
    			page:val?val:this.currentPage,
    			rows:this.pageSize,
          forbid_add_time:this.form.forbid_add_time,
          store_name:this.form.store_name,
          store_id:this.form.store_id,
    		}
    		make_fun.promotionList("Promotion/storeList",data,this);
     },
     	getTime(msg){
     		if(msg!=undefined){
  	   		if(msg[0]!='NaN-0NaN-0NaN 0NaN:0NaN:0NaN'){
  	   			     this.form.forbid_add_time = msg[0] +'/'+ msg[1];
  	        }else{
  	   			     this.form.forbid_add_time = '';
  	        }
          }else{
     			    this.form.forbid_add_time = '';
          }
     	}
   }
 }
</script>
