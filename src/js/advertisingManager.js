import api from './ajax';
export default {
    orderList(url,data,that){
    	/* 广告详情（内容） Ad/detail */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){

				}
            }
        })
    },
}