<template>
  <div id="editview" style="width: 100%; height: 80%; overflow-y:scroll">
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
    <!-- 富文本编辑 -->
    <div v-show="this.ctype == 'tny'">
      <tinymce
              v-model="tnyContent"
              :height="890"
              :selectId="tnyId"
              class="editor-container" />
    </div>

    <!--markdown-->
    <div v-show="this.ctype== 'md'">
      <div>
        <markdown-editor
          ref="markdownEditor"
          v-model="content"
          :options="{hideModeSwitch:true,previewStyle:'tab'}"
          class="editor-container"/>
      </div>
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
      content: ``
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
  }
}
</script>
<style>
.editor-container{
  height: 800px!important;
}
</style>
