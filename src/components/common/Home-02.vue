<template>
    <div class="home-wrapper">
        <v-header></v-header>
        <div class="home-02-content">
            <div class="left-bar">
                <v-notice></v-notice>
                <v-login></v-login>
            </div>
            <div class="right-content">
                <router-view :deptMessage="dept" @getDept="getDeptMessage"></router-view>
            </div>
            <div style="clear: both;"></div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import vHeader from './Header-02.vue'
import vLogin from './userLogin.vue'
import vNotice from './Notice.vue'
import vFooter from './footer.vue'
export default{
    components:{
        vHeader,
        vNotice,
        vLogin,
        vFooter,
    },
    data(){
        return{
            dept:''
        }
    },
    methods:{
        getDeptMessage(dept){
            this.dept = dept
            console.log(this.dept)
        }
    }
}
</script>

<style scoped>
.home-02-content{
    width: 70%;
    margin: 0 auto;
}
.left-bar{
    width: 30%;
    float: right;
    
}
.right-content{
    width: 65%;
    margin-top: 15px;
}
</style>
