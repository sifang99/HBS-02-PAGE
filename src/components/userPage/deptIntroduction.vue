<template>
    <div class="dept-detail-box ">
        <div class="dept-introduction-box my-box-shadow">
            <p class="dept-title light-bule-rgba">科 室 详 情</p>
            <div class="introduction-box">
                <p class="introduction"></p>
            </div>
            <router-view></router-view>
        </div>
        
    </div>
</template>

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
    min-height: 150px;
}


</style>