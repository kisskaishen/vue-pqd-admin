、<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/evaluateManager/evaluate.less";
.container{
	padding:0 20px;
}
	.el-form-item {
		margin-bottom:20px;
	}
</style>
<template>
	<div class="evaluate">
		<breadcrumb :content="content_title"></breadcrumb>
		<div class="container">
			<div class="search_admin_list_table">
				<div class="search_admin_list_table_title">
					<span>
						活动标签商品
					</span>
				</div>
				<div class="search_btn">
					<div class="search_content">
						<span>商品ID</span>
						<div class="width-120">
							<el-input v-model="form.goods_id" placeholder="商品ID"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>商品名称</span>
						<div class="width-120">
							<el-input v-model="form.key_word" placeholder="商品名称"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>商户名称</span>
						<div class="width-120">
							<el-input v-model="form.store_name" placeholder="商户名称"></el-input>
						</div>
					</div>
					<div class="search_content">
						<span>标签名称</span>
						<div class="width-120" style="width:200px;">
							<el-cascader
							 style="width:200px;"
							expand-trigger="hover"
							:options="selectLabelOption"
							@change="handleChange">
						</el-cascader>
							  <!-- <el-select v-model="form.type" placeholder="全部">
							    <el-option
							      v-for="item in labelTypeOption"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select> -->
						</div>
					</div>
					<!-- <div class="search_content">
						<span>所属活动</span>
						<div class="width-120">
							  <el-select v-model="form.status" placeholder="全部">
							    <el-option
							      v-for="item in belongedActivitiesOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
						</div>
					</div> -->
					<!-- <div class="search_content">
						<span>标签名称</span>
						<div class="width-120">
							  <el-select v-model="form.label_name" placeholder="全部">
							    <el-option
							      v-for="item in labelNameOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
						</div>
					</div> -->
					<div class="search_content">
						<el-button type="primary" @click="searchListData()">查询</el-button>
						<el-button type="primary" @click="addVenue()">添加主活动商品</el-button>
						<el-button type="primary" @click="batchDeleting()">批量删除</el-button>
					</div>
				</div>
			</div>
			<div class="table_warp" style="padding:20px;background:#fff">
					<el-table
				    :data="tableData"
				    border
				    style="width: 100%"
    				@selection-change="handleSelectionChange">
				    <el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>
				    <el-table-column
				      prop="label_name"
				      label="标签名称"
				      width="150">
				    </el-table-column>
				    <el-table-column
				      prop="type_name"
				      label="标签类型">
				    </el-table-column>
				    <el-table-column
							prop="validity_time_name"
				      label="有效期"
				      width="200">
				    </el-table-column>
				    <el-table-column
				      prop="goods_id"
				      label="商品ID"
				      width="80">
				    </el-table-column>
				    <el-table-column
				      prop="goods_name"
				      label="商品名称"
				      width="320">
				    </el-table-column>
				    <el-table-column
				      prop="store_name"
				      width="220"
				      label="商户名称">
				    </el-table-column>
				    <!-- <el-table-column
				      prop="type_lable"
				      width="220"
				      label="所属活动">
				    </el-table-column> -->
				    <el-table-column
				      prop="store_count"
				      width="100"
				      label="库存">
				    </el-table-column>
				    <el-table-column
				      prop="market_price"
				      width="100"
				      label="市场价">
				    </el-table-column>
				    <el-table-column
				      prop="prom_price"
				      width="100"
				      label="团购价">
				    </el-table-column>
				    <el-table-column
				      label="操作"
				      width="80">
				      <template slot-scope="scope">
							<el-button type="text" @click="deleteProduct(scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
		  		</el-table>
			</div>
	       <div class="pagination" v-show="tableData.length!=0">
	        <el-pagination
	          @current-change="handleCurrentChange"
	          :current-page="currentPage"
	          :page-size = 'pageSize'
	          layout="total, prev, pager, next, jumper"
	          :total='totals'>
	        </el-pagination>
	      </div>
		</div>

    <!-- <el-dialog
    title="添加商品"
    :visible.sync="addLabelMarklDialogVisibles"
    width="400px">
      <div class="transfer_bank">
        <div class="transfer_bank_warp">
          <div class="transfer_bank_warp_main">
              <div class="content">
                    <div class="content_left">标签类型:</div>
                    <div class="content_right">
                        <div class="search_content">
                          <div class="width-120">
                            <el-select size="small" @change="changeType" v-model="typeId" placeholder="请选择">
                              <el-option v-for="item in labelTypeOption" :key="item.value" :label="item.label" :value="item.value">
                              </el-option>
                            </el-select>
                          </div>
                      </div>
                    </div>
                    <div class="content_right_explain">
                    </div>
              </div>
              <div class="content">
                <div class="content_left">标签名称:</div>
                <div class="content_right">
                    <div class="search_content">
                      <div class="width-120">
                        <el-select size="small" v-model="labelId" placeholder="请选择">
                          <el-option v-for="item in labelName" :key="item.id" :label="item.label_name" :value="item.id">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                </div>
                <div class="content_right_explain">
                </div>
              </div>
              <div class="content">
                <div class="content_left">商品选择:</div>
                <div class="content_right">
                  <el-radio v-model="radio" label="1">按商品</el-radio>
                  <el-radio v-model="radio" label="2">按活动</el-radio>
                </div>
                </div>
          </div>
        </div>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="addLabelMarklDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addLabel()">确 定</el-button>
    </span>
    </el-dialog> -->

    <el-dialog
    title="添加商品"
    :visible.sync="addLabelMarklDialogVisible"
    width="400px">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="标签类型" prop="typeId">
				<el-select size="small" @change="changeType" v-model="ruleForm.typeId" placeholder="请选择">
					<el-option v-for="item in labelTypeOption" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
		  <el-form-item label="标签名称" prop="labelId">
					<el-select size="small" v-model="ruleForm.labelId" placeholder="请选择">
						<el-option v-for="item in labelName" :key="item.id" :label="item.label_name" :value="item.id">
						</el-option>
					</el-select>
		  </el-form-item>
		  <el-form-item label="商品选择" prop="resource">
		    <el-radio-group v-model="ruleForm.radio">
					<el-radio label="1">按商品</el-radio>
					<!-- <el-radio label="2">按活动</el-radio> -->
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="addLabel('ruleForm')">确 定</el-button>
		  </el-form-item>
		</el-form>
    </el-dialog>
	</div>
