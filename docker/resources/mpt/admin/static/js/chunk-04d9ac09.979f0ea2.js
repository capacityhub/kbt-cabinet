(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04d9ac09"],{"03c4":function(t,e,n){},"3a08":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"search"},[n("Card",[n("Row",{staticClass:"operation"},[n("Button",{attrs:{type:"primary",icon:"md-add"},on:{click:t.addMenu}},[t._v("添加子节点")]),t._v(" "),n("Button",{attrs:{icon:"md-add"},on:{click:t.addRootMenu}},[t._v("添加一级菜单")]),t._v(" "),n("Button",{attrs:{icon:"md-trash"},on:{click:t.delAll}},[t._v("批量删除")]),t._v(" "),n("Dropdown",{on:{"on-click":t.handleDropdown}},[n("Button",[t._v("更多操作\n          "),n("Icon",{attrs:{type:"md-arrow-dropdown"}})],1),t._v(" "),n("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[n("DropdownItem",{attrs:{name:"refresh"}},[t._v("刷新")]),t._v(" "),n("DropdownItem",{attrs:{name:"expandOne"}},[t._v("仅显示一级")]),t._v(" "),n("DropdownItem",{attrs:{name:"expandTwo"}},[t._v("仅展开两级")]),t._v(" "),n("DropdownItem",{attrs:{name:"expandAll"}},[t._v("展开所有")])],1)],1),t._v(" "),n("i-switch",{staticStyle:{"margin-left":"5px"},attrs:{size:"large"},model:{value:t.strict,callback:function(e){t.strict=e},expression:"strict"}},[n("span",{attrs:{slot:"open"},slot:"open"},[t._v("级联")]),t._v(" "),n("span",{attrs:{slot:"close"},slot:"close"},[t._v("单选")])])],1),t._v(" "),n("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"start"}},[n("Col",{attrs:{span:"6"}},[n("Alert",{attrs:{"show-icon":""}},[t._v("\n          当前选择编辑：\n          "),n("span",{staticClass:"select-title"},[t._v(t._s(t.editTitle))]),t._v(" "),t.menuForm.id?n("a",{staticClass:"select-clear",on:{click:t.cancelEdit}},[t._v("取消选择")]):t._e()]),t._v(" "),n("Input",{attrs:{suffix:"ios-search",placeholder:"输入菜单名搜索",clearable:""},on:{"on-change":t.search},model:{value:t.searchKey,callback:function(e){t.searchKey=e},expression:"searchKey"}}),t._v(" "),n("div",{staticClass:"tree-bar",style:{maxHeight:t.maxHeight}},[n("Tree",{ref:"tree",attrs:{data:t.data,"show-checkbox":"","check-strictly":!t.strict},on:{"on-check-change":t.changeSelect,"on-select-change":t.selectTree}})],1),t._v(" "),t.loading?n("Spin",{attrs:{size:"large",fix:""}}):t._e()],1),t._v(" "),n("Col",{attrs:{span:"9"}},[n("Form",{ref:"menuForm",attrs:{model:t.menuForm,"label-width":85,rules:t.menuFormValidate}},[n("FormItem",{attrs:{label:"类型",prop:"type"}},[n("RadioGroup",{model:{value:t.menuForm.type,callback:function(e){t.$set(t.menuForm,"type",e)},expression:"menuForm.type"}},[n("Radio",{attrs:{label:0,disabled:t.isButton}},[n("Icon",{staticStyle:{"margin-bottom":"3px"},attrs:{type:"ios-list-box-outline",size:"16"}}),t._v(" "),n("span",[t._v("页面菜单")])],1),t._v(" "),n("Radio",{attrs:{label:1,disabled:t.isMenu}},[n("Icon",{staticStyle:{"margin-bottom":"3px"},attrs:{type:"md-log-in",size:"16"}}),t._v(" "),n("span",[t._v("操作按钮")])],1)],1)],1),t._v(" "),0===t.menuForm.type?n("FormItem",{attrs:{label:"名称",prop:"title"}},[n("Input",{staticStyle:{width:"400px"},model:{value:t.menuForm.title,callback:function(e){t.$set(t.menuForm,"title",e)},expression:"menuForm.title"}})],1):t._e(),t._v(" "),1===t.menuForm.type?n("FormItem",{attrs:{label:"名称",prop:"title"}},[n("Tooltip",{attrs:{placement:"right",content:"操作按钮名称不得重复"}},[n("Input",{staticStyle:{width:"400px"},model:{value:t.menuForm.title,callback:function(e){t.$set(t.menuForm,"title",e)},expression:"menuForm.title"}})],1)],1):t._e(),t._v(" "),0===t.menuForm.type?n("FormItem",{attrs:{label:"路径",prop:"path"}},[n("Input",{staticStyle:{width:"400px"},model:{value:t.menuForm.path,callback:function(e){t.$set(t.menuForm,"path",e)},expression:"menuForm.path"}})],1):t._e(),t._v(" "),1===t.menuForm.type?n("FormItem",{attrs:{label:"请求路径",prop:"path"}},[n("Tooltip",{attrs:{placement:"right","max-width":230,transfer:"",content:"填写后台请求URL，后台将作权限拦截，若无可填写'无'或其他"}},[n("Input",{staticStyle:{width:"400px"},model:{value:t.menuForm.path,callback:function(e){t.$set(t.menuForm,"path",e)},expression:"menuForm.path"}})],1)],1):t._e(),t._v(" "),1===t.menuForm.type?n("FormItem",{attrs:{label:"按钮权限类型",prop:"buttonType"}},[n("Select",{staticStyle:{width:"400px"},attrs:{placeholder:"请选择或输入搜索",filterable:"",clearable:""},model:{value:t.menuForm.buttonType,callback:function(e){t.$set(t.menuForm,"buttonType",e)},expression:"menuForm.buttonType"}},t._l(t.dictPermissions,function(e,o){return n("Option",{key:o,attrs:{value:e.value}},[t._v(t._s(e.title))])}))],1):t._e(),t._v(" "),0===t.menuForm.type?n("div",[n("FormItem",{attrs:{label:"路由英文名",prop:"name"}},[n("Tooltip",{attrs:{trigger:"focus",placement:"right",content:"需唯一"}},[n("Input",{staticStyle:{width:"400px"},model:{value:t.menuForm.name,callback:function(e){t.$set(t.menuForm,"name",e)},expression:"menuForm.name"}})],1)],1),t._v(" "),n("FormItem",{attrs:{label:"图标",prop:"icon"}},[n("Input",{staticStyle:{width:"400px"},attrs:{icon:t.menuForm.icon,placeholder:"点击选择图标"},on:{"on-focus":function(e){t.showEditIcon(0)}},model:{value:t.menuForm.icon,callback:function(e){t.$set(t.menuForm,"icon",e)},expression:"menuForm.icon"}})],1),t._v(" "),n("FormItem",{attrs:{label:"前端组件",prop:"component"}},[n("Input",{staticStyle:{width:"400px"},model:{value:t.menuForm.component,callback:function(e){t.$set(t.menuForm,"component",e)},expression:"menuForm.component"}})],1),t._v(" "),n("FormItem",{attrs:{label:"第三方网页链接",prop:"url"}},[n("Tooltip",{attrs:{placement:"right",content:"前端组件需为 sys/monitor/monitor 时生效"}},[n("Input",{staticStyle:{width:"400px"},attrs:{placeholder:"http://"},model:{value:t.menuForm.url,callback:function(e){t.$set(t.menuForm,"url",e)},expression:"menuForm.url"}})],1)],1)],1):t._e(),t._v(" "),n("FormItem",{attrs:{label:"排序值",prop:"sortOrder"}},[n("InputNumber",{attrs:{max:1e3,min:0},model:{value:t.menuForm.sortOrder,callback:function(e){t.$set(t.menuForm,"sortOrder",e)},expression:"menuForm.sortOrder"}}),t._v(" "),n("span",{staticStyle:{"margin-left":"5px"}},[t._v("值越小越靠前，支持小数")])],1),t._v(" "),n("FormItem",{attrs:{label:"是否启用",prop:"status"}},[n("i-switch",{attrs:{size:"large","true-value":0,"false-value":-1},model:{value:t.menuForm.status,callback:function(e){t.$set(t.menuForm,"status",e)},expression:"menuForm.status"}},[n("span",{attrs:{slot:"open"},slot:"open"},[t._v("启用")]),t._v(" "),n("span",{attrs:{slot:"close"},slot:"close"},[t._v("禁用")])])],1),t._v(" "),n("Form-item",[n("Button",{staticStyle:{"margin-right":"5px"},attrs:{loading:t.submitLoading,type:"primary",icon:"ios-create-outline"},on:{click:t.submitEdit}},[t._v("修改并保存")]),t._v(" "),n("Button",{on:{click:t.handleReset}},[t._v("重置")])],1)],1)],1)],1)],1),t._v(" "),n("Modal",{attrs:{draggable:"",title:t.modalTitle,"mask-closable":!1,width:500,styles:{top:"30px"}},model:{value:t.menuModalVisible,callback:function(e){t.menuModalVisible=e},expression:"menuModalVisible"}},[n("Form",{ref:"menuFormAdd",attrs:{model:t.menuFormAdd,"label-width":85,rules:t.menuFormValidate}},[t.showParent?n("div",[n("FormItem",{attrs:{label:"上级节点："}},[t._v(t._s(t.parentTitle))])],1):t._e(),t._v(" "),n("FormItem",{attrs:{label:"类型",prop:"type"}},[n("RadioGroup",{model:{value:t.menuFormAdd.type,callback:function(e){t.$set(t.menuFormAdd,"type",e)},expression:"menuFormAdd.type"}},[n("Radio",{attrs:{label:0,disabled:t.isButtonAdd}},[n("Icon",{staticStyle:{"margin-bottom":"3px"},attrs:{type:"ios-list-box-outline",size:"16"}}),t._v(" "),n("span",[t._v("页面菜单")])],1),t._v(" "),n("Radio",{attrs:{label:1,disabled:t.isMenuAdd}},[n("Icon",{staticStyle:{"margin-bottom":"3px"},attrs:{type:"md-log-in",size:"16"}}),t._v(" "),n("span",[t._v("操作按钮")])],1)],1)],1),t._v(" "),0===t.menuFormAdd.type?n("FormItem",{attrs:{label:"名称",prop:"title"}},[n("Input",{model:{value:t.menuFormAdd.title,callback:function(e){t.$set(t.menuFormAdd,"title",e)},expression:"menuFormAdd.title"}})],1):t._e(),t._v(" "),1===t.menuFormAdd.type?n("FormItem",{attrs:{label:"名称",prop:"title"}},[n("Tooltip",{attrs:{trigger:"focus",placement:"right",content:"操作按钮名称不得重复"}},[n("Input",{staticStyle:{width:"380px"},model:{value:t.menuFormAdd.title,callback:function(e){t.$set(t.menuFormAdd,"title",e)},expression:"menuFormAdd.title"}})],1)],1):t._e(),t._v(" "),0===t.menuFormAdd.type?n("FormItem",{attrs:{label:"路径",prop:"path"}},[n("Input",{model:{value:t.menuFormAdd.path,callback:function(e){t.$set(t.menuFormAdd,"path",e)},expression:"menuFormAdd.path"}})],1):t._e(),t._v(" "),1===t.menuFormAdd.type?n("FormItem",{attrs:{label:"请求路径",prop:"path"}},[n("Tooltip",{attrs:{placement:"right","max-width":230,transfer:"",content:"填写后台请求URL，后台将作权限拦截，若无可填写'无'或其他"}},[n("Input",{staticStyle:{width:"380px"},model:{value:t.menuFormAdd.path,callback:function(e){t.$set(t.menuFormAdd,"path",e)},expression:"menuFormAdd.path"}})],1)],1):t._e(),t._v(" "),1===t.menuFormAdd.type?n("FormItem",{attrs:{label:"按钮权限类型",prop:"buttonType"}},[n("Select",{attrs:{placeholder:"请选择或输入搜索",filterable:"",clearable:""},model:{value:t.menuFormAdd.buttonType,callback:function(e){t.$set(t.menuFormAdd,"buttonType",e)},expression:"menuFormAdd.buttonType"}},t._l(t.dictPermissions,function(e,o){return n("Option",{key:o,attrs:{value:e.value}},[t._v(t._s(e.title))])}))],1):t._e(),t._v(" "),0===t.menuFormAdd.type?n("div",[n("FormItem",{attrs:{label:"路由英文名",prop:"name"}},[n("Tooltip",{attrs:{trigger:"focus",placement:"right",content:"需唯一"}},[n("Input",{staticStyle:{width:"380px"},model:{value:t.menuFormAdd.name,callback:function(e){t.$set(t.menuFormAdd,"name",e)},expression:"menuFormAdd.name"}})],1)],1),t._v(" "),n("FormItem",{attrs:{label:"图标",prop:"icon"}},[n("Input",{attrs:{icon:t.menuFormAdd.icon,placeholder:"点击选择图标"},on:{"on-focus":function(e){t.showEditIcon(1)}},model:{value:t.menuFormAdd.icon,callback:function(e){t.$set(t.menuFormAdd,"icon",e)},expression:"menuFormAdd.icon"}})],1),t._v(" "),n("FormItem",{attrs:{label:"前端组件",prop:"component"}},[n("Input",{model:{value:t.menuFormAdd.component,callback:function(e){t.$set(t.menuFormAdd,"component",e)},expression:"menuFormAdd.component"}})],1),t._v(" "),n("FormItem",{attrs:{label:"第三方网页链接",prop:"url"}},[n("Tooltip",{attrs:{placement:"right",content:"前端组件需为 sys/monitor/monitor 时生效"}},[n("Input",{staticStyle:{width:"380px"},attrs:{placeholder:"http://"},model:{value:t.menuFormAdd.url,callback:function(e){t.$set(t.menuFormAdd,"url",e)},expression:"menuFormAdd.url"}})],1)],1)],1):t._e(),t._v(" "),n("FormItem",{attrs:{label:"排序值",prop:"sortOrder"}},[n("InputNumber",{attrs:{max:1e3,min:0},model:{value:t.menuFormAdd.sortOrder,callback:function(e){t.$set(t.menuFormAdd,"sortOrder",e)},expression:"menuFormAdd.sortOrder"}}),t._v(" "),n("span",{staticStyle:{"margin-left":"5px"}},[t._v("值越小越靠前，支持小数")])],1),t._v(" "),n("FormItem",{attrs:{label:"是否启用",prop:"status"}},[n("i-switch",{attrs:{size:"large","true-value":0,"false-value":-1},model:{value:t.menuFormAdd.status,callback:function(e){t.$set(t.menuFormAdd,"status",e)},expression:"menuFormAdd.status"}},[n("span",{attrs:{slot:"open"},slot:"open"},[t._v("启用")]),t._v(" "),n("span",{attrs:{slot:"close"},slot:"close"},[t._v("禁用")])])],1)],1),t._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("Button",{attrs:{type:"text"},on:{click:t.cancelAdd}},[t._v("取消")]),t._v(" "),n("Button",{attrs:{type:"primary",loading:t.submitLoading},on:{click:t.submitAdd}},[t._v("提交")])],1)],1),t._v(" "),n("Modal",{attrs:{title:"选择图标",width:800,styles:{top:"30px"},"footer-hide":""},model:{value:t.iconModalVisible,callback:function(e){t.iconModalVisible=e},expression:"iconModalVisible"}},[n("icon-choose",{on:{"on-select":t.handleSelectIcon}})],1)],1)},s=[],i=n("f499"),r=n.n(i),l=(n("c5f6"),n("ac6a"),n("365c")),a=n("79cf"),m=n("c276"),u={name:"menu-manage",components:{IconChoose:a["default"]},data:function(){return{loading:!0,strict:!0,maxHeight:"500px",expandLevel:1,menuModalVisible:!1,iconModalVisible:!1,selectList:[],selectCount:0,showParent:!1,searchKey:"",parentTitle:"",isButtonAdd:!1,isMenuAdd:!1,isMenu:!1,isButton:!1,editTitle:"",modalTitle:"",menuForm:{id:"",title:"",name:"",icon:"",path:"",component:"",parentId:"",buttonType:"",type:0,sortOrder:0,level:null,status:0,url:""},menuFormAdd:{buttonType:""},menuFormValidate:{title:[{required:!0,message:"名称不能为空",trigger:"blur"}],name:[{required:!0,message:"路由英文名不能为空",trigger:"blur"}],icon:[{required:!0,message:"图标不能为空",trigger:"click"}],path:[{required:!0,message:"路径不能为空",trigger:"blur"}],component:[{required:!0,message:"前端组件不能为空",trigger:"blur"}]},submitLoading:!1,data:[],dictPermissions:[],iconType:0}},methods:{init:function(){this.getAllList(),this.getDictPermissions()},getDictPermissions:function(){var t=this;Object(l["I"])("permission_type").then(function(e){e.success&&(t.dictPermissions=e.result)})},showEditIcon:function(t){this.iconType=t,this.iconModalVisible=!0},handleSelectIcon:function(t){0==this.iconType?this.menuForm.icon=t:this.menuFormAdd.icon=t,this.iconModalVisible=!1},handleDropdown:function(t){"expandOne"===t?(this.expandLevel=1,this.getAllList()):"expandTwo"===t?(this.expandLevel=2,this.getAllList()):"expandAll"===t?(this.expandLevel=3,this.getAllList()):"refresh"===t&&this.getAllList()},getAllList:function(){var t=this;this.loading=!0,this.getRequest("/permission/getAllList").then(function(e){if(t.loading=!1,!0===e.success){var n=t.expandLevel;e.result.forEach(function(t){1===n?(1===t.level&&(t.expand=!1),t.children&&t.children.length>0&&t.children.forEach(function(t){2===t.level&&(t.expand=!1)})):t.children&&t.children.length>0&&t.children.forEach(function(t){2===n&&2===t.level&&(t.expand=!1)})}),t.data=e.result}})},search:function(){var t=this;this.searchKey?(this.loading=!0,Object(l["Y"])({title:this.searchKey}).then(function(e){t.loading=!1,e.success&&(t.data=e.result)})):this.getAllList()},selectTree:function(t){if(t.length>0){for(var e in 1===Number(t[0].level)||2===Number(t[0].level)?(this.isButton=!1,this.isMenu=!0):(this.isButton=!0,this.isMenu=!1),0===Number(t[0].status)?this.editStatus=!0:this.editStatus=!1,t[0])null===t[0][e]&&(t[0][e]="");var n=r()(t[0]),o=JSON.parse(n);this.menuForm=o,this.editTitle=o.title}else this.cancelEdit()},cancelEdit:function(){var t=this.$refs.tree.getSelectedNodes()[0];t&&(t.selected=!1),this.isMenu=!1,this.isButton=!1,this.$refs.menuForm.resetFields(),delete this.menuForm.id,this.editTitle=""},cancelAdd:function(){this.menuModalVisible=!1},handleReset:function(){var t=this.menuForm.type;this.$refs.menuForm.resetFields(),this.editStatus=!0,this.menuForm.type=t},submitEdit:function(){var t=this;this.$refs.menuForm.validate(function(e){if(e){if(!t.menuForm.id)return void t.$Message.warning("请先点击选择要修改的菜单节点");t.submitLoading=!0,null===t.menuForm.sortOrder&&(t.menuForm.sortOrder=""),null===t.menuForm.buttonType&&(t.menuForm.buttonType=""),1==t.menuForm.type&&(t.menuForm.name="",t.menuForm.icon="",t.menuForm.component=""),Object(l["w"])(t.menuForm).then(function(e){t.submitLoading=!1,!0===e.success&&(t.$Message.success("编辑成功"),m["a"].initRouter(t),t.init(),t.menuModalVisible=!1)})}})},submitAdd:function(){var t=this;this.$refs.menuFormAdd.validate(function(e){e&&(t.submitLoading=!0,1==t.menuFormAdd.type&&(t.menuFormAdd.name="",t.menuFormAdd.icon="",t.menuFormAdd.component=""),Object(l["d"])(t.menuFormAdd).then(function(e){t.submitLoading=!1,!0===e.success&&(t.$Message.success("添加成功"),m["a"].initRouter(t),t.init(),t.menuModalVisible=!1)}))})},addMenu:function(){if(""!=this.menuForm.id&&null!=this.menuForm.id){this.parentTitle=this.menuForm.title,this.modalTitle="添加菜单权限(可拖动)",this.showParent=!0;var t=0;if(1===this.menuForm.level)t=0,this.isMenuAdd=!0,this.isButtonAdd=!1;else if(2===this.menuForm.level)t=1,this.isMenuAdd=!1,this.isButtonAdd=!0;else{if(3===this.menuForm.level)return void this.$Modal.warning({title:"抱歉，不能添加啦",content:"仅支持2级菜单目录"});t=0,this.isMenuAdd=!1,this.isButtonAdd=!1}this.menuFormAdd={type:t,parentId:this.menuForm.id,level:Number(this.menuForm.level)+1,sortOrder:0,buttonType:"",status:0},this.menuModalVisible=!0}else this.$Message.warning("请先点击选择一个菜单权限节点")},addRootMenu:function(){this.modalTitle="添加一级菜单(可拖动)",this.isMenuAdd=!0,this.isButtonAdd=!1,this.showParent=!1,this.menuFormAdd={type:0,level:1,sortOrder:0,status:0},this.menuModalVisible=!0},changeSelect:function(t){this.selectCount=t.length,this.selectList=t},delAll:function(){var t=this;this.selectCount<=0?this.$Message.warning("您还未勾选要删除的数据"):this.$Modal.confirm({title:"确认删除",content:"您确认要删除所选的 "+this.selectCount+" 条数据?",onOk:function(){var e="";t.selectList.forEach(function(t){e+=t.id+","}),e=e.substring(0,e.length-1),Object(l["n"])(e).then(function(e){!0===e.success&&(t.$Message.success("删除成功"),m["a"].initRouter(t),t.selectList=[],t.selectCount=0,t.cancelEdit(),t.init())})}})}},mounted:function(){var t=document.documentElement.clientHeight;this.maxHeight=Number(t-287)+"px",this.init()}},c=u,d=(n("d5b3"),n("0c7c")),p=Object(d["a"])(c,o,s,!1,null,null,null);e["default"]=p.exports},d5b3:function(t,e,n){"use strict";var o=n("03c4"),s=n.n(o);s.a}}]);