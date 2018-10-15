import Vue from 'vue'
import Router from 'vue-router'



/*
 *login
 * */
import login from '@/page/login'
/*
 *home
 * */
import home from '@/page/home'
/*
 *index
 * */
import index from '@/page/index/index'
/*
 * 趣多多赚    	quduoduo
 * */
import coupon_manager_quduoduo from '@/page/quduoduo/coupon_manager';
import extension_data_quduoduo from '@/page/quduoduo/extension_data';
import order_examine_quduoduo from '@/page/quduoduo/order_examine';
import order_settlement_quduoduo from '@/page/quduoduo/order_settlement';
import product_manager_quduoduo from '@/page/quduoduo/product_manager';
import shopPromotion from '@/page/quduoduo/shopPromotion';
/*
 * 商户管理    	business_management
 * */
import business_listings from '@/page/business_management/business_listings';
import business_listings_detail from '@/page/business_management/business_listings_detail';
/*
 * 海淘商品管理    	commodity_management
 * */
import sea_good_list from '@/page/haitao/good_list';
import sea_good_category from '@/page/haitao/goods_category';
import sea_add_good_category from '@/page/haitao/add_goods_category';


import embody_application from '@/page/business_management/embody_application';
import merchant_penalty_record from '@/page/business_management/merchant_penalty_record';
import business_audits from '@/page/business_management/business_audits';
import to_open_list from '@/page/business_management/to_open_list';
import to_open_list_detail from '@/page/business_management/to_open_list_detail';
import message_list_station from '@/page/business_management/message_list_station';
import message_list_station_detail from '@/page/business_management/message_list_station_detail';
/*
 * 商品管理    	commodity_management
 * */
import list_of_goods from '@/page/commodity_management/list_of_goods';
import sale_list from '@/page/commodity_management/sale_list';
import list_of_goods_detail from '@/page/commodity_management/list_of_goods_detail';
import commodity_classification from '@/page/commodity_management/commodity_classification';
import commodity_classification_detail from '@/page/commodity_management/commodity_classification_detail';
import commodity_review from '@/page/commodity_management/commodity_review';
import commodity_specification from '@/page/commodity_management/commodity_specification';
/*
 * 订单管理    	order_management
 * */
import customer_complaint_management from '@/page/order_management/customer_complaint_management';
import customer_complaint_management_detail from '@/page/order_management/customer_complaint_management_detail';
import order_list from '@/page/order_management/order_list';
import order_list_detail from '@/page/order_management/order_list_detail';
import list_of_invoice from '@/page/order_management/list_of_invoice';
import list_of_invoice_detail from '@/page/order_management/list_of_invoice_detail';
import list_of_returns from '@/page/order_management/list_of_returns';
import list_of_returns_detail from '@/page/order_management/list_of_returns_detail';
import delayedDelivery from '@/page/order_management/delayed_delivery';
import delayedDeliveryDetail from '@/page/order_management/delayed_delivery_detail';
import manual_refund from '@/page/order_management/manual_refund';
/*
 * 团购管理    	group_purchase_management
 * */

import group_order_list from '@/page/group_purchase_management/order_list';
import group_list_invoice from '@/page/group_purchase_management/list_of_invoice';
import group_list_returns from '@/page/group_purchase_management/list_of_returns';
/*
 * 活动管理    	activity_management
 * */

import active_label from '@/page/activity_management/active_label';
import active_label_detail from '@/page/activity_management/active_label_detail';

import seckill from '@/page/activity_management/seckill';
import seckill_detail from '@/page/activity_management/seckill_detail';

import law_saving_money from '@/page/activity_management/law_saving_money';
import law_saving_money_detail from '@/page/activity_management/law_saving_money_detail';

import more_interesting_strict from '@/page/activity_management/more_interesting_strict';
import more_interesting_strict_detail from '@/page/activity_management/more_interesting_strict_detail';

import lottery_management from '@/page/activity_management/lottery_management';
import lottery_management_detail from '@/page/activity_management/lottery_management_detail';
import lottery_order_list from '@/page/activity_management/order_list';

import activity_icon from '@/page/activity_management/activity_icon';
import activity_icon_detail from '@/page/activity_management/activity_icon_detail';

