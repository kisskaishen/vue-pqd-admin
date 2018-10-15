import api from './ajax';
import Fruit from './fruit_of_quality.js';
import More from './more_interesting_strict.js';
export default {
    searchConf(url,that){
    	/* 今日统计  Statistics/list */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == 200){
              	var jsonData = result.data;
              	that.the_raise = jsonData.the_raise;
              	that.the_raise.unshift({label:'全部',value:''})

              	that.is_special = jsonData.is_special;
              	that.is_special.unshift({label:'全部',value:''})

              	that.is_on_sale = jsonData.is_on_sale;
              	that.is_on_sale.unshift({label:'全部',value:''})

              	that.haitao_cat = jsonData.haitao_cat;
              	that.haitao_cat.unshift({label:'全部',value:''})

              	that.goodstatus = jsonData.goodstatus;
              	that.goodstatus.unshift({label:'全部',value:''})

              	that.exclusive_cat = jsonData.exclusive_cat;
              	that.exclusive_cat.unshift({label:'全部',value:''})

              	that.is_audit = jsonData.is_audit
              	that.is_audit.unshift({label:'全部',value:99})

              	that.is_showOption = jsonData.is_show
              	that.is_showOption.unshift({label:'全部',value:''})

              	that.is_recommendOption = jsonData.is_recommend
              	that.is_recommendOption.unshift({label:'全部',value:''})
              }
            }
        })
    },
    saleType(url,that){
    	/* 今日统计  Statistics/list */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == 200){
              	var jsonData = result.data;
              	that.optionsSale = jsonData.type;
   				that.dialogVisibleSale = true;
              }
            }
        })
    },
    saleList(url,data,that){
    	/* 今日统计  Statistics/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == 200){
              	if(result.data.length==0){
					that.tableData = [];
					that.totals = 0;
              	}else{
	              	var jsonData = result.data;
					that.tableData = jsonData.list;
					that.totals = jsonData.total;
              	}
              }
            }
        })
    },
    operatorList(url,that){
    	/* 今日统计  Statistics/list */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == 200){
              	var jsonData = result.data;
              	that.optionsSaleOper = jsonData;
              }
            }
        })
    },
    updateGoodsSale(url,data,that){
    	/* 今日统计  Statistics/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == 200){
	              	that.saleForm.virtual_sales = '';
	              	that.saleForm.desc = '';
              		that.currentItem.virtual_sales = result.data.sale;
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
              that.dialogVisibleSale = false;
            }
        })
    },
    Goodscategory(url,that){
    	/* 今日统计  Statistics/list */
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == 200){
              	that.optionsCategory = result.data;
              }
            }
        })
    },
    GoodsgetCate(url,data,that){
    	/* 今日统计  Statistics/list */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == 200){
              	that.optionsCategory = result.data;
              }
            }
        })
    },
    editField(url,data,that,activeProduct){
    	/* 今日统计  Statistics/list */
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	if(activeProduct=='activeProduct'){
					var data = {
						page: that.currentPage,
						rows: that.pageSize,
						is_special: '12'
					}
					Fruit.ActivgoodsList("Activgoods/list", data, that);
              	}else if(activeProduct=='activeProduct1'){
				   	var data = {
				   		page:that.currentPage,
				   		rows:that.pageSize,
				   		is_special:'13'
				   	}
					Fruit.ActivgoodsList("Activgoods/list",data,that);
              	}else if(activeProduct=='activeProduct2'){
				   	var data = {
				   		page:that.currentPage,
				   		rows:that.pageSize,
				   		is_special:'13'
				   	}
					Fruit.ActivgoodsList("Activgoods/list",data,that);
              	}else if(activeProduct=='activeProductLine'){
				   	var data = {
				   		page:that.currentPage,
				   		rows:that.pageSize
				   	}
					Classification.GoodsspecialList("Goodsspecial/list",data,that);
              	}else if(activeProduct=='moreInterestingStrict'){
					var data = {
						page:1,
						rows:that.pageSize
					}
					More.Strict("Strict/list",data,that);
              	}else{
              		that.form.goods_id = '';
			   		var data = {
						page:that.currentPage,
						rows:that.pageSize,
			   			cat_id_map:that.selectedOptions2,
			   			store_name:that.form.store_name,
			   			goods_id:that.form.goods_id,
			   			is_on_sale:that.form.is_on_sale,
			   			key_word:that.form.key_word,
			   			goodstatus:that.form.goodstatus,
			   			the_raise:that.form.the_raise,
			   			is_special:that.form.is_special,
			   			exclusive_cat:that.form.exclusive_cat,
			   			haitao_cat:that.form.haitao_cat,
			   			is_audit:that.form.is_audit,
			   		}
			   		console.log(JSON.stringify(data))
					self.goodsList("goods/list",data,that);
              	}
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
   				that.dialogFormVisible = false;
   				that.dialogVisible = false;
            }
        })
    },
    goodsList(url,data,that){
    	/* 今日统计  Statistics/list */
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
    goodsDel(url,data,that,count){
    	/* 删除商品  goods/del */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	that.tableData.splice(count,1)
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
    goodsdetail(url,data,that,count){
    	var self = this;
    	/* 删除商品  goods/del */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
//          	console.log(JSON.stringify(result))
              if(result.code == '200'){
              	var jsonData = result.data;
				that.googsDetail = jsonData;
//				this.spec_goods_price = jsonData.spec_goods_price;
				var res = jsonData.spec_goods_price;
				that.spec_goods = res.spec_goods;
				that.specone = res.specone;
				that.spectwo = res.spectwo;
              }else{

              }
            }
        })
    },
//  Goodscategory(url,that){
//  	/* 删除商品  goods/del */
//      api.commonAjax({
//          method:"post",
//          url:url,
//          success:function(result){
//            if(result.code == '200'){
//				that.optionsData = result.data;
//            }else{
//
//            }
//          }
//      })
//  },
    delImage(url,data,that,index){
    	/* 删除商品  goods/del */
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
              if(result.code == '200'){
              	if(that.type=='originalImg'||that.type=='listImg'||that.type=="goodSkuImg"){
              		that.dataImageArr = '';
              	}else if(that.type=='sliderImg'||this.type=="detailsImg"){
              		that.dataImageArr.splice(index,1)
              	}
              	that.isShow = false;
              	that.strCount = true;
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
    editGoodsDetail(url,data,that,title){
    	var self = this;
    	/* 删除商品  goods/del */
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
		          if(title=="listOfGoods"){
		          	that.$router.push({path:"/home/commodityManagement/listOfGoods"})
		          }else if(title=="moreInterestingStrict"){
		          	that.$router.push({path:"/home/activityManagement/moreInterestingStrict"})
		          }else if(title=="lawSavingMoney"){
		          	that.$router.push({path:"/home/activityManagement/lawSavingMoney"})
		          }else if(title=="fruitQuality"){
		          	that.$router.push({path:"/home/activityManagement/fruitQuality"})
		          }else if(title=="excellentFurniture"){
		          	that.$router.push({path:"/home/activityManagement/excellentFurniture"})
		          }else if(title=="brandClearance"){
		          	that.$router.push({path:"/home/activityManagement/brandClearance"})
		          }
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
