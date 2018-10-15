import api from './ajax';
export default {
    menuList(url,that){
    	/* Store/getStoreList 商户列表*/
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
					that.tableData = result.data;
              }else{
				that.$message({
		            type: 'info',
		            message: result.msg
		        });
              }
            }
        })
    },
}