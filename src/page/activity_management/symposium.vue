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
						分会场
					</span>
				</div>
				<div class="search_btn">
					<div class="search_content">
						<el-button type="primary" @click="addVenue()">添加分会场</el-button>
					</div>
				</div>
			</div>
			<div class="table_warp" style="padding:20px;background:#fff">
					<el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="meeting_place_id"
				      label="分会场ID"
				      width="80">
				    </el-table-column>
				    <el-table-column
				      prop="meeting_place_name"
				      label="分会场名称"
				    	width="140">
				    </el-table-column>
				    <el-table-column
				    	width="120"
				      label="分会场图片">
				      <template slot-scope="scope">
				      	<span v-show="scope.row.meeting_place_img!=''">
	                        <img  @click="clickImg($event)" style="width:100px;height:100px;" :src="scope.row.meeting_place_img">
	                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
				      	</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				    	width="120"
				      label="分会场icon图片">
				      <template slot-scope="scope">
				      	<span v-show="scope.row.icon_img!=''">
	                        <img  @click="clickImg($event)" style="width:100px;height:100px;" :src="scope.row.icon_img">
	                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
				      	</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="goods_num"
				      label="分会场商品数"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      prop="cat_num"
				      label="二级类目数"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      label="有效期"
				      width="310">
				      <template slot-scope="scope">
				        <span>{{scope.row.start_time_lable}} 至 {{scope.row.end_time_lable}}</span>
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
				      prop="type_lable"
				      label="会场状态"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      label="操作"
				      width="200">
				      <template slot-scope="scope">
							<el-button v-show="scope.row.btn.goods" type="text" @click="search_symposium(scope.row)">查看商品</el-button>
							<el-button v-show="scope.row.btn.edit" type="text" @click="edit_symposium(scope.row)">编辑</el-button>
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
import BigImg from '../../components/bigImg'
export default{
	data(){
		return {
			currentSortData:{},
			changeVisible:false,
			num:0,
         	showImg:false,
			currentPage:1,
			pageSize:10,
			totals:0,
			parent_id:0,
			tableData:[],
			content_title:{
				title1: "主会场专题",
				title2: "",
				path1:'/home/activityManagement/venue',
				path2:''
			}
		}
	},
	watch:{

	},
	created(){
		this.parent_id = this.$route.query.parent_id;
		this.fetch();
//	    venue.meetingplaceConf("Meetingplace/conf",this)
	},
	methods:{
		saveAddVenueSort(){
			var data = {
				meeting_place_id:this.currentSortData.meeting_place_id,
				field:"sort",
				value:this.num,
			}
			venue.MeetingplaceChangeGoodsField("Meetingplace/changeField",data,this);
		},
		focusInput(params){
			console.log(JSON.stringify(params))
			this.changeVisible = true;
			this.num = params.sort;
			this.currentSortData = params;
		},
        clickImg(e) {
            this.showImg = true;
            // 获取当前图片地址
            this.imgSrc = e.currentTarget.src;
        },
        viewImg(){
            this.showImg = false;
        },
		fetch(val){
			var data = {
				parent_id:this.parent_id,
				page:val?val:this.currentPage,
				rows:this.pageSize,
			}
			venue.meetingplaceList("Meetingplace/list",data,this)
		},
		handleCurrentChange(val){
			this.fetch(val);
		},
		search_symposium(data){
			this.$router.push({path:"/home/activityManagement/parallel_sessions",query:{meeting_place_id:data.meeting_place_id,parent_id:this.parent_id}})
		},
		edit_symposium(data){
			this.$router.push({path:"/home/activityManagement/symposium_detail",query:{meeting_place_id:data.meeting_place_id,parent_id:this.parent_id,meeting_place_sn:data.meeting_place_sn}})
		},
		addVenue(){
			this.$router.push({path:"/home/activityManagement/symposium_detail",query:{meeting_place_id:this.parent_id,parent_id:this.parent_id}})
		}
	},
	components:{
		breadcrumb,picker,BigImg
	}
}
</script>