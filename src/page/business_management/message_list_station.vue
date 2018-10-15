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
					站内信列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<el-button type="primary" @click="entryDetail()">添加站内信</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="msg_id"
				      label="站内信id">
				    </el-table-column>
				    <el-table-column
				      prop="store_id"
				      label="发放商户ID">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="发放商户名">
				    </el-table-column>
				    <el-table-column
				      prop="msg_title"
				      label="标题">
				    </el-table-column>
				    <el-table-column
				      label="类型">
				      <template slot-scope="scope">
				      	<span v-if="scope.row.msg_logo_url==null"></span>
				      	<img v-else class="msg_logo_url" :src="scope.row.msg_logo_url" alt="" />
				      	<!--<span v-if="scope.row.type=='1'">罚款</span>
				      	<span v-else-if="scope.row.type=='2'">活动</span>
				      	<span v-else-if="scope.row.type=='3'">新版本</span>
				      	<span v-else-if="scope.row.type=='4'">公告</span>-->
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="msg_time"
				      label="创建时间">
				    </el-table-column>
				    <el-table-column
				      prop="modify_time"
				      label="修改时间">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="entryDetail(scope.row.msg_id)">编辑</el-button>
				        <!--<a :href="'/home/businessManagement/messageListStation/messageListStationDetail?msg_id='+scope.row.msg_id"  target="_blank">编辑</a>-->
				        <el-button type="text" size="small" @click="deleteMegId(scope.row.msg_id,scope.$index)">删除</el-button>
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
import Station from '../../js/message_list_station.js';
import breadcrumb from '../../components/breadcrumb';
 export default {
   data () {
     return {		
     	currentPage:1,
		totals:0,
		pageSize:10,
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
			title1: "站内信列表",
			title2: "",
			path1:'/home/businessManagement/messageListStation',
			path2:''
		}
     }
   },
   created(){
		/* 站内信列表 StandInsideLetter/list */
		var  data = {
			page:1,
			rows:this.pageSize
		}
		Station.StandInsideLetter("StandInsideLetter/list",data,this)
		
   },
   components: {
		breadcrumb
   },
   methods:{
	      handleCurrentChange(val) {
				var data = {
					page:val,
					rows:this.pageSize
				}
				Station.StandInsideLetter("StandInsideLetter/list",data,this)
	      },
		entryDetail(id){
			if(id){
				this.$router.push({name:'message_list_station_detail',query:{msg_id:id}})
			}else{
				this.$router.push({name:'message_list_station_detail'})
			}
		},
		deleteMegId(id,index){
			/* 删除站内信 StandInsideLetter/del */
			var that = this;
	        this.$confirm('您确定要删除么, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
				var data = {
					msg_id : id
				}
				Station.StandInsideLetterDel("StandInsideLetter/del",data,this,index);
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
		}
   }
 }
</script>
