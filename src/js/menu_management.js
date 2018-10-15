import api from './ajax';
export default {
    addRole(url,data,that){
    	/* 模块（菜单）tree  System/moduleTree */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            that.$router.push({name:'authority_management'})
             if(result.code == '200'){
              	that.$message({
              		type: 'success',
            		message: result.msg
              	})
              }else{
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    editRole(url,data,that){
    	/* 模块（菜单）tree  System/moduleTree */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
             if(result.code == '200'){
            that.$router.push({name:'authority_management'})
              	that.$message({
              		type: 'success',
            		message: result.msg
              	})
              }else{
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    getRoleModule(url,that){
    	/* 模块（菜单）tree  System/moduleTree */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
				that.tableData = jsonData.role_data;
				that.role_all_ids = jsonData.role_all_ids;
              }
            }
        })
    },
    roleInfo(url,data,that){
    	/* 模块（菜单）tree  System/moduleTree */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
				that.tableData = jsonData.role_data;
				that.role_desc = jsonData.role_desc;
				that.role_name = jsonData.role_name;
				that.role_all_ids = jsonData.role_all_ids;
				that.checkedCities1 = jsonData.act_list;
              }
            }
        })
    },
    moduleTree(url,that){
    	/* 模块（菜单）tree  System/moduleTree */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	that.defaultArr.push(2);
				that.tableData = result.data;
              }
            }
        })
    },
    moduleDetail(url,data,that,count,parent_id){
    	var _this = this;
    	/* 模型详情  system/moduleDetail */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	if(count=='2'){
	              	var data = {mod_id:0}
	              	_this.subModule("system/subModule",data,that);
					that.editData = result.data;
					that.editingNavigation = true;
              	}else if(count=='menu'){
              		console.log(parent_id==0)
              		console.log(parent_id)
              		if(parent_id==0){
	              		that.editData = result.data;
	              		that.editingNavigation = true;
              		}else{
		              	var data = {mod_id:0}
		              	_this.subModule("system/subModule",data,that);
	              		that.editData = result.data;
	              		that.editingNavigation = true;
              		}
              	}
              }
            }
        })
    },
    subModule(url,data,that,count){
    	/* 获取下一级模型列表  System/subModule */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	if(count=='1'){
					that.typesDate = result.data;
              		that.modelManagement = true;
              	}else if(count=='menuAdd'){
              		that.optionsSubModule = result.data;
              		that.editingNavigation = true;
              	} else{
					that.optionsSubModule = result.data;
              	}
              }
            }
        })
    },
    editModule(url,data,that,tit){
    	/* 编辑模型  system/editModule */
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				self.moduleTree("System/moduleTree",that);
              	that.$message({
              		type: 'success',
            		message: result.msg
              	})
              }else{
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
              	that.modelManagement = false;
            }
        })
    },
    delModule(url,data,that){
    	/* 删除模型  system/delModule */
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				self.moduleTree("System/moduleTree",that);
              	that.$message({
              		type: 'success',
            		message: result.msg
              	})
              }else{
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    batchModifyModule(url,data,that){
    	/* 批量修改（或增加）模型  system/batchModifyModule */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	that.modelManagement = false;
              	that.$message({
              		type: 'success',
            		message: result.msg
              	})
              }else{
              	that.modelManagement = false;
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
}