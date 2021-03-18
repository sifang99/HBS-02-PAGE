<template>
    <div>
        <div class="user-page-title-box">
            <p>修改密码</p>
        </div>
        <div style="width:60%; margin: 0 auto; margin-top:20px">
            <el-form ref="pwdForm" :model="form" :rules="rule" label-width="80px">
                <el-form-item label="旧密码" prop="oldPwd">
                    <el-input type="password" v-model="form.oldPwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input type="password" v-model="form.newPwd"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPwd">
                    <el-input type="password" v-model="form.checkPwd"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-button style="display:block; margin: 0 auto;margin-bottom:50px" 
            type="primary" plain
            @click="updatePwd">修改</el-button>
    </div>
</template>

<script>
export default {
    data(){
        let checkPwd = (rule, value, callback) => {
            if(value === this.form.newPwd){
                callback()
            }else{
                callback(new Error("两次密码不一致！"))
            }
        }
        return{
            form:{
                oldPwd:'',
                newPwd:'',
                checkPwd:''
            },

            rule:{
                oldPwd:[
                    {required: true, message:'请输入密码',trigger:'blur'},
                    {pattern: /^(\w){12,20}$/,message: '只能输入12-20个字母、数字、下划线'}
                ],
                newPwd:[
                    {required: true, message:'请输入密码',trigger:'blur'},
                    {pattern: /^(\w){12,20}$/,message: '只能输入12-20个字母、数字、下划线'}
                ],
                checkPwd:[
                    {required: true, message:'请输入密码',trigger:'blur'},
                    {pattern: /^(\w){12,20}$/,message: '只能输入12-20个字母、数字、下划线'},
                    {validator: checkPwd, trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        updatePwd(){
            this.$refs.pwdForm.validate(async valid => {
                if(valid){
                    let account = sessionStorage.getItem("userNickname")
                    var data = {
                        account: account,
                        newPwd: this.form.newPwd,
                        oldPwd: this.form.oldPwd
                    }
                    this.$axios.post('/userUpdatePwd', data)
                    .then((response) => {
                        if(response.data.isSuccess == 0){
                            this.$message.success(response.data.message)
                            this.form.oldPwd = ''
                            this.form.newPwd = ''
                            this.form.checkPwd = ''
                        }else{
                            this.$message(response.data.message)
                        }
                    }).catch((error) => {
                        console.log("修改密码时发生错误！")
                    })
                }
            })
        }
    }
}
</script>