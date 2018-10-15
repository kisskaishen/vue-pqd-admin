<style lang="less" scoped>
	@import "../../less/config.less";
	// @import "../../less/business_management/business_listings";
	@import "../../less/icon_index/commodity_label";
</style>
<template>
	<div class="business_listings">
		<breadcrumb :content="content_title"></breadcrumb>
		<div class="container">
			<div class="search_admin_list_table">
				<div class="search_admin_list_table_title">
					<span>
					商户标签
				</span>
				</div>
				<div class="search_btn">
					<div class="search_content">
						<span>标签类型</span>
						<div class="width-120">
							<el-select v-model="form.type" placeholder="请选择">
								<el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="search_content">
						<span>状态</span>
						<div class="width-120">
							<el-select v-model="form.status" placeholder="请选择">
								<el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="search_contents">
						<el-button type="primary" @click="searchList()">查询</el-button>
						<el-button type="primary" @click="addLabelMark">添加</el-button>
					</div>
				</div>
				<div class="table_list">
					<el-table :data="tableData" border style="width: 100%">
						<el-table-column prop="id" label="ID" width="60px">
						</el-table-column>
						<el-table-column prop="label_name" label="标签名称">
						</el-table-column>
						<el-table-column label="标签">
							<template slot-scope="scope">
								<span v-if="scope.row.type!=5">
										<img :src="scope.row.img.img1" alt="" style="width:60px;height:60px;">
								</span>
									<span v-if="scope.row.type==5">
											<img :src="scope.row.img.img1" alt="" style="width:60px;height:60px;">
											<img :src="scope.row.img.img2" alt="" style="width:60px;height:60px;">
											<img :src="scope.row.img.img3" alt="" style="width:60px;height:60px;">
											<img :src="scope.row.img.img4" alt="" style="width:60px;height:60px;">
									</span>
							</template>
						</el-table-column>
						<el-table-column prop="type_name" label="标签类型">
						</el-table-column>
						<el-table-column prop="validity_time" label="有效期">
						</el-table-column>
						<el-table-column prop="status_name" label="状态">
						</el-table-column>
						<el-table-column label="操作" width="100px">
							<template slot-scope="scope">
									<el-button type="text" size="small" @click="editdetail(scope.row)">编辑</el-button>
									<el-button type="text" size="del" @click="deleteStore(scope.row.id)">删除</el-button>
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
<el-dialog
  title="添加标签"
  :visible.sync="addLabelMarklDialogVisible"
  width="700px">
	<div class="transfer_bank">
		<div class="transfer_bank_warp">
			<div class="transfer_bank_warp_main">
				<div class="content">
					<div class="content_left">标签名称:</div>
					<div class="content_right">
						<el-input size="small" v-model="addFormLabel.label_name" placeholder="请输入内容"></el-input>
					</div>
					<div class="content_right_explain">
					</div>
				</div>
				<div class="content" v-if="!isEdit">
					<div class="content_left">标签类型:</div>
					<div class="content_right">
							<div class="search_content">
								<div class="width-120">
									<el-select size="small" v-model="addFormLabel.type" placeholder="请选择">
										<el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
							</div>
						</div>
					</div>
					<div class="content_right_explain">
					</div>
				</div>
				<div class="contents" v-show="addFormLabel.type!=5">
						<div class="content_left">标签:</div>
						<div class="content_right">
							<img1_load v-if="control_img" :upLoadData="upLoadData" @addImg = 'returnAddimg' @deleteImg="originalImgFun" :imageArr='addFormLabel.img'></img1_load>
						</div>
						<div class="content_right_explain">
							<div class="">
								1.图片尺寸120X120；
							</div>
							<div class="">
								2.注：角标标签展示在商品详情页轮播图，首页商品列表，常规商品列表，看了又看商品推荐列表
							</div>
						</div>
						<div class="" style="clear:both">
						</div>
				</div>
				<div class="" v-show="addFormLabel.type==5">
						<div class="contents">
								<div class="content_left">商品详情页:</div>
								<div class="content_right">
									<img1_load2 v-if="control_img" :upLoadData="upLoadData2" @addImg = 'returnAddimg2' @deleteImg="originalImgFun2" :imageArr='addFormLabel.img2'></img1_load2>
								</div>
								<div class="content_right_explain">
									<div class="">
										1.图片尺寸750X120；
									</div>
									<div class="">
										2.注：展示在商品详情页轮播
									</div>
								</div>
								<div class="" style="clear:both">
								</div>
						</div>
						<div class="contents">
								<div class="content_left">首页商品</div>
								<div class="content_right">
									<img1_load3 v-if="control_img" :upLoadData="upLoadData3" @addImg = 'returnAddimg3' @deleteImg="originalImgFun3" :imageArr='addFormLabel.img3'></img1_load3>
								</div>
								<div class="content_right_explain">
									<div class="">
										1.图片尺寸698X70；
									</div>
									<div class="">
										2.注：展示在首页商品列表
									</div>
								</div>
								<div class="" style="clear:both">
								</div>
						</div>
						<div class="contents">
								<div class="content_left">首页商品</div>
								<div class="content_right">
									<img1_load4 v-if="control_img" :upLoadData="upLoadData4" @addImg = 'returnAddimg4' @deleteImg="originalImgFun4" :imageArr='addFormLabel.img4'></img1_load4>
								</div>
								<div class="content_right_explain">
									<div class="">
										1.图片尺寸250X50；
									</div>
									<div class="">
										2.注：展示在首页商品列表
									</div>
								</div>
								<div class="" style="clear:both">
								</div>
						</div>
						<div class="contents">
								<div class="content_left">首页商品</div>
								<div class="content_right">
									<img1_load5 v-if="control_img" :upLoadData="upLoadData5" @addImg = 'returnAddimg5' @deleteImg="originalImgFun5" :imageArr='addFormLabel.img5'></img1_load5>
								</div>
								<div class="content_right_explain">
									<div class="">
										1.图片尺寸336X70；
									</div>
									<div class="">
										2.注：展示在首页商品列表
									</div>
								</div>
								<div class="" style="clear:both">
								</div>
						</div>
				</div>
				<div class="contents" v-if="!isEdit">
					<div class="content_left">设置有效期:</div>
					<div class="content_right">
				  	 <el-radio v-model="addFormLabel.radio" label="1">长期有效</el-radio>
				  	<el-radio v-model="addFormLabel.radio" label="2">固定时间</el-radio>
						<div v-show="addFormLabel.radio==2" class="" style="margin:20px 0;">
							<picker :sTime="sTime" :eTime="eTime"  @onPassByVal='getTimes'></picker>
						</div>
					</div>
					<div class="content_right_explain">
					</div>
					<div class="" style="clear:both">

					</div>
				</div>
			</div>
		</div>
	</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addLabelMarklDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addLabel()">确 定</el-button>
  </span>
