import api from './ajax';
export default {
    advertisingList(url,data,that){
    	/* 广告详情（内容） Ad/detail */
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
    advertisingListDel(url,data,that,count){
    	/* 删除广告  Ad/delAd */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	that.tableData.splice(count,1);
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
    advertisingListAdd(url,data,that){
    	/* 编辑  Ad/editAd */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	that.$router.push({name:'advertising_list'})
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
    positionList(url,data,that){
    	/* 广告位置列表  Ad/positionList */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	that.options = result.data;
              	that.options.unshift({"position_id":'',"position_name":"全部"})
              }else{
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    positionListDetail(url,data,that){
    	/* 编辑广告  Ad/detail */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == 200){
              	that.adDetail = result.data;
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