</template>

<script>
import breadcrumb from '../../components/breadcrumb';
import picker from '../../components/picker';
import active_label from '../../js/active_label.js';
export default{
	data(){
		return {
			selectLabelOption:[],
				deleteIds:'',
        rules: {
          labelId: [
            { required: true, message: '请选择标签名称', trigger: 'change' }
          ],
          typeId: [
            { required: true, message: '请选择标签类型', trigger: 'change' }
          ],
			},
			ruleForm:{
				labelId:'',
				radio:'1',
				typeId:''
			},
      labelId:'',
      typeId:'',
      labelName:[],
      form:{
        store_name:'',
        goods_id:'',
        key_word:'',
        type:'',
        label_name:'',
				label_id:'',
      },
      radio:'1',
      labelTypeOption:[],
      belongedActivitiesOptions:[],
      labelNameOptions:[],
      addLabelMarklDialogVisible:false,
			addLabelMarklDialogVisibles:false,
			currentPage:1,
			pageSize:10,
			totals:0,
			tableData:[],
			content_title:{
				title1: "活动标签",
				title2: "",
				path1:'/home/activityManagement/active_label',
				path2:''
			},
        multipleSelection: []
		}
	},
	watch:{

	},
	created(){
		this.fetch();
    active_label.getLabelConf('Label/Conf',this);
	},
	methods:{
		handleChange(value) {
			this.form.label_id = value[1];
		},
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    fetch(val){
      var data = {
        page:val?val:this.currentPage,
        rows:this.pageSize,
        store_name:this.form.store_name,
        goods_id:this.form.goods_id,
        key_word:this.form.key_word,
        // type:this.form.type,
        label_id:this.form.label_id,
      }
      active_label.getLabelListActivity('Label/activity',data,this);
    },
    deleteProduct(params){
      var data = {
        labelGoodsId:params.id
      }
      active_label.delGoodsLabel('Label/delGoods',data,this);
    },
    handleCurrentChange(val){
				this.fetch(val);
    },
    searchListData(){
        this.fetch();
    },
    changeType(){
			this.ruleForm.labelId = '';
			this.labelName = [];
        var data = {
          typeId:this.ruleForm.typeId
        }
        active_label.labelSelect('Label/labelSelect',data,this);
    },
    addVenue(){
        this.addLabelMarklDialogVisible = true;
    },
    addLabel(formName){
				this.$refs[formName].validate((valid) => {
          if (valid) {
							this.$router.push({path:"active_label_detail",query:{labelId:this.ruleForm.labelId}})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    batchDeleting(){
				var  arrGoods = [];
				this.multipleSelection.forEach((itme)=>{
					arrGoods.push(itme.id)
				})
				if(arrGoods.length==0){
					this.$message({
						type:"info",
						message:"请选择您要删除的标签"
					})
					return
				}
				this.deleteIds = arrGoods.join(",");
				var data = {
					labelGoodsId:this.deleteIds
				}
				active_label.delLabelSelect('Label/delGoods',data,this);
    },
	},
	components:{
		breadcrumb,picker,
	}
}
</script>
