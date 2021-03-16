<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 科室管理
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
                <el-button 
                    type="primary" 
                    icon="el-icon-plus"
                    class="add-button"
                    @click="addDept"
                >添加</el-button>
            </div>
            <div class="block">
                <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps"
            :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button
                        type="text"
                        size="mini"
                        v-show="data.affiliate === 0"
                        @click="() => append(data)">
                        添加
                        </el-button>
                        <el-button
                        type="text"
                        size="mini"
                        @click="() => edit(node, data)">
                        修改
                        </el-button>
                    </span>
                </span>
            </el-tree>
            </div>
            
            <el-dialog title="添加科室" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" :rules="rule" label-width="70px">
                <el-form-item label="科室名" prop="name">
                    <el-input maxlength="20" placeholder="最多输入20个字符" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="introduction" label="简介">
                    <el-input placeholder="最多输入500个字符" maxlength="500" type="textarea" :rows="4" v-model="form.introduction"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-show="isUpdate" type="primary" @click="modify">修 改</el-button>
                <el-button type="primary" @click="submit">添加</el-button>
            </span>
        </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            deptId:'',
            nodeId:'',
            dept:'',
            editVisible:false,
            isUpdate:false,
            form:{},
            defaultProps:{
                children:'affiliation',
                label:'name'
            },
            rule:{
                name:[
                    {required:true, message:'科室名不能为空', trigger: 'blur'}
                ]
            }
        };
    },
    methods:{
        modify(){

        },
        cancel(){
            this.clearForm()
            this.editVisible = false
        },
        append(data){
            this.editVisible = true
            this.deptId = data.id
            this.dept = data
        },
        edit(node, data){
            console.log("node:")
            console.log(node)
            console.log("data:")
            console.log(data)
        },
        addDept(){
            this.deptId = 0
            this.editVisible = true
        },
        submit(){
            this.$refs['form'].validate((valid) => {
                if(valid){
                    var dept = {
                id:'',
                name:'',
                introduction:'',
                affiliate:''
            }

            dept.affiliate = this.deptId
            dept.name = this.form.name
            dept.introduction = this.form.introduction
            this.$axios.post('/Dept/addDept', dept)
            .then((response) => {
                this.$message(response.data.message)
                this.getDeptList()
            }).catch((error) => {
                console.log("添加科室发生错误！")
            })
            console.log(dept)
            this.editVisible = false
            this.clearForm()
                }
            })
            
        },
        delAllSelection(){
            var deletedata = this.$refs.tree.getCheckedKeys()
            console.log("deletedata")
            console.log(deletedata)
            this.$confirm('是否删除选中科室？','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:'warning'
            }).then(() => {
                this.$axios.get("/Dept/deleteDept", {params:{id: deletedata}, paramsSerializer: params => {
                    return this.qs.stringify(params, {indices: false})
                }})
                .then((res) => {
                    this.$message(res.data.message)
                    this.getDeptList()
                }).catch((error) => {
                    console.log("批量删除科室时发生错误！")
                })
                }).catch(() => {
                    this.$message("已取消")
                })
        },
        clearForm(){
            this.form.name = ''
            this.form.introduction = ''
        },
        getDeptList(){
            this.$axios({
            method:'get',
            url:'/Dept/getAllDepts'
        }).then((response) => {
            this.data = response.data
            let length = this.data.length
            let i = 0
            for(; i < length; i++){
                let affiliateLength = this.data[i].affiliation.length
                let j = 0
                for(; j < affiliateLength; j++){
                    if(this.data[i].affiliation[j].affiliate === 0){
                        this.data[i].affiliation.splice(j, 1)
                        affiliateLength --;
                        j --;
                    }
                }
            }
            console.log(this.data)
        }).catch((error) => {
            console.log("获取科室列表失败！")
        })
        }
    },
    created(){
        this.getDeptList()
    }
}
</script>

<style scoped>
 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

.block{
    width: 80%;
}
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
    margin-left: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>