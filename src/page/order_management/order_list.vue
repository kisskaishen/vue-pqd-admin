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
					订单列表
				</span>
			</div>
			<div class="search_btn">
				<div class="search_content">
					<span>支付方式</span>
					<div class="width-120">
					  <el-select v-model="pay_code" placeholder="全部">
					    <el-option
					      v-for="item in pay_codeOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>订单状态</span>
					<div class="width-120">
					  <el-select v-model="order_status" placeholder="全部">
					    <el-option
					      v-for="item in order_statusOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>发货状态</span>
					<div class="width-120">
					  <el-select v-model="shipping_status" placeholder="全部">
					    <el-option
					      v-for="item in shipping_statusOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>支付状态</span>
					<div class="width-120">
					  <el-select v-model="pay_status" placeholder="全部">
					    <el-option
					      v-for="item in pay_statusOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>订单类别</span>
					<div class="width-120">
					  <el-select v-model="order_class" placeholder="全部">
					    <el-option
					      v-for="item in order_classOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>拼团状态</span>
					<div class="width-120">
					  <el-select v-model="group_status" placeholder="全部">
					    <el-option
					      v-for="item in group_statusOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>订单服务状态</span>
					<div class="width-120">
					  <el-select v-model="order_service" placeholder="全部">
					    <el-option
					      v-for="item in order_serviceOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="search_content">
					<span>收货人</span>
					<div class="width-120">
						<el-input v-model="consignee" placeholder="收货人"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>订单编号</span>
					<div class="width-120">
						<el-input v-model="order_sn" placeholder="订单编号"></el-input>
					</div>
				</div>
				<div class="search_content">
					<span>商户名</span>
					<div class="width-120">
						<el-input v-model="store_name" placeholder="商户名"></el-input>
					</div>
				</div>
				<!--<div class="search_content">
					<span>商户ID</span>
					<div class="width-120">
						<el-input v-model="store_id" placeholder="订单编号"></el-input>
					</div>
				</div>-->
				<!--<div class="search_content">
					<span>商品ID</span>
					<div class="width-120">
						<el-input v-model="goods_id" placeholder="订单编号"></el-input>
					</div>
				</div>-->
					<picker style="float:left;margin-bottom:10px;" :sTime="sTime" :eTime="eTime" :title="titleLabel" @onPassByVal='getTimes'></picker>
  				<div class="search_content">
  					<el-button type="primary" @click="searchListData()">查询</el-button>
    				<el-button type="primary" @click="batchExport()">批量导出</el-button>
  			  </div>
			</div>
			<div class="table_list">
				  <el-table
				    :data="tableData"
				    border
			    row-key="order_sn"
				    style="width: 100%"
    @selection-change="handleSelectionChange">
				    <el-table-column
				      prop="order_sn"
				      label="订单编号"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="order_class_name"
				      label="订单类型">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      label="商户名称"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="goods_id"
				      label="商品ID">
				    </el-table-column>
				    <el-table-column
				      prop="goods_name"
				      label="商品名称" width="400">
				    </el-table-column>
				    <el-table-column
				      prop="nickname"
				      label="用户昵称">
				    </el-table-column>
				    <el-table-column
				      prop="user_id"
				      label="用户ID">
				    </el-table-column>
				    <el-table-column
				      prop="consignee"
				      label="收货人">
				    </el-table-column>
				    <el-table-column
				      prop="goods_price"
				      label="单买价格">
				    </el-table-column>
				    <el-table-column
				      prop="goods_num"
				      label="购买数量">
				    </el-table-column>
				    <el-table-column
				      prop="order_amount"
				      label="应付金额">
				    </el-table-column>
				    <el-table-column
				      prop="status_name"
				      label="订单状态"
				      width="260">
				    </el-table-column>
				    <el-table-column
				      prop="order_service_name"
				      label="售后状态"
				      width="120">
				    </el-table-column>
				    <el-table-column
				      prop="shipping_name"
				      label="配送方式"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="add_time"
				      label="下单时间"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      label="操作">
				      <template slot-scope="scope">
				        <el-button type="text" size="small" @click="entryDetail(scope.row.order_sn)">查看</el-button>
				        <!--<a target="_blank" :href="'/home/orderManagement/orderList/orderListDetail?order_id='+scope.row.order_sn">查看</a>-->
				      </template>
				    </el-table-column>
				  </el-table>
				  <div class="pagination">
					<el-row>
					  <el-button @click="pagination(prev_id,'prev')">上一页</el-button>
					  <el-button @click="pagination(next_id,'next')">下一页</el-button>
					 </el-row>
					</div>
			</div>
		</div>
	</div>
 </div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker'

