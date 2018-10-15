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
					秒杀商品列表
				</span>
			</div>
			<div class="search_btn">
				<!--<div class="search_content">
					<div class="width-120">
					  <el-select v-model="value" placeholder="秒杀日期">
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
					<div class="width-120">
					  <el-select v-model="value" placeholder="秒杀时间">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>-->
				<div class="search_content">
					<span>商户名</span>
					<div class="width-120">
						<el-input v-model="store_name" placeholder="商户名"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary">查询</el-button>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="entryDetail('4556')">添加用户商品</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="id"
				      label="ID">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="商品名称">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="商户名称">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="分类">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="市场价">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="团购价">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="下单秒杀时间">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small">编辑</el-button>
				        <el-button type="text" size="small">删除</el-button>
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
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import seckill from '../../js/seckill';
 export default {
   data () {
     return {
		currentPage:1,
		totals:0,
		pageSize:10,
     	store_name:'',
     	 tableData: [],
     	options:[],
		content_title:{
			title1:"活动管理",
			title2:"秒杀商品列表"
		}
     }
   },
   created(){
		var data = {
			page:this.currentPage,
			rows:this.pageSize,
			store_name:this.store_name,
		}
		seckill.secondsKillGoodsList("Secondskill/secondsKillGoodsList",data,this);
   },
   components: {
		breadcrumb
   },
   methods:{
		entryDetail(id){
			this.$router.push({name:'stop_killing_goods_detail',query:{id:id}})
		},
      handleCurrentChange(val) {
		var data = {
			page:val,
			rows:this.pageSize,
			store_name:this.store_name,
		}
		seckill.secondsKillGoodsList("Secondskill/secondsKillGoodsList",data,this)
      }
   }
 }
</script>
