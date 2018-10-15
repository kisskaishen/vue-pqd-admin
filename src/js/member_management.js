import api from './ajax';
export default {
    getMemberList(url,data,that){
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
              }
            }
        })
    },
    getMemberconf(url,that){
    	/* Store/getStoreList 商户列表*/
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
              	that.optionsStatus = jsonData.reg_type;
              	that.optionsTime = jsonData.reg_time;
              }
            }
        })
    },
}