<style lang="less" scoped>
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
						添加分会场
					</span>
				</div>
			</div>
			<div class="table_warp" style="padding:20px;background:#fff">
				<div class="add_venue_warp_content">
					<div class="add_venue_warp">
						<div class="add_venue_warp_left">
							会场名称：
						</div>
						<div class="add_venue_warp_right">
							<div class="width_input">
								<el-input :maxlength="10" v-model="symposium_detail.meeting_place_name" placeholder="请输入内容"></el-input>
							</div>
						</div>
					</div>
					<div class="add_venue_warp">
						<div class="add_venue_warp_left">
							分会场banner：
						</div>
						<div class="add_venue_warp_right">
							<div class="width_input">
								<symposium-load type="sessions" :explain="explain1" :upLoadData="upLoadData1" @addImg="addImg" @deleteImg="deleteImg" :imageArr="symposium_detail.meeting_place_img"></symposium-load>
							</div>
						</div>
					</div>
					<div class="add_venue_warp">
						<div class="add_venue_warp_left">
							icon：
						</div>
						<div class="add_venue_warp_right">
							<div class="width_input">
								<symposium-load type="icon" :explain="explain2" :upLoadData="upLoadData2" @addImg="addImg" @deleteImg="deleteImg" :imageArr="symposium_detail.icon_img"></symposium-load>
							</div>
						</div>
					</div>
					<div class="add_venue_warp">
						<div class="add_venue_warp_left">
							二级类目：
						</div>
						<div class="add_venue_warp_right">
							<div class="ul_category_warp">
								<div class="table_li" v-for="(item,index) in symposium_detail.cat_list">
									<div class="cate_name">{{item.cat_name}}</div>
									<div class="cate_name delete">
										<img @click="delete_category(index)" class="delete_img" src="../../images/icons/delete.png" alt="" />
									</div>
									<div class="cate_name">关联商品分类</div>
									<div class="cate_name">
										<el-button @click="select_goods_category(item,index)" size="small" type="primary">选择商品分类</el-button></div>
								</div>
								<div class="cate_btn">
									<div class="cate_name input_width">
										<el-input :maxlength="10" v-model="add_cate_name" placeholder="请输入内容"></el-input>
									</div>
									<div class="cate_name add" @click="add_category()">
										<img class="add_img" src="../../images/icons/add.png" alt="" /></div>
								</div>
							</div>
						</div>
					</div>
					<div class="add_venue_warp">
						<div class="add_venue_warp_left">
						</div>
						<div class="add_venue_warp_right">
							 <el-button @click="saveSymposiumDetail()" type="primary">保存</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
<el-dialog
  title="设置活动"
  :visible.sync="dialogVisibleTwo"
  width="90%">
<div class="set_active_dialog">
	<el-tree
	  :data="category_list"
	  ref="trees"
	  show-checkbox
	  node-key="value"
	  :default-checked-keys="selectData">
	</el-tree>
</div>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleTwo = false">取 消</el-button>
    <el-button type="primary" @click="getkey()">确 定</el-button>
  </div>
</el-dialog>
	</div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import symposiumLoad from '../../components/symposium_load';
