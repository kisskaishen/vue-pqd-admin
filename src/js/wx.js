import api from './ajax';
export default {
    getlist(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == 200){
				that.tableData = result.data;
              }
            }
        })
    },
    customizeType(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == 200){
				that.optionType = result.data.cod;
              }
            }
        })
    },
    customizeUpdate(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == 200){
				that.$message({
					type:'success',
					message:result.msg
				})
              }else{
              	that.$message({
					type:'info',
					message:result.msg
				})
              }
            }
        })
    },
}