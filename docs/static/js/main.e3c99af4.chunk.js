(this["webpackJsonptree-editor"]=this["webpackJsonptree-editor"]||[]).push([[0],{108:function(e,t,n){},123:function(e,t,n){},124:function(e,t,n){"use strict";n.r(t);var c,r=n(0),i=n(22),a=n.n(i),l=n(55),d=(n(108),n(128)),o=n(19),u=n(26),j=n(130),s=n(131),f=n(126),b=n(41),h=n(132),O=function(){return Object(l.b)()},v=l.c,y=n(68),p=n(21),k=(c={},Object(p.a)(c,"0",{title:"root title",parent:"",deleted:!1,key:"0"}),Object(p.a)(c,"0-0",{title:"child of root - 0",parent:"0",deleted:!1,key:"0-0"}),Object(p.a)(c,"0-0-0",{title:"0-0-0",parent:"0-0",deleted:!1,key:"0-0-0"}),Object(p.a)(c,"0-0-1",{title:"0-0-1",parent:"0-0",deleted:!1,key:"0-0-1"}),Object(p.a)(c,"0-0-0-0",{title:"0-0-0-0",parent:"0-0-1",deleted:!1,key:"0-0-0-0"}),Object(p.a)(c,"0-0-0-1",{title:"0-0-0-1",parent:"0-0-1",deleted:!1,key:"0-0-0-1"}),Object(p.a)(c,"0-0-0-0-0",{title:"0-0-0-0-0",parent:"0-0-0-1",deleted:!1,key:"0-0-0-0-0"}),Object(p.a)(c,"0-0-0-2",{title:"0-0-0-2",parent:"0-0-1",deleted:!1,key:"0-0-0-2"}),Object(p.a)(c,"0-0-2",{title:"0-0-2",parent:"0-0",deleted:!1,key:"0-0-2"}),Object(p.a)(c,"0-1",{title:"child of root - 1",parent:"0",deleted:!1,key:"0-1"}),Object(p.a)(c,"0-1-0",{title:"0-1-0",parent:"0-1",deleted:!1,key:"0-1-0"}),Object(p.a)(c,"0-1-1",{title:"0-1-1",parent:"0-1",deleted:!1,key:"0-1-1"}),Object(p.a)(c,"0-1-2",{title:"0-1-2",parent:"0-1",deleted:!1,key:"0-1-2"}),Object(p.a)(c,"0-2",{title:"child of root - 2",parent:"0",deleted:!1,key:"0-2"}),c),x=n(95),g=n(79),m=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0;if(t.length){for(var c=null,r=0;null==c&&r<t.length;r++){if(t[r].key===n)return t[r];c=e(t[r].children,n)}return c}return null},C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=null;if(e.length)for(var n=function(n){if(-1===e.findIndex((function(t){return t.parent===e[n].key}))){var c=e.find((function(t){return t.key===e[n].parent}));if(c)return t=e[n],e.splice(n,1),c.children.push(t),{v:t}}},c=0;null==t&&c<e.length;c++){var r=n(c);if("object"===typeof r)return r.v}return t},w=function(e){var t=E(e),n=0,c=null;do{c=C(t),n++}while(null!=c&&n<1e3);return t},I=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=m(t,n.key);if(c){c.deleted=n.deleted;for(var r=0;r<c.children.length;r++)e(c.children,Object(o.a)(Object(o.a)({},c.children[r]),{},{deleted:n.deleted}))}},S=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=t.findIndex((function(e){return e.key===n.key}));-1!==c&&(t[c].deleted=n.deleted);for(var r=t.filter((function(e){return e.parent===n.key})),i=0;i<r.length;i++)r[i].deleted=n.deleted,e(t,r[i])},E=function e(t){var n=[];for(var c in t){var r,i=e(null===(r=t[c])||void 0===r?void 0:r.children);n.push.apply(n,[Object(o.a)(Object(o.a)({},t[c]),{},{children:[]})].concat(Object(x.a)(i)))}return n},K=function e(t,n){var c=[];for(var r in t)if(t[r].parent===n){var i=e(t,r);c.push(Object(o.a)(Object(o.a)({},t[r]),{children:i}))}return c},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=[],n=Object(o.a)({},e[0]);if(n.key){var c=K(e,n.key);t.push(Object(o.a)(Object(o.a)({},n),{},{children:c}))}return t},D=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=[],c=function(c){var r=e.find((function(e){return e.key===t[c]}));r&&n.push(Object(o.a)({},r))},r=0;r<t.length;r++)c(r);return n},N={items:A(k),cache:[],cacheExpandedKeys:[]},H=Object(y.b)({name:"public-repo-show/repos",initialState:N,reducers:{add:function(e,t){e.cache=t.payload,e.cacheExpandedKeys=function(e){var t=[],n=E(e);for(var c in n)t.push(n[c].key);return t}(t.payload)},remove:function(e,t){e.cache=t.payload},alter:function(e,t){e.cache=t.payload},apply:function(e,t){e.items=t.payload.dbItems,e.cache=t.payload.cache},reset:function(e){e.items=A(k),e.cache=[],e.cacheExpandedKeys=[]}}}),J=H.actions.reset,T=function(e){return e.tree.cache},W=function(e){return function(t,n){var c=function(){var e=arguments.length>1?arguments[1]:void 0,t=E(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]);return-1===t.findIndex((function(t){return t.key===e.key}))&&t.push(e),w(t)}(T(n()),e);t(H.actions.add(c))}},B=function(e){return function(t,n){var c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=Object(g.cloneDeep)(e);return t.deleted=!t.deleted,I(n,t),n}(T(n()),e);t(H.actions.remove(c))}},F=function(e){return function(t,n){var c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=Object(g.cloneDeep)(e),c=m(n,t.key);return c&&(c.title=t.title),n}(T(n()),e);t(H.actions.alter(c))}},M=function(){return function(e,t){var n=T(t()),c=function(e,t){for(var n=E(e),c=E(t),r=function(e){var t=c[e],r=n.findIndex((function(e){return e.key===t.key}));if(-1!==r)n[r]=Object(o.a)({},t),S(n,t);else{var i=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=1e3,c=0,r=function(){var n="".concat(t,"-").concat(c);if(-1===e.findIndex((function(e){return e.key===n})))return{v:n};c++};c<n;){var i=r();if("object"===typeof i)return i.v}return"".concat(t,"-error")}(n,t.parent);n.push(Object(o.a)(Object(o.a)({},t),{},{key:i})),c[e].key=i}},i=0;i<c.length;i++)r(i);for(var a=w(n),l=[],d=[],u=0;u<c.length;u++)l.push(c[u].key),d=w(D(n,l));return[a,d]}(t().tree.items,n),r=Object(u.a)(c,2),i=r[0],a=r[1];e(H.actions.apply({dbItems:i,cache:a}))}},R=H.reducer,q=n(7),z=function(){var e=Object(r.useState)({}),t=Object(u.a)(e,2),n=t[0],c=t[1],i=v((function(e){return e.tree.items})),a=O();return Object(q.jsx)("div",{style:{minWidth:"350px"},children:Object(q.jsxs)(j.a,{gutter:16,wrap:!1,align:"middle",children:[Object(q.jsx)(s.a,{children:Object(q.jsx)(b.a,{onClick:function(){n.key&&a(W(n))},children:"<<<"})}),Object(q.jsx)(s.a,{children:Object(q.jsx)(f.a,{defaultExpandAll:!0,checkStrictly:!0,showIcon:!0,icon:function(e){return e.data.deleted&&Object(q.jsx)(h.a,{style:{color:"red"}})},onSelect:function(e,t){t.selectedNodes.length?c(Object(o.a)(Object(o.a)({},t.selectedNodes[0]),{},{children:[]})):c({})},selectedKeys:[n.key],treeData:i})})]})})},G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.initialOpen,n=void 0!==t&&t,c=Object(r.useState)(n),i=Object(u.a)(c,2),a=i[0],l=i[1],d=function(){l(!0)},o=function(){l(!1)},j=function(){l(!a)};return[a,j,d,o]},L=n(129),P=n(127),Q=function(e){var t=e.visible,n=e.title,c=e.item,i=e.onOk,a=e.onCancel,l=Object(r.useState)(c.title),d=Object(u.a)(l,2),j=d[0],s=d[1];Object(r.useEffect)((function(){s(c.title)}),[c]);return Object(q.jsx)(L.a,{title:n,destroyOnClose:!0,visible:t,onOk:function(){i(Object(o.a)(Object(o.a)({},c),{},{title:j})),s("")},onCancel:function(){a()},maskClosable:!1,children:Object(q.jsx)(P.a,{onChange:function(e){s(e.target.value)},value:j})})},U=function(){var e=v((function(e){return e.tree.cache||[]})),t=v((function(e){return e.tree.cacheExpandedKeys})),n=Object(r.useState)({}),c=Object(u.a)(n,2),i=c[0],a=c[1],l=Object(r.useState)({}),d=Object(u.a)(l,2),y=d[0],p=d[1],k=G(),x=Object(u.a)(k,2),g=x[0],C=x[1],w=G(),I=Object(u.a)(w,2),S=I[0],E=I[1],K=O();Object(r.useEffect)((function(){if(i.key){var t=m(e,i.key);if(a(Object(o.a)(Object(o.a)({},t||{}),{},{children:[]})),t){var n="".concat(t.key,"-0-").concat((null===t||void 0===t?void 0:t.children)?null===t||void 0===t?void 0:t.children.length:0),c={key:n,title:n,parent:t.key,deleted:!1,children:[]};p(c)}}else p({})}),[e,i.key]);return Object(q.jsxs)("div",{children:[Object(q.jsxs)(j.a,{gutter:16,wrap:!1,children:[Object(q.jsx)(s.a,{children:Object(q.jsx)("div",{style:{minWidth:"350px",minHeight:"400px"},children:Object(q.jsx)(f.a,{showIcon:!0,icon:function(e){return e.data.deleted&&Object(q.jsx)(h.a,{style:{color:"red"}})},expandedKeys:t,onSelect:function(e,t){t.selectedNodes.length?a(t.selectedNodes[0]):a({})},selectedKeys:[i.key],treeData:e})})}),Object(q.jsx)(s.a,{children:Object(q.jsx)(z,{})})]}),Object(q.jsx)("div",{style:{marginTop:"20px"},children:Object(q.jsxs)(j.a,{gutter:8,wrap:!1,children:[Object(q.jsxs)(s.a,{children:[Object(q.jsx)(Q,{visible:g,title:"Adding new item for parent: ".concat(i.title),item:y,onOk:function(e){K(W(e)),C()},onCancel:C}),Object(q.jsx)(b.a,{disabled:!i.key||i.deleted,onClick:C,children:"+"})]}),Object(q.jsx)(s.a,{children:Object(q.jsx)(b.a,{disabled:!i.key,onClick:function(){i.key&&K(B(i))},children:"-"})}),Object(q.jsxs)(s.a,{children:[Object(q.jsx)(Q,{visible:S,title:"Altering item: ".concat(i.title),item:i,onOk:function(e){e.key&&K(F(e)),E()},onCancel:E}),Object(q.jsx)(b.a,{disabled:!i.key||i.deleted,onClick:E,children:"a"})]}),Object(q.jsx)(s.a,{span:2}),Object(q.jsx)(s.a,{children:Object(q.jsx)(b.a,{onClick:function(){K(M())},children:"Apply"})}),Object(q.jsx)(s.a,{children:Object(q.jsx)(b.a,{onClick:function(){K(J())},children:"Reset"})})]})})]})},V=function(){return Object(q.jsx)("div",{children:Object(q.jsx)(U,{})})};function X(){return Object(q.jsxs)(d.a,{style:{minHeight:"100vh"},children:[Object(q.jsx)(d.a.Header,{style:{color:"white",textAlign:"center"},children:"Tree editor"}),Object(q.jsx)(d.a.Content,{style:{padding:"20px 50px"},children:Object(q.jsx)(V,{})}),Object(q.jsx)(d.a.Footer,{style:{textAlign:"center",position:"sticky",bottom:"0"},children:"Manipulation tree elements"})]})}var Y=Object(y.a)({reducer:{tree:R}});n(123);a.a.render(Object(q.jsx)(l.a,{store:Y,children:Object(q.jsx)(X,{})}),document.getElementById("root"))}},[[124,1,2]]]);
//# sourceMappingURL=main.e3c99af4.chunk.js.map