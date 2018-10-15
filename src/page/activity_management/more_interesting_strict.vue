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
					趣多严选
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>专场</span>
					<div class="width-120">
					  <el-select v-model="exclusive" placeholder="专场">
					    <el-option
					      v-for="item in optionsExclusive"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>商户名</span>
					<div class="width-120">
						<el-input v-model="store_name" placeholder="商户名"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchList()">查询</el-button>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="entryDetail('4556')">添加商户商品</el-button>
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
				      width="400">
				    </el-table-column>
				    <el-table-column
				      prop="exclusive_name"
				      label="专区名称">
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
				      prop="shop_price"
				      label="市场价">
				    </el-table-column>
				    <el-table-column
				      prop="prom_price"
				      label="团购价">
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
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="editListData(scope.row.goods_id)">编辑</el-button>
				        <el-button type="text" size="small" @click="deleteGoods(scope.row.goods_id,scope.$index)">删除</el-button>
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
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import More from '../../js/more_interesting_strict.js';
import Goods from '../../js/list_of_goods.js';
 export default {
   data () {
     return {
     	titles:'库存',
     	labels:'修改库存',
		formLabelWidth:'100px',
		form:{
			store_count:0
		},
		dialogFormVisible:false,
     	exclusive:'',
		currentPage:1,
		totals:0,
		pageSize:10,
     	 tableData: [],
     	store_name:'',
     	value:'',
     	optionsExclusive:[],
		content_title:{
			title1: "趣多严选",
			title2: "",
			path1:'/home/activityManagement/moreInterestingStrict',
			path2:''
		}
     }
   },
   created(){
/* 活动管理-0.1秒杀-商品列表  Strict/list */
		var data = {
			page:1,
			rows:this.pageSize
		}
		More.Strict("Strict/list",data,this);
		More.ExclusiveList("Exclusive/list",data,this);
   },
   components: {
breadcrumb
   },
   methods:{
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
		Goods.editField("goods/editField",data,this,"moreInterestingStrict");
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
		Goods.editField("goods/editField",data,this,"moreInterestingStrict");
   	},
		   	changeSwitch (params) {
		   		console.log(JSON.stringify(params.is_on_sale))
		   		/* 上下架 */
				var data = {
					id:params.goods_id,
					name:'is_on_sale' ,
					value:params.is_on_sale
				}
				Goods.editField("goods/editField",data,this,"moreInterestingStrict");
		    },
		   	changeShow(params){
		   		/* 是否显示 */
				var data = {
					id:params.goods_id,
					name:'is_show' ,
					value:params.is_show
				}
				Goods.editField("goods/editField",data,this,"moreInterestingStrict");
		   	},
			editListData(id) {
				this.$router.push({name:'list_of_goods_detail',query:{id:id,title:"moreInterestingStrict"}})
			},
   	deleteGoods(id,index){
   		/* 活动管理-趣多严选-删除商品  Secondbuy/del */
   		this.$confirm('此操作将永久删除么, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
	   		var data = {
	   			id:id
	   		}
	   		More.ActivityiconDel("Strict/del",data,this,index);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   	},
   	searchList(){
   		/* 活动管理-0.1秒杀-商品列表  Strict/list */
			var data = {
				page:1,
				rows:this.pageSize,
				store_name:this.store_name,
				exclusive:this.exclusive,
			}
		More.Strict("Strict/list",data,this);
   	},
      handleCurrentChange(val) {
		var data = {
			page:val,
			rows:this.pageSize,
				store_name:this.store_name,
				exclusive:this.exclusive,
		}
		More.Strict("Strict/list",data,this);
      },
	entryDetail(id){
		this.$router.push({name:'more_interesting_strict_detail',query:{id:id}})
	},
   }
 }
</script>
