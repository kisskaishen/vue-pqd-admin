、<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/evaluateManager/evaluate.less";
.container{
	padding:0 20px;
}
	.el-form-item {
		margin-bottom:20px;
	}
</style>
<template>
	<div class="evaluate">
		<breadcrumb :content="content_title"></breadcrumb>
		<div class="container">
			<div class="search_admin_list_table">
				<div class="search_admin_list_table_title">
					<span>
						添加活动商品
					</span>
				</div>
				<div class="search_btn">
					<div class="search_content">
            <el-button style="margin-top:6px;" size="small" type="primary" @click="addVenue()">添加</el-button>
						<el-button size="small" type="primary" @click="batchDeleting()">批量删除</el-button>
						<!-- <el-button type="primary" @click="batchImport()">批量导入</el-button> -->
            <span>
              <batch-import @addTableData="getAddTableData" :upLoadData="upLoadData" title="批量导入"></batch-import>
            </span>
					</div>
				</div>
			</div>
			<div class="table_warp" style="padding:20px;background:#fff;overflow:scroll;height:600px">
					<el-table
				    :data="addTableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="goods_id"
				      label="商品ID"
				      width="80">
				    </el-table-column>
				    <el-table-column
				      prop="goods_name"
				      label="商品名称"
				      width="300">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="store_count"
				      label="库存"
				      width="100">
				    </el-table-column>
				    <el-table-column
				      prop="market_price"
				      width="100"
				      label="市场价">
				    </el-table-column>
				    <el-table-column
				      prop="prom_price"
				      width="100"
				      label="团购价">
				    </el-table-column>
				    <el-table-column
				      prop="labellist"
				      width="220"
				      label="已达标签位">
				    </el-table-column>
				    <el-table-column
				      label="操作"
				      width="240">
				      <template slot-scope="scope">
							<el-button type="text" @click="deleteProduct(addTableData,scope.$index)">删除</el-button>
				      </template>
				    </el-table-column>
		  		</el-table>
			</div>
      <div class="" style="padding:20px;background:#fff;">
        <el-button type="primary" @click="addActiveGoods()">确定</el-button>
      </div>
		</div>
    <el-dialog
      title="选择商品"
      :visible.sync="addLabelMarklDialogVisible"
      width="1200px">
      <div class="add_product">
      		<div class="search_admin_list_table">
    			<div class="search_btn">
    				<div class="search_content">
    					<span>商户名</span>
    					<div class="width-120">
    						<el-input v-model="form.store_name" placeholder="商户名"></el-input>
    					</div>
    				</div>
    				<div class="search_content">
    					<span>商品ID</span>
    					<div class="width-120">
    						<el-input v-model="form.goods_id" placeholder="商品id"></el-input>
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
    	  </div>
    		<div class="table_list">
    			  <el-table
    				ref="multipleTable"
    				tooltip-effect="dark"
    			    :data="tableData"
    			    border
    			    style="width: 100%"
    				@selection-change="handleSelectionChange">
    			    <el-table-column
    			      type="selection"
    			      width="55">
    			    </el-table-column>
    			    <el-table-column
    			      prop="goods_id"
    			      label="商品id"
    			      width="80">
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
    			      label="价格"
    			      width="80">
    			    </el-table-column>
    			    <el-table-column
    			      prop="store_count"
    			      label="库存"
    			      width="80">
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
        <el-button @click="addLabelMarklDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGoods()">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';
import active_label from '../../js/active_label.js';

import batchImport from "../../components/batch_import_active";
export default{
	data(){
		return {
      multipleSelection:[],
      upLoadData:{
        goods_file:"goods_file"
      },
      addTableData:[],
      input:'',
      labelId:'',
      form:{
        store_name:'',
        goods_id:'',
        key_word:'',
				not_goods_ids:'',
      },
      radio:'1',
      labelTypeOption:[],
      belongedActivitiesOptions:[],
      labelNameOptions:[],
      addLabelMarklDialogVisible:false,
			currentPage:1,
			pageSize:10,
			totals:0,
			tableData:[],
			content_title:{
				title1: "活动标签",
				title2: "",
				path1:'/home/activityManagement/active_label',
				path2:''
			}
		}
	},
	watch:{

	},
	created(){
    this.labelId = this.$route.query.labelId;
    active_label.getLabelConf('Label/Conf',this);
	},
	methods:{
		getAddTableData(msg){
			var self = this;
			msg.forEach((item)=>{
				self.addTableData.push(item)
			})
		},
    fetch(val){
      var data = {
        page:val?val:this.currentPage,
        rows:this.pageSize,
        store_name:this.form.store_name,
        goods_id:this.form.goods_id,
				not_goods_ids:this.form.not_goods_ids,
        labelId:this.labelId,
        key_word:this.form.key_word,
      }
      active_label.goodsList('Label/goodsList',data,this);
    },
		addActiveGoods(){
			var goods_ids_arr = [];
			var goods_ids = '';
			this.addTableData.forEach((item)=>{
				goods_ids_arr.push(item.goods_id)
			})
			goods_ids = goods_ids_arr.join(",");
			var data = {
				labelId:this.labelId,
				goods_ids:goods_ids,
			}
      active_label.labelGoodst('Label/labelGoodst',data,this);
		},
    deleteProduct(params,index){
			params.splice(index,1)
    },
    handleCurrentChange(val){
						this.fetch(val);
    },
    addVenue(){
				var self  = this;
				var arr_goods = [];
				this.form.not_goods_ids = '';
				this.addTableData.forEach((item)=>{
					arr_goods.push(item.goods_id)
				})
				this.form.not_goods_ids = arr_goods.join(",");
				this.fetch();
        this.addLabelMarklDialogVisible = true;
    },
   	addGoods(){
   		var self = this;
			this.multipleSelection.forEach((item)=>{
	   		self.addTableData.push(item)
			})
   		this.addLabelMarklDialogVisible = false;
   	},
    searchList(){
			this.fetch();
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    addLabel(){
        this.$router.push({path:"active_label_detail"})
    },
    batchDeleting(){

    },
	},
	components:{
		breadcrumb,picker,batchImport
	}
}
</script>
