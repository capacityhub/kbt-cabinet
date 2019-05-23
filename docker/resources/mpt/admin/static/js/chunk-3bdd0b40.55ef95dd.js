(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3bdd0b40"],{"47cd":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Row",{staticClass:"regist",attrs:{type:"flex",justify:"center",align:"middle"},nativeOn:{keydown:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.submitRegist(e):null}}},[r("Col",{staticClass:"regis-col",attrs:{xs:{span:22}}},[r("Row",{staticClass:"header"},[r("div",{staticClass:"header-title"},[t._v("注册")])]),t._v(" "),t.error?r("Alert",{attrs:{type:"error","show-icon":""}},[t._v(t._s(t.errorMsg))]):t._e(),t._v(" "),r("Row",{staticClass:"regist-form"},[r("Form",{ref:"registForm",staticClass:"form",attrs:{model:t.form,rules:t.rules}},[r("FormItem",{attrs:{prop:"username"}},[r("Input",{attrs:{maxlength:30,size:"large",clearable:"",placeholder:"请输入用户名"},model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}})],1),t._v(" "),r("FormItem",{attrs:{prop:"password"}},[r("Poptip",{attrs:{trigger:"focus",placement:"right",width:"250"}},[r("Input",{attrs:{type:"password",maxlength:20,size:"large",clearable:"",placeholder:"请输入密码，长度为6-20个字符"},on:{"on-change":t.strengthChange},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}}),t._v(" "),r("div",{class:t.tipStyle,attrs:{slot:"content"},slot:"content"},[r("span",{staticClass:"words"},[t._v("强度 : "+t._s(t.strength))]),t._v(" "),r("Slider",{staticStyle:{width:"95%"},attrs:{step:33},model:{value:t.strengthValue,callback:function(e){t.strengthValue=e},expression:"strengthValue"}}),t._v("\n              请至少输入 6 个字符。请不要使"),r("br"),t._v("用容易被猜到的密码。\n            ")],1)],1)],1),t._v(" "),r("FormItem",{attrs:{prop:"confirmPass"}},[r("Input",{attrs:{type:"password",maxlength:20,size:"large",clearable:"",placeholder:"请再次输入确认密码"},model:{value:t.form.confirmPass,callback:function(e){t.$set(t.form,"confirmPass",e)},expression:"form.confirmPass"}})],1),t._v(" "),r("FormItem",{attrs:{prop:"mobile"}},[r("Input",{attrs:{size:"large",clearable:"",placeholder:"请输入手机号"},model:{value:t.form.mobile,callback:function(e){t.$set(t.form,"mobile",e)},expression:"form.mobile"}},[r("Select",{staticStyle:{width:"70px"},attrs:{slot:"prepend"},slot:"prepend",model:{value:t.select,callback:function(e){t.select=e},expression:"select"}},[r("Option",{attrs:{value:"86"}},[t._v("+86")])],1)],1)],1),t._v(" "),r("FormItem",{attrs:{prop:"verifyCode",error:t.errorCode}},[r("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"space-between"}},[r("Col",{attrs:{xs:{span:16}}},[r("Input",{staticClass:"input-verify",attrs:{size:"large",clearable:"",placeholder:"请输入短信验证码(随意输入即可)",maxlength:10},model:{value:t.form.verifyCode,callback:function(e){t.$set(t.form,"verifyCode",e)},expression:"form.verifyCode"}})],1),t._v(" "),r("Col",{attrs:{xs:{span:7}}},[t.sended?t._e():r("Button",{staticClass:"send-verify",attrs:{size:"large"},on:{click:t.sendVerify}},[t._v("获取验证码")])],1),t._v(" "),r("Col",{attrs:{xs:{span:7}}},[t.sended?r("Button",{staticClass:"count-verify",attrs:{size:"large",disabled:""}},[t._v(t._s(t.countButton))]):t._e()],1)],1)],1),t._v(" "),r("FormItem",{attrs:{prop:"verify"}},[r("Row",{staticClass:"code-row-bg",staticStyle:{"align-items":"center",overflow:"hidden"},attrs:{type:"flex",justify:"space-between"}},[r("Col",{attrs:{xs:{span:16}}},[r("Input",{staticClass:"input-verify",attrs:{size:"large",clearable:"",placeholder:"请输入验证码",maxlength:10},model:{value:t.form.verify,callback:function(e){t.$set(t.form,"verify",e)},expression:"form.verify"}})],1),t._v(" "),r("Col",{attrs:{xs:{span:7}}},[r("div",{staticStyle:{position:"relative"}},[t.loadingCode?r("Spin",{attrs:{fix:""}}):t._e(),t._v(" "),r("img",{staticStyle:{width:"100px",cursor:"pointer",display:"block"},attrs:{src:t.verifyCodeImg,alt:"加载验证码失败"},on:{click:t.getVerifyCode}})],1)])],1)],1)],1),t._v(" "),r("Row",{staticClass:"code-row-bg"},[r("Button",{staticClass:"regist-btn",attrs:{type:"primary",size:"large",loading:t.loading},on:{click:t.submitRegist}},[t.loading?r("span",[t._v("注册中...")]):r("span",[t._v("注册")])]),t._v(" "),r("router-link",{attrs:{to:"/login"}},[r("div",{staticClass:"to-login"},[t._v("已有账号登录")])])],1)],1)],1)],1)},o=[],a=r("365c"),i=(r("a78e"),{data:function(){var t=this,e=function(t,e,r){e.length<6?r(new Error("密码长度不得小于6位")):r()},r=function(e,r,s){r.length<6?s(new Error("密码长度不得小于6位")):r!==t.form.password?s(new Error("两次输入的密码不一致")):s()},s=function(t,e,r){var s=/^[1][3,4,5,6,7,8][0-9]{9}$/;s.test(e)?r():r(new Error("手机号格式错误"))};return{captchaId:"",verifyCodeImg:"",error:!1,errorMsg:"",loading:!1,loadingCode:!0,sended:!1,count:60,countButton:"60 s",tipStyle:"password-tip-none",strength:"无",select:"86",strengthValue:0,errorCode:"",form:{username:"",password:"",confirmPass:"",mobile:"",verifyCode:"",verify:""},rules:{username:[{required:!0,message:"账号不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"},{validator:e,trigger:"blur"}],confirmPass:[{required:!0,message:"确认密码不能为空",trigger:"blur"},{validator:r,trigger:"blur"}],mobile:[{required:!0,message:"手机号不能为空",trigger:"blur"},{validator:s,trigger:"blur"}],verify:[{required:!0,message:"验证码不能为空",trigger:"blur"}]}}},methods:{showErrorMsg:function(t){this.error=!0,this.errorMsg=t},checkStrengthValue:function(t){var e=0;return/\d/.test(t)&&e++,/[a-z]/.test(t)&&e++,/[A-Z]/.test(t)&&e++,/\W/.test(t)&&e++,t.length>=10&&e++,e},strengthChange:function(){if(!this.form.password)return this.tipStyle="password-tip-none",this.strength="无",void(this.strengthValue=0);var t=this.checkStrengthValue(this.form.password);t<=1?(this.tipStyle="password-tip-weak",this.strength="弱",this.strengthValue=33):t>=2&&t<=4?(this.tipStyle="password-tip-middle",this.strength="中",this.strengthValue=66):(this.tipStyle="password-tip-strong",this.strength="强",this.strengthValue=100)},sendVerify:function(){var t=this;this.$refs.registForm.validate(function(e){e&&(t.sended=!0,t.countDown())})},countDown:function(){var t=this;if(0===this.count)return this.sended=!1,void(this.count=60);this.countButton=this.count+" s",this.count--,setTimeout(function(){t.countDown()},1e3)},submitRegist:function(){var t=this;this.$refs.registForm.validate(function(e){if(e){if(""===t.form.verifyCode)return void(t.errorCode="验证码不能为空");t.errorCode="",t.loading=!0,t.form.captchaId=t.captchaId,t.form.passStrength=t.strength,Object(a["U"])(t.form).then(function(e){if(t.loading=!1,!0===e.success){var r={username:t.form.username};t.$router.push({name:"regist-result",query:r})}else t.getVerifyCode()})}})},getVerifyCode:function(){var t=this;this.loadingCode=!0,Object(a["P"])().then(function(e){!0===e.success&&(t.captchaId=e.result.captchaId,t.verifyCodeImg=a["s"]+t.captchaId,t.loadingCode=!1)})}},mounted:function(){this.getVerifyCode()}}),n=i,l=(r("9448"),r("0c7c")),c=Object(l["a"])(n,s,o,!1,null,null,null);e["default"]=c.exports},9448:function(t,e,r){"use strict";var s=r("d446"),o=r.n(s);o.a},d446:function(t,e,r){}}]);