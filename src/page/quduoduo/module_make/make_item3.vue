<style lang="less" scoped>
@import "../../../less/config.less";
</style>
<template>
  <div class="search_admin_list_table">
        <div class="search_btn">
          <div class="search_content">
              <span>过去七天</span>
              <div class="width-120">
                  <el-select size="small" @change="changeTime(form.time)" v-model.trim="form.time" placeholder="全部">
                      <el-option
                      v-for="item in selectTimeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.time">
                      </el-option>
                  </el-select>
              </div>
          </div>
          <picker :defaultTime = 'defaultTime' @onPassByVal='getTime'></picker>
            <div class="search_content">
                <span>商户名称</span>
                <div class="width-120">
                    <el-input type="text" v-model.trim="form.store_name" placeholder="请输入商户名称"></el-input>
                </div>
            </div>
            <div class="search_content">
                <span>商品ID</span>
                <div class="width-120">
                    <el-input type="text" v-model.trim="form.goods_id" placeholder="请输入商品ID"></el-input>
                </div>
            </div>
            <el-button style="float:left;margin-left:20px;" type="primary" @click="searchListData()">查询</el-button>
        </div>
        <div style="color:#999;padding:10px 0;">
          注：PV为商品或页面的浏览量；UV为访问该商品或页面的访客数；
        </div>
       <el-table
           :data="tableData"
           border
           style="width: 100%">
           <el-table-column
               prop="store_name"
               label="商户名称"
               width="180">
           </el-table-column>
           <el-table-column
               prop="goods_id"
               label="商品ID"
               width="180">
           </el-table-column>
           <el-table-column
               prop="goods_name"
               label="推广商品"
               width="180">
           </el-table-column>
           <el-table-column
               prop="promotion_type"
               label="推广类型"
               width="180">
           </el-table-column>
           <el-table-column
               prop="share_count"
               label="分享次数">
           </el-table-column>
           <el-table-column
               prop="pv"
               label="PV"
               width="80">
           </el-table-column>
           <el-table-column
               prop="uv"
               label="UV(独立访客)"
               width="120">
           </el-table-column>
           <el-table-column
               prop="conversion_rate"
               label="转换率">
           </el-table-column>
           <el-table-column
               prop="group_order_num"
               label="成团订单数">
           </el-table-column>
           <el-table-column
               prop="order_amount"
               label="订单金额(元)">
           </el-table-column>
           <el-table-column
               prop="settlement_order_num"
               label="结算订单数">
           </el-table-column>
           <el-table-column
               prop="settlement_amount"
               label="结算金额(元)">
           </el-table-column>
           <el-table-column
               prop="settlement_brokerage_amount"
               label="结算佣金(元)">
           </el-table-column>
           <el-table-column
               prop="settlement_brokerage_average_rate"
               label="平均佣金比率">
           </el-table-column>
       </el-table>
      <div class="pagination" v-show="total!=0">
          <el-pagination
              @current-change="handleSizeChange"
              :current-page="currentPage"
              :page-size='pageSize'
              layout="total, prev, pager, next, jumper"
              :total='total'>
          </el-pagination>
      </div>
  </div>
</template>

<script>
import MakeFun from "../../../js/make_fun.js";
import picker from '../../../components/picker';
export default {
  data(){
    return{
      selectTimeOption:[],
      defaultTime:[],
      form:{
        store_name:'',
        goods_id:'',
        time:'',
        use_start_time:'',
        use_end_time:"",
      },
      couponOption:[],
      tableData:[],
      currentPage:1,
      pageSize:10,
      total:0,
    }
  },
  components:{
    picker
  },
  created(){
       this.fetch();
       MakeFun.getTimeFundstatistics("Fundstatistics/getTime",this);
  },
  methods:{
    changeTime(val){
      this.defaultTime = val;
    },
    fetch(val){
        var data = {
            store_name:this.form.store_name,
            goods_id:this.form.goods_id,
            start_time:this.form.start_time,
            stop_time:this.form.stop_time,
            page:val?val:this.currentPage,
            rows:this.pageSize
        }
        MakeFun.promotionGoods("Fundstatistics/promotionGoods",data,this);
    },
    handleSizeChange(val){
        this.fetch(val);
    },
    searchListData(){
      this.fetch();
    },
   	getTime(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN 0NaN:0NaN:0NaN'){
	   			this.form.start_time = msg[0];
	   			this.form.stop_time = msg[1];
	        }else{
	   			this.form.start_time = '';
	   			this.form.stop_time = '';
	        }
        }else{
   			this.form.start_time = '';
   			this.form.stop_time = '';
        }
   	},
  }
}
</script>
