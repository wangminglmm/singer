webpackJsonp([3],{F98T:function(t,s){},GzuO:function(t,s){},a8Ty:function(t,s){},exWJ:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=i("Dd8w"),e=i.n(a),o=i("qkow"),n={props:{value:[String,Number]},data:function(){return{}},created:function(){console.log(this.value)},methods:{handleClick:function(t){console.log(t)},handleChange:function(t){this.$emit("input",t)}}},r={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"radio-group"},[this._t("default")],2)},staticRenderFns:[]};var c=i("VU/8")(n,r,!1,function(t){i("a8Ty")},"data-v-cc7c4342",null).exports,l={props:{name:[String,Number]},data:function(){return{}},computed:{active:function(){if(this.$parent)return this.$parent.value===this.name}},methods:{handleClick:function(){this.$parent&&this.$parent.handleChange(this.name),this.$emit("click")}}},v={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"radio",class:{active:this.active},on:{click:this.handleClick}},[this._t("default")],2)},staticRenderFns:[]};var d=i("VU/8")(l,v,!1,function(t){i("F98T")},"data-v-31189a95",null).exports,u=i("NYxO"),h=i("JyGR"),m={data:function(){return{title:"发布任务",tabModel:1}},created:function(){this.tabModel="public"===this.currentPublishType?1:2},computed:e()({},Object(u.b)({selectedSong:"selectedSong",privateSelectedSong:"privateSelectedSong",publicSelectedSong:"publicSelectedSong",currentPublishType:"currentPublishType",publishPasswrod:"publishPasswrod",publicForm:"publicForm",privateForm:"privateForm"}),{postFormData:function(){return"public"===this.currentPublishType?e()({},this.publicForm):e()({},this.privateForm,{password:this.publishPasswrod})}}),methods:e()({},Object(u.c)({changePublishType:"changePublishType",changePublishPassword:"changePublishPassword",savePublishFrom:"savePublishFrom",clearPublicData:"clearPublicData"}),{onClickLeft:function(){this.clearPublicData(),this.$router.push("/")},handlePublish:function(){var t=this,s=e()({songId:this.selectedSong.songId,type:this.tabModel},this.postFormData);if(!s.songId)return this.$toast("请选择歌曲");if("private"===this.currentPublishType&&!s.password)return this.$toast("请输入密码");console.log(s);var i=this.$toast.loading({duration:0,forbidClick:!0,loadingType:"spinner",message:"发布中..."});this.$http.post("/sing/create",s).then(function(s){t.$toast(s.msg),0==s.error_code&&setTimeout(function(){i.clear(),t.onClickLeft()},1e3)})},handleSelectSong:function(){this.$router.push("/select-song");var t=this.publicForm,s=this.privateForm;this.savePublishFrom({publicForm:t,privateForm:s})},showDialogPassword:function(){this.$refs.dialogPassword.show()},handlePasswordSuccess:function(t){this.changePublishPassword(t),this.$refs.dialogPassword.hide()}}),watch:{tabModel:function(t){console.log(t);var s=1==t?"public":"private";this.changePublishType(s)}},components:{Button:o.a,RadioGroup:c,Radio:d,dialogPassword:h.a}},p={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"container"},[i("van-nav-bar",{attrs:{title:t.title,"left-text":"","left-arrow":""},on:{"click-left":t.onClickLeft}}),t._v(" "),i("div",{staticClass:"tabs"},[i("div",{staticClass:"tab-nav"},[i("div",{staticClass:"tab-nav-item",class:{active:1===t.tabModel},on:{click:function(s){t.tabModel=1}}},[t._v("公开打赏")]),t._v(" "),i("div",{staticClass:"tab-nav-item",class:{active:2===t.tabModel},on:{click:function(s){t.tabModel=2}}},[t._v("私密打赏")])]),t._v(" "),i("div",{staticClass:"tab-content"},[i("div",{staticClass:"tab-content-item",class:{show:1===t.tabModel}},[i("div",{staticClass:"song-tip shadow-box",on:{click:t.handleSelectSong}},[t.publicSelectedSong.songId?[t._l(t.publicSelectedSong.lyricList,function(s,a){return i("div",{key:a,staticClass:"tip1"},[t._v(t._s(s))])}),t._v(" "),i("div",[t._v("《"+t._s(t.publicSelectedSong.songName)+"》 "+t._s(t.publicSelectedSong.songAuthor))])]:[i("div",{staticClass:"tip1"},[t._v("选择歌曲片段")]),t._v(" "),i("div",[t._v("其他用户演唱成功即可平分赏金")])],t._v(" "),i("van-icon",{staticClass:"icon-right",attrs:{name:"arrow"}})],2),t._v(" "),i("div",{staticClass:"select-con mt20 shadow-box"},[t._m(0),t._v(" "),t._m(1),t._v(" "),i("div",{staticClass:"form-item"},[i("div",{staticClass:"label"},[t._v("参加者性别：")]),t._v(" "),i("div",{staticClass:"form-item-con"},[i("radio-group",{model:{value:t.publicForm.sex,callback:function(s){t.$set(t.publicForm,"sex",s)},expression:"publicForm.sex"}},[i("radio",{attrs:{name:1}},[t._v("男")]),t._v(" "),i("radio",{attrs:{name:0}},[t._v("女")]),t._v(" "),i("radio",{attrs:{name:2}},[t._v("不限")])],1)],1)])])]),t._v(" "),i("div",{staticClass:"tab-content-item",class:{show:2===t.tabModel}},[i("div",{staticClass:"song-tip shadow-box",on:{click:t.handleSelectSong}},[t.privateSelectedSong.songId?[t._l(t.privateSelectedSong.lyricList,function(s,a){return i("div",{key:a,staticClass:"tip1"},[t._v(t._s(s))])}),t._v(" "),i("div",[t._v("《"+t._s(t.privateSelectedSong.songName)+"》 "+t._s(t.privateSelectedSong.songAuthor))])]:[i("div",{staticClass:"tip1"},[t._v("选择歌曲片段")]),t._v(" "),i("div",[t._v("其他用户演唱成功即可平分赏金")])],t._v(" "),i("van-icon",{staticClass:"icon-right",attrs:{name:"arrow"}})],2),t._v(" "),i("div",{staticClass:"select-con mt20 shadow-box"},[i("div",{staticClass:"form-item"},[i("div",{staticClass:"label"},[t._v("打赏金额：")]),t._v(" "),i("div",{staticClass:"form-item-con"},[i("radio-group",{model:{value:t.privateForm.gold,callback:function(s){t.$set(t.privateForm,"gold",s)},expression:"privateForm.gold"}},[i("radio",{attrs:{name:1e3}},[t._v("1000金币")]),t._v(" "),i("radio",{attrs:{name:2e3}},[t._v("2000金币")]),t._v(" "),i("radio",{attrs:{name:5e3}},[t._v("5000金币")])],1)],1)]),t._v(" "),i("div",{staticClass:"form-item"},[i("div",{staticClass:"label"},[t._v("参与人数：")]),t._v(" "),i("div",{staticClass:"form-item-con"},[i("radio-group",{model:{value:t.privateForm.memberNumber,callback:function(s){t.$set(t.privateForm,"memberNumber",s)},expression:"privateForm.memberNumber"}},[i("radio",{attrs:{name:1}},[t._v("1人")]),t._v(" "),i("radio",{attrs:{name:2}},[t._v("2人")]),t._v(" "),i("radio",{attrs:{name:4}},[t._v("4人")]),t._v(" "),i("radio",{attrs:{name:5}},[t._v("5人")])],1)],1)]),t._v(" "),i("div",{staticClass:"form-item"},[i("div",{staticClass:"label"},[t._v("参加者性别：")]),t._v(" "),i("div",{staticClass:"form-item-con"},[i("radio-group",{model:{value:t.privateForm.sex,callback:function(s){t.$set(t.privateForm,"sex",s)},expression:"privateForm.sex"}},[i("radio",{attrs:{name:1}},[t._v("男")]),t._v(" "),i("radio",{attrs:{name:0}},[t._v("女")]),t._v(" "),i("radio",{attrs:{name:2}},[t._v("不限")])],1)],1)])]),t._v(" "),i("div",{staticClass:"song-tip mt20 shadow-box",on:{click:t.showDialogPassword}},[i("div",{staticClass:"tip1"},[t._v("设置密码（"+t._s(this.publishPasswrod?"已设置":"请设置")+"）")]),t._v(" "),i("div",[t._v("其他用户需输入密码参与悬赏")]),t._v(" "),i("van-icon",{staticClass:"icon-right",attrs:{name:"arrow"}})],1)])]),t._v(" "),i("Button",{staticClass:"btn-publish",attrs:{type:"publish"},on:{click:t.handlePublish}},[t._v("立即发布")]),t._v(" "),i("dialog-password",{ref:"dialogPassword",on:{success:t.handlePasswordSuccess}})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"form-item"},[s("div",{staticClass:"label"},[this._v("打赏金额：")]),this._v(" "),s("div",{staticClass:"form-item-con"},[this._v("\n              1000金币\n            ")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"form-item"},[s("div",{staticClass:"label"},[this._v("参与人数：")]),this._v(" "),s("div",{staticClass:"form-item-con"},[this._v("\n              5人\n            ")])])}]};var _=i("VU/8")(m,p,!1,function(t){i("GzuO")},"data-v-6a7ee107",null);s.default=_.exports}});
//# sourceMappingURL=3.1a0790825364d18d4568.js.map