import{S as z,i as C,s as G,D as fe,e as D,c as q,a as P,d as c,E as U,f as p,F as J,G as Q,H as X,p as ie,x as d,u as _,l as Y,I as ue,r as $e,w as ce,J as F,A as me,K as pe,B as R,L as de,M as Z,N as _e,j as h,m as w,b as k,o as b,v as E,O as ge,k as O,n as N,P as y,Q as j,R as ve,T as ee,U as te,V as ne,t as S,g as A,W as I,X as he,Y as V}from"../chunks/vendor-475ceb10.js";function se(a){let e="";if(typeof a=="string"||typeof a=="number")e+=a;else if(typeof a=="object")if(Array.isArray(a))e=a.map(se).filter(Boolean).join(" ");else for(let n in a)a[n]&&(e&&(e+=" "),e+=n);return e}function we(...a){return a.map(se).filter(Boolean).join(" ")}const re=["touchstart","click"];var be=(a,e)=>{let n;if(typeof a=="string"&&typeof window!="undefined"&&document&&document.createElement){let s=document.querySelectorAll(a);if(s.length||(s=document.querySelectorAll(`#${a}`)),!s.length)throw new Error(`The target '${a}' could not be identified in the dom, tip: check spelling`);re.forEach(r=>{s.forEach(t=>{t.addEventListener(r,e)})}),n=()=>{re.forEach(r=>{s.forEach(t=>{t.removeEventListener(r,e)})})}}return()=>{typeof n=="function"&&(n(),n=void 0)}};function le(a){let e,n,s;const r=a[15].default,t=Z(r,a,a[14],null);let f=[{style:n=a[1]?void 0:"overflow: hidden;"},a[4],{class:a[3]}],u={};for(let l=0;l<f.length;l+=1)u=R(u,f[l]);return{c(){e=D("div"),t&&t.c(),this.h()},l(l){e=q(l,"DIV",{style:!0,class:!0});var o=P(e);t&&t.l(o),o.forEach(c),this.h()},h(){U(e,u)},m(l,o){p(l,e,o),t&&t.m(e,null),s=!0},p(l,o){t&&t.p&&(!s||o&16384)&&J(t,r,l,l[14],s?X(r,l[14],o,null):Q(l[14]),null),U(e,u=ie(f,[(!s||o&2&&n!==(n=l[1]?void 0:"overflow: hidden;"))&&{style:n},o&16&&l[4],(!s||o&8)&&{class:l[3]}]))},i(l){s||(d(t,l),s=!0)},o(l){_(t,l),s=!1},d(l){l&&c(e),t&&t.d(l)}}}function Ee(a){let e,n,s,r;fe(a[16]);let t=a[0]&&le(a);return{c(){t&&t.c(),e=Y()},l(f){t&&t.l(f),e=Y()},m(f,u){t&&t.m(f,u),p(f,e,u),n=!0,s||(r=ue(window,"resize",a[16]),s=!0)},p(f,[u]){f[0]?t?(t.p(f,u),u&1&&d(t,1)):(t=le(f),t.c(),d(t,1),t.m(e.parentNode,e)):t&&($e(),_(t,1,1,()=>{t=null}),ce())},i(f){n||(d(t),n=!0)},o(f){_(t),n=!1},d(f){t&&t.d(f),f&&c(e),s=!1,r()}}}function ke(a,e,n){let s;const r=["isOpen","class","navbar","onEntering","onEntered","onExiting","onExited","expand","toggler"];let t=F(e,r),{$$slots:f={},$$scope:u}=e;const l=()=>{};let{isOpen:o=!0}=e,{class:m=""}=e,{navbar:i=!0}=e,{onEntering:$=l}=e,{onEntered:g=l}=e,{onExiting:M=l}=e,{onExited:L=l}=e,{expand:B="md"}=e,{toggler:H=null}=e;me(()=>be(H,()=>n(0,o=!o)));let W=0,x=!1;const T={};T.xs=0,T.sm=576,T.md=768,T.lg=992,T.xl=1200;const ae=pe();function K(){console.log("Notify",o),ae("update",{isOpen:o})}function oe(){n(2,W=window.innerWidth)}return a.$$set=v=>{e=R(R({},e),de(v)),n(4,t=F(e,r)),"isOpen"in v&&n(0,o=v.isOpen),"class"in v&&n(5,m=v.class),"navbar"in v&&n(1,i=v.navbar),"onEntering"in v&&n(6,$=v.onEntering),"onEntered"in v&&n(7,g=v.onEntered),"onExiting"in v&&n(8,M=v.onExiting),"onExited"in v&&n(9,L=v.onExited),"expand"in v&&n(10,B=v.expand),"toggler"in v&&n(11,H=v.toggler),"$$scope"in v&&n(14,u=v.$$scope)},a.$$.update=()=>{a.$$.dirty&34&&n(3,s=we(m,i&&"navbar-collapse")),a.$$.dirty&13319&&i&&B&&(console.log("Expand",B),W>=T[B]&&!o?(n(0,o=!0),n(12,x=!0),K()):W<T[B]&&x&&(n(0,o=!1),n(12,x=!1),K()))},[o,i,W,s,t,m,$,g,M,L,B,H,x,T,u,f,oe]}class Oe extends z{constructor(e){super();C(this,e,ke,Ee,G,{isOpen:0,class:5,navbar:1,onEntering:6,onEntered:7,onExiting:8,onExited:9,expand:10,toggler:11})}}var Ne="/_app/assets/logo-web-beta-0277ede1.svg",Se="/_app/assets/logo-two-lines-e75c034a.png";function Ae(a){let e,n;return{c(){e=S("Market data "),n=D("span"),this.h()},l(s){e=A(s,"Market data "),n=q(s,"SPAN",{class:!0}),P(n).forEach(c),this.h()},h(){k(n,"class","fas fa-angle-down nav-link-arrow ml-2")},m(s,r){p(s,e,r),p(s,n,r)},d(s){s&&c(e),s&&c(n)}}}function Me(a){let e,n,s;return{c(){e=S("Blockchains "),n=D("span"),s=S("Soon"),this.h()},l(r){e=A(r,"Blockchains "),n=q(r,"SPAN",{class:!0});var t=P(n);s=A(t,"Soon"),t.forEach(c),this.h()},h(){k(n,"class","badge text-uppercase")},m(r,t){p(r,e,t),p(r,n,t),j(n,s)},d(r){r&&c(e),r&&c(n)}}}function De(a){let e,n,s;return{c(){e=S("Exchanges "),n=D("span"),s=S("Soon"),this.h()},l(r){e=A(r,"Exchanges "),n=q(r,"SPAN",{class:!0});var t=P(n);s=A(t,"Soon"),t.forEach(c),this.h()},h(){k(n,"class","badge text-uppercase")},m(r,t){p(r,e,t),p(r,n,t),j(n,s)},d(r){r&&c(e),r&&c(n)}}}function qe(a){let e,n,s;return{c(){e=S("Trading pairs "),n=D("span"),s=S("Soon"),this.h()},l(r){e=A(r,"Trading pairs "),n=q(r,"SPAN",{class:!0});var t=P(n);s=A(t,"Soon"),t.forEach(c),this.h()},h(){k(n,"class","badge text-uppercase")},m(r,t){p(r,e,t),p(r,n,t),j(n,s)},d(r){r&&c(e),r&&c(n)}}}function Be(a){let e;return{c(){e=S("Backtesting")},l(n){e=A(n,"Backtesting")},m(n,s){p(n,e,s)},d(n){n&&c(e)}}}function Ie(a){let e,n,s,r,t,f,u,l,o,m;return e=new I({props:{disabled:!0,$$slots:{default:[Me]},$$scope:{ctx:a}}}),s=new I({props:{disabled:!0,$$slots:{default:[De]},$$scope:{ctx:a}}}),t=new I({props:{disabled:!0,$$slots:{default:[qe]},$$scope:{ctx:a}}}),u=new I({props:{divider:!0}}),o=new I({props:{href:"/datasets",$$slots:{default:[Be]},$$scope:{ctx:a}}}),{c(){h(e.$$.fragment),n=O(),h(s.$$.fragment),r=O(),h(t.$$.fragment),f=O(),h(u.$$.fragment),l=O(),h(o.$$.fragment)},l(i){w(e.$$.fragment,i),n=N(i),w(s.$$.fragment,i),r=N(i),w(t.$$.fragment,i),f=N(i),w(u.$$.fragment,i),l=N(i),w(o.$$.fragment,i)},m(i,$){b(e,i,$),p(i,n,$),b(s,i,$),p(i,r,$),b(t,i,$),p(i,f,$),b(u,i,$),p(i,l,$),b(o,i,$),m=!0},p(i,$){const g={};$&8&&(g.$$scope={dirty:$,ctx:i}),e.$set(g);const M={};$&8&&(M.$$scope={dirty:$,ctx:i}),s.$set(M);const L={};$&8&&(L.$$scope={dirty:$,ctx:i}),t.$set(L);const B={};$&8&&(B.$$scope={dirty:$,ctx:i}),o.$set(B)},i(i){m||(d(e.$$.fragment,i),d(s.$$.fragment,i),d(t.$$.fragment,i),d(u.$$.fragment,i),d(o.$$.fragment,i),m=!0)},o(i){_(e.$$.fragment,i),_(s.$$.fragment,i),_(t.$$.fragment,i),_(u.$$.fragment,i),_(o.$$.fragment,i),m=!1},d(i){E(e,i),i&&c(n),E(s,i),i&&c(r),E(t,i),i&&c(f),E(u,i),i&&c(l),E(o,i)}}}function Te(a){let e,n,s,r;return e=new te({props:{nav:!0,caret:!0,$$slots:{default:[Ae]},$$scope:{ctx:a}}}),s=new ne({props:{end:!0,$$slots:{default:[Ie]},$$scope:{ctx:a}}}),{c(){h(e.$$.fragment),n=O(),h(s.$$.fragment)},l(t){w(e.$$.fragment,t),n=N(t),w(s.$$.fragment,t)},m(t,f){b(e,t,f),p(t,n,f),b(s,t,f),r=!0},p(t,f){const u={};f&8&&(u.$$scope={dirty:f,ctx:t}),e.$set(u);const l={};f&8&&(l.$$scope={dirty:f,ctx:t}),s.$set(l)},i(t){r||(d(e.$$.fragment,t),d(s.$$.fragment,t),r=!0)},o(t){_(e.$$.fragment,t),_(s.$$.fragment,t),r=!1},d(t){E(e,t),t&&c(n),E(s,t)}}}function Pe(a){let e;return{c(){e=S("Options")},l(n){e=A(n,"Options")},m(n,s){p(n,e,s)},d(n){n&&c(e)}}}function je(a){let e;return{c(){e=S("Option 1")},l(n){e=A(n,"Option 1")},m(n,s){p(n,e,s)},d(n){n&&c(e)}}}function Le(a){let e;return{c(){e=S("Option 2")},l(n){e=A(n,"Option 2")},m(n,s){p(n,e,s)},d(n){n&&c(e)}}}function We(a){let e;return{c(){e=S("Reset")},l(n){e=A(n,"Reset")},m(n,s){p(n,e,s)},d(n){n&&c(e)}}}function xe(a){let e,n,s,r,t,f,u,l;return e=new I({props:{$$slots:{default:[je]},$$scope:{ctx:a}}}),s=new I({props:{$$slots:{default:[Le]},$$scope:{ctx:a}}}),t=new I({props:{divider:!0}}),u=new I({props:{$$slots:{default:[We]},$$scope:{ctx:a}}}),{c(){h(e.$$.fragment),n=O(),h(s.$$.fragment),r=O(),h(t.$$.fragment),f=O(),h(u.$$.fragment)},l(o){w(e.$$.fragment,o),n=N(o),w(s.$$.fragment,o),r=N(o),w(t.$$.fragment,o),f=N(o),w(u.$$.fragment,o)},m(o,m){b(e,o,m),p(o,n,m),b(s,o,m),p(o,r,m),b(t,o,m),p(o,f,m),b(u,o,m),l=!0},p(o,m){const i={};m&8&&(i.$$scope={dirty:m,ctx:o}),e.$set(i);const $={};m&8&&($.$$scope={dirty:m,ctx:o}),s.$set($);const g={};m&8&&(g.$$scope={dirty:m,ctx:o}),u.$set(g)},i(o){l||(d(e.$$.fragment,o),d(s.$$.fragment,o),d(t.$$.fragment,o),d(u.$$.fragment,o),l=!0)},o(o){_(e.$$.fragment,o),_(s.$$.fragment,o),_(t.$$.fragment,o),_(u.$$.fragment,o),l=!1},d(o){E(e,o),o&&c(n),E(s,o),o&&c(r),E(t,o),o&&c(f),E(u,o)}}}function ze(a){let e,n,s,r;return e=new te({props:{nav:!0,caret:!0,$$slots:{default:[Pe]},$$scope:{ctx:a}}}),s=new ne({props:{end:!0,$$slots:{default:[xe]},$$scope:{ctx:a}}}),{c(){h(e.$$.fragment),n=O(),h(s.$$.fragment)},l(t){w(e.$$.fragment,t),n=N(t),w(s.$$.fragment,t)},m(t,f){b(e,t,f),p(t,n,f),b(s,t,f),r=!0},p(t,f){const u={};f&8&&(u.$$scope={dirty:f,ctx:t}),e.$set(u);const l={};f&8&&(l.$$scope={dirty:f,ctx:t}),s.$set(l)},i(t){r||(d(e.$$.fragment,t),d(s.$$.fragment,t),r=!0)},o(t){_(e.$$.fragment,t),_(s.$$.fragment,t),r=!1},d(t){E(e,t),t&&c(n),E(s,t)}}}function Ce(a){let e,n,s,r;return e=new ee({props:{nav:!0,inNavbar:!0,$$slots:{default:[Te]},$$scope:{ctx:a}}}),s=new ee({props:{nav:!0,inNavbar:!0,$$slots:{default:[ze]},$$scope:{ctx:a}}}),{c(){h(e.$$.fragment),n=O(),h(s.$$.fragment)},l(t){w(e.$$.fragment,t),n=N(t),w(s.$$.fragment,t)},m(t,f){b(e,t,f),p(t,n,f),b(s,t,f),r=!0},p(t,f){const u={};f&8&&(u.$$scope={dirty:f,ctx:t}),e.$set(u);const l={};f&8&&(l.$$scope={dirty:f,ctx:t}),s.$set(l)},i(t){r||(d(e.$$.fragment,t),d(s.$$.fragment,t),r=!0)},o(t){_(e.$$.fragment,t),_(s.$$.fragment,t),r=!1},d(t){E(e,t),t&&c(n),E(s,t)}}}function Ge(a){let e,n;return e=new ve({props:{class:"ms-auto",navbar:!0,$$slots:{default:[Ce]},$$scope:{ctx:a}}}),{c(){h(e.$$.fragment)},l(s){w(e.$$.fragment,s)},m(s,r){b(e,s,r),n=!0},p(s,r){const t={};r&8&&(t.$$scope={dirty:r,ctx:s}),e.$set(t)},i(s){n||(d(e.$$.fragment,s),n=!0)},o(s){_(e.$$.fragment,s),n=!1},d(s){E(e,s)}}}function He(a){let e,n,s,r,t,f,u,l,o,m,i;return l=new ge({}),l.$on("click",a[2]),m=new Oe({props:{isOpen:a[0],class:a[0]?"opened":"closed",navbar:!0,expand:"md",$$slots:{default:[Ge]},$$scope:{ctx:a}}}),m.$on("update",a[1]),{c(){e=D("a"),n=D("img"),r=O(),t=D("img"),u=O(),h(l.$$.fragment),o=O(),h(m.$$.fragment),this.h()},l($){e=q($,"A",{class:!0,href:!0});var g=P(e);n=q(g,"IMG",{class:!0,src:!0,alt:!0}),r=N(g),t=q(g,"IMG",{class:!0,src:!0,alt:!0}),g.forEach(c),u=N($),w(l.$$.fragment,$),o=N($),w(m.$$.fragment,$),this.h()},h(){k(n,"class","img-logo img-logo-desktop svelte-1vdcc0o"),y(n.src,s=Ne)||k(n,"src",s),k(n,"alt","On-chain quantitative finance"),k(t,"class","img-logo img-logo-mobile svelte-1vdcc0o"),y(t.src,f=Se)||k(t,"src",f),k(t,"alt","On-chain quantitative finance"),k(e,"class","navbar-brand"),k(e,"href","/")},m($,g){p($,e,g),j(e,n),j(e,r),j(e,t),p($,u,g),b(l,$,g),p($,o,g),b(m,$,g),i=!0},p($,g){const M={};g&1&&(M.isOpen=$[0]),g&1&&(M.class=$[0]?"opened":"closed"),g&8&&(M.$$scope={dirty:g,ctx:$}),m.$set(M)},i($){i||(d(l.$$.fragment,$),d(m.$$.fragment,$),i=!0)},o($){_(l.$$.fragment,$),_(m.$$.fragment,$),i=!1},d($){$&&c(e),$&&c(u),E(l,$),$&&c(o),E(m,$)}}}function Re(a){let e,n,s;return n=new _e({props:{color:"light",light:!0,expand:"md",$$slots:{default:[He]},$$scope:{ctx:a}}}),{c(){e=D("div"),h(n.$$.fragment),this.h()},l(r){e=q(r,"DIV",{class:!0});var t=P(e);w(n.$$.fragment,t),t.forEach(c),this.h()},h(){k(e,"class","container hacky-navbar svelte-1vdcc0o")},m(r,t){p(r,e,t),b(n,e,null),s=!0},p(r,[t]){const f={};t&9&&(f.$$scope={dirty:t,ctx:r}),n.$set(f)},i(r){s||(d(n.$$.fragment,r),s=!0)},o(r){_(n.$$.fragment,r),s=!1},d(r){r&&c(e),E(n)}}}function Ve(a,e,n){let s=!1;function r(f){n(0,s=f.detail.isOpen)}return[s,r,()=>n(0,s=!s)]}class Ke extends z{constructor(e){super();C(this,e,Ve,Re,G,{})}}var Ue="/_app/assets/brand-mark-320e5590.svg";function Je(a){let e;return{c(){e=D("link"),this.h()},l(n){const s=he('[data-svelte="svelte-c45uvp"]',document.head);e=q(s,"LINK",{rel:!0,type:!0,href:!0}),s.forEach(c),this.h()},h(){k(e,"rel","icon"),k(e,"type","image/svg+xml"),k(e,"href",Ue)},m(n,s){j(document.head,e)},p:V,i:V,o:V,d(n){c(e)}}}class Qe extends z{constructor(e){super();C(this,e,null,Je,G,{})}}function Xe(a){let e,n,s,r,t;e=new Qe({}),s=new Ke({});const f=a[1].default,u=Z(f,a,a[0],null);return{c(){h(e.$$.fragment),n=O(),h(s.$$.fragment),r=O(),u&&u.c()},l(l){w(e.$$.fragment,l),n=N(l),w(s.$$.fragment,l),r=N(l),u&&u.l(l)},m(l,o){b(e,l,o),p(l,n,o),b(s,l,o),p(l,r,o),u&&u.m(l,o),t=!0},p(l,[o]){u&&u.p&&(!t||o&1)&&J(u,f,l,l[0],t?X(f,l[0],o,null):Q(l[0]),null)},i(l){t||(d(e.$$.fragment,l),d(s.$$.fragment,l),d(u,l),t=!0)},o(l){_(e.$$.fragment,l),_(s.$$.fragment,l),_(u,l),t=!1},d(l){E(e,l),l&&c(n),E(s,l),l&&c(r),u&&u.d(l)}}}function Ye(a,e,n){let{$$slots:s={},$$scope:r}=e;return a.$$set=t=>{"$$scope"in t&&n(0,r=t.$$scope)},[r,s]}class Ze extends z{constructor(e){super();C(this,e,Ye,Xe,G,{})}}export{Ze as default};
