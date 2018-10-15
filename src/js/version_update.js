import api from './ajax';
export default {
    menuList(url,data,that){
    	/* 版本列表  Version/list */
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
    delVersion(url,data,that,params){
    	/* 删除版本  Version/delVersion */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            if(result.code == 200){
              	that.removeObjWithArr(that.tableData,params);
              	that.totals--;
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
    addVersion(url,data,that){
    	/* 删除版本  Version/delVersion */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            if(result.code == 200){
            	that.$router.push("/home/versionUpdate/versionUpdate");
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