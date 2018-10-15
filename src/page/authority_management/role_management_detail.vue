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
		            <span>角色名称</span>
		            <div class="width-120">
		                <el-input v-model="role_name" placeholder="商户名"></el-input>
		            </div>
				</div>
				<div class="search_content">
		            <span>角色描述</span>
		            <div class="width-120">
		                <el-input v-model="role_desc" placeholder="商户名"></el-input>
		            </div>
				</div>
				<div class="search_content">
					<span>
		            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></span>
				</div>
				<div class="search_content">
					<el-button type="primary" @click="addCtrlMoudel()">保存</el-button>
				</div>
			</div>
			<div class="system_module_warp">
				<el-checkbox-group v-model="checkedCities1" style="font-size:14px">
					<div v-for='(item,index) in tableData'>
						<div class="system_module" v-for='(itemChild,index) in item.children'>
							<div class="system_module_title">
								<div class="system_module_title_left">
									{{item.label}} > {{itemChild.label}}
								</div>
							</div>
							<div class="system_module_content">
								<ul>
									<li class="show_li" v-for='itemChildss in itemChild.children'>
										<el-checkbox :label="itemChildss.mod_id">{{itemChildss.label}}</el-checkbox>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</el-checkbox-group>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import Menu from '../../js/menu_management.js';
 export default {
   data () {
     return {
     	role_all_ids:[],
     	checkedCities1:[],
     	checkAll:false,
     	role_desc:'',
     	role_name:'',
     	role_id:'',
     	checked:false,
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
			title1: "角色管理",
			title2: "",
			path1:'/home/authority_management/authority_management',
			path2:''
		}
     }
   },
   created(){
		/* 模块（菜单）tree System/moduleTree */
		this.role_id = this.$route.query.role_id;
		if(this.role_id==undefined){
			Menu.getRoleModule("Admin/getRoleModule",this);
		}else{
			var data = {
				role_id:this.role_id
			}
			Menu.roleInfo("Admin/roleInfo",data,this);
		}
   },
   components: {
		breadcrumb
   },
   methods:{
   	handleCheckAllChange(val){
   		console.log(val)
        this.checkedCities1 = val ? this.role_all_ids : [];
   	},
   	addCtrlMoudel(){
		var arr = this.checkedCities1;
		if(this.role_id==undefined){
			var data = {
				role_name:this.role_name,
				role_desc:this.role_desc,
				act_list:arr.join(','),
			}
			Menu.addRole("Admin/addRole",data,this);
		}else{
			var data = {
				role_id:this.role_id,
				role_name:this.role_name,
				role_desc:this.role_desc,
				act_list:arr.join(','),
			}
			Menu.editRole("Admin/editRole",data,this);
		}
   	},
   }
 }
</script>
