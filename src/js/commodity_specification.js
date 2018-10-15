import api from './ajax';
export default {
    Specification(url,data,that){
    	/* 今日统计  Statistics/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
				var jsonData = result.data;
              	that.tableData = jsonData.list;
//            	console.log(jsonData)
              	that.totals = jsonData.total;
              }
            }
        })
    },    
    SpecificationAdd(url,data,that){
    	/* 添加商品规格类型  Statistics/list */
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
					})
              }else{
					that.dialogVisible = false;
              	that.$message({
		            type: 'info',
		            message: result.msg
		          });
              }
            }
        })
    },  
    SpecificationEdit(url,data,that){
    	/* 编辑商品规格类型  Statistics/list */
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
					})
              }else{
					that.dialogVisible = false;
              	that.$message({
		            type: 'info',
		            message: result.msg
		          });
              }
            }
        })
    },  
    SpecificationDel(url,data,that,count){
    	/* 编辑商品规格类型  Statistics/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	that.tableData.splice(count,1)
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
		          });
              }
            }
        })
    },
}