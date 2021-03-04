<template>
    <div class="show-box-wrapper my-box-shadow">
        <div class="block">
            <!-- <span class="demonstration">医院宣传栏</span> -->
            <el-carousel height="200px" style="margin-top: 20px;">
              <el-carousel-item v-for="(item,index) in pictures" :key="index">
                    <img :src="item.url" class="picture">
              </el-carousel-item>
            </el-carousel>
        </div>
    </div>
 </template>

<script>
 export default{
    data(){
        return{
            pictures:[
                {url: require("../../assets/img/hospital-01.png")},
                {url: require("../../assets/img/hospital-02.png")},
                {url: require("../../assets/img/hospital-03.png")},
                {url: require("../../assets/img/hospital-04.jpg")}
            ]
        }
    }
 }
</script>
  
<style scoped>

    .show-box-wrapper{
        height: 200px;
        margin-top: 20px;
    }

    .block{
        width: 100%;        
        margin: 0 auto;
        height: 100%;
    }

    .picture{
        width: 100%;
        height: 100%;
    }

    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }
  
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>