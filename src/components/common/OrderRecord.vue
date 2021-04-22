<template>
    <div>
        <ul>
            <li v-for="(record, index) in recordList" 
                :key="index" class="record-item">
                <div class="patient-avatar">
                    <el-avatar  v-show="record.gender == 0" 
                    :size="60" :src="femaleAvatar"></el-avatar>
                    <el-avatar v-show="record.gender == 1" 
                    :size="60" :src="maleAvatar"></el-avatar>
                    <p>{{record.patient}} </p>
                </div>
            
                <div class="message-box">
                    <span class="message-item"> 
                        <p class="single">就诊科室：{{record.dept}}</p> 
                        <p class="single" >医生姓名：{{record.doctor}}</p>
                    </span>
                    <span class="message-item"> 
                        <p class="single">就诊时间：{{record.time}}</p> 
                        <p class="single">就诊序号：{{record.sequence}}</p>
                    </span>
                    <span class="message-item"> 
                        <p class="single">就诊地点：{{record.place}}</p> 
                        <p class="single">挂号费：{{record.fee}}￥</p>
                    </span>
                    <span class="message-item"> 
                        <p class="single">预约时间：{{record.orderDate}}</p> 
                        <p class="single">
                            预约状态：
                            <label v-show="record.status == 0" style="color:#00CC00;">预约成功</label>
                            <label v-show="record.status == 1" style="color:blue;">退号中</label>
                            <label v-show="record.status == 2" style="color:blue;">退号成功</label>
                            <label v-show="record.status == 3" style="color:red;">停诊</label>
                            <label v-show="record.status == 4" style="color:red;">过期</label>
                            <label v-show="record.status == 5" style="color:red;">退号失败</label>

                        </p>
                       
                    </span>
                </div>
                <div class="operation">
                    <el-button 
                        v-if="record.status == 0" 
                        type="primary" 
                        plain 
                        size="mini"
                        @click="returnNumber(record)">退号</el-button>
                    <el-button 
                        v-if="record.status == 4" 
                        type="primary" 
                        plain 
                        size="mini"
                        @click="recommend(record)">评价</el-button>
                </div>
                <div style="clear: both;"></div>

            </li>
        </ul>

            <!-- 编辑弹出框 -->
        <el-dialog title="评价" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form">
                <el-form-item>
                    <el-input 
                    placeholder="最多输入200个字符" 
                    maxlength="200" 
                    type="textarea"
                    :rows="4" 
                    v-model="form.comment"></el-input>
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
export default {
    data(){
        return{
            femaleAvatar:'../../assets/img/doctor-female-01.png',
            maleAvatar:'../../assets/img/doctor-male-01.png',
            recordList:[],
            form:{
                comment:'',
                writer:'',
                commentDate:'',
                doctorNum:''
            },
            editVisible: false,
        }
    },
    methods:{
        returnNumber(record){
            this.$confirm('是否退号？','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning'
            }).then(() => {
                var id = parseInt(record.id)
                this.$axios.get('/returnOrder', {params:{id: id}})
                .then((response) => {
                    if(response.data.isSuccess == 0){
                        this.$message.success("提交成功，等待审核")
                        record.status = 1
                    }else{
                        this.$message(response.data.message)
                    }
                }).catch((error) => {
                    console.log("退号时发生错误！")
                })
            })
        },
        recommend(record){
            this.editVisible = true
            this.form.doctorNum = record.doctorNum
            this.form.writer = sessionStorage.getItem("userNickname")
            this.form.commentDate = this.getDate() 
        },
        saveEdit(){
            this.$axios.post('/addComment', this.form)
            .then((response) => {
                if(response.data.isSuccess == 0){
                    this.$message.success("评价成功")
                    this.editVisible = false
                    this.form.comment = ""
                }else{
                    this.$message("评价失败")
                }
            }).catch((error)=>{
                console.log("评价时出错")
            }) 
            
        },
        cancel(){
            this.editVisible = false
        },
        getDate(){
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        }
    },
    created(){
        this.$axios.get('/getOrderRecord', {params:{userId:sessionStorage.getItem("userId")}})
        .then((response) => {
            this.recordList = response.data
        }).catch((error) => {
            console.log("获取预约记录时发生错误！")
        })
    }
}
</script>

<style scoped>
.patient-avatar > p{
    font-size: 12px;
    text-align: center;
}

</style>