import api from './ajax';
export default {
    withdrawalsList(url,data,that){
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
    changeWithdrawalsStatus(url,data,that){
    	/* Store/changeWithdrawalsStatus 改变申请记录状态*/
        api.commonAjax({
            method:"post",
            url:url,
			data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
	   			that.dialogVisible = false;
				that.$message({
		            type: 'success',
		            message: result.msg
		          });
              }else{
	   			that.dialogVisible = false;
				that.$message({
		            type: 'danger',
		            message: result.msg
		          });
              }
            }
        })
    }
}