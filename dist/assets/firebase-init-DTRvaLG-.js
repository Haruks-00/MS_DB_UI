import{r as e,g as t,_ as i,a as n,c as s,L as r,b as o,F as a,S as h,d as c,C as l,e as u,f as d,h as f,i as p,j as g,E as m,k as v,l as y,q as w,m as _,n as T,o as I,p as b,s as k,t as E}from"./index-DVfpd7yt.js";import"./vue-BboyqEDC.js";import"./vuetify-B2tbcxZi.js";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
e("firebase","9.23.0","app");var S,A="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},R=R||{},C=A||self;function P(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function O(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function N(e,t,i){return e.call.apply(e.bind,arguments)}function L(e,t,i){if(!e)throw Error();if(2<arguments.length){var n=Array.prototype.slice.call(arguments,2);return function(){var i=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(i,n),e.apply(t,i)}}return function(){return e.apply(t,arguments)}}function D(e,t,i){return(D=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?N:L).apply(null,arguments)}function M(e,t){var i=Array.prototype.slice.call(arguments,1);return function(){var t=i.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function U(e,t){function i(){}i.prototype=t.prototype,e.$=t.prototype,e.prototype=new i,e.prototype.constructor=e,e.ac=function(e,i,n){for(var s=Array(arguments.length-2),r=2;r<arguments.length;r++)s[r-2]=arguments[r];return t.prototype[i].apply(e,s)}}function x(){this.s=this.s,this.o=this.o}x.prototype.s=!1,x.prototype.sa=function(){!this.s&&(this.s=!0,this.N())},x.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const j=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if("string"==typeof e)return"string"!=typeof t||1!=t.length?-1:e.indexOf(t,0);for(let i=0;i<e.length;i++)if(i in e&&e[i]===t)return i;return-1};function F(e){const t=e.length;if(0<t){const i=Array(t);for(let n=0;n<t;n++)i[n]=e[n];return i}return[]}function H(e,t){for(let i=1;i<arguments.length;i++){const t=arguments[i];if(P(t)){const i=e.length||0,n=t.length||0;e.length=i+n;for(let s=0;s<n;s++)e[i+s]=t[s]}else e.push(t)}}function z(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}z.prototype.h=function(){this.defaultPrevented=!0};var V=function(){if(!C.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{C.addEventListener("test",()=>{},t),C.removeEventListener("test",()=>{},t)}catch(i){}return e}();function K(e){return/^[\s\xa0]*$/.test(e)}function $(){var e=C.navigator;return e&&(e=e.userAgent)?e:""}function q(e){return-1!=$().indexOf(e)}function B(e){return B[" "](e),e}B[" "]=function(){};var G,W=q("Opera"),X=q("Trident")||q("MSIE"),J=q("Edge"),Y=J||X,Q=q("Gecko")&&!(-1!=$().toLowerCase().indexOf("webkit")&&!q("Edge"))&&!(q("Trident")||q("MSIE"))&&!q("Edge"),Z=-1!=$().toLowerCase().indexOf("webkit")&&!q("Edge");function ee(){var e=C.document;return e?e.documentMode:void 0}e:{var te="",ie=(G=$(),Q?/rv:([^\);]+)(\)|;)/.exec(G):J?/Edge\/([\d\.]+)/.exec(G):X?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(G):Z?/WebKit\/(\S+)/.exec(G):W?/(?:Version)[ \/]?(\S+)/.exec(G):void 0);if(ie&&(te=ie?ie[1]:""),X){var ne=ee();if(null!=ne&&ne>parseFloat(te))break e}}function se(e,t){if(z.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var i=this.type=e.type,n=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(Q){e:{try{B(t.nodeName);var s=!0;break e}catch(r){}s=!1}s||(t=null)}}else"mouseover"==i?t=e.fromElement:"mouseout"==i&&(t=e.toElement);this.relatedTarget=t,n?(this.clientX=void 0!==n.clientX?n.clientX:n.pageX,this.clientY=void 0!==n.clientY?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:re[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&se.$.h.call(this)}}C.document&&X&&ee(),U(se,z);var re={2:"touch",3:"pen",4:"mouse"};se.prototype.h=function(){se.$.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var oe="closure_listenable_"+(1e6*Math.random()|0),ae=0;function he(e,t,i,n,s){this.listener=e,this.proxy=null,this.src=t,this.type=i,this.capture=!!n,this.la=s,this.key=++ae,this.fa=this.ia=!1}function ce(e){e.fa=!0,e.listener=null,e.proxy=null,e.src=null,e.la=null}function le(e,t,i){for(const n in e)t.call(i,e[n],n,e)}function ue(e){const t={};for(const i in e)t[i]=e[i];return t}const de="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function fe(e,t){let i,n;for(let s=1;s<arguments.length;s++){for(i in n=arguments[s],n)e[i]=n[i];for(let t=0;t<de.length;t++)i=de[t],Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}}function pe(e){this.src=e,this.g={},this.h=0}function ge(e,t){var i=t.type;if(i in e.g){var n,s=e.g[i],r=j(s,t);(n=0<=r)&&Array.prototype.splice.call(s,r,1),n&&(ce(t),0==e.g[i].length&&(delete e.g[i],e.h--))}}function me(e,t,i,n){for(var s=0;s<e.length;++s){var r=e[s];if(!r.fa&&r.listener==t&&r.capture==!!i&&r.la==n)return s}return-1}pe.prototype.add=function(e,t,i,n,s){var r=e.toString();(e=this.g[r])||(e=this.g[r]=[],this.h++);var o=me(e,t,n,s);return-1<o?(t=e[o],i||(t.ia=!1)):((t=new he(t,this.src,r,!!n,s)).ia=i,e.push(t)),t};var ve="closure_lm_"+(1e6*Math.random()|0),ye={};function we(e,t,i,n,s){if(Array.isArray(t)){for(var r=0;r<t.length;r++)we(e,t[r],i,n,s);return null}return i=Se(i),e&&e[oe]?e.O(t,i,!!O(n)&&!!n.capture,s):function(e,t,i,n,s,r){if(!t)throw Error("Invalid event type");var o=O(s)?!!s.capture:!!s,a=ke(e);if(a||(e[ve]=a=new pe(e)),i=a.add(t,i,n,o,r),i.proxy)return i;if(n=function(){function e(i){return t.call(e.src,e.listener,i)}const t=be;return e}(),i.proxy=n,n.src=e,n.listener=i,e.addEventListener)V||(s=o),void 0===s&&(s=!1),e.addEventListener(t.toString(),n,s);else if(e.attachEvent)e.attachEvent(Ie(t.toString()),n);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(n)}return i}(e,t,i,!1,n,s)}function _e(e,t,i,n,s){if(Array.isArray(t))for(var r=0;r<t.length;r++)_e(e,t[r],i,n,s);else n=O(n)?!!n.capture:!!n,i=Se(i),e&&e[oe]?(e=e.i,(t=String(t).toString())in e.g&&(-1<(i=me(r=e.g[t],i,n,s))&&(ce(r[i]),Array.prototype.splice.call(r,i,1),0==r.length&&(delete e.g[t],e.h--)))):e&&(e=ke(e))&&(t=e.g[t.toString()],e=-1,t&&(e=me(t,i,n,s)),(i=-1<e?t[e]:null)&&Te(i))}function Te(e){if("number"!=typeof e&&e&&!e.fa){var t=e.src;if(t&&t[oe])ge(t.i,e);else{var i=e.type,n=e.proxy;t.removeEventListener?t.removeEventListener(i,n,e.capture):t.detachEvent?t.detachEvent(Ie(i),n):t.addListener&&t.removeListener&&t.removeListener(n),(i=ke(t))?(ge(i,e),0==i.h&&(i.src=null,t[ve]=null)):ce(e)}}}function Ie(e){return e in ye?ye[e]:ye[e]="on"+e}function be(e,t){if(e.fa)e=!0;else{t=new se(t,this);var i=e.listener,n=e.la||e.src;e.ia&&Te(e),e=i.call(n,t)}return e}function ke(e){return(e=e[ve])instanceof pe?e:null}var Ee="__closure_events_fn_"+(1e9*Math.random()>>>0);function Se(e){return"function"==typeof e?e:(e[Ee]||(e[Ee]=function(t){return e.handleEvent(t)}),e[Ee])}function Ae(){x.call(this),this.i=new pe(this),this.S=this,this.J=null}function Re(e,t){var i,n=e.J;if(n)for(i=[];n;n=n.J)i.push(n);if(e=e.S,n=t.type||t,"string"==typeof t)t=new z(t,e);else if(t instanceof z)t.target=t.target||e;else{var s=t;fe(t=new z(n,e),s)}if(s=!0,i)for(var r=i.length-1;0<=r;r--){var o=t.g=i[r];s=Ce(o,n,!0,t)&&s}if(s=Ce(o=t.g=e,n,!0,t)&&s,s=Ce(o,n,!1,t)&&s,i)for(r=0;r<i.length;r++)s=Ce(o=t.g=i[r],n,!1,t)&&s}function Ce(e,t,i,n){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var s=!0,r=0;r<t.length;++r){var o=t[r];if(o&&!o.fa&&o.capture==i){var a=o.listener,h=o.la||o.src;o.ia&&ge(e.i,o),s=!1!==a.call(h,n)&&s}}return s&&!n.defaultPrevented}U(Ae,x),Ae.prototype[oe]=!0,Ae.prototype.removeEventListener=function(e,t,i,n){_e(this,e,t,i,n)},Ae.prototype.N=function(){if(Ae.$.N.call(this),this.i){var e,t=this.i;for(e in t.g){for(var i=t.g[e],n=0;n<i.length;n++)ce(i[n]);delete t.g[e],t.h--}}this.J=null},Ae.prototype.O=function(e,t,i,n){return this.i.add(String(e),t,!1,i,n)},Ae.prototype.P=function(e,t,i,n){return this.i.add(String(e),t,!0,i,n)};var Pe=C.JSON.stringify;function Oe(){var e=je;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var Ne=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new Le,e=>e.reset());class Le{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}function De(e){var t=1;e=e.split(":");const i=[];for(;0<t&&e.length;)i.push(e.shift()),t--;return e.length&&i.push(e.join(":")),i}function Me(e){C.setTimeout(()=>{throw e},0)}let Ue,xe=!1,je=new class{constructor(){this.h=this.g=null}add(e,t){const i=Ne.get();i.set(e,t),this.h?this.h.next=i:this.g=i,this.h=i}},Fe=()=>{const e=C.Promise.resolve(void 0);Ue=()=>{e.then(He)}};var He=()=>{for(var e;e=Oe();){try{e.h.call(e.g)}catch(i){Me(i)}var t=Ne;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}xe=!1};function ze(e,t){Ae.call(this),this.h=e||1,this.g=t||C,this.j=D(this.qb,this),this.l=Date.now()}function Ve(e){e.ga=!1,e.T&&(e.g.clearTimeout(e.T),e.T=null)}function Ke(e,t,i){if("function"==typeof e)i&&(e=D(e,i));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=D(e.handleEvent,e)}return 2147483647<Number(t)?-1:C.setTimeout(e,t||0)}function $e(e){e.g=Ke(()=>{e.g=null,e.i&&(e.i=!1,$e(e))},e.j);const t=e.h;e.h=null,e.m.apply(null,t)}U(ze,Ae),(S=ze.prototype).ga=!1,S.T=null,S.qb=function(){if(this.ga){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-e):(this.T&&(this.g.clearTimeout(this.T),this.T=null),Re(this,"tick"),this.ga&&(Ve(this),this.start()))}},S.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())},S.N=function(){ze.$.N.call(this),Ve(this),delete this.g};class qe extends x{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:$e(this)}N(){super.N(),this.g&&(C.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Be(e){x.call(this),this.h=e,this.g={}}U(Be,x);var Ge=[];function We(e,t,i,n){Array.isArray(i)||(i&&(Ge[0]=i.toString()),i=Ge);for(var s=0;s<i.length;s++){var r=we(t,i[s],n||e.handleEvent,!1,e.h||e);if(!r)break;e.g[r.key]=r}}function Xe(e){le(e.g,function(e,t){this.g.hasOwnProperty(t)&&Te(e)},e),e.g={}}function Je(){this.g=!0}function Ye(e,t,i,n){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var i=JSON.parse(t);if(i)for(e=0;e<i.length;e++)if(Array.isArray(i[e])){var n=i[e];if(!(2>n.length)){var s=n[1];if(Array.isArray(s)&&!(1>s.length)){var r=s[0];if("noop"!=r&&"stop"!=r&&"close"!=r)for(var o=1;o<s.length;o++)s[o]=""}}}return Pe(i)}catch(a){return t}}(e,i)+(n?" "+n:"")})}Be.prototype.N=function(){Be.$.N.call(this),Xe(this)},Be.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},Je.prototype.Ea=function(){this.g=!1},Je.prototype.info=function(){};var Qe={},Ze=null;function et(){return Ze=Ze||new Ae}function tt(e){z.call(this,Qe.Ta,e)}function it(e){const t=et();Re(t,new tt(t))}function nt(e,t){z.call(this,Qe.STAT_EVENT,e),this.stat=t}function st(e){const t=et();Re(t,new nt(t,e))}function rt(e,t){z.call(this,Qe.Ua,e),this.size=t}function ot(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return C.setTimeout(function(){e()},t)}Qe.Ta="serverreachability",U(tt,z),Qe.STAT_EVENT="statevent",U(nt,z),Qe.Ua="timingevent",U(rt,z);var at={NO_ERROR:0,TIMEOUT:8};function ht(){}function ct(e){return e.h||(e.h=e.i())}ht.prototype.h=null;var lt,ut={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function dt(){z.call(this,"d")}function ft(){z.call(this,"c")}function pt(){}function gt(e,t,i,n){this.l=e,this.j=t,this.m=i,this.W=n||1,this.U=new Be(this),this.P=vt,e=Y?125:void 0,this.V=new ze(e),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new mt}function mt(){this.i=null,this.g="",this.h=!1}U(dt,z),U(ft,z),U(pt,ht),pt.prototype.g=function(){return new XMLHttpRequest},pt.prototype.i=function(){return{}},lt=new pt;var vt=45e3,yt={},wt={};function _t(e,t,i){e.L=1,e.v=Ft(Dt(t)),e.s=i,e.S=!0,Tt(e,null)}function Tt(e,t){e.G=Date.now(),Et(e),e.A=Dt(e.v);var i=e.A,n=e.W;Array.isArray(n)||(n=[String(n)]),Qt(i.i,"t",n),e.C=0,i=e.l.J,e.h=new mt,e.g=Qi(e.l,i?t:null,!e.s),0<e.O&&(e.M=new qe(D(e.Pa,e,e.g),e.O)),We(e.U,e.g,"readystatechange",e.nb),t=e.I?ue(e.I):{},e.s?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ha(e.A,e.u,e.s,t)):(e.u="GET",e.g.ha(e.A,e.u,null,t)),it(),function(e,t,i,n,s,r){e.info(function(){if(e.g)if(r)for(var o="",a=r.split("&"),h=0;h<a.length;h++){var c=a[h].split("=");if(1<c.length){var l=c[0];c=c[1];var u=l.split("_");o=2<=u.length&&"type"==u[1]?o+(l+"=")+c+"&":o+(l+"=redacted&")}}else o=null;else o=r;return"XMLHTTP REQ ("+n+") [attempt "+s+"]: "+t+"\n"+i+"\n"+o})}(e.j,e.u,e.A,e.m,e.W,e.s)}function It(e){return!!e.g&&("GET"==e.u&&2!=e.L&&e.l.Ha)}function bt(e,t,i){let n,s=!0;for(;!e.J&&e.C<i.length;){if(n=kt(e,i),n==wt){4==t&&(e.o=4,st(14),s=!1),Ye(e.j,e.m,null,"[Incomplete Response]");break}if(n==yt){e.o=4,st(15),Ye(e.j,e.m,i,"[Invalid Chunk]"),s=!1;break}Ye(e.j,e.m,n,null),Pt(e,n)}It(e)&&n!=wt&&n!=yt&&(e.h.g="",e.C=0),4!=t||0!=i.length||e.h.h||(e.o=1,st(16),s=!1),e.i=e.i&&s,s?0<i.length&&!e.ba&&(e.ba=!0,(t=e.l).g==e&&t.ca&&!t.M&&(t.l.info("Great, no buffering proxy detected. Bytes received: "+i.length),$i(t),t.M=!0,st(11))):(Ye(e.j,e.m,i,"[Invalid Chunked Response]"),Ct(e),Rt(e))}function kt(e,t){var i=e.C,n=t.indexOf("\n",i);return-1==n?wt:(i=Number(t.substring(i,n)),isNaN(i)?yt:(n+=1)+i>t.length?wt:(t=t.slice(n,n+i),e.C=n+i,t))}function Et(e){e.Y=Date.now()+e.P,St(e,e.P)}function St(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=ot(D(e.lb,e),t)}function At(e){e.B&&(C.clearTimeout(e.B),e.B=null)}function Rt(e){0==e.l.H||e.J||Gi(e.l,e)}function Ct(e){At(e);var t=e.M;t&&"function"==typeof t.sa&&t.sa(),e.M=null,Ve(e.V),Xe(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.sa())}function Pt(e,t){try{var i=e.l;if(0!=i.H&&(i.g==e||ri(i.i,e)))if(!e.K&&ri(i.i,e)&&3==i.H){try{var n=i.Ja.g.parse(t)}catch(c){n=null}if(Array.isArray(n)&&3==n.length){var s=n;if(0==s[0]){e:if(!i.u){if(i.g){if(!(i.g.G+3e3<e.G))break e;Bi(i),Ui(i)}Ki(i),st(18)}}else i.Fa=s[1],0<i.Fa-i.V&&37500>s[2]&&i.G&&0==i.A&&!i.v&&(i.v=ot(D(i.ib,i),6e3));if(1>=si(i.i)&&i.oa){try{i.oa()}catch(c){}i.oa=void 0}}else Xi(i,11)}else if((e.K||i.g==e)&&Bi(i),!K(t))for(s=i.Ja.g.parse(t),t=0;t<s.length;t++){let c=s[t];if(i.V=c[0],c=c[1],2==i.H)if("c"==c[0]){i.K=c[1],i.pa=c[2];const t=c[3];null!=t&&(i.ra=t,i.l.info("VER="+i.ra));const s=c[4];null!=s&&(i.Ga=s,i.l.info("SVER="+i.Ga));const l=c[5];null!=l&&"number"==typeof l&&0<l&&(n=1.5*l,i.L=n,i.l.info("backChannelRequestTimeoutMs_="+n)),n=i;const u=e.g;if(u){const e=u.g?u.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var r=n.i;r.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(r.j=r.l,r.g=new Set,r.h&&(oi(r,r.h),r.h=null))}if(n.F){const e=u.g?u.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(n.Da=e,jt(n.I,n.F,e))}}i.H=3,i.h&&i.h.Ba(),i.ca&&(i.S=Date.now()-e.G,i.l.info("Handshake RTT: "+i.S+"ms"));var o=e;if((n=i).wa=Yi(n,n.J?n.pa:null,n.Y),o.K){ai(n.i,o);var a=o,h=n.L;h&&a.setTimeout(h),a.B&&(At(a),Et(a)),n.g=o}else Vi(n);0<i.j.length&&ji(i)}else"stop"!=c[0]&&"close"!=c[0]||Xi(i,7);else 3==i.H&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?Xi(i,7):Mi(i):"noop"!=c[0]&&i.h&&i.h.Aa(c),i.A=0)}it()}catch(c){}}function Ot(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(P(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var i=function(e){if(e.ta&&"function"==typeof e.ta)return e.ta();if(!e.Z||"function"!=typeof e.Z){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(P(e)||"string"==typeof e){var t=[];e=e.length;for(var i=0;i<e;i++)t.push(i);return t}t=[],i=0;for(const n in e)t[i++]=n;return t}}}(e),n=function(e){if(e.Z&&"function"==typeof e.Z)return e.Z();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(P(e)){for(var t=[],i=e.length,n=0;n<i;n++)t.push(e[n]);return t}for(n in t=[],i=0,e)t[i++]=e[n];return t}(e),s=n.length,r=0;r<s;r++)t.call(void 0,n[r],i&&i[r],e)}(S=gt.prototype).setTimeout=function(e){this.P=e},S.nb=function(e){e=e.target;const t=this.M;t&&3==Ci(e)?t.l():this.Pa(e)},S.Pa=function(e){try{if(e==this.g)e:{const l=Ci(this.g);var t=this.g.Ia();this.g.da();if(!(3>l)&&(3!=l||Y||this.g&&(this.h.h||this.g.ja()||Pi(this.g)))){this.J||4!=l||7==t||it(),At(this);var i=this.g.da();this.ca=i;t:if(It(this)){var n=Pi(this.g);e="";var s=n.length,r=4==Ci(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){Ct(this),Rt(this);var o="";break t}this.h.i=new C.TextDecoder}for(t=0;t<s;t++)this.h.h=!0,e+=this.h.i.decode(n[t],{stream:r&&t==s-1});n.splice(0,s),this.h.g+=e,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=200==i,function(e,t,i,n,s,r,o){e.info(function(){return"XMLHTTP RESP ("+n+") [ attempt "+s+"]: "+t+"\n"+i+"\n"+r+" "+o})}(this.j,this.u,this.A,this.m,this.W,l,i),this.i){if(this.aa&&!this.K){t:{if(this.g){var a,h=this.g;if((a=h.g?h.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(a)){var c=a;break t}}c=null}if(!(i=c)){this.i=!1,this.o=3,st(12),Ct(this),Rt(this);break e}Ye(this.j,this.m,i,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Pt(this,i)}this.S?(bt(this,l,o),Y&&this.i&&3==l&&(We(this.U,this.V,"tick",this.mb),this.V.start())):(Ye(this.j,this.m,o,null),Pt(this,o)),4==l&&Ct(this),this.i&&!this.J&&(4==l?Gi(this.l,this):(this.i=!1,Et(this)))}else(function(e){const t={};e=(e.g&&2<=Ci(e)&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let n=0;n<e.length;n++){if(K(e[n]))continue;var i=De(e[n]);const s=i[0];if("string"!=typeof(i=i[1]))continue;i=i.trim();const r=t[s]||[];t[s]=r,r.push(i)}!function(e,t){for(const i in e)t.call(void 0,e[i],i,e)}(t,function(e){return e.join(", ")})})(this.g),400==i&&0<o.indexOf("Unknown SID")?(this.o=3,st(12)):(this.o=0,st(13)),Ct(this),Rt(this)}}}catch(l){}},S.mb=function(){if(this.g){var e=Ci(this.g),t=this.g.ja();this.C<t.length&&(At(this),bt(this,e,t),this.i&&4!=e&&Et(this))}},S.cancel=function(){this.J=!0,Ct(this)},S.lb=function(){this.B=null;const e=Date.now();0<=e-this.Y?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.j,this.A),2!=this.L&&(it(),st(17)),Ct(this),this.o=2,Rt(this)):St(this,this.Y-e)};var Nt=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Lt(e){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,e instanceof Lt){this.h=e.h,Mt(this,e.j),this.s=e.s,this.g=e.g,Ut(this,e.m),this.l=e.l;var t=e.i,i=new Wt;i.i=t.i,t.g&&(i.g=new Map(t.g),i.h=t.h),xt(this,i),this.o=e.o}else e&&(t=String(e).match(Nt))?(this.h=!1,Mt(this,t[1]||"",!0),this.s=Ht(t[2]||""),this.g=Ht(t[3]||"",!0),Ut(this,t[4]),this.l=Ht(t[5]||"",!0),xt(this,t[6]||"",!0),this.o=Ht(t[7]||"")):(this.h=!1,this.i=new Wt(null,this.h))}function Dt(e){return new Lt(e)}function Mt(e,t,i){e.j=i?Ht(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function Ut(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function xt(e,t,i){t instanceof Wt?(e.i=t,function(e,t){t&&!e.j&&(Xt(e),e.i=null,e.g.forEach(function(e,t){var i=t.toLowerCase();t!=i&&(Jt(this,t),Qt(this,i,e))},e)),e.j=t}(e.i,e.h)):(i||(t=zt(t,Bt)),e.i=new Wt(t,e.h))}function jt(e,t,i){e.i.set(t,i)}function Ft(e){return jt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function Ht(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function zt(e,t,i){return"string"==typeof e?(e=encodeURI(e).replace(t,Vt),i&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function Vt(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}Lt.prototype.toString=function(){var e=[],t=this.j;t&&e.push(zt(t,Kt,!0),":");var i=this.g;return(i||"file"==t)&&(e.push("//"),(t=this.s)&&e.push(zt(t,Kt,!0),"@"),e.push(encodeURIComponent(String(i)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(i=this.m)&&e.push(":",String(i))),(i=this.l)&&(this.g&&"/"!=i.charAt(0)&&e.push("/"),e.push(zt(i,"/"==i.charAt(0)?qt:$t,!0))),(i=this.i.toString())&&e.push("?",i),(i=this.o)&&e.push("#",zt(i,Gt)),e.join("")};var Kt=/[#\/\?@]/g,$t=/[#\?:]/g,qt=/[#\?]/g,Bt=/[#\?@]/g,Gt=/#/g;function Wt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function Xt(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var i=0;i<e.length;i++){var n=e[i].indexOf("="),s=null;if(0<=n){var r=e[i].substring(0,n);s=e[i].substring(n+1)}else r=e[i];t(r,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(e.i,function(t,i){e.add(decodeURIComponent(t.replace(/\+/g," ")),i)}))}function Jt(e,t){Xt(e),t=Zt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function Yt(e,t){return Xt(e),t=Zt(e,t),e.g.has(t)}function Qt(e,t,i){Jt(e,t),0<i.length&&(e.i=null,e.g.set(Zt(e,t),F(i)),e.h+=i.length)}function Zt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}(S=Wt.prototype).add=function(e,t){Xt(this),this.i=null,e=Zt(this,e);var i=this.g.get(e);return i||this.g.set(e,i=[]),i.push(t),this.h+=1,this},S.forEach=function(e,t){Xt(this),this.g.forEach(function(i,n){i.forEach(function(i){e.call(t,i,n,this)},this)},this)},S.ta=function(){Xt(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),i=[];for(let n=0;n<t.length;n++){const s=e[n];for(let e=0;e<s.length;e++)i.push(t[n])}return i},S.Z=function(e){Xt(this);let t=[];if("string"==typeof e)Yt(this,e)&&(t=t.concat(this.g.get(Zt(this,e))));else{e=Array.from(this.g.values());for(let i=0;i<e.length;i++)t=t.concat(e[i])}return t},S.set=function(e,t){return Xt(this),this.i=null,Yt(this,e=Zt(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},S.get=function(e,t){return e&&0<(e=this.Z(e)).length?String(e[0]):t},S.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var i=0;i<t.length;i++){var n=t[i];const r=encodeURIComponent(String(n)),o=this.Z(n);for(n=0;n<o.length;n++){var s=r;""!==o[n]&&(s+="="+encodeURIComponent(String(o[n]))),e.push(s)}}return this.i=e.join("&")};var ei=class{constructor(e,t){this.g=e,this.map=t}};function ti(e){this.l=e||ii,C.PerformanceNavigationTiming?e=0<(e=C.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(C.g&&C.g.Ka&&C.g.Ka()&&C.g.Ka().ec),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var ii=10;function ni(e){return!!e.h||!!e.g&&e.g.size>=e.j}function si(e){return e.h?1:e.g?e.g.size:0}function ri(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function oi(e,t){e.g?e.g.add(t):e.h=t}function ai(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function hi(e){if(null!=e.h)return e.i.concat(e.h.F);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const i of e.g.values())t=t.concat(i.F);return t}return F(e.i)}ti.prototype.cancel=function(){if(this.i=hi(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var ci=class{stringify(e){return C.JSON.stringify(e,void 0)}parse(e){return C.JSON.parse(e,void 0)}};function li(){this.g=new ci}function ui(e,t,i){const n=i||"";try{Ot(e,function(e,i){let s=e;O(e)&&(s=Pe(e)),t.push(n+i+"="+encodeURIComponent(s))})}catch(s){throw t.push(n+"type="+encodeURIComponent("_badmap")),s}}function di(e,t,i,n,s){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,s(n)}catch(r){}}function fi(e){this.l=e.fc||null,this.j=e.ob||!1}function pi(e,t){Ae.call(this),this.F=e,this.u=t,this.m=void 0,this.readyState=gi,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}U(fi,ht),fi.prototype.g=function(){return new pi(this.l,this.j)},fi.prototype.i=function(e){return function(){return e}}({}),U(pi,Ae);var gi=0;function mi(e){e.j.read().then(e.Xa.bind(e)).catch(e.ka.bind(e))}function vi(e){e.readyState=4,e.l=null,e.j=null,e.A=null,yi(e)}function yi(e){e.onreadystatechange&&e.onreadystatechange.call(e)}(S=pi.prototype).open=function(e,t){if(this.readyState!=gi)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,yi(this)},S.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.F||C).fetch(new Request(this.B,t)).then(this.$a.bind(this),this.ka.bind(this))},S.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,vi(this)),this.readyState=gi},S.$a=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,yi(this)),this.g&&(this.readyState=3,yi(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(void 0!==C.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;mi(this)}else e.text().then(this.Za.bind(this),this.ka.bind(this))},S.Xa=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?vi(this):yi(this),3==this.readyState&&mi(this)}},S.Za=function(e){this.g&&(this.response=this.responseText=e,vi(this))},S.Ya=function(e){this.g&&(this.response=e,vi(this))},S.ka=function(){this.g&&vi(this)},S.setRequestHeader=function(e,t){this.v.append(e,t)},S.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},S.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var i=t.next();!i.done;)i=i.value,e.push(i[0]+": "+i[1]),i=t.next();return e.join("\r\n")},Object.defineProperty(pi.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}});var wi=C.JSON.parse;function _i(e){Ae.call(this),this.headers=new Map,this.u=e||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=Ti,this.L=this.M=!1}U(_i,Ae);var Ti="",Ii=/^https?$/i,bi=["POST","PUT"];function ki(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,Ei(e),Ai(e)}function Ei(e){e.F||(e.F=!0,Re(e,"complete"),Re(e,"error"))}function Si(e){if(e.h&&void 0!==R&&(!e.C[1]||4!=Ci(e)||2!=e.da()))if(e.v&&4==Ci(e))Ke(e.La,0,e);else if(Re(e,"readystatechange"),4==Ci(e)){e.h=!1;try{const a=e.da();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var i;if(!(i=t)){var n;if(n=0===a){var s=String(e.I).match(Nt)[1]||null;!s&&C.self&&C.self.location&&(s=C.self.location.protocol.slice(0,-1)),n=!Ii.test(s?s.toLowerCase():"")}i=n}if(i)Re(e,"complete"),Re(e,"success");else{e.m=6;try{var r=2<Ci(e)?e.g.statusText:""}catch(o){r=""}e.j=r+" ["+e.da()+"]",Ei(e)}}finally{Ai(e)}}}function Ai(e,t){if(e.g){Ri(e);const n=e.g,s=e.C[0]?()=>{}:null;e.g=null,e.C=null,t||Re(e,"ready");try{n.onreadystatechange=s}catch(i){}}}function Ri(e){e.g&&e.L&&(e.g.ontimeout=null),e.A&&(C.clearTimeout(e.A),e.A=null)}function Ci(e){return e.g?e.g.readyState:0}function Pi(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.K){case Ti:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function Oi(e){let t="";return le(e,function(e,i){t+=i,t+=":",t+=e,t+="\r\n"}),t}function Ni(e,t,i){e:{for(n in i){var n=!1;break e}n=!0}n||(i=Oi(i),"string"==typeof e?null!=i&&encodeURIComponent(String(i)):jt(e,t,i))}function Li(e,t,i){return i&&i.internalChannelParams&&i.internalChannelParams[e]||t}function Di(e){this.Ga=0,this.j=[],this.l=new Je,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=Li("failFast",!1,e),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=Li("baseRetryDelayMs",5e3,e),this.hb=Li("retryDelaySeedMs",1e4,e),this.eb=Li("forwardChannelMaxRetries",2,e),this.xa=Li("forwardChannelRequestTimeoutMs",2e4,e),this.va=e&&e.xmlHttpFactory||void 0,this.Ha=e&&e.dc||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.i=new ti(e&&e.concurrentRequestLimit),this.Ja=new li,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=e&&e.bc||!1,e&&e.Ea&&this.l.Ea(),e&&e.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&e&&e.detectBufferingProxy||!1,this.qa=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.qa=e.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}function Mi(e){if(xi(e),3==e.H){var t=e.W++,i=Dt(e.I);if(jt(i,"SID",e.K),jt(i,"RID",t),jt(i,"TYPE","terminate"),Hi(e,i),(t=new gt(e,e.l,t)).L=2,t.v=Ft(Dt(i)),i=!1,C.navigator&&C.navigator.sendBeacon)try{i=C.navigator.sendBeacon(t.v.toString(),"")}catch(n){}!i&&C.Image&&((new Image).src=t.v,i=!0),i||(t.g=Qi(t.l,null),t.g.ha(t.v)),t.G=Date.now(),Et(t)}Ji(e)}function Ui(e){e.g&&($i(e),e.g.cancel(),e.g=null)}function xi(e){Ui(e),e.u&&(C.clearTimeout(e.u),e.u=null),Bi(e),e.i.cancel(),e.m&&("number"==typeof e.m&&C.clearTimeout(e.m),e.m=null)}function ji(e){if(!ni(e.i)&&!e.m){e.m=!0;var t=e.Na;Ue||Fe(),xe||(Ue(),xe=!0),je.add(t,e),e.C=0}}function Fi(e,t){var i;i=t?t.m:e.W++;const n=Dt(e.I);jt(n,"SID",e.K),jt(n,"RID",i),jt(n,"AID",e.V),Hi(e,n),e.o&&e.s&&Ni(n,e.o,e.s),i=new gt(e,e.l,i,e.C+1),null===e.o&&(i.I=e.s),t&&(e.j=t.F.concat(e.j)),t=zi(e,i,1e3),i.setTimeout(Math.round(.5*e.xa)+Math.round(.5*e.xa*Math.random())),oi(e.i,i),_t(i,n,t)}function Hi(e,t){e.na&&le(e.na,function(e,i){jt(t,i,e)}),e.h&&Ot({},function(e,i){jt(t,i,e)})}function zi(e,t,i){i=Math.min(e.j.length,i);var n=e.h?D(e.h.Va,e.h,e):null;e:{var s=e.j;let t=-1;for(;;){const e=["count="+i];-1==t?0<i?(t=s[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let o=!0;for(let a=0;a<i;a++){let i=s[a].g;const h=s[a].map;if(i-=t,0>i)t=Math.max(0,s[a].g-100),o=!1;else try{ui(h,e,"req"+i+"_")}catch(r){n&&n(h)}}if(o){n=e.join("&");break e}}}return e=e.j.splice(0,i),t.F=e,n}function Vi(e){if(!e.g&&!e.u){e.ba=1;var t=e.Ma;Ue||Fe(),xe||(Ue(),xe=!0),je.add(t,e),e.A=0}}function Ki(e){return!(e.g||e.u||3<=e.A)&&(e.ba++,e.u=ot(D(e.Ma,e),Wi(e,e.A)),e.A++,!0)}function $i(e){null!=e.B&&(C.clearTimeout(e.B),e.B=null)}function qi(e){e.g=new gt(e,e.l,"rpc",e.ba),null===e.o&&(e.g.I=e.s),e.g.O=0;var t=Dt(e.wa);jt(t,"RID","rpc"),jt(t,"SID",e.K),jt(t,"AID",e.V),jt(t,"CI",e.G?"0":"1"),!e.G&&e.qa&&jt(t,"TO",e.qa),jt(t,"TYPE","xmlhttp"),Hi(e,t),e.o&&e.s&&Ni(t,e.o,e.s),e.L&&e.g.setTimeout(e.L);var i=e.g;e=e.pa,i.L=1,i.v=Ft(Dt(t)),i.s=null,i.S=!0,Tt(i,e)}function Bi(e){null!=e.v&&(C.clearTimeout(e.v),e.v=null)}function Gi(e,t){var i=null;if(e.g==t){Bi(e),$i(e),e.g=null;var n=2}else{if(!ri(e.i,t))return;i=t.F,ai(e.i,t),n=1}if(0!=e.H)if(t.i)if(1==n){i=t.s?t.s.length:0,t=Date.now()-t.G;var s=e.C;Re(n=et(),new rt(n,i)),ji(e)}else Vi(e);else if(3==(s=t.o)||0==s&&0<t.ca||!(1==n&&function(e,t){return!(si(e.i)>=e.i.j-(e.m?1:0)||(e.m?(e.j=t.F.concat(e.j),0):1==e.H||2==e.H||e.C>=(e.cb?0:e.eb)||(e.m=ot(D(e.Na,e,t),Wi(e,e.C)),e.C++,0)))}(e,t)||2==n&&Ki(e)))switch(i&&0<i.length&&(t=e.i,t.i=t.i.concat(i)),s){case 1:Xi(e,5);break;case 4:Xi(e,10);break;case 3:Xi(e,6);break;default:Xi(e,2)}}function Wi(e,t){let i=e.ab+Math.floor(Math.random()*e.hb);return e.isActive()||(i*=2),i*t}function Xi(e,t){if(e.l.info("Error code "+t),2==t){var i=null;e.h&&(i=null);var n=D(e.pb,e);i||(i=new Lt("//www.google.com/images/cleardot.gif"),C.location&&"http"==C.location.protocol||Mt(i,"https"),Ft(i)),function(e,t){const i=new Je;if(C.Image){const n=new Image;n.onload=M(di,i,n,"TestLoadImage: loaded",!0,t),n.onerror=M(di,i,n,"TestLoadImage: error",!1,t),n.onabort=M(di,i,n,"TestLoadImage: abort",!1,t),n.ontimeout=M(di,i,n,"TestLoadImage: timeout",!1,t),C.setTimeout(function(){n.ontimeout&&n.ontimeout()},1e4),n.src=e}else t(!1)}(i.toString(),n)}else st(2);e.H=0,e.h&&e.h.za(t),Ji(e),xi(e)}function Ji(e){if(e.H=0,e.ma=[],e.h){const t=hi(e.i);0==t.length&&0==e.j.length||(H(e.ma,t),H(e.ma,e.j),e.i.i.length=0,F(e.j),e.j.length=0),e.h.ya()}}function Yi(e,t,i){var n=i instanceof Lt?Dt(i):new Lt(i);if(""!=n.g)t&&(n.g=t+"."+n.g),Ut(n,n.m);else{var s=C.location;n=s.protocol,t=t?t+"."+s.hostname:s.hostname,s=+s.port;var r=new Lt(null);n&&Mt(r,n),t&&(r.g=t),s&&Ut(r,s),i&&(r.l=i),n=r}return i=e.F,t=e.Da,i&&t&&jt(n,i,t),jt(n,"VER",e.ra),Hi(e,n),n}function Qi(e,t,i){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return(t=i&&e.Ha&&!e.va?new _i(new fi({ob:!0})):new _i(e.va)).Oa(e.J),t}function Zi(){}function en(e,t){Ae.call(this),this.g=new Di(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.Ca&&(e?e["X-WebChannel-Client-Profile"]=t.Ca:e={"X-WebChannel-Client-Profile":t.Ca}),this.g.U=e,(e=t&&t.cc)&&!K(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!K(t)&&(this.g.F=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new sn(this)}function tn(e){dt.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const i in t){e=i;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function nn(){ft.call(this),this.status=1}function sn(e){this.g=e}function rn(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}function on(e,t,i){i||(i=0);var n=Array(16);if("string"==typeof t)for(var s=0;16>s;++s)n[s]=t.charCodeAt(i++)|t.charCodeAt(i++)<<8|t.charCodeAt(i++)<<16|t.charCodeAt(i++)<<24;else for(s=0;16>s;++s)n[s]=t[i++]|t[i++]<<8|t[i++]<<16|t[i++]<<24;t=e.g[0],i=e.g[1],s=e.g[2];var r=e.g[3],o=t+(r^i&(s^r))+n[0]+3614090360&4294967295;o=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=(i=(s=(r=(t=i+(o<<7&4294967295|o>>>25))+((o=r+(s^t&(i^s))+n[1]+3905402710&4294967295)<<12&4294967295|o>>>20))+((o=s+(i^r&(t^i))+n[2]+606105819&4294967295)<<17&4294967295|o>>>15))+((o=i+(t^s&(r^t))+n[3]+3250441966&4294967295)<<22&4294967295|o>>>10))+((o=t+(r^i&(s^r))+n[4]+4118548399&4294967295)<<7&4294967295|o>>>25))+((o=r+(s^t&(i^s))+n[5]+1200080426&4294967295)<<12&4294967295|o>>>20))+((o=s+(i^r&(t^i))+n[6]+2821735955&4294967295)<<17&4294967295|o>>>15))+((o=i+(t^s&(r^t))+n[7]+4249261313&4294967295)<<22&4294967295|o>>>10))+((o=t+(r^i&(s^r))+n[8]+1770035416&4294967295)<<7&4294967295|o>>>25))+((o=r+(s^t&(i^s))+n[9]+2336552879&4294967295)<<12&4294967295|o>>>20))+((o=s+(i^r&(t^i))+n[10]+4294925233&4294967295)<<17&4294967295|o>>>15))+((o=i+(t^s&(r^t))+n[11]+2304563134&4294967295)<<22&4294967295|o>>>10))+((o=t+(r^i&(s^r))+n[12]+1804603682&4294967295)<<7&4294967295|o>>>25))+((o=r+(s^t&(i^s))+n[13]+4254626195&4294967295)<<12&4294967295|o>>>20))+((o=s+(i^r&(t^i))+n[14]+2792965006&4294967295)<<17&4294967295|o>>>15))+((o=i+(t^s&(r^t))+n[15]+1236535329&4294967295)<<22&4294967295|o>>>10))+((o=t+(s^r&(i^s))+n[1]+4129170786&4294967295)<<5&4294967295|o>>>27))+((o=r+(i^s&(t^i))+n[6]+3225465664&4294967295)<<9&4294967295|o>>>23))+((o=s+(t^i&(r^t))+n[11]+643717713&4294967295)<<14&4294967295|o>>>18))+((o=i+(r^t&(s^r))+n[0]+3921069994&4294967295)<<20&4294967295|o>>>12))+((o=t+(s^r&(i^s))+n[5]+3593408605&4294967295)<<5&4294967295|o>>>27))+((o=r+(i^s&(t^i))+n[10]+38016083&4294967295)<<9&4294967295|o>>>23))+((o=s+(t^i&(r^t))+n[15]+3634488961&4294967295)<<14&4294967295|o>>>18))+((o=i+(r^t&(s^r))+n[4]+3889429448&4294967295)<<20&4294967295|o>>>12))+((o=t+(s^r&(i^s))+n[9]+568446438&4294967295)<<5&4294967295|o>>>27))+((o=r+(i^s&(t^i))+n[14]+3275163606&4294967295)<<9&4294967295|o>>>23))+((o=s+(t^i&(r^t))+n[3]+4107603335&4294967295)<<14&4294967295|o>>>18))+((o=i+(r^t&(s^r))+n[8]+1163531501&4294967295)<<20&4294967295|o>>>12))+((o=t+(s^r&(i^s))+n[13]+2850285829&4294967295)<<5&4294967295|o>>>27))+((o=r+(i^s&(t^i))+n[2]+4243563512&4294967295)<<9&4294967295|o>>>23))+((o=s+(t^i&(r^t))+n[7]+1735328473&4294967295)<<14&4294967295|o>>>18))+((o=i+(r^t&(s^r))+n[12]+2368359562&4294967295)<<20&4294967295|o>>>12))+((o=t+(i^s^r)+n[5]+4294588738&4294967295)<<4&4294967295|o>>>28))+((o=r+(t^i^s)+n[8]+2272392833&4294967295)<<11&4294967295|o>>>21))+((o=s+(r^t^i)+n[11]+1839030562&4294967295)<<16&4294967295|o>>>16))+((o=i+(s^r^t)+n[14]+4259657740&4294967295)<<23&4294967295|o>>>9))+((o=t+(i^s^r)+n[1]+2763975236&4294967295)<<4&4294967295|o>>>28))+((o=r+(t^i^s)+n[4]+1272893353&4294967295)<<11&4294967295|o>>>21))+((o=s+(r^t^i)+n[7]+4139469664&4294967295)<<16&4294967295|o>>>16))+((o=i+(s^r^t)+n[10]+3200236656&4294967295)<<23&4294967295|o>>>9))+((o=t+(i^s^r)+n[13]+681279174&4294967295)<<4&4294967295|o>>>28))+((o=r+(t^i^s)+n[0]+3936430074&4294967295)<<11&4294967295|o>>>21))+((o=s+(r^t^i)+n[3]+3572445317&4294967295)<<16&4294967295|o>>>16))+((o=i+(s^r^t)+n[6]+76029189&4294967295)<<23&4294967295|o>>>9))+((o=t+(i^s^r)+n[9]+3654602809&4294967295)<<4&4294967295|o>>>28))+((o=r+(t^i^s)+n[12]+3873151461&4294967295)<<11&4294967295|o>>>21))+((o=s+(r^t^i)+n[15]+530742520&4294967295)<<16&4294967295|o>>>16))+((o=i+(s^r^t)+n[2]+3299628645&4294967295)<<23&4294967295|o>>>9))+((o=t+(s^(i|~r))+n[0]+4096336452&4294967295)<<6&4294967295|o>>>26))+((o=r+(i^(t|~s))+n[7]+1126891415&4294967295)<<10&4294967295|o>>>22))+((o=s+(t^(r|~i))+n[14]+2878612391&4294967295)<<15&4294967295|o>>>17))+((o=i+(r^(s|~t))+n[5]+4237533241&4294967295)<<21&4294967295|o>>>11))+((o=t+(s^(i|~r))+n[12]+1700485571&4294967295)<<6&4294967295|o>>>26))+((o=r+(i^(t|~s))+n[3]+2399980690&4294967295)<<10&4294967295|o>>>22))+((o=s+(t^(r|~i))+n[10]+4293915773&4294967295)<<15&4294967295|o>>>17))+((o=i+(r^(s|~t))+n[1]+2240044497&4294967295)<<21&4294967295|o>>>11))+((o=t+(s^(i|~r))+n[8]+1873313359&4294967295)<<6&4294967295|o>>>26))+((o=r+(i^(t|~s))+n[15]+4264355552&4294967295)<<10&4294967295|o>>>22))+((o=s+(t^(r|~i))+n[6]+2734768916&4294967295)<<15&4294967295|o>>>17))+((o=i+(r^(s|~t))+n[13]+1309151649&4294967295)<<21&4294967295|o>>>11))+((r=(t=i+((o=t+(s^(i|~r))+n[4]+4149444226&4294967295)<<6&4294967295|o>>>26))+((o=r+(i^(t|~s))+n[11]+3174756917&4294967295)<<10&4294967295|o>>>22))^((s=r+((o=s+(t^(r|~i))+n[2]+718787259&4294967295)<<15&4294967295|o>>>17))|~t))+n[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(s+(o<<21&4294967295|o>>>11))&4294967295,e.g[2]=e.g[2]+s&4294967295,e.g[3]=e.g[3]+r&4294967295}function an(e,t){this.h=t;for(var i=[],n=!0,s=e.length-1;0<=s;s--){var r=0|e[s];n&&r==t||(i[s]=r,n=!1)}this.g=i}(S=_i.prototype).Oa=function(e){this.M=e},S.ha=function(e,t,i,n){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+e);t=t?t.toUpperCase():"GET",this.I=e,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():lt.g(),this.C=this.u?ct(this.u):ct(lt),this.g.onreadystatechange=D(this.La,this);try{this.G=!0,this.g.open(t,String(e),!0),this.G=!1}catch(r){return void ki(this,r)}if(e=i||"",i=new Map(this.headers),n)if(Object.getPrototypeOf(n)===Object.prototype)for(var s in n)i.set(s,n[s]);else{if("function"!=typeof n.keys||"function"!=typeof n.get)throw Error("Unknown input type for opt_headers: "+String(n));for(const e of n.keys())i.set(e,n.get(e))}n=Array.from(i.keys()).find(e=>"content-type"==e.toLowerCase()),s=C.FormData&&e instanceof C.FormData,!(0<=j(bi,t))||n||s||i.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[o,a]of i)this.g.setRequestHeader(o,a);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{Ri(this),0<this.B&&((this.L=function(e){return X&&"number"==typeof e.timeout&&void 0!==e.ontimeout}(this.g))?(this.g.timeout=this.B,this.g.ontimeout=D(this.ua,this)):this.A=Ke(this.ua,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(r){ki(this,r)}},S.ua=function(){void 0!==R&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,Re(this,"timeout"),this.abort(8))},S.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,Re(this,"complete"),Re(this,"abort"),Ai(this))},S.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Ai(this,!0)),_i.$.N.call(this)},S.La=function(){this.s||(this.G||this.v||this.l?Si(this):this.kb())},S.kb=function(){Si(this)},S.isActive=function(){return!!this.g},S.da=function(){try{return 2<Ci(this)?this.g.status:-1}catch(G){return-1}},S.ja=function(){try{return this.g?this.g.responseText:""}catch(G){return""}},S.Wa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),wi(t)}},S.Ia=function(){return this.m},S.Sa=function(){return"string"==typeof this.j?this.j:String(this.j)},(S=Di.prototype).ra=8,S.H=1,S.Na=function(e){if(this.m)if(this.m=null,1==this.H){if(!e){this.W=Math.floor(1e5*Math.random()),e=this.W++;const s=new gt(this,this.l,e);let r=this.s;if(this.U&&(r?(r=ue(r),fe(r,this.U)):r=this.U),null!==this.o||this.O||(s.I=r,r=null),this.P)e:{for(var t=0,i=0;i<this.j.length;i++){var n=this.j[i];if(void 0===(n="__data__"in n.map&&"string"==typeof(n=n.map.__data__)?n.length:void 0))break;if(4096<(t+=n)){t=i;break e}if(4096===t||i===this.j.length-1){t=i+1;break e}}t=1e3}else t=1e3;t=zi(this,s,t),jt(i=Dt(this.I),"RID",e),jt(i,"CVER",22),this.F&&jt(i,"X-HTTP-Session-Id",this.F),Hi(this,i),r&&(this.O?t="headers="+encodeURIComponent(String(Oi(r)))+"&"+t:this.o&&Ni(i,this.o,r)),oi(this.i,s),this.bb&&jt(i,"TYPE","init"),this.P?(jt(i,"$req",t),jt(i,"SID","null"),s.aa=!0,_t(s,i,null)):_t(s,i,t),this.H=2}}else 3==this.H&&(e?Fi(this,e):0==this.j.length||ni(this.i)||Fi(this))},S.Ma=function(){if(this.u=null,qi(this),this.ca&&!(this.M||null==this.g||0>=this.S)){var e=2*this.S;this.l.info("BP detection timer enabled: "+e),this.B=ot(D(this.jb,this),e)}},S.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,st(10),Ui(this),qi(this))},S.ib=function(){null!=this.v&&(this.v=null,Ui(this),Ki(this),st(19))},S.pb=function(e){e?(this.l.info("Successfully pinged google.com"),st(2)):(this.l.info("Failed to ping google.com"),st(1))},S.isActive=function(){return!!this.h&&this.h.isActive(this)},(S=Zi.prototype).Ba=function(){},S.Aa=function(){},S.za=function(){},S.ya=function(){},S.isActive=function(){return!0},S.Va=function(){},U(en,Ae),en.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var e=this.g,t=this.l,i=this.h||void 0;st(0),e.Y=t,e.na=i||{},e.G=e.aa,e.I=Yi(e,null,e.Y),ji(e)},en.prototype.close=function(){Mi(this.g)},en.prototype.u=function(e){var t=this.g;if("string"==typeof e){var i={};i.__data__=e,e=i}else this.v&&((i={}).__data__=Pe(e),e=i);t.j.push(new ei(t.fb++,e)),3==t.H&&ji(t)},en.prototype.N=function(){this.g.h=null,delete this.j,Mi(this.g),delete this.g,en.$.N.call(this)},U(tn,dt),U(nn,ft),U(sn,Zi),sn.prototype.Ba=function(){Re(this.g,"a")},sn.prototype.Aa=function(e){Re(this.g,new tn(e))},sn.prototype.za=function(e){Re(this.g,new nn)},sn.prototype.ya=function(){Re(this.g,"b")},U(rn,function(){this.blockSize=-1}),rn.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0},rn.prototype.j=function(e,t){void 0===t&&(t=e.length);for(var i=t-this.blockSize,n=this.m,s=this.h,r=0;r<t;){if(0==s)for(;r<=i;)on(this,e,r),r+=this.blockSize;if("string"==typeof e){for(;r<t;)if(n[s++]=e.charCodeAt(r++),s==this.blockSize){on(this,n),s=0;break}}else for(;r<t;)if(n[s++]=e[r++],s==this.blockSize){on(this,n),s=0;break}}this.h=s,this.i+=t},rn.prototype.l=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var i=8*this.i;for(t=e.length-8;t<e.length;++t)e[t]=255&i,i/=256;for(this.j(e),e=Array(16),t=i=0;4>t;++t)for(var n=0;32>n;n+=8)e[i++]=this.g[t]>>>n&255;return e};var hn={};function cn(e){return-128<=e&&128>e?function(e,t){var i=hn;return Object.prototype.hasOwnProperty.call(i,e)?i[e]:i[e]=t(e)}(e,function(e){return new an([0|e],0>e?-1:0)}):new an([0|e],0>e?-1:0)}function ln(e){if(isNaN(e)||!isFinite(e))return dn;if(0>e)return vn(ln(-e));for(var t=[],i=1,n=0;e>=i;n++)t[n]=e/i|0,i*=un;return new an(t,0)}var un=4294967296,dn=cn(0),fn=cn(1),pn=cn(16777216);function gn(e){if(0!=e.h)return!1;for(var t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function mn(e){return-1==e.h}function vn(e){for(var t=e.g.length,i=[],n=0;n<t;n++)i[n]=~e.g[n];return new an(i,~e.h).add(fn)}function yn(e,t){return e.add(vn(t))}function wn(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function _n(e,t){this.g=e,this.h=t}function Tn(e,t){if(gn(t))throw Error("division by zero");if(gn(e))return new _n(dn,dn);if(mn(e))return t=Tn(vn(e),t),new _n(vn(t.g),vn(t.h));if(mn(t))return t=Tn(e,vn(t)),new _n(vn(t.g),t.h);if(30<e.g.length){if(mn(e)||mn(t))throw Error("slowDivide_ only works with positive integers.");for(var i=fn,n=t;0>=n.X(e);)i=In(i),n=In(n);var s=bn(i,1),r=bn(n,1);for(n=bn(n,2),i=bn(i,2);!gn(n);){var o=r.add(n);0>=o.X(e)&&(s=s.add(i),r=o),n=bn(n,1),i=bn(i,1)}return t=yn(e,s.R(t)),new _n(s,t)}for(s=dn;0<=e.X(t);){for(i=Math.max(1,Math.floor(e.ea()/t.ea())),n=48>=(n=Math.ceil(Math.log(i)/Math.LN2))?1:Math.pow(2,n-48),o=(r=ln(i)).R(t);mn(o)||0<o.X(e);)o=(r=ln(i-=n)).R(t);gn(r)&&(r=fn),s=s.add(r),e=yn(e,o)}return new _n(s,e)}function In(e){for(var t=e.g.length+1,i=[],n=0;n<t;n++)i[n]=e.D(n)<<1|e.D(n-1)>>>31;return new an(i,e.h)}function bn(e,t){var i=t>>5;t%=32;for(var n=e.g.length-i,s=[],r=0;r<n;r++)s[r]=0<t?e.D(r+i)>>>t|e.D(r+i+1)<<32-t:e.D(r+i);return new an(s,e.h)}(S=an.prototype).ea=function(){if(mn(this))return-vn(this).ea();for(var e=0,t=1,i=0;i<this.g.length;i++){var n=this.D(i);e+=(0<=n?n:un+n)*t,t*=un}return e},S.toString=function(e){if(2>(e=e||10)||36<e)throw Error("radix out of range: "+e);if(gn(this))return"0";if(mn(this))return"-"+vn(this).toString(e);for(var t=ln(Math.pow(e,6)),i=this,n="";;){var s=Tn(i,t).g,r=((0<(i=yn(i,s.R(t))).g.length?i.g[0]:i.h)>>>0).toString(e);if(gn(i=s))return r+n;for(;6>r.length;)r="0"+r;n=r+n}},S.D=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h},S.X=function(e){return mn(e=yn(this,e))?-1:gn(e)?0:1},S.abs=function(){return mn(this)?vn(this):this},S.add=function(e){for(var t=Math.max(this.g.length,e.g.length),i=[],n=0,s=0;s<=t;s++){var r=n+(65535&this.D(s))+(65535&e.D(s)),o=(r>>>16)+(this.D(s)>>>16)+(e.D(s)>>>16);n=o>>>16,r&=65535,o&=65535,i[s]=o<<16|r}return new an(i,-2147483648&i[i.length-1]?-1:0)},S.R=function(e){if(gn(this)||gn(e))return dn;if(mn(this))return mn(e)?vn(this).R(vn(e)):vn(vn(this).R(e));if(mn(e))return vn(this.R(vn(e)));if(0>this.X(pn)&&0>e.X(pn))return ln(this.ea()*e.ea());for(var t=this.g.length+e.g.length,i=[],n=0;n<2*t;n++)i[n]=0;for(n=0;n<this.g.length;n++)for(var s=0;s<e.g.length;s++){var r=this.D(n)>>>16,o=65535&this.D(n),a=e.D(s)>>>16,h=65535&e.D(s);i[2*n+2*s]+=o*h,wn(i,2*n+2*s),i[2*n+2*s+1]+=r*h,wn(i,2*n+2*s+1),i[2*n+2*s+1]+=o*a,wn(i,2*n+2*s+1),i[2*n+2*s+2]+=r*a,wn(i,2*n+2*s+2)}for(n=0;n<t;n++)i[n]=i[2*n+1]<<16|i[2*n];for(n=t;n<2*t;n++)i[n]=0;return new an(i,0)},S.gb=function(e){return Tn(this,e).h},S.and=function(e){for(var t=Math.max(this.g.length,e.g.length),i=[],n=0;n<t;n++)i[n]=this.D(n)&e.D(n);return new an(i,this.h&e.h)},S.or=function(e){for(var t=Math.max(this.g.length,e.g.length),i=[],n=0;n<t;n++)i[n]=this.D(n)|e.D(n);return new an(i,this.h|e.h)},S.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),i=[],n=0;n<t;n++)i[n]=this.D(n)^e.D(n);return new an(i,this.h^e.h)},en.prototype.send=en.prototype.u,en.prototype.open=en.prototype.m,en.prototype.close=en.prototype.close,at.NO_ERROR=0,at.TIMEOUT=8,at.HTTP_ERROR=6,ut.OPEN="a",ut.CLOSE="b",ut.ERROR="c",ut.MESSAGE="d",Ae.prototype.listen=Ae.prototype.O,_i.prototype.listenOnce=_i.prototype.P,_i.prototype.getLastError=_i.prototype.Sa,_i.prototype.getLastErrorCode=_i.prototype.Ia,_i.prototype.getStatus=_i.prototype.da,_i.prototype.getResponseJson=_i.prototype.Wa,_i.prototype.getResponseText=_i.prototype.ja,_i.prototype.send=_i.prototype.ha,_i.prototype.setWithCredentials=_i.prototype.Oa,rn.prototype.digest=rn.prototype.l,rn.prototype.reset=rn.prototype.reset,rn.prototype.update=rn.prototype.j,an.prototype.add=an.prototype.add,an.prototype.multiply=an.prototype.R,an.prototype.modulo=an.prototype.gb,an.prototype.compare=an.prototype.X,an.prototype.toNumber=an.prototype.ea,an.prototype.toString=an.prototype.toString,an.prototype.getBits=an.prototype.D,an.fromNumber=ln,an.fromString=function e(t,i){if(0==t.length)throw Error("number format error: empty string");if(2>(i=i||10)||36<i)throw Error("radix out of range: "+i);if("-"==t.charAt(0))return vn(e(t.substring(1),i));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=ln(Math.pow(i,8)),s=dn,r=0;r<t.length;r+=8){var o=Math.min(8,t.length-r),a=parseInt(t.substring(r,r+o),i);8>o?(o=ln(Math.pow(i,o)),s=s.R(o).add(ln(a))):s=(s=s.R(n)).add(ln(a))}return s};var kn=an;const En="@firebase/firestore";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Sn.UNAUTHENTICATED=new Sn(null),Sn.GOOGLE_CREDENTIALS=new Sn("google-credentials-uid"),Sn.FIRST_PARTY=new Sn("first-party-uid"),Sn.MOCK_USER=new Sn("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let An="9.23.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn=new r("@firebase/firestore");function Cn(e,...t){if(Rn.logLevel<=o.DEBUG){const i=t.map(On);Rn.debug(`Firestore (${An}): ${e}`,...i)}}function Pn(e,...t){if(Rn.logLevel<=o.ERROR){const i=t.map(On);Rn.error(`Firestore (${An}): ${e}`,...i)}}function On(e){if("string"==typeof e)return e;try{return t=e,JSON.stringify(t)}catch(i){return e}
/**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nn(e="Unexpected state"){const t=`FIRESTORE (${An}) INTERNAL ASSERTION FAILED: `+e;throw Pn(t),new Error(t)}function Ln(e,t){e||Nn()}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dn="cancelled",Mn="invalid-argument",Un="failed-precondition",xn="unavailable";class jn extends a{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class zn{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Sn.UNAUTHENTICATED))}shutdown(){}}class Vn{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Kn{constructor(e){this.t=e,this.currentUser=Sn.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let i=this.i;const n=e=>this.i!==i?(i=this.i,t(e)):Promise.resolve();let s=new Fn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Fn,e.enqueueRetryable(()=>n(this.currentUser))};const r=()=>{const t=s;e.enqueueRetryable(async()=>{await t.promise,await n(this.currentUser)})},o=e=>{Cn("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),r()};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(Cn("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Fn)}},0),r()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(Cn("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(Ln("string"==typeof t.accessToken),new Hn(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return Ln(null===e||"string"==typeof e),new Sn(e)}}class $n{constructor(e,t,i){this.h=e,this.l=t,this.m=i,this.type="FirstParty",this.user=Sn.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);const e=this.p();return e&&this.g.set("Authorization",e),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class qn{constructor(e,t,i){this.h=e,this.l=t,this.m=i}getToken(){return Promise.resolve(new $n(this.h,this.l,this.m))}start(e,t){e.enqueueRetryable(()=>t(Sn.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Bn{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Gn{constructor(e){this.I=e,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(e,t){const i=e=>{null!=e.error&&Cn("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const i=e.token!==this.T;return this.T=e.token,Cn("FirebaseAppCheckTokenProvider",`Received ${i?"new":"existing"} token.`),i?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>i(t))};const n=e=>{Cn("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.I.onInit(e=>n(e)),setTimeout(()=>{if(!this.appCheck){const e=this.I.getImmediate({optional:!0});e?n(e):Cn("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(Ln("string"==typeof e.token),this.T=e.token,new Bn(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wn(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),i=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(i);else for(let n=0;n<e;n++)i[n]=Math.floor(256*Math.random());return i}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(256/62);let i="";for(;i.length<20;){const n=Wn(40);for(let s=0;s<n.length;++s)i.length<20&&n[s]<t&&(i+=e.charAt(n[s]%62))}return i}}function Jn(e){return"IndexedDbTransactionError"===e.name}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(e,t,i,n,s,r,o,a,h){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=n,this.ssl=s,this.forceLongPolling=r,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=h}}class Qn{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Qn("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof Qn&&e.projectId===this.projectId&&e.database===this.database}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Zn,es;function ts(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(es=Zn||(Zn={}))[es.OK=0]="OK",es[es.CANCELLED=1]="CANCELLED",es[es.UNKNOWN=2]="UNKNOWN",es[es.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",es[es.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",es[es.NOT_FOUND=5]="NOT_FOUND",es[es.ALREADY_EXISTS=6]="ALREADY_EXISTS",es[es.PERMISSION_DENIED=7]="PERMISSION_DENIED",es[es.UNAUTHENTICATED=16]="UNAUTHENTICATED",es[es.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",es[es.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",es[es.ABORTED=10]="ABORTED",es[es.OUT_OF_RANGE=11]="OUT_OF_RANGE",es[es.UNIMPLEMENTED=12]="UNIMPLEMENTED",es[es.INTERNAL=13]="INTERNAL",es[es.UNAVAILABLE=14]="UNAVAILABLE",es[es.DATA_LOSS=15]="DATA_LOSS",
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
new kn([4294967295,4294967295],0);class is{constructor(e,t,i=1e3,n=1.5,s=6e4){this.ii=e,this.timerId=t,this.Po=i,this.bo=n,this.Vo=s,this.So=0,this.Do=null,this.Co=Date.now(),this.reset()}reset(){this.So=0}xo(){this.So=this.Vo}No(e){this.cancel();const t=Math.floor(this.So+this.ko()),i=Math.max(0,Date.now()-this.Co),n=Math.max(0,t-i);n>0&&Cn("ExponentialBackoff",`Backing off for ${n} ms (base delay: ${this.So} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.Do=this.ii.enqueueAfterDelay(this.timerId,n,()=>(this.Co=Date.now(),e())),this.So*=this.bo,this.So<this.Po&&(this.So=this.Po),this.So>this.Vo&&(this.So=this.Vo)}Mo(){null!==this.Do&&(this.Do.skipDelay(),this.Do=null)}cancel(){null!==this.Do&&(this.Do.cancel(),this.Do=null)}ko(){return(Math.random()-.5)*this.So}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e,t,i,n,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=n,this.removalCallback=s,this.deferred=new Fn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}static createAndSchedule(e,t,i,n,s){const r=Date.now()+i,o=new ns(e,t,r,n,s);return o.start(i),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new jn(Dn,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ss{constructor(e,t,i,n){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this.databaseInfo=n,this.user=Sn.UNAUTHENTICATED,this.clientId=Xn.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(i,async e=>{Cn("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(i,e=>(Cn("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new jn(Un,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Fn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=function(e,t){if(Pn("AsyncQueue",`${t}: ${e}`),Jn(e))return new jn(xn,`${t}: ${e}`);throw e}(t,"Failed to shutdown persistence");e.reject(i)}}),e.promise}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rs(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const os=new Map;function as(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new jn(Mn,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const i=function(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const i=(t=e).constructor?t.constructor.name:null;return i?`a custom ${i} object`:"an object"}}var t;return"function"==typeof e?"a function":Nn()}(e);throw new jn(Mn,`Expected type '${t.name}', but it was: ${i}`)}}return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e){var t,i;if(void 0===e.host){if(void 0!==e.ssl)throw new jn(Mn,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.cache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new jn(Mn,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,i,n){if(!0===t&&!0===n)throw new jn(Mn,`${e} and ${i} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=rs(null!==(i=e.experimentalLongPollingOptions)&&void 0!==i?i:{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new jn(Mn,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new jn(Mn,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new jn(Mn,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,i=e.experimentalLongPollingOptions,t.timeoutSeconds===i.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var t,i}}class cs{constructor(e,t,i,n){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new hs({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new jn(Un,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new jn(Un,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new hs(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new zn;switch(e.type){case"firstParty":return new qn(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new jn(Mn,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=os.get(e);t&&(Cn("ComponentProvider","Removing Datastore"),os.delete(e),t.terminate())}(this),Promise.resolve()}}function ls(e,t,i,n={}){var r;const a=(e=as(e,cs))._getSettings(),h=`${t}:${i}`;if("firestore.googleapis.com"!==a.host&&a.host!==h&&function(e,...t){if(Rn.logLevel<=o.WARN){const i=t.map(On);Rn.warn(`Firestore (${An}): ${e}`,...i)}}("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),e._setSettings(Object.assign(Object.assign({},a),{host:h,ssl:!1})),n.mockUserToken){let t,i;if("string"==typeof n.mockUserToken)t=n.mockUserToken,i=Sn.MOCK_USER;else{t=s(n.mockUserToken,null===(r=e._app)||void 0===r?void 0:r.options.projectId);const o=n.mockUserToken.sub||n.mockUserToken.user_id;if(!o)throw new jn(Mn,"mockUserToken must contain 'sub' or 'user_id' field!");i=new Sn(o)}e._authCredentials=new Vn(new Hn(t,i))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(){this.Gc=Promise.resolve(),this.Qc=[],this.jc=!1,this.zc=[],this.Wc=null,this.Hc=!1,this.Jc=!1,this.Yc=[],this.qo=new is(this,"async_queue_retry"),this.Xc=()=>{const e=ts();e&&Cn("AsyncQueue","Visibility state changed to "+e.visibilityState),this.qo.Mo()};const e=ts();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Xc)}get isShuttingDown(){return this.jc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Zc(),this.ta(e)}enterRestrictedMode(e){if(!this.jc){this.jc=!0,this.Jc=e||!1;const t=ts();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Xc)}}enqueue(e){if(this.Zc(),this.jc)return new Promise(()=>{});const t=new Fn;return this.ta(()=>this.jc&&this.Jc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qc.push(e),this.ea()))}async ea(){if(0!==this.Qc.length){try{await this.Qc[0](),this.Qc.shift(),this.qo.reset()}catch(e){if(!Jn(e))throw e;Cn("AsyncQueue","Operation failed with retryable error: "+e)}this.Qc.length>0&&this.qo.No(()=>this.ea())}}ta(e){const t=this.Gc.then(()=>(this.Hc=!0,e().catch(e=>{this.Wc=e,this.Hc=!1;throw Pn("INTERNAL UNHANDLED ERROR: ",function(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}(e)),e}).then(e=>(this.Hc=!1,e))));return this.Gc=t,t}enqueueAfterDelay(e,t,i){this.Zc(),this.Yc.indexOf(e)>-1&&(t=0);const n=ns.createAndSchedule(this,e,t,i,e=>this.na(e));return this.zc.push(n),n}Zc(){this.Wc&&Nn()}verifyOperationInProgress(){}async sa(){let e;do{e=this.Gc,await e}while(e!==this.Gc)}ia(e){for(const t of this.zc)if(t.timerId===e)return!0;return!1}ra(e){return this.sa().then(()=>{this.zc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.zc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.sa()})}oa(e){this.Yc.push(e)}na(e){const t=this.zc.indexOf(e);this.zc.splice(t,1)}}class ds extends cs{constructor(e,t,i,n){super(e,t,i,n),this.type="firestore",this._queue=new us,this._persistenceKey=(null==n?void 0:n.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||function(e){var t,i,n;const s=e._freezeSettings(),r=(o=e._databaseId,a=(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",h=e._persistenceKey,c=s,new Yn(o,a,h,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,rs(c.experimentalLongPollingOptions),c.useFetchStreams));var o,a,h,c;e._firestoreClient=new ss(e._authCredentials,e._appCheckCredentials,e._queue,r),(null===(i=s.cache)||void 0===i?void 0:i._offlineComponentProvider)&&(null===(n=s.cache)||void 0===n?void 0:n._onlineComponentProvider)&&(e._firestoreClient._uninitializedComponentsProvider={_offlineKind:s.cache.kind,_offline:s.cache._offlineComponentProvider,_online:s.cache._onlineComponentProvider})}(this),this._firestoreClient.terminate()}}function fs(e,t){var i={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(i[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(i[n[s]]=e[n[s]])}return i}function ps(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}!function(t,i=!0){An=h,c(new l("firestore",(e,{instanceIdentifier:t,options:n})=>{const s=e.getProvider("app").getImmediate(),r=new ds(new Kn(e.getProvider("auth-internal")),new Gn(e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new jn(Mn,'"projectId" not provided in firebase.initializeApp.');return new Qn(e.options.projectId,t)}(s,t),s);return n=Object.assign({useFetchStreams:i},n),r._setSettings(n),r},"PUBLIC").setMultipleInstances(!0)),e(En,"3.13.0",t),e(En,"3.13.0","esm2017")}(),"function"==typeof SuppressedError&&SuppressedError;const gs=ps,ms=new m("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),vs=new r("@firebase/auth");function ys(e,...t){vs.logLevel<=o.ERROR&&vs.error(`Auth (${h}): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ws(e,...t){throw Ts(e,...t)}function _s(e,...t){return Ts(e,...t)}function Ts(e,...t){if("string"!=typeof e){const i=t[0],n=[...t.slice(1)];return n[0]&&(n[0].appName=e.name),e._errorFactory.create(i,...n)}return ms.create(e,...t)}function Is(e,t,...i){if(!e)throw Ts(t,...i)}function bs(e){const t="INTERNAL ASSERTION FAILED: "+e;throw ys(t),new Error(t)}function ks(e,t){e||bs(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Es(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function Ss(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function As(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==Ss()&&"https:"!==Ss()&&!I()&&!("connection"in navigator)||navigator.onLine}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rs{constructor(e,t){this.shortDelay=e,this.longDelay=t,ks(t>e,"Short delay should be less than long delay!"),this.isMobile=_()||T()}get(){return As()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cs(e,t){ks(e.emulator,"Emulator should always be set here");const{url:i}=e.emulator;return t?`${i}${t.startsWith("/")?t.slice(1):t}`:i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:void bs("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:void bs("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:void bs("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Os={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},Ns=new Rs(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function Ds(e,t,i,n,s={}){return Ms(e,s,async()=>{let s={},r={};n&&("GET"===t?r=n:s={body:JSON.stringify(n)});const o=w(Object.assign({key:e.config.apiKey},r)).slice(1),a=await e._getAdditionalHeaders();return a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode),Ps.fetch()(Us(e,e.config.apiHost,i,o),Object.assign({method:t,headers:a,referrerPolicy:"no-referrer"},s))})}async function Ms(e,t,i){e._canInitEmulator=!1;const n=Object.assign(Object.assign({},Os),t);try{const t=new xs(e),s=await Promise.race([i(),t.promise]);t.clearNetworkTimeout();const r=await s.json();if("needConfirmation"in r)throw js(e,"account-exists-with-different-credential",r);if(s.ok&&!("errorMessage"in r))return r;{const t=s.ok?r.errorMessage:r.error.message,[i,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===i)throw js(e,"credential-already-in-use",r);if("EMAIL_EXISTS"===i)throw js(e,"email-already-in-use",r);if("USER_DISABLED"===i)throw js(e,"user-disabled",r);const a=n[i]||i.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw function(e,t,i){const n=Object.assign(Object.assign({},gs()),{[t]:i});return new m("auth","Firebase",n).create(t,{appName:e.name})}(e,a,o);ws(e,a)}}catch(s){if(s instanceof a)throw s;ws(e,"network-request-failed",{message:String(s)})}}function Us(e,t,i,n){const s=`${t}${i}?${n}`;return e.config.emulator?Cs(e.config,s):`${e.config.apiScheme}://${s}`}class xs{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(_s(this.auth,"network-request-failed")),Ns.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function js(e,t,i){const n={appName:e.name};i.email&&(n.email=i.email),i.phoneNumber&&(n.phoneNumber=i.phoneNumber);const s=_s(e,t,n);return s.customData._tokenResponse=i,s}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Fs(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}function Hs(e){return 1e3*Number(e)}function zs(e){const[t,i,n]=e.split(".");if(void 0===t||void 0===i||void 0===n)return ys("JWT malformed, contained fewer than 3 sections"),null;try{const e=b(i);return e?JSON.parse(e):(ys("Failed to decode base64 JWT payload"),null)}catch(s){return ys("Caught error parsing JWT payload as JSON",null==s?void 0:s.toString()),null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Vs(e,t,i=!1){if(i)return t;try{return await t}catch(n){throw n instanceof a&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n)&&e.auth.currentUser===e&&await e.auth.signOut(),n}}class Ks{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===(null==e?void 0:e.code)&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Fs(this.lastLoginAt),this.creationTime=Fs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qs(e){var t;const i=e.auth,n=await e.getIdToken(),s=await Vs(e,async function(e,t){return Ds(e,"POST","/v1/accounts:lookup",t)}(i,{idToken:n}));Is(null==s?void 0:s.users.length,i,"internal-error");const r=s.users[0];e._notifyReloadListener(r);const o=(null===(t=r.providerUserInfo)||void 0===t?void 0:t.length)?r.providerUserInfo.map(e=>{var{providerId:t}=e,i=fs(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}}):[];const a=(h=e.providerData,c=o,[...h.filter(e=>!c.some(t=>t.providerId===e.providerId)),...c]);var h,c;const l=e.isAnonymous,u=!(e.email&&r.passwordHash||(null==a?void 0:a.length)),d=!!l&&u,f={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new $s(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(e,f)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Bs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Is(e.idToken,"internal-error"),Is(void 0!==e.idToken,"internal-error"),Is(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):function(e){const t=zs(e);return Is(t,"internal-error"),Is(void 0!==t.exp,"internal-error"),Is(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return Is(!this.accessToken||this.refreshToken,e,"user-token-expired"),t||!this.accessToken||this.isExpired?this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:n,expiresIn:s}=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */await async function(e,t){const i=await Ms(e,{},async()=>{const i=w({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:n,apiKey:s}=e.config,r=Us(e,n,"/v1/token",`key=${s}`),o=await e._getAdditionalHeaders();return o["Content-Type"]="application/x-www-form-urlencoded",Ps.fetch()(r,{method:"POST",headers:o,body:i})});return{accessToken:i.access_token,expiresIn:i.expires_in,refreshToken:i.refresh_token}}(e,t);this.updateTokensAndExpiration(i,n,Number(s))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*i}static fromJSON(e,t){const{refreshToken:i,accessToken:n,expirationTime:s}=t,r=new Bs;return i&&(Is("string"==typeof i,"internal-error",{appName:e}),r.refreshToken=i),n&&(Is("string"==typeof n,"internal-error",{appName:e}),r.accessToken=n),s&&(Is("number"==typeof s,"internal-error",{appName:e}),r.expirationTime=s),r}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Bs,this.toJSON())}_performRefresh(){return bs("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(e,t){Is("string"==typeof e||void 0===e,"internal-error",{appName:t})}class Ws{constructor(e){var{uid:t,auth:i,stsTokenManager:n}=e,s=fs(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Ks(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new $s(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Vs(this,this.stsTokenManager.getToken(this.auth,e));return Is(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const i=p(e),n=await i.getIdToken(t),s=zs(n);Is(s&&s.exp&&s.auth_time&&s.iat,i.auth,"internal-error");const r="object"==typeof s.firebase?s.firebase:void 0,o=null==r?void 0:r.sign_in_provider;return{claims:s,token:n,authTime:Fs(Hs(s.auth_time)),issuedAtTime:Fs(Hs(s.iat)),expirationTime:Fs(Hs(s.exp)),signInProvider:o||null,signInSecondFactor:(null==r?void 0:r.sign_in_second_factor)||null}}(this,e)}reload(){return async function(e){const t=p(e);await qs(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(Is(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ws(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){Is(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await qs(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Vs(this,async function(e,t){return Ds(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,n,s,r,o,a,h,c;const l=null!==(i=t.displayName)&&void 0!==i?i:void 0,u=null!==(n=t.email)&&void 0!==n?n:void 0,d=null!==(s=t.phoneNumber)&&void 0!==s?s:void 0,f=null!==(r=t.photoURL)&&void 0!==r?r:void 0,p=null!==(o=t.tenantId)&&void 0!==o?o:void 0,g=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,m=null!==(h=t.createdAt)&&void 0!==h?h:void 0,v=null!==(c=t.lastLoginAt)&&void 0!==c?c:void 0,{uid:y,emailVerified:w,isAnonymous:_,providerData:T,stsTokenManager:I}=t;Is(y&&I,e,"internal-error");const b=Bs.fromJSON(this.name,I);Is("string"==typeof y,e,"internal-error"),Gs(l,e.name),Gs(u,e.name),Is("boolean"==typeof w,e,"internal-error"),Is("boolean"==typeof _,e,"internal-error"),Gs(d,e.name),Gs(f,e.name),Gs(p,e.name),Gs(g,e.name),Gs(m,e.name),Gs(v,e.name);const k=new Ws({uid:y,auth:e,email:u,emailVerified:w,displayName:l,isAnonymous:_,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:b,createdAt:m,lastLoginAt:v});return T&&Array.isArray(T)&&(k.providerData=T.map(e=>Object.assign({},e))),g&&(k._redirectEventId=g),k}static async _fromIdTokenResponse(e,t,i=!1){const n=new Bs;n.updateFromServerResponse(t);const s=new Ws({uid:t.localId,auth:e,stsTokenManager:n,isAnonymous:i});return await qs(s),s}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xs=new Map;function Js(e){ks(e instanceof Function,"Expected a class definition");let t=Xs.get(e);return t?(ks(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Xs.set(e,t),t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ys.type="NONE";const Qs=Ys;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zs(e,t,i){return`firebase:${e}:${t}:${i}`}class er{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:n,name:s}=this.auth;this.fullUserKey=Zs(this.userKey,n.apiKey,s),this.fullPersistenceKey=Zs("persistence",n.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ws._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new er(Js(Qs),e,i);const n=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let s=n[0]||Js(Qs);const r=Zs(i,e.config.apiKey,e.name);let o=null;for(const c of t)try{const t=await c._get(r);if(t){const i=Ws._fromJSON(e,t);c!==s&&(o=i),s=c;break}}catch(h){}const a=n.filter(e=>e._shouldAllowMigration);return s._shouldAllowMigration&&a.length?(s=a[0],o&&await s._set(r,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==s)try{await e._remove(r)}catch(h){}})),new er(s,e,i)):new er(s,e,i)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(rr(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(ir(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(ar(t))return"Blackberry";if(hr(t))return"Webos";if(nr(t))return"Safari";if((t.includes("chrome/")||sr(t))&&!t.includes("edge/"))return"Chrome";if(or(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=e.match(t);if(2===(null==i?void 0:i.length))return i[1]}return"Other"}function ir(e=g()){return/firefox\//i.test(e)}function nr(e=g()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function sr(e=g()){return/crios\//i.test(e)}function rr(e=g()){return/iemobile/i.test(e)}function or(e=g()){return/android/i.test(e)}function ar(e=g()){return/blackberry/i.test(e)}function hr(e=g()){return/webos/i.test(e)}function cr(e=g()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function lr(e=g()){return cr(e)||or(e)||hr(e)||ar(e)||/windows phone/i.test(e)||rr(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ur(e,t=[]){let i;switch(e){case"Browser":i=tr(g());break;case"Worker":i=`${tr(g())}-${e}`;break;default:i=e}const n=t.length?t.join(","):"FirebaseCore-web";return`${i}/JsCore/${h}/${n}`}async function dr(e,t){return Ds(e,"GET","/v2/recaptchaConfig",Ls(e,t))}function fr(e){return void 0!==e&&void 0!==e.enterprise}class pr{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(e=>"EMAIL_PASSWORD_PROVIDER"===e.provider&&"OFF"!==e.enforcementState)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gr(e){return new Promise((t,i)=>{const n=document.createElement("script");var s,r;n.setAttribute("src",e),n.onload=t,n.onerror=e=>{const t=_s("internal-error");t.customData=e,i(t)},n.type="text/javascript",n.charset="UTF-8",(null!==(r=null===(s=document.getElementsByTagName("head"))||void 0===s?void 0:s[0])&&void 0!==r?r:document).appendChild(n)})}class mr{constructor(e){this.type="recaptcha-enterprise",this.auth=wr(e)}async verify(e="verify",t=!1){function i(t,i,n){const s=window.grecaptcha;fr(s)?s.enterprise.ready(()=>{s.enterprise.execute(t,{action:e}).then(e=>{i(e)}).catch(()=>{i("NO_RECAPTCHA")})}):n(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((e,n)=>{(async function(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,i)=>{dr(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(n=>{if(void 0!==n.recaptchaKey){const i=new pr(n);return null==e.tenantId?e._agentRecaptchaConfig=i:e._tenantRecaptchaConfigs[e.tenantId]=i,t(i.siteKey)}i(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{i(e)})})})(this.auth).then(s=>{if(!t&&fr(window.grecaptcha))i(s,e,n);else{if("undefined"==typeof window)return void n(new Error("RecaptchaVerifier is only supported in browser"));gr("https://www.google.com/recaptcha/enterprise.js?render="+s).then(()=>{i(s,e,n)}).catch(e=>{n(e)})}}).catch(e=>{n(e)})})}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=t=>new Promise((i,n)=>{try{i(e(t))}catch(s){n(s)}});i.onAbort=t,this.queue.push(i);const n=this.queue.length-1;return()=>{this.queue[n]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const e of t)try{e()}catch(n){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==i?void 0:i.message})}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(e,t,i,n){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new _r(this),this.idTokenSubscription=new _r(this),this.beforeStateQueue=new vr(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ms,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Js(t)),this._initializationPromise=this.queue(async()=>{var i,n;if(!this._deleted&&(this.persistenceManager=await er.create(this,e),!this._deleted)){if(null===(i=this._popupRedirectResolver)||void 0===i?void 0:i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(s){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(n=this.currentUser)||void 0===n?void 0:n.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(e,!0)):void 0}async initializeCurrentUser(e){var t;const i=await this.assertedPersistence.getCurrentUser();let n=i,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,r=null==n?void 0:n._redirectEventId,o=await this.tryRedirectSignIn(e);i&&i!==r||!(null==o?void 0:o.user)||(n=o.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(r){n=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return Is(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(i){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await qs(e)}catch(t){if("auth/network-request-failed"!==(null==t?void 0:t.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const t=e?p(e):null;return t&&Is(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Is(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(Js(e))})}async initializeRecaptchaConfig(){const e=await dr(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),t=new pr(e);if(null==this.tenantId?this._agentRecaptchaConfig=t:this._tenantRecaptchaConfigs[this.tenantId]=t,t.emailPasswordEnabled){new mr(this).verify()}}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new m("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return null===e?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Js(e)||this._popupRedirectResolver;Is(t,this,"argument-error"),this.redirectPersistenceManager=await er.create(this,[Js(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e?this._currentUser:(null===(i=this.redirectUser)||void 0===i?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,n){if(this._deleted)return()=>{};const s="function"==typeof t?t:t.next.bind(t),r=this._isInitialized?Promise.resolve():this._initializationPromise;return Is(r,this,"internal-error"),r.then(()=>s(this.currentUser)),"function"==typeof t?e.addObserver(t,i,n):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Is(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ur(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await(null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const n=await this._getAppCheckToken();return n&&(t["X-Firebase-AppCheck"]=n),t}async _getAppCheckToken(){var e;const t=await(null===(e=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){vs.logLevel<=o.WARN&&vs.warn(`Auth (${h}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}function wr(e){return p(e)}class _r{constructor(e){this.auth=e,this.observer=null,this.addObserver=k(e=>this.observer=e)}get next(){return Is(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tr(e,t,i){const n=wr(e);Is(n._canInitEmulator,n,"emulator-config-failed"),Is(/^https?:\/\//.test(t),n,"invalid-emulator-scheme");const s=Ir(t),{host:r,port:o}=function(e){const t=Ir(e),i=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!i)return{host:"",port:null};const n=i[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const e=s[1];return{host:e,port:br(n.substr(e.length+1))}}{const[e,t]=n.split(":");return{host:e,port:br(t)}}}(t),a=null===o?"":`:${o}`;n.config.emulator={url:`${s}//${r}${a}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:r,port:o,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:!1})}),function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&console.info;"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */()}function Ir(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function br(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class kr{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return bs("not implemented")}_getIdTokenResponse(e){return bs("not implemented")}_linkToIdToken(e,t){return bs("not implemented")}_getReauthenticationResolver(e){return bs("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Er(e,t){return async function(e,t,i,n,s={}){const r=await Ds(e,t,i,n,s);return"mfaPendingCredential"in r&&ws(e,"multi-factor-auth-required",{_serverResponse:r}),r}(e,"POST","/v1/accounts:signInWithIdp",Ls(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr extends kr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Sr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ws("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:i,signInMethod:n}=t,s=fs(t,["providerId","signInMethod"]);if(!i||!n)return null;const r=new Sr(i,n);return r.idToken=s.idToken||void 0,r.accessToken=s.accessToken||void 0,r.secret=s.secret,r.nonce=s.nonce,r.pendingToken=s.pendingToken||null,r}_getIdTokenResponse(e){return Er(e,this.buildRequest())}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Er(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Er(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=w(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr extends Ar{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr extends Rr{constructor(){super("facebook.com")}static credential(e){return Sr._fromParams({providerId:Cr.PROVIDER_ID,signInMethod:Cr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Cr.credentialFromTaggedObject(e)}static credentialFromError(e){return Cr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Cr.credential(e.oauthAccessToken)}catch(t){return null}}}Cr.FACEBOOK_SIGN_IN_METHOD="facebook.com",Cr.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pr extends Rr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Sr._fromParams({providerId:Pr.PROVIDER_ID,signInMethod:Pr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Pr.credentialFromTaggedObject(e)}static credentialFromError(e){return Pr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return Pr.credential(t,i)}catch(n){return null}}}Pr.GOOGLE_SIGN_IN_METHOD="google.com",Pr.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Or extends Rr{constructor(){super("github.com")}static credential(e){return Sr._fromParams({providerId:Or.PROVIDER_ID,signInMethod:Or.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Or.credentialFromTaggedObject(e)}static credentialFromError(e){return Or.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Or.credential(e.oauthAccessToken)}catch(t){return null}}}Or.GITHUB_SIGN_IN_METHOD="github.com",Or.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Nr extends Rr{constructor(){super("twitter.com")}static credential(e,t){return Sr._fromParams({providerId:Nr.PROVIDER_ID,signInMethod:Nr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Nr.credentialFromTaggedObject(e)}static credentialFromError(e){return Nr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Nr.credential(t,i)}catch(n){return null}}}Nr.TWITTER_SIGN_IN_METHOD="twitter.com",Nr.PROVIDER_ID="twitter.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Lr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,n=!1){const s=await Ws._fromIdTokenResponse(e,i,n),r=Dr(i);return new Lr({user:s,providerId:r,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const n=Dr(i);return new Lr({user:e,providerId:n,_tokenResponse:i,operationType:t})}}function Dr(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr extends a{constructor(e,t,i,n){var s;super(t.code,t.message),this.operationType=i,this.user=n,Object.setPrototypeOf(this,Mr.prototype),this.customData={appName:e.name,tenantId:null!==(s=e.tenantId)&&void 0!==s?s:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,n){return new Mr(e,t,i,n)}}function Ur(e,t,i,n){return("reauthenticate"===t?i._getReauthenticationResolver(e):i._getIdTokenResponse(e)).catch(i=>{if("auth/multi-factor-auth-required"===i.code)throw Mr._fromErrorAndOperation(e,i,t,n);throw i})}const xr="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(xr,"1"),this.storage.removeItem(xr),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr extends jr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=function(){const e=g();return nr(e)||cr(e)}()&&function(){try{return!(!window||window===window.top)}catch(e){return!1}}(),this.fallbackToPolling=lr(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),n=this.localCache[t];i!==n&&e(t,n,i)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,i)=>{this.notifyListeners(e,i)});const i=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const n=this.storage.getItem(i);if(e.newValue!==n)null!==e.newValue?this.storage.setItem(i,e.newValue):this.storage.removeItem(i);else if(this.localCache[i]===e.newValue&&!t)return}const n=()=>{const e=this.storage.getItem(i);(t||this.localCache[i]!==e)&&this.notifyListeners(i,e)},s=this.storage.getItem(i);v()&&10===document.documentMode&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(n,10):n()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const n of Array.from(i))n(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Fr.type="LOCAL";const Hr=Fr;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr extends jr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}zr.type="SESSION";const Vr=zr;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Kr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const i=new Kr(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:n,data:s}=t.data,r=this.handlersMap[n];if(!(null==r?void 0:r.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:n});const o=Array.from(r).map(async e=>e(t.origin,s)),a=await function(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}(o);t.ports[0].postMessage({status:"done",eventId:i,eventType:n,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function $r(e="",t=10){let i="";for(let n=0;n<t;n++)i+=Math.floor(10*Math.random());return e+i}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Kr.receivers=[];class qr{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const n="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!n)throw new Error("connection_unavailable");let s,r;return new Promise((o,a)=>{const h=$r("",20);n.port1.start();const c=setTimeout(()=>{a(new Error("unsupported_event"))},i);r={messageChannel:n,onMessage(e){const t=e;if(t.data.eventId===h)switch(t.data.status){case"ack":clearTimeout(c),s=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),o(t.data.response);break;default:clearTimeout(c),clearTimeout(s),a(new Error("invalid_response"))}}},this.handlers.add(r),n.port1.addEventListener("message",r.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[n.port2])}).finally(()=>{r&&this.removeMessageHandler(r)})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Gr(){return void 0!==Br().WorkerGlobalScope&&"function"==typeof Br().importScripts}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Wr="firebaseLocalStorageDb",Xr="firebaseLocalStorage",Jr="fbase_key";class Yr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Qr(e,t){return e.transaction([Xr],t?"readwrite":"readonly").objectStore(Xr)}function Zr(){const e=indexedDB.open(Wr,1);return new Promise((t,i)=>{e.addEventListener("error",()=>{i(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(Xr,{keyPath:Jr})}catch(n){i(n)}}),e.addEventListener("success",async()=>{const i=e.result;i.objectStoreNames.contains(Xr)?t(i):(i.close(),await function(){const e=indexedDB.deleteDatabase(Wr);return new Yr(e).toPromise()}(),t(await Zr()))})})}async function eo(e,t,i){const n=Qr(e,!0).put({[Jr]:t,value:i});return new Yr(n).toPromise()}function to(e,t){const i=Qr(e,!0).delete(t);return new Yr(i).toPromise()}class io{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await Zr()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(i){if(t++>3)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Gr()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Kr._getInstance(Gr()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await async function(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}(),!this.activeServiceWorker)return;this.sender=new qr(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&(null===(e=i[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=i[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Zr();return await eo(e,xr,"1"),await to(e,xr),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>eo(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>async function(e,t){const i=Qr(e,!1).get(t),n=await new Yr(i).toPromise();return void 0===n?null:n.value}(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>to(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=Qr(e,!1).getAll();return new Yr(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],i=new Set;for(const{fbase_key:n,value:s}of e)i.add(n),JSON.stringify(this.localCache[n])!==JSON.stringify(s)&&(this.notifyListeners(n,s),t.push(n));for(const n of Object.keys(this.localCache))this.localCache[n]&&!i.has(n)&&(this.notifyListeners(n,null),t.push(n));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const n of Array.from(i))n(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}io.type="LOCAL";const no=io;new Rs(3e4,6e4);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class so extends kr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Er(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Er(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Er(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ro(e){
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(e,t,i=!1){const n="signIn",s=await Ur(e,n,t),r=await Lr._fromIdTokenResponse(e,n,s);return i||await e._updateCurrentUser(r.user),r}(e.auth,new so(e),e.bypassAuthState)}function oo(e){const{auth:t,user:i}=e;return Is(i,t,"internal-error"),
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t,i=!1){const{auth:n}=e,s="reauthenticate";try{const r=await Vs(e,Ur(n,s,t,e),i);Is(r.idToken,n,"internal-error");const o=zs(r.idToken);Is(o,n,"internal-error");const{sub:a}=o;return Is(e.uid===a,n,"user-mismatch"),Lr._forOperation(e,s,r)}catch(r){throw"auth/user-not-found"===(null==r?void 0:r.code)&&ws(n,"user-mismatch"),r}}(i,new so(e),e.bypassAuthState)}async function ao(e){const{auth:t,user:i}=e;return Is(i,t,"internal-error"),async function(e,t,i=!1){const n=await Vs(e,t._linkToIdToken(e.auth,await e.getIdToken()),i);return Lr._forOperation(e,"link",n)}(i,new so(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(e,t,i,n,s=!1){this.auth=e,this.resolver=i,this.user=n,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:n,tenantId:s,error:r,type:o}=e;if(r)return void this.reject(r);const a={auth:this.auth,requestUri:t,sessionId:i,tenantId:s||void 0,postBody:n||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ro;case"linkViaPopup":case"linkViaRedirect":return ao;case"reauthViaPopup":case"reauthViaRedirect":return oo;default:ws(this.auth,"internal-error")}}resolve(e){ks(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ks(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const co=new Rs(2e3,1e4);class lo extends ho{constructor(e,t,i,n,s){super(e,t,n,s),this.provider=i,this.authWindow=null,this.pollId=null,lo.currentPopupAction&&lo.currentPopupAction.cancel(),lo.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Is(e,this.auth,"internal-error"),e}async onExecution(){ks(1===this.filter.length,"Popup operations only handle one event");const e=$r();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(_s(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(_s(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,lo.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;(null===(i=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===i?void 0:i.closed)?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(_s(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,co.get())};e()}}lo.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const uo="pendingRedirect",fo=new Map;class po extends ho{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=fo.get(this.auth._key());if(!e){try{const t=await async function(e,t){const i=function(e){return Zs(uo,e.config.apiKey,e.name)}(t),n=function(e){return Js(e._redirectPersistence)}(e);if(!(await n._isAvailable()))return!1;const s="true"===await n._get(i);return await n._remove(i),s}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}fo.set(this.auth._key(),e)}return this.bypassAuthState||fo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function go(e,t){fo.set(e._key(),t)}async function mo(e,t,i=!1){const n=wr(e),s=
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){return t?Js(t):(Is(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}(n,t),r=new po(n,s,i),o=await r.execute();return o&&!i&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,t)),o}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return wo(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!wo(e)){const n=(null===(i=e.error.code)||void 0===i?void 0:i.split("auth/")[1])||"internal-error";t.onError(_s(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(yo(e))}saveEventToCache(e){this.cachedEventUids.add(yo(e)),this.lastProcessedEventTime=Date.now()}}function yo(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function wo({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null==t?void 0:t.code)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _o=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,To=/^https?/;async function Io(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return Ds(e,"GET","/v1/projects",t)}(e);for(const n of t)try{if(bo(n))return}catch(i){}ws(e,"unauthorized-domain")}function bo(e){const t=Es(),{protocol:i,hostname:n}=new URL(t);if(e.startsWith("chrome-extension://")){const s=new URL(e);return""===s.hostname&&""===n?"chrome-extension:"===i&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===i&&s.hostname===n}if(!To.test(i))return!1;if(_o.test(e))return n===e;const s=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ko=new Rs(3e4,6e4);function Eo(){const e=Br().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let i=0;i<e.CP.length;i++)e.CP[i]=null}function So(e){return new Promise((t,i)=>{var n,s,r;function o(){Eo(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Eo(),i(_s(e,"network-request-failed"))},timeout:ko.get()})}if(null===(s=null===(n=Br().gapi)||void 0===n?void 0:n.iframes)||void 0===s?void 0:s.Iframe)t(gapi.iframes.getContext());else{if(!(null===(r=Br().gapi)||void 0===r?void 0:r.load)){const t=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return Br()[t]=()=>{gapi.load?o():i(_s(e,"network-request-failed"))},gr(`https://apis.google.com/js/api.js?onload=${t}`).catch(e=>i(e))}o()}}).catch(e=>{throw Ao=null,e})}let Ao=null;
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ro=new Rs(5e3,15e3),Co={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Po=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Oo(e){const t=e.config;Is(t.authDomain,e,"auth-domain-config-required");const i=t.emulator?Cs(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,n={apiKey:t.apiKey,appName:e.name,v:h},s=Po.get(e.config.apiHost);s&&(n.eid=s);const r=e._getFrameworks();return r.length&&(n.fw=r.join(",")),`${i}?${w(n).slice(1)}`}async function No(e){const t=await function(e){return Ao=Ao||So(e),Ao}(e),i=Br().gapi;return Is(i,e,"internal-error"),t.open({where:document.body,url:Oo(e),messageHandlersFilter:i.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Co,dontclear:!0},t=>new Promise(async(i,n)=>{await t.restyle({setHideOnLeave:!1});const s=_s(e,"network-request-failed"),r=Br().setTimeout(()=>{n(s)},Ro.get());function o(){Br().clearTimeout(r),i(t)}t.ping(o).then(o,()=>{n(s)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class Do{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Mo(e,t,i,n=500,s=600){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let a="";const h=Object.assign(Object.assign({},Lo),{width:n.toString(),height:s.toString(),top:r,left:o}),c=g().toLowerCase();i&&(a=sr(c)?"_blank":i),ir(c)&&(t=t||"http://localhost",h.scrollbars="yes");const l=Object.entries(h).reduce((e,[t,i])=>`${e}${t}=${i},`,"");if(function(e=g()){var t;return cr(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(c)&&"_self"!==a)return function(e,t){const i=document.createElement("a");i.href=e,i.target=t;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),i.dispatchEvent(n)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t||"",a),new Do(null);const u=window.open(t||"",a,l);Is(u,e,"popup-blocked");try{u.focus()}catch(d){}return new Do(u)}const Uo="__/auth/handler",xo="emulator/auth/handler",jo=encodeURIComponent("fac");async function Fo(e,t,i,n,s,r){Is(e.config.authDomain,e,"auth-domain-config-required"),Is(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:i,redirectUrl:n,v:h,eventId:s};if(t instanceof Ar){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",y(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))o[e]=t}if(t instanceof Rr){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const h of Object.keys(a))void 0===a[h]&&delete a[h];const c=await e._getAppCheckToken(),l=c?`#${jo}=${encodeURIComponent(c)}`:"";return`${function({config:e}){if(!e.emulator)return`https://${e.authDomain}/${Uo}`;return Cs(e,xo)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)}?${w(a).slice(1)}${l}`}const Ho="webStorageSupport";const zo=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Vr,this._completeRedirectFn=mo,this._overrideRedirectResult=go}async _openPopup(e,t,i,n){var s;ks(null===(s=this.eventManagers[e._key()])||void 0===s?void 0:s.manager,"_initialize() not called before _openPopup()");return Mo(e,await Fo(e,t,i,Es(),n),$r())}async _openRedirect(e,t,i,n){await this._originValidation(e);return function(e){Br().location.href=e}(await Fo(e,t,i,Es(),n)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:i}=this.eventManagers[t];return e?Promise.resolve(e):(ks(i,"If manager is not set, promise should be"),i)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await No(e),i=new vo(e);return t.register("authEvent",t=>{Is(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:i.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ho,{type:Ho},i=>{var n;const s=null===(n=null==i?void 0:i[0])||void 0===n?void 0:n[Ho];void 0!==s&&t(!!s),ws(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Io(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return lr()||nr()||cr()}};var Vo="@firebase/auth",Ko="0.23.2";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class $o{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Is(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const qo=u("authIdTokenMaxAge")||300;let Bo=null;function Go(e=t()){const n=i(e,"auth");if(n.isInitialized())return n.getImmediate();const s=function(e,t){const n=i(e,"auth");if(n.isInitialized()){const e=n.getImmediate(),i=n.getOptions();if(f(i,null!=t?t:{}))return e;ws(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:zo,persistence:[no,Hr,Vr]}),r=u("authTokenSyncURL");if(r){const e=(o=r,async e=>{const t=e&&await e.getIdTokenResult(),i=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>qo)return;const n=null==t?void 0:t.token;Bo!==n&&(Bo=n,await fetch(o,{method:n?"POST":"DELETE",headers:n?{Authorization:`Bearer ${n}`}:{}}))});!function(e,t,i){p(e).beforeAuthStateChanged(t,i)}(s,e,()=>e(s.currentUser)),function(e,t,i,n){p(e).onIdTokenChanged(t,i,n)}(s,t=>e(t))}var o;const a=d("auth");return a&&Tr(s,`http://${a}`),s}var Wo;Wo="Browser",c(new l("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),n=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:r,authDomain:o}=i.options;Is(r&&!r.includes(":"),"invalid-api-key",{appName:i.name});const a={apiKey:r,authDomain:o,clientPlatform:Wo,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ur(Wo)},h=new yr(i,n,s,a);return function(e,t){const i=(null==t?void 0:t.persistence)||[],n=(Array.isArray(i)?i:[i]).map(Js);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(n,null==t?void 0:t.popupRedirectResolver)}(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),c(new l("auth-internal",e=>{const t=wr(e.getProvider("auth").getImmediate());return new $o(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),e(Vo,Ko,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(Wo)),e(Vo,Ko,"esm2017");const Xo={apiKey:"AIzaSyArnrHZPft_F6a-5sNUxQNViFddzshIlEo",authDomain:"msdatabase-e2d25.firebaseapp.com",projectId:"msdatabase-e2d25",storageBucket:"msdatabase-e2d25.firebasestorage.app",messagingSenderId:"525846107898",appId:"1:525846107898:web:41a6740fa50a0e84b91b43",measurementId:"G-0VV0VG0LT6"};let Jo=null,Yo=null,Qo=null;const Zo=async()=>(Jo||(Jo=E(Xo)),Yo||(Yo=function(e){const s="object"==typeof e?e:t(),r="string"==typeof e?e:"(default)",o=i(s,"firestore").getImmediate({identifier:r});if(!o._initialized){const e=n("firestore");e&&ls(o,...e)}return o}(Jo)),Qo||(Qo=Go(Jo)),{db:Yo,auth:Qo}),ea=()=>Yo&&Qo?{db:Yo,auth:Qo}:Zo();export{ea as getFirebaseInstances,Zo as initializeFirebase};
