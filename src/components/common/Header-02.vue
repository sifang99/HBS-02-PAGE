<template>
    <div class="dark-bule header-user">
        <div class="dark-bule" >
            <div class="picture">
                <img id="logo" src="../../assets/img/Logo.png">
            </div>
            <div class="title">
                <p class="name">第 X X X X X 人 民 医 院</p>
            </div>
            <div style="clear:both;"></div>
        </div>
        <div v-show="isLogin" class="tool-bar-box">
            <div class="tool-bar">
                <span v-for="(item, index) in toolList" 
                :key="item.title"  
                :class="{activeBar: index === currentIndex}" 
                @click="clickToolItem(index)"
                class="tool-bar-item">
                {{item.title}}
                </span>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            currentIndex:0,
            toolList:[
                {
                    title:"首页",
                },
                {
                    title:"个人中心",
                }
            ],
            isLogin: sessionStorage.getItem("isLogin")
        }
    },
    watch:{
        isLogin:function(newVal, oldVal){
            console.log("新值："+newVal + " 旧值："+oldVal)
        }
    },
    methods:{
        clickToolItem(index){
            this.currentIndex = index
            if(this.toolList[index].title === "个人中心"){
                this.$router.push('/userPage')
            }else{
                this.$router.push('/firstPage')
            }
        }
    }
}
</script>

<style scoped>
.activeBar{
    background-color:rgba(0, 0, 0, 0.2);
}
.tool-bar-box{
    background-color: rgba(0, 0, 0, 0.1);
}
.tool-bar{
    height: 40px;
    width: 70%;
    margin: 0 auto;
}
.tool-bar-item{
    font-size: 16px;
    width: 100px;
    height: 32px;
    display: block;
    float: left;
    padding-top: 8px;
    text-align: center;
}
.header-user{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    /* height: 80px; */
    font-size: 22px;
}
#logo{
    width: 50px;
    height: 60px;
    margin-top: 20px;
}
.picture{
    margin-left: 38%;
    float: left;
}
.title{
    margin-left: 44%;
}
.name{
    padding-top: 30px;
    padding-left: 0%;
    color: white;
}
</style>