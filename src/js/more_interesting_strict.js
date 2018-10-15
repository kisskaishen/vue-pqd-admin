import api from './ajax';
export default {
    Strict(url,data,that){
    	/* 活动管理-趣多严选-添加商品  Strict/list */
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
    searchGoodsStrict(url,data,that){
    	/* 活动管理-趣多严选-添加商品  Strict/list */
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
    ActivityiconDel(url,data,that,count){
    	/* 活动管理-趣多严选-添加商品  Strict/del */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	that.tableData.splice(count,1)
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
    ActivityiconAdd(url,data,that){
    	/* 活动管理-活动图标-添加商品  Strict/add */
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
    getActivityicon(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code == '200'){
                	var jsonData = result.data;
                	that.options = jsonData.list;
            	}else{
	              	that.$message({
	              		type: 'info',
	            		message: result.msg
	              	})
            	}
            }
        })
    },    
    ExclusiveList(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code == '200'){
                	var jsonData = result.data;
                	that.optionsExclusive = jsonData.list;
                	that.optionsExclusive.unshift({id:'',name:'全部'})
            	}else{
	              	that.$message({
	              		type: 'info',
	            		message: result.msg
	              	})
            	}
            }
        })
    }
}