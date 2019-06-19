<template>
  <div>
    <el-row style="text-align: right;">
      <div>
        <div style="width: 100%">
          <span style="margin-right: 20%">代码厂库</span>
          <i class="el-icon-plus" style="text-align: right; margin-right: 1px"/>
        </div>
      </div>
    </el-row>

    <el-row style="margin-left: 5px; margin-top: 10px">
      <div v-for="dataItem in this.listData">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <a target="viewcontent" href="http://mahua.jser.me/">
              <i class="el-icon-tickets"/>
              <span>{{ dataItem.name }}</span>
            </a>

            <div class="bottom clearfix">
              {{ dataItem.content }}
            </div>
          </div>
        </el-card>
      </div>
    </el-row>

  </div>
</template>
<script>

export default {
  data() {
    return {
      listData: [
        {
          name: 'Runoob1',
          title: 'test',
          type: 'markdown',
          content: 'xxxxxxxxxxxxx'
        },
        {
          name: 'Runoob2',
          title: 'test',
          type: 'markdown',
          content: 'xxxxxxxxxxxxx'
        },
        {
          name: 'Runoob3',
          title: 'test',
          type: 'markdown',
          content: 'xxxxxxxxxxxxx'
        },
        {
          name: 'Runoob',
          title: 'test',
          type: 'markdown',
          content: 'xxxxxxxxxxxxx'
        }
      ]
    }
  }

}
</script>
<style>

</style>
