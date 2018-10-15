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
					广告列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>广告名称</span>
					<div class="width-120">
						<el-input v-model="keywords" placeholder="广告名称"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>广告位置</span>
					<div class="width-120">
					  <el-select @focus="selectOption()" v-model="pid" placeholder="全部">
					    <el-option
					      v-for="item in options"
					      :key="item.position_id"
					      :label="item.position_name"
					      :value="item.position_id">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="searchAdvertisingList()">查询</el-button>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="entryDetail()">新增广告</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="ad_id"
				      label="广告ID">
				    </el-table-column>
				    <el-table-column
				      prop="position_name"
				      label="广告位置">
				    </el-table-column>
				    <el-table-column
				      prop="ad_name"
				      label="广告名称">
				    </el-table-column>
				    <el-table-column
				      label="广告图片">
				      <template slot-scope="scope">
						<img :src="scope.row.ad_code" alt="" style="width:100px;height:50px" />
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="ad_link"
				      label="广告链接">
				    </el-table-column>
				    <el-table-column
				      label="是否显示">
				      <template slot-scope="scope">
				      	<el-switch
				      	@change="changeEnabled(scope.row.ad_id,scope.row.enabled)"
						  v-model="scope.row.enabled"
						  active-color="#13ce66"
						  inactive-color="#ff4949">
						</el-switch>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="orderby"
				      label="排序">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="entryDetail(scope.row.ad_id,scope.$index)">编辑</el-button>
				        <el-button type="text" size="small" @click="deleteAd(scope.row.ad_id,scope.$index)">删除</el-button>
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
import Advertising from '../../js/advertising_list.js';
 export default {
   data () {
     return {
     	keywords:'',
     	pid:'',
		currentPage:1,
		totals:0,
		pageSize:10,
     	 tableData: [],
     	store_name:'',
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
			title1: "广告列表",
			title2: "",
			path1:'/home/advertisingManagement/advertisingList',
			path2:''
		}
     }
   },
   created(){
		/* 活动管理-省钱大法-商品列表   Economize/list  */
		var data = {
			page:1,
			rows:this.pageSize
		}
		Advertising.advertisingList("Ad/list",data,this);
   },
   components: {
breadcrumb
   },
   methods:{
   	changeEnabled(id,val){
   		var data = {
   			ad_id:id,
   			field:'enabled',
   			value:val==true?1:0
   		}
   		Advertising.positionListDetail("Ad/changeField",data,this);
   	},
   	selectOption(){
   		var data = {
   			page:1,
   			rows:100
   		}
   		Advertising.positionList("Ad/positionList",data,this);
   	},
   	searchAdvertisingList(){
   		/* 广告列表  Ad/list */
			var data = {
				page:1,
				rows:this.pageSize,
				keywords:this.keywords,
				pid:this.pid,
			}
		Advertising.advertisingList("Ad/list",data,this);
   	},
   	deleteAd(id,index){
   		/* 活动管理-省钱大法-删除商品  Economize/del */
   		this.$confirm('此操作将永久删除么, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
	   		var data = {
	   			ad_id:id
	   		}
	   		Advertising.advertisingListDel("Ad/delAd",data,this,index);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   	},
		entryDetail(id){
			if(id){
				this.$router.push({name:'advertising_list_detail',query:{ad_id:id}})
			}else{
				this.$router.push({name:'advertising_list_detail'})
			}
		},
      handleCurrentChange(val) {
		var data = {
			page:val,
			rows:this.pageSize,
				keywords:this.keywords,
				pid:this.pid,
		}
		Advertising.advertisingList("Ad/list",data,this);
      }
   }
 }
</script>
