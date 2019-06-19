<template>
  <div id="editview">
    <div id="edit_header">
      <span style="text-align: right">
        <el-input
          v-model="ctitle"
          style="width: 400px"
          size="mini"/>
      </span>

      <el-tag>
        <a type="info" title="类型">{{ ctype }}</a>
      </el-tag>

      <el-tag>
        <a type="info" title="保存" @click="save"><i class="el-icon-check"></i></a>
      </el-tag>

      <el-tag>
        <a type="info" title="编辑" @click="edit"><i class="el-icon-edit-outline"></i></a>
      </el-tag>


    </div>

    <div style="width: 100%; height: 900px; overflow-y:scroll">

      <div style="margin-bottom: 20px;">
        <el-button
                size="small"
                @click="addTab(editableTabsValue)">
          add tab
        </el-button>
      </div>
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
                v-for="(item, index) in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name">
          <!-- 富文本编辑 -->
          <div v-show="ctype == 'tny'">
            <tinymce
                    v-model="tnyContent"
                    :height="890"
                    :selectId="tnyId"
                    class="editor-container" />
          </div>

          <!--markdown-->
          <div v-show="ctype== 'md'">
            <div>
              <markdown-editor
                      ref="markdownEditor"
                      v-model="content"
                      :options="{hideModeSwitch:true,previewStyle:'tab'}"
                      class="editor-container"/>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>



    </div>


  </div>
</template>
<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import Tinymce from '@/components/Tinymce'


import { getNoteContent, saveListItem } from '@/api/notes'
const userId = "userId"

export default {
  components: {
    MarkdownEditor,
    Tinymce
  },
  props: {
    cid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tnyId:'',
      tnyContent:'',
      ctype: `md`,
      ctitle: ``,
      content: ``,
      editableTabsValue: '1',
      editableTabs: [{
        tnyId:'',
        tnyContent:'test content',
        ctype: `md`,
        ctitle: `新建markdown`,
        title: '新建markdown',
        name: '新建markdown',
        content: 'test content'
      }],
      tabIndex: 1
    }
  },
  watch: {
    cid: {
        handler(newValue, oldValue) {
            console.log('editpage:', newValue)
            this.cid = newValue
            getNoteContent(userId, this.cid).then(response => {
                console.log('listId Notes:', response)
                this.ctype = response.result.type
                this.ctitle = response.result.title
                if (this.ctype === "tny") {
                  console.log('show note:', "tny")
                  this.tnyId = newValue
                  this.tnyContent = response.result.content
                } else {
                  console.log('show note:', "other")
                  this.content = response.result.content
                }
            })
        },
        deep: true
    }
  },
  methods: {
    save() {
      // markdown
      // rich
      // drawio
      if (this.ctype === 'tny'){
        saveListItem(userId, '', this.cid, this.ctitle , this.ctype,  this.tnyContent, '')
      } else {
        saveListItem(userId, '', this.cid, this.ctitle , this.ctype,  this.content, '')
      }

      this.$message({
        message: '保存成功',
        type: 'success'
      })
    },
    edit() {
      // markdown
      // rich
      // drawio
      this.$message({
        message: '保存成功',
        type: 'success'
      })
    },
    addTab(targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content' + this.tabIndex
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
}
</script>
<style>
.editor-container{
  height: 800px!important;
}
</style>
