import api from './ajax';
export default {
    Goodscategory(url,that,title){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
				        var jsonData = result.data;
                if(title=="quduoduo"){
                  that.goods_category = jsonData;
                }else{
                	that.tableData = jsonData;
                }
              }
            }
        })
    },
    twoLevelTree(url,data,that,tit){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	if(tit=='two'){
					that.optionsLevel = result.data;
					that.optionsLevel.unshift({name:'请选择商品分类',id:''})
              	}else{
					that.options = result.data;
					that.options.unshift({name:'顶级',id:'0'})
              	}
              }
            }
        })
    },
    addGoodscategory(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	that.dialogFormVisible = false;
				self.Goodscategory("Goodscategory/tree",that)
              	that.$message({
              		type:'success',
              		message:result.msg
              	})
              }else{
              	that.dialogFormVisible = false;
              	that.$message({
              		type:'info',
              		message:result.msg
              	})
              }
            }
        })
    },
    delGoodscategory(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				self.Goodscategory("Goodscategory/tree",that)
              	that.$message({
              		type:'success',
              		message:result.msg
              	})
              }else{
              	that.$message({
              		type:'info',
              		message:result.msg
              	})
              }
            }
        })
    },
}
