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
					增加版本信息
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
											<td>版本号：</td>
											<td><el-input v-model="form.code" placeholder="版本号"></el-input></td>
										</tr>
										<tr>
											<td>版本名称：</td>
											<td><el-input v-model="form.name" placeholder="版本号"></el-input></td>
										</tr>
										<tr>
											<td>版本信息：</td>
											<td>
												<el-input
												  type="textarea"
												  :rows="5"
												  placeholder="版本信息"
												  v-model="form.desc">
												</el-input>
											</td>
										</tr>
										<tr>
											<td>终端：</td>
											<td>  
												<el-select v-model="form.terminal" placeholder="终端">
											    <el-option
											      v-for="item in optionsTerminal"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
											</td>
										</tr>
										<tr>
											<td>强制更新：</td>
											<td>  
												<el-select v-model="form.force" placeholder="强制更新">
											    <el-option
											      v-for="item in options"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
											</td>
										</tr>
										<tr>
											<td>版本类型：</td>
											<td>  
												<el-select v-model="form.type" placeholder="版本类型">
											    <el-option
											      v-for="item in optionsType"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
											</td>
										</tr>
										<tr>
											<td>链接地址:</td>
											<td>
												<el-input v-model="form.file" placeholder="链接地址"></el-input>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="height_32_table_bottom">
						    <el-button type="danger" @click="save()">保存</el-button>
						    <!--<el-button type="danger">重置</el-button>-->
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
			    style="width: 100%">
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
import Version from '../../js/version_update.js';
 export default {
   data () {
     return {
     	optionsType:[
     	{
     		value:0,
     		label:'APP'
     	},
     	{
     		value:1,
     		label:'商家APP'
     	}],
     	form:{
     		code:'',
     		name:'',
     		desc:'',
     		file:'',
     		force:'',
     		terminal:'',
     		type:''
     	},
     	radio:'1',
     	color1: '#000',
     	dialogVisible:false,
     	 tableData: [],
     	input:'',
     	value:'',
     	optionsTerminal:[
     		{
     			value: '0',
          		label: '安卓'
     		},
     		{
     			value: '1',
          		label: 'IOS'
     		}
     	],
     	options:[
     		{
     			value: '0',
          		label: '否'
     		},
     		{
     			value: '1',
          		label: '是'
     		}
     	],
		content_title:{
			title1:"订单管理",
			title2:"增加版本信息"
		}
     }
   },
   created(){

   },
   components: {
breadcrumb
   },
   methods:{
   	save(){
   		var data = {
   			code:this.form.code,
     		name:this.form.name,
     		desc:this.form.desc,
     		file:this.form.file,
     		force:this.form.force,
     		terminal:this.form.terminal,
     		type:this.form.type
   		}
   		Version.addVersion("Version/addVersion",data,this);
   	}
   }
 }
</script>
