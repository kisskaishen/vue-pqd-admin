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
					添加红包
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
											<td>优惠券名称：</td>
											<td><el-input v-model="input" placeholder="商户名"></el-input></td>
											<td>请填写优惠券名称</td>
										</tr>
										<tr>
											<td>优惠券面额：</td>
											<td><el-input v-model="input" placeholder="商户名"></el-input></td>
											<td>优惠券可抵扣金额</td>
										</tr>
										<tr>
											<td>消费金额：</td>
											<td><el-input v-model="input" placeholder="商户名"></el-input></td>
											<td>订单需满足的最低消费金额(必需为整数)才能使用</td>
										</tr>
										<tr>
											<td>发放商户:</td>
											<td>  
												<el-select v-model="value" placeholder="请选择">
											    <el-option
											      v-for="item in options"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
											</td>
											<td></td>
										</tr>
										<tr>
											<td>展现位置：</td>
											<td>  
												<el-select v-model="value" placeholder="请选择">
											    <el-option
											      v-for="item in options"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
											</td>
											<td>优惠券展现位置</td>
										</tr>
										<tr>
											<td>优惠券类型：</td>
											<td>  
												<el-select v-model="value" placeholder="请选择">
											    <el-option
											      v-for="item in options"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
											</td>
											<td></td>
										</tr>
										<tr>
											<td>发放数量：</td>
											<td><el-input v-model="input" placeholder="商户名"></el-input></td>
											<td></td>
										</tr>
										<tr>
											<td>有效期(天)：</td>
											<td><el-input v-model="input" placeholder="商户名"></el-input></td>
											<td>有效期天数，最小是1，最大是30</td>
										</tr>
										<tr>
											<td>发放起始日期：</td>
											<td><el-input v-model="input" placeholder="商户名"></el-input></td>
											<td></td>
										</tr>
										<tr>
											<td>发放结束日期：</td>
											<td><el-input v-model="input" placeholder="商户名"></el-input></td>
											<td></td>
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
			title2:"添加红包"
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
