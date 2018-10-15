<template>
	<div class="evaluate">
		<breadcrumb :content="content_title"></breadcrumb>
		<div class="container">
			<div class="search_admin_list_table">
				<div class="search_admin_list_table_title">
					<span>
						意见反馈
					</span>
				</div>
				<div class="search_btn">
					<div class="search_content">
						<span>反馈类型</span>
						<div class="width-120">
							  <el-select v-model="form.msg_type" placeholder="请选择">
							    <el-option
							      v-for="item in msg_typeoptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
						</div>
					</div>
					<div class="search_content">
						<span>处理状态</span>
						<div class="width-120">
							  <el-select v-model="form.status" placeholder="请选择">
							    <el-option
							      v-for="item in statusoptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
						</div>
					</div>
					<div class="search_content">
						<span>关键词</span>
						<div class="width-120">
							<el-input v-model.trim="form.keywords" placeholder="反馈人或反馈内容"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>联系电话</span>
						<div class="width-120">
							<el-input v-model.trim="form.mobile" placeholder="联系电话"></el-input>
						</div>
					</div>
						<picker style="float:left;margin-bottom:10px;" :title="titleLabel" @onPassByVal='getTimes'></picker>
						<el-button style="float:left;margin-left:20px;" type="primary" @click="searchListData()">查询</el-button>
				</div>
			</div>
		<div class="show_list_table_evaluate_warp_border">
		<div class="show_list_table_evaluate_warp">
			<table class="show_list_table_evaluates" border="0" cellspacing="" cellpadding="">
			<thead>
			<tr>
				<th style="width:100px;">反馈类型</th>
				<th style="width:80px;">反馈人</th>
				<th style="width:80px;">联系电话</th>
				<th style="width:120px;">反馈内容</th>
				<th style="width:300px;">图片</th>
				<th style="width:120px;">反馈日期</th>
				<th style="width:120px;">处理状态</th>
			</tr>
			</thead>
			<tbody>
			<tr class="empty_text_detail" v-show="tableData.length==0">
				<td colspan="7" style="height:100px;line-height: 100px;">暂无可查询数据</td>
			</tr>
			<tr v-for="item in tableData">
				<td>
					{{item.msg_type}}
				</td>
				<td>
					{{item.user_nickname}}
				</td>
				<td>
					{{item.user_mobile}}
				</td>
				<td>
					{{item.msg_content}}
				</td>
				<td>
			      <span v-for="child in item.msg_img">
			        <img  @click="clickImg($event)" style="width:50px;height:50px;margin:0 10px;" :src="child">
			        <!-- 放大图片 -->
			        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
			      </span>
				</td>
				<td>
					{{item.time}}
				</td>
				<td>
					{{item.msg_status}}
				</td>
			</tr>
			</tbody>
			</table>
			  <!--<el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="user_id"
      label="用户ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="user_mobile"
      label="用户手机"
      width="120">
    </el-table-column>
    <el-table-column
      prop="user_nickname"
      label="昵称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="ip"
      label="ip地址"
      width="120">
    </el-table-column>
    <el-table-column
      prop="browser"
      label="浏览器"
      width="360">
    </el-table-column>
    <el-table-column
      prop="time"
      label="添加时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="处理状态"
      width="120">
    </el-table-column>
    <el-table-column
      prop="msg_type"
      label="反馈类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="msg_content"
      label="反馈内容"
      width="120">
    </el-table-column>
    <el-table-column
      prop="msg_img"
      label="图片"
      width="300">
      <template slot-scope="scope">
        <img v-for="item in scope.row.msg_img" :src="item" alt=""  style="width:50px;height:50px;margin-right:10px;"/>
         <span v-for="child in scope.row.msg_img">
            <img  @click="clickImg($event)" style="height:50px;" :src="child">
            <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
          </span>
      </template>
    </el-table-column>
  </el-table>-->
		</div>

		</div>
	       <div class="pagination">
	        <el-pagination
	          @current-change="handleCurrentChange"
	          :current-page="currentPage"
	          :page-size = 'pageSize'
	          layout="total, prev, pager, next, jumper"
	          :total='total'>
	        </el-pagination>
	      </div>
<!--<el-dialog
	title="审核"
  :visible.sync="reportAdsDialog"
  width="420px">
<div class="score_warps">
	<span class="title">审核状态</span>
	<span class="detail">
		  <el-select v-model="auditStatus" placeholder="请选择">
		    <el-option
		      v-for="item in auditStatusOption"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
	</span>
</div>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="reportAdsDialog = false">取 消</el-button>
    <el-button size="small" type="primary" @click="auditedBtn()">确 定</el-button>
  </span>
</el-dialog>-->
		</div>
	</div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import Evaluate from '../../js/evaluate.js';
import Feedback from '../../js/feedback.js';
import BigImg from '../../components/bigImg';
import picker from '../../components/picker'
export default{
	data(){
		return {
			titleLabel:'反馈日期 ',
			imgSrc:'',
			showImg:false,
			auditStatus:'3',
			msg_typeoptions:[],
			statusoptions:[],
			storeReplyVal:'',
			reportAdsDialog:false,
			score:2,
			count:'1',
			activeName:'1',
			form:{
				status:'',
				keywords:'',
				msg_type:'',
				mobile:''
			},
			currentPage:1,
			pageSize:10,
			total:0,
			tableData:[],
			typeOption:[],
			content_title:{
				title1: "意见反馈",
				title2: "",
				path1:'/home/feedback/feedback',
				path2:''
			}
		}
	},
	watch:{

	},
	created(){
		this.fetch();
		Feedback.searchConf("feedback/feedStatus",this)
	},
	methods:{
        clickImg(e) {
            this.showImg = true;
            // 获取当前图片地址
            this.imgSrc = e.currentTarget.src;
        },
        viewImg(){
            this.showImg = false;
        },
		fetch(val){
			var data = {
				status:this.form.status,
				keywords:this.form.keywords,
				msg_type:this.form.msg_type,
				mobile:this.form.mobile,
				time:this.form.time,
				page:val?val:this.currentPage,
				rows:this.pageSize,
			}
			Feedback.feedbackList("feedback/list",data,this);
		},
		searchListData(){
			this.fetch();
		},
		handleCurrentChange(val){
			this.fetch(val);
		},
		getTimes(msg){
	   		if(msg!=undefined){
					console.log(msg[0])
		   		if(msg[0]!='NaN-0NaN-0NaN 0NaN:0NaN:0NaN'){
		   			this.form.time = msg[0]+'/'+msg[1];
		        }else{
		   			this.form.time = '';
		        }
	        }else{
	   			this.form.time = '';
	        }
	   	},
	},
	components:{
		breadcrumb,BigImg,picker
	}
}
</script>

<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/evaluateManager/evaluate.less";
.container{
	padding:0 20px;
}
</style>
