<template>
    <div>
        <ul>
            <li v-for="(record, index) in recordList" 
                :key="index" class="record-item">
                <div class="patient-avatar">
                    <el-avatar  v-show="record.gender == 0" 
                    :size="60" :src="femaleAvatar"></el-avatar>
                    <el-avatar v-show="record.gender == 1" 
                    :size="60" :src="maleAvatar"></el-avatar>
                    <p> 就诊人：{{record.patient}} </p>
                </div>
            
                <div class="message-box">
                    <span class="message-item"> 
                        <p class="single">就诊科室：{{record.dept}}</p> 
                        <p class="single" >医生姓名：{{record.name}}</p>
                    </span>
                    <span class="message-item"> 
                        <p class="single">就诊时间：{{record.date}}</p> 
                        <p class="single">就诊序号：{{record.sequence}}</p>
                    </span>
                    <span class="message-item"> 
                        <p class="single">就诊地点：{{record.place}}</p> 
                        <p class="single">挂号费：{{record.fee}}￥</p>
                    </span>
                </div>
                <div class="operation">
                    <el-button v-if="record.status === 0" type="primary" plain="true" size="mini">退号</el-button>
                    <el-button v-if="record.status === 4" type="primary" plain="true" size="mini">评价</el-button>
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
            femaleAvatar:'../../assets/img/doctor-female-01.png',
            maleAvatar:'../../assets/img/doctor-male-01.png',
            recordList:[
                {
                    dept:'普通消化科',
                    name:'代美华',
                    date:"2021-03-13 8:30-9:00",
                    sequence:'12',
                    place:'门诊部第三住院大楼第二层第五诊室',
                    fee:30,
                    gender:0,
                    patient:'张三',
                    status:0
                },
                {
                    dept:'普通消化科',
                    name:'四方',
                    date:"2021-03-13 8:30-9:00",
                    sequence:'12',
                    place:'门诊部第三住院大楼第二层第五诊室',
                    fee:30,
                    gender:1,
                    patient:'李四',
                    status:2
                },
                {
                    dept:'普通消化科',
                    name:'四方',
                    date:"2021-03-13 8:30-9:00",
                    sequence:'12',
                    place:'门诊部第三住院大楼第二层第五诊室',
                    fee:30,
                    gender:1,
                    patient:'李四',
                    status:4
                },
            ]
        }
    }
}
</script>

<style scoped>
.patient-avatar > p{
    font-size: 12px;
}

</style>