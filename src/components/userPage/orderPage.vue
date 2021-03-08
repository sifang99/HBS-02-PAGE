<template>
    <div>
        <p class="order-title">预 约</p>
        <div class="expert">

            <img class="photo" v-show="doctor.gender === 0" src="../../assets/img/doctor-female-01.png" >
            <img class="photo"  v-show="doctor.gender === 1" src="../../assets/img/doctor-male-02.png" >
            <div class="expert-massage">
                <p class="expert-message-item">姓名： {{doctor.name}}</p>
                <p class="expert-message-item">职称： {{doctor.position}}</p>
                <p class="expert-message-item">专长： {{doctor.speciality}}</p>
            </div>
        </div>
            <ul>
                <li class="order-item" v-for="(time, index) in timeList"  :key="index">
                    <div class="time">
                        <p class="time-detail">
                            <label class="time-sequence">{{ time.startTime }}---{{time.endtTime}}【序号：{{time.sequence}}】</label>
                            <i class="order-arrow el-icon-arrow-right"></i>
                            <span class="fee">挂号费：{{ fee }}</span>
                        </p>  
                    </div>
                </li>
            </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            doctor:{
                    name:'唐二',
                    position:'主治医生',
                    gender:1,
                    speciality:'感冒发烧、头疼脑热'
                },
            fee:20,
            timeList:[
                {
                    startTime:'8:30',
                    endtTime:'9:00',
                    sequence:1
                },
                {
                    startTime:'8:30',
                    endtTime:'9:00',
                    sequence:2
                },{
                    startTime:'8:30',
                    endtTime:'9:00',
                    sequence:3
                },
                {
                    startTime:'8:30',
                    endtTime:'9:00',
                    sequence:4
                },
                {
                    startTime:'8:30',
                    endtTime:'9:00',
                    sequence:5
                },{
                    startTime:'9:00',
                    endtTime:'9:30',
                    sequence:6
                }
            ]
        }
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
}
.expert-massage{
    margin-left: 20px;
    margin-top: 10px;
    float: left;
}
.expert-message-item{
    font-size: 12px;
    height: 25px;
}
.expert{
    height: 90px;
    margin-top: 10px;
    border-bottom: 1px solid rgba(204,204,204,0.7);
}
</style>