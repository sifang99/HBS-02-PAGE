<template>
    <div>
        <p class="order-title">预 约</p>
        <div class="expert">

            <img class="photo" v-show="doctor.gender === 0" src="../../assets/img/doctor-female-01.png" >
            <img class="photo"  v-show="doctor.gender === 1" src="../../assets/img/doctor-male-02.png" >
            <div class="expert-massage">
                <p class="expert-message-item">姓名： {{doctor.name}}</p>
                <p class="expert-message-item">职称： {{doctor.position}}</p>
                <p class="expert-message-item" >
                    状态： <label v-show="status == 0" style="color: #00CC00">可预约</label>
                    <label v-show="status == 1" style="color: red;">已约满</label>
                </p>
                <p class="expert-message-item" style="padding-bottom: 20px">专长： {{doctor.speciality}}</p>
            </div>
        </div>
            <ul>
                <li class="order-item" v-for="(time, index) in timeList"  :key="index">
                    <div class="time">
                        <p @click="order(time, index)" class="time-detail">
                            <label class="time-sequence">{{ time.startTime }}---{{time.endTime}}【序号：{{time.sequence}}】</label>
                            <i class="order-arrow el-icon-arrow-right"></i>
                            <span class="fee">挂号费：{{ time.fee }}</span>
                        </p>  
                    </div>
                </li>
            </ul>

        <el-dialog title="确认预约信息" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :rules="rule" :model="form" label-width="70px">
                <el-form-item label="医生：">
                    <label >{{form.doctor}}</label>
                </el-form-item>
                <el-form-item label="科室：">
                    <label >{{form.dept}}</label>
                </el-form-item>
                <el-form-item  label="费用：">
                    <label >{{form.fee}}</label>
                </el-form-item>
                <el-form-item label="时间：">
                    <label >{{form.time}}【序号：{{form.sequence}}】</label>
                </el-form-item>
                <el-form-item label="地点：">
                    <label >{{form.place}}</label>
                </el-form-item>
                <el-form-item prop="patient" label="请选择患者：" label-width="110px">
                    <el-select v-model="form.patient">
                        <el-option 
                        v-for="(patient, index) in patients" 
                        :key="index" 
                        :label="patient.name"
                        :value="patient.account"></el-option>
                    </el-select>
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
    props:['orderDate','deptName'],
    data(){
        return{
            form:{
                doctor:'',
                time:'',
                fee:'',
                patient:'',
                dept:'',
                place:'',
                sequence:''
            },
            patients:[],
            editVisible: false,
            doctorNum:this.$route.query.doctorNum,
            //预约的时间
            date: this.orderDate,
            doctor:{},
            status:'',
            dept:this.deptName,
            numberMessage:{},
            timeList:[],
            timeItemIndex:'',
            rule:{
                patient:[
                    {required: true, message: '请选择就诊人', trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        order(time, index){
            if(!this.$store.state.isLogin){
                this.$message("请先登录！")
                return
            }
            this.$axios.get('/getPatient', {params:{userId: sessionStorage.getItem("userId")}})
            .then((response) => {
                this.patients = response.data
            }).catch((error) => {
                console.log("获取就诊人列表时发生错误！")
            })
            this.editVisible = true
            this.form.doctor = this.doctor.name
            this.form.time = this.date + "  " + time.startTime + "-" +time.endTime
            this.form.fee = time.fee
            this.form.dept = this.dept
            this.form.sequence = time.sequence
            this.form.place = this.numberMessage.place
            this.timeItemIndex = index
        },
        saveEdit(){
            this.$refs['form'].validate((valid) => {
                if(valid){
                    this.editVisible = false
                    var data = {
                        id:'',
                        patientID:this.form.patient,
                        dept:this.numberMessage.dept,
                        detailTime:this.form.time,
                        status:0,
                        numSequence:this.timeList[this.timeItemIndex].sequence,
                        //挂号时的日期
                        orderDate:this.getDate(),
                        numberId:this.numberMessage.id,
                        userId:sessionStorage.getItem("userId")
                    }
                    this.$axios.post('/addOrderMessage', data)
                    .then((response) => {
                        if(response.data.isSuccess == 0){
                            this.$message.success("预约成功！")
                            this.timeList.splice(this.timeItemIndex,1)
                            this.timeItemIndex = ''
                        }else{
                            this.$message(response.data.message)
                        }
                            console.log(data)
                    }).catch((error) => {
                        console.log("预约时出现错误！")
                    })
                    this.clearForm()
                }
            })
            
        },
        cancel(){
            this.editVisible = false
            this.clearForm()
        },
        clearForm(){
            this.form.doctor = ''
            this.form.time = ''
            this.form.fee = ''
            this.form.dept = ''
            this.form.place = ''
            this.form.patient = ''
        },
        getDate(){
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        }
    },
    created(){
        
        this.$axios.get('/getDoctorByNum' , {params:{doctorNum: this.doctorNum}})
        .then((response) => {
            this.doctor = response.data
        }).catch((error) => {
            console.log("获取医生信息失败！")
        })

        this.$axios.get('/getOrderMessage', {params:{doctorNum: this.doctorNum, date:this.date}})
        .then((response) => {
            this.timeList = response.data
            if(this.timeList.length == 0){
                this.status = 1
            }else{
                this.status = 0
            }
        }).catch((error) => {
            console.log("发生错误！")
        })

        this.$axios.get('/getNumberMessage', {params: {doctorNum: this.doctorNum, date:this.date}})
        .then((response) => {
            this.numberMessage = response.data
            console.log("号源信息：")
            console.log(response.data)
        }).catch((error) => {
            console.log("获取号源信息发生错误！")
        })

    }
}
</script>

<style scoped>
.order-title{
    height: 30px;
    padding-top: 10px;
    padding-left: 10px;
    color: #69c;
    border-top: 1px solid rgba(204,204,204,0.7);
    border-bottom: 1px solid rgba(204,204,204,0.7);
}
.order-item{
    width: 100%;
    list-style: none;
    background-color: white;
}
.time{
    height: 40px;
    border-bottom: 1px solid rgba(204,204,204,0.7);
}
.time-sequence{
    font-size: 14px;
}
.time-detail{
    padding-top: 10px;
    padding-left: 10px;
}
.order-arrow{
    float: right;
}
.fee{
    float: right;
    font-size: 14px;
    margin-right: 10px;
}





.photo{
    width: 80px;
    height: 80px;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
}
.expert-massage{
    margin-left: 20px;
    margin-top: 10px;
    width: 80%;
    float: left;
}
.expert-message-item{
    font-size: 12px;
    height: 25px;
}
.expert{
    height: 110px;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(204,204,204,0.7);
}
</style>