<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
@import "../../less/marketing";
</style>
<template>
	<div>
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
					<el-input v-model="ruleForm.store_name" placeholder="商品名称"></el-input>
				</div>
			</div>
			<div class="search_content">
				<span>选择分类</span>
				<div class="width-120">
			      <el-select v-model="ruleForm.cat_id" placeholder="请选择">
				    <el-option
				      v-for="item in options"
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
			      prop="store_count"
			      label="活动团购价(元)">
			    </el-table-column>
			    <el-table-column
			      prop="store_count"
			      label="活动库存">
			    </el-table-column>
			    <el-table-column
			      prop="store_count"
			      label="参与人数">
			    </el-table-column>
			    <el-table-column
			      prop="store_count"
			      label="所属专区">
			    </el-table-column>
			    <el-table-column
			      label="位置">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="100">
			      <template slot-scope="scope">
			        <el-button>详情</el-button>
  			        <el-button>删除</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
	        <div class="pagination" v-show="examineData3.length!=0">
	            <el-pagination
	                @current-change="handleCurrentChange3"
	                :current-page="currentPage"
	                :page-size='pageSize'
	                layout="total, prev, pager, next, jumper"
	                :total='total3'>
	            </el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import Market from '../../js/resource_activity';
export default{
	data(){
		return{
			examineData3:[],
			total3:0,
	     	pageSize:10,
	     	currentPage:1,
			ruleForm:{
				goods_id:'',
				goods_name:'',
				order_sn:'',
        store_name:''
			},
			selectedOptions1:'',
			options1:'',
			activity_id:'',
			action:'',
		}
	},
	created(){
		this.activity_id = this.$route.query.activity_id;
		this.action = this.$route.query.action;
		this.fetch();
	},
	methods:{
      fetch(val){
        var data = {
        	activity_id:this.activity_id,
			    action:this.action,
        	goods_id:this.ruleForm.goods_id,
        	goods_name:this.ruleForm.goods_name,
        	user_nickname:this.ruleForm.user_nickname,
        	order_sn:this.ruleForm.order_sn,
        	page:val?val:this.currentPage,
        	rows:this.pageSize,
        }
        Market.userHelpList('Activities/userRecords',data,this);
      },
		searchListData3(){
			this.fetch()
		},
		handleCurrentChange3(val){
			this.fetch(val)
		}
	},
	props:[

	]
}
</script>