import venue from '@/page/activity_management/venue';
import active_goods_detail from '@/page/activity_management/active_goods_detail';
import add_venue from '@/page/activity_management/add_venue';
import symposium from '@/page/activity_management/symposium';
import symposium_detail from '@/page/activity_management/symposium_detail';
import venue_product from '@/page/activity_management/venue_product';
import parallel_sessions from '@/page/activity_management/parallel_sessions';

import half_off_exclusive from '@/page/activity_management/half_off_exclusive';
import half_off_exclusive_detail from '@/page/activity_management/half_off_exclusive_detail';

import fruit_of_quality from '@/page/activity_management/fruit_of_quality';
import fruit_of_quality_detail from '@/page/activity_management/fruit_of_quality_detail';

import excellent_furniture from '@/page/activity_management/excellent_furniture';
import excellent_furniture_detail from '@/page/activity_management/excellent_furniture_detail';

import brand_clearance from '@/page/activity_management/brand_clearance';
import brand_clearance_detail from '@/page/activity_management/brand_clearance_detail';

/*
 * 为我点赞管理    	great_deal_of_management
 * */
import give_me_favor_pay_goods from '@/page/great_deal_of_management/give_me_favor_pay_goods';
import give_me_favor_pay_goods_detail from '@/page/great_deal_of_management/give_me_favor_pay_goods_detail';
import give_me_favor_order from '@/page/great_deal_of_management/give_me_favor_order';
import give_me_favor_pay_order from '@/page/great_deal_of_management/give_me_favor_pay_order';
import give_me_favor_pay_order_detail from '@/page/great_deal_of_management/give_me_favor_pay_order_detail';

/*
 * 限时秒杀管理    	Time_limit_kill_management
 * */
import stop_killing_goods from '@/page/Time_limit_kill_management/stop_killing_goods';
import stop_killing_goods_detail from '@/page/Time_limit_kill_management/stop_killing_goods_detail';
import time_management from '@/page/Time_limit_kill_management/time_management';

/*
 * 免单拼商品管理    	Exemption_from_single_management
 * */
import commodity_management from '@/page/Exemption_from_single_management/commodity_management';
import commodity_management_detail from '@/page/Exemption_from_single_management/commodity_management_detail';

/*
 * 会员管理    	member_management
 * */
import member_management from '@/page/member_management/member_management';

/*
 * 补差价申请    	application_for_compensation
 * */
import application_list from '@/page/application_for_compensation/application_list';
import application_list_detail from '@/page/application_for_compensation/application_list_detail';

/*
 * 广告管理    	advertising_management
 * */
import advertising_list from '@/page/advertising_management/advertising_list';
import advertising_list_detail from '@/page/advertising_management/advertising_list_detail';

/*
 * 优惠券管理    	coupon_management
 * */
//import Platform_red_packet_management from '@/page/coupon_management/Platform_red_packet_management';
//import Platform_red_packet_management_detail from '@/page/coupon_management/Platform_red_packet_management_detail';
//import coupon from '@/page/coupon_management/coupon';
//import coupon_detail from '@/page/coupon_management/coupon_detail';
//import make_fun_coupon from '@/page/coupon_management/make_fun_coupon';
//import coupon_issuance from '@/page/coupon_management/coupon_issuance';

/*
 * 9.9专场管理    	special_management
 * */
import special_list_goods from '@/page/special_management/list_of_goods';
import add_list_of_goods from '@/page/special_management/add_list_of_goods';
import special_list_goods_detail from '@/page/special_management/list_of_goods_detail';
import special_field_classification from '@/page/special_management/special_field_classification';
import special_field_classification_detail from '@/page/special_management/special_field_classification_detail';

/*
 * 海淘商品管理    	sea_in_management
 * */
import sea_list_goods from '@/page/sea_in_management/list_of_goods';
import sea_naughty_classification from '@/page/sea_in_management/sea_naughty_classification';
import sea_naughty_classification_detail from '@/page/sea_in_management/sea_naughty_classification_detail';

/*
 * 版本更新    	version_update
 * */
import version_update from '@/page/version_update/version_update';
import version_update_detail from '@/page/version_update/version_update_detail';

/*
 * 报表统计    	report_statistics
 * */
import hot_search_rankings from '@/page/report_statistics/hot_search_rankings';
import financial_statistics from '@/page/report_statistics/financial_statistics';
import membership_statistics from '@/page/report_statistics/membership_statistics';
import financial_statistics_detail from '@/page/report_statistics/financial_statistics_detail';
import sales_rankings from '@/page/report_statistics/sales_rankings';

