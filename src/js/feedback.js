import api from '../js/ajax';

export default {
    feedbackList(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if(result.code==200){
                	var jsonData = result.data;
                   that.tableData = jsonData.list;
                   that.total = jsonData.total;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    searchConf(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if(result.code==200){
                    var  jsonData = result.data;
					that.msg_typeoptions = jsonData.msg_type;
					that.statusoptions = jsonData.status;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
}
