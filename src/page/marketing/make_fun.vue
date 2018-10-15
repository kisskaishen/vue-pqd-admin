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
					商品管理
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
					<span>所属类目</span>
					<div class="width-120">
					  <el-select v-model="form.cat_id" placeholder="全部">
					    <el-option
					      v-for="item in is_coupon_option"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>是否上架</span>
					<div class="width-120">
					  <el-select v-model="form.coupon_status" placeholder="全部">
					    <el-option
					      v-for="item in is_promotion_option"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
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
				<div class="search_content">
					<picker :title="titleLabelOne" @onPassByVal='getTime'></picker>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchListData()">查询</el-button>
				</div>
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
				      prop="coupon_status"
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
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';

import make_fun from '../../js/make_fun.js';
 export default {
   data () {
     return {
        is_coupon_option:[],
        is_promotion_option:[],
        status_option:[],
       	form:{
         		cat_id:'',
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
    		pageSize:2,
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
		   make_fun.searchConf("Promotion/searchConf",this);
   },
   components: {
        breadcrumb,picker
   },
   methods:{
     editCoupon(params){
       var tit = params.store_is_forbid == '1'?"限制推广":"取消限制";
       this.$confirm('此操作将永'+tit+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var data = {
              goods_id:params.goods_id,
              is_forbid:params.store_is_forbid=='1'?"2":"1"
            }
     		   make_fun.savePromot("Promotion/savePromot",data,this);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
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
  	   		if(msg[0]!='NaN-0NaN-0NaN'){
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
