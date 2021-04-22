<template>
    <div class="notice my-box-shadow">
        <div class="title light-bule-rgba"> 
            <p class="title-text">公 告</p>
        </div>
        <div class="notice-content infinite-list-wrapper" style="overflow:auto">
            <ul
                class="list ul-blackground"
                >
                <li 
                v-for="(i, index) in attentionList" 
                class="item-background list-item" 
                :key="index"
                @click="getNotice(i)">
                    <i class="item-img el-icon-message-solid"></i>
                    <div :title="i.title" class="item-title-wrapper">
                      <p class="item-title">{{ i.title }}</p>
                    </div>
                    <div class="item-date-wrapper">
                        <p class="item-date">{{ i.publishDay }}</p>
                    </div>
                    <i class="item-arrow el-icon-arrow-right"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
          attentionList:[],
        }
      },
    created(){
        this.$axios.get('/getAttentionList')
        .then((response) => {
            this.attentionList = response.data
        }).catch((error) => {
            console.log("获取公告时发生错误！")
        })
    },
    methods: {
        getNotice(i){
            this.$router.push({
                path:'/noticeDetail',
                query:{
                    id: i.id
                }
            })
        }
    }
}
</script>

<style scoped>
.notice{
    height: 240px;
    background-color: #fff;
}
.content-notice{
    width: 100%;
    height: 50px;
}
.title-text{
    padding-top: 8px;
    padding-left: 5px;
    color: white;
}
.title{
    height: 40px;
    width: 100%;
}
.item-title{
    font-size: 0.4em;
}
.item-title-wrapper{
    width: 50%;
    height: 18px;
    overflow: hidden;
    float: left;
    margin-top: 12px;
    margin-left: 4px;
}
.item-date-wrapper{
    width: 25%;
    float: left;
    margin-top: 4px;
    margin-left: 10px;
}
.item-date{
    margin-top: 10px;
    font-size: 0.4em;
}
.infinite-list-wrapper{
    height: 200px;
}
.ul-blackground{
    background-color: rgba(204,204,204,0.2);
}

.item-img{
    margin-top: 10px;
    float: left;
}

.item-arrow{
    float: right;
    margin-right: 5px;
    margin-top: 10px;
}

.item-background{
    margin-top: 2px;
    background-color: #fff;
    height: 40px;
}
</style>