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
					9.9专场分类
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
											<td>专场名称</td>
											<td><el-input v-model="tableData.name" placeholder="专场名称"></el-input></td>
										</tr>
										<tr>
											<td>专场简介</td>
											<td><el-input v-model="tableData.introduction" placeholder="专场简介"></el-input></td>
										</tr>
										<tr>
											<td>专场展示图片</td>
											<td>
												<special-up-load :imageArr="tableData.img" @addImg="addImg" @deleteImg="deleteImg" :upLoadData="upLoadData1" :type="typeUpLoad1"></special-up-load>
												<!--<img v-show="tableData.img" :src="tableData.img" alt="" style="height:80px;"/>
												<el-button type="danger">上传</el-button>-->
											</td>
										</tr>
										<tr>
											<td>专场Banner</td>
											<td>
												<special-up-load :imageArr="tableData.banner" @addImg="addImg" @deleteImg="deleteImg" :upLoadData="upLoadData2" :type="typeUpLoad2"></special-up-load>
												<!--<img v-show="tableData.banner" :src="tableData.banner" alt="" style="height:80px;"/>
												<el-button type="danger">上传</el-button>-->
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="height_32_table_bottom">
						    <el-button v-if="editClassifiation" type="danger" @click="save('edit')">编辑</el-button>
						    <el-button v-if="addClassifiation" type="danger" @click="save('add')">保存</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import specialUpLoad from '../../components/specialUpLoad';
import Classification from '../../js/special_field_classification.js';
 export default {
   data () {
     return {
     	upLoadData1:{
     		type:'img99'
     	},
     	typeUpLoad1:'img99',
     	upLoadData2:{
     		type:'banner99'
     	},
     	typeUpLoad2:'banner99',
     	addClassifiation:false,
     	editClassifiation:false,
     	classificationId:'',
     	dialogVisible:false,
     	 tableData:{},
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
			title1: "9.9专场分类",
			title2: "",
			path1:'/home/specialManagement/specialFieldClassification',
			path2:''
		}
     }
   },
   created(){
 	      var token = localStorage.getItem("token");
 	      if(token){
 	        this.upLoadData1.Authorization = token;
   	      this.upLoadData2.Authorization = token;
 	      }
   	this.classificationId = this.$route.query.id;
   	if(this.classificationId!=undefined){
   		this.editClassifiation = true;
	   	var data = {
	   		id:this.classificationId
	   	}
		Classification.ExclusiveDetail("Exclusive/info",data,this);
   	}else{
   		this.addClassifiation = true;
   	}
   },
   components: {
breadcrumb,specialUpLoad
   },
   methods:{
   	addImg(val){
   		console.log(JSON.stringify(val))
   		if(val[1]=='img99'){
   			this.tableData.img = val[0];
   		}else if(val[1]=='banner99'){
   			this.tableData.banner = val[0];
   		}
   	},
   	deleteImg(val){
   		if(val=='img99'){
   			this.tableData.img = '';
   		}else if(val=='banner99'){
   			this.tableData.banner = '';
   		}
   	},
   	save(type){
   		if(type=="edit"){
		   	var data = {
		   		id:this.classificationId,
		   		name:this.tableData.name,
		   		introduction:this.tableData.introduction,
		   		img:this.tableData.img,
		   		banner:this.tableData.banner,
		   	}
			Classification.ExclusiveEdit("Exclusive/edit",data,this);
   		}else if(type=="add"){
		   	var data = {
		   		name:this.tableData.name,
		   		introduction:this.tableData.introduction,
		   		img:this.tableData.img,
		   		banner:this.tableData.banner,
		   	}
			Classification.ExclusiveAdd("Exclusive/add",data,this);
   		}
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
      }
   }
 }
</script>
