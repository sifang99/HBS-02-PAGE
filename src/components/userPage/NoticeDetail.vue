<template>
    <div class="notice-box my-box-shadow">
        <div class="title-box">
            <p class="title">{{attention.title}}</p>
            <p class="author-date">
                <label for="">发布人：{{attention.author}}</label> 
                <label for="">发布日期：{{attention.publishDay}}</label>
            </p>
        </div>
        <div v-html="attention.content" class="notice-detail">
            {{attention.content}}
        </div>
    </div>
</template>

<script>
import vLogin from '../common/userLogin.vue'
import vNotice from '../common/Notice.vue'
export default {
    components:{
        vLogin,
        vNotice
    },
    data(){
        return{
            attention:{
                title:"关于维修系统的通知",
                publishDay:"2021-04-20",
                content:'这是一条测试通知',
                author:"代美华"
            },
            id:'',
        }
    },
    created(){
        this.id = this.$route.query.id
        this.$axios.get('/getAttentionById', {params:{id: this.id}})
        .then((response) => {
            this.attention = response.data
        }).catch((error) => {
            console.log("获取公告的具体信息时发生错误！")
        })
    }
}
</script>

<style scoped>
.notice-box{
    width: 85%;
    height: 100%;
    margin: 0 auto;
    margin-top: 20px;
}

.author-date{
    font-size: 14px;
    text-align: center;
    margin-bottom: 10px;
}

.author-date > label {
    margin-left: 20px;
}

.title{
    font-size: 20px;
    text-align: center;
}

.title-box > p{
    padding-top: 10px;
}

.title-box{
    width: 100%;
    margin: 0 auto;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.notice-detail{
    width: 90%;
    min-height: 400px;
    margin: 0 auto;
    margin-top: 10px;
}
</style>