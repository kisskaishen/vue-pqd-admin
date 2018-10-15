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
					{{title}}广告
				</span>
			</div>
			<div class="order_detail_list">
				<div class="item_detail">
					<div class="order_detail_table">
						<div class="current_system">
							<div class="warp">
								<table class="show_list_table" border="0" cellspacing="" cellpadding="">
									<tbody>
										<tr>
											<td>广告名称:</td>
											<td><el-input v-model="adDetail.ad_name" placeholder="商户名"></el-input></td>
										</tr>
										<tr>
											<td>广告类型：</td>
											<td>
												<el-select v-model="adDetail.media_type" placeholder="请选择">
											    <el-option
											      v-for="item in optionsAddType"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
											</td>
										</tr>
										<tr>
											<td>广告位置：</td>
											<td>
												<el-select v-model="adDetail.pid" placeholder="请选择">
											    <el-option
											      v-for="item in options"
											      :key="item.position_id"
											      :label="item.position_name"
											      :value="item.position_id">
											    </el-option>
											  </el-select>
											</td>
										</tr>
										<tr>
											<td>广告链接:</td>
											<td><el-input v-model="adDetail.ad_link" placeholder="广告链接"></el-input></td>
										</tr>
										<tr>
											<td>链接类型：</td>
											<td>
												<el-select v-model="adDetail.type" placeholder="请选择">
											    <el-option
											      v-for="item in optionsLinkType"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
											</td>
										</tr>
										<tr>
											<td>广告图片：</td>
											<td>
												<!--<img style="width:100px;height:50px" :src="adDetail.ad_code" alt="" />-->
												<up-load @changeOriginalImg = "adImg" :explain="componentExplain1" :upLoadData="upLoadData" :type="advertising" :imageArr="adDetail.ad_code"></up-load>
											</td>
										</tr>
										<!--<tr>
											<td>背景颜色：</td>
											<td><el-color-picker v-model="adDetail.bgcolor"></el-color-picker></td>
										</tr>-->
										<tr>
											<td>默认排序：</td>
											<td><el-input v-model="adDetail.orderby" placeholder="商户名"></el-input></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="height_32_table_bottom">
						    <el-button type="danger" @click="saveList()">保存</el-button>
						    <!--<el-button type="danger">重置</el-button>-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import upLoad from '../../components/AdvertisementUpLoad';
import Advertising from '../../js/advertising_list.js';
 export default {
   data () {
     return {
        componentExplain1:[
          {
            value:"广告图，要求明细：",
          },{
            value:"a.尺寸为750X354",
          },{
            value:"b.大小为100k以内",
          },{
            value:"c.图片背景为纯白底，商品图案居中显示",
          },{
            value:"d.图片可以添加品牌相关文字或logo",
          }
        ],
     	upLoadData:{
          type:"adImg",
        },
     	advertising:'advertising',
     	title:"添加",
     	types:true,
     	adDetail:{
     		ad_name:'',
     		media_type:'',
     		pid:'',
     		ad_link:'',
     		type:'',
     		ad_code:'',
     		bgcolor:'#fff',
     		orderby:'',
     	},
     	ad_id:'',
     	color1: '#000',
     	dialogVisible:false,
     	 tableData: [],
     	input:'',
     	value:'',
     	options:[],
     	optionsAddType:[
     		{
     			"value":"0",
     			"label":"图片"
     		},
     		{
     			"value":"1",
     			"label":"flash"
     		}
     	],
     	optionsLinkType:[
     		{
     			"value":"0",
     			"label":"无"
     		},
     		{
     			"value":"1",
     			"label":"商品详情"
     		},
     		{
     			"value":"2",
     			"label":"页面"
     		}],
		content_title:{
			title1: "广告列表",
			title2: "",
			path1:'/home/advertisingManagement/advertisingList',
			path2:''
		}
     }
   },
   created(){
       var token = localStorage.getItem("token");
       if(token){
         this.upLoadData.Authorization = token;
       }
		this.ad_id = this.$route.query.ad_id;
		if(this.ad_id!=undefined){
			this.title = "编辑";
			var data = {
				id:this.ad_id
			}
			Advertising.positionListDetail("Ad/detail",data,this);
		}

   		var dataposition = {
   			page:1,
   			rows:100
   		}
   		Advertising.positionList("Ad/positionList",dataposition,this);
   },
   components: {
		breadcrumb,upLoad
   },
   methods:{
   	adImg(val){
   		this.adDetail.ad_code = val;
   	},
   	saveList(){
   		if(this.ad_id!=undefined){
			var data = {
				ad_id:this.ad_id,
				ad_name:this.adDetail.ad_name,
				media_type:this.adDetail.media_type,
				pid:this.adDetail.pid,
				ad_link:this.adDetail.ad_link,
				type:this.adDetail.type,
				ad_code:this.adDetail.ad_code,
				bgcolor:this.adDetail.bgcolor,
				orderby:this.adDetail.orderby,
			}
			Advertising.advertisingListAdd("Ad/editAd",data,this);
   		}else{
			var data = {
				ad_name:this.adDetail.ad_name,
				media_type:this.adDetail.media_type,
				pid:this.adDetail.pid,
				ad_link:this.adDetail.ad_link,
				type:this.adDetail.type,
				ad_code:this.adDetail.ad_code,
				bgcolor:this.adDetail.bgcolor,
				orderby:this.adDetail.orderby,
			}
			Advertising.advertisingListAdd("Ad/addAd",data,this);
   		}
   	},
		entryDetail(id){
			this.$router.push({name:'customer_complaint_management_detail',query:{id:id}})
		},
		toggleSelection(rows) {
	    if (rows) {
	      rows.forEach(row => {
	        this.$refs.multipleTable.toggleRowSelection(row);
	      });
	    } else {
	      this.$refs.multipleTable.clearSelection();
	    }
	  },
	  handleSelectionChange(val) {
	    this.multipleSelection = val;
	  }
   }
 }
</script>
