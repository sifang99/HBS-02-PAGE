<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 删除号源
                </el-breadcrumb-item>
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
                <el-select  v-model="deptId" placeholder="请选择" value-key="index">
                    <el-option-group
                    v-for="dept in deptList"
                    :key="dept.id"
                    :label="dept.name">
                        <el-option
                        v-for="(item, i) in dept.affiliation"
                        :key="i"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-option-group>
                </el-select>
                 <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="numberDate"
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
                <el-table-column prop="numberDate" label="日期" align="center"></el-table-column>
                <el-table-column prop="doctorNum" label="医生编号" align="center"></el-table-column>
                <el-table-column label="挂号费用" align="center">
                    <template slot-scope="scope">￥{{scope.row.fee}}</template>
                </el-table-column>
                <el-table-column prop="total" label="号源总数" align="center"></el-table-column>
                <el-table-column prop="remain" label="可预约数" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            type="danger"
                            v-show="scope.row.status === 2"
                        >已停诊</el-tag>
                        <el-tag
                            type="success"
                            v-show="scope.row.status === 3"
                        >已过期</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
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
    data() {
        return {
            deptList:[],
            tableData: [],
            deptId:'',
            multipleSelection: [],
            delList: [],
           numberDate:'',
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
                this.$axios.get("/deleteNumberById", {params:{id: idList}, paramsSerializer: params => {
                    return this.qs.stringify(params, {indices: false})
                }})
                .then((res) => {
                    if(res.data.isSuccess == 0){
                        this.$message("删除成功！")
                        this.handleSearch()
                    }else{
                        this.$message("删除失败！")
                    }
                }).catch((error) => {
                    this.$message("发生错误！")
                })
                }).catch(() => {
                    this.$message("已取消")
                })
        },
        handleSearch(){
            if(this.deptId == ''){
                this.$message("请选择科室！")
                return;
            }
            if(this.numberDate == ''){
                this.$message("请选择时间！")
                return;
            }
            this.$axios.get('/getNumberByDeptDate', {params:{dept:this.deptId, date:this.numberDate}})
            .then((res) => {
                this.tableData = res.data
            }).catch((error) => {
                this.$message("获取信息发生错误！")
            })
        },
        handleDelete(index, row){
            this.$confirm('是否删除选中号源？','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning'
            }).then(()=>{
                this.$axios.get('/deleteNumberById', {params:{id:row.id}})
                .then((res) => {
                    if(res.data.isSuccess == 0){
                        this.$message("删除成功！")
                        this.tableData.splice(index)
                    }else{
                        this.$message("删除失败！")
                    }
                })
            }).catch(()=>{
                this.$message("已取消")
            })
        },
        handleSelectionChange(){

        }
    },
    created(){
        this.$axios({
            method:'get',
            url:'/Dept/getAllDepts'
        }).then((response) => {
            // console.log(response.data)
            this.deptList = response.data
        }).catch((error) => {
            console.log("获取科室列表失败！")
        })
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