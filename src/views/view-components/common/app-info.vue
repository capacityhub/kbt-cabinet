<template>
    <el-form class="form" ref="form" :model="form" label-width="120px" :rules="rules" :disabled="disableAll">
        <div class="form-title">基本信息</div>
        <el-form-item label="应用名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入名称" maxlength="20"></el-input>
            <div class="input-info-text">长度不可超过20个字符</div>
        </el-form-item>
        <el-form-item label="应用简介" prop="profile">
            <el-input type="textarea" autosize v-model="form.profile" placeholder="请输入应用简介" maxlength="100"></el-input>
            <div class="input-info-text">长度不可超过100个字符</div>
        </el-form-item>
        <el-form-item label="应用来源" prop="channel">
            <el-input v-model="form.channel" placeholder="请输入应用来源" maxlength="20"></el-input>
            <div class="input-info-text">长度不可超过20个字符</div>
        </el-form-item>
        <div class="form-line"></div>
        <div class="form-title">应用信息</div>
        <el-form-item label="应用首页地址" prop="applicationUrl">
            <el-input v-model="form.applicationUrl" placeholder="请输入地址，如http://www.baidu.com"></el-input>
        </el-form-item>
        <el-form-item label="发布类型" prop="onlineType">
            <el-radio-group v-model="form.onlineType">
                <el-radio label="0">手动上架</el-radio>
            </el-radio-group>
        </el-form-item>
        <!--<el-form-item label="应用分类" prop="arrangeId">-->
            <!--<el-select v-model="form.arrangeId" placeholder="请选择应用类别" :blur="setArrangeName">-->
                <!--<el-option-->
                    <!--v-for="item in arranges"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id"-->
                <!--&gt;</el-option>-->
            <!--</el-select>-->
        <!--</el-form-item>-->
        <div class="form-line"></div>
        <div class="form-title">图标素材</div>
        <el-form-item label="应用图标" :required="true">
            <el-upload
                    :class="showLogoWarning?'logo-upload logo-upload-warning':'logo-upload'"
                    :action="uploadFileUrl"
                    :show-file-list="false"
                    :on-success="logoUploadSuccess"
                    :on-error="uploadError"
                    :before-upload="beforeLogoUpload">
                <img v-if="form.logoUrl" :src="form.logoUrl">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="logo-update" v-if="form.logoUrl && !disableAll">修改</div>
            </el-upload>
            <div class="logo-warning" v-if="showLogoWarning">{{showLogoWarning}}</div>
            <div class="img-prompt">图片格式必须为bmp、jpeg、jpg、png，大小在200k以内，建议图片尺寸为152*152</div>
        </el-form-item>
        <el-form-item label="应用预览图" :required="true" v-if="!disableAll || (disableAll&&imageUrl[0])">
            <div class="preview-img">
                <el-upload
                    v-for="(item,index) in imageUrl"
                    v-if="!disableAll || (disableAll &&item != '')"
                    :key="index"
                    :class="showPreviewWarning?'img-upload logo-upload-warning':'img-upload'"
                    :action="uploadFileUrl"
                    :multiple="false"
                    :show-file-list="false"
                    :on-success="(res)=>{return handleImgSuccess(res,index)}"
                    :on-error="uploadError"
                    :before-upload="beforeImgUpload">
                    <img v-if="imageUrl[index]" :src="imageUrl[index]">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="img-delete" v-if="imageUrl[index] && !disableAll" @click.stop="deleteImg(index)">删除</div>
                </el-upload>
            </div>
            <div class="logo-warning" v-if="showPreviewWarning">{{showPreviewWarning}}</div>
            <div class="img-prompt">图片格式必须为bmp、jpeg、jpg、png，不可大于2M，建议图片尺寸为480*800或720*1280</div>
        </el-form-item>
    </el-form>
</template>

<script>
    /**
     * 这个组件是【应用发布and修改and查看详情】的整个form表单啊
     */
    import {uploadFile} from '@/api/index';
    import { mapState,mapActions } from 'vuex';

    export default {
        name: "app-info",
        data() {
            return {
                form:{},
                arranges:[{id:0,name:'热门应用'},{id:1,name:'系统应用'}],
                uploadFileUrl:uploadFile,
                // imageUrl:['','',''], //预览图，默认3张
                imageUrl:[''], //预览图，默认1张
                rules:{
                    name:[
                        {required: true,message:'请输入应用名称',trigger:'blur'},
                        {max: 20, message: '长度不可超出20个字符', trigger: 'blur' }
                    ],
                    applicationUrl:[
                        {required: true,message:'请输入应用地址',trigger:'blur'},
                    ],
                    profile:[
                        {required: true,message:'请输入应用简介',trigger:'blur'},
                        {max: 100, message: '长度不可超出100个字符', trigger: 'blur' }
                    ],
                    // arrangeId:[
                    //     {required: true,message:'请选择应用分类',trigger:'change'},
                    // ],
                    channel:[
                        {required: true,message:'请选择应用来源',trigger:'blur'},
                        {max: 20, message: '长度不可超出20个字符', trigger: 'blur' }
                    ],
                    onlineType:[
                        {required: true,message:'请选择上线类型',trigger:'change'},
                    ],
                    // status:[
                    //     {required: true,message:'请选择应用状态',trigger:'change'},
                    // ],
                },
                showLogoWarning:"",
                showPreviewWarning:"",
                disableAll:false
            }
        },
        //查看详情时，传入disabled为true，创建和修改可以不传
        props:['formData','disabled'],
        created(){
            if(!this.disabled){
                //创建修改的操作（查看可以不需要查询类别）
                this.getArrangeLists();
            }else{
                //查看详情
                this.disableAll = this.disabled;
            }

            //便于显示，对于数据的一些处理
            this.form = this.formData;
            this.setData();
        },
        watch:{
            //监听父组件props传过来的formData值的变化，在初次进入的时候能及时获取到父组件的值（父组件在created的时候获取信息需要时间）
            formData:{
                handler(newValue,oldValue){
                    this.form = newValue;
                    this.setData();
                },
                deep:true
            }
        },
        computed:{
            ...mapState({
                arrangeList: state => state.arrange.arrangeList,
            }),
            //根据类别ID获取到类别名称（上传表单需要）
            getArrangeName:function(){
                let obj = this.arranges.find((item) => {
                    return item.id == this.form.arrangeId
                });
                return obj.name;
            }
        },
        methods: {
            ...mapActions({
                GetArrangeList:'arrange/GetArrangeList',
            }),

            //处理父组件传过来的数据（处理图片值，设置上传类型和类别的默认值）
            setData(){
                if(this.form.previewImg && this.form.previewImg != ''){
                    this.imageUrl = this.form.previewImg.split(';').filter((item => {
                        return item != '';
                    }));

                }
                this.$set(this.form,'onlineType',this.form.onlineType.toString());
                if(!this.form.arrangeId){
                    this.$set(this.form,'arrangeId',this.arranges[0].id);
                }
            },

            //查询应用分类列表
            getArrangeLists(){
                this.GetArrangeList().then(code => {
                    if(code == 200){
                        this.arranges = this.arrangeList;
                    }
                });
            },

            //上传应用图标成功时的钩子
            logoUploadSuccess(res,file){
                this.form.logoUrl = res.result;
                this.showLogoWarning = "";
            },
            //上传应用图标之前的钩子
            beforeLogoUpload(file){
                let type = file.type;
                const isImg = type.indexOf('jpeg')!=-1 || type.indexOf('jpg')!=-1 || type.indexOf('png')!=-1 || type.indexOf('bmp')!=-1;
                const isLt = file.size / 1024 < 200;
                if (!isImg) {
                    this.showLogoWarning = "上传的图片必须是png,jpg,jpeg，bmp格式";
                }
                if (!isLt) {
                    this.showLogoWarning = "上传的图片大小不能超过200KB";
                }
                return isImg && isLt;
            },

            //上传预览图成功时的钩子
            handleImgSuccess(res,index) {
                this.$set(this.imageUrl,index,res.result);
                if(this.imageUrl.length>0){
                    this.form.previewImg = this.imageUrl.join(';');
                }
            },
            //上传预览图之前的钩子
            beforeImgUpload(file) {
                let type = file.type;
                const isImg = type.indexOf('jpeg')!=-1 || type.indexOf('jpg')!=-1 || type.indexOf('png')!=-1 || type.indexOf('bmp')!=-1;
                const isLt = file.size / 1024 /1024  < 2;
                if (!isImg) {
                    this.$message.error('上传的图片必须是png,jpg,jpeg，bmp格式之一!');
                }
                if (!isLt) {
                    this.$message.error('上传的图片大小不能超过2M!');
                }
                return isImg && isLt;
            },
            //上传文件失败
            uploadError(err,file,fileList){
                this.$message.error('上传图片失败!');
            },

            //设置【应用分类】的name（调用接口需要）
            setArrangeName(e){
                this.form.arrangeName = this.getArrangeName;
            },

            //删除预览图(阻止了对于父元素-上传框的事件冒泡，鼠标悬浮时点击删除即可)
            deleteImg(index){
                this.imageUrl.splice(index,1,"");
                this.form.previewImg = this.imageUrl.join(';');
            },

            //设置对于logo图标的校验提示信息
            logoImgCheck(){
                this.showLogoWarning = "请上传应用图标";
            },
            //设置预览图的校验
            previewCheck(){
                this.showPreviewWarning = "请上传应用预览图";
            },

            //根据rules校验指定表单
            checkForm(){
                let form = false;
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        form = true;
                    } else {
                        form = false;
                    }
                });
                let logo = this.form.logoUrl != ''?true:false;
                let img = this.form.previewImg != ''?true:false;
                if(!logo){
                    this.logoImgCheck();
                }
                if(!img){
                    this.previewCheck();
                }
                return logo && img && form;
            },
            //保存草稿时只校验名称,地址，图标(还有应用分类，目前设置了默认值)
            checkDraftForm(){
                let form = false;
                //校验部分表单，valid的值为""为正确
                this.$refs['form'].validateField(['name','applicationUrl'],(valid) => {
                    console.log('draft -valid :',valid);
                    if (valid == '') {
                        form = true;
                    } else {
                        form = false;
                    }
                });
                let logo = this.form.logoUrl != ''?true:false;
                if(!logo){
                    this.logoImgCheck();
                }
                return form && logo;
            }

        }
    }
</script>

<style lang="less">
    @import "app-info";
</style>
