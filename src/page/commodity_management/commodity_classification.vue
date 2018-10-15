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
					:data="tableData"
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
    <el-form-item  class="spacing-form" label="上级分类" :label-width="formLabelWidth">
    		<div class="spacing-form-warp-left">
	          <el-select @change="selectLevel(form.parent_id)" v-model="form.parent_id" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
    		</div>
    		<div class="spacing-form-warp-right">
			    <el-select v-model="form.child_id" placeholder="请选择">
				    <el-option
				      v-for="item in optionsLevel"
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
      <category-up-load @deleteBig="deleteBig" @addImg="addImg" :imageArr="form.img" :upLoadData="upLoadData1" :type="category"></category-up-load>
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
import Commodity from '../../js/commodity_classification.js';
import breadcrumb from '../../components/breadcrumb';
import categoryUpLoad from '../../components/categoryUpLoad';
 export default {
   data () {
     return {
     	defaultArr:[],
     	params:{},
     	upLoadData1:{
     		type:'catImg'
     	},
     	category:'category',
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
			path1:'/home/commodityManagement/commodityClassification',
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
 	      }
	       Commodity.Goodscategory("Goodscategory/tree",this)
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
   		this.form.parent_id = jsonD._path[1];
   		this.form.showOptionId = jsonD._path[1];
   		this.form.child_id = jsonD._path[2];
   		this.form.is_show = jsonD.is_show;
   		this.form.img = jsonD.img;
// 		this.params.label = jsonD.label;
   		this.form.level = jsonD.level;
   	},
   	deleteImg(val){

   	},
   	addImg(val){
   		this.form.img = val[0];
   	},
   	addClassification(){
   		if(this.form.level>=3){
    		this.$message({
   				type:'info',
   				message:'三级模块以下无法添加子菜单'
   			})
   			return
		}
		this.isAdd = true;
   		this.form.id = '';
   		this.form.name = '';
   		this.form.parent_id = '';
   		this.form.is_show = '';
   		this.form.img = '';
   		this.form.level = '';
   		this.dialogFormVisible = true;
		var data = {
			page:1,
			rows:200,
			is_show:'',
			parent_id:0,
		}
		Commodity.twoLevelTree("Goodscategory/list",data,this)
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
			console.log(this.form.showOptionId)
//			return
	   		this.dialogFormVisible = true;
			var data = {
				page:1,
				rows:200,
				is_show:'',
				parent_id:0,
			}
			Commodity.twoLevelTree("Goodscategory/list",data,this)

			var params = {
				page:1,
				rows:200,
				is_show:'',
				parent_id:this.form.showOptionId,
			}
			Commodity.twoLevelTree("Goodscategory/list",params,this,'two');
		}
   	},
   	selectLevel(){
   		console.log(this.form.parent_id)
   		if(this.form.parent_id!='0'){
			var params = {
				page:1,
				rows:200,
				is_show:'',
				parent_id:this.form.parent_id,
			}
			Commodity.twoLevelTree("Goodscategory/list",params,this,'two');
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
			if(ids==undefined){
	          	this.$message({
	          		type:'info',
	          		message:'请选择要删除的类别'
	          	})
	          	return
			}else{
		   		 var data = {
		   		 	id:ids
		   		 }
				Commodity.delGoodscategory("Goodscategory/del",data,this)
			}
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
   	},
   	addCategory(){
   		console.log(this.form.parent_id)
   		console.log(this.form.child_id)
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
	   		}
			Commodity.addGoodscategory("Goodscategory/add",data,this)
   		}else{
	   		var data = {
	   			id:this.form.id,
	   			name:this.form.name,
	   			parent_id:this.form.parent_id,
	   			is_show:this.form.is_show,
	   			img:this.form.img,
	   		}
			Commodity.addGoodscategory("Goodscategory/edit",data,this)
   		}
   	},
   	handleChange(){
   		console.log(this.selectedOptions2)
   	},
      handleNodeClick(data) {
        console.log(data);
      },
    rowClick(data, index, event) {
        console.log('当前行数据:' + JSON.stringify(data))
        console.log('点击行号:' + JSON.stringify(index))
        console.log('点击事件:' + event)
    },
    selectionClick(arr) {
        console.log('选中数据id数组:' + arr)
    },
    sortClick(key, type) {
        console.log('排序字段:' + key)
        console.log('排序规则:' + type)
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
			Commodity.Goodscategory("Goodscategory/list",this)
      }
   }
 }
</script>
