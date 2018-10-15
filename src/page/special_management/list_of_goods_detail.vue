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
					添加商户专场商品
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
											      <el-select @focus="getFocusList()" v-model="form.exclusive" placeholder="专场选择">
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
										<!-- <tr>
											<td>选择时间</td>
											<td>
              					<picker :sTime="sTime" :eTime="eTime" @onPassByVal='getTimes'></picker>
                      </td>
										</tr> -->
										<tr>
											<td>选择商品</td>
											<td><el-button type="danger" @click="getGoodsSearch()">添加商品</el-button></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div class="current_system">
							<div class="warp">
							  <el-table
								ref="multipleTable"
								tooltip-effect="dark"
							    :data="tableDataDialog"
							    border
							    style="width: 100%">
							    <el-table-column
							      prop="goods_name"
							      label="商品名称"
							      width="455">
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
						    <el-button type="danger" @click="saveList()">保存</el-button>
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
					<span>商品名称</span>
					<div class="width-120">
						<el-input v-model="form.key_word" placeholder="商品名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商户名</span>
					<div class="width-120">
						<el-input v-model="form.store_name" placeholder="商户名"></el-input>
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
			      prop="goods_name"
			      label="商品名称">
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
    <el-button type="primary" @click="addGoods()">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';
import Classification from '../../js/special_field_classification.js';
 export default {
   data () {
     return {
       on_time:'',
       eTime:'',
      sTime:'',
     	form:{
     		exclusive:'',
     		is_special:'4'
     	},
     	tableDataDialog:[],
		currentPage:1,
		totals:0,
		pageSize:20,
     	goods_ids:'',
     	icon_id:'',
     	dialogVisible:false,
     	 tableData: [],
     	input:'',
     	value:'',
     	options:[],
		content_title:{
			title1: "9.9商品列表",
			title2: "",
			path1:'/home/specialManagement/listGoods',
			path2:''
		},
     }
   },
   created(){
   },
   components: {
      breadcrumb,picker
   },
   methods:{
   getTimes(msg){
     console.log(JSON.stringify(msg))
     if(msg!=undefined){
       if(msg[0]!='NaN-0NaN-0NaN'){
         this.on_time = msg[0]+'/'+msg[1];
         }else{
         this.on_time = '';
         }
       }else{
       this.on_time = '';
       }
   },
   	deleteTableList(index){
   		this.tableDataDialog.splice(index,1);
		var rows = this.tableDataDialog;
   		if (rows) {
          this.$refs.multipleTable.clearSelection();
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row,true);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
   	},
   	searchList(){
   		var data = {
   			page:1,
   			rows:this.pageSize,
   			store_name:this.form.store_name,
   			key_word:this.form.key_word,
   		}
   		Classification.getGoodsSearch("Goodsspecial/searchGoods",data,this);
   	},
   	getGoodsSearch(){
			var data = {
				page:1,
				rows:this.pageSize
			}
   		Classification.getGoodsSearch("Goodsspecial/searchGoods",data,this);
   		this.dialogVisible = true;
   	},
   	getFocusList(){
	   	var data = {
	   		page:this.currentPage,
	   		rows:this.pageSize
	   	}
		Classification.ExclusiveList("Exclusive/list",data,this);
   	},
   	addGoods(){
   		var self = this;
   		this.tableDataDialog = this.multipleSelection;
   		this.dialogVisible = false;
   	},
   	saveList(){
   		if(this.form.exclusive==''){
   			this.$message({
   				type:'success',
   				message:'请您选择专场'
   			})
   			return
   		}else if(this.tableDataDialog.length==0){
   			this.$message({
   				type:'success',
   				message:'请您选择商品'
   			})
   			return
   		}
   		var arr_ids = [];
   		this.tableDataDialog.forEach(function(row,index){
   			arr_ids.push(row.goods_id)
   		})
   		this.goods_ids = arr_ids.join(',')
   		var data = {
   			is_special:'4',
   			exclusive:this.form.exclusive,
   			ids:this.goods_ids
   		}
   		Classification.GoodsspecialAdd("Goodsspecial/add",data,this,"special");

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
				rows:this.pageSize
			}
   		Classification.getGoodsSearch("Goodsspecial/searchGoods",data,this);
		  },
   }
 }
</script>
