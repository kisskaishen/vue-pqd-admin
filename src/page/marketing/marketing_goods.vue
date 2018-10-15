<style lang="less" scoped>
@import '../../less/config.less';
@import '../../less/marketing.less';
.region_show{
	.city_show{
		border:1px solid red;
		padding:5px 20px;
		width:142px;
		text-align:center;
		margin-right:10px;
		margin-bottom:10px;
		display:inline-block;
	}
}
.input_check{
	-webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
}
  .warp_form_kan{
  	overflow: hidden;
  	.leftLabel{
  		width:100px;
	  	text-align: right;
	    float: left;
	    font-size: 14px;
	    color: #606266;
	    line-height: 40px;
	    padding: 0 12px 0 0;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
  	}
  	.rightLabel{
  		float:left;
  		overflow: hidden;
  		.input_start{
  			width:80px;
  			float:left;
  		}
  		.input_center{
  			width:40px;
  			float:left;
  			line-height: 32px;
  			text-align: center;
  		}
  		.input_end{
  			width:80px;
  			float:left;

  		}
  	}
  	.explain{
  		float:left;
  			line-height: 32px;
  			margin-left:20px;
  			color:#909399;
  	}
  }
</style>
<template>
 <div class="releaseNewProductEdit">
     <breadcrumb :content="content_title"></breadcrumb>
     <div class="item">
       <div class="title">商品分类</div>
      <div class="content">
          <span class="category">分类名称：{{goodsDetailObj.cat_name}}</span>
       </div>
     </div>
     <div class="item">
       <div class="title">商品基本信息</div>
       <div class="container">
         <div class="tits">
           <span class="category">商品标题：</span>
           <div class="box-input">
             	{{goodsDetailObj.goods_name}}
           </div>
         </div>
         <div class="tits">
           <span class="category">商品市场价：</span>
           <div class="box-input">
             <div style="overflow:hidden">
                <div class="left">
                 {{goodsDetailObj.market_price}}元
                </div>
             </div>
           </div>
         </div>
         <div class="tits">
           <span class="category">配送地区(包邮)：</span>
           <div class="right">
              <div class="warp">
                  <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                  <el-checkbox :indeterminate="isIndeterminateReverse" v-model="checkReverse" @change="handleCheckReverseChange">反选</el-checkbox>
                  <span class="default-address">常用地址</span>-->
                  <div style="margin: 15px 0;"></div>
                  <!--<el-checkbox-group v-model="checkedCities">
                      <el-checkbox disabled v-for="city in cities" :label="city.infos" :key="city.val">{{city.val}}--{{city.infos}}</el-checkbox>
                  </el-checkbox-group>-->
                  <div class="region_show">
                  	<span class="city_show" v-for="city in regionArr">{{city}}</span>
                  </div>
              </div>
           </div>
         </div>
         <div class="tits">
	           <span class="category">商品描述：</span>
	           <div class="right">
	              <div class="box-input">
	                  {{goodsDetailObj.goods_remark}}
	              </div>
	           </div>
	      </div>
         <div class="tits">
	           <span class="category">首页推荐图：</span>
	           <div class="right">
	              <ul class="picture_string">
	              	<li><img :src="goodsDetailObj.original_img"/></li>
	              </ul>
	           </div>
	      </div>
         <div class="tits">
	           <span class="category">类目主图：</span>
	           <div class="right">
	              <ul class="picture_string">
	              	<li><img :src="goodsDetailObj.list_img"/></li>
	              </ul>
	           </div>
	      </div>
         <div class="tits">
	           <span class="category">商品轮播图：</span>
	           <div class="right">
	              <ul class="picture_string">
	              	<li v-for="imgs in goodsDetailObj.sowing_images"><img :src="imgs"/></li>
	              </ul>
	           </div>
	      </div>
         <div class="tits">
	           <span class="category">商品详情图：</span>
	           <div class="right">
	              <ul class="picture_string">
	              	<li v-for="icons in goodsDetailObj.goods_images"><img :src="icons"/></li>
	              </ul>
	           </div>
	      </div>
	    </div>
     </div>
    <div class="item">
       <div class="title">商品规格/库存</div>
       <div class="content">
            <div class="showTable">
              <div class="table-show">
      				<table class="show_list_table_info" border="0" cellspacing="" cellpadding="">
						<tbody>
							<tr>
								<td>{{goodsDetailObj.specone_name}}</td>
								<td v-show="goodsDetailObj.spectwo_name!=''">{{goodsDetailObj.spectwo_name}}</td>
								<td>库存(件)</td>
								<td>团购价(元)</td>
								<td>单买价(元)</td>
								<td>活动价(元)</td>
								<td>活动库存</td>
								<td>商家编码</td>
								<td>SKU预览图</td>
							</tr>
							<tr v-for="item in goodsDetailObj.specList">
								<td>{{item.specone}}</td>
								<td v-show="goodsDetailObj.spectwo_name!=''">{{item.spectow}}</td>
								<td>{{item.store_count}}</td>
								<td>{{item.prom_price}}</td>
								<td>{{item.price}}</td>
								<td>{{item.limit_price}}</td>
								<td>{{item.limit_stock}}</td>
								<td>{{item.bar_code}}</td>
								<td>
									<img v-show="item.img" style="width:100px;height:100px;" :src="item.img" alt="" />
								</td>
							</tr>
						</tbody>
					</table>
				  <!--<el-table
				    :data="goodsDetailObj.specList"
				    border
				    style="width: 100%">
				    <el-table-column
				    	v-show="false"
				      prop="id"
				      label="口味"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="goods_id"
				      label="颜色"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="store_count"
				      label="库存(件)">
				    </el-table-column>
				    <el-table-column
				      prop="prom_price"
				      label="团购价(元)">
				    </el-table-column>
				    <el-table-column
				      prop="price"
				      label="单买价(元)">
				    </el-table-column>
				    <el-table-column
				      prop="limit_price"
				      label="活动价(元)">
				    </el-table-column>
				    <el-table-column
				      prop="limit_stock"
				      label="活动库存(元)">
				    </el-table-column>
				    <el-table-column
				      prop="img"
				      label="商家编码">
				    </el-table-column>
				    <el-table-column
				      prop="img"
				      label="SKU预览图">
				      <template slot-scope="scope">
				        <img style="width:100px;height:100px" src="https://cdn2.pinquduo.cn/15033681474.jpg" alt="" />
				      </template>
				    </el-table-column>
				  </el-table>-->
                <ul class="warp">
	                <li>a.总库存=已上架状态SKU的预估当前库存 + 已上架状态SKU的库存增减</li>
	                <li>b.预览图必须是商品属性图</li>
	                <li>c.预览图大小：预览图大小最大500k，尺寸200*200px</li>
	                <li>d.同一种商品拥有多种不同属性的并且是同种价格的不可以分开上架商品，否则视为重复铺货</li>
                </ul>
               </div>
            </div>
       </div>
    </div>
    <div class="item">
      <div class="title">操作</div>
      <div class="content">
      	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

		  <!--<div class="warp_form">
			  <el-form-item label="砍价初始价" prop="limit_reach">
			  	<div class="width_200">
			    	<el-input :maxlength="5" size="small" v-model.trim="ruleForm.limit_reach" style="width:160px;"></el-input><span style="padding-left:10px;"> 元</span>
			  	</div>
			  </el-form-item>
		  </div>
		  <div class="warp_form_kan">
		  	  <div class="leftLabel">砍价次数</div>
		  	  <div class="rightLabel">
		  	  	<div class="input_start">
		  	  		<input v-model="ruleForm.limit_reach" class="input_check" :maxlength="5" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
		  	  	</div>
		  	  	<div class="input_center">到</div>
		  	  	<div class="input_end">
		  	  		<input v-model="ruleForm.limit_reach" class="input_check" :maxlength="5" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
		  	  	</div>
		  	  </div>
		  	  <div class="explain">
		  	  	(注：根据填写的砍价次数，系统会随机设置每次砍价的金额，直至最后价格为0)
		  	  </div>
		  </div>-->

		  <div class="warp_form">
			  <el-form-item label="团购人数" prop="limit_reach">
			  	<div class="width_200">
			    	<el-input :disabled="btn=='detail'" :maxlength="5" size="small" v-model.trim="ruleForm.limit_reach"></el-input>
			    	<!--<input class="input_check" :maxlength="5" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="ruleForm.limit_reach">-->
			  	</div>
			  </el-form-item>
		  </div>
		  <div class="warp_form">
			  <el-form-item label="操作内容">
			      <el-radio :disabled="btn=='detail'" v-model="ruleForm.audit_status" label="1">通过</el-radio>
  				  <el-radio :disabled="btn=='detail'" v-model="ruleForm.audit_status" label="2">驳回</el-radio>
			  </el-form-item>
		  </div>
		  <div class="warp_form">
			  <el-form-item label="操作说明" prop="desc">
			  	<div class="width_600">
			    	<el-input :disabled="btn=='detail'" size="small" type="textarea" v-model="ruleForm.desc"></el-input>
			  	</div>
			  </el-form-item>
		  </div>
		  <el-form-item v-show="btn!='detail'">
		  	<div class="submit" v-show="show_btn">
		    	<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
		  	</div>
		  </el-form-item>
       </el-form>
       	<div class="operation">
       		<div class="label_left">操作记录：</div>
       		<div class="label_right">
				  <el-table
				    :data="goodsDetailObj.audit_log"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="audit_status"
				      label="操作内容"
				      width="180">
				      <template slot-scope="scope">
				      		<span v-if="scope.row.audit_status=='1'">审核通过</span>
				      		<span v-if="scope.row.audit_status=='2'">审核不通过</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="desc"
				      label="操作说明"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="时间">
				    </el-table-column>
				    <el-table-column
				      prop="admin_name"
				      label="操作者">
				    </el-table-column>
				  </el-table>
       		</div>
       	</div>
      </div>
    </div>
 </div>
