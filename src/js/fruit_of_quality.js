import api from './ajax';
export default {
    editField(url,data,that,activeProduct){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	if(activeProduct=='saveMonry'){
					var data = {
						page: that.currentPage,
						rows: that.pageSize,
					}
					self.ActivgoodsList("Economize/list", data, that);
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
   				that.dialogFormVisible = false;
   				that.dialogVisible = false;
            }
        })
    },
    delActivgoods(url,data,that,params){
    	/* 活动管理-（品质水果 家居品质 品牌清仓）商品列表  Activgoods/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.removeObjWithArr(that.tableData,params)
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
    ActivgoodsList(url,data,that){
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
    ActivgoodsSearch(url,data,that){
    	/* 活动管理-（品质水果 家居品质 品牌清仓）-添加商品搜索  EActivgoods/searchGoods */
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
              }else{
              	that.$message({
		            type: 'info',
		            message: result.msg
		          });
              }
            }
        })
    },  
    ActivgoodsDel(url,data,that,index){
    	/* 活动管理-（品质水果 家居品质 品牌清仓）-删除商品  Activgoods/del */
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
    ActivgoodsAdd(url,data,that,count){
    	/* 活动管理-（品质水果 家居品质 品牌清仓）-添加商品  Activgoods/add */
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
    Exclusivelist(url,data,that,count){
    	/* 专场分类列表 Exclusive/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	that.options = result.data.list;
              	that.options.unshift({"id":'',name:"全部"})
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