<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/marketing.less";
</style>
<template>
 <div class="marketing">
     <breadcrumb :content="content_title"></breadcrumb>
     <div class="marketing_main"> 
		<div class="search_admin_list_table">
			<div class="search_admin_list_table_title">
				<span>
					资源位活动
				</span>
			</div>
		</div>
         <div class="tab_common">
            <div class="marketing_content">
                <ul>
                    <li v-for="item in activeInfoData">
                    	<div class="action_warp">
                    		<div class="active_img">
                    			<img :src="item.cover_img" alt="" />
                    		</div>
                            <div class="warp">
                                <div class="title">{{item.activity_name}}</div> 
                                <div class="active_time">活动状态：{{item.activity_status_name}}</div>
                                <div class="sign_time">报名时间：{{item.enter_view_time}}</div>
                                <div class="active_detail">活动时间：{{item.start_view_time}}<el-button type="text" @click="entryDetail(item)">详情</el-button></div>
                            </div>
                    	</div>
                    </li>
                </ul>     
            </div> 
         </div>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-size=15
                layout="total, prev, pager, next, jumper"
                :total=total>
            </el-pagination>
        </div>
     </div>
 </div>
</template>

<script>
import resource_activity from '../../js/resource_activity';
import breadcrumb from '../../components/breadcrumb';
 export default {
   data () {
     return {
		content_title:{
			title1: "营销活动",
			title2: "",
			path1:'/home/marketing/marketing_active',
			path2:''
		},
     	activeInfoData:[],
         tableData: [],
         activeNameDetail:'first',
         activeName:'first',
         currentPage4:1,
         itemData:[],
         total:0,
         pageSize:10
     }
   },
   created(){
   	this.fetch();
   },
   components: {
		breadcrumb
   },
   methods:{
	   	fetch(){
	   		var data = {
	   			page:this.currentPage4,
	   			rows:this.pageSize,
	   			activity_type:3,
	   		}
	   		resource_activity.marketingList('Activities/marketingList',data,this);
	   	},
       entryDetail(params){
           this.$router.push({'path':'/home/marketing/resource_activity_detail',query:{activity_id:params.activity_id,action:params.action}})
       },
       handleClickDetail(tab, event) {
        console.log(tab, event);
       },
      handleClick(tab, event) {
        console.log(tab, event);
      },
       handleCurrentChange(){

       }
   }
 }
</script>
