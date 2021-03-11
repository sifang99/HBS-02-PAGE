<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 修改号源
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="container">
            <div class="handle-box">
            <el-input v-model="doctorNum" class="handle-input" placeholder="请输入医生编号"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <div class="clue-box">
                <span>
                    <label class="clue-label" for="">{{doctor.num}}</label>
                    <label class="clue-label" for=""> {{doctor.name}}</label>
                    <label class="clue-label">{{dept.name}}</label>
                    <label class="clue-label" for="">{{doctor.position}}</label>
                </span>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="numberDate" label="日期" width="100" align="center"></el-table-column>
                <el-table-column prop="place" label="地点" width="200" align="center"></el-table-column>
                <el-table-column label="号源信息" align="center">
                    <template slot-scope="scope">
                        就诊时间从{{scope.row.startTime}}至{{scope.row.endTime}},间隔{{scope.row.timeInterval}}分钟。
                        共开放{{scope.row.total}}个号源，剩{{scope.row.remain}}个可预约号源。挂号费：￥{{scope.row.fee}}
                    </template>
                </el-table-column>
                <el-table-column label="号源状态" width="100" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            type="success"
                            v-show="scope.row.status === 0"
                        >可预约</el-tag>
                        <el-tag
                            type="danger"
                            v-show="scope.row.status === 1"
                        >已约满</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button
                            v-show="!scope.row.state"
                            type="text"
                            icon="el-icon-edit"
                            @click="update(scope.$index, scope.row)"
                        >修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="pageIndex"
                    :page-size="pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div> -->

            <!-- 编辑弹出框 -->
        <el-dialog title="修改排班" :visible.sync="editVisible" width="30%">
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
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[],
            doctorNum:'',
            doctor:{},
            dept:{},
            editIndex:'',
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
        }
    },
    methods:{
        handleSearch(){
            if(this.doctorNum == ''){
                this.$message("请输入编号！")
            }else{
                this.$axios.get('/getDoctorByNum', {params:{doctorNum:this.doctorNum}})
                .then((response) => {
                    this.doctor = response.data
                    console.log(this.doctor)
                    var dept = this.doctor.dept
                    this.$axios.get('/Dept/getDeptById', {params:{id:dept}})
                    .then((res) => {
                        this.dept = res.data
                    }).catch((error) => {
                        console.log("获取科室信息出错！")
                    })
                }).catch((error) => {
                    console.log("获取医生信息出错！")
                })
                
                this.$axios.get('/getNumberByDoctor', {params:{doctorNum:this.doctorNum}})
                .then((response) => {
                    this.tableData = response.data
                }).catch((error) => {
                    this.$message("发生错误！")
                })
            }
        },
        update(index, row){
            if(row.total != row.remain){
                this.$message("已有号源被预约出去，无法进行修改！")
            }else{
                this.editVisible = true
                this.editIndex = index
                this.getValue(this.form, row)
            }
        },
        saveEdit(){
            this.editVisible = false
            var a = {
                numberDate:'',
                startTime:'',
                endTime:'',
                total:'',
                ramin:'',
                id:'',
                doctorNum:'',
                dept:'',
                place:'',
                fee:'',
                status:''
            }
            this.copy(a, this.tableData[this.editIndex])
            console.log("a:")
            console.log(a)
            this.getValue(a, this.form)
            //为了符合后端数据格式HH:mm:ss
            a.startTime = a.startTime + ":00"
            this.$axios.post('/updateNumberById', a)
            .then((res) => {
                if(res.data.isSuccess == 0){
                    this.$message("修改成功！")
                    this.getValue(this.tableData[this.editIndex], this.form)
                }else{
                    this.$message("修改失败！")
                    this.copy(this.tableData[this.editIndex], a)
                }
                 this.editIndex = ''
                 this.clearForm()
            })
        },
        cancel(){
            this.editVisible = false
            this.clearForm()
            this.editIndex=''
        },


        //辅助函数
        clearForm(){
            this.form.startTime = ''
            this.form.endTime = ''
            this.form.timeInterval = ''
            this.form.place = ''
            this.form.fee = ''
            this.form.numberDate = ''
            this.form.total = ''
        },
        copy(a, b){
            a.numberDate = b.numberDate;
            a.startTime = b.startTime;
            a.endTime = b.endTime;
            a.timeInterval = b.timeInterval;
            a.place = b.place;
            a.fee = b.fee;
            a.total = b.total
            a.id = b.id
            a.remain = b.remain
            a.status = b.status
            a.dept = b.dept
            a.doctorNum = b.doctorNum
        },
        getValue(a, b){
            a.numberDate = b.numberDate;
            a.startTime = b.startTime + ":00";
            a.endTime = b.endTime;
            a.timeInterval = b.timeInterval;
            a.place = b.place;
            a.fee = b.fee;
            a.total = b.total
        },
    },
    created(){
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 200px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.clue-box{
    margin-bottom: 6px;
}
.clue-label{
    margin-right: 10px;
    font-size: 14px;
    color: rgba(0,0,0,0.5);
}
</style>