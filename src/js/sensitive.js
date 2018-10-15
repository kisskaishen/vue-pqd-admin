import api from '../js/ajax';
export default {
    keywordsList(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
	                var jsonData = result.data;
	                that.tableData = jsonData.list;
	                that.totals = jsonData.total;
            	}
            }
        })
    },
    addKeyWord(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
	               that.$message({
	               	type:'success',
	               	message:result.msg
	               })
	               that.fetch();
            	}else{
	               that.$message({
	               	type:'info',
	               	message:result.msg
	               })
            	}
            	that.dialogForm.keyword = '';
            	that.dialogFormVisible = false;
            }
        })
    },
    KeywordsDel(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
	               that.$message({
	               	type:'success',
	               	message:result.msg
	               })
	               that.fetch();
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