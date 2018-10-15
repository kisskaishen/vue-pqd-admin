import api from './ajax';
import axios from 'axios';
import Vue from 'vue';
let qs = require('qs')

export default {
    signUp(url,data,that){
    	axios({
			method : 'post',
			url : url,
			data : qs.stringify(data),
		}).then(function(response) {
			var result = response.data;
			if(result.code == '200'){
				var token = result.data.token;
	      		localStorage.setItem("token",token);
				Vue.prototype.headers = {
				  "Authorization":token
				}
//          	axios.defaults.headers.common['Authorization'] = result.data.token;
	      		that.$router.push("/home");
              		
            }else{
            	that.$message(result.msg);
            }
		},function(response) {

		})
    },
    logout(url,that){
    	/* 注销登录  passport/logout*/
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
              if(result.code == '200'){
              	that.$router.push("/login");
              }
            }
        })
    },
}