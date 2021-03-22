<template>
    <div class="dept-detail-box ">
        <div class="right-bar">
            <v-notice></v-notice>
            <v-login></v-login>
        </div>
        <div class="left-content">
            <div class="dept-introduction-box my-box-shadow">
                <p class="dept-title light-bule-rgba">科 室 详 情</p>
                <div class="introduction-box">
                    <p class="introduction my-letter-style">{{this.dept.introduction}}</p>
                </div>
                <router-view :orderDate="date" @getDate="changeDate" :deptName="dept.name" :deptId="dept.id"></router-view>
            </div>
        </div>
        <div style="clear: both;"></div> 
    </div>
</template>

<script>
import vNotice from '../common/Notice.vue'
import vLogin from '../common/userLogin.vue'
export default {
    components:{
        vNotice,
        vLogin,
    },
    name:'deptIntroduction',
    data(){
        return{
            dept:{
            },
            date:''
        }
    },
    methods: {
        changeDate(date){
            this.date = date
        }
    },
    created(){
        this.dept.id = this.$route.query.id
        this.$axios.get('/Dept/getDeptById', {params:{id: this.dept.id}})
        .then((response) => {
            this.dept = response.data
        }).catch((error) => {
            this.$message("发生错误！")
        })
    }
}
</script>

<style scoped>

.dept-introduction-box{
    width: 100%;
}

.dept-title{
    color: white;
    height: 30px;
    padding-top: 10px;
    padding-left: 10px;
}


.introduction-box{
    min-height: 50px;
    margin:10px
}

.introduction{
    font-size: 12px;
}


</style>