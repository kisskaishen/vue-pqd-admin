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
					商品分类
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<el-button type="primary" @click="addClassification()">新增分类</el-button>
					<el-button type="primary" @click="deleteClassification()">删除分类</el-button>
					<el-button type="primary" @click="editClassification()">编辑分类</el-button>
				</div>
			</div>
			<div class="table_list">
				<el-tree
					ref = "tree"
					node-key="value"
					:highlight-current = 'true'
					:data="optionsCategory"
					:props="defaultProps"
					:default-expanded-keys="defaultArr"
					@node-click="nodeClick">
				</el-tree>
				<!--<el-tree
				  :data="tableData"
				  show-checkbox
				  node-key="value"
				  ref="tree"
				  highlight-current
				  :props="defaultProps">
				</el-tree>-->
			</div>
		</div>
	</div>
<el-dialog title="增加分类" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item class="spacing-form" label="分类名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item class="spacing-form" label="排序" :label-width="formLabelWidth">
      <el-input v-model="form.sort_order" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item v-show="this.haitao_parent_id!=0||this.haitao_parent_id==''"  class="spacing-form" label="上级分类" :label-width="formLabelWidth">
    		<div class="spacing-form-warp-left">
	          <el-select @focus="selectLevel(form.parent_id)" v-model="form.parent_id" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
    		</div>
    </el-form-item>
    <el-form-item class="spacing-form" label="导航显示" :label-width="formLabelWidth">
        <el-radio v-model="form.is_show" label="1">是</el-radio>
  		<el-radio v-model="form.is_show" label="0">否</el-radio>
    </el-form-item>
    <el-form-item class="spacing-form" label="分类展示图片" :label-width="formLabelWidth">
      <category-up-load :explain="componentExplain1" @deleteBig="deleteBig" @addImg="addImg" :imageArr="form.img" :upLoadData="upLoadData1" :type="category"></category-up-load>
    </el-form-item>
    <el-form-item class="spacing-form" label="分类菜单图片" :label-width="formLabelWidth">
      <category-up-load :explain="componentExplain2" @deleteBig="deleteBig2" @addImg="addImg2" :imageArr="form.logo" :upLoadData="upLoadData2" :type="category2"></category-up-load>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCategory()">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script>
