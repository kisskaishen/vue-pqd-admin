import api from './ajax';
export default {
    lastOrder(url,data,that){
    	/* 专场分类列表  Exclusive/list */
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
    storeList(url,data,that){
    	/* 专场分类列表  Exclusive/list */
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
    orderClass(url,that){
    	/* 专场分类列表  Exclusive/list */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
              	that.orderstatus = jsonData.order_status;
              }
            }
        })
    },
}