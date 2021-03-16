<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 医生管理
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
                <el-button type="primary" icon="el-icon-plus" @click="addDoctor">添加</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                <el-table-column prop="num" label="编号" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" width="100"  align="center"></el-table-column>
                <el-table-column prop="position" label="职称" width="100" align="center"></el-table-column>
                <el-table-column prop="speciality" label="专长" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="num" label="编号">
                            <el-input v-model="form.num"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="name" label="姓名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="birth" label="出生日期">
                            <el-date-picker
                            type="date"
                            v-model="form.birth"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;"
                        ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="gender" label="性别">
                            <el-select v-model="form.gender">
                                <el-option value="0" label="女"></el-option>
                                <el-option value="1" label="男"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item prop="position" label="职称">
                    <el-input v-model="form.position"></el-input>
                </el-form-item>
                <el-form-item prop="speciality" label="专长">
                    <el-input v-model="form.speciality"></el-input>
                </el-form-item>
                <el-form-item prop="introduction" label="简介">
                    <el-input type="textarea" :rows="4" v-model="form.introduction"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-show="!isAdd" type="primary" @click="saveEdit">确 定</el-button>
                <el-button v-show="isAdd" type="primary" @click="submit">添加</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'manageDoctor',
    data() {
        let checkNum = (rule, value, callback) => {
            this.$axios.get('/getDoctorByNum', {params:{doctorNum: value}})
            .then((response) => {
                if(response.data){
                    callback(new Error("改编号已经注册！"))
                }
            }).catch((error) => {
                console.log("发生错误！")
            })
        };
        return {
            deptList:[],
            deptId:'',
            tableData: [],
            editVisible: false,
            isAdd:false,
            form: {},
            rules:{
                num:[
                    {required: true, message:"编号不能为空", trigger: 'blur'},
                    {validator: checkNum, trigger: 'blur'}
                ],
                name:[
                    {required: true, message:"姓名不能为空", trigger: 'blur'}
                ],
                gender:[
                    {required: true, message:"性别不能为空", trigger: 'blur'}
                ],
                birth:[
                    {required: true, message:"出生日期不能为空", trigger: 'blur'}
                ],
                position:[
                    {required: true, message:"职位不能为空", trigger: 'blur'}
                ],
                speciality:[
                    {required: true, message:"专长不能为空", trigger: 'blur'}
                ],
                introduction:[
                    {required: true, message:"介绍不能为空", trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        cancel(){
            this.editVisible = false
            this.isAdd = false
        },
        addDoctor(){
            if(this.deptId === ''){
                this.$message("请选择科室！")
                return
            }
            var data = {
                id:'',
                num:'',
                name:'',
                dept:'',
                birth:'',
                speciality:'',
                introduction:'',
                position:''
            }
            this.form = data
            this.editVisible = true
            this.isAdd = true
        },
        submit(){
            this.$refs['form'].validate((valid) => {
                if(valid){
                    this.form.dept = this.deptId
                    this.$axios.post('/addDoctor', this.form)
                    .then((response) => {
                        this.$message(response.data.message)
                        this.handleSearch()
                    }).catch((error) => {
                        console.log("发生错误，添加失败！")
                    })
                this.editVisible = false
                this.isAdd = false
                }
            })
        },
        saveEdit(){
            if(this.form.gender === '女'){
                this.form.gender = '0'
            }
            if(this.form.gender === '男'){
                this.form.gender = '1'
            }
            this.$refs['form'].validate((valid) => {
                if(valid){
                    this.$axios.post('/updateDoctor', this.form)
            .then((response) => {
                this.$message("修改成功！")
                this.editVisible = false
            }).catch((error) => {
                this.$message("出现错误，修改失败！")
                this.editVisible = false
            })
                }
            })
            
        },
        handleEdit(index, row){
            this.editVisible = true
            this.form = row
            if(row.gender === 0){
                this.form.gender = '女'
            }
            if(row.gender === 1){
                this.form.gender = '男'
            }
        },
        handleDelete(index, row){
            this.$confirm('是否删除该医生？','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning'
            }).then(() => {
                this.$axios.get("/deleteDoctor", {params:{num: row.num}})
                .then((res) => {
                    this.$message(res.data.message)
                    this.handleSearch()
                }).catch((error) => {
                    console.log("发生错误！")
                })
                }).catch(() => {
                    this.$message("已取消")
                })
        },
        // 触发搜索按钮
        handleSearch() {
            this.$axios.get('/getDoctorListByDept',{params: {dept:this.deptId}
            }).then((response) => {
                this.tableData = response.data
            }).catch((error) => {
                console.log("获取医生失败！")
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

        //清空form表单数据
        clearForm(){
            this.form.id = ''
            this.form.num = ''
            this.form.name = ''
            this.form.gender = ''
            this.form.birth = ''
            this.form.speciality = ''
            this.form.introduction = ''
            this.form.dept = ''
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
