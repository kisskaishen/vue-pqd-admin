import api from '../js/ajax';
export default {
storeBalanceHistory(url,data,that){
		api.commonAjax({
					method:"post",
					url:url,
					data:data,
					success:function(result){
						if(result.code==200){
							var jsonData = result.data;
							console.log(jsonData)
							that.tableData = jsonData.list;
							that.totals = jsonData.total;
						}
					}
			})
},
	storeBalanceSearchStatus(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code==200){
            		var jsonData = result.data;
								that.is_paymentOptions = jsonData.is_payment;
								that.pay_codeOptions = jsonData.withdrawal_payment_type;
            	}
            }
        })
	},
	FundmanagementOrderInfo(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		var jsonData = result.data;
            		that.order_goodsInfo = jsonData.goodsInfo;
            		that.order_logisticInfo = jsonData.logisticInfo;
            		that.order_orderInfo = jsonData.orderInfo;
            		that.order_storeInfo = jsonData.storeInfo;
            	}
   				that.dialogVisible = true;
            }
        })
	},
	FundmanagementOrderServiceInfo(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		var jsonData = result.data;
            		that.order_goodsInfo = jsonData.goodsInfo;
            		that.order_logisticInfo = jsonData.logisticInfo;
            		that.order_orderInfo = jsonData.orderInfo;
            		that.order_storeInfo = jsonData.storeInfo;
            	}
   				that.dialogVisible = true;
            }
        })
	},
	platformMoneyStatistics(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code==200){
            		var jsonData = result.data;
            		that.total_expenses_money = jsonData.total_expenses_money;
            		that.total_sales_money = jsonData.total_sales_money;
            	}
            }
        })
	},
    storePaymentOrderList(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		var jsonData = result.data;
            		if(result.data.length==0){
            			that.tableData1 = [];
            			that.statistics1.total_receivable_money = 0;
            			that.statistics1.total_return_money = 0;
	            		that.totals1 = 0;
            		}else{
	            		that.tableData1 = jsonData.list;
	            		that.totals1 = jsonData.total;
	            		that.statistics1 = jsonData.statistics;
            		}
            	}
            }
        })
    },
    orderTransactionStatus(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code==200){
            		that.the_raiseOption = result.data;
            	}
            }
        })
    },
    orderServiceList(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		if(result.data.length==0){
            			that.tableData2 = [];
	            		that.totals2 = 0;
            		}else{
	            		var jsonData = result.data;
	            		that.tableData2 = jsonData.list;
	            		that.totals2 = jsonData.total;
	            		that.statistics2 = jsonData.statistics;
            		}
            	}
            }
        })
    },
    withdrawHistory(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
	                var jsonData = result.data;
	                that.tableData3 = jsonData.list;
	                that.totals3 = jsonData.total;
            	}
            }
        })
    },
    withdrawalStatistics(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code==200){
	                var jsonData = result.data;
	                that.activeInfoData = jsonData.list;
            	}
            }
        })
    },
    withdrawalList(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
	                var jsonData = result.data;
	                that.tableData = jsonData.list;
	                that.totals = jsonData.total;
            	}
            }
        })
    },
    BalancepaymentList(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
	                var jsonData = result.data;
						that.tableData = jsonData.list;
						that.totals = jsonData.total;
            	}
            }
        })
    },
    storeSearchConf(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code==200){
	                 var jsonData = result.data;
            		that.store_status = jsonData.status;
            		that.store_status.unshift({label:'全部',name:''})

            		that.store_type = jsonData.type;
            		that.store_type.unshift({label:'全部',name:''})
            	}
            }
        })
    },
    StoredepositSearchConf(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code==200){
	                 var jsonData = result.data;
            		that.status_typeOption = jsonData.pay_code;
            		that.store_status.unshift({label:'全部',name:''})
            	}
            }
        })
    },
    searchConf(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code==200){
	                 var jsonData = result.data;
            		that.is_paymentOptions = jsonData.is_payment;
            		that.is_paymentOptions.unshift({label:'全部',name:''})

            		that.pay_codeOptions = jsonData.pay_code;
            		that.pay_codeOptions.unshift({label:'全部',name:''})

            		that.payment_typeOptions = jsonData.payment_type;
            		that.payment_typeOptions.unshift({label:'全部',name:''})

            		that.searchList = jsonData.list;
            	}
            }
        })
    },
    countInfo(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
	                that.incomeExpenditure = result.data;
            	}
            }
        })
    },
    returnStatus(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code==200){
	                that.the_raiseOptionReturn = result.data;
            	}
            }
        })
    },
    withdrawalAuditStatus(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code==200){
	                that.the_raiseOptionPresent = result.data;
            	}
            }
        })
    },
    countInfo5(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
	                that.total_deposit_price = result.data.total_deposit_price;
            	}
            }
        })
    },
    Storedeposit(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		var jsonData = result.data;
            		that.StoredepositData = jsonData.list;
            		that.totals5 = jsonData.total;
            	}
            }
        })
    },
    Storepunishment(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		var jsonData = result.data;
            		that.Storepunishment = jsonData.list;
            		that.totals4 = jsonData.total;
            	}
            }
        })
    },
    storeMoneyStatistics(url,that){
    	api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
            	if(result.code==200){
//          		var jsonData = result.data;
            	}
            }
        })
    },
}
