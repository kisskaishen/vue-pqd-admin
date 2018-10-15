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
						会场专题
					</span>
				</div>
				<div class="search_btn">
					<div class="search_content">
						<span>会场编号</span>
						<div class="width-120">
							<el-input v-model="form.sn" placeholder="会场编号"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>会场名称</span>
						<div class="width-120">
							<el-input v-model="form.keywords" placeholder="会场名称"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>会场状态</span>
						<div class="width-120">
							  <el-select v-model="form.status" placeholder="全部">
							    <el-option
							      v-for="item in statusoptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
						</div>
					</div>
					<div class="search_content">
						<picker title="有效期" @onPassByVal='getTime'></picker>
					</div>
					<div class="search_content">
						<el-button type="primary" @click="searchListData()">查询</el-button>
						<el-button type="primary" @click="addVenue()">添加主会场</el-button>
					</div>
				</div>
			</div>
			<div class="table_warp" style="padding:20px;background:#fff">
					<el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="meeting_place_sn"
				      label="会场编号"
				      width="150">
				    </el-table-column>
				    <el-table-column
				      prop="meeting_place_name"
				      label="会场名称">
				    </el-table-column>
				    <el-table-column
				    	width="120"
				      label="主会场图片">
				      <template slot-scope="scope">
				      	<span v-show="scope.row.meeting_place_img!=''">
	                        <img  @click="clickImg($event)" style="width:100px;height:100px;" :src="scope.row.meeting_place_img">
	                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
				      	</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="goods_num"
				      label="会场商品数"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      label="有效期"
				      width="320">
				      <template slot-scope="scope">
				        <span>{{scope.row.start_time_lable}} 至 {{scope.row.end_time_lable}}</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="type_lable"
				      label="会场状态"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      width="220"
				      label="会场H5地址">
				      <template slot-scope="scope">
				      	<a target="_blank" v-show="scope.row.h5_router_url" :href="scope.row.h5_router_url">{{scope.row.h5_router_url}}</a>
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="操作"
				      width="240">
				      <template slot-scope="scope">
							<el-button v-show="scope.row.btn.goods" type="text" @click="add_product(scope.row)">添加商品</el-button>
							<el-button v-show="scope.row.btn.slave" type="text" @click="entry_symposium(scope.row)">分会场</el-button>
							<el-button v-show="scope.row.btn.edit" type="text" @click="edit_symposium(scope.row)">编辑</el-button>
							<el-button v-show="scope.row.btn.opened" type="text" @click="suspend(scope.row)">{{scope.row.status=='0'?'开启':'关闭'}}</el-button>
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
	          :total='totals'>
	        </el-pagination>
	      </div>
		</div>
<el-dialog
  title="添加主会场"
  :visible.sync="addVenuedialogVisible"
  width="40%">
<el-form :model="add_venue_ruleForm" :rules="add_venue_rules" ref="add_venue_ruleForm" label-width="140px" class="demo-ruleForm">
<!--<div class="add_venue_warp_content">
	<div class="add_venue_warp">
		<div class="add_venue_warp_left">
			会场名称：
		</div>
		<div class="add_venue_warp_right">
			<div class="width_input">
				<el-input v-model="add_venue_ruleForm.meeting_place_name" placeholder="请输入内容"></el-input>
			</div>
		</div>
	</div>
	<div class="add_venue_warp">
		<div class="add_venue_warp_left">
			关联资源位活动：
		</div>
		<div class="add_venue_warp_right">
			<div class="width_input">
				<el-select v-model="add_venue_ruleForm.relation_resource_id" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			</div>
		</div>
	</div>
	<div class="add_venue_warp">
		<div class="add_venue_warp_left">
			有效期：
		</div>
		<div class="add_venue_warp_right">
			<div class="width_input">
				<picker @onPassByVal='getTimes'></picker>
			</div>
		</div>
	</div>
