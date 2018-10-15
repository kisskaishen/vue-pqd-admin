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
					五折专享
				</span>
			</div>
			<div class="search_btn">
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
					<el-button type="primary" @click="entryDetail('4556')">添加商户商品</el-button>
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
				      prop="goods_name"
				      label="商品名称"
				      width="400">
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
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="deleteHalfGoods(scope.row.id,scope.$index)">删除</el-button>
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
import Half from '../../js/half_off_exclusive.js';
 export default {
   data () {
     return {
     	currentPage:1,
		totals:0,
		pageSize:10,
     	 tableData: [],
     	store_name:'',
     	value:'',
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
			title1: "五折专享商品列表",
			title2: "",
			path1:'/home/activityManagement/halfOffExclusive',
			path2:''
		}
     }
   },
   created(){
		/* 活动管理-五折专享-商品列表  Discountgoods/list */
			var data = {
				page:1,
				rows:this.pageSize
			}
		Half.Discountgoods("Discountgoods/list",data,this);
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
				
			}
		Half.Discountgoods("Discountgoods/list",data,this);
   		
   	},
	   	deleteHalfGoods(id,index){
	   		  /* 活动管理-五折商品-删除商品  Discountgoods/del */
	   		this.$confirm('此操作将永久删除么, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
		   		var data = {
		   			ids:id
		   		}
		   		Half.DiscountgoodsDel("Discountgoods/del",data,this,index);
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	   	},
		entryDetail(id){
			this.$router.push({name:'half_off_exclusive_detail',query:{id:id}})
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
		}
		Half.Discountgoods("Discountgoods/list",data,this);
      }
   }
 }
</script>
