<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
@import "../../less/marketing";
</style>
<template>
 <div class="business_listings">
	<breadcrumb :content="content_title"></breadcrumb>
	<div class="container">
		<div class="search_admin_list_table">
			<div class="search_admin_list_table_title">
				<span>
					活动详情
				</span>
			</div>
			<div class="content_active">
				  <el-tabs v-model="activeName" @tab-click="handleClick">
				    <el-tab-pane label="活动说明" name="0">
				    	<div class="first_detail">
				    		<div class="active_details">
				    			<dl>
				    				<dt><img :src="ruleForm.cover_img"/></dt>
				    				<dd>
				    					<div class="title">{{ruleForm.activity_name}}</div>
				    					<div class="status">活动状态：
				    						<span v-if="ruleForm.activity_status=='1'">正常</span>
				    						<span v-else-if="ruleForm.activity_status=='2'">关闭</span>
				    					</div>
				    					<div class="times">报名时间：{{ruleForm.enter_view_time}}</div>
				    					<div class="active_times">活动时间：{{ruleForm.activity_view_time}}</div>
				    				</dd>
				    			</dl>
				    			<div class="set_active"><el-button size="small" type="primary" @click="setActive()">设置活动</el-button></div>
				    		</div>
							<div class="item_detail">
								<div class="title">
									<div class="tits">资质要求</div>
								</div>
							</div>
							<div class="requirements">
								  <el-table
								    :data="limitData"
								    border
								    style="width: 100%">
								    <el-table-column
								      prop="name"
								      label="资质名称">
								    </el-table-column>
								    <el-table-column
								      prop="content"
								      label="资质详情"
								      width="900">
								    </el-table-column>
								    <el-table-column
								      prop="desc"
								      label="说明">
								    </el-table-column>
								  </el-table>
							</div>
							<div class="item_detail">
								<div class="title">
									<div class="tits">活动规则</div>
								</div>
							</div>
							<ul class="active_detail">
								<li v-html="ruleForm.rule_desc"></li>
							</ul>
							<div class="item_detail">
								<div class="title">
									<div class="tits">活动详情</div>
								</div>
							</div>
							<ul class="active_detail">
								<li v-html="ruleForm.details"></li>
							</ul>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane label="报名记录" name="1">
				    	<div class="record">
				    		  <el-tabs v-model="activeNames" @tab-click="handleClickSelect">
							    <el-tab-pane label="进行中商品" name="1">
							    	<div v-if="action=='promotion'">
							    		<promotion :audit_status="audit_status" :options="options1"></promotion>
							    	</div>
							    	<div v-if="action=='help'">
							    		<help-goods-ing :audit_status="audit_status" :options="options1"></help-goods-ing>
							    	</div>
							    	<div v-if="action=='down'">
							    		<down :audit_status="audit_status" :options="options1"></down>
							    	</div>
							    </el-tab-pane>
							    <el-tab-pane label="待审核商品" name="0">
							    	<div v-if="action=='promotion'">
										<promotion :audit_status="audit_status" :options="options1"></promotion>
							    	</div>
							    	<div v-if="action=='help'">
										<help-goods-ing :audit_status="audit_status" :options="options1"></help-goods-ing>
							    	</div>
							    	<div v-if="action=='down'">
							    		<down :audit_status="audit_status" :options="options1"></down>
							    	</div>
							    </el-tab-pane>
						      </el-tabs>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane label="活动记录" name="3">
				    	<div v-if="action=='promotion'">
							<promotion-record ></promotion-record>
				    	</div>
				    	<div v-if="action=='help'">
				    		<help-goods-record></help-goods-record>
				    	</div>
				    	<div v-if="action=='down'">
							<down-record></down-record>
				    	</div>
				    </el-tab-pane>
				  </el-tabs>
			</div>
		</div>
	</div>
<el-dialog
  title="设置活动"
  :visible.sync="dialogVisible"
  width="80%">
<div class="set_active_dialog">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="报名时间" prop="enter_time">
  	<div class="width_200">
    	<picker @onPassByVal = "onPassByVal1" :title="ruleForm.title1" :sTime="ruleForm.sTime1" :eTime="ruleForm.eTime1" ></picker>
  	</div>
  </el-form-item>
  <el-form-item label="是否长期" prop="enter_long_time">
      <el-radio v-model="ruleForm.enter_long_time" label="1">是</el-radio>
      <el-radio v-model="ruleForm.enter_long_time" label="2">否</el-radio>
  </el-form-item>
  <el-form-item label="活动时间" prop="activity_time">
  	<div class="width_200">
    	<picker @onPassByVal = "onPassByVal2" :title="ruleForm.title2" :sTime="ruleForm.sTime2" :eTime="ruleForm.eTime2" ></picker>
  	</div>
  </el-form-item>
  <el-form-item label="活动状态" prop="activity_status">
      <el-radio v-model="ruleForm.activity_status" label="1">开启</el-radio>
      <el-radio v-model="ruleForm.activity_status" label="2">关闭</el-radio>
  </el-form-item>
  <el-form-item label="报名条件">
    <el-button size="small" type="primary" @click="selectGoods()">选择商品分类</el-button>
  </el-form-item>
	<div class="item_detail">
	<div class="title">
		<div class="tits">活动规则</div>
		<div class="edit_ue">
		     <quill-editor
		      v-model="ruleForm.rule_desc"
		      ref="myQuillEditor"
		      :options="editorOption"
		      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
		      @change="onEditorChange($event)">
		    </quill-editor>
		</div>
	</div>
	<div class="title">
		<div class="tits">活动详情</div>
		<div class="edit_ue">
		     <quill-editor
		      v-model="ruleForm.details"
		      ref="myQuillEditor"
		      :options="editorOption"
		      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
		      @change="onEditorChange($event)">
		    </quill-editor>
		</div>
	</div>
	</div>
</el-form>
</div>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitSetActive()">确 定</el-button>
  </div>
</el-dialog>
<el-dialog
  title="设置活动"
  :visible.sync="dialogVisibleTwo"
  width="90%">
<div class="set_active_dialog">
	<el-tree
	  :data="data3"
	  ref="tree"
	  show-checkbox
	  node-key="id"
	  :default-checked-keys="selectData">
	</el-tree>
</div>
<div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleTwo = false">取 消</el-button>
    <el-button type="primary" @click="getkey()">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script>
import Market from '../../js/resource_activity';
import breadcrumb from '../../components/breadcrumb';

import helpGoodsIng from '../../components/activity/help_goods_ing';
import helpGoodsRecord from '../../components/activity/help_goods_record';

import promotion from '../../components/activity/promotion';
import promotionRecord from '../../components/activity/promotion_record';

import down from '../../components/activity/down';
import downRecord from '../../components/activity/down_record';

import picker from '../../components/picker';
import { quillEditor } from 'vue-quill-editor'
 export default {
   data () {
     return {
     	currentView:'tab_0',
     	audit_status:"0",
     	examineData3:[],
     	total3:0,
     	selectData:[],
     	data3:[],
     	defaultProps: {
          children: 'children',
          label: 'label',
       },
     	examineData:[],
        tableData3: [{
	          date: '2016-05-03',
	          name: '王小虎',
	          address: '上海市普陀区金沙江路 1518 弄'
	        },
	       ],
        multipleSelection: [],
     	dialogVisibleTwo:false,
     	limitData:[],
     	ruleForm:{},
     	dialogVisible:false,
     	selectedOptions1:[],
     	options1:[],
     	selectedOptions2:[],
     	options2:[],
     	options3:[
     		{
     			label:"成功",
     			value:1
     		},
     		{
     			label:"失败",
     			value:0
     		},
     		{
     			label:"助力中",
     			value:2
     		},
     	],
     	activity_id:'',
     	action:'',
     	ruleForm:{
     		rule_desc:'',
     		enter_long_time:'',
     		title1:'',
     		sTime1:'',
     		eTime1:'',
     		title2:'',
     		sTime2:'',
     		eTime2:'',
     		details:'',
     		resource:'',
     		order_sn:'',
     		store_name:'',
     		name:'',
     		enter_time:'',
     		activity_time:'',
     		activity_status:'',
     		rule_category_ids:'',
     		goods_id:'',
     		goods_name:'',
     		store_name:'',
     		cat_id:'',
     		is_ok:'',
     	},
     	rules:{
     		details: [
		      {required: true, message: '请输入详细内容', trigger: 'blur'}
		     ],
//   		resource:[
//   			{ required: true, message: '请选择活动资源', trigger: 'change' }
//   		],
//   		name:[
//   			{ required: true, message: '请输入活动名称', trigger: 'blur' },
//          	{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
//   		]
     	},
     	activeNames:'0',
     	tableData:[],
     	activeName:'0',
     	pageSize:10,
     	currentPage:1,
     	total:0,
		content_title:{
			title1: "营销活动",
			title2: "",
			path1:'/home/marketing/marketing_active',
			path2:''
		},
		editorOption:{
            modules:{
                toolbar:[
                  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                   ['blockquote', 'code-block']
                ]
            }
        }
     }
   },
   created(){
		this.activity_id = this.$route.query.activity_id;
		this.action = this.$route.query.action;
		var data = {
			activity_id:this.activity_id,
			action:this.action,
		}
		Market.activeInfo('Activities/activeInfo',data,this);
		Market.Goodscategory('Goodscategory/tree',this);
   },
   components: {
		breadcrumb,quillEditor,picker,helpGoodsIng,helpGoodsRecord,promotionRecord,promotion,downRecord,down
   },
   methods:{
   	getkey(){
   		var arrs = this.$refs.tree.getCheckedKeys()
   		this.ruleForm.rule_category_ids = arrs.join(',');
   		this.dialogVisibleTwo = false;
   	},
   	onPassByVal1(val){
   		if(val!='["NaN-0NaN-0NaN","NaN-0NaN-0NaN"]'){
	   		this.ruleForm.enter_start_time = val[0];
	   		this.ruleForm.enter_end_time = val[1];
   		}else{
	   		this.ruleForm.enter_start_time = '';
	   		this.ruleForm.enter_end_time = '';
   		}
   	},
   	onPassByVal2(val){
   		if(val!='["NaN-0NaN-0NaN","NaN-0NaN-0NaN"]'){
	   		this.ruleForm.activity_start_time = val[0];
	   		this.ruleForm.activity_end_time = val[1];
   		}else{
	   		this.ruleForm.activity_start_time = '';
	   		this.ruleForm.activity_end_time = '';
   		}
   	},
   	submitSetActive(){
   		var data = {
   			activity_id:this.activity_id,
			     action:this.action,
   			activity_name:this.ruleForm.activity_name,
   			activity_status:this.ruleForm.activity_status,
   			activity_start_time:this.ruleForm.activity_start_time=='NaN-0NaN-0NaN'?"":this.ruleForm.activity_start_time,
   			activity_end_time:this.ruleForm.activity_end_time=='NaN-0NaN-0NaN'?"":this.ruleForm.activity_end_time,
   			enter_start_time:this.ruleForm.enter_start_time=='NaN-0NaN-0NaN'?"":this.ruleForm.enter_start_time,
   			enter_end_time:this.ruleForm.enter_end_time=='NaN-0NaN-0NaN'?"":this.ruleForm.enter_end_time,
   			enter_long_time:this.ruleForm.enter_long_time,
   			desc:this.ruleForm.desc,
   			rule_desc:this.ruleForm.rule_desc,
   			details:this.ruleForm.details,
   			rule_category_ids:this.ruleForm.rule_category_ids,
   		}
        Market.handleUpdateActive('Activities/updateActiveInfo',data,this,'cutPrice');
   	},
    onEditorBlur(){//失去焦点事件
    },
    onEditorFocus(){//获得焦点事件
    },
    onEditorChange(){//内容改变事件
    },
   	examineTop(params){
   		var data = {
   			activity_id:this.activity_id,
			action:this.action,
   			goods_id:params.goods_id,
   			id:params.id,
   		}
   		Market.activeGoodsSetTop('Activities/activeGoodsSetTop',data,this,params);
   	},
   	examinUp(data){

   	},
   	examineDown(data){

   	},
   	examineBottom(params){
   		var data = {
   			activity_id:this.activity_id,
   			goods_id:params.goods_id,
			action:this.action,
   			id:params.id,
   		}
   		Market.activeGoodsSetBottom('Activities/activeGoodsSetBottom',data,this,params);
   	},
   	examineDetail(params){
   		this.$router.push({name:'marketing_goods',query:{activity_id:this.activity_id,id:params.id,goods_id:params.goods_id,}})
   	},
   	examineDetailOrderDetail(activity_goods_id){
   		this.$router.push({name:'marketing_details_list',query:{help_activity_id:activity_goods_id}})
   	},
   	searchListData1(){
   		this.ruleForm.cat_id = this.selectedOptions1;
   		this.fetch(val);
   	},
   	searchListData2(){
   		this.ruleForm.cat_id = this.selectedOptions2
   			this.fetch(val);
   	},
   	userHelpListFetch(val){
        var data = {
        	activity_id:this.activity_id,
			       action:this.action,
        	goods_id:this.ruleForm.goods_id,
        	goods_name:this.ruleForm.goods_name,
        	user_nickname:this.ruleForm.user_nickname,
        	order_sn:this.ruleForm.order_sn,
        	prosess:0,
//      	is_ok:this.ruleForm.is_ok,
        	page:val?val:this.currentPage,
        	rows:this.pageSize,
        }
        // Market.userHelpList('Activities/userRecords',data,this);
   	},
   	handleClickGoods(tab, event) {
      },
   	  toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
   	selectGoods(){
   		this.dialogVisibleTwo = true;
   	},
      handleChange1(value) {

      },
      handleChange2(value) {

      },
   	setActive(){
   		this.dialogVisible = true;

   	},
      handleClick(tab, event) {
        if(tab.name==1){
// 			this.fetch();
        }else if(tab.name==2){
//			var data = {
//				activity_id:this.activity_id,
//			}
//			Market.activeInfo('Activities/activeInfo',data,this);
        }else if(tab.name==3){
   			    // this.userHelpListFetch();
        }
      },
      handleClickSelect(tab, event) {
   		   this.audit_status = tab.name;
// 		this.fetch();
		    this.currentView = 'tab_' + tab.name;
      },
      fetch(val){
	        var data = {
	        	activity_id:this.activity_id,
				    action:this.action,
	        	goods_id:this.ruleForm.goods_id,
	        	goods_name:this.ruleForm.goods_name,
	        	store_name:this.ruleForm.store_name,
	        	cat_id:this.ruleForm.cat_id,
	        	audit_status:this.audit_status,
	        	page:val?val:this.currentPage,
	        	rows:this.pageSize,
	        }
	        Market.activeGoodsList('Activities/activeGoodsList',data,this);
      },
		entryDetail(id){
			this.$router.push({name:'list_of_goods_detail',query:{id:id}})
		},
		handleCurrentChange1(val){
   			this.fetch(val);
		},
		handleCurrentChange2(val){
   			this.fetch(val);
		},
   }
 }
</script>
