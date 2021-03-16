<template>
    <div>
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
                    <el-button type="primary" plain="true" size="mini">删除</el-button>
                </div>
                <div style="clear: both;"></div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            patientList:[
                {
                    name:'代美华',
                    gender:0,
                    account:"510623199902146526",
                    birth:'1999-02-14',
                    tel:'15282864353',
                    address:'四川师范大学成龙校区'
                },
                {
                    name:'四方',
                    gender:1,
                    account:"510623199902146526",
                    birth:'1999-02-14',
                    tel:'15282864353',
                    address:'四川师范大学成龙校区'
                }
            ]
        }
    }
}
</script>

<style scoped>
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