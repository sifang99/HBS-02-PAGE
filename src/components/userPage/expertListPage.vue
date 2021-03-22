<template>
    <div>
        <p class="expert-title">可 预 约 专 家</p>
            <div class="time-list">
                <span v-for="(date,index) in dateList" @click="getExperts(index)" :key="date" :class="{active: index === currentIndex}" class="time-item">{{date.month}}-{{date.date}}</span>
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
                        <router-link :to="{path:'/expertDetail', query: {doctorNum:item.num}}">
                            <el-button type="primary"  plain="true" size="mini">详情</el-button>
                        </router-link>
                        <router-link :to="{path:'/orderPage', query: {doctorNum:item.num}}">
                            <el-button type="primary" @click="order" plain="true" size="mini">预约</el-button>
                        </router-link>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    props:['deptId'],
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
            ],
            dateList:[],
            currentIndex:0,
            dept:this.deptId,
        }
    },
    methods: {
        getExperts(index){
            this.currentIndex = index
            this.$axios.get('/getExperts', {params:{dept: this.dept, date: this.formDate(this.dateList[this.currentIndex])}})
            .then((response) => {
                this.experts = response.data
                console.log("experts: ")
                console.log(response.data)
            }).catch((error) => {
                this.$message("获取专家列表时发生错误！")
            })
        },
        order(){
            this.$emit("getDate", this.formDate(this.dateList[this.currentIndex]));
        },


        //辅助函数
        formDate(date){
            var result = "" + date.year
            if(date.month >= 10){
                result = result + "-" + date.month
            }else{
                result = result + "-0" + date.month
            }

            if(date.date >= 10){
                result = result + "-" + date.date
            }else{
                result = result + "-0" + date.date
            }
            return result
        }
    },
    created(){
        this.$axios.get('/getFutureDate')
        .then((response) => {
            this.dateList = response.data
            this.$axios.get('/getExperts', {params:{dept: this.dept, date: this.formDate(this.dateList[this.currentIndex])}})
            .then((response) => {
                this.experts = response.data
            }).catch((error) => {
                this.$message("获取专家列表时发生错误！")
            })
        }).catch((error) => {
            this.$message("发生错误！")
        })
    }
}
</script>

<style scoped>
.active{
    background-color: #CCFFFF;
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
    height: 100px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(204,204,204,0.7);
}
.expert-massage{
    margin-left: 20px;
    float: left;
    width: 55%;
}
.expert-message-item{
    font-size: 12px;
    margin-top: 5px;
    line-height: 1.6em;
}
.operation-box{
    float: right;
    margin-top: 30px;
    margin-right: 10px;
}
</style>