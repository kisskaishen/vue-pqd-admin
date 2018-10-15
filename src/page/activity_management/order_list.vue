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
					订单列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>全部</span>
					<div class="width-120">
					  <el-select v-model="date" placeholder="秒杀日期">
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
					<span>订单编号</span>
					<div class="width-120">
						<el-input v-model="store_name" placeholder="商户名"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>下单日期</span>
					<div class="width-120">
						<el-input v-model="store_name" placeholder="商户名"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="search()">查询</el-button>
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
				      prop="goods_name"
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
				        <el-button type="text" size="small" @click="deleteGoods(scope.row.id,scope.$index)">删除</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
					<!--<div class="height_32_table_bottom">
					    <el-button type="danger" @click="toggleSelection([tableData[1], tableData[2]])">批量删除</el-button>
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
     	 tableData: [],
     	options:[
     		{
     			value: '0',
          		label: '状态'
     		},
     		{
     			value: '1',
          		label: '停业'
     		},
     		{
     			value: '-1',
          		label: '营业'
     		}
     	],
		content_title:{
			title1:"抽奖管理",
			title2:"订单列表"
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
   	deleteGoods(id,index){
   		/* 活动管理-0.1秒杀-删除商品  Secondbuy/del */
   		this.$confirm('此操作将永久删除么, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
	   		var data = {
	   			ids:id
	   		}
	   		seckill.SecondbuyDel("Secondbuy/del",data,this,index);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   	},
		entryDetail(id){
			this.$router.push({name:'seckill_detail',query:{id:id}})
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
      handleCurrentChange(val) {
		var data = {
			page:val,
			rows:this.pageSize,
				store_name:this.store_name,
				date:this.date,
				time:this.time,
		}
		seckill.Secondbuy("Secondbuy/list",this);
      }
   }
 }
</script>
