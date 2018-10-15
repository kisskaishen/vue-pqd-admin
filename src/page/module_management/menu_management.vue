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
					菜单管理
				</span>
			</div>
			<div class="search_btn">
				<div style="margin-left:10px;">
					<el-button type="primary" @click="addMenuTree()">添加导航菜单</el-button>
					<el-button type="primary" @click="deleteMenuTree()">删除导航菜单</el-button>
					<el-button type="primary" @click="editMenuTree()">编辑导航菜单</el-button>
				</div>
			</div>
			<div class="table_list">
				<el-tree
					ref = "tree"
					node-key="id"
					:highlight-current = 'true'
				  	default-expand-all
					:data="tableData"
					:props="defaultProps"
					:default-expanded-keys="defaultArr"
					@node-click="nodeClick">
				</el-tree>
				<!--<el-tree
				  :data="tableData"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree"
				  highlight-current
				  @node-click="nodeClick"
				  :props="defaultProps">
				</el-tree>-->
				<!--<table class="show_list_table_info" border="0" cellspacing="" cellpadding="">
					<thead>
						<tr>
							<td>ID</td>
							<td>标题</td>
							<td>排序</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody v-for="item in tableData">
							<tr>
								<td>{{item.id}}</td>
								<td>{{item.label}}</td>
								<td >
									<div class="width-120-warp">
										<div class="width-120">
											<el-input v-model="item.orderby" placeholder="请输入内容"></el-input>
										</div>
									</div>
								</td>
								<td>
									<el-row>
									  <el-button type="primary" @click="addMenu(item)">添加菜单</el-button>
									  <el-button type="primary" @click="editMenu(item.id,item.pid)">编辑</el-button>
									  <el-button type="danger" @click="deleteMenu(item.id,5)">删除</el-button>
									</el-row>
								</td>
							</tr>
							<tr v-show="item.children.length" v-for="itemChild in item.children">
								<td>{{itemChild.id}}</td>
								<td>{{itemChild.label}}</td>
								<td>
									<div class="width-120-warp">
										<div class="width-120">
											<el-input v-model="itemChild.orderby" placeholder="请输入内容"></el-input>
										</div>
									</div>
								</td>
								<td>
									<el-row>
									  <el-button  @click="controllManager(itemChild.id)">控制模块</el-button>
									  <el-button type="primary" @click="editMenu(item.id,itemChild.pid)">编辑</el-button>
									  <el-button type="danger" @click="deleteMenu(itemChild.id,5)">删除</el-button>
									</el-row>
								</td>
							</tr>
					</tbody>
				</table>-->
			</div>
		</div>
	</div>
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
			      <el-select v-show="optionsSubModule.length!=0" v-model="editData.mod_id" placeholder="请选择">
			        <el-option
			          v-for="item in optionsSubModule"
			          :key="item.id"
			          :label="item.label"
			          :value="item.id">
			        </el-option>
			      </el-select>
			      <span v-show="optionsSubModule.length==0">顶级</span>
				</td>
			</tr>
			<tr>
				<td>排序：</td>
				<td><el-input v-model.trim="editData.orderby" placeholder=""></el-input></td>
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
					<td>是否禁用</td>
					<td>排序</td>
				</tr>
				<tr>
					<td>
						<div class="width_120_warp">
							<el-input v-model.trim="params.label" placeholder=""></el-input>
						</div>
					</td>
					<td>
						<div class="width_120_warp">
							<div v-if="params.treeLevel=='1'">顶级</div>
								<div v-else>
								<el-input v-model.trim="params.ctl" placeholder=""></el-input>
							</div>
						</div>
					</td>
					<td>
						<div class="width_120_warp">
							<div v-if="params.treeLevel=='1'">顶级</div>
								<div v-else>
								<el-input  v-model.trim="params.act" placeholder=""></el-input>
							</div>
						</div>
					</td>
					<td>
						<div class="width_120_warp">
							<div v-if="isAdd==true">
								<div v-if="params.treeLevel=='1'">
							        <el-select v-model="params.pid" placeholder="请选择">
									      <el-option
									        v-for="item in tableData"
									        :key="item.id"
									        :label="item.label"
									        :value="item.id">
									      </el-option>
									  </el-select>
								</div>
								<div v-else-if="params.treeLevel=='2'">
							        <el-select v-model="params.pid" placeholder="请选择">
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
								<div v-else>
									顶级
								</div>
							</div>
							<div v-else>
								<div v-if="params.treeLevel=='1'">
							        	顶级
								</div>
								<div v-else-if="params.treeLevel=='2'">
									<el-select v-model="params.pid" placeholder="请选择">
									      <el-option
									        v-for="item in tableData"
									        :key="item.id"
									        :label="item.label"
									        :value="item.id">
									      </el-option>
									  </el-select>
								</div>
								<div v-else-if="params.treeLevel=='3'">
							        <el-select v-model="params.pid" placeholder="请选择">
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
								<div v-else>
									顶级
								</div>
							</div>
							<!--<div v-else-if="params.treeLevel=='2'">
						        <el-select v-model="params.pid" placeholder="请选择">
								      <el-option
								        v-for="item in tableData"
								        :key="item.id"
								        :label="item.label"
								        :value="item.id">
								      </el-option>
								  </el-select>
							</div>
							<div v-else-if="params.treeLevel=='3'">
						        <el-select v-model="params.pid" placeholder="请选择">
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
							</div>-->
						</div>
					</td>
					<td>
						<div class="width_120_warp">
						  <el-radio v-model="visible" label="1">是</el-radio>
						  <el-radio v-model="visible" label="0">否</el-radio>
						</div>
					</td>
					<td>
						<div class="width_120_warp">
						<el-input v-model.trim="params.orderby" placeholder=""></el-input>
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
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import Menu from '../../js/menu_management.js';
 export default {
   data () {
     return {
     	defaultArr:[],
     	visible:'0',
     	params:{},
     	currentNode:[],//当前选中的对象的父级
     	currentData:{},//当前选中的对象
     	typesDate:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
     	isAdd:false,
     	optionsSubModule:[],
     	editData:{},
     	modelManagement:false,
     	editingNavigation:false,
     	 tableData: [],
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
			title1: "菜单管理",
			title2: "",
			path1:'/home/moduleManagement/menuManagement',
			path2:''
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
   	nodeClick(a){
   		var jsonD = a;
   		this.params.id = jsonD.id;
   		this.params.act = jsonD.act;
   		this.params.ctl = jsonD.ctl;
   		this.params.orderby = jsonD.orderby;
   		this.params.pid = jsonD.pid;
   		this.params.visible = jsonD.visible;
   		this.params.label = jsonD.label;
   		this.params.treeLevel = jsonD.treeLevel;
   	},
   	batchModifyModule(){
		/* 编辑模型  system/editModule */
		if(!this.isAdd){
			/*edit*/
			var data = {
				id:this.params.id,
				label:this.params.label,
				pid :this.params.pid,
				orderby:this.params.orderby,
				visible:this.visible,
				ctl:this.params.ctl,
				act:this.params.act,
			}
			Menu.editModule("system/editModule",data,this,'edit');
		}else{
			var data = {
				label:this.params.label,
				pid :this.params.pid,
				orderby:this.params.orderby,
				visible:this.visible,
				ctl:this.params.ctl,
				act:this.params.act,
			}
			Menu.editModule("system/addModule",data,this,'add');
		}
   	},
   	addMenuTree(){
// 		console.log(this.$refs.tree.getCheckedKeys());
// 		console.log(this.$refs.tree.getCheckedNodes());
		if(this.params.treeLevel=='3'){
        		this.$message({
	   				type:'info',
	   				message:'三级模块无法添加子菜单'
	   			})
	   			return
		}
		this.isAdd = true;
   		this.modelManagement = true;
   		console.log(this.params.id)
   		if(this.params.treeLevel==undefined){
   			this.params = {label:'',ctl:'',act:'',pid:'0',visible:'',orderby:'',treeLevel:this.params.treeLevel}
   		}else {
   			this.params = {label:'',ctl:'',act:'',pid:this.params.id,visible:'',orderby:'',treeLevel:this.params.treeLevel}
   		}
   	},
   	deleteMenuTree(){
		var that = this;
		this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	if(this.params.id==undefined){
        		this.$message({
	   				type:'info',
	   				message:'请选择您要编辑的模块'
	   			})
	   			return
        	}else{
	      		var data = {id:this.params.id};
	      		Menu.delModule("system/delModule",data,that,this.currentNode,this.currentData);
        	}
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
   	},
   	editMenuTree(){
   		console.log(JSON.stringify(this.params))
   		if(this.params.id==undefined){
   			this.$message({
   				type:'info',
   				message:'请选择您要编辑的模块'
   			})
   			return
   		}else{
			this.isAdd = false;
	        if(this.params.visible==false){
	        	this.visible = '0';
	        }else if(this.params.visible==true){
	        	this.visible = '1';
	        }
	   		this.modelManagement = true;
   		}
   	},
//	editDialog(id){
//		/* 编辑模型  system/editModule */
//		console.log(!this.isAdd)
//		if(!this.isAdd){
//			/*edit*/
//			var data = {
//				id:this.editData.id,
//				label:this.editData.label,
//				pid :this.editData.pid,
//				orderby:this.editData.orderby,
//				disabled:this.editData.disabled,
//				ctl:this.editData.ctl,
//				act:this.editData.act,
//			}
//			Menu.editModule("system/editModule",data,this,'edit');
//		}else{
//			var data = {
//				label:this.editData.label,
//				pid :this.editData.pid,
//				orderby:this.editData.orderby,
//				disabled:this.editData.disabled,
//				ctl:this.editData.ctl,
//				act:this.editData.act,
//			}
//			Menu.editModule("system/addModule",data,this,'add');
//		}
//	},




// 	controllManager(id){
//
// 	},
//	addMenu(params){
//		this.editData.title = '';
//		this.editData.mod_id = params.id;
//		this.editData.orderby = '';
//		this.isAdd = true;
//    	var data = {mod_id:0}
//    	Menu.subModule("system/subModule",data,this,'menuAdd');
//	},
//	editMenu(id,parent_id){
//		/* 模型详情 system/moduleDetail */
//		this.isAdd = false;
//			var data = {
//				mod_id:id
//			}
//			Menu.moduleDetail("system/moduleDetail",data,this,'menu',parent_id);
//	},
//	deleteMenu(id,index){
//		var that = this;
//		this.$confirm('此操作将永久删除, 是否继续?', '提示', {
//        confirmButtonText: '确定',
//        cancelButtonText: '取消',
//        type: 'warning'
//      }).then(() => {
//    		var data = {mod_id:id};
//    		Menu.delModule("system/delModule",data,that,index,'menudel');
//      }).catch(() => {
//        this.$message({
//          type: 'info',
//          message: '已取消删除'
//        });
//      });
//	},
   }
 }
</script>
