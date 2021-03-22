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
                    <p>{{record.patient}} </p>
                </div>
            
                <div class="message-box">
                    <span class="message-item"> 
                        <p class="single">就诊科室：{{record.dept}}</p> 
                        <p class="single" >医生姓名：{{record.doctor}}</p>
                    </span>
                    <span class="message-item"> 
                        <p class="single">就诊时间：{{record.time}}</p> 
                        <p class="single">就诊序号：{{record.sequence}}</p>
                    </span>
                    <span class="message-item"> 
                        <p class="single">就诊地点：{{record.place}}</p> 
                        <p class="single">挂号费：{{record.fee}}￥</p>
                    </span>
                    <span class="message-item"> 
                        <p class="single">预约时间：{{record.orderDate}}</p> 
                        <p class="single">
                            预约状态：
                            <label v-show="record.status == 0" style="color:#00CC00;">预约成功</label>
                            <label v-show="record.status == 1" style="color:blue;">退号中</label>
                            <label v-show="record.status == 2" style="color:blue;">退号成功</label>
                            <label v-show="record.status == 3" style="color:red;">停诊</label>
                        </p>
                       
                    </span>
                </div>
                <div class="operation">
                    <el-button 
                        v-if="record.status == 0" 
                        type="primary" 
                        plain 
                        size="mini"
                        @click="returnNumber(record)">退号</el-button>
                    <el-button 
                        v-if="record.status == 4" 
                        type="primary" 
                        plain 
                        size="mini"
                        @click="recommend(record)">评价</el-button>
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
            recordList:[]
        }
    },
    methods:{
        returnNumber(record){
            this.$confirm('是否退号？','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning'
            }).then(() => {
                var id = parseInt(record.id)
                this.$axios.get('/returnOrder', {params:{id: id}})
                .then((response) => {
                    if(response.data.isSuccess == 0){
                        this.$message.success("提交成功，等待审核")
                        record.status = 1
                    }else{
                        this.$message(response.data.message)
                    }
                }).catch((error) => {
                    console.log("退号时发生错误！")
                })
            })
        },
        recommend(record){
            
        }
    },
    created(){
        this.$axios.get('/getOrderRecord', {params:{userId:sessionStorage.getItem("userId")}})
        .then((response) => {
            this.recordList = response.data
        }).catch((error) => {
            console.log("获取预约记录时发生错误！")
        })
    }
}
</script>

<style scoped>
.patient-avatar > p{
    font-size: 12px;
    text-align: center;
}

</style>