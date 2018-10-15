import api from '../js/ajax';
export default {
    Couponsend(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
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
    getCouponList(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
	                var jsonData = result.data;
	                that.tableDataDialog = jsonData.list;
	                that.totals = jsonData.total;
					that.dialogAddCoupon = true;
            	}else{
            		that.$message({
            			type:'info',
            			message:result.msg
            		})
            	}
            }
        })
    },
    getUser(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
	                var jsonData = result.data;
	                that.userListDialog = jsonData.list;
	                that.totalsUser = jsonData.total;
					that.dialogAddUser = true;
            	}else{
            		that.$message({
            			type:'info',
            			message:result.msg
            		})
            	}
            }
        })
    },
    insertCoupon(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		that.$router.push("/home/couponManager/coupon_issuance")
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
    updateCoupon(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		that.$router.push("/home/couponManager/coupon_issuance")
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
    toUpdateCoupon(url,data,that){
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		that.couponDetail = result.data;
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