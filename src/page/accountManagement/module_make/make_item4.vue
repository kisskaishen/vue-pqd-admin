<style lang="less" scoped>
@import "../../../less/config.less";
</style>
<template>
  <div class="search_admin_list_table">
        <div class="search_btn">
            <div class="search_content">
                <span>过去七天</span>
                <div class="width-120">
                    <el-select size="small" v-model.trim="form.name" placeholder="全部">
                        <el-option
                        v-for="item in selectTimeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="search_contents">
                <picker @onPassByVal='getTime'></picker>
            </div>
            <div class="search_contents">
                <el-button size="small" type="primary" @click="searchListData()">查询</el-button>
            </div>
        </div>
       <el-table
           :data="itemData"
           border
           style="width: 100%">
           <el-table-column
               prop="goods_id"
               label="推广商品"
               width="180">
           </el-table-column>
           <el-table-column
               prop="goods_name"
               label="推广类型"
               width="180">
           </el-table-column>
           <el-table-column
               prop="status"
               label="分享次数">
           </el-table-column>
           <el-table-column
               prop="addtime"
               label="PV(独立访客)">
           </el-table-column>
           <el-table-column
               prop="edittime"
               label="成团订单数">
           </el-table-column>
           <el-table-column
               prop="edittime"
               label="订单金额(元)">
           </el-table-column>
           <el-table-column
               prop="edittime"
               label="结算订单数">
           </el-table-column>
           <el-table-column
               prop="edittime"
               label="结算金额(元)">
           </el-table-column>
           <el-table-column
               prop="edittime"
               label="结算佣金(元)">
           </el-table-column>
           <el-table-column
               prop="edittime"
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
import picker from '../../../components/picker';
import MakeFun from "../../../js/make_fun.js";
export default {
  data(){
    return{
      selectTimeOption:[
          {
            value:"1",
            label:"过去7天"
          },
          {
            value:"2",
            label:"过去30天"
          },
          {
            value:"3",
            label:"过去30天"
          }
      ],
      form:{
        name:'',
        use_start_time:'',
        use_end_time:"",
      },
      couponOption:[],
      itemData:[],
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
  },
  methods:{
    fetch(val){
        var data = {
            start_time:this.form.start_time,
            stop_time:this.form.stop_time,
            page:val?val:this.currentPage,
            rows:this.pageSize
        }
        MakeFun.promotionGoods("Fundstatistics/interchangeablePromotion",data,this);
    },
    handleSizeChange(val){
        this.fetch(val);
    },
    searchListData(){
      this.fetch();
    },
   	getTime(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.form.use_start_time = msg[0];
	   			this.form.use_end_time = msg[1];
	        }else{
	   			this.form.use_start_time = '';
	   			this.form.use_end_time = '';
	        }
        }else{
   			this.form.use_start_time = '';
   			this.form.use_end_time = '';
        }
   	},
  }
}
</script>
