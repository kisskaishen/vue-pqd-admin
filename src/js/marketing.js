import api from '../js/ajax';
export default {
	orderDetail(url,data,that){
    	/* 订单详情 order/detail */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == 200){
              	var jsonData = result.data;
				that.activity = jsonData.activity;
				that.activity_log = jsonData.activity_log;
				that.address = jsonData.address;
				that.goods_info = jsonData.goods_info;
              }else{
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    userHelpList(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
	                var jsonData = result.data;
	                that.examineData3 = jsonData.list;
	                that.total3 = jsonData.total;
            	}
            }
        })
    },
    storeDelGoods(url,data,that,params){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		that.removeObjWithArr(that.examineData,params)
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
    marketingList(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code==200){
	                var jsonData = result.data;
	                that.activeInfoData = jsonData.list;
	                that.total = jsonData.total;
            	}
            }
        })
    },
    activeInfo(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		var jsonDatas = result.data;
	                that.ruleForm = jsonDatas;
	                that.limitData = jsonDatas.limit;
	                that.data3 = jsonDatas.category;
	                that.ruleForm.sTime1 = jsonDatas.activity_start_time;

	                var sTime1 = jsonDatas.enter_start_time;
	                var newDateSTime1 = new Date(sTime1*1000);
	                that.ruleForm.sTime1 = newDateSTime1.format('yyyy-MM-dd');

	                var eTime1 = jsonDatas.enter_end_time;
	                var newDateSTime1 = new Date(eTime1*1000);
	                that.ruleForm.eTime1 = newDateSTime1.format('yyyy-MM-dd');

	                var sTime2 = jsonDatas.activity_start_time;
	                var newDateSTime2 = new Date(sTime2*1000);
	                that.ruleForm.sTime2 = newDateSTime2.format('yyyy-MM-dd');

	                var eTime2 = jsonDatas.activity_end_time;
	                var newDateSTime2 = new Date(eTime2*1000);
	                that.ruleForm.eTime2 = newDateSTime2.format('yyyy-MM-dd');

	                if(jsonDatas.rule_category_ids==""){
	                	that.selectData = [];
	                }else{
	                	that.selectData = jsonDatas.rule_category_ids.split(',');
	                }
            	}
            }
        })
    },
    activeGoodsList(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
	                var jsonData = result.data;
	                that.examineData = jsonData.list;
	                that.total = jsonData.total;
            	}
            }
        })
    },
    Goodscategory(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code==200){
	               that.options1 = result.data;
	               that.data3 = result.data;
            	}
            }
        })
    },
    auditGoodsInfo(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		var jsonData = result.data;
            		that.goodsDetailObj = jsonData;
            		if(jsonData.limit_reach){
            			that.ruleForm.limit_reach = jsonData.limit_reach;
	            		that.ruleForm.desc = jsonData.last_audit_desc;
									that.ruleForm.audit_status = jsonData.audit_status;
            		}
								if(jsonData.region!=''){
	            		that.regionArr  = jsonData.region.split(',');
								}else{
	            		that.regionArr  = [];
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
    auditGoods(url,data,that,title){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		that.show_btn = false;
            		that.$message({
            			type:'success',
            			message:result.msg
            		})
            		if(title=="marketing_goods"){
            			that.$router.push({ path:"/home/marketing/marketing_detail",query:{activity_id:data.activity_id}})
            		}else{
            			that.$router.push({ path:"/home/marketing/resource_activity_detail?activity_id=3&action=promotion"})
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
    handleUpdateActive(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		that.dialogVisible = false;
            		that.$router.push({path:'/home/marketing/marketing_active'})
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
    activeGoodsSetTop(url,data,that,datas){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		that.removeObjWithArr(that.examineData,datas);
            		that.examineData.unshift(datas)
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
    activeGoodsSetBottom(url,data,that,datas){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		that.removeObjWithArr(that.examineData,datas);
            		that.examineData.push(datas)
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
}