</div>-->
  <el-form-item label="会场名称" prop="meeting_place_name">
    <el-input v-model="add_venue_ruleForm.meeting_place_name"></el-input>
  </el-form-item>
  <el-form-item label="会场banner图">
		<symposium-load-icon :imageArr="add_venue_ruleForm.meeting_place_img" :explain="explain" :upLoadData="upLoadData" @addImg="addImg" @deleteImg="deleteImg"></symposium-load-icon>
  </el-form-item>
  <el-form-item label="banner图链接地址">
    	<el-input v-model="add_venue_ruleForm.banner_link"></el-input>
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
</el-dialog>
	</div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';
import venue from '../../js/venue';
import symposiumLoadIcon from '../../components/symposium_load_icon';
import BigImg from '../../components/bigImg'
export default{
	data(){
		return {
         	showImg:false,
			upLoadData:{
				type:"meetingPlaceBannerImg"
			},
			explain:[
				{value:"上传主会场图片，图片要求尺寸750X670"}
			],
			add_venue_rules:{
				meeting_place_name: [
		            { required: true, message: '会场名称', trigger: 'blur' },
		            { min: 1, max:10, message: '长度在 1 到 10个字符', trigger: 'blur' }
		          ],
		          relation_resource_id: [
		            { required: true, message: '请选择关联资源位活动', trigger: 'change' }
		          ],
		          start_time: [
		            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
		          ],
		          end_time: [
		            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
		          ],
			},
			add_venue_ruleForm:{
				relation_resource_id:'',
				meeting_place_name:'',
				start_time:'',
				end_time:'',
				meeting_place_img:'',
				banner_link:'',
			},
			options:[],
			value:'',
			input:'',
			addVenuedialogVisible:false,
			statusoptions:[],
			reportAdsDialog:false,
			form:{
				sn:'',
				keywords:'',
				start_time:'',
				end_time:'',
				status:'',
			},
			currentPage:1,
			pageSize:10,
			totals:0,
			tableData:[],
			content_title:{
				title1: "会场专题",
				title2: "",
				path1:'/home/activityManagement/venue',
				path2:''
			}
		}
	},
	watch:{

	},
	created(){
  	      var token = localStorage.getItem("token");
  	      if(token){
  	        this.upLoadData.Authorization = token;
  	      }
		this.fetch();
	    venue.meetingplaceConf("Meetingplace/conf",this,"main")
	},
	methods:{
        clickImg(e) {
            this.showImg = true;
            // 获取当前图片地址
            this.imgSrc = e.currentTarget.src;
        },
        viewImg(){
            this.showImg = false;
        },
		addImg(msg){
			this.add_venue_ruleForm.meeting_place_img = msg;
		},
		deleteImg(msg){
			this.add_venue_ruleForm.meeting_place_img = '';
		},
		saveAddVenue(formName){
			this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	var start_time = this.add_venue_ruleForm.start_time;
	          	var end_time = this.add_venue_ruleForm.end_time;
	          	if(start_time==''){
	              	this.$message({
	              		type:'success',
	              		message:'开始时间不能为空'
	              	})
	              	return
	          	}else if(end_time==''){
	              	this.$message({
	              		type:'success',
	              		message:'结束时间不能为空'
	              	})
	              	return
	          	}else{
		          	start_time = new Date(start_time).getTime();
		          	end_time = new Date(end_time).getTime();
	          		if(end_time-start_time<0){
		              	this.$message({
		              		type:'success',
		              		message:'开始时间不能大于结束时间'
		              	})
		              	return
		          	}else{
			          	if(this.isAdd){
				            var data = {
								meeting_place_name:this.add_venue_ruleForm.meeting_place_name,
				            	relation_resource_id:this.add_venue_ruleForm.relation_resource_id,
								start_time:this.add_venue_ruleForm.start_time,
								end_time:this.add_venue_ruleForm.end_time,
								meeting_place_img:this.add_venue_ruleForm.meeting_place_img,
								banner_link:this.add_venue_ruleForm.banner_link,
				            }
			            	venue.meetingplaceAdd("Meetingplace/add",data,this,"main")
			          	}else{
				            var data = {
								meeting_place_id:this.add_venue_ruleForm.meeting_place_id,
				            	parent_id:this.add_venue_ruleForm.parent_id,
								meeting_place_sn:this.add_venue_ruleForm.meeting_place_sn,
								meeting_place_name:this.add_venue_ruleForm.meeting_place_name,
				            	relation_resource_id:this.add_venue_ruleForm.relation_resource_id,
								start_time:this.add_venue_ruleForm.start_time,
								end_time:this.add_venue_ruleForm.end_time,
								meeting_place_img:this.add_venue_ruleForm.meeting_place_img,
								banner_link:this.add_venue_ruleForm.banner_link,
				            }
			            	venue.meetingplaceAdd("Meetingplace/edit",data,this,"main")
			          	}
		          	}
	          	}
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
		},
		add_product(data){
			this.$router.push({path:"/home/activityManagement/venue_product",query:{meeting_place_id:data.meeting_place_id}})
		},
		entry_symposium(data){
			this.$router.push({path:"/home/activityManagement/symposium",query:{parent_id:data.meeting_place_id}})
		},
		edit_symposium(data){
			this.addVenuedialogVisible = true;
			this.isAdd = false;
			this.add_venue_ruleForm.meeting_place_id = data.meeting_place_id;
			this.add_venue_ruleForm.relation_resource_id = data.relation_resource_id;
			this.add_venue_ruleForm.meeting_place_name = data.meeting_place_name;
			this.add_venue_ruleForm.start_time = data.start_time_lable;
			this.add_venue_ruleForm.end_time = data.end_time_lable;
			this.add_venue_ruleForm.parent_id = data.parent_id;
			this.add_venue_ruleForm.meeting_place_sn = data.meeting_place_sn;
			this.add_venue_ruleForm.meeting_place_img = data.meeting_place_img;
			this.add_venue_ruleForm.banner_link = data.banner_link;
		},
		suspend(params){
			var str = params.status!=1?"开启":"关闭";
			this.$confirm('此操作将'+str+'会场, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          var data = {
	          	meeting_place_id:params.meeting_place_id,
	          	field:"status",
	          	value:params.status==1?0:1
	          }
				venue.meetingplaceChangeField("Meetingplace/changeField",data,this)
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消'
	          });
	        });
		},
		addVenue(){
			this.addVenuedialogVisible = true;
			this.isAdd = true;
			this.add_venue_ruleForm.relation_resource_id = '';
			this.add_venue_ruleForm.meeting_place_name = '';
			this.add_venue_ruleForm.start_time = '';
			this.add_venue_ruleForm.end_time = '';
			this.add_venue_ruleForm.parent_id = '';
			this.add_venue_ruleForm.meeting_place_sn = '';
			this.add_venue_ruleForm.meeting_place_img = '';
			this.add_venue_ruleForm.banner_link = '';
		},
		fetch(val){
			var data = {
				sn:this.form.sn,
				keywords:this.form.keywords,
				start_time:this.form.start_time,
				end_time:this.form.end_time,
				status:this.form.status,
				page:val?val:this.currentPage,
				rows:this.pageSize,
			}
			venue.meetingplaceList("Meetingplace/list",data,this)
		},
		searchListData(){
			this.fetch();
		},
		handleCurrentChange(val){
			this.fetch(val);
		},
	   	getTime(msg){
	   		if(msg!=undefined){
		   		if(msg[0]!='NaN-0NaN-0NaN 0NaN:0NaN:0NaN'){
		   			this.form.start_time = msg[0];
		   			this.form.end_time = msg[1];
		        }else{
		   			this.form.start_time = '';
		   			this.form.end_time = '';
		        }
	        }else{
	   			this.form.start_time = '';
	   			this.form.end_time = '';
	        }
	   	},
	   	getTimes(msg){
	   		if(msg!=undefined){
		   		if(msg[0]!='NaN-0NaN-0NaN 0NaN:0NaN:0NaN'){
		   			this.add_venue_ruleForm.start_time = msg[0];
		   			this.add_venue_ruleForm.end_time = msg[1];
		        }else{
		   			this.add_venue_ruleForm.start_time = '';
		   			this.add_venue_ruleForm.end_time = '';
		        }
	        }else{
	   			this.add_venue_ruleForm.start_time = '';
	   			this.add_venue_ruleForm.end_time = '';
	        }
	   	},
	},
	components:{
		breadcrumb,picker,symposiumLoadIcon,BigImg
	}
}
</script>