</el-dialog>
	</div>
</template>
<!--1  白名单  2  黑名单-->
<script>
		import commodity_label from '../../js/commodity_label.js';

	import breadcrumb from '../../components/breadcrumb';
	import picker from '../../components/picker.vue';
		import img1_load from '../../components/active_label/active_label_img1';
		import img1_load2 from '../../components/active_label/active_label_img2';
		import img1_load3 from '../../components/active_label/active_label_img3';
		import img1_load4 from '../../components/active_label/active_label_img4';
		import img1_load5 from '../../components/active_label/active_label_img5';
	export default {
		data() {
			return {
				control_img:false,
				isEdit:false,
				sTime:'',
				eTime:'',
				titleLabel:'有效期',
				upLoadData:{
					type:"labelImg1"
				},
				upLoadData2:{
					type:"labelImg2"
				},
				upLoadData3:{
					type:"labelImg3"
				},
				upLoadData4:{
					type:"labelImg4"
				},
				upLoadData5:{
					type:"labelImg5"
				},
				addFormLabel:{
					validity_time:'',
					label_name:'',
					type:'',
					radio:'1',
					img1:'',
					img2:'',
					img3:'',
					img4:'',
				},
				addLabelMarklDialogVisible:false,
				statusOption:[],
				typeOption:[],
				labelId:'',
				form:{
					type:'',
					status:''
				},
				editForm:{
					label_name:'',
					img1:'',
					img2:'',
					img3:'',
					img4:'',
					validity:'',
					validity_time:'',
				},
				currentPage:1,
				totals:0,
				pageSize:10,
				tableData: [],
				content_title: {
					title1: "图标管理",
					title2: "",
					path1:'/home/icon_index/commodity_label',
					path2:''
				}
			}
		},
		created() {
	      var token = localStorage.getItem("token");
	      if(token){
	        this.upLoadData.Authorization = token;
		      this.upLoadData2.Authorization = token;
		      this.upLoadData3.Authorization = token;
		      this.upLoadData4.Authorization = token;
		      this.upLoadData5.Authorization = token;
	      }
			this.fetch();
			commodity_label.getLabelConf('Label/Conf',this);
		},
		components: {
			breadcrumb,img1_load,picker,img1_load2,img1_load3,img1_load4,img1_load5
		},
		methods: {
			addLabelMark(){
					this.control_img = true;
					this.isEdit = false;
					this.addFormLabel.label_name = '';
					this.addFormLabel.type = '';
					this.addFormLabel.img = '';
					this.addFormLabel.radio = '1';
					this.sTime = '';
					this.eTime = '';
				this.addLabelMarklDialogVisible = true;
			},
			editdetail(params){
					this.control_img = true;
					this.isEdit = true;
					this.labelId = params.id;
					if(params.type=='5'){
						this.addFormLabel.label_name = params.label_name;
						this.addFormLabel.type = params.type;
						this.addFormLabel.img2 = params.img.img1;
						this.addFormLabel.img3 = params.img.img2;
						this.addFormLabel.img4 = params.img.img3;
						this.addFormLabel.img5 = params.img.img4;
						this.addFormLabel.radio = params.validity_period;
						this.sTime = params.validityTimeStart;
						this.eTime = params.validityTimeEnd;
					}else{
							this.addFormLabel.label_name = params.label_name;
							this.addFormLabel.type = params.type;
							this.addFormLabel.img = params.img.img1;
							this.addFormLabel.radio = params.validity_period;
							this.sTime = params.validityTimeStart;
							this.eTime = params.validityTimeEnd;
					}
					this.addLabelMarklDialogVisible = true;
			}	,
	   	getTimes(msg){
	   		if(msg!=undefined){
		   		if(msg[0]!='NaN-0NaN-0NaN'){
		   			this.addFormLabel.validity_time = msg[0]+'/'+msg[1];
		        }else{
		   			this.addFormLabel.validity_time = '';
		        }
	        }else{
	   			this.addFormLabel.validity_time = '';
	        }
			},
			originalImgFun(){
				this.addFormLabel.img = '';
			},
			returnAddimg(data){
				this.addFormLabel.img = data[0];
			},
			originalImgFun2(){
				this.addFormLabel.img2 = '';
			},
			returnAddimg2(data){
				this.addFormLabel.img2 = data[0];
			},
			originalImgFun3(){
				this.addFormLabel.img3 = '';
			},
			returnAddimg3(data){
				this.addFormLabel.img3 = data[0];
			},
			originalImgFun4(){
				this.addFormLabel.img4 = '';
			},
			returnAddimg4(data){
				this.addFormLabel.img4 = data[0];
			},
			originalImgFun5(){
				this.addFormLabel.img5 = '';
			},
			returnAddimg5(data){
				this.addFormLabel.img5 = data[0];
			},
			addLabel(){
					if(!this.isEdit){
						if(this.addFormLabel.type=='5'){
									if(this.addFormLabel.radio=='2'){
										var data = {
											label_name:this.addFormLabel.label_name,
											type:this.addFormLabel.type,
											img1:this.addFormLabel.img2,
											img2:this.addFormLabel.img3,
											img3:this.addFormLabel.img4,
											img4:this.addFormLabel.img5,
											validity:this.addFormLabel.radio,
											validity_time:this.addFormLabel.validity_time,
										}
									}else if(this.addFormLabel.radio=='1'){
											var data = {
												label_name:this.addFormLabel.label_name,
												type:this.addFormLabel.type,
												img1:this.addFormLabel.img2,
												img2:this.addFormLabel.img3,
												img3:this.addFormLabel.img4,
												img4:this.addFormLabel.img5,
												validity:this.addFormLabel.radio,
											}
									}
						}else{
							if(this.addFormLabel.radio=='2'){
								var data = {
									label_name:this.addFormLabel.label_name,
									type:this.addFormLabel.type,
									img1:this.addFormLabel.img,
									validity:this.addFormLabel.radio,
									validity_time:this.addFormLabel.validity_time,
								}
							}else if(this.addFormLabel.radio=='1'){
									var data = {
										label_name:this.addFormLabel.label_name,
										type:this.addFormLabel.type,
										img1:this.addFormLabel.img,
										validity:this.addFormLabel.radio,
									}
							}
						}
						commodity_label.addLabel('Label/addLabel',data,this);
					}else{
						if(this.addFormLabel.type=='5'){
									if(this.addFormLabel.radio=='2'){
										var data = {
											labelId:this.labelId,
											label_name:this.addFormLabel.label_name,
											type:this.addFormLabel.type,
											img1:this.addFormLabel.img2,
											img2:this.addFormLabel.img3,
											img3:this.addFormLabel.img4,
											img4:this.addFormLabel.img5,
											validity:this.addFormLabel.radio,
											validity_time:this.addFormLabel.validity_time,
										}
									}else if(this.addFormLabel.radio=='1'){
											var data = {
												labelId:this.labelId,
												label_name:this.addFormLabel.label_name,
												type:this.addFormLabel.type,
												img1:this.addFormLabel.img2,
												img2:this.addFormLabel.img3,
												img3:this.addFormLabel.img4,
												img4:this.addFormLabel.img5,
												validity:this.addFormLabel.radio,
											}
									}
						}else{
							if(this.addFormLabel.radio=='2'){
								var data = {
									labelId:this.labelId,
									label_name:this.addFormLabel.label_name,
									type:this.addFormLabel.type,
									img1:this.addFormLabel.img,
									validity:this.addFormLabel.radio,
									validity_time:this.addFormLabel.validity_time,
								}
							}else if(this.addFormLabel.radio=='1'){
									var data = {
										labelId:this.labelId,
										label_name:this.addFormLabel.label_name,
										type:this.addFormLabel.type,
										img1:this.addFormLabel.img,
										validity:this.addFormLabel.radio,
									}
							}
						}
						commodity_label.addLabel('Label/edit',data,this);
					}
			},
			searchList(){
				this.fetch();
			},
			fetch(val){
				var data = {
					page:val?val:this.currentPage,
					rows:this.pageSize,
					status:this.form.status,
					type:this.form.type,
				}
				commodity_label.getLabelList('Label/list',data,this);
			},
			deleteStore(id){
				/* 删除商户  */
				var that = this;
				        this.$confirm('您确定要删除么, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							var data = {
								labelId:id
							}
							commodity_label.delLabel('Label/del',data,this);
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消删除'
				          });
				        });
			},
      handleCurrentChange(val) {
				this.fetch(val)
      }
		}
	}
</script>
