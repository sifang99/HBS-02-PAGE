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
                <el-select v-model="dept" placeholder="科室" class="handle-select mr10">
                    <el-option key="1" label="内科" value="内科"></el-option>
                    <el-option key="2" label="外科" value="外科"></el-option>
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
                <el-table-column prop="dept" label="科室" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='已排班'?'success':(scope.row.state==='未排班'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            v-show="scope.row.state === '未排班'"
                            type="text"
                            icon="el-icon-edit"
                            @click="arrangeSchedule(scope.$index, scope.row)"
                        >去排班</el-button>
                        <el-button
                            v-show="scope.row.state === '已排班'"
                            type="text"
                            icon="el-icon-edit"
                            @click="checkSchedule(scope.$index, scope.row)"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="pageIndex"
                    :page-size="pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'arrangeSchedule',
    data() {
        return {
            dept:"",
            tableData: [
                {
                    num:'2017110405',
                    name:'代美华',
                    dept:'内科',
                    state:'已排班'
                },
                {
                    num:'2017110404',
                    name:'张三',
                    dept:'内科',
                    state:'未排班'
                }
            ],
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
        },
        // 添加排班信息
        arrangeSchedule(index, row) {
            this.$router.push('/arrangeScheduleDetail');
        },
        //查看排班信息
        checkSchedule(index, row){

        },
        // 分页导航
        handlePageChange(val) {
        }
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
