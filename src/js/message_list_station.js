import api from './ajax';
export default {
    StandInsideLetter(url,data,that){
    	/* Store/getStoreList 商户列表*/
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
    StandInsideLetterDetail(url,data,that){
    	/* StandInsideLetter/detail 获取站内信详情*/
        api.commonAjax({
            method:"post",
            url:url,
			data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	var jsonData = result.data;
				that.msg_title = jsonData.msg_title;
				that.logo_type = jsonData.type;
				that.store_id = jsonData.store_id;
				that.store_name = jsonData.store_name;
				that.msg_content = jsonData.msg_content;
              }
            }
        })
    },
    StandInsideLetterAdd(url,data,that){
    	/* StandInsideLetter/detail 更新站内信*/
        api.commonAjax({
            method:"post",
            url:url,
			data:data,
            success:function(result){
              if(result.code == '200'){
					that.$message({
			            type: 'success',
			            message: result.msg
			          });
			          that.$router.push({path:"/home/businessManagement/messageListStation"})
	              }else{
					that.$message({
			            type: 'danger',
			            message: result.msg
			          });
	              }
            }
        })
    },
    StandInsideLetterDel(url,data,that,count){
    	/* StandInsideLetter/detail 更新站内信*/
        api.commonAjax({
            method:"post",
            url:url,
			data:data,
            success:function(result){
              if(result.code == '200'){
              	  that.tableData.splice(count,1)
		          that.$message({
		            type: 'success',
		            message: '操作成功!'
		          });
              }else{
				that.$message({
		            type: 'success',
		            message: result.msg
		        });
              }
            }
        })
    },
}