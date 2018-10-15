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
					模块管理 
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<el-button type="primary" @click="addCtrlMoudel()">添加控制模块</el-button>
				</div>
			</div>
			<div class="system_module_warp">
				<div v-for='(item,index) in tableData'>
					<div class="system_module" v-for='(itemChild,index) in item.children'>
						<div class="system_module_title">
							<div class="system_module_title_left">
								{{item.label}}>{{itemChild.label}}
							</div>
							<div class="system_module_title_right">
								<el-button type="primary" @click="modelManagementFun(itemChild.id)">管理模型</el-button>
								<el-button type="primary" @click="editingNavigationFun(itemChild.id)">编辑导航</el-button>
							</div>
						</div>
						<div class="system_module_content">
							<ul>
								<li class="show_li" v-for='itemChildss in itemChild.children'>{{itemChildss.label}}[ <span>{{itemChildss.visible=='1'?'显示':'隐藏'}}</span> ]</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!--管理模型-->
<el-dialog
  title="提示"
  :visible.sync="modelManagement"
  width="90%">
<div class="current_system">
	<div class="warp">
		<table class="show_list_table" border="0" cellspacing="" cellpadding="">
			<tbody>
				<tr>
					<td>模型标题</td>
					<td>控制器</td>
					<td>Action</td>
					<td>父级菜单</td>
					<td>显示</td>
					<td>排序</td>
					<td @click="addRow()">新增一行</td>
				</tr>
				<tr v-for="(item,index) in typesDate">
					<td>
						<div class="width_120_warp">
							<el-input v-model="item.label" placeholder=""></el-input>
						</div>
					</td>
					<td>
						<div class="width_120_warp">
							<el-input v-model="item.ctl" placeholder=""></el-input>
						</div>
					</td>
					<td>
						<div class="width_120_warp">
							<el-input v-model="item.act" placeholder=""></el-input>
						</div>
					</td>
					<td>
						<div class="width_120_warp">
				        <el-select v-model="item.pid" placeholder="请选择">
						    <el-option-group
						      v-for="group in tableData"
						      :key="group.id"
						      :label="group.label">
						      <el-option
						        v-for="item in group.children"
						        :key="item.id"
						        :label="item.label"
						        :value="item.id">
						      </el-option>
						    </el-option-group>
						  </el-select>
						</div>
					</td>
					<td>
						<div class="width_120_warp">
					  <el-radio v-model="item.disabled" label="1">是</el-radio>
					  <el-radio v-model="item.disabled" label="0">否</el-radio>
						</div>
					</td>
					<td>
						<div class="width_120_warp">
						<el-input v-model="item.orderby" placeholder=""></el-input>
						</div>
					</td>
					<td>
						<div class="width_120_warp" @click="deleteTypes(item.id,index)">
						删除
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="modelManagement = false">取 消</el-button>
    <el-button type="primary" @click="batchModifyModule()">确 定</el-button>
  </span>
</el-dialog>
<!--编辑导航-->
<el-dialog
  title="提示"
  :visible.sync="editingNavigation"
  width="60%">
<div class="current_system">
<div class="warp">
	<table class="show_list_table" border="0" cellspacing="" cellpadding="">
		<tbody>
			<tr>
				<td>菜单名称：</td>
				<td><el-input v-model="editData.title" placeholder=""></el-input></td>
			</tr>
			<tr>
				<td>上级菜单：</td>
				<td>
			      <el-select v-model="editData.pid" placeholder="请选择">
			        <el-option
			          v-for="item in optionsSubModule"
			          :key="item.id"
			          :label="item.label"
			          :value="item.id">
			        </el-option>
			      </el-select>
				</td>
			</tr>
			<!--<tr>
				<td>图标：</td>
				<td>
				  <el-radio v-model="editData.parent_id" label="1">备选项</el-radio>
				  <el-radio v-model="editData.parent_id" label="2">备选项</el-radio>
				</td>
			</tr>-->
			<tr>
				<td>排序：</td>
				<td><el-input v-model="editData.orderby" placeholder=""></el-input></td>
			</tr>
		</tbody>
	</table>
</div>
</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editingNavigation = false">取 消</el-button>
    <el-button type="primary" @click="editDialog(editData.mod_id)">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import Menu from '../../js/menu_management.js';
 export default {
   data () {
     return {
     	type:'',
     	typesDate:[],
     	editData:{},
     	radio:'1',
     	modelManagement:false,
     	editingNavigation:false,
     	 tableData: [],
     	input:'',
     	value:'',
     	optionsSubModule:[],
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
			title1:"模块管理",
			title2:"模块管理"
		}
     }
   },
   created(){
		/* 模块（菜单）tree System/moduleTree */
		Menu.moduleTree("System/moduleTree",this);
   },
   components: {
breadcrumb
   },
   methods:{
   	addRow(){
   		if(this.type=='1'){
   			this.typesDate = [{label:'',ctl:'',act:'',pid:'',disabled:'',orderby:''}]
   		}else{
   			this.typesDate.push({label:'',ctl:'',act:'',pid:'',disabled:'',orderby:''})
   		}
   		
   	},
   	addCtrlMoudel(){
   		this.type='1';
   		this.typesDate = [];
   		this.modelManagement = true;
   	},
   	batchModifyModule(){
   		var datas = this.typesDate[0];
   		console.log(JSON.stringify(this.mod_id))
   		return 
   		var data = {
   			id:this.mod_id,
   			label:datas.label,
   			pid:datas.pid,
   			orderby:datas.orderby,
   			disabled:datas.disabled,
   			ctl:datas.ctl,
   			act:datas.act,
   		}
   		Menu.batchModifyModule("system/editModule",data,this);
   	},
   	deleteTypes(id,index){
   		this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
			var data = {
				mod_id:id
			}
			Menu.delModule("system/delModule",data,this,index);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   	},
		modelManagementFun(id){
			this.mod_id = id;
			var data = {
				mod_id:id
			}
			Menu.subModule("system/subModule",data,this,'1');
		},
		editingNavigationFun(id){
			/* 模型详情 system/moduleDetail */
			var data = {
				id:id
			}
			Menu.moduleDetail("system/moduleDetail",data,this,'2');
		},
		editDialog(id){
			/* 编辑模型  system/editModule */
			var data = {
				mod_id:id,
				title:this.editData.title,
				parent_id:this.editData.parent_id,
				orderby:this.editData.orderby,
			}
			Menu.editModule("system/editModule",data,this);
		},
//		changeSelect(){
//			/* 获取一级模型列表 System/subModule */
//			var data = {
//				mod_id:0
//			}
//			Menu.subModule("system/subModule",data,this);
//		}
   }
 }
</script>