/*
 * 权限管理    	authority_management
 * */
import authority_management from '@/page/authority_management/role_management';
import role_management_detail from '@/page/authority_management/role_management_detail';

import managers from '@/page/authority_management/managers';
import administrator_log from '@/page/authority_management/administrator_log';

/*
 * 模块管理    	module_management
 * */
import menu_management from '@/page/module_management/menu_management';
import module_management from '@/page/module_management/module_management';

/*
 * 插件工具    	plug_in_tools
 * */
import data_reduction from '@/page/plug_in_tools/data_reduction';
import data_backup from '@/page/plug_in_tools/data_backup';
import Plug_in_list from '@/page/plug_in_tools/Plug_in_list';

/*
 * 优惠券    	coupon_manager
 * */
import coupon_list from '@/page/coupon_manager/coupon_list';
import coupon_statistics from '@/page/coupon_manager/coupon_statistics';
import coupon_list_detail from '@/page/coupon_manager/coupon_list_detail';
import detail_coupon from '@/page/coupon_manager/detail_coupon';
import coupon_issuance from '@/page/coupon_manager/coupon_issuance';
import issuance from '@/page/coupon_manager/issuance';
import issuance_detail from '@/page/coupon_manager/issuance_detail';
import make_fun_coupon from '@/page/coupon_manager/make_fun_coupon';


/*
 * 账户管理    	account_manager
 * */
import account_list from '@/page/accountManagement/account';
import account_income from '@/page/accountManagement/income';
import account_reflect from '@/page/accountManagement/reflect';
import make_fun_list from '@/page/accountManagement/make_fun_list';
import make_fun_manager from '@/page/accountManagement/make_fun_manager';

/*
 * 营销管理    	marketing
 * */
import make_fun from '@/page/marketing/make_fun';
import marketing_active from '@/page/marketing/marketing_active';
import marketing_detail from '@/page/marketing/marketing_detail';
import marketing_goods from '@/page/marketing/marketing_goods';
import marketing_Qua from '@/page/marketing/marketing_Qua';
import marketing_details_list from '@/page/marketing/marketing_details_list';

import resource_activity from '@/page/marketing/resource_activity';
import resource_activity_detail from '@/page/marketing/resource_activity_detail';
import resource_activity_goods from '@/page/marketing/resource_activity_goods';
import resource_activity_qua from '@/page/marketing/resource_activity_qua';
import resource_activity_detail_list from '@/page/marketing/resource_activity_detail_list';

/*
down_record
 */
import down_record_detail from '@/page/marketing/active/down_record_detail';
/*
quduotinisong
 */
import quduotinisongDetail from '@/page/marketing/active/quduotinisong_detail';

/*
 * 微信菜单设置    	wx_setting
 * */
import wx_setting from '@/page/wx/wx_setting';

/*
 * 图标管理    	icon
 * */
import appIcon from '@/page/icon_management/index_icon';
import commodity_label from '@/page/icon_management/commodity_label';

/*
 * 系统日志    	system_journal
 * */
import journal_list from '@/page/system_journal/journal_list';

/*
 * 评价管理    	evaluate
 * */
import evaluate from '@/page/evaluateManager/evaluate'
import sensitive from '@/page/evaluateManager/sensitive'

/*
 * 意见反馈    	evaluate
 * */
import feedback from '@/page/feedback/feedback'

/*
 * 意见反馈    	evaluate
 * */
import hangout from '@/page/hangout'

/*
 * 关闭刷单    	close_brush
 * */
import close_brush from '@/page/close_brush/close_brush'
import close_brush_list from '@/page/close_brush/close_brush_list'








Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
      	    {
		      path: '/home/hangout',
		      name: 'hangout',
		      component: hangout
		    },
      	    {
		      path: '/home/closeBrush',
		      name: 'close_brush',
		      component: close_brush
		    },
      	    {
		      path: '/home/closeBrushList',
		      name: 'close_brush_list',
		      component: close_brush_list
		    },
      	    {
		      path: '',
		      name: 'index',
		      component: index
		    },
		    {
		      path: '/home/haitao/sea_add_good_category',
		      name: 'sea_add_good_category',
		      component: sea_add_good_category
		    },
		    {
		      path: '/home/haitao/sea_good_category',
		      name: 'sea_good_category',
		      component: sea_good_category
		    },
		    {
		      path: '/home/haitao/sea_good_list',
		      name: 'sea_good_list',
		      component: sea_good_list
		    },
      	    {
		      path: '/home/marketing/marketing_active',
		      name: 'marketing_active',
		      component: marketing_active
		    },
      	    {
		      path: '/home/marketing/make_fun',
		      name: 'make_fun',
		      component: make_fun
		    },
      	    {
		      path: '/home/marketing/marketing_detail',
		      name: 'marketing_detail',
		      component: marketing_detail
		    },
      	    {
		      path: '/home/marketing/marketing_goods',
		      name: 'marketing_goods',
		      component: marketing_goods
		    },
      	    {
		      path: '/home/marketing/marketing_Qua',
		      name: 'marketing_Qua',
		      component: marketing_Qua
		    },
      	    {
		      path: '/home/marketing/marketing_details_list',
		      name: 'marketing_details_list',
		      component: marketing_details_list
		    },
      	    {
		      path: '/home/marketing/resource_activity',
		      name: 'resource_activity',
		      component: resource_activity
		    },
      	    {
		      path: '/home/marketing/resource_activity_detail',
		      name: 'resource_activity_detail',
		      component: resource_activity_detail
		    },
      	    {
		      path: '/home/marketing/resource_activity_goods',
		      name: 'resource_activity_goods',
		      component: resource_activity_goods
		    },
      	    {
		      path: '/home/marketing/resource_activity_qua',
		      name: 'resource_activity_qua',
		      component: resource_activity_qua
		    },
      	{
		      path: '/home/marketing/resource_activity_detail_list',
		      name: 'resource_activity_detail_list',
		      component: resource_activity_detail_list
		    },
      	{
		      path: '/home/marketing/quduotinisongDetail',
		      name: 'quduotinisongDetail',
		      component: quduotinisongDetail
		    },
      	{
		      path: '/home/marketing/down_record_detail',
		      name: 'down_record_detail',
		      component: down_record_detail
		    },
      	    {
		      path: '/home/wx/wx_setting',
		      name: 'wx_setting',
		      component: wx_setting
		    },
      	    {
		      path: '/home/icon_index/icon',
		      name: 'appIcon',
		      component: appIcon
		    },
      	    {
		      path: '/home/icon_index/commodity_label',
		      name: 'commodity_label',
		      component: commodity_label
		    },
      	    {
		      path: '/home/system_journal/journal_list',
		      name: 'journal_list',
		      component: journal_list
		    },
      	    {
		      path: '/home/evaluateManager/evaluate',
		      name: 'evaluate',
		      component: evaluate
		    },
      	    {
		      path: '/home/evaluateManager/sensitive',
		      name: 'sensitive',
		      component: sensitive
		    },
      	    {
		      path: '/home/feedback/feedback',
		      name: 'feedback',
		      component: feedback
		    },
      	    {
		      path: '/home/accountManagement/account',
		      name: 'account_list',
		      component: account_list
		    },
      	    {
		      path: '/home/accountManagement/income',
		      name: 'account_income',
		      component: account_income
		    },
      	    {
		      path: '/home/accountManagement/reflect',
		      name: 'account_reflect',
		      component: account_reflect
		    },
      	    {
		      path: '/home/accountManagement/make_fun_list',
		      name: 'make_fun_list',
		      component: make_fun_list
		    },
      	    {
		      path: '/home/accountManagement/make_fun_manager',
		      name: 'make_fun_manager',
		      component: make_fun_manager
		    },
      	    {
		      path: '/home/couponManager/couponList',
		      name: 'coupon_list',
		      component: coupon_list
		    },
      	    {
		      path: '/home/couponManager/couponStatistics',
		      name: 'coupon_statistics',
		      component: coupon_statistics
		    },
      	    {
		      path: '/home/couponManager/couponListDetail',
		      name: 'coupon_list_detail',
		      component: coupon_list_detail
		    },
      	    {
		      path: '/home/couponManager/detail_coupon',
		      name: 'detail_coupon',
		      component: detail_coupon
		    },
      	    {
		      path: '/home/couponManager/coupon_issuance',
		      name: 'coupon_issuance',
		      component: coupon_issuance
		    },
      	    {
		      path: '/home/couponManager/issuance',
		      name: 'issuance',
		      component: issuance
		    },
      	    {
		      path: '/home/couponManager/issuance_detail',
		      name: 'issuance_detail',
		      component: issuance_detail
		    },
      	    {
		      path: '/home/couponManager/make_fun_coupon',
		      name: 'make_fun_coupon',
		      component: make_fun_coupon
		    },
      	    {
		      path: '/home/businessManagement/businessListings',
		      name: 'business_listings',
		      component: business_listings
		    },
      	{
		      path: '/home/businessManagement/businessListings/businessListingsDetail',
		      name: 'business_listings_detail',
		      component: business_listings_detail
		    },
      	{
		      path: '/home/quduoduo/coupon_manager_quduoduo',
		      name: 'coupon_manager_quduoduo',
		      component: coupon_manager_quduoduo
		    },
      	{
		      path: '/home/quduoduo/extension_data_quduoduo',
		      name: 'extension_data_quduoduo',
		      component: extension_data_quduoduo
		    },
      	{
		      path: '/home/quduoduo/order_examine_quduoduo',
		      name: 'order_examine_quduoduo',
		      component: order_examine_quduoduo
		    },
      	{
		      path: '/home/quduoduo/order_settlement_quduoduo',
		      name: 'order_settlement_quduoduo',
		      component: order_settlement_quduoduo
		    },
      	{
		      path: '/home/quduoduo/product_manager_quduoduo',
		      name: 'product_manager_quduoduo',
		      component: product_manager_quduoduo
		    },
      	{
		      path: '/home/quduoduo/shopPromotion',
		      name: 'shopPromotion',
		      component: shopPromotion
		    },
      	{
		      path: '/home/businessManagement/embodyApplication',
		      name: 'embody_application',
		      component: embody_application
		    },
      	    {
		      path: '/home/businessManagement/merchantPenaltyRecord',
		      name: 'merchant_penalty_record',
		      component: merchant_penalty_record
		    },
      	    {
		      path: '/home/businessManagement/businessAudits',
		      name: 'business_audits',
		      component: business_audits
		    },
      	    {
		      path: '/home/businessManagement/toOpenList',
		      name: 'to_open_list',
		      component: to_open_list
		    },
      	    {
		      path: '/home/businessManagement/toOpenListDetail',
		      name: 'to_open_list_detail',
		      component: to_open_list_detail
		    },
      	    {
		      path: '/home/businessManagement/messageListStation',
		      name: 'message_list_station',
		      component: message_list_station
		    },
      	    {
		      path: '/home/businessManagement/messageListStation/messageListStationDetail',
		      name: 'message_list_station_detail',
		      component: message_list_station_detail
		    },
      	    {
		      path: '/home/commodityManagement/listOfGoods',
		      name: 'list_of_goods',
		      component: list_of_goods
		    },
      	    {
		      path: '/home/commodityManagement/sale_list',
		      name: 'sale_list',
		      component: sale_list
		    },
      	    {
		      path: '/home/commodityManagement/listOfGoodsDetail',
		      name: 'list_of_goods_detail',
		      component: list_of_goods_detail
		    },
      	    {
		      path: '/home/commodityManagement/commodityClassification',
		      name: 'commodity_classification',
		      component: commodity_classification
		    },
      	    {
		      path: '/home/commodityManagement/commodityClassificationDetail',
		      name: 'commodity_classification_detail',
		      component: commodity_classification_detail
		    },
      	    {
		      path: '/home/commodityManagement/commodityReview',
		      name: 'commodity_review',
		      component: commodity_review
		    },
      	    {
		      path: '/home/commodityManagement/commoditySpecification',
		      name: 'commodity_specification',
		      component: commodity_specification
		    },
      	    {
		      path: '/home/orderManagement/customerComplaintManagement',
		      name: 'customer_complaint_management',
		      component: customer_complaint_management
		    },
      	    {
		      path: '/home/orderManagement/customerComplaintManagementDetail',
		      name: 'customer_complaint_management_detail',
		      component: customer_complaint_management_detail
		    },
      	    {
		      path: '/home/orderManagement/orderList',
		      name: 'order_list',
		      component: order_list
		    },
      	    {
		      path: '/home/orderManagement/orderList/orderListDetail',
		      name: 'order_list_detail',
		      component: order_list_detail
		    },
      	    {
		      path: '/home/orderManagement/listInvoice',
		      name: 'list_of_invoice',
		      component: list_of_invoice
		    },
      	    {
		      path: '/home/orderManagement/listInvoice/listInvoiceDetail',
		      name: 'list_of_invoice_detail',
		      component: list_of_invoice_detail
		    },
      	    {
		      path: '/home/orderManagement/listReturns',
		      name: 'list_of_returns',
		      component: list_of_returns
		    },
      	    {
		      path: '/home/orderManagement/listReturns/listReturnsDetail',
		      name: 'list_of_returns_detail',
		      component: list_of_returns_detail
		    },
      	    {
		      path: '/home/orderManagement/delayedDelivery',
		      name: 'delayedDelivery',
		      component: delayedDelivery
		    },
      	    {
		      path: '/home/orderManagement/delayedDeliveryDetail',
		      name: 'delayedDeliveryDetail',
		      component: delayedDeliveryDetail
		    },
      	    {
		      path: '/home/orderManagement/manual_refund',
		      name: 'manual_refund',
		      component: manual_refund
		    },
      	    {
		      path: '/home/groupPurchaseManagement/orderList',
		      name: 'group_order_list',
		      component: group_order_list
		    },
      	    {
		      path: '/home/groupPurchaseManagement/listInvoice',
		      name: 'group_list_invoice',
		      component: group_list_invoice
		    },
      	    {
		      path: '/home/groupPurchaseManagement/listReturns',
		      name: 'group_list_returns',
		      component: group_list_returns
		    },
      	    {
		      path: '/home/activityManagement/seckill',
		      name: 'seckill',
		      component: seckill
		    },
      	    {
		      path: '/home/activityManagement/seckill_detail',
		      name: 'seckill_detail',
		      component: seckill_detail
		    },
      	    {
		      path: '/home/activityManagement/active_label',
		      name: 'active_label',
		      component: active_label
		    },
      	    {
		      path: '/home/activityManagement/active_label_detail',
		      name: 'active_label_detail',
		      component: active_label_detail
		    },
      	    {
		      path: '/home/activityManagement/lawSavingMoney',
		      name: 'law_saving_money',
		      component: law_saving_money
		    },
      	    {
		      path: '/home/activityManagement/lawSavingMoney/lawSavingMoneyDetail',
		      name: 'law_saving_money_detail',
		      component: law_saving_money_detail
		    },
      	    {
		      path: '/home/activityManagement/moreInterestingStrict',
		      name: 'more_interesting_strict',
		      component: more_interesting_strict
		    },
      	    {
		      path: '/home/activityManagement/moreInterestingStrict/moreInterestingStrictDetail',
		      name: 'more_interesting_strict_detail',
		      component: more_interesting_strict_detail
		    },
      	    {
		      path: '/home/activityManagement/lotteryManagement',
		      name: 'lottery_management',
		      component: lottery_management
		    },
      	    {
		      path: '/home/activityManagement/lotteryManagement/order_list',
		      name: 'lottery_order_list',
		      component: lottery_order_list
		    },
      	    {
		      path: '/home/activityManagement/lotteryManagement/lotteryManagementDetail',
		      name: 'lottery_management_detail',
		      component: lottery_management_detail
		    },
      	    {
		      path: '/home/activityManagement/activityIcon',
		      name: 'activity_icon',
		      component: activity_icon
		    },
      	    {
		      path: '/home/activityManagement/activityIcon/activityIconDetail',
		      name: 'activity_icon_detail',
		      component: activity_icon_detail
		    },
      	    {
		      path: '/home/activityManagement/venue',
		      name: 'venue',
		      component: venue
		    },
      	    {
		      path: '/home/activityManagement/add_venue',
		      name: 'add_venue',
		      component: add_venue
		    },
      	    {
		      path: '/home/activityManagement/active_goods_detail',
		      name: 'active_goods_detail',
		      component: active_goods_detail
		    },
      	    {
		      path: '/home/activityManagement/venue_product',
		      name: 'venue_product',
		      component: venue_product
		    },
      	    {
		      path: '/home/activityManagement/parallel_sessions',
		      name: 'parallel_sessions',
		      component: parallel_sessions
		    },
      	    {
		      path: '/home/activityManagement/symposium',
		      name: 'symposium',
		      component: symposium
		    },
      	    {
		      path: '/home/activityManagement/symposium_detail',
		      name: 'symposium_detail',
		      component: symposium_detail
		    },
      	    {
		      path: '/home/activityManagement/halfOffExclusive',
		      name: 'half_off_exclusive',
		      component: half_off_exclusive
		    },
      	    {
		      path: '/home/activityManagement/halfOffExclusive/halfOffExclusiveDetail',
		      name: 'half_off_exclusive_detail',
		      component: half_off_exclusive_detail
		    },
      	    {
		      path: '/home/activityManagement/fruitQuality',
		      name: 'fruit_of_quality',
		      component: fruit_of_quality
		    },
      	    {
		      path: '/home/activityManagement/fruitQuality/fruitQualityDetail',
		      name: 'fruit_of_quality_detail',
		      component: fruit_of_quality_detail
		    },
      	    {
		      path: '/home/activityManagement/excellentFurniture',
		      name: 'excellent_furniture',
		      component: excellent_furniture
		    },
      	    {
		      path: '/home/activityManagement/excellentFurniture/excellentFurnitureDetail',
		      name: 'excellent_furniture_detail',
		      component: excellent_furniture_detail
		    },
      	    {
		      path: '/home/activityManagement/brandClearance',
		      name: 'brand_clearance',
		      component: brand_clearance
		    },
      	    {
		      path: '/home/activityManagement/brandClearance/brandClearanceDetail',
		      name: 'brand_clearance_detail',
		      component: brand_clearance_detail
		    },
      	    {
		      path: '/home/greatDealManagement/giveMeFavorPayOrder',
		      name: 'give_me_favor_pay_order',
		      component: give_me_favor_pay_order
		    },
      	    {
		      path: '/home/greatDealManagement/giveMeFavorPayOrder/giveMeFavorPayOrderDetail',
		      name: 'give_me_favor_pay_order_detail',
		      component: give_me_favor_pay_order_detail
		    },
      	    {
		      path: '/home/greatDealManagement/giveMeFavorOrder',
		      name: 'give_me_favor_order',
		      component: give_me_favor_order
		    },
      	    {
		      path: '/home/greatDealManagement/giveMeFavorPayGoods',
		      name: 'give_me_favor_pay_goods',
		      component: give_me_favor_pay_goods
		    },
      	    {
		      path: '/home/greatDealManagement/giveMeFavorPayGoods/giveMeFavorPayGoodsDetail',
		      name: 'give_me_favor_pay_goods_detail',
		      component: give_me_favor_pay_goods_detail
		    },
      	    {
		      path: '/home/TimeLimitKillManagement/stopKillingGoods',
		      name: 'stop_killing_goods',
		      component: stop_killing_goods
		    },
      	    {
		      path: '/home/TimeLimitKillManagement/stopKillingGoods/stopKillingGoodsDetail',
		      name: 'stop_killing_goods_detail',
		      component: stop_killing_goods_detail
		    },
      	    {
		      path: '/home/TimeLimitKillManagement/timeManagement',
		      name: 'time_management',
		      component: time_management
		    },
      	    {
		      path: '/home/ExemptionFromSingleManagement/commodityManagement',
		      name: 'commodity_management',
		      component: commodity_management
		    },
      	    {
		      path: '/home/ExemptionFromSingleManagement/commodityManagement/commodityManagementDetail',
		      name: 'commodity_management_detail',
		      component: commodity_management_detail
		    },
      	    {
		      path: '/home/member_management/member_management',
		      name: 'member_management',
		      component: member_management
		    },
      	    {
		      path: '/home/applicationForCompensation/applicationList',
		      name: 'application_list',
		      component: application_list
		    },
      	    {
		      path: '/home/applicationForCompensation/applicationList/applicationListDetail',
		      name: 'application_list_detail',
		      component: application_list_detail
		    },
      	    {
		      path: '/home/advertisingManagement/advertisingList',
		      name: 'advertising_list',
		      component: advertising_list
		    },
      	    {
		      path: '/home/advertisingManagement/advertisingList/advertisingListDetail',
		      name: 'advertising_list_detail',
		      component: advertising_list_detail
		    },
