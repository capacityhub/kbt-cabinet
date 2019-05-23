<template>
    <el-dialog
            title="编辑应用"
            :visible.sync="visibleDialog"
            :append-to-body='true'
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            :before-close="beforeClose"
    >
    <div class="updata-form">
        <router-view></router-view>

        <AppInfo style="width: 100%" :formData="form" ref="update"></AppInfo>
        <div class="btn">
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button type="primary" @click="onCancel">取消</el-button>
        </div>
    </div>
    </el-dialog>
</template>

<script>
    import { mapState,mapActions } from 'vuex';
    import AppInfo from '@/views/view-components/common/app-info'

    export default {
        components:{
            AppInfo,
        },
        data(){
            return{
                // id:this.$route.params.id,
                form: {
                    name: '',
                    profile: '',
                    applicationUrl: '',
                    arrangeName: '',
                    arrangeId:'',
                    onlineType: '0',
                    status: '',
                    logoUrl:'',
                    previewImg:''
                },
                updateMessage:'修改成功',
                visibleDialog:false,
            }
        },
        props:['showUpdateForm','id'],
        created(){
            this.visibleDialog = this.showUpdateForm;

            //根据id查询应用信息
            this.GetAppInfo(this.id).then(code => {
                this.form = this.appInfo;
                this.$set(this.form,'onlineType',this.form.onlineType.toString());
            })
        },
        computed:{
            ...mapState({
                appInfo:state => state.application.appInfo
            })
        },
        methods:{
            ...mapActions({
                GetAppInfo:'application/GetAppInfo',
                EditApp:'application/EditApp',
            }),
            //确定按钮
            onSubmit(){
                this.form = this.$refs.update.form;
                //保持原来的status，保证应用的上/下线/草稿状态不变
                this.form.status = this.appInfo.status;
                let check = false;
                if(this.form.status == 0){
                    //草稿校验
                    check = this.$refs.update.checkDraftForm();
                }else if (this.form.status == 3){
                    //下线应用校验
                    check = this.$refs.update.checkForm();
                }
                if(check){
                    this.updateApp((res) => {
                        if(res == 200){
                            this.updateMessage = '修改成功';
                            this.resultBox(() => {
                                this.closeUpdate();
                            });
                        }else{
                            this.updateMessage = '操作失败，请稍后再试';
                            this.resultBox(() => {

                            });
                        }
                    });
                }

            },
            //取消按钮
            onCancel(){
                this.closeUpdate();
            },

            //调用修改接口
            updateApp(cb){
                this.EditApp(this.form).then((code) => {
                    if (code == 200) {
                        cb(code);
                    } else {
                        cb(code);
                    }
                }).catch(err => {
                    cb(err);
                })
            },

            //结果显示弹框
            resultBox(cb){
                this.$alert(this.updateMessage, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        cb();
                    }
                });
            },

            closeUpdate(){
                // if (this.isApplication()) {
                //     this.$router.push('/application');
                // } else {
                //     this.$router.push('/appmanager/app-manage/appinfo/list');
                // }
                this.visibleDialog = false;
                this.$emit('closeDialog','showUpdateForm');
                this.$emit('reloadList');
            },
            //点击关闭按钮时的提醒
            beforeClose(done){
                this.$confirm('关闭后将不会对应用的修改进行保存，确认关闭？','提示')
                    .then(() => {
                        this.$emit('closeDialog','showUpdateForm');
                        done();
                    })
                    .catch(() => {});
            },
        }
    }
</script>

<style lang="less">
    .updata-form{
        background-color: #FFF;
        width: 100%;
        padding-bottom: 36px;
        .btn{
            width: 100%;
            display: flex;
            justify-content: center;
            border-top: 1px solid #eee;
            padding-top: 30px;
            .el-button{
                width: 160px;
                margin-right: 60px;
            }
        }
    }
</style>
