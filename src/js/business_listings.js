import api from './ajax';
export default {
    editField(url,data,that,activeProduct){
    	/* 今日统计  Statistics/list */
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	if(activeProduct=='store'){
					var data = {
						page:that.currentPages,
						rows:that.pageSize,
						state:that.state,
						key_word:that.key_word,
						mobile:that.mobile,
						is_haitao:that.is_haitao,
						store_id:that.store_id,
						is_check:that.is_check,
						is_opened:that.is_opened,
						is_thousand_plan:that.is_thousand_plan
					}
					self.getStoreList('Store/getStoreList',data,that);
              	}
		          that.$message({
		            type: 'success',
		            message: result.msg
		          });
              }else{
					var data = {
						page:that.currentPages,
						rows:that.pageSize,
						state:that.state,
						key_word:that.key_word,
						mobile:that.mobile,
						is_haitao:that.is_haitao,
						store_id:that.store_id,
						is_check:that.is_check,
						is_opened:that.is_opened,
						is_thousand_plan:that.is_thousand_plan
					}
					self.getStoreList('Store/getStoreList',data,that);
		          that.$message({
		            type: 'info',
		            message: result.msg
		          });
              }
            }
        })
    },
    updateStore(url,data,that){
    	/* Store/getStoreList 商户列表*/
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
		          that.$router.push({ path:"/home/businessManagement/businessListings"})
              }else{
				that.$message({
		            type: 'info',
		            message: result.msg
		        });
              }
            }
        })
    },
    searchConf(url,that){
    	/* Store/getStoreList 商户列表*/
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
				that.optionsCheck = jsonData.check;
				that.optionsStore = jsonData.haitao;
				that.blacklistOption = jsonData.is_blacklist;
				that.optionsOpened = jsonData.opened;
				that.options = jsonData.operations;
				that.thousandOption = jsonData.thousand;
              }else{
				that.$message({
		            type: 'info',
		            message: result.msg
		        });
              }
            }
        })
    },
    getStoreList(url,data,that){
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
              }else{
				that.$message({
		            type: 'info',
		            message: result.msg
		        });
              }
            }
        })
    },
	deleteStoreByid(url,data,that,count){
    	/* Store/getStoreList 删除商户*/
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
		            type: 'info',
		            message: result.msg
		        });
              }
            }
        })
	},
	handleHxRegister(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
			data:data,
            success:function(result){
              if(result.code == '200'){
		          that.$message({
		            type: 'success',
		            message: '操作成功!'
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
	setCheckState(url,data,that){
    	/* Store/getStoreList 审核商户*/
        api.commonAjax({
            method:"post",
            url:url,
			data:data,
            success:function(result){
              if(result.code == '200'){
              	that.fetch();
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
              	that.dialogVisible = false;
            }
        })
	},
	getStoreDetail(url,data,that){
    	/* Store/storeDetail 商户详情*/
        api.commonAjax({
            method:"post",
            url:url,
			data:data,
            success:function(result){
              if(result.code == '200'){
				that.storeData = result.data;
				if(that.storeData.store_from==0){
					that.is_show_siggle = true;
				}else{
					that.is_show_company = true;
				}
              }else{
				that.$message({
		            type: 'info',
		            message: result.msg
		        });
              }
            }
        })
	},
	editOpenInfo(url,data,that){
    	/* Store/editOpenInfo 开通并设置商户保证金信息*/
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
		        that.$router.push({ path:"/home/businessManagement/businessListings"})
              }else{
				that.$message({
		            type: 'info',
		            message: result.msg
		        });
              }
            }
        })
	}
}

