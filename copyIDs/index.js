(function(d,i,o,f,B,y,S){"use strict";const{FormRow:m}=S.Forms,b=o.findByProps("openLazy","hideActionSheet"),s=o.findByName("UserProfileSheet",!1),a=o.findByName("ChannelProfileSheet",!1),c=o.findByName("MessageProfileSheet",!1),l=o.findByName("GuildProfileSheet",!1),r=o.findByName("EmojiProfileSheet",!1)||o.findByName("EmojiInfoSheet",!1),h=o.findByName("RoleProfileSheet",!1)||o.findByName("RoleInfoSheet",!1);function u(t,n){let e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"ID";!t||!n||i.before("default",t,function(P){const[I]=P;if(!I?.children)return;const v=I.children;I.children=function(D){const p=v(D),g=f.React.Children.toArray(p);return g.push(f.React.createElement(m,{label:`Copy ${e}`,leading:f.React.createElement(m.Icon,{source:y.getAssetIDByName("copy")}),onPress:function(){f.clipboard.setString(n),B.showToast(`${e} successfully copied: ${n}`,y.getAssetIDByName("check")),b.hideActionSheet()}})),g}})}var N={onLoad(){const t=[];return s&&t.push(i.before("default",s,function(n){const e=n[0]?.userId;e&&u(s,e,"User ID")})),a&&t.push(i.before("default",a,function(n){const e=n[0]?.channelId;e&&u(a,e,"Channel ID")})),c&&t.push(i.before("default",c,function(n){const e=n[0]?.messageId;e&&u(c,e,"Message ID")})),l&&t.push(i.before("default",l,function(n){const e=n[0]?.guildId;e&&u(l,e,"Guild ID")})),r&&t.push(i.before("default",r,function(n){const e=n[0]?.emojiId||n[0]?.emoji?.id;e&&u(r,e,"Emoji ID")})),h&&t.push(i.before("default",h,function(n){const e=n[0]?.roleId||n[0]?.role?.id;e&&u(h,e,"Role ID")})),function(){return t.forEach(function(n){return n()})}}};return d.default=N,Object.defineProperty(d,"__esModule",{value:!0}),d})({},vendetta.patcher,vendetta.metro,vendetta.metro.common,vendetta.ui.toasts,vendetta.ui.assets,vendetta.ui.components);
