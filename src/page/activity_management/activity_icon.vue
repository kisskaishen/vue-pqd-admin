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
					活动图标
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>ICON选择</span>
					<div class="width-120">
					  <el-select @focus="getFocusList()" v-model="icon_id" placeholder="ICON选择">
					    <el-option
					      v-for="item in options"
					      :key="item.key"
					      :label="item.name"
					      :value="item.key">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>商户名</span>
					<div class="width-120">
						<el-input v-model="store_name" placeholder="商户名"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchList()">查询</el-button>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="entryDetail()">添加商户商品</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="goods_id"
				      label="ID">
				    </el-table-column>
				    <el-table-column
				      prop="goods_name"
				      label="商品名称"
				      width='600'>
				    </el-table-column>
				    <el-table-column
				      prop="type_name"
				      label="水印类别">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称">
				    </el-table-column>
				    <el-table-column
				      prop="cat_name"
				      label="分类">
				    </el-table-column>
				    <el-table-column
				      prop="shop_price"
				      label="市场价">
				    </el-table-column>
				    <el-table-column
				      prop="prom_price"
				      label="团购价">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="deleteGoods(scope.row.id,scope.$index)">删除</el-button>
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
import Activity from '../../js/activity_icon.js';
 export default {
   data () {
     return {
     	store_name:'',
     	icon_id:'',
		currentPage:1,
		totals:0,
		pageSize:10,
     	 tableData: [],
     	store_name:'',
     	icon_id:'',
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
			title1: "活动图标",
			title2: "",
			path1:'/home/activityManagement/activityIcon',
			path2:''
		}
     }
   },
   created(){
   	/*活动管理-活动图标-商品列表  Activityicon/list */
			var data = {
				page:1,
				rows:this.pageSize
			}
			Activity.Activityicon("Activityicon/list",data,this);
   },
   components: {
breadcrumb
   },
   methods:{ 
   	getFocusList(){
   		Activity.getActivityicon("Activityicon/iconList",this);
   	},
   	searchList(){
   		/* 活动管理-省钱大法-商品列表  Activityicon/list */
			var data = {
				page:1,
				rows:this.pageSize,
				store_name:this.store_name,
				icon_id:this.icon_id,
			}
		Activity.Activityicon("Activityicon/list",data,this);
   	},  	
   	deleteGoods(id,index){
   		/* 活动管理-省钱大法-删除商品  Activityicon/del */
   		this.$confirm('此操作将永久删除么, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
	   		var data = {
	   			ids:id
	   		}
			Activity.ActivityiconDel("Activityicon/list",data,this);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   	},
		  handleCurrentChange(val) {
			var data = {
				store_name:this.store_name,
				icon_id:this.icon_id,
				page:val,
				rows:this.pageSize
			}
			Activity.Activityicon("Activityicon/list",data,this);
		  },
		entryDetail(id){
			this.$router.push({name:'activity_icon_detail'})
		},
   }
 }
</script>
