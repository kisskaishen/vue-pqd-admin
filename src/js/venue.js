import api from './ajax';
export default {
    meetingplaceList(url,data,that){
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
    meetingplaceAdd(url,data,that,title){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	if(title=="main"){
              		that.fetch();
              		that.$message({
	              		type:'success',
	              		message:result.msg
	              	})
              	}else{
	              	that.$router.push({path:"/home/activityManagement/symposium",query:{parent_id:that.parent_id}})
	              	that.$message({
	              		type:'success',
	              		message:result.msg
	              	})
              	}
              }else{
              	that.$message({
              		type:'info',
              		message:result.msg
              	})
              }
              that.addVenuedialogVisible = false
            }
        })
    },
    meetingplaceConf(url,that,title){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
              	that.options = jsonData.activity;
              	if(title=="addSymposium"){
              		that.category_listOpiton = jsonData.category_list;
					that.symposium_detail.cat_list.push({
						"cat_name":that.add_cate_name,
						"relation_cat_id":[],
						"meeting_place_id":that.meeting_place_id,
						"category_list":that.category_listOpiton
					});
					that.add_cate_name = '';
              	}else if(title=="parent"){
              		that.optionsCategory_list = jsonData.category_list;
              	}else if(title=="main"){
              		that.statusoptions = jsonData.status;
              	}
              }else{
              	that.$message({
              		type:'info',
              		message:result.msg
              	})
              }
            }
        })
    },
    meetingplaceChangeField(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				that.fetch();
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
              that.changeVisible = false;
            }
        })
    },
    meetingplaceDetail(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				that.symposium_detail = result.data;
              }else{
              	that.$message({
              		type:'info',
              		message:result.msg
              	})
              }
            }
        })
    },
    getGoodsList(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	var jsonData = result.data;
              	that.tableData = jsonData.list;
              	that.totals = jsonData.total;
              }else{
              	that.$message({
              		type:'info',
              		message:result.msg
              	})
              }
            }
        })
    },
    MeetingplaceDetail(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	var jsonData = result.data;
              	that.detailData = jsonData;
              	that.cat_listOptions = jsonData.cat_list;
              }else{
              	that.$message({
              		type:'info',
              		message:result.msg
              	})
              }
            }
        })
    },
    getMasterGoodsList(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	var jsonData = result.data;
              	that.tableData = jsonData.list;
              	that.total = jsonData.total;
              	that.exist_goods_ids = jsonData.exist_goods_ids;
              }else{
              	that.$message({
              		type:'info',
              		message:result.msg
              	})
              }
            }
        })
    },
    getDateGroup(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	var jsonData = result.data;
              	that.date_group = jsonData.list;
              	if(that.date_group.length!=0){
	              	that.tabLabel = that.date_group[0]; 
	              	that.fetch()
              	}
              }else{
              	that.$message({
              		type:'info',
              		message:result.msg
              	})
              }
            }
        })
    },
    MeetingplaceDelGoods(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.fetch();
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
    MeetingplaceSearchGoods(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
				that.tableDataDialog = jsonData.list;
				that.totalDia = jsonData.total;
              }else{
              	that.$message({
              		type:'info',
              		message:result.msg
              	})
              }
            }
        })
    },
    MeetingplaceAddGoods(url,data,that,title){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	if(title=="main"){
              		console.log(111111111)
              		that.fetch();
              	}else{
              		console.log(2222222222)
					that.dataFetch();
              	}
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
              that.addVenuedialogVisible = false;
            }
        })
    },
    MeetingplaceChangeGoodsField(url,data,that,title){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	if(title=="parallel"){
              		that.fetch();
              	}else{
              		that.fetch();
              	}
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
              that.changeVisible = false;
            }
        })
    },
    MeetingplaceDelGoods(url,data,that,title){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	if(title=="parallel"){
              		that.fetch();
              	}else{
              		that.fetch();
              	}
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
    MeetingplaceGetGoodsInfo(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){            		
              	var jsonData = result.data;
        		that.goodsDetailObj = jsonData;
        		if(jsonData.limit_reach){
        			that.ruleForm.limit_reach = jsonData.limit_reach;
        		}
        		that.regionArr  = jsonData.region.split(',');
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