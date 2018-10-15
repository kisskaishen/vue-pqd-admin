import api from './ajax';
export default {
    getLabelList(url,data,that){
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
      getLabelConf(url,that){
          api.commonAjax({
              method:"post",
              url:url,
              success:function(result){
                if(result.code == '200'){
                    var jsonData = result.data;
                    that.typeOption = jsonData.type;
                    that.statusOption = jsonData.status;
  				       }
              }
          })
      },
        delLabel(url,data,that){
            api.commonAjax({
                method:"post",
                url:url,
                data:data,
                success:function(result){
                  if(result.code == '200'){
                        that.fetch();
        				          that.$message({
        				            type: 'success',
        				            message: result.msg
        				          });
    				       }else{
     				          that.$message({
     				            type: 'info',
     				            message: result.msg
     				          });
                   }
                }
            })
        },
        addLabel(url,data,that){
            api.commonAjax({
                method:"post",
                url:url,
                data:data,
                success:function(result){
                  if(result.code == '200'){
                          that.addLabelMarklDialogVisible = false;
                          that.fetch();
        				          that.$message({
        				            type: 'success',
        				            message: result.msg
        				          });
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
