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
					秒杀列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<el-button type="primary" @click="addtime('add')">添加秒杀时间</el-button>
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
				      prop="time"
				      label="秒杀时间(H)">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="添加时间">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="addtime(scope.row.id,scope.$index,scope.row.time,scope.row.is_show)">编辑</el-button>
				        <el-button type="text" size="small" @click="delSecondsKillTime(scope.row.id,scope.$index)">删除</el-button>
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
  :title='timeTitle+"时间段"'
  :visible.sync="dialogVisible"
  width="30%">
  <div class="add_product">		
	  <div class="warp_input_label">
	    <div class="text_label">时间</div>
	    <div class="input_width">
	        <el-input v-model="input" placeholder="只需要填写小时就好"></el-input>
	    </div>
	  </div>	
	  <div class="warp_input_label">
	    <div class="text_label">是否使用</div>
	    <div class="input_width">
	          <el-radio v-model="radio" label="1">是</el-radio>
  			  <el-radio v-model="radio" label="2">否</el-radio>
	    </div>
	  </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addTimeList()">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import Time from '../../js/time_management.js';
 export default {
   data () {
     return {
     	timeTitle:'添加',
     	index:0,
     	currentPage:1,
		totals:0,
		pageSize:10,
     	radio:'1',
     	dialogVisible:false,
     	 tableData: [],
     	input:'',
     	value:'',
		content_title:{
			title1:"活动管理",
			title2:"秒杀列表"
		}
     }
   },
   created(){
   		var data = {
   			page:this.currentPage,
   			rows:this.pageSize,
   		}
		Time.secondsKillTimeList('Secondskill/secondsKillTimeList',data,this)
   },
   components: {
breadcrumb
   },
   methods:{
   	delSecondsKillTime(id,index){
   		 this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	var data = {
        		id:id
        	}
          Time.delSecondsKillTime('Secondskill/delSecondsKillTime',data,this,index)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   	},
   	addTimeList(){
   		var data = {
   			time:this.input,
   			is_show:this.radio,
   		}
		Time.addSecondsKillTime('Secondskill/addSecondsKillTime',data,this,this.index)
   	},
		addtime(id,index,time,isShow){
			console.log(id)
			if(id!='add'){
				this.input = time;
				this.radio = isShow;
				this.timeTitle = '编辑';
				this.index = index;
			}else{
				this.input = '';
				this.radio = '1';
				this.timeTitle = '添加';
			}
			this.dialogVisible = true;
		},
      handleCurrentChange(val) {
   		var data = {
   			page:val,
   			rows:this.pageSize,
   		}
		Time.secondsKillTimeList('Secondskill/secondsKillTimeList',data,this)
      }
   }
 }
</script>