import Haitao from '../../js/haitao.js';
import breadcrumb from '../../components/breadcrumb';
import categoryUpLoad from '../../components/categoryUpLoad';
 export default {
   data () {
     return {
     componentExplain1:[
       {
         value:"a.尺寸为120X120",
       }
     ],
     componentExplain2:[
       {
         value:"a.尺寸为272X168",
       }
     ],
     	haitao_parent_id:'',
     	options:[],
     	optionsCategory:[],
     	defaultArr:[],
     	params:{},
     	upLoadData1:{
     		type:'haitaoCatImg'
     	},
     	upLoadData2:{
     		type:'haitaoCatLogo'
     	},
     	category:'category',
     	category2:'category2',
     	currentData:{},
     	currentNode:[],
     	type:true,
     	jsData:{},
     	secondLevel:'',
     	firstLevel:'',
     	selectedOptions2:[],
     	form:{
     		name:'',
     		is_show:'1',
     		parent_id:'',
     		img:'',
     		child_id:'',
     		id:'',
     		showOptionId:0,
     		sort_order:'',
     		logo:''
     	},
     	formLabelWidth:'120px',
     	dialogFormVisible:false,
		currentPage:1,
		totals:0,
		pageSize:10,
     	tableData: [],
     	input:'',
     	value:'',
     	optionsLevel:[],
     	options:[],
		content_title:{
			title1: "商品分类",
			title2: "",
			path1:'/home/haitao/sea_good_category',
			path2:''
		},
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isAdd:'',
     }
   },
   created(){
 	      var token = localStorage.getItem("token");
 	      if(token){
 	        this.upLoadData1.Authorization = token;
   	      this.upLoadData2.Authorization = token;
 	      }
		Haitao.Goodscategory("Haitaocate/tree",this);
		var params = {
			page:1,
			rows:200,
			is_show:'',
			parent_id:this.form.parent_id,
		}
		Haitao.twoLevelTrees("Goodscategory/list",params,this,'two');
   },
   components: {
	breadcrumb,categoryUpLoad
   },
   methods:{
   	deleteBig(){

   	},
   	nodeClick(a,b,c){
   		var jsonD = a;
   		this.form.id = jsonD.value;
   		this.form.name = jsonD.label;
   		this.form.parent_id = jsonD.parent_id;
   		this.form.showOptionId = jsonD._path[1];
   		this.form.child_id = jsonD._path[2];
   		this.form.is_show = jsonD.is_show;
   		this.form.img = jsonD.img;
   		this.form.sort_order = jsonD.sort_order;
   		this.form.logo = jsonD.logo;
   		this.form.level = jsonD.level;
		this.haitao_parent_id  = jsonD.parent_id;
   	},
   	deleteImg(val){

   	},
   	addImg(val){
   		this.form.img = val[0];
   	},
   	deleteBig2(val){

   	},
   	addImg2(val){
   		this.form.logo = val[0];
   	},
   	addClassification(){
// 		if(this.form.parent_id!=0){
//  		this.$message({
// 				type:'info',
// 				message:'二级模块以下无法添加子菜单'
// 			})
// 			return
//		}
		this.isAdd = true;
   		this.form.id = '';
   		this.form.name = '';
   		this.form.sort_order = '';
   		this.form.parent_id = '';
   		this.form.is_show = '';
   		this.form.img = '';
   		this.form.logo = '';
   		this.form.level = '';
   		this.dialogFormVisible = true;
		Haitao.twoLevelTree("Haitaocate/getFirstCate",this)
   	},
   	editClassification(){
   		this.type = false;
		if(this.form.parent_id==''){
          	this.$message({
          		type:'info',
          		message:'请选择要编辑的类别'
          	})
          	return
		}else {
	   		this.dialogFormVisible = true;
		}
   	},
   	selectLevel(){
   		if(this.form.parent_id!='0'){
			this.form.child_id = '';
   		}else{
   			this.optionsLevel = [];
   		}
   	},
   	deleteClassification(){
   		var ids = this.form.id;
		this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
			if(ids==undefined||ids==''){
	          	this.$message({
	          		type:'info',
	          		message:'请选择要删除的类别'
	          	})
	          	return
			}else{
		   		 var data = {
		   		 	id:ids
		   		 }
				Haitao.delGoodscategory("Haitaocate/delCate",data,this)
			}
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
   	},
   	addCategory(){
   		this.type = true;
   		if(this.form.parent_id=='0'){
   			this.form.parent_id = '0';
   		}else if(this.form.parent_id!='0'&&this.form.child_id==''){
   			this.form.parent_id = this.form.parent_id
   		}else if(this.form.parent_id!='0'&&this.form.child_id!=''){
   			this.form.parent_id = this.form.child_id
   		}
   		if(this.type){
	   		var data = {
	   			name:this.form.name,
	   			parent_id:this.form.parent_id,
	   			is_show:this.form.is_show,
	   			img:this.form.img,
	   			logo:this.form.logo,
	   			sort_order:this.form.sort_order,
	   		}
			Haitao.addGoodscategory("Haitaocate/saveCate",data,this)
   		}else{
	   		var data = {
	   			id:this.form.id,
	   			name:this.form.name,
	   			parent_id:this.form.parent_id,
	   			is_show:this.form.is_show,
	   			img:this.form.img,
	   			logo:this.form.logo,
	   			sort_order:this.form.sort_order,
	   		}
			Haitao.addGoodscategory("Haitaocate/saveCate",data,this)
   		}
   	},
   	handleChange(){
   	},
      handleNodeClick(data) {
      },
    rowClick(data, index, event) {
    },
    selectionClick(arr) {
    },
    sortClick(key, type) {
    },
   	changeSwitch(){

   	},
		entryDetail(id){
			this.$router.push({name:'commodity_classification_detail',query:{id:id}})
		},
      handleCurrentChange(val) {
			var data = {
				page:val,
				rows:this.pageSize
			}
			Haitao.Goodscategory("Goodscategory/list",this)
      }
   }
 }
</script>
