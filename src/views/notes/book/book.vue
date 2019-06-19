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
               目录
              </div>
            </template>
            <template slot="paneR" v-show="listmode">
              <div class="list-container">
                列表
              </div>
            </template>
          </split-pane>
        </template>
        <template slot="paneR">
          <div class="content-container">
            <div>
              {{currentPage}} / {{pageCount}}
              <pdf
                      src="111111.pdf"
                      @num-pages="pageCount = $event"
                      @page-loaded="currentPage = $event"
              ></pdf>
            </div>
          </div>
        </template>

      </split-pane>
    </div>
  </div>

</template>

<script>
  import splitPane from 'vue-splitpane'
  import pdf from 'vue-pdf'

  export default {
    components: {
      splitPane,
      pdf
    },
    data() {
      return {
        noteTreeTitle: '书籍目录',
        noteListTitle: '书籍列表',
        paneltreelength: 25,
        panellistlength: 40,
        treemode: true,
        listmode: true,
        currentPage: 0,
        pageCount: 0,
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
