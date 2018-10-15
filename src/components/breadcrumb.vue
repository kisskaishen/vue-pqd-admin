<template>
 <div class="breadcrumb">
	<el-breadcrumb separator="/">
	  <el-breadcrumb-item :to="{ path: '/home' }">后台首页</el-breadcrumb-item>
	  <el-breadcrumb-item :to="{ path: content.path1 }">{{content.title1}}</el-breadcrumb-item>
	  <el-breadcrumb-item v-show="content.path2" :to="{ path: content.path2 }">{{content.title2}}</el-breadcrumb-item>
	</el-breadcrumb>
 </div>
</template>

<script>
 export default {
   data () {
     return {
	
     }
   },
   created(){
   },
   props:[
   	"content",
   ],
   components: {

   },
   methods:{

   }
 }
</script>


<style lang="less" scoped>
.breadcrumb{
	background:#f5f5f5;
	padding:8px 15px;
}
</style>
