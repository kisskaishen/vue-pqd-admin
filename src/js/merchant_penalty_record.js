import api from './ajax';
export default {
    punishmentList(url,data,that){
    	/* Store/getStoreList 商户列表*/
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
    changePunishmentStatus(url,data,that){
    	/* Store/getStoreList 商户列表*/
        api.commonAjax({
            method:"post",
            url:url,
			data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
				that.$message({
		            type: 'success',
		            message: result.msg
		          });
		          that.dialogVisible = false;
              }else{
              	that.$message({
		            type: 'danger',
		            message: result.msg
		          });
		          that.dialogVisible = false;
              }
            }
        })
    },
    delPunishment(url,data,that,count){
    	/* Store/getStoreList 商户列表*/
        api.commonAjax({
            method:"post",
            url:url,
			data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
				that.$message({
		            type: 'success',
		            message: result.msg
		          });
		          that.tableData.splice(count,1)
		          that.dialogVisible = false;
              }else{
              	that.$message({
		            type: 'danger',
		            message: result.msg
		          });
		          that.dialogVisible = false;
              }
            }
        })
    },
}