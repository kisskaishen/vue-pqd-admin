<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/business_management/business_listings";
</style>
<template>
 <div class="business_listings">
	<breadcrumb :content="content_title"></breadcrumb>
	<div class="container">
		<div class="search_admin_list_table">
			<div class="search_admin_list_table_title">
				<span>
					商品详情
				</span>
			</div>
			<div class="table_list">
			  <el-tabs v-model="activeName">
			    <el-tab-pane label="通用信息" name="first">
					<div class="current_system">
						<div class="warp">
							<table class="show_list_table_info" border="0" cellspacing="" cellpadding="">
								<tbody>
									<tr>
										<td>商品名称：</td>
										<td>
											<el-input v-model="googsDetail.goods_name" placeholder="请输入内容"></el-input>
										</td>
									</tr>
									<tr>
										<td>商品简介：</td>
										<td>
											<div class="width-120-warp">
													<el-input
													  type="textarea"
													  :rows="2"
													  placeholder="请输入内容"
													  v-model="googsDetail.goods_remark">
													</el-input>
											</div>
										</td>
									</tr>
									<tr>
										<td>商品分类：</td>
										<td>
											<div class="select_thirty">
												<div class="width_120_warp">
												    <el-cascader
												    	@change="getCategory()"
												    	v-model = "googsDetail.cate_related"
												    	:show-all-levels="false"
													    placeholder="试试搜索：指南"
													    :options="optionsCategory"
													    filterable
													  ></el-cascader>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>商户名：</td>
										<td>
											<div class="select_thirty">
												<div class="width_120_warps" style="width:200px">
												    <el-input disabled v-model="googsDetail.store_name" placeholder="商户名"></el-input>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>单独售价：</td>
										<td>
											<div class="width-120-warp">
												<div class="width-120">
													<el-input v-model="googsDetail.shop_price" placeholder="请输入内容"></el-input>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>团购售价：</td>
										<td>
											<div class="width-120-warp">
												<div class="width-120">
													<el-input v-model="googsDetail.prom_price" placeholder="请输入内容"></el-input>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>开团人数：</td>
										<td>
											<div class="width-120-warp">
												<div class="width-120">
													<el-input v-model="googsDetail.prom" placeholder="请输入内容"></el-input>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>库存数量：</td>
										<td>
											<div class="width-120-warp">
												<div class="width-120">
													<el-input v-model="googsDetail.store_count" placeholder="请输入内容"></el-input>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>商品列表主图：</td>
										<td>
											<up-load :explain="componentExplain1" @deleteBig="originalImgFun" :imageArr='googsDetail.original_img' :upLoadData='original_img_data' :goodsId='goods_id' :type = 'original_img_type'></up-load>
										</td>
									</tr>
									<tr>
										<td>商品列表副图：</td>
										<td>
											<up-load :explain="componentExplain2" @deleteBig="originalImgFun" :imageArr='googsDetail.list_img' :upLoadData='list_img_data' :goodsId='goods_id' :type = 'list_img_type'></up-load>
										</td>
									</tr>
									<tr>
										<td>商品轮播图：</td>
										<td>
											<up-load :explain="componentExplain3" @deleteBig="originalImgFun" :imageArr='googsDetail.sowing_images' :upLoadData='slider_img_data' :goodsId='goods_id' :type = 'slider_img_type'></up-load>
										</td>
									</tr>
									<tr>
										<td>商品详情：</td>
										<td>
											<up-load :explain="componentExplain4" @deleteBig="originalImgFun" :imageArr='googsDetail.goods_images' :upLoadData='details_img_data' :goodsId='goods_id' :type = 'details_img_type'></up-load>
										</td>
									</tr>
								</tbody>
							</table>
							<table class="show_list_table_product" border="0" cellspacing="" cellpadding="">
								<tbody>
									<tr>
										<td colspan="1">商品规格</td>
										<td></td>
									</tr>
									<tr>
										<td>{{specone.name}}</td>
										<td>
											 <!--@click="showList(item_1,item_1.checked,item_1.name)"
											  @click="showList(item_2,item_2.checked,item_2.name)"-->
											<span class="category" v-for="item_1 in specone.items">
										  		<span class="checked" :class="{ active: item_1.checked }">{{item_1.name}}</span>
										  	</span>
										</td>
									</tr>
									<tr v-show="spectwo.name">
										<td>{{spectwo.name}}</td>
										<td>
											<span class="category" v-for="item_2 in spectwo.items">
										  		<span class="checked" :class="{ active: item_2.checked }">{{item_2.name}}</span>
										  	</span>
										</td>
									</tr>
								</tbody>
							</table>
							<table class="show_list_table_info" border="0" cellspacing="" cellpadding="">
								<tbody>
									<tr>
										<td>规格key</td>
										<td>{{specone.name}}</td>
										<td v-show="spectwo.name">{{spectwo.name}}</td>
										<td>单买价格</td>
										<td>团购价格</td>
										<td>库存</td>
										<td>SKU图</td>
										<td>上下架状态</td>
										<td>操作</td>
									</tr>
									<tr v-for="(item,index) in spec_goods.items" v-show="item.checked">
										<td>{{item.key}}</td>
										<td>{{item.specone_name}}</td>
										<td v-show="spectwo.name">{{item.spectwo_name}}</td>
										<td><el-input v-model="item.price" placeholder="请输入内容"></el-input></td>
										<td><el-input v-model="item.prom_price" placeholder="请输入内容"></el-input></td>
										<td><el-input v-model="item.store_count" placeholder="请输入内容"></el-input></td>
										<td>
											<up-load :keys = 'index' @deleteBig="originalImgFun" :imageArr='item.img' :upLoadData='good_sku_img_data' :goodsId='goods_id' :type = 'good_sku_img_type'></up-load>
										</td>
										<td>{{item.is_on_sale=='1' ? "上架" : "下架"}}</td>
										<td>
				                        	<el-button type="text" @click="operateTheGoods(item)">{{item.is_on_sale=='1' ? "下架" : "上架"}}</el-button>
				                      	</td>
									</tr>
								</tbody>
							</table>
							<div class="height_32_table_bottom">
								<el-button type="danger" @click="saveList()">保存</el-button>
							</div>
						</div>
					</div>
			    </el-tab-pane>
			    <!--<el-tab-pane label="商品轮播图" name="second">
			    	<table class="show_list_table" border="0" cellspacing="" cellpadding="">
			    		<tbody>
			    			<tr>
			    				<td>上传</td>
			    			</tr>
			    			<tr>
			    				<td><span>点 + 号上传轮播图，尺寸为：640px * 400px（宽 * 高）, 或为正方型图片1：1长宽比例（长、宽不得小于600，不大于800，且上传多张图的，大小规格需一致。）</span></td>
			    			</tr>
			    		</tbody>
			    	</table>
						<div class="height_32_table_bottom">
							<el-button type="danger">保存</el-button>
						</div>
			    </el-tab-pane>
			    <el-tab-pane label="商品详情" name="third">商品详情</el-tab-pane>-->
			  </el-tabs>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import Goods from '../../js/list_of_goods.js';
