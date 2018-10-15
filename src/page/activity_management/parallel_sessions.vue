<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/evaluateManager/evaluate.less";
.container{
	padding:0 20px;
}
	.el-form-item {
		margin-bottom:20px; 
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
						分会场专题
					</span>
				</div>
				<div class="add_venue_warp_content">
					<div class="add_venue_warp">
						<div class="add_venue_warp_left">
							会场类型：
						</div>
						<div class="add_venue_warp_right">
							<div class="width_input">
								{{detailData.meeting_place_type}}
							</div>
						</div>
					</div>
					<div class="add_venue_warp">
						<div class="add_venue_warp_left">
							会场名称：
						</div>
						<div class="add_venue_warp_right">
							<div class="width_input">
								{{detailData.meeting_place_name}}
							</div>
						</div>
					</div>
					<div class="add_venue_warp">
						<div class="add_venue_warp_left">
							有效期：
						</div>
						<div class="add_venue_warp_right">
							<div class="width_input">
								{{detailData.start_time_lable}}--{{detailData.end_time_lable}}
							</div>
						</div>
					</div>
					<div class="add_venue_warp">
						<div class="add_venue_warp_left">
							会场二级类目：
						</div>
						<div class="add_venue_warp_right">
							<div class="width_input">
							  <el-select v-model="categoryId" @change="selectChange" placeholder="请选择">
							    <el-option
							      v-for="item in cat_listOptions"
							      :key="item.id"
							      :label="item.cat_name"
							      :value="item.id">
							    </el-option>
							  </el-select>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="table_warp" style="padding:20px;background:#fff">
					<el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="goods_id"
				      label="商品ID"
				      width="90">
				    </el-table-column>
				    <el-table-column
				      prop="goods_name"
				      label="商品名称"
				      width="240">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      prop="cat_path"
				      label="分类"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="market_price"
				      label="市场价"
				      width="80">
				    </el-table-column>
				    <el-table-column
				      prop="activity_price"
				      label="活动价"
				      width="110">
				    </el-table-column>
				    <el-table-column
				      prop="limit_total_stock"
				      label="库存"
				      width="100">
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
				      prop="is_limit_num_lable"
				      label="是否限购"
				      width="80">
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
							<el-button type="text" @click="search_symposium(scope.row)">详情</el-button>
							<!--<el-button type="text" @click="delete_symposium(scope.row)">删除</el-button>-->
				      </template>
				    </el-table-column>
		  		</el-table>
			</div>
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
<!--<el-dialog
  title="添加主会场"
  :visible.sync="addVenuedialogVisible"
  width="40%">
<el-form :model="add_venue_ruleForm" :rules="add_venue_rules" ref="add_venue_ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="会场名称" prop="meeting_place_name">
    <el-input v-model="add_venue_ruleForm.meeting_place_name"></el-input>
  </el-form-item>
  <el-form-item label="关联资源位活动" prop="relation_resource_id">
		<el-select v-model="add_venue_ruleForm.relation_resource_id" placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item.activity_id"
		      :label="item.activity_name"
		      :value="item.activity_id">
		    </el-option>
		  </el-select>
  </el-form-item>
  <el-form-item label="有效期" required>
	    <el-col :span="11">
	      <el-form-item>
	        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期" v-model="add_venue_ruleForm.start_time" style="width: 100%;"></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col class="line" :span="2">-</el-col>
	    <el-col :span="11">
	      <el-form-item>
	        <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期" v-model="add_venue_ruleForm.end_time" style="width: 100%;"></el-date-picker>
	      </el-form-item>
	    </el-col>
  </el-form-item>
    <el-form-item>
    <el-button @click="addVenuedialogVisible = false">取消</el-button>
    <el-button type="primary" @click="saveAddVenue('add_venue_ruleForm')">确 定</el-button>
  </el-form-item>
</el-form>
</el-dialog>-->
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
import picker from '../../components/picker';
import venue from '../../js/venue';
export default{
	data(){
		return {
			changeVisible:false,
			num:0,
			categoryId:'',
			cat_listOptions:[],
			currentPage:1,
			pageSize:10,
			totals:0,
			tableData:[],
			detailData:{},
			content_title:{
				title1:"主会场",
				title2:"分会场",
				path1:'/home/activityManagement/venue',
				path2:'/home/activityManagement/symposium'
			},
			form:{
				id:''
			}
		}
	},
	watch:{

	},
	created(){
		this.meeting_place_id = this.$route.query.meeting_place_id;
		this.parent_id = this.$route.query.parent_id;
		this.fetch();
		this.detailFetch();
		this.content_title.path2 = "/home/activityManagement/symposium?parent_id="+this.parent_id;
	},
	methods:{
		saveAddVenueSort(){
			var data = {
				activity_goods_id:this.currentSortData.activity_goods_id,
				meeting_place_id:this.meeting_place_id,
				goods_id:this.currentSortData.goods_id,
				field:"sort",
				value:this.num,
			}
			venue.MeetingplaceChangeGoodsField("Meetingplace/changeGoodsField",data,this,"parallel");
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
				field:"is_show",
				value:params.is_show,
			}
			venue.MeetingplaceChangeGoodsField("Meetingplace/changeGoodsField",data,this,"parallel");
		},
		delete_symposium(params){
			this.$confirm('此操作将删除商品, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          var data = {
	          	meeting_place_id:this.meeting_place_id,
	          	goods_id:params.goods_id,
	          }
	          venue.MeetingplaceDelGoods("Meetingplace/delGoods",data,this)
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
		},
		selectChange(){
			this.fetch();
		},
		fetch(val,id){
			var data = {
				meeting_place_id:this.meeting_place_id,
				id:this.categoryId,
				page:val?val:this.currentPage,
				rows:this.pageSize,
			}
			venue.getGoodsList("Meetingplace/getSlaveGoodsList",data,this)
		},
		detailFetch(){
			var data = {
				meeting_place_id:this.meeting_place_id,
			}
			venue.MeetingplaceDetail("Meetingplace/detail",data,this)
		},
		handleCurrentChange(val){
			this.fetch(val)
		},
		search_symposium(params){
			this.$router.push({path:'/home/activityManagement/active_goods_detail',query:{goods_id:params.goods_id,activity_goods_id:params.activity_goods_id,meeting_place_id:this.meeting_place_id,title:"parallel"}})
		},
		edit_symposium(data){
			this.$router.push({path:"/home/activityManagement/symposium_detail",query:{meeting_place_id:data.meeting_place_id}})
		},
		addVenue(){
			this.$router.push("/home/activityManagement/symposium_detail")
		}
	},
	components:{
		breadcrumb,picker
	}
}
</script>