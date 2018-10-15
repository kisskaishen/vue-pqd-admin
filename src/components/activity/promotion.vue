<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
@import "../../less/marketing";
</style>
<template>
	<div>
		<div class="search_btn">
			<div class="search_content">
				<span>商品ID</span>
				<div class="width-120">
					<el-input v-model="ruleForm.goods_id" placeholder="商品ID"></el-input>
				</div>
			</div>
			<div class="search_content">
				<span>商品名称</span>
				<div class="width-120">
					<el-input v-model="ruleForm.goods_name" placeholder="商品名称"></el-input>
				</div>
			</div>
			<div class="search_content">
				<span>商家名称</span>
				<div class="width-120">
					<el-input v-model="ruleForm.store_name" placeholder="商家名称"></el-input>
				</div>
			</div>
			<div class="search_content">
				<span>选择分类</span>
				<div class="width-120">
			      <el-select v-model="ruleForm.cat_id" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
			</div>
			<div class="search_content">
				<el-button type="primary" @click="searchListData1()">查询</el-button>
			</div>
		</div>
		<div class="table_record">
			  <el-table
			    :data="examineData"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="goods_id"
			      label="商品ID"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="goods_name"
			      label="商品名称"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="store_name"
			      label="商家名称">
			    </el-table-column>
			    <el-table-column
			      prop="cat_name"
			      label="所属分类">
			    </el-table-column>
			    <el-table-column
			      prop="store_count"
			      label="商品库存">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="100">
			      <template slot-scope="scope">
			        <el-button v-show="scope.row.btn.delete" @click="examineDelete(scope.row)" type="text" size="small">删除</el-button>
			        <el-button v-show="scope.row.btn.detail" @click="searchDetail(scope.row,'detail')" type="text" size="small">详情</el-button>
			        <el-button v-show="scope.row.btn.audit" @click="searchDetail(scope.row,'audit')" type="text" size="small">审核</el-button>
			        <!--<router-link v-show="scope.row.btn.audit" target="_blank" :to="{path:'/home/marketing/resource_activity_goods',query:{action:action,activity_id:activity_id,id:scope.row.id,goods_id:scope.row.goods_id,}}">详情</router-link>-->
			      </template>
			    </el-table-column>
			  </el-table>
	        <div class="pagination" v-show="examineData.length!=0">
	            <el-pagination
	                @current-change="handleCurrentChange1"
	                :current-page="currentPage"
	                :page-size="pageSize"
	                layout="total, prev, pager, next, jumper"
	                :total="total">
	            </el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import Market from '../../js/resource_activity';
export default{
	data(){
		return{
			examineData:[],
			total:0,
	     	pageSize:10,
	     	currentPage:1,
			ruleForm:{
				goods_id:'',
				goods_name:'',
				store_name:'',
				cat_id:'',
			},
			selectedOptions1:'',
			options1:'',
			activity_id:'',
			action:'',
		}
	},
	created(){
		this.activity_id = this.$route.query.activity_id;
		this.action = this.$route.query.action;
		this.fetch();
	},
	watch:{
		audit_status(){
			this.fetch()
		}
	},
	methods:{
      fetch(val){
	        var data = {
	        	activity_id:this.activity_id,
				action:this.action,
	        	goods_id:this.ruleForm.goods_id,
	        	goods_name:this.ruleForm.goods_name,
	        	store_name:this.ruleForm.store_name,
	        	cat_id:this.ruleForm.cat_id,
	        	audit_status:this.audit_status,
	        	page:val?val:this.currentPage,
	        	rows:this.pageSize,
	        }
	        Market.activeGoodsList('Activities/activeGoodsList',data,this);
      },
		searchListData1(){
			this.fetch()
		},
		handleCurrentChange1(val){
			this.fetch(val)
		},
		searchDetail(params,btnName){
			 this.$router.push({path:'/home/marketing/resource_activity_goods',query:{action:this.action,activity_id:this.activity_id,id:params.id,goods_id:params.goods_id,title:"resource_activity_detail",btn:btnName}})
		},
	  examineDelete(params){
	   		this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	   		var data = {
	   			activity_id:this.activity_id,
				action:this.action,
	   			goods_id:params.goods_id,
	   			id:params.id,
	   		}
	   		Market.storeDelGoods('Activities/delGoods',data,this,params);
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });
	        });
	  }
	},
	props:[
		"audit_status","options"
	]
}
</script>
