<template>
    <div v-if="!this.isLogin" class="login my-box-shadow">
        <div class="title light-bule-rgba"> 
            <p class="title-text">登 录</p>
        </div>
        <div class="login-content">
            <el-form  ref="form" style="width: 95%;" :rules="rule" :model="form" label-width="80px">
                <el-form-item prop="account" label="账号：">
                    <el-input placeholder="昵称 \ 电话号码" v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item prop="pwd" label="密码：">
                    <el-input type="password" v-model="form.pwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="onSubmit">登录</el-button>
                    <a style="font-size:5px;margin-left:3px" @click="register" href="#">没有账号？点击注册</a>
                </el-form-item>
            </el-form>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="注册账号" :visible.sync="editVisible" width="30%">
            <el-form ref="registerForm" :model="registerForm" :rules="rule" label-width="70px">
                <el-form-item prop="nickname" label="昵称：">
                    <el-input v-model="registerForm.nickname"></el-input>
                </el-form-item>
                <el-form-item prop="tel" label="电话：">
                    <el-input v-model="registerForm.tel"></el-input>
                </el-form-item>
                <el-form-item prop="pwd" label="密码：">
                    <el-input type="password" v-model="registerForm.pwd"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default{
    data(){
        let checkTel = (rule, value, callback) => {
            this.$axios.get('/getUserByTel', {params:{tel:value}})
            .then((response) => {
                if(response.data.isSuccess == 0){
                    callback(new Error("该电话号码已注册！"))
                }
            }).catch((error) => {
                console.log("发生错误！")
            })
        };
        let checkNickname = (rule, value, callback) => {
            this.$axios.get('/getUserByNickname', {params:{nickname: value}})
            .then((response) => {
                if(response.data.isSuccess == 0){
                    callback(new Error("该昵称已存在！"))
                }
            }).catch((error) => {
                console.log("发生错误！")
            })
        };
        return {
            editVisible:false,
            form:{
                account:"",
                pwd:"",
            },
            isLogin: false,
            registerForm:{
                nickname:'',
                pwd:'',
                tel:''
            },
            rule:{
               nickname:[
                   {required:true, message:'请输入昵称',trigger:'blur'},
                   {max:20, messaage:'昵称长度不能超过20', trigger:'blur'},
                   {validator: checkNickname, trigger: 'blur'}
               ],
               tel:[
                    {required:true, message:'请输入电话号码', trigger:'blur'},
                    {validator:function(rule,value,callback){
                        if(/^1[34578]\d{9}$/.test(value) == false){
                            callback(new Error("请输入正确的手机号"));
                        }else{
                            callback();
                        }
                    }, trigger: 'blur'},
                    {validator: checkTel, trigger: 'blur'}
               ],
               pwd:[
                    {required: true, message:'请输入密码',trigger:'blur'},
                    {pattern: /^(\w){12,20}$/,message: '只能输入12-20个字母、数字、下划线'}
               ],
               account:[
                   {required: true, message:'请输入账号', trigger:'blur'}
               ]

            },
           
        }
    },
    methods:{
        onSubmit(){
            this.$axios.post('/userLogin', this.form)
            .then((response) => {
                if(response.data.isSuccess == 0){
                    this.$message("登录成功！")
                    this.isLogin = true
                }else{
                    this.$message("登录失败！")
                }
                this.form.account = ''
                this.form.pwd = ''
            }).catch((error) => {
                console.log("登录发生错误")
            })
        },
        saveEdit(){
            this.editVisible = false
            var data = {
                id:'',
                nickname: this.registerForm.nickname,
                pwd: this.registerForm.pwd,
                tel: this.registerForm.tel
            }
            console.log(data)
            this.$axios.post('/userRegister', data)
            .then((response) => {
                if(response.data.isSuccess == 0){
                    this.$message("注册成功！")
                }else{
                    this.$message(response.data.message)
                }
                this.registerForm.nickname = ''
                this.registerForm.pwd = ''
                this.registerForm.tel = ''
            }).catch((error) => {
                console.log("注册时出现错误")
            })
        },
        cancel(){
            this.editVisible = false
            this.registerForm.nickname = ''
            this.registerForm.pwd = ''
            this.registerForm.tel = ''
        },
        register(){
            this.editVisible = true
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