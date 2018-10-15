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
					增加分类
				</span>
			</div>
			<div class="table_list">
				<div class="current_system">
					<div class="warp">
						<table class="show_list_table_info" border="0" cellspacing="" cellpadding="">
							<tbody>
								<tr>
									<td>分类名称：</td>
									<td>
										<div class="width-120-warp">
											<div class="width-120">
												<el-input v-model="input" placeholder="请输入内容"></el-input>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>上级分类：</td>
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
										</div>
									</td>
								</tr>
								<tr>
									<td>导航显示：</td>
									<td>
										  <el-radio v-model="radio" label="1">是</el-radio>
  										  <el-radio v-model="radio" label="2">否</el-radio>
									</td>
								</tr>
								<!-- <tr>
									<td>分类展示图片：</td>
									<td>
										上传图片
									</td>
								</tr> -->
							</tbody>
						</table>

						<div class="height_32_table_bottom">
							<el-button type="danger">保存</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
 export default {
   data () {
     return {
     	radio:'1',
     	textarea:'',
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
			title1: "商品分类",
			title2: "",
			path1:'/home/commodityManagement/commodityClassification',
			path2:''
		}
     }
   },
   created(){

   },
   components: {
breadcrumb
   },
   methods:{

   }
 }
</script>
