webpackJsonp([2],{"37H8":function(t,s){},HI59:function(t,s,a){t.exports=a.p+"static/img/join-banner.e44a018.jpg"},TWtK:function(t,s,a){t.exports=a.p+"static/img/icon-recording.b0fe000.png"},qql7:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("qkow"),i=a("7e0o"),n={data:function(){return{title:"",showRule:!1,info:{imgUrl:a("0gU3")},taskInfo:{}}},created:function(){var t=this.$route.query.taskInfo||"{}";this.taskInfo=JSON.parse(t),console.log(this.taskInfo),console.log(this.operateType)},computed:{type:function(){return this.taskInfo.leader?"member":"leader"},operateType:function(){return this.taskInfo.taskId?this.taskInfo.leader?(this.title="接歌","join_member"):(this.title="我要领唱","join_leader"):(this.title="我要领唱",this.taskInfo.leader?"own_member":"own_leader")}},methods:{onClickLeft:function(){this.$router.back()},onClickRight:function(){},handlePlayMusic:function(t){alert("这里调用原生播放音乐")},handRecord:function(){alert("这里调用原生录音")}},components:{Button:e.a,Avatar:i.a}},l={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container"},[e("van-nav-bar",{attrs:{title:t.title,"left-text":"","left-arrow":""},on:{"click-left":t.onClickLeft}}),t._v(" "),e("section",{staticClass:"banner"},[e("img",{attrs:{src:a("HI59"),alt:""}}),t._v(" "),e("div",{staticClass:"button-operate"}),t._v(" "),e("div",{staticClass:"btn-rule",on:{click:function(s){t.showRule=!0}}},[t._v("活动规则")])]),t._v(" "),e("div",{staticClass:"detail"},[e("div",{staticClass:"joiner"},["join_member"===t.operateType?[e("div",{staticClass:"top"},[e("div",{staticClass:"left"},[t._l(t.taskInfo.lyricList,function(s,a){return e("div",{key:a,staticClass:"desc ellipsis"},[t._v(t._s(s))])}),t._v(" "),e("div",{staticClass:"song"},[t._v("《"+t._s(t.taskInfo.songName)+"》 "+t._s(t.taskInfo.songAuthor))])],2),t._v(" "),t.taskInfo.seller?e("div",{staticClass:"right"},[e("Avatar",{attrs:{imgUrl:t.taskInfo.seller.avatarUrl,type:"seller"}}),t._v(" "),e("div",{staticClass:"seller-info"},[e("div",{staticClass:"seller-name"},[t._v(t._s(t.taskInfo.seller.nickName))]),t._v(" "),e("div",{staticClass:"seller-grade"},[t._v(t._s(t.taskInfo.grade))])])],1):t._e()]),t._v(" "),e("div",{staticClass:"bottom"},[e("Avatar",{attrs:{imgUrl:t.taskInfo.leader.avatarUrl,type:"buyer"}}),t._v(" "),e("div",{staticClass:"buyer-info"},[e("div",{staticClass:"buyer-name"},[t._v(t._s(t.taskInfo.leader.nickName))]),t._v(" "),e("div",{staticClass:"play-btn",on:{click:function(s){return t.handlePlayMusic(t.taskInfo)}}},[e("img",{staticClass:"icon-play",attrs:{src:a("aCIB"),alt:""}}),t._v("点击播放")])])],1),t._v(" "),e("div",{staticClass:"status"},[e("span",{staticClass:"time"},[t._v("剩余时间："+t._s(t._f("formatSeconds")(t.taskInfo.remainTime)))]),t._v(" "),e("span",{staticClass:"jinbi"},[t._v("剩余金币："+t._s(t.taskInfo.remainGold))])])]:"join_leader"===t.operateType||"own_leader"===t.operateType?[e("div",{staticClass:"song-info"},[t._l(t.taskInfo.lyricList,function(s,a){return e("div",{key:a,staticClass:"lyric ellipsis"},[t._v(t._s(s))])}),t._v(" "),e("div",{staticClass:"song"},[t._v("《"+t._s(t.taskInfo.songName)+"》 "+t._s(t.taskInfo.songAuthor))])],2)]:"own_member"===t.operateType?[e("div",{staticClass:"own-member"},[t._l(t.taskInfo.lyricList,function(s,a){return e("div",{key:a,staticClass:"lyric ellipsis"},[t._v(t._s(s))])}),t._v(" "),e("div",{staticClass:"song"},[t._v("《"+t._s(t.taskInfo.songName)+"》 "+t._s(t.taskInfo.songAuthor))]),t._v(" "),e("div",{staticClass:"leader-info"},[e("Avatar",{attrs:{imgUrl:t.taskInfo.leader.avatarUrl,type:"buyer"}}),t._v(" "),e("div",{staticClass:"buyer-info"},[e("div",{staticClass:"buyer-name"},[t._v(t._s(t.taskInfo.leader.nickName))]),t._v(" "),e("div",{staticClass:"play-btn",on:{click:function(s){return t.handlePlayMusic(t.taskInfo)}}},[e("img",{staticClass:"icon-play",attrs:{src:a("aCIB"),alt:""}}),t._v("点击播放")])])],1),t._v(" "),e("div",{staticClass:"score"},[t._v("得分："+t._s(t.taskInfo.leader.score))])],2)]:t._e(),t._v(" "),e("img",{staticClass:"icon-recording",attrs:{src:a("TWtK"),alt:""},on:{click:t.handRecord}})],2)]),t._v(" "),e("van-popup",{attrs:{"overlay-class":"popup-rule"},model:{value:t.showRule,callback:function(s){t.showRule=s},expression:"showRule"}},[e("div",{staticClass:"rule"},[e("div",{staticClass:"title"},[t._v("游戏规则")]),t._v(" "),e("p",[t._v("1.用户可以发布唱歌打赏，可限制男女参加。其他用户唱对歌曲可领到相应的奖励。")]),t._v(" "),e("p",[t._v("2.每人每首歌曲只有一次演唱机会，如果失败，将无法获得奖励")]),t._v(" "),e("p",[t._v("3.打赏的时间有效期为20分钟,超过20分钟,打赏结束,未领取完的金币自动退回到发布者的账户。")]),t._v(" "),e("p",[t._v("4.为了防止占坑,发布的用户可以选择私密打赏设置密码,也可在“我发布的打赏”中，点击用户头像，即可禁止该用户参加你的打赏。")]),t._v(" "),e("div",{staticClass:"close",on:{click:function(s){t.showRule=!1}}},[e("img",{attrs:{src:a("wOFH"),alt:""}})])])])],1)},staticRenderFns:[]};var o=a("VU/8")(n,l,!1,function(t){a("37H8"),a("x1Ys")},"data-v-21257d31",null);s.default=o.exports},x1Ys:function(t,s){}});
//# sourceMappingURL=2.e63756687fc09544b6f5.js.map