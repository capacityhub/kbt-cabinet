(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-182a3362"],{7559:function(t,e,n){},c77f:function(t,e,n){"use strict";var l=n("7559"),a=n.n(l);a.a},caea:function(t,e,n){"use strict";n.r(e);var l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-table",{attrs:{data:t.tableData,border:"","header-cell-style":t.setHeaderColor,stripe:""}},[n("el-table-column",{attrs:{type:"index",label:"序号",width:"80",align:"center","header-align":"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"name",label:"名称",align:"center","header-align":"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"channel",label:"应用来源",align:"center","header-align":"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"updateTime",label:t.timeLable,align:"center","header-align":"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-tooltip",{attrs:{effect:"dark",content:"查看",placement:"bottom"}},[2==e.row.status?n("i",{staticClass:"list-icon icon-details",on:{click:function(n){t.handleDetail(e.row.id)}}}):t._e()]),t._v(" "),n("el-tooltip",{attrs:{effect:"dark",content:"编辑",placement:"bottom"}},[2!=e.row.status?n("i",{staticClass:"list-icon icon-edit",on:{click:function(n){t.handleEdit(e.row.id)}}}):t._e()]),t._v(" "),n("el-tooltip",{attrs:{effect:"dark",content:"上线",placement:"bottom"}},[2!=e.row.status?n("i",{staticClass:"list-icon icon-online",on:{click:function(n){t.handleOnline(e.row.id)}}}):t._e()]),t._v(" "),n("el-tooltip",{attrs:{effect:"dark",content:"下线",placement:"bottom"}},[2==e.row.status?n("i",{staticClass:"list-icon icon-offline",on:{click:function(n){t.handleOffline(e.row.id)}}}):t._e()]),t._v(" "),n("el-tooltip",{attrs:{effect:"dark",content:"删除",placement:"bottom"}},[2!=e.row.status?n("i",{staticClass:"list-icon icon-delete",on:{click:function(n){t.handleDelete(e.row.id)}}}):t._e()])]}}])})],1)},a=[],i={name:"app-list",data:function(){return{timeLable:"上线时间"}},props:["tableData"],watch:{tableData:function(t){if(t.length>0){var e=t[0].status;this.timeLable=2==e?"上线时间":3==e?"下线时间":"保存时间"}}},methods:{setHeaderColor:function(t){t.row,t.column;var e=t.rowIndex;t.columnIndex;return 0==e?"background:#e8ebf2":""},handleEdit:function(t){this.$emit("editApp",t)},handleDetail:function(t){this.$emit("appDetail",t)},handleOnline:function(t){this.$emit("onlineApp",t)},handleOffline:function(t){this.$emit("offlineApp",t)},handleDelete:function(t){this.$emit("deleteApp",t)}}},o=i,c=(n("c77f"),n("0c7c")),r=Object(c["a"])(o,l,a,!1,null,null,null);e["default"]=r.exports}}]);