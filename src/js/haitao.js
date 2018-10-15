import api from './ajax';
export default {
    haiTaoList(url,data,that){
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
    searchConf(url,that){
    	/* 今日统计  Statistics/list */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == 200){
              	var jsonData = result.data;
              	that.the_raise = jsonData.the_raise;
              	that.the_raise.unshift({label:'全部',value:''})
              	
              	that.is_special = jsonData.is_special;
              	that.is_special.unshift({label:'全部',value:''})
              	
              	that.is_on_sale = jsonData.is_on_sale;
              	that.is_on_sale.unshift({label:'全部',value:''})
              	
              	that.haitao_cat = jsonData.haitao_cat;
              	that.haitao_cat.unshift({label:'全部',value:''})
              	
              	that.goodstatus = jsonData.goodstatus;
              	that.goodstatus.unshift({label:'全部',value:''})
              	
              	that.exclusive_cat = jsonData.exclusive_cat;
              	that.exclusive_cat.unshift({label:'全部',value:''})
              	
              	that.is_audit = jsonData.is_audit
              	that.is_audit.unshift({label:'全部',value:''})
              	
              	that.the_raiseOption = jsonData.the_raise
              	that.the_raiseOption.unshift({label:'全部',value:''})
              	
              	that.is_showOption = jsonData.is_show
              	that.is_showOption.unshift({label:'全部',value:''})
              	
              	that.is_recommendOption = jsonData.is_recommend
              	that.is_recommendOption.unshift({label:'全部',value:''})
              }
            }
        })
    },
    goodsDel(url,data,that,count){
    	/* 删除商品  goods/del */
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
    Goodscategory(url,that){
    	/* 今日统计  Statistics/list */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == 200){
              	that.optionsCategory = result.data;
              }
            }
        })
    },
    delGoodscategory(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.form.id = '';
				self.Goodscategory("Haitaocate/tree",that)
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
    twoLevelTree(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
					that.options = result.data;
              }
            }
        })
    },
    twoLevelTrees(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
					that.options = result.data;
              }
            }
        })
    },
    addGoodscategory(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.dialogFormVisible = false;
				self.Goodscategory("Haitaocate/tree",that)
              	that.$message({
              		type:'success',
              		message:result.msg
              	})
              }else{
              	that.dialogFormVisible = false;
              	that.$message({
              		type:'info',
              		message:result.msg
              	})
              }
            }
        })
    },
    editField(url,data,that,activeProduct){
    	/* 今日统计  Statistics/list */
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	if(activeProduct=='haitao'){
				   	var datas = {
				   		page:that.currentPage,
				   		rows:that.pageSize,
				   		cat_id_map:that.form.cat_id_map,
				   		store_name:that.form.store_name,
				   		goods_id:that.form.goods_id,
				   		key_word:that.form.key_word,
				   		is_audit:that.form.is_audit,
				   		is_show:that.form.is_show,
				   		is_on_sale:that.form.is_on_sale,
				   		is_haitao_goods:'1',
				   		is_recommend:that.form.is_recommend,
				   	}
					self.haiTaoList("goods/list",datas,that);
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
}