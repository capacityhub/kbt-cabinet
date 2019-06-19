<template>
  <div>
    <div style="text-align: left; margin-left: 1%;margin-top: 15px">

      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>


      <el-tag>
        <a type="info" @click="setTreeMode"><i class="el-icon-menu"></i></a>
      </el-tag>
      <el-tag>
        <a type="info" @click="setListMode"><i class="el-icon-tickets"></i></a>
      </el-tag>
      <el-tag>
        <a type="info" @click="setContentMode"><i class="el-icon-document"></i></a>
      </el-tag>
      <span style="text-align: right">
        <el-input
          style="width: 200px"
          size="mini"
          placeholder="智库笔记搜索"
          prefix-icon="el-icon-search"/>
      </span>


      <el-tag>
        <a type="info" title="搜索" @click=""><i class="el-icon-search"></i></a>
      </el-tag>

    </div>

    <div class="components-container">
      <split-pane :default-percent="paneltreelength" split="vertical">
        <template slot="paneL">
          <split-pane :default-percent="panellistlength" split="vertical">
            <template slot="paneL">
              <div class="menu-container" v-show="treemode">
                <treePage @notifySelectList="showNoteList"/>
              </div>
            </template>
            <template slot="paneR" v-show="listmode">
              <div class="list-container">
                <listPage :listId="slistId" @notifySelectContent="showEditContent"/>
              </div>
            </template>
          </split-pane>
        </template>
        <template slot="paneR">
          <div class="content-container">
            <editPage :cid="scid"/>
          </div>
        </template>

      </split-pane>
    </div>
  </div>

</template>

<script>
import splitPane from 'vue-splitpane'
import treePage from '@/views/notes/tree/tree.vue'
import listPage from '@/views/notes/list/list.vue'
import editPage from '@/views/notes/edit/edit.vue'

export default {
  components: {
    splitPane,
    treePage,
    editPage,
    listPage
  },
  data() {
    return {
      noteTreeTitle: '笔记本',
      noteListTitle: '笔记列表',
      paneltreelength: 35,
      panellistlength: 55,
      treemode: true,
      listmode: true,
      content: 'text',
      html: '',
      sctype: 'md',
      scid: '',
      slistId: '',
      noteProps: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  methods: {
    //显示编辑器
    showEditContent(sid, stype) {
      this.sctype = stype
      this.scid = sid
      console.log('showEditContent:',sid, stype)
    },
    //显示笔记列表
    showNoteList(slistId) {
      this.slistId = slistId
      console.log('showNoteList:', slistId)
    },
    setTreeMode() {
      this.treemode = true;
      this.paneltreelength = 25
      this.panellistlength = 40
      console.log('setTreeMode', this.paneltreelength)
    },
    setListMode() {
      this.listmode = true;
      this.treemode = false;
      this.paneltreelength = 25
      this.panellistlength = 0
      console.log('setTreeMode', this.paneltreelength)
    },
    setContentMode() {
      this.listmode = false;
      this.treemode = false;
      this.paneltreelength = 0
      this.panellistlength = 0
      console.log('setTreeMode', this.paneltreelength)
    },
    resize() {
      console.log('resize')
    }
  }
}

</script>

<style  scoped>
  .menu-container {
    height: 800px;
    text-align: left;
  }
  .list-container {
    height: 800px;
  }
  .content-container {
    height: 800px;
  }
  .components-container {
    position: relative;
    margin-left: 5px;
    height: 800px;
  }
</style>
