<template>
    <div>
        <div class="user-page-title-box">
            <p>就诊人管理</p>
        </div>
        <ul>
            <li v-for="(patient, index) in patientList" 
                :key="index" class="record-item">
                <el-avatar class="patient-avatar myavatar" v-show="patient.gender === 0" 
                :size="60" src='../../assets/img/doctor-female-01.png'></el-avatar>
                <el-avatar class="patient-avatar" v-show="patient.gender === 1" 
                :size="60" src='../../assets/img/doctor-male-02.png'></el-avatar>
                <div class="message-box">
                    <span class="message-item"> 
                        <p class="single" for="">就诊人：{{patient.name}}</p> 
                        <p class="single" v-show="patient.gender === 0" for="">性别：女</p>
                        <p class="single" v-show="patient.gender === 1" for="">性别：男</p>
                    </span>
                    <span class="message-item"> 
                        <p class="single" for="">身份证号码：{{patient.account}}</p> 
                        <p class="single" for="">出生日期：{{patient.birth}}</p>
                    </span>
                    <span class="message-item"> 
                        <p class="single" for="">电话号码：{{patient.tel}}</p> 
                        <p class="single" for="">现居住地址：{{patient.address}}</p>
                    </span>
                    <div style="clear: both;"></div>
                </div>
                <div class="operation">
                    <el-button type="primary" 
                    plain size="mini"
                    @click="deletePatient(patient, index)">删除</el-button>
                </div>
                <div style="clear: both;"></div>
            </li>
        </ul>
        <div  class="add-patient-box">
            <el-button type="primary" 
                class="add-patient-button" 
                size="mini" 
                plain 
                icon="el-icon-plus"
                id="add"
                :disabled="patientList.length >= 4 ? true : false"
                @click="addPatient">添加</el-button>
                <label for="add">至多添加4个就诊人</label>
        </div>
        
         <!-- 编辑弹出框 -->
        <el-dialog title="添加就诊人" :visible.sync="editVisible" width="38%">
            <el-form ref="patientForm" :model="form" :rules="rule" label-width="95px">
                <el-row>
                    <el-col :span="12">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="form.gender">
                            <el-option value="0" label="女"></el-option>
                            <el-option value="1" label="男"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                    <el-form-item label="出生日期" prop="birth">
                        <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            v-model="form.birth"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话号码" prop="tel">
                        <el-input v-model.number="form.tel"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-form-item label="身份证号" prop="account">
                    <el-input maxlength="18" v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item label="现居住地址" prop="address">
                    <el-input maxlength="100"  v-model="form.address"></el-input>
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
    data(){
        let checkAccount = (rule, value, callback) => {
            let length = value.length
            if(length != 18){
                callback(new Error("请输入正确的身份证号"))
            }else{
                var i = 0
                for(; i < length-1; i++){
                    if(value.charAt(i) < "0" || value.charAt(i) > "9"){
                        callback(new Error("请输入正确的身份证号"))
                    }
                }
                if(value.charAt(17) != 'X' && (value.charAt(17) < "0" || value.charAt(i) > "9")){
                    callback(new Error("请输入正确的身份证号"))
                }else{
                    callback()
                }
            }
        }
        return{
            form:{
                name:'',
                gender:'',
                birth:'',
                address:'',
                account:'',
                tel:'',
            },
            editVisible:false,
            patientList:[],
            rule:{
                name:[
                    {required: true, message: '请输入真实姓名', trigger: 'blur'}
                ],
                gender:[
                    {required: true, message: '请选择性别', trigger: 'blur'}
                ],
                birth:[
                    {required: true, message: '请选择出生日期', trigger: 'blur'}
                ],
                account:[
                    {required: true, message: '请输入身份证号码', trigger: 'blur'},
                    {validator: checkAccount, trigger: 'blur'}
                ],
                tel:[
                    {required: true, message: '请填写联系方式', trigger: 'blur'}
                ],
                address:[
                    {required: true, message: '请填写地址', trigger: 'blur'}
                ]
             }
        }
    },
    methods:{
        deletePatient(patient, index){
            this.$confirm('是否删除就诊人？','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning'
            }).then(() => {
                this.$axios.get('/deletePatient', {params:{account: patient.account}})
                .then((response) => {
                    if(response.data.isSuccess == 0){
                        this.patientList.splice(index)
                        this.$message.success("删除成功！")
                    }else{
                        this.$message("删除失败！")
                    }
                }).catch((error) => {
                    console.log("删除就诊人时出现错误！")
                })
        }).catch(() => {
            console.log("已取消")
        })
        },
        addPatient(){
            this.editVisible = true
        },
        saveEdit(){
            this.$refs.patientForm.validate(async valid => {
                if(valid){
                    var data = {
                        id:'',
                        name: this.form.name,
                        gender: this.form.gender,
                        birth: this.form.birth,
                        account: this.form.account,
                        tel: this.form.tel,
                        address: this.form.address,
                        userId: sessionStorage.getItem("userId")
                    }
                    this.$axios.post('/addPatient', data)
                    .then((response) => {
                        if(response.data.isSuccess == 0){
                            this.$message.success(response.data.message)
                            this.getPatientList()
                            this.editVisible = false
                            this.clearForm()
                        }else{
                            this.$message(response.data.message)
                        }
                    }).catch((error) => {
                        console.log("添加就诊人时发生错误！")
                    })
                }
            })
           
        },
        cancel(){
            this.editVisible = false
            this.clearForm()
        },
        clearForm(){
            this.form.name = ''
            this.form.gender = ''
            this.form.birth = ''
            this.form.address = ''
            this.form.account = ''
            this.form.tel = ''
        },
        getPatientList(){
            let userId = sessionStorage.getItem("userId")
            this.$axios.get('/getPatient', {params:{userId: userId}})
            .then((response) => {
                this.patientList = response.data
            }).catch((error) => {
                console.log("获取就诊人列表时发生错误！")
            })
        }
    },
    created(){
        this.getPatientList()
    }
}
</script>

<style scoped>
.add-patient-box{
    height: 60px;
    margin: 0 auto;
}
.add-patient-button{
    /* display: block;  */
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 40%;
}
.add-patient-box > label{
    font-size: 12px;
    color: grey;
    letter-spacing: 0.1em;
}
.patient-item{
    list-style: none;
}
.patient-avatar{
    float: left;
}
.myavatar{
    margin-top: 20px;
}
</style>