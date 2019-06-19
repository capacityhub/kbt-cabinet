<template>

  <div style="height: 80%; overflow-y:scroll">
    <el-row style="margin-top: 10px; background: #F2F6FC">
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
      <div style="text-align: right">
         <span>
           <el-button  @click="loadTree" type="primary" plain icon="el-icon-refresh" size="mini">刷新</el-button>
          </span>

      </div>

    </el-row>

    <el-tree
      ref="TreeMenuList"
      :data="setTree"
      :load="loadTreeData"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="tree-manager"
      node-key="id"
      lazy
      draggable
      icon-class
      @node-contextmenu="rightContextMenu"
      @node-click="showSelectList"
    >
      <div v-contextmenu:contextmenu slot-scope="{ node, data }" class="slot-t-node" style="margin-outside:10px">
        <span v-show="!node.isEdit" style="margin-top: 5px">
          <span>
            <i :class="{ 'fa fa-folder-o': !node.expanded, 'fa fa-folder-open-o':node.expanded}" />
            <span>{{ node.label }}</span>
          </span>
        </span>
        <!-- 编辑输入框 -->
        <span v-show="node.isEdit">
          <el-input
            :ref="'slotTreeInput'+data.id"
            v-model="data.name"
            size="mini"
            autofocus
            @blur.stop="nodeBlur(node, data)"
            @keyup.enter.native="nodeBlur(node, data)"/>
        </span>
      </div>
    </el-tree>
    <v-contextmenu ref="contextmenu">

      <!--<v-contextmenu-submenu title="新建文件" @submenu-show="handleSubmenuShow">-->
        <!--<v-contextmenu-item @click="nodeAdd(1)"> MarkDown </v-contextmenu-item>-->
        <!--<v-contextmenu-item divider/>-->
        <!--<v-contextmenu-item @click="nodeAdd(2)"> 绘图 </v-contextmenu-item>-->
        <!--<v-contextmenu-item divider/>-->
        <!--<v-contextmenu-item @click="nodeAdd(3)"> 富文本 </v-contextmenu-item>-->
        <!--<v-contextmenu-item divider/>-->
      <!--</v-contextmenu-submenu>-->

      <v-contextmenu-item divider/>
      <v-contextmenu-submenu title="新建目录" @submenu-show="handleSubmenuShow">
        <!--<v-contextmenu-item @click="nodeAdd(4)">同级目录</v-contextmenu-item>-->
        <v-contextmenu-item @click="nodeAdd(5)">子目录</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-contextmenu-item divider/>

      <v-contextmenu-item @click="nodeDel">删除</v-contextmenu-item>
      <v-contextmenu-item divider/>
      <v-contextmenu-item @click="nodeEdit">修改</v-contextmenu-item>

      <v-contextmenu-item divider/>

      <v-contextmenu-submenu title="导出" @submenu-show="handleSubmenuShow">
        <v-contextmenu-item @click="nodeExport(1)">zip</v-contextmenu-item>
        <v-contextmenu-item divider/>
      </v-contextmenu-submenu>
      <v-contextmenu-item divider/>

      <v-contextmenu-submenu title="git" @submenu-show="handleSubmenuShow">
        <v-contextmenu-item @click="nodePull">pull</v-contextmenu-item>
        <v-contextmenu-item @click="nodePush">push</v-contextmenu-item>
        <v-contextmenu-item divider/>
      </v-contextmenu-submenu>
      <v-contextmenu-item divider/>

      <v-contextmenu-item @click="cancelMenu()">取消</v-contextmenu-item>

    </v-contextmenu>

  </div>
</template>
<script>
import ElCol from 'element-ui/packages/col/src/col'
import 'font-awesome/css/font-awesome.min.css'