import symposiumLoadIcon from '../../components/symposium_load_icon';
import picker from '../../components/picker';
import venue from '../../js/venue';
import Commodity from '../../js/commodity_classification.js';
export default{
	data(){
		return {
			explain1:[
				{value:"上传分会场图片，图片要求尺寸750X302"}
			],
			upLoadData1:{
				type:"meetingPlaceImg"
			},
			explain2:[
				{value:"上传分会场图片，图片要求尺寸210X210"}
			],
			upLoadData2:{
				type:"meetingPlaceIcon"
			},
			meeting_place_sn:'',
			isAdd:true,
			meeting_place_id:'',
			parent_id:'',
			category_listOpiton:[],
			currentIndex:0,
			category_list:[],
			add_cate_name:'',
     		selectData:[],
			data3:[],
			dialogVisibleTwo:false,
			symposium_detail:{
				cat_list:[]
			},
			input:'',
			currentPage:1,
			pageSize:10,
			totals:0,
			tableData:[],
			tableDatas:[],
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
				 this.upLoadData1.Authorization = token;
					 this.upLoadData2.Authorization = token;
			 }
		this.meeting_place_id = this.$route.query.meeting_place_id;
		this.parent_id = this.$route.query.parent_id;
		this.meeting_place_sn = this.$route.query.meeting_place_sn;
		if(this.meeting_place_sn){
			this.fetch();
			this.isAdd  = false;
		}
	},
	methods:{
		saveSymposiumDetail(){
			var that = this;
			var cat_list_arr = [];
			console.log(this.symposium_detail.meeting_place_name)
			console.log(this.symposium_detail.meeting_place_img)
			console.log(this.symposium_detail.icon_img)
			 if(this.symposium_detail.meeting_place_name==''||this.symposium_detail.meeting_place_name==undefined){
				this.$message({
					type:'info',
					message:"请添加会场名称"
				})
				return
			}else if(this.symposium_detail.meeting_place_img==''||this.symposium_detail.meeting_place_img==undefined){
				this.$message({
					type:'info',
					message:"请上传分会场banner"
				})
				return
			}else if(this.symposium_detail.icon_img==''||this.symposium_detail.icon_img==undefined){
				this.$message({
					type:'info',
					message:"请上传icon"
				})
				return
			}else if(this.symposium_detail.cat_list.length==0){
				this.$message({
					type:'info',
					message:"请添加二级类目"
				})
				return
			}
			this.symposium_detail.cat_list.forEach((item,index)=>{
				cat_list_arr.push({
					id:item.id,
					meeting_place_id:item.meeting_place_id,
					cat_name:item.cat_name,
					relation_cat_id:item.relation_cat_id,
				})
			})
			cat_list_arr = JSON.stringify(cat_list_arr);
			if(!this.isAdd){
				var data = {
					meeting_place_id:this.meeting_place_id,
					parent_id:this.parent_id,
					meeting_place_sn:this.meeting_place_sn,
					meeting_place_name:this.symposium_detail.meeting_place_name,
					meeting_place_img:this.symposium_detail.meeting_place_img,
					icon_img:this.symposium_detail.icon_img,
					cat_list:cat_list_arr,
				}
				venue.meetingplaceAdd("Meetingplace/edit",data,this)
			}else{
				var data = {
					meeting_place_name:this.symposium_detail.meeting_place_name,
					meeting_place_img:this.symposium_detail.meeting_place_img,
					icon_img:this.symposium_detail.icon_img,
					meeting_place_id:this.meeting_place_id,
					cat_list:cat_list_arr,
				}
				venue.meetingplaceAdd("Meetingplace/add",data,this)
			}
		},
		addImg(msg){
			if(msg[1]=='sessions'){
				this.symposium_detail.meeting_place_img = msg[0];
			}else if(msg[1]=='icon'){
				this.symposium_detail.icon_img = msg[0];
			}
		},
		deleteImg(msg){
			if(msg=='sessions'){
				this.symposium_detail.meeting_place_img = '';
			}else if(msg=='icon'){
				this.symposium_detail.icon_img = '';
			}
		},
		getkey(){
	   		var arrs = this.$refs.trees.getCheckedKeys();
			this.symposium_detail.cat_list[this.currentIndex].relation_cat_id = arrs;
			this.dialogVisibleTwo = false;
		},
		add_category(){
			if(this.add_cate_name==''){
				this.$message({
					type:'info',
					message:'请先输入二级类目标题'
				})
				return
			}else{
				venue.meetingplaceConf("Meetingplace/conf",this,"addSymposium")
			}
		},
		delete_category(index){
			this.symposium_detail.cat_list.splice(index,1)
		},
		select_goods_category(params,index){
			this.dialogVisibleTwo = true;
			this.currentIndex = index;
			this.selectData = params.relation_cat_id;
			this.category_list = params.category_list;
		},
		fetch(){
			var data = {
//				meeting_place_id:4
				meeting_place_id:this.meeting_place_id
			}
	    	venue.meetingplaceDetail("Meetingplace/detail",data,this)
		},
		handleCurrentChange(val){

		},
		search_symposium(){

		},
		edit_symposium(){

		},
		addVenue(){
			this.$router.push("/home/activityManagement/symposium_detail")
		}
	},
	components:{
		breadcrumb,picker,symposiumLoad,symposiumLoadIcon
	}
}
</script>
