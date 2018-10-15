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
					订单基本信息
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
											<td>用户名：</td>
											<td>
												<div class="select_thirty">
												    <div class="width_120_warp">
												      <el-input v-model="input" placeholder="请输入内容"></el-input>
												    </div>
												    <div class="width_120_warp">
												      <el-select v-model="value" placeholder="请选择">
												        <el-option
												          v-for="item in options"
												          :key="item.value"
												          :label="item.label"
												          :value="item.value">
												        </el-option>
												      </el-select>
												    </div>
												    <div class="width_120_warp">
												      <el-button type="primary">搜索</el-button>
												    </div>
												</div> 
											</td>
										</tr>
										<tr>
											<td>收货人：</td>
											<td>
												<div class="select_thirty">
												    <div class="width_120_warp">
												      <el-input v-model="input" placeholder="请输入内容"></el-input>
												    </div>
												</div> 
											</td>
										</tr>
										<tr>
											<td>地址：</td>
											<td>
												<div class="select_thirty">
												    <div class="width_120_warp">
												      <el-select v-model="value" placeholder="请选择">
												        <el-option
												          v-for="item in options"
												          :key="item.value"
												          :label="item.label"
												          :value="item.value">
												        </el-option>
												      </el-select>
												    </div>
												    <div class="width_120_warp">
												      <el-select v-model="value" placeholder="请选择">
												        <el-option
												          v-for="item in options"
												          :key="item.value"
												          :label="item.label"
												          :value="item.value">
												        </el-option>
												      </el-select>
												    </div>
												    <div class="width_120_warp">
												      <el-select v-model="value" placeholder="请选择">
												        <el-option
												          v-for="item in options"
												          :key="item.value"
												          :label="item.label"
												          :value="item.value">
												        </el-option>
												      </el-select>
												    </div>
												    <div class="width_120_warp">
												      <el-input v-model="input" placeholder="详细地址"></el-input>
												    </div>
												</div> 
											</td>
										</tr>
										<tr>
											<td>手机：</td>
											<td>
												<div class="select_thirty">
												    <div class="width_120_warp">
												      <el-input v-model="input" placeholder="请输入内容"></el-input>
												    </div>
												</div> 
											</td>
										</tr>
										<tr>
											<td>配送物流：</td>
											<td>
												<div class="select_thirty">
												    <div class="width_120_warp">
												      <el-select v-model="value" placeholder="请选择">
												        <el-option
												          v-for="item in options"
												          :key="item.value"
												          :label="item.label"
												          :value="item.value">
												        </el-option>
												      </el-select>
												    </div>
												</div> 
											</td>
										</tr>
										<tr>
											<td>支付方式：</td>
											<td>
												<div class="select_thirty">
												    <div class="width_120_warp">
												      <el-select v-model="value" placeholder="请选择">
												        <el-option
												          v-for="item in options"
												          :key="item.value"
												          :label="item.label"
												          :value="item.value">
												        </el-option>
												      </el-select>
												    </div>
												</div> 
											</td>
										</tr>
										<tr>
											<td>发票抬头：</td>
											<td>
												<div class="select_thirty">
												    <div class="width_120_warp">
												      <el-input v-model="input" placeholder="请输入内容"></el-input>
												    </div>
												</div> 
											</td>
										</tr>
										<tr>
											<td>添加商品：</td>
												<td><el-button type="danger" @click="dialogVisible = true">添加商品</el-button></td>
										</tr>
										<tr>
											<td>商品：</td>
											<td>
												<div class="select_thirty">
												    <div class="width_120_warp">
												      <el-input v-model="input" placeholder="请输入内容"></el-input>
												    </div>
												</div> 
											</td>
										</tr>
										<tr>
											<td>管理员备注：</td>
											<td>
												<el-input
												  type="textarea"
												  :autosize="{ minRows: 2, maxRows: 4}"
												  placeholder="请输入内容"
												  v-model="textarea3">
												</el-input>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="height_32_table_bottom">
						    <el-button type="danger">保存</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
<el-dialog
  title="选择商品"
  :visible.sync="dialogVisible"
  width="80%">
  <div class="add_product">		
  		<div class="search_admin_list_table">
			<div class="search_btn">
				<div class="select_thirty">
				    <div class="width_120_warp">
				      <el-select v-model="value" placeholder="所有分类">
				        <el-option
				          v-for="item in options"
				          :key="item.value"
				          :label="item.label"
				          :value="item.value">
				        </el-option>
				      </el-select>
				    </div>
				    <div class="width_120_warp">
				      <el-select v-model="value" placeholder="所有品牌">
				        <el-option
				          v-for="item in options"
				          :key="item.value"
				          :label="item.label"
				          :value="item.value">
				        </el-option>
				      </el-select>
				    </div>
				    <div class="width_120_warp">
				      <el-select v-model="value" placeholder="全部">
				        <el-option
				          v-for="item in options"
				          :key="item.value"
				          :label="item.label"
				          :value="item.value">
				        </el-option>
				      </el-select>
				    </div>
				    <div class="width_120_warp"> 
						<div class="search_content">
							<div class="width-120">
								<el-input v-model="input" placeholder="搜索词"></el-input>
							</div>
						</div>
				    </div>
				    <div class="width_120_warp">
						<div class="search_content">
							<el-button type="primary">查询</el-button>
						</div>
				    </div>
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
     	textarea3:'',
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
			title2:"订单基本信息"
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