import upLoad from '../../components/upLoad';
const cityOptions = ['上海', '北京', '广州', '深圳'];
 export default {
   data () {
     return {
        componentExplain4:[
          {
            value:"商品详情图，要求明细：",
          },{
            value:"a.尺寸宽度最大1500px",
          },{
            value:"b.尺寸高度最大1500px",
          },{
            value:"c.文件大小控制在1M以内",
          },{
            value:"d.数量限制在20张之内",
          }
        ],
        componentExplain3:[
          {
            value:"商品轮播图，要求明细：",
          },{
            value:"a.第一张为主轮播图",
          },{
            value:"b.数量限制在10张以内",
          },{
            value:"c.大小为1M以内",
          },{
            value:"d.尺寸为宽高不低于600px的正方形图片",
          }
        ],
        componentExplain2:[
          {
            value:"类目主图，要求明细：",
          },{
            value:"a.尺寸为400X400",
          },{
            value:"b.大小为120k以内",
          },{
            value:"c.尽量保持主图饱满美观实物展现",
          },{
            value:"d.图片可以添加品牌相关文字或logo",
          }
        ],
        componentExplain1:[
          {
            value:"首页推荐图，要求明细：",
          },{
            value:"a.尺寸为750X352",
          },{
            value:"b.大小为100k以内",
          },{
            value:"c.图片背景为纯白底，商品图案居中显示",
          },{
            value:"d.图片可以添加品牌相关文字或logo",
          }
        ],
     	optionsCategory:[],
     	spec_goods_price:{},
     	selectedOptions:[],
     	original_img_data:{
     		type:"originalImg"
     	},
     	original_img_type:"originalImg",
     	list_img_data:{
     		type:"listImg"
     	},
     	list_img_type:"listImg",
     	slider_img_data:{
     		type:"sliderImg"
     	},
     	slider_img_type:"sliderImg",
     	details_img_data:{
     		type:"detailsImg"
     	},
     	details_img_type:"detailsImg",
     	good_sku_img_data:{
     		type:"goodSkuImg"
     	},
     	good_sku_img_type:"goodSkuImg",
     	checkboxGroup1: ['上海'],
        cities: cityOptions,
     	optionsData:[],
     	spectwo:{},
     	specone:{},
     	spec_goods:{},
     	goods_id:'',
     	activeName: 'first',
     	googsDetail:{},
		content_title:{
			title1: "商品列表",
			title2: "",
			path1:'/home/commodityManagement/listOfGoods',
			path2:''
		},
		title:''
     }
   },
   created(){
 	      var token = localStorage.getItem("token");
 	      if(token){
 	        this.original_img_data.Authorization = token;
 	        this.list_img_data.Authorization = token;
   	      this.slider_img_data.Authorization = token;
   	      this.details_img_data.Authorization = token;
   	      this.good_sku_img_data.Authorization = token;
 	      }
   		this.goods_id = this.$route.query.id;
   		this.title = this.$route.query.title;
		var data = {
			 goods_id:this.goods_id
		}
		Goods.GoodsgetCate("goods/getCate",data,this);
		/* 商品详情 goods/info  */
		Goods.goodsdetail("goods/info",data,this);
   },
   components: {
		breadcrumb,upLoad
   },
   methods:{
   	operateTheGoods(params){
// 		item.is_on_sale
   		var isOnSal = params.is_on_sale;
        this.$confirm('此操作将操作商品上下架,需要保存才能生效， 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	if(isOnSal=='1'){
        		params.is_on_sale='0'
        	}else if(isOnSal=='0'){
        		params.is_on_sale='1'
        	}
          this.$message({
            type: 'success',
            message: '成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
   	},
   	saveList(){
   		var is_haitao_id;
   		if(this.googsDetail.is_haitao_goods){
   			is_haitao_id = this.googsDetail.cate_related[1];
   		}else{
   			is_haitao_id = this.googsDetail.cate_related[2];
   		}
   		var data = {
   			goods_id:this.goods_id,
   			goods_name:this.googsDetail.goods_name,
   			goods_remark:this.googsDetail.goods_remark,
   			cat_id:is_haitao_id,
   			store_id:this.googsDetail.store_id,
   			shop_price:this.googsDetail.shop_price,
   			prom_price:this.googsDetail.prom_price,
   			prom:this.googsDetail.prom,
   			original_img:this.googsDetail.original_img,
   			list_img:this.googsDetail.list_img,
   			store_count:this.googsDetail.store_count,
   			is_special:this.googsDetail.is_special,
   			haitao_cat:this.googsDetail.haitao_cat,
   			exclusive_cat:this.googsDetail.exclusive_cat,
   			specone:this.googsDetail.specone,
   			spectwo:this.googsDetail.spectwo,
   			edittime:this.googsDetail.edittime,
   			sowing_images:this.googsDetail.sowing_images,
   			goods_images:this.googsDetail.goods_images,
   			spec_goods_price:this.googsDetail.spec_goods_price,
   		}
   		Goods.editGoodsDetail("goods/edit",data,this,this.title)
   	},
   	originalImgFun(val){
   			console.log(val)
   			if(val[1]=='originalImg'){
   				if(val[2]=='delete'){
   					this.googsDetail.original_img = '';
   				}else{
   					this.googsDetail.original_img = val[0];
   				}
   			}else if(val[1]=='listImg'){
   				if(val[2]=='delete'){
   					this.googsDetail.list_img = '';
   				}else{
   					this.googsDetail.list_img = val[0];
   				}
   			}else if(val[1]=='sliderImg'){
   				if(val[2]=='delete'){
   					this.googsDetail.sowing_images.splice(val[3],1)
   				}else{
   					this.googsDetail.sowing_images = val[0];
   				}
   			}else if(val[1]=='detailsImg'){
   				if(val[2]=='delete'){
   					this.googsDetail.goods_images.splice(val[3],1)
   				}else{
   					this.googsDetail.goods_images = val[0];
   				}
   			}else if(val[1]=='goodSkuImg'){
   				var strData = this.spec_goods.items;
   				var keys = val[3];
   				if(val[2]=='delete'){
   					strData[keys].img = '';
   				}else{
   					strData[keys].img = val[0];
   				}
   			}
   	},
   	showList(data,checked,specone_name){
   		var jsonData = this.spec_goods.items;
		var dataone = this.specone.items;
		var datatwo = this.spectwo.items;

		if(data.checked == true){
			data.checked = false;
		}else{
			data.checked = true;
		}
		var count = [0,0];
		for(i in dataone){
			if(dataone[i].checked){
				count[0]++;
			}
		}
		if(count[0] == 0){
			data.checked = true;
			return ;
		}


		for(var i = 0;i<jsonData.length;i++){
			jsonData[i].checked = false;
		}
		if(datatwo.length!=0){
			for(i in datatwo){
				if(datatwo[i].checked){
					count[1]++;
				}
			}
			console.log(count)
			if(count[1] == 0){
				data.checked = true;
				return ;
			}
	   		for (var j = 0;j<dataone.length;j++) {
	 				if(!dataone[j].checked){
	 					continue;
	 				}
				for (var k = 0;k<datatwo.length;k++) {
					if(!datatwo[k].checked){
						continue;
					}
					for(var i = 0;i<jsonData.length;i++){
						if(dataone[j].id==jsonData[i].specone_key&&datatwo[k].id==jsonData[i].spectwo_key){
							jsonData[i].checked = true;
						}
					}
				}
	   		}
		}else{
	   		for (var j = 0;j<dataone.length;j++) {
 				if(!dataone[j].checked){
					console.log(!dataone[j].checked)
 					continue;
 				}
				for(var i = 0;i<jsonData.length;i++){
					if(dataone[j].id==jsonData[i].specone_key){
						jsonData[i].checked = true;
					}
				}
	   		}
		}
   	},
   	getCategory(val){

   	},
      handleClick(tab, event) {
        console.log(tab, event);
      }
   }
 }
</script>
