import api from './ajax';
export default {
    orderList(url,data,that){
    	/* 订单列表 Order/list */
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
    serviceList(url,data,that,index){
    	/* 售后订单列表 Order/serviceList */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.tableData[index].time = that.input;
              	that.dialogVisible = false;
              	that.$message({
              		type: 'success',
            		message: result.msg
              	})
              }else{
              	that.dialogVisible = false;
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    orderDetail(url,data,that,index){
    	/* 订单详情 order/detail */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.tableData.splice(index,1)
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
    handleService(url,data,that,index){
    	/* 平台处理申诉订单 Order/handleService */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.tableData.splice(index,1)
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
}