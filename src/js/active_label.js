import api from './ajax';
export default {
    labelGoodst(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
                  that.$message({
                    type: 'success',
                    message: result.msg
                  });
                  that.$router.push({path:"/home/activityManagement/active_label"})
				       }else{
                   that.$message({
                     type: 'info',
                     message: result.msg
                   });
               }
            }
        })
    },
    batchShip(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
                    that.addTableData = result.data;
				       }
            }
        })
    },
    goodsList(url,data,that){
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
      labelSelect(url,data,that){
          api.commonAjax({
              method:"post",
              url:url,
              data:data,
              success:function(result){
                if(result.code == '200'){
                    that.labelName = result.data;
  				       }
              }
          })
      },
    getLabelListActivity(url,data,that){
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
                    that.labelNameOptions = jsonData.status;
                    that.labelTypeOption = jsonData.type;
                    that.selectLabelOption = jsonData.selectLabel;
  				       }
              }
          })
      },
        delGoodsLabel(url,data,that){
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
          delLabelSelect(url,data,that){
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
}
