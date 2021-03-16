<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 排班
                    <label style="margin-left:20px;"> 医生编号：{{doctorNum}} </label>
                    <label style="margin-left:20px;"> 医生姓名：{{doctorName}} </label>
                    <label style="margin-left:20px;"> 科室：{{deptName}} </label>
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
                <el-table-column prop="numberDate" label="日期" width="100" align="center"></el-table-column>
                <el-table-column label="地址" width="300" align="center">
                    <template slot-scope="scope">
                        {{scope.row.place}}
                    </template>
                </el-table-column>
                <el-table-column label="排班设置" align="center">
                    <template slot-scope="scope">
                        就诊时间从{{scope.row.startTime}}至{{scope.row.endTime}},间隔{{scope.row.timeInterval}}分钟。
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
                <el-form-item label="日期" prop="numberDate">
                    <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="form.numberDate"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;"
                        ></el-date-picker>
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
                <el-form-item label="号源数" prop="total">
                    <el-input v-model.number="form.total"></el-input>
                </el-form-item>
                <el-form-item label="间隔" prop="timeInterval">
                    <el-input v-model.number="form.timeInterval"></el-input>
                </el-form-item>
                <el-form-item label="费用" prop="fee">
                    <el-input v-model.number="form.fee"></el-input>
                </el-form-item>
                <el-form-item label="地点" prop="place">
                    <el-input v-model="form.place"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-show="! isUpdate" type="primary" @click="saveEdit">确 定</el-button>
                <el-button v-show="isUpdate" type="primary" @click="modify">修 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'arrangeScheduleDetail',
    props:['doctorMessage'],
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
            doctorNum:this.doctorMessage.doctorNum,
            doctorName:this.doctorMessage.doctorName,
            deptName:this.doctorMessage.deptName,
            dept:this.doctorMessage.deptId.toString(),
           tableData:[],
           isUpdate:false,//标记弹出框是添加还是修改
           updateIndex:'',//被修改的对象的索引
           form:{
                numberDate:'',
                startTime:'',
                endTime:'',
                timeInterval:'',
                place:'',
                fee:'',
                total:''
           },
           editVisible:false,
           rule:{
               numberDate:[
                   {required:true, message:'请选择日期',trigger:'blur'},
               ],
               startTime:[
                   {required: true, message: '请选择开始时间', trigger: 'blur'}
               ],
               endTime:[
                   {required: true, message: '请选择结束时间',trigger: 'blur'}
               ],
               timeInterval:[
                   {required: true, message: '请输入时间间隔', trigger: 'blur'},
                   {type: 'number',  message: '请输入整数'}
               ],
               fee:[
                   {required: true, message: '请输入挂号费用', trigger: 'blur'},
                   {type:'number',  message: '请输入整数', trigger: 'blur'}
               ],
               place:[
                   {required: true, message: '请输入就诊地点', trigger: 'blur'}
               ],
               total:[
                   {required: true, message: '请输入总号源数', trigger: 'blur'},
                   {type:'number', message: '请输入整数', trigger: 'blur'}
               ]
           },
           
        };
    },
    methods: {
        modify(){
            this.getValue(this.tableData[this.updateIndex], this.form)
            this.editVisible = false
            this.isUpdate = false
            this.clearForm()
            this.updateIndex = ''
        },
        addSchedule(){
            this.editVisible = true;
        },
        modifySchedule(index, row){
            this.getValue(this.form, row)
            this.editVisible = true
            this.isUpdate = true
            this.updateIndex = index
        },
        deleteSchedule(index, row){
            this.tableData.splice(index, 1)
            console.log("index:"+index)
            console.log(this.tableData)
        },
        submitSchedule(){
            this.$refs['form'].validate((valid) => {
                if(valid){
                    var data = {
                dept:this.dept,
                doctorNum: this.doctorNum,
                schedules: this.tableData
            }
            if(this.tableData.length == 0){
                this.$message("请添加数据！")
            }else{
                this.$axios.post('/addNumberMessage', data)
            .then((response) => {
                if(response.data.isSuccess == 0){
                    this.$message("添加成功！")
                }else{
                    this.$message("添加失败！")
                }
            }).catch((error) => {
                this.$message("发生错误！")
            })
            }
                }
            })
        },
        saveEdit(){
            this.$refs['form'].validate((valid) => {
                if(valid){
                    var formData = {
                        numberDate:'',
                        startTime:'',
                        endTime:'',
                        timeInterval:'',
                        place:'',
                        fee:'',
                        total:''
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
            this.isUpdate = false
            this.isUpdate = ''
        },

        //辅助函数
        //比较两时间的大小
        compareTime(startTime, endTime){
            var a = startTime.split(":")
            var b = endTime.split(":")
            let startMin = a[0]*60 + a[1]
            let endMin = b[0]*60 + b[1]
            console.log("a:"+a)
            console.log("b:"+b)
            console.log("startMin:"+startMin)
            console.log("endMin:"+endMin)
            if(endMin > startMin){
                return true
            }else{
                return false
            }
        },
        //将b的值赋给a
        getValue(a, b){
            a.numberDate = b.numberDate;
            a.startTime = b.startTime;
            a.endTime = b.endTime;
            a.timeInterval = b.timeInterval;
            a.place = b.place;
            a.fee = b.fee;
            a.total = b.total
        },

        //清空表单中的值
        clearForm(){
            this.form.numberDate='',
            this.form.startTime='',
            this.form.endTime='',
            this.form.timeInterval='',
            this.form.place=''
            this.form.fee=''
            this.form.total=''
        }
    },
};
</script>

<style scoped>
.schedule-table{
    margin-top: 40px;
    width: 100%;
    font-size: 14px;
}
</style>
