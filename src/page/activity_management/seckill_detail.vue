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
					0.1秒杀商品
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
											<td>开始时间：</td>
											<td><div class="select_thirty">
											    <div class="width_120_warp">
												    <el-date-picker
												      v-model="times"
												      type="datetime"
												      value-format="yyyy-MM-dd HH:hh:mm"
												      placeholder="选择日期时间">
												    </el-date-picker>
											    </div>
											</div> 
											</td>
										</tr>
										<tr>
											<td>选择商品</td>
											<td><el-button type="danger" @click="addGoods()">添加商品</el-button></td>
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
							      label="活动数量">
							      <template slot-scope="scope">
							        <el-input clearable :maxlength='6' :minlength='1' @blur = 'inputBlur(scope.row.quantity)' v-model.number="scope.row.quantity" placeholder="请输入内容"></el-input>
							      </template>
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
						<el-input v-model="form.goods_id" placeholder="商品id"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商品名称</span>
					<div class="width-120">
						<el-input v-model="key_word" placeholder="商品名称"></el-input>
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
			      prop="quantity"
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
    <el-button type="primary" @click="saveSelectList()">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import seckill from '../../js/seckill';
 export default {
   data () {
     return {
     	quantity:0,
     	key_word:'',
     	store_name:'',
     	multipleSelection:[],
		currentPage:1,
		totals:0,
		pageSize:6,
     	times: '',
     	dialogVisible:false,
     	 tableData: [],
     	 tableDataDialog: [],
     	input:'',
     	value:'',
     	options:[
     		{
     			value: '0',
          		label: '状态'
     		},
     		{
     			value: '1',
          		label: '停业'
     		},
     		{
     			value: '-1',
          		label: '营业'
     		}
     	],
		content_title:{
			title1:"订单管理",
			title2:"添加商户0.1秒杀商品"
		}
     }
   },
   created(){
   },
   components: {
breadcrumb
   },
   methods:{
   	inputBlur(num){
   		console.log(num)
   	},
   	saveList(){
   		var self = this;
   		var arrTime = this.times.split(' ');
   		var date = arrTime[0];
   		var time = arrTime[1];
   		if(date==''){
   			this.$message({
   				type:'success',
   				message:'请您先选择时间'
   			})
   			return 
   		}else if(this.tableDataDialog.length==0){
   			this.$message({
   				type:'success',
   				message:'请您先选择商品'
   			})
   			return 
   		}
   		var jsonData = [];
   		for(var i = 0;i<this.tableDataDialog.length;i++){
   			var row = this.tableDataDialog[i];
   			if(row.quantity==0){
   				this.$message({
	   				type:'success',
	   				message:row.goods_name+'活动数量不能为空'
	   			})
	   			return 
   			}else{
   				jsonData.push({'goods_id':row.goods_id,'quantity':row.quantity})
   			}
   		}
   		var data = {
   			date:date,
   			time:time,
   			goods:JSON.stringify(jsonData)
   		}
   		seckill.SecondbuyAdd("Secondbuy/addGoods",data,this);
   	},
   	searchList(){
   		var data = {
   			page:1,
   			rows:this.pageSize,
   			store_name:this.store_name,
   			key_word:this.key_word,
   			goods_id:this.form.goods_id,
   		}
   		seckill.searchGoods("Secondbuy/searchGoods",data,this);
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
   	saveSelectList(){
   		var self = this;
   		this.tableDataDialog = this.multipleSelection;
   		this.tableDataDialog.forEach(function(row,index){
   			 self.$set(row,'quantity',1)
   		})
   		this.dialogVisible = false;
   	},
   	addGoods(){
   		var data = {
   			page:1,
   			rows:this.pageSize,
   		}
   		seckill.searchGoods("Secondbuy/searchGoods",data,this);
   	},
	entryDetail(id){
		this.$router.push({name:'customer_complaint_management_detail',query:{id:id}})
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
   			goods_id:this.form.goods_id,
   		}
   		seckill.searchGoods("Secondbuy/searchGoods",data,this);
      }
   }
 }
</script>
