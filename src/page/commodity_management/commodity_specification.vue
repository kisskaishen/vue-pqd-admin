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
					商品规格列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<el-button type="primary" @click="editSpecifications()">新增规格类别</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="id"
				      label="ID">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="规格名称">
				    </el-table-column>
				    <el-table-column
				      label="是否显示">
				      <template slot-scope="scope">
				      		<span v-if="scope.row.is_show=='1'">显示中</span>
				      		<span v-else>隐藏</span>
					      </template>
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="editSpecifications(scope.row.id,scope.row.name)">编辑</el-button>
				        <el-button type="text" size="small" @click="delSpecifications(scope.row.id,scope.$index)">删除</el-button>
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
  title="增加规格"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="warp_input_label">
  	<div class="text_label">规格名称</div>
  	<div class="input_width">
  		<el-input v-model="input" placeholder="请输入内容"></el-input>
  	</div>
  </div>  
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSpecifications()">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import Spec from '../../js/commodity_specification.js';
 export default {
   data () {
     return {
		currentPage:1,
		totals:0,
		pageSize:10,
     	id:'',
     	dialogVisible:false,
     	 tableData: [],
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
			title1: "商品规格",
			title2: "",
			path1:'/home/commodityManagement/commoditySpecification',
			path2:''
		}
     }
   },
   created(){
	/* 商品规格类型列表  Specification/list  */
		var data = {
			page:1,
			rows:10
		}
		Spec.Specification("Specification/list",data,this);
   },
   components: {
	breadcrumb
   },
   methods:{
//	changeShow(id){
//		var data = {
//			id:id,
//		}
//		Spec.SpecificationDel("Specification/del",data,this,index);
//	},
	delSpecifications(id,index){
		/*删除商品规格类型  Specification/del */
		var data = {
			id:id,
		}
		Spec.SpecificationDel("Specification/del",data,this,index);
	},
	editSpecifications(id,name){
		/*编辑商品规格类型   Specification/add */
		this.dialogVisible = true;
		this.id = id;
		this.input = name;
	},
	addSpecifications(name){
		/* 添加商品规格类型   Specification/edit */
		if(this.id){
			var data = {
				id:this.id,
				name:this.input
			}
			Spec.SpecificationEdit("Specification/edit",data,this);
		}else{
			/* 添加商品规格类型   Specification/edit */
			var data = {
				name:this.input
			}
			Spec.SpecificationAdd("Specification/add",data,this);
		}
	},
      handleCurrentChange(val) {
		var data = {
			page:val,
			rows:this.pageSize
		}
		Spec.Specification("Specification/list",data,this);
      }
   }
 }
</script>
