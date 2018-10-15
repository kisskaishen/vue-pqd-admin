import api from './ajax';
export default {
    shoppingcolumnIsShow(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var datas = {
					column_id:'',
					keywords:'',
				}
				self.shoppingcolumn("shoppingcolumn/list",datas,that)
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
    shoppingcolumnDown(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var datas = {
					column_id:'',
					keywords:'',
				}
				self.shoppingcolumn("shoppingcolumn/list",datas,that)
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
    shoppingcolumnUp(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var datas = {
					column_id:'',
					keywords:'',
				}
				self.shoppingcolumn("shoppingcolumn/list",datas,that)
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
    shoppingcolumn(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	var jsonData = result.data;
              	that.tableData = jsonData.list;
              }else{
				that.$message({
		            type: 'info',
		            message: result.msg
		        });
              }
            }
        })
    },
    shoppingcolumnTypeInfo(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
              	var jsonData = result.data;
              	that.typeInfoOption = jsonData.type;
              }else{
				that.$message({
		            type: 'info',
		            message: result.msg
		        });
              }
            }
        })
    },
    shoppingcolumnEdit(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var datas = {
					column_id:'',
					keywords:'',
				}
				self.shoppingcolumn("shoppingcolumn/list",datas,that)
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
              	that.dialogVisible = false;
            }
        })
    },
    shoppingcolumnAddShopColumn(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var datas = {
					column_id:'',
					keywords:'',
				}
				self.shoppingcolumn("shoppingcolumn/list",datas,that)
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
              	that.dialogVisible = false;
            }
        })
    },
    shoppingcolumnDel(url,data,that,jsonData){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.removeObjWithArr(that.tableData,jsonData);
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
}