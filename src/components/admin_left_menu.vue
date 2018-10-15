<template>
 <div class="admin_left_menu">
    <el-row>
        <el-col :span="24">
        <el-menu
        class="el-menu-vertical-demo"
        :default-active="navselected"
        @open="handleOpen"
        @close="handleClose"
        @select="handleselect"
        :unique-opened=true
        background-color="#fff"
        text-color="#000"
        active-text-color="#ffd04b">
        <router-link to="/home">
	        <el-menu-item index="1">
	            <i class="el-icon-document"></i>
	            <span slot="title">首页</span>
	        </el-menu-item>
        </router-link>
        <div v-for="(its,ind) in tableData">
	        <el-submenu :index='ind.toString()'>
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>{{its.parent}}</span>
	            </template>
	            <el-menu-item-group>
	            	<div v-for="(it,key) in its.children">
	            		<router-link :to="it.route"><el-menu-item :index="(ind+1)+'-'+(key+1)">{{it.title}}</el-menu-item></router-link>
	            	</div>
	            </el-menu-item-group>
	        </el-submenu>
        </div>
	        <!--<el-submenu index="2">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>商户管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/businessManagement/businessListings"><el-menu-item index="2-1">商户列表 </el-menu-item></router-link>
	            <router-link to="/home/businessManagement/merchantPenaltyRecord"><el-menu-item index="2-2">商户惩罚记录</el-menu-item></router-link>
	            <router-link to="/home/businessManagement/messageListStation"><el-menu-item index="2-3">站内信列表</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="3">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>商品管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/commodityManagement/listOfGoods"><el-menu-item index="3-1">商品列表</el-menu-item></router-link>
	            <router-link to="/home/commodityManagement/commodityClassification"><el-menu-item index="3-2">商品分类</el-menu-item></router-link>
	            <router-link to="/home/commodityManagement/commoditySpecification"><el-menu-item index="3-3">商品规格</el-menu-item></router-link>
	            <router-link to="/home/commodityManagement/sale_list"><el-menu-item index="3-4">增减销量纪录</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="4">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>订单管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to='/home/orderManagement/customerComplaintManagement'><el-menu-item index="4-1">客户申诉管理</el-menu-item></router-link>
	            <router-link to='/home/orderManagement/orderList'><el-menu-item index="4-2">订单列表</el-menu-item></router-link>
	            <router-link to='/home/orderManagement/delayedDelivery'><el-menu-item index="4-3">延迟发货订单</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="5">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>活动管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/activityManagement/venue"><el-menu-item index="5-1">会场专题</el-menu-item></router-link>
	            <router-link to="/home/activityManagement/halfOffExclusive"><el-menu-item index="5-2">五折专享</el-menu-item></router-link>
	            <router-link to="/home/activityManagement/activityIcon"><el-menu-item index="5-3">活动图标</el-menu-item></router-link>
	            <router-link to="/home/activityManagement/lotteryManagement"><el-menu-item index="5-4">抽奖管理</el-menu-item></router-link>
	            <router-link to="/home/activityManagement/moreInterestingStrict"><el-menu-item index="5-5">趣多严选</el-menu-item></router-link>
	            <router-link to="/home/activityManagement/lawSavingMoney"><el-menu-item index="5-6">省钱大法</el-menu-item></router-link>
	            <router-link to="/home/activityManagement/fruitQuality"><el-menu-item index="5-7">品质水果</el-menu-item></router-link>
	            <router-link to="/home/activityManagement/excellentFurniture"><el-menu-item index="5-8">家具优品</el-menu-item></router-link>
	            <router-link to="/home/activityManagement/brandClearance"><el-menu-item index="5-9">品牌清仓</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="6">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>会员管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/member_management/member_management"><el-menu-item index="6-1">会员列表</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="7">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>广告管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/advertisingManagement/advertisingList"><el-menu-item index="7-1">广告列表</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="8">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>9.9专场管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/specialManagement/listGoods"><el-menu-item index="8-1">9.9商品列表</el-menu-item></router-link>
	            <router-link to="/home/specialManagement/specialFieldClassification"><el-menu-item index="8-2">9.9专场分类</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>

	         <el-submenu index="9">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>版本更新</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/versionUpdate/versionUpdate"><el-menu-item index="9-1">版本更新</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="10">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>权限管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/authority_management/authority_management"><el-menu-item index="10-1">角色管理</el-menu-item></router-link>
	            <router-link to="/home/authority_management/managers"><el-menu-item index="10-2">管理员列表</el-menu-item></router-link>
	            <router-link to="/home/authority_management/administrator_log"><el-menu-item index="10-3">管理员日志</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="11">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>模块管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/moduleManagement/menuManagement"><el-menu-item index="11-1">菜单管理</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="12">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>优惠券管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/couponManager/couponList"><el-menu-item index="12-1">优惠券列表</el-menu-item></router-link>
	            <router-link to="/home/couponManager/coupon_issuance"><el-menu-item index="12-2">优惠券发放</el-menu-item></router-link>
	            <router-link to="/home/couponManager/couponStatistics"><el-menu-item index="12-3">优惠券统计</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="13">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>账户管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/accountManagement/account"><el-menu-item index="13-1">账户管理</el-menu-item></router-link>
	            <router-link to="/home/accountManagement/income"><el-menu-item index="13-2">收支报表</el-menu-item></router-link>
	            <router-link to="/home/accountManagement/reflect"><el-menu-item index="13-3">提现审核</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="14">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>营销管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/marketing/marketing_active"><el-menu-item index="14-1">营销活动</el-menu-item></router-link>
	            <router-link to="/home/marketing/resource_activity"><el-menu-item index="14-2">资源位活动</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="15">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>海淘商品管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/haitao/sea_good_list"><el-menu-item index="15-1">商品列表</el-menu-item></router-link>
	            <router-link to="/home/haitao/sea_good_category"><el-menu-item index="15-2">商品分类</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="16">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>微信菜单管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/wx/wx_setting"><el-menu-item index="16-1">菜单设置</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="17">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>图标管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/icon_index/icon"><el-menu-item index="17-1">APP首页导航</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="18">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>系统日志</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/system_journal/journal_list"><el-menu-item index="18-1">日志记录</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="19">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>评价管理</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/evaluateManager/evaluate"><el-menu-item index="19-1">评价管理</el-menu-item></router-link>
	            <router-link to="/home/evaluateManager/sensitive"><el-menu-item index="19-2">敏感词管理</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="20">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>意见反馈</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/feedback/feedback"><el-menu-item index="20-1">意见反馈</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>
	         <el-submenu index="21">
	            <template slot="title">
	            <i class="el-icon-location"></i>
	            <span>关闭订单</span>
	            </template>
	            <el-menu-item-group>
	            <router-link to="/home/closeBrush"><el-menu-item index="21-1">关闭订单</el-menu-item></router-link>
	            <router-link to="/home/closeBrushList"><el-menu-item index="21-2">关闭订单记录</el-menu-item></router-link>
	            </el-menu-item-group>
	        </el-submenu>-->
        </el-menu>
    </el-col>
    </el-row>
 </div>
</template>

<script>
import roles from '../js/roles';
 export default {
   data () {
     return {
		tableData:[],
         navselected:'horizontal',
     }
   },
   created(){
     console.log(this.nextRouteArr)
       this.navselected = this.nextRouteArr;
//     console.log(this.navselected)
		roles.menuList("user/menuList",this)
   },
   components: {

   },
   methods:{
      handleOpen(key, keyPath) {
//      console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
//      console.log(key, keyPath);
      },
		handleselect(key, keyPath){
			var params = this.$route.path;
//			console.log(params)
		}
   }
 }
</script>


<style lang="less" scoped>
/*@import "../../less/config.less";*/
/*滚动条样式*/
.admin_left_menu::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.admin_left_menu::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.admin_left_menu::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
.admin_left_menu{
	height:100%;
    overflow-x: hidden;
    overflow-y: auto;
}
.admin_left_menu .el-submenu .el-menu-item{
   height: 40px;
    line-height: 40px;
    padding: 0 45px;
    min-width: 200px;
}
.admin_left_menu .el-menu-item,.admin_left_menu  .el-submenu__title{
    height: 40px;
    line-height: 40px;
}
</style>
