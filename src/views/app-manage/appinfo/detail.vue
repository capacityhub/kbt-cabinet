<template>
    <el-dialog
            title="查看应用"
            :visible.sync="visibleDialog"
            :append-to-body='true'
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            @close="closeDialog"
    >
    <div class="detail-form">
        <!--<router-view></router-view>-->
        <AppInfo style="width: 100%" :formData="form" :disabled="true" ref="info"></AppInfo>
        <div class="btn">
            <el-button type="primary" @click="onSure">确定</el-button>
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
                visibleDialog:false,
            }
        },
        props:['showDetailForm','id'],
        created(){
            this.visibleDialog = this.showDetailForm;
            console.log(this.visibleDialog);
            //根据id查询应用信息
            this.GetAppInfo(this.id).then(code => {
                this.form = this.appInfo;
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
            }),

            //确定按钮
            onSure(){
                // if (this.isApplication()) {
                //     this.$router.push('/application');
                // } else {
                //     this.$router.push('/appmanager/app-manage/appinfo/list');
                // }
                this.visibleDialog = false;
            },

            closeDialog(){
                this.$emit('closeDialog','showDetailForm');
            }
        }
    }
</script>

<style lang="less">
    .detail-form{
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
