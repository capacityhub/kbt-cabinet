<template>
  <div style="height: 80%; overflow-y:scroll">
    <el-row style="text-align: right;">
      <div>
        <div style="width: 100%"/>
      </div>
    </el-row>

    <el-row style="margin-top: 10px">
      <div style="text-align: right">

        <span>
          <el-tag @click="refreshList"><i class="el-icon-refresh"></i></el-tag>
        </span>


        <el-dropdown @command="handleCreateFile">

            <span>
              <el-tag><i class="el-icon-plus"></i></el-tag>
            </span>



          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" command="md">新建MarkDown</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus" command="tny">新建互动文本</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus" command="di">新建绘图</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>

      <div v-for="dataItem in this.listData">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <a @click="showCurContent(dataItem.id, dataItem.type)">
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
import { getListItems, saveListItem } from '@/api/notes'
const userId = "userId"
export default {
  props: {
    listId: {
      type: String,
      default: 'L1VzZXJzL3d1aGFvL2RhdGEvY29kZS9mdXNpb24vdGViZG9jL3VyY3MvaW50ZWdyYXRpb25idWlsZC80LWRlcGxveS9kb2NrZXI='
    }
  },
  data() {
    return {
      listData: [
        {
          id: '123',
          name: '新建markdown.md',
          title: '新建markdown.md',
          type: 'md',
          content: '此处填写内容'
        }
      ]
    }
  },
  watch: {
    listId: {
      handler(newValue, oldValue) {
        console.log('listId', newValue)
        getListItems(userId, this.listId).then(response => {
          console.log('listId Notes:' + response)
          this.listData = response.result
        })
      },
      deep: true
    }
  },
  created: function() {
    getListItems(userId, this.listId).then(response => {
      console.log('listId Notes:' + response)
      this.listData = response.result
    })
  },
  methods: {
    showCurContent(sid, stype) {
      console.log('notifySelectContent:', sid)
      this.$emit('notifySelectContent', sid, stype)
    },
    refreshList(){
        getListItems(userId, this.listId).then(response => {
            console.log('refreshList Notes:' + response)
            this.listData = response.result
        })
    },
    handleCreateFile(command) {
      console.log('handleCreateFile ' + command);
      saveListItem(userId, this.listId, '', '新建文档', command,  '', '')

      getListItems(userId, this.listId).then(response => {
        console.log('new Get Notes:' + response)
        this.listData = response.result
      })
    }
  }

}
</script>
<style>

</style>
