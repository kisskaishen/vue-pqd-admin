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
					海淘商品列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>海淘商品分类</span>
					<div class="width-120">
					  <el-select v-model="form.cat_id_map" placeholder="专场">
					    <el-option
					      v-for="item in haitao_cat"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>是否推荐</span>
					<div class="width-120">
						  <el-select v-model="form.is_recommend" placeholder="请选择">
						    <el-option
						      v-for="item in is_recommendOption"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
					</div>
				</div>
				<!--<div class="search_content">
					<span>是否点赞商品</span>
					<div class="width-120">
					  <el-select v-model="form.the_raise" placeholder="专场">
					    <el-option
					      v-for="item in options"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					  </el-select>
					</div>
				</div>-->
				<!--<div class="search_content">
					<span>商品特殊类型</span>
					<div class="width-120">
					  <el-select v-model="form.is_special" placeholder="专场">
					    <el-option
					      v-for="item in options"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					  </el-select>
					</div>
				</div>-->
				<!--<div class="search_content">
					<span>专场分类</span>
					<div class="width-120">
					  <el-select v-model="form.exclusive_cat" placeholder="专场">
					    <el-option
					      v-for="item in options"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					  </el-select>
					</div>
				</div>-->
				<div class="search_content">
					<span>审核状态</span>
					<div class="width-120">
					  <el-select v-model="form.is_audit" placeholder="专场">
					    <el-option
					      v-for="item in is_audit"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>是否显示</span>
					<div class="width-120">
					  <el-select v-model="form.is_show" placeholder="专场">
					    <el-option
					      v-for="item in is_showOption"
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
					  <el-select v-model="form.is_on_sale" placeholder="专场">
					    <el-option
					      v-for="item in is_on_sale"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<!--<div class="search_content">
					<span>是否海淘商品</span>
					<div class="width-120">
					  <el-select v-model="form.is_haitao_goods" placeholder="专场">
					    <el-option
					      v-for="item in options"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					  </el-select>
					</div>
				</div>-->
				<div class="search_content">
					<span>商家名称</span>
					<div class="width-120">
						<el-input v-model="form.store_name" placeholder="商家名称"></el-input>
					</div>
				</div>
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
					<el-button type="primary" @click="searchList()">查询</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="goods_id"
				      label="ID">
				    </el-table-column>
				    <el-table-column
				      prop="goods_name"
				      label="商品名称"
				      width="300">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称">
				    </el-table-column>
				    <el-table-column
				      prop="cate_name"
				      label="分类">
				    </el-table-column>
				    <el-table-column
				      prop="prom_price"
				      label="价格">
				    </el-table-column>
				    <el-table-column
				      label="库存">
					      <template slot-scope="scope">
					      	  <el-input @focus="editStoreCount(scope.row,'store_count')" v-model="scope.row.store_count" placeholder="请输入内容"></el-input>
        					</el-switch>
					      </template>
				    </el-table-column>
				    <el-table-column
				      label="是否显示">
					      <template slot-scope="scope">
					      	  <el-switch
					          v-model="scope.row.is_show"
					          active-color="#00A854"
					          active-value="1"
					          inactive-color="#F04134"
					          inactive-value="0"
					          @change="changeShow(scope.row)">
        					</el-switch>
					      </template>
				    </el-table-column>
				    <el-table-column
				      label="上架">
					      <template slot-scope="scope">
					      	  <el-switch
					          v-model="scope.row.is_on_sale"
					          active-color="#00A854"
					          active-value="1"
					          inactive-color="#F04134"
					          inactive-value="0"
					          @change="changeSwitch(scope.row)">
        					</el-switch>
					      </template>
				    </el-table-column>
				    <el-table-column
				      label="推荐">
					      <template slot-scope="scope">
					      	  <el-switch
					          v-model="scope.row.is_recommend"
					          active-color="#00A854"
					          active-value="1"
					          inactive-color="#F04134"
					          inactive-value="0"
					          @change="changeRecommend(scope.row)">
        					</el-switch>
					      </template>
				    </el-table-column>
				    <el-table-column
				      label="排序">
					      <template slot-scope="scope">
					      	  <el-input @focus="editStoreCount(scope.row,'sort')" v-model="scope.row.sort" placeholder="请输入内容"></el-input>
					      </template>
				    </el-table-column>
				    <el-table-column
				      prop="is_audit_name"
				      label="审核状态">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				      	<a v-show="scope.row.btn.edit==true" target="_blank":href="'/home/commodityManagement/listOfGoodsDetail?id='+scope.row.goods_id">编辑</a>
				        <!--<el-button type="text" size="small" @click="entryDetail(scope.row.goods_id)">编辑</el-button>-->
				        <el-button v-show="scope.row.btn.audit==true" type="text" size="small" @click="examineData(scope.row)">审核</el-button>
				        <el-button v-show="scope.row.btn.del==true" type="text" size="small" @click="deleteRow(scope.row,scope.$index)">删除</el-button>
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
<el-dialog :title="titles" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item :label="labels" :label-width="formLabelWidth">
      <el-input v-model="form.store_count" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editStoreCountFun()">确 定</el-button>
  </div>
</el-dialog>

<el-dialog
  title="修改海淘商品审核状态"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="warp_dialog">
  	  <!--<el-radio v-model="radio" label="0">待审核</el-radio>-->
  	  <el-radio v-model="radio" label="1">已审核</el-radio>
  	  <el-radio v-model="radio" label="2">审核拒绝</el-radio>
  </div>
  <div class="warp_dialog">
  	  <span class="width_guding">拒绝原因：</span>
  	  <span class="reason_text">
		<!--<el-input
		  type="textarea"
		  :rows="5"
		  placeholder="请输入内容"
		  v-model="reason">
		</el-input>-->
		<textarea v-model="reason" style="height: 50px;width: 370px;resize: none;"></textarea>
  	  </span>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="examineDataFun()">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import Goods from '../../js/list_of_goods.js';
