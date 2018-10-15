import api from './ajax';
export default {
    GoodsspecialAdd(url,data,that,title){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
                if(title=="special"){
                  that.$router.push({path:"/home/specialManagement/listGoods"})
                }
              	that.$message({
		            type: 'success',
		            message: result.msg
		          });
              }else{
              	that.$message({
		            type: 'info',
		            message: result.msg
		          });
              }
            }
        })
    },
    getGoodsSearch(url,data,that){
    	/* 专场分类列表  Exclusive/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
              	that.tableData = jsonData.list;
              	that.totals = jsonData.total;
              }
            }
        })
    },
    GoodsspecialList(url,data,that){
    	/* 专场分类列表  Exclusive/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
              	that.tableData = jsonData.list;
              	that.totals = jsonData.total;
              }
            }
        })
    },
    ExclusiveList(url,data,that,title){
    	/* 专场分类列表  Exclusive/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
				if(title=="special"){
					that.tableData = jsonData.list;
					that.totals = jsonData.total;
				}
              	that.options = jsonData.list;
              	that.options.unshift({id:'',name:'全部'})
              }
            }
        })
    },
    GoodsspecialDel(url,data,that,datas){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.removeObjWithArr(that.tableData,datas)
              	that.$message({
		            type: 'success',
		            message: result.msg
		          });
              }else{
              	that.$message({
		            type: 'info',
		            message: result.msg
		          });
              }
            }
        })
    },
    ExclusiveDetail(url,data,that){
    	/* 专场分类详情  Exclusive/info */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
					that.tableData = result.data;
              }else{
              	that.$message({
		            type: 'info',
		            message: result.msg
		          });
              }
            }
        })
    },
    ExclusiveDel(url,data,that,index){
    	/* 删除专场分类  Exclusive/del */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
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
		          });
              }
            }
        })
    },
    ExclusiveAdd(url,data,that,count){
    	/* 添加专场分类  Exclusive/add */
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
		          });
              }
            }
        })
    },
    ExclusiveEdit(url,data,that,count){
    	/* 编辑专场分类  Exclusive/edit */
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
		          });
              }
            }
        })
    },
}