import orderList from '../../js/order_list';
import common from '../../js/common';
 export default {
   data () {
     return {
     	sTime:'',
     	eTime:'',
     	multipleSelection:[],
     	titleLabel:'下单时间 ',
     	consignee:'',
     	order_sn:'',
     	add_time_map:'',
     	pay_code:'',
     	order_status:'',
     	shipping_status:'',
     	pay_status:'',
     	order_class:'',
     	group_status:'',
     	order_service:'',
     	store_name:'',
     	store_id:'',
     	goods_id:'',
     	pay_codeOption:[],
     	order_statusOption:[],
     	shipping_statusOption:[],
     	pay_statusOption:[],
     	order_classOption:[],
     	group_statusOption:[],
     	order_serviceOption:[],
     	type:0,
     	next_id:'',
     	prev_id:'',
     	currentPage:1,
		totals:0,
		pageSize:10,
     	tableData: [],
		content_title:{
			title1: "订单列表",
			title2: "",
			path1:'/home/orderManagement/orderList',
			path2:''
		},
		order_class:'',
		store_id:'',
     }
   },
   created(){
   		this.store_id = this.$route.query.store_id;
   		this.order_class = this.$route.query.order_class;
		this.eTime = getNowFormatDate();
		this.sTime = getBeforeDate(30);
   		var add_time_map = this.sTime+'/'+this.eTime;
		var data = {
			rows:this.pageSize,
			store_id:this.store_id,
			order_class:this.order_class,
			add_time_map:add_time_map
		}
		orderList.orderList("Order/list",data,this);
		common.searchConf("order/searchConf",this);
		var times = new Date();
		function getNowFormatDate() {
		    var date = new Date();
		    var seperator1 = "-";
		    var seperator2 = ":";
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		            + " " + date.getHours() + seperator2 + date.getMinutes()
		            + seperator2 + date.getSeconds();
		    return currentdate;
		}
		  function getBeforeDate(n){
		    var n = n;
		    var d = new Date();
		    var seperator1 = "-";
		    var seperator2 = ":";
		    var year = d.getFullYear();
		    var mon=d.getMonth()+1;
		    var day=d.getDate();
		    if(day <= n){
		            if(mon>1) {
		               mon=mon-1;
		            }
		           else {
		             year = year-1;
		             mon = 12;
		             }
		           }
		          d.setDate(d.getDate()-n);
		          year = d.getFullYear();
		          mon=d.getMonth()+1;
		          day=d.getDate();
		      var s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day)+ " " + d.getHours() + seperator2 + d.getMinutes()
          + seperator2 + d.getSeconds();
		     return s;
		  }
   },
   components: {
breadcrumb,picker
   },
   methods:{
   	batchExport(){
   		var data = {
   			consignee:this.consignee,
   			order_sn:this.order_sn,
   			add_time_map:this.add_time_map,
   			pay_code:this.pay_code,
   			order_status:this.order_status,
   			shipping_status:this.shipping_status,
   			pay_status:this.pay_status,
   			order_class:this.order_class,
   			group_status:this.group_status,
   			order_service:this.order_service,
   			store_name:this.store_name,
   			store_id:this.store_id,
   			goods_id:this.goods_id,
   			export:-1,
   			page:'',
   			page_index:''
   		}
   		orderList.preExport("Order/export",data,this);
   	},
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
   	getTimes(msg){
   		if(msg!=undefined){
	   		if(msg[0]!='NaN-0NaN-0NaN'){
	   			this.add_time_map = msg[0]+'/'+msg[1];
	        }else{
	   			this.add_time_map = '';
	        }
        }else{
   			this.add_time_map = '';
        }
   	},
   	pagination(id,tit){
		var data = {
   			consignee:this.consignee,
   			order_sn:this.order_sn,
   			add_time_map:this.add_time_map,
   			pay_code:this.pay_code,
   			order_status:this.order_status,
   			shipping_status:this.shipping_status,
   			pay_status:this.pay_status,
   			order_class:this.order_class,
   			group_status:this.group_status,
   			order_service:this.order_service,
   			store_name:this.store_name,
   			store_id:this.store_id,
   			goods_id:this.goods_id,
  			rows:this.pageSize,
  			page_index:id,
  			page_type:tit
		}
		orderList.orderList("Order/list",data,this);
   	},
   	searchListData(){
   		var data = {
   			consignee:this.consignee,
   			order_sn:this.order_sn,
   			add_time_map:this.add_time_map,
   			pay_code:this.pay_code,
   			order_status:this.order_status,
   			shipping_status:this.shipping_status,
   			pay_status:this.pay_status,
   			order_class:this.order_class,
   			group_status:this.group_status,
   			order_service:this.order_service,
   			store_name:this.store_name,
   			store_id:this.store_id,
   			goods_id:this.goods_id,
   			rows:this.pageSize,
   		}
		orderList.orderList("Order/list",data,this);
   	},
		entryDetail(id){
			this.$router.push({name:'order_list_detail',query:{order_id:id,title:"orderList"}})
		},
   }
 }
</script>
