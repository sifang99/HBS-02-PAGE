<template>
    <div class="dept-detail-box ">
        <div class="dept-introduction-box my-box-shadow">
            <p class="dept-title light-bule-rgba">科 室 详 情</p>
            <div class="introduction-box">
                <p class="introduction"></p>
            </div>
            <p class="expert-title">可 预 约 专 家</p>
            <div class="time-list">
                <span class="time-item">星期一</span>
                <span class="time-item">星期二</span>
                <span class="time-item">星期三</span>
                <span class="time-item light-green">星期四</span>
                <span class="time-item">星期五</span>
                <span class="time-item">星期六</span>
                <span class="time-item">星期日</span>
            </div>
            <div class="expert-list">
                <div class="expert" v-for="(item, index) in experts" :key="index">
                    <img class="photo" v-show="item.gender === 0" src="../../assets/img/doctor-female-01.png" >
                    <img class="photo"  v-show="item.gender === 1" src="../../assets/img/doctor-male-02.png" >
                    <div class="expert-massage">
                        <p class="expert-message-item">姓名： {{item.name}}</p>
                        <p class="expert-message-item">职称： {{item.position}}</p>
                        <p class="expert-message-item">专长： {{item.speciality}}</p>
                    </div>
                    <div class="operation-box">
                        <el-button type="primary" plain="true" size="mini">详情</el-button>
                        <el-button type="primary" plain="true" size="mini">预约</el-button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            experts:[
                {
                    name:'唐二',
                    position:'主治医生',
                    gender:1,
                    speciality:'感冒发烧、头疼脑热'
                },
                {
                    name:'张三',
                    gender:1,
                    position:'主治医生',
                    speciality:'感冒发烧、头疼脑热'
                },
                {
                    name:'李四',
                    gender:0,
                    position:'主治医生',
                    speciality:'感冒发烧、头疼脑热'
                },
                {
                    name:'王五',
                    gender:1,
                    position:'主治医生',
                    speciality:'感冒发烧、头疼脑热'
                },
                {
                    name:'付六',
                    gender:0,
                    position:'主治医生',
                    speciality:'感冒发烧、头疼脑热'
                }
            ]
        }
    }
}
</script>

<style scoped>

.dept-introduction-box{
    width: 100%;
}
.introduction-box{
    min-height: 150px;
}
.dept-title{
    color: white;
    height: 30px;
    padding-top: 10px;
    padding-left: 10px;
}
.expert-title{
    height: 30px;
    padding-top: 10px;
    padding-left: 10px;
    color: #69c;
    border-top: 1px solid rgba(204,204,204,0.7);
    border-bottom: 1px solid rgba(204,204,204,0.7);
}
.expert-list{
    margin-bottom: 20px;
}
.time-item{
    height: 30px;
    width: 60px;
    padding-left: 21px;
    padding-top: 10px;
    float: left; 
    border-left: 1px solid rgba(204,204,204,0.7);
    border-bottom: 1px solid rgba(204,204,204,0.7);
}
.time-list{
    height: 40px;
}
.photo{
    width: 80px;
    height: 80px;
    float: left;
    margin-left: 10px;
}
.expert{
    height: 90px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(204,204,204,0.7);
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
.operation-box{
    float: right;
    margin-top: 25px;
    margin-right: 10px;
}
</style>