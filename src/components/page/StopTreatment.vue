<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 停诊服务
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                 <el-input class="handle-input" v-model="doctorNum" placeholder="请输入医生编号"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <div class="clue-box">
                <span>
                    <label class="clue-label" for="">{{doctor.num}}</label>
                    <label class="clue-label" for=""> {{doctor.name}}</label>
                    <label class="clue-label">{{dept.name}}</label>
                    <label class="clue-label" for="">{{doctor.position}}</label>
                </span>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="numberDate" label="日期" align="center"></el-table-column>
                <el-table-column prop="total" label="号源总数" align="center"></el-table-column>
                <el-table-column prop="remain" label="号源剩余数" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            type="success"
                            v-show="scope.row.status == 0"
                        >可预约</el-tag>
                        <el-tag
                            type="warning"
                            v-show="scope.row.status == 1"
                        >已约满</el-tag>
                        <el-tag
                            type="danger"
                            v-show="scope.row.status == 2"
                        >已停诊</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-warning-outline"
                            @click="stopTreatment(scope.$index, scope.row)"
                        >停诊</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'arrangeSchedule',
    data() {
        return {
            doctorNum:'',
            doctor:{},
            dept:{},
            tableData:[],
            number:{},
            index:''
        };
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$axios.get('/getNumber', {params:{doctorNum:this.doctorNum}})
            .then((response) => {
                this.tableData = response.data
            }).catch((error) => {
                console.log("停诊服务中查询医生号源状态出错")
            })

            this.$axios.get('/getDoctorByNum', {params:{doctorNum:this.doctorNum}})
            .then((response) => {
                 this.doctor = response.data
                console.log(this.doctor)
                var dept = this.doctor.dept
                this.$axios.get('/Dept/getDeptById', {params:{id:dept}})
                .then((res) => {
                    this.dept = res.data
                }).catch((error) => {
                    console.log("获取科室信息出错！")
                })
            }).catch((error) => {
                console.log("获取医生信息出错！")
            })
        },
        stopTreatment(index, row){
            this.index = index
            this.number = row
            this.$confirm('确认要对该号源停诊？','提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type:'warning'
                }).then(() => {
                    this.$axios.get('/stopTreatment', {params:{numberId: this.number.id}})
                    .then((response) => {
                        if(response.data.isSuccess == 0){
                            console.log("已停诊")
                            this.tableData[this.index].status = 2
                        }else{
                            this.$message("操作失败！")
                        }
                    }).catch((error) => {
                        console.log("停诊时发生错误！")
                    })
                }).catch(() => {
                    console.log("已取消")
                })
        }
       
    },
    created(){
        
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-input {
    width: 200px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.clue-box{
    margin-bottom: 6px;
}
.clue-label{
    margin-right: 10px;
    font-size: 14px;
    color: rgba(0,0,0,0.5);
}
</style>
