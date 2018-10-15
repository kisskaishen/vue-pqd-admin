<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/evaluateManager/evaluate.less";
.container{
	padding:0 20px;
}
.add_product_warp{
	overflow: hidden;
	padding:0 10px;
	.text_left{
		float:left;
		width:120px;
		margin-right:10px;
		text-align: right;
		height:32px;
		line-height: 32px;
	}
	.text_right{
		float:left;
	}
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
	<div class="evaluate">
		<breadcrumb :content="content_title"></breadcrumb>
		<div class="container">
			<div class="search_admin_list_table">
				<div class="search_admin_list_table_title">
					<span>
						商品列表
					</span>
				</div>
				<!--<div class="evaluate_warp">
					<div class="evaluate_warp_left">
						<el-tabs v-model="activeName" @tab-click="handleClickVenue">
				            <el-tab-pane v-for="(item,index) in date_group" :key="index" :label="item" :name="'index_'+index"></el-tab-pane>
				        </el-tabs>
					</div>
				</div>-->
		        <ul class="warp_item_ul">
		        	<li @click="handleClickVenue(item,index)" :class="{warp_item_li:true,active:index==currentActive}" v-for="(item,index) in date_group">{{item}}</li>
		        </ul>
				<div class="add_product_warp">
					<div class="text_left">已选商品</div>
					<div class="text_right">
						<el-button @click="addGoods()" size="small" type="primary">添加商品</el-button>
					</div>
				</div>
				<div class="search_btn">
					<div class="search_content">
						<span>商品ID</span>
						<div class="width-120">
							<el-input v-model="form.goods_id" placeholder="商品ID"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>商家名称</span>
						<div class="width-120">
							<el-input v-model="form.store_name" placeholder="商家名称"></el-input>
						</div>
					</div>
					<div class="search_content">
						<el-button type="primary" @click="searchListData()">查询</el-button>
					</div>
				</div>
			</div>
			<div class="table_warp" style="padding:20px;background:#fff;">
			  <el-table
			    :data="tableData"
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
			      label="商家名称"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="所属会场"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="meeting_place_name"
			      label="会场名称">
			    </el-table-column>
			    <el-table-column
			      prop="cat_path"
			      label="商品分类"
			      width="160">
			    </el-table-column>
			    <el-table-column
			      prop="market_price"
			      label="市场价"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="activity_price"
			      label="活动价"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      label="是否显示"
			      width="120">
			      <template slot-scope="scope">
			        	<el-switch
			        		 @click.native="changeSwitch(scope.row)"
						  v-model="scope.row.is_show"
						  active-color="#13ce66"
						  inactive-color="#ff4949"
						    active-value="1"
						    inactive-value="0">
						</el-switch>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="排序"
			      width="120">
			      <template slot-scope="scope">
			        	<el-input @focus="focusInput(scope.row)" v-model="scope.row.sort" placeholder="排序"></el-input>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="100">
			      <template slot-scope="scope">
			        <el-button @click="searchDetail(scope.row)" type="text" size="small">详情</el-button>
			        <el-button v-show="scope.row.btn.del" @click="deleteGoods(scope.row)" type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
			</div>
	       <div class="pagination" v-show="tableData.length!=0">
	        <el-pagination
	          @current-change="handleCurrentChange"
	          :current-page="currentPage"
	          :page-size = 'pageSize'
	          layout="total, prev, pager, next, jumper"
	          :total='total'>
	        </el-pagination>
	      </div>
		</div>
<el-dialog
  title="添加商品"
  :visible.sync="addVenuedialogVisible"
  width="80%">
	<div class="search_admin_list_table">
		<div class="search_btn">
			<div class="search_content">
				<span>商品ID</span>
				<div class="width-120">
					<el-input v-model="addForm.goods_id" placeholder="商品ID"></el-input>
				</div>
			</div>
			<div class="search_content">
				<span>商品名称</span>
				<div class="width-120">
					<el-input v-model="addForm.goods_name" placeholder="商品名称"></el-input>
				</div>
			</div>
			<div class="search_content">
				<span>商户名</span>
				<div class="width-120">
					<el-input v-model="addForm.store_name" placeholder="商户名"></el-input>
				</div>
			</div>
			<div class="search_content">
				<span>类目</span>
				<div class="width-120">
					  <el-select v-model="addForm.cat_id" placeholder="全部">
					    <el-option
					      v-for="item in optionsCategory_list"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
				</div>
			</div>
			<div class="search_content">
				<el-button type="primary" @click="searchListDataDialog()">查询</el-button>
			</div>
		</div>
	</div>
		<div class="table_warp" style="padding:20px;background:#fff">
			<el-table
		    :data="tableDataDialog"
		    border
    		@selection-change="handleSelectionChange"
		    style="width: 100%">
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    <el-table-column
		      prop="goods_id"
		      label="商品ID"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      prop="goods_name"
		      label="商品名称">
		    </el-table-column>
		    <el-table-column
		      prop="store_name"
		      label="商户名称"
		      width="220">
		    </el-table-column>
		    <el-table-column
		      prop="is_limit_num_lable"
		      label="限购"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="limit_total_stock"
		      label="库存"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="market_price"
		      label="市场价"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="prom_price"
		      label="团购价"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      label="操作"
		      width="80">
		      <template slot-scope="scope">
					<el-button type="text" @click="add_product(scope.row)">详情</el-button>
		      </template>
		    </el-table-column>
  		</el-table>
	       <div class="pagination" v-show="tableDataDialog.length!=0">
	        <el-pagination
	          @current-change="handleCurrentChangeDia"
	          :current-page="currentPageDia"
	          :page-size = 'pageSize'
	          layout="total, prev, pager, next, jumper"
	          :total='totalDia'>
	        </el-pagination>
	      </div>
	</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addVenuedialogVisible = false">取消</el-button>
    <el-button type="primary" @click="saveAddVenue('add_goods')">确 定</el-button>
      </span>
</el-dialog>
<el-dialog
  title="排序"
  :visible.sync="changeVisible"
  width="30%">
	<div class="search_admin_list_table">
		<div class="search_btn">
			<div class="search_content">
				<span>请输入序号</span>
				<div class="width-120">
					<!--<el-input :maxlength="6" v-model="num" placeholder="排序"></el-input>-->
					<input v-model="num" class="input_check" :maxlength="6" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
				</div>
			</div>
		</div>
	</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="changeVisible = false">取消</el-button>
    <el-button type="primary" @click="saveAddVenueSort()">确 定</el-button>
      </span>
</el-dialog>
	</div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import venue from '../../js/venue';
export default{
	data(){
		return {
			currentActive:0,
			exist_goods_ids:[],
			num:0,
			changeVisible:false,
        	multipleSelection: [],
			tableDataDialog:[],
			addVenuedialogVisible:false,
			tabLabel:'',
			date_group:[],
			activeName:'index_0',
			options:[],
			optionsCategory_list:[],
			reportAdsDialog:false,
			form:{
				store_name:'',
				goods_id:'',
			},
			currentPage:1,
			pageSize:10,
			total:0,
			currentPageDia:1,
			totalDia:0,
			tableData:[],
			content_title:{
				title1: "主会场专题",
				title2: "",
				path1:'/home/activityManagement/venue',
				path2:''
			},
			meeting_place_id:'',
			addForm:{
				goods_id:'',
				goods_name:'',
				store_name:'',
				cat_id:'',
				meeting_place_id:''
			},
			goodsIds:[],
			currentSortData:{},
		}
	},
	watch:{

	},
	created(){
		this.meeting_place_id = this.$route.query.meeting_place_id;
		this.dataFetch();
		venue.meetingplaceConf("Meetingplace/conf",this,"parent");
	},
	methods:{
		add_product(params){
//			console.log(JSON.stringify(params))
//			return
			this.$router.push({path:'/home/activityManagement/active_goods_detail',query:{
				goods_id:params.goods_id,
				activity_goods_id:params.activity_goods_id,
				meeting_place_id:this.meeting_place_id,
				title:"main"
				}
			})
		},
		saveAddVenueSort(){
			var data = {
				activity_goods_id:this.currentSortData.activity_goods_id,
				meeting_place_id:this.meeting_place_id,
				goods_id:this.currentSortData.goods_id,
				date:this.tabLabel,
				field:"sort",
				value:this.num,
			}
			venue.MeetingplaceChangeGoodsField("Meetingplace/changeGoodsField",data,this);
		},
		deleteGoods(params){
	        this.$confirm('此操作将删除商品, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
				var data = {
					activity_goods_id:params.activity_goods_id,
					meeting_place_id:this.meeting_place_id,
					date:this.tabLabel,
					goods_id:params.goods_id,
				}
				venue.MeetingplaceDelGoods("Meetingplace/delGoods",data,this);
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消'
	          });          
	        });
		},
		focusInput(params){
			this.changeVisible = true;
			this.num = params.sort;
			this.currentSortData = params;
		},
		changeSwitch(params){
			var data = {
				activity_goods_id:params.activity_goods_id,
				meeting_place_id:this.meeting_place_id,
				goods_id:params.goods_id,
				date:this.tabLabel,
				field:"is_show",
				value:params.is_show,
			}
			venue.MeetingplaceChangeGoodsField("Meetingplace/changeGoodsField",data,this,"main",this.tabLabel);
		},
		saveAddVenue(){
			var that = this;
			that.goodsIds = [];
			this.multipleSelection.forEach((item)=>{
				that.goodsIds.push(item.goods_id)
			})
			var goodsIds = that.goodsIds.join(",");
			var data = {
				meeting_place_id:this.meeting_place_id,
				goods_ids:goodsIds,
				date:this.tabLabel,
			}
			venue.MeetingplaceAddGoods("Meetingplace/addGoods",data,this,"main");
		},
	      handleSelectionChange(val) {
	        this.multipleSelection = val;
	      },
		addGoods(){
			this.addVenuedialogVisible = true;
			this.searchGoods();
		},
		searchGoods(val){
			var exist_goods_ids = this.exist_goods_ids.join(',');
			var data = {
				meeting_place_id:this.meeting_place_id,
				goods_id:this.addForm.goods_id,
				store_name:this.addForm.store_name,
				goods_name:this.addForm.goods_name,
				cat_id:this.addForm.cat_id,
				exist_goods_ids:exist_goods_ids,
				page:val?val:this.currentPageDia,
				rows:this.pageSize,
			}
			venue.MeetingplaceSearchGoods("Meetingplace/searchGoods",data,this);
		},
		dataFetch(){
			var data = {
				meeting_place_id:this.meeting_place_id
			}
			venue.getDateGroup("Meetingplace/getDateGroup",data,this)
		},
		searchDetail(params){
			this.$router.push({path:'/home/activityManagement/active_goods_detail',query:{goods_id:params.goods_id,activity_goods_id:params.activity_goods_id,meeting_place_id:this.meeting_place_id,title:"main"}})
		},
		handleClickVenue(name,index){
			this.tabLabel = name;
			this.currentActive = index;
			this.fetch();
		},
		handleClick(){
			
		},
		fetch(val){
			var data  = {
				meeting_place_id:this.meeting_place_id,
				goods_id:this.form.goods_id,
				store_name:this.form.store_name,
				date:this.tabLabel,
				page:val?val:this.currentPage,
				rows:this.pageSize,
			}
			venue.getMasterGoodsList("Meetingplace/getMasterGoodsList",data,this)
		},
		searchListData(){
			this.fetch();
		},
		handleCurrentChange(val){
			this.fetch(val);
		},
		searchListDataDialog(){
			this.searchGoods();
		},
		handleCurrentChangeDia(val){
			this.searchGoods(val);
		},
	},
	components:{
		breadcrumb,
	}
}
</script>