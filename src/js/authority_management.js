import api from './ajax';
export default {
    getAllRoleList(url,data,that){
    	/* 活动管理-（品质水果 家居品质 品牌清仓）商品列表  Activgoods/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
				var jsonData = result.data;
              	that.optionsRoles = jsonData;
              }
            }
        })
    }, 
    logList(url,data,that,jsonData,obj){
    	var self = this;
    	/* 活动管理-（品质水果 家居品质 品牌清仓）商品列表  Activgoods/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	
		console.log(new Date())
				var jsonData = result.data;
              	that.tableData = jsonData.list;
              	that.totals = jsonData.total;
              }
            }
        })
    },
    getRoleList(url,data,that){
    	/* 活动管理-（品质水果 家居品质 品牌清仓）商品列表  Activgoods/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
				var jsonData = result.data;
              	that.tableData = jsonData.list;
              	that.totals = jsonData.total;
              }
            }
        })
    }, 
    adminList(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
              	that.tableData = jsonData.list;
              	that.totals = jsonData.total;
              }
            }
        })
    }, 
    addAdmin(url,data,that){
    	/* 活动管理-（品质水果 家居品质 品牌清仓）商品列表  Activgoods/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.dialogVisible = false;
              	that.$message({
              		type:"success",
              		message:result.msg
              	})
              }else{
              	  that.$message({
		            type: 'info',
		            message:result.msg
		          }); 
              }
            }
        })
    },
    editAdmin(url,data,that){
    	/* 活动管理-（品质水果 家居品质 品牌清仓）商品列表  Activgoods/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.dialogVisible = false;
              	that.$message({
              		type:"success",
              		message:result.msg
              	})
              }else{
              	  that.$message({
		            type: 'info',
		            message:result.msg
		          }); 
              }
            }
        })
    },
    delRole(url,data,that,jsonData,obj){
    	var self = this;
    	/* 活动管理-（品质水果 家居品质 品牌清仓）商品列表  Activgoods/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == 200){
              	  that.removeObjWithArr(jsonData,obj);
              	  that.$message({
		            type: 'success',
		            message: result.msg
		          });
              }else{
              	  that.$message({
		            type: 'info',
		            message: result.msg
		          }); 
              }
            }
        })
    },
    deleteAdminList(url,data,that,jsonData,obj){
    	var self = this;
    	/* 活动管理-（品质水果 家居品质 品牌清仓）商品列表  Activgoods/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == 200){
              	  that.removeObjWithArr(jsonData,obj);
              	  that.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
              }else{
              	  that.$message({
		            type: 'info',
		            message: '已取消删除'
		          }); 
              }
            }
        })
    },
}