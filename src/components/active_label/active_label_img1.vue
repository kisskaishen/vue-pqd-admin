<template>
 <div class="up-load">
    <div class="tits">
      <div class="arrangement-content">
        <ul class="arrangement-pictures">
          <li v-show="isShow" class="up-load-img"><img :src="dataImageArr" class="avatar"><i class="delete" @click="deleteBig(type)"></i></li>
        </ul>
        <div style="width:100px;height:100px" class="upLoad" v-show="strCount">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              :action='this.headerCommon+"/Upload/index"'
              :show-file-list="false"
              :data="upLoadData"
              :on-success="successUpLoad"
              :on-exceed="onExceed">
              <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <ul class="categoryExplain" v-show="explain">
            <li v-for="(item,index) in explain">{{item.value}}</li>
        </ul>
      </div>
    </div>
 </div>
</template>
<script>
/*
title  上传时标题
explain  详情说明数组
upLoadData  上传时附带的额外参数
keys  列表第几个
imageArr  图片数组

一开始默认不显示  或者如果有 直接赋值
一个开关控制 判断是否有  如果有 显示 如果没有 隐藏

* */
import routers from '../../router/index.js';
 export default {
   data () {
     return {
       isActive:true,
       goodid:'',
       isShow:false,
       dataImageArr:'',
       strCount:true
     }
   },
   props:["type","goodsId","upLoadData","keys","imageArr","type","explain"],
   components: {

   },
   created(){
		this.dataImageArr = this.imageArr;
		if(this.imageArr==''||this.imageArr==undefined){
            this.strCount = true;
         }else{
            this.isShow = true;
            this.strCount = false;
         }
   },
   watch:{
		imageArr(newVal,oldVal){
			if(newVal==''){
	            this.isShow = false;
	            this.strCount = true;
			}else{
				this.dataImageArr = newVal;
	            this.isShow = true;
	            this.strCount = false;
			}
		}
   },
   methods:{
     deleteBig(type,index){
         this.dataImageArr = '';
         this.isShow = false;
         this.strCount = true;
         this.$emit("deleteImg",this.type)
     },
      successUpLoad(response, file, fileList){
          if(response.code == 200){
              this.$message({
              	type:'success',
              	message:response.msg
              });
	             this.isShow = true;
	             this.dataImageArr = response.data;
	             this.strCount = false;
	             this.$emit("addImg",[this.dataImageArr,this.type])
          }else{
          	if(response.code == 8100){
          		routers.push({path : "/login"});
          	}else{
          		this.$message.warning(`${ response.msg }`);
          	}
          }
          this.$refs.upload.clearFiles();
      },
      onExceed(files, fileList){
        this.$message.warning(files.length)
        var res = fileList[0].response;
          if(res.code==200){
              this.$message.warning(`${ res.msg }`);
              this.dataImageArr = res.data;
          }else{
          	this.$message.warning(`${ res.msg }`);
          }
          this.$refs.upload.clearFiles();
      }
   }
 }
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.up-load{
  .tits{
    margin:0 0 20px 0;
    overflow: hidden;
    .arrangement-content{
      overflow: hidden;
      .arrangement-pictures{
        float:left;
        overflow: hidden;
          li{
            float:left;
            margin-right:10px;
            margin-bottom:10px;
          }
      }
      .upLoad{
        float:left;
        width:100px;
        height:100px;
        border:1px solid @borderddd;
        border:1px solid #ddd;
        background:@backgroundeee;
      }
      .categoryExplain{

      }
    }
    .category{
      text-align: right;
      width:110px;
      margin-left:20px;
      height:40px;
      line-height: 40px;
      float:left;
    }
    .categoryExplain{
      float:left;
      margin-left:20px;
    }
  }
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

</style>