import { getTreeList, getMaxId, addTree, saveTree, deleteTree, pushGitItem, pullGitItem } from '@/api/notes'
const userId = 'userId'
export default {
  name: 'Treepage',
  components: { ElCol },
  data() {
    return {
      selectNode: null,
      selectData: null,
      gitItemData: null,
      maxExpandId: 0,
      non_maxExpandId: 0,
      setTree: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      input: '',
      editObj: {},
      menuVisible: false,
    }
  },
  created: function() {
      this.loadTree()
  },
  methods: {
    loadTree(){
        getTreeList(userId, "").then(response => {
            console.log('getTreeList root notes:' + response)
            this.setTree = response.result
        })
        getMaxId(userId).then(response => {
            console.log('getMaxId:' + response)
            this.maxExpandId = response.maxId
            this.non_maxExpandId = response.maxId
        })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    loadTreeData(itemNode, resolve) {
      console.log('loadTreeData Request:', itemNode)
      if (itemNode.level === 0) {
        return resolve(this.setTree)
      } else {
        getTreeList(userId, itemNode.data.id).then(response => {
          console.log('loadTreeData Response:' + response)
          resolve(response.result)
        })
      }
      this.editObj = resolve
    },
    nodeBlur() {
      const n = this.selectNode
      const d = this.selectData
      console.log("nodeBlur:",n, d)
      if (n.isEdit) {
        this.$set(n, 'isEdit', false)
      }
      this.$nextTick(() => {
        this.$refs['slotTreeInput' + d.id].$refs.input.focus()
      })

      saveTree(userId, n.data.name, n.data.parentId, n.data.id).then(response => {
        console.log('nodeSave OK:' + response)
        n.data.name = response.result.name;
        n.data.parentId = response.result.parentId;
        n.data.id = response.result.id;
      })
    },
    nodeEdit() {
      const n = this.selectNode
      const d = this.selectData
      console.log("nodeEdit:",n, d)
      if (!n.isEdit) {
        this.$set(n, 'isEdit', true)
      }
    },
    nodeDel() {
      const n = this.selectNode
      const d = this.selectData
      console.log(n, d)
      if (d.children && d.children.length !== 0) {
        this.$message.error('此节点有子级，不可删除！')
        return false
      } else {
        const DelFun = () => {
          console.log("DelFun start:", n, d)
         let deleteId = d.id
          let curList = n.parent.data.children || n.parent.data
       n.parent.data.children = []
           console.log("DelFun Request:", n, d)
           deleteTree(deleteId).then(res => {
              this.operationLoading = false;
              if (res.success === true) {
                this.$Message.success("删除成功");

              }
            });
        }
        const ConfirmFun = () => {
          this.$confirm('是否删除此节点？', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            DelFun()
          }).catch(() => {
          })
        }
        d.id > this.non_maxExpandId ? DelFun() : ConfirmFun()
      }
    },
    nodeAdd(type) {
      const n = this.selectNode
      const d = this.selectData
      console.log("nodeAdd Request:", n, d)
      saveTree(userId, "新建笔记本", n.data.id, "").then(response => {
        console.log('nodeAdd Response:', d, JSON.stringify(response))
        d.children.push({
          id: response.result.id,
          name: response.result.name,
          parentId: response.result.parentId,
          children: []
        })
        if (!n.expanded) {
          n.expanded = true
        }
      })

    },
    nodeExport(type) {
      const n = this.selectNode
      const d = this.selectData
      console.log("nodeExport:", n, d, type)
    },
    rightContextMenu(event, object, value, element) {
      this.selectNode = value
      this.selectData = object
      console.log("rightContextMenu:", value)
    },
    handleSubmenuShow(vm, placement) {
    },
    cancelMenu(){

    },
    showSelectList(object, value, element) {
      this.selectNode = value
      this.selectData = object
      if(!!object.gitId){
        this.gitItemData = object
      }
      console.log("showSelectList:", value, object)
      this.$emit('notifySelectList', object.id)
    },
    nodePull() {
        const d = this.gitItemData
        pullGitItem(d.gitId).then(response => {
            this.$Message.success("pull submit success please success");
        })
    },
    nodePush() {
      const d = this.gitItemData
      pushGitItem(d.gitId).then(response => {
          this.$Message.success("push submit success please success");
      })
    }
  }
}
</script>
<style>
  .el-icon-caret-right:before {
    content: "";
  }
  .el-icon-caret-right:after {
    content: "";
  }
</style>
