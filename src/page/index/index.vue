<template>
 <div class="index">
	<breadcrumb :content="content_title"></breadcrumb>
	<div class="index_content">
		<ul class="show_list">
			<li v-for="(item,index) in listData">
				<dl class="show_list_style">
					<dt><img :src="item.icon" alt="" /></dt>
					<dd>
						<span>{{item.title}}</span>
						<div class="value">{{item.value}}</div>
					</dd>
				</dl>
			</li>
		</ul>
		<div class="statistics_the_day">
			<div class="statistics_the_day_title">今日统计</div>
			<ul class="statistics_the_day_list">
				<li v-for="(its,index) in statisticsData">
					<div class="warp">
						<span>{{its.title}}</span>
						<span>{{its.value}}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="E_chart">
			<div id="main" style="width: 960px;height:400px;"></div>
		</div>
		<!--<div class="current_system">
			<div class="warp">
				<table class="show_list_table" border="0" cellspacing="" cellpadding="">
					<tbody>
						<tr>
							<td>服务器操作系统：</td>
							<td>Linux</td>
							<td>服务器域名/IP：</td>
							<td>testapi.pinquduo.cn [ 127.0.0.1 ]</td>
							<td>服务器环境：</td>
							<td>nginx/1.10.0</td>
						</tr>
						<tr>
							<td>PHP 版本：</td>
							<td>5.6.19</td>
							<td>Mysql 版本：</td>
							<td></td>
							<td>GD 版本</td>
							<td>bundled (2.1.0 compatible)</td>
						</tr>
						<tr>
							<td>文件上传限制：</td>
							<td>20M</td>
							<td>最大占用内存：</td>
							<td>128M</td>
							<td>最大执行时间：</td>
							<td>30s</td>
						</tr>
						<tr>
							<td>安全模式：</td>
							<td>NO</td>
							<td>Zlib支持：</td>
							<td>YES</td>
							<td>Curl支持：</td>
							<td>YES</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>		-->
		<!--<div class="current_system">
			<div class="warp">
				<table class="show_list_table" border="0" cellspacing="" cellpadding="">
					<tbody>
						<tr>
							<td>商品ID：</td>
							<td>
								<div class="width-120-warp">
									<div class="width-120">
										<el-input v-model="input" placeholder="请输入内容"></el-input>
									</div>
									<span>每个ID用英文逗号分开</span>
								</div>
							</td>
						</tr>
						<tr>
							<td>销量：</td>
							<td>
								<div class="width-120-warp">
									<div class="width-120">
										<el-input v-model="input" placeholder="请输入内容"></el-input>
									</div>
									<span>请输入整型数字</span>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div class="height-32">
									<el-button type="danger">更改</el-button>
								</div>
							</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>-->
		<!--<div class="current_system">
			<div class="warp">
				<table class="show_list_table" border="0" cellspacing="" cellpadding="">
					<tbody>
						<tr>
							<td>订单号：</td>
							<td>
								<div class="width-120-warp">
									<div class="width-120">
										<el-input v-model="input" placeholder="请输入内容"></el-input>
									</div>
									<span>每个订单号用英文逗号分开</span>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div class="height-32">
									<el-button type="danger">退款</el-button>
								</div>
							</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>-->
	</div>
 </div>
</template>

<script>
import Vue from 'vue';
import Statis from '../../js/Statistics.js';
import breadcrumb from '../../components/breadcrumb';

 export default {
   data () {
     return {
     	seriesEchart:[],
     	timeEchart:[],
		content_title:{
			title1:"统计",
			title2:"",
			path1:'/home',
			path2:''
		},
     	input:'',
     	statisticsData:[],
		listData:[]
     }
   },
   created(){
		/* 今日统计  Statistics/list */
		Statis.Statistics("Statistics/list",this);
		var chartData = {
			add_time:''
		}
		Statis.StatisticsImgOrderTotal("Statistics/imgOrderTotal",chartData,this);
		var token = localStorage.getItem("token");
		Vue.prototype.headers = {
		    "Authorization": token
		}
   },
   components: {
	breadcrumb
   },
   methods:{

   }
 }
</script>


<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/index/index.less";
.E_chart{
	margin: 20px 20px 0;
    background: #fff;
}
</style>
