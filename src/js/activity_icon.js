import api from './ajax';
export default {
    Activityicon(url,data,that){
    	/* 活动管理-0.1秒杀-商品列表  Secondbuy/list */
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
    	/* 活动管理-0.1秒杀-商品列表  Secondbuy/list */
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
    	/* 活动管理-活动图标-添加商品  Activityicon/add */
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
                	that.options = result.data;
                	that.options.unshift({key:'',name:'全部'})
            	}else{
	              	that.$message({
	              		type: 'info',
	            		message: result.msg
	              	})
            	}
            }
        })
    },   
    getGoodsSearch(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code == '200'){
            		var jsonData = result.data;
                	that.tableData = jsonData.list;
                	console.log(jsonData.total)
                	that.totals = jsonData.total;
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