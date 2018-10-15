<style lang="less" scoped>
	@import "../../less/config.less";
	@import "../../less/business_management/business_listings";
	.journal_content{
		height:100px;
		overflow-y:scroll
	}
</style>
<template>
	<div class="business_listings">
		<breadcrumb :content="content_title"></breadcrumb>
		<div class="container">
			<div class="search_admin_list_table">
				<div class="search_admin_list_table_title">
					<span>
					日志记录列表
				</span>
				</div>
				<div class="search_btn">
					<div class="search_content">
						<span>日志等级</span>
						<div class="width-120">
							<el-select v-model="form.log_level" placeholder="日志等级">
								<el-option v-for="item in logLevelOption" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="search_content">
						<span>日志标题</span>
						<div class="width-120">
							<el-input v-model="form.log_title" placeholder="日志标题"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>日期</span>
						<div class="width-120">
							<el-input v-model="form.day" placeholder="日期"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>日志数据</span>
						<div class="width-120">
							<el-input v-model="form.log_data" placeholder="日志数据"></el-input>
						</div>
					</div>
					<div class="search_content">
						<el-button type="primary" @click="searchList()">查询</el-button>
					</div>
				</div>
				<div class="table_list">
					<el-table :data="tableData" border style="width: 100%">
						<el-table-column prop="log_title" label="日志标题">
						</el-table-column>
						<el-table-column prop="log_level" label="日志等级">
						</el-table-column>
						<el-table-column prop="log_data" label="日志内容" width="360px">
					      <template slot-scope="scope">
					      	<div class="journal_content">
					      		{{scope.row.log_data}}
					      	</div>
					      </template>
						</el-table-column>
						<el-table-column prop="index" label="索引">
						</el-table-column>
						<el-table-column prop="log_module" label="模型">
						</el-table-column>
						<el-table-column prop="log_controller" label="控制器">
						</el-table-column>
						<el-table-column prop="log_action" label="方法">
						</el-table-column>
						<el-table-column prop="log_post" label="post数据">
						</el-table-column>
						<el-table-column prop="log_get" label="get数据">
						</el-table-column>
						<el-table-column prop="timestamp" label="时间">
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
<!--1  白名单  2  黑名单-->
<script>
import Journal from '../../js/journal_list';
export default{
	data(){
		return {
			logLevelOption:[],
			tableData:[],
			currentPage:1,
			pageSize:10,
			totals:0,
			form:{
				log_title:'',
				day:'',
				log_level:'',
				log_data:'',
			},
			content_title: {
				title1: "系统日志",
				title2: "",
				path1:'/home/system_journal/journal_list',
				path2:''
			}
		}
	},
	created(){
		this.fetch();
		Journal.searchConf("log/searchConf",this)
	},
	methods:{
		fetch(val){
			var data = {
				log_title:this.form.log_title,
				day:this.form.day,
				log_level:this.form.log_level,
				log_data:this.form.log_data,
				page:val?val:this.currentPage,
			}
			Journal.journalList("log/list",data,this)
		},
		searchList(){
			this.fetch();
		},
		handleCurrentChange(val){
			this.fetch(val);
		}
	}
}
</script>