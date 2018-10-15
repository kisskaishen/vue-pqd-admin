import api from './ajax';
export default {
    searchManualReturnMoneyStatus(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
        				var jsonData = result.data;
                that.statusOption = jsonData.reason;
              }else{
          				that.$message({
          					type:"info",
          					message:result.msg
          				})
              }
            }
        })
    },
    manualReturnMoney(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
        				that.$message({
        					type:"success",
        					message:result.msg
        				})
                      }else{
        				that.$message({
        					type:"info",
        					message:result.msg
        				})
              }
            }
        })
    },
    closeTheOrder(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
        				that.$message({
        					type:"success",
        					message:result.msg
        				})
                      }else{
        				that.$message({
        					type:"info",
        					message:result.msg
        				})
              }
            }
        })
    },
    getCloseTheOrderList(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
					var jsonData = result.data;
					if(jsonData.type==0){
		              	that.tableData = jsonData.list;
		              	that.prev_id = jsonData.prev_id;
		              	that.next_id = jsonData.next_id;
		              	that.type = jsonData.type;
					}else if(jsonData.type==1){
						that.tableData = jsonData.list;
						that.$message({
						    type: 'success',
			        		message: '已经最后一页'
			   			})
					}else if(jsonData.type==-1){
						that.tableData = jsonData.list;
						that.$message({
						    type: 'info',
			        		message: '已经第一页'
			   			})
					}
              }else{
				that.$message({
					type:"info",
					message:result.msg
				})
              }
            }
        })
    },
}
