<template>
    <div>
        <p class="order-title">预 约</p>
        <div class="expert">
            <div>
                <img class="photo" v-show="doctor.gender === 0" src="../../assets/img/doctor-female-01.png" >
                <img class="photo"  v-show="doctor.gender === 1" src="../../assets/img/doctor-male-02.png" >
                <div class="expert-massage">
                    <p class="expert-message-item">姓名： {{doctor.name}}</p>
                    <p class="expert-message-item">年龄： {{doctor.age}}</p>
                    <p class="expert-message-item">职称： {{doctor.position}}</p>
                </div>
                <div style="clear:left;"></div>
            </div>
            <div class="expert-introduction">
                <p class="expert-message-item">专长： {{doctor.speciality}}</p>
                <p class="introduction-content my-letter-style">简介： {{doctor.introduction}}</p>
            </div>
        </div>
        <p class="order-title">患 者 评 价</p>
            <ul>
                <li class="order-item" v-for="(item, index) in commentList"  :key="index">
                    <div class="comment-item">
                        <p class="comment-message">
                            <label v-show="item.name != null" class="comment-name">{{ item.name }}</label>
                            <label v-show="item.name === null" class="comment-name">匿名评价</label>
                            <span class="comment-date">{{ item.date }}</span>
                        </p>  
                        <p class="comment my-letter-style">{{item.comment}}</p>
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
                    age:54,
                    gender:1,
                    speciality:'感冒发烧、头疼脑热',
                    introduction:'雕塑韩剧回才能下载聚hsdcu关于上的功夫关于的功夫遇到过v或多个佛偏旁部首保护及巴士和幅度分割被忽悠关于地方建设成本高于计划回到赛场不过v就好了与火箭夺冠发布预告国际化的干部实际汇率公布业绩蝴蝶飞不过集合了所有与几乎都是功夫家里还有的比赛将会复古集家大幅回调广泛用于并结合形成保护层v好像不错丶当初不会觉得从v吧v新城规划现在你粗话绝对不成都就是关于'
                },
            commentList:[
                {
                    name:null,
                    date:'2017-02-14',
                    comment:'活塞风格的预估获得三个词语'
                },
                {
                    name:null,
                    date:'2017-02-14',
                    comment:'活塞风格的预估获得三个词语'
                },
                {
                    name:null,
                    date:'2017-05-10',
                    comment:'和速度给发货dsu都告诉与法国VS都vu的官方预告对于v后进行初步比较好的效果粗我国橘黄色灯光计划时间合适就也会额的司法环境'
                },
                {
                    name:null,
                    date:'2017-08-19',
                    comment:'活塞风格的预估获得三个词语'
                },
                {
                    name:null,
                    date:'2017-12-14',
                    comment:'时代赋予归功于'
                },

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
.comment-item{
    /* height: 60px; */
    border-bottom: 1px solid rgba(204,204,204,0.7);
}
.comment-name{
    font-size: 12px;
}
.comment-message{
    padding-top: 5px;
    padding-left: 10px;
}
.comment-date{
    float: right;
    font-size: 12px;
    margin-right: 10px;
}
.comment{
    font-size: 12px;
    padding-top: 10px;
    padding-left: 25px;
}
.expert-introduction{
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 20px;
    padding-right: 10px;
}
.introduction-content{
    font-size: 12px;
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
    /* height: 150px; */
    margin-top: 10px;
    /* border-bottom: 1px solid rgba(204,204,204,0.7); */
}
</style>