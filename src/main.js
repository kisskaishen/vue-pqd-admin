// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
// axios.defaults.baseURL = ''			// 开发公共接口

var k_host = window.location.host;
console.log(k_host)
if (k_host == 'localhost:8080') {
  axios.defaults.baseURL = 'http://adminapitest.pinquduo.top/'			// 开发公共接口
} else if (k_host == 'http://mygladmin.pinquduo.top') {
  axios.defaults.baseURL = 'https://adminapitest.pinquduo.cn/'			// 开发公共接口
} else if (k_host == 'https://mygladmin.pinquduo.cn') {
  axios.defaults.baseURL = 'https://adminapi.pqdshop.com/'			// 开发公共接口
}
// if(root=='http://adminapitest.pinquduo.top'){
//   this.currentUrl = topRoot;
// }else if(root=='https://adminapitest.pinquduo.cn'){
//   this.currentUrl = testRoot;
// }else if(root=='https://adminapi.pqdshop.com'){
//   this.currentUrl = comRoot;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

Vue.config.productionTip = false;


Vue.filter('UE_input', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}
//console.log(newDate.format('yyyy-MM-dd h:m:s'));


Vue.prototype.removeObjWithArr = function (_arr, _obj) {
  var length = _arr.length;
  for (var i = 0; i < length; i++) {
    if (_arr[i] == _obj) {
      if (i == 0) {
        console.log(i)
        _arr.shift(); //删除并返回数组的第一个元素
        return;
      }
      else if (i == length - 1) {
        console.log(i)
        _arr.pop();  //删除并返回数组的最后一个元素
        return;
      }
      else {
        console.log(i)
        _arr.splice(i, 1); //删除下标为i的元素
        return;
      }
    }
  }
}
/*
1.必须为数字
2.必须为整数或者字母
3.不能为空
4.不能超过len

 * */
Vue.prototype.checkLength = '10';
Vue.prototype.checkEmpty = function (val, name) {
  console.log(val)
  if (val == '') {
    this.$message({
      type: 'info',
      message: name + '不能为空'
    })
    return
  }
}
Vue.prototype.checkNum = function (val, name) {
  console.log(val)
  if (val == '') {
    this.$message({
      type: 'info',
      message: name + '不能为空'
    })
    return
  } else if (isNaN(val)) {
    this.$message({
      type: 'info',
      message: name + '必须为数字'
    })
    return
  }
}
Vue.prototype.checkNumOrLetter = function (val, name) {
  console.log(val)
  var reg = /^[0-9a-zA-Z]+$/;
  if (val == '') {
    this.$message({
      type: 'info',
      message: name + '不能为空'
    })
    return
  } else if (!reg.test(val)) {
    this.$message({
      type: 'info',
      message: name + '必须为整数或者字母'
    })
    return
  }
}
Vue.prototype.checkEmail = function (val, name) {
  console.log(val)
  var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
  if (val == '') {
    this.$message({
      type: 'info',
      message: name + '不能为空'
    })
    return
  } else if (myReg.test(val)) {
    this.$message({
      type: 'info',
      message: name + '格式错误'
    })
  }
}
/*检测身份id */
Vue.prototype.checkIDCard = function (val, name) {
  console.log(val)
  if (val == '') {
    this.$message({
      type: 'info',
      message: name + '不能为空'
    })
    return
  } else if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(val))) {
    this.$message({
      type: 'info',
      message: name + '格式错误'
    })
  }
}
/*检测手机号*/
Vue.prototype.checkMobile = function (val, name) {
  console.log(val)
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (val == '') {
    this.$message({
      type: 'info',
      message: name + '不能为空'
    })
    return
  } else if (!myreg.test(val)) {
    this.$message({
      type: 'info',
      message: name + '格式错误'
    })
  }
}
/*检测数字和小数点*/
Vue.prototype.checkNumDo = function (obj) {
  obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  ............
  obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
  if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    obj.value = parseFloat(obj.value);
  }
}
//var root = process.env.API_ROOT_DICT;
//axios.defaults.baseURL = root;
//Vue.prototype.headerCommon = root;
//Vue.prototype.upLoadGoodsUrl = root+'/Upload/index';

