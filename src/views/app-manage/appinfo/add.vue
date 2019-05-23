<template>
    <el-dialog
            title="创建应用"
            :visible.sync="visibleDialog"
            :append-to-body='true'
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            :before-close="beforeClose"
    >
    <div class="add-form">
        <!--<router-view></router-view>-->
        <AppInfo style="width: 100%" :formData="form" ref="addInfo"></AppInfo>
        <div class="add-btn">
            <el-button type="primary" @click="onSubmit">创建</el-button>
            <el-button type="primary" @click="onDraftSave">保留草稿</el-button>
        </div>
    </div>
    </el-dialog>
</template>

<style lang="less">
    .add-form{
        background-color: #FFF;
        width: 100%;
        padding-bottom: 36px;
        .add-btn{
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
<script>
    import { mapState,mapActions } from 'vuex';
    import AppInfo from '@/views/view-components/common/app-info';
    export default {
        components:{
            AppInfo,
        },
        data() {
            return {
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
                visibleDialog:false,
            }
        },
        props:['showCreateForm'],
        created(){
            this.visibleDialog = this.showCreateForm;
        },
        methods: {
            ...mapActions({
                AddAPP:'application/AddAPP',
            }),

            //关闭/跳转此页面
            closeAdd(){
                // if(this.isApplication()){
                //     this.$router.push('/application');
                // }else{
                //     this.$router.push('/appmanager/app-manage/appinfo/list');
                // }
                this.visibleDialog = false;
                this.$emit('closeDialog','showCreateForm');
                this.$emit('reloadList');
            },

            //创建按钮
            onSubmit() {
                this.form = this.$refs.addInfo.form;
                let check = this.$refs.addInfo.checkForm();
                //校验表单成功
                if(check){
                    //弹出确认框等一系列操作
                    this.confirmCreate()
                        .then((data) => {
                            //第一个弹框点击确认true和再等等false
                            if(data){
                                //确认创建并上架，调用接口方法，成功后显示弹框2
                                console.log('创建框1--> 点击确认创建按钮，调用创建接口方法');
                                return this.AddAndonline();
                            }else{
                                //保存草稿，调用接口方法，成功后跳转列表页
                                console.log('创建框1--> 点击保存草稿按钮，调用保存草稿接口方法');
                                return this.draftSave();
                            }
                        })
                        .then((data) => {
                            if(data.status === 2){
                                //创建接口执行完
                                console.log('创建框1--> 创建接口执行完,判断执行结果');
                                if(data.code == 200){
                                    console.log('成功,接下来是弹框2');
                                    return this.createResult();
                                }else{
                                    this.$message.error('错误码：'+data.code+'，创建应用失败');
                                    return Promise.reject('stop');
                                }
                            }

                            if(data.status === 0){
                                //草稿接口执行完
                                console.log('创建框1--> 草稿接口执行完，判断执行结果');
                                if(data.code == 200){
                                    console.log('成功，接下来跳转列表页')
                                    this.closeAdd();
                                    return Promise.reject('stop');
                                }else{
                                    this.$message.error('错误码：'+data.code+'，保存草稿失败');
                                    return Promise.reject('stop');
                                }
                            }

                        })
                        .then(data => {
                            if(data){
                                //弹框2 确定
                                this.closeAdd();
                                //这是最后一个then，如果不继续进行其它操作，也不用通过reject来中止，因为这是最后一步
                            }else{
                                //弹框2 返回到创建页（当前页面），清除表单数据
                                console.log('弹框2 返回到创建页（当前页面），清除表单数据');
                                this.form = {
                                    name: '',
                                        profile: '',
                                        applicationUrl: '',
                                        arrangeName: '',
                                        arrangeId:'',
                                        onlineType: '0',
                                        status: '',
                                        logoUrl:'',
                                        previewImg:''
                                }
                                this.$refs.addInfo.imageUrl = ['','',''];
                            }
                        })
                        .catch(data => {
                            //这里处理上面发生错误或者跳转时需要通知接下来then的操作：Promise.reject('stop')
                        })
                }

            },

            //存为草稿按钮
            onDraftSave(){
                this.form = this.$refs.addInfo.form;
                let check = this.$refs.addInfo.checkDraftForm();
                //校验表单（只校验名称）成功
                if(check){
                    //弹出确认框
                    this.confirmDraft()
                        .then(data => {
                            if(data){
                                //确认保存，调用接口方法，成功后跳转列表页
                                console.log('草稿--> 调用接口方法');
                                return this.draftSave();
                            }else{
                                //取消，不做任何其他操作
                                console.log('草稿--> 取消，不做任何其他操作');
                                return Promise.reject();
                            }
                        })
                        .then(data => {
                            if(data.code == 200){
                                this.closeAdd();
                                //这是最后一个then，如果不继续进行其它操作，也不用通过reject来中止，因为这是最后一步
                            }else{
                                this.$message.error('错误码：'+data.code+'，保存草稿失败');
                            }
                        })
                        .catch(data => {
                            //这里处理上面发生错误或者跳转时需要通知接下来then的操作：Promise.reject('stop')
                        })

                }

            },

            //创建应用并上架
            AddAndonline(){
                let add = new Promise((resolve, reject) => {
                    //创建上架状态值为2
                    this.form.status = 2;
                    this.AddAPP(this.form).then(code => {
                        resolve({'status':2,'code':code});
                    })
                });
                return add;
            },
            //保存草稿
            draftSave(){
                let save = new Promise((resolve, reject) => {
                    //草稿状态值为0
                    this.form.status = 0;
                    this.AddAPP(this.form).then(code => {
                        resolve({'status':0,'code':code});
                    })
                });
                return save;
            },

            //创建的确认弹框1
            confirmCreate(){
                let create = new Promise((resolve,reject) => {
                    this.$confirm('确定创建并上架该应用吗？', '提示', {
                        distinguishCancelAndClose:true,
                        confirmButtonText: '确定',
                        cancelButtonText: '再等等，先保存',
                    }).then(() => {
                        //点击确定
                        resolve(true);
                    }).catch((action) => {
                        //区分点击取消即【再等等，先保存】和点击X关闭弹框的操作
                        if(action === 'cancel'){
                            //点击【再等等，先保存】
                            resolve(false);
                        }
                    });
                });
                return create;

            },
            //创建的确认弹框2
            createResult(){
                let result = new Promise((resolve,reject) => {
                    this.$confirm('创建并上架成功', '提示', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '确定',
                        cancelButtonText: '留下来继续创建',
                    }).then(() => {
                        //点击确定
                        resolve(true);
                    }).catch((action) => {
                        //区分点击取消即【留下来继续创建】和点击X关闭弹框的操作
                        if (action === 'cancel') {
                            //点击【留下来继续创建】
                            resolve(false);
                        }
                    });
                });
                return result;
            },
            //保存草稿的确认弹框
            confirmDraft(){
                let draft = new Promise((resolve,reject) => {
                    this.$confirm('确定保存该草稿吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        //点击确定
                        resolve(true);
                    }).catch(() => {
                        //点击取消
                        resolve(false);
                    });
                });
                return draft;
            },

            //点击关闭按钮时的提醒
            beforeClose(done){
                this.$confirm('关闭后当前输入的所有内容会被清除，确认关闭？','提示')
                    .then(() => {
                        this.$emit('closeDialog','showCreateForm');
                        done();
                    })
                    .catch(() => {});
            },
        }
    }
</script>
