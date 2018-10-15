<template>
    <div class="search-input">
        <div class="leftLable" v-show="title">{{title}}&nbsp;&nbsp;</div><div class="rightLable">
            <el-date-picker
            v-model="picker"
            type="datetimerange"
            :change = pickerData()
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '00:00:00']">
        </el-date-picker>
        </div>
    </div>
</template>

<script>
 export default {
   data () {
     return {
         start:'',
         end:'',
         picker:[]
     }
   },
   created(){
    	if(this.sTime!=null||this.sTime!=''){
           this.picker.push(this.sTime);
           this.picker.push(this.eTime);
    	}
      if(this.defaultTime!=undefined){
          if(this.defaultTime.length!=0){
            this.picker =this.defaultTime;
          }
      }
   },
   props:["sTime","eTime","title","defaultTime"],
   watch:{
       sTime(newVal,oldVal){
			      this.picker = [];
       		if(this.sTime!=null||this.sTime!=''){
	           this.picker.push(this.sTime);
	           this.picker.push(this.eTime);
       		}
       },
       defaultTime(newVal,oldVal){
        this.picker = newVal;
       }
   },
   methods:{
       pickerData(){
         if(this.picker!=null){
           var start = this.picker[0];
           var end = this.picker[1];
           var sd = new Date(start);
           var ed = new Date(end);
           var M = (sd.getMonth() + 1) >= 10 ? (sd.getMonth() + 1) : ('0'+ (sd.getMonth() + 1));
           var D = sd.getDate() >= 10 ? sd.getDate() : ('0' + sd.getDate());
           var H = sd.getHours() >= 10 ? sd.getHours() : ('0' + sd.getHours());
           var m = sd.getMinutes() >= 10 ? sd.getMinutes() : ('0' + sd.getMinutes());
           var s = sd.getSeconds() >= 10 ? sd.getSeconds() : ('0' + sd.getSeconds());
           
           var EM = (ed.getMonth() + 1) >= 10 ? (ed.getMonth() + 1) : '0'+ (ed.getMonth() + 1);
           var ED = ed.getDate() >= 10 ? ed.getDate() : '0' + ed.getDate();
           var EH = ed.getHours() >= 10 ? ed.getHours() : ('0' + ed.getHours());
           var Em = ed.getMinutes() >= 10 ? ed.getMinutes() : ('0' + ed.getMinutes());
           var Es = ed.getSeconds() >= 10 ? ed.getSeconds() : ('0' + ed.getSeconds());
           var starts = ed.getFullYear() + '-' + M + '-' + D +" " + H + ":" + m + ":" + s;
           var ends = ed.getFullYear() + '-' + EM + '-' + ED +" " + EH + ":" + Em + ":" + Es;
            var arrPicker = [];
            arrPicker.push(starts)
            arrPicker.push(ends)
            this.$emit('onPassByVal',arrPicker);
         }else{
              this.$emit('onPassByVal',arrPicker);
         }
       }
   }
 }
</script>

<style lang="less" scoped>
.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
  width:370px;
}
.search-input{
    display: inline-block;
    overflow: hidden;
    margin-bottom:10px;
    margin-left:10px;
    float:left;
    // width:500px;
    .leftLable{
        float:left;
        width:120px;
        height:40px;
        margin-right:10px;
        text-align: right;
        line-height: 40px;
        display: block;
    }
    .rightLable{
        float:left;
        display: block;
        width:380px;
        height:40px;
	    .el-date-editor--daterange.el-input,
	    .el-date-editor--daterange.el-input__inner,
	     .el-date-editor--timerange.el-input,
	     .el-date-editor--timerange.el-input__inner{
	        width:240px;
	    }
    }
}
</style>
