import api from './ajax';
export default {
    remitMoney(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.dialogVisible = false;
              	 var datas = {
		   			status:that.form.status,
					withdrawal_number:that.form.withdrawal_number,
					store_name:that.form.store_name,
					store_id:that.form.store_id,
					withdrawal_code:that.form.withdrawal_code,
					withdrawal_type:that.form.withdrawal_type,
					start_time_withdrawal:that.form.start_time_withdrawal,
					end_time_withdrawal:that.form.end_time_withdrawal,
					start_time_audit:that.form.start_time_withdrawal,
					end_time_audit:that.form.end_time_withdrawal,
					is_export:that.form.is_export,
		   		}
				self.getWithdrawalList("Withdraw/withdrawalList",datas,that);
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
    listStatus(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
				that.optionsListStatus = result.data; 
              }
            }
        })
    },
    getWithdrawalStatistics(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
              	that.count.pass_audit = jsonData.pass_audit;
              	that.count.remittance = jsonData.remittance;
              	that.count.wait_audit = jsonData.wait_audit;
              	that.count.wait_pay_withdrawal = jsonData.wait_pay_withdrawal;
              	
              }
            }
        })
    },
    getStatistics(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				that.account4 = result.data;
              }
            }
        })
    },
    getWithdrawalList(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
              	that.tableData = jsonData.list;
              	that.totals = jsonData.total;
              	that.count.total_withdrawal_money = jsonData.statistics.total_withdrawal_money;
              	that.tableData1 = [];
              	that.totals1 = 0;
              }
            }
        })
    },
    getBalancepaymentList(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
              	that.tableData1 = jsonData.list;
              	that.tableData = [];
              	that.totals = 0;
              	that.totals1 = jsonData.total;
              }
            }
        })
    },
    Storepoconfirmwithdrawalorderlist(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	var jsonData = result.data;
              	that.gridData = jsonData.list;
				that.totals2 = jsonData.total;
   				that.dialogTableVisible = true;
              }
            }
        })
    },
    withdrawalOrderList(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
              	that.tableDataDialog = jsonData.list;
              	that.totalsDialog = jsonData.total;
				that.dialogFormVisible = true;
              }
            }
        })
    },
    subWithdrawAudit(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.dialogFormVisible = false;
          		var datas = {
					page:that.currentPage,
					rows:that.pageSize,
				}
				self.getWithdrawalList("Withdraw/withdrawalList",datas,that);
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
    }
}