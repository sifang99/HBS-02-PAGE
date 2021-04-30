<template>
    <div >
        <div class="toolbar-box">
            <span v-for="(item, index) in barList" 
            :key="index"
            class="menu-item"
            :class="{activeMenu: index === itemIndex}"
            @click="clickMenuItem(index)"
            >
                {{item.title}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            itemIndex: 0,
            barList:[
                // {
                //     title:'就诊信息'
                // },
                {
                    title:'预约记录'
                },
                {
                    title:'就诊人管理'
                },
                {
                    title:'修改密码'
                },
                {
                    title:'退出登录'
                }
            ]
        }
    },
    methods:{
        clickMenuItem(index){
            this.itemIndex = index
            if(this.barList[index].title === '预约记录'){
                this.$router.push('/orderRecord')
            }else if(this.barList[index].title === '就诊人管理'){
                this.$router.push('/patientManage')
            }else if(this.barList[index].title == '修改密码'){
                this.$router.push('/updatePassword')
            }else if(this.barList[index].title == '退出登录'){
                this.$confirm('是否退出登录？','提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type:'warning'
                }).then(() => {
                    this.$axios.get('/userLogout')
                    .then((response) => {
                        console.log("退出登录成功！")
                        sessionStorage.clear()
                        this.$store.commit('Logout')
                        this.$router.push('/firstPage');
                    }).catch((error) => {
                        this.$message("退出登录时，发生错误！")
                    })
                    
                }).catch(() => {
                    console.log("已取消退出登录")
                })
            }
        }
    }
}
</script>

<style scoped>
.toolbar-box{
    border: 1px solid #ddd;
}
.activeMenu{
    background-color: rgba(0, 0, 0, 0.1);
}
.menu-item{
    /* list-style: none; */
    display: block;
    padding-top: 10px;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 0.05em solid white;
    font-size: 14px;
    letter-spacing: 0.2em;
    /* background-color: rgba(0, 0, 0, 0.1); */
}
</style>