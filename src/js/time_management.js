import api from './ajax';
export default {
    secondsKillTimeList(url,data,that){
    	/* 秒杀时间列表 Secondskill/secondsKillTimeList */
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
    addSecondsKillTime(url,data,that,index){
    	/* 添加秒杀时间 Secondskill/addSecondsKillTime */
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
    delSecondsKillTime(url,data,that,index){
    	/* 删除秒杀时间 Secondskill/delSecondsKillTime */
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