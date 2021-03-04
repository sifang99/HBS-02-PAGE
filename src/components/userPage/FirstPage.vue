<template>
    <div class="firstPage">
        <v-guide></v-guide>
        <v-show></v-show>
        <v-dept></v-dept>
    </div>
</template>

<script>
import vGuide from '../common/orderHelp.vue'
import vShow from '../common/showBox.vue'
import vDept from '../common/DeptDisplay.vue'
export default{
    components:{
        vGuide,
        vShow,
        vDept,
    }
}
</script>

<style scoped>
.firstPage{
    width: 100%;
    height: 100%;
}
</style>