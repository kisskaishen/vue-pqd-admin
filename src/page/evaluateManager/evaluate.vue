<template>
	<div class="evaluate">
		<breadcrumb :content="content_title"></breadcrumb>
		<div class="container">
			<div class="search_admin_list_table">
				<div class="search_admin_list_table_title">
					<span>
						评价管理
					</span>
				</div>
				<div class="search_btn">
					<div class="search_content">
						<span>商品ID</span>
						<div class="width-120">
							<el-input v-model="form.goods_id" placeholder="商品ID"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>商品</span>
						<div class="width-120">
							<el-input v-model="form.goods_name" placeholder="商品"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>商家ID</span>
						<div class="width-120">
							<el-input v-model="form.store_id" placeholder="商家ID"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>商家</span>
						<div class="width-120">
							<el-input v-model="form.store_name" placeholder="商家"></el-input>
						</div>
					</div>
					<div class="search_content">
						<el-button type="primary" @click="searchListData()">查询</el-button>
					</div>
				</div>
			</div>
		</div>
		
		<div class="evaluate_warp">
			<div class="evaluate_warp_left">
				<el-tabs v-model="activeName" @tab-click="handleClick">
		            <el-tab-pane v-for="item in typeOption" :key="item.value" :label="item.label+'('+item.count+')'" :name="item.value"></el-tab-pane>
		            <!--<el-tab-pane label="有评价内容" name="2"></el-tab-pane>
		            <el-tab-pane label="无评价内容" name="3"></el-tab-pane>
		            <el-tab-pane label="有追加评价内容" name="4"></el-tab-pane>
		            <el-tab-pane label="已举报的评价" name="5"></el-tab-pane>-->
		        </el-tabs>
			</div>
		</div>
		<div class="show_list_table_evaluate_warp">
			<table class="show_list_table_evaluate" border="0" cellspacing="" cellpadding="">
				<thead>
					<tr>
						<th>商品ID：</th>
						<th>商家ID：</th>
						<th>评价内容：</th>
						<th>评分：</th>
						<th>商品名称：</th>
						<th>凭证：</th>
						<th>是否显示：</th>
						<th>操作：</th>
					</tr>
				</thead>
				<tbody>
					<tr class="empty_text_detail" v-show="tableData.length==0">
						<td colspan="5">暂无可查询数据</td>
					</tr>
					<tr v-for="item in tableData">
						<td>{{item.goods_id}}</td>
						<td>{{item.store_id}}</td>
						<td style="width:400px">
							<div>{{item.content}}</div>
							<div class="product_name" v-for="its in item.list">
								<div v-if="its.op_type=='1'">
									[追加评价]：{{its.content}}
								</div>
								<div v-if="its.op_type=='2'">
									[商家回复]：{{its.content}}
								</div>
							</div>
						</td>
						<td>  
							<div class="score_warp">
								<span class="title">描述相符</span>
								<el-rate
								  v-model="item.goods_rank"
								   class="detail"
								  disabled
								  show-score
								  text-color="#ff9900"
								  score-template="{value}">
								</el-rate>
							</div>
							<div class="score_warp">
								<span class="title">物流服务</span>
								<el-rate
								 v-model="item.deliver_rank"
								   class="detail"
								  disabled
								  show-score
								  text-color="#ff9900"
								  score-template="{value}">
								</el-rate>
							</div>
							<div class="score_warp">
								<span class="title">服务质量</span>
								<el-rate
								  v-model="item.service_rank"
								   class="detail"
								  disabled
								  show-score
								  text-color="#ff9900"
								  score-template="{value}">
								</el-rate>
							</div>
						</td>
						<td>
							{{item.goods_name}}
						</td>
						<td>
							<!--<img v-for="its in item.img" :src="its" alt="" style="width:50px;height:50px;margin-right:10px;"/>-->
		                      <span v-for="child in item.img">
		                        <img  @click="clickImg($event)" style="height:50px;" :src="child">
		                        <!-- 放大图片 -->
		                        <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
		                      </span>
						</td>
						<td>
							{{item.is_show_name}}
						</td>
						<td>
							<el-button v-show="item.btn.audit" type="text" @click="reportAds(item.comment_id)">审核</el-button>
							<el-button v-show="item.btn.show" type="text" @click="reportShow(item)">{{item.is_show=="1"?"隐藏":"显示"}}</el-button>
						</td>
					</tr>
				</tbody>
			</table>
	       <div class="pagination">
	        <el-pagination
	          @current-change="handleCurrentChange"
	          :current-page="currentPage"
	          :page-size = 'pageSize'
	          layout="total, prev, pager, next, jumper"
	          :total='total'>
	        </el-pagination>
	      </div>
		</div>
<el-dialog
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
</el-dialog>
	</div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import Evaluate from '../../js/evaluate.js';
import BigImg from '../../components/bigImg';
export default{
	data(){
		return {
			imgSrc:'',
			showImg:false,
			auditStatus:'3',
			auditStatusOption:[
				{
					label:"拒绝",
					value:"2",
				},
				{
					label:"通过",
					value:"3",
				}
			],
			storeReplyVal:'',
			reportAdsDialog:false,
			score:2,
			count:'1',
			activeName:'1',
			form:{
				goods_id:'',
				type:'1',
				comment_id:''
			},
			currentPage:1,
			pageSize:10,
			total:0,
			tableData:[],
			typeOption:[],
			content_title:{
				title1: "评价管理",
				title2: "",
				path1:'/home/evaluateManager/evaluate',
				path2:''
			}
		}
	},
	watch:{

	},
	created(){
		this.fetch();
		Evaluate.searchConf("Comment/searchConf",this)
	},
	methods:{
		reportShow(params){
			var id=params.comment_id;
			var is_show = params.is_show;
			var str = is_show==1 ? 2 : 1;
			var data = {
				comment_id:id,
				is_show:str,
			}
			Evaluate.commentSetShow("Comment/setShow",data,this)
		},
		fetch(val,count){
			var data = {
				type:count?count:this.form.type,
				goods_id:this.form.goods_id,
				goods_name:this.form.goods_name,
				store_id:this.form.store_id,
				store_name:this.form.store_name,
				page:val?val:this.currentPage,
				rows:this.pageSize,
			}
			Evaluate.commentList("Comment/list",data,this);
		},
		handleClick(tab, event) {
	        this.count = tab.name;
	        this.fetch('',this.count);
		},
		searchListData(){
			this.fetch(this.currentPage,this.count);
		},
		reportAds(id){
			this.form.comment_id = id;
			this.reportAdsDialog = true;
		},
		handleCurrentChange(val){
			this.currentPage = val;
			this.fetch(val,this.count);
		},
		auditedBtn(){
			var data = {
				comment_id:this.form.comment_id,
				audit_status:this.auditStatus
			}
			Evaluate.commentAudit("Comment/setAudit",data,this);
		},
        clickImg(e) {
            this.showImg = true;
            // 获取当前图片地址
            this.imgSrc = e.currentTarget.src;
        },
        viewImg(){
            this.showImg = false;
        },
	},
	components:{
		breadcrumb,BigImg
	}
}
</script>

<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/evaluateManager/evaluate.less";
</style>

















