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
				<div class="search_content">
					<span>秒杀日期</span>
					<div class="width-120">
					  <el-select @focus="selectTimes()" v-model="date" placeholder="秒杀日期">
					    <el-option
					      v-for="item in optionsDate"
					      :key="item.key"
					      :label="item.value"
					      :value="item.key">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>秒杀时间</span>
					<div class="width-120">
					  <el-select v-model="time" placeholder="秒杀时间">
					    <el-option
					      v-for="item in optionsTime"
					      :key="item.key"
					      :label="item.value"
					      :value="item.key">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>商户名</span>
					<div class="width-120">
						<el-input v-model="store_name" placeholder="商户名"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="search()">查询</el-button>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="entryDetail()">添加用户商品</el-button>
				</div>
			</div>
			<div class="table_list">
				  <el-table
    				ref="multipleTable"
    				tooltip-effect="dark"
				    :data="tableData"
				    border
				    style="width: 100%"
    				@selection-change="handleSelectionChange">
				    <el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>
				    <el-table-column
				      prop="id"
				      label="商品id">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称">
				    </el-table-column>
				    <el-table-column
				      prop="cat_name"
				      label="分类">
				    </el-table-column>
				    <el-table-column
				      prop="shop_price"
				      label="市场价">
				    </el-table-column>
				    <el-table-column
				      prop="prom_price"
				      label="团购价">
				    </el-table-column>
				    <el-table-column
				      prop="start_time"
				      label="开始时间">
				    </el-table-column>
				    <el-table-column
				      prop="end_time"
				      label="结束时间">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="deleteGoods(scope.row.id,scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
					<!--<div class="height_32_table_bottom">
					    <el-button type="danger" @click="toggleSelection()">批量删除</el-button>
					    <el-button type="danger">重置</el-button>
					</div>-->
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
     	store_name:'',
     	date:'',
     	time:'',
		currentPage:1,
		totals:0,
		pageSize:10,
		multipleSelection:[],
     	 tableData: [],
     	optionsDate:[],
     	optionsTime:[],
		content_title:{
			title1:"活动管理",
			title2:"秒杀商品列表"
		}
     }
   },
   created(){
		/* 活动管理-0.1秒杀-商品列表  Secondbuy/list */
			var data = {
				page:1,
				rows:this.pageSize
			}
		seckill.Secondbuy("Secondbuy/list",data,this);
   },
   components: {
		breadcrumb
   },
   methods:{
   	selectTimes(){
		seckill.timeConf("Secondbuy/timeConf",this);
   	},
   	search(){
   		/* 活动管理-0.1秒杀-商品列表  Secondbuy/list */
			var data = {
				page:1,
				rows:this.pageSize,
				store_name:this.store_name,
				date:this.date,
				time:this.time,
				
			}
		seckill.Secondbuy("Secondbuy/list",data,this);
   	},
   	deleteGoods(id,params){
   		/* 活动管理-0.1秒杀-删除商品  Secondbuy/del */
   		this.$confirm('此操作将永久删除么, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
	   		var data = {
	   			ids:id
	   		}
	   		seckill.SecondbuyDel("Secondbuy/del",data,this,params,'del');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   	},
		entryDetail(id){
			this.$router.push({name:'seckill_detail'})
		},
      toggleSelection(rows) {
      	var str = [];
      	var Things = this.multipleSelection;
      	for (var i = 0; i < Things.length; i++) {
      		str.push(Things[i].goods_id)
      	}
      	var params = str.join(',')
		var data = {
			ids:params
		}
		seckill.SecondbuyDel("Secondbuy/del",data,this);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange(val) {
		var data = {
			page:val,
			rows:this.pageSize,
				store_name:this.store_name,
				date:this.date,
				time:this.time,
		}
		seckill.Secondbuy("Secondbuy/list",data,this);
      }
   }
 }
</script>
