import api from '../js/ajax';

export default {
    orderAuditSettle(url,data,that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if(result.code==200){
                  that.dialogVisible = false;
                    that.fetch();
                    that.$message({
                        type: "success",
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    orderOrderAudit(url,data,that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if(result.code==200){
                  that.dialogVisible = false;
                    that.fetch();
                    that.$message({
                        type: "success",
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    promotionListSavePromot(url,data,that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if(result.code==200){
                    that.dialogVisible = false;
                    that.fetch();
                    that.$message({
                        type: "success",
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    searchConfSettlement(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if(result.code==200){
                	var jsonData = result.data;
                  that.isPromPutStatus_option = jsonData.isPromPutStatus;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    searchConfExamine(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if(result.code==200){
                	var jsonData = result.data;
                  that.isPromCheckStatus_option = jsonData.isPromCheckStatus;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    Goodscategory(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if(result.code==200){
                	var jsonData = result.data;
                  that.optionsCategory = jsonData;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    searchConf(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if(result.code==200){
                	var jsonData = result.data;
                  that.is_coupon_option = jsonData.is_coupon;
                  that.is_promotion_option = jsonData.is_promotion;
                  that.status_option = jsonData.status;
                  that.couponTypeOption = jsonData.coupon_status;

                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    promotionList(url, data,that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if(result.code==200){
                	var jsonData = result.data;
                  that.tableData = jsonData.list;
                  that.totals = jsonData.total;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    savePromot(url, data,that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if(result.code==200){
                  that.fetch();
                    that.$message({
                        type: "success",
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    PromotiongoodsIndex(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.tableData = jsonData.list;
                    that.total = jsonData.total;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    getPromotionGoodsNum(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    getPromotionGoodsList(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    savePromotionGoods(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    promotionStatus(url,that){
    		api.commonAjax({
    					method:"post",
    					url:url,
    					success:function(result){
    						if(result.code==200){
                  var jsonData = result.data;
                  that.statusOption = jsonData.status;
    						}
    					}
    			})
    },
    promotionGoods(url,data,that){
    		api.commonAjax({
    					method:"post",
    					url:url,
              data:data,
    					success:function(result){
    						if(result.code==200){
                  var jsonData = result.data;
                  that.tableData = jsonData.list;
                  that.total = jsonData.total;
    						}
    					}
    			})
    },
    orderPromotionList(url, data,that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if(result.code==200){
                	var jsonData = result.data;
                  that.tableData = jsonData.list;
                  that.totals = jsonData.total;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    getTimeFundstatistics(url,that){
    		api.commonAjax({
    					method:"post",
    					url:url,
    					success:function(result){
    						if(result.code==200){
                  that.selectTimeOption = result.data;
    						}
    					}
    			})
    },
    couponList(url, data,that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if(result.code==200){
                	var jsonData = result.data;
                  that.tableData = jsonData.list;
                  that.totals = jsonData.total;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
}
