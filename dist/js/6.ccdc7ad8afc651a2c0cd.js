webpackJsonp([6],{"2bo+":function(t,s){},RkNP:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a("Dd8w"),e=a.n(i),l=a("7e0o"),c=a("xoWn"),n=a("NYxO"),r={data:function(){return{title:"打赏记录",tabModel:1,publish:{list:[]},participate:{list:[]}}},created:function(){console.log(this.userInfo),this.getData()},computed:e()({},Object(n.b)(["userInfo"])),methods:{onClickLeft:function(){this.$router.back()},onClickRight:function(){this.$router.push({path:"/black-list"})},handlePlayMusic:function(t){playVoice(this.userInfo.p,t)},getData:function(){var t=this;this.loading=!0,this.$http.get("/sing/record",{params:{page:this.page}}).then(function(s){console.log(s.data);var a=s.data;t.publish.list=t.publish.list.concat(a.publish.list),t.participate.list=t.participate.list.concat(a.participate.list),t.loading=!1,t.pageTotal<=t.page&&(t.finished=!0)})}},watch:{},components:{Avatar:l.a,ButtonPlay:c.a}},v={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"container"},[a("van-nav-bar",{attrs:{title:t.title,"left-text":"","left-arrow":"","right-text":"黑名单"},on:{"click-left":t.onClickLeft,"click-right":t.onClickRight}}),t._v(" "),a("div",{staticClass:"tabs"},[a("div",{staticClass:"tab-nav"},[a("div",{staticClass:"tab-nav-item",class:{active:1===t.tabModel},on:{click:function(s){t.tabModel=1}}},[t._v("我发布的打赏")]),t._v(" "),a("div",{staticClass:"tab-nav-item",class:{active:2===t.tabModel},on:{click:function(s){t.tabModel=2}}},[t._v("我参与的打赏")])]),t._v(" "),a("div",{staticClass:"tab-content"},[a("div",{staticClass:"tab-content-item",class:{show:1===t.tabModel}},t._l(t.publish.list,function(s,i){return a("div",{key:i,staticClass:"shadow-box publish-item"},[a("div",{staticClass:"item-wrapper"},[a("div",{staticClass:"top"},[a("div",{staticClass:"left"},[a("Avatar",{attrs:{imgUrl:s.seller.avatarUrl,uid:s.seller.uid,nickName:s.seller.nickName,type:"seller"}}),t._v(" "),a("div",{staticClass:"seller-info"},[a("div",{staticClass:"seller-name"},[t._v(t._s(s.seller.nickName))]),t._v(" "),a("div",{staticClass:"seller-grade"},[t._v(t._s(s.grade))])])],1),t._v(" "),s.leader?a("div",{staticClass:"right"},[a("Avatar",{attrs:{imgUrl:s.leader.avatarUrl,uid:s.leader.uid,nickName:s.leader.nickName,type:"buyer"}}),t._v(" "),a("div",{staticClass:"buyer-info"},[a("div",{staticClass:"buyer-name"},[t._v(t._s(s.leader.nickName))]),t._v(" "),a("div",{staticClass:"score"},[t._v("领唱评分:"+t._s(s.leader.score))])])],1):t._e()]),t._v(" "),a("div",{staticClass:"bottom"},[t._l(s.lyricList,function(s,i){return a("div",{key:i,staticClass:"desc ellipsis"},[t._v(t._s(s))])}),t._v(" "),a("div",{staticClass:"song"},[t._v("《"+t._s(s.songName)+"》 "+t._s(s.songAuthor)+"\n                "),a("button-play",{attrs:{musicUrl:s.leaderMusic},on:{click:function(a){return t.handlePlayMusic(s.leaderMusic)}}})],1)],2),t._v(" "),a("div",{staticClass:"joiner-list"},t._l(s.joinerList,function(s){return a("div",{key:s.uid,staticClass:"joiner-item"},[a("Avatar",{attrs:{imgUrl:s.avatarUrl,uid:s.uid,nickName:s.nickName}}),t._v(" "),a("div",{staticClass:"joiner-detail"},[a("div",{staticClass:"nick-name"},[t._v(t._s(s.nickName))]),t._v(" "),a("button-play",{staticClass:"btn",attrs:{musicUrl:s.musicUrl,text:"播放",color:"#6f68d8"},on:{click:function(a){return t.handlePlayMusic(s.musicUrl)}}}),t._v(" "),a("div",{staticClass:"joiner-status",class:{failed:0==s.status}},[t._v(t._s(0==s.status?"接唱失败":"接唱成功"))])],1)],1)}),0),t._v(" "),a("div",{staticClass:"left-status",class:[s.remainTime<=0?"over":"processing"]},[t._v("\n              已结束\n                ")])]),t._v(" "),s.remainTime>0?a("div",{staticClass:"status"},[a("span",{staticClass:"time"},[t._v("剩余时间："+t._s(t._f("formatSeconds")(s.remainTime)))]),t._v(" "),a("span",{staticClass:"jinbi"},[t._v("剩余金币："+t._s(s.remainGold))])]):t._e()])}),0),t._v(" "),a("div",{staticClass:"tab-content-item",class:{show:2===t.tabModel}},t._l(t.participate.list,function(s,i){return a("div",{key:i,staticClass:"shadow-box publish-item"},[a("div",{staticClass:"item-wrapper"},[a("div",{staticClass:"top"},[a("div",{staticClass:"left"},[a("Avatar",{attrs:{imgUrl:s.seller.avatarUrl,uid:s.seller.uid,nickName:s.seller.nickName,type:"seller"}}),t._v(" "),a("div",{staticClass:"seller-info"},[a("div",{staticClass:"seller-name"},[t._v(t._s(s.seller.nickName))]),t._v(" "),a("div",{staticClass:"seller-grade"},[t._v(t._s(s.grade))])])],1),t._v(" "),s.leader?a("div",{staticClass:"right"},[a("Avatar",{attrs:{imgUrl:s.leader.avatarUrl,uid:s.leader.uid,nickName:s.leader.nickName,type:"buyer"}}),t._v(" "),a("div",{staticClass:"buyer-info"},[a("div",{staticClass:"buyer-name"},[t._v(t._s(s.leader.nickName))]),t._v(" "),a("div",{staticClass:"score"},[t._v("领唱评分:"+t._s(s.leader.score))])])],1):t._e()]),t._v(" "),a("div",{staticClass:"bottom"},[t._l(s.lyricList,function(s,i){return a("div",{key:i,staticClass:"desc ellipsis"},[t._v(t._s(s))])}),t._v(" "),a("div",{staticClass:"song"},[t._v("《"+t._s(s.songName)+"》 "+t._s(s.songAuthor)+"\n                  "),a("button-play",{attrs:{musicUrl:s.leaderMusic},on:{click:function(a){return t.handlePlayMusic(s.leaderMusic)}}})],1)],2),t._v(" "),a("div",{staticClass:"joiner-list"},t._l(s.joinerList,function(s){return a("div",{key:s.uid,staticClass:"joiner-item"},[a("Avatar",{attrs:{imgUrl:s.avatarUrl,uid:s.uid,nickName:s.nickName}}),t._v(" "),a("div",{staticClass:"joiner-detail"},[a("div",{staticClass:"nick-name"},[t._v(t._s(s.nickName))]),t._v(" "),s.uid==t.userInfo.uid?a("button-play",{staticClass:"btn",attrs:{musicUrl:s.musicUrl,text:"播放",color:"#6f68d8"},on:{click:function(a){return t.handlePlayMusic(s.musicUrl)}}}):t._e(),t._v(" "),a("div",{staticClass:"joiner-status",class:{failed:0==s.status}},[t._v(t._s(0==s.status?"接唱失败":"接唱成功"))])],1)],1)}),0),t._v(" "),a("div",{staticClass:"left-status",class:[s.remainTime<=0?"over":"processing"]},[t._v("\n                已结束\n                  ")])]),t._v(" "),s.remainTime>0?a("div",{staticClass:"status"},[a("span",{staticClass:"time"},[t._v("剩余时间："+t._s(t._f("formatSeconds")(s.remainTime)))]),t._v(" "),a("span",{staticClass:"jinbi"},[t._v("剩余金币："+t._s(s.remainGold))])]):t._e()])}),0)])])],1)},staticRenderFns:[]};var o=a("VU/8")(r,v,!1,function(t){a("2bo+")},"data-v-2b349588",null);s.default=o.exports}});
//# sourceMappingURL=6.ccdc7ad8afc651a2c0cd.js.map