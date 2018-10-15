<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/wx/wx_setting.less";
.addFirstMenu{
	margin:20px;
}
</style>
<template>
	<div class="wx_setting">
		<breadcrumb :content="content_title"></breadcrumb>	
		<div class="main">
			<div class="level">
				<div class="container">
					<div class="search_admin_list_table">
						<div class="search_admin_list_table_title">
							<span>
								菜单设置
							</span>
						</div>
					</div>
				</div>
				<div class="addFirstMenu">
					<el-button @click="addFirstMenu()" size="small" type="primary">添加菜单</el-button>
				</div>
				<div class="level_item" v-for="(item,index) in tableData">
					<div class="level_item_warp">
						<div class="icon_left">
							<!--<img class="icon_comm" src="../../images/icons/add.png" alt="" />-->
							<div class="icon_left"><img @click="deleteFisrtMenu(item,index)" class="icon_comm" src="../../images/icons/delete.png" alt="" /></div>
						</div>
						<div class="text_comm">一级菜单</div>
					</div>	
					<div>
						<div class="level_item_warp_child">
							<div class="left_label">
								<div class="icon_left"><img @click="addMenu(item.sub_button)" class="icon_comm" src="../../images/icons/add.png" alt="" /></div>
								<div class="text_comm">菜单类型</div>
							</div>
							<div class="left_content">
								<!--<div class="select" v-show="item.sub_button.length==0">
									 <el-select size="small" v-model="item.type" placeholder="">
									    <el-option
									      v-for="item in optionType"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									  </el-select>
								</div>-->
									<div class="text">
										名称
									</div>
									<div class="input">
										<el-input size="small" :maxlength="10" v-model="item.name" placeholder=""></el-input>
									</div>
								<!--<span v-show="item.type==1">
									<div class="text">
										标识
									</div>
									<div class="input">
										<el-input size="small" v-model="item.key" placeholder=""></el-input>
									</div>
								</span>-->
								<span class="link_www">
									<div class="text">
										链接
									</div>
									<div class="input">
										<el-input size="small" :maxlength="100" v-model="item.url" placeholder=""></el-input>
									</div>
								</span>
								
								<!--<span v-show="item.type!=0">
									<div class="text">
										标识
									</div>
									<div class="input">
										<el-input size="small" v-model="input" placeholder=""></el-input>
									</div>
									<div class="text">
										链接
									</div>
									<div class="input">
										<el-input size="small" v-model="input" placeholder=""></el-input>
									</div>
								</span>-->
							</div>
						</div>
						<div class="level_item_warp_childs" v-for="(its,ind) in item.sub_button"  v-show="item.sub_button.length!=0">
							<div class="left_label">
								<div class="icon_left"><img @click="deleteMenu(item.sub_button,ind,item)" class="icon_comm" src="../../images/icons/delete.png" alt="" /></div>
								<div class="text_comm">菜单类型</div>
							</div>
							<div class="left_content">
								<!--<div class="select">
									 <el-select size="small" v-model="its.type" placeholder="">
									    <el-option
									      v-for="item in optionType"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									  </el-select>
								</div>-->
								<div class="text">
									名称
								</div>
								<div class="input">
									<el-input size="small" :maxlength="10" v-model="its.name" placeholder=""></el-input>
								</div>
								<!--<div class="identification" v-show="its.type==1">
									<div class="text">
										标识
									</div>
									<div class="input">
										<el-input size="small" :maxlength="60" v-model="its.key" placeholder=""></el-input>
									</div>
								</div>-->
								<div class="link_warp">
									<div class="text">
										链接
									</div>
									<div class="input">
										<el-input size="small" :maxlength="100" v-model="its.url" placeholder=""></el-input>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="submit_btn">
					<el-button type="primary" @click="submitMenu()">提交</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb'; 
import WX from '../../js/wx.js';
export default {
   data () {
     return {
     	flag:false,
     	flags:false,
		content_title:{
			title1: "菜单设置",
			title2: "",
			path1:'/home/wx/wx_setting',
			path2:''
		},
		options:[],
		input:'',
		value:'',
		tableData:[],
		optionType:[],
     }
   },
   created(){
		WX.getlist("customize/getlist",this);
		WX.customizeType("customize/type",this);
   },
   components: {
	breadcrumb
   },
   methods:{
	   	deleteFisrtMenu(item,index){
	   		this.tableData.splice(index,1)
	   	},
	   	addFirstMenu(){
	   		if(this.tableData.length>2){
				this.$message({
					type:'info',
					message:"最多只能添加三个菜单"
				})
				return
	   		}else{
	   			this.tableData.push({"type":0,"name":"","url":"","sub_button":[]})
	   		}
	   	},
	   	deleteMenu(params,keys,datas){
	   		params.splice(keys,1);
	   		if(params.length==0){
	   			datas.type = 0;
	   		}
	   	},
		addMenu(params){
			if(params.length>4){
				this.$message({
					type:'info',
					message:"最多只能添加五个子菜单"
				})
				return
			}else{
				params.push({"type":0,"name":"","url":"","sub_button":[]})
			}
		},
		submitMenu(){
			var that = this;
			this.tableData.forEach((item,index)=>{
				if(item.name==''){
					var str ='第'+ (index+1) + '个菜单名称不能为空';
					that.$message({
						type:'info',
						message:str
					})
					return
				}else{
					if(item.sub_button.length!=0){
						item.sub_button.forEach((its,keys)=>{
							if(its.name==''){
								var str ='第'+ (index+1) + '个菜单的第'+(keys+1)+'个子菜单名称不能为空';
								that.$message({
									type:'info',
									message:str
								})
								return
							}else {
								if(its.type==1){
									if(its.key==''){
										var str ='第'+ (index+1) + '个菜单的第'+(keys+1)+'个子菜单标识不能为空';
										that.$message({
											type:'info',
											message:str
										})
										return
									}else {
										this.flag = true;
									}
								}else if(its.type==0){
									if(its.url==''){
										var str ='第'+ (index+1) + '个菜单的第'+(keys+1)+'个子菜单链接不能为空';
										that.$message({
											type:'info',
											message:str
										})
										return
									}else{
										this.flags = true;
									}
								}
							}
						})
					}else{
						this.flag = true;
						this.flags = true;
					}
				}
			})
			console.log(this.flag)
			console.log(this.flags)
			if(this.flag && this.flags){
				var data = {
					menu:this.tableData
				}
				WX.customizeUpdate("customize/update",data,this);
			}
		}
   }
 }
</script>