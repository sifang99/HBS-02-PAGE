<template>
    <div class="footer">
        <div>
            <div class="left">
                <div class="footer-message">版权所有:
                    <span class="real-mesage">XXXXXXXXXXXXXXX</span>
                </div>
                
                <div class="footer-message">患者咨询：
                    <span class="real-mesage">XXXXXXXXXXXXXXX</span>
                </div>
            
                <div class="footer-message">医院地址：
                    <span class="real-mesage">XXXXXXXXXXXXXXX</span>
                </div>
                <div class="footer-message">投诉电话：
                    <span class="real-mesage">XXXXXXXXXXXXXXX</span>
                </div>
                <div class="footer-message">急救中心：
                    <span class="real-mesage">XXXXXXXXXXXXXXX</span>
                </div>
                <div class="footer-message">预约挂号：
                    <span class="real-mesage">XXXXXXXXXXXXXXX</span>
                </div>
            </div>
            <div class="right">
                <div class="weibo-box">
                    <img class="contact-logo" src="../../assets/img/weibo.png" alt=""><br>
                    <span class="text-logo">官方微博</span>
                </div>
                <div class="weixin-box">
                    <img class="contact-logo" src="../../assets/img/weixin.png" alt=""><br>
                    <span class="text-logo">官方微信</span>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="footer-bottom">
            <span class="last-message about">关于我们 | 网站建议 | 法律责任</span>
            <span class="last-message author">建设网站：四川师范大学</span>
        </div>
    </div>
</template>

<style scoped>
.footer{
    width: 100%;
    height: 210px;
    background-color: #6699CC;
    margin-bottom: 0px;
    margin-top: 50px;
}

.left{
    width: 50%;
    float: left;
    margin-left: 10%;
    margin-top: 20px;
}

.right{
    width: 30%;
    float: left;
}
.real-mesage{
    display: block;
    margin-top: 10px;
    margin-left: 10px;
}

.footer-message{
    width: 30%;
    float: left;
    margin-left: 10px;
    margin-top: 20px;
    color: white;
    font-size: 14px;
    /* background-color: #fff; */
}

.weibo-box{
    float: left;
    margin-top: 40px;
    margin-left: 40px;
}
.weixin-box{
    float: left;
    margin-left: 40px;
    margin-top: 40px;
}
.contact-logo{
    width: 80px;
    height: 60px;
}
.text-logo{
    color: white;
    margin-left: 15px;
    font-size: 14px;
}
.clear{
    clear: both;
}

.last-message{
    color:white;
    font-size: 14px;
}

.footer-bottom{
    margin-top: 30px;
}

.about{
    float: left;
    margin-left: 25%;
}
.author{
    float: right;
    margin-right: 22%;
}

</style>