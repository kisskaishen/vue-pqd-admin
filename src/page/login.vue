<template>
	<div class="login" @keydown="KeyDown();">
		<div class="login_in">
			<!--{{images}}-->
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
				<div class="login_in_name">总后台系统</div>
				<el-form-item prop="username">
					<el-input class="username" v-model="ruleForm.username" placeholder="账户" prefix-icon="el-icon-message"></el-input>
				</el-form-item>
				<el-form-item prop="password">
				<el-input type="password" class="pwd" v-model="ruleForm.password" placeholder="密码" prefix-icon="el-icon-search"></el-input>
				</el-form-item>
				<div class="code_warp">
					<div class="code_warp_left">
						<!--<el-form-item prop="capatch">-->
						<el-form-item>
							<el-input v-model="ruleForm.capatch" placeholder="验证码"></el-input>
						</el-form-item>
					</div>
					<div class="code_warp_right" @click="HandoffCode()">
						<img :src='images' alt="" style="width:140px;height:40px;"/>
					</div>
				</div>
				<el-button id="sign_up" class="sign_up" type="primary" @click="sign_up('ruleForm')">立即登录</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import Vue from 'vue';
	import Login from '../js/login.js';
	export default{
		data(){
			return{
				rules:{
			          username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			            { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' }
			          ],
			          password: [
			            { required: true, message: '请输入密码', trigger: 'blur' },
			            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
			          ],
			          capatch: [
			            { required: true, message: '请输入验证码', trigger: 'blur' },
			            { min: 4, max: 6, message: '长度在 4到6 个字符', trigger: 'blur' }
			          ],
				},
				images:'',
				ruleForm:{
					username:'',
					password:'',
					capatch:'',
				},
				guid:'',
				currentUrl:''
			}
		},
		created(){
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
				this.currentUrl = topRoot;
			}else if(k_host == currentHostCn){
				this.currentUrl = testRoot;
			}else if(k_host == currentHostCom){
				this.currentUrl = comRoot;
			}else if(k_host=='localhost:8080'){
				if(root=='http://adminapitest.pinquduo.top'){
					this.currentUrl = topRoot;
				}else if(root=='https://adminapitest.pinquduo.cn'){
					this.currentUrl = testRoot;
				}else if(root=='https://adminapi.pqdshop.com'){
					this.currentUrl = comRoot;

				}
			}

			this.guid = this.guids();
			this.images = this.currentUrl+"/passport/capatch?guid="+this.guid;
			console.log(this.images)
		},
		methods:{
			KeyDown(){
			  if (event.keyCode == 13){
				var sign_up = document.getElementById("sign_up");
				sign_up.click();
			  }
			},
			guids() {
				function S4() {
				   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
				}
				return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
			},
			login(){
				this.$router.push("/home")
			},
			HandoffCode(){
				this.guid = this.guids();
				this.images = this.currentUrl+"/passport/capatch?guid="+this.guid;
			},
			sign_up(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
					var data = {
						username:this.ruleForm.username,
						password:this.ruleForm.password,
						capatch:this.ruleForm.capatch,
						guid:this.guid
					}
					localStorage.setItem("adminName",this.ruleForm.username);
					Login.signUp('passport/login',data,this);
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
			}
		}
	}
</script>
<style lang="less" scoped="scoped">
.login{
		background:url(../images/blur-background.jpg) no-repeat;
		background-size:cover;
		height:100%;
	.login_in{
		width:300px;
		background:#fff;
		position: absolute;
		top:50%;
		left:50%;
		margin-left:-150px;
		margin-top:-175px;
		padding:20px;
		.login_in_name{
			line-height:1.8;
			font-weight:bold;
			text-align: center;
			font-size:24px;
		}
		.username,.pwd{
			margin-top:10px;
		}
		.code_warp{
			margin-top:10px;
			overflow: hidden;
			.code_warp_left{
				width:40%;
				float:left;
			}
			.code_warp_right{
				width:55%;
				float:right;
				cursor: pointer;
			}
		}
		.sign_up{
			width:100%;
			margin-top:20px;
		}
	}
}
</style>
