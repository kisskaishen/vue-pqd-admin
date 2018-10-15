<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
.warp_dialog{
	margin-bottom:20px;
	overflow:hidden;
	.width_guding{
		width:70px;
		float:left;
		display: inline-block;
	}
	.reason_text{
		float:left;
	}
}
.textarea_text{
	height: 100px;
	width: 280px;
	resize: none;
	border:1px solid #c0c4cc;
	border-radius: 4px;
	padding:10px;
}
.input_check{
	-webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
}
</style>
<template>
 <div class="business_listings">
	<breadcrumb :content="content_title"></breadcrumb>
	<div class="container">
		<div class="search_admin_list_table">
			<div class="search_admin_list_table_title">
				<span>
					商品列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>类目</span>
					<div class="width-120">
					    <el-cascader
					    	@focus="getCategory()"
						    expand-trigger="hover"
						    :options="optionsCategory"
						    v-model="selectedOptions2"
						    @change="handleChange">
						  </el-cascader>
					</div>
				</div>
				<div class="search_content">
					<span>商户名</span>
					<div class="width-120">
						<el-input v-model="form.store_name" placeholder="商户名"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商户ID</span>
					<div class="width-120">
						<el-input v-model="form.store_id" placeholder="商户名"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商品ID</span>
					<div class="width-120">
						<el-input v-model="form.goods_id" placeholder="商品ID"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>审核状态</span>
					<div class="width-120">
					  <el-select v-model="form.is_audit" placeholder="请选择">
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
					<span>商品名称</span>
					<div class="width-120">
						<el-input v-model="form.key_word" placeholder="商品名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>上下架状态</span>
					<div class="width-120">
					  <el-select v-model="form.is_on_sale" placeholder="请选择">
					    <el-option
					      v-for="item in is_on_sale"
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
						  <el-select v-model="form.is_show" placeholder="请选择">
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
				      label="ID">
				    </el-table-column>
				    <el-table-column
				      prop="goods_name"
				      label="商品名称"
				      width="300px">
				    </el-table-column>
				    <el-table-column
				      prop="store_id"
				      label="商户ID"
				      width="70px">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称">
				    </el-table-column>
				    <el-table-column
				      prop="cate_name"
				      label="分类">
				    </el-table-column>
				    <!--<el-table-column
				      prop="virtual_sales"
				      label="虚拟销量">
				    </el-table-column>-->
				    <el-table-column
				      prop="sales"
				      label="销量">
				    </el-table-column>
				    <el-table-column
				      prop="prom_price"
				      label="团购价格">
				    </el-table-column>
				    <el-table-column
				      prop="store_count"
				      label="库存">
					      <!--<template slot-scope="scope">
					      	  <el-input @focus="editStoreCount(scope.row,'store_count')" v-model="scope.row.store_count" placeholder="请输入内容"></el-input>
        					</el-switch>
					      </template>-->
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
				      label="审核">
					      <template slot-scope="scope">
					      	<span v-if="scope.row.is_audit == '0'">待审核</span>
					      	<span v-else-if="scope.row.is_audit == '1'">审核通过</span>
					      	<span v-else-if="scope.row.is_audit == '2'">审核拒绝</span>
					      </template>
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button v-show="scope.row.btn.edit==true" type="text" size="small" @click="entryDetail(scope.row.goods_id)">编辑</el-button>
				        <!--<a target="_blank" v-show="scope.row.btn.edit==true" :href="'/home/commodityManagement/listOfGoodsDetail?id='+scope.row.goods_id">编辑</a>-->
				        <el-button v-show="scope.row.btn.audit==true" type="text" size="small" @click="examineData(scope.row)">审核</el-button>
				        <el-button v-show="scope.row.btn.del==true" type="text" size="small" @click="goodsDel(scope.row.goods_id,scope.$index)">删除</el-button>
				        <el-button type="text" size="small" @click="salesVolume(scope.row)">增减销量</el-button>
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
  title="修改商品审核状态"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="warp_dialog">
  	  <el-radio v-model="radio" label="1">审核通过</el-radio>
  	  <el-radio v-model="radio" label="2">审核拒绝</el-radio>
  </div>
  <div class="warp_dialog">
  	  <span class="width_guding">拒绝原因：</span>
  	  <span class="reason_text">
		<textarea v-model="reason" style="height: 50px;width: 370px;resize: none;"></textarea>
  	  </span>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="examineDataFun()">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="增减销量"
  :visible.sync="dialogVisibleSale"
  width="30%">
  <div class="warp_dialog">
  	  <span class="width_guding">类型：</span>
  	  <el-select v-model="saleForm.type" placeholder="请选择">
	    <el-option
	      v-for="item in optionsSale"
	      :key="item.value"
	      :label="item.label"
	      :value="item.value">
	    </el-option>
	  </el-select>
  </div>
  <div class="warp_dialog">
  	  <span class="width_guding">销量：</span>
  	  <span class="reason_text">
		<input class="input_check" v-model="saleForm.virtual_sales" maxlength="9" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
  	  </span>
  </div>
  <div class="warp_dialog">
  	  <span class="width_guding">备注：</span>
  	  <span class="reason_text">
		<textarea class="textarea_text" v-model="saleForm.desc" ></textarea>
  	  </span>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleSale = false">取 消</el-button>
    <el-button type="primary" @click="saleDataFun()">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import Goods from '../../js/list_of_goods.js';
