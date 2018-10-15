import api from '../js/ajax';
export default {
    getActivityicon(url,data,that){
    	var jsonData = [];
    	api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                jsonData = result.data;
       			return jsonData
            }
        })
    }
}
