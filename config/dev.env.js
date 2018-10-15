'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

//module.exports = merge(prodEnv, {
//NODE_ENV: '"development"'
//})



const target = process.env.npm_lifecycle_event;
if (target == 'devtest') {
　　//测试
　　var obj = merge(prodEnv, {
	  NODE_ENV: '"development"',
	  API_ROOT:'"https://adminapitest.pinquduo.cn"',
	  VERSION_ROOT:'"1"'
	})
}else if(target == 'devpre'){
　　//开发
　　var obj = merge(prodEnv, {
		  NODE_ENV: '"development"',
		  API_ROOT:'"http://adminapitest.pinquduo.top"',
	  VERSION_ROOT:'"1"'
	})
} else if(target == 'devprod'){
　　//生产
　　var obj = merge(prodEnv, {
	  NODE_ENV: '"development"',
	  API_ROOT:'"https://adminapi.pqdshop.com"',
	  VERSION_ROOT:'"1"'
	})
}else{
　　//线上
　　var obj = merge(prodEnv, {
	  NODE_ENV: '"development"',
	  API_ROOT:'"https://adminapi.pqdshop.com"',
	  VERSION_ROOT:'"1"'
	})
}
module.exports = obj;