</template>

<script>
// const cityOptions = ['北京', '安徽', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '陕西', '上海', '四川', '天津', '西藏', '新疆', '云南', '浙江', '重庆'];
import cityOptions from "../../json/postalArea.json";
import breadcrumb from '../../components/breadcrumb';
import Market from '../../js/marketing';

 export default {
   data () {

      var checkPeople = (rules, value, callback) => {
	      if (!value&&value!=0) {
	          return callback(new Error('团购人数不能为空'));
	        }
          if (isNaN(value)) {
          	callback(new Error('请输入数字值'));
          }else{
          	if(value.indexOf(".")!=-1){
          		callback(new Error('人数必须为整数'));
          	}else{
	            if (value < 2) {
	              callback(new Error('必须大于2'));
	            }else if(value > 10000){
	              callback(new Error('必须小于10000'));
	            } else {
	              callback();
	            }
          	}
          }
      };
      var validateDesc = (rule, value, callback) => {
        if (value === '') {
        	if(this.ruleForm.audit_status!='1'){
          		callback(new Error('请输入拒绝备注'));
        	}else{
        		callback();
        	}
        }else{
        	callback();
        }
      };
     return {
     	show_btn:true,
     	regionArr:[],
     	goodsDetailObj:{},
     	activity_id:'',
     	goods_id:'',
     	id:'',
     	checkedCities:'',
     	cities:cityOptions,
     	listJson:'',
     	goods_remark:'',
     	 tableData: [],
		content_title:{
			title1:"商品列表",
			title2:"商品详情"
		},
		btn:'',
		ruleForm:{
			name:'',
			limit_reach:'',
			desc:'',
			audit_status:'1'
		},
		rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 3, message: '长度在 1到 3个字符', trigger: 'blur' }
          ],
          limit_reach: [
            { validator: checkPeople, trigger: 'blur' }
          ],
          desc: [
//          { required: true, message: '请填写操作说明', trigger: 'blur' }
			 { validator: validateDesc, trigger: 'blur' }
          ],
       }
     }
   },
    created(){
		this.activity_id = this.$route.query.activity_id;
		this.id = this.$route.query.id;
		this.goods_id = this.$route.query.goods_id;
		this.btn = this.$route.query.btn;
		var data = {
			activity_id:this.activity_id,
			id:this.id,
			goods_id:this.goods_id,
		}
		Market.auditGoodsInfo('Helpactivity/auditGoodsInfo',data,this);
    },
   components: {
		breadcrumb
   },
   methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	var data = {
          		activity_id:this.activity_id,
          		goods_id:this.goods_id,
          		id:this.id,
          		audit_status:this.ruleForm.audit_status,
          		desc:this.ruleForm.desc,
          		limit_reach:this.ruleForm.limit_reach,
          	}
          	Market.auditGoods('Helpactivity/auditGoods',data,this,"marketing_goods");
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
   },
 }
</script>
