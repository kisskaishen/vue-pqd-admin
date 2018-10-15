import api from './ajax';
export default {
    serviceSearchConf(url,that){
    	/* 订单列表 Order/list */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
				that.service_type = jsonData.service_type;
				that.service_type.unshift({label:"全部", value:''})

				that.is_apply = jsonData.is_apply;
				that.is_apply.unshift({label:"全部", value:''})
              }
            }
        })
    },
    orderList(url,data,that){
    	/* 订单列表 Order/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
				var jsonData = result.data;
				if(jsonData.type==0){
	              	that.tableData = jsonData.list;
	              	that.prev_id = jsonData.prev_id;
	              	that.next_id = jsonData.next_id;
	              	that.type = jsonData.type;
				}else if(jsonData.type==1){
					that.tableData = jsonData.list;
					that.$message({
					    type: 'success',
		        		message: '已经最后一页'
		   			})
				}else if(jsonData.type==-1){
					that.tableData = jsonData.list;
					that.$message({
					    type: 'info',
		        		message: '已经第一页'
		   			})
				}
              }
            }
        })
    },
    serviceList(url,data,that){
    	/* 售后订单列表 Order/serviceList */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
				if(jsonData.type==0){
	              	that.tableData = jsonData.list;
	              	that.prev_id = jsonData.prev_id;
	              	that.next_id = jsonData.next_id;
	              	that.type = jsonData.type;
				}else if(jsonData.type==1){
					that.tableData = jsonData.list;
					that.$message({
					    type: 'info',
		        		message: '已经最后一页'
		   			})
				}else if(jsonData.type==-1){
					that.tableData = jsonData.list;
					that.$message({
					    type: 'info',
		        		message: '已经第一页'
		   			})
				}
              }
            }
        })
    },
    orderDetail(url,data,that){
    	/* 订单详情 order/detail */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == 200){
              	var jsonData = result.data;
				that.order_info = jsonData.order_info;
				that.shipping_info = jsonData.shipping_info;
				that.goods_list = jsonData.goods_list;
				that.action_log = jsonData.action_log;
				that.store_info = jsonData.store_info;
				that.group_info = jsonData.group_info;
				that.return_info_list = jsonData.return_info_list;
;
              }else{
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    addPunishment(url,data,that){
    	/* 订单详情 order/detail */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == 200){
				that.dialogFormVisible = false;
              	that.$message({
              		type: 'success',
            		message: result.msg
              	})
              	that.$router.push({path:"/home/orderManagement/orderList"})
              }else{
				that.dialogFormVisible = false;
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    handleService(url,data,that,index){
    	/* 平台处理申诉订单 Order/handleService */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
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
              	})
              }
            }
        })
    },
    handleServiceOrder(url,data,that){
    	/* 平台处理申诉订单 Order/handleService */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				that.dialogVisible = false;
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
    preExport(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	var count = result.data.total_page;
				 if(count!=0){
	      			var data = {
						consignee:that.consignee,
			   			order_sn:that.order_sn,
			   			add_time_map:that.add_time_map,
			   			pay_code:that.pay_code,
			   			order_status:that.order_status,
			   			shipping_status:that.shipping_status,
			   			pay_status:that.pay_status,
			   			order_class:that.order_class,
			   			group_status:that.group_status,
			   			order_service:that.order_service,
			   			store_name:that.store_name,
			   			store_id:that.store_id,
			   			goods_id:that.goods_id,
			   			export:0,
			   			page:1,
			   			page_index:""
				 	}
				 	self.preExports("Order/export",data,that);
				 }
              }else{
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    preExports(url,data,that){
    	var self = this;
    	/* 平台处理申诉订单 Order/handleService */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var next_page = result.data.next_page;
				var countStr = result.data.page_index;
				if(countStr!=''){
						var data = {
							consignee:that.consignee,
				   			order_sn:that.order_sn,
				   			add_time_map:that.add_time_map,
				   			pay_code:that.pay_code,
				   			order_status:that.order_status,
				   			shipping_status:that.shipping_status,
				   			pay_status:that.pay_status,
				   			order_class:that.order_class,
				   			group_status:that.group_status,
				   			order_service:that.order_service,
				   			store_name:that.store_name,
				   			store_id:that.store_id,
				   			goods_id:that.goods_id,
				   			export:0,
				   			page:next_page,
				   			page_index:countStr
					 	}
				 	 	self.preExports("Order/export",data,that);
				}else{
					var token = localStorage.getItem("token");
					window.location.href = that.headerCommon+"/Order/export?export=1&Authorization="+token;
				}
              }else{
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    preExportss(url,data,that){
    	/* 平台处理申诉订单 Order/handleService */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){

              }else{
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    manualReturnMoneyList(url,data,that){
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
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
}
