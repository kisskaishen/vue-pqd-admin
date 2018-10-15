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
					推广管理
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>商品ID</span>
					<div class="width-120">
						<el-input v-model="form.goods_id" placeholder="商品ID"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商品名称</span>
					<div class="width-120">
						<el-input v-model="form.key_word" placeholder="商品名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>限制推广</span>
					<div class="width-120">
					  <el-select v-model="form.is_promotion" placeholder="全部">
					    <el-option
					      v-for="item in status_option"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>所属类目</span>
					<div class="width-120">
				    <el-cascader
              style="width:260px"
					    expand-trigger="hover"
					    :options="optionsCategory"
					    v-model="cat_id_arr"
					    @change="handleChange">
					  </el-cascader>
          <!-- {{goods_categorys}} -->
					</div>
				</div>
				<div class="search_content">
					<span>有优惠券</span>
					<div class="width-120">
					  <el-select v-model="form.is_coupon" placeholder="全部">
					    <el-option
					      v-for="item in is_coupon_option"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
					<picker style="float:left;margin-bottom:10px;" :title="titleLabelOne" @onPassByVal='getTime'></picker>
					<el-button style="float:left;margin-left:10px;" type="primary" @click="searchListData()">查询</el-button>
					<el-button style="float:left;margin-left:10px;" type="primary" @click="limitedShopPromotion()">限制店铺推广</el-button>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="goods_id"
				      label="商品ID">
				    </el-table-column>
				    <el-table-column
				      prop="goods_name"
				      label="商品"
              width="300">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称">
				    </el-table-column>
				    <el-table-column
				      prop="category_name"
				      label="所属类目">
				    </el-table-column>
				    <el-table-column
				      prop="prom_price"
				      label="价格">
				    </el-table-column>
				    <el-table-column
				      prop="commission_rate_data"
				      label="推广佣金">
				    </el-table-column>
				    <el-table-column
				      prop="money"
				      label="优惠券">
				    </el-table-column>
				    <el-table-column
				      prop="prom_sales"
				      label="多赚销量">
				    </el-table-column>
				    <el-table-column
				      prop="store_count"
				      label="总销量">
				    </el-table-column>
				    <el-table-column
				      prop="update_time_data"
				      label="更新时间">
				    </el-table-column>
				    <el-table-column
				      prop="promStatus"
				      label="状态">
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
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
  <el-form-item label="商品" prop="is_limited">
    <el-checkbox v-model="ruleForm.is_limited_goods" :checked="ruleForm.is_limited_goods=='2'" :true-label="'2'" :false-label="'1'" name="type">限制推广</el-checkbox>
  </el-form-item>
  <!-- <el-form-item prop="name">
    <el-radio-group v-model="ruleForm.setTime">
      <el-radio :label="1">固定期限</el-radio>
      <el-radio :label="2">长期</el-radio>
    </el-radio-group>
  </el-form-item>
  <div class="" v-show="ruleForm.setTime==1">
    <picker title="限制时间" @onPassByVal='getTime'></picker>
  </div> -->
  <el-form-item label="原因" prop="remake" v-if="ruleForm.is_limited_goods==2">
          <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="ruleForm.remake">
      </el-input>
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
import picker from '../../components/picker';

import make_fun from '../../js/make_fun.js';
import Goods from '../../js/list_of_goods.js';
 export default {
   data () {
     return {
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
         		update_time:'',
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
    		}
     }
   },
   created(){
       this.fetch();
    	 make_fun.Goodscategory("Goodscategory/threeLevelTree",this);
		   make_fun.searchConf("Promotion/searchConf",this);
   },
   components: {
        breadcrumb,picker
   },
   methods:{
     limitedShopPromotion(){
        this.$router.push({path:"/home/quduoduo/shopPromotion"})
     },
     handleChange(val){
       this.form.cat_id = val;
     },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = {
              // store_id:this.ruleForm.store_id,
              goods_id:this.ruleForm.goods_id,
              goods_is_forbid:this.ruleForm.is_limited_goods,
              remake:this.ruleForm.remake,
              // store_is_forbid:this.ruleForm.is_limited_store,
            }
        		make_fun.promotionListSavePromot("Promotion/savePromot",data,this);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
     editCoupon(params){
       this.ruleForm.store_id = params.store_id;
       this.ruleForm.goods_id = params.goods_id;
       this.ruleForm.is_limited_store = params.store_is_forbid;
       this.ruleForm.is_limited_goods = params.goods_is_forbid;
       this.ruleForm.remake = params.remarks;
       this.dialogVisible = true;
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
          cat_id:this.form.cat_id,
          goods_id:this.form.goods_id,
          key_word:this.form.key_word,
          is_coupon:this.form.is_coupon,
          is_promotion:this.form.is_promotion,
          is_up:this.form.is_up,
          update_time:this.form.update_time,
    		}
    		make_fun.promotionList("Promotion/list",data,this);
     },
     	getTime(msg){
     		if(msg!=undefined){
  	   		if(msg[0]!='NaN-0NaN-0NaN 0NaN:0NaN:0NaN'){
  	   			     this.form.update_time = msg[0] +'/'+ msg[1];
  	        }else{
  	   			     this.form.update_time = '';
  	        }
          }else{
     			    this.form.update_time = '';
          }
     	}
   }
 }
</script>
