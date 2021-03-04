<template>
    <div class="dark-bule header-user">
        <div class="picture">
            <img id="logo" src="../../assets/img/Logo.png">
        </div>
        <div class="title">
            <p class="name">第 X X X X X 人 民 医 院</p>
        </div>
        
    </div>
</template>

<style scoped>
.header-user{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 80px;
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