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
    			   <el-tabs v-model="activeNameExpenditure" @tab-click="handleClickExpenditure">
    			    <el-tab-pane label="收支报表" name="statementIncomeExpenditure"></el-tab-pane>
    			    <el-tab-pane label="商家收支明细" name="businessRevenueExpenditureDetails"></el-tab-pane>
    			  </el-tabs>
    			</div>
      </div>
      <component
            :is="currentView"
            @changeview="changeViewFun"
        ></component>
  </div>
 </div>
</template>

<script>
import account from '../../js/account.js';
import breadcrumb from '../../components/breadcrumb';
import admin_expenditure from './admin_expenditure';
import business_expenditure from './business_expenditure';
 export default {
   data () {
     return {
       currentView:"admin_expenditure",
       activeNameExpenditure:"statementIncomeExpenditure",
    		content_title:{
    			title1: "收支报表",
    			title2: "",
    			path1:'/home/accountManagement/income',
    			path2:''
    		},
        store_detail:{
          store_id:'',
          store_name:'',
          is_payment:'',
          withdrawal_payment_type:'',
          payment_sn:'',
          start_time:'',
          end_time:'',
        }
     }
   },
   created(){
   },
   components: {
		breadcrumb,admin_expenditure,business_expenditure
   },
   methods:{
     changeViewFun(val){
       console.log(val)
        this.currentView = val;
     },
      handleClickExpenditure(tab, event){
        	var str = tab.name;
          console.log(str)
          if(str=="businessRevenueExpenditureDetails"){
            this.currentView = "business_expenditure";
          }else{
            this.currentView = "admin_expenditure";
          }
      },
  }
}
</script>
