<style lang="less" scoped>
@import "../../../less/config.less";
</style>
<template>
  <div class="search_admin_list_table">
        <div class="search_btn">
            <picker title = '创建时间' @onPassByVal='getTime1'></picker>
            <picker title = '收货时间' @onPassByVal='getTime2'></picker>
            <picker title = '结算时间' @onPassByVal='getTime3'></picker>
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
            <div class="search_content">
                <span>订单编号</span>
                <div class="width-120">
                    <el-input type="text" v-model.trim="form.order_sn" placeholder="订单编号"></el-input>
                </div>
            </div>
            <div class="search_content">
                <span>状态</span>
                <div class="width-120">
                    <el-select v-model.trim="form.status" placeholder="全部">
                        <el-option
                        v-for="item in statusOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <el-button style="float:left;margin-left:20px" type="primary" @click="searchListData()">查询</el-button>
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
               width="80">
           </el-table-column>
           <el-table-column
               prop="order_sn"
               label="订单编号"
               width="180">
           </el-table-column>
           <el-table-column
               prop="order_promotion_status"
               label="状态"
               width="80">
           </el-table-column>
           <el-table-column
               prop="confirm_time"
               label="收货时间"
               width="160">
           </el-table-column>
           <el-table-column
               prop="settlement_time"
               label="结算时间"
               width="160">
           </el-table-column>
           <el-table-column
               prop="add_time"
               label="创建时间"
               width="160">
           </el-table-column>
           <el-table-column
               prop="goods_name"
               label="推广商品"
               width="180">
           </el-table-column>
           <el-table-column
               prop="order_amount"
               label="订单金额(元)"
               width="120">
           </el-table-column>
           <el-table-column
               prop="goods_num"
               label="成交商品数"
               width="100">
           </el-table-column>
           <el-table-column
               prop="commission_rate"
               label="佣金比率"
               width="80">
           </el-table-column>
           <el-table-column
               prop="promotion_amount"
               label="佣金金额(元)"
               width="120">
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
      statusOption:[],
      selectTimeOption:[],
      defaultTime:[],
      form:{
        store_name:'',
        goods_id:'',
        status:'',
        time:'',
        start_time:'',
        stop_time:"",
        confirm_start_time:'',
        confirm_stop_time:"",
        settlement_start_time:'',
        settlement_stop_time:"",
        order_sn:'',
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
     MakeFun.promotionStatus("Fundstatistics/promotionStatus",this);
     // MakeFun.getTimeFundstatistics("Fundstatistics/getTime",this);
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
            confirm_start_time:this.form.confirm_start_time,
            confirm_stop_time:this.form.confirm_stop_time,
            settlement_start_time:this.form.settlement_start_time,
            settlement_stop_time:this.form.settlement_stop_time,
            status:this.form.status,
            order_sn:this.form.order_sn,
            page:val?val:this.currentPage,
            rows:this.pageSize
        }
        MakeFun.promotionGoods("Fundstatistics/promotionOrderStatistics",data,this);
    },
    handleSizeChange(val){
        this.fetch(val);
    },
    searchListData(){
      this.fetch();
    },
   	getTime1(msg){
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
   	getTime2(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN 0NaN:0NaN:0NaN'){
	   			this.form.confirm_start_time = msg[0];
	   			this.form.confirm_stop_time = msg[1];
	        }else{
	   			this.form.confirm_start_time = '';
	   			this.form.confirm_stop_time = '';
	        }
        }else{
   			this.form.confirm_start_time = '';
   			this.form.confirm_stop_time = '';
        }
   	},
   	getTime3(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN 0NaN:0NaN:0NaN'){
	   			this.form.settlement_start_time = msg[0];
	   			this.form.settlement_stop_time = msg[1];
	        }else{
	   			this.form.settlement_start_time = '';
	   			this.form.settlement_stop_time = '';
	        }
        }else{
   			this.form.settlement_start_time = '';
   			this.form.settlement_stop_time = '';
        }
   	},
  }
}
</script>
