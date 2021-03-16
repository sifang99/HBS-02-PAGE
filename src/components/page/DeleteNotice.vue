<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 管理公告</el-breadcrumb-item>
                <el-breadcrumb-item>删除公告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                 <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="date"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="publishDay" label="日期" align="center" width="120px"></el-table-column>
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="author" label="发布人" align="center" width="150px"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            multipleSelection: [],
            date:''
        };
    },
    methods:{
        delAllSelection(){
            var data = this.$refs.multipleTable.selection
            var idList = new Array();
            let length = data.length
            for(let i = 0; i < length; i++){
                idList[i] = data[i].id
            }
            this.$confirm('是否删除选中号源？','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning'
            }).then(() => {
                this.$axios.get("/deleteAttention", {params:{id: idList}, paramsSerializer: params => {
                    return this.qs.stringify(params, {indices: false})
                }}).then((response) => {
                    this.$message(response.data.message)
                    this.handleSearch()
                }).catch((error) => {
                    console.log("删除时发生错误！")
                })
            }).catch(() => {
                this.$message("已取消")
            })
        },
        handleSearch(){
            if(this.date == ''){
                this.$message("请选择时间！")
                return;
            }
            console.log(this.date)
            this.$axios.get('/getAttentionByDate', {params:{date: this.date}})
            .then((response) => {
                this.tableData = response.data
            }).catch((error) => {
                console.log("查询公告时发生错误！")
            })
        },
        handleSelectionChange(){

        }
    },
    created(){
        
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
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
</style>