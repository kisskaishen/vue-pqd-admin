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
					站内信详情
				</span>
			</div>
			<div class="table_list">
				<div class="current_system">
					<div class="warp">
						<table class="show_list_table_info" border="0" cellspacing="" cellpadding="">
							<tbody>
								<tr>
									<td>标题：</td>
									<td>
										<div class="width-120-warp">
											<div class="width-120">
												<el-input maxLength='60' @blur="checkEmpty(msg_title,'标题')" v-model="msg_title" placeholder="请输入内容"></el-input>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>标识：</td>
									<td>
										<div class="search_content">
											<div class="width-120">
											  <el-select v-model="logo_type" placeholder="请选择">
											    <el-option
											      v-for="item in options"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>发放商户ID：</td>
									<td>
										<div class="width-120-warp">
											<div class="width-120">
												<el-input maxLength='200' @blur="checkEmpty(store_id,'发放商户ID')" v-model="store_id" placeholder="请输入内容"></el-input>
											</div>
											<span>* 0为发放给所有商家，如果发给多个不同商家，请用英文的','将商户id隔开</span>
										</div>
									</td>
								</tr>
								<tr v-show="msg_id">
									<td>发放商户名：</td>
									<td>
										<div class="width-120-warp">
												<el-input
													 maxLength='400'
													  @blur="checkEmpty(store_name,'发放商户名')"
												  type="textarea"
												  :rows="2"
												  placeholder="请输入内容"
												  v-model="store_name">
												</el-input>
										</div>
									</td>
								</tr>
								<tr>
									<td>商品详情描述：</td>
									<td>
										<div class="width-120-warp">
											<el-input
												 maxLength='1000'
											  @blur="checkEmpty(msg_content,'商品详情描述')"
											  type="textarea"
											  :rows="2"
											  placeholder="请输入内容"
											  v-model="msg_content">
											</el-input>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="height-32">
											<el-button type="danger" @click="save()">保存</el-button>
										</div>
									</td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
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
     	msg_id:'',
     	store_name:'',
     	logo_type:'',
     	store_id:'',
     	msg_title:'',
     	msg_content:'',
     	options:[
     		{
     			value: '',
          		label: '状态'
     		},
     		{
     			value: '1',
          		label: '罚款'
     		},
     		{
     			value: '2',
          		label: '活动'
     		},
     		{
     			value: '3',
          		label: '新版本'
     		},
     		{
     			value: '4',
          		label: '公告'
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
   	this.msg_id = this.$route.query.msg_id;
		/* 获取站内信详情  StandInsideLetter/detail  */
		if(this.msg_id){
			var data = {
				msg_id:this.msg_id,
			}
			Station.StandInsideLetterDetail("StandInsideLetter/detail",data,this)
		}
   },
   components: {
	breadcrumb
   },
   methods:{
	save(){
			this.checkEmpty(this.msg_content,'商品详情描述')
			this.checkEmpty(this.msg_title,'标题')
			this.checkEmpty(this.logo_type,'标识')
		if(this.msg_id){
			/* 添加站内信  StandInsideLetter/edit */
			var data = {
				msg_id:this.msg_id,
				store_id:this.store_id,
				msg_content:this.msg_content,
				msg_title:this.msg_title,
				type:this.logo_type,
			}
			Station.StandInsideLetterAdd("StandInsideLetter/edit",data,this)
		}else{
			/* 添加站内信  StandInsideLetter/add */
			var data = {
				store_id:this.store_id,
				msg_content:this.msg_content,
				msg_title:this.msg_title,
				type:this.logo_type,
			}
			Station.StandInsideLetterAdd("StandInsideLetter/add",data,this)
		}
	}
   }
 }
</script>
