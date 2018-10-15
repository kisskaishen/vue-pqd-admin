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
					补差价申请列表列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>订单号</span>
					<div class="width-120">
						<el-input v-model="input" placeholder="订单号"></el-input>
					</div>
				</div>
				<div class="search_content">
					<el-button type="primary">查询</el-button>
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
				      label="订单号">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="商品价格">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="购买日期">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="申请日期">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="对比平台">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="状态">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="entryDetail('4556')">编辑</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
					<div class="height_32_table_bottom">
					    <el-button type="danger" @click="toggleSelection([tableData[1], tableData[2]])">批量删除</el-button>
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
			title1:"活动管理",
			title2:"补差价申请列表列表"
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
	this.$router.push({name:'application_list_detail',query:{id:id}})
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
