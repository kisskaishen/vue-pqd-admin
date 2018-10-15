import api from './ajax';
export default {
    journalList(url,data,that){
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
    searchConf(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
				that.logLevelOption = jsonData.log_level;
              }
            }
        })
    },
}