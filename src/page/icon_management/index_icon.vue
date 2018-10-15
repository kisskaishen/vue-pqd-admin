<style lang="less" scoped>
@import "../../less/config.less";
.container{
	padding:20px;
	.table_warp{
		padding:40px 10px;
		background:#fff;
		.search_contents{
			margin:0 0 10px 0;
		}
	}
	.arrow_up{
		background:red;
		width:20px;
		height:20px;
		display: inline-block;
		border-radius: 50%;
		margin:10px;
		cursor: pointer;
	}
}
</style>
<template>
	<div class="wx_setting">
		<breadcrumb :content="content_title"></breadcrumb>
		<div class="container">
			<div class="search_admin_list_table">
				<div class="search_admin_list_table_title">
					<span>
						APP首页导航
					</span>
				</div>
			</div>
			<div class="table_warp">
				<div class="search_contents">
					<el-button type="primary" @click="entryDetail()">添加</el-button>
				</div>
				<div class="table_list">
					  <el-table
					    :data="tableData"
					    border
					    style="width: 100%">
					    <el-table-column
					      type="index"
					      width="50"
					      label="序号">
					    </el-table-column>
					    <el-table-column
					      prop="column_name"
					      label="图标名称">
					    </el-table-column>
					    <el-table-column
					      prop="column_logo"
					      label="图标">
					      <template slot-scope="scope">
					      	<img :src="scope.row.column_logo" alt="" />
					      </template>
					    </el-table-column>
					    <el-table-column
					      prop="link"
					      label="链接地址">
					    </el-table-column>
					    <el-table-column
					      label="是否显示">
						      <template slot-scope="scope">
						      	  <el-switch
						          v-model="scope.row.is_show"
						          active-color="#00A854"
						          active-value="1"
						          inactive-color="#F04134"
						          inactive-value="2"
						          @change="changeShow(scope.row)">
	        					</el-switch>
						      </template>
					    </el-table-column>
					    <el-table-column
					      label="排序">
						      <template slot-scope="scope">
						      	<img @click="arrowUp(scope.row)" class="arrow_up" src="../../images/icons/arrow_up.png" alt="" />
						      	<img @click="arrowDown(scope.row)"  class="arrow_up" src="../../images/icons/arrow_down.png" alt="" />
						      </template>
					    </el-table-column>
					    <el-table-column
					      prop="typename"
					      label="类型">
					    </el-table-column>
					    <el-table-column
					      label="操作">
					      <template slot-scope="scope">
					        <el-button type="text" size="small" @click="editSpecifications(scope.row)">编辑</el-button>
					        <el-button type="text" size="small" @click="delSpecifications(scope.row)">删除</el-button>
					      </template>
					    </el-table-column>
					  </el-table>
				</div>
			</div>
		</div>
<el-dialog
  title="编辑图标"
  :visible.sync="dialogVisible"
  width="960px">
<div class="order_detail_table">
	<div class="current_system">
		<div class="warp">
			<table class="show_list_table" border="0" cellspacing="" cellpadding="">
				<tbody>
					<tr>
						<td>图标名称：</td>
						<td>类型</td>
						<td>图标：(图片大小82x82)</td>
						<td>链接地址：</td>
					</tr>
					<tr>
						<td>
							<el-input :maxlength="6" v-model="form.column_name" placeholder="图标名称"></el-input>
						</td>
						<td>
						  <el-select v-model="form.type" placeholder="全部">
						    <el-option
						      v-for="item in typeInfoOption"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						</td>
						<td>
							<icon-app-load :upLoadData='shopColumnLogo' :type="icon_app" @addImg = 'returnAddimg' @deleteImg="originalImgFun" :imageArr='form.column_logo'></icon-app-load>
						</td>
						<td>
							<el-input style="width:400px;" :maxlength="60" v-model="form.link" placeholder="链接地址"></el-input>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSpecifications()">确 定</el-button>
  </span>
</el-dialog>
	</div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import iconAppLoad from '../../components/icon_app_upLoad';
import Icon from '../../js/icon_app_index.js';
export default {
	data(){
		return{
			typeInfoOption:[],
			icon_app:'icon_app',
			shopColumnLogo:{
	     		type:"shopColumnLogo"
	     	},
			flag:false,
			form:{
				radio:'1',
				type:'',
			},
			dialogVisible:false,
			tableData:[],
			content_title:{
				title1: "APP首页导航",
				title2: "",
				path1:'/home/icon_index/icon',
				path2:''
			},
		}
	},
	created(){
      var token = localStorage.getItem("token");
      if(token){
        this.shopColumnLogo.Authorization = token;
      }
		var data = {
			column_id:'',
			keywords:'',
		}
		Icon.shoppingcolumn("shoppingcolumn/list",data,this);
		Icon.shoppingcolumnTypeInfo("shoppingcolumn/typeInfo",this);
	},
	components: {
		breadcrumb,iconAppLoad
	},
	methods:{
		arrowDown(params){
			var data = {
				column_id:params.shopping_column_id
			}
			Icon.shoppingcolumnDown("shoppingcolumn/down",data,this)
		},
		arrowUp(params){
			var data = {
				column_id:params.shopping_column_id
			}
			Icon.shoppingcolumnUp("shoppingcolumn/up",data,this)
		},
		returnAddimg(data){
			this.form.column_logo = data;
		},
		originalImgFun(type){
			this.form.column_logo = '';
		},
		delSpecifications(params){
		this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
			var data = {
				column_id:params.shopping_column_id
			}
			Icon.shoppingcolumnDel("shoppingcolumn/del",data,this,params)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
		},
		entryDetail(){
			var len = this.tableData.length;
			if(len>=10){
				this.$message({
		            type: 'info',
		            message: '首页导航不能超过10个'
		        });
		        return
			}
			this.flag = false;
			this.form.column_name = '';
			this.form.column_logo = '';
			this.form.link =  '';
			this.form.is_show =  '1';
			this.form.type = '';
			this.dialogVisible = true;
		},
		editSpecifications(params){
			this.flag = true;
			this.form.column_name = params.column_name;
			this.form.column_logo = params.column_logo;
			this.form.link = params.link;
			this.form.is_show = params.is_show;
			this.form.type = params.type;
			this.form.column_id = params.shopping_column_id;
			this.dialogVisible = true;
		},
		addSpecifications(){
			if(this.flag){
				var data = {
					column_name:this.form.column_name,
					column_logo:this.form.column_logo,
					link:this.form.link,
					column_id:this.form.column_id,
					type:this.form.type,
				}
				Icon.shoppingcolumnEdit("shoppingcolumn/edit",data,this)
			}else{
				var data = {
					column_name:this.form.column_name,
					column_logo:this.form.column_logo,
					link:this.form.link,
					type:this.form.type,
				}
				Icon.shoppingcolumnAddShopColumn("shoppingcolumn/addShopColumn",data,this)
			}
		},
		changeShow(params){
	   		/* 是否显示 */
			var data = {
				column_id:params.shopping_column_id,
				is_show:params.is_show
			}
			Icon.shoppingcolumnIsShow("shoppingcolumn/handleShow",data,this);
	   	},
	}
}
</script>