import breadcrumb from '../../components/breadcrumb';
import Haitao from '../../js/haitao.js';
 export default {
   data () {
     return {
     	dialogVisible:false,
     	radio:'1',
     	reason:'',
     	rowData:{
     		store_count:0
     	},
     	is_recommendOption:[],
     	is_on_sale:[],
     	is_showOption:[],
     	is_recommend:[],
     	haitao_cat:[],
     	is_audit:[],
     	titles:'库存',
     	labels:'修改库存',
		formLabelWidth:'100px',
		dialogFormVisible:false,
		the_raise:[],
     	form:{
     		store_name:'',
     		exclusive:'',
     		store_count:0,
     		cat_id_map:'',
     		store_name:'',
     		goods_id:'',
     		key_word:'',
     		the_raise:'',
     		is_special:'',
     		exclusive_cat:'',
     		is_audit:0,
     		is_show:'',
     		is_on_sale:'',
     	},
     	currentPage:1,
		totals:0,
		pageSize:10,
     	 tableData: [],
     	input:'',
     	value:'',
     	options:[],
		content_title:{
			title1: "海淘商品列表",
			title2: "",
			path1:'/home/haitao/sea_good_list',
			path2:''
		}
     }
   },
   created(){
	   	var data = {
	   		page:this.currentPage,
	   		rows:this.pageSize,
	   		cat_id_map:this.form.cat_id_map,
	   		store_name:this.form.store_name,
	   		goods_id:this.form.goods_id,
	   		key_word:this.form.key_word,
			is_recommend:this.form.is_recommend,
	   		is_audit:this.form.is_audit,
	   		is_show:this.form.is_show,
	   		is_on_sale:this.form.is_on_sale,
	   		is_haitao_goods:'1',
	   	}
		Haitao.haiTaoList("goods/list",data,this);
		Haitao.searchConf("goods/searchConf",this);
   },
   components: {
		breadcrumb
   },
   methods:{ 
   	examineDataFun(){
		var data = {
			id:this.form.goods_id,
			name:'is_audit' ,
			value:this.radio,
			reason:this.reason 
		}
		Haitao.editField("goods/editField",data,this);
   	},
   	examineData(params){
   		this.dialogVisible = true;
// 		this.radio = params.is_audit;
   		this.form.goods_id = params.goods_id;
   		this.rowData = params;
   	},
   	editStoreCountFun(){
   		if(this.nameStr=='store_count'){
			var data = {
				id:this.form.goods_id,
				name:'store_count' ,
				value:this.form.store_count
			}
   		}else if(this.nameStr=='sort'){
			var data = {
				id:this.form.goods_id,
				name:'sort' ,
				value:this.form.store_count
			}
   		}
		Haitao.editField("goods/editField",data,this,"haitao");
   	},
   	editStoreCount(params,str){
   		if(str=='store_count'){
   			this.titles='库存';
     		this.labels='商品库存';
   			this.nameStr = 'store_count';
	   		this.form.store_count = params.store_count;
   		}else if(str=='sort'){
   			this.titles='排序';
     		this.labels='商品排序';
   			this.nameStr = 'sort';
	   		this.form.store_count = params.sort;
   		}
   		this.dialogFormVisible = true;
   		this.form.goods_id = params.goods_id;
   		this.rowData = params;
   	},
   	changeRecommend(params){
   		/* 是否推荐 */
		var data = {
			id:params.goods_id,
			name:'is_recommend' ,
			value:params.is_recommend
		}
		Haitao.editField("goods/editField",data,this,"haitao");
   	},
   	changeSwitch (params) {
   		/* 上下架 */
		var data = {
			id:params.goods_id,
			name:'is_on_sale' ,
			value:params.is_on_sale
		}
		Haitao.editField("goods/editField",data,this,"haitao");
    },
   	changeShow(params){
   		/* 是否显示 */
		var data = {
			id:params.goods_id,
			name:'is_show' ,
			value:params.is_show
		}
		Haitao.editField("goods/editField",data,this,"haitao");
   	},
   	deleteRow(params,index){
   		this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
			var data = {
				goods_id:params.goods_id
			}
			Haitao.goodsDel("goods/del",data,this,index);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   	},
   	searchList(){
	   	var data = {
	   		page:this.currentPage,
	   		rows:this.pageSize,
	   		cat_id_map:this.form.cat_id_map,
	   		store_name:this.form.store_name,
	   		goods_id:this.form.goods_id,
	   		key_word:this.form.key_word,
			is_recommend:this.form.is_recommend,
	   		is_audit:this.form.is_audit,
	   		is_show:this.form.is_show,
	   		is_on_sale:this.form.is_on_sale,
	   		is_haitao_goods:'1',
	   	}
		Haitao.haiTaoList("goods/list",data,this);
   	},
      handleCurrentChange(val) {
	   	var data = {
	   		page:this.currentPage,
	   		rows:this.pageSize,
	   		cat_id_map:this.form.cat_id_map,
	   		store_name:this.form.store_name,
	   		goods_id:this.form.goods_id,
	   		key_word:this.form.key_word,
			is_recommend:this.form.is_recommend,
	   		is_audit:this.form.is_audit,
	   		is_show:this.form.is_show,
	   		is_on_sale:this.form.is_on_sale,
	   		is_haitao_goods:'1',
	   		page:val,
	   		rows:this.pageSize
	   	}
		Haitao.haiTaoList("goods/list",data,this);
      },
		entryDetail(id){
			this.$router.push({name:'list_of_goods_detail',query:{id:id}})
		},
   }
 }
</script>
