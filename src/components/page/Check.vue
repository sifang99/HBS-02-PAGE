<template>
    <div >
         <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 退号审核
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="agreeAllSelection"
                >批量同意</el-button>
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="disagreeAllSelection"
                >批量不同意</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="dept" label="就诊科室" width="100" align="center"></el-table-column>
                <el-table-column prop="date" label="就诊日期" width="100" align="center"></el-table-column>
                <el-table-column prop="doctorNum" label="医生编号" width="100" align="center"></el-table-column>
                <el-table-column prop="doctorName" label="医生姓名" width="100" align="center"></el-table-column>
                <el-table-column prop="patientID" label="患者身份证" align="center"></el-table-column>
                <el-table-column prop="patientName" label="患者姓名" width="100" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            icon="el-icon-check"
                            type="success"
                            plain
                            @click="agree(scope.$index, scope.row)"
                        >同意</el-button>
                        <el-button
                            type="danger"
                            plain
                            @click="disagree(scope.$index, scope.row)"
                        >不同意</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[]
        }
    },
    methods:{
        agree(index, row){
            var value = []
            value.push(row)
            this.agreeRequest(value)
            this.tableData.splice(index,1)
        },
        disagree(index, row){
            var value = []
            value.push(row)
            this.disagreeRequest(value)
            this.tableData.splice(index,1)
        },
        agreeAllSelection(){
            var arr = this.$refs.multipleTable.selection
            this.agreeRequest(arr)
            this.getCheckList()
        },
        disagreeAllSelection(){
            var arr = this.$refs.multipleTable.selection
            this.disagreeRequest(arr)
            this.getCheckList()
        },
        getCheckList(){
            this.$axios.get('/getCheckList')
            .then((response) => {
                this.tableData = response.data
            }).catch((error) => {
                console.log("获取审核信息出错！")
            })
        },
        disagreeRequest(value){
            var params = this.getDisgreeData(value)
            this.$axios.post('/disagreeRetreat', params)
            .then((response) => {
                if(response.data.isSuccess == 0){
                    this.$message.success("操作成功！")
                }else{
                    this.$message("操作失败！")
                }
            }).catch((error) => {
                console.log("不同意退号时发生错误！")
            })
        },
        agreeRequest(value){
            var params =this.getData(value)
            this.$axios.post('/agreeRetreat', params)
            .then((response) => {
                if(response.data.isSuccess == 0){
                    this.$message.success("操作成功！")
                }else{
                    this.$message("操作失败！")
                }
            }).catch((error) => {
                console.log("同意退号时发生错误！")
            })
        },
        getDisgreeData(value){
            var params = []
            for(var i = 0; i < value.length; i++){
                params.push(value[i].orderID)
            }
            return params
        },
        getData(value){
            var params = []
            for(var i = 0; i < value.length; i++){
                var param = {
                    orderID: value[i].orderID,
                    numberID: value[i].numberID
                }
                params.push(param)
            }
            return params
        }
    },
    created(){
        this.getCheckList()
    }
}
</script>