router.beforeEach(function (to, from, next) {
  const nextRoute = [
    'index',
    'business_listings',
    'merchant_penalty_record',
    'message_list_station',
    'list_of_goods',
    'commodity_classification',
    'commodity_specification',
    'sale_list',
    'customer_complaint_management',
    'order_list',
    'delayedDelivery',
    'venue',
    'half_off_exclusive',
    'activity_icon',
    'lottery_management',
    'more_interesting_strict',
    'law_saving_money',
    'fruit_of_quality',
    'excellent_furniture',
    'brand_clearance',
    'member_management',
    'advertising_list',
    'special_list_goods',
    'special_field_classification',
    'version_update',
    'authority_management',
    'managers',
    'administrator_log',
    'menu_management',
    'coupon_list',
    'coupon_issuance',
    'coupon_statistics',
    'account_list',
    'account_income',
    'account_reflect',
    'marketing_active',
    'resource_activity',
    'sea_good_list',
    'sea_good_category',
    'wx_setting',
    'appIcon',
    'journal_list',
    'evaluate',
    'sensitive',
    'feedback',
  ];
  var rout = to.name;
  console.log(rout)
//console.log(rout)
  var keys = '';
  if (rout == 'index') {
    keys = '1'
  } else if (rout == 'business_listings') {
    keys = '2-1'
  } else if (rout == 'merchant_penalty_record') {
    keys = '2-2'
  } else if (rout == 'message_list_station') {
    keys = '2-3'
  } else if (rout == 'list_of_goods') {
    keys = '3-1'
  } else if (rout == 'commodity_classification') {
    keys = '3-2'
  } else if (rout == 'commodity_specification') {
    keys = '3-3'
  } else if (rout == 'sale_list') {
    keys = '3-4'
  } else if (rout == 'customer_complaint_management') {
    keys = '4-1'
  } else if (rout == 'order_list') {
    keys = '4-2'
  } else if (rout == 'delayedDelivery') {
    keys = '4-3'
  } else if (rout == 'venue') {
    keys = '5-1'
  } else if (rout == 'half_off_exclusive') {
    keys = '5-2'
  } else if (rout == 'activity_icon') {
    keys = '5-3'
  } else if (rout == 'lottery_management') {
    keys = '5-4'
  } else if (rout == 'more_interesting_strict') {
    keys = '5-5'
  } else if (rout == 'law_saving_money') {
    keys = '5-6'
  } else if (rout == 'fruit_of_quality') {
    keys = '5-7'
  } else if (rout == 'excellent_furniture') {
    keys = '5-8'
  } else if (rout == 'brand_clearance') {
    keys = '5-9'
  } else if (rout == 'member_management') {
    keys = '6-1'
  } else if (rout == 'advertising_list') {
    keys = '7-1'
  } else if (rout == 'special_list_goods') {
    keys = '8-1'
  } else if (rout == 'special_field_classification') {
    keys = '8-2'
  } else if (rout == 'version_update') {
    keys = '9-1'
  } else if (rout == 'authority_management') {
    keys = '10-1'
  } else if (rout == 'managers') {
    keys = '10-2'
  } else if (rout == 'administrator_log') {
    keys = '10-3'
  } else if (rout == 'menu_management') {
    keys = '11-1'
  } else if (rout == 'coupon_list') {
    keys = '12-1'
  } else if (rout == 'coupon_issuance') {
    keys = '12-2'
  } else if (rout == 'coupon_statistics') {
    keys = '12-3'
  } else if (rout == 'account_list') {
    keys = '13-1'
  } else if (rout == 'account_income') {
    keys = '13-2'
  } else if (rout == 'account_reflect') {
    keys = '13-3'
  } else if (rout == 'marketing_active') {
    keys = '14-1'
  } else if (rout == 'resource_activity') {
    keys = '14-2'
  } else if (rout == 'sea_good_list') {
    keys = '15-1'
  } else if (rout == 'sea_good_category') {
    keys = '15-2'
  } else if (rout == 'wx_setting') {
    keys = '16-1'
  } else if (rout == 'appIcon') {
    keys = '17-1'
  } else if (rout == 'journal_list') {
    keys = '18-1'
  } else if (rout == 'evaluate') {
    keys = '19-1'
  } else if (rout == 'sensitive') {
    keys = '19-2'
  } else if (rout == 'feedback') {
    keys = '20-1'
  }
  console.log(keys)
  Vue.prototype.nextRouteArr = keys;
  next();
});
window.eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
