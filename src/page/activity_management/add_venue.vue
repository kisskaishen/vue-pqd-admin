<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/evaluateManager/evaluate.less";
.container{
	padding:0 20px;
}
</style>
<template>
	<div class="evaluate">
		<breadcrumb :content="content_title"></breadcrumb>
		<div class="container">
			<div class="search_admin_list_table">
				<div class="search_admin_list_table_title">
					<span>
						添加主会场
					</span>
				</div>
				<div class="add_venue_warp_content">
					<div class="add_venue_warp">
						<div class="add_venue_warp_left">
							会场名称：
						</div>
						<div class="add_venue_warp_right">
							<div class="width_input">
								<el-input v-model="input" placeholder="请输入内容"></el-input>
							</div>
						</div>
					</div>
					<div class="add_venue_warp">
						<div class="add_venue_warp_left">
							关联资源位活动：
						</div>
						<div class="add_venue_warp_right">
							<div class="width_input">
								<el-select v-model="value" placeholder="请选择">
								    <el-option
								      v-for="item in options"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
							</div>
						</div>
					</div>
					<div class="add_venue_warp">
						<div class="add_venue_warp_left">
							有效期：
						</div>
						<div class="add_venue_warp_right">
							<div class="width_input">
								<picker @onPassByVal='getTimes'></picker>
							</div>
						</div>
					</div>
					<div class="add_venue_warp_btn">
						<div class="add_venue_warp_left">
							<el-button type="primary" @click="saveAddVenue()">保存</el-button>
						</div>
						<!--<div class="add_venue_warp_right">
							<el-button type="danger">取消</el-button>
						</div>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';
import venue from '../../js/venue';
export default{
	data(){
		return {
			options:[],
			value:'',
			input:'',
			statusoptions:[],
			reportAdsDialog:false,
			form:{
				sn:'',
				keywords:'',
				start_time:'',
				end_time:'',
				status:'',
			},
			currentPage:1,
			pageSize:10,
			total:0,
			tableData:[],
			content_title:{
				title1: "会场专题",
				title2: "",
				path1:'/home/activityManagement/venue',
				path2:''
			}
		}
	},
	watch:{

	},
	created(){
	},
	methods:{
		saveAddVenue(){
			
		},
	   	getTimes(msg){
	   		if(msg!=undefined){
		   		if(msg[0]!='NaN-0NaN-0NaN'){
		   			this.form.start_time = msg[0];
		   			this.form.end_time = msg[1];
		        }else{
		   			this.form.start_time = '';
		   			this.form.end_time = '';
		        }
	        }else{
	   			this.form.start_time = '';
	   			this.form.end_time = '';
	        }
	   	},
	},
	components:{
		breadcrumb,picker
	}
}
</script>