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
				<span v-if="type==12">
					品质水果
				</span>
				<span v-else-if="type==13">
					家居品质
				</span>
				<span v-else="type==14">
					品牌清仓 
				</span>
			</div>
			<div class="order_detail_list">
				<div class="item_detail">
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>选择专场：</td>
											<td><div class="select_thirty">
											    <div class="width_120_warp">
											      <el-select @focus="selectOption()" v-model="exclusive" placeholder="选择专场">
											        <el-option
											          v-for="item in options"
											          :key="item.id"
											          :label="item.name"
											          :value="item.id">
											        </el-option>
											      </el-select>
											    </div>
											</div> 
											</td>
										</tr>
										<tr>
											<td>选择商品</td>
											<td><el-button type="danger" @click="addGoodsSearch()">添加商品</el-button></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="current_system">
							<div class="warp">
						  <el-table
							tooltip-effect="dark"
						    :data="tableDataShow"
						    border
						    style="width: 100%">
						    <el-table-column
						      prop="goods_name"
						      label="商品名称"
						      width="600">
						    </el-table-column>
						    <el-table-column
						      prop="store_name"
						      label="商户名称">
						    </el-table-column>
						    <el-table-column
						      prop="shop_price"
						      label="价格">
						    </el-table-column>
						    <el-table-column
						      prop="store_count"
						      label="库存">
						    </el-table-column>
							    <el-table-column
							      label="操作">
							      <template slot-scope="scope">
							        <el-button type="text" size="small" @click="deleteTableList(scope.$index)">删除</el-button>
							      </template>
							    </el-table-column>
						  </el-table>
							</div>
						</div>
						<div class="height_32_table_bottom">
						    <el-button type="danger" @click="addlistGoods()">保存</el-button>
						    <!--<el-button type="danger">重置</el-button>-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
<el-dialog
  title="选择商品"
  :visible.sync="dialogVisible"
  width="90%">
  <div class="add_product">		
  		<div class="search_admin_list_table">
			<div class="search_btn">
				<div class="search_content">
					<span>商户名</span>
					<div class="width-120">
						<el-input v-model="store_name" placeholder="商户名"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商品id</span>
					<div class="width-120">
						<el-input v-model="goods_id" placeholder="商品id"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>关键词</span>
					<div class="width-120">
						<el-input v-model="key_word" placeholder="搜索词"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchList()">查询</el-button>
				</div>
			</div>	
	  </div>
		<div class="table_list">
			  <el-table
				ref="multipleTable"
				tooltip-effect="dark"
			    :data="tableData"
			    row-key="goods_id"
			    border
			    style="width: 100%"
				@selection-change="handleSelectionChange">
			    <el-table-column
			      type="selection"
			      :reserve-selection="true"
			      width="55">
			    </el-table-column>
			    <el-table-column
			      prop="goods_id"
			      label="商品id">
			    </el-table-column>
			    <el-table-column
			      prop="goods_name"
			      label="商品名称"
			      width="600">
			    </el-table-column>
			    <el-table-column
			      prop="store_name"
			      label="商户名称">
			    </el-table-column>
			    <el-table-column
			      prop="shop_price"
			      label="价格">
			    </el-table-column>
			    <el-table-column
			      prop="store_count"
			      label="库存">
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
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addTableData()">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import Fruit from '../../js/fruit_of_quality.js';
 export default {
   data () {
     return {
     	goods_id:'',
     	type:'',
     	goodsIdsArr:[],
     	exclusive:'',
     	store_name:'',
     	key_word:'',
     	currentPage:1,
		totals:0,
		pageSize:20,
     	dialogVisible:false,
     	tableData: [],
     	tableDataShow:[],
     	options:[],
		content_title:{
			title1:"活动管理",
			title2:"品质水果"
		}
     }
   },
   created(){
   		this.type = this.$route.query.type;
   },
   components: {
breadcrumb
   },
   methods:{
   	deleteTableList(index){
   		this.tableDataShow.splice(index,1);
		var rows = this.tableDataShow;
   		if (rows) {
          this.$refs.multipleTable.clearSelection();
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row,true);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
   	},
   	addlistGoods(){  	
   		if(this.exclusive==''){
   			this.$message({
   				type:'success',
   				message:'请您选择专场'
   			})
   			return 
   		}else if(this.tableDataShow.length==0){
   			this.$message({
   				type:'success',
   				message:'请您选择商品'
   			})
   			return 
   		}
   		var goodsIdStr = this.goodsIdsArr.join(',');
   		var data = {
	   		is_special:this.type,
	   		exclusive:this.exclusive,
	   		goods_ids:goodsIdStr
	   	}
		Fruit.ActivgoodsAdd("Activgoods/add",data,this);
   	},
   	addTableData(){
   		this.tableDataShow = this.multipleSelection;
   		this.multipleSelection.forEach((item,index)=>{
   			this.goodsIdsArr.push(item.goods_id);
   		})
   		this.dialogVisible = false;
   	},
   	searchList(id,index){
		var data = {
	   		page:this.currentPage,
	   		rows:this.pageSize,
	   		store_name:this.store_name,
	   		key_word:this.key_word,
   			goods_id:this.goods_id,
	   	}
		Fruit.ActivgoodsSearch("Activgoods/searchGoods",data,this);
   	},
   	addGoodsSearch(){
	   	var data = {
	   		page:this.currentPage,
	   		rows:this.pageSize,
	   	}
		Fruit.ActivgoodsSearch("Activgoods/searchGoods",data,this);
   		this.dialogVisible = true;
   	},
	   	selectOption(){
		   	var data = {
		   		page:this.currentPage,
		   		rows:this.pageSize,
		   	}
			Fruit.Exclusivelist("Exclusive/list",data,this);
	   	},
		entryDetail(id){
			this.$router.push({name:'customer_complaint_management_detail',query:{id:id}})
		},      
		toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange(val) {
	   	var data = {
	   		page:val,
	   		rows:this.pageSize,
	   		store_name:this.store_name,
	   		key_word:this.key_word,
   			goods_id:this.goods_id,
	   	}
		Fruit.ActivgoodsSearch("Activgoods/searchGoods",data,this);
      }
   }
 }
</script>