import breadcrumb from '../../components/breadcrumb';
 export default {
   data () {
     return {
     	currentItem:{
     		virtual_sales:''
     	},
     	saleForm:{
     		type:1,
     		virtual_sales:'',
     		desc:'',
     		sales:''
     	},
     	optionsSale:[],
     	dialogVisibleSale:false,
     	is_showOption:[],
     	is_recommendOption:[],
     	reason:'',
     	titles:'库存',
     	labels:'修改库存',
     	the_raise:[],
     	is_special:[],
     	is_on_sale:[],
     	haitao_cat:[],
     	is_audit:[],
     	goodstatus:[],
     	exclusive_cat:[],
     	selectedOptions2:[],
     	radio:'1',
     	dialogVisible:false,
     	nameStr:'',
     	rowData:{
     		store_count:0
     	},
     	form:{
     		goods_id:'',
     		store_count :0,
     		sort:0,
     		cat_id_1:'',
     		cat_id_2:'',
     		store_name:'',
     		is_on_sale:'',
     		key_word:'',
     		goodstatus:'',
     		is_audit:0,
     		the_raise:'',
     		is_special:'',
     		exclusive_cat:'',
     		haitao_cat:'',
     		store_id:'',
     	},
     	formLabelWidth:'100px',
     	dialogFormVisible:false,
		currentPage:1,
		totals:0,
		pageSize:10,
     	 tableData: [],
     	input:'',
     	value:'',
     	options:[
     		{label:'',
     		name:''}
     	],
     	optionsCategory:[],
		content_title:{
			title1: "商品列表",
			title2: "",
			path1:'/home/commodityManagement/listOfGoods',
			path2:''
		}
     }
   },
   created(){
   		/* 商品列表 goods/list */
		var data = {
			page:this.currentPage,
			rows:this.pageSize,
	   		is_audit:this.form.is_audit,
		}
		Goods.goodsList("goods/list",data,this);
		Goods.searchConf("goods/searchConf",this);
		Goods.Goodscategory("Goodscategory/twoLevelTree",this);
   },
   components: {
		breadcrumb
   },
   methods:{
   	saleDataFun(){
   		if(this.saleForm.virtual_sales==''){
   			this.$message({
   				type:'info',
   				message:'请输入销量'
   			})
   			return
   		}else if(this.saleForm.desc==''){
	   			this.$message({
	   				type:'info',
	   				message:'请输入备注信息'
	   			})
	   			return
   		}
   		var data = {
   			id:this.saleId,
   			type:this.saleForm.type,
   			virtual_sales:this.saleForm.virtual_sales,
   			desc:this.saleForm.desc,
   		}
   		Goods.updateGoodsSale("goods/updateGoodsSale",data,this);
   	},
   	salesVolume(params){
   		this.saleId = params.goods_id;
   		this.currentItem = params;
   		Goods.saleType("goods/saleType",this);
   	},
   	searchListData(){
   		if(this.form.is_audit==99){
	   		if(this.form.goods_id==''&&this.form.key_word==''&&this.form.store_name==''){
   				this.$message({
   					type:'info',
   					message:'请您输入商品ID或者商品名称或者商户名称'
   				})
   				return
	   		}
   		}
   		var data = {
			page:this.currentPage,
			rows:this.pageSize,
   			cat_id_map:this.selectedOptions2,
   			store_name:this.form.store_name,
   			goods_id:this.form.goods_id,
   			store_id:this.form.store_id,
   			key_word:this.form.key_word,
   			is_audit:this.form.is_audit,
   			is_show:this.form.is_show,
   			is_on_sale:this.form.is_on_sale,
   			is_recommend:this.form.is_recommend,
   		}
		Goods.goodsList("goods/list",data,this);
   	},
   	handleChange(val){
   		this.selectedOptions2 = val;
   	},
   	getCategory(){
   	},
   	examineDataFun(){
		var data = {
			id:this.form.goods_id,
			name:'is_audit' ,
			value:this.radio,
			reason:this.reason
		}
		Goods.editField("goods/editField",data,this);
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
		Goods.editField("goods/editField",data,this);
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
		Goods.editField("goods/editField",data,this);
   	},
   	changeShow(params){
   		/* 是否显示 */
		var data = {
			id:params.goods_id,
			name:'is_show' ,
			value:params.is_show
		}
		Goods.editField("goods/editField",data,this);
   	},
   	goodsDel(id,index){
   		this.$confirm('此操作将删除商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
			var data = {
				goods_id:id
			}
			Goods.goodsDel("goods/del",data,this,index);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
   	},
   	changeSwitch (params) {
   		console.log(JSON.stringify(params.is_on_sale))
   		/* 上下架 */
		var data = {
			id:params.goods_id,
			name:'is_on_sale' ,
			value:params.is_on_sale
		}
		Goods.editField("goods/editField",data,this);
    },
		entryDetail(id){
			this.$router.push({name:'list_of_goods_detail',query:{id:id,title:"listOfGoods"}})
		},
	      handleCurrentChange(val) {
			var data = {
				page:val,
				rows:this.pageSize,
	   			cat_id_map:this.selectedOptions2,
	   			store_name:this.form.store_name,
	   			goods_id:this.form.goods_id,
   				store_id:this.form.store_id,
	   			key_word:this.form.key_word,
	   			is_audit:this.form.is_audit,
	   			is_show:this.form.is_show,
	   			is_on_sale:this.form.is_on_sale,
	   			is_recommend:this.form.is_recommend,
			}
			Goods.goodsList("goods/list",data,this);
	      }
   }
 }
</script>
