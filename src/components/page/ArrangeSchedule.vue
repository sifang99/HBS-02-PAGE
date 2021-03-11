<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 排班管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
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
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="num" label="编号" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="position" label="职称" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            type="success"
                            v-show="scope.row.state"
                        >已排班</el-tag>
                        <el-tag
                            type="danger"
                            v-show="!scope.row.state"
                        >未排班</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            v-show="!scope.row.state"
                            type="text"
                            icon="el-icon-edit"
                            @click="arrangeSchedule(scope.$index, scope.row)"
                        >去排班</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="pageIndex"
                    :page-size="pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'arrangeSchedule',
    data() {
        return {
            deptList:[],
            deptId:'',
            deptName:'',
            tableData: [],
            editVisible: false,
            pageTotal: 0,
            pageSize: 10,
            pageIndex: 1,
            form: {},
            idx: -1,
            id: -1
        };
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$axios.get('/getDoctorsByDept',{params: {dept:this.deptId}
            }).then((response) => {
                this.tableData = response.data
            }).catch((error) => {
                console.log("获取医生失败！")
            })
            this.$axios.get('/Dept/getDeptById',{params:{id:this.deptId}})
            .then((response) => {
                console.log(response.data)
                this.deptName = response.data.name
            }).catch((error) => {
                console.log("获取科室名称失败！")
            })
        },
        // 添加排班信息
        arrangeSchedule(index, row) {
            var doctorMessage={
                doctorNum: row.num,
                doctorName: row.name,
                deptName: this.deptName,
                deptId: this.deptId,
            }
            this.$emit('getDoctorMessage',doctorMessage);
            this.$router.push('/arrangeScheduleDetail');
        },
        // 分页导航
        handlePageChange(val) {
        },
        //辅助函数
        //通过科室id获取科室名称
        getDeptNameById(){

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
};
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
