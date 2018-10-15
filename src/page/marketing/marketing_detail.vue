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
									<div class="search_btn">
										<div class="search_content">
											<span>商品ID</span>
											<div class="width-120">
												<el-input v-model="ruleForm.goods_id" placeholder="商品ID"></el-input>
											</div>
										</div>
										<div class="search_content">
											<span>商品名称</span>
											<div class="width-120">
												<el-input v-model="ruleForm.goods_name" placeholder="商品名称"></el-input>
											</div>
										</div>
										<div class="search_content">
											<span>商家名称</span>
											<div class="width-120">
												<el-input v-model="ruleForm.store_name" placeholder="商家名称"></el-input>
											</div>
										</div>
										<div class="search_content">
											<span>选择分类</span>
											<div class="width-120">
										      <el-select v-model="selectedOptions1" placeholder="请选择">
											    <el-option
											      v-for="item in options1"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
											</div>
										</div>
										<div class="search_content">
											<el-button type="primary" @click="searchListData1()">查询</el-button>
										</div>
									</div>
									<div class="table_record">
										  <el-table
										    :data="examineData"
										    border
										    style="width: 100%">
										    <el-table-column
										      prop="goods_id"
										      label="商品ID"
										      width="180">
										    </el-table-column>
										    <el-table-column
										      prop="goods_name"
										      label="商品名称"
										      width="180">
										    </el-table-column>
										    <el-table-column
										      prop="store_name"
										      label="商家名称">
										    </el-table-column>
										    <el-table-column
										      prop="cat_name"
										      label="所属分类">
										    </el-table-column>
										    <el-table-column
										      prop="store_count"
										      label="商品库存">
										    </el-table-column>
										    <el-table-column
										      prop="prom_price"
										      label="活动团购价(元)">
										    </el-table-column>
										    <el-table-column
										      prop="limit_stock"
										      label="活动库存">
										    </el-table-column>
										    <el-table-column
										      prop="limit_reach"
										      label="助力人数">
										    </el-table-column>
										    <el-table-column
										      label="位置">
										      <template slot-scope="scope">
										        <el-button @click="examineTop(scope.row)" type="text" size="small">置顶</el-button>
										        <!--<el-button @click="examinUp(scope.row)" type="text" size="small">上移</el-button>
										        <el-button @click="examineDown(scope.row)" type="text" size="small">下移</el-button>-->
										        <el-button @click="examineBottom(scope.row)" type="text" size="small">置底</el-button>
										      </template>
										    </el-table-column>
										    <el-table-column
										      label="操作"
										      width="100">
										      <template slot-scope="scope">
										        <el-button @click="examineDelete(scope.row)" type="text" size="small">删除</el-button>
										        <el-button @click="examineDetail(scope.row,'detail')" type="text" size="small">详情</el-button>
										        <!--<router-link target="_blank" :to="{path:'/home/marketing/marketing_goods',query:{activity_id:activity_id,id:scope.row.id,goods_id:scope.row.goods_id,}}">详情</router-link>-->
										      </template>
										    </el-table-column>
										  </el-table>
								        <div class="pagination">
								            <el-pagination
								                @current-change="handleCurrentChange1"
								                :current-page="currentPage"
								                :page-size=pageSize
								                layout="total, prev, pager, next, jumper"
								                :total=total>
								            </el-pagination>
									</div>
									</div>
							    </el-tab-pane>
							    <el-tab-pane label="待审核商品" name="0">
									<div class="search_btn">
										<div class="search_content">
											<span>商品ID</span>
											<div class="width-120">
												<el-input v-model="ruleForm.goods_id" placeholder="商品ID"></el-input>
											</div>
										</div>
										<div class="search_content">
											<span>商品名称</span>
											<div class="width-120">
												<el-input v-model="ruleForm.goods_name" placeholder="商品名称"></el-input>
											</div>
										</div>
										<div class="search_content">
											<span>选择分类</span>
											<div class="width-120">
										      <el-select v-model="selectedOptions2" placeholder="请选择">
											    <el-option
											      v-for="item in options1"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
											</div>
										</div>
										<div class="search_content">
											<el-button type="primary" @click="searchListData2()">查询</el-button>
										</div>
									</div>
									<div class="table_record">
										  <el-table
										    :data="examineData"
										    border
										    style="width: 100%">
										    <el-table-column
										      prop="goods_id"
										      label="商品ID"
										      width="180">
										    </el-table-column>
										    <el-table-column
										      prop="goods_name"
										      label="商品名称"
										      width="180">
										    </el-table-column>
										    <el-table-column
										      prop="store_name"
										      label="商家名称">
										    </el-table-column>
										    <el-table-column
										      prop="cat_name"
										      label="所属分类">
										    </el-table-column>
										    <el-table-column
										      prop="store_count"
										      label="商品库存">
										    </el-table-column>
										    <el-table-column
										      prop="prom_price"
										      label="活动团购价(元)">
										    </el-table-column>
										    <el-table-column
										      prop="limit_stock"
										      label="活动库存">
										    </el-table-column>
										    <el-table-column
										      prop="limit_reach"
										      label="助力人数">
										    </el-table-column>
										    <el-table-column
										      label="操作"
										      width="100">
										      <template slot-scope="scope">
										      	<!--<router-link target="_blank" :to="{path:'/home/marketing/marketing_goods',query:{activity_id:activity_id,id:scope.row.id,goods_id:scope.row.goods_id,}}">审核</router-link>-->
										        <el-button @click="examineDetail(scope.row,'audit')" type="text" size="small">审核</el-button>
										      </template>
										    </el-table-column>
										  </el-table>
								        <div class="pagination">
								            <el-pagination
								                @current-change="handleCurrentChange2"
								                :current-page="currentPage"
								                :page-size=pageSize
								                layout="total, prev, pager, next, jumper"
								                :total=total>
								            </el-pagination>
									</div>
									</div>
							    </el-tab-pane>
						      </el-tabs>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane label="助力记录" name="3">
						<div class="search_btn">
							<div class="search_content">
								<span>商品ID</span>
								<div class="width-120">
									<el-input v-model="ruleForm.goods_id" placeholder="商品ID"></el-input>
								</div>
							</div>
							<div class="search_content">
								<span>商品名称</span>
								<div class="width-120">
									<el-input v-model="ruleForm.goods_name" placeholder="商品名称"></el-input>
								</div>
							</div>
							<div class="search_content">
								<span>订单号</span>
								<div class="width-120">
									<el-input v-model="ruleForm.order_sn" placeholder="商品名称"></el-input>
								</div>
							</div>
							<div class="search_content">
								<span>助力状态</span>
								<div class="width-120">
								      <el-select v-model="ruleForm.is_ok" placeholder="请选择">
									    <el-option
									      v-for="item in options3"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									  </el-select>
								</div>
							</div>
							<div class="search_content">
								<el-button type="primary" @click="searchListData3()">查询</el-button>
							</div>
						</div>
						<div class="table_record">
							  <el-table
							    :data="examineData3"
							    border
							    style="width: 100%">
							    <el-table-column
							      prop="id"
							      label="助力ID">
							    </el-table-column>
							    <el-table-column
							      prop="goods_id"
							      label="商品ID">
							    </el-table-column>
							    <el-table-column
							      prop="goods_name"
							      label="商品名称"
							      width="400">
							    </el-table-column>
							    <el-table-column
							      prop="user_id"
							      label="用户ID">
							    </el-table-column>
							    <el-table-column
							      prop="user_nickname"
							      label="用户昵称">
							    </el-table-column>
							    <el-table-column
							      prop="spec_num"
							      label="助力商品数量">
							    </el-table-column>
							    <el-table-column
							      prop="spec_key"
							      label="规格key">
							    </el-table-column>
							    <el-table-column
							      prop="limit_reach"
							      label="助力达成人数">
							    </el-table-column>
							    <el-table-column
							      prop="curent_reach"
							      label="当前助力人数">
							    </el-table-column>
							    <el-table-column
							      prop="limit_price"
							      label="助力价格">
							    </el-table-column>
							    <el-table-column
							      prop="add_time"
							      label="助力开始时间">
							    </el-table-column>
							    <el-table-column
							      prop="end_time"
							      label="助力截至时间">
							    </el-table-column>
							    <el-table-column
							      prop="left_time"
							      label="助力剩余时间">
							    </el-table-column>
							    <el-table-column
							      prop="prosess"
							      label="助力状态">
							    </el-table-column>
							    <el-table-column
							      label="操作"
							      width="100">
							      <template slot-scope="scope">
							        <el-button @click="examineDetailOrderDetail(scope.row.id)" type="text" size="small">订单详情</el-button>
							        <!--<a target = "_blank" :href="'/home/marketing/marketing_details_list?help_activity_id='+scope.row.id">订单详情</a>-->
							      </template>
							    </el-table-column>
							  </el-table>
					        <div class="pagination">
					            <el-pagination
					                @current-change="handleCurrentChange3"
					                :current-page="currentPage"
					                :page-size='pageSize'
					                layout="total, prev, pager, next, jumper"
					                :total='total3'>
					            </el-pagination>
						</div>
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
import Market from '../../js/marketing';
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';
import { quillEditor } from 'vue-quill-editor'
 export default {
   data () {
     return {
     	examineData3:[],
     	total3:0,
     	selectData:[],
     	data3:[],
     	defaultProps: {
          children: 'children',
          label: 'label',
       },
     	name_id:'0',
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
		var data = {
			activity_id:this.activity_id,
		}
		Market.activeInfo('Helpactivity/activeInfo',data,this);
		Market.Goodscategory('Goodscategory/tree',this);
   },
   components: {
		breadcrumb,quillEditor,picker
   },
   methods:{
   	examineDelete(params){
   		this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
   		var data = {
   			activity_id:this.activity_id,
   			goods_id:params.goods_id,
   			id:params.id,
   		}
   		Market.storeDelGoods('Helpactivity/delGoods',data,this,params);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
   	},
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
        Market.handleUpdateActive('Helpactivity/handleUpdateActive',data,this);
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
   			goods_id:params.goods_id,
   			id:params.id,
   		}
   		Market.activeGoodsSetTop('Helpactivity/activeGoodsSetTop',data,this,params);
   	},
   	examinUp(data){

   	},
   	examineDown(data){

   	},
   	examineBottom(params){
   		var data = {
   			activity_id:this.activity_id,
   			goods_id:params.goods_id,
   			id:params.id,
   		}
   		Market.activeGoodsSetBottom('Helpactivity/activeGoodsSetBottom',data,this,params);
   	},
   	examineDetail(params,btn){
   		this.$router.push({name:'marketing_goods',query:{btn:btn,activity_id:this.activity_id,id:params.id,goods_id:params.goods_id,title:"marketing_goods"}})
   	},
   	examineDetailOrderDetail(activity_goods_id){
   		this.$router.push({name:'marketing_details_list',query:{help_activity_id:activity_goods_id}})
   	},
   	searchListData1(){
   		this.ruleForm.cat_id = this.selectedOptions1;
        var data = {
        	activity_id:this.activity_id,
        	goods_id:this.ruleForm.goods_id,
        	goods_name:this.ruleForm.goods_name,
        	store_name:this.ruleForm.store_name,
        	cat_id:this.ruleForm.cat_id,
        	audit_status:this.name_id ,
        	page:this.currentPage,
        	rows:this.pageSize,
        }
        Market.activeGoodsList('Helpactivity/activeGoodsList',data,this);
   	},
   	searchListData2(){
   		this.ruleForm.cat_id = this.selectedOptions2
        var data = {
        	activity_id:this.activity_id,
        	goods_id:this.ruleForm.goods_id,
        	goods_name:this.ruleForm.goods_name,
        	store_name:this.ruleForm.store_name,
        	cat_id:this.ruleForm.cat_id,
        	audit_status:this.name_id ,
        	page:this.currentPage,
        	rows:this.pageSize,
        }
        Market.activeGoodsList('Helpactivity/activeGoodsList',data,this);
   	},
   	searchListData3(){
        var data = {
	        	goods_id:this.ruleForm.goods_id,
	        	goods_name:this.ruleForm.goods_name,
	        	user_nickname:this.ruleForm.user_nickname,
	        	order_sn:this.ruleForm.order_sn,
	        	is_ok:this.ruleForm.is_ok,
	        	page:this.currentPage,
	        	rows:this.pageSize,
        }
        Market.userHelpList('Helpactivity/userHelpList',data,this);
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
	        var data = {
	        	activity_id:this.activity_id,
	        	goods_id:this.ruleForm.goods_id,
	        	goods_name:this.ruleForm.goods_name,
	        	store_name:this.ruleForm.store_name,
	        	cat_id:this.ruleForm.cat_id,
	        	audit_status:this.name_id,
	        	page:this.currentPage,
	        	rows:this.pageSize,
	        }
	        Market.activeGoodsList('Helpactivity/activeGoodsList',data,this);
        }else if(tab.name==2){
			var data = {
				activity_id:this.activity_id,
			}
			Market.activeInfo('Helpactivity/activeInfo',data,this);
        }else if(tab.name==3){
	        var data = {
	        	goods_id:this.ruleForm.goods_id,
	        	goods_name:this.ruleForm.goods_name,
	        	user_nickname:this.ruleForm.user_nickname,
	        	order_sn:this.ruleForm.order_sn,
	        	is_ok:this.ruleForm.is_ok,
	        	page:this.currentPage,
	        	rows:this.pageSize,
	        }
	        Market.userHelpList('Helpactivity/userHelpList',data,this);
        }
      },
      handleClickSelect(tab, event) {
   		this.name_id = tab.name;
	        var data = {
	        	activity_id:this.activity_id,
	        	goods_id:this.ruleForm.goods_id,
	        	goods_name:this.ruleForm.goods_name,
	        	store_name:this.ruleForm.store_name,
	        	cat_id:this.ruleForm.cat_id,
	        	audit_status:this.name_id,
	        	page:this.currentPage,
	        	rows:this.pageSize,
	        }
	        Market.activeGoodsList('Helpactivity/activeGoodsList',data,this);
      },
		entryDetail(id){
			this.$router.push({name:'list_of_goods_detail',query:{id:id}})
		},
		handleCurrentChange1(val){
	        var data = {
	        	activity_id:this.activity_id,
	        	goods_id:this.ruleForm.goods_id,
	        	goods_name:this.ruleForm.goods_name,
	        	store_name:this.ruleForm.store_name,
	        	cat_id:this.ruleForm.cat_id,
	        	audit_status:this.name_id ,
	        	page:val,
	        	rows:this.pageSize,
	        }
	        Market.activeGoodsList('Helpactivity/activeGoodsList',data,this);
		},
		handleCurrentChange2(val){
	        var data = {
	        	activity_id:this.activity_id,
	        	goods_id:this.ruleForm.goods_id,
	        	goods_name:this.ruleForm.goods_name,
	        	store_name:this.ruleForm.store_name,
	        	cat_id:this.ruleForm.cat_id,
	        	audit_status:this.name_id,
	        	page:val,
	        	rows:this.pageSize,
	        }
	        Market.activeGoodsList('Helpactivity/activeGoodsList',data,this);
		},
      handleCurrentChange3(val) {
	        var data = {
	        	goods_id:this.ruleForm.goods_id,
	        	goods_name:this.ruleForm.goods_name,
	        	user_nickname:this.ruleForm.user_nickname,
	        	order_sn:this.ruleForm.order_sn,
	        	is_ok:this.ruleForm.is_ok,
	        	page:val,
	        	rows:this.pageSize,
	        }
	        Market.userHelpList('Helpactivity/userHelpList',data,this);
      }
   }
 }
</script>
