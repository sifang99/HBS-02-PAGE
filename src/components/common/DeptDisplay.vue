<template>
    <div class="display-wrapper my-box-shadow">
        <div class="tag">
            <div class="title-box light-blue my-box-shadow">
                <p class="title">科 室</p>
            </div>
            <div class="line light-blue"></div>
        </div>
        <div class="dept-content">
            <div v-for="(item, index) in depts" :key="index">
                <div class="dept">
                    <div class="dept-header">
                        <span class="dept-name-01">{{item.name}}</span>
                    </div>
                    <div v-if="item.affiliation">
                        <div class="dept-affiliation" v-for="(dept,index) in item.affiliation" :key="index">
                            <router-link :to="{path:'/deptIntroduction', query: {id:dept.id}}">
                                <el-link type="primary" :underline="false" class="dept-name-02">{{dept.name}}</el-link>
                            </router-link>
                        </div>
                    </div>
                    <div  v-else>
                        <div class="dept-affiliation">
                            <router-link :to="{path:'/deptIntroduction', query: {id:item.id}}">
                                <el-link type="primary" :underline="false" class=" dept-name-02">{{item.name}}</el-link>
                            </router-link>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="dept-line"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            depts:[],
            
        }
    },
    methods: {
    },
    created(){
        this.$axios.get('/Dept/getAllDepts')
        .then((response) => {
            this.depts=response.data
        }).catch((error) => {
            this.$message("发生错误！")
        })
    }
}
</script>

<style scoped>
.tag{
    height: 50px;
    margin-top: 20px;
}
.title-box{
    float: left;
    width: 80px;
    height: 40px;
}
.title{
    color: white;
    margin-top: 10px;
    text-align: center;
}
.line{
    height: 2px;
    width: 85%;
    float: right;
    margin-top: 20px;
}
.display-wrapper{
    /* margin-left: 20px; */
    margin-top: 20px;
    width: 100%;
}
.dept-name-01{
    font-size: 16px;
}
.dept-name-02{
    font-size: 14px;
    width: 100px;
}
.dept-line{
    height: 0;
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    border-bottom: rgba(204,204,204,0.7) 1px dashed;
}
.dept-affiliation{
    margin-left: 40px;
    margin-top: 10px;
    float: left;
    width: 100px;
}
.dept{
    margin-left: 60px;
    margin-top: 10px;
}
.dept-header{
    margin-bottom: 20px;
}
.clear{
    clear: both;
}
</style>