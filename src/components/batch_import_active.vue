<template>
 <div class="up-load">
	<el-upload
	  class="avatar-uploader"
	  ref="upload"
	  :action='this.headerCommon+"/Label/batchShip"'
    :data="upLoadData"
	  :limit="limit"
	  :before-upload="beforeUpload"
	  :show-file-list="false"
	  :on-success="successUpLoad"
	  :on-exceed="onExceed">
	  <el-button size="small" type="primary">{{title}}</el-button>
	</el-upload>
 </div>
</template>
<script>
//import publicImage from '../js/publicImage';
//import batch from '../js/batch_delivery';
/*
 *  :data="upLoadData"
	  :action='this.headerCommon+"/Orderservice/batchShip"'
title  上传时标题
explain  详情说明数组
upLoadData  上传时附带的额外参数
limit  限制数量
imageArr  图片数组

一开始默认不显示  或者如果有 直接赋值
一个开关控制 判断是否有  如果有 显示 如果没有 隐藏

* */
 export default {
   data () {
     return {
     	order_file:"order_file",
     	upLoadDatas:{},
      addTableData:[],
     	fileList2:[],
       isActive:true,
       goodid:'',
       isShow:false,
       dataImageArr:'',
       strCount:true
     }
   },
   props:["title","explain","upLoadData","limit","imageArr","type","isNewProduct"],
   components: {

   },
   created(){
   },
   watch:{

   },
   methods:{
	   	beforeUpload(file){
	   		this.upLoadDatas.file = file;
	   	},
      successUpLoad(response, file, fileList){
          if(response.code == '200'){
                  var jsonData = response.data;
                  var self = this;
                  jsonData.forEach((item)=>{
                    self.addTableData.push(item);
                  })
                  this.$emit("addTableData",self.addTableData)
          }else{
              this.$message.warning(`${ response.msg }`);
          }
          this.$refs.upload.clearFiles();
      },
      onExceed(files, fileList){
        this.$message.warning(files.length)
        var res = fileList[0].response;
              this.$message({
                type:'info',
                message:response.msg
              })
          this.$refs.upload.clearFiles();
      }
   }
 }
</script>

<style lang="less" scoped>
@import '../less/config.less';
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
        width:178px;
        height:178px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    display: block;
  }

</style>
