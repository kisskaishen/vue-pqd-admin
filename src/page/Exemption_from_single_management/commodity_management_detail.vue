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
					添加免单商品
				</span>
			</div>
			<div class="order_detail_list">
				<div class="item_detail">
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>选择商品</td>
											<td><el-button type="danger" @click="dialogVisible = true">添加商品</el-button></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>商品名称</td>
											<td>商户名称</td>
											<td>价格</td>
											<td>库存</td>
											<td>操作</td>
										</tr>
										<tr>
											<td>
												56456
											</td>
											<td>
												56456
											</td>
											<td>
												56456
											</td>
											<td>
												56456
											</td>
											<td>
												56456
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="height_32_table_bottom">
						    <el-button type="danger">保存</el-button>
						    <el-button type="danger">重置</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
<el-dialog
  title="选择商品"
  :visible.sync="dialogVisible"
  width="60%">
  <div class="add_product">		
  		<div class="search_admin_list_table">
			<div class="search_btn">
				<div class="search_content">
					<span>商户名</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="商户名"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>关键词</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="搜索词"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary">查询</el-button>
				</div>
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
			      label="商品名称">
			    </el-table-column>
			    <el-table-column
			      prop="id"
			      label="商户名称">
			    </el-table-column>
			    <el-table-column
			      prop="id"
			      label="价格">
			    </el-table-column>
			    <el-table-column
			      prop="id"
			      label="库存">
			    </el-table-column>
			    <el-table-column
			      label="操作">
			      <template slot-scope="scope">
			        <el-button type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			  </el-table>
		</div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
 export default {
   data () {
     return {
     	dialogVisible:false,
     	 tableData: [{
          id: '19724',
          name: '旺旺鞋铺',
        }, {
          id: '19724',
          name: '旺旺鞋铺',
        }, {
          id: '19724',
          name: '旺旺鞋铺',
        }, {
          id: '19724',
          name: '旺旺鞋铺',
        }],
     	input:'',
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
			title1:"订单管理",
			title2:"添加免单商品"
		}
     }
   },
   created(){

   },
   components: {
breadcrumb
   },
   methods:{
entryDetail(id){
	this.$router.push({name:'customer_complaint_management_detail',query:{id:id}})
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
      }
   }
 }
</script>
