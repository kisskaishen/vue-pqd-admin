'use strict'
//module.exports = {
//NODE_ENV: '"production"'
//}
const target = process.env.npm_lifecycle_event;
if (target == 'buildtest') {
　　//测试
　　var obj = {
	　　NODE_ENV: '"production"',
	　　API_ROOT: '"https://adminapitest.pinquduo.cn"',
　　}
}else if(target == 'buildpre'){
	
　　//开发
　　var obj = {
	　　NODE_ENV: '"production"',
	　　API_ROOT: '"http://adminapitest.pinquduo.top"',
　　}
} else if(target == 'buildprod'){
	
　　//生产
　　var obj = {
	　　NODE_ENV: '"production"',
	　　API_ROOT: '"https://adminapi.pqdshop.com"',
　　}
}else{
　　//线上
　　var obj = {
　　NODE_ENV: '"production"',
　　API_ROOT: '"https://adminapi.pqdshop.com"',
　　}
}
module.exports = obj;
