<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 排班
                    <label style="margin-left:20px;"> 医生编号：XXXX </label>
                    <label style="margin-left:20px;"> 医生姓名：XXXX </label>
                    <label style="margin-left:20px;"> 科室：XXXXXXXX </label>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
           <el-button type="primary" @click="addSchedule" style="float:right;margin-right:20px">添加</el-button>
            <el-table
                :data="tableData"
                border
                class="schedule-table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="date" label="日期" width="200" align="center"></el-table-column>
                <el-table-column prop="time" label="时间" width="100" align="center"></el-table-column>
                <el-table-column label="排班设置" align="center">
                    <template slot-scope="scope">
                        就诊时间从{{scope.row.startTime}}至{{scope.row.endTime}},间隔{{scope.row.interval}}分钟。
                        总共开放{{scope.row.total}}个号源。挂号费：￥{{scope.row.fee}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="modifySchedule(scope.$index, scope.row)"
                        >修改</el-button>
                        
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="deleteSchedule(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="submitSchedule" style="margin-top:20px;margin-left: 45%">生成号源</el-button>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="添加排班" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" :rules="rule" label-width="70px">
                <el-form-item label="日期" prop="date">
                    <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="form.date"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;"
                        ></el-date-picker>
                </el-form-item>
                <el-form-item label="上/下午" prop="time">
                    <el-select v-model="form.time" placeholder="请选择">
                        <el-option key="上午" label="上午" value="上午"></el-option>
                        <el-option key="下午" label="下午" value="下午"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始" prop="startTime">
                    <el-time-picker
                            placeholder="选择时间"
                            v-model="form.startTime"
                            value-format="HH:mm"
                            style="width: 100%;"
                        ></el-time-picker>
                </el-form-item>
                <el-form-item label="结束" prop="endTime">
                    <el-time-picker
                            placeholder="选择时间"
                            v-model="form.endTime"
                            value-format="HH:mm"
                            style="width: 100%;"
                        ></el-time-picker>
                </el-form-item>
                <el-form-item label="间隔" prop="interval">
                    <el-input v-model="form.interval"></el-input>
                </el-form-item>
                <el-form-item label="费用" prop="fee">
                    <el-input v-model="form.fee"></el-input>
                </el-form-item>
                <el-form-item label="地点" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'arrangeScheduleDetail',
    data() {
        //自定义检验规则
        var validateEndTime = (rule, value, callback) => {
            if (!this.compareTime(this.form.startTime, this.form.endTime)) {
                callback(new Error('结束时间应该大于开始时间！'))
            } else {
                callback()
            }
        }
        return {
           tableData:[
               {
                   date:'2021-03-03',
                   time:'上午',
                   startTime:'8:30',
                   endTime:'11:00',
                   interval:10,
                   total:60,
                   fee:0
               }
           ],
           form:{
                date:'',
                time:'',
                startTime:'',
                endTime:'',
                interval:'',
                address:'',
                fee:'',
           },
           editVisible:false,
           rule:{
               date:[
                   {required:true, message:'请选择日期',trigger:'blur'},
               ],
               time:[
                   {required: true, message: '请选择时间段', trigger: 'blur'}
               ],
               startTime:[
                   {required: true, message: '请选择开始时间', trigger: 'blur'}
               ],
               endTime:[
                   {required: true, message: '请选择结束时间',trigger: 'blur'},
                   {validator: validateEndTime, trigger: 'blur'}
               ],
               interval:[
                   {required: true, message: '请输入时间间隔', trigger: 'blur'}
               ],
               fee:[
                   {required: true, message: '请输入挂号费用', trigger: 'blur'}
               ],
               address:[
                   {required: true, message: '请输入就诊地点', trigger: 'blur'}
               ]
           },
           
        };
    },
    methods: {
        addSchedule(){
            this.editVisible = true;
        },
        modifySchedule(index, row){

        },
        deleteSchedule(index, row){

        },
        submitSchedule(){

        },
        saveEdit(){
            this.$refs['form'].validate((valide) => {
                if(valide){
                    var formData = {
                        date:'',
                        time:'',
                        startTime:'',
                        endTime:'',
                        interval:'',
                        address:'',
                        fee:'',
                    }
                    this.getValue(formData, this.form)
                    this.tableData.push(formData)
                    this.clearForm()
                    this.editVisible=false
                }else{
                    this.$message("数据不符合规范！")
                }
            });
        },
        cancel(){
            this.clearForm()
            this.editVisible=false
        },

        //辅助函数
        //比较两时间的大小
        compareTime(startTime, endTime){
            var a = startTime.split(":")
            var b = endTime.split(":")
            let startMin = a[0]*60 + a[1]
            let endMin = b[0]*60 + b[1]
            if(endMin > startMin){
                return true
            }else{
                return false
            }
        },
        //将b的值赋给a
        getValue(a, b){
            a.date = b.date;
            a.time = b.time;
            a.startTime = b.startTime;
            a.endTime = b.endTime;
            a.interval = b.interval;
            a.address = b.address;
            a.fee = b.fee
        },

        //清空表单中的值
        clearForm(){
            this.form.date='',
            this.form.time='',
            this.form.startTime='',
            this.form.endTime='',
            this.form.interval='',
            this.form.address=''
            this.form.fee=''
        }
    }
};
</script>

<style scoped>
.schedule-table{
    margin-top: 40px;
    width: 100%;
    font-size: 14px;
}
</style>
