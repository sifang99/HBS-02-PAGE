<template>
    <div class="firstPage">
        <div class="right-bar">
            <v-notice></v-notice>
            <v-login></v-login>
        </div>
        <div class="left-content">
            <v-guide></v-guide>
            <v-show></v-show>
            <v-dept></v-dept>
        </div>
        <div style="clear: both;"></div>
    </div>
</template>

<script>
import vGuide from '../common/orderHelp.vue'
import vShow from '../common/showBox.vue'
import vDept from '../common/DeptDisplay.vue'
import vLogin from '../common/userLogin.vue'
import vNotice from '../common/Notice.vue'
export default{
    components:{
        vGuide,
        vShow,
        vDept,
        vLogin,
        vNotice
    }
}
</script>

<style scoped>
.firstPage{
    width: 100%;
    height: 100%;
}
</style>