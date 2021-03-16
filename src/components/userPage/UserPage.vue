<template>
    <div class="user-content-box">
        <div class="user-left-bar my-box-shadow">
            <v-tool-bar></v-tool-bar>
        </div>
        <div class="user-right-content my-box-shadow">
            <router-view></router-view>
        </div>
        <div style="clear:both;"></div>
    </div>
</template>

<script>
import vToolBar from '../common/UserToolBar.vue'
export default {
    components:{
        vToolBar,
    }
}
</script>
<style scoped>
.user-content-box{
    width: 100%;
}
</style>