import axios from 'axios';
import Vue from 'vue';
import { Message } from 'element-ui';
import { Loading } from 'element-ui';
import routers from '../router/index.js';
let qs = require('qs')
var configUrl = {
	preUrl: "mygladmin.pinquduo.top",
	preUrlStore: "store.pinquduo.top",
	testUrl: "testmygladmin.pinquduo.cn",
	testUrlStore: "teststore1.pinquduo.cn",
	prodUrl: "mygladmin.pinquduo.cn",
	prodUrlStore: "sell.pinquduo.cn",
}
var currentHostTop = configUrl.preUrl;
var currentHostCn = configUrl.testUrl;
var currentHostCom = configUrl.prodUrl;
const root = process.env.API_ROOT;
var topRoot  = 'http://adminapitest.pinquduo.top';
var testRoot = 'https://adminapitest.pinquduo.cn';
var comRoot  = 'https://adminapi.pqdshop.com';
var k_host = window.location.host;
if(k_host == currentHostTop){

	axios.defaults.baseURL = topRoot;
	Vue.prototype.headerCommon = topRoot;

}else if(k_host == currentHostCn){

	axios.defaults.baseURL = testRoot;
	Vue.prototype.headerCommon = testRoot;

}else if(k_host == currentHostCom){

	axios.defaults.baseURL = comRoot;
	Vue.prototype.headerCommon = comRoot;

}else if(k_host=='192.168.1.201:8080'){
	if(root=='http://adminapitest.pinquduo.top'){
		axios.defaults.baseURL = topRoot;
		Vue.prototype.headerCommon = topRoot;
	}else if(root=='https://adminapitest.pinquduo.cn'){
		axios.defaults.baseURL = testRoot;
		Vue.prototype.headerCommon = testRoot;
	}else if(root=='https://adminapi.pqdshop.com'){
		axios.defaults.baseURL = comRoot;
		Vue.prototype.headerCommon = comRoot;
	}
}



//开发测试环境
//axios.defaults.baseURL = root;
//Vue.prototype.headerCommon = root;

//开发测试环境
//axios.defaults.baseURL = 'http://adminapitest.pinquduo.top';
////全局变量头
//Vue.prototype.headerCommon = "http://adminapitest.pinquduo.top";
//////图片上传
//Vue.prototype.upLoadGoodsUrl = "http://adminapitest.pinquduo.top/Upload/index";

//测试环境
//axios.defaults.baseURL = 'https://adminapitest.pinquduo.cn';
////全局变量头
//Vue.prototype.headerCommon = "https://adminapitest.pinquduo.cn";
////图片上传
//Vue.prototype.upLoadGoodsUrl = "https://adminapitest.pinquduo.cn/Upload/index";

//正式环境
//axios.defaults.baseURL = 'https://adminapi.pqdshop.com';
//Vue.prototype.headerCommon = "https://adminapi.pqdshop.com";
////图片上传
//Vue.prototype.upLoadGoodsUrl = "https://adminapi.pqdshop.com/Upload/index";
//

export default{
   commonAjax(opts){
        if(!opts)return;
        var options = {
        	fullscreen:true,
        	lock:false,
        	body:true,
        }
        Loading.service(options);
        var that = this;
        var url = opts.url ? opts.url : null;
        var data = opts.data ? opts.data : {};
        var params = opts.params ? opts.params : {};
        var header = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
        var token = localStorage.getItem("token");
        if(token) {
					// header["Authorization"] = token;
					data.Authorization = token;
				}
				// Vue.prototype.headers = {
				//   "Authorization":token
				// }
        axios({
            method : (opts.method ? opts.method : "get"),
            url : url,
            data : qs.stringify(data),
            params : params,
            headers:header
        }).then(function(response) {
        	let loadingInstance = Loading.service(options);
			Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
			  loadingInstance.close();
              that.successhander(response,opts);
			});
        },function(response,gg,ggg) {
        	let loadingInstance = Loading.service(options);
			Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
			    loadingInstance.close();
            	that.errorhander(response,opts);
			});
        })
    },
    successhander(res,opts) {
        var data = res.data;
        var status = data.code;
        var msg = data.msg;
        if (status == '8100') {
        	routers.push({path : "/login"});
        }else{
            opts.success(data)
		}
    },
    errorhander(res,opts) {
        var data = res.data;
		Message({type: 'info', message: "网络异常！"});
		opts.error ? opts.error(data) : '';
    }
}











































///*重新封装ajax*/
//import Vue from 'vue'
//import axios from 'axios'
//export default{
//	commAjax(opts) {
//		if(!opts) return false;
//		var that = this;
//		var url = (opts.url ? opts.url : null);
//		var params = opts.params ? opts.params : {};
//		var header = {'Access-Control-Allow-Origin':'*','X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/json;charset=UTF-8'};
////		"Authorization":"Bearer " +asstoken''
//		axios({
//			method : (opts.method ? opts.method : "get"),
//			url : url,
//			params : params,
//			headers: header,
//		}).then(function(response) {
//			 console.log(response)
//			 console.log(opts)
////			that.callbankSussess(response,opts);
//		},function(response) {
//			 console.log(response)
//			 console.log(opts)
////			that.callBankError(response,opts);
//		})
//	}
//}
