import api from './ajax';
export default {
    secondsKillGoodsList(url,data,that){
    	/* 活动管理-0.1秒杀-商品列表  Secondbuy/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
				var jsonData = result.data;
//            	that.optionsDate = jsonData.day;
//            	that.optionsTime = jsonData.time;
              }
            }
        })
    },
    timeConf(url,that){
    	/* 活动管理-0.1秒杀-商品列表  Secondbuy/list */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
				var jsonData = result.data;;
              	that.optionsDate = jsonData.day;
              	that.optionsDate.unshift({key:'',value:'全部'});
              	that.optionsTime = jsonData.time;
              	that.optionsTime.unshift({key:'',value:'全部'});
              }
            }
        })
    },
    Secondbuy(url,data,that){
    	/* 活动管理-0.1秒杀-商品列表  Secondbuy/list */
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
    searchGoods(url,data,that){
    	/* 活动管理-0.1秒杀-商品列表  Secondbuy/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
				var jsonData = result.data;
              	that.tableData = jsonData.list;
              	that.totals = jsonData.total;
              	that.multipleSelection = that.tableDataDialog;
		   		that.dialogVisible = true;
				var rows = that.tableDataDialog;
		   		if (rows) {
		          rows.forEach(row => {
		            that.$refs.multipleTable.toggleRowSelection(row,true);
		          });
		        } else {
		          that.$refs.multipleTable.clearSelection();
		        }
              }
            }
        })
    },
    SecondbuyDel(url,data,that,params,str){
    	/* 活动管理-0.1秒杀-商品列表  Secondbuy/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	if(str=='del'){
              		that.removeObjWithArr(that.tableData,params)
              	}
              	that.$message({
              		type: 'success',
            		message: result.msg
              	})
              }else{
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    SecondbuyAdd(url,data,that){
    	/* 活动管理-0.1秒杀-商品列表  Secondbuy/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	that.$message({
              		type: 'success',
            		message: result.msg
              	})
              }else{
              	that.$message({
              		type: 'info',
            		message: result.msg
              	})
              }
            }
        })
    },
    isEqual(a,b){
    	  //如果a和b本来就全等
  if(a===b){
    //判断是否为0和-0
    return a !== 0 || 1/a ===1/b;
  }
  //判断是否为null和undefined
  if(a==null||b==null){
    return a===b;
  }
  //接下来判断a和b的数据类型
  var classNameA=toString.call(a),
    classNameB=toString.call(b);
  //如果数据类型不相等，则返回false
  if(classNameA !== classNameB){
    return false;
  }
  //如果数据类型相等，再根据不同数据类型分别判断
  switch(classNameA){
    case '[object RegExp]':
    case '[object String]':
    //进行字符串转换比较
    return '' + a ==='' + b;
    case '[object Number]':
    //进行数字转换比较,判断是否为NaN
    if(+a !== +a){
      return +b !== +b;
    }
    //判断是否为0或-0
    return +a === 0?1/ +a === 1/b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
    return +a === +b;
  }
  //如果是对象类型
  if(classNameA == '[object Object]'){
    //获取a和b的属性长度
    var propsA = Object.getOwnPropertyNames(a),
      propsB = Object.getOwnPropertyNames(b);
    if(propsA.length != propsB.length){
      return false;
    }
    for(var i=0;i<propsA.length;i++){
      var propName=propsA[i];
      //如果对应属性对应值不相等，则返回false
      if(a[propName] !== b[propName]){
        return false;
      }
    }
    return true;
  }
  //如果是数组类型
  if(classNameA == '[object Array]'){
    if(a.toString() == b.toString()){
      return true;
    }
    return false;
  }
    }
}