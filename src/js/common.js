import api from '../js/ajax';

export default {
    editRemarkInfo(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                that.DialogEditRemark = false;
                that.tableData.store_note = that.editCustomerForm.editRemark;
            }
        })
    },
    getVerificationCode(){
        var verification = document.getElementsByClassName('verification')[0];
        var k = 60;
        var timers =  setInterval(function(){
            k--;
            if(k>0){
                // console.log(k)
                verification.innerHTML = '('+k+'s)后可重发';
            }else{
                // console.log(k)
                verification.innerHTML = '验证码';
                verification.removeAttribute("disabled");
                clearInterval(timers);
            }
        },1000)
    },
	searchConf(url,that){
	    api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
					var jsonData = result.data;
					that.pay_codeOption = jsonData.pay_code;
					that.pay_codeOption.unshift({label: "全部", value: ''})
					
					that.order_statusOption = jsonData.order_status;
					that.order_statusOption.unshift({label: "全部", value: ''})
					
					that.shipping_statusOption = jsonData.shipping_status;
					that.shipping_statusOption.unshift({label: "全部", value: ''})
					
					that.pay_statusOption = jsonData.pay_status;
					that.pay_statusOption.unshift({label: "全部", value: ''})
					
					that.order_classOption = jsonData.order_class;
					that.order_classOption.unshift({label: "全部", value: ''})
					
					that.group_statusOption = jsonData.group_status;
					that.group_statusOption.unshift({label: "全部", value: ''})
					
					that.order_serviceOption = jsonData.order_service;
					that.order_serviceOption.unshift({label: "全部", value: ''})
              }
            }
        })	
	},
}