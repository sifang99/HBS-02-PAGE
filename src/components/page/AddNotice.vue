<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 管理公告</el-breadcrumb-item>
                <el-breadcrumb-item>添加公告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                <p>
                    <label for="author">发布人：</label>
                    <el-input v-model="author" id="author" style="width:10%"></el-input>
                </p>
                <p style="margin-top:10px">
                    <label for="notice-title">标题：</label>
                    <el-input v-model="title" id="notice-title" style="width:60%"></el-input>
                </p>
                
            </div>
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" ></quill-editor>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        name: 'addNotice',
        data: function(){
            return {
                content: '',
                author:'',
                title:'',
                //设置编辑器
                editorOption:{
                    placeholder:'请 填 写 内 容',
                    modules:{
                        toolbar:[
                            ['bold','italic','link','underline','blockquote'],
                            [{'indent':'-1'},{'indent':'+1'}],
                            [{'color':[]}],
                            [{'font':[]}],
                            [{'align':[]}],
                            [{'header': [1, 2, 3, 4, 5, 6]}],
                            [{'list':'ordered'},{'list':'bullet'}],
                            [{'size':['small',false, 'large','huge']}],
                            ['clean']
                        ]
                    }
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                if(this.author == ''){
                    this.$message("请输入作者")
                    return
                }
                if(this.title == ''){
                    this.$message("请输入标题")
                    return
                }
                if(this.content == ''){
                    this.$message("标题不能为空")
                    return
                }
                var attention = {
                    id:'',
                    title: this.title,
                    content: this.content,
                    author: this.author,
                    publishDay:''
                }
                attention.publishDay = this.getTime()
                this.$axios.post('/addAttention', attention)
                .then((response) => {
                    this.$message.success(response.data.message);
                    this.content = ''
                    this.author = ''
                    this.title = ''
                }).catch((error) => {
                    console.log("添加公告时发生错误！")
                })
            },
            getTime(){
                var date = new Date()
                var year = date.getFullYear()
                var month = date.getMonth() + 1
                var day = date.getDate()
                if(month < 10){
                    month = "0" + month
                }
                if(day < 10){
                    day = "0" + day
                }
                return year+"-"+month+"-"+day
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>