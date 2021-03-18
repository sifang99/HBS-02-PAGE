<template>
    <div class="home-wrapper">
        <v-header ></v-header>
        <div class="home-02-content">
            <router-view :deptMessage="dept"  @getDept="getDeptMessage"></router-view>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import vHeader from './Header-02.vue'
import vFooter from './footer.vue'
export default{
    components:{
        vHeader,
        vFooter,
    },
    data(){
        return{
            dept:'',
            logout:false
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
    min-height: 500px;
}

</style>
