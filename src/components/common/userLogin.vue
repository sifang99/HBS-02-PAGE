<template>
    <div class="login my-box-shadow">
        <div class="title light-bule-rgba"> 
            <p class="title-text">登 录</p>
        </div>
        <div class="login-content">
            <el-form  ref="form" style="width: 90%;margin-left: 10px;" :model="form" label-width="60px">
                <el-form-item label="账号：">
                    <el-input placeholder="昵称 \ 电话号码" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input type="password" v-model="form.pwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="onSubmit">登录</el-button>
                    <a style="font-size:5px;margin-left:3px" href="#">没有账号？点击注册</a>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            form:{
                account:"",
                pwd:"",
            }
        }
    },
    methods:{
        onSubmit(){

        }
    }
}
</script>

<style scoped>
.login{
    height: 220px;
    background-color: #fff;
    margin-top: 30px;
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
.login-content{
    margin-top: 20px;
}
</style>