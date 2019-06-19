<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}

.app-main {
  width: 100%;
  height: 100%;
}

.el-dialog{
    margin: 48px 0 50px 280px !important;
    width: 800px !important;
    min-width: 640px;
    .el-dialog__header{
        background-color: #f4f5f9;
        border-bottom: 1px solid #eee;
        .el-dialog__title{
            font-size: 16px !important;
            color: #333 !important;
        }
    }
    .el-dialog__body{
        padding: 0 20px !important;
    }
}

.br button {
  margin-right: 5px;
}

.operation button {
  margin-right: 5px;
}

.ivu-btn-text:focus {
  box-shadow: none !important;
}
</style>