//    	    {
//		      path: '/home/couponManagement/PlatformRedPacketManagement',
//		      name: 'Platform_red_packet_management',
//		      component: Platform_red_packet_management
//		    },
//    	    {
//		      path: '/home/couponManagement/PlatformRedPacketManagement/PlatformRedPacketManagementDetail',
//		      name: 'Platform_red_packet_management_detail',
//		      component: Platform_red_packet_management_detail
//		    },
//    	    {
//		      path: '/home/couponManagement/coupon',
//		      name: 'coupon',
//		      component: coupon
//		    },
//    	    {
//		      path: '/home/couponManagement/coupon/couponDetail',
//		      name: 'coupon_detail',
//		      component: coupon_detail
//		    },
//    	    {
//		      path: '/home/couponManagement/coupon/make_fun_coupon',
//		      name: 'make_fun_coupon',
//		      component: make_fun_coupon
//		    },
      	    {
		      path: '/home/specialManagement/add_list_of_goods',
		      name: 'add_list_of_goods',
		      component: add_list_of_goods
		    },
      	{
		      path: '/home/specialManagement/listGoods',
		      name: 'special_list_goods',
		      component: special_list_goods
		    },
      	{
		      path: '/home/specialManagement/listGoods/specialListGoodsDetail',
		      name: 'special_list_goods_detail',
		      component: special_list_goods_detail
		    },
      	    {
		      path: '/home/specialManagement/specialFieldClassification',
		      name: 'special_field_classification',
		      component: special_field_classification
		    },
      	    {
		      path: '/home/specialManagement/specialFieldClassification/specialFieldClassificationDetail',
		      name: 'special_field_classification_detail',
		      component: special_field_classification_detail
		    },
      	    {
		      path: '/home/seaInManagement/listGoods',
		      name: 'sea_list_goods',
		      component: sea_list_goods
		    },
      	    {
		      path: '/home/seaInManagement/seaNaughtyClassification',
		      name: 'sea_naughty_classification',
		      component: sea_naughty_classification
		    },
      	    {
		      path: '/home/seaInManagement/seaNaughtyClassification/seaNaughtyClassificationDetail',
		      name: 'sea_naughty_classification_detail',
		      component: sea_naughty_classification_detail
		    },
      	    {
		      path: '/home/versionUpdate/versionUpdate',
		      name: 'version_update',
		      component: version_update
		    },
      	    {
		      path: '/home/versionUpdate/versionUpdate/versionUpdateDetail',
		      name: 'version_update_detail',
		      component: version_update_detail
		    },
      	    {
		      path: '/home/reportStatistics/hotSearchRankings',
		      name: 'hot_search_rankings',
		      component: hot_search_rankings
		    },
      	    {
		      path: '/home/reportStatistics/financialStatistics',
		      name: 'financial_statistics',
		      component: financial_statistics
		    },
      	    {
		      path: '/home/reportStatistics/membershipStatistics',
		      name: 'membership_statistics',
		      component: membership_statistics
		    },
      	    {
		      path: '/home/reportStatistics/financialStatistics/financialStatisticsDetail',
		      name: 'financial_statistics_detail',
		      component: financial_statistics_detail
		    },
      	    {
		      path: '/home/reportStatistics/salesRankings',
		      name: 'sales_rankings',
		      component: sales_rankings
		    },
      	    {
		      path: '/home/authority_management/authority_management',
		      name: 'authority_management',
		      component: authority_management
		    },
      	    {
		      path: '/home/authority_management/role_management_detail',
		      name: 'role_management_detail',
		      component: role_management_detail
		    },
      	    {
		      path: '/home/authority_management/managers',
		      name: 'managers',
		      component: managers
		    },
      	    {
		      path: '/home/authority_management/administrator_log',
		      name: 'administrator_log',
		      component: administrator_log
		    },
      	    {
		      path: '/home/moduleManagement/menuManagement',
		      name: 'menu_management',
		      component: menu_management
		    },
      	    {
		      path: '/home/moduleManagement/moduleManagement',
		      name: 'module_management',
		      component: module_management
		    },
      	    {
		      path: '/home/plugInTools/dataReduction',
		      name: 'data_reduction',
		      component: data_reduction
		    },
      	    {
		      path: '/home/plugInTools/dataBackup',
		      name: 'data_backup',
		      component: data_backup
		    },
      	    {
		      path: '/home/plugInTools/PlugInList',
		      name: 'Plug_in_list',
		      component: Plug_in_list
		    },
      ]
    }
  ]
})
