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
					商户列表
				</span>
				</div>
				<div class="search_btn">
					<div class="search_content">
						<span>是否千企</span>
						<div class="width-120">
							<el-select v-model="is_thousand_plan" placeholder="是否千企">
								<el-option v-for="item in thousandOption" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="search_content">
						<span>营业状态</span>
						<div class="width-120">
							<el-select v-model="state" placeholder="营业状态">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="search_content">
						<span>审核状态</span>
						<div class="width-120">
							<el-select v-model="is_check" placeholder="审核状态">
								<el-option v-for="item in optionsCheck" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="search_content">
						<span>是否开通</span>
						<div class="width-120">
							<el-select v-model="is_opened" placeholder="是否开通">
								<el-option v-for="item in optionsOpened" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="search_content">
						<span>黑白名单</span>
						<div class="width-120">
							<el-select v-model="is_blacklist" placeholder="黑名单">
								<el-option v-for="item in blacklistOption" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="search_content">
						<span>关键词</span>
						<div class="width-120">
							<el-input v-model="key_word" placeholder="商户关键词"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>手机号码</span>
						<div class="width-120">
							<el-input v-model="mobile" placeholder="请输入手机号码"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>门店ID</span>
						<div class="width-120">
							<el-input v-model="store_id" placeholder="门店ID"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>是否海淘商户</span>
						<div class="width-120">
							<el-select v-model="is_haitao" placeholder="请选择">
								<el-option v-for="item in optionsStore" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="search_content">
						<el-button type="primary" @click="searchList()">查询</el-button>
					</div>
				</div>
				<div class="table_list">
					<el-table :data="tableData" border style="width: 100%">
						<el-table-column prop="id" label="ID" width="60px">
						</el-table-column>
						<el-table-column prop="store_name" label="商户名称">
						</el-table-column>
						<el-table-column prop="blacklist_name" label="黑白名单">
						</el-table-column>
				    <el-table-column
				      label="是否千企">
					      <template slot-scope="scope">
					      	  <el-switch
					          v-model="scope.row.is_thousand_plan"
					          active-color="#00A854"
					          active-value="1"
					          inactive-color="#F04134"
					          inactive-value="0"
					          @change="changeShow(scope.row)">
        					</el-switch>
					      </template>
				    </el-table-column>
						<el-table-column label="商户二维码" width="100px">
							<template slot-scope="scope">
								<img :src="scope.row.store_qrcode" alt="" style="width:80px;height:80px;"/>
							</template>
						</el-table-column>
						<el-table-column label="商户LOGO" width="100px">
							<template slot-scope="scope">
								<img :src="scope.row.store_logo" alt="" style="width:80px;height:80px;"/>
							</template>
						</el-table-column>
						<el-table-column prop="email" label="商户邮箱">
						</el-table-column>
						<el-table-column prop="mobile" label="门店电话">
						</el-table-column>
						<el-table-column label="是否海淘" width="80px">
							<template slot-scope="scope">
								<span>{{scope.row.is_haitao==0?'非海淘':'海淘'}}</span>
							</template>
						</el-table-column>
						<el-table-column  label="商户类型" width="80px">
							<template slot-scope="scope">
								<span>{{scope.row.store_from==0?'个人':'企业'}}</span>
							</template>
						</el-table-column>
						<el-table-column  label="门店类型" width="80px">
							<template slot-scope="scope">
								<span v-if="scope.row.store_type==='0'">个人</span>
								<span v-else-if="scope.row.store_type==='1'">旗舰店</span>
								<span v-else-if="scope.row.store_type==='2'">专卖店</span>
								<span v-else-if="scope.row.store_type==='3'">专营店</span>
								<span v-else="scope.row.store_type==='4'">普通店</span>
							</template>
						</el-table-column>
						<el-table-column prop="margin" label="保证金(RMB)" width="110px">
						</el-table-column>
						<el-table-column prop="state" label="营业状态" width="80px">
							<template slot-scope="scope">
								<span>{{scope.row.state==0?'停业':'营业'}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="is_check_name" label="审核状态">
						</el-table-column>
						<el-table-column prop="name" label="订单列表" width="120px">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="editdetailSingle(scope.row.id)">单买订单列表</el-button>
								<el-button type="text" size="small" @click="editdetailGroup(scope.row.id)">团购订单列表</el-button>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="100px">
							<template slot-scope="scope">
									<el-button type="text" v-show="scope.row.btn.edit" size="small" @click="editdetail(scope.row.id)">编辑</el-button>
									<el-button type="text" v-show="scope.row.btn.opened" size="small" @click="opendetail(scope.row.id)">开通</el-button>
				        			<!--<a v-show="scope.row.btn.opened==true" :href="'/home/businessManagement/toOpenListDetail?store_id='+scope.row.id"  target="_blank">开通</a>-->
									<el-button type="text" v-show="scope.row.btn.hx" size="small" @click="register(scope.row.id)">注册环信</el-button>
									<el-button type="text" v-show="scope.row.btn.check" size="check" @click="setVal(scope.row.id)">审核</el-button>
									<el-button type="text" v-show="scope.row.btn.del" size="del" @click="deleteStore(scope.row.id,scope.$index)">删除</el-button>
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
  title="审核"
  :visible.sync="dialogVisible"
  width="30%">
  <div class="check_warp" style="text-align: center;">
  	 <el-radio v-model="radio" label="1">审核通过</el-radio>
  	<el-radio v-model="radio" label="2">审核拒绝</el-radio>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="checkFun()">确 定</el-button>
  </span>
</el-dialog>
	</div>
</template>
<!--1  白名单  2  黑名单-->
<script>
	import Store from '../../js/business_listings';
	
	import breadcrumb from '../../components/breadcrumb';
	export default {
		data() {
			return {
				btnForm:{
					store_id:''
				},
				currentPages:0,
				is_thousand_plan:'',
				store_id:'',
				radio:'1',
				dialogVisible:false,
				is_blacklist:'',
				is_opened:'',//是否开通
				is_haitao:'',//是否海淘
				is_check:'',//审核状态
				state:'',//状态
				key_word:'',//关键词
				mobile:'',//手机号码
				currentPage:1,
				totals:0,
				pageSize:10,
				tableData: [],
				input: '',
				value: '',
				blacklistOption:[],
				thousandOption:[],
				optionsOpened:[],
				optionsCheck: [],
				options: [],
				optionsStore: [],
				content_title: {
					title1: "商户列表",
					title2: "",
					path1:'/home/businessManagement/businessListings',
					path2:''
				}
			}
		},
		created() {
			this.fetch();
			Store.searchConf('Store/searchConf',this);
		},
		components: {
			breadcrumb
		},
		methods: {
			fetch(val){
				var data = {
					page:val?val:this.currentPage,
					rows:this.pageSize,
					state:this.state,
					key_word:this.key_word,
					mobile:this.mobile,
					is_haitao:this.is_haitao,
					store_id:this.store_id,
					is_check:this.is_check,
					is_opened:this.is_opened,
					is_blacklist:this.is_blacklist,
					is_thousand_plan:this.is_thousand_plan
				}
				Store.getStoreList('Store/getStoreList',data,this);
			},
			changeShow(params){
		   		/* 是否千企 */
				var data = {
					store_id:params.id,
					action:'edit_thousand_plan',
					status:params.is_thousand_plan
				}
				Store.editField("store/editMerchantStatus",data,this,'store');
		   	},
			editdetailSingle(id){
				this.$router.push("/home/orderManagement/orderList?store_id="+id+'&order_class=1')
			},
			editdetailGroup(id){
				this.$router.push("/home/orderManagement/orderList?store_id="+id+'&order_class=2')
			},
			openUp(id){
				/* 开通  */
				this.$router.push({name:'to_open_list_detail',query:{store_id:id}})
			},
			setVal(id){
				this.btnForm.store_id = id;
				this.dialogVisible = true;
			},
			checkFun(){
				/* 审核   Store/setCheckState */
				var data = {
					store_id:this.btnForm.store_id,
					is_check:this.radio
				}
				Store.setCheckState('Store/setCheckState',data,this);
			},
			searchList(){
				this.fetch();
			},
			opendetail(id){
				this.$router.push({ path: '/home/businessManagement/toOpenListDetail',query:{store_id:id}})
			},
			editdetail(id) {
				this.$router.push({ name: 'business_listings_detail',query:{store_id:id}})
			},
			deleteStore(id,index){
				/* 删除商户  */
				var that = this;
				        this.$confirm('您确定要删除么, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							var data = {
								id:id
							}
							Store.deleteStoreByid('Store/delStore',data,that,index);
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消删除'
				          });          
				        });
			},
			register(id,index){
				/* 删除商户  */
				var that = this;
				        this.$confirm('您确定注册环信账户么, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							var data = {
								store_id:id
							}
							Store.handleHxRegister('store/handleHxRegister',data,that);
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消删除'
				          });          
				        });
			},
		      handleCurrentChange(val) {
					this.fetch(val)
		      }
		}
	}
</script>