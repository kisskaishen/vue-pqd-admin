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
					专场分类
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<el-button type="primary" @click="entryDetail('4556')">添加专场</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="id"
				      label="ID"
              width="60">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="专场名称">
				    </el-table-column>
				    <el-table-column
				      prop="introduction"
				      label="专场简介">
				    </el-table-column>
				    <el-table-column
				      label="专场图片">
				      <template slot-scope="scope">
				      	<img :src="scope.row.img" alt="" style="height:80px"/>
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="专场banner">
				      <template slot-scope="scope">
                <span v-for="child in scope.row.banner">
  				      	<img :src="child" alt="" style="height:80px"/>
                </span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="editClassification(scope.$index,scope.row.id)">编辑</el-button>
				        <el-button type="text" size="small" @click="delClassification(scope.$index,scope.row.id)">删除</el-button>
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
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import Classification from '../../js/special_field_classification.js';
 export default {
   data () {
     return {
     	currentPage:1,
		totals:0,
		pageSize:10,
     	 tableData: [],
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
   	var data = {
   		page:this.currentPage,
   		rows:this.pageSize
   	}
	Classification.ExclusiveList("Exclusive/list",data,this,"special");
   },
   components: {
breadcrumb
   },
   methods:{
   	delClassification(index,id){
   		this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
		   	var data = {
		   		id:id
		   	}
			Classification.ExclusiveDel("Exclusive/del",data,this,index);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
   	},
   	editClassification(index,id){
   		this.$router.push({name:'special_field_classification_detail',query:{id:id}})
   	},
		entryDetail(id){
			this.$router.push({name:'special_field_classification_detail'})
		},
      handleCurrentChange(val) {
	   	var data = {
	   		page:val,
	   		rows:this.pageSize
	   	}
		Classification.ExclusiveList("Exclusive/list",data,this);
      }
   }
 }
</script>
