<template>
    <div class="list-manage">
        <div class="list-header">
            <div class="list-search">
                <el-input
                        placeholder="请输入应用名称"
                        prefix-icon="el-icon-search"
                        v-model="searchText"
                        @input="watchSearchInput"
                        @focus="watchSearchInput"
                        @blur="closeSearchResult"
                        clearable
                ></el-input>
                <div class="search-result" v-show="isSearch">
                    <div v-for="item in searchResults" :key="item.id" class="search-result-item" @click="clickSearchItem(item.id)">
                        <div class="search-result-name">{{searchName(item.name)}}</div>
                        <div class="search-result-status">{{item.status == 2?'已上线':item.status ==3?'已下线':'草稿箱' }}</div>
                    </div>
                    <span v-show="searchText!='' && searchResults.length==0" class="search-result-null">没有符合条件的结果</span>
                </div>
            </div>
            <el-button type="primary" icon="el-icon-plus" @click="createApp">创建应用</el-button>
        </div>
        <el-tabs v-model="listStatus" @tab-click="tabClick">
            <el-tab-pane :label="onlineLable" name="2">
                <AppList :tableData="tableData"
                         @deleteApp="appDelete"
                         @editApp="appEdit"
                         @appDetail="appDetail"
                         @onlineApp="appOnline"
                         @offlineApp="appOffline">
                </AppList>
                <div class="list-page">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :page-size="pageSize"
                            :page-count="totalPages"
                            @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="offlineLable" name="3">
                <AppList :tableData="tableData"
                         @deleteApp="appDelete"
                         @editApp="appEdit"
                         @appDetail="appDetail"
                         @onlineApp="appOnline"
                         @offlineApp="appOffline">
                </AppList>
                <div class="list-page">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :page-size="pageSize"
                            :page-count="totalPages"
                            @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="draftLable" name="0">
                <AppList :tableData="tableData"
                         @deleteApp="appDelete"
                         @editApp="appEdit"
                         @appDetail="appDetail"
                         @onlineApp="appOnline"
                         @offlineApp="appOffline">
                </AppList>
                <div class="list-page">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :page-size="pageSize"
                            :page-count="totalPages"
                            @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>

        <!--添加，修改，查看弹框-->
        <AppAdd v-if="showCreateForm"
                :showCreateForm="showCreateForm"
                @closeDialog="closeDialog"
                @reloadList="getList"
        ></AppAdd>
        <AppDetail v-if="showDetailForm"
                :showDetailForm="showDetailForm"
                :id="currentId"
                @closeDialog="closeDialog"
        ></AppDetail>
        <AppUpdate v-if="showUpdateForm"
                   :showUpdateForm="showUpdateForm"
                   :id="currentId"
                   @closeDialog="closeDialog"
                   @reloadList="getList"
        ></AppUpdate>
    </div>
</template>

<script>
    import { getStore, setStore } from '@/libs/storage';
    import { mapState,mapActions,mapMutations } from 'vuex';
    import AppList from '@/views/view-components/common/app-list';
    import AppAdd from '@/views/app-manage/appinfo/add';
    import AppDetail from '@/views/app-manage/appinfo/detail';
    import AppUpdate from '@/views/app-manage/appinfo/update';

    export default {
        components:{
            AppList,
            AppAdd,
            AppDetail,
            AppUpdate
        },
        data() {
            return {
                listStatus:'2',
                tableData: [],
                onlineLable:'已上线',
                offlineLable:'已下线',
                draftLable:'草稿箱',
                pageSize:8,
                pageNumber:1,
                totalPages:0,
                confirmText:'确认删除？',
                showCreateForm:false,
                showDetailForm:false,
                showUpdateForm:false,
                currentId:0,
                isSearch:false,
                searchText:'',
                searchResults:[],
            }
        },
        beforeCreate: function(){
            setStore('extAccessToken', this.$route.query.extAccessToken);
        },
        created: function () {
            this.getList();

        },
        computed: {
            ...mapState({
                appList:state => state.application.appList,
                totalPage:state => state.application.totalPages
            }),
            searchName(){
                return function(text){
                    return text;
                }
            },
        },
        methods: {
            ...mapActions({
                GetAppList:'application/GetAppList',
                DeleteApp:'application/DeleteApp',
                EditApp:'application/EditApp',
            }),
            ...mapMutations({
                SetAppInfo:'application/GET_APP_INFO',
            }),

            //查询列表
            getList(){
                let params = {
                    status:this.listStatus,
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                };
                this.GetAppList(params).then(code => {
                    if(code == 200){
                        this.tableData = this.appList;
                        this.totalPages = this.totalPage;
                    }
                });
            },
            //tab页切换(获取对应状态的列表)
            tabClick(tab){
                this.listStatus = tab.name;
                this.getList();
            },
            //新建（目前是弹框）
            createApp(){
                // if(this.isApplication()) {
                //     this.$router.push('/application/add');
                // }else{
                //     this.$router.push('/appmanage/add');
                // }
                this.showCreateForm = true;
            },
            //编辑（目前是弹框）
            appEdit(id){
                // if(this.isApplication()) {
                //     this.$router.push('/application/update/'+id);
                // }else{
                //     this.$router.push('/appmanage/update/'+id);
                // }
                this.showUpdateForm = true;
                this.currentId = id;
            },
            //查看（目前是弹框）
            appDetail(id){
                // if(this.isApplication()) {
                //     this.$router.push('/application/detail/'+id);
                // }else{
                //     this.$router.push('/appmanage/detail/'+id);
                // }
                this.showDetailForm = true;
                this.currentId = id;
            },
            //关闭弹框
            closeDialog(data){
                this[data] = false;
                // this.getList();
            },


            //上线
            appOnline(id){
                this.confirmText = '上线后该应用会显示在客户端中，确认上线吗？';
                this.confirmBox((boo) => {
                    if(boo){
                        let item = this.getInfoById(id);
                        item.status = 2;
                        this.EditApp(item).then(code => {
                            if(code == 200){
                                //重新查询当前tab页的列表
                                this.getList();
                                this.$message.success('应用上线成功');
                            }else{
                                this.$message.error('错误码：'+code+'，应用上线失败');
                            }
                        }).catch(err => {
                            this.$message.error('应用上线失败,错误：'+err);
                        });
                    }
                });
            },
            //下线
            appOffline(id){
                this.confirmText = '下线后该应用将不会显示在客户端中，确认下线吗？';
                this.confirmBox((boo) => {
                    if(boo){
                        let item = this.getInfoById(id);
                        item.status = 3;
                        this.EditApp(item).then(code => {
                            if(code == 200){
                                //重新查询当前tab页的列表
                                this.getList();
                                this.$message.success('应用下线成功');
                            }else{
                                this.$message.error('错误码：'+code+'，应用下线失败');
                            }
                        }).catch(err => {
                            this.$message.error('应用下线失败,错误：'+err);
                        });
                    }
                });
            },
            //删除
            appDelete(id) {
                this.confirmText = '确定删除该应用吗？';
                this.confirmBox((boo) => {
                    if(boo){
                        this.DeleteApp(id).then(code => {
                            if(code == 200){
                                this.$message.success('应用删除成功');
                            }else{
                                this.$message.error('错误码：'+code+'，应用删除失败');
                            }
                        }).catch(err => {
                            this.$message.error('应用删除失败,错误：'+err);
                        });
                    }
                });
            },

            //从数组中根据ID找出指定对象
            getInfoById(id){
                let data = this.tableData;
                let obj = data.find(item => {
                    return item.id == id;
                })
                return obj;
            },

            //状态改变弹框
            confirmBox(cb){
                this.$confirm(this.confirmText, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    //点击确定
                    cb(true);
                }).catch(() => {
                    //点击取消
                    cb(false);
                });
            },

            //分页-当前页数改变
            handleCurrentChange(value){
                this.pageNumber = value;
                this.getList();
            },

            //监听搜索输入框的值
            watchSearchInput(){
                let val = this.searchText;
                //每次输入都重新计时
                if(this.timer){
                    clearTimeout(this.timer);
                }
                //计时进行查询
                if(val != ''){
                    this.isSearch = true;
                    this.timer = setTimeout(() => {
                        //查询数据
                        this.searchData(val);
                    },600)
                }else{
                    this.searchResults.splice(0, this.searchResults.length);
                    this.closeSearchResult();
                }
            },

            //关闭搜索结果框
            closeSearchResult(){
                if(this.searchResults.length>0&&this.searchText == '' || this.searchText == '' || this.searchResults.length==0){
                    this.isSearch = false;
                }
            },
            //搜索结果
            searchData(val){
                let params = {
                    name:val,
                };
                this.GetAppList(params).then(code => {
                    if(code == 200){
                        this.searchResults = this.appList;
                    }
                });
            },

            //点击搜索结果查看某条数据详情
            clickSearchItem(id){
                this.appDetail(id);
            }
        },
    }
</script>
<style lang="less">
    @import "./list";
</style>
