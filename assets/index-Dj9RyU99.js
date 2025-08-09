(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function Wu(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Ie={},xs=[],Sn=()=>{},SI=()=>!1,Ec=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Ku=t=>t.startsWith("onUpdate:"),Dt=Object.assign,Hu=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},AI=Object.prototype.hasOwnProperty,ge=(t,e)=>AI.call(t,e),Y=Array.isArray,Ps=t=>Po(t)==="[object Map]",hi=t=>Po(t)==="[object Set]",tf=t=>Po(t)==="[object Date]",ie=t=>typeof t=="function",je=t=>typeof t=="string",Nn=t=>typeof t=="symbol",Ce=t=>t!==null&&typeof t=="object",fm=t=>(Ce(t)||ie(t))&&ie(t.then)&&ie(t.catch),pm=Object.prototype.toString,Po=t=>pm.call(t),kI=t=>Po(t).slice(8,-1),mm=t=>Po(t)==="[object Object]",zu=t=>je(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Bi=Wu(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Sc=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},CI=/-(\w)/g,yr=Sc(t=>t.replace(CI,(e,n)=>n?n.toUpperCase():"")),NI=/\B([A-Z])/g,us=Sc(t=>t.replace(NI,"-$1").toLowerCase()),gm=Sc(t=>t.charAt(0).toUpperCase()+t.slice(1)),Tl=Sc(t=>t?`on${gm(t)}`:""),fr=(t,e)=>!Object.is(t,e),Ta=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},Yl=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},$a=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let nf;const Ac=()=>nf||(nf=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Gu(t){if(Y(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=je(r)?xI(r):Gu(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(je(t)||Ce(t))return t}const RI=/;(?![^(]*\))/g,DI=/:([^]+)/,OI=/\/\*[^]*?\*\//g;function xI(t){const e={};return t.replace(OI,"").split(RI).forEach(n=>{if(n){const r=n.split(DI);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Bt(t){let e="";if(je(t))e=t;else if(Y(t))for(let n=0;n<t.length;n++){const r=Bt(t[n]);r&&(e+=r+" ")}else if(Ce(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const PI="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",MI=Wu(PI);function ym(t){return!!t||t===""}function LI(t,e){if(t.length!==e.length)return!1;let n=!0;for(let r=0;n&&r<t.length;r++)n=Mo(t[r],e[r]);return n}function Mo(t,e){if(t===e)return!0;let n=tf(t),r=tf(e);if(n||r)return n&&r?t.getTime()===e.getTime():!1;if(n=Nn(t),r=Nn(e),n||r)return t===e;if(n=Y(t),r=Y(e),n||r)return n&&r?LI(t,e):!1;if(n=Ce(t),r=Ce(e),n||r){if(!n||!r)return!1;const s=Object.keys(t).length,i=Object.keys(e).length;if(s!==i)return!1;for(const o in t){const a=t.hasOwnProperty(o),c=e.hasOwnProperty(o);if(a&&!c||!a&&c||!Mo(t[o],e[o]))return!1}}return String(t)===String(e)}function Qu(t,e){return t.findIndex(n=>Mo(n,e))}const vm=t=>!!(t&&t.__v_isRef===!0),Q=t=>je(t)?t:t==null?"":Y(t)||Ce(t)&&(t.toString===pm||!ie(t.toString))?vm(t)?Q(t.value):JSON.stringify(t,wm,2):String(t),wm=(t,e)=>vm(e)?wm(t,e.value):Ps(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[El(r,i)+" =>"]=s,n),{})}:hi(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>El(n))}:Nn(e)?El(e):Ce(e)&&!Y(e)&&!mm(e)?String(e):e,El=(t,e="")=>{var n;return Nn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Pt;class FI{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Pt,!e&&Pt&&(this.index=(Pt.scopes||(Pt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Pt;try{return Pt=this,e()}finally{Pt=n}}}on(){++this._on===1&&(this.prevScope=Pt,Pt=this)}off(){this._on>0&&--this._on===0&&(Pt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function UI(){return Pt}let Te;const Sl=new WeakSet;class Im{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Pt&&Pt.active&&Pt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Sl.has(this)&&(Sl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||bm(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,rf(this),Tm(this);const e=Te,n=an;Te=this,an=!0;try{return this.fn()}finally{Em(this),Te=e,an=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Xu(e);this.deps=this.depsTail=void 0,rf(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Sl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Jl(this)&&this.run()}get dirty(){return Jl(this)}}let _m=0,ji,Wi;function bm(t,e=!1){if(t.flags|=8,e){t.next=Wi,Wi=t;return}t.next=ji,ji=t}function Yu(){_m++}function Ju(){if(--_m>0)return;if(Wi){let e=Wi;for(Wi=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;ji;){let e=ji;for(ji=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function Tm(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Em(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),Xu(r),VI(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function Jl(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Sm(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function Sm(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===no)||(t.globalVersion=no,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Jl(t))))return;t.flags|=2;const e=t.dep,n=Te,r=an;Te=t,an=!0;try{Tm(t);const s=t.fn(t._value);(e.version===0||fr(s,t._value))&&(t.flags|=128,t._value=s,e.version++)}catch(s){throw e.version++,s}finally{Te=n,an=r,Em(t),t.flags&=-3}}function Xu(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Xu(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function VI(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let an=!0;const Am=[];function Hn(){Am.push(an),an=!1}function zn(){const t=Am.pop();an=t===void 0?!0:t}function rf(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Te;Te=void 0;try{e()}finally{Te=n}}}let no=0;class $I{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Zu{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Te||!an||Te===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Te)n=this.activeLink=new $I(Te,this),Te.deps?(n.prevDep=Te.depsTail,Te.depsTail.nextDep=n,Te.depsTail=n):Te.deps=Te.depsTail=n,km(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=Te.depsTail,n.nextDep=void 0,Te.depsTail.nextDep=n,Te.depsTail=n,Te.deps===n&&(Te.deps=r)}return n}trigger(e){this.version++,no++,this.notify(e)}notify(e){Yu();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Ju()}}}function km(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)km(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Xl=new WeakMap,zr=Symbol(""),Zl=Symbol(""),ro=Symbol("");function ft(t,e,n){if(an&&Te){let r=Xl.get(t);r||Xl.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new Zu),s.map=r,s.key=n),s.track()}}function Fn(t,e,n,r,s,i){const o=Xl.get(t);if(!o){no++;return}const a=c=>{c&&c.trigger()};if(Yu(),e==="clear")o.forEach(a);else{const c=Y(t),l=c&&zu(n);if(c&&n==="length"){const u=Number(r);o.forEach((h,d)=>{(d==="length"||d===ro||!Nn(d)&&d>=u)&&a(h)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),l&&a(o.get(ro)),e){case"add":c?l&&a(o.get("length")):(a(o.get(zr)),Ps(t)&&a(o.get(Zl)));break;case"delete":c||(a(o.get(zr)),Ps(t)&&a(o.get(Zl)));break;case"set":Ps(t)&&a(o.get(zr));break}}Ju()}function Ts(t){const e=me(t);return e===t?e:(ft(e,"iterate",ro),Zt(t)?e:e.map(it))}function kc(t){return ft(t=me(t),"iterate",ro),t}const qI={__proto__:null,[Symbol.iterator](){return Al(this,Symbol.iterator,it)},concat(...t){return Ts(this).concat(...t.map(e=>Y(e)?Ts(e):e))},entries(){return Al(this,"entries",t=>(t[1]=it(t[1]),t))},every(t,e){return Mn(this,"every",t,e,void 0,arguments)},filter(t,e){return Mn(this,"filter",t,e,n=>n.map(it),arguments)},find(t,e){return Mn(this,"find",t,e,it,arguments)},findIndex(t,e){return Mn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return Mn(this,"findLast",t,e,it,arguments)},findLastIndex(t,e){return Mn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return Mn(this,"forEach",t,e,void 0,arguments)},includes(...t){return kl(this,"includes",t)},indexOf(...t){return kl(this,"indexOf",t)},join(t){return Ts(this).join(t)},lastIndexOf(...t){return kl(this,"lastIndexOf",t)},map(t,e){return Mn(this,"map",t,e,void 0,arguments)},pop(){return Ri(this,"pop")},push(...t){return Ri(this,"push",t)},reduce(t,...e){return sf(this,"reduce",t,e)},reduceRight(t,...e){return sf(this,"reduceRight",t,e)},shift(){return Ri(this,"shift")},some(t,e){return Mn(this,"some",t,e,void 0,arguments)},splice(...t){return Ri(this,"splice",t)},toReversed(){return Ts(this).toReversed()},toSorted(t){return Ts(this).toSorted(t)},toSpliced(...t){return Ts(this).toSpliced(...t)},unshift(...t){return Ri(this,"unshift",t)},values(){return Al(this,"values",it)}};function Al(t,e,n){const r=kc(t),s=r[e]();return r!==t&&!Zt(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=n(i.value)),i}),s}const BI=Array.prototype;function Mn(t,e,n,r,s,i){const o=kc(t),a=o!==t&&!Zt(t),c=o[e];if(c!==BI[e]){const h=c.apply(t,i);return a?it(h):h}let l=n;o!==t&&(a?l=function(h,d){return n.call(this,it(h),d,t)}:n.length>2&&(l=function(h,d){return n.call(this,h,d,t)}));const u=c.call(o,l,r);return a&&s?s(u):u}function sf(t,e,n,r){const s=kc(t);let i=n;return s!==t&&(Zt(t)?n.length>3&&(i=function(o,a,c){return n.call(this,o,a,c,t)}):i=function(o,a,c){return n.call(this,o,it(a),c,t)}),s[e](i,...r)}function kl(t,e,n){const r=me(t);ft(r,"iterate",ro);const s=r[e](...n);return(s===-1||s===!1)&&nh(n[0])?(n[0]=me(n[0]),r[e](...n)):s}function Ri(t,e,n=[]){Hn(),Yu();const r=me(t)[e].apply(t,n);return Ju(),zn(),r}const jI=Wu("__proto__,__v_isRef,__isVue"),Cm=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Nn));function WI(t){Nn(t)||(t=String(t));const e=me(this);return ft(e,"has",t),e.hasOwnProperty(t)}class Nm{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?e_:xm:i?Om:Dm).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=Y(e);if(!s){let c;if(o&&(c=qI[n]))return c;if(n==="hasOwnProperty")return WI}const a=Reflect.get(e,n,vt(e)?e:r);return(Nn(n)?Cm.has(n):jI(n))||(s||ft(e,"get",n),i)?a:vt(a)?o&&zu(n)?a:a.value:Ce(a)?s?Pm(a):Rn(a):a}}class Rm extends Nm{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const c=vr(i);if(!Zt(r)&&!vr(r)&&(i=me(i),r=me(r)),!Y(e)&&vt(i)&&!vt(r))return c?!1:(i.value=r,!0)}const o=Y(e)&&zu(n)?Number(n)<e.length:ge(e,n),a=Reflect.set(e,n,r,vt(e)?e:s);return e===me(s)&&(o?fr(r,i)&&Fn(e,"set",n,r):Fn(e,"add",n,r)),a}deleteProperty(e,n){const r=ge(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&Fn(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!Nn(n)||!Cm.has(n))&&ft(e,"has",n),r}ownKeys(e){return ft(e,"iterate",Y(e)?"length":zr),Reflect.ownKeys(e)}}class KI extends Nm{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const HI=new Rm,zI=new KI,GI=new Rm(!0);const eu=t=>t,ha=t=>Reflect.getPrototypeOf(t);function QI(t,e,n){return function(...r){const s=this.__v_raw,i=me(s),o=Ps(i),a=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,l=s[t](...r),u=n?eu:e?qa:it;return!e&&ft(i,"iterate",c?Zl:zr),{next(){const{value:h,done:d}=l.next();return d?{value:h,done:d}:{value:a?[u(h[0]),u(h[1])]:u(h),done:d}},[Symbol.iterator](){return this}}}}function da(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function YI(t,e){const n={get(s){const i=this.__v_raw,o=me(i),a=me(s);t||(fr(s,a)&&ft(o,"get",s),ft(o,"get",a));const{has:c}=ha(o),l=e?eu:t?qa:it;if(c.call(o,s))return l(i.get(s));if(c.call(o,a))return l(i.get(a));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&ft(me(s),"iterate",zr),Reflect.get(s,"size",s)},has(s){const i=this.__v_raw,o=me(i),a=me(s);return t||(fr(s,a)&&ft(o,"has",s),ft(o,"has",a)),s===a?i.has(s):i.has(s)||i.has(a)},forEach(s,i){const o=this,a=o.__v_raw,c=me(a),l=e?eu:t?qa:it;return!t&&ft(c,"iterate",zr),a.forEach((u,h)=>s.call(i,l(u),l(h),o))}};return Dt(n,t?{add:da("add"),set:da("set"),delete:da("delete"),clear:da("clear")}:{add(s){!e&&!Zt(s)&&!vr(s)&&(s=me(s));const i=me(this);return ha(i).has.call(i,s)||(i.add(s),Fn(i,"add",s,s)),this},set(s,i){!e&&!Zt(i)&&!vr(i)&&(i=me(i));const o=me(this),{has:a,get:c}=ha(o);let l=a.call(o,s);l||(s=me(s),l=a.call(o,s));const u=c.call(o,s);return o.set(s,i),l?fr(i,u)&&Fn(o,"set",s,i):Fn(o,"add",s,i),this},delete(s){const i=me(this),{has:o,get:a}=ha(i);let c=o.call(i,s);c||(s=me(s),c=o.call(i,s)),a&&a.call(i,s);const l=i.delete(s);return c&&Fn(i,"delete",s,void 0),l},clear(){const s=me(this),i=s.size!==0,o=s.clear();return i&&Fn(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=QI(s,t,e)}),n}function eh(t,e){const n=YI(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(ge(n,s)&&s in r?n:r,s,i)}const JI={get:eh(!1,!1)},XI={get:eh(!1,!0)},ZI={get:eh(!0,!1)};const Dm=new WeakMap,Om=new WeakMap,xm=new WeakMap,e_=new WeakMap;function t_(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function n_(t){return t.__v_skip||!Object.isExtensible(t)?0:t_(kI(t))}function Rn(t){return vr(t)?t:th(t,!1,HI,JI,Dm)}function r_(t){return th(t,!1,GI,XI,Om)}function Pm(t){return th(t,!0,zI,ZI,xm)}function th(t,e,n,r,s){if(!Ce(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=n_(t);if(i===0)return t;const o=s.get(t);if(o)return o;const a=new Proxy(t,i===2?r:n);return s.set(t,a),a}function Ms(t){return vr(t)?Ms(t.__v_raw):!!(t&&t.__v_isReactive)}function vr(t){return!!(t&&t.__v_isReadonly)}function Zt(t){return!!(t&&t.__v_isShallow)}function nh(t){return t?!!t.__v_raw:!1}function me(t){const e=t&&t.__v_raw;return e?me(e):t}function s_(t){return!ge(t,"__v_skip")&&Object.isExtensible(t)&&Yl(t,"__v_skip",!0),t}const it=t=>Ce(t)?Rn(t):t,qa=t=>Ce(t)?Pm(t):t;function vt(t){return t?t.__v_isRef===!0:!1}function Oe(t){return i_(t,!1)}function i_(t,e){return vt(t)?t:new o_(t,e)}class o_{constructor(e,n){this.dep=new Zu,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:me(e),this._value=n?e:it(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||Zt(e)||vr(e);e=r?e:me(e),fr(e,n)&&(this._rawValue=e,this._value=r?e:it(e),this.dep.trigger())}}function a_(t){return vt(t)?t.value:t}const c_={get:(t,e,n)=>e==="__v_raw"?t:a_(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return vt(s)&&!vt(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function Mm(t){return Ms(t)?t:new Proxy(t,c_)}class l_{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Zu(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=no-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Te!==this)return bm(this,!0),!0}get value(){const e=this.dep.track();return Sm(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function u_(t,e,n=!1){let r,s;return ie(t)?r=t:(r=t.get,s=t.set),new l_(r,s,n)}const fa={},Ba=new WeakMap;let Lr;function h_(t,e=!1,n=Lr){if(n){let r=Ba.get(n);r||Ba.set(n,r=[]),r.push(t)}}function d_(t,e,n=Ie){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:a,call:c}=n,l=_=>s?_:Zt(_)||s===!1||s===0?Un(_,1):Un(_);let u,h,d,f,y=!1,S=!1;if(vt(t)?(h=()=>t.value,y=Zt(t)):Ms(t)?(h=()=>l(t),y=!0):Y(t)?(S=!0,y=t.some(_=>Ms(_)||Zt(_)),h=()=>t.map(_=>{if(vt(_))return _.value;if(Ms(_))return l(_);if(ie(_))return c?c(_,2):_()})):ie(t)?e?h=c?()=>c(t,2):t:h=()=>{if(d){Hn();try{d()}finally{zn()}}const _=Lr;Lr=u;try{return c?c(t,3,[f]):t(f)}finally{Lr=_}}:h=Sn,e&&s){const _=h,P=s===!0?1/0:s;h=()=>Un(_(),P)}const T=UI(),A=()=>{u.stop(),T&&T.active&&Hu(T.effects,u)};if(i&&e){const _=e;e=(...P)=>{_(...P),A()}}let w=S?new Array(t.length).fill(fa):fa;const v=_=>{if(!(!(u.flags&1)||!u.dirty&&!_))if(e){const P=u.run();if(s||y||(S?P.some((X,q)=>fr(X,w[q])):fr(P,w))){d&&d();const X=Lr;Lr=u;try{const q=[P,w===fa?void 0:S&&w[0]===fa?[]:w,f];w=P,c?c(e,3,q):e(...q)}finally{Lr=X}}}else u.run()};return a&&a(v),u=new Im(h),u.scheduler=o?()=>o(v,!1):v,f=_=>h_(_,!1,u),d=u.onStop=()=>{const _=Ba.get(u);if(_){if(c)c(_,4);else for(const P of _)P();Ba.delete(u)}},e?r?v(!0):w=u.run():o?o(v.bind(null,!0),!0):u.run(),A.pause=u.pause.bind(u),A.resume=u.resume.bind(u),A.stop=A,A}function Un(t,e=1/0,n){if(e<=0||!Ce(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,vt(t))Un(t.value,e,n);else if(Y(t))for(let r=0;r<t.length;r++)Un(t[r],e,n);else if(hi(t)||Ps(t))t.forEach(r=>{Un(r,e,n)});else if(mm(t)){for(const r in t)Un(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&Un(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Lo(t,e,n,r){try{return r?t(...r):t()}catch(s){Cc(s,e,n)}}function Dn(t,e,n,r){if(ie(t)){const s=Lo(t,e,n,r);return s&&fm(s)&&s.catch(i=>{Cc(i,e,n)}),s}if(Y(t)){const s=[];for(let i=0;i<t.length;i++)s.push(Dn(t[i],e,n,r));return s}}function Cc(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Ie;if(e){let a=e.parent;const c=e.proxy,l=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](t,c,l)===!1)return}a=a.parent}if(i){Hn(),Lo(i,null,10,[t,c,l]),zn();return}}f_(t,n,s,r,o)}function f_(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const Et=[];let yn=-1;const Ls=[];let or=null,ks=0;const Lm=Promise.resolve();let ja=null;function Fm(t){const e=ja||Lm;return t?e.then(this?t.bind(this):t):e}function p_(t){let e=yn+1,n=Et.length;for(;e<n;){const r=e+n>>>1,s=Et[r],i=so(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function rh(t){if(!(t.flags&1)){const e=so(t),n=Et[Et.length-1];!n||!(t.flags&2)&&e>=so(n)?Et.push(t):Et.splice(p_(e),0,t),t.flags|=1,Um()}}function Um(){ja||(ja=Lm.then($m))}function m_(t){Y(t)?Ls.push(...t):or&&t.id===-1?or.splice(ks+1,0,t):t.flags&1||(Ls.push(t),t.flags|=1),Um()}function of(t,e,n=yn+1){for(;n<Et.length;n++){const r=Et[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;Et.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Vm(t){if(Ls.length){const e=[...new Set(Ls)].sort((n,r)=>so(n)-so(r));if(Ls.length=0,or){or.push(...e);return}for(or=e,ks=0;ks<or.length;ks++){const n=or[ks];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}or=null,ks=0}}const so=t=>t.id==null?t.flags&2?-1:1/0:t.id;function $m(t){try{for(yn=0;yn<Et.length;yn++){const e=Et[yn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Lo(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;yn<Et.length;yn++){const e=Et[yn];e&&(e.flags&=-2)}yn=-1,Et.length=0,Vm(),ja=null,(Et.length||Ls.length)&&$m()}}let Jt=null,qm=null;function Wa(t){const e=Jt;return Jt=t,qm=t&&t.type.__scopeId||null,e}function g_(t,e=Jt,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&mf(-1);const i=Wa(e);let o;try{o=t(...s)}finally{Wa(i),r._d&&mf(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function Z(t,e){if(Jt===null)return t;const n=Oc(Jt),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,a,c=Ie]=e[s];i&&(ie(i)&&(i={mounted:i,updated:i}),i.deep&&Un(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:c}))}return t}function Pr(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let c=a.dir[r];c&&(Hn(),Dn(c,n,8,[t.el,a,t,e]),zn())}}const y_=Symbol("_vte"),v_=t=>t.__isTeleport;function sh(t,e){t.shapeFlag&6&&t.component?(t.transition=e,sh(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Bm(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Ki(t,e,n,r,s=!1){if(Y(t)){t.forEach((y,S)=>Ki(y,e&&(Y(e)?e[S]:e),n,r,s));return}if(Hi(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Ki(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?Oc(r.component):r.el,o=s?null:i,{i:a,r:c}=t,l=e&&e.r,u=a.refs===Ie?a.refs={}:a.refs,h=a.setupState,d=me(h),f=h===Ie?()=>!1:y=>ge(d,y);if(l!=null&&l!==c&&(je(l)?(u[l]=null,f(l)&&(h[l]=null)):vt(l)&&(l.value=null)),ie(c))Lo(c,a,12,[o,u]);else{const y=je(c),S=vt(c);if(y||S){const T=()=>{if(t.f){const A=y?f(c)?h[c]:u[c]:c.value;s?Y(A)&&Hu(A,i):Y(A)?A.includes(i)||A.push(i):y?(u[c]=[i],f(c)&&(h[c]=u[c])):(c.value=[i],t.k&&(u[t.k]=c.value))}else y?(u[c]=o,f(c)&&(h[c]=o)):S&&(c.value=o,t.k&&(u[t.k]=o))};o?(T.id=-1,$t(T,n)):T()}}}Ac().requestIdleCallback;Ac().cancelIdleCallback;const Hi=t=>!!t.type.__asyncLoader,jm=t=>t.type.__isKeepAlive;function w_(t,e){Wm(t,"a",e)}function I_(t,e){Wm(t,"da",e)}function Wm(t,e,n=kt){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(Nc(e,r,n),n){let s=n.parent;for(;s&&s.parent;)jm(s.parent.vnode)&&__(r,e,n,s),s=s.parent}}function __(t,e,n,r){const s=Nc(e,t,r,!0);Km(()=>{Hu(r[e],s)},n)}function Nc(t,e,n=kt,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{Hn();const a=Fo(n),c=Dn(e,n,t,o);return a(),zn(),c});return r?s.unshift(i):s.push(i),i}}const Xn=t=>(e,n=kt)=>{(!oo||t==="sp")&&Nc(t,(...r)=>e(...r),n)},b_=Xn("bm"),T_=Xn("m"),E_=Xn("bu"),S_=Xn("u"),A_=Xn("bum"),Km=Xn("um"),k_=Xn("sp"),C_=Xn("rtg"),N_=Xn("rtc");function R_(t,e=kt){Nc("ec",t,e)}const D_=Symbol.for("v-ndc");function fe(t,e,n,r){let s;const i=n,o=Y(t);if(o||je(t)){const a=o&&Ms(t);let c=!1,l=!1;a&&(c=!Zt(t),l=vr(t),t=kc(t)),s=new Array(t.length);for(let u=0,h=t.length;u<h;u++)s[u]=e(c?l?qa(it(t[u])):it(t[u]):t[u],u,void 0,i)}else if(typeof t=="number"){s=new Array(t);for(let a=0;a<t;a++)s[a]=e(a+1,a,void 0,i)}else if(Ce(t))if(t[Symbol.iterator])s=Array.from(t,(a,c)=>e(a,c,void 0,i));else{const a=Object.keys(t);s=new Array(a.length);for(let c=0,l=a.length;c<l;c++){const u=a[c];s[c]=e(t[u],u,c,i)}}else s=[];return s}const tu=t=>t?dg(t)?Oc(t):tu(t.parent):null,zi=Dt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>tu(t.parent),$root:t=>tu(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>zm(t),$forceUpdate:t=>t.f||(t.f=()=>{rh(t.update)}),$nextTick:t=>t.n||(t.n=Fm.bind(t.proxy)),$watch:t=>Z_.bind(t)}),Cl=(t,e)=>t!==Ie&&!t.__isScriptSetup&&ge(t,e),O_={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:a,appContext:c}=t;let l;if(e[0]!=="$"){const f=o[e];if(f!==void 0)switch(f){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(Cl(r,e))return o[e]=1,r[e];if(s!==Ie&&ge(s,e))return o[e]=2,s[e];if((l=t.propsOptions[0])&&ge(l,e))return o[e]=3,i[e];if(n!==Ie&&ge(n,e))return o[e]=4,n[e];nu&&(o[e]=0)}}const u=zi[e];let h,d;if(u)return e==="$attrs"&&ft(t.attrs,"get",""),u(t);if((h=a.__cssModules)&&(h=h[e]))return h;if(n!==Ie&&ge(n,e))return o[e]=4,n[e];if(d=c.config.globalProperties,ge(d,e))return d[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return Cl(s,e)?(s[e]=n,!0):r!==Ie&&ge(r,e)?(r[e]=n,!0):ge(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let a;return!!n[o]||t!==Ie&&ge(t,o)||Cl(e,o)||(a=i[0])&&ge(a,o)||ge(r,o)||ge(zi,o)||ge(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:ge(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function af(t){return Y(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let nu=!0;function x_(t){const e=zm(t),n=t.proxy,r=t.ctx;nu=!1,e.beforeCreate&&cf(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:a,provide:c,inject:l,created:u,beforeMount:h,mounted:d,beforeUpdate:f,updated:y,activated:S,deactivated:T,beforeDestroy:A,beforeUnmount:w,destroyed:v,unmounted:_,render:P,renderTracked:X,renderTriggered:q,errorCaptured:oe,serverPrefetch:Ee,expose:Se,inheritAttrs:ne,components:ae,directives:Fe,filters:un}=e;if(l&&P_(l,r,null),o)for(const we in o){const _e=o[we];ie(_e)&&(r[we]=_e.bind(n))}if(s){const we=s.call(n,n);Ce(we)&&(t.data=Rn(we))}if(nu=!0,i)for(const we in i){const _e=i[we],Or=ie(_e)?_e.bind(n,n):ie(_e.get)?_e.get.bind(n,n):Sn,la=!ie(_e)&&ie(_e.set)?_e.set.bind(n):Sn,xr=Ct({get:Or,set:la});Object.defineProperty(r,we,{enumerable:!0,configurable:!0,get:()=>xr.value,set:dn=>xr.value=dn})}if(a)for(const we in a)Hm(a[we],r,n,we);if(c){const we=ie(c)?c.call(n):c;Reflect.ownKeys(we).forEach(_e=>{$_(_e,we[_e])})}u&&cf(u,t,"c");function Ue(we,_e){Y(_e)?_e.forEach(Or=>we(Or.bind(n))):_e&&we(_e.bind(n))}if(Ue(b_,h),Ue(T_,d),Ue(E_,f),Ue(S_,y),Ue(w_,S),Ue(I_,T),Ue(R_,oe),Ue(N_,X),Ue(C_,q),Ue(A_,w),Ue(Km,_),Ue(k_,Ee),Y(Se))if(Se.length){const we=t.exposed||(t.exposed={});Se.forEach(_e=>{Object.defineProperty(we,_e,{get:()=>n[_e],set:Or=>n[_e]=Or,enumerable:!0})})}else t.exposed||(t.exposed={});P&&t.render===Sn&&(t.render=P),ne!=null&&(t.inheritAttrs=ne),ae&&(t.components=ae),Fe&&(t.directives=Fe),Ee&&Bm(t)}function P_(t,e,n=Sn){Y(t)&&(t=ru(t));for(const r in t){const s=t[r];let i;Ce(s)?"default"in s?i=Ea(s.from||r,s.default,!0):i=Ea(s.from||r):i=Ea(s),vt(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function cf(t,e,n){Dn(Y(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function Hm(t,e,n,r){let s=r.includes(".")?og(n,r):()=>n[r];if(je(t)){const i=e[t];ie(i)&&pr(s,i)}else if(ie(t))pr(s,t.bind(n));else if(Ce(t))if(Y(t))t.forEach(i=>Hm(i,e,n,r));else{const i=ie(t.handler)?t.handler.bind(n):e[t.handler];ie(i)&&pr(s,i,t)}}function zm(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let c;return a?c=a:!s.length&&!n&&!r?c=e:(c={},s.length&&s.forEach(l=>Ka(c,l,o,!0)),Ka(c,e,o)),Ce(e)&&i.set(e,c),c}function Ka(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&Ka(t,i,n,!0),s&&s.forEach(o=>Ka(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const a=M_[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const M_={data:lf,props:uf,emits:uf,methods:Ui,computed:Ui,beforeCreate:_t,created:_t,beforeMount:_t,mounted:_t,beforeUpdate:_t,updated:_t,beforeDestroy:_t,beforeUnmount:_t,destroyed:_t,unmounted:_t,activated:_t,deactivated:_t,errorCaptured:_t,serverPrefetch:_t,components:Ui,directives:Ui,watch:F_,provide:lf,inject:L_};function lf(t,e){return e?t?function(){return Dt(ie(t)?t.call(this,this):t,ie(e)?e.call(this,this):e)}:e:t}function L_(t,e){return Ui(ru(t),ru(e))}function ru(t){if(Y(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function _t(t,e){return t?[...new Set([].concat(t,e))]:e}function Ui(t,e){return t?Dt(Object.create(null),t,e):e}function uf(t,e){return t?Y(t)&&Y(e)?[...new Set([...t,...e])]:Dt(Object.create(null),af(t),af(e??{})):e}function F_(t,e){if(!t)return e;if(!e)return t;const n=Dt(Object.create(null),t);for(const r in e)n[r]=_t(t[r],e[r]);return n}function Gm(){return{app:null,config:{isNativeTag:SI,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let U_=0;function V_(t,e){return function(r,s=null){ie(r)||(r=Dt({},r)),s!=null&&!Ce(s)&&(s=null);const i=Gm(),o=new WeakSet,a=[];let c=!1;const l=i.app={_uid:U_++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:bb,get config(){return i.config},set config(u){},use(u,...h){return o.has(u)||(u&&ie(u.install)?(o.add(u),u.install(l,...h)):ie(u)&&(o.add(u),u(l,...h))),l},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),l},component(u,h){return h?(i.components[u]=h,l):i.components[u]},directive(u,h){return h?(i.directives[u]=h,l):i.directives[u]},mount(u,h,d){if(!c){const f=l._ceVNode||en(r,s);return f.appContext=i,d===!0?d="svg":d===!1&&(d=void 0),t(f,u,d),c=!0,l._container=u,u.__vue_app__=l,Oc(f.component)}},onUnmount(u){a.push(u)},unmount(){c&&(Dn(a,l._instance,16),t(null,l._container),delete l._container.__vue_app__)},provide(u,h){return i.provides[u]=h,l},runWithContext(u){const h=Fs;Fs=l;try{return u()}finally{Fs=h}}};return l}}let Fs=null;function $_(t,e){if(kt){let n=kt.provides;const r=kt.parent&&kt.parent.provides;r===n&&(n=kt.provides=Object.create(r)),n[t]=e}}function Ea(t,e,n=!1){const r=gb();if(r||Fs){let s=Fs?Fs._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&ie(e)?e.call(r&&r.proxy):e}}const Qm={},Ym=()=>Object.create(Qm),Jm=t=>Object.getPrototypeOf(t)===Qm;function q_(t,e,n,r=!1){const s={},i=Ym();t.propsDefaults=Object.create(null),Xm(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:r_(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function B_(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,a=me(s),[c]=t.propsOptions;let l=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let h=0;h<u.length;h++){let d=u[h];if(Rc(t.emitsOptions,d))continue;const f=e[d];if(c)if(ge(i,d))f!==i[d]&&(i[d]=f,l=!0);else{const y=yr(d);s[y]=su(c,a,y,f,t,!1)}else f!==i[d]&&(i[d]=f,l=!0)}}}else{Xm(t,e,s,i)&&(l=!0);let u;for(const h in a)(!e||!ge(e,h)&&((u=us(h))===h||!ge(e,u)))&&(c?n&&(n[h]!==void 0||n[u]!==void 0)&&(s[h]=su(c,a,h,void 0,t,!0)):delete s[h]);if(i!==a)for(const h in i)(!e||!ge(e,h))&&(delete i[h],l=!0)}l&&Fn(t.attrs,"set","")}function Xm(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,a;if(e)for(let c in e){if(Bi(c))continue;const l=e[c];let u;s&&ge(s,u=yr(c))?!i||!i.includes(u)?n[u]=l:(a||(a={}))[u]=l:Rc(t.emitsOptions,c)||(!(c in r)||l!==r[c])&&(r[c]=l,o=!0)}if(i){const c=me(n),l=a||Ie;for(let u=0;u<i.length;u++){const h=i[u];n[h]=su(s,c,h,l[h],t,!ge(l,h))}}return o}function su(t,e,n,r,s,i){const o=t[n];if(o!=null){const a=ge(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&ie(c)){const{propsDefaults:l}=s;if(n in l)r=l[n];else{const u=Fo(s);r=l[n]=c.call(null,e),u()}}else r=c;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!a?r=!1:o[1]&&(r===""||r===us(n))&&(r=!0))}return r}const j_=new WeakMap;function Zm(t,e,n=!1){const r=n?j_:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},a=[];let c=!1;if(!ie(t)){const u=h=>{c=!0;const[d,f]=Zm(h,e,!0);Dt(o,d),f&&a.push(...f)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!c)return Ce(t)&&r.set(t,xs),xs;if(Y(i))for(let u=0;u<i.length;u++){const h=yr(i[u]);hf(h)&&(o[h]=Ie)}else if(i)for(const u in i){const h=yr(u);if(hf(h)){const d=i[u],f=o[h]=Y(d)||ie(d)?{type:d}:Dt({},d),y=f.type;let S=!1,T=!0;if(Y(y))for(let A=0;A<y.length;++A){const w=y[A],v=ie(w)&&w.name;if(v==="Boolean"){S=!0;break}else v==="String"&&(T=!1)}else S=ie(y)&&y.name==="Boolean";f[0]=S,f[1]=T,(S||ge(f,"default"))&&a.push(h)}}const l=[o,a];return Ce(t)&&r.set(t,l),l}function hf(t){return t[0]!=="$"&&!Bi(t)}const ih=t=>t==="_"||t==="__"||t==="_ctx"||t==="$stable",oh=t=>Y(t)?t.map(vn):[vn(t)],W_=(t,e,n)=>{if(e._n)return e;const r=g_((...s)=>oh(e(...s)),n);return r._c=!1,r},eg=(t,e,n)=>{const r=t._ctx;for(const s in t){if(ih(s))continue;const i=t[s];if(ie(i))e[s]=W_(s,i,r);else if(i!=null){const o=oh(i);e[s]=()=>o}}},tg=(t,e)=>{const n=oh(e);t.slots.default=()=>n},ng=(t,e,n)=>{for(const r in e)(n||!ih(r))&&(t[r]=e[r])},K_=(t,e,n)=>{const r=t.slots=Ym();if(t.vnode.shapeFlag&32){const s=e.__;s&&Yl(r,"__",s,!0);const i=e._;i?(ng(r,e,n),n&&Yl(r,"_",i,!0)):eg(e,r)}else e&&tg(t,e)},H_=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=Ie;if(r.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:ng(s,e,n):(i=!e.$stable,eg(e,s)),o=e}else e&&(tg(t,e),o={default:1});if(i)for(const a in s)!ih(a)&&o[a]==null&&delete s[a]},$t=ob;function z_(t){return G_(t)}function G_(t,e){const n=Ac();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:a,createComment:c,setText:l,setElementText:u,parentNode:h,nextSibling:d,setScopeId:f=Sn,insertStaticContent:y}=t,S=(p,g,b,R=null,C=null,N=null,$=void 0,F=null,L=!!g.dynamicChildren)=>{if(p===g)return;p&&!Di(p,g)&&(R=ua(p),dn(p,C,N,!0),p=null),g.patchFlag===-2&&(L=!1,g.dynamicChildren=null);const{type:D,ref:G,shapeFlag:B}=g;switch(D){case Dc:T(p,g,b,R);break;case wr:A(p,g,b,R);break;case Sa:p==null&&w(g,b,R,$);break;case re:ae(p,g,b,R,C,N,$,F,L);break;default:B&1?P(p,g,b,R,C,N,$,F,L):B&6?Fe(p,g,b,R,C,N,$,F,L):(B&64||B&128)&&D.process(p,g,b,R,C,N,$,F,L,Ci)}G!=null&&C?Ki(G,p&&p.ref,N,g||p,!g):G==null&&p&&p.ref!=null&&Ki(p.ref,null,N,p,!0)},T=(p,g,b,R)=>{if(p==null)r(g.el=a(g.children),b,R);else{const C=g.el=p.el;g.children!==p.children&&l(C,g.children)}},A=(p,g,b,R)=>{p==null?r(g.el=c(g.children||""),b,R):g.el=p.el},w=(p,g,b,R)=>{[p.el,p.anchor]=y(p.children,g,b,R,p.el,p.anchor)},v=({el:p,anchor:g},b,R)=>{let C;for(;p&&p!==g;)C=d(p),r(p,b,R),p=C;r(g,b,R)},_=({el:p,anchor:g})=>{let b;for(;p&&p!==g;)b=d(p),s(p),p=b;s(g)},P=(p,g,b,R,C,N,$,F,L)=>{g.type==="svg"?$="svg":g.type==="math"&&($="mathml"),p==null?X(g,b,R,C,N,$,F,L):Ee(p,g,C,N,$,F,L)},X=(p,g,b,R,C,N,$,F)=>{let L,D;const{props:G,shapeFlag:B,transition:H,dirs:ee}=p;if(L=p.el=o(p.type,N,G&&G.is,G),B&8?u(L,p.children):B&16&&oe(p.children,L,null,R,C,Nl(p,N),$,F),ee&&Pr(p,null,R,"created"),q(L,p,p.scopeId,$,R),G){for(const be in G)be!=="value"&&!Bi(be)&&i(L,be,null,G[be],N,R);"value"in G&&i(L,"value",null,G.value,N),(D=G.onVnodeBeforeMount)&&gn(D,R,p)}ee&&Pr(p,null,R,"beforeMount");const le=Q_(C,H);le&&H.beforeEnter(L),r(L,g,b),((D=G&&G.onVnodeMounted)||le||ee)&&$t(()=>{D&&gn(D,R,p),le&&H.enter(L),ee&&Pr(p,null,R,"mounted")},C)},q=(p,g,b,R,C)=>{if(b&&f(p,b),R)for(let N=0;N<R.length;N++)f(p,R[N]);if(C){let N=C.subTree;if(g===N||cg(N.type)&&(N.ssContent===g||N.ssFallback===g)){const $=C.vnode;q(p,$,$.scopeId,$.slotScopeIds,C.parent)}}},oe=(p,g,b,R,C,N,$,F,L=0)=>{for(let D=L;D<p.length;D++){const G=p[D]=F?ar(p[D]):vn(p[D]);S(null,G,g,b,R,C,N,$,F)}},Ee=(p,g,b,R,C,N,$)=>{const F=g.el=p.el;let{patchFlag:L,dynamicChildren:D,dirs:G}=g;L|=p.patchFlag&16;const B=p.props||Ie,H=g.props||Ie;let ee;if(b&&Mr(b,!1),(ee=H.onVnodeBeforeUpdate)&&gn(ee,b,g,p),G&&Pr(g,p,b,"beforeUpdate"),b&&Mr(b,!0),(B.innerHTML&&H.innerHTML==null||B.textContent&&H.textContent==null)&&u(F,""),D?Se(p.dynamicChildren,D,F,b,R,Nl(g,C),N):$||_e(p,g,F,null,b,R,Nl(g,C),N,!1),L>0){if(L&16)ne(F,B,H,b,C);else if(L&2&&B.class!==H.class&&i(F,"class",null,H.class,C),L&4&&i(F,"style",B.style,H.style,C),L&8){const le=g.dynamicProps;for(let be=0;be<le.length;be++){const ye=le[be],Ot=B[ye],xt=H[ye];(xt!==Ot||ye==="value")&&i(F,ye,Ot,xt,C,b)}}L&1&&p.children!==g.children&&u(F,g.children)}else!$&&D==null&&ne(F,B,H,b,C);((ee=H.onVnodeUpdated)||G)&&$t(()=>{ee&&gn(ee,b,g,p),G&&Pr(g,p,b,"updated")},R)},Se=(p,g,b,R,C,N,$)=>{for(let F=0;F<g.length;F++){const L=p[F],D=g[F],G=L.el&&(L.type===re||!Di(L,D)||L.shapeFlag&198)?h(L.el):b;S(L,D,G,null,R,C,N,$,!0)}},ne=(p,g,b,R,C)=>{if(g!==b){if(g!==Ie)for(const N in g)!Bi(N)&&!(N in b)&&i(p,N,g[N],null,C,R);for(const N in b){if(Bi(N))continue;const $=b[N],F=g[N];$!==F&&N!=="value"&&i(p,N,F,$,C,R)}"value"in b&&i(p,"value",g.value,b.value,C)}},ae=(p,g,b,R,C,N,$,F,L)=>{const D=g.el=p?p.el:a(""),G=g.anchor=p?p.anchor:a("");let{patchFlag:B,dynamicChildren:H,slotScopeIds:ee}=g;ee&&(F=F?F.concat(ee):ee),p==null?(r(D,b,R),r(G,b,R),oe(g.children||[],b,G,C,N,$,F,L)):B>0&&B&64&&H&&p.dynamicChildren?(Se(p.dynamicChildren,H,b,C,N,$,F),(g.key!=null||C&&g===C.subTree)&&rg(p,g,!0)):_e(p,g,b,G,C,N,$,F,L)},Fe=(p,g,b,R,C,N,$,F,L)=>{g.slotScopeIds=F,p==null?g.shapeFlag&512?C.ctx.activate(g,b,R,$,L):un(g,b,R,C,N,$,L):hn(p,g,L)},un=(p,g,b,R,C,N,$)=>{const F=p.component=mb(p,R,C);if(jm(p)&&(F.ctx.renderer=Ci),yb(F,!1,$),F.asyncDep){if(C&&C.registerDep(F,Ue,$),!p.el){const L=F.subTree=en(wr);A(null,L,g,b),p.placeholder=L.el}}else Ue(F,p,g,b,C,N,$)},hn=(p,g,b)=>{const R=g.component=p.component;if(sb(p,g,b))if(R.asyncDep&&!R.asyncResolved){we(R,g,b);return}else R.next=g,R.update();else g.el=p.el,R.vnode=g},Ue=(p,g,b,R,C,N,$)=>{const F=()=>{if(p.isMounted){let{next:B,bu:H,u:ee,parent:le,vnode:be}=p;{const pn=sg(p);if(pn){B&&(B.el=be.el,we(p,B,$)),pn.asyncDep.then(()=>{p.isUnmounted||F()});return}}let ye=B,Ot;Mr(p,!1),B?(B.el=be.el,we(p,B,$)):B=be,H&&Ta(H),(Ot=B.props&&B.props.onVnodeBeforeUpdate)&&gn(Ot,le,B,be),Mr(p,!0);const xt=ff(p),fn=p.subTree;p.subTree=xt,S(fn,xt,h(fn.el),ua(fn),p,C,N),B.el=xt.el,ye===null&&ib(p,xt.el),ee&&$t(ee,C),(Ot=B.props&&B.props.onVnodeUpdated)&&$t(()=>gn(Ot,le,B,be),C)}else{let B;const{el:H,props:ee}=g,{bm:le,m:be,parent:ye,root:Ot,type:xt}=p,fn=Hi(g);Mr(p,!1),le&&Ta(le),!fn&&(B=ee&&ee.onVnodeBeforeMount)&&gn(B,ye,g),Mr(p,!0);{Ot.ce&&Ot.ce._def.shadowRoot!==!1&&Ot.ce._injectChildStyle(xt);const pn=p.subTree=ff(p);S(null,pn,b,R,p,C,N),g.el=pn.el}if(be&&$t(be,C),!fn&&(B=ee&&ee.onVnodeMounted)){const pn=g;$t(()=>gn(B,ye,pn),C)}(g.shapeFlag&256||ye&&Hi(ye.vnode)&&ye.vnode.shapeFlag&256)&&p.a&&$t(p.a,C),p.isMounted=!0,g=b=R=null}};p.scope.on();const L=p.effect=new Im(F);p.scope.off();const D=p.update=L.run.bind(L),G=p.job=L.runIfDirty.bind(L);G.i=p,G.id=p.uid,L.scheduler=()=>rh(G),Mr(p,!0),D()},we=(p,g,b)=>{g.component=p;const R=p.vnode.props;p.vnode=g,p.next=null,B_(p,g.props,R,b),H_(p,g.children,b),Hn(),of(p),zn()},_e=(p,g,b,R,C,N,$,F,L=!1)=>{const D=p&&p.children,G=p?p.shapeFlag:0,B=g.children,{patchFlag:H,shapeFlag:ee}=g;if(H>0){if(H&128){la(D,B,b,R,C,N,$,F,L);return}else if(H&256){Or(D,B,b,R,C,N,$,F,L);return}}ee&8?(G&16&&ki(D,C,N),B!==D&&u(b,B)):G&16?ee&16?la(D,B,b,R,C,N,$,F,L):ki(D,C,N,!0):(G&8&&u(b,""),ee&16&&oe(B,b,R,C,N,$,F,L))},Or=(p,g,b,R,C,N,$,F,L)=>{p=p||xs,g=g||xs;const D=p.length,G=g.length,B=Math.min(D,G);let H;for(H=0;H<B;H++){const ee=g[H]=L?ar(g[H]):vn(g[H]);S(p[H],ee,b,null,C,N,$,F,L)}D>G?ki(p,C,N,!0,!1,B):oe(g,b,R,C,N,$,F,L,B)},la=(p,g,b,R,C,N,$,F,L)=>{let D=0;const G=g.length;let B=p.length-1,H=G-1;for(;D<=B&&D<=H;){const ee=p[D],le=g[D]=L?ar(g[D]):vn(g[D]);if(Di(ee,le))S(ee,le,b,null,C,N,$,F,L);else break;D++}for(;D<=B&&D<=H;){const ee=p[B],le=g[H]=L?ar(g[H]):vn(g[H]);if(Di(ee,le))S(ee,le,b,null,C,N,$,F,L);else break;B--,H--}if(D>B){if(D<=H){const ee=H+1,le=ee<G?g[ee].el:R;for(;D<=H;)S(null,g[D]=L?ar(g[D]):vn(g[D]),b,le,C,N,$,F,L),D++}}else if(D>H)for(;D<=B;)dn(p[D],C,N,!0),D++;else{const ee=D,le=D,be=new Map;for(D=le;D<=H;D++){const Vt=g[D]=L?ar(g[D]):vn(g[D]);Vt.key!=null&&be.set(Vt.key,D)}let ye,Ot=0;const xt=H-le+1;let fn=!1,pn=0;const Ni=new Array(xt);for(D=0;D<xt;D++)Ni[D]=0;for(D=ee;D<=B;D++){const Vt=p[D];if(Ot>=xt){dn(Vt,C,N,!0);continue}let mn;if(Vt.key!=null)mn=be.get(Vt.key);else for(ye=le;ye<=H;ye++)if(Ni[ye-le]===0&&Di(Vt,g[ye])){mn=ye;break}mn===void 0?dn(Vt,C,N,!0):(Ni[mn-le]=D+1,mn>=pn?pn=mn:fn=!0,S(Vt,g[mn],b,null,C,N,$,F,L),Ot++)}const Xd=fn?Y_(Ni):xs;for(ye=Xd.length-1,D=xt-1;D>=0;D--){const Vt=le+D,mn=g[Vt],Zd=g[Vt+1],ef=Vt+1<G?Zd.el||Zd.placeholder:R;Ni[D]===0?S(null,mn,b,ef,C,N,$,F,L):fn&&(ye<0||D!==Xd[ye]?xr(mn,b,ef,2):ye--)}}},xr=(p,g,b,R,C=null)=>{const{el:N,type:$,transition:F,children:L,shapeFlag:D}=p;if(D&6){xr(p.component.subTree,g,b,R);return}if(D&128){p.suspense.move(g,b,R);return}if(D&64){$.move(p,g,b,Ci);return}if($===re){r(N,g,b);for(let B=0;B<L.length;B++)xr(L[B],g,b,R);r(p.anchor,g,b);return}if($===Sa){v(p,g,b);return}if(R!==2&&D&1&&F)if(R===0)F.beforeEnter(N),r(N,g,b),$t(()=>F.enter(N),C);else{const{leave:B,delayLeave:H,afterLeave:ee}=F,le=()=>{p.ctx.isUnmounted?s(N):r(N,g,b)},be=()=>{B(N,()=>{le(),ee&&ee()})};H?H(N,le,be):be()}else r(N,g,b)},dn=(p,g,b,R=!1,C=!1)=>{const{type:N,props:$,ref:F,children:L,dynamicChildren:D,shapeFlag:G,patchFlag:B,dirs:H,cacheIndex:ee}=p;if(B===-2&&(C=!1),F!=null&&(Hn(),Ki(F,null,b,p,!0),zn()),ee!=null&&(g.renderCache[ee]=void 0),G&256){g.ctx.deactivate(p);return}const le=G&1&&H,be=!Hi(p);let ye;if(be&&(ye=$&&$.onVnodeBeforeUnmount)&&gn(ye,g,p),G&6)EI(p.component,b,R);else{if(G&128){p.suspense.unmount(b,R);return}le&&Pr(p,null,g,"beforeUnmount"),G&64?p.type.remove(p,g,b,Ci,R):D&&!D.hasOnce&&(N!==re||B>0&&B&64)?ki(D,g,b,!1,!0):(N===re&&B&384||!C&&G&16)&&ki(L,g,b),R&&Yd(p)}(be&&(ye=$&&$.onVnodeUnmounted)||le)&&$t(()=>{ye&&gn(ye,g,p),le&&Pr(p,null,g,"unmounted")},b)},Yd=p=>{const{type:g,el:b,anchor:R,transition:C}=p;if(g===re){TI(b,R);return}if(g===Sa){_(p);return}const N=()=>{s(b),C&&!C.persisted&&C.afterLeave&&C.afterLeave()};if(p.shapeFlag&1&&C&&!C.persisted){const{leave:$,delayLeave:F}=C,L=()=>$(b,N);F?F(p.el,N,L):L()}else N()},TI=(p,g)=>{let b;for(;p!==g;)b=d(p),s(p),p=b;s(g)},EI=(p,g,b)=>{const{bum:R,scope:C,job:N,subTree:$,um:F,m:L,a:D,parent:G,slots:{__:B}}=p;df(L),df(D),R&&Ta(R),G&&Y(B)&&B.forEach(H=>{G.renderCache[H]=void 0}),C.stop(),N&&(N.flags|=8,dn($,p,g,b)),F&&$t(F,g),$t(()=>{p.isUnmounted=!0},g),g&&g.pendingBranch&&!g.isUnmounted&&p.asyncDep&&!p.asyncResolved&&p.suspenseId===g.pendingId&&(g.deps--,g.deps===0&&g.resolve())},ki=(p,g,b,R=!1,C=!1,N=0)=>{for(let $=N;$<p.length;$++)dn(p[$],g,b,R,C)},ua=p=>{if(p.shapeFlag&6)return ua(p.component.subTree);if(p.shapeFlag&128)return p.suspense.next();const g=d(p.anchor||p.el),b=g&&g[y_];return b?d(b):g};let bl=!1;const Jd=(p,g,b)=>{p==null?g._vnode&&dn(g._vnode,null,null,!0):S(g._vnode||null,p,g,null,null,null,b),g._vnode=p,bl||(bl=!0,of(),Vm(),bl=!1)},Ci={p:S,um:dn,m:xr,r:Yd,mt:un,mc:oe,pc:_e,pbc:Se,n:ua,o:t};return{render:Jd,hydrate:void 0,createApp:V_(Jd)}}function Nl({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Mr({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Q_(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function rg(t,e,n=!1){const r=t.children,s=e.children;if(Y(r)&&Y(s))for(let i=0;i<r.length;i++){const o=r[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=ar(s[i]),a.el=o.el),!n&&a.patchFlag!==-2&&rg(o,a)),a.type===Dc&&(a.el=o.el),a.type===wr&&!a.el&&(a.el=o.el)}}function Y_(t){const e=t.slice(),n=[0];let r,s,i,o,a;const c=t.length;for(r=0;r<c;r++){const l=t[r];if(l!==0){if(s=n[n.length-1],t[s]<l){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<l?i=a+1:o=a;l<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function sg(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:sg(e)}function df(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const J_=Symbol.for("v-scx"),X_=()=>Ea(J_);function pr(t,e,n){return ig(t,e,n)}function ig(t,e,n=Ie){const{immediate:r,deep:s,flush:i,once:o}=n,a=Dt({},n),c=e&&r||!e&&i!=="post";let l;if(oo){if(i==="sync"){const f=X_();l=f.__watcherHandles||(f.__watcherHandles=[])}else if(!c){const f=()=>{};return f.stop=Sn,f.resume=Sn,f.pause=Sn,f}}const u=kt;a.call=(f,y,S)=>Dn(f,u,y,S);let h=!1;i==="post"?a.scheduler=f=>{$t(f,u&&u.suspense)}:i!=="sync"&&(h=!0,a.scheduler=(f,y)=>{y?f():rh(f)}),a.augmentJob=f=>{e&&(f.flags|=4),h&&(f.flags|=2,u&&(f.id=u.uid,f.i=u))};const d=d_(t,e,a);return oo&&(l?l.push(d):c&&d()),d}function Z_(t,e,n){const r=this.proxy,s=je(t)?t.includes(".")?og(r,t):()=>r[t]:t.bind(r,r);let i;ie(e)?i=e:(i=e.handler,n=e);const o=Fo(this),a=ig(s,i.bind(r),n);return o(),a}function og(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const eb=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${yr(e)}Modifiers`]||t[`${us(e)}Modifiers`];function tb(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Ie;let s=n;const i=e.startsWith("update:"),o=i&&eb(r,e.slice(7));o&&(o.trim&&(s=n.map(u=>je(u)?u.trim():u)),o.number&&(s=n.map($a)));let a,c=r[a=Tl(e)]||r[a=Tl(yr(e))];!c&&i&&(c=r[a=Tl(us(e))]),c&&Dn(c,t,6,s);const l=r[a+"Once"];if(l){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,Dn(l,t,6,s)}}function ag(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},a=!1;if(!ie(t)){const c=l=>{const u=ag(l,e,!0);u&&(a=!0,Dt(o,u))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!a?(Ce(t)&&r.set(t,null),null):(Y(i)?i.forEach(c=>o[c]=null):Dt(o,i),Ce(t)&&r.set(t,o),o)}function Rc(t,e){return!t||!Ec(e)?!1:(e=e.slice(2).replace(/Once$/,""),ge(t,e[0].toLowerCase()+e.slice(1))||ge(t,us(e))||ge(t,e))}function ff(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:a,emit:c,render:l,renderCache:u,props:h,data:d,setupState:f,ctx:y,inheritAttrs:S}=t,T=Wa(t);let A,w;try{if(n.shapeFlag&4){const _=s||r,P=_;A=vn(l.call(P,_,u,h,f,d,y)),w=a}else{const _=e;A=vn(_.length>1?_(h,{attrs:a,slots:o,emit:c}):_(h,null)),w=e.props?a:nb(a)}}catch(_){Gi.length=0,Cc(_,t,1),A=en(wr)}let v=A;if(w&&S!==!1){const _=Object.keys(w),{shapeFlag:P}=v;_.length&&P&7&&(i&&_.some(Ku)&&(w=rb(w,i)),v=js(v,w,!1,!0))}return n.dirs&&(v=js(v,null,!1,!0),v.dirs=v.dirs?v.dirs.concat(n.dirs):n.dirs),n.transition&&sh(v,n.transition),A=v,Wa(T),A}const nb=t=>{let e;for(const n in t)(n==="class"||n==="style"||Ec(n))&&((e||(e={}))[n]=t[n]);return e},rb=(t,e)=>{const n={};for(const r in t)(!Ku(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function sb(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:a,patchFlag:c}=e,l=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?pf(r,o,l):!!o;if(c&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const d=u[h];if(o[d]!==r[d]&&!Rc(l,d))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?pf(r,o,l):!0:!!o;return!1}function pf(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!Rc(n,i))return!0}return!1}function ib({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const cg=t=>t.__isSuspense;function ob(t,e){e&&e.pendingBranch?Y(t)?e.effects.push(...t):e.effects.push(t):m_(t)}const re=Symbol.for("v-fgt"),Dc=Symbol.for("v-txt"),wr=Symbol.for("v-cmt"),Sa=Symbol.for("v-stc"),Gi=[];let Kt=null;function M(t=!1){Gi.push(Kt=t?null:[])}function ab(){Gi.pop(),Kt=Gi[Gi.length-1]||null}let io=1;function mf(t,e=!1){io+=t,t<0&&Kt&&e&&(Kt.hasOnce=!0)}function lg(t){return t.dynamicChildren=io>0?Kt||xs:null,ab(),io>0&&Kt&&Kt.push(t),t}function U(t,e,n,r,s,i){return lg(m(t,e,n,r,s,i,!0))}function Fr(t,e,n,r,s){return lg(en(t,e,n,r,s,!0))}function ug(t){return t?t.__v_isVNode===!0:!1}function Di(t,e){return t.type===e.type&&t.key===e.key}const hg=({key:t})=>t??null,Aa=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?je(t)||vt(t)||ie(t)?{i:Jt,r:t,k:e,f:!!n}:t:null);function m(t,e=null,n=null,r=0,s=null,i=t===re?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&hg(e),ref:e&&Aa(e),scopeId:qm,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Jt};return a?(ah(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=je(n)?8:16),io>0&&!o&&Kt&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Kt.push(c),c}const en=cb;function cb(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===D_)&&(t=wr),ug(t)){const a=js(t,e,!0);return n&&ah(a,n),io>0&&!i&&Kt&&(a.shapeFlag&6?Kt[Kt.indexOf(t)]=a:Kt.push(a)),a.patchFlag=-2,a}if(_b(t)&&(t=t.__vccOpts),e){e=lb(e);let{class:a,style:c}=e;a&&!je(a)&&(e.class=Bt(a)),Ce(c)&&(nh(c)&&!Y(c)&&(c=Dt({},c)),e.style=Gu(c))}const o=je(t)?1:cg(t)?128:v_(t)?64:Ce(t)?4:ie(t)?2:0;return m(t,e,n,r,s,o,i,!0)}function lb(t){return t?nh(t)||Jm(t)?Dt({},t):t:null}function js(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:a,transition:c}=t,l=e?db(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:l,key:l&&hg(l),ref:e&&e.ref?n&&i?Y(i)?i.concat(Aa(e)):[i,Aa(e)]:Aa(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==re?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&js(t.ssContent),ssFallback:t.ssFallback&&js(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return c&&r&&sh(u,c.clone(u)),u}function ub(t=" ",e=0){return en(Dc,null,t,e)}function hb(t,e){const n=en(Sa,null,t);return n.staticCount=e,n}function Yt(t="",e=!1){return e?(M(),Fr(wr,null,t)):en(wr,null,t)}function vn(t){return t==null||typeof t=="boolean"?en(wr):Y(t)?en(re,null,t.slice()):ug(t)?ar(t):en(Dc,null,String(t))}function ar(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:js(t)}function ah(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(Y(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),ah(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!Jm(e)?e._ctx=Jt:s===3&&Jt&&(Jt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else ie(e)?(e={default:e,_ctx:Jt},n=32):(e=String(e),r&64?(n=16,e=[ub(e)]):n=8);t.children=e,t.shapeFlag|=n}function db(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Bt([e.class,r.class]));else if(s==="style")e.style=Gu([e.style,r.style]);else if(Ec(s)){const i=e[s],o=r[s];o&&i!==o&&!(Y(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function gn(t,e,n,r=null){Dn(t,e,7,[n,r])}const fb=Gm();let pb=0;function mb(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||fb,i={uid:pb++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new FI(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Zm(r,s),emitsOptions:ag(r,s),emit:null,emitted:null,propsDefaults:Ie,inheritAttrs:r.inheritAttrs,ctx:Ie,data:Ie,props:Ie,attrs:Ie,slots:Ie,refs:Ie,setupState:Ie,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=tb.bind(null,i),t.ce&&t.ce(i),i}let kt=null;const gb=()=>kt||Jt;let Ha,iu;{const t=Ac(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};Ha=e("__VUE_INSTANCE_SETTERS__",n=>kt=n),iu=e("__VUE_SSR_SETTERS__",n=>oo=n)}const Fo=t=>{const e=kt;return Ha(t),t.scope.on(),()=>{t.scope.off(),Ha(e)}},gf=()=>{kt&&kt.scope.off(),Ha(null)};function dg(t){return t.vnode.shapeFlag&4}let oo=!1;function yb(t,e=!1,n=!1){e&&iu(e);const{props:r,children:s}=t.vnode,i=dg(t);q_(t,r,i,e),K_(t,s,n||e);const o=i?vb(t,e):void 0;return e&&iu(!1),o}function vb(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,O_);const{setup:r}=n;if(r){Hn();const s=t.setupContext=r.length>1?Ib(t):null,i=Fo(t),o=Lo(r,t,0,[t.props,s]),a=fm(o);if(zn(),i(),(a||t.sp)&&!Hi(t)&&Bm(t),a){if(o.then(gf,gf),e)return o.then(c=>{yf(t,c)}).catch(c=>{Cc(c,t,0)});t.asyncDep=o}else yf(t,o)}else fg(t)}function yf(t,e,n){ie(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Ce(e)&&(t.setupState=Mm(e)),fg(t)}function fg(t,e,n){const r=t.type;t.render||(t.render=r.render||Sn);{const s=Fo(t);Hn();try{x_(t)}finally{zn(),s()}}}const wb={get(t,e){return ft(t,"get",""),t[e]}};function Ib(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,wb),slots:t.slots,emit:t.emit,expose:e}}function Oc(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Mm(s_(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in zi)return zi[n](t)},has(e,n){return n in e||n in zi}})):t.proxy}function _b(t){return ie(t)&&"__vccOpts"in t}const Ct=(t,e)=>u_(t,e,oo),bb="3.5.18";/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ou;const vf=typeof window<"u"&&window.trustedTypes;if(vf)try{ou=vf.createPolicy("vue",{createHTML:t=>t})}catch{}const pg=ou?t=>ou.createHTML(t):t=>t,Tb="http://www.w3.org/2000/svg",Eb="http://www.w3.org/1998/Math/MathML",Ln=typeof document<"u"?document:null,wf=Ln&&Ln.createElement("template"),Sb={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?Ln.createElementNS(Tb,t):e==="mathml"?Ln.createElementNS(Eb,t):n?Ln.createElement(t,{is:n}):Ln.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>Ln.createTextNode(t),createComment:t=>Ln.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Ln.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{wf.innerHTML=pg(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const a=wf.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Ab=Symbol("_vtc");function kb(t,e,n){const r=t[Ab];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const za=Symbol("_vod"),mg=Symbol("_vsh"),Ur={beforeMount(t,{value:e},{transition:n}){t[za]=t.style.display==="none"?"":t.style.display,n&&e?n.beforeEnter(t):Oi(t,e)},mounted(t,{value:e},{transition:n}){n&&e&&n.enter(t)},updated(t,{value:e,oldValue:n},{transition:r}){!e!=!n&&(r?e?(r.beforeEnter(t),Oi(t,!0),r.enter(t)):r.leave(t,()=>{Oi(t,!1)}):Oi(t,e))},beforeUnmount(t,{value:e}){Oi(t,e)}};function Oi(t,e){t.style.display=e?t[za]:"none",t[mg]=!e}const Cb=Symbol(""),Nb=/(^|;)\s*display\s*:/;function Rb(t,e,n){const r=t.style,s=je(n);let i=!1;if(n&&!s){if(e)if(je(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&ka(r,a,"")}else for(const o in e)n[o]==null&&ka(r,o,"");for(const o in n)o==="display"&&(i=!0),ka(r,o,n[o])}else if(s){if(e!==n){const o=r[Cb];o&&(n+=";"+o),r.cssText=n,i=Nb.test(n)}}else e&&t.removeAttribute("style");za in t&&(t[za]=i?r.display:"",t[mg]&&(r.display="none"))}const If=/\s*!important$/;function ka(t,e,n){if(Y(n))n.forEach(r=>ka(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=Db(t,e);If.test(n)?t.setProperty(us(r),n.replace(If,""),"important"):t[r]=n}}const _f=["Webkit","Moz","ms"],Rl={};function Db(t,e){const n=Rl[e];if(n)return n;let r=yr(e);if(r!=="filter"&&r in t)return Rl[e]=r;r=gm(r);for(let s=0;s<_f.length;s++){const i=_f[s]+r;if(i in t)return Rl[e]=i}return e}const bf="http://www.w3.org/1999/xlink";function Tf(t,e,n,r,s,i=MI(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(bf,e.slice(6,e.length)):t.setAttributeNS(bf,e,n):n==null||i&&!ym(n)?t.removeAttribute(e):t.setAttribute(e,i?"":Nn(n)?String(n):n)}function Ef(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?pg(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(a!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=ym(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function lr(t,e,n,r){t.addEventListener(e,n,r)}function Ob(t,e,n,r){t.removeEventListener(e,n,r)}const Sf=Symbol("_vei");function xb(t,e,n,r,s=null){const i=t[Sf]||(t[Sf]={}),o=i[e];if(r&&o)o.value=r;else{const[a,c]=Pb(e);if(r){const l=i[e]=Fb(r,s);lr(t,a,l,c)}else o&&(Ob(t,a,o,c),i[e]=void 0)}}const Af=/(?:Once|Passive|Capture)$/;function Pb(t){let e;if(Af.test(t)){e={};let r;for(;r=t.match(Af);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):us(t.slice(2)),e]}let Dl=0;const Mb=Promise.resolve(),Lb=()=>Dl||(Mb.then(()=>Dl=0),Dl=Date.now());function Fb(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Dn(Ub(r,n.value),e,5,[r])};return n.value=t,n.attached=Lb(),n}function Ub(t,e){if(Y(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const kf=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Vb=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?kb(t,r,o):e==="style"?Rb(t,n,r):Ec(e)?Ku(e)||xb(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):$b(t,e,r,o))?(Ef(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Tf(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!je(r))?Ef(t,yr(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),Tf(t,e,r,o))};function $b(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&kf(e)&&ie(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return kf(e)&&je(n)?!1:e in t}const Ws=t=>{const e=t.props["onUpdate:modelValue"]||!1;return Y(e)?n=>Ta(e,n):e};function qb(t){t.target.composing=!0}function Cf(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const jn=Symbol("_assign"),gt={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[jn]=Ws(s);const i=r||s.props&&s.props.type==="number";lr(t,e?"change":"input",o=>{if(o.target.composing)return;let a=t.value;n&&(a=a.trim()),i&&(a=$a(a)),t[jn](a)}),n&&lr(t,"change",()=>{t.value=t.value.trim()}),e||(lr(t,"compositionstart",qb),lr(t,"compositionend",Cf),lr(t,"change",Cf))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(t[jn]=Ws(o),t.composing)return;const a=(i||t.type==="number")&&!/^0\d/.test(t.value)?$a(t.value):t.value,c=e??"";a!==c&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===c)||(t.value=c))}},Bb={deep:!0,created(t,e,n){t[jn]=Ws(n),lr(t,"change",()=>{const r=t._modelValue,s=ao(t),i=t.checked,o=t[jn];if(Y(r)){const a=Qu(r,s),c=a!==-1;if(i&&!c)o(r.concat(s));else if(!i&&c){const l=[...r];l.splice(a,1),o(l)}}else if(hi(r)){const a=new Set(r);i?a.add(s):a.delete(s),o(a)}else o(gg(t,i))})},mounted:Nf,beforeUpdate(t,e,n){t[jn]=Ws(n),Nf(t,e,n)}};function Nf(t,{value:e,oldValue:n},r){t._modelValue=e;let s;if(Y(e))s=Qu(e,r.props.value)>-1;else if(hi(e))s=e.has(r.props.value);else{if(e===n)return;s=Mo(e,gg(t,!0))}t.checked!==s&&(t.checked=s)}const Pe={deep:!0,created(t,{value:e,modifiers:{number:n}},r){const s=hi(e);lr(t,"change",()=>{const i=Array.prototype.filter.call(t.options,o=>o.selected).map(o=>n?$a(ao(o)):ao(o));t[jn](t.multiple?s?new Set(i):i:i[0]),t._assigning=!0,Fm(()=>{t._assigning=!1})}),t[jn]=Ws(r)},mounted(t,{value:e}){Rf(t,e)},beforeUpdate(t,e,n){t[jn]=Ws(n)},updated(t,{value:e}){t._assigning||Rf(t,e)}};function Rf(t,e){const n=t.multiple,r=Y(e);if(!(n&&!r&&!hi(e))){for(let s=0,i=t.options.length;s<i;s++){const o=t.options[s],a=ao(o);if(n)if(r){const c=typeof a;c==="string"||c==="number"?o.selected=e.some(l=>String(l)===String(a)):o.selected=Qu(e,a)>-1}else o.selected=e.has(a);else if(Mo(ao(o),e)){t.selectedIndex!==s&&(t.selectedIndex=s);return}}!n&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function ao(t){return"_value"in t?t._value:t.value}function gg(t,e){const n=e?"_trueValue":"_falseValue";return n in t?t[n]:e}const jb=["ctrl","shift","alt","meta"],Wb={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>jb.some(n=>t[`${n}Key`]&&!e.includes(n))},Kb=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=(s,...i)=>{for(let o=0;o<e.length;o++){const a=Wb[e[o]];if(a&&a(s,e))return}return t(s,...i)})},Hb=Dt({patchProp:Vb},Sb);let Df;function zb(){return Df||(Df=z_(Hb))}const Gb=(...t)=>{const e=zb().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=Yb(r);if(!s)return;const i=e._component;!ie(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,Qb(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function Qb(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Yb(t){return je(t)?document.querySelector(t):t}/**
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
 *//**
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
 */const yg=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Jb=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},vg={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,u=i>>2,h=(i&3)<<4|a>>4;let d=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(d=64)),r.push(n[u],n[h],n[d],n[f])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(yg(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Jb(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||l==null||h==null)throw Error();const d=i<<2|a>>4;if(r.push(d),l!==64){const f=a<<4&240|l>>2;if(r.push(f),h!==64){const y=l<<6&192|h;r.push(y)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},Xb=function(t){const e=yg(t);return vg.encodeByteArray(e,!0)},Of=function(t){return Xb(t).replace(/\./g,"")},Zb=function(t){try{return vg.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Ga(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!eT(n)||(t[n]=Ga(t[n],e[n]));return t}function eT(t){return t!=="__proto__"}/**
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
 */class tT{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function nT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Of(JSON.stringify(n)),Of(JSON.stringify(o)),""].join(".")}/**
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
 */function Ne(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function wg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ne())}function ch(){try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function rT(){return typeof self=="object"&&self.self===self}function lh(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function xc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function sT(){return Ne().indexOf("Electron/")>=0}function uh(){const t=Ne();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function iT(){return Ne().indexOf("MSAppHost/")>=0}function oT(){return!ch()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Qa(){return typeof indexedDB=="object"}/**
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
 */const aT="FirebaseError";class tn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=aT,Object.setPrototypeOf(this,tn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,hs.prototype.create)}}class hs{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?cT(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new tn(s,a,r)}}function cT(t,e){return t.replace(lT,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const lT=/\{\$([^}]+)}/g;/**
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
 */function xf(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function uT(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function au(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Pf(i)&&Pf(o)){if(!au(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Pf(t){return t!==null&&typeof t=="object"}/**
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
 */function di(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Rs(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Vi(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Ig(t,e){const n=new hT(t,e);return n.subscribe.bind(n)}class hT{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");dT(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Ol),s.error===void 0&&(s.error=Ol),s.complete===void 0&&(s.complete=Ol);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function dT(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ol(){}/**
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
 */function z(t){return t&&t._delegate?t._delegate:t}class Gn{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Vr="[DEFAULT]";/**
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
 */class fT{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new tT;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(mT(e))try{this.getOrInitializeService({instanceIdentifier:Vr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Vr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Vr){return this.instances.has(e)}getOptions(e=Vr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:pT(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Vr){return this.component?this.component.multipleInstances?e:Vr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function pT(t){return t===Vr?void 0:t}function mT(t){return t.instantiationMode==="EAGER"}/**
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
 */class gT{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new fT(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */const hh=[];var he;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(he||(he={}));const _g={debug:he.DEBUG,verbose:he.VERBOSE,info:he.INFO,warn:he.WARN,error:he.ERROR,silent:he.SILENT},yT=he.INFO,vT={[he.DEBUG]:"log",[he.VERBOSE]:"log",[he.INFO]:"info",[he.WARN]:"warn",[he.ERROR]:"error"},wT=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=vT[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Pc{constructor(e){this.name=e,this._logLevel=yT,this._logHandler=wT,this._userLogHandler=null,hh.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in he))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?_g[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,he.DEBUG,...e),this._logHandler(this,he.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,he.VERBOSE,...e),this._logHandler(this,he.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,he.INFO,...e),this._logHandler(this,he.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,he.WARN,...e),this._logHandler(this,he.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,he.ERROR,...e),this._logHandler(this,he.ERROR,...e)}}function IT(t){hh.forEach(e=>{e.setLogLevel(t)})}function _T(t,e){for(const n of hh){let r=null;e&&e.level&&(r=_g[e.level]),t===null?n.userLogHandler=null:n.userLogHandler=(s,i,...o)=>{const a=o.map(c=>{if(c==null)return null;if(typeof c=="string")return c;if(typeof c=="number"||typeof c=="boolean")return c.toString();if(c instanceof Error)return c.message;try{return JSON.stringify(c)}catch{return null}}).filter(c=>c).join(" ");i>=(r??s.logLevel)&&t({level:he[i].toLowerCase(),message:a,args:o,type:s.name})}}}/**
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
 */class bT{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(TT(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function TT(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const cu="@firebase/app",Mf="0.7.11";/**
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
 */const dh=new Pc("@firebase/app"),ET="@firebase/app-compat",ST="@firebase/analytics-compat",AT="@firebase/analytics",kT="@firebase/app-check-compat",CT="@firebase/app-check",NT="@firebase/auth",RT="@firebase/auth-compat",DT="@firebase/database",OT="@firebase/database-compat",xT="@firebase/functions",PT="@firebase/functions-compat",MT="@firebase/installations",LT="@firebase/installations-compat",FT="@firebase/messaging",UT="@firebase/messaging-compat",VT="@firebase/performance",$T="@firebase/performance-compat",qT="@firebase/remote-config",BT="@firebase/remote-config-compat",jT="@firebase/storage",WT="@firebase/storage-compat",KT="@firebase/firestore",HT="@firebase/firestore-compat",zT="firebase",GT="9.6.1";/**
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
 */const Xr="[DEFAULT]",QT={[cu]:"fire-core",[ET]:"fire-core-compat",[AT]:"fire-analytics",[ST]:"fire-analytics-compat",[CT]:"fire-app-check",[kT]:"fire-app-check-compat",[NT]:"fire-auth",[RT]:"fire-auth-compat",[DT]:"fire-rtdb",[OT]:"fire-rtdb-compat",[xT]:"fire-fn",[PT]:"fire-fn-compat",[MT]:"fire-iid",[LT]:"fire-iid-compat",[FT]:"fire-fcm",[UT]:"fire-fcm-compat",[VT]:"fire-perf",[$T]:"fire-perf-compat",[qT]:"fire-rc",[BT]:"fire-rc-compat",[jT]:"fire-gcs",[WT]:"fire-gcs-compat",[KT]:"fire-fst",[HT]:"fire-fst-compat","fire-js":"fire-js",[zT]:"fire-js-all"};/**
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
 */const Ir=new Map,co=new Map;function Ya(t,e){try{t.container.addComponent(e)}catch(n){dh.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function bg(t,e){t.container.addOrOverwriteComponent(e)}function Zr(t){const e=t.name;if(co.has(e))return dh.debug(`There were multiple attempts to register component ${e}.`),!1;co.set(e,t);for(const n of Ir.values())Ya(n,t);return!0}function Tg(t,e){return t.container.getProvider(e)}function YT(t,e,n=Xr){Tg(t,e).clearInstance(n)}function JT(){co.clear()}/**
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
 */const XT={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."},lo=new hs("app","Firebase",XT);/**
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
 */let ZT=class{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Gn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw lo.create("app-deleted",{appName:this._name})}};/**
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
 */const ds=GT;function Eg(t,e={}){typeof e!="object"&&(e={name:e});const n=Object.assign({name:Xr,automaticDataCollectionEnabled:!1},e),r=n.name;if(typeof r!="string"||!r)throw lo.create("bad-app-name",{appName:String(r)});const s=Ir.get(r);if(s){if(au(t,s.options)&&au(n,s.config))return s;throw lo.create("duplicate-app",{appName:r})}const i=new gT(r);for(const a of co.values())i.addComponent(a);const o=new ZT(t,n,i);return Ir.set(r,o),o}function eE(t=Xr){const e=Ir.get(t);if(!e)throw lo.create("no-app",{appName:t});return e}function tE(){return Array.from(Ir.values())}async function Sg(t){const e=t.name;Ir.has(e)&&(Ir.delete(e),await Promise.all(t.container.getProviders().map(n=>n.delete())),t.isDeleted=!0)}function An(t,e,n){var r;let s=(r=QT[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),dh.warn(a.join(" "));return}Zr(new Gn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}function Ag(t,e){if(t!==null&&typeof t!="function")throw lo.create("invalid-log-argument");_T(t,e)}function kg(t){IT(t)}/**
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
 */function nE(t){Zr(new Gn("platform-logger",e=>new bT(e),"PRIVATE")),An(cu,Mf,t),An(cu,Mf,"esm2017"),An("fire-js","")}nE("");const rE=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:tn,SDK_VERSION:ds,_DEFAULT_ENTRY_NAME:Xr,_addComponent:Ya,_addOrOverwriteComponent:bg,_apps:Ir,_clearComponents:JT,_components:co,_getProvider:Tg,_registerComponent:Zr,_removeServiceInstance:YT,deleteApp:Sg,getApp:eE,getApps:tE,initializeApp:Eg,onLog:Ag,registerVersion:An,setLogLevel:kg},Symbol.toStringTag,{value:"Module"}));/**
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
 */class sE{constructor(e,n){this._delegate=e,this.firebase=n,Ya(e,new Gn("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),Sg(this._delegate)))}_getService(e,n=Xr){var r;this._delegate.checkDestroyed();const s=this._delegate.container.getProvider(e);return!s.isInitialized()&&((r=s.getComponent())===null||r===void 0?void 0:r.instantiationMode)==="EXPLICIT"&&s.initialize(),s.getImmediate({identifier:n})}_removeServiceInstance(e,n=Xr){this._delegate.container.getProvider(e).clearInstance(n)}_addComponent(e){Ya(this._delegate,e)}_addOrOverwriteComponent(e){bg(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}/**
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
 */const iE={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},Lf=new hs("app-compat","Firebase",iE);/**
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
 */function oE(t){const e={},n={__esModule:!0,initializeApp:i,app:s,registerVersion:An,setLogLevel:kg,onLog:Ag,apps:null,SDK_VERSION:ds,INTERNAL:{registerComponent:a,removeApp:r,useAsService:c,modularAPIs:rE}};n.default=n,Object.defineProperty(n,"apps",{get:o});function r(l){delete e[l]}function s(l){if(l=l||Xr,!xf(e,l))throw Lf.create("no-app",{appName:l});return e[l]}s.App=t;function i(l,u={}){const h=Eg(l,u);if(xf(e,h.name))return e[h.name];const d=new t(h,n);return e[h.name]=d,d}function o(){return Object.keys(e).map(l=>e[l])}function a(l){const u=l.name,h=u.replace("-compat","");if(Zr(l)&&l.type==="PUBLIC"){const d=(f=s())=>{if(typeof f[h]!="function")throw Lf.create("invalid-app-argument",{appName:u});return f[h]()};l.serviceProps!==void 0&&Ga(d,l.serviceProps),n[h]=d,t.prototype[h]=function(...f){return this._getService.bind(this,u).apply(this,l.multipleInstances?f:[])}}return l.type==="PUBLIC"?n[h]:null}function c(l,u){return u==="serverAuth"?null:u}return n}/**
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
 */function Cg(){const t=oE(sE);t.INTERNAL=Object.assign(Object.assign({},t.INTERNAL),{createFirebaseNamespace:Cg,extendNamespace:e,createSubscribe:Ig,ErrorFactory:hs,deepExtend:Ga});function e(n){Ga(t,n)}return t}const aE=Cg();/**
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
 */const Ff=new Pc("@firebase/app-compat"),cE="@firebase/app-compat",lE="0.1.12";/**
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
 */function uE(t){An(cE,lE,t)}/**
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
 */if(rT()&&self.firebase!==void 0){Ff.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);const t=self.firebase.SDK_VERSION;t&&t.indexOf("LITE")>=0&&Ff.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `)}const Gt=aE;uE();var hE="firebase",dE="9.6.1";/**
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
 */Gt.registerVersion(hE,dE,"app-compat");var fE=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},j,fh=fh||{},te=fE||self;function Ja(){}function lu(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function Mc(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function pE(t,e,n){return t.call.apply(t.bind,arguments)}function mE(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,r),t.apply(e,s)}}return function(){return t.apply(e,arguments)}}function ct(t,e,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?ct=pE:ct=mE,ct.apply(null,arguments)}function pa(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var r=n.slice();return r.push.apply(r,arguments),t.apply(this,r)}}function dt(t,e){function n(){}n.prototype=e.prototype,t.Z=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Vb=function(r,s,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[s].apply(r,o)}}function kr(){this.s=this.s,this.o=this.o}var gE=0;kr.prototype.s=!1;kr.prototype.na=function(){!this.s&&(this.s=!0,this.M(),gE!=0)};kr.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Ng=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},Rg=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){const r=t.length,s=typeof t=="string"?t.split(""):t;for(let i=0;i<r;i++)i in s&&e.call(n,s[i],i,t)};function yE(t){e:{var e=lS;const n=t.length,r=typeof t=="string"?t.split(""):t;for(let s=0;s<n;s++)if(s in r&&e.call(void 0,r[s],s,t)){e=s;break e}e=-1}return 0>e?null:typeof t=="string"?t.charAt(e):t[e]}function Uf(t){return Array.prototype.concat.apply([],arguments)}function ph(t){const e=t.length;if(0<e){const n=Array(e);for(let r=0;r<e;r++)n[r]=t[r];return n}return[]}function Xa(t){return/^[\s\xa0]*$/.test(t)}var Vf=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function St(t,e){return t.indexOf(e)!=-1}function xl(t,e){return t<e?-1:t>e?1:0}var At;e:{var $f=te.navigator;if($f){var qf=$f.userAgent;if(qf){At=qf;break e}}At=""}function mh(t,e,n){for(const r in t)e.call(n,t[r],r,t)}function Dg(t){const e={};for(const n in t)e[n]=t[n];return e}var Bf="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Og(t,e){let n,r;for(let s=1;s<arguments.length;s++){r=arguments[s];for(n in r)t[n]=r[n];for(let i=0;i<Bf.length;i++)n=Bf[i],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function gh(t){return gh[" "](t),t}gh[" "]=Ja;function vE(t){var e=_E;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=t(9)}var wE=St(At,"Opera"),Ks=St(At,"Trident")||St(At,"MSIE"),xg=St(At,"Edge"),uu=xg||Ks,Pg=St(At,"Gecko")&&!(St(At.toLowerCase(),"webkit")&&!St(At,"Edge"))&&!(St(At,"Trident")||St(At,"MSIE"))&&!St(At,"Edge"),IE=St(At.toLowerCase(),"webkit")&&!St(At,"Edge");function Mg(){var t=te.document;return t?t.documentMode:void 0}var Za;e:{var Pl="",Ml=function(){var t=At;if(Pg)return/rv:([^\);]+)(\)|;)/.exec(t);if(xg)return/Edge\/([\d\.]+)/.exec(t);if(Ks)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(IE)return/WebKit\/(\S+)/.exec(t);if(wE)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(Ml&&(Pl=Ml?Ml[1]:""),Ks){var Ll=Mg();if(Ll!=null&&Ll>parseFloat(Pl)){Za=String(Ll);break e}}Za=Pl}var _E={};function bE(){return vE(function(){let t=0;const e=Vf(String(Za)).split("."),n=Vf("9").split("."),r=Math.max(e.length,n.length);for(let o=0;t==0&&o<r;o++){var s=e[o]||"",i=n[o]||"";do{if(s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],s[0].length==0&&i[0].length==0)break;t=xl(s[1].length==0?0:parseInt(s[1],10),i[1].length==0?0:parseInt(i[1],10))||xl(s[2].length==0,i[2].length==0)||xl(s[2],i[2]),s=s[3],i=i[3]}while(t==0)}return 0<=t})}var hu;if(te.document&&Ks){var jf=Mg();hu=jf||parseInt(Za,10)||void 0}else hu=void 0;var TE=hu,EE=function(){if(!te.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{te.addEventListener("test",Ja,e),te.removeEventListener("test",Ja,e)}catch{}return t}();function wt(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}wt.prototype.h=function(){this.defaultPrevented=!0};function uo(t,e){if(wt.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(Pg){e:{try{gh(e.nodeName);var s=!0;break e}catch{}s=!1}s||(e=null)}}else n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:SE[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&uo.Z.h.call(this)}}dt(uo,wt);var SE={2:"touch",3:"pen",4:"mouse"};uo.prototype.h=function(){uo.Z.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var Lc="closure_listenable_"+(1e6*Math.random()|0),AE=0;function kE(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.ia=s,this.key=++AE,this.ca=this.fa=!1}function Fc(t){t.ca=!0,t.listener=null,t.proxy=null,t.src=null,t.ia=null}function Uc(t){this.src=t,this.g={},this.h=0}Uc.prototype.add=function(t,e,n,r,s){var i=t.toString();t=this.g[i],t||(t=this.g[i]=[],this.h++);var o=fu(t,e,r,s);return-1<o?(e=t[o],n||(e.fa=!1)):(e=new kE(e,this.src,i,!!r,s),e.fa=n,t.push(e)),e};function du(t,e){var n=e.type;if(n in t.g){var r=t.g[n],s=Ng(r,e),i;(i=0<=s)&&Array.prototype.splice.call(r,s,1),i&&(Fc(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function fu(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.ca&&i.listener==e&&i.capture==!!n&&i.ia==r)return s}return-1}var yh="closure_lm_"+(1e6*Math.random()|0),Fl={};function Lg(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Lg(t,e[i],n,r,s);return null}return n=Vg(n),t&&t[Lc]?t.N(e,n,Mc(r)?!!r.capture:!1,s):CE(t,e,n,!1,r,s)}function CE(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var o=Mc(s)?!!s.capture:!!s,a=wh(t);if(a||(t[yh]=a=new Uc(t)),n=a.add(e,n,r,o,i),n.proxy)return n;if(r=NE(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)EE||(s=o),s===void 0&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(Ug(e.toString()),r);else if(t.addListener&&t.removeListener)t.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function NE(){function t(n){return e.call(t.src,t.listener,n)}var e=RE;return t}function Fg(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)Fg(t,e[i],n,r,s);else r=Mc(r)?!!r.capture:!!r,n=Vg(n),t&&t[Lc]?(t=t.i,e=String(e).toString(),e in t.g&&(i=t.g[e],n=fu(i,n,r,s),-1<n&&(Fc(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete t.g[e],t.h--)))):t&&(t=wh(t))&&(e=t.g[e.toString()],t=-1,e&&(t=fu(e,n,r,s)),(n=-1<t?e[t]:null)&&vh(n))}function vh(t){if(typeof t!="number"&&t&&!t.ca){var e=t.src;if(e&&e[Lc])du(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Ug(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=wh(e))?(du(n,t),n.h==0&&(n.src=null,e[yh]=null)):Fc(t)}}}function Ug(t){return t in Fl?Fl[t]:Fl[t]="on"+t}function RE(t,e){if(t.ca)t=!0;else{e=new uo(e,this);var n=t.listener,r=t.ia||t.src;t.fa&&vh(t),t=n.call(r,e)}return t}function wh(t){return t=t[yh],t instanceof Uc?t:null}var Ul="__closure_events_fn_"+(1e9*Math.random()>>>0);function Vg(t){return typeof t=="function"?t:(t[Ul]||(t[Ul]=function(e){return t.handleEvent(e)}),t[Ul])}function Xe(){kr.call(this),this.i=new Uc(this),this.P=this,this.I=null}dt(Xe,kr);Xe.prototype[Lc]=!0;Xe.prototype.removeEventListener=function(t,e,n,r){Fg(this,t,e,n,r)};function lt(t,e){var n,r=t.I;if(r)for(n=[];r;r=r.I)n.push(r);if(t=t.P,r=e.type||e,typeof e=="string")e=new wt(e,t);else if(e instanceof wt)e.target=e.target||t;else{var s=e;e=new wt(r,t),Og(e,s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];s=ma(o,r,!0,e)&&s}if(o=e.g=t,s=ma(o,r,!0,e)&&s,s=ma(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)o=e.g=n[i],s=ma(o,r,!1,e)&&s}Xe.prototype.M=function(){if(Xe.Z.M.call(this),this.i){var t=this.i,e;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)Fc(n[r]);delete t.g[e],t.h--}}this.I=null};Xe.prototype.N=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)};Xe.prototype.O=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};function ma(t,e,n,r){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.ca&&o.capture==n){var a=o.listener,c=o.ia||o.src;o.fa&&du(t.i,o),s=a.call(c,r)!==!1&&s}}return s&&!r.defaultPrevented}var Ih=te.JSON.stringify;function DE(){var t=qg;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class OE{constructor(){this.h=this.g=null}add(e,n){const r=$g.get();r.set(e,n),this.h?this.h.next=r:this.g=r,this.h=r}}var $g=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new xE,t=>t.reset());class xE{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function PE(t){te.setTimeout(()=>{throw t},0)}function _h(t,e){pu||ME(),mu||(pu(),mu=!0),qg.add(t,e)}var pu;function ME(){var t=te.Promise.resolve(void 0);pu=function(){t.then(LE)}}var mu=!1,qg=new OE;function LE(){for(var t;t=DE();){try{t.h.call(t.g)}catch(n){PE(n)}var e=$g;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}mu=!1}function Vc(t,e){Xe.call(this),this.h=t||1,this.g=e||te,this.j=ct(this.kb,this),this.l=Date.now()}dt(Vc,Xe);j=Vc.prototype;j.da=!1;j.S=null;j.kb=function(){if(this.da){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-t):(this.S&&(this.g.clearTimeout(this.S),this.S=null),lt(this,"tick"),this.da&&(bh(this),this.start()))}};j.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function bh(t){t.da=!1,t.S&&(t.g.clearTimeout(t.S),t.S=null)}j.M=function(){Vc.Z.M.call(this),bh(this),delete this.g};function Th(t,e,n){if(typeof t=="function")n&&(t=ct(t,n));else if(t&&typeof t.handleEvent=="function")t=ct(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:te.setTimeout(t,e||0)}function Bg(t){t.g=Th(()=>{t.g=null,t.i&&(t.i=!1,Bg(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class FE extends kr{constructor(e,n){super(),this.m=e,this.j=n,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:Bg(this)}M(){super.M(),this.g&&(te.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ho(t){kr.call(this),this.h=t,this.g={}}dt(ho,kr);var Wf=[];function jg(t,e,n,r){Array.isArray(n)||(n&&(Wf[0]=n.toString()),n=Wf);for(var s=0;s<n.length;s++){var i=Lg(e,n[s],r||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function Wg(t){mh(t.g,function(e,n){this.g.hasOwnProperty(n)&&vh(e)},t),t.g={}}ho.prototype.M=function(){ho.Z.M.call(this),Wg(this)};ho.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function $c(){this.g=!0}$c.prototype.Aa=function(){this.g=!1};function UE(t,e,n,r,s,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var l=a[c].split("=");if(1<l.length){var u=l[0];l=l[1];var h=u.split("_");o=2<=h.length&&h[1]=="type"?o+(u+"="+l+"&"):o+(u+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+`
`+n+`
`+o})}function VE(t,e,n,r,s,i,o){t.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+`
`+n+`
`+i+" "+o})}function Ds(t,e,n,r){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+qE(t,n)+(r?" "+r:"")})}function $E(t,e){t.info(function(){return"TIMEOUT: "+e})}$c.prototype.info=function(){};function qE(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n){for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return Ih(n)}catch{return e}}var fs={},Kf=null;function qc(){return Kf=Kf||new Xe}fs.Ma="serverreachability";function Kg(t){wt.call(this,fs.Ma,t)}dt(Kg,wt);function fo(t){const e=qc();lt(e,new Kg(e))}fs.STAT_EVENT="statevent";function Hg(t,e){wt.call(this,fs.STAT_EVENT,t),this.stat=e}dt(Hg,wt);function Nt(t){const e=qc();lt(e,new Hg(e,t))}fs.Na="timingevent";function zg(t,e){wt.call(this,fs.Na,t),this.size=e}dt(zg,wt);function Uo(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return te.setTimeout(function(){t()},e)}var Bc={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},Gg={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function Eh(){}Eh.prototype.h=null;function Hf(t){return t.h||(t.h=t.i())}function Qg(){}var Vo={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function Sh(){wt.call(this,"d")}dt(Sh,wt);function Ah(){wt.call(this,"c")}dt(Ah,wt);var gu;function jc(){}dt(jc,Eh);jc.prototype.g=function(){return new XMLHttpRequest};jc.prototype.i=function(){return{}};gu=new jc;function $o(t,e,n,r){this.l=t,this.j=e,this.m=n,this.X=r||1,this.V=new ho(this),this.P=BE,t=uu?125:void 0,this.W=new Vc(t),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new Yg}function Yg(){this.i=null,this.g="",this.h=!1}var BE=45e3,yu={},ec={};j=$o.prototype;j.setTimeout=function(t){this.P=t};function vu(t,e,n){t.K=1,t.v=Kc(Qn(e)),t.s=n,t.U=!0,Jg(t,null)}function Jg(t,e){t.F=Date.now(),qo(t),t.A=Qn(t.v);var n=t.A,r=t.X;Array.isArray(r)||(r=[String(r)]),sy(n.h,"t",r),t.C=0,n=t.l.H,t.h=new Yg,t.g=Ey(t.l,n?e:null,!t.s),0<t.O&&(t.L=new FE(ct(t.Ia,t,t.g),t.O)),jg(t.V,t.g,"readystatechange",t.gb),e=t.H?Dg(t.H):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.s,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),fo(),UE(t.j,t.u,t.A,t.m,t.X,t.s)}j.gb=function(t){t=t.target;const e=this.L;e&&Vn(t)==3?e.l():this.Ia(t)};j.Ia=function(t){try{if(t==this.g)e:{const u=Vn(this.g);var e=this.g.Da();const h=this.g.ba();if(!(3>u)&&(u!=3||uu||this.g&&(this.h.h||this.g.ga()||Yf(this.g)))){this.I||u!=4||e==7||(e==8||0>=h?fo(3):fo(2)),Wc(this);var n=this.g.ba();this.N=n;t:if(Xg(this)){var r=Yf(this.g);t="";var s=r.length,i=Vn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Br(this),Qi(this);var o="";break t}this.h.i=new te.TextDecoder}for(e=0;e<s;e++)this.h.h=!0,t+=this.h.i.decode(r[e],{stream:i&&e==s-1});r.splice(0,s),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ga();if(this.i=n==200,VE(this.j,this.u,this.A,this.m,this.X,u,n),this.i){if(this.$&&!this.J){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Xa(a)){var l=a;break t}}l=null}if(n=l)Ds(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,wu(this,n);else{this.i=!1,this.o=3,Nt(12),Br(this),Qi(this);break e}}this.U?(Zg(this,u,o),uu&&this.i&&u==3&&(jg(this.V,this.W,"tick",this.fb),this.W.start())):(Ds(this.j,this.m,o,null),wu(this,o)),u==4&&Br(this),this.i&&!this.I&&(u==4?Iy(this.l,this):(this.i=!1,qo(this)))}else n==400&&0<o.indexOf("Unknown SID")?(this.o=3,Nt(12)):(this.o=0,Nt(13)),Br(this),Qi(this)}}}catch{}finally{}};function Xg(t){return t.g?t.u=="GET"&&t.K!=2&&t.l.Ba:!1}function Zg(t,e,n){let r=!0,s;for(;!t.I&&t.C<n.length;)if(s=jE(t,n),s==ec){e==4&&(t.o=4,Nt(14),r=!1),Ds(t.j,t.m,null,"[Incomplete Response]");break}else if(s==yu){t.o=4,Nt(15),Ds(t.j,t.m,n,"[Invalid Chunk]"),r=!1;break}else Ds(t.j,t.m,s,null),wu(t,s);Xg(t)&&s!=ec&&s!=yu&&(t.h.g="",t.C=0),e!=4||n.length!=0||t.h.h||(t.o=1,Nt(16),r=!1),t.i=t.i&&r,r?0<n.length&&!t.aa&&(t.aa=!0,e=t.l,e.g==t&&e.$&&!e.L&&(e.h.info("Great, no buffering proxy detected. Bytes received: "+n.length),Mh(e),e.L=!0,Nt(11))):(Ds(t.j,t.m,n,"[Invalid Chunked Response]"),Br(t),Qi(t))}j.fb=function(){if(this.g){var t=Vn(this.g),e=this.g.ga();this.C<e.length&&(Wc(this),Zg(this,t,e),this.i&&t!=4&&qo(this))}};function jE(t,e){var n=t.C,r=e.indexOf(`
`,n);return r==-1?ec:(n=Number(e.substring(n,r)),isNaN(n)?yu:(r+=1,r+n>e.length?ec:(e=e.substr(r,n),t.C=r+n,e)))}j.cancel=function(){this.I=!0,Br(this)};function qo(t){t.Y=Date.now()+t.P,ey(t,t.P)}function ey(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=Uo(ct(t.eb,t),e)}function Wc(t){t.B&&(te.clearTimeout(t.B),t.B=null)}j.eb=function(){this.B=null;const t=Date.now();0<=t-this.Y?($E(this.j,this.A),this.K!=2&&(fo(),Nt(17)),Br(this),this.o=2,Qi(this)):ey(this,this.Y-t)};function Qi(t){t.l.G==0||t.I||Iy(t.l,t)}function Br(t){Wc(t);var e=t.L;e&&typeof e.na=="function"&&e.na(),t.L=null,bh(t.W),Wg(t.V),t.g&&(e=t.g,t.g=null,e.abort(),e.na())}function wu(t,e){try{var n=t.l;if(n.G!=0&&(n.g==t||Iu(n.i,t))){if(n.I=t.N,!t.J&&Iu(n.i,t)&&n.G==3){try{var r=n.Ca.g.parse(e)}catch{r=null}if(Array.isArray(r)&&r.length==3){var s=r;if(s[0]==0){e:if(!n.u){if(n.g)if(n.g.F+3e3<t.F)sc(n),Gc(n);else break e;Ph(n),Nt(18)}}else n.ta=s[1],0<n.ta-n.U&&37500>s[2]&&n.N&&n.A==0&&!n.v&&(n.v=Uo(ct(n.ab,n),6e3));if(1>=ay(n.i)&&n.ka){try{n.ka()}catch{}n.ka=void 0}}else jr(n,11)}else if((t.J||n.g==t)&&sc(n),!Xa(e))for(s=n.Ca.g.parse(e),e=0;e<s.length;e++){let l=s[e];if(n.U=l[0],l=l[1],n.G==2)if(l[0]=="c"){n.J=l[1],n.la=l[2];const u=l[3];u!=null&&(n.ma=u,n.h.info("VER="+n.ma));const h=l[4];h!=null&&(n.za=h,n.h.info("SVER="+n.za));const d=l[5];d!=null&&typeof d=="number"&&0<d&&(r=1.5*d,n.K=r,n.h.info("backChannelRequestTimeoutMs_="+r)),r=n;const f=t.g;if(f){const y=f.g?f.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(y){var i=r.i;!i.g&&(St(y,"spdy")||St(y,"quic")||St(y,"h2"))&&(i.j=i.l,i.g=new Set,i.h&&(Nh(i,i.h),i.h=null))}if(r.D){const S=f.g?f.g.getResponseHeader("X-HTTP-Session-Id"):null;S&&(r.sa=S,Re(r.F,r.D,S))}}n.G=3,n.j&&n.j.xa(),n.$&&(n.O=Date.now()-t.F,n.h.info("Handshake RTT: "+n.O+"ms")),r=n;var o=t;if(r.oa=Ty(r,r.H?r.la:null,r.W),o.J){cy(r.i,o);var a=o,c=r.K;c&&a.setTimeout(c),a.B&&(Wc(a),qo(a)),r.g=o}else vy(r);0<n.l.length&&Qc(n)}else l[0]!="stop"&&l[0]!="close"||jr(n,7);else n.G==3&&(l[0]=="stop"||l[0]=="close"?l[0]=="stop"?jr(n,7):xh(n):l[0]!="noop"&&n.j&&n.j.wa(l),n.A=0)}}fo(4)}catch{}}function WE(t){if(t.R&&typeof t.R=="function")return t.R();if(typeof t=="string")return t.split("");if(lu(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}e=[],n=0;for(r in t)e[n++]=t[r];return e}function kh(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(lu(t)||typeof t=="string")Rg(t,e,void 0);else{if(t.T&&typeof t.T=="function")var n=t.T();else if(t.R&&typeof t.R=="function")n=void 0;else if(lu(t)||typeof t=="string"){n=[];for(var r=t.length,s=0;s<r;s++)n.push(s)}else for(s in n=[],r=0,t)n[r++]=s;r=WE(t),s=r.length;for(var i=0;i<s;i++)e.call(void 0,r[i],n&&n[i],t)}}function fi(t,e){this.h={},this.g=[],this.i=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(t)if(t instanceof fi)for(n=t.T(),r=0;r<n.length;r++)this.set(n[r],t.get(n[r]));else for(r in t)this.set(r,t[r])}j=fi.prototype;j.R=function(){Ch(this);for(var t=[],e=0;e<this.g.length;e++)t.push(this.h[this.g[e]]);return t};j.T=function(){return Ch(this),this.g.concat()};function Ch(t){if(t.i!=t.g.length){for(var e=0,n=0;e<t.g.length;){var r=t.g[e];es(t.h,r)&&(t.g[n++]=r),e++}t.g.length=n}if(t.i!=t.g.length){var s={};for(n=e=0;e<t.g.length;)r=t.g[e],es(s,r)||(t.g[n++]=r,s[r]=1),e++;t.g.length=n}}j.get=function(t,e){return es(this.h,t)?this.h[t]:e};j.set=function(t,e){es(this.h,t)||(this.i++,this.g.push(t)),this.h[t]=e};j.forEach=function(t,e){for(var n=this.T(),r=0;r<n.length;r++){var s=n[r],i=this.get(s);t.call(e,i,s,this)}};function es(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var ty=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function KE(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function ts(t,e){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,t instanceof ts){this.g=e!==void 0?e:t.g,tc(this,t.j),this.s=t.s,nc(this,t.i),rc(this,t.m),this.l=t.l,e=t.h;var n=new po;n.i=e.i,e.g&&(n.g=new fi(e.g),n.h=e.h),zf(this,n),this.o=t.o}else t&&(n=String(t).match(ty))?(this.g=!!e,tc(this,n[1]||"",!0),this.s=Yi(n[2]||""),nc(this,n[3]||"",!0),rc(this,n[4]),this.l=Yi(n[5]||"",!0),zf(this,n[6]||"",!0),this.o=Yi(n[7]||"")):(this.g=!!e,this.h=new po(null,this.g))}ts.prototype.toString=function(){var t=[],e=this.j;e&&t.push($i(e,Gf,!0),":");var n=this.i;return(n||e=="file")&&(t.push("//"),(e=this.s)&&t.push($i(e,Gf,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&t.push(":",String(n))),(n=this.l)&&(this.i&&n.charAt(0)!="/"&&t.push("/"),t.push($i(n,n.charAt(0)=="/"?YE:QE,!0))),(n=this.h.toString())&&t.push("?",n),(n=this.o)&&t.push("#",$i(n,XE)),t.join("")};function Qn(t){return new ts(t)}function tc(t,e,n){t.j=n?Yi(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function nc(t,e,n){t.i=n?Yi(e,!0):e}function rc(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function zf(t,e,n){e instanceof po?(t.h=e,ZE(t.h,t.g)):(n||(e=$i(e,JE)),t.h=new po(e,t.g))}function Re(t,e,n){t.h.set(e,n)}function Kc(t){return Re(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function HE(t){return t instanceof ts?Qn(t):new ts(t,void 0)}function zE(t,e,n,r){var s=new ts(null,void 0);return t&&tc(s,t),e&&nc(s,e),n&&rc(s,n),r&&(s.l=r),s}function Yi(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function $i(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,GE),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function GE(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var Gf=/[#\/\?@]/g,QE=/[#\?:]/g,YE=/[#\?]/g,JE=/[#\?@]/g,XE=/#/g;function po(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function Cr(t){t.g||(t.g=new fi,t.h=0,t.i&&KE(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}j=po.prototype;j.add=function(t,e){Cr(this),this.i=null,t=pi(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function ny(t,e){Cr(t),e=pi(t,e),es(t.g.h,e)&&(t.i=null,t.h-=t.g.get(e).length,t=t.g,es(t.h,e)&&(delete t.h[e],t.i--,t.g.length>2*t.i&&Ch(t)))}function ry(t,e){return Cr(t),e=pi(t,e),es(t.g.h,e)}j.forEach=function(t,e){Cr(this),this.g.forEach(function(n,r){Rg(n,function(s){t.call(e,s,r,this)},this)},this)};j.T=function(){Cr(this);for(var t=this.g.R(),e=this.g.T(),n=[],r=0;r<e.length;r++)for(var s=t[r],i=0;i<s.length;i++)n.push(e[r]);return n};j.R=function(t){Cr(this);var e=[];if(typeof t=="string")ry(this,t)&&(e=Uf(e,this.g.get(pi(this,t))));else{t=this.g.R();for(var n=0;n<t.length;n++)e=Uf(e,t[n])}return e};j.set=function(t,e){return Cr(this),this.i=null,t=pi(this,t),ry(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};j.get=function(t,e){return t?(t=this.R(t),0<t.length?String(t[0]):e):e};function sy(t,e,n){ny(t,e),0<n.length&&(t.i=null,t.g.set(pi(t,e),ph(n)),t.h+=n.length)}j.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var t=[],e=this.g.T(),n=0;n<e.length;n++){var r=e[n],s=encodeURIComponent(String(r));r=this.R(r);for(var i=0;i<r.length;i++){var o=s;r[i]!==""&&(o+="="+encodeURIComponent(String(r[i]))),t.push(o)}}return this.i=t.join("&")};function pi(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function ZE(t,e){e&&!t.j&&(Cr(t),t.i=null,t.g.forEach(function(n,r){var s=r.toLowerCase();r!=s&&(ny(this,r),sy(this,s,n))},t)),t.j=e}var eS=class{constructor(t,e){this.h=t,this.g=e}};function iy(t){this.l=t||tS,te.PerformanceNavigationTiming?(t=te.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(te.g&&te.g.Ea&&te.g.Ea()&&te.g.Ea().Zb),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var tS=10;function oy(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function ay(t){return t.h?1:t.g?t.g.size:0}function Iu(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function Nh(t,e){t.g?t.g.add(e):t.h=e}function cy(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}iy.prototype.cancel=function(){if(this.i=ly(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function ly(t){if(t.h!=null)return t.i.concat(t.h.D);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return ph(t.i)}function Rh(){}Rh.prototype.stringify=function(t){return te.JSON.stringify(t,void 0)};Rh.prototype.parse=function(t){return te.JSON.parse(t,void 0)};function nS(){this.g=new Rh}function rS(t,e,n){const r=n||"";try{kh(t,function(s,i){let o=s;Mc(s)&&(o=Ih(s)),e.push(r+i+"="+encodeURIComponent(o))})}catch(s){throw e.push(r+"type="+encodeURIComponent("_badmap")),s}}function sS(t,e){const n=new $c;if(te.Image){const r=new Image;r.onload=pa(ga,n,r,"TestLoadImage: loaded",!0,e),r.onerror=pa(ga,n,r,"TestLoadImage: error",!1,e),r.onabort=pa(ga,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=pa(ga,n,r,"TestLoadImage: timeout",!1,e),te.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=t}else e(!1)}function ga(t,e,n,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch{}}function Bo(t){this.l=t.$b||null,this.j=t.ib||!1}dt(Bo,Eh);Bo.prototype.g=function(){return new Hc(this.l,this.j)};Bo.prototype.i=function(t){return function(){return t}}({});function Hc(t,e){Xe.call(this),this.D=t,this.u=e,this.m=void 0,this.readyState=Dh,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}dt(Hc,Xe);var Dh=0;j=Hc.prototype;j.open=function(t,e){if(this.readyState!=Dh)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,mo(this)};j.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||te).fetch(new Request(this.B,e)).then(this.Va.bind(this),this.ha.bind(this))};j.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,jo(this)),this.readyState=Dh};j.Va=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,mo(this)),this.g&&(this.readyState=3,mo(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(typeof te.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;uy(this)}else t.text().then(this.Ua.bind(this),this.ha.bind(this))};function uy(t){t.j.read().then(t.Sa.bind(t)).catch(t.ha.bind(t))}j.Sa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?jo(this):mo(this),this.readyState==3&&uy(this)}};j.Ua=function(t){this.g&&(this.response=this.responseText=t,jo(this))};j.Ta=function(t){this.g&&(this.response=t,jo(this))};j.ha=function(){this.g&&jo(this)};function jo(t){t.readyState=4,t.l=null,t.j=null,t.A=null,mo(t)}j.setRequestHeader=function(t,e){this.v.append(t,e)};j.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};j.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function mo(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(Hc.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var iS=te.JSON.parse;function We(t){Xe.call(this),this.headers=new fi,this.u=t||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=hy,this.K=this.L=!1}dt(We,Xe);var hy="",oS=/^https?$/i,aS=["POST","PUT"];j=We.prototype;j.ea=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+t);e=e?e.toUpperCase():"GET",this.H=t,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():gu.g(),this.C=this.u?Hf(this.u):Hf(gu),this.g.onreadystatechange=ct(this.Fa,this);try{this.F=!0,this.g.open(e,String(t),!0),this.F=!1}catch(i){Qf(this,i);return}t=n||"";const s=new fi(this.headers);r&&kh(r,function(i,o){s.set(o,i)}),r=yE(s.T()),n=te.FormData&&t instanceof te.FormData,!(0<=Ng(aS,e))||r||n||s.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),s.forEach(function(i,o){this.g.setRequestHeader(o,i)},this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{py(this),0<this.B&&((this.K=cS(this.g))?(this.g.timeout=this.B,this.g.ontimeout=ct(this.pa,this)):this.A=Th(this.pa,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(i){Qf(this,i)}};function cS(t){return Ks&&bE()&&typeof t.timeout=="number"&&t.ontimeout!==void 0}function lS(t){return t.toLowerCase()=="content-type"}j.pa=function(){typeof fh<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,lt(this,"timeout"),this.abort(8))};function Qf(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,dy(t),zc(t)}function dy(t){t.D||(t.D=!0,lt(t,"complete"),lt(t,"error"))}j.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,lt(this,"complete"),lt(this,"abort"),zc(this))};j.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),zc(this,!0)),We.Z.M.call(this)};j.Fa=function(){this.s||(this.F||this.v||this.l?fy(this):this.cb())};j.cb=function(){fy(this)};function fy(t){if(t.h&&typeof fh<"u"&&(!t.C[1]||Vn(t)!=4||t.ba()!=2)){if(t.v&&Vn(t)==4)Th(t.Fa,0,t);else if(lt(t,"readystatechange"),Vn(t)==4){t.h=!1;try{const a=t.ba();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var n;if(!(n=e)){var r;if(r=a===0){var s=String(t.H).match(ty)[1]||null;if(!s&&te.self&&te.self.location){var i=te.self.location.protocol;s=i.substr(0,i.length-1)}r=!oS.test(s?s.toLowerCase():"")}n=r}if(n)lt(t,"complete"),lt(t,"success");else{t.m=6;try{var o=2<Vn(t)?t.g.statusText:""}catch{o=""}t.j=o+" ["+t.ba()+"]",dy(t)}}finally{zc(t)}}}}function zc(t,e){if(t.g){py(t);const n=t.g,r=t.C[0]?Ja:null;t.g=null,t.C=null,e||lt(t,"ready");try{n.onreadystatechange=r}catch{}}}function py(t){t.g&&t.K&&(t.g.ontimeout=null),t.A&&(te.clearTimeout(t.A),t.A=null)}function Vn(t){return t.g?t.g.readyState:0}j.ba=function(){try{return 2<Vn(this)?this.g.status:-1}catch{return-1}};j.ga=function(){try{return this.g?this.g.responseText:""}catch{return""}};j.Qa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),iS(e)}};function Yf(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.J){case hy:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}j.Da=function(){return this.m};j.La=function(){return typeof this.j=="string"?this.j:String(this.j)};function uS(t){let e="";return mh(t,function(n,r){e+=r,e+=":",e+=n,e+=`\r
`}),e}function Oh(t,e,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=uS(n),typeof t=="string"?n!=null&&encodeURIComponent(String(n)):Re(t,e,n))}function xi(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function my(t){this.za=0,this.l=[],this.h=new $c,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=xi("failFast",!1,t),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=xi("baseRetryDelayMs",5e3,t),this.$a=xi("retryDelaySeedMs",1e4,t),this.Ya=xi("forwardChannelMaxRetries",2,t),this.ra=xi("forwardChannelRequestTimeoutMs",2e4,t),this.qa=t&&t.xmlHttpFactory||void 0,this.Ba=t&&t.Yb||!1,this.K=void 0,this.H=t&&t.supportsCrossDomainXhr||!1,this.J="",this.i=new iy(t&&t.concurrentRequestLimit),this.Ca=new nS,this.ja=t&&t.fastHandshake||!1,this.Ra=t&&t.Wb||!1,t&&t.Aa&&this.h.Aa(),t&&t.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&t&&t.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!t||t.Xb!==!1}j=my.prototype;j.ma=8;j.G=1;function xh(t){if(gy(t),t.G==3){var e=t.V++,n=Qn(t.F);Re(n,"SID",t.J),Re(n,"RID",e),Re(n,"TYPE","terminate"),Wo(t,n),e=new $o(t,t.h,e,void 0),e.K=2,e.v=Kc(Qn(n)),n=!1,te.navigator&&te.navigator.sendBeacon&&(n=te.navigator.sendBeacon(e.v.toString(),"")),!n&&te.Image&&(new Image().src=e.v,n=!0),n||(e.g=Ey(e.l,null),e.g.ea(e.v)),e.F=Date.now(),qo(e)}by(t)}j.hb=function(t){try{this.h.info("Origin Trials invoked: "+t)}catch{}};function Gc(t){t.g&&(Mh(t),t.g.cancel(),t.g=null)}function gy(t){Gc(t),t.u&&(te.clearTimeout(t.u),t.u=null),sc(t),t.i.cancel(),t.m&&(typeof t.m=="number"&&te.clearTimeout(t.m),t.m=null)}function Vl(t,e){t.l.push(new eS(t.Za++,e)),t.G==3&&Qc(t)}function Qc(t){oy(t.i)||t.m||(t.m=!0,_h(t.Ha,t),t.C=0)}function hS(t,e){return ay(t.i)>=t.i.j-(t.m?1:0)?!1:t.m?(t.l=e.D.concat(t.l),!0):t.G==1||t.G==2||t.C>=(t.Xa?0:t.Ya)?!1:(t.m=Uo(ct(t.Ha,t,e),_y(t,t.C)),t.C++,!0)}j.Ha=function(t){if(this.m)if(this.m=null,this.G==1){if(!t){this.V=Math.floor(1e5*Math.random()),t=this.V++;const s=new $o(this,this.h,t,void 0);let i=this.s;if(this.P&&(i?(i=Dg(i),Og(i,this.P)):i=this.P),this.o===null&&(s.H=i),this.ja)e:{for(var e=0,n=0;n<this.l.length;n++){t:{var r=this.l[n];if("__data__"in r.g&&(r=r.g.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(e+=r,4096<e){e=n;break e}if(e===4096||n===this.l.length-1){e=n+1;break e}}e=1e3}else e=1e3;e=yy(this,s,e),n=Qn(this.F),Re(n,"RID",t),Re(n,"CVER",22),this.D&&Re(n,"X-HTTP-Session-Id",this.D),Wo(this,n),this.o&&i&&Oh(n,this.o,i),Nh(this.i,s),this.Ra&&Re(n,"TYPE","init"),this.ja?(Re(n,"$req",e),Re(n,"SID","null"),s.$=!0,vu(s,n,null)):vu(s,n,e),this.G=2}}else this.G==3&&(t?Jf(this,t):this.l.length==0||oy(this.i)||Jf(this))};function Jf(t,e){var n;e?n=e.m:n=t.V++;const r=Qn(t.F);Re(r,"SID",t.J),Re(r,"RID",n),Re(r,"AID",t.U),Wo(t,r),t.o&&t.s&&Oh(r,t.o,t.s),n=new $o(t,t.h,n,t.C+1),t.o===null&&(n.H=t.s),e&&(t.l=e.D.concat(t.l)),e=yy(t,n,1e3),n.setTimeout(Math.round(.5*t.ra)+Math.round(.5*t.ra*Math.random())),Nh(t.i,n),vu(n,r,e)}function Wo(t,e){t.j&&kh({},function(n,r){Re(e,r,n)})}function yy(t,e,n){n=Math.min(t.l.length,n);var r=t.j?ct(t.j.Oa,t.j,t):null;e:{var s=t.l;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=s[0].h,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let c=0;c<n;c++){let l=s[c].h;const u=s[c].g;if(l-=i,0>l)i=Math.max(0,s[c].h-100),a=!1;else try{rS(u,o,"req"+l+"_")}catch{r&&r(u)}}if(a){r=o.join("&");break e}}}return t=t.l.splice(0,n),e.D=t,r}function vy(t){t.g||t.u||(t.Y=1,_h(t.Ga,t),t.A=0)}function Ph(t){return t.g||t.u||3<=t.A?!1:(t.Y++,t.u=Uo(ct(t.Ga,t),_y(t,t.A)),t.A++,!0)}j.Ga=function(){if(this.u=null,wy(this),this.$&&!(this.L||this.g==null||0>=this.O)){var t=2*this.O;this.h.info("BP detection timer enabled: "+t),this.B=Uo(ct(this.bb,this),t)}};j.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,Nt(10),Gc(this),wy(this))};function Mh(t){t.B!=null&&(te.clearTimeout(t.B),t.B=null)}function wy(t){t.g=new $o(t,t.h,"rpc",t.Y),t.o===null&&(t.g.H=t.s),t.g.O=0;var e=Qn(t.oa);Re(e,"RID","rpc"),Re(e,"SID",t.J),Re(e,"CI",t.N?"0":"1"),Re(e,"AID",t.U),Wo(t,e),Re(e,"TYPE","xmlhttp"),t.o&&t.s&&Oh(e,t.o,t.s),t.K&&t.g.setTimeout(t.K);var n=t.g;t=t.la,n.K=1,n.v=Kc(Qn(e)),n.s=null,n.U=!0,Jg(n,t)}j.ab=function(){this.v!=null&&(this.v=null,Gc(this),Ph(this),Nt(19))};function sc(t){t.v!=null&&(te.clearTimeout(t.v),t.v=null)}function Iy(t,e){var n=null;if(t.g==e){sc(t),Mh(t),t.g=null;var r=2}else if(Iu(t.i,e))n=e.D,cy(t.i,e),r=1;else return;if(t.I=e.N,t.G!=0){if(e.i)if(r==1){n=e.s?e.s.length:0,e=Date.now()-e.F;var s=t.C;r=qc(),lt(r,new zg(r,n)),Qc(t)}else vy(t);else if(s=e.o,s==3||s==0&&0<t.I||!(r==1&&hS(t,e)||r==2&&Ph(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),s){case 1:jr(t,5);break;case 4:jr(t,10);break;case 3:jr(t,6);break;default:jr(t,2)}}}function _y(t,e){let n=t.Pa+Math.floor(Math.random()*t.$a);return t.j||(n*=2),n*e}function jr(t,e){if(t.h.info("Error code "+e),e==2){var n=null;t.j&&(n=null);var r=ct(t.jb,t);n||(n=new ts("//www.google.com/images/cleardot.gif"),te.location&&te.location.protocol=="http"||tc(n,"https"),Kc(n)),sS(n.toString(),r)}else Nt(2);t.G=0,t.j&&t.j.va(e),by(t),gy(t)}j.jb=function(t){t?(this.h.info("Successfully pinged google.com"),Nt(2)):(this.h.info("Failed to ping google.com"),Nt(1))};function by(t){t.G=0,t.I=-1,t.j&&((ly(t.i).length!=0||t.l.length!=0)&&(t.i.i.length=0,ph(t.l),t.l.length=0),t.j.ua())}function Ty(t,e,n){let r=HE(n);if(r.i!="")e&&nc(r,e+"."+r.i),rc(r,r.m);else{const s=te.location;r=zE(s.protocol,e?e+"."+s.hostname:s.hostname,+s.port,n)}return t.aa&&mh(t.aa,function(s,i){Re(r,i,s)}),e=t.D,n=t.sa,e&&n&&Re(r,e,n),Re(r,"VER",t.ma),Wo(t,r),r}function Ey(t,e,n){if(e&&!t.H)throw Error("Can't create secondary domain capable XhrIo object.");return e=n&&t.Ba&&!t.qa?new We(new Bo({ib:!0})):new We(t.qa),e.L=t.H,e}function Sy(){}j=Sy.prototype;j.xa=function(){};j.wa=function(){};j.va=function(){};j.ua=function(){};j.Oa=function(){};function ic(){if(Ks&&!(10<=Number(TE)))throw Error("Environmental error: no available transport.")}ic.prototype.g=function(t,e){return new Qt(t,e)};function Qt(t,e){Xe.call(this),this.g=new my(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(t?t["X-WebChannel-Client-Profile"]=e.ya:t={"X-WebChannel-Client-Profile":e.ya}),this.g.P=t,(t=e&&e.httpHeadersOverwriteParam)&&!Xa(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Xa(e)&&(this.g.D=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new mi(this)}dt(Qt,Xe);Qt.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var t=this.g,e=this.l,n=this.h||void 0;t.Wa&&(t.h.info("Origin Trials enabled."),_h(ct(t.hb,t,e))),Nt(0),t.W=e,t.aa=n||{},t.N=t.X,t.F=Ty(t,null,t.W),Qc(t)};Qt.prototype.close=function(){xh(this.g)};Qt.prototype.u=function(t){if(typeof t=="string"){var e={};e.__data__=t,Vl(this.g,e)}else this.v?(e={},e.__data__=Ih(t),Vl(this.g,e)):Vl(this.g,t)};Qt.prototype.M=function(){this.g.j=null,delete this.j,xh(this.g),delete this.g,Qt.Z.M.call(this)};function Ay(t){Sh.call(this);var e=t.__sm__;if(e){e:{for(const n in e){t=n;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}dt(Ay,Sh);function ky(){Ah.call(this),this.status=1}dt(ky,Ah);function mi(t){this.g=t}dt(mi,Sy);mi.prototype.xa=function(){lt(this.g,"a")};mi.prototype.wa=function(t){lt(this.g,new Ay(t))};mi.prototype.va=function(t){lt(this.g,new ky)};mi.prototype.ua=function(){lt(this.g,"b")};ic.prototype.createWebChannel=ic.prototype.g;Qt.prototype.send=Qt.prototype.u;Qt.prototype.open=Qt.prototype.m;Qt.prototype.close=Qt.prototype.close;Bc.NO_ERROR=0;Bc.TIMEOUT=8;Bc.HTTP_ERROR=6;Gg.COMPLETE="complete";Qg.EventType=Vo;Vo.OPEN="a";Vo.CLOSE="b";Vo.ERROR="c";Vo.MESSAGE="d";Xe.prototype.listen=Xe.prototype.N;We.prototype.listenOnce=We.prototype.O;We.prototype.getLastError=We.prototype.La;We.prototype.getLastErrorCode=We.prototype.Da;We.prototype.getStatus=We.prototype.ba;We.prototype.getResponseJson=We.prototype.Qa;We.prototype.getResponseText=We.prototype.ga;We.prototype.send=We.prototype.ea;var dS=function(){return new ic},fS=function(){return qc()},$l=Bc,pS=Gg,mS=fs,Xf={rb:0,ub:1,vb:2,Ob:3,Tb:4,Qb:5,Rb:6,Pb:7,Nb:8,Sb:9,PROXY:10,NOPROXY:11,Lb:12,Hb:13,Ib:14,Gb:15,Jb:16,Kb:17,nb:18,mb:19,ob:20},gS=Bo,ya=Qg,yS=We,vS={};const Zf="@firebase/firestore";/**
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
 */class rt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}rt.UNAUTHENTICATED=new rt(null),rt.GOOGLE_CREDENTIALS=new rt("google-credentials-uid"),rt.FIRST_PARTY=new rt("first-party-uid"),rt.MOCK_USER=new rt("mock-user");/**
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
 */let gi="9.6.1";/**
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
 */const _r=new Pc("@firebase/firestore");function _u(){return _r.logLevel}function wS(t){_r.setLogLevel(t)}function x(t,...e){if(_r.logLevel<=he.DEBUG){const n=e.map(Lh);_r.debug(`Firestore (${gi}): ${t}`,...n)}}function qe(t,...e){if(_r.logLevel<=he.ERROR){const n=e.map(Lh);_r.error(`Firestore (${gi}): ${t}`,...n)}}function go(t,...e){if(_r.logLevel<=he.WARN){const n=e.map(Lh);_r.warn(`Firestore (${gi}): ${t}`,...n)}}function Lh(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
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
*/var e}/**
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
 */function K(t="Unexpected state"){const e=`FIRESTORE (${gi}) INTERNAL ASSERTION FAILED: `+t;throw qe(e),new Error(e)}function J(t,e){t||K()}function IS(t,e){t||K()}function V(t,e){return t}/**
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
 */const I={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends Error{constructor(e,n){super(n),this.code=e,this.message=n,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Qe{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class Cy{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class _S{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(rt.UNAUTHENTICATED))}shutdown(){}}class bS{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class TS{constructor(e){this.t=e,this.currentUser=rt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new Qe;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Qe,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},a=c=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Qe)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(J(typeof r.accessToken=="string"),new Cy(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return J(e===null||typeof e=="string"),new rt(e)}}class ES{constructor(e,n,r){this.type="FirstParty",this.user=rt.FIRST_PARTY,this.headers=new Map,this.headers.set("X-Goog-AuthUser",n);const s=e.auth.getAuthHeaderValueForFirstParty([]);s&&this.headers.set("Authorization",s),r&&this.headers.set("X-Goog-Iam-Authorization-Token",r)}}class SS{constructor(e,n,r){this.h=e,this.l=n,this.m=r}getToken(){return Promise.resolve(new ES(this.h,this.l,this.m))}start(e,n){e.enqueueRetryable(()=>n(rt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class AS{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class kS{constructor(e){this.g=e,this.forceRefresh=!1,this.appCheck=null}start(e,n){this.o=s=>{e.enqueueRetryable(()=>(i=>(i.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`),n(i.token)))(s))};const r=s=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.g.onInit(s=>r(s)),setTimeout(()=>{if(!this.appCheck){const s=this.g.getImmediate({optional:!0});s?r(s):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(J(typeof n.token=="string"),new AS(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2018 Google LLC
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
 */class Ht{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.p(r),this.T=r=>n.writeSequenceNumber(r))}p(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.T&&this.T(e),e}}/**
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
 */function CS(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
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
 */Ht.I=-1;class Ny{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=CS(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function ce(t,e){return t<e?-1:t>e?1:0}function Hs(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}function Ry(t){return t+"\0"}/**
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
 */class Ye{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new k(I.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new k(I.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new k(I.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new k(I.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ye.fromMillis(Date.now())}static fromDate(e){return Ye.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Ye(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ce(this.nanoseconds,e.nanoseconds):ce(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class se{constructor(e){this.timestamp=e}static fromTimestamp(e){return new se(e)}static min(){return new se(new Ye(0,0))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */function ep(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function ps(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Dy(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class yo{constructor(e,n,r){n===void 0?n=0:n>e.length&&K(),r===void 0?r=e.length-n:r>e.length-n&&K(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return yo.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof yo?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class pe extends yo{construct(e,n,r){return new pe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new k(I.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new pe(n)}static emptyPath(){return new pe([])}}const NS=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ot extends yo{construct(e,n,r){return new ot(e,n,r)}static isValidIdentifier(e){return NS.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ot.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ot(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new k(I.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new k(I.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new k(I.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new k(I.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ot(n)}static emptyPath(){return new ot([])}}/**
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
 */class zs{constructor(e){this.fields=e,e.sort(ot.comparator)}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Hs(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
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
 */function RS(){return typeof atob<"u"}/**
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
 */class Ze{constructor(e){this.binaryString=e}static fromBase64String(e){const n=atob(e);return new Ze(n)}static fromUint8Array(e){const n=function(r){let s="";for(let i=0;i<r.length;++i)s+=String.fromCharCode(r[i]);return s}(e);return new Ze(n)}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ce(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ze.EMPTY_BYTE_STRING=new Ze("");const DS=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function br(t){if(J(!!t),typeof t=="string"){let e=0;const n=DS.exec(t);if(J(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:$e(t.seconds),nanos:$e(t.nanos)}}function $e(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Gs(t){return typeof t=="string"?Ze.fromBase64String(t):Ze.fromUint8Array(t)}/**
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
 */function Fh(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Oy(t){const e=t.mapValue.fields.__previous_value__;return Fh(e)?Oy(e):e}function vo(t){const e=br(t.mapValue.fields.__local_write_time__.timestampValue);return new Ye(e.seconds,e.nanos)}/**
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
 */function ms(t){return t==null}function oc(t){return t===0&&1/t==-1/0}function xy(t){return typeof t=="number"&&Number.isInteger(t)&&!oc(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */class W{constructor(e){this.path=e}static fromPath(e){return new W(pe.fromString(e))}static fromName(e){return new W(pe.fromString(e).popFirst(5))}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}isEqual(e){return e!==null&&pe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return pe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new W(new pe(e.slice()))}}/**
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
 */function ns(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Fh(t)?4:10:K()}function On(t,e){const n=ns(t);if(n!==ns(e))return!1;switch(n){case 0:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return vo(t).isEqual(vo(e));case 3:return function(r,s){if(typeof r.timestampValue=="string"&&typeof s.timestampValue=="string"&&r.timestampValue.length===s.timestampValue.length)return r.timestampValue===s.timestampValue;const i=br(r.timestampValue),o=br(s.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(r,s){return Gs(r.bytesValue).isEqual(Gs(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(r,s){return $e(r.geoPointValue.latitude)===$e(s.geoPointValue.latitude)&&$e(r.geoPointValue.longitude)===$e(s.geoPointValue.longitude)}(t,e);case 2:return function(r,s){if("integerValue"in r&&"integerValue"in s)return $e(r.integerValue)===$e(s.integerValue);if("doubleValue"in r&&"doubleValue"in s){const i=$e(r.doubleValue),o=$e(s.doubleValue);return i===o?oc(i)===oc(o):isNaN(i)&&isNaN(o)}return!1}(t,e);case 9:return Hs(t.arrayValue.values||[],e.arrayValue.values||[],On);case 10:return function(r,s){const i=r.mapValue.fields||{},o=s.mapValue.fields||{};if(ep(i)!==ep(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!On(i[a],o[a])))return!1;return!0}(t,e);default:return K()}}function wo(t,e){return(t.values||[]).find(n=>On(n,e))!==void 0}function Qs(t,e){const n=ns(t),r=ns(e);if(n!==r)return ce(n,r);switch(n){case 0:return 0;case 1:return ce(t.booleanValue,e.booleanValue);case 2:return function(s,i){const o=$e(s.integerValue||s.doubleValue),a=$e(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(t,e);case 3:return tp(t.timestampValue,e.timestampValue);case 4:return tp(vo(t),vo(e));case 5:return ce(t.stringValue,e.stringValue);case 6:return function(s,i){const o=Gs(s),a=Gs(i);return o.compareTo(a)}(t.bytesValue,e.bytesValue);case 7:return function(s,i){const o=s.split("/"),a=i.split("/");for(let c=0;c<o.length&&c<a.length;c++){const l=ce(o[c],a[c]);if(l!==0)return l}return ce(o.length,a.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,i){const o=ce($e(s.latitude),$e(i.latitude));return o!==0?o:ce($e(s.longitude),$e(i.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(s,i){const o=s.values||[],a=i.values||[];for(let c=0;c<o.length&&c<a.length;++c){const l=Qs(o[c],a[c]);if(l)return l}return ce(o.length,a.length)}(t.arrayValue,e.arrayValue);case 10:return function(s,i){const o=s.fields||{},a=Object.keys(o),c=i.fields||{},l=Object.keys(c);a.sort(),l.sort();for(let u=0;u<a.length&&u<l.length;++u){const h=ce(a[u],l[u]);if(h!==0)return h;const d=Qs(o[a[u]],c[l[u]]);if(d!==0)return d}return ce(a.length,l.length)}(t.mapValue,e.mapValue);default:throw K()}}function tp(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ce(t,e);const n=br(t),r=br(e),s=ce(n.seconds,r.seconds);return s!==0?s:ce(n.nanos,r.nanos)}function Uh(t){return bu(t)}function bu(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(r){const s=br(r);return`time(${s.seconds},${s.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?Gs(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,W.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(r){let s="[",i=!0;for(const o of r.values||[])i?i=!1:s+=",",s+=bu(o);return s+"]"}(t.arrayValue):"mapValue"in t?function(r){const s=Object.keys(r.fields||{}).sort();let i="{",o=!0;for(const a of s)o?o=!1:i+=",",i+=`${a}:${bu(r.fields[a])}`;return i+"}"}(t.mapValue):K();var e,n}function ac(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Tu(t){return!!t&&"integerValue"in t}function Vh(t){return!!t&&"arrayValue"in t}function np(t){return!!t&&"nullValue"in t}function rp(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ca(t){return!!t&&"mapValue"in t}function Ji(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return ps(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Ji(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Ji(t.arrayValue.values[n]);return e}return Object.assign({},t)}/**
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
 */class yt{constructor(e){this.value=e}static empty(){return new yt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Ca(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ji(n)}setAll(e){let n=ot.emptyPath(),r={},s=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=a.popLast()}o?r[a.lastSegment()]=Ji(o):s.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());Ca(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return On(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];Ca(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){ps(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new yt(Ji(this.value))}}function Py(t){const e=[];return ps(t.fields,(n,r)=>{const s=new ot([n]);if(Ca(r)){const i=Py(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new zs(e)}/**
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
 */class De{constructor(e,n,r,s,i){this.key=e,this.documentType=n,this.version=r,this.data=s,this.documentState=i}static newInvalidDocument(e){return new De(e,0,se.min(),yt.empty(),0)}static newFoundDocument(e,n,r){return new De(e,1,n,r,0)}static newNoDocument(e,n){return new De(e,2,n,yt.empty(),0)}static newUnknownDocument(e,n){return new De(e,3,n,yt.empty(),2)}convertToFoundDocument(e,n){return this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=yt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=yt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof De&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}clone(){return new De(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class OS{constructor(e,n=null,r=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.R=null}}function sp(t,e=null,n=[],r=[],s=null,i=null,o=null){return new OS(t,e,n,r,s,i,o)}function Ko(t){const e=V(t);if(e.R===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>PS(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),ms(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=lc(e.startAt)),e.endAt&&(n+="|ub:",n+=lc(e.endAt)),e.R=n}return e.R}function xS(t){let e=t.path.canonicalString();return t.collectionGroup!==null&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map(n=>{return`${(r=n).field.canonicalString()} ${r.op} ${Uh(r.value)}`;var r}).join(", ")}]`),ms(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map(n=>function(r){return`${r.field.canonicalString()} (${r.dir})`}(n)).join(", ")}]`),t.startAt&&(e+=", startAt: "+lc(t.startAt)),t.endAt&&(e+=", endAt: "+lc(t.endAt)),`Target(${e})`}function Yc(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let s=0;s<t.orderBy.length;s++)if(!BS(t.orderBy[s],e.orderBy[s]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let s=0;s<t.filters.length;s++)if(n=t.filters[s],r=e.filters[s],n.op!==r.op||!n.field.isEqual(r.field)||!On(n.value,r.value))return!1;var n,r;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!op(t.startAt,e.startAt)&&op(t.endAt,e.endAt)}function cc(t){return W.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}class Rt extends class{}{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.P(e,n,r):new MS(e,n,r):n==="array-contains"?new US(e,r):n==="in"?new VS(e,r):n==="not-in"?new $S(e,r):n==="array-contains-any"?new qS(e,r):new Rt(e,n,r)}static P(e,n,r){return n==="in"?new LS(e,r):new FS(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.v(Qs(n,this.value)):n!==null&&ns(this.value)===ns(n)&&this.v(Qs(n,this.value))}v(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return K()}}V(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}function PS(t){return t.field.canonicalString()+t.op.toString()+Uh(t.value)}class MS extends Rt{constructor(e,n,r){super(e,n,r),this.key=W.fromName(r.referenceValue)}matches(e){const n=W.comparator(e.key,this.key);return this.v(n)}}class LS extends Rt{constructor(e,n){super(e,"in",n),this.keys=My("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class FS extends Rt{constructor(e,n){super(e,"not-in",n),this.keys=My("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function My(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>W.fromName(r.referenceValue))}class US extends Rt{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Vh(n)&&wo(n.arrayValue,this.value)}}class VS extends Rt{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&wo(this.value.arrayValue,n)}}class $S extends Rt{constructor(e,n){super(e,"not-in",n)}matches(e){if(wo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!wo(this.value.arrayValue,n)}}class qS extends Rt{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Vh(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>wo(this.value.arrayValue,r))}}class Io{constructor(e,n){this.position=e,this.before=n}}function lc(t){return`${t.before?"b":"a"}:${t.position.map(e=>Uh(e)).join(",")}`}class Us{constructor(e,n="asc"){this.field=e,this.dir=n}}function BS(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function ip(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=W.comparator(W.fromName(o.referenceValue),n.key):r=Qs(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return t.before?r<=0:r<0}function op(t,e){if(t===null)return e===null;if(e===null||t.before!==e.before||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!On(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class Zn{constructor(e,n=null,r=[],s=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.S=null,this.D=null,this.startAt,this.endAt}}function Ly(t,e,n,r,s,i,o,a){return new Zn(t,e,n,r,s,i,o,a)}function yi(t){return new Zn(t)}function Na(t){return!ms(t.limit)&&t.limitType==="F"}function uc(t){return!ms(t.limit)&&t.limitType==="L"}function $h(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function qh(t){for(const e of t.filters)if(e.V())return e.field;return null}function Bh(t){return t.collectionGroup!==null}function Ys(t){const e=V(t);if(e.S===null){e.S=[];const n=qh(e),r=$h(e);if(n!==null&&r===null)n.isKeyField()||e.S.push(new Us(n)),e.S.push(new Us(ot.keyField(),"asc"));else{let s=!1;for(const i of e.explicitOrderBy)e.S.push(i),i.field.isKeyField()&&(s=!0);if(!s){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.S.push(new Us(ot.keyField(),i))}}}return e.S}function rn(t){const e=V(t);if(!e.D)if(e.limitType==="F")e.D=sp(e.path,e.collectionGroup,Ys(e),e.filters,e.limit,e.startAt,e.endAt);else{const n=[];for(const i of Ys(e)){const o=i.dir==="desc"?"asc":"desc";n.push(new Us(i.field,o))}const r=e.endAt?new Io(e.endAt.position,!e.endAt.before):null,s=e.startAt?new Io(e.startAt.position,!e.startAt.before):null;e.D=sp(e.path,e.collectionGroup,n,e.filters,e.limit,r,s)}return e.D}function Fy(t,e,n){return new Zn(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Ho(t,e){return Yc(rn(t),rn(e))&&t.limitType===e.limitType}function Uy(t){return`${Ko(rn(t))}|lt:${t.limitType}`}function Eu(t){return`Query(target=${xS(rn(t))}; limitType=${t.limitType})`}function zo(t,e){return e.isFoundDocument()&&function(n,r){const s=r.key.path;return n.collectionGroup!==null?r.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):W.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)}(t,e)&&function(n,r){for(const s of n.explicitOrderBy)if(!s.field.isKeyField()&&r.data.field(s.field)===null)return!1;return!0}(t,e)&&function(n,r){for(const s of n.filters)if(!s.matches(r))return!1;return!0}(t,e)&&function(n,r){return!(n.startAt&&!ip(n.startAt,Ys(n),r)||n.endAt&&ip(n.endAt,Ys(n),r))}(t,e)}function Vy(t){return(e,n)=>{let r=!1;for(const s of Ys(t)){const i=jS(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function jS(t,e,n){const r=t.field.isKeyField()?W.comparator(e.key,n.key):function(s,i,o){const a=i.data.field(s),c=o.data.field(s);return a!==null&&c!==null?Qs(a,c):K()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return K()}}/**
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
 */function $y(t,e){if(t.C){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:oc(e)?"-0":e}}function qy(t){return{integerValue:""+t}}function By(t,e){return xy(e)?qy(e):$y(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
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
 */class Jc{constructor(){this._=void 0}}function WS(t,e,n){return t instanceof Js?function(r,s){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return s&&(i.fields.__previous_value__=s),{mapValue:i}}(n,e):t instanceof rs?Wy(t,e):t instanceof ss?Ky(t,e):function(r,s){const i=jy(r,s),o=ap(i)+ap(r.N);return Tu(i)&&Tu(r.N)?qy(o):$y(r.k,o)}(t,e)}function KS(t,e,n){return t instanceof rs?Wy(t,e):t instanceof ss?Ky(t,e):n}function jy(t,e){return t instanceof Xs?Tu(n=e)||function(r){return!!r&&"doubleValue"in r}(n)?e:{integerValue:0}:null;var n}class Js extends Jc{}class rs extends Jc{constructor(e){super(),this.elements=e}}function Wy(t,e){const n=Hy(e);for(const r of t.elements)n.some(s=>On(s,r))||n.push(r);return{arrayValue:{values:n}}}class ss extends Jc{constructor(e){super(),this.elements=e}}function Ky(t,e){let n=Hy(e);for(const r of t.elements)n=n.filter(s=>!On(s,r));return{arrayValue:{values:n}}}class Xs extends Jc{constructor(e,n){super(),this.k=e,this.N=n}}function ap(t){return $e(t.integerValue||t.doubleValue)}function Hy(t){return Vh(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
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
 */class Go{constructor(e,n){this.field=e,this.transform=n}}function HS(t,e){return t.field.isEqual(e.field)&&function(n,r){return n instanceof rs&&r instanceof rs||n instanceof ss&&r instanceof ss?Hs(n.elements,r.elements,On):n instanceof Xs&&r instanceof Xs?On(n.N,r.N):n instanceof Js&&r instanceof Js}(t.transform,e.transform)}class zS{constructor(e,n){this.version=e,this.transformResults=n}}class Be{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Be}static exists(e){return new Be(void 0,e)}static updateTime(e){return new Be(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ra(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Xc{}function GS(t,e,n){t instanceof Qo?function(r,s,i){const o=r.value.clone(),a=up(r.fieldTransforms,s,i.transformResults);o.setAll(a),s.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(t,e,n):t instanceof Nr?function(r,s,i){if(!Ra(r.precondition,s))return void s.convertToUnknownDocument(i.version);const o=up(r.fieldTransforms,s,i.transformResults),a=s.data;a.setAll(zy(r)),a.setAll(o),s.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(t,e,n):function(r,s,i){s.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,n)}function Su(t,e,n){t instanceof Qo?function(r,s,i){if(!Ra(r.precondition,s))return;const o=r.value.clone(),a=hp(r.fieldTransforms,i,s);o.setAll(a),s.convertToFoundDocument(lp(s),o).setHasLocalMutations()}(t,e,n):t instanceof Nr?function(r,s,i){if(!Ra(r.precondition,s))return;const o=hp(r.fieldTransforms,i,s),a=s.data;a.setAll(zy(r)),a.setAll(o),s.convertToFoundDocument(lp(s),a).setHasLocalMutations()}(t,e,n):function(r,s){Ra(r.precondition,s)&&s.convertToNoDocument(se.min())}(t,e)}function QS(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=jy(r.transform,s||null);i!=null&&(n==null&&(n=yt.empty()),n.set(r.field,i))}return n||null}function cp(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(n,r){return n===void 0&&r===void 0||!(!n||!r)&&Hs(n,r,(s,i)=>HS(s,i))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}function lp(t){return t.isFoundDocument()?t.version:se.min()}class Qo extends Xc{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}}class Nr extends Xc{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}}function zy(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function up(t,e,n){const r=new Map;J(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,KS(o,a,n[s]))}return r}function hp(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,WS(i,o,e))}return r}class Yo extends Xc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}}class jh extends Xc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}}/**
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
 */class YS{constructor(e){this.count=e}}/**
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
 */var Ve,ue;function Gy(t){switch(t){default:return K();case I.CANCELLED:case I.UNKNOWN:case I.DEADLINE_EXCEEDED:case I.RESOURCE_EXHAUSTED:case I.INTERNAL:case I.UNAVAILABLE:case I.UNAUTHENTICATED:return!1;case I.INVALID_ARGUMENT:case I.NOT_FOUND:case I.ALREADY_EXISTS:case I.PERMISSION_DENIED:case I.FAILED_PRECONDITION:case I.ABORTED:case I.OUT_OF_RANGE:case I.UNIMPLEMENTED:case I.DATA_LOSS:return!0}}function Qy(t){if(t===void 0)return qe("GRPC error has no .code"),I.UNKNOWN;switch(t){case Ve.OK:return I.OK;case Ve.CANCELLED:return I.CANCELLED;case Ve.UNKNOWN:return I.UNKNOWN;case Ve.DEADLINE_EXCEEDED:return I.DEADLINE_EXCEEDED;case Ve.RESOURCE_EXHAUSTED:return I.RESOURCE_EXHAUSTED;case Ve.INTERNAL:return I.INTERNAL;case Ve.UNAVAILABLE:return I.UNAVAILABLE;case Ve.UNAUTHENTICATED:return I.UNAUTHENTICATED;case Ve.INVALID_ARGUMENT:return I.INVALID_ARGUMENT;case Ve.NOT_FOUND:return I.NOT_FOUND;case Ve.ALREADY_EXISTS:return I.ALREADY_EXISTS;case Ve.PERMISSION_DENIED:return I.PERMISSION_DENIED;case Ve.FAILED_PRECONDITION:return I.FAILED_PRECONDITION;case Ve.ABORTED:return I.ABORTED;case Ve.OUT_OF_RANGE:return I.OUT_OF_RANGE;case Ve.UNIMPLEMENTED:return I.UNIMPLEMENTED;case Ve.DATA_LOSS:return I.DATA_LOSS;default:return K()}}(ue=Ve||(Ve={}))[ue.OK=0]="OK",ue[ue.CANCELLED=1]="CANCELLED",ue[ue.UNKNOWN=2]="UNKNOWN",ue[ue.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ue[ue.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ue[ue.NOT_FOUND=5]="NOT_FOUND",ue[ue.ALREADY_EXISTS=6]="ALREADY_EXISTS",ue[ue.PERMISSION_DENIED=7]="PERMISSION_DENIED",ue[ue.UNAUTHENTICATED=16]="UNAUTHENTICATED",ue[ue.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ue[ue.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ue[ue.ABORTED=10]="ABORTED",ue[ue.OUT_OF_RANGE=11]="OUT_OF_RANGE",ue[ue.UNIMPLEMENTED=12]="UNIMPLEMENTED",ue[ue.INTERNAL=13]="INTERNAL",ue[ue.UNAVAILABLE=14]="UNAVAILABLE",ue[ue.DATA_LOSS=15]="DATA_LOSS";/**
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
 */class He{constructor(e,n){this.comparator=e,this.root=n||st.EMPTY}insert(e,n){return new He(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,st.BLACK,null,null))}remove(e){return new He(this.comparator,this.root.remove(e,this.comparator).copy(null,null,st.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new va(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new va(this.root,e,this.comparator,!1)}getReverseIterator(){return new va(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new va(this.root,e,this.comparator,!0)}}class va{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class st{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??st.RED,this.left=s??st.EMPTY,this.right=i??st.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new st(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return st.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return st.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,st.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,st.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw K();const e=this.left.check();if(e!==this.right.check())throw K();return e+(this.isRed()?0:1)}}st.EMPTY=null,st.RED=!0,st.BLACK=!1;st.EMPTY=new class{constructor(){this.size=0}get key(){throw K()}get value(){throw K()}get color(){throw K()}get left(){throw K()}get right(){throw K()}copy(t,e,n,r,s){return this}insert(t,e,n){return new st(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Me{constructor(e){this.comparator=e,this.data=new He(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new dp(this.data.getIterator())}getIteratorFrom(e){return new dp(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Me)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Me(this.comparator);return n.data=e,n}}class dp{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */const JS=new He(W.comparator);function nn(){return JS}const XS=new He(W.comparator);function Au(){return XS}const ZS=new He(W.comparator);function Yy(){return ZS}const e0=new Me(W.comparator);function ve(...t){let e=e0;for(const n of t)e=e.add(n);return e}const t0=new Me(ce);function Zc(){return t0}/**
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
 */class Jo{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n){const r=new Map;return r.set(e,Xo.createSynthesizedTargetChangeForCurrentChange(e,n)),new Jo(se.min(),r,Zc(),nn(),ve())}}class Xo{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n){return new Xo(Ze.EMPTY_BYTE_STRING,n,ve(),ve(),ve())}}/**
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
 */class Da{constructor(e,n,r,s){this.$=e,this.removedTargetIds=n,this.key=r,this.F=s}}class Jy{constructor(e,n){this.targetId=e,this.O=n}}class Xy{constructor(e,n,r=Ze.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class fp{constructor(){this.M=0,this.L=mp(),this.B=Ze.EMPTY_BYTE_STRING,this.U=!1,this.q=!0}get current(){return this.U}get resumeToken(){return this.B}get K(){return this.M!==0}get j(){return this.q}W(e){e.approximateByteSize()>0&&(this.q=!0,this.B=e)}G(){let e=ve(),n=ve(),r=ve();return this.L.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:K()}}),new Xo(this.B,this.U,e,n,r)}H(){this.q=!1,this.L=mp()}J(e,n){this.q=!0,this.L=this.L.insert(e,n)}Y(e){this.q=!0,this.L=this.L.remove(e)}X(){this.M+=1}Z(){this.M-=1}tt(){this.q=!0,this.U=!0}}class n0{constructor(e){this.et=e,this.nt=new Map,this.st=nn(),this.it=pp(),this.rt=new Me(ce)}ot(e){for(const n of e.$)e.F&&e.F.isFoundDocument()?this.at(n,e.F):this.ct(n,e.key,e.F);for(const n of e.removedTargetIds)this.ct(n,e.key,e.F)}ut(e){this.forEachTarget(e,n=>{const r=this.ht(n);switch(e.state){case 0:this.lt(n)&&r.W(e.resumeToken);break;case 1:r.Z(),r.K||r.H(),r.W(e.resumeToken);break;case 2:r.Z(),r.K||this.removeTarget(n);break;case 3:this.lt(n)&&(r.tt(),r.W(e.resumeToken));break;case 4:this.lt(n)&&(this.ft(n),r.W(e.resumeToken));break;default:K()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.nt.forEach((r,s)=>{this.lt(s)&&n(s)})}dt(e){const n=e.targetId,r=e.O.count,s=this.wt(n);if(s){const i=s.target;if(cc(i))if(r===0){const o=new W(i.path);this.ct(n,o,De.newNoDocument(o,se.min()))}else J(r===1);else this._t(n)!==r&&(this.ft(n),this.rt=this.rt.add(n))}}gt(e){const n=new Map;this.nt.forEach((i,o)=>{const a=this.wt(o);if(a){if(i.current&&cc(a.target)){const c=new W(a.target.path);this.st.get(c)!==null||this.yt(o,c)||this.ct(o,c,De.newNoDocument(c,e))}i.j&&(n.set(o,i.G()),i.H())}});let r=ve();this.it.forEach((i,o)=>{let a=!0;o.forEachWhile(c=>{const l=this.wt(c);return!l||l.purpose===2||(a=!1,!1)}),a&&(r=r.add(i))});const s=new Jo(e,n,this.rt,this.st,r);return this.st=nn(),this.it=pp(),this.rt=new Me(ce),s}at(e,n){if(!this.lt(e))return;const r=this.yt(e,n.key)?2:0;this.ht(e).J(n.key,r),this.st=this.st.insert(n.key,n),this.it=this.it.insert(n.key,this.Tt(n.key).add(e))}ct(e,n,r){if(!this.lt(e))return;const s=this.ht(e);this.yt(e,n)?s.J(n,1):s.Y(n),this.it=this.it.insert(n,this.Tt(n).delete(e)),r&&(this.st=this.st.insert(n,r))}removeTarget(e){this.nt.delete(e)}_t(e){const n=this.ht(e).G();return this.et.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}X(e){this.ht(e).X()}ht(e){let n=this.nt.get(e);return n||(n=new fp,this.nt.set(e,n)),n}Tt(e){let n=this.it.get(e);return n||(n=new Me(ce),this.it=this.it.insert(e,n)),n}lt(e){const n=this.wt(e)!==null;return n||x("WatchChangeAggregator","Detected inactive target",e),n}wt(e){const n=this.nt.get(e);return n&&n.K?null:this.et.Et(e)}ft(e){this.nt.set(e,new fp),this.et.getRemoteKeysForTarget(e).forEach(n=>{this.ct(e,n,null)})}yt(e,n){return this.et.getRemoteKeysForTarget(e).has(n)}}function pp(){return new He(W.comparator)}function mp(){return new He(W.comparator)}/**
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
 */const r0={asc:"ASCENDING",desc:"DESCENDING"},s0={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class i0{constructor(e,n){this.databaseId=e,this.C=n}}function _o(t,e){return t.C?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Zy(t,e){return t.C?e.toBase64():e.toUint8Array()}function o0(t,e){return _o(t,e.toTimestamp())}function Je(t){return J(!!t),se.fromTimestamp(function(e){const n=br(e);return new Ye(n.seconds,n.nanos)}(t))}function Wh(t,e){return function(n){return new pe(["projects",n.projectId,"databases",n.database])}(t).child("documents").child(e).canonicalString()}function ev(t){const e=pe.fromString(t);return J(cv(e)),e}function bo(t,e){return Wh(t.databaseId,e.path)}function kn(t,e){const n=ev(e);if(n.get(1)!==t.databaseId.projectId)throw new k(I.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new k(I.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new W(nv(n))}function ku(t,e){return Wh(t.databaseId,e)}function tv(t){const e=ev(t);return e.length===4?pe.emptyPath():nv(e)}function To(t){return new pe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function nv(t){return J(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function gp(t,e,n){return{name:bo(t,e),fields:n.value.mapValue.fields}}function rv(t,e,n){const r=kn(t,e.name),s=Je(e.updateTime),i=new yt({mapValue:{fields:e.fields}}),o=De.newFoundDocument(r,s,i);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}function a0(t,e){return"found"in e?function(n,r){J(!!r.found),r.found.name,r.found.updateTime;const s=kn(n,r.found.name),i=Je(r.found.updateTime),o=new yt({mapValue:{fields:r.found.fields}});return De.newFoundDocument(s,i,o)}(t,e):"missing"in e?function(n,r){J(!!r.missing),J(!!r.readTime);const s=kn(n,r.missing),i=Je(r.readTime);return De.newNoDocument(s,i)}(t,e):K()}function c0(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:K()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(c,l){return c.C?(J(l===void 0||typeof l=="string"),Ze.fromBase64String(l||"")):(J(l===void 0||l instanceof Uint8Array),Ze.fromUint8Array(l||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const l=c.code===void 0?I.UNKNOWN:Qy(c.code);return new k(l,c.message||"")}(o);n=new Xy(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=kn(t,r.document.name),i=Je(r.document.updateTime),o=new yt({mapValue:{fields:r.document.fields}}),a=De.newFoundDocument(s,i,o),c=r.targetIds||[],l=r.removedTargetIds||[];n=new Da(c,l,a.key,a)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=kn(t,r.document),i=r.readTime?Je(r.readTime):se.min(),o=De.newNoDocument(s,i),a=r.removedTargetIds||[];n=new Da([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=kn(t,r.document),i=r.removedTargetIds||[];n=new Da([],i,s,null)}else{if(!("filter"in e))return K();{e.filter;const r=e.filter;r.targetId;const s=r.count||0,i=new YS(s),o=r.targetId;n=new Jy(o,i)}}return n}function hc(t,e){let n;if(e instanceof Qo)n={update:gp(t,e.key,e.value)};else if(e instanceof Yo)n={delete:bo(t,e.key)};else if(e instanceof Nr)n={update:gp(t,e.key,e.data),updateMask:m0(e.fieldMask)};else{if(!(e instanceof jh))return K();n={verify:bo(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,i){const o=i.transform;if(o instanceof Js)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof rs)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof ss)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof Xs)return{fieldPath:i.field.canonicalString(),increment:o.N};throw K()}(0,r))),e.precondition.isNone||(n.currentDocument=function(r,s){return s.updateTime!==void 0?{updateTime:o0(r,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:K()}(t,e.precondition)),n}function yp(t,e){const n=e.currentDocument?function(s){return s.updateTime!==void 0?Be.updateTime(Je(s.updateTime)):s.exists!==void 0?Be.exists(s.exists):Be.none()}(e.currentDocument):Be.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(i,o){let a=null;if("setToServerValue"in o)J(o.setToServerValue==="REQUEST_TIME"),a=new Js;else if("appendMissingElements"in o){const l=o.appendMissingElements.values||[];a=new rs(l)}else if("removeAllFromArray"in o){const l=o.removeAllFromArray.values||[];a=new ss(l)}else"increment"in o?a=new Xs(i,o.increment):K();const c=ot.fromServerFormat(o.fieldPath);return new Go(c,a)}(t,s)):[];if(e.update){e.update.name;const s=kn(t,e.update.name),i=new yt({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(a){const c=a.fieldPaths||[];return new zs(c.map(l=>ot.fromServerFormat(l)))}(e.updateMask);return new Nr(s,i,o,n,r)}return new Qo(s,i,n,r)}if(e.delete){const s=kn(t,e.delete);return new Yo(s,n)}if(e.verify){const s=kn(t,e.verify);return new jh(s,n)}return K()}function l0(t,e){return t&&t.length>0?(J(e!==void 0),t.map(n=>function(r,s){let i=r.updateTime?Je(r.updateTime):Je(s);return i.isEqual(se.min())&&(i=Je(s)),new zS(i,r.transformResults||[])}(n,e))):[]}function sv(t,e){return{documents:[ku(t,e.path)]}}function iv(t,e){const n={structuredQuery:{}},r=e.path;e.collectionGroup!==null?(n.parent=ku(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=ku(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(a){if(a.length===0)return;const c=a.map(l=>function(u){if(u.op==="=="){if(rp(u.value))return{unaryFilter:{field:Es(u.field),op:"IS_NAN"}};if(np(u.value))return{unaryFilter:{field:Es(u.field),op:"IS_NULL"}}}else if(u.op==="!="){if(rp(u.value))return{unaryFilter:{field:Es(u.field),op:"IS_NOT_NAN"}};if(np(u.value))return{unaryFilter:{field:Es(u.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Es(u.field),op:d0(u.op),value:u.value}}}(l));return c.length===1?c[0]:{compositeFilter:{op:"AND",filters:c}}}(e.filters);s&&(n.structuredQuery.where=s);const i=function(a){if(a.length!==0)return a.map(c=>function(l){return{field:Es(l.field),direction:h0(l.dir)}}(c))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=function(a,c){return a.C||ms(c)?c:{value:c}}(t,e.limit);return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=vp(e.startAt)),e.endAt&&(n.structuredQuery.endAt=vp(e.endAt)),n}function ov(t){let e=tv(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){J(r===1);const u=n.from[0];u.allDescendants?s=u.collectionId:e=e.child(u.collectionId)}let i=[];n.where&&(i=av(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(u=>function(h){return new Us(Os(h.field),function(d){switch(d){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(u)));let a=null;n.limit&&(a=function(u){let h;return h=typeof u=="object"?u.value:u,ms(h)?null:h}(n.limit));let c=null;n.startAt&&(c=wp(n.startAt));let l=null;return n.endAt&&(l=wp(n.endAt)),Ly(e,s,o,i,a,"F",c,l)}function u0(t,e){const n=function(r,s){switch(s){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return K()}}(0,e.purpose);return n==null?null:{"goog-listen-tags":n}}function av(t){return t?t.unaryFilter!==void 0?[p0(t)]:t.fieldFilter!==void 0?[f0(t)]:t.compositeFilter!==void 0?t.compositeFilter.filters.map(e=>av(e)).reduce((e,n)=>e.concat(n)):K():[]}function vp(t){return{before:t.before,values:t.position}}function wp(t){const e=!!t.before,n=t.values||[];return new Io(n,e)}function h0(t){return r0[t]}function d0(t){return s0[t]}function Es(t){return{fieldPath:t.canonicalString()}}function Os(t){return ot.fromServerFormat(t.fieldPath)}function f0(t){return Rt.create(Os(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return K()}}(t.fieldFilter.op),t.fieldFilter.value)}function p0(t){switch(t.unaryFilter.op){case"IS_NAN":const e=Os(t.unaryFilter.field);return Rt.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=Os(t.unaryFilter.field);return Rt.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Os(t.unaryFilter.field);return Rt.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=Os(t.unaryFilter.field);return Rt.create(s,"!=",{nullValue:"NULL_VALUE"});default:return K()}}function m0(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function cv(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */function cn(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Ip(e)),e=g0(t.get(n),e);return Ip(e)}function g0(t,e){let n=e;const r=t.length;for(let s=0;s<r;s++){const i=t.charAt(s);switch(i){case"\0":n+="";break;case"":n+="";break;default:n+=i}}return n}function Ip(t){return t+""}function $n(t){const e=t.length;if(J(e>=2),e===2)return J(t.charAt(0)===""&&t.charAt(1)===""),pe.emptyPath();const n=e-2,r=[];let s="";for(let i=0;i<e;){const o=t.indexOf("",i);switch((o<0||o>n)&&K(),t.charAt(o+1)){case"":const a=t.substring(i,o);let c;s.length===0?c=a:(s+=a,c=s,s=""),r.push(c);break;case"":s+=t.substring(i,o),s+="\0";break;case"":s+=t.substring(i,o+1);break;default:K()}i=o+2}return new pe(r)}/**
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
 */class y0{constructor(e,n){this.seconds=e,this.nanoseconds=n}}class qt{constructor(e,n,r){this.ownerId=e,this.allowTabSynchronization=n,this.leaseTimestampMs=r}}qt.store="owner",qt.key="owner";class mr{constructor(e,n,r){this.userId=e,this.lastAcknowledgedBatchId=n,this.lastStreamToken=r}}mr.store="mutationQueues",mr.keyPath="userId";class Ae{constructor(e,n,r,s,i){this.userId=e,this.batchId=n,this.localWriteTimeMs=r,this.baseMutations=s,this.mutations=i}}Ae.store="mutations",Ae.keyPath="batchId",Ae.userMutationsIndex="userMutationsIndex",Ae.userMutationsKeyPath=["userId","batchId"];class pt{constructor(){}static prefixForUser(e){return[e]}static prefixForPath(e,n){return[e,cn(n)]}static key(e,n,r){return[e,cn(n),r]}}pt.store="documentMutations",pt.PLACEHOLDER=new pt;class v0{constructor(e,n){this.path=e,this.readTime=n}}class w0{constructor(e,n){this.path=e,this.version=n}}class xe{constructor(e,n,r,s,i,o){this.unknownDocument=e,this.noDocument=n,this.document=r,this.hasCommittedMutations=s,this.readTime=i,this.parentPath=o}}xe.store="remoteDocuments",xe.readTimeIndex="readTimeIndex",xe.readTimeIndexPath="readTime",xe.collectionReadTimeIndex="collectionReadTimeIndex",xe.collectionReadTimeIndexPath=["parentPath","readTime"];class Tn{constructor(e){this.byteSize=e}}Tn.store="remoteDocumentGlobal",Tn.key="remoteDocumentGlobalKey";class Ft{constructor(e,n,r,s,i,o,a){this.targetId=e,this.canonicalId=n,this.readTime=r,this.resumeToken=s,this.lastListenSequenceNumber=i,this.lastLimboFreeSnapshotVersion=o,this.query=a}}Ft.store="targets",Ft.keyPath="targetId",Ft.queryTargetsIndexName="queryTargetsIndex",Ft.queryTargetsKeyPath=["canonicalId","targetId"];class at{constructor(e,n,r){this.targetId=e,this.path=n,this.sequenceNumber=r}}at.store="targetDocuments",at.keyPath=["targetId","path"],at.documentTargetsIndex="documentTargetsIndex",at.documentTargetsKeyPath=["path","targetId"];class jt{constructor(e,n,r,s){this.highestTargetId=e,this.highestListenSequenceNumber=n,this.lastRemoteSnapshotVersion=r,this.targetCount=s}}jt.key="targetGlobalKey",jt.store="targetGlobal";class Gr{constructor(e,n){this.collectionId=e,this.parent=n}}Gr.store="collectionParents",Gr.keyPath=["collectionId","parent"];class Wn{constructor(e,n,r,s){this.clientId=e,this.updateTimeMs=n,this.networkEnabled=r,this.inForeground=s}}Wn.store="clientMetadata",Wn.keyPath="clientId";class Zs{constructor(e,n,r){this.bundleId=e,this.createTime=n,this.version=r}}Zs.store="bundles",Zs.keyPath="bundleId";class ei{constructor(e,n,r){this.name=e,this.readTime=n,this.bundledQuery=r}}ei.store="namedQueries",ei.keyPath="name";const I0=[mr.store,Ae.store,pt.store,xe.store,Ft.store,qt.store,jt.store,at.store,Wn.store,Tn.store,Gr.store,Zs.store,ei.store],lv="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class uv{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */class E{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&K(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new E((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof E?n:E.resolve(n)}catch(n){return E.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):E.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):E.reject(n)}static resolve(e){return new E((n,r)=>{n(e)})}static reject(e){return new E((n,r)=>{r(e)})}static waitFor(e){return new E((n,r)=>{let s=0,i=0,o=!1;e.forEach(a=>{++s,a.next(()=>{++i,o&&i===s&&n()},c=>r(c))}),o=!0,i===s&&n()})}static or(e){let n=E.resolve(!1);for(const r of e)n=n.next(s=>s?E.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}}/**
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
 */class el{constructor(e,n){this.action=e,this.transaction=n,this.aborted=!1,this.It=new Qe,this.transaction.oncomplete=()=>{this.It.resolve()},this.transaction.onabort=()=>{n.error?this.It.reject(new Xi(e,n.error)):this.It.resolve()},this.transaction.onerror=r=>{const s=Kh(r.target.error);this.It.reject(new Xi(e,s))}}static open(e,n,r,s){try{return new el(n,e.transaction(s,r))}catch(i){throw new Xi(n,i)}}get At(){return this.It.promise}abort(e){e&&this.It.reject(e),this.aborted||(x("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}store(e){const n=this.transaction.objectStore(e);return new b0(n)}}class on{constructor(e,n,r){this.name=e,this.version=n,this.Rt=r,on.Pt(Ne())===12.2&&qe("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return x("SimpleDb","Removing database:",e),$r(window.indexedDB.deleteDatabase(e)).toPromise()}static bt(){if(!Qa())return!1;if(on.vt())return!0;const e=Ne(),n=on.Pt(e),r=0<n&&n<10,s=on.Vt(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static vt(){var e;return typeof process<"u"&&((e=vS)===null||e===void 0?void 0:e.St)==="YES"}static Dt(e,n){return e.store(n)}static Pt(e){const n=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=n?n[1].split("_").slice(0,2).join("."):"-1";return Number(r)}static Vt(e){const n=e.match(/Android ([\d.]+)/i),r=n?n[1].split(".").slice(0,2).join("."):"-1";return Number(r)}async Ct(e){return this.db||(x("SimpleDb","Opening database:",this.name),this.db=await new Promise((n,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;n(o)},s.onblocked=()=>{r(new Xi(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new k(I.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new k(I.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Xi(e,o))},s.onupgradeneeded=i=>{x("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.Rt.Nt(o,s.transaction,i.oldVersion,this.version).next(()=>{x("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.kt&&(this.db.onversionchange=n=>this.kt(n)),this.db}xt(e){this.kt=e,this.db&&(this.db.onversionchange=n=>e(n))}async runTransaction(e,n,r,s){const i=n==="readonly";let o=0;for(;;){++o;try{this.db=await this.Ct(e);const a=el.open(this.db,e,i?"readonly":"readwrite",r),c=s(a).catch(l=>(a.abort(l),E.reject(l))).toPromise();return c.catch(()=>{}),await a.At,c}catch(a){const c=a.name!=="FirebaseError"&&o<3;if(x("SimpleDb","Transaction failed with error:",a.message,"Retrying:",c),this.close(),!c)return Promise.reject(a)}}}close(){this.db&&this.db.close(),this.db=void 0}}class _0{constructor(e){this.$t=e,this.Ft=!1,this.Ot=null}get isDone(){return this.Ft}get Mt(){return this.Ot}set cursor(e){this.$t=e}done(){this.Ft=!0}Lt(e){this.Ot=e}delete(){return $r(this.$t.delete())}}class Xi extends k{constructor(e,n){super(I.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${n}`),this.name="IndexedDbTransactionError"}}function gs(t){return t.name==="IndexedDbTransactionError"}class b0{constructor(e){this.store=e}put(e,n){let r;return n!==void 0?(x("SimpleDb","PUT",this.store.name,e,n),r=this.store.put(n,e)):(x("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),$r(r)}add(e){return x("SimpleDb","ADD",this.store.name,e,e),$r(this.store.add(e))}get(e){return $r(this.store.get(e)).next(n=>(n===void 0&&(n=null),x("SimpleDb","GET",this.store.name,e,n),n))}delete(e){return x("SimpleDb","DELETE",this.store.name,e),$r(this.store.delete(e))}count(){return x("SimpleDb","COUNT",this.store.name),$r(this.store.count())}Bt(e,n){const r=this.cursor(this.options(e,n)),s=[];return this.Ut(r,(i,o)=>{s.push(o)}).next(()=>s)}qt(e,n){x("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,n);r.Kt=!1;const s=this.cursor(r);return this.Ut(s,(i,o,a)=>a.delete())}jt(e,n){let r;n?r=e:(r={},n=e);const s=this.cursor(r);return this.Ut(s,n)}Qt(e){const n=this.cursor({});return new E((r,s)=>{n.onerror=i=>{const o=Kh(i.target.error);s(o)},n.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(a=>{a?o.continue():r()}):r()}})}Ut(e,n){const r=[];return new E((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void s();const c=new _0(a),l=n(a.primaryKey,a.value,c);if(l instanceof E){const u=l.catch(h=>(c.done(),E.reject(h)));r.push(u)}c.isDone?s():c.Mt===null?a.continue():a.continue(c.Mt)}}).next(()=>E.waitFor(r))}options(e,n){let r;return e!==void 0&&(typeof e=="string"?r=e:n=e),{index:r,range:n}}cursor(e){let n="next";if(e.reverse&&(n="prev"),e.index){const r=this.store.index(e.index);return e.Kt?r.openKeyCursor(e.range,n):r.openCursor(e.range,n)}return this.store.openCursor(e.range,n)}}function $r(t){return new E((e,n)=>{t.onsuccess=r=>{const s=r.target.result;e(s)},t.onerror=r=>{const s=Kh(r.target.error);n(s)}})}let _p=!1;function Kh(t){const e=on.Pt(Ne());if(e>=12.2&&e<13){const n="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(n)>=0){const r=new k("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${n}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return _p||(_p=!0,setTimeout(()=>{throw r},0)),r}}return t}/**
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
 */class bp extends uv{constructor(e,n){super(),this.Wt=e,this.currentSequenceNumber=n}}function Ut(t,e){const n=V(t);return on.Dt(n.Wt,e)}/**
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
 */class Hh{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&GS(i,e,r[s])}}applyToLocalView(e){for(const n of this.baseMutations)n.key.isEqual(e.key)&&Su(n,e,this.localWriteTime);for(const n of this.mutations)n.key.isEqual(e.key)&&Su(n,e,this.localWriteTime)}applyToLocalDocumentSet(e){this.mutations.forEach(n=>{const r=e.get(n.key),s=r;this.applyToLocalView(s),r.isValidDocument()||s.convertToNoDocument(se.min())})}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),ve())}isEqual(e){return this.batchId===e.batchId&&Hs(this.mutations,e.mutations,(n,r)=>cp(n,r))&&Hs(this.baseMutations,e.baseMutations,(n,r)=>cp(n,r))}}class zh{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){J(e.mutations.length===r.length);let s=Yy();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new zh(e,n,r,s)}}/**
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
 */class gr{constructor(e,n,r,s,i=se.min(),o=se.min(),a=Ze.EMPTY_BYTE_STRING){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a}withSequenceNumber(e){return new gr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,n){return new gr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new gr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
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
 */class hv{constructor(e){this.Gt=e}}function Cu(t,e){if(e.document)return rv(t.Gt,e.document,!!e.hasCommittedMutations);if(e.noDocument){const n=W.fromSegments(e.noDocument.path),r=ni(e.noDocument.readTime),s=De.newNoDocument(n,r);return e.hasCommittedMutations?s.setHasCommittedMutations():s}if(e.unknownDocument){const n=W.fromSegments(e.unknownDocument.path),r=ni(e.unknownDocument.version);return De.newUnknownDocument(n,r)}return K()}function Tp(t,e,n){const r=Gh(n),s=e.key.path.popLast().toArray();if(e.isFoundDocument()){const i=function(a,c){return{name:bo(a,c.key),fields:c.data.value.mapValue.fields,updateTime:_o(a,c.version.toTimestamp())}}(t.Gt,e),o=e.hasCommittedMutations;return new xe(null,null,i,o,r,s)}if(e.isNoDocument()){const i=e.key.path.toArray(),o=ti(e.version),a=e.hasCommittedMutations;return new xe(null,new v0(i,o),null,a,r,s)}if(e.isUnknownDocument()){const i=e.key.path.toArray(),o=ti(e.version);return new xe(new w0(i,o),null,null,!0,r,s)}return K()}function Gh(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function dv(t){const e=new Ye(t[0],t[1]);return se.fromTimestamp(e)}function ti(t){const e=t.toTimestamp();return new y0(e.seconds,e.nanoseconds)}function ni(t){const e=new Ye(t.seconds,t.nanoseconds);return se.fromTimestamp(e)}function Cs(t,e){const n=(e.baseMutations||[]).map(i=>yp(t.Gt,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const a=e.mutations[i+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>yp(t.Gt,i)),s=Ye.fromMillis(e.localWriteTimeMs);return new Hh(e.batchId,s,n,r)}function qi(t){const e=ni(t.readTime),n=t.lastLimboFreeSnapshotVersion!==void 0?ni(t.lastLimboFreeSnapshotVersion):se.min();let r;var s;return t.query.documents!==void 0?(J((s=t.query).documents.length===1),r=rn(yi(tv(s.documents[0])))):r=function(i){return rn(ov(i))}(t.query),new gr(r,t.targetId,0,t.lastListenSequenceNumber,e,n,Ze.fromBase64String(t.resumeToken))}function fv(t,e){const n=ti(e.snapshotVersion),r=ti(e.lastLimboFreeSnapshotVersion);let s;s=cc(e.target)?sv(t.Gt,e.target):iv(t.Gt,e.target);const i=e.resumeToken.toBase64();return new Ft(e.targetId,Ko(e.target),n,i,e.sequenceNumber,r,s)}function Qh(t){const e=ov({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Fy(e,e.limit,"L"):e}/**
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
 */class T0{getBundleMetadata(e,n){return Ep(e).get(n).next(r=>{if(r)return{id:(s=r).bundleId,createTime:ni(s.createTime),version:s.version};var s})}saveBundleMetadata(e,n){return Ep(e).put({bundleId:(r=n).id,createTime:ti(Je(r.createTime)),version:r.version});var r}getNamedQuery(e,n){return Sp(e).get(n).next(r=>{if(r)return{name:(s=r).name,query:Qh(s.bundledQuery),readTime:ni(s.readTime)};var s})}saveNamedQuery(e,n){return Sp(e).put(function(r){return{name:r.name,readTime:ti(Je(r.readTime)),bundledQuery:r.bundledQuery}}(n))}}function Ep(t){return Ut(t,Zs.store)}function Sp(t){return Ut(t,ei.store)}/**
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
 */class E0{constructor(){this.zt=new Yh}addToCollectionParentIndex(e,n){return this.zt.add(n),E.resolve()}getCollectionParents(e,n){return E.resolve(this.zt.getEntries(n))}}class Yh{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new Me(pe.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Me(pe.comparator)).toArray()}}/**
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
 */class S0{constructor(){this.Ht=new Yh}addToCollectionParentIndex(e,n){if(!this.Ht.has(n)){const r=n.lastSegment(),s=n.popLast();e.addOnCommittedListener(()=>{this.Ht.add(n)});const i={collectionId:r,parent:cn(s)};return Ap(e).put(i)}return E.resolve()}getCollectionParents(e,n){const r=[],s=IDBKeyRange.bound([n,""],[Ry(n),""],!1,!0);return Ap(e).Bt(s).next(i=>{for(const o of i){if(o.collectionId!==n)break;r.push($n(o.parent))}return r})}}function Ap(t){return Ut(t,Gr.store)}/**
 * @license
 * Copyright 2018 Google LLC
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
 */const kp={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Mt{constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new Mt(e,Mt.DEFAULT_COLLECTION_PERCENTILE,Mt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
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
 */function pv(t,e,n){const r=t.store(Ae.store),s=t.store(pt.store),i=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.jt({range:o},(u,h,d)=>(a++,d.delete()));i.push(c.next(()=>{J(a===1)}));const l=[];for(const u of n.mutations){const h=pt.key(e,u.key.path,n.batchId);i.push(s.delete(h)),l.push(u.key)}return E.waitFor(i).next(()=>l)}function dc(t){if(!t)return 0;let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw K();e=t.noDocument}return JSON.stringify(e).length}/**
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
 */Mt.DEFAULT_COLLECTION_PERCENTILE=10,Mt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Mt.DEFAULT=new Mt(41943040,Mt.DEFAULT_COLLECTION_PERCENTILE,Mt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Mt.DISABLED=new Mt(-1,0,0);class Jh{constructor(e,n,r,s){this.userId=e,this.k=n,this.Jt=r,this.referenceDelegate=s,this.Yt={}}static Xt(e,n,r,s){J(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new Jh(i,n,r,s)}checkEmpty(e){let n=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return rr(e).jt({index:Ae.userMutationsIndex,range:r},(s,i,o)=>{n=!1,o.done()}).next(()=>n)}addMutationBatch(e,n,r,s){const i=Ns(e),o=rr(e);return o.add({}).next(a=>{J(typeof a=="number");const c=new Hh(a,n,r,s),l=function(d,f,y){const S=y.baseMutations.map(A=>hc(d.Gt,A)),T=y.mutations.map(A=>hc(d.Gt,A));return new Ae(f,y.batchId,y.localWriteTime.toMillis(),S,T)}(this.k,this.userId,c),u=[];let h=new Me((d,f)=>ce(d.canonicalString(),f.canonicalString()));for(const d of s){const f=pt.key(this.userId,d.key.path,a);h=h.add(d.key.path.popLast()),u.push(o.put(l)),u.push(i.put(f,pt.PLACEHOLDER))}return h.forEach(d=>{u.push(this.Jt.addToCollectionParentIndex(e,d))}),e.addOnCommittedListener(()=>{this.Yt[a]=c.keys()}),E.waitFor(u).next(()=>c)})}lookupMutationBatch(e,n){return rr(e).get(n).next(r=>r?(J(r.userId===this.userId),Cs(this.k,r)):null)}Zt(e,n){return this.Yt[n]?E.resolve(this.Yt[n]):this.lookupMutationBatch(e,n).next(r=>{if(r){const s=r.keys();return this.Yt[n]=s,s}return null})}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return rr(e).jt({index:Ae.userMutationsIndex,range:s},(o,a,c)=>{a.userId===this.userId&&(J(a.batchId>=r),i=Cs(this.k,a)),c.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const n=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return rr(e).jt({index:Ae.userMutationsIndex,range:n,reverse:!0},(s,i,o)=>{r=i.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const n=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return rr(e).Bt(Ae.userMutationsIndex,n).next(r=>r.map(s=>Cs(this.k,s)))}getAllMutationBatchesAffectingDocumentKey(e,n){const r=pt.prefixForPath(this.userId,n.path),s=IDBKeyRange.lowerBound(r),i=[];return Ns(e).jt({range:s},(o,a,c)=>{const[l,u,h]=o,d=$n(u);if(l===this.userId&&n.path.isEqual(d))return rr(e).get(h).next(f=>{if(!f)throw K();J(f.userId===this.userId),i.push(Cs(this.k,f))});c.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Me(ce);const s=[];return n.forEach(i=>{const o=pt.prefixForPath(this.userId,i.path),a=IDBKeyRange.lowerBound(o),c=Ns(e).jt({range:a},(l,u,h)=>{const[d,f,y]=l,S=$n(f);d===this.userId&&i.path.isEqual(S)?r=r.add(y):h.done()});s.push(c)}),E.waitFor(s).next(()=>this.te(e,r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1,i=pt.prefixForPath(this.userId,r),o=IDBKeyRange.lowerBound(i);let a=new Me(ce);return Ns(e).jt({range:o},(c,l,u)=>{const[h,d,f]=c,y=$n(d);h===this.userId&&r.isPrefixOf(y)?y.length===s&&(a=a.add(f)):u.done()}).next(()=>this.te(e,a))}te(e,n){const r=[],s=[];return n.forEach(i=>{s.push(rr(e).get(i).next(o=>{if(o===null)throw K();J(o.userId===this.userId),r.push(Cs(this.k,o))}))}),E.waitFor(s).next(()=>r)}removeMutationBatch(e,n){return pv(e.Wt,this.userId,n).next(r=>(e.addOnCommittedListener(()=>{this.ee(n.batchId)}),E.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}ee(e){delete this.Yt[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(n=>{if(!n)return E.resolve();const r=IDBKeyRange.lowerBound(pt.prefixForUser(this.userId)),s=[];return Ns(e).jt({range:r},(i,o,a)=>{if(i[0]===this.userId){const c=$n(i[1]);s.push(c)}else a.done()}).next(()=>{J(s.length===0)})})}containsKey(e,n){return mv(e,this.userId,n)}ne(e){return gv(e).get(this.userId).next(n=>n||new mr(this.userId,-1,""))}}function mv(t,e,n){const r=pt.prefixForPath(e,n.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return Ns(t).jt({range:i,Kt:!0},(a,c,l)=>{const[u,h,d]=a;u===e&&h===s&&(o=!0),l.done()}).next(()=>o)}function rr(t){return Ut(t,Ae.store)}function Ns(t){return Ut(t,pt.store)}function gv(t){return Ut(t,mr.store)}/**
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
 */class is{constructor(e){this.se=e}next(){return this.se+=2,this.se}static ie(){return new is(0)}static re(){return new is(-1)}}/**
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
 */class A0{constructor(e,n){this.referenceDelegate=e,this.k=n}allocateTargetId(e){return this.oe(e).next(n=>{const r=new is(n.highestTargetId);return n.highestTargetId=r.next(),this.ae(e,n).next(()=>n.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.oe(e).next(n=>se.fromTimestamp(new Ye(n.lastRemoteSnapshotVersion.seconds,n.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.oe(e).next(n=>n.highestListenSequenceNumber)}setTargetsMetadata(e,n,r){return this.oe(e).next(s=>(s.highestListenSequenceNumber=n,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),n>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=n),this.ae(e,s)))}addTargetData(e,n){return this.ce(e,n).next(()=>this.oe(e).next(r=>(r.targetCount+=1,this.ue(n,r),this.ae(e,r))))}updateTargetData(e,n){return this.ce(e,n)}removeTargetData(e,n){return this.removeMatchingKeysForTargetId(e,n.targetId).next(()=>Ss(e).delete(n.targetId)).next(()=>this.oe(e)).next(r=>(J(r.targetCount>0),r.targetCount-=1,this.ae(e,r)))}removeTargets(e,n,r){let s=0;const i=[];return Ss(e).jt((o,a)=>{const c=qi(a);c.sequenceNumber<=n&&r.get(c.targetId)===null&&(s++,i.push(this.removeTargetData(e,c)))}).next(()=>E.waitFor(i)).next(()=>s)}forEachTarget(e,n){return Ss(e).jt((r,s)=>{const i=qi(s);n(i)})}oe(e){return Cp(e).get(jt.key).next(n=>(J(n!==null),n))}ae(e,n){return Cp(e).put(jt.key,n)}ce(e,n){return Ss(e).put(fv(this.k,n))}ue(e,n){let r=!1;return e.targetId>n.highestTargetId&&(n.highestTargetId=e.targetId,r=!0),e.sequenceNumber>n.highestListenSequenceNumber&&(n.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.oe(e).next(n=>n.targetCount)}getTargetData(e,n){const r=Ko(n),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return Ss(e).jt({range:s,index:Ft.queryTargetsIndexName},(o,a,c)=>{const l=qi(a);Yc(n,l.target)&&(i=l,c.done())}).next(()=>i)}addMatchingKeys(e,n,r){const s=[],i=ur(e);return n.forEach(o=>{const a=cn(o.path);s.push(i.put(new at(r,a))),s.push(this.referenceDelegate.addReference(e,r,o))}),E.waitFor(s)}removeMatchingKeys(e,n,r){const s=ur(e);return E.forEach(n,i=>{const o=cn(i.path);return E.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,n){const r=ur(e),s=IDBKeyRange.bound([n],[n+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,n){const r=IDBKeyRange.bound([n],[n+1],!1,!0),s=ur(e);let i=ve();return s.jt({range:r,Kt:!0},(o,a,c)=>{const l=$n(o[1]),u=new W(l);i=i.add(u)}).next(()=>i)}containsKey(e,n){const r=cn(n.path),s=IDBKeyRange.bound([r],[Ry(r)],!1,!0);let i=0;return ur(e).jt({index:at.documentTargetsIndex,Kt:!0,range:s},([o,a],c,l)=>{o!==0&&(i++,l.done())}).next(()=>i>0)}Et(e,n){return Ss(e).get(n).next(r=>r?qi(r):null)}}function Ss(t){return Ut(t,Ft.store)}function Cp(t){return Ut(t,jt.store)}function ur(t){return Ut(t,at.store)}/**
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
 */async function ys(t){if(t.code!==I.FAILED_PRECONDITION||t.message!==lv)throw t;x("LocalStore","Unexpectedly lost primary lease")}/**
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
 */function Np([t,e],[n,r]){const s=ce(t,n);return s===0?ce(e,r):s}class k0{constructor(e){this.he=e,this.buffer=new Me(Np),this.le=0}fe(){return++this.le}de(e){const n=[e,this.fe()];if(this.buffer.size<this.he)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();Np(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class C0{constructor(e,n){this.garbageCollector=e,this.asyncQueue=n,this.we=!1,this._e=null}start(e){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.me(e)}stop(){this._e&&(this._e.cancel(),this._e=null)}get started(){return this._e!==null}me(e){const n=this.we?3e5:6e4;x("LruGarbageCollector",`Garbage collection scheduled in ${n}ms`),this._e=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",n,async()=>{this._e=null,this.we=!0;try{await e.collectGarbage(this.garbageCollector)}catch(r){gs(r)?x("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",r):await ys(r)}await this.me(e)})}}class N0{constructor(e,n){this.ge=e,this.params=n}calculateTargetCount(e,n){return this.ge.ye(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return E.resolve(Ht.I);const r=new k0(n);return this.ge.forEachTarget(e,s=>r.de(s.sequenceNumber)).next(()=>this.ge.pe(e,s=>r.de(s))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.ge.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.ge.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(x("LruGarbageCollector","Garbage collection skipped; disabled"),E.resolve(kp)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(x("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),kp):this.Te(e,n))}getCacheSize(e){return this.ge.getCacheSize(e)}Te(e,n){let r,s,i,o,a,c,l;const u=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(h=>(h>this.params.maximumSequenceNumbersToCollect?(x("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${h}`),s=this.params.maximumSequenceNumbersToCollect):s=h,o=Date.now(),this.nthSequenceNumber(e,s))).next(h=>(r=h,a=Date.now(),this.removeTargets(e,r,n))).next(h=>(i=h,c=Date.now(),this.removeOrphanedDocuments(e,r))).next(h=>(l=Date.now(),_u()<=he.DEBUG&&x("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-u}ms
	Determined least recently used ${s} in `+(a-o)+`ms
	Removed ${i} targets in `+(c-a)+`ms
	Removed ${h} documents in `+(l-c)+`ms
Total Duration: ${l-u}ms`),E.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:h})))}}/**
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
 */class R0{constructor(e,n){this.db=e,this.garbageCollector=function(r,s){return new N0(r,s)}(this,n)}ye(e){const n=this.Ee(e);return this.db.getTargetCache().getTargetCount(e).next(r=>n.next(s=>r+s))}Ee(e){let n=0;return this.pe(e,r=>{n++}).next(()=>n)}forEachTarget(e,n){return this.db.getTargetCache().forEachTarget(e,n)}pe(e,n){return this.Ie(e,(r,s)=>n(s))}addReference(e,n,r){return wa(e,r)}removeReference(e,n,r){return wa(e,r)}removeTargets(e,n,r){return this.db.getTargetCache().removeTargets(e,n,r)}markPotentiallyOrphaned(e,n){return wa(e,n)}Ae(e,n){return function(r,s){let i=!1;return gv(r).Qt(o=>mv(r,o,s).next(a=>(a&&(i=!0),E.resolve(!a)))).next(()=>i)}(e,n)}removeOrphanedDocuments(e,n){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.Ie(e,(o,a)=>{if(a<=n){const c=this.Ae(e,o).next(l=>{if(!l)return i++,r.getEntry(e,o).next(()=>(r.removeEntry(o),ur(e).delete([0,cn(o.path)])))});s.push(c)}}).next(()=>E.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,n){return wa(e,n)}Ie(e,n){const r=ur(e);let s,i=Ht.I;return r.jt({index:at.documentTargetsIndex},([o,a],{path:c,sequenceNumber:l})=>{o===0?(i!==Ht.I&&n(new W($n(s)),i),i=l,s=c):i=Ht.I}).next(()=>{i!==Ht.I&&n(new W($n(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function wa(t,e){return ur(t).put(function(n,r){return new at(0,cn(n.path),r)}(e,t.currentSequenceNumber))}/**
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
 */class vi{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={}}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s!==void 0){for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n])}else this.inner[r]=[[e,n]]}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),!0;return!1}forEach(e){ps(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Dy(this.inner)}}/**
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
 */class yv{constructor(){this.changes=new vi(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}getReadTime(e){const n=this.changes.get(e);return n?n.readTime:se.min()}addEntry(e,n){this.assertNotApplied(),this.changes.set(e.key,{document:e,readTime:n})}removeEntry(e,n=null){this.assertNotApplied(),this.changes.set(e,{document:De.newInvalidDocument(e),readTime:n})}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?E.resolve(r.document):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class D0{constructor(e,n){this.k=e,this.Jt=n}addEntry(e,n,r){return cr(e).put(Ia(n),r)}removeEntry(e,n){const r=cr(e),s=Ia(n);return r.delete(s)}updateMetadata(e,n){return this.getMetadata(e).next(r=>(r.byteSize+=n,this.Re(e,r)))}getEntry(e,n){return cr(e).get(Ia(n)).next(r=>this.Pe(n,r))}be(e,n){return cr(e).get(Ia(n)).next(r=>({document:this.Pe(n,r),size:dc(r)}))}getEntries(e,n){let r=nn();return this.ve(e,n,(s,i)=>{const o=this.Pe(s,i);r=r.insert(s,o)}).next(()=>r)}Ve(e,n){let r=nn(),s=new He(W.comparator);return this.ve(e,n,(i,o)=>{const a=this.Pe(i,o);r=r.insert(i,a),s=s.insert(i,dc(o))}).next(()=>({documents:r,Se:s}))}ve(e,n,r){if(n.isEmpty())return E.resolve();const s=IDBKeyRange.bound(n.first().path.toArray(),n.last().path.toArray()),i=n.getIterator();let o=i.getNext();return cr(e).jt({range:s},(a,c,l)=>{const u=W.fromSegments(a);for(;o&&W.comparator(o,u)<0;)r(o,null),o=i.getNext();o&&o.isEqual(u)&&(r(o,c),o=i.hasNext()?i.getNext():null),o?l.Lt(o.path.toArray()):l.done()}).next(()=>{for(;o;)r(o,null),o=i.hasNext()?i.getNext():null})}getDocumentsMatchingQuery(e,n,r){let s=nn();const i=n.path.length+1,o={};if(r.isEqual(se.min())){const a=n.path.toArray();o.range=IDBKeyRange.lowerBound(a)}else{const a=n.path.toArray(),c=Gh(r);o.range=IDBKeyRange.lowerBound([a,c],!0),o.index=xe.collectionReadTimeIndex}return cr(e).jt(o,(a,c,l)=>{if(a.length!==i)return;const u=Cu(this.k,c);n.path.isPrefixOf(u.key.path)?zo(n,u)&&(s=s.insert(u.key,u)):l.done()}).next(()=>s)}newChangeBuffer(e){return new O0(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(n=>n.byteSize)}getMetadata(e){return Rp(e).get(Tn.key).next(n=>(J(!!n),n))}Re(e,n){return Rp(e).put(Tn.key,n)}Pe(e,n){if(n){const r=Cu(this.k,n);if(!(r.isNoDocument()&&r.version.isEqual(se.min())))return r}return De.newInvalidDocument(e)}}class O0 extends yv{constructor(e,n){super(),this.De=e,this.trackRemovals=n,this.Ce=new vi(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const n=[];let r=0,s=new Me((i,o)=>ce(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const a=this.Ce.get(i);if(o.document.isValidDocument()){const c=Tp(this.De.k,o.document,this.getReadTime(i));s=s.add(i.path.popLast());const l=dc(c);r+=l-a,n.push(this.De.addEntry(e,i,c))}else if(r-=a,this.trackRemovals){const c=Tp(this.De.k,De.newNoDocument(i,se.min()),this.getReadTime(i));n.push(this.De.addEntry(e,i,c))}else n.push(this.De.removeEntry(e,i))}),s.forEach(i=>{n.push(this.De.Jt.addToCollectionParentIndex(e,i))}),n.push(this.De.updateMetadata(e,r)),E.waitFor(n)}getFromCache(e,n){return this.De.be(e,n).next(r=>(this.Ce.set(n,r.size),r.document))}getAllFromCache(e,n){return this.De.Ve(e,n).next(({documents:r,Se:s})=>(s.forEach((i,o)=>{this.Ce.set(i,o)}),r))}}function Rp(t){return Ut(t,Tn.store)}function cr(t){return Ut(t,xe.store)}function Ia(t){return t.path.toArray()}/**
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
 */class x0{constructor(e){this.k=e}Nt(e,n,r,s){J(r<s&&r>=0&&s<=11);const i=new el("createOrUpgrade",n);r<1&&s>=1&&(function(a){a.createObjectStore(qt.store)}(e),function(a){a.createObjectStore(mr.store,{keyPath:mr.keyPath}),a.createObjectStore(Ae.store,{keyPath:Ae.keyPath,autoIncrement:!0}).createIndex(Ae.userMutationsIndex,Ae.userMutationsKeyPath,{unique:!0}),a.createObjectStore(pt.store)}(e),Dp(e),function(a){a.createObjectStore(xe.store)}(e));let o=E.resolve();return r<3&&s>=3&&(r!==0&&(function(a){a.deleteObjectStore(at.store),a.deleteObjectStore(Ft.store),a.deleteObjectStore(jt.store)}(e),Dp(e)),o=o.next(()=>function(a){const c=a.store(jt.store),l=new jt(0,0,se.min().toTimestamp(),0);return c.put(jt.key,l)}(i))),r<4&&s>=4&&(r!==0&&(o=o.next(()=>function(a,c){return c.store(Ae.store).Bt().next(l=>{a.deleteObjectStore(Ae.store),a.createObjectStore(Ae.store,{keyPath:Ae.keyPath,autoIncrement:!0}).createIndex(Ae.userMutationsIndex,Ae.userMutationsKeyPath,{unique:!0});const u=c.store(Ae.store),h=l.map(d=>u.put(d));return E.waitFor(h)})}(e,i))),o=o.next(()=>{(function(a){a.createObjectStore(Wn.store,{keyPath:Wn.keyPath})})(e)})),r<5&&s>=5&&(o=o.next(()=>this.Ne(i))),r<6&&s>=6&&(o=o.next(()=>(function(a){a.createObjectStore(Tn.store)}(e),this.ke(i)))),r<7&&s>=7&&(o=o.next(()=>this.xe(i))),r<8&&s>=8&&(o=o.next(()=>this.$e(e,i))),r<9&&s>=9&&(o=o.next(()=>{(function(a){a.objectStoreNames.contains("remoteDocumentChanges")&&a.deleteObjectStore("remoteDocumentChanges")})(e),function(a){const c=a.objectStore(xe.store);c.createIndex(xe.readTimeIndex,xe.readTimeIndexPath,{unique:!1}),c.createIndex(xe.collectionReadTimeIndex,xe.collectionReadTimeIndexPath,{unique:!1})}(n)})),r<10&&s>=10&&(o=o.next(()=>this.Fe(i))),r<11&&s>=11&&(o=o.next(()=>{(function(a){a.createObjectStore(Zs.store,{keyPath:Zs.keyPath})})(e),function(a){a.createObjectStore(ei.store,{keyPath:ei.keyPath})}(e)})),o}ke(e){let n=0;return e.store(xe.store).jt((r,s)=>{n+=dc(s)}).next(()=>{const r=new Tn(n);return e.store(Tn.store).put(Tn.key,r)})}Ne(e){const n=e.store(mr.store),r=e.store(Ae.store);return n.Bt().next(s=>E.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,-1],[i.userId,i.lastAcknowledgedBatchId]);return r.Bt(Ae.userMutationsIndex,o).next(a=>E.forEach(a,c=>{J(c.userId===i.userId);const l=Cs(this.k,c);return pv(e,i.userId,l).next(()=>{})}))}))}xe(e){const n=e.store(at.store),r=e.store(xe.store);return e.store(jt.store).get(jt.key).next(s=>{const i=[];return r.jt((o,a)=>{const c=new pe(o),l=function(u){return[0,cn(u)]}(c);i.push(n.get(l).next(u=>u?E.resolve():(h=>n.put(new at(0,cn(h),s.highestListenSequenceNumber)))(c)))}).next(()=>E.waitFor(i))})}$e(e,n){e.createObjectStore(Gr.store,{keyPath:Gr.keyPath});const r=n.store(Gr.store),s=new Yh,i=o=>{if(s.add(o)){const a=o.lastSegment(),c=o.popLast();return r.put({collectionId:a,parent:cn(c)})}};return n.store(xe.store).jt({Kt:!0},(o,a)=>{const c=new pe(o);return i(c.popLast())}).next(()=>n.store(pt.store).jt({Kt:!0},([o,a,c],l)=>{const u=$n(a);return i(u.popLast())}))}Fe(e){const n=e.store(Ft.store);return n.jt((r,s)=>{const i=qi(s),o=fv(this.k,i);return n.put(o)})}}function Dp(t){t.createObjectStore(at.store,{keyPath:at.keyPath}).createIndex(at.documentTargetsIndex,at.documentTargetsKeyPath,{unique:!0}),t.createObjectStore(Ft.store,{keyPath:Ft.keyPath}).createIndex(Ft.queryTargetsIndexName,Ft.queryTargetsKeyPath,{unique:!0}),t.createObjectStore(jt.store)}const ql="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Xh{constructor(e,n,r,s,i,o,a,c,l,u){if(this.allowTabSynchronization=e,this.persistenceKey=n,this.clientId=r,this.Oe=i,this.window=o,this.document=a,this.Me=l,this.Le=u,this.Be=null,this.Ue=!1,this.isPrimary=!1,this.networkEnabled=!0,this.qe=null,this.inForeground=!1,this.Ke=null,this.je=null,this.Qe=Number.NEGATIVE_INFINITY,this.We=h=>Promise.resolve(),!Xh.bt())throw new k(I.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new R0(this,s),this.Ge=n+"main",this.k=new hv(c),this.ze=new on(this.Ge,11,new x0(this.k)),this.He=new A0(this.referenceDelegate,this.k),this.Jt=new S0,this.Je=function(h,d){return new D0(h,d)}(this.k,this.Jt),this.Ye=new T0,this.window&&this.window.localStorage?this.Xe=this.window.localStorage:(this.Xe=null,u===!1&&qe("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ze().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new k(I.FAILED_PRECONDITION,ql);return this.tn(),this.en(),this.nn(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.He.getHighestSequenceNumber(e))}).then(e=>{this.Be=new Ht(e,this.Me)}).then(()=>{this.Ue=!0}).catch(e=>(this.ze&&this.ze.close(),Promise.reject(e)))}sn(e){return this.We=async n=>{if(this.started)return e(n)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.ze.xt(async n=>{n.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Oe.enqueueAndForget(async()=>{this.started&&await this.Ze()}))}Ze(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>_a(e).put(new Wn(this.clientId,Date.now(),this.networkEnabled,this.inForeground)).next(()=>{if(this.isPrimary)return this.rn(e).next(n=>{n||(this.isPrimary=!1,this.Oe.enqueueRetryable(()=>this.We(!1)))})}).next(()=>this.on(e)).next(n=>this.isPrimary&&!n?this.an(e).next(()=>!1):!!n&&this.cn(e).next(()=>!0))).catch(e=>{if(gs(e))return x("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return x("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Oe.enqueueRetryable(()=>this.We(e)),this.isPrimary=e})}rn(e){return Pi(e).get(qt.key).next(n=>E.resolve(this.un(n)))}hn(e){return _a(e).delete(this.clientId)}async ln(){if(this.isPrimary&&!this.fn(this.Qe,18e5)){this.Qe=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",n=>{const r=Ut(n,Wn.store);return r.Bt().next(s=>{const i=this.dn(s,18e5),o=s.filter(a=>i.indexOf(a)===-1);return E.forEach(o,a=>r.delete(a.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Xe)for(const n of e)this.Xe.removeItem(this.wn(n.clientId))}}nn(){this.je=this.Oe.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Ze().then(()=>this.ln()).then(()=>this.nn()))}un(e){return!!e&&e.ownerId===this.clientId}on(e){return this.Le?E.resolve(!0):Pi(e).get(qt.key).next(n=>{if(n!==null&&this.fn(n.leaseTimestampMs,5e3)&&!this._n(n.ownerId)){if(this.un(n)&&this.networkEnabled)return!0;if(!this.un(n)){if(!n.allowTabSynchronization)throw new k(I.FAILED_PRECONDITION,ql);return!1}}return!(!this.networkEnabled||!this.inForeground)||_a(e).Bt().next(r=>this.dn(r,5e3).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,a=this.networkEnabled===s.networkEnabled;if(i||o&&a)return!0}return!1})===void 0)}).next(n=>(this.isPrimary!==n&&x("IndexedDbPersistence",`Client ${n?"is":"is not"} eligible for a primary lease.`),n))}async shutdown(){this.Ue=!1,this.mn(),this.je&&(this.je.cancel(),this.je=null),this.gn(),this.yn(),await this.ze.runTransaction("shutdown","readwrite",[qt.store,Wn.store],e=>{const n=new bp(e,Ht.I);return this.an(n).next(()=>this.hn(n))}),this.ze.close(),this.pn()}dn(e,n){return e.filter(r=>this.fn(r.updateTimeMs,n)&&!this._n(r.clientId))}Tn(){return this.runTransaction("getActiveClients","readonly",e=>_a(e).Bt().next(n=>this.dn(n,18e5).map(r=>r.clientId)))}get started(){return this.Ue}getMutationQueue(e){return Jh.Xt(e,this.k,this.Jt,this.referenceDelegate)}getTargetCache(){return this.He}getRemoteDocumentCache(){return this.Je}getIndexManager(){return this.Jt}getBundleCache(){return this.Ye}runTransaction(e,n,r){x("IndexedDbPersistence","Starting transaction:",e);const s=n==="readonly"?"readonly":"readwrite";let i;return this.ze.runTransaction(e,s,I0,o=>(i=new bp(o,this.Be?this.Be.next():Ht.I),n==="readwrite-primary"?this.rn(i).next(a=>!!a||this.on(i)).next(a=>{if(!a)throw qe(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Oe.enqueueRetryable(()=>this.We(!1)),new k(I.FAILED_PRECONDITION,lv);return r(i)}).next(a=>this.cn(i).next(()=>a)):this.En(i).next(()=>r(i)))).then(o=>(i.raiseOnCommittedEvent(),o))}En(e){return Pi(e).get(qt.key).next(n=>{if(n!==null&&this.fn(n.leaseTimestampMs,5e3)&&!this._n(n.ownerId)&&!this.un(n)&&!(this.Le||this.allowTabSynchronization&&n.allowTabSynchronization))throw new k(I.FAILED_PRECONDITION,ql)})}cn(e){const n=new qt(this.clientId,this.allowTabSynchronization,Date.now());return Pi(e).put(qt.key,n)}static bt(){return on.bt()}an(e){const n=Pi(e);return n.get(qt.key).next(r=>this.un(r)?(x("IndexedDbPersistence","Releasing primary lease."),n.delete(qt.key)):E.resolve())}fn(e,n){const r=Date.now();return!(e<r-n)&&(!(e>r)||(qe(`Detected an update time that is in the future: ${e} > ${r}`),!1))}tn(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ke=()=>{this.Oe.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Ze()))},this.document.addEventListener("visibilitychange",this.Ke),this.inForeground=this.document.visibilityState==="visible")}gn(){this.Ke&&(this.document.removeEventListener("visibilitychange",this.Ke),this.Ke=null)}en(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.qe=()=>{this.mn(),oT()&&navigator.appVersion.match(/Version\/1[45]/)&&this.Oe.enterRestrictedMode(!0),this.Oe.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.qe))}yn(){this.qe&&(this.window.removeEventListener("pagehide",this.qe),this.qe=null)}_n(e){var n;try{const r=((n=this.Xe)===null||n===void 0?void 0:n.getItem(this.wn(e)))!==null;return x("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return qe("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}mn(){if(this.Xe)try{this.Xe.setItem(this.wn(this.clientId),String(Date.now()))}catch(e){qe("Failed to set zombie client id.",e)}}pn(){if(this.Xe)try{this.Xe.removeItem(this.wn(this.clientId))}catch{}}wn(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Pi(t){return Ut(t,qt.store)}function _a(t){return Ut(t,Wn.store)}function Zh(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"}/**
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
 */class P0{constructor(e,n){this.progress=e,this.In=n}}/**
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
 */class vv{constructor(e,n,r){this.Je=e,this.An=n,this.Jt=r}Rn(e,n){return this.An.getAllMutationBatchesAffectingDocumentKey(e,n).next(r=>this.Pn(e,n,r))}Pn(e,n,r){return this.Je.getEntry(e,n).next(s=>{for(const i of r)i.applyToLocalView(s);return s})}bn(e,n){e.forEach((r,s)=>{for(const i of n)i.applyToLocalView(s)})}vn(e,n){return this.Je.getEntries(e,n).next(r=>this.Vn(e,r).next(()=>r))}Vn(e,n){return this.An.getAllMutationBatchesAffectingDocumentKeys(e,n).next(r=>this.bn(n,r))}getDocumentsMatchingQuery(e,n,r){return function(s){return W.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}(n)?this.Sn(e,n.path):Bh(n)?this.Dn(e,n,r):this.Cn(e,n,r)}Sn(e,n){return this.Rn(e,new W(n)).next(r=>{let s=Au();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}Dn(e,n,r){const s=n.collectionGroup;let i=Au();return this.Jt.getCollectionParents(e,s).next(o=>E.forEach(o,a=>{const c=function(l,u){return new Zn(u,null,l.explicitOrderBy.slice(),l.filters.slice(),l.limit,l.limitType,l.startAt,l.endAt)}(n,a.child(s));return this.Cn(e,c,r).next(l=>{l.forEach((u,h)=>{i=i.insert(u,h)})})}).next(()=>i))}Cn(e,n,r){let s,i;return this.Je.getDocumentsMatchingQuery(e,n,r).next(o=>(s=o,this.An.getAllMutationBatchesAffectingQuery(e,n))).next(o=>(i=o,this.Nn(e,i,s).next(a=>{s=a;for(const c of i)for(const l of c.mutations){const u=l.key;let h=s.get(u);h==null&&(h=De.newInvalidDocument(u),s=s.insert(u,h)),Su(l,h,c.localWriteTime),h.isFoundDocument()||(s=s.remove(u))}}))).next(()=>(s.forEach((o,a)=>{zo(n,a)||(s=s.remove(o))}),s))}Nn(e,n,r){let s=ve();for(const o of n)for(const a of o.mutations)a instanceof Nr&&r.get(a.key)===null&&(s=s.add(a.key));let i=r;return this.Je.getEntries(e,s).next(o=>(o.forEach((a,c)=>{c.isFoundDocument()&&(i=i.insert(a,c))}),i))}}/**
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
 */class ed{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.kn=r,this.xn=s}static $n(e,n){let r=ve(),s=ve();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ed(e,n.fromCache,r,s)}}/**
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
 */class wv{Fn(e){this.On=e}getDocumentsMatchingQuery(e,n,r,s){return function(i){return i.filters.length===0&&i.limit===null&&i.startAt==null&&i.endAt==null&&(i.explicitOrderBy.length===0||i.explicitOrderBy.length===1&&i.explicitOrderBy[0].field.isKeyField())}(n)||r.isEqual(se.min())?this.Mn(e,n):this.On.vn(e,s).next(i=>{const o=this.Ln(n,i);return(Na(n)||uc(n))&&this.Bn(n.limitType,o,s,r)?this.Mn(e,n):(_u()<=he.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Eu(n)),this.On.getDocumentsMatchingQuery(e,n,r).next(a=>(o.forEach(c=>{a=a.insert(c.key,c)}),a)))})}Ln(e,n){let r=new Me(Vy(e));return n.forEach((s,i)=>{zo(e,i)&&(r=r.add(i))}),r}Bn(e,n,r,s){if(r.size!==n.size)return!0;const i=e==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Mn(e,n){return _u()<=he.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",Eu(n)),this.On.getDocumentsMatchingQuery(e,n,se.min())}}/**
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
 */class M0{constructor(e,n,r,s){this.persistence=e,this.Un=n,this.k=s,this.qn=new He(ce),this.Kn=new vi(i=>Ko(i),Yc),this.jn=se.min(),this.An=e.getMutationQueue(r),this.Qn=e.getRemoteDocumentCache(),this.He=e.getTargetCache(),this.Wn=new vv(this.Qn,this.An,this.persistence.getIndexManager()),this.Ye=e.getBundleCache(),this.Un.Fn(this.Wn)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.qn))}}function Iv(t,e,n,r){return new M0(t,e,n,r)}async function _v(t,e){const n=V(t);let r=n.An,s=n.Wn;const i=await n.persistence.runTransaction("Handle user change","readonly",o=>{let a;return n.An.getAllMutationBatches(o).next(c=>(a=c,r=n.persistence.getMutationQueue(e),s=new vv(n.Qn,r,n.persistence.getIndexManager()),r.getAllMutationBatches(o))).next(c=>{const l=[],u=[];let h=ve();for(const d of a){l.push(d.batchId);for(const f of d.mutations)h=h.add(f.key)}for(const d of c){u.push(d.batchId);for(const f of d.mutations)h=h.add(f.key)}return s.vn(o,h).next(d=>({Gn:d,removedBatchIds:l,addedBatchIds:u}))})});return n.An=r,n.Wn=s,n.Un.Fn(n.Wn),i}function L0(t,e){const n=V(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.Qn.newChangeBuffer({trackRemovals:!0});return function(o,a,c,l){const u=c.batch,h=u.keys();let d=E.resolve();return h.forEach(f=>{d=d.next(()=>l.getEntry(a,f)).next(y=>{const S=c.docVersions.get(f);J(S!==null),y.version.compareTo(S)<0&&(u.applyToRemoteDocument(y,c),y.isValidDocument()&&l.addEntry(y,c.commitVersion))})}),d.next(()=>o.An.removeMutationBatch(a,u))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.An.performConsistencyCheck(r)).next(()=>n.Wn.vn(r,s))})}function bv(t){const e=V(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.He.getLastRemoteSnapshotVersion(n))}function F0(t,e){const n=V(t),r=e.snapshotVersion;let s=n.qn;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Qn.newChangeBuffer({trackRemovals:!0});s=n.qn;const a=[];e.targetChanges.forEach((l,u)=>{const h=s.get(u);if(!h)return;a.push(n.He.removeMatchingKeys(i,l.removedDocuments,u).next(()=>n.He.addMatchingKeys(i,l.addedDocuments,u)));const d=l.resumeToken;if(d.approximateByteSize()>0){const f=h.withResumeToken(d,r).withSequenceNumber(i.currentSequenceNumber);s=s.insert(u,f),function(y,S,T){return J(S.resumeToken.approximateByteSize()>0),y.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-y.snapshotVersion.toMicroseconds()>=3e8?!0:T.addedDocuments.size+T.modifiedDocuments.size+T.removedDocuments.size>0}(h,f,l)&&a.push(n.He.updateTargetData(i,f))}});let c=nn();if(e.documentUpdates.forEach((l,u)=>{e.resolvedLimboDocuments.has(l)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,l))}),a.push(Tv(i,o,e.documentUpdates,r,void 0).next(l=>{c=l})),!r.isEqual(se.min())){const l=n.He.getLastRemoteSnapshotVersion(i).next(u=>n.He.setTargetsMetadata(i,i.currentSequenceNumber,r));a.push(l)}return E.waitFor(a).next(()=>o.apply(i)).next(()=>n.Wn.Vn(i,c)).next(()=>c)}).then(i=>(n.qn=s,i))}function Tv(t,e,n,r,s){let i=ve();return n.forEach(o=>i=i.add(o)),e.getEntries(t,i).next(o=>{let a=nn();return n.forEach((c,l)=>{const u=o.get(c),h=(s==null?void 0:s.get(c))||r;l.isNoDocument()&&l.version.isEqual(se.min())?(e.removeEntry(c,h),a=a.insert(c,l)):!u.isValidDocument()||l.version.compareTo(u.version)>0||l.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(l,h),a=a.insert(c,l)):x("LocalStore","Ignoring outdated watch update for ",c,". Current version:",u.version," Watch version:",l.version)}),a})}function U0(t,e){const n=V(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.An.getNextMutationBatchAfterBatchId(r,e)))}function ri(t,e){const n=V(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.He.getTargetData(r,e).next(i=>i?(s=i,E.resolve(s)):n.He.allocateTargetId(r).next(o=>(s=new gr(e,o,0,r.currentSequenceNumber),n.He.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.qn.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.qn=n.qn.insert(r.targetId,r),n.Kn.set(e,r.targetId)),r})}async function si(t,e,n){const r=V(t),s=r.qn.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!gs(o))throw o;x("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.qn=r.qn.remove(e),r.Kn.delete(s.target)}function fc(t,e,n){const r=V(t);let s=se.min(),i=ve();return r.persistence.runTransaction("Execute query","readonly",o=>function(a,c,l){const u=V(a),h=u.Kn.get(l);return h!==void 0?E.resolve(u.qn.get(h)):u.He.getTargetData(c,l)}(r,o,rn(e)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.He.getMatchingKeysForTargetId(o,a.targetId).next(c=>{i=c})}).next(()=>r.Un.getDocumentsMatchingQuery(o,e,n?s:se.min(),n?i:ve())).next(a=>({documents:a,zn:i})))}function Ev(t,e){const n=V(t),r=V(n.He),s=n.qn.get(e);return s?Promise.resolve(s.target):n.persistence.runTransaction("Get target data","readonly",i=>r.Et(i,e).next(o=>o?o.target:null))}function Sv(t){const e=V(t);return e.persistence.runTransaction("Get new document changes","readonly",n=>function(r,s,i){const o=V(r);let a=nn(),c=Gh(i);const l=cr(s),u=IDBKeyRange.lowerBound(c,!0);return l.jt({index:xe.readTimeIndex,range:u},(h,d)=>{const f=Cu(o.k,d);a=a.insert(f.key,f),c=d.readTime}).next(()=>({In:a,readTime:dv(c)}))}(e.Qn,n,e.jn)).then(({In:n,readTime:r})=>(e.jn=r,n))}async function V0(t){const e=V(t);return e.persistence.runTransaction("Synchronize last document change read time","readonly",n=>function(r){const s=cr(r);let i=se.min();return s.jt({index:xe.readTimeIndex,reverse:!0},(o,a,c)=>{a.readTime&&(i=dv(a.readTime)),c.done()}).next(()=>i)}(n)).then(n=>{e.jn=n})}async function $0(t,e,n,r){const s=V(t);let i=ve(),o=nn(),a=Yy();for(const u of n){const h=e.Hn(u.metadata.name);u.document&&(i=i.add(h)),o=o.insert(h,e.Jn(u)),a=a.insert(h,e.Yn(u.metadata.readTime))}const c=s.Qn.newChangeBuffer({trackRemovals:!0}),l=await ri(s,function(u){return rn(yi(pe.fromString(`__bundle__/docs/${u}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",u=>Tv(u,c,o,se.min(),a).next(h=>(c.apply(u),h)).next(h=>s.He.removeMatchingKeysForTargetId(u,l.targetId).next(()=>s.He.addMatchingKeys(u,i,l.targetId)).next(()=>s.Wn.Vn(u,h)).next(()=>h)))}async function q0(t,e,n=ve()){const r=await ri(t,rn(Qh(e.bundledQuery))),s=V(t);return s.persistence.runTransaction("Save named query","readwrite",i=>{const o=Je(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return s.Ye.saveNamedQuery(i,e);const a=r.withResumeToken(Ze.EMPTY_BYTE_STRING,o);return s.qn=s.qn.insert(a.targetId,a),s.He.updateTargetData(i,a).next(()=>s.He.removeMatchingKeysForTargetId(i,r.targetId)).next(()=>s.He.addMatchingKeys(i,n,r.targetId)).next(()=>s.Ye.saveNamedQuery(i,e))})}/**
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
 */class B0{constructor(e){this.k=e,this.Xn=new Map,this.Zn=new Map}getBundleMetadata(e,n){return E.resolve(this.Xn.get(n))}saveBundleMetadata(e,n){var r;return this.Xn.set(n.id,{id:(r=n).id,version:r.version,createTime:Je(r.createTime)}),E.resolve()}getNamedQuery(e,n){return E.resolve(this.Zn.get(n))}saveNamedQuery(e,n){return this.Zn.set(n.name,function(r){return{name:r.name,query:Qh(r.bundledQuery),readTime:Je(r.readTime)}}(n)),E.resolve()}}/**
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
 */class td{constructor(){this.ts=new Me(Ge.es),this.ns=new Me(Ge.ss)}isEmpty(){return this.ts.isEmpty()}addReference(e,n){const r=new Ge(e,n);this.ts=this.ts.add(r),this.ns=this.ns.add(r)}rs(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.os(new Ge(e,n))}cs(e,n){e.forEach(r=>this.removeReference(r,n))}us(e){const n=new W(new pe([])),r=new Ge(n,e),s=new Ge(n,e+1),i=[];return this.ns.forEachInRange([r,s],o=>{this.os(o),i.push(o.key)}),i}hs(){this.ts.forEach(e=>this.os(e))}os(e){this.ts=this.ts.delete(e),this.ns=this.ns.delete(e)}ls(e){const n=new W(new pe([])),r=new Ge(n,e),s=new Ge(n,e+1);let i=ve();return this.ns.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new Ge(e,0),r=this.ts.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Ge{constructor(e,n){this.key=e,this.fs=n}static es(e,n){return W.comparator(e.key,n.key)||ce(e.fs,n.fs)}static ss(e,n){return ce(e.fs,n.fs)||W.comparator(e.key,n.key)}}/**
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
 */class j0{constructor(e,n){this.Jt=e,this.referenceDelegate=n,this.An=[],this.ds=1,this.ws=new Me(Ge.es)}checkEmpty(e){return E.resolve(this.An.length===0)}addMutationBatch(e,n,r,s){const i=this.ds;this.ds++,this.An.length>0&&this.An[this.An.length-1];const o=new Hh(i,n,r,s);this.An.push(o);for(const a of s)this.ws=this.ws.add(new Ge(a.key,i)),this.Jt.addToCollectionParentIndex(e,a.key.path.popLast());return E.resolve(o)}lookupMutationBatch(e,n){return E.resolve(this._s(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.gs(r),i=s<0?0:s;return E.resolve(this.An.length>i?this.An[i]:null)}getHighestUnacknowledgedBatchId(){return E.resolve(this.An.length===0?-1:this.ds-1)}getAllMutationBatches(e){return E.resolve(this.An.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Ge(n,0),s=new Ge(n,Number.POSITIVE_INFINITY),i=[];return this.ws.forEachInRange([r,s],o=>{const a=this._s(o.fs);i.push(a)}),E.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Me(ce);return n.forEach(s=>{const i=new Ge(s,0),o=new Ge(s,Number.POSITIVE_INFINITY);this.ws.forEachInRange([i,o],a=>{r=r.add(a.fs)})}),E.resolve(this.ys(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;W.isDocumentKey(i)||(i=i.child(""));const o=new Ge(new W(i),0);let a=new Me(ce);return this.ws.forEachWhile(c=>{const l=c.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(a=a.add(c.fs)),!0)},o),E.resolve(this.ys(a))}ys(e){const n=[];return e.forEach(r=>{const s=this._s(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){J(this.ps(n.batchId,"removed")===0),this.An.shift();let r=this.ws;return E.forEach(n.mutations,s=>{const i=new Ge(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.ws=r})}ee(e){}containsKey(e,n){const r=new Ge(n,0),s=this.ws.firstAfterOrEqual(r);return E.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.An.length,E.resolve()}ps(e,n){return this.gs(e)}gs(e){return this.An.length===0?0:e-this.An[0].batchId}_s(e){const n=this.gs(e);return n<0||n>=this.An.length?null:this.An[n]}}/**
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
 */class W0{constructor(e,n){this.Jt=e,this.Ts=n,this.docs=new He(W.comparator),this.size=0}addEntry(e,n,r){const s=n.key,i=this.docs.get(s),o=i?i.size:0,a=this.Ts(n);return this.docs=this.docs.insert(s,{document:n.clone(),size:a,readTime:r}),this.size+=a-o,this.Jt.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return E.resolve(r?r.document.clone():De.newInvalidDocument(n))}getEntries(e,n){let r=nn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.clone():De.newInvalidDocument(s))}),E.resolve(r)}getDocumentsMatchingQuery(e,n,r){let s=nn();const i=new W(n.path.child("")),o=this.docs.getIteratorFrom(i);for(;o.hasNext();){const{key:a,value:{document:c,readTime:l}}=o.getNext();if(!n.path.isPrefixOf(a.path))break;l.compareTo(r)<=0||zo(n,c)&&(s=s.insert(c.key,c.clone()))}return E.resolve(s)}Es(e,n){return E.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new K0(this)}getSize(e){return E.resolve(this.size)}}class K0 extends yv{constructor(e){super(),this.De=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.document.isValidDocument()?n.push(this.De.addEntry(e,s.document,this.getReadTime(r))):this.De.removeEntry(r)}),E.waitFor(n)}getFromCache(e,n){return this.De.getEntry(e,n)}getAllFromCache(e,n){return this.De.getEntries(e,n)}}/**
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
 */class H0{constructor(e){this.persistence=e,this.Is=new vi(n=>Ko(n),Yc),this.lastRemoteSnapshotVersion=se.min(),this.highestTargetId=0,this.As=0,this.Rs=new td,this.targetCount=0,this.Ps=is.ie()}forEachTarget(e,n){return this.Is.forEach((r,s)=>n(s)),E.resolve()}getLastRemoteSnapshotVersion(e){return E.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return E.resolve(this.As)}allocateTargetId(e){return this.highestTargetId=this.Ps.next(),E.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.As&&(this.As=n),E.resolve()}ce(e){this.Is.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.Ps=new is(n),this.highestTargetId=n),e.sequenceNumber>this.As&&(this.As=e.sequenceNumber)}addTargetData(e,n){return this.ce(n),this.targetCount+=1,E.resolve()}updateTargetData(e,n){return this.ce(n),E.resolve()}removeTargetData(e,n){return this.Is.delete(n.target),this.Rs.us(n.targetId),this.targetCount-=1,E.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Is.forEach((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.Is.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)}),E.waitFor(i).next(()=>s)}getTargetCount(e){return E.resolve(this.targetCount)}getTargetData(e,n){const r=this.Is.get(n)||null;return E.resolve(r)}addMatchingKeys(e,n,r){return this.Rs.rs(n,r),E.resolve()}removeMatchingKeys(e,n,r){this.Rs.cs(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),E.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Rs.us(n),E.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Rs.ls(n);return E.resolve(r)}containsKey(e,n){return E.resolve(this.Rs.containsKey(n))}}/**
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
 */class z0{constructor(e,n){this.bs={},this.Be=new Ht(0),this.Ue=!1,this.Ue=!0,this.referenceDelegate=e(this),this.He=new H0(this),this.Jt=new E0,this.Je=function(r,s){return new W0(r,s)}(this.Jt,r=>this.referenceDelegate.vs(r)),this.k=new hv(n),this.Ye=new B0(this.k)}start(){return Promise.resolve()}shutdown(){return this.Ue=!1,Promise.resolve()}get started(){return this.Ue}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.Jt}getMutationQueue(e){let n=this.bs[e.toKey()];return n||(n=new j0(this.Jt,this.referenceDelegate),this.bs[e.toKey()]=n),n}getTargetCache(){return this.He}getRemoteDocumentCache(){return this.Je}getBundleCache(){return this.Ye}runTransaction(e,n,r){x("MemoryPersistence","Starting transaction:",e);const s=new G0(this.Be.next());return this.referenceDelegate.Vs(),r(s).next(i=>this.referenceDelegate.Ss(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ds(e,n){return E.or(Object.values(this.bs).map(r=>()=>r.containsKey(e,n)))}}class G0 extends uv{constructor(e){super(),this.currentSequenceNumber=e}}class nd{constructor(e){this.persistence=e,this.Cs=new td,this.Ns=null}static ks(e){return new nd(e)}get xs(){if(this.Ns)return this.Ns;throw K()}addReference(e,n,r){return this.Cs.addReference(r,n),this.xs.delete(r.toString()),E.resolve()}removeReference(e,n,r){return this.Cs.removeReference(r,n),this.xs.add(r.toString()),E.resolve()}markPotentiallyOrphaned(e,n){return this.xs.add(n.toString()),E.resolve()}removeTarget(e,n){this.Cs.us(n.targetId).forEach(s=>this.xs.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.xs.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Vs(){this.Ns=new Set}Ss(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return E.forEach(this.xs,r=>{const s=W.fromPath(r);return this.$s(e,s).next(i=>{i||n.removeEntry(s)})}).next(()=>(this.Ns=null,n.apply(e)))}updateLimboDocument(e,n){return this.$s(e,n).next(r=>{r?this.xs.delete(n.toString()):this.xs.add(n.toString())})}vs(e){return 0}$s(e,n){return E.or([()=>E.resolve(this.Cs.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ds(e,n)])}}/**
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
 */function Op(t,e){return`firestore_clients_${t}_${e}`}function xp(t,e,n){let r=`firestore_mutations_${t}_${n}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function Bl(t,e){return`firestore_targets_${t}_${e}`}class pc{constructor(e,n,r,s){this.user=e,this.batchId=n,this.state=r,this.error=s}static Fs(e,n,r){const s=JSON.parse(r);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new k(s.error.code,s.error.message))),o?new pc(e,n,s.state,i):(qe("SharedClientState",`Failed to parse mutation state for ID '${n}': ${r}`),null)}Os(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Zi{constructor(e,n,r){this.targetId=e,this.state=n,this.error=r}static Fs(e,n){const r=JSON.parse(n);let s,i=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return i&&r.error&&(i=typeof r.error.message=="string"&&typeof r.error.code=="string",i&&(s=new k(r.error.code,r.error.message))),i?new Zi(e,r.state,s):(qe("SharedClientState",`Failed to parse target state for ID '${e}': ${n}`),null)}Os(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class mc{constructor(e,n){this.clientId=e,this.activeTargetIds=n}static Fs(e,n){const r=JSON.parse(n);let s=typeof r=="object"&&r.activeTargetIds instanceof Array,i=Zc();for(let o=0;s&&o<r.activeTargetIds.length;++o)s=xy(r.activeTargetIds[o]),i=i.add(r.activeTargetIds[o]);return s?new mc(e,i):(qe("SharedClientState",`Failed to parse client data for instance '${e}': ${n}`),null)}}class rd{constructor(e,n){this.clientId=e,this.onlineState=n}static Fs(e){const n=JSON.parse(e);return typeof n=="object"&&["Unknown","Online","Offline"].indexOf(n.onlineState)!==-1&&typeof n.clientId=="string"?new rd(n.clientId,n.onlineState):(qe("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Nu{constructor(){this.activeTargetIds=Zc()}Ms(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ls(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Os(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class jl{constructor(e,n,r,s,i){this.window=e,this.Oe=n,this.persistenceKey=r,this.Bs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Us=this.qs.bind(this),this.Ks=new He(ce),this.started=!1,this.js=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Qs=Op(this.persistenceKey,this.Bs),this.Ws=function(a){return`firestore_sequence_number_${a}`}(this.persistenceKey),this.Ks=this.Ks.insert(this.Bs,new Nu),this.Gs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.zs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Hs=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.Js=function(a){return`firestore_online_state_${a}`}(this.persistenceKey),this.Ys=function(a){return`firestore_bundle_loaded_${a}`}(this.persistenceKey),this.window.addEventListener("storage",this.Us)}static bt(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Tn();for(const r of e){if(r===this.Bs)continue;const s=this.getItem(Op(this.persistenceKey,r));if(s){const i=mc.Fs(r,s);i&&(this.Ks=this.Ks.insert(i.clientId,i))}}this.Xs();const n=this.storage.getItem(this.Js);if(n){const r=this.Zs(n);r&&this.ti(r)}for(const r of this.js)this.qs(r);this.js=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ws,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ei(this.Ks)}isActiveQueryTarget(e){let n=!1;return this.Ks.forEach((r,s)=>{s.activeTargetIds.has(e)&&(n=!0)}),n}addPendingMutation(e){this.ni(e,"pending")}updateMutationState(e,n,r){this.ni(e,n,r),this.si(e)}addLocalQueryTarget(e){let n="not-current";if(this.isActiveQueryTarget(e)){const r=this.storage.getItem(Bl(this.persistenceKey,e));if(r){const s=Zi.Fs(e,r);s&&(n=s.state)}}return this.ii.Ms(e),this.Xs(),n}removeLocalQueryTarget(e){this.ii.Ls(e),this.Xs()}isLocalQueryTarget(e){return this.ii.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Bl(this.persistenceKey,e))}updateQueryState(e,n,r){this.ri(e,n,r)}handleUserChange(e,n,r){n.forEach(s=>{this.si(s)}),this.currentUser=e,r.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(e){this.oi(e)}notifyBundleLoaded(){this.ai()}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Us),this.removeItem(this.Qs),this.started=!1)}getItem(e){const n=this.storage.getItem(e);return x("SharedClientState","READ",e,n),n}setItem(e,n){x("SharedClientState","SET",e,n),this.storage.setItem(e,n)}removeItem(e){x("SharedClientState","REMOVE",e),this.storage.removeItem(e)}qs(e){const n=e;if(n.storageArea===this.storage){if(x("SharedClientState","EVENT",n.key,n.newValue),n.key===this.Qs)return void qe("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Oe.enqueueRetryable(async()=>{if(this.started){if(n.key!==null){if(this.Gs.test(n.key)){if(n.newValue==null){const r=this.ci(n.key);return this.ui(r,null)}{const r=this.hi(n.key,n.newValue);if(r)return this.ui(r.clientId,r)}}else if(this.zs.test(n.key)){if(n.newValue!==null){const r=this.li(n.key,n.newValue);if(r)return this.fi(r)}}else if(this.Hs.test(n.key)){if(n.newValue!==null){const r=this.di(n.key,n.newValue);if(r)return this.wi(r)}}else if(n.key===this.Js){if(n.newValue!==null){const r=this.Zs(n.newValue);if(r)return this.ti(r)}}else if(n.key===this.Ws){const r=function(s){let i=Ht.I;if(s!=null)try{const o=JSON.parse(s);J(typeof o=="number"),i=o}catch(o){qe("SharedClientState","Failed to read sequence number from WebStorage",o)}return i}(n.newValue);r!==Ht.I&&this.sequenceNumberHandler(r)}else if(n.key===this.Ys)return this.syncEngine._i()}}else this.js.push(n)})}}get ii(){return this.Ks.get(this.Bs)}Xs(){this.setItem(this.Qs,this.ii.Os())}ni(e,n,r){const s=new pc(this.currentUser,e,n,r),i=xp(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Os())}si(e){const n=xp(this.persistenceKey,this.currentUser,e);this.removeItem(n)}oi(e){const n={clientId:this.Bs,onlineState:e};this.storage.setItem(this.Js,JSON.stringify(n))}ri(e,n,r){const s=Bl(this.persistenceKey,e),i=new Zi(e,n,r);this.setItem(s,i.Os())}ai(){this.setItem(this.Ys,"value-not-used")}ci(e){const n=this.Gs.exec(e);return n?n[1]:null}hi(e,n){const r=this.ci(e);return mc.Fs(r,n)}li(e,n){const r=this.zs.exec(e),s=Number(r[1]),i=r[2]!==void 0?r[2]:null;return pc.Fs(new rt(i),s,n)}di(e,n){const r=this.Hs.exec(e),s=Number(r[1]);return Zi.Fs(s,n)}Zs(e){return rd.Fs(e)}async fi(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.mi(e.batchId,e.state,e.error);x("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}wi(e){return this.syncEngine.gi(e.targetId,e.state,e.error)}ui(e,n){const r=n?this.Ks.insert(e,n):this.Ks.remove(e),s=this.ei(this.Ks),i=this.ei(r),o=[],a=[];return i.forEach(c=>{s.has(c)||o.push(c)}),s.forEach(c=>{i.has(c)||a.push(c)}),this.syncEngine.yi(o,a).then(()=>{this.Ks=r})}ti(e){this.Ks.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ei(e){let n=Zc();return e.forEach((r,s)=>{n=n.unionWith(s.activeTargetIds)}),n}}class Av{constructor(){this.pi=new Nu,this.Ti={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e){return this.pi.Ms(e),this.Ti[e]||"not-current"}updateQueryState(e,n,r){this.Ti[e]=n}removeLocalQueryTarget(e){this.pi.Ls(e)}isLocalQueryTarget(e){return this.pi.activeTargetIds.has(e)}clearQueryState(e){delete this.Ti[e]}getAllActiveQueryTargets(){return this.pi.activeTargetIds}isActiveQueryTarget(e){return this.pi.activeTargetIds.has(e)}start(){return this.pi=new Nu,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(){}}/**
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
 */class Q0{Ei(e){}shutdown(){}}/**
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
 */class Pp{constructor(){this.Ii=()=>this.Ai(),this.Ri=()=>this.Pi(),this.bi=[],this.vi()}Ei(e){this.bi.push(e)}shutdown(){window.removeEventListener("online",this.Ii),window.removeEventListener("offline",this.Ri)}vi(){window.addEventListener("online",this.Ii),window.addEventListener("offline",this.Ri)}Ai(){x("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.bi)e(0)}Pi(){x("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.bi)e(1)}static bt(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */const Y0={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};/**
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
 */class J0{constructor(e){this.Vi=e.Vi,this.Si=e.Si}Di(e){this.Ci=e}Ni(e){this.ki=e}onMessage(e){this.xi=e}close(){this.Si()}send(e){this.Vi(e)}$i(){this.Ci()}Fi(e){this.ki(e)}Oi(e){this.xi(e)}}/**
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
 */class X0 extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http";this.Mi=n+"://"+e.host,this.Li="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Bi(e,n,r,s,i){const o=this.Ui(e,n);x("RestConnection","Sending: ",o,r);const a={};return this.qi(a,s,i),this.Ki(e,o,a,r).then(c=>(x("RestConnection","Received: ",c),c),c=>{throw go("RestConnection",`${e} failed with error: `,c,"url: ",o,"request:",r),c})}ji(e,n,r,s,i){return this.Bi(e,n,r,s,i)}qi(e,n,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+gi,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Ui(e,n){const r=Y0[e];return`${this.Mi}/v1/${n}:${r}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}Ki(e,n,r,s){return new Promise((i,o)=>{const a=new yS;a.listenOnce(pS.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case $l.NO_ERROR:const l=a.getResponseJson();x("Connection","XHR received:",JSON.stringify(l)),i(l);break;case $l.TIMEOUT:x("Connection",'RPC "'+e+'" timed out'),o(new k(I.DEADLINE_EXCEEDED,"Request time out"));break;case $l.HTTP_ERROR:const u=a.getStatus();if(x("Connection",'RPC "'+e+'" failed with status:',u,"response text:",a.getResponseText()),u>0){const h=a.getResponseJson().error;if(h&&h.status&&h.message){const d=function(f){const y=f.toLowerCase().replace(/_/g,"-");return Object.values(I).indexOf(y)>=0?y:I.UNKNOWN}(h.status);o(new k(d,h.message))}else o(new k(I.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new k(I.UNAVAILABLE,"Connection failed."));break;default:K()}}finally{x("Connection",'RPC "'+e+'" completed.')}});const c=JSON.stringify(s);a.send(n,"POST",c,r,15)})}Qi(e,n,r){const s=[this.Mi,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=dS(),o=fS(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(a.xmlHttpFactory=new gS({})),this.qi(a.initMessageHeaders,n,r),wg()||xc()||sT()||uh()||iT()||lh()||(a.httpHeadersOverwriteParam="$httpHeaders");const c=s.join("");x("Connection","Creating WebChannel: "+c,a);const l=i.createWebChannel(c,a);let u=!1,h=!1;const d=new J0({Vi:y=>{h?x("Connection","Not sending because WebChannel is closed:",y):(u||(x("Connection","Opening WebChannel transport."),l.open(),u=!0),x("Connection","WebChannel sending:",y),l.send(y))},Si:()=>l.close()}),f=(y,S,T)=>{y.listen(S,A=>{try{T(A)}catch(w){setTimeout(()=>{throw w},0)}})};return f(l,ya.EventType.OPEN,()=>{h||x("Connection","WebChannel transport opened.")}),f(l,ya.EventType.CLOSE,()=>{h||(h=!0,x("Connection","WebChannel transport closed"),d.Fi())}),f(l,ya.EventType.ERROR,y=>{h||(h=!0,go("Connection","WebChannel transport errored:",y),d.Fi(new k(I.UNAVAILABLE,"The operation could not be completed")))}),f(l,ya.EventType.MESSAGE,y=>{var S;if(!h){const T=y.data[0];J(!!T);const A=T,w=A.error||((S=A[0])===null||S===void 0?void 0:S.error);if(w){x("Connection","WebChannel received error:",w);const v=w.status;let _=function(X){const q=Ve[X];if(q!==void 0)return Qy(q)}(v),P=w.message;_===void 0&&(_=I.INTERNAL,P="Unknown error status: "+v+" with message "+w.message),h=!0,d.Fi(new k(_,P)),l.close()}else x("Connection","WebChannel received:",T),d.Oi(T)}}),f(o,mS.STAT_EVENT,y=>{y.stat===Xf.PROXY?x("Connection","Detected buffering proxy"):y.stat===Xf.NOPROXY&&x("Connection","Detected no buffering proxy")}),setTimeout(()=>{d.$i()},0),d}}/**
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
 *//**
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
 */function kv(){return typeof window<"u"?window:null}function Oa(){return typeof document<"u"?document:null}/**
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
 */function Zo(t){return new i0(t,!0)}class sd{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Oe=e,this.timerId=n,this.Wi=r,this.Gi=s,this.zi=i,this.Hi=0,this.Ji=null,this.Yi=Date.now(),this.reset()}reset(){this.Hi=0}Xi(){this.Hi=this.zi}Zi(e){this.cancel();const n=Math.floor(this.Hi+this.tr()),r=Math.max(0,Date.now()-this.Yi),s=Math.max(0,n-r);s>0&&x("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Hi} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Ji=this.Oe.enqueueAfterDelay(this.timerId,s,()=>(this.Yi=Date.now(),e())),this.Hi*=this.Gi,this.Hi<this.Wi&&(this.Hi=this.Wi),this.Hi>this.zi&&(this.Hi=this.zi)}er(){this.Ji!==null&&(this.Ji.skipDelay(),this.Ji=null)}cancel(){this.Ji!==null&&(this.Ji.cancel(),this.Ji=null)}tr(){return(Math.random()-.5)*this.Hi}}/**
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
 */class Cv{constructor(e,n,r,s,i,o,a,c){this.Oe=e,this.nr=r,this.sr=s,this.ir=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.rr=0,this.ar=null,this.cr=null,this.stream=null,this.ur=new sd(e,n)}hr(){return this.state===1||this.state===5||this.lr()}lr(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.dr()}async stop(){this.hr()&&await this.close(0)}wr(){this.state=0,this.ur.reset()}_r(){this.lr()&&this.ar===null&&(this.ar=this.Oe.enqueueAfterDelay(this.nr,6e4,()=>this.mr()))}gr(e){this.yr(),this.stream.send(e)}async mr(){if(this.lr())return this.close(0)}yr(){this.ar&&(this.ar.cancel(),this.ar=null)}pr(){this.cr&&(this.cr.cancel(),this.cr=null)}async close(e,n){this.yr(),this.pr(),this.ur.cancel(),this.rr++,e!==4?this.ur.reset():n&&n.code===I.RESOURCE_EXHAUSTED?(qe(n.toString()),qe("Using maximum backoff delay to prevent overloading the backend."),this.ur.Xi()):n&&n.code===I.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Tr(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ni(n)}Tr(){}auth(){this.state=1;const e=this.Er(this.rr),n=this.rr;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.rr===n&&this.Ir(r,s)},r=>{e(()=>{const s=new k(I.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Ar(s)})})}Ir(e,n){const r=this.Er(this.rr);this.stream=this.Rr(e,n),this.stream.Di(()=>{r(()=>(this.state=2,this.cr=this.Oe.enqueueAfterDelay(this.sr,1e4,()=>(this.lr()&&(this.state=3),Promise.resolve())),this.listener.Di()))}),this.stream.Ni(s=>{r(()=>this.Ar(s))}),this.stream.onMessage(s=>{r(()=>this.onMessage(s))})}dr(){this.state=5,this.ur.Zi(async()=>{this.state=0,this.start()})}Ar(e){return x("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Er(e){return n=>{this.Oe.enqueueAndForget(()=>this.rr===e?n():(x("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Z0 extends Cv{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.k=i}Rr(e,n){return this.ir.Qi("Listen",e,n)}onMessage(e){this.ur.reset();const n=c0(this.k,e),r=function(s){if(!("targetChange"in s))return se.min();const i=s.targetChange;return i.targetIds&&i.targetIds.length?se.min():i.readTime?Je(i.readTime):se.min()}(e);return this.listener.Pr(n,r)}br(e){const n={};n.database=To(this.k),n.addTarget=function(s,i){let o;const a=i.target;return o=cc(a)?{documents:sv(s,a)}:{query:iv(s,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0?o.resumeToken=Zy(s,i.resumeToken):i.snapshotVersion.compareTo(se.min())>0&&(o.readTime=_o(s,i.snapshotVersion.toTimestamp())),o}(this.k,e);const r=u0(this.k,e);r&&(n.labels=r),this.gr(n)}vr(e){const n={};n.database=To(this.k),n.removeTarget=e,this.gr(n)}}class eA extends Cv{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.k=i,this.Vr=!1}get Sr(){return this.Vr}start(){this.Vr=!1,this.lastStreamToken=void 0,super.start()}Tr(){this.Vr&&this.Dr([])}Rr(e,n){return this.ir.Qi("Write",e,n)}onMessage(e){if(J(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Vr){this.ur.reset();const n=l0(e.writeResults,e.commitTime),r=Je(e.commitTime);return this.listener.Cr(r,n)}return J(!e.writeResults||e.writeResults.length===0),this.Vr=!0,this.listener.Nr()}kr(){const e={};e.database=To(this.k),this.gr(e)}Dr(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>hc(this.k,r))};this.gr(n)}}/**
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
 */class tA extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.ir=r,this.k=s,this.$r=!1}Fr(){if(this.$r)throw new k(I.FAILED_PRECONDITION,"The client has already been terminated.")}Bi(e,n,r){return this.Fr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.ir.Bi(e,n,r,s,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===I.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new k(I.UNKNOWN,s.toString())})}ji(e,n,r){return this.Fr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.ir.ji(e,n,r,s,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===I.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new k(I.UNKNOWN,s.toString())})}terminate(){this.$r=!0}}class nA{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.Or=0,this.Mr=null,this.Lr=!0}Br(){this.Or===0&&(this.Ur("Unknown"),this.Mr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.Mr=null,this.qr("Backend didn't respond within 10 seconds."),this.Ur("Offline"),Promise.resolve())))}Kr(e){this.state==="Online"?this.Ur("Unknown"):(this.Or++,this.Or>=1&&(this.jr(),this.qr(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Ur("Offline")))}set(e){this.jr(),this.Or=0,e==="Online"&&(this.Lr=!1),this.Ur(e)}Ur(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}qr(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Lr?(qe(n),this.Lr=!1):x("OnlineStateTracker",n)}jr(){this.Mr!==null&&(this.Mr.cancel(),this.Mr=null)}}/**
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
 */class rA{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Qr=[],this.Wr=new Map,this.Gr=new Set,this.zr=[],this.Hr=i,this.Hr.Ei(o=>{r.enqueueAndForget(async()=>{Rr(this)&&(x("RemoteStore","Restarting streams for network reachability change."),await async function(a){const c=V(a);c.Gr.add(4),await wi(c),c.Jr.set("Unknown"),c.Gr.delete(4),await ea(c)}(this))})}),this.Jr=new nA(r,s)}}async function ea(t){if(Rr(t))for(const e of t.zr)await e(!0)}async function wi(t){for(const e of t.zr)await e(!1)}function tl(t,e){const n=V(t);n.Wr.has(e.targetId)||(n.Wr.set(e.targetId,e),ad(n)?od(n):_i(n).lr()&&id(n,e))}function Eo(t,e){const n=V(t),r=_i(n);n.Wr.delete(e),r.lr()&&Nv(n,e),n.Wr.size===0&&(r.lr()?r._r():Rr(n)&&n.Jr.set("Unknown"))}function id(t,e){t.Yr.X(e.targetId),_i(t).br(e)}function Nv(t,e){t.Yr.X(e),_i(t).vr(e)}function od(t){t.Yr=new n0({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>t.Wr.get(e)||null}),_i(t).start(),t.Jr.Br()}function ad(t){return Rr(t)&&!_i(t).hr()&&t.Wr.size>0}function Rr(t){return V(t).Gr.size===0}function Rv(t){t.Yr=void 0}async function sA(t){t.Wr.forEach((e,n)=>{id(t,e)})}async function iA(t,e){Rv(t),ad(t)?(t.Jr.Kr(e),od(t)):t.Jr.set("Unknown")}async function oA(t,e,n){if(t.Jr.set("Online"),e instanceof Xy&&e.state===2&&e.cause)try{await async function(r,s){const i=s.cause;for(const o of s.targetIds)r.Wr.has(o)&&(await r.remoteSyncer.rejectListen(o,i),r.Wr.delete(o),r.Yr.removeTarget(o))}(t,e)}catch(r){x("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await gc(t,r)}else if(e instanceof Da?t.Yr.ot(e):e instanceof Jy?t.Yr.dt(e):t.Yr.ut(e),!n.isEqual(se.min()))try{const r=await bv(t.localStore);n.compareTo(r)>=0&&await function(s,i){const o=s.Yr.gt(i);return o.targetChanges.forEach((a,c)=>{if(a.resumeToken.approximateByteSize()>0){const l=s.Wr.get(c);l&&s.Wr.set(c,l.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach(a=>{const c=s.Wr.get(a);if(!c)return;s.Wr.set(a,c.withResumeToken(Ze.EMPTY_BYTE_STRING,c.snapshotVersion)),Nv(s,a);const l=new gr(c.target,a,1,c.sequenceNumber);id(s,l)}),s.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(r){x("RemoteStore","Failed to raise snapshot:",r),await gc(t,r)}}async function gc(t,e,n){if(!gs(e))throw e;t.Gr.add(1),await wi(t),t.Jr.set("Offline"),n||(n=()=>bv(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{x("RemoteStore","Retrying IndexedDB access"),await n(),t.Gr.delete(1),await ea(t)})}function Dv(t,e){return e().catch(n=>gc(t,n,e))}async function Ii(t){const e=V(t),n=Tr(e);let r=e.Qr.length>0?e.Qr[e.Qr.length-1].batchId:-1;for(;aA(e);)try{const s=await U0(e.localStore,r);if(s===null){e.Qr.length===0&&n._r();break}r=s.batchId,cA(e,s)}catch(s){await gc(e,s)}Ov(e)&&xv(e)}function aA(t){return Rr(t)&&t.Qr.length<10}function cA(t,e){t.Qr.push(e);const n=Tr(t);n.lr()&&n.Sr&&n.Dr(e.mutations)}function Ov(t){return Rr(t)&&!Tr(t).hr()&&t.Qr.length>0}function xv(t){Tr(t).start()}async function lA(t){Tr(t).kr()}async function uA(t){const e=Tr(t);for(const n of t.Qr)e.Dr(n.mutations)}async function hA(t,e,n){const r=t.Qr.shift(),s=zh.from(r,e,n);await Dv(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Ii(t)}async function dA(t,e){e&&Tr(t).Sr&&await async function(n,r){if(s=r.code,Gy(s)&&s!==I.ABORTED){const i=n.Qr.shift();Tr(n).wr(),await Dv(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,r)),await Ii(n)}var s}(t,e),Ov(t)&&xv(t)}async function Ru(t,e){const n=V(t);e?(n.Gr.delete(2),await ea(n)):e||(n.Gr.add(2),await wi(n),n.Jr.set("Unknown"))}function _i(t){return t.Xr||(t.Xr=function(e,n,r){const s=V(e);return s.Fr(),new Z0(n,s.ir,s.authCredentials,s.appCheckCredentials,s.k,r)}(t.datastore,t.asyncQueue,{Di:sA.bind(null,t),Ni:iA.bind(null,t),Pr:oA.bind(null,t)}),t.zr.push(async e=>{e?(t.Xr.wr(),ad(t)?od(t):t.Jr.set("Unknown")):(await t.Xr.stop(),Rv(t))})),t.Xr}function Tr(t){return t.Zr||(t.Zr=function(e,n,r){const s=V(e);return s.Fr(),new eA(n,s.ir,s.authCredentials,s.appCheckCredentials,s.k,r)}(t.datastore,t.asyncQueue,{Di:lA.bind(null,t),Ni:dA.bind(null,t),Nr:uA.bind(null,t),Cr:hA.bind(null,t)}),t.zr.push(async e=>{e?(t.Zr.wr(),await Ii(t)):(await t.Zr.stop(),t.Qr.length>0&&(x("RemoteStore",`Stopping write stream with ${t.Qr.length} pending writes`),t.Qr=[]))})),t.Zr}/**
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
 */class cd{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Qe,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,a=new cd(e,n,o,s,i);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(I.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function bi(t,e){if(qe("AsyncQueue",`${e}: ${t}`),gs(t))return new k(I.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class Vs{constructor(e){this.comparator=e?(n,r)=>e(n,r)||W.comparator(n.key,r.key):(n,r)=>W.comparator(n.key,r.key),this.keyedMap=Au(),this.sortedSet=new He(this.comparator)}static emptySet(e){return new Vs(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Vs)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Vs;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
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
 */class Mp{constructor(){this.eo=new He(W.comparator)}track(e){const n=e.doc.key,r=this.eo.get(n);r?e.type!==0&&r.type===3?this.eo=this.eo.insert(n,e):e.type===3&&r.type!==1?this.eo=this.eo.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.eo=this.eo.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.eo=this.eo.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.eo=this.eo.remove(n):e.type===1&&r.type===2?this.eo=this.eo.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.eo=this.eo.insert(n,{type:2,doc:e.doc}):K():this.eo=this.eo.insert(n,e)}no(){const e=[];return this.eo.inorderTraversal((n,r)=>{e.push(r)}),e}}class ii{constructor(e,n,r,s,i,o,a,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c}static fromInitialDocuments(e,n,r,s){const i=[];return n.forEach(o=>{i.push({type:0,doc:o})}),new ii(e,n,Vs.emptySet(n),i,r,s,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ho(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class fA{constructor(){this.so=void 0,this.listeners=[]}}class pA{constructor(){this.queries=new vi(e=>Uy(e),Ho),this.onlineState="Unknown",this.io=new Set}}async function ld(t,e){const n=V(t),r=e.query;let s=!1,i=n.queries.get(r);if(i||(s=!0,i=new fA),s)try{i.so=await n.onListen(r)}catch(o){const a=bi(o,`Initialization of query '${Eu(e.query)}' failed`);return void e.onError(a)}n.queries.set(r,i),i.listeners.push(e),e.ro(n.onlineState),i.so&&e.oo(i.so)&&hd(n)}async function ud(t,e){const n=V(t),r=e.query;let s=!1;const i=n.queries.get(r);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),s=i.listeners.length===0)}if(s)return n.queries.delete(r),n.onUnlisten(r)}function mA(t,e){const n=V(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const a of o.listeners)a.oo(s)&&(r=!0);o.so=s}}r&&hd(n)}function gA(t,e,n){const r=V(t),s=r.queries.get(e);if(s)for(const i of s.listeners)i.onError(n);r.queries.delete(e)}function hd(t){t.io.forEach(e=>{e.next()})}class dd{constructor(e,n,r){this.query=e,this.ao=n,this.co=!1,this.uo=null,this.onlineState="Unknown",this.options=r||{}}oo(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ii(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0)}let n=!1;return this.co?this.ho(e)&&(this.ao.next(e),n=!0):this.lo(e,this.onlineState)&&(this.fo(e),n=!0),this.uo=e,n}onError(e){this.ao.error(e)}ro(e){this.onlineState=e;let n=!1;return this.uo&&!this.co&&this.lo(this.uo,e)&&(this.fo(this.uo),n=!0),n}lo(e,n){if(!e.fromCache)return!0;const r=n!=="Offline";return(!this.options.wo||!r)&&(!e.docs.isEmpty()||n==="Offline")}ho(e){if(e.docChanges.length>0)return!0;const n=this.uo&&this.uo.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}fo(e){e=ii.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache),this.co=!0,this.ao.next(e)}}/**
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
 */class yA{constructor(e,n){this.payload=e,this.byteLength=n}_o(){return"metadata"in this.payload}}/**
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
 */class Lp{constructor(e){this.k=e}Hn(e){return kn(this.k,e)}Jn(e){return e.metadata.exists?rv(this.k,e.document,!1):De.newNoDocument(this.Hn(e.metadata.name),this.Yn(e.metadata.readTime))}Yn(e){return Je(e)}}class vA{constructor(e,n,r){this.mo=e,this.localStore=n,this.k=r,this.queries=[],this.documents=[],this.progress=Pv(e)}yo(e){this.progress.bytesLoaded+=e.byteLength;let n=this.progress.documentsLoaded;return e.payload.namedQuery?this.queries.push(e.payload.namedQuery):e.payload.documentMetadata?(this.documents.push({metadata:e.payload.documentMetadata}),e.payload.documentMetadata.exists||++n):e.payload.document&&(this.documents[this.documents.length-1].document=e.payload.document,++n),n!==this.progress.documentsLoaded?(this.progress.documentsLoaded=n,Object.assign({},this.progress)):null}po(e){const n=new Map,r=new Lp(this.k);for(const s of e)if(s.metadata.queries){const i=r.Hn(s.metadata.name);for(const o of s.metadata.queries){const a=(n.get(o)||ve()).add(i);n.set(o,a)}}return n}async complete(){const e=await $0(this.localStore,new Lp(this.k),this.documents,this.mo.id),n=this.po(this.documents);for(const r of this.queries)await q0(this.localStore,r,n.get(r.name));return this.progress.taskState="Success",new P0(Object.assign({},this.progress),e)}}function Pv(t){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}/**
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
 */class Mv{constructor(e){this.key=e}}class Lv{constructor(e){this.key=e}}class Fv{constructor(e,n){this.query=e,this.To=n,this.Eo=null,this.current=!1,this.Io=ve(),this.mutatedKeys=ve(),this.Ao=Vy(e),this.Ro=new Vs(this.Ao)}get Po(){return this.To}bo(e,n){const r=n?n.vo:new Mp,s=n?n.Ro:this.Ro;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,a=!1;const c=Na(this.query)&&s.size===this.query.limit?s.last():null,l=uc(this.query)&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((u,h)=>{const d=s.get(u),f=zo(this.query,h)?h:null,y=!!d&&this.mutatedKeys.has(d.key),S=!!f&&(f.hasLocalMutations||this.mutatedKeys.has(f.key)&&f.hasCommittedMutations);let T=!1;d&&f?d.data.isEqual(f.data)?y!==S&&(r.track({type:3,doc:f}),T=!0):this.Vo(d,f)||(r.track({type:2,doc:f}),T=!0,(c&&this.Ao(f,c)>0||l&&this.Ao(f,l)<0)&&(a=!0)):!d&&f?(r.track({type:0,doc:f}),T=!0):d&&!f&&(r.track({type:1,doc:d}),T=!0,(c||l)&&(a=!0)),T&&(f?(o=o.add(f),i=S?i.add(u):i.delete(u)):(o=o.delete(u),i=i.delete(u)))}),Na(this.query)||uc(this.query))for(;o.size>this.query.limit;){const u=Na(this.query)?o.last():o.first();o=o.delete(u.key),i=i.delete(u.key),r.track({type:1,doc:u})}return{Ro:o,vo:r,Bn:a,mutatedKeys:i}}Vo(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r){const s=this.Ro;this.Ro=e.Ro,this.mutatedKeys=e.mutatedKeys;const i=e.vo.no();i.sort((l,u)=>function(h,d){const f=y=>{switch(y){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return K()}};return f(h)-f(d)}(l.type,u.type)||this.Ao(l.doc,u.doc)),this.So(r);const o=n?this.Do():[],a=this.Io.size===0&&this.current?1:0,c=a!==this.Eo;return this.Eo=a,i.length!==0||c?{snapshot:new ii(this.query,e.Ro,s,i,e.mutatedKeys,a===0,c,!1),Co:o}:{Co:o}}ro(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ro:this.Ro,vo:new Mp,mutatedKeys:this.mutatedKeys,Bn:!1},!1)):{Co:[]}}No(e){return!this.To.has(e)&&!!this.Ro.has(e)&&!this.Ro.get(e).hasLocalMutations}So(e){e&&(e.addedDocuments.forEach(n=>this.To=this.To.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.To=this.To.delete(n)),this.current=e.current)}Do(){if(!this.current)return[];const e=this.Io;this.Io=ve(),this.Ro.forEach(r=>{this.No(r.key)&&(this.Io=this.Io.add(r.key))});const n=[];return e.forEach(r=>{this.Io.has(r)||n.push(new Lv(r))}),this.Io.forEach(r=>{e.has(r)||n.push(new Mv(r))}),n}ko(e){this.To=e.zn,this.Io=ve();const n=this.bo(e.documents);return this.applyChanges(n,!0)}xo(){return ii.fromInitialDocuments(this.query,this.Ro,this.mutatedKeys,this.Eo===0)}}class wA{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class IA{constructor(e){this.key=e,this.$o=!1}}class _A{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Fo={},this.Oo=new vi(a=>Uy(a),Ho),this.Mo=new Map,this.Lo=new Set,this.Bo=new He(W.comparator),this.Uo=new Map,this.qo=new td,this.Ko={},this.jo=new Map,this.Qo=is.re(),this.onlineState="Unknown",this.Wo=void 0}get isPrimaryClient(){return this.Wo===!0}}async function bA(t,e){const n=yd(t);let r,s;const i=n.Oo.get(e);if(i)r=i.targetId,n.sharedClientState.addLocalQueryTarget(r),s=i.view.xo();else{const o=await ri(n.localStore,rn(e)),a=n.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,s=await fd(n,e,r,a==="current"),n.isPrimaryClient&&tl(n.remoteStore,o)}return s}async function fd(t,e,n,r){t.Go=(u,h,d)=>async function(f,y,S,T){let A=y.view.bo(S);A.Bn&&(A=await fc(f.localStore,y.query,!1).then(({documents:_})=>y.view.bo(_,A)));const w=T&&T.targetChanges.get(y.targetId),v=y.view.applyChanges(A,f.isPrimaryClient,w);return Du(f,y.targetId,v.Co),v.snapshot}(t,u,h,d);const s=await fc(t.localStore,e,!0),i=new Fv(e,s.zn),o=i.bo(s.documents),a=Xo.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline"),c=i.applyChanges(o,t.isPrimaryClient,a);Du(t,n,c.Co);const l=new wA(e,n,i);return t.Oo.set(e,l),t.Mo.has(n)?t.Mo.get(n).push(e):t.Mo.set(n,[e]),c.snapshot}async function TA(t,e){const n=V(t),r=n.Oo.get(e),s=n.Mo.get(r.targetId);if(s.length>1)return n.Mo.set(r.targetId,s.filter(i=>!Ho(i,e))),void n.Oo.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await si(n.localStore,r.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(r.targetId),Eo(n.remoteStore,r.targetId),oi(n,r.targetId)}).catch(ys)):(oi(n,r.targetId),await si(n.localStore,r.targetId,!0))}async function EA(t,e,n){const r=vd(t);try{const s=await function(i,o){const a=V(i),c=Ye.now(),l=o.reduce((h,d)=>h.add(d.key),ve());let u;return a.persistence.runTransaction("Locally write mutations","readwrite",h=>a.Wn.vn(h,l).next(d=>{u=d;const f=[];for(const y of o){const S=QS(y,u.get(y.key));S!=null&&f.push(new Nr(y.key,S,Py(S.value.mapValue),Be.exists(!0)))}return a.An.addMutationBatch(h,c,f,o)})).then(h=>(h.applyToLocalDocumentSet(u),{batchId:h.batchId,changes:u}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(i,o,a){let c=i.Ko[i.currentUser.toKey()];c||(c=new He(ce)),c=c.insert(o,a),i.Ko[i.currentUser.toKey()]=c}(r,s.batchId,n),await er(r,s.changes),await Ii(r.remoteStore)}catch(s){const i=bi(s,"Failed to persist write");n.reject(i)}}async function Uv(t,e){const n=V(t);try{const r=await F0(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Uo.get(i);o&&(J(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.$o=!0:s.modifiedDocuments.size>0?J(o.$o):s.removedDocuments.size>0&&(J(o.$o),o.$o=!1))}),await er(n,r,e)}catch(r){await ys(r)}}function Fp(t,e,n){const r=V(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Oo.forEach((i,o)=>{const a=o.view.ro(e);a.snapshot&&s.push(a.snapshot)}),function(i,o){const a=V(i);a.onlineState=o;let c=!1;a.queries.forEach((l,u)=>{for(const h of u.listeners)h.ro(o)&&(c=!0)}),c&&hd(a)}(r.eventManager,e),s.length&&r.Fo.Pr(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function SA(t,e,n){const r=V(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Uo.get(e),i=s&&s.key;if(i){let o=new He(W.comparator);o=o.insert(i,De.newNoDocument(i,se.min()));const a=ve().add(i),c=new Jo(se.min(),new Map,new Me(ce),o,a);await Uv(r,c),r.Bo=r.Bo.remove(i),r.Uo.delete(e),gd(r)}else await si(r.localStore,e,!1).then(()=>oi(r,e,n)).catch(ys)}async function AA(t,e){const n=V(t),r=e.batch.batchId;try{const s=await L0(n.localStore,e);md(n,r,null),pd(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await er(n,s)}catch(s){await ys(s)}}async function kA(t,e,n){const r=V(t);try{const s=await function(i,o){const a=V(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let l;return a.An.lookupMutationBatch(c,o).next(u=>(J(u!==null),l=u.keys(),a.An.removeMutationBatch(c,u))).next(()=>a.An.performConsistencyCheck(c)).next(()=>a.Wn.vn(c,l))})}(r.localStore,e);md(r,e,n),pd(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await er(r,s)}catch(s){await ys(s)}}async function CA(t,e){const n=V(t);Rr(n.remoteStore)||x("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await function(i){const o=V(i);return o.persistence.runTransaction("Get highest unacknowledged batch id","readonly",a=>o.An.getHighestUnacknowledgedBatchId(a))}(n.localStore);if(r===-1)return void e.resolve();const s=n.jo.get(r)||[];s.push(e),n.jo.set(r,s)}catch(r){const s=bi(r,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function pd(t,e){(t.jo.get(e)||[]).forEach(n=>{n.resolve()}),t.jo.delete(e)}function md(t,e,n){const r=V(t);let s=r.Ko[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ko[r.currentUser.toKey()]=s}}function oi(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Mo.get(e))t.Oo.delete(r),n&&t.Fo.zo(r,n);t.Mo.delete(e),t.isPrimaryClient&&t.qo.us(e).forEach(r=>{t.qo.containsKey(r)||Vv(t,r)})}function Vv(t,e){t.Lo.delete(e.path.canonicalString());const n=t.Bo.get(e);n!==null&&(Eo(t.remoteStore,n),t.Bo=t.Bo.remove(e),t.Uo.delete(n),gd(t))}function Du(t,e,n){for(const r of n)r instanceof Mv?(t.qo.addReference(r.key,e),NA(t,r)):r instanceof Lv?(x("SyncEngine","Document no longer in limbo: "+r.key),t.qo.removeReference(r.key,e),t.qo.containsKey(r.key)||Vv(t,r.key)):K()}function NA(t,e){const n=e.key,r=n.path.canonicalString();t.Bo.get(n)||t.Lo.has(r)||(x("SyncEngine","New document in limbo: "+n),t.Lo.add(r),gd(t))}function gd(t){for(;t.Lo.size>0&&t.Bo.size<t.maxConcurrentLimboResolutions;){const e=t.Lo.values().next().value;t.Lo.delete(e);const n=new W(pe.fromString(e)),r=t.Qo.next();t.Uo.set(r,new IA(n)),t.Bo=t.Bo.insert(n,r),tl(t.remoteStore,new gr(rn(yi(n.path)),r,2,Ht.I))}}async function er(t,e,n){const r=V(t),s=[],i=[],o=[];r.Oo.isEmpty()||(r.Oo.forEach((a,c)=>{o.push(r.Go(c,e,n).then(l=>{if(l){r.isPrimaryClient&&r.sharedClientState.updateQueryState(c.targetId,l.fromCache?"not-current":"current"),s.push(l);const u=ed.$n(c.targetId,l);i.push(u)}}))}),await Promise.all(o),r.Fo.Pr(s),await async function(a,c){const l=V(a);try{await l.persistence.runTransaction("notifyLocalViewChanges","readwrite",u=>E.forEach(c,h=>E.forEach(h.kn,d=>l.persistence.referenceDelegate.addReference(u,h.targetId,d)).next(()=>E.forEach(h.xn,d=>l.persistence.referenceDelegate.removeReference(u,h.targetId,d)))))}catch(u){if(!gs(u))throw u;x("LocalStore","Failed to update sequence numbers: "+u)}for(const u of c){const h=u.targetId;if(!u.fromCache){const d=l.qn.get(h),f=d.snapshotVersion,y=d.withLastLimboFreeSnapshotVersion(f);l.qn=l.qn.insert(h,y)}}}(r.localStore,i))}async function RA(t,e){const n=V(t);if(!n.currentUser.isEqual(e)){x("SyncEngine","User change. New user:",e.toKey());const r=await _v(n.localStore,e);n.currentUser=e,function(s,i){s.jo.forEach(o=>{o.forEach(a=>{a.reject(new k(I.CANCELLED,i))})}),s.jo.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await er(n,r.Gn)}}function DA(t,e){const n=V(t),r=n.Uo.get(e);if(r&&r.$o)return ve().add(r.key);{let s=ve();const i=n.Mo.get(e);if(!i)return s;for(const o of i){const a=n.Oo.get(o);s=s.unionWith(a.view.Po)}return s}}async function OA(t,e){const n=V(t),r=await fc(n.localStore,e.query,!0),s=e.view.ko(r);return n.isPrimaryClient&&Du(n,e.targetId,s.Co),s}async function xA(t){const e=V(t);return Sv(e.localStore).then(n=>er(e,n))}async function PA(t,e,n,r){const s=V(t),i=await function(o,a){const c=V(o),l=V(c.An);return c.persistence.runTransaction("Lookup mutation documents","readonly",u=>l.Zt(u,a).next(h=>h?c.Wn.vn(u,h):E.resolve(null)))}(s.localStore,e);i!==null?(n==="pending"?await Ii(s.remoteStore):n==="acknowledged"||n==="rejected"?(md(s,e,r||null),pd(s,e),function(o,a){V(V(o).An).ee(a)}(s.localStore,e)):K(),await er(s,i)):x("SyncEngine","Cannot apply mutation batch with id: "+e)}async function MA(t,e){const n=V(t);if(yd(n),vd(n),e===!0&&n.Wo!==!0){const r=n.sharedClientState.getAllActiveQueryTargets(),s=await Up(n,r.toArray());n.Wo=!0,await Ru(n.remoteStore,!0);for(const i of s)tl(n.remoteStore,i)}else if(e===!1&&n.Wo!==!1){const r=[];let s=Promise.resolve();n.Mo.forEach((i,o)=>{n.sharedClientState.isLocalQueryTarget(o)?r.push(o):s=s.then(()=>(oi(n,o),si(n.localStore,o,!0))),Eo(n.remoteStore,o)}),await s,await Up(n,r),function(i){const o=V(i);o.Uo.forEach((a,c)=>{Eo(o.remoteStore,c)}),o.qo.hs(),o.Uo=new Map,o.Bo=new He(W.comparator)}(n),n.Wo=!1,await Ru(n.remoteStore,!1)}}async function Up(t,e,n){const r=V(t),s=[],i=[];for(const o of e){let a;const c=r.Mo.get(o);if(c&&c.length!==0){a=await ri(r.localStore,rn(c[0]));for(const l of c){const u=r.Oo.get(l),h=await OA(r,u);h.snapshot&&i.push(h.snapshot)}}else{const l=await Ev(r.localStore,o);a=await ri(r.localStore,l),await fd(r,$v(l),o,!1)}s.push(a)}return r.Fo.Pr(i),s}function $v(t){return Ly(t.path,t.collectionGroup,t.orderBy,t.filters,t.limit,"F",t.startAt,t.endAt)}function LA(t){const e=V(t);return V(V(e.localStore).persistence).Tn()}async function FA(t,e,n,r){const s=V(t);if(s.Wo)x("SyncEngine","Ignoring unexpected query state notification.");else if(s.Mo.has(e))switch(n){case"current":case"not-current":{const i=await Sv(s.localStore),o=Jo.createSynthesizedRemoteEventForCurrentChange(e,n==="current");await er(s,i,o);break}case"rejected":await si(s.localStore,e,!0),oi(s,e,r);break;default:K()}}async function UA(t,e,n){const r=yd(t);if(r.Wo){for(const s of e){if(r.Mo.has(s)){x("SyncEngine","Adding an already active target "+s);continue}const i=await Ev(r.localStore,s),o=await ri(r.localStore,i);await fd(r,$v(i),o.targetId,!1),tl(r.remoteStore,o)}for(const s of n)r.Mo.has(s)&&await si(r.localStore,s,!1).then(()=>{Eo(r.remoteStore,s),oi(r,s)}).catch(ys)}}function yd(t){const e=V(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Uv.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=DA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=SA.bind(null,e),e.Fo.Pr=mA.bind(null,e.eventManager),e.Fo.zo=gA.bind(null,e.eventManager),e}function vd(t){const e=V(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=AA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=kA.bind(null,e),e}function VA(t,e,n){const r=V(t);(async function(s,i,o){try{const a=await i.getMetadata();if(await function(h,d){const f=V(h),y=Je(d.createTime);return f.persistence.runTransaction("hasNewerBundle","readonly",S=>f.Ye.getBundleMetadata(S,d.id)).then(S=>!!S&&S.createTime.compareTo(y)>=0)}(s.localStore,a))return await i.close(),void o._completeWith(function(h){return{taskState:"Success",documentsLoaded:h.totalDocuments,bytesLoaded:h.totalBytes,totalDocuments:h.totalDocuments,totalBytes:h.totalBytes}}(a));o._updateProgress(Pv(a));const c=new vA(a,s.localStore,i.k);let l=await i.Ho();for(;l;){const h=await c.yo(l);h&&o._updateProgress(h),l=await i.Ho()}const u=await c.complete();await er(s,u.In,void 0),await function(h,d){const f=V(h);return f.persistence.runTransaction("Save bundle","readwrite",y=>f.Ye.saveBundleMetadata(y,d))}(s.localStore,a),o._completeWith(u.progress)}catch(a){go("SyncEngine",`Loading bundle failed with ${a}`),o._failWith(a)}})(r,e,n).then(()=>{r.sharedClientState.notifyBundleLoaded()})}class qv{constructor(){this.synchronizeTabs=!1}async initialize(e){this.k=Zo(e.databaseInfo.databaseId),this.sharedClientState=this.Jo(e),this.persistence=this.Yo(e),await this.persistence.start(),this.gcScheduler=this.Xo(e),this.localStore=this.Zo(e)}Xo(e){return null}Zo(e){return Iv(this.persistence,new wv,e.initialUser,this.k)}Yo(e){return new z0(nd.ks,this.k)}Jo(e){return new Av}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class Bv extends qv{constructor(e,n,r){super(),this.ta=e,this.cacheSizeBytes=n,this.forceOwnership=r,this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await V0(this.localStore),await this.ta.initialize(this,e),await vd(this.ta.syncEngine),await Ii(this.ta.remoteStore),await this.persistence.sn(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(this.localStore),Promise.resolve()))}Zo(e){return Iv(this.persistence,new wv,e.initialUser,this.k)}Xo(e){const n=this.persistence.referenceDelegate.garbageCollector;return new C0(n,e.asyncQueue)}Yo(e){const n=Zh(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Mt.withCacheSize(this.cacheSizeBytes):Mt.DEFAULT;return new Xh(this.synchronizeTabs,n,e.clientId,r,e.asyncQueue,kv(),Oa(),this.k,this.sharedClientState,!!this.forceOwnership)}Jo(e){return new Av}}class $A extends Bv{constructor(e,n){super(e,n,!1),this.ta=e,this.cacheSizeBytes=n,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const n=this.ta.syncEngine;this.sharedClientState instanceof jl&&(this.sharedClientState.syncEngine={mi:PA.bind(null,n),gi:FA.bind(null,n),yi:UA.bind(null,n),Tn:LA.bind(null,n),_i:xA.bind(null,n)},await this.sharedClientState.start()),await this.persistence.sn(async r=>{await MA(this.ta.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start(this.localStore):r||this.gcScheduler.stop())})}Jo(e){const n=kv();if(!jl.bt(n))throw new k(I.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Zh(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new jl(n,e.asyncQueue,r,e.clientId,e.initialUser)}}class wd{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Fp(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=RA.bind(null,this.syncEngine),await Ru(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new pA}createDatastore(e){const n=Zo(e.databaseInfo.databaseId),r=(s=e.databaseInfo,new X0(s));var s;return function(i,o,a,c){return new tA(i,o,a,c)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return n=this.localStore,r=this.datastore,s=e.asyncQueue,i=a=>Fp(this.syncEngine,a,0),o=Pp.bt()?new Pp:new Q0,new rA(n,r,s,i,o);var n,r,s,i,o}createSyncEngine(e,n){return function(r,s,i,o,a,c,l){const u=new _A(r,s,i,o,a,c);return l&&(u.Wo=!0),u}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}terminate(){return async function(e){const n=V(e);x("RemoteStore","RemoteStore shutting down."),n.Gr.add(5),await wi(n),n.Hr.shutdown(),n.Jr.set("Unknown")}(this.remoteStore)}}/**
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
 */function Vp(t,e=10240){let n=0;return{async read(){if(n<t.byteLength){const r={value:t.slice(n,n+e),done:!1};return n+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.reject("unimplemented")}}/**
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
 *//**
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
 */class nl{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.ea(this.observer.next,e)}error(e){this.observer.error?this.ea(this.observer.error,e):console.error("Uncaught Error in snapshot listener:",e)}na(){this.muted=!0}ea(e,n){this.muted||setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */class qA{constructor(e,n){this.sa=e,this.k=n,this.metadata=new Qe,this.buffer=new Uint8Array,this.ia=new TextDecoder("utf-8"),this.ra().then(r=>{r&&r._o()?this.metadata.resolve(r.payload.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.payload)}`))},r=>this.metadata.reject(r))}close(){return this.sa.cancel()}async getMetadata(){return this.metadata.promise}async Ho(){return await this.getMetadata(),this.ra()}async ra(){const e=await this.oa();if(e===null)return null;const n=this.ia.decode(e),r=Number(n);isNaN(r)&&this.aa(`length string (${n}) is not valid number`);const s=await this.ca(r);return new yA(JSON.parse(s),e.length+r)}ua(){return this.buffer.findIndex(e=>e===123)}async oa(){for(;this.ua()<0&&!await this.ha(););if(this.buffer.length===0)return null;const e=this.ua();e<0&&this.aa("Reached the end of bundle when a length string is expected.");const n=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),n}async ca(e){for(;this.buffer.length<e;)await this.ha()&&this.aa("Reached the end of bundle when more is expected.");const n=this.ia.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),n}aa(e){throw this.sa.cancel(),new Error(`Invalid bundle format: ${e}`)}async ha(){const e=await this.sa.read();if(!e.done){const n=new Uint8Array(this.buffer.length+e.value.length);n.set(this.buffer),n.set(e.value,this.buffer.length),this.buffer=n}return e.done}}/**
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
 */class BA{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new k(I.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");const n=await async function(r,s){const i=V(r),o=To(i.k)+"/documents",a={documents:s.map(h=>bo(i.k,h))},c=await i.ji("BatchGetDocuments",o,a),l=new Map;c.forEach(h=>{const d=a0(i.k,h);l.set(d.key.toString(),d)});const u=[];return s.forEach(h=>{const d=l.get(h.toString());J(!!d),u.push(d)}),u}(this.datastore,e);return n.forEach(r=>this.recordVersion(r)),n}set(e,n){this.write(n.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,n){try{this.write(n.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastWriteError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Yo(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;const e=this.readVersions;this.mutations.forEach(n=>{e.delete(n.key.toString())}),e.forEach((n,r)=>{const s=W.fromPath(r);this.mutations.push(new jh(s,this.precondition(s)))}),await async function(n,r){const s=V(n),i=To(s.k)+"/documents",o={writes:r.map(a=>hc(s.k,a))};await s.Bi("Commit",i,o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let n;if(e.isFoundDocument())n=e.version;else{if(!e.isNoDocument())throw K();n=se.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!n.isEqual(r))throw new k(I.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),n)}precondition(e){const n=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&n?Be.updateTime(n):Be.none()}preconditionForUpdate(e){const n=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&n){if(n.isEqual(se.min()))throw new k(I.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Be.updateTime(n)}return Be.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
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
 */class jA{constructor(e,n,r,s){this.asyncQueue=e,this.datastore=n,this.updateFunction=r,this.deferred=s,this.la=5,this.ur=new sd(this.asyncQueue,"transaction_retry")}run(){this.la-=1,this.fa()}fa(){this.ur.Zi(async()=>{const e=new BA(this.datastore),n=this.da(e);n&&n.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(s=>{this.wa(s)}))}).catch(r=>{this.wa(r)})})}da(e){try{const n=this.updateFunction(e);return!ms(n)&&n.catch&&n.then?n:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(n){return this.deferred.reject(n),null}}wa(e){this.la>0&&this._a(e)?(this.la-=1,this.asyncQueue.enqueueAndForget(()=>(this.fa(),Promise.resolve()))):this.deferred.reject(e)}_a(e){if(e.name==="FirebaseError"){const n=e.code;return n==="aborted"||n==="failed-precondition"||!Gy(n)}return!1}}/**
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
 */class WA{constructor(e,n,r,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=rt.UNAUTHENTICATED,this.clientId=Ny.A(),this.authCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async i=>{x("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(r,()=>Promise.resolve())}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new k(I.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Qe;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=bi(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function jv(t,e){t.asyncQueue.verifyOperationInProgress(),x("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await _v(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t.offlineComponents=e}async function Wv(t,e){t.asyncQueue.verifyOperationInProgress();const n=await Id(t);x("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener(s=>async function(i,o){const a=V(i);a.asyncQueue.verifyOperationInProgress(),x("RemoteStore","RemoteStore received new credentials");const c=Rr(a);a.Gr.add(3),await wi(a),c&&a.Jr.set("Unknown"),await a.remoteSyncer.handleCredentialChange(o),a.Gr.delete(3),await ea(a)}(e.remoteStore,s)),t.onlineComponents=e}async function Id(t){return t.offlineComponents||(x("FirestoreClient","Using default OfflineComponentProvider"),await jv(t,new qv)),t.offlineComponents}async function rl(t){return t.onlineComponents||(x("FirestoreClient","Using default OnlineComponentProvider"),await Wv(t,new wd)),t.onlineComponents}function Kv(t){return Id(t).then(e=>e.persistence)}function _d(t){return Id(t).then(e=>e.localStore)}function Hv(t){return rl(t).then(e=>e.remoteStore)}function bd(t){return rl(t).then(e=>e.syncEngine)}async function ai(t){const e=await rl(t),n=e.eventManager;return n.onListen=bA.bind(null,e.syncEngine),n.onUnlisten=TA.bind(null,e.syncEngine),n}function KA(t){return t.asyncQueue.enqueue(async()=>{const e=await Kv(t),n=await Hv(t);return e.setNetworkEnabled(!0),function(r){const s=V(r);return s.Gr.delete(0),ea(s)}(n)})}function HA(t){return t.asyncQueue.enqueue(async()=>{const e=await Kv(t),n=await Hv(t);return e.setNetworkEnabled(!1),async function(r){const s=V(r);s.Gr.add(0),await wi(s),s.Jr.set("Offline")}(n)})}function zA(t,e){const n=new Qe;return t.asyncQueue.enqueueAndForget(async()=>async function(r,s,i){try{const o=await function(a,c){const l=V(a);return l.persistence.runTransaction("read document","readonly",u=>l.Wn.Rn(u,c))}(r,s);o.isFoundDocument()?i.resolve(o):o.isNoDocument()?i.resolve(null):i.reject(new k(I.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(o){const a=bi(o,`Failed to get document '${s} from cache`);i.reject(a)}}(await _d(t),e,n)),n.promise}function zv(t,e,n={}){const r=new Qe;return t.asyncQueue.enqueueAndForget(async()=>function(s,i,o,a,c){const l=new nl({next:h=>{i.enqueueAndForget(()=>ud(s,u));const d=h.docs.has(o);!d&&h.fromCache?c.reject(new k(I.UNAVAILABLE,"Failed to get document because the client is offline.")):d&&h.fromCache&&a&&a.source==="server"?c.reject(new k(I.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(h)},error:h=>c.reject(h)}),u=new dd(yi(o.path),l,{includeMetadataChanges:!0,wo:!0});return ld(s,u)}(await ai(t),t.asyncQueue,e,n,r)),r.promise}function GA(t,e){const n=new Qe;return t.asyncQueue.enqueueAndForget(async()=>async function(r,s,i){try{const o=await fc(r,s,!0),a=new Fv(s,o.zn),c=a.bo(o.documents),l=a.applyChanges(c,!1);i.resolve(l.snapshot)}catch(o){const a=bi(o,`Failed to execute query '${s} against cache`);i.reject(a)}}(await _d(t),e,n)),n.promise}function Gv(t,e,n={}){const r=new Qe;return t.asyncQueue.enqueueAndForget(async()=>function(s,i,o,a,c){const l=new nl({next:h=>{i.enqueueAndForget(()=>ud(s,u)),h.fromCache&&a.source==="server"?c.reject(new k(I.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(h)},error:h=>c.reject(h)}),u=new dd(o,l,{includeMetadataChanges:!0,wo:!0});return ld(s,u)}(await ai(t),t.asyncQueue,e,n,r)),r.promise}function QA(t,e){const n=new nl(e);return t.asyncQueue.enqueueAndForget(async()=>function(r,s){V(r).io.add(s),s.next()}(await ai(t),n)),()=>{n.na(),t.asyncQueue.enqueueAndForget(async()=>function(r,s){V(r).io.delete(s)}(await ai(t),n))}}function YA(t,e){const n=new Qe;return t.asyncQueue.enqueueAndForget(async()=>{const r=await function(s){return rl(s).then(i=>i.datastore)}(t);new jA(t.asyncQueue,r,e,n).run()}),n.promise}function JA(t,e,n,r){const s=function(i,o){let a;return a=typeof i=="string"?new TextEncoder().encode(i):i,function(c,l){return new qA(c,l)}(function(c,l){if(c instanceof Uint8Array)return Vp(c,l);if(c instanceof ArrayBuffer)return Vp(new Uint8Array(c),l);if(c instanceof ReadableStream)return c.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(a),o)}(n,Zo(e));t.asyncQueue.enqueueAndForget(async()=>{VA(await bd(t),s,r)})}function XA(t,e){return t.asyncQueue.enqueue(async()=>function(n,r){const s=V(n);return s.persistence.runTransaction("Get named query","readonly",i=>s.Ye.getNamedQuery(i,r))}(await _d(t),e))}class ZA{constructor(e,n,r,s,i,o,a,c){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.useFetchStreams=c}}class ci{constructor(e,n){this.projectId=e,this.database=n||"(default)"}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ci&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const $p=new Map;/**
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
 */function Td(t,e,n){if(!n)throw new k(I.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Qv(t,e,n,r){if(e===!0&&r===!0)throw new k(I.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function qp(t){if(!W.isDocumentKey(t))throw new k(I.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Bp(t){if(W.isDocumentKey(t))throw new k(I.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function sl(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":K()}function de(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new k(I.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=sl(t);throw new k(I.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function Yv(t,e){if(e<=0)throw new k(I.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
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
 */class jp{constructor(e){var n;if(e.host===void 0){if(e.ssl!==void 0)throw new k(I.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new k(I.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,Qv("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
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
 */class ta{constructor(e,n,r){this._authCredentials=n,this._appCheckCredentials=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new jp({}),this._settingsFrozen=!1,e instanceof ci?this._databaseId=e:(this._app=e,this._databaseId=function(s){if(!Object.prototype.hasOwnProperty.apply(s.options,["projectId"]))throw new k(I.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ci(s.options.projectId)}(e))}get app(){if(!this._app)throw new k(I.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new k(I.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new jp(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new _S;switch(n.type){case"gapi":const r=n.client;return J(!(typeof r!="object"||r===null||!r.auth||!r.auth.getAuthHeaderValueForFirstParty)),new SS(r,n.sessionIndex||"0",n.iamToken||null);case"provider":return n.client;default:throw new k(I.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=$p.get(e);n&&(x("ComponentProvider","Removing Datastore"),$p.delete(e),n.terminate())}(this),Promise.resolve()}}function ek(t,e,n,r={}){var s;const i=(t=de(t,ta))._getSettings();if(i.host!=="firestore.googleapis.com"&&i.host!==e&&go("Host has been set in both settings() and useEmulator(), emulator host will be used"),t._setSettings(Object.assign(Object.assign({},i),{host:`${e}:${n}`,ssl:!1})),r.mockUserToken){let o,a;if(typeof r.mockUserToken=="string")o=r.mockUserToken,a=rt.MOCK_USER;else{o=nT(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const c=r.mockUserToken.sub||r.mockUserToken.user_id;if(!c)throw new k(I.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");a=new rt(c)}t._authCredentials=new bS(new Cy(o,a))}}/**
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
 */class ke{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Cn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ke(this.firestore,e,this._key)}}class It{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new It(this.firestore,e,this._query)}}class Cn extends It{constructor(e,n,r){super(e,n,yi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ke(this.firestore,null,new W(e))}withConverter(e){return new Cn(this.firestore,e,this._path)}}function Jv(t,e,...n){if(t=z(t),Td("collection","path",e),t instanceof ta){const r=pe.fromString(e,...n);return Bp(r),new Cn(t,null,r)}{if(!(t instanceof ke||t instanceof Cn))throw new k(I.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(pe.fromString(e,...n));return Bp(r),new Cn(t.firestore,null,r)}}function tk(t,e){if(t=de(t,ta),Td("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new k(I.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new It(t,null,function(n){return new Zn(pe.emptyPath(),n)}(e))}function yc(t,e,...n){if(t=z(t),arguments.length===1&&(e=Ny.A()),Td("doc","path",e),t instanceof ta){const r=pe.fromString(e,...n);return qp(r),new ke(t,null,new W(r))}{if(!(t instanceof ke||t instanceof Cn))throw new k(I.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(pe.fromString(e,...n));return qp(r),new ke(t.firestore,t instanceof Cn?t.converter:null,new W(r))}}function Xv(t,e){return t=z(t),e=z(e),(t instanceof ke||t instanceof Cn)&&(e instanceof ke||e instanceof Cn)&&t.firestore===e.firestore&&t.path===e.path&&t.converter===e.converter}function Zv(t,e){return t=z(t),e=z(e),t instanceof It&&e instanceof It&&t.firestore===e.firestore&&Ho(t._query,e._query)&&t.converter===e.converter}/**
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
 */class nk{constructor(){this.ma=Promise.resolve(),this.ga=[],this.ya=!1,this.pa=[],this.Ta=null,this.Ea=!1,this.Ia=!1,this.Aa=[],this.ur=new sd(this,"async_queue_retry"),this.Ra=()=>{const n=Oa();n&&x("AsyncQueue","Visibility state changed to "+n.visibilityState),this.ur.er()};const e=Oa();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Ra)}get isShuttingDown(){return this.ya}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pa(),this.ba(e)}enterRestrictedMode(e){if(!this.ya){this.ya=!0,this.Ia=e||!1;const n=Oa();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Ra)}}enqueue(e){if(this.Pa(),this.ya)return new Promise(()=>{});const n=new Qe;return this.ba(()=>this.ya&&this.Ia?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.ga.push(e),this.va()))}async va(){if(this.ga.length!==0){try{await this.ga[0](),this.ga.shift(),this.ur.reset()}catch(e){if(!gs(e))throw e;x("AsyncQueue","Operation failed with retryable error: "+e)}this.ga.length>0&&this.ur.Zi(()=>this.va())}}ba(e){const n=this.ma.then(()=>(this.Ea=!0,e().catch(r=>{this.Ta=r,this.Ea=!1;const s=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(r);throw qe("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.Ea=!1,r))));return this.ma=n,n}enqueueAfterDelay(e,n,r){this.Pa(),this.Aa.indexOf(e)>-1&&(n=0);const s=cd.createAndSchedule(this,e,n,r,i=>this.Va(i));return this.pa.push(s),s}Pa(){this.Ta&&K()}verifyOperationInProgress(){}async Sa(){let e;do e=this.ma,await e;while(e!==this.ma)}Da(e){for(const n of this.pa)if(n.timerId===e)return!0;return!1}Ca(e){return this.Sa().then(()=>{this.pa.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.pa)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Sa()})}Na(e){this.Aa.push(e)}Va(e){const n=this.pa.indexOf(e);this.pa.splice(n,1)}}function Ou(t){return function(e,n){if(typeof e!="object"||e===null)return!1;const r=e;for(const s of n)if(s in r&&typeof r[s]=="function")return!0;return!1}(t,["next","error","complete"])}class rk{constructor(){this._progressObserver={},this._taskCompletionResolver=new Qe,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,n,r){this._progressObserver={next:e,error:n,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,n){return this._taskCompletionResolver.promise.then(e,n)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
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
 */const sk=-1;class Le extends ta{constructor(e,n,r){super(e,n,r),this.type="firestore",this._queue=new nk,this._persistenceKey="name"in e?e.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||ew(this),this._firestoreClient.terminate()}}function tt(t){return t._firestoreClient||ew(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function ew(t){var e;const n=t._freezeSettings(),r=function(s,i,o,a){return new ZA(s,i,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,n);t._firestoreClient=new WA(t._authCredentials,t._appCheckCredentials,t._queue,r)}function ik(t,e){nw(t=de(t,Le));const n=tt(t),r=t._freezeSettings(),s=new wd;return tw(n,s,new Bv(s,r.cacheSizeBytes,e==null?void 0:e.forceOwnership))}function ok(t){nw(t=de(t,Le));const e=tt(t),n=t._freezeSettings(),r=new wd;return tw(e,r,new $A(r,n.cacheSizeBytes))}function tw(t,e,n){const r=new Qe;return t.asyncQueue.enqueue(async()=>{try{await jv(t,n),await Wv(t,e),r.resolve()}catch(s){if(!function(i){return i.name==="FirebaseError"?i.code===I.FAILED_PRECONDITION||i.code===I.UNIMPLEMENTED:typeof DOMException<"u"&&i instanceof DOMException?i.code===22||i.code===20||i.code===11:!0}(s))throw s;console.warn("Error enabling offline persistence. Falling back to persistence disabled: "+s),r.reject(s)}}).then(()=>r.promise)}function ak(t){if(t._initialized&&!t._terminated)throw new k(I.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Qe;return t._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(n){if(!on.bt())return Promise.resolve();const r=n+"main";await on.delete(r)}(Zh(t._databaseId,t._persistenceKey)),e.resolve()}catch(n){e.reject(n)}}),e.promise}function ck(t){return function(e){const n=new Qe;return e.asyncQueue.enqueueAndForget(async()=>CA(await bd(e),n)),n.promise}(tt(t=de(t,Le)))}function lk(t){return KA(tt(t=de(t,Le)))}function uk(t){return HA(tt(t=de(t,Le)))}function hk(t,e){const n=tt(t=de(t,Le)),r=new rk;return JA(n,t._databaseId,e,r),r}function dk(t,e){return XA(tt(t=de(t,Le)),e).then(n=>n?new It(t,null,n.query):null)}function nw(t){if(t._initialized||t._terminated)throw new k(I.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}/**
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
 *//**
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
 */class Er{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new k(I.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ot(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class xn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new xn(Ze.fromBase64String(e))}catch(n){throw new k(I.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new xn(Ze.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class vs{constructor(e){this._methodName=e}}/**
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
 */class il{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new k(I.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new k(I.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ce(this._lat,e._lat)||ce(this._long,e._long)}}/**
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
 */const fk=/^__.*__$/;class pk{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Nr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Qo(e,this.data,n,this.fieldTransforms)}}class rw{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Nr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function sw(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw K()}}class ol{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.k=r,this.ignoreUndefinedProperties=s,i===void 0&&this.ka(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get xa(){return this.settings.xa}$a(e){return new ol(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.k,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Fa(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.$a({path:r,Oa:!1});return s.Ma(e),s}La(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.$a({path:r,Oa:!1});return s.ka(),s}Ba(e){return this.$a({path:void 0,Oa:!0})}Ua(e){return vc(e,this.settings.methodName,this.settings.qa||!1,this.path,this.settings.Ka)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}ka(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ma(this.path.get(e))}Ma(e){if(e.length===0)throw this.Ua("Document fields must not be empty");if(sw(this.xa)&&fk.test(e))throw this.Ua('Document fields cannot begin and end with "__"')}}class mk{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.k=r||Zo(e)}ja(e,n,r,s=!1){return new ol({xa:e,methodName:n,Ka:r,path:ot.emptyPath(),Oa:!1,qa:s},this.databaseId,this.k,this.ignoreUndefinedProperties)}}function ws(t){const e=t._freezeSettings(),n=Zo(t._databaseId);return new mk(t._databaseId,!!e.ignoreUndefinedProperties,n)}function al(t,e,n,r,s,i={}){const o=t.ja(i.merge||i.mergeFields?2:0,e,n,s);kd("Data must be an object, but it was:",o,r);const a=aw(r,o);let c,l;if(i.merge)c=new zs(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const u=[];for(const h of i.mergeFields){const d=xu(e,h,n);if(!o.contains(d))throw new k(I.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);lw(u,d)||u.push(d)}c=new zs(u),l=o.fieldTransforms.filter(h=>c.covers(h.field))}else c=null,l=o.fieldTransforms;return new pk(new yt(a),c,l)}class na extends vs{_toFieldTransform(e){if(e.xa!==2)throw e.xa===1?e.Ua(`${this._methodName}() can only appear at the top level of your update data`):e.Ua(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof na}}function iw(t,e,n){return new ol({xa:3,Ka:e.settings.Ka,methodName:t._methodName,Oa:n},e.databaseId,e.k,e.ignoreUndefinedProperties)}class Ed extends vs{_toFieldTransform(e){return new Go(e.path,new Js)}isEqual(e){return e instanceof Ed}}class gk extends vs{constructor(e,n){super(e),this.Qa=n}_toFieldTransform(e){const n=iw(this,e,!0),r=this.Qa.map(i=>Is(i,n)),s=new rs(r);return new Go(e.path,s)}isEqual(e){return this===e}}class yk extends vs{constructor(e,n){super(e),this.Qa=n}_toFieldTransform(e){const n=iw(this,e,!0),r=this.Qa.map(i=>Is(i,n)),s=new ss(r);return new Go(e.path,s)}isEqual(e){return this===e}}class vk extends vs{constructor(e,n){super(e),this.Wa=n}_toFieldTransform(e){const n=new Xs(e.k,By(e.k,this.Wa));return new Go(e.path,n)}isEqual(e){return this===e}}function Sd(t,e,n,r){const s=t.ja(1,e,n);kd("Data must be an object, but it was:",s,r);const i=[],o=yt.empty();ps(r,(c,l)=>{const u=Cd(e,c,n);l=z(l);const h=s.La(u);if(l instanceof na)i.push(u);else{const d=Is(l,h);d!=null&&(i.push(u),o.set(u,d))}});const a=new zs(i);return new rw(o,a,s.fieldTransforms)}function Ad(t,e,n,r,s,i){const o=t.ja(1,e,n),a=[xu(e,r,n)],c=[s];if(i.length%2!=0)throw new k(I.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(xu(e,i[d])),c.push(i[d+1]);const l=[],u=yt.empty();for(let d=a.length-1;d>=0;--d)if(!lw(l,a[d])){const f=a[d];let y=c[d];y=z(y);const S=o.La(f);if(y instanceof na)l.push(f);else{const T=Is(y,S);T!=null&&(l.push(f),u.set(f,T))}}const h=new zs(l);return new rw(u,h,o.fieldTransforms)}function ow(t,e,n,r=!1){return Is(n,t.ja(r?4:3,e))}function Is(t,e){if(cw(t=z(t)))return kd("Unsupported field value:",e,t),aw(t,e);if(t instanceof vs)return function(n,r){if(!sw(r.xa))throw r.Ua(`${n._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Ua(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(r);s&&r.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.Oa&&e.xa!==4)throw e.Ua("Nested arrays are not supported");return function(n,r){const s=[];let i=0;for(const o of n){let a=Is(o,r.Ba(i));a==null&&(a={nullValue:"NULL_VALUE"}),s.push(a),i++}return{arrayValue:{values:s}}}(t,e)}return function(n,r){if((n=z(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return By(r.k,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=Ye.fromDate(n);return{timestampValue:_o(r.k,s)}}if(n instanceof Ye){const s=new Ye(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:_o(r.k,s)}}if(n instanceof il)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof xn)return{bytesValue:Zy(r.k,n._byteString)};if(n instanceof ke){const s=r.databaseId,i=n.firestore._databaseId;if(!i.isEqual(s))throw r.Ua(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Wh(n.firestore._databaseId||r.databaseId,n._key.path)}}throw r.Ua(`Unsupported field value: ${sl(n)}`)}(t,e)}function aw(t,e){const n={};return Dy(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):ps(t,(r,s)=>{const i=Is(s,e.Fa(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function cw(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ye||t instanceof il||t instanceof xn||t instanceof ke||t instanceof vs)}function kd(t,e,n){if(!cw(n)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(n)){const r=sl(n);throw r==="an object"?e.Ua(t+" a custom object"):e.Ua(t+" "+r)}}function xu(t,e,n){if((e=z(e))instanceof Er)return e._internalPath;if(typeof e=="string")return Cd(t,e);throw vc("Field path arguments must be of type string or FieldPath.",t,!1,void 0,n)}const wk=new RegExp("[~\\*/\\[\\]]");function Cd(t,e,n){if(e.search(wk)>=0)throw vc(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Er(...e.split("."))._internalPath}catch{throw vc(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function vc(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new k(I.INVALID_ARGUMENT,a+t+c)}function lw(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class So{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ke(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Ik(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(cl("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class Ik extends So{data(){return super.data()}}function cl(t,e){return typeof e=="string"?Cd(t,e):e instanceof Er?e._internalPath:e._delegate._internalPath}/**
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
 */class Wr{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Yn extends So{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new eo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(cl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class eo extends Yn{data(e={}){return super.data(e)}}class Sr{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Wr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new eo(this._firestore,this._userDataWriter,r.key,r,new Wr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new k(I.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,s){if(r._snapshot.oldDocs.isEmpty()){let i=0;return r._snapshot.docChanges.map(o=>({type:"added",doc:new eo(r._firestore,r._userDataWriter,o.doc.key,o.doc,new Wr(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter),oldIndex:-1,newIndex:i++}))}{let i=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(o=>s||o.type!==3).map(o=>{const a=new eo(r._firestore,r._userDataWriter,o.doc.key,o.doc,new Wr(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);let c=-1,l=-1;return o.type!==0&&(c=i.indexOf(o.doc.key),i=i.delete(o.doc.key)),o.type!==1&&(i=i.add(o.doc),l=i.indexOf(o.doc.key)),{type:_k(o.type),doc:a,oldIndex:c,newIndex:l}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function _k(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return K()}}function uw(t,e){return t instanceof Yn&&e instanceof Yn?t._firestore===e._firestore&&t._key.isEqual(e._key)&&(t._document===null?e._document===null:t._document.isEqual(e._document))&&t._converter===e._converter:t instanceof Sr&&e instanceof Sr&&t._firestore===e._firestore&&Zv(t.query,e.query)&&t.metadata.isEqual(e.metadata)&&t._snapshot.isEqual(e._snapshot)}/**
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
 */function hw(t){if(uc(t)&&t.explicitOrderBy.length===0)throw new k(I.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ra{}function sr(t,...e){for(const n of e)t=n._apply(t);return t}class bk extends ra{constructor(e,n,r){super(),this.Ga=e,this.za=n,this.Ha=r,this.type="where"}_apply(e){const n=ws(e.firestore),r=function(s,i,o,a,c,l,u){let h;if(c.isKeyField()){if(l==="array-contains"||l==="array-contains-any")throw new k(I.INVALID_ARGUMENT,`Invalid Query. You can't perform '${l}' queries on FieldPath.documentId().`);if(l==="in"||l==="not-in"){Kp(u,l);const f=[];for(const y of u)f.push(Wp(a,s,y));h={arrayValue:{values:f}}}else h=Wp(a,s,u)}else l!=="in"&&l!=="not-in"&&l!=="array-contains-any"||Kp(u,l),h=ow(o,i,u,l==="in"||l==="not-in");const d=Rt.create(c,l,h);return function(f,y){if(y.V()){const T=qh(f);if(T!==null&&!T.isEqual(y.field))throw new k(I.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${T.toString()}' and '${y.field.toString()}'`);const A=$h(f);A!==null&&gw(f,y.field,A)}const S=function(T,A){for(const w of T.filters)if(A.indexOf(w.op)>=0)return w.op;return null}(f,function(T){switch(T){case"!=":return["!=","not-in"];case"array-contains":return["array-contains","array-contains-any","not-in"];case"in":return["array-contains-any","in","not-in"];case"array-contains-any":return["array-contains","array-contains-any","in","not-in"];case"not-in":return["array-contains","array-contains-any","in","not-in","!="];default:return[]}}(y.op));if(S!==null)throw S===y.op?new k(I.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${y.op.toString()}' filter.`):new k(I.INVALID_ARGUMENT,`Invalid query. You cannot use '${y.op.toString()}' filters with '${S.toString()}' filters.`)}(s,d),d}(e._query,"where",n,e.firestore._databaseId,this.Ga,this.za,this.Ha);return new It(e.firestore,e.converter,function(s,i){const o=s.filters.concat([i]);return new Zn(s.path,s.collectionGroup,s.explicitOrderBy.slice(),o,s.limit,s.limitType,s.startAt,s.endAt)}(e._query,r))}}function Tk(t,e,n){const r=e,s=cl("where",t);return new bk(s,r,n)}class Ek extends ra{constructor(e,n){super(),this.Ga=e,this.Ja=n,this.type="orderBy"}_apply(e){const n=function(r,s,i){if(r.startAt!==null)throw new k(I.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new k(I.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const o=new Us(s,i);return function(a,c){if($h(a)===null){const l=qh(a);l!==null&&gw(a,l,c.field)}}(r,o),o}(e._query,this.Ga,this.Ja);return new It(e.firestore,e.converter,function(r,s){const i=r.explicitOrderBy.concat([s]);return new Zn(r.path,r.collectionGroup,i,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,n))}}function Sk(t,e="asc"){const n=e,r=cl("orderBy",t);return new Ek(r,n)}class dw extends ra{constructor(e,n,r){super(),this.type=e,this.Ya=n,this.Xa=r}_apply(e){return new It(e.firestore,e.converter,Fy(e._query,this.Ya,this.Xa))}}function Ak(t){return Yv("limit",t),new dw("limit",t,"F")}function kk(t){return Yv("limitToLast",t),new dw("limitToLast",t,"L")}class fw extends ra{constructor(e,n,r){super(),this.type=e,this.Za=n,this.tc=r}_apply(e){const n=mw(e,this.type,this.Za,this.tc);return new It(e.firestore,e.converter,function(r,s){return new Zn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,s,r.endAt)}(e._query,n))}}function Ck(...t){return new fw("startAt",t,!0)}function Nk(...t){return new fw("startAfter",t,!1)}class pw extends ra{constructor(e,n,r){super(),this.type=e,this.Za=n,this.tc=r}_apply(e){const n=mw(e,this.type,this.Za,this.tc);return new It(e.firestore,e.converter,function(r,s){return new Zn(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,r.startAt,s)}(e._query,n))}}function Rk(...t){return new pw("endBefore",t,!0)}function Dk(...t){return new pw("endAt",t,!1)}function mw(t,e,n,r){if(n[0]=z(n[0]),n[0]instanceof So)return function(s,i,o,a,c){if(!a)throw new k(I.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${o}().`);const l=[];for(const u of Ys(s))if(u.field.isKeyField())l.push(ac(i,a.key));else{const h=a.data.field(u.field);if(Fh(h))throw new k(I.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+u.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(h===null){const d=u.field.canonicalString();throw new k(I.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${d}' (used as the orderBy) does not exist.`)}l.push(h)}return new Io(l,c)}(t._query,t.firestore._databaseId,e,n[0]._document,r);{const s=ws(t.firestore);return function(i,o,a,c,l,u){const h=i.explicitOrderBy;if(l.length>h.length)throw new k(I.INVALID_ARGUMENT,`Too many arguments provided to ${c}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const d=[];for(let f=0;f<l.length;f++){const y=l[f];if(h[f].field.isKeyField()){if(typeof y!="string")throw new k(I.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${c}(), but got a ${typeof y}`);if(!Bh(i)&&y.indexOf("/")!==-1)throw new k(I.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${c}() must be a plain document ID, but '${y}' contains a slash.`);const S=i.path.child(pe.fromString(y));if(!W.isDocumentKey(S))throw new k(I.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${c}() must result in a valid document path, but '${S}' is not because it contains an odd number of segments.`);const T=new W(S);d.push(ac(o,T))}else{const S=ow(a,c,y);d.push(S)}}return new Io(d,u)}(t._query,t.firestore._databaseId,s,e,n,r)}}function Wp(t,e,n){if(typeof(n=z(n))=="string"){if(n==="")throw new k(I.INVALID_ARGUMENT,"Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");if(!Bh(e)&&n.indexOf("/")!==-1)throw new k(I.INVALID_ARGUMENT,`Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(pe.fromString(n));if(!W.isDocumentKey(r))throw new k(I.INVALID_ARGUMENT,`Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ac(t,new W(r))}if(n instanceof ke)return ac(t,n._key);throw new k(I.INVALID_ARGUMENT,`Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: ${sl(n)}.`)}function Kp(t,e){if(!Array.isArray(t)||t.length===0)throw new k(I.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);if(t.length>10)throw new k(I.INVALID_ARGUMENT,`Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`)}function gw(t,e,n){if(!n.isEqual(e))throw new k(I.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}/**
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
 */class Nd{convertValue(e,n="none"){switch(ns(e)){case 0:return null;case 1:return e.booleanValue;case 2:return $e(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Gs(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw K()}}convertObject(e,n){const r={};return ps(e.fields,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertGeoPoint(e){return new il($e(e.latitude),$e(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Oy(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(vo(e));default:return null}}convertTimestamp(e){const n=br(e);return new Ye(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=pe.fromString(e);J(cv(r));const s=new ci(r.get(1),r.get(3)),i=new W(r.popFirst(5));return s.isEqual(n)||qe(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function ll(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class Ok extends Nd{constructor(e){super(),this.firestore=e}convertBytes(e){return new xn(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new ke(this.firestore,null,n)}}/**
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
 */class xk{constructor(e,n){this._firestore=e,this._commitHandler=n,this._mutations=[],this._committed=!1,this._dataReader=ws(e)}set(e,n,r){this._verifyNotCommitted();const s=hr(e,this._firestore),i=ll(s.converter,n,r),o=al(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(o.toMutation(s._key,Be.none())),this}update(e,n,r,...s){this._verifyNotCommitted();const i=hr(e,this._firestore);let o;return o=typeof(n=z(n))=="string"||n instanceof Er?Ad(this._dataReader,"WriteBatch.update",i._key,n,r,s):Sd(this._dataReader,"WriteBatch.update",i._key,n),this._mutations.push(o.toMutation(i._key,Be.exists(!0))),this}delete(e){this._verifyNotCommitted();const n=hr(e,this._firestore);return this._mutations=this._mutations.concat(new Yo(n._key,Be.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new k(I.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function hr(t,e){if((t=z(t)).firestore!==e)throw new k(I.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}/**
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
 *//**
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
 */function Pk(t){t=de(t,ke);const e=de(t.firestore,Le);return zv(tt(e),t._key).then(n=>Rd(e,t,n))}class _s extends Nd{constructor(e){super(),this.firestore=e}convertBytes(e){return new xn(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new ke(this.firestore,null,n)}}function Mk(t){t=de(t,ke);const e=de(t.firestore,Le),n=tt(e),r=new _s(e);return zA(n,t._key).then(s=>new Yn(e,r,t._key,s,new Wr(s!==null&&s.hasLocalMutations,!0),t.converter))}function Lk(t){t=de(t,ke);const e=de(t.firestore,Le);return zv(tt(e),t._key,{source:"server"}).then(n=>Rd(e,t,n))}function Fk(t){t=de(t,It);const e=de(t.firestore,Le),n=tt(e),r=new _s(e);return hw(t._query),Gv(n,t._query).then(s=>new Sr(e,r,t,s))}function Uk(t){t=de(t,It);const e=de(t.firestore,Le),n=tt(e),r=new _s(e);return GA(n,t._query).then(s=>new Sr(e,r,t,s))}function Vk(t){t=de(t,It);const e=de(t.firestore,Le),n=tt(e),r=new _s(e);return Gv(n,t._query,{source:"server"}).then(s=>new Sr(e,r,t,s))}function Hp(t,e,n){t=de(t,ke);const r=de(t.firestore,Le),s=ll(t.converter,e,n);return sa(r,[al(ws(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,Be.none())])}function zp(t,e,n,...r){t=de(t,ke);const s=de(t.firestore,Le),i=ws(s);let o;return o=typeof(e=z(e))=="string"||e instanceof Er?Ad(i,"updateDoc",t._key,e,n,r):Sd(i,"updateDoc",t._key,e),sa(s,[o.toMutation(t._key,Be.exists(!0))])}function $k(t){return sa(de(t.firestore,Le),[new Yo(t._key,Be.none())])}function qk(t,e){const n=de(t.firestore,Le),r=yc(t),s=ll(t.converter,e);return sa(n,[al(ws(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,Be.exists(!1))]).then(()=>r)}function yw(t,...e){var n,r,s;t=z(t);let i={includeMetadataChanges:!1},o=0;typeof e[o]!="object"||Ou(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(Ou(e[o])){const h=e[o];e[o]=(n=h.next)===null||n===void 0?void 0:n.bind(h),e[o+1]=(r=h.error)===null||r===void 0?void 0:r.bind(h),e[o+2]=(s=h.complete)===null||s===void 0?void 0:s.bind(h)}let c,l,u;if(t instanceof ke)l=de(t.firestore,Le),u=yi(t._key.path),c={next:h=>{e[o]&&e[o](Rd(l,t,h))},error:e[o+1],complete:e[o+2]};else{const h=de(t,It);l=de(h.firestore,Le),u=h._query;const d=new _s(l);c={next:f=>{e[o]&&e[o](new Sr(l,d,h,f))},error:e[o+1],complete:e[o+2]},hw(t._query)}return function(h,d,f,y){const S=new nl(y),T=new dd(d,S,f);return h.asyncQueue.enqueueAndForget(async()=>ld(await ai(h),T)),()=>{S.na(),h.asyncQueue.enqueueAndForget(async()=>ud(await ai(h),T))}}(tt(l),u,a,c)}function Bk(t,e){return QA(tt(t=de(t,Le)),Ou(e)?e:{next:e})}function sa(t,e){return function(n,r){const s=new Qe;return n.asyncQueue.enqueueAndForget(async()=>EA(await bd(n),r,s)),s.promise}(tt(t),e)}function Rd(t,e,n){const r=n.docs.get(e._key),s=new _s(t);return new Yn(t,s,e._key,r,new Wr(n.hasPendingWrites,n.fromCache),e.converter)}/**
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
 */class jk extends class{constructor(e,n){this._firestore=e,this._transaction=n,this._dataReader=ws(e)}get(e){const n=hr(e,this._firestore),r=new Ok(this._firestore);return this._transaction.lookup([n._key]).then(s=>{if(!s||s.length!==1)return K();const i=s[0];if(i.isFoundDocument())return new So(this._firestore,r,i.key,i,n.converter);if(i.isNoDocument())return new So(this._firestore,r,n._key,null,n.converter);throw K()})}set(e,n,r){const s=hr(e,this._firestore),i=ll(s.converter,n,r),o=al(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(e,n,r,...s){const i=hr(e,this._firestore);let o;return o=typeof(n=z(n))=="string"||n instanceof Er?Ad(this._dataReader,"Transaction.update",i._key,n,r,s):Sd(this._dataReader,"Transaction.update",i._key,n),this._transaction.update(i._key,o),this}delete(e){const n=hr(e,this._firestore);return this._transaction.delete(n._key),this}}{constructor(e,n){super(e,n),this._firestore=e}get(e){const n=hr(e,this._firestore),r=new _s(this._firestore);return super.get(e).then(s=>new Yn(this._firestore,r,n._key,s._document,new Wr(!1,!1),n.converter))}}function Wk(t,e){return YA(tt(t=de(t,Le)),n=>e(new jk(t,n)))}/**
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
 */function Kk(){return new na("deleteField")}function Hk(){return new Ed("serverTimestamp")}function zk(...t){return new gk("arrayUnion",t)}function Gk(...t){return new yk("arrayRemove",t)}function Qk(t){return new vk("increment",t)}(function(t,e=!0){(function(n){gi=n})(ds),Zr(new Gn("firestore",(n,{options:r})=>{const s=n.getProvider("app").getImmediate(),i=new Le(s,new TS(n.getProvider("auth-internal")),new kS(n.getProvider("app-check-internal")));return r=Object.assign({useFetchStreams:e},r),i._setSettings(r),i},"PUBLIC")),An(Zf,"3.4.1",t),An(Zf,"3.4.1","esm2017")})();const Yk="@firebase/firestore-compat",Jk="0.1.10";/**
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
 */function Dd(t,e){if(e===void 0)return{merge:!1};if(e.mergeFields!==void 0&&e.merge!==void 0)throw new k("invalid-argument",`Invalid options passed to function ${t}(): You cannot specify both "merge" and "mergeFields".`);return e}/**
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
 */function Gp(){if(typeof Uint8Array>"u")throw new k("unimplemented","Uint8Arrays are not available in this environment.")}function Qp(){if(!RS())throw new k("unimplemented","Blobs are unavailable in Firestore in this environment.")}class Ao{constructor(e){this._delegate=e}static fromBase64String(e){return Qp(),new Ao(xn.fromBase64String(e))}static fromUint8Array(e){return Gp(),new Ao(xn.fromUint8Array(e))}toBase64(){return Qp(),this._delegate.toBase64()}toUint8Array(){return Gp(),this._delegate.toUint8Array()}isEqual(e){return this._delegate.isEqual(e._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}/**
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
 */function Pu(t){return Xk(t,["next","error","complete"])}function Xk(t,e){if(typeof t!="object"||t===null)return!1;const n=t;for(const r of e)if(r in n&&typeof n[r]=="function")return!0;return!1}/**
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
 */class Zk{enableIndexedDbPersistence(e,n){return ik(e._delegate,{forceOwnership:n})}enableMultiTabIndexedDbPersistence(e){return ok(e._delegate)}clearIndexedDbPersistence(e){return ak(e._delegate)}}class vw{constructor(e,n,r){this._delegate=n,this._persistenceProvider=r,this.INTERNAL={delete:()=>this.terminate()},e instanceof ci||(this._appCompat=e)}get _databaseId(){return this._delegate._databaseId}settings(e){const n=this._delegate._getSettings();!e.merge&&n.host!==e.host&&go("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."),e.merge&&(e=Object.assign(Object.assign({},n),e),delete e.merge),this._delegate._setSettings(e)}useEmulator(e,n,r={}){ek(this._delegate,e,n,r)}enableNetwork(){return lk(this._delegate)}disableNetwork(){return uk(this._delegate)}enablePersistence(e){let n=!1,r=!1;return e&&(n=!!e.synchronizeTabs,r=!!e.experimentalForceOwningTab,Qv("synchronizeTabs",n,"experimentalForceOwningTab",r)),n?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,r)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore-compat"),this._appCompat._removeServiceInstance("firestore")),this._delegate._delete()}waitForPendingWrites(){return ck(this._delegate)}onSnapshotsInSync(e){return Bk(this._delegate,e)}get app(){if(!this._appCompat)throw new k("failed-precondition","Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(e){try{return new li(this,Jv(this._delegate,e))}catch(n){throw Tt(n,"collection()","Firestore.collection()")}}doc(e){try{return new Xt(this,yc(this._delegate,e))}catch(n){throw Tt(n,"doc()","Firestore.doc()")}}collectionGroup(e){try{return new bt(this,tk(this._delegate,e))}catch(n){throw Tt(n,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(e){return Wk(this._delegate,n=>e(new ww(this,n)))}batch(){return tt(this._delegate),new Iw(new xk(this._delegate,e=>sa(this._delegate,e)))}loadBundle(e){return hk(this._delegate,e)}namedQuery(e){return dk(this._delegate,e).then(n=>n?new bt(this,n):null)}}class ul extends Nd{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ao(new xn(e))}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return Xt.forKey(n,this.firestore,null)}}function eC(t){wS(t)}class ww{constructor(e,n){this._firestore=e,this._delegate=n,this._userDataWriter=new ul(e)}get(e){const n=Kr(e);return this._delegate.get(n).then(r=>new ko(this._firestore,new Yn(this._firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,n.converter)))}set(e,n,r){const s=Kr(e);return r?(Dd("Transaction.set",r),this._delegate.set(s,n,r)):this._delegate.set(s,n),this}update(e,n,r,...s){const i=Kr(e);return arguments.length===2?this._delegate.update(i,n):this._delegate.update(i,n,r,...s),this}delete(e){const n=Kr(e);return this._delegate.delete(n),this}}class Iw{constructor(e){this._delegate=e}set(e,n,r){const s=Kr(e);return r?(Dd("WriteBatch.set",r),this._delegate.set(s,n,r)):this._delegate.set(s,n),this}update(e,n,r,...s){const i=Kr(e);return arguments.length===2?this._delegate.update(i,n):this._delegate.update(i,n,r,...s),this}delete(e){const n=Kr(e);return this._delegate.delete(n),this}commit(){return this._delegate.commit()}}class os{constructor(e,n,r){this._firestore=e,this._userDataWriter=n,this._delegate=r}fromFirestore(e,n){const r=new eo(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,null);return this._delegate.fromFirestore(new Co(this._firestore,r),n??{})}toFirestore(e,n){return n?this._delegate.toFirestore(e,n):this._delegate.toFirestore(e)}static getInstance(e,n){const r=os.INSTANCES;let s=r.get(e);s||(s=new WeakMap,r.set(e,s));let i=s.get(n);return i||(i=new os(e,new ul(e),n),s.set(n,i)),i}}os.INSTANCES=new WeakMap;class Xt{constructor(e,n){this.firestore=e,this._delegate=n,this._userDataWriter=new ul(e)}static forPath(e,n,r){if(e.length%2!==0)throw new k("invalid-argument",`Invalid document reference. Document references must have an even number of segments, but ${e.canonicalString()} has ${e.length}`);return new Xt(n,new ke(n._delegate,r,new W(e)))}static forKey(e,n,r){return new Xt(n,new ke(n._delegate,r,e))}get id(){return this._delegate.id}get parent(){return new li(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(e){try{return new li(this.firestore,Jv(this._delegate,e))}catch(n){throw Tt(n,"collection()","DocumentReference.collection()")}}isEqual(e){return e=z(e),e instanceof ke?Xv(this._delegate,e):!1}set(e,n){n=Dd("DocumentReference.set",n);try{return n?Hp(this._delegate,e,n):Hp(this._delegate,e)}catch(r){throw Tt(r,"setDoc()","DocumentReference.set()")}}update(e,n,...r){try{return arguments.length===1?zp(this._delegate,e):zp(this._delegate,e,n,...r)}catch(s){throw Tt(s,"updateDoc()","DocumentReference.update()")}}delete(){return $k(this._delegate)}onSnapshot(...e){const n=_w(e),r=bw(e,s=>new ko(this.firestore,new Yn(this.firestore._delegate,this._userDataWriter,s._key,s._document,s.metadata,this._delegate.converter)));return yw(this._delegate,n,r)}get(e){let n;return(e==null?void 0:e.source)==="cache"?n=Mk(this._delegate):(e==null?void 0:e.source)==="server"?n=Lk(this._delegate):n=Pk(this._delegate),n.then(r=>new ko(this.firestore,new Yn(this.firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,this._delegate.converter)))}withConverter(e){return new Xt(this.firestore,e?this._delegate.withConverter(os.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function Tt(t,e,n){return t.message=t.message.replace(e,n),t}function _w(t){for(const e of t)if(typeof e=="object"&&!Pu(e))return e;return{}}function bw(t,e){var n,r;let s;return Pu(t[0])?s=t[0]:Pu(t[1])?s=t[1]:typeof t[0]=="function"?s={next:t[0],error:t[1],complete:t[2]}:s={next:t[1],error:t[2],complete:t[3]},{next:i=>{s.next&&s.next(e(i))},error:(n=s.error)===null||n===void 0?void 0:n.bind(s),complete:(r=s.complete)===null||r===void 0?void 0:r.bind(s)}}class ko{constructor(e,n){this._firestore=e,this._delegate=n}get ref(){return new Xt(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(e){return this._delegate.data(e)}get(e,n){return this._delegate.get(e,n)}isEqual(e){return uw(this._delegate,e._delegate)}}class Co extends ko{data(e){const n=this._delegate.data(e);return IS(n!==void 0),n}}class bt{constructor(e,n){this.firestore=e,this._delegate=n,this._userDataWriter=new ul(e)}where(e,n,r){try{return new bt(this.firestore,sr(this._delegate,Tk(e,n,r)))}catch(s){throw Tt(s,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(e,n){try{return new bt(this.firestore,sr(this._delegate,Sk(e,n)))}catch(r){throw Tt(r,/(orderBy|where)\(\)/,"Query.$1()")}}limit(e){try{return new bt(this.firestore,sr(this._delegate,Ak(e)))}catch(n){throw Tt(n,"limit()","Query.limit()")}}limitToLast(e){try{return new bt(this.firestore,sr(this._delegate,kk(e)))}catch(n){throw Tt(n,"limitToLast()","Query.limitToLast()")}}startAt(...e){try{return new bt(this.firestore,sr(this._delegate,Ck(...e)))}catch(n){throw Tt(n,"startAt()","Query.startAt()")}}startAfter(...e){try{return new bt(this.firestore,sr(this._delegate,Nk(...e)))}catch(n){throw Tt(n,"startAfter()","Query.startAfter()")}}endBefore(...e){try{return new bt(this.firestore,sr(this._delegate,Rk(...e)))}catch(n){throw Tt(n,"endBefore()","Query.endBefore()")}}endAt(...e){try{return new bt(this.firestore,sr(this._delegate,Dk(...e)))}catch(n){throw Tt(n,"endAt()","Query.endAt()")}}isEqual(e){return Zv(this._delegate,e._delegate)}get(e){let n;return(e==null?void 0:e.source)==="cache"?n=Uk(this._delegate):(e==null?void 0:e.source)==="server"?n=Vk(this._delegate):n=Fk(this._delegate),n.then(r=>new Mu(this.firestore,new Sr(this.firestore._delegate,this._userDataWriter,this._delegate,r._snapshot)))}onSnapshot(...e){const n=_w(e),r=bw(e,s=>new Mu(this.firestore,new Sr(this.firestore._delegate,this._userDataWriter,this._delegate,s._snapshot)));return yw(this._delegate,n,r)}withConverter(e){return new bt(this.firestore,e?this._delegate.withConverter(os.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}class tC{constructor(e,n){this._firestore=e,this._delegate=n}get type(){return this._delegate.type}get doc(){return new Co(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class Mu{constructor(e,n){this._firestore=e,this._delegate=n}get query(){return new bt(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map(e=>new Co(this._firestore,e))}docChanges(e){return this._delegate.docChanges(e).map(n=>new tC(this._firestore,n))}forEach(e,n){this._delegate.forEach(r=>{e.call(n,new Co(this._firestore,r))})}isEqual(e){return uw(this._delegate,e._delegate)}}class li extends bt{constructor(e,n){super(e,n),this.firestore=e,this._delegate=n}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const e=this._delegate.parent;return e?new Xt(this.firestore,e):null}doc(e){try{return e===void 0?new Xt(this.firestore,yc(this._delegate)):new Xt(this.firestore,yc(this._delegate,e))}catch(n){throw Tt(n,"doc()","CollectionReference.doc()")}}add(e){return qk(this._delegate,e).then(n=>new Xt(this.firestore,n))}isEqual(e){return Xv(this._delegate,e._delegate)}withConverter(e){return new li(this.firestore,e?this._delegate.withConverter(os.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function Kr(t){return de(t,ke)}/**
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
 */class Od{constructor(...e){this._delegate=new Er(...e)}static documentId(){return new Od(ot.keyField().canonicalString())}isEqual(e){return e=z(e),e instanceof Er?this._delegate._internalPath.isEqual(e._internalPath):!1}}/**
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
 */class qr{constructor(e){this._delegate=e}static serverTimestamp(){const e=Hk();return e._methodName="FieldValue.serverTimestamp",new qr(e)}static delete(){const e=Kk();return e._methodName="FieldValue.delete",new qr(e)}static arrayUnion(...e){const n=zk(...e);return n._methodName="FieldValue.arrayUnion",new qr(n)}static arrayRemove(...e){const n=Gk(...e);return n._methodName="FieldValue.arrayRemove",new qr(n)}static increment(e){const n=Qk(e);return n._methodName="FieldValue.increment",new qr(n)}isEqual(e){return this._delegate.isEqual(e._delegate)}}/**
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
 */const nC={Firestore:vw,GeoPoint:il,Timestamp:Ye,Blob:Ao,Transaction:ww,WriteBatch:Iw,DocumentReference:Xt,DocumentSnapshot:ko,Query:bt,QueryDocumentSnapshot:Co,QuerySnapshot:Mu,CollectionReference:li,FieldPath:Od,FieldValue:qr,setLogLevel:eC,CACHE_SIZE_UNLIMITED:sk};function rC(t,e){t.INTERNAL.registerComponent(new Gn("firestore-compat",n=>{const r=n.getProvider("app-compat").getImmediate(),s=n.getProvider("firestore").getImmediate();return e(r,s)},"PUBLIC").setServiceProps(Object.assign({},nC)))}/**
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
 */function sC(t){rC(t,(e,n)=>new vw(e,n,new Zk)),t.registerVersion(Yk,Jk)}sC(Gt);function xd(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}const Mi={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",TWITTER:"twitter.com"},As={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
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
 */function iC(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registed for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance."}}function Tw(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const oC=iC,aC=Tw,Ew=new hs("auth","Firebase",Tw());/**
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
 */const Yp=new Pc("@firebase/auth");function xa(t,...e){Yp.logLevel<=he.ERROR&&Yp.error(`Auth (${ds}): ${t}`,...e)}/**
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
 */function ht(t,...e){throw Pd(t,...e)}function ut(t,...e){return Pd(t,...e)}function Sw(t,e,n){const r=Object.assign(Object.assign({},aC()),{[e]:n});return new hs("auth","Firebase",r).create(e,{appName:t.name})}function Ti(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&ht(t,"argument-error"),Sw(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Pd(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Ew.create(t,...e)}function O(t,e,...n){if(!t)throw Pd(e,...n)}function En(t){const e="INTERNAL ASSERTION FAILED: "+t;throw xa(e),new Error(e)}function ln(t,e){t||En(e)}/**
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
 */const Jp=new Map;function zt(t){ln(t instanceof Function,"Expected a class definition");let e=Jp.get(t);return e?(ln(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Jp.set(t,e),e)}function cC(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(zt);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}/**
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
 */function No(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Md(){return Xp()==="http:"||Xp()==="https:"}function Xp(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function lC(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Md()||lh()||"connection"in navigator)?navigator.onLine:!0}function uC(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class ia{constructor(e,n){this.shortDelay=e,this.longDelay=n,ln(n>e,"Short delay should be less than long delay!"),this.isMobile=wg()||xc()}get(){return lC()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ld(t,e){ln(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Aw{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;En("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;En("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;En("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const hC={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
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
 */const dC=new ia(3e4,6e4);function ze(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function nt(t,e,n,r,s={}){return kw(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=di(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();return c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode),Aw.fetch()(Cw(t,t.config.apiHost,n,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},i))})}async function kw(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},hC),e);try{const s=new fC(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Pa(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Pa(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Pa(t,"email-already-in-use",o);const u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Sw(t,u,l);ht(t,u)}}catch(s){if(s instanceof tn)throw s;ht(t,"network-request-failed")}}async function tr(t,e,n,r,s={}){const i=await nt(t,e,n,r,s);return"mfaPendingCredential"in i&&ht(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Cw(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Ld(t.config,s):`${t.config.apiScheme}://${s}`}class fC{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(ut(this.auth,"timeout")),dC.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Pa(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=ut(t,e,r);return s.customData._tokenResponse=n,s}/**
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
 */async function pC(t,e){return nt(t,"POST","/v1/accounts:delete",e)}async function mC(t,e){return nt(t,"POST","/v1/accounts:update",e)}async function gC(t,e){return nt(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function to(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function yC(t,e=!1){const n=z(t),r=await n.getIdToken(e),s=hl(r);O(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:to(Wl(s.auth_time)),issuedAtTime:to(Wl(s.iat)),expirationTime:to(Wl(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Wl(t){return Number(t)*1e3}function hl(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return xa("JWT malformed, contained fewer than 3 sections"),null;try{const s=Zb(n);return s?JSON.parse(s):(xa("Failed to decode base64 JWT payload"),null)}catch(s){return xa("Caught error parsing JWT payload as JSON",s),null}}function vC(t){const e=hl(t);return O(e,"internal-error"),O(typeof e.exp<"u","internal-error"),O(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Jn(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof tn&&wC(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function wC({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class IC{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Nw{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=to(this.lastLoginAt),this.creationTime=to(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ro(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Jn(t,gC(n,{idToken:r}));O(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?TC(i.providerUserInfo):[],a=bC(t.providerData,o),c=t.isAnonymous,l=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),u=c?l:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Nw(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(t,h)}async function _C(t){const e=z(t);await Ro(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function bC(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function TC(t){return t.map(e=>{var{providerId:n}=e,r=xd(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function EC(t,e){const n=await kw(t,{},async()=>{const r=di({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Cw(t,s,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Aw.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
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
 */class Do{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){O(e.idToken,"internal-error"),O(typeof e.idToken<"u","internal-error"),O(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):vC(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return O(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await EC(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Do;return r&&(O(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(O(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(O(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Do,this.toJSON())}_performRefresh(){return En("not implemented")}}/**
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
 */function ir(t,e){O(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Qr{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=xd(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.emailVerified=!1,this.isAnonymous=!1,this.tenantId=null,this.providerData=[],this.proactiveRefresh=new IC(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.metadata=new Nw(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Jn(this,this.stsTokenManager.getToken(this.auth,e));return O(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return yC(this,e)}reload(){return _C(this)}_assign(e){this!==e&&(O(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new Qr(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){O(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ro(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Jn(this,pC(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,a,c,l,u;const h=(r=n.displayName)!==null&&r!==void 0?r:void 0,d=(s=n.email)!==null&&s!==void 0?s:void 0,f=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,y=(o=n.photoURL)!==null&&o!==void 0?o:void 0,S=(a=n.tenantId)!==null&&a!==void 0?a:void 0,T=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,A=(l=n.createdAt)!==null&&l!==void 0?l:void 0,w=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:v,emailVerified:_,isAnonymous:P,providerData:X,stsTokenManager:q}=n;O(v&&q,e,"internal-error");const oe=Do.fromJSON(this.name,q);O(typeof v=="string",e,"internal-error"),ir(h,e.name),ir(d,e.name),O(typeof _=="boolean",e,"internal-error"),O(typeof P=="boolean",e,"internal-error"),ir(f,e.name),ir(y,e.name),ir(S,e.name),ir(T,e.name),ir(A,e.name),ir(w,e.name);const Ee=new Qr({uid:v,auth:e,email:d,emailVerified:_,displayName:h,isAnonymous:P,photoURL:y,phoneNumber:f,tenantId:S,stsTokenManager:oe,createdAt:A,lastLoginAt:w});return X&&Array.isArray(X)&&(Ee.providerData=X.map(Se=>Object.assign({},Se))),T&&(Ee._redirectEventId=T),Ee}static async _fromIdTokenResponse(e,n,r=!1){const s=new Do;s.updateFromServerResponse(n);const i=new Qr({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ro(i),i}}/**
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
 */class Rw{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Rw.type="NONE";const Oo=Rw;/**
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
 */function Yr(t,e,n){return`firebase:${t}:${e}:${n}`}class $s{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Yr(this.userKey,s.apiKey,i),this.fullPersistenceKey=Yr("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Qr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new $s(zt(Oo),e,r);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=s[0]||zt(Oo);const o=Yr(r,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){const h=Qr._fromJSON(e,u);l!==i&&(a=h),i=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new $s(i,e,r):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new $s(i,e,r))}}/**
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
 */function Zp(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(xw(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Dw(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Pw(e))return"Blackberry";if(Mw(e))return"Webos";if(Fd(e))return"Safari";if((e.includes("chrome/")||Ow(e))&&!e.includes("edge/"))return"Chrome";if(oa(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Dw(t=Ne()){return/firefox\//i.test(t)}function Fd(t=Ne()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ow(t=Ne()){return/crios\//i.test(t)}function xw(t=Ne()){return/iemobile/i.test(t)}function oa(t=Ne()){return/android/i.test(t)}function Pw(t=Ne()){return/blackberry/i.test(t)}function Mw(t=Ne()){return/webos/i.test(t)}function Ei(t=Ne()){return/iphone|ipad|ipod/i.test(t)}function SC(t=Ne()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(t)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(t)}function AC(t=Ne()){var e;return Ei(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function kC(){return uh()&&document.documentMode===10}function Lw(t=Ne()){return Ei(t)||oa(t)||Mw(t)||Pw(t)||/windows phone/i.test(t)||xw(t)}function CC(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function Fw(t,e=[]){let n;switch(t){case"Browser":n=Zp(Ne());break;case"Worker":n=`${Zp(Ne())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ds}/${r}`}/**
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
 */class NC{constructor(e,n){this.app=e,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new em(this),this.idTokenSubscription=new em(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ew,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=zt(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await $s.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e)}}async initializeCurrentUser(e){var n;let r=await this.assertedPersistence.getCurrentUser();if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,i=r==null?void 0:r._redirectEventId,o=await this.tryRedirectSignIn(e);(!s||s===i)&&(o!=null&&o.user)&&(r=o.user)}return r?r._redirectEventId?(O(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)):this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ro(e)}catch(n){if(n.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=uC()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?z(e):null;return n&&O(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e){if(!this._deleted)return e&&O(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(zt(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new hs("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&zt(e)||this._popupRedirectResolver;O(n,this,"argument-error"),this.redirectPersistenceManager=await $s.create(this,[zt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return O(o,this,"internal-error"),o.then(()=>i(this.currentUser)),typeof n=="function"?e.addObserver(n,r,s):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&(this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh()),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return O(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Fw(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};return this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId),e}}function et(t){return z(t)}class em{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ig(n=>this.observer=n)}get next(){return O(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function RC(t,e,n){const r=et(t);O(r._canInitEmulator,r,"emulator-config-failed"),O(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!!(n!=null&&n.disableWarnings),i=Uw(e),{host:o,port:a}=DC(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${i}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||OC()}function Uw(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function DC(t){const e=Uw(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:tm(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:tm(o)}}}function tm(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function OC(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Si{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return En("not implemented")}_getIdTokenResponse(e){return En("not implemented")}_linkToIdToken(e,n){return En("not implemented")}_getReauthenticationResolver(e){return En("not implemented")}}/**
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
 */async function Vw(t,e){return nt(t,"POST","/v1/accounts:resetPassword",ze(t,e))}async function $w(t,e){return nt(t,"POST","/v1/accounts:update",e)}async function xC(t,e){return nt(t,"POST","/v1/accounts:update",ze(t,e))}/**
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
 */async function PC(t,e){return tr(t,"POST","/v1/accounts:signInWithPassword",ze(t,e))}async function dl(t,e){return nt(t,"POST","/v1/accounts:sendOobCode",ze(t,e))}async function MC(t,e){return dl(t,e)}async function LC(t,e){return dl(t,e)}async function FC(t,e){return dl(t,e)}async function UC(t,e){return dl(t,e)}/**
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
 */async function VC(t,e){return tr(t,"POST","/v1/accounts:signInWithEmailLink",ze(t,e))}async function $C(t,e){return tr(t,"POST","/v1/accounts:signInWithEmailLink",ze(t,e))}/**
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
 */class xo extends Si{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new xo(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new xo(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return PC(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return VC(e,{email:this._email,oobCode:this._password});default:ht(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return $w(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return $C(e,{idToken:n,email:this._email,oobCode:this._password});default:ht(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Kn(t,e){return tr(t,"POST","/v1/accounts:signInWithIdp",ze(t,e))}/**
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
 */const qC="http://localhost";class Pn extends Si{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Pn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ht("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=xd(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Pn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Kn(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Kn(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Kn(e,n)}buildRequest(){const e={requestUri:qC,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=di(n)}return e}}/**
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
 */async function BC(t,e){return nt(t,"POST","/v1/accounts:sendVerificationCode",ze(t,e))}async function jC(t,e){return tr(t,"POST","/v1/accounts:signInWithPhoneNumber",ze(t,e))}async function WC(t,e){const n=await tr(t,"POST","/v1/accounts:signInWithPhoneNumber",ze(t,e));if(n.temporaryProof)throw Pa(t,"account-exists-with-different-credential",n);return n}const KC={USER_NOT_FOUND:"user-not-found"};async function HC(t,e){const n=Object.assign(Object.assign({},e),{operation:"REAUTH"});return tr(t,"POST","/v1/accounts:signInWithPhoneNumber",ze(t,n),KC)}/**
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
 */class Jr extends Si{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new Jr({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new Jr({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return jC(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return WC(e,Object.assign({idToken:n},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return HC(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:r,verificationCode:s}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:r,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:r,phoneNumber:s,temporaryProof:i}=e;return!r&&!n&&!s&&!i?null:new Jr({verificationId:n,verificationCode:r,phoneNumber:s,temporaryProof:i})}}/**
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
 */function zC(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function GC(t){const e=Rs(Vi(t)).link,n=e?Rs(Vi(e)).deep_link_id:null,r=Rs(Vi(t)).deep_link_id;return(r?Rs(Vi(r)).link:null)||r||n||e||t}class fl{constructor(e){var n,r,s,i,o,a;const c=Rs(Vi(e)),l=(n=c.apiKey)!==null&&n!==void 0?n:null,u=(r=c.oobCode)!==null&&r!==void 0?r:null,h=zC((s=c.mode)!==null&&s!==void 0?s:null);O(l&&u&&h,"argument-error"),this.apiKey=l,this.operation=h,this.code=u,this.continueUrl=(i=c.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=GC(e);try{return new fl(n)}catch{return null}}}/**
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
 */class Dr{constructor(){this.providerId=Dr.PROVIDER_ID}static credential(e,n){return xo._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=fl.parseLink(n);return O(r,"argument-error"),xo._fromEmailAndCode(e,r.code,r.tenantId)}}Dr.PROVIDER_ID="password";Dr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Dr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class nr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Ai extends nr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class qs extends Ai{static credentialFromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;return O("providerId"in n&&"signInMethod"in n,"argument-error"),Pn._fromParams(n)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return O(e.idToken||e.accessToken,"argument-error"),Pn._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return qs.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return qs.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r,oauthTokenSecret:s,pendingToken:i,nonce:o,providerId:a}=e;if(!r&&!s&&!n&&!i||!a)return null;try{return new qs(a)._credential({idToken:n,accessToken:r,nonce:o,pendingToken:i})}catch{return null}}}/**
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
 */class wn extends Ai{constructor(){super("facebook.com")}static credential(e){return Pn._fromParams({providerId:wn.PROVIDER_ID,signInMethod:wn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return wn.credentialFromTaggedObject(e)}static credentialFromError(e){return wn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return wn.credential(e.oauthAccessToken)}catch{return null}}}wn.FACEBOOK_SIGN_IN_METHOD="facebook.com";wn.PROVIDER_ID="facebook.com";/**
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
 */class In extends Ai{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Pn._fromParams({providerId:In.PROVIDER_ID,signInMethod:In.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return In.credentialFromTaggedObject(e)}static credentialFromError(e){return In.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return In.credential(n,r)}catch{return null}}}In.GOOGLE_SIGN_IN_METHOD="google.com";In.PROVIDER_ID="google.com";/**
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
 */class _n extends Ai{constructor(){super("github.com")}static credential(e){return Pn._fromParams({providerId:_n.PROVIDER_ID,signInMethod:_n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _n.credentialFromTaggedObject(e)}static credentialFromError(e){return _n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _n.credential(e.oauthAccessToken)}catch{return null}}}_n.GITHUB_SIGN_IN_METHOD="github.com";_n.PROVIDER_ID="github.com";/**
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
 */const QC="http://localhost";class ui extends Si{constructor(e,n){super(e,e),this.pendingToken=n}_getIdTokenResponse(e){const n=this.buildRequest();return Kn(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Kn(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Kn(e,n)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,pendingToken:i}=n;return!r||!s||!i||r!==s?null:new ui(r,i)}static _create(e,n){return new ui(e,n)}buildRequest(){return{requestUri:QC,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
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
 */const YC="saml.";class wc extends nr{constructor(e){O(e.startsWith(YC),"argument-error"),super(e)}static credentialFromResult(e){return wc.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return wc.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const n=ui.fromJSON(e);return O(n,"argument-error"),n}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:n,providerId:r}=e;if(!n||!r)return null;try{return ui._create(r,n)}catch{return null}}}/**
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
 */class bn extends Ai{constructor(){super("twitter.com")}static credential(e,n){return Pn._fromParams({providerId:bn.PROVIDER_ID,signInMethod:bn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return bn.credentialFromTaggedObject(e)}static credentialFromError(e){return bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return bn.credential(n,r)}catch{return null}}}bn.TWITTER_SIGN_IN_METHOD="twitter.com";bn.PROVIDER_ID="twitter.com";/**
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
 */async function qw(t,e){return tr(t,"POST","/v1/accounts:signUp",ze(t,e))}/**
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
 */class sn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Qr._fromIdTokenResponse(e,r,s),o=nm(r);return new sn({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=nm(r);return new sn({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function nm(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function JC(t){var e;const n=et(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new sn({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await qw(n,{returnSecureToken:!0}),s=await sn._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(s.user),s}/**
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
 */class Ic extends tn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Ic.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Ic(e,n,r,s)}}function Bw(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ic._fromErrorAndOperation(t,i,e,r):i})}/**
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
 */function jw(t){return new Set(t.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function XC(t,e){const n=z(t);await pl(!0,n,e);const{providerUserInfo:r}=await mC(n.auth,{idToken:await n.getIdToken(),deleteProvider:[e]}),s=jw(r||[]);return n.providerData=n.providerData.filter(i=>s.has(i.providerId)),s.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n}async function Ud(t,e,n=!1){const r=await Jn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return sn._forOperation(t,"link",r)}async function pl(t,e,n){await Ro(e);const r=jw(e.providerData),s=t===!1?"provider-already-linked":"no-such-provider";O(r.has(n)===t,e.auth,s)}/**
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
 */async function Ww(t,e,n=!1){const{auth:r}=t,s="reauthenticate";try{const i=await Jn(t,Bw(r,s,e,t),n);O(i.idToken,r,"internal-error");const o=hl(i.idToken);O(o,r,"internal-error");const{sub:a}=o;return O(t.uid===a,r,"user-mismatch"),sn._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&ht(r,"user-mismatch"),i}}/**
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
 */async function Kw(t,e,n=!1){const r="signIn",s=await Bw(t,r,e),i=await sn._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function ml(t,e){return Kw(et(t),e)}async function Hw(t,e){const n=z(t);return await pl(!1,n,e.providerId),Ud(n,e)}async function zw(t,e){return Ww(z(t),e)}/**
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
 */async function ZC(t,e){return tr(t,"POST","/v1/accounts:signInWithCustomToken",ze(t,e))}/**
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
 */async function eN(t,e){const n=et(t),r=await ZC(n,{token:e,returnSecureToken:!0}),s=await sn._fromIdTokenResponse(n,"signIn",r);return await n._updateCurrentUser(s.user),s}/**
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
 */class gl{constructor(e,n){this.factorId=e,this.uid=n.mfaEnrollmentId,this.enrollmentTime=new Date(n.enrolledAt).toUTCString(),this.displayName=n.displayName}static _fromServerResponse(e,n){return"phoneInfo"in n?Vd._fromServerResponse(e,n):ht(e,"internal-error")}}class Vd extends gl{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,n){return new Vd(n)}}/**
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
 */function yl(t,e,n){var r;O(((r=n.url)===null||r===void 0?void 0:r.length)>0,t,"invalid-continue-uri"),O(typeof n.dynamicLinkDomain>"u"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(O(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(O(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
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
 */async function tN(t,e,n){const r=z(t),s={requestType:"PASSWORD_RESET",email:e};n&&yl(r,s,n),await LC(r,s)}async function nN(t,e,n){await Vw(z(t),{oobCode:e,newPassword:n})}async function rN(t,e){await xC(z(t),{oobCode:e})}async function Gw(t,e){const n=z(t),r=await Vw(n,{oobCode:e}),s=r.requestType;switch(O(s,n,"internal-error"),s){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":O(r.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":O(r.mfaInfo,n,"internal-error");default:O(r.email,n,"internal-error")}let i=null;return r.mfaInfo&&(i=gl._fromServerResponse(et(n),r.mfaInfo)),{data:{email:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.newEmail:r.email)||null,previousEmail:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.email:r.newEmail)||null,multiFactorInfo:i},operation:s}}async function sN(t,e){const{data:n}=await Gw(z(t),e);return n.email}async function iN(t,e,n){const r=et(t),s=await qw(r,{returnSecureToken:!0,email:e,password:n}),i=await sn._fromIdTokenResponse(r,"signIn",s);return await r._updateCurrentUser(i.user),i}function oN(t,e,n){return ml(z(t),Dr.credential(e,n))}/**
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
 */async function aN(t,e,n){const r=z(t),s={requestType:"EMAIL_SIGNIN",email:e};O(n.handleCodeInApp,r,"argument-error"),n&&yl(r,s,n),await FC(r,s)}function cN(t,e){const n=fl.parseLink(e);return(n==null?void 0:n.operation)==="EMAIL_SIGNIN"}async function lN(t,e,n){const r=z(t),s=Dr.credentialWithLink(e,n||No());return O(s._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),ml(r,s)}/**
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
 */async function uN(t,e){return nt(t,"POST","/v1/accounts:createAuthUri",ze(t,e))}/**
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
 */async function hN(t,e){const n=Md()?No():"http://localhost",r={identifier:e,continueUri:n},{signinMethods:s}=await uN(z(t),r);return s||[]}async function dN(t,e){const n=z(t),s={requestType:"VERIFY_EMAIL",idToken:await t.getIdToken()};e&&yl(n.auth,s,e);const{email:i}=await MC(n.auth,s);i!==t.email&&await t.reload()}async function fN(t,e,n){const r=z(t),i={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await t.getIdToken(),newEmail:e};n&&yl(r.auth,i,n);const{email:o}=await UC(r.auth,i);o!==t.email&&await t.reload()}/**
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
 */async function pN(t,e){return nt(t,"POST","/v1/accounts:update",e)}/**
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
 */async function mN(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=z(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await Jn(r,pN(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:c})=>c==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function gN(t,e){return Qw(z(t),e,null)}function yN(t,e){return Qw(z(t),null,e)}async function Qw(t,e,n){const{auth:r}=t,i={idToken:await t.getIdToken(),returnSecureToken:!0};e&&(i.email=e),n&&(i.password=n);const o=await Jn(t,$w(r,i));await t._updateTokensIfNecessary(o,!0)}/**
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
 */function vN(t){var e,n;if(!t)return null;const{providerId:r}=t,s=t.rawUserInfo?JSON.parse(t.rawUserInfo):{},i=t.isNewUser||t.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&(t!=null&&t.idToken)){const o=(n=(e=hl(t.idToken))===null||e===void 0?void 0:e.firebase)===null||n===void 0?void 0:n.sign_in_provider;if(o){const a=o!=="anonymous"&&o!=="custom"?o:null;return new Bs(i,a)}}if(!r)return null;switch(r){case"facebook.com":return new wN(i,s);case"github.com":return new IN(i,s);case"google.com":return new _N(i,s);case"twitter.com":return new bN(i,s,t.screenName||null);case"custom":case"anonymous":return new Bs(i,null);default:return new Bs(i,r,s)}}class Bs{constructor(e,n,r={}){this.isNewUser=e,this.providerId=n,this.profile=r}}class Yw extends Bs{constructor(e,n,r,s){super(e,n,r),this.username=s}}class wN extends Bs{constructor(e,n){super(e,"facebook.com",n)}}class IN extends Yw{constructor(e,n){super(e,"github.com",n,typeof(n==null?void 0:n.login)=="string"?n==null?void 0:n.login:null)}}class _N extends Bs{constructor(e,n){super(e,"google.com",n)}}class bN extends Yw{constructor(e,n,r){super(e,"twitter.com",n,r)}}function TN(t){const{user:e,_tokenResponse:n}=t;return e.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:vN(n)}class Hr{constructor(e,n){this.type=e,this.credential=n}static _fromIdtoken(e){return new Hr("enroll",e)}static _fromMfaPendingCredential(e){return new Hr("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var n,r;if(e!=null&&e.multiFactorSession){if(!((n=e.multiFactorSession)===null||n===void 0)&&n.pendingCredential)return Hr._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((r=e.multiFactorSession)===null||r===void 0)&&r.idToken)return Hr._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
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
 */class $d{constructor(e,n,r){this.session=e,this.hints=n,this.signInResolver=r}static _fromError(e,n){const r=et(e),s=n.customData._serverResponse,i=(s.mfaInfo||[]).map(a=>gl._fromServerResponse(r,a));O(s.mfaPendingCredential,r,"internal-error");const o=Hr._fromMfaPendingCredential(s.mfaPendingCredential);return new $d(o,i,async a=>{const c=await a._process(r,o);delete s.mfaInfo,delete s.mfaPendingCredential;const l=Object.assign(Object.assign({},s),{idToken:c.idToken,refreshToken:c.refreshToken});switch(n.operationType){case"signIn":const u=await sn._fromIdTokenResponse(r,n.operationType,l);return await r._updateCurrentUser(u.user),u;case"reauthenticate":return O(n.user,r,"internal-error"),sn._forOperation(n.user,n.operationType,l);default:ht(r,"internal-error")}})}async resolveSignIn(e){const n=e;return this.signInResolver(n)}}function EN(t,e){var n;const r=z(t),s=e;return O(e.customData.operationType,r,"argument-error"),O((n=s.customData._serverResponse)===null||n===void 0?void 0:n.mfaPendingCredential,r,"argument-error"),$d._fromError(r,s)}/**
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
 */function SN(t,e){return nt(t,"POST","/v2/accounts/mfaEnrollment:start",ze(t,e))}function AN(t,e){return nt(t,"POST","/v2/accounts/mfaEnrollment:finalize",ze(t,e))}function kN(t,e){return nt(t,"POST","/v2/accounts/mfaEnrollment:withdraw",ze(t,e))}class qd{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(n=>{n.mfaInfo&&(this.enrolledFactors=n.mfaInfo.map(r=>gl._fromServerResponse(e.auth,r)))})}static _fromUser(e){return new qd(e)}async getSession(){return Hr._fromIdtoken(await this.user.getIdToken())}async enroll(e,n){const r=e,s=await this.getSession(),i=await Jn(this.user,r._process(this.user.auth,s,n));return await this.user._updateTokensIfNecessary(i),this.user.reload()}async unenroll(e){const n=typeof e=="string"?e:e.uid,r=await this.user.getIdToken(),s=await Jn(this.user,kN(this.user.auth,{idToken:r,mfaEnrollmentId:n}));this.enrolledFactors=this.enrolledFactors.filter(({uid:i})=>i!==n),await this.user._updateTokensIfNecessary(s);try{await this.user.reload()}catch(i){if(i.code!=="auth/user-token-expired")throw i}}}const Kl=new WeakMap;function CN(t){const e=z(t);return Kl.has(e)||Kl.set(e,qd._fromUser(e)),Kl.get(e)}const _c="__sak";/**
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
 */class Jw{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(_c,"1"),this.storage.removeItem(_c),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function NN(){const t=Ne();return Fd(t)||Ei(t)}const RN=1e3,DN=10;class Xw extends Jw{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=NN()&&CC(),this.fallbackToPolling=Lw(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);kC()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,DN):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},RN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Xw.type="LOCAL";const Lu=Xw;/**
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
 */class Zw extends Jw{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Zw.type="SESSION";const as=Zw;/**
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
 */function ON(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class vl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new vl(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async l=>l(n.origin,i)),c=await ON(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}vl.receivers=[];/**
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
 */function aa(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class xN{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=aa("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(h){const d=h;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(d.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Ke(){return window}function PN(t){Ke().location.href=t}/**
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
 */function Bd(){return typeof Ke().WorkerGlobalScope<"u"&&typeof Ke().importScripts=="function"}async function MN(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function LN(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function FN(){return Bd()?self:null}/**
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
 */const eI="firebaseLocalStorageDb",UN=1,bc="firebaseLocalStorage",tI="fbase_key";class ca{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function wl(t,e){return t.transaction([bc],e?"readwrite":"readonly").objectStore(bc)}function VN(){const t=indexedDB.deleteDatabase(eI);return new ca(t).toPromise()}function Fu(){const t=indexedDB.open(eI,UN);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(bc,{keyPath:tI})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(bc)?e(r):(r.close(),await VN(),e(await Fu()))})})}async function rm(t,e,n){const r=wl(t,!0).put({[tI]:e,value:n});return new ca(r).toPromise()}async function $N(t,e){const n=wl(t,!1).get(e),r=await new ca(n).toPromise();return r===void 0?null:r.value}function sm(t,e){const n=wl(t,!0).delete(e);return new ca(n).toPromise()}const qN=800,BN=3;class nI{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Fu(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>BN)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Bd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=vl._getInstance(FN()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await MN(),!this.activeServiceWorker)return;this.sender=new xN(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||LN()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Fu();return await rm(e,_c,"1"),await sm(e,_c),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>rm(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>$N(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>sm(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=wl(s,!1).getAll();return new ca(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),qN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}nI.type="LOCAL";const Ma=nI;/**
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
 */function jN(t,e){return nt(t,"POST","/v2/accounts/mfaSignIn:start",ze(t,e))}function WN(t,e){return nt(t,"POST","/v2/accounts/mfaSignIn:finalize",ze(t,e))}/**
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
 */async function KN(t){return(await nt(t,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}/**
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
 */function HN(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function rI(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=ut("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",HN().appendChild(r)})}function sI(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */const zN=500,GN=6e4,ba=1e12;class QN{constructor(e){this.auth=e,this.counter=ba,this._widgets=new Map}render(e,n){const r=this.counter;return this._widgets.set(r,new YN(e,this.auth.name,n||{})),this.counter++,r}reset(e){var n;const r=e||ba;(n=this._widgets.get(r))===null||n===void 0||n.delete(),this._widgets.delete(r)}getResponse(e){var n;const r=e||ba;return((n=this._widgets.get(r))===null||n===void 0?void 0:n.getResponse())||""}async execute(e){var n;const r=e||ba;return(n=this._widgets.get(r))===null||n===void 0||n.execute(),""}}class YN{constructor(e,n,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const s=typeof e=="string"?document.getElementById(e):e;O(s,"argument-error",{appName:n}),this.container=s,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=JN(50);const{callback:e,"expired-callback":n}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,n)try{n()}catch{}this.isVisible&&this.execute()},GN)},zN))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function JN(t){const e=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<t;r++)e.push(n.charAt(Math.floor(Math.random()*n.length)));return e.join("")}/**
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
 */const Hl=sI("rcb"),XN=new ia(3e4,6e4),ZN="https://www.google.com/recaptcha/api.js?";class eR{constructor(){this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!Ke().grecaptcha}load(e,n=""){return O(tR(n),e,"argument-error"),this.shouldResolveImmediately(n)?Promise.resolve(Ke().grecaptcha):new Promise((r,s)=>{const i=Ke().setTimeout(()=>{s(ut(e,"network-request-failed"))},XN.get());Ke()[Hl]=()=>{Ke().clearTimeout(i),delete Ke()[Hl];const a=Ke().grecaptcha;if(!a){s(ut(e,"internal-error"));return}const c=a.render;a.render=(l,u)=>{const h=c(l,u);return this.counter++,h},this.hostLanguage=n,r(a)};const o=`${ZN}?${di({onload:Hl,render:"explicit",hl:n})}`;rI(o).catch(()=>{clearTimeout(i),s(ut(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){return!!Ke().grecaptcha&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function tR(t){return t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t)}class nR{async load(e){return new QN(e)}clearedOneInstance(){}}/**
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
 */const iI="recaptcha",rR={theme:"light",type:"image"};let sR=class{constructor(e,n=Object.assign({},rR),r){this.parameters=n,this.type=iI,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=et(r),this.isInvisible=this.parameters.size==="invisible",O(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const s=typeof e=="string"?document.getElementById(e):e;O(s,this.auth,"argument-error"),this.container=s,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new nR:new eR,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),n=this.getAssertedRecaptcha(),r=n.getResponse(e);return r||new Promise(s=>{const i=o=>{o&&(this.tokenChangeListeners.delete(i),s(o))};this.tokenChangeListeners.add(i),this.isInvisible&&n.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){O(!this.parameters.sitekey,this.auth,"argument-error"),O(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),O(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return n=>{if(this.tokenChangeListeners.forEach(r=>r(n)),typeof e=="function")e(n);else if(typeof e=="string"){const r=Ke()[e];typeof r=="function"&&r(n)}}}assertNotDestroyed(){O(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const n=document.createElement("div");e.appendChild(n),e=n}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){O(Md()&&!Bd(),this.auth,"internal-error"),await iR(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await KN(this.auth);O(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return O(this.recaptcha,this.auth,"internal-error"),this.recaptcha}};function iR(){let t=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}t=()=>e(),window.addEventListener("load",t)}).catch(e=>{throw t&&window.removeEventListener("load",t),e})}/**
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
 */class jd{constructor(e,n){this.verificationId=e,this.onConfirmation=n}confirm(e){const n=Jr._fromVerification(this.verificationId,e);return this.onConfirmation(n)}}async function oR(t,e,n){const r=et(t),s=await Il(r,e,z(n));return new jd(s,i=>ml(r,i))}async function aR(t,e,n){const r=z(t);await pl(!1,r,"phone");const s=await Il(r.auth,e,z(n));return new jd(s,i=>Hw(r,i))}async function cR(t,e,n){const r=z(t),s=await Il(r.auth,e,z(n));return new jd(s,i=>zw(r,i))}async function Il(t,e,n){var r;const s=await n.verify();try{O(typeof s=="string",t,"argument-error"),O(n.type===iI,t,"argument-error");let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){const o=i.session;if("phoneNumber"in i)return O(o.type==="enroll",t,"internal-error"),(await SN(t,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,recaptchaToken:s}})).phoneSessionInfo.sessionInfo;{O(o.type==="signin",t,"internal-error");const a=((r=i.multiFactorHint)===null||r===void 0?void 0:r.uid)||i.multiFactorUid;return O(a,t,"missing-multi-factor-info"),(await jN(t,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:s}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await BC(t,{phoneNumber:i.phoneNumber,recaptchaToken:s});return o}}finally{n._reset()}}async function lR(t,e){await Ud(z(t),e)}/**
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
 */let cs=class La{constructor(e){this.providerId=La.PROVIDER_ID,this.auth=et(e)}verifyPhoneNumber(e,n){return Il(this.auth,e,z(n))}static credential(e,n){return Jr._fromVerification(e,n)}static credentialFromResult(e){const n=e;return La.credentialFromTaggedObject(n)}static credentialFromError(e){return La.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:n,temporaryProof:r}=e;return n&&r?Jr._fromTokenResponse(n,r):null}};cs.PROVIDER_ID="phone";cs.PHONE_SIGN_IN_METHOD="phone";/**
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
 */function bs(t,e){return e?zt(e):(O(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Wd extends Si{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Kn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Kn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Kn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function uR(t){return Kw(t.auth,new Wd(t),t.bypassAuthState)}function hR(t){const{auth:e,user:n}=t;return O(n,e,"internal-error"),Ww(n,new Wd(t),t.bypassAuthState)}async function dR(t){const{auth:e,user:n}=t;return O(n,e,"internal-error"),Ud(n,new Wd(t),t.bypassAuthState)}/**
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
 */class oI{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return uR;case"linkViaPopup":case"linkViaRedirect":return dR;case"reauthViaPopup":case"reauthViaRedirect":return hR;default:ht(this.auth,"internal-error")}}resolve(e){ln(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ln(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const fR=new ia(2e3,1e4);async function pR(t,e,n){const r=et(t);Ti(t,e,nr);const s=bs(r,n);return new qn(r,"signInViaPopup",e,s).executeNotNull()}async function mR(t,e,n){const r=z(t);Ti(r.auth,e,nr);const s=bs(r.auth,n);return new qn(r.auth,"reauthViaPopup",e,s,r).executeNotNull()}async function gR(t,e,n){const r=z(t);Ti(r.auth,e,nr);const s=bs(r.auth,n);return new qn(r.auth,"linkViaPopup",e,s,r).executeNotNull()}class qn extends oI{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,qn.currentPopupAction&&qn.currentPopupAction.cancel(),qn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return O(e,this.auth,"internal-error"),e}async onExecution(){ln(this.filter.length===1,"Popup operations only handle one event");const e=aa();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ut(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ut(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,qn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ut(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,fR.get())};e()}}qn.currentPopupAction=null;/**
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
 */const yR="pendingRedirect",Fa=new Map;class vR extends oI{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Fa.get(this.auth._key());if(!e){try{const r=await wR(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Fa.set(this.auth._key(),e)}return this.bypassAuthState||Fa.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function wR(t,e){const n=cI(e),r=aI(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}async function Kd(t,e){return aI(t)._set(cI(e),"true")}function IR(){Fa.clear()}function aI(t){return zt(t._redirectPersistence)}function cI(t){return Yr(yR,t.config.apiKey,t.name)}/**
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
 */function _R(t,e,n){return bR(t,e,n)}async function bR(t,e,n){const r=et(t);Ti(t,e,nr);const s=bs(r,n);return await Kd(s,r),s._openRedirect(r,e,"signInViaRedirect")}function TR(t,e,n){return ER(t,e,n)}async function ER(t,e,n){const r=z(t);Ti(r.auth,e,nr);const s=bs(r.auth,n);await Kd(s,r.auth);const i=await lI(r);return s._openRedirect(r.auth,e,"reauthViaRedirect",i)}function SR(t,e,n){return AR(t,e,n)}async function AR(t,e,n){const r=z(t);Ti(r.auth,e,nr);const s=bs(r.auth,n);await pl(!1,r,e.providerId),await Kd(s,r.auth);const i=await lI(r);return s._openRedirect(r.auth,e,"linkViaRedirect",i)}async function kR(t,e){return await et(t)._initializationPromise,_l(t,e,!1)}async function _l(t,e,n=!1){const r=et(t),s=bs(r,e),o=await new vR(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function lI(t){const e=aa(`${t.uid}:::`);return t._redirectEventId=e,await t.auth._setRedirectUser(t),await t.auth._persistUserIfCurrent(t),e}/**
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
 */const CR=10*60*1e3;class uI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!NR(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!hI(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(ut(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=CR&&this.cachedEventUids.clear(),this.cachedEventUids.has(im(e))}saveEventToCache(e){this.cachedEventUids.add(im(e)),this.lastProcessedEventTime=Date.now()}}function im(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function hI({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function NR(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return hI(t);default:return!1}}/**
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
 */async function dI(t,e={}){return nt(t,"GET","/v1/projects",e)}/**
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
 */const RR=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,DR=/^https?/;async function OR(t){if(t.config.emulator)return;const{authorizedDomains:e}=await dI(t);for(const n of e)try{if(xR(n))return}catch{}ht(t,"unauthorized-domain")}function xR(t){const e=No(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!DR.test(n))return!1;if(RR.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const PR=new ia(3e4,6e4);function om(){const t=Ke().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function MR(t){return new Promise((e,n)=>{var r,s,i;function o(){om(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{om(),n(ut(t,"network-request-failed"))},timeout:PR.get()})}if(!((s=(r=Ke().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=Ke().gapi)===null||i===void 0)&&i.load)o();else{const a=sI("iframefcb");return Ke()[a]=()=>{gapi.load?o():n(ut(t,"network-request-failed"))},rI(`https://apis.google.com/js/api.js?onload=${a}`).catch(c=>n(c))}}).catch(e=>{throw Ua=null,e})}let Ua=null;function LR(t){return Ua=Ua||MR(t),Ua}/**
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
 */const FR=new ia(5e3,15e3),UR="__/auth/iframe",VR="emulator/auth/iframe",$R={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},qR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function BR(t){const e=t.config;O(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Ld(e,VR):`https://${t.config.authDomain}/${UR}`,r={apiKey:e.apiKey,appName:t.name,v:ds},s=qR.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${di(r).slice(1)}`}async function jR(t){const e=await LR(t),n=Ke().gapi;return O(n,t,"internal-error"),e.open({where:document.body,url:BR(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:$R,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=ut(t,"network-request-failed"),a=Ke().setTimeout(()=>{i(o)},FR.get());function c(){Ke().clearTimeout(a),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const WR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},KR=500,HR=600,zR="_blank",GR="http://localhost";class am{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function QR(t,e,n,r=KR,s=HR){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},WR),{width:r.toString(),height:s.toString(),top:i,left:o}),l=Ne().toLowerCase();n&&(a=Ow(l)?zR:n),Dw(l)&&(e=e||GR,c.scrollbars="yes");const u=Object.entries(c).reduce((d,[f,y])=>`${d}${f}=${y},`,"");if(AC(l)&&a!=="_self")return YR(e||"",a),new am(null);const h=window.open(e||"",a,u);O(h,t,"popup-blocked");try{h.focus()}catch{}return new am(h)}function YR(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const JR="__/auth/handler",XR="emulator/auth/handler";function Uu(t,e,n,r,s,i){O(t.config.authDomain,t,"auth-domain-config-required"),O(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:ds,eventId:s};if(e instanceof nr){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",uT(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[c,l]of Object.entries(i||{}))o[c]=l}if(e instanceof Ai){const c=e.getScopes().filter(l=>l!=="");c.length>0&&(o.scopes=c.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const c of Object.keys(a))a[c]===void 0&&delete a[c];return`${ZR(t)}?${di(a).slice(1)}`}function ZR({config:t}){return t.emulator?Ld(t,XR):`https://${t.authDomain}/${JR}`}/**
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
 */const zl="webStorageSupport";class eD{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=as,this._completeRedirectFn=_l}async _openPopup(e,n,r,s){var i;ln((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=Uu(e,n,r,No(),s);return QR(e,o,aa())}async _openRedirect(e,n,r,s){return await this._originValidation(e),PN(Uu(e,n,r,No(),s)),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(ln(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await jR(e),r=new uI(e);return n.register("authEvent",s=>(O(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(zl,{type:zl},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[zl];o!==void 0&&n(!!o),ht(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=OR(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Lw()||Fd()||Ei()}}const tD=eD;class nD{constructor(e){this.factorId=e}_process(e,n,r){switch(n.type){case"enroll":return this._finalizeEnroll(e,n.credential,r);case"signin":return this._finalizeSignIn(e,n.credential);default:return En("unexpected MultiFactorSessionType")}}}class Hd extends nD{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Hd(e)}_finalizeEnroll(e,n,r){return AN(e,{idToken:n,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,n){return WN(e,{mfaPendingCredential:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class fI{constructor(){}static assertion(e){return Hd._fromCredential(e)}}fI.FACTOR_ID="phone";var cm="@firebase/auth",lm="0.19.4";/**
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
 */class rD{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{var s;e(((s=r)===null||s===void 0?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){O(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function sD(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function iD(t){Zr(new Gn("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),{apiKey:s,authDomain:i}=r.options;return(o=>{O(s&&!s.includes(":"),"invalid-api-key",{appName:o.name}),O(!(i!=null&&i.includes(":")),"argument-error",{appName:o.name});const a={apiKey:s,authDomain:i,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Fw(t)},c=new NC(o,a);return cC(c,n),c})(r)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Zr(new Gn("auth-internal",e=>{const n=et(e.getProvider("auth").getImmediate());return(r=>new rD(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),An(cm,lm,sD(t)),An(cm,lm,"esm2017")}iD("Browser");/**
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
 */function ls(){return window}/**
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
 */const oD=2e3;async function aD(t,e,n){var r;const{BuildInfo:s}=ls();ln(e.sessionId,"AuthEvent did not contain a session ID");const i=await dD(e.sessionId),o={};return Ei()?o.ibi=s.packageName:oa()?o.apn=s.packageName:ht(t,"operation-not-supported-in-this-environment"),s.displayName&&(o.appDisplayName=s.displayName),o.sessionId=i,Uu(t,n,e.type,void 0,(r=e.eventId)!==null&&r!==void 0?r:void 0,o)}async function cD(t){const{BuildInfo:e}=ls(),n={};Ei()?n.iosBundleId=e.packageName:oa()?n.androidPackageName=e.packageName:ht(t,"operation-not-supported-in-this-environment"),await dI(t,n)}function lD(t){const{cordova:e}=ls();return new Promise(n=>{e.plugins.browsertab.isAvailable(r=>{let s=null;r?e.plugins.browsertab.openUrl(t):s=e.InAppBrowser.open(t,SC()?"_blank":"_system","location=yes"),n(s)})})}async function uD(t,e,n){const{cordova:r}=ls();let s=()=>{};try{await new Promise((i,o)=>{let a=null;function c(){var h;i();const d=(h=r.plugins.browsertab)===null||h===void 0?void 0:h.close;typeof d=="function"&&d(),typeof(n==null?void 0:n.close)=="function"&&n.close()}function l(){a||(a=window.setTimeout(()=>{o(ut(t,"redirect-cancelled-by-user"))},oD))}function u(){(document==null?void 0:document.visibilityState)==="visible"&&l()}e.addPassiveListener(c),document.addEventListener("resume",l,!1),oa()&&document.addEventListener("visibilitychange",u,!1),s=()=>{e.removePassiveListener(c),document.removeEventListener("resume",l,!1),document.removeEventListener("visibilitychange",u,!1),a&&window.clearTimeout(a)}})}finally{s()}}function hD(t){var e,n,r,s,i,o,a,c,l,u;const h=ls();O(typeof((e=h==null?void 0:h.universalLinks)===null||e===void 0?void 0:e.subscribe)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),O(typeof((n=h==null?void 0:h.BuildInfo)===null||n===void 0?void 0:n.packageName)<"u",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),O(typeof((i=(s=(r=h==null?void 0:h.cordova)===null||r===void 0?void 0:r.plugins)===null||s===void 0?void 0:s.browsertab)===null||i===void 0?void 0:i.openUrl)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),O(typeof((c=(a=(o=h==null?void 0:h.cordova)===null||o===void 0?void 0:o.plugins)===null||a===void 0?void 0:a.browsertab)===null||c===void 0?void 0:c.isAvailable)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),O(typeof((u=(l=h==null?void 0:h.cordova)===null||l===void 0?void 0:l.InAppBrowser)===null||u===void 0?void 0:u.open)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}async function dD(t){const e=fD(t),n=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n)).map(s=>s.toString(16).padStart(2,"0")).join("")}function fD(t){if(ln(/[0-9a-zA-Z]+/.test(t),"Can only convert alpha-numeric strings"),typeof TextEncoder<"u")return new TextEncoder().encode(t);const e=new ArrayBuffer(t.length),n=new Uint8Array(e);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return n}/**
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
 */const pD=20;class mD extends uI{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInialized(),this.passiveListeners.forEach(n=>n(e)),super.onEvent(e)}async initialized(){await this.initPromise}}function gD(t,e,n=null){return{type:e,eventId:n,urlResponse:null,sessionId:wD(),postBody:null,tenantId:t.tenantId,error:ut(t,"no-auth-event")}}function yD(t,e){return Vu()._set($u(t),e)}async function um(t){const e=await Vu()._get($u(t));return e&&await Vu()._remove($u(t)),e}function vD(t,e){var n,r;const s=_D(e);if(s.includes("/__/auth/callback")){const i=Va(s),o=i.firebaseError?ID(decodeURIComponent(i.firebaseError)):null,a=(r=(n=o==null?void 0:o.code)===null||n===void 0?void 0:n.split("auth/"))===null||r===void 0?void 0:r[1],c=a?ut(a):null;return c?{type:t.type,eventId:t.eventId,tenantId:t.tenantId,error:c,urlResponse:null,sessionId:null,postBody:null}:{type:t.type,eventId:t.eventId,tenantId:t.tenantId,sessionId:t.sessionId,urlResponse:s,postBody:null}}return null}function wD(){const t=[],e="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<pD;n++){const r=Math.floor(Math.random()*e.length);t.push(e.charAt(r))}return t.join("")}function Vu(){return zt(Lu)}function $u(t){return Yr("authEvent",t.config.apiKey,t.name)}function ID(t){try{return JSON.parse(t)}catch{return null}}function _D(t){const e=Va(t),n=e.link?decodeURIComponent(e.link):void 0,r=Va(n).link,s=e.deep_link_id?decodeURIComponent(e.deep_link_id):void 0;return Va(s).link||s||r||n||t}function Va(t){if(!(t!=null&&t.includes("?")))return{};const[e,...n]=t.split("?");return Rs(n.join("?"))}/**
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
 */const bD=500;class TD{constructor(){this._redirectPersistence=as,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=_l}async _initialize(e){const n=e._key();let r=this.eventManagers.get(n);return r||(r=new mD(e),this.eventManagers.set(n,r),this.attachCallbackListeners(e,r)),r}_openPopup(e){ht(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,n,r,s){hD(e);const i=await this._initialize(e);await i.initialized(),i.resetRedirect(),IR(),await this._originValidation(e);const o=gD(e,r,s);await yD(e,o);const a=await aD(e,o,n),c=await lD(a);return uD(e,i,c)}_isIframeWebStorageSupported(e,n){throw new Error("Method not implemented.")}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=cD(e)),this.originValidationPromises[n]}attachCallbackListeners(e,n){const{universalLinks:r,handleOpenURL:s,BuildInfo:i}=ls(),o=setTimeout(async()=>{await um(e),n.onEvent(hm())},bD),a=async u=>{clearTimeout(o);const h=await um(e);let d=null;h&&(u!=null&&u.url)&&(d=vD(h,u.url)),n.onEvent(d||hm())};typeof r<"u"&&typeof r.subscribe=="function"&&r.subscribe(null,a);const c=s,l=`${i.packageName.toLowerCase()}://`;ls().handleOpenURL=async u=>{if(u.toLowerCase().startsWith(l)&&a({url:u}),typeof c=="function")try{c(u)}catch(h){console.error(h)}}}}const ED=TD;function hm(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:ut("no-auth-event")}}/**
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
 */function SD(t,e){et(t)._logFramework(e)}var AD="@firebase/auth-compat",kD="0.2.4";/**
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
 */const CD=1e3;function Tc(){var t;return((t=self==null?void 0:self.location)===null||t===void 0?void 0:t.protocol)||null}function ND(){return Tc()==="http:"||Tc()==="https:"}function pI(t=Ne()){return!!((Tc()==="file:"||Tc()==="ionic:")&&t.toLowerCase().match(/iphone|ipad|ipod|android/))}function RD(){return xc()||ch()}function DD(){return uh()&&(document==null?void 0:document.documentMode)===11}function OD(t=Ne()){return/Edge\/\d+/.test(t)}function xD(t=Ne()){return DD()||OD(t)}function mI(){try{const t=self.localStorage,e=aa();if(t)return t.setItem(e,"1"),t.removeItem(e),xD()?Qa():!0}catch{return zd()&&Qa()}return!1}function zd(){return typeof global<"u"&&"WorkerGlobalScope"in global&&"importScripts"in global}function Gl(){return(ND()||lh()||pI())&&!RD()&&mI()&&!zd()}function gI(){return pI()&&typeof document<"u"}async function PD(){return gI()?new Promise(t=>{const e=setTimeout(()=>{t(!1)},CD);document.addEventListener("deviceready",()=>{clearTimeout(e),t(!0)})}):!1}/**
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
 */const Wt={LOCAL:"local",NONE:"none",SESSION:"session"},Li=O,yI="persistence";function MD(t,e){if(Li(Object.values(Wt).includes(e),t,"invalid-persistence-type"),xc()){Li(e!==Wt.SESSION,t,"unsupported-persistence-type");return}if(ch()){Li(e===Wt.NONE,t,"unsupported-persistence-type");return}if(zd()){Li(e===Wt.NONE||e===Wt.LOCAL&&Qa(),t,"unsupported-persistence-type");return}Li(e===Wt.NONE||mI(),t,"unsupported-persistence-type")}async function qu(t){await t._initializationPromise;const e=vI(),n=Yr(yI,t.config.apiKey,t.name);e!=null&&e.sessionStorage&&e.sessionStorage.setItem(n,t._getPersistence())}function LD(t,e){const n=vI();if(!(n!=null&&n.sessionStorage))return[];const r=Yr(yI,t,e);switch(n.sessionStorage.getItem(r)){case Wt.NONE:return[Oo];case Wt.LOCAL:return[Ma,as];case Wt.SESSION:return[as];default:return[]}}function vI(){return typeof window<"u"?window:null}/**
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
 */const FD=O;class dr{constructor(){this.browserResolver=zt(tD),this.cordovaResolver=zt(ED),this.underlyingResolver=null,this._redirectPersistence=as,this._completeRedirectFn=_l}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,n,r,s){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,n,r,s)}async _openRedirect(e,n,r,s){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,n,r,s)}_isIframeWebStorageSupported(e,n){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,n)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return gI()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return FD(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await PD();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}/**
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
 */function wI(t){return t.unwrap()}function UD(t){return t.wrapped()}/**
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
 */function VD(t){return II(t)}function $D(t,e){var n;const r=(n=e.customData)===null||n===void 0?void 0:n._tokenResponse;if(e.code==="auth/multi-factor-auth-required"){const s=e;s.resolver=new qD(t,EN(t,e))}else if(r){const s=II(e),i=e;s&&(i.credential=s,i.tenantId=r.tenantId||void 0,i.email=r.email||void 0,i.phoneNumber=r.phoneNumber||void 0)}}function II(t){const{_tokenResponse:e}=t instanceof tn?t.customData:t;if(!e)return null;if(!(t instanceof tn)&&"temporaryProof"in e&&"phoneNumber"in e)return cs.credentialFromResult(t);const n=e.providerId;if(!n||n===Mi.PASSWORD)return null;let r;switch(n){case Mi.GOOGLE:r=In;break;case Mi.FACEBOOK:r=wn;break;case Mi.GITHUB:r=_n;break;case Mi.TWITTER:r=bn;break;default:const{oauthIdToken:s,oauthAccessToken:i,oauthTokenSecret:o,pendingToken:a,nonce:c}=e;return!i&&!o&&!s&&!a?null:a?n.startsWith("saml.")?ui._create(n,a):Pn._fromParams({providerId:n,signInMethod:n,pendingToken:a,idToken:s,accessToken:i}):new qs(n).credential({idToken:s,accessToken:i,rawNonce:c})}return t instanceof tn?r.credentialFromError(t):r.credentialFromResult(t)}function Lt(t,e){return e.catch(n=>{throw n instanceof tn&&$D(t,n),n}).then(n=>{const r=n.operationType,s=n.user;return{operationType:r,credential:VD(n),additionalUserInfo:TN(n),user:Bn.getOrCreate(s)}})}async function Bu(t,e){const n=await e;return{verificationId:n.verificationId,confirm:r=>Lt(t,n.confirm(r))}}class qD{constructor(e,n){this.resolver=n,this.auth=UD(e)}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return Lt(wI(this.auth),this.resolver.resolveSignIn(e))}}/**
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
 */class Bn{constructor(e){this._delegate=e,this.multiFactor=CN(e)}static getOrCreate(e){return Bn.USER_MAP.has(e)||Bn.USER_MAP.set(e,new Bn(e)),Bn.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return Lt(this.auth,Hw(this._delegate,e))}async linkWithPhoneNumber(e,n){return Bu(this.auth,aR(this._delegate,e,n))}async linkWithPopup(e){return Lt(this.auth,gR(this._delegate,e,dr))}async linkWithRedirect(e){return await qu(et(this.auth)),SR(this._delegate,e,dr)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return Lt(this.auth,zw(this._delegate,e))}reauthenticateWithPhoneNumber(e,n){return Bu(this.auth,cR(this._delegate,e,n))}reauthenticateWithPopup(e){return Lt(this.auth,mR(this._delegate,e,dr))}async reauthenticateWithRedirect(e){return await qu(et(this.auth)),TR(this._delegate,e,dr)}sendEmailVerification(e){return dN(this._delegate,e)}async unlink(e){return await XC(this._delegate,e),this}updateEmail(e){return gN(this._delegate,e)}updatePassword(e){return yN(this._delegate,e)}updatePhoneNumber(e){return lR(this._delegate,e)}updateProfile(e){return mN(this._delegate,e)}verifyBeforeUpdateEmail(e,n){return fN(this._delegate,e,n)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}Bn.USER_MAP=new WeakMap;/**
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
 */const Fi=O;class ju{constructor(e,n){if(this.app=e,n.isInitialized()){this._delegate=n.getImmediate(),this.linkUnderlyingAuth();return}const{apiKey:r}=e.options;Fi(r,"invalid-api-key",{appName:e.name});let s=[Oo];if(typeof window<"u"){s=LD(r,e.name);for(const o of[Ma,Lu,as])s.includes(o)||s.push(o)}Fi(r,"invalid-api-key",{appName:e.name});const i=typeof window<"u"?dr:void 0;this._delegate=n.initialize({options:{persistence:s,popupRedirectResolver:i}}),this._delegate._updateErrorMap(oC),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?Bn.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,n){RC(this._delegate,e,n)}applyActionCode(e){return rN(this._delegate,e)}checkActionCode(e){return Gw(this._delegate,e)}confirmPasswordReset(e,n){return nN(this._delegate,e,n)}async createUserWithEmailAndPassword(e,n){return Lt(this._delegate,iN(this._delegate,e,n))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return hN(this._delegate,e)}isSignInWithEmailLink(e){return cN(this._delegate,e)}async getRedirectResult(){Fi(Gl(),this._delegate,"operation-not-supported-in-this-environment");const e=await kR(this._delegate,dr);return e?Lt(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){SD(this._delegate,e)}onAuthStateChanged(e,n,r){const{next:s,error:i,complete:o}=dm(e,n,r);return this._delegate.onAuthStateChanged(s,i,o)}onIdTokenChanged(e,n,r){const{next:s,error:i,complete:o}=dm(e,n,r);return this._delegate.onIdTokenChanged(s,i,o)}sendSignInLinkToEmail(e,n){return aN(this._delegate,e,n)}sendPasswordResetEmail(e,n){return tN(this._delegate,e,n||void 0)}async setPersistence(e){MD(this._delegate,e);let n;switch(e){case Wt.SESSION:n=as;break;case Wt.LOCAL:n=await zt(Ma)._isAvailable()?Ma:Lu;break;case Wt.NONE:n=Oo;break;default:return ht("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(n)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return Lt(this._delegate,JC(this._delegate))}signInWithCredential(e){return Lt(this._delegate,ml(this._delegate,e))}signInWithCustomToken(e){return Lt(this._delegate,eN(this._delegate,e))}signInWithEmailAndPassword(e,n){return Lt(this._delegate,oN(this._delegate,e,n))}signInWithEmailLink(e,n){return Lt(this._delegate,lN(this._delegate,e,n))}signInWithPhoneNumber(e,n){return Bu(this._delegate,oR(this._delegate,e,n))}async signInWithPopup(e){return Fi(Gl(),this._delegate,"operation-not-supported-in-this-environment"),Lt(this._delegate,pR(this._delegate,e,dr))}async signInWithRedirect(e){return Fi(Gl(),this._delegate,"operation-not-supported-in-this-environment"),await qu(this._delegate),_R(this._delegate,e,dr)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return sN(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}ju.Persistence=Wt;function dm(t,e,n){let r=t;typeof t!="function"&&({next:r,error:e,complete:n}=t);const s=r;return{next:o=>s(o&&Bn.getOrCreate(o)),error:e,complete:n}}/**
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
 */class Gd{constructor(){this.providerId="phone",this._delegate=new cs(wI(Gt.auth()))}static credential(e,n){return cs.credential(e,n)}verifyPhoneNumber(e,n){return this._delegate.verifyPhoneNumber(e,n)}unwrap(){return this._delegate}}Gd.PHONE_SIGN_IN_METHOD=cs.PHONE_SIGN_IN_METHOD;Gd.PROVIDER_ID=cs.PROVIDER_ID;/**
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
 */const BD=O;class jD{constructor(e,n,r=Gt.app()){var s;BD((s=r.options)===null||s===void 0?void 0:s.apiKey,"invalid-api-key",{appName:r.name}),this._delegate=new sR(e,n,r.auth()),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}/**
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
 */const WD="auth-compat";function KD(t){t.INTERNAL.registerComponent(new Gn(WD,e=>{const n=e.getProvider("app-compat").getImmediate(),r=e.getProvider("auth");return new ju(n,r)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:As.EMAIL_SIGNIN,PASSWORD_RESET:As.PASSWORD_RESET,RECOVER_EMAIL:As.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:As.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:As.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:As.VERIFY_EMAIL}},EmailAuthProvider:Dr,FacebookAuthProvider:wn,GithubAuthProvider:_n,GoogleAuthProvider:In,OAuthProvider:qs,SAMLAuthProvider:wc,PhoneAuthProvider:Gd,PhoneMultiFactorGenerator:fI,RecaptchaVerifier:jD,TwitterAuthProvider:bn,Auth:ju,AuthCredential:Si,Error:tn}).setInstantiationMode("LAZY").setMultipleInstances(!1)),t.registerVersion(AD,kD)}KD(Gt);const HD={apiKey:"AIzaSyArnrHZPft_F6a-5sNUxQNViFddzshIlEo",authDomain:"msdatabase-e2d25.firebaseapp.com",projectId:"msdatabase-e2d25",storageBucket:"msdatabase-e2d25.firebasestorage.app",messagingSenderId:"525846107898",appId:"1:525846107898:web:41a6740fa50a0e84b91b43",measurementId:"G-0VV0VG0LT6"};Gt.apps.length||Gt.initializeApp(HD);const mt=Gt.firestore(),Qd=Gt.auth(),zD=()=>{const t=new Gt.auth.GoogleAuthProvider;return Qd.signInWithPopup(t).catch(e=>{throw console.error("ログインエラーの詳細:",e),e})},GD=()=>Qd.signOut(),QD=t=>Qd.onAuthStateChanged(t),Ql={loginWithGoogle:zD,logout:GD,onAuthStateChanged:QD},YD=t=>{if(!t)throw new Error("User ID is required to load initial data.");try{return Promise.all([mt.collection("accounts").get(),mt.collection("character_masters").get(),mt.collection("itemMasters").get(),mt.collectionGroup("owned_characters").get(),mt.collection("gachaMasters").get(),mt.collection("teams").where("userId","==",t).orderBy("createdAt","desc").get()])}catch(e){throw console.error("Database: Failed to load initial data.",e),e}},JD=async t=>{const[e,n,r,s,i,o]=await YD(t),a=e.docs.map(T=>{const A=T.data();return{id:T.id,name:A.Name||`アカウント${A.id}`,numericId:A.id,indexNumber:A.indexNumber}}).sort((T,A)=>(T.numericId||999)-(A.numericId||999)),c=n.docs.map(T=>({...T.data(),id:T.id})).sort((T,A)=>(T.indexNumber||999999)-(A.indexNumber||999999)),l=new Map(c.map(T=>[T.id,T])),u=r.docs.map(T=>({...T.data(),id:Number(T.data().id)})).sort((T,A)=>T.id-A.id),h=new Map(u.map(T=>[T.id,T.name])),d=i.docs.map(T=>T.data()).sort((T,A)=>T.id-A.id),f=o.docs.map(T=>({...T.data(),id:T.id})),y=new Map,S=new Map;return s.forEach(T=>{const A=T.data(),w=T.ref.parent.parent.id,_=`${A.characterMasterId}-${w}`;S.set(_,(S.get(_)||0)+1),y.has(w)||y.set(w,[]),y.get(w).push({...A,id:T.id})}),{accounts:a,characterMasters:c,characterMastersMap:l,itemMasters:u,itemMastersMap:h,gachaMasters:d,teams:f,ownedCharactersData:y,ownedCountMap:S}},XD=(t,e)=>mt.collection("accounts").doc(t).collection("owned_characters").add(e),ZD=(t,e,n)=>mt.collection("accounts").doc(t).collection("owned_characters").doc(e).update({items:n}),eO=(t,e,n)=>{const r=mt.batch(),s=mt.collection("accounts").doc(t).collection("owned_characters").doc(e.id),i=mt.collection("accounts").doc(t).collection("owned_characters").doc(n.id);return r.update(s,{items:e.items}),r.update(i,{items:n.items}),r.commit()},tO=t=>mt.collection("character_masters").add(t),nO=(t,e)=>mt.collection("character_masters").doc(t).update(e),rO=(t,e)=>t?mt.collection("teams").doc(t).update(e):mt.collection("teams").add(e),sO=t=>mt.collection("teams").doc(t).delete(),Ar={loadAndProcessInitialData:JD,addOwnedCharacter:XD,updateCharacterItems:ZD,moveCharacterItems:eO,addCharacterMaster:tO,updateCharacterMaster:nO,saveTeam:rO,deleteTeam:sO},_I=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},iO={id:"auth-container"},oO={key:0},aO={key:1},cO={__name:"AuthStatus",props:{user:{type:Object,default:null}},emits:["login","logout"],setup(t,{emit:e}){const n=e,r=()=>{n("login")},s=()=>{n("logout")};return(i,o)=>(M(),U("div",iO,[t.user?(M(),U("div",oO,[m("p",null,"ようこそ, "+Q(t.user.displayName)+" さん",1),m("button",{onClick:s},"ログアウト")])):(M(),U("div",aO,[o[0]||(o[0]=m("p",null,"データを表示・編集するにはログインしてください。",-1)),m("button",{onClick:r},"Googleでログイン")]))]))}},lO=_I(cO,[["__scopeId","data-v-a723596e"]]),uO={id:"account-controls"},hO=["value"],dO={__name:"AccountSelector",props:{accounts:{type:Array,required:!0},modelValue:{type:String,default:null},visible:{type:Boolean,default:!1}},emits:["update:modelValue"],setup(t,{emit:e}){const n=t,r=e,s=Ct({get(){return n.modelValue},set(i){r("update:modelValue",i)}});return(i,o)=>Z((M(),U("div",uO,[o[1]||(o[1]=m("label",{for:"account-selector"},"管理対象アカウント:",-1)),Z(m("select",{id:"account-selector","onUpdate:modelValue":o[0]||(o[0]=a=>s.value=a)},[(M(!0),U(re,null,fe(t.accounts,a=>(M(),U("option",{key:a.id,value:a.id},Q(a.name),9,hO))),128))],512),[[Pe,s.value]])],512)),[[Ur,t.visible]])}},fO=_I(dO,[["__scopeId","data-v-467b9c2f"]]),pO={id:"tab-view-all",class:"tab-content"},mO={class:"search-filters"},gO=["value"],yO=["value"],vO=["value"],wO=["value"],IO=["value"],_O={class:"filter-buttons"},bO={id:"status-bar"},TO={style:{"overflow-x":"auto"}},EO={id:"all-characters-table"},SO={rowspan:"2"},AO={rowspan:"2"},kO={rowspan:"2"},CO={key:0},NO=["colspan"],RO={key:1},DO=["colspan"],OO=["innerHTML"],xO=["innerHTML"],PO={__name:"ViewAllCharactersTab",props:{dataLoaded:{type:Boolean,required:!0},accounts:{type:Array,required:!0},characterMasters:{type:Array,required:!0},itemMasters:{type:Array,required:!0},gachaMasters:{type:Array,required:!0},ownedCountMap:{type:Map,required:!0},ownedCharactersData:{type:Map,required:!0},itemMastersMap:{type:Map,required:!0}},setup(t){const e=t,n=Oe(!1),r=()=>({charSearch:"",element:"",itemSearch:"",type:"",gachaSearch:"",totalOwnership:"",account:"",ownership:""}),s=Rn(r()),i=Ct(()=>Array.from(new Set(e.characterMasters.map(h=>h.type).filter(Boolean))).sort()),o=Ct(()=>{if(!e.dataLoaded)return[];const{charSearch:h,element:d,itemSearch:f,type:y,gachaSearch:S,totalOwnership:T,account:A,ownership:w}=s,v=h.toLowerCase(),_=f?Number(f):null;return e.characterMasters.filter(P=>{if(v&&!P.monsterName.toLowerCase().includes(v)&&!(P.indexNumber+"").includes(v)||d&&P.element!==d)return!1;if(y){if(y==="恒常_or_限定"){if(P.type!=="恒常"&&P.type!=="限定")return!1}else if(P.type!==y)return!1}if(S&&(P.ejectionGacha||"")!==S)return!1;if(_){let q=!1;const oe=A||null;if(oe)q=(e.ownedCharactersData.get(oe)||[]).some(Ee=>{var Se;return Ee.characterMasterId===P.id&&((Se=Ee.items)==null?void 0:Se.some(ne=>Number(ne)===_))});else for(const Ee of e.ownedCharactersData.values())if(Ee.some(Se=>{var ne;return Se.characterMasterId===P.id&&((ne=Se.items)==null?void 0:ne.some(ae=>Number(ae)===_))})){q=!0;break}if(!q)return!1}const X=e.accounts.reduce((q,oe)=>q+a(P.id,oe.id),0);if(T==="all_unowned"&&X>0||T==="four_or_more"&&X<4||T==="one_in_each"&&!e.accounts.every(q=>a(P.id,q.id)>=1))return!1;if(A&&w){const q=a(P.id,A);if(w==="owned"&&q===0||w==="unowned"&&q>0||w==="one"&&q!==1||w==="two"&&q!==2)return!1}return!0})}),a=(h,d)=>e.ownedCountMap.get(`${h}-${d}`)||0,c=(h,d,f)=>{const y=(e.ownedCharactersData.get(d)||[]).filter(T=>T.characterMasterId===h);if(!y||y.length<=f)return"—";const S=(y[f].items||[]).map(T=>e.itemMastersMap.get(Number(T))).filter(Boolean);return S.length>0?"✔️<br>"+S.join("<br>"):"✔️"},l=(h,d,f)=>a(h,d)>=f?"status-owned":"status-unowned",u=()=>{Object.assign(s,r())};return(h,d)=>(M(),U("div",pO,[d[30]||(d[30]=m("h2",null,"所持状況一覧",-1)),m("div",mO,[m("div",null,[d[9]||(d[9]=m("label",null,"キャラクター名:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":d[0]||(d[0]=f=>s.charSearch=f),placeholder:"名前 or 図鑑番号"},null,512),[[gt,s.charSearch,void 0,{lazy:!0}]])]),m("div",null,[d[11]||(d[11]=m("label",null,"属性:",-1)),Z(m("select",{"onUpdate:modelValue":d[1]||(d[1]=f=>s.element=f)},[d[10]||(d[10]=m("option",{value:""},"すべて",-1)),(M(),U(re,null,fe(["火","水","木","光","闇"],f=>m("option",{key:f,value:f},Q(f),9,gO)),64))],512),[[Pe,s.element]])]),m("div",null,[d[13]||(d[13]=m("label",null,"アイテム名:",-1)),Z(m("select",{"onUpdate:modelValue":d[2]||(d[2]=f=>s.itemSearch=f)},[d[12]||(d[12]=m("option",{value:""},"すべて",-1)),(M(!0),U(re,null,fe(t.itemMasters,f=>(M(),U("option",{key:f.id,value:f.id},Q(f.name),9,yO))),128))],512),[[Pe,s.itemSearch]])]),m("div",null,[d[16]||(d[16]=m("label",null,"分類 (Type):",-1)),Z(m("select",{"onUpdate:modelValue":d[3]||(d[3]=f=>s.type=f)},[d[14]||(d[14]=m("option",{value:""},"すべて",-1)),d[15]||(d[15]=m("option",{value:"恒常_or_限定"},"恒常 or 限定",-1)),(M(!0),U(re,null,fe(i.value,f=>(M(),U("option",{key:f,value:f},Q(f),9,vO))),128))],512),[[Pe,s.type]])]),m("div",null,[d[18]||(d[18]=m("label",null,"排出ガチャ:",-1)),Z(m("select",{"onUpdate:modelValue":d[4]||(d[4]=f=>s.gachaSearch=f)},[d[17]||(d[17]=m("option",{value:""},"すべて",-1)),(M(!0),U(re,null,fe(t.gachaMasters,f=>(M(),U("option",{key:f.id,value:f.name},Q(f.name),9,wO))),128))],512),[[Pe,s.gachaSearch]])]),m("div",null,[d[20]||(d[20]=m("label",null,"全体の所持状況:",-1)),Z(m("select",{"onUpdate:modelValue":d[5]||(d[5]=f=>s.totalOwnership=f)},d[19]||(d[19]=[m("option",{value:""},"すべて",-1),m("option",{value:"all_unowned"},"全アカウントで未所持 (合計0体)",-1),m("option",{value:"four_or_more"},"全アカウントで合計4体以上",-1),m("option",{value:"one_in_each"},"各アカウントで1体以上所持",-1)]),512),[[Pe,s.totalOwnership]])]),d[25]||(d[25]=m("div",{style:{"flex-basis":"100%","border-top":"1px dashed #ccc","padding-top":"15px","margin-top":"10px"}},[m("label",{style:{"font-weight":"normal"}},"--- 単一アカウントでの絞り込み ---")],-1)),m("div",null,[d[22]||(d[22]=m("label",null,"アカウント:",-1)),Z(m("select",{"onUpdate:modelValue":d[6]||(d[6]=f=>s.account=f)},[d[21]||(d[21]=m("option",{value:""},"指定しない",-1)),(M(!0),U(re,null,fe(t.accounts,f=>(M(),U("option",{key:f.id,value:f.id},Q(f.name),9,IO))),128))],512),[[Pe,s.account]])]),m("div",null,[d[24]||(d[24]=m("label",null,"所持状況 (指定アカウント内):",-1)),Z(m("select",{"onUpdate:modelValue":d[7]||(d[7]=f=>s.ownership=f)},d[23]||(d[23]=[hb('<option value="">すべて</option><option value="owned">所持</option><option value="unowned">未所持</option><option value="one">1体所持</option><option value="two">2体所持</option>',5)]),512),[[Pe,s.ownership]])])]),m("div",_O,[m("button",{onClick:u},"リセット"),m("button",{onClick:d[8]||(d[8]=f=>n.value=!n.value)},"詳細表示/非表示")]),m("div",bO,"表示件数: "+Q(o.value.length)+" / "+Q(t.characterMasters.length),1),m("div",TO,[m("table",EO,[m("thead",null,[m("tr",null,[d[26]||(d[26]=m("th",{rowspan:"2"},"図鑑No.",-1)),d[27]||(d[27]=m("th",{rowspan:"2"},"キャラ名",-1)),Z(m("th",SO,"属性",512),[[Ur,n.value]]),Z(m("th",AO,"分類",512),[[Ur,n.value]]),Z(m("th",kO,"排出ガチャ",512),[[Ur,n.value]]),(M(!0),U(re,null,fe(t.accounts,f=>(M(),U("th",{key:f.id,colspan:"2"},Q(f.name),1))),128))]),m("tr",null,[(M(!0),U(re,null,fe(t.accounts,f=>(M(),U(re,{key:f.id},[d[28]||(d[28]=m("th",null,"1",-1)),d[29]||(d[29]=m("th",null,"2",-1))],64))),128))])]),m("tbody",null,[t.dataLoaded?o.value.length===0?(M(),U("tr",RO,[m("td",{colspan:2+(n.value?3:0)+t.accounts.length*2},"該当するキャラクターがいません",8,DO)])):Yt("",!0):(M(),U("tr",CO,[m("td",{colspan:2+(n.value?3:0)+t.accounts.length*2},"データを読み込んでいます...",8,NO)])),(M(!0),U(re,null,fe(o.value,f=>(M(),U("tr",{key:f.id},[m("td",null,Q(f.indexNumber||"—"),1),m("td",null,Q(f.monsterName||"—"),1),Z(m("td",{class:Bt("element-"+(f.element||"").toLowerCase())},Q(f.element||"—"),3),[[Ur,n.value]]),Z(m("td",null,Q(f.type||"—"),513),[[Ur,n.value]]),Z(m("td",null,Q(f.ejectionGacha||"—"),513),[[Ur,n.value]]),(M(!0),U(re,null,fe(t.accounts,y=>(M(),U(re,{key:y.id},[m("td",{class:Bt(l(f.id,y.id,1)),innerHTML:c(f.id,y.id,0)},null,10,OO),m("td",{class:Bt(l(f.id,y.id,2)),innerHTML:c(f.id,y.id,1)},null,10,xO)],64))),128))]))),128))])])])]))}},MO={id:"tab-add-owned",class:"tab-content"},LO={class:"form-section"},FO=["value"],UO=["disabled"],VO={__name:"AddOwnedCharacterTab",props:{characterMasters:{type:Array,required:!0},characterMastersMap:{type:Map,required:!0},selectedAccountId:{type:String,default:null},ownedCountMap:{type:Map,required:!0}},emits:["character-added"],setup(t,{emit:e}){const n=t,r=e,s=Oe(""),i=Oe(null),o=Oe(!1),a=Ct(()=>{if(!n.selectedAccountId)return[];const u=s.value.toLowerCase();return n.characterMasters.filter(h=>{const d=c(h.id)<2,f=!u||h.monsterName.toLowerCase().includes(u);return d&&f})});pr(()=>n.selectedAccountId,()=>{i.value=null});const c=u=>n.selectedAccountId&&n.ownedCountMap.get(`${u}-${n.selectedAccountId}`)||0,l=async()=>{if(!i.value||!n.selectedAccountId)return alert("追加するキャラとアカウントを選択してください。");if(c(i.value)>=2)return alert("このキャラは既に2体所持しています。");o.value=!0;try{const u=n.characterMastersMap.get(i.value);if(!u)throw new Error("キャラのマスター情報が見つかりません。");const h={characterMasterId:i.value,monsterName:u.monsterName,items:[],createdAt:Gt.firestore.FieldValue.serverTimestamp()},d=await Ar.addOwnedCharacter(n.selectedAccountId,h),f={...h,id:d.id,createdAt:{toDate:()=>new Date}};r("character-added",{accountId:n.selectedAccountId,newCharacter:f}),alert(`「${u.monsterName}」を所持リストに追加しました。`),i.value=null}catch(u){console.error("キャラ追加失敗:",u),alert("エラー: "+u.message)}finally{o.value=!1}};return(u,h)=>(M(),U("div",MO,[h[6]||(h[6]=m("h2",null,"所持キャラクター追加",-1)),m("div",LO,[h[2]||(h[2]=m("label",null,"キャラクター検索:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":h[0]||(h[0]=d=>s.value=d),placeholder:"キャラクター名で検索"},null,512),[[gt,s.value]]),h[3]||(h[3]=m("label",{for:"addable-char-selector"},"追加可能なキャラクター:",-1)),Z(m("select",{id:"addable-char-selector","onUpdate:modelValue":h[1]||(h[1]=d=>i.value=d),size:"15",style:{width:"100%"}},[(M(!0),U(re,null,fe(a.value,d=>(M(),U("option",{key:d.id,value:d.id}," ["+Q(d.indexNumber||"?")+"] "+Q(d.monsterName)+" ("+Q(c(d.id))+"/2 所持) ",9,FO))),128))],512),[[Pe,i.value]]),h[4]||(h[4]=m("br",null,null,-1)),h[5]||(h[5]=m("br",null,null,-1)),m("button",{onClick:l,disabled:!i.value||o.value},Q(o.value?"追加中...":"このキャラクターを所持リストに追加"),9,UO)])]))}},bI=(t,e,n,r,s,i=null)=>{const o=n.get(t.characterMasterId),a=o?o.monsterName:"不明",c=t.accountId||i;if(!c)return`${a} (アカウント不明)`;const u=(r.get(c)||[]).filter(d=>d.characterMasterId===t.characterMasterId).findIndex(d=>d.id===t.id);let h=`${a} (${u>=0?u+1:"？"}体目)`;{const d=(t.items||[]).map(f=>s.get(Number(f))).filter(Boolean).join(", ");h+=` [${d||"アイテムなし"}]`}return h},$O={id:"tab-manage-items",class:"tab-content"},qO={class:"form-section"},BO=["value"],jO={class:"item-select-container"},WO=["value"],KO=["value"],HO=["value"],zO=["disabled"],GO={class:"form-section"},QO={style:{display:"flex",gap:"20px"}},YO={style:{flex:"1"}},JO=["value"],XO={style:{flex:"1"}},ZO={id:"items-to-move-container",style:{height:"180px","overflow-y":"auto",border:"1px solid #ccc",padding:"10px","background-color":"#fff","margin-top":"5px"}},ex={key:0},tx={key:1},nx=["id","value"],rx=["for"],sx={style:{flex:"1"}},ix=["value"],ox=["disabled"],ax={__name:"ManageItemsTab",props:{selectedAccountId:{type:String,default:null},ownedCharactersData:{type:Map,required:!0},characterMastersMap:{type:Map,required:!0},itemMasters:{type:Array,required:!0},itemMastersMap:{type:Map,required:!0}},emits:["items-updated","items-moved"],setup(t,{emit:e}){const n=t,r=e,s=Rn({search:"",selectedOwnedId:null,items:["","",""]}),i=Rn({from:{search:"",selectedId:null},to:{search:"",selectedId:null},selectedItemIds:[]}),o=Oe(!1),a=Oe(!1),c=Ct(()=>!n.selectedAccountId||!n.ownedCharactersData.has(n.selectedAccountId)?[]:(n.ownedCharactersData.get(n.selectedAccountId)||[]).map(w=>{const v=n.characterMastersMap.get(w.characterMasterId);return{...w,indexNumber:(v==null?void 0:v.indexNumber)||999999,monsterName:(v==null?void 0:v.monsterName)||"不明"}}).sort((w,v)=>w.indexNumber-v.indexNumber)),l=Ct(()=>{const A=s.search.toLowerCase();return c.value.filter(w=>!A||w.monsterName.toLowerCase().includes(A))}),u=Ct(()=>{const A=i.from.search.toLowerCase();return c.value.filter(w=>(!A||w.monsterName.toLowerCase().includes(A))&&w.id!==i.to.selectedId)}),h=Ct(()=>{const A=i.to.search.toLowerCase();return c.value.filter(w=>(!A||w.monsterName.toLowerCase().includes(A))&&w.id!==i.from.selectedId)}),d=Ct(()=>{if(!i.from.selectedId)return[];const A=c.value.find(w=>w.id===i.from.selectedId);return!A||!A.items?[]:A.items.map(w=>({id:Number(w),name:n.itemMastersMap.get(Number(w))||`不明(ID:${w})`}))});pr(()=>n.selectedAccountId,()=>{Object.assign(s,{search:"",selectedOwnedId:null,items:["","",""]}),Object.assign(i,{from:{search:"",selectedId:null},to:{search:"",selectedId:null},selectedItemIds:[]})}),pr(()=>s.selectedOwnedId,A=>{if(!A){s.items=["","",""];return}const w=c.value.find(v=>v.id===A);if(w&&w.items){const v=w.items.map(String);s.items=[v[0]||"",v[1]||"",v[2]||""]}else s.items=["","",""]}),pr(()=>i.from.selectedId,()=>{i.selectedItemIds=[]});const y=async()=>{if(s.selectedOwnedId){o.value=!0;try{const A=s.items.filter(Boolean).map(Number);await Ar.updateCharacterItems(n.selectedAccountId,s.selectedOwnedId,A),r("items-updated",{accountId:n.selectedAccountId,ownedCharacterId:s.selectedOwnedId,items:A}),alert("アイテムを更新しました。")}catch(A){alert("エラー: "+A.message)}finally{o.value=!1}}},S=async()=>{var A;a.value=!0;try{const w=i.from.selectedId,v=i.to.selectedId,_=i.selectedItemIds.map(Number);if(w===v||!w||!v)throw new Error("有効な移動元と移動先を選択してください。");if(_.length===0)throw new Error("移動するアイテムを選択してください。");const P=c.value.find(Ee=>Ee.id===w),X=c.value.find(Ee=>Ee.id===v);if(!P||!X)throw new Error("キャラクター情報が見つかりません。");if((((A=X.items)==null?void 0:A.length)||0)+_.length>3)throw new Error("移動先のアイテム所持数が上限を超えます。");const q=(P.items||[]).map(Number).filter(Ee=>!_.includes(Ee)),oe=[...(X.items||[]).map(Number),..._];await Ar.moveCharacterItems(n.selectedAccountId,{id:w,items:q},{id:v,items:oe}),r("items-moved",{accountId:n.selectedAccountId,from:{id:w,items:q},to:{id:v,items:oe}}),alert("アイテムを移動しました。"),i.from.selectedId=null,i.to.selectedId=null,i.selectedItemIds=[]}catch(w){alert(`エラー: ${w.message}`)}finally{a.value=!1}},T=(A,w)=>bI(A,w,n.characterMastersMap,n.ownedCharactersData,n.itemMastersMap,n.selectedAccountId);return(A,w)=>(M(),U("div",$O,[w[27]||(w[27]=m("h2",null,"アイテム管理",-1)),m("div",qO,[w[13]||(w[13]=m("h3",null,"所持キャラクターのアイテムを変更",-1)),w[14]||(w[14]=m("label",null,"キャラクター検索:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":w[0]||(w[0]=v=>s.search=v),placeholder:"キャラクター名で検索"},null,512),[[gt,s.search]]),w[15]||(w[15]=m("label",{for:"item-char-selector"},"キャラクター選択:",-1)),Z(m("select",{id:"item-char-selector","onUpdate:modelValue":w[1]||(w[1]=v=>s.selectedOwnedId=v),size:"10",style:{width:"100%"}},[(M(!0),U(re,null,fe(l.value,v=>(M(),U("option",{key:v.id,value:v.id},Q(T(v,!0)),9,BO))),128))],512),[[Pe,s.selectedOwnedId]]),w[16]||(w[16]=m("label",null,"アイテム (最大3つまで):",-1)),m("div",jO,[Z(m("select",{"onUpdate:modelValue":w[2]||(w[2]=v=>s.items[0]=v)},[w[10]||(w[10]=m("option",{value:""},"(アイテムなし)",-1)),(M(!0),U(re,null,fe(t.itemMasters,v=>(M(),U("option",{key:v.id,value:v.id},"["+Q(v.id)+"] "+Q(v.name),9,WO))),128))],512),[[Pe,s.items[0]]]),Z(m("select",{"onUpdate:modelValue":w[3]||(w[3]=v=>s.items[1]=v)},[w[11]||(w[11]=m("option",{value:""},"(アイテムなし)",-1)),(M(!0),U(re,null,fe(t.itemMasters,v=>(M(),U("option",{key:v.id,value:v.id},"["+Q(v.id)+"] "+Q(v.name),9,KO))),128))],512),[[Pe,s.items[1]]]),Z(m("select",{"onUpdate:modelValue":w[4]||(w[4]=v=>s.items[2]=v)},[w[12]||(w[12]=m("option",{value:""},"(アイテムなし)",-1)),(M(!0),U(re,null,fe(t.itemMasters,v=>(M(),U("option",{key:v.id,value:v.id},"["+Q(v.id)+"] "+Q(v.name),9,HO))),128))],512),[[Pe,s.items[2]]])]),w[17]||(w[17]=m("br",null,null,-1)),m("button",{onClick:y,disabled:!s.selectedOwnedId||o.value},Q(o.value?"更新中...":"アイテムを更新"),9,zO)]),m("div",GO,[w[25]||(w[25]=m("h3",null,"キャラクター間でアイテムを移動",-1)),m("div",QO,[m("div",YO,[w[18]||(w[18]=m("label",null,"移動元キャラクター検索:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":w[5]||(w[5]=v=>i.from.search=v),placeholder:"移動元の名前で検索"},null,512),[[gt,i.from.search]]),w[19]||(w[19]=m("label",null,"移動元キャラクター選択:",-1)),Z(m("select",{"onUpdate:modelValue":w[6]||(w[6]=v=>i.from.selectedId=v),size:"8",style:{width:"100%"}},[(M(!0),U(re,null,fe(u.value,v=>(M(),U("option",{key:v.id,value:v.id},Q(T(v,!0)),9,JO))),128))],512),[[Pe,i.from.selectedId]])]),m("div",XO,[w[22]||(w[22]=m("label",null,"移動するアイテムを選択:",-1)),m("div",ZO,[i.from.selectedId?d.value.length?Yt("",!0):(M(),U("div",tx,w[21]||(w[21]=[m("small",null,"移動できるアイテムがありません。",-1)]))):(M(),U("div",ex,w[20]||(w[20]=[m("small",null,"移動元キャラクターを選択してください。",-1)]))),(M(!0),U(re,null,fe(d.value,v=>(M(),U("div",{key:v.id},[Z(m("input",{type:"checkbox",id:"item-move-"+v.id,value:v.id,"onUpdate:modelValue":w[7]||(w[7]=_=>i.selectedItemIds=_)},null,8,nx),[[Bb,i.selectedItemIds]]),m("label",{for:"item-move-"+v.id},Q(v.name),9,rx)]))),128))])]),m("div",sx,[w[23]||(w[23]=m("label",null,"移動先キャラクター検索:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":w[8]||(w[8]=v=>i.to.search=v),placeholder:"移動先の名前で検索"},null,512),[[gt,i.to.search]]),w[24]||(w[24]=m("label",null,"移動先キャラクター選択:",-1)),Z(m("select",{"onUpdate:modelValue":w[9]||(w[9]=v=>i.to.selectedId=v),size:"8",style:{width:"100%"}},[(M(!0),U(re,null,fe(h.value,v=>(M(),U("option",{key:v.id,value:v.id},Q(T(v,!0)),9,ix))),128))],512),[[Pe,i.to.selectedId]])])]),w[26]||(w[26]=m("br",null,null,-1)),m("button",{onClick:S,disabled:!i.from.selectedId||!i.to.selectedId||i.selectedItemIds.length===0||a.value},Q(a.value?"移動中...":"選択したアイテムを移動"),9,ox)])]))}},cx={id:"tab-manage-teams",class:"tab-content"},lx={class:"team-management-container"},ux={class:"team-list-panel"},hx={class:"form-section",style:{padding:"0"}},dx=["value"],fx={class:"team-list"},px={key:0},mx={key:1},gx=["onClick"],yx={class:"team-list-item-header"},vx=["onClick"],wx={class:"team-detail-table"},Ix=["title"],_x=["title"],bx={class:"team-form-panel"},Tx={class:"form-section"},Ex=["value"],Sx={class:"team-slots-container"},Ax=["onUpdate:modelValue"],kx=["value"],Cx=["onUpdate:modelValue"],Nx=["onUpdate:modelValue"],Rx={key:0,value:""},Dx=["value","disabled"],Ox=["disabled"],xx={__name:"ManageTeamsTab",props:{userId:{type:String,required:!0},dataLoaded:{type:Boolean,required:!0},teams:{type:Array,required:!0},accounts:{type:Array,required:!0},ownedCharactersData:{type:Map,required:!0},characterMastersMap:{type:Map,required:!0},itemMastersMap:{type:Map,required:!0}},emits:["team-added","team-updated","team-deleted"],setup(t,{emit:e}){const n=t,r=e,s=["禁忌","天魔","庭園","轟絶","黎絶"],i=Rn({type:""}),o=Oe(!1),a=()=>({id:null,name:"",type:"",slots:Array(4).fill().map(()=>({selectedAccountId:"",selectedOwnedId:"",characterSearch:""}))}),c=Rn(a()),l=Ct(()=>i.type?n.teams.filter(v=>v.type===i.type):n.teams),u=Ct(()=>c.name&&c.type&&c.slots.every(v=>v.selectedAccountId&&v.selectedOwnedId)),h=v=>{if(!v.selectedAccountId)return[];const P=(n.ownedCharactersData.get(v.selectedAccountId)||[]).map(q=>{const oe=n.characterMastersMap.get(q.characterMasterId);return{...q,accountId:v.selectedAccountId,indexNumber:(oe==null?void 0:oe.indexNumber)||999999,monsterName:(oe==null?void 0:oe.monsterName)||"不明"}}).sort((q,oe)=>q.indexNumber-oe.indexNumber),X=v.characterSearch.toLowerCase();return X?P.filter(q=>q.monsterName.toLowerCase().includes(X)):P},d=(v,_)=>v?c.slots.some((P,X)=>X!==_&&P.selectedOwnedId===v):!1,f=(v,_)=>{const P={characterName:"—",accountName:"—",items:[]};if(!v.characters||!n.dataLoaded||_>=v.characters.length)return P;const X=v.characters[_],q=n.accounts.find(Se=>Se.id===X.accountId),oe=(n.ownedCharactersData.get(X.accountId)||[]).find(Se=>Se.id===X.ownedCharacterId);if(!oe)return{characterName:"キャラ不明",accountName:(q==null?void 0:q.name)||"不明",items:[]};const Ee=n.characterMastersMap.get(oe.characterMasterId);return{characterName:(Ee==null?void 0:Ee.monsterName)||"不明",accountName:(q==null?void 0:q.name)||"不明",items:(oe.items||[]).map(Se=>n.itemMastersMap.get(Number(Se))||`不明ID:${Se}`).filter(Boolean)}},y=v=>{Object.assign(c,{id:v.id,name:v.name,type:v.type,slots:v.characters.map(_=>({selectedAccountId:_.accountId,selectedOwnedId:_.ownedCharacterId,characterSearch:""}))})},S=()=>{Object.assign(c,a())},T=async()=>{if(!u.value){alert("編成名、タイプ、4体のキャラを全て選択してください。");return}o.value=!0;const v={userId:n.userId,name:c.name,type:c.type,characters:c.slots.map(_=>({accountId:_.selectedAccountId,ownedCharacterId:_.selectedOwnedId}))};try{const _=c.id;Object.assign(v,_?{updatedAt:Gt.firestore.FieldValue.serverTimestamp()}:{createdAt:Gt.firestore.FieldValue.serverTimestamp()});const P=await Ar.saveTeam(_,v);if(_)r("team-updated",{...v,id:_}),alert("編成を更新しました。");else{const X={...v,id:P.id,createdAt:{toDate:()=>new Date}};r("team-added",X),alert("編成を保存しました。"),S()}}catch(_){console.error("編成保存失敗:",_),alert("エラー: "+_.message)}finally{o.value=!1}},A=async v=>{if(confirm("この編成を本当に削除しますか？"))try{await Ar.deleteTeam(v),r("team-deleted",v),alert("編成を削除しました。"),c.id===v&&S()}catch(_){console.error("編成削除失敗:",_),alert("エラー: "+_.message)}},w=(v,_)=>bI(v,_,n.characterMastersMap,n.ownedCharactersData,n.itemMastersMap,null);return(v,_)=>(M(),U("div",cx,[_[15]||(_[15]=m("h2",null,"編成管理",-1)),m("div",lx,[m("div",ux,[_[6]||(_[6]=m("h3",null,"編成一覧",-1)),m("div",hx,[_[4]||(_[4]=m("label",null,"タイプで絞り込み:",-1)),Z(m("select",{"onUpdate:modelValue":_[0]||(_[0]=P=>i.type=P),style:{width:"100%"}},[_[3]||(_[3]=m("option",{value:""},"すべて",-1)),(M(),U(re,null,fe(s,P=>m("option",{key:P,value:P},Q(P),9,dx)),64))],512),[[Pe,i.type]])]),m("ul",fx,[t.dataLoaded?l.value.length===0?(M(),U("li",mx,"該当する編成がありません。")):Yt("",!0):(M(),U("li",px,"データを読み込んでいます...")),(M(!0),U(re,null,fe(l.value,P=>(M(),U("li",{key:P.id,onClick:X=>y(P),class:Bt({active:c.id===P.id})},[m("div",yx,[m("strong",null,Q(P.name),1),m("span",null,"("+Q(P.type)+")",1),m("button",{class:"delete-btn-small",onClick:Kb(X=>A(P.id),["stop"])},"削除",8,vx)]),m("table",wx,[_[5]||(_[5]=m("thead",null,[m("tr",null,[m("th",null,"1"),m("th",null,"2"),m("th",null,"3"),m("th",null,"4")])],-1)),m("tbody",null,[m("tr",null,[(M(!0),U(re,null,fe(Array(4),(X,q)=>(M(),U("td",{key:q,title:f(P,q).characterName},Q(f(P,q).characterName),9,Ix))),128))]),m("tr",null,[(M(!0),U(re,null,fe(Array(4),(X,q)=>(M(),U("td",{key:q},Q(f(P,q).accountName),1))),128))]),(M(),U(re,null,fe(3,X=>m("tr",{key:X},[(M(!0),U(re,null,fe(Array(4),(q,oe)=>(M(),U("td",{key:oe,title:f(P,oe).items[X-1]},Q(f(P,oe).items[X-1]||"—"),9,_x))),128))])),64))])])],10,gx))),128))])]),m("div",bx,[m("h3",null,Q(c.id?"編成編集":"新規編成作成"),1),m("button",{onClick:S,style:{"margin-bottom":"15px"}},"新規作成フォームを開く"),m("div",Tx,[_[8]||(_[8]=m("label",null,"編成名:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":_[1]||(_[1]=P=>c.name=P),placeholder:"例: 天魔の孤城 第1の間"},null,512),[[gt,c.name,void 0,{trim:!0}]]),_[9]||(_[9]=m("label",null,"タイプ:",-1)),Z(m("select",{"onUpdate:modelValue":_[2]||(_[2]=P=>c.type=P)},[_[7]||(_[7]=m("option",{disabled:"",value:""},"タイプを選択",-1)),(M(),U(re,null,fe(s,P=>m("option",{key:P,value:P},Q(P),9,Ex)),64))],512),[[Pe,c.type]])]),_[13]||(_[13]=m("h4",null,"キャラクター編成 (4体)",-1)),m("div",Sx,[(M(!0),U(re,null,fe(c.slots,(P,X)=>(M(),U("div",{key:X,class:"team-slot"},[m("h5",null,"スロット "+Q(X+1),1),_[11]||(_[11]=m("label",null,"アカウント:",-1)),Z(m("select",{"onUpdate:modelValue":q=>P.selectedAccountId=q},[_[10]||(_[10]=m("option",{value:"",disabled:""},"アカウント選択",-1)),(M(!0),U(re,null,fe(t.accounts,q=>(M(),U("option",{key:q.id,value:q.id},Q(q.name),9,kx))),128))],8,Ax),[[Pe,P.selectedAccountId]]),_[12]||(_[12]=m("label",null,"キャラクター:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":q=>P.characterSearch=q,placeholder:"キャラ名で検索"},null,8,Cx),[[gt,P.characterSearch]]),Z(m("select",{"onUpdate:modelValue":q=>P.selectedOwnedId=q,size:"5",style:{width:"100%"}},[P.selectedAccountId?Yt("",!0):(M(),U("option",Rx,"先にアカウントを選択")),(M(!0),U(re,null,fe(h(P),q=>(M(),U("option",{key:q.id,value:q.id,disabled:d(q.id,X)},Q(w(q,!0))+" "+Q(d(q.id,X)?"(選択済)":""),9,Dx))),128))],8,Nx),[[Pe,P.selectedOwnedId]])]))),128))]),_[14]||(_[14]=m("br",null,null,-1)),m("button",{onClick:T,disabled:!u.value||o.value,class:"save-button"},Q(o.value?"保存中...":c.id?"編成を更新":"編成を保存"),9,Ox)])])]))}},Px={id:"tab-add-master",class:"tab-content"},Mx={class:"form-section"},Lx=["value"],Fx=["disabled"],Ux={__name:"AddMasterCharacterTab",props:{gachaMasters:{type:Array,required:!0}},emits:["master-added"],setup(t,{emit:e}){const n=e,r=Rn({no:"",name:"",element:"",type:"恒常",gacha:""}),s=Oe(!1),i=async()=>{if(!r.name)return alert("キャラクター名は必須です。");s.value=!0;try{const o={indexNumber:r.no?Number(r.no):0,monsterName:r.name,element:r.element||"",type:r.type||"恒常",ejectionGacha:r.gacha||""};await Ar.addCharacterMaster(o),alert("マスターを追加しました。ページをリロードして反映してください。"),n("master-added")}catch(o){alert("エラー: "+o.message)}finally{s.value=!1}};return(o,a)=>(M(),U("div",Px,[a[13]||(a[13]=m("h2",null,"キャラクターマスター新規追加",-1)),m("div",Mx,[a[6]||(a[6]=m("label",null,"図鑑番号:",-1)),Z(m("input",{type:"number","onUpdate:modelValue":a[0]||(a[0]=c=>r.no=c),placeholder:"例: 1234"},null,512),[[gt,r.no,void 0,{number:!0}]]),a[7]||(a[7]=m("label",null,"キャラクター名:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":a[1]||(a[1]=c=>r.name=c),required:""},null,512),[[gt,r.name,void 0,{trim:!0}]]),a[8]||(a[8]=m("label",null,"属性:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":a[2]||(a[2]=c=>r.element=c)},null,512),[[gt,r.element,void 0,{trim:!0}]]),a[9]||(a[9]=m("label",null,"分類:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":a[3]||(a[3]=c=>r.type=c)},null,512),[[gt,r.type,void 0,{trim:!0}]]),a[10]||(a[10]=m("label",null,"排出ガチャ (限定の場合):",-1)),Z(m("select",{"onUpdate:modelValue":a[4]||(a[4]=c=>r.gacha=c)},[a[5]||(a[5]=m("option",{value:""},"(限定ではない/その他)",-1)),(M(!0),U(re,null,fe(t.gachaMasters,c=>(M(),U("option",{key:c.id,value:c.name},Q(c.name),9,Lx))),128))],512),[[Pe,r.gacha]]),a[11]||(a[11]=m("br",null,null,-1)),a[12]||(a[12]=m("br",null,null,-1)),m("button",{onClick:i,disabled:!r.name||s.value},Q(s.value?"追加中...":"マスターリストに新規追加"),9,Fx)])]))}},Vx={id:"tab-edit-master",class:"tab-content"},$x={class:"form-section"},qx=["value"],Bx={key:0,class:"form-section"},jx=["value"],Wx=["disabled"],Kx={__name:"EditMasterCharacterTab",props:{characterMasters:{type:Array,required:!0},gachaMasters:{type:Array,required:!0}},emits:["master-updated"],setup(t,{emit:e}){const n=t,r=e,s=Rn({search:"",selectedMasterId:null,no:"",name:"",element:"",type:"",gacha:""}),i=Oe(!1),o=Ct(()=>new Map(n.characterMasters.map(l=>[l.id,l]))),a=Ct(()=>{if(!n.characterMasters.length)return[];const l=s.search.toLowerCase();return n.characterMasters.filter(u=>!l||u.monsterName.toLowerCase().includes(l))});pr(()=>s.selectedMasterId,l=>{if(!l){Object.assign(s,{name:"",no:"",element:"",type:"",gacha:""});return}const u=o.value.get(l);u&&Object.assign(s,{name:u.monsterName,no:u.indexNumber,element:u.element,type:u.type,gacha:u.ejectionGacha})});const c=async()=>{if(!s.selectedMasterId||!s.name)return alert("キャラを選択し名前を入力してください。");i.value=!0;try{const l={monsterName:s.name,indexNumber:s.no?Number(s.no):0,element:s.element,type:s.type,ejectionGacha:s.gacha};await Ar.updateCharacterMaster(s.selectedMasterId,l),alert("マスター情報を更新しました。ページをリロードしてください。"),r("master-updated")}catch(l){alert("更新に失敗: "+l.message)}finally{i.value=!1}};return(l,u)=>(M(),U("div",Vx,[u[18]||(u[18]=m("h2",null,"キャラクターマスター編集",-1)),m("div",$x,[u[7]||(u[7]=m("label",null,"キャラクター検索:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":u[0]||(u[0]=h=>s.search=h),placeholder:"編集したいキャラクター名で検索"},null,512),[[gt,s.search]]),u[8]||(u[8]=m("label",null,"編集するキャラクターを選択:",-1)),Z(m("select",{"onUpdate:modelValue":u[1]||(u[1]=h=>s.selectedMasterId=h),size:"10",style:{width:"100%"}},[(M(!0),U(re,null,fe(a.value,h=>(M(),U("option",{key:h.id,value:h.id}," ["+Q(h.indexNumber||"?")+"] "+Q(h.monsterName),9,qx))),128))],512),[[Pe,s.selectedMasterId]])]),s.selectedMasterId?(M(),U("div",Bx,[u[10]||(u[10]=m("h3",null,"編集フォーム",-1)),u[11]||(u[11]=m("label",null,"図鑑番号:",-1)),Z(m("input",{type:"number","onUpdate:modelValue":u[2]||(u[2]=h=>s.no=h),placeholder:"例: 1234"},null,512),[[gt,s.no,void 0,{number:!0}]]),u[12]||(u[12]=m("label",null,"キャラクター名:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":u[3]||(u[3]=h=>s.name=h),required:""},null,512),[[gt,s.name,void 0,{trim:!0}]]),u[13]||(u[13]=m("label",null,"属性:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":u[4]||(u[4]=h=>s.element=h)},null,512),[[gt,s.element,void 0,{trim:!0}]]),u[14]||(u[14]=m("label",null,"分類:",-1)),Z(m("input",{type:"text","onUpdate:modelValue":u[5]||(u[5]=h=>s.type=h)},null,512),[[gt,s.type,void 0,{trim:!0}]]),u[15]||(u[15]=m("label",null,"排出ガチャ (限定の場合):",-1)),Z(m("select",{"onUpdate:modelValue":u[6]||(u[6]=h=>s.gacha=h)},[u[9]||(u[9]=m("option",{value:""},"(限定ではない/その他)",-1)),(M(!0),U(re,null,fe(t.gachaMasters,h=>(M(),U("option",{key:h.id,value:h.name},Q(h.name),9,jx))),128))],512),[[Pe,s.gacha]]),u[16]||(u[16]=m("br",null,null,-1)),u[17]||(u[17]=m("br",null,null,-1)),m("button",{onClick:c,disabled:!s.selectedMasterId||i.value},Q(i.value?"更新中...":"マスター情報を更新"),9,Wx)])):Yt("",!0)]))}},Hx={id:"app-root",class:"container"},zx={class:"main-header"},Gx={key:0},Qx={class:"tab-nav"},Yx={__name:"App",setup(t){const e=Oe(null),n=Oe(!1),r=Oe(!1),s=Oe([]),i=Oe([]),o=Oe([]),a=Oe([]),c=Oe([]),l=Oe(new Map),u=Oe(new Map),h=Oe(new Map),d=Oe(new Map),f=Oe("view-all"),y=Oe(null),S=Ct(()=>f.value==="add-owned"||f.value==="manage-items");Ql.onAuthStateChanged(ne=>{e.value=ne,n.value=!0,ne?v():w()});const T=()=>{Ql.loginWithGoogle().catch(()=>alert("ログインに失敗しました。"))},A=()=>{Ql.logout()},w=()=>{r.value=!1,s.value=[],i.value=[],o.value=[],a.value=[],c.value=[],l.value=new Map,u.value=new Map,h.value=new Map,d.value=new Map,y.value=null};async function v(){if(!r.value&&e.value){console.log("初期データの読み込みを開始...");try{const ne=await Ar.loadAndProcessInitialData(e.value.uid);s.value=ne.accounts,i.value=ne.characterMasters,o.value=ne.itemMasters,a.value=ne.gachaMasters,c.value=ne.teams,l.value=ne.itemMastersMap,u.value=ne.ownedCountMap,h.value=ne.ownedCharactersData,d.value=ne.characterMastersMap,s.value.length>0&&(y.value=s.value[0].id),r.value=!0,console.log("初期データの読み込み完了")}catch(ne){console.error("データ読み込みエラー:",ne),alert(`データ読み込みエラー: ${ne.message}`)}}}const _=({accountId:ne,newCharacter:ae})=>{h.value.has(ne)||h.value.set(ne,[]),h.value.get(ne).push(ae);const un=`${ae.characterMasterId}-${ne}`,hn=u.value.get(un)||0;u.value.set(un,hn+1)},P=({accountId:ne,ownedCharacterId:ae,items:Fe})=>{const hn=(h.value.get(ne)||[]).find(Ue=>Ue.id===ae);hn&&(hn.items=Fe)},X=({accountId:ne,from:ae,to:Fe})=>{const un=h.value.get(ne)||[],hn=un.find(we=>we.id===ae.id),Ue=un.find(we=>we.id===Fe.id);hn&&(hn.items=ae.items),Ue&&(Ue.items=Fe.items)},q=ne=>{c.value.unshift(ne)},oe=ne=>{const ae=c.value.findIndex(Fe=>Fe.id===ne.id);ae>-1&&(c.value[ae]={...c.value[ae],...ne})},Ee=ne=>{c.value=c.value.filter(ae=>ae.id!==ne)},Se=()=>{location.reload()};return(ne,ae)=>(M(),U("div",Hx,[m("div",zx,[ae[7]||(ae[7]=m("h1",null,"キャラクター管理",-1)),en(lO,{user:e.value,onLogin:T,onLogout:A},null,8,["user"])]),e.value?(M(),U("div",Gx,[m("div",Qx,[m("button",{class:Bt(["tab-btn",{active:f.value==="view-all"}]),onClick:ae[0]||(ae[0]=Fe=>f.value="view-all")},"所持状況一覧",2),m("button",{class:Bt(["tab-btn",{active:f.value==="add-owned"}]),onClick:ae[1]||(ae[1]=Fe=>f.value="add-owned")},"所持キャラ追加",2),m("button",{class:Bt(["tab-btn",{active:f.value==="manage-items"}]),onClick:ae[2]||(ae[2]=Fe=>f.value="manage-items")},"アイテム管理",2),m("button",{class:Bt(["tab-btn",{active:f.value==="manage-teams"}]),onClick:ae[3]||(ae[3]=Fe=>f.value="manage-teams")},"編成管理",2),m("button",{class:Bt(["tab-btn",{active:f.value==="add-master"}]),onClick:ae[4]||(ae[4]=Fe=>f.value="add-master")},"マスター追加",2),m("button",{class:Bt(["tab-btn",{active:f.value==="edit-master"}]),onClick:ae[5]||(ae[5]=Fe=>f.value="edit-master")},"マスター編集",2)]),en(fO,{accounts:s.value,modelValue:y.value,"onUpdate:modelValue":ae[6]||(ae[6]=Fe=>y.value=Fe),visible:S.value},null,8,["accounts","modelValue","visible"]),f.value==="view-all"?(M(),Fr(PO,{key:0,"data-loaded":r.value,accounts:s.value,"character-masters":i.value,"item-masters":o.value,"gacha-masters":a.value,"owned-count-map":u.value,"owned-characters-data":h.value,"item-masters-map":l.value},null,8,["data-loaded","accounts","character-masters","item-masters","gacha-masters","owned-count-map","owned-characters-data","item-masters-map"])):Yt("",!0),f.value==="add-owned"?(M(),Fr(VO,{key:1,"character-masters":i.value,"character-masters-map":d.value,"selected-account-id":y.value,"owned-count-map":u.value,onCharacterAdded:_},null,8,["character-masters","character-masters-map","selected-account-id","owned-count-map"])):Yt("",!0),f.value==="manage-items"?(M(),Fr(ax,{key:2,"selected-account-id":y.value,"owned-characters-data":h.value,"character-masters-map":d.value,"item-masters":o.value,"item-masters-map":l.value,onItemsUpdated:P,onItemsMoved:X},null,8,["selected-account-id","owned-characters-data","character-masters-map","item-masters","item-masters-map"])):Yt("",!0),f.value==="manage-teams"?(M(),Fr(xx,{key:3,"user-id":e.value.uid,"data-loaded":r.value,teams:c.value,accounts:s.value,"owned-characters-data":h.value,"character-masters-map":d.value,"item-masters-map":l.value,onTeamAdded:q,onTeamUpdated:oe,onTeamDeleted:Ee},null,8,["user-id","data-loaded","teams","accounts","owned-characters-data","character-masters-map","item-masters-map"])):Yt("",!0),f.value==="add-master"?(M(),Fr(Ux,{key:4,"gacha-masters":a.value,onMasterAdded:Se},null,8,["gacha-masters"])):Yt("",!0),f.value==="edit-master"?(M(),Fr(Kx,{key:5,"character-masters":i.value,"gacha-masters":a.value,onMasterUpdated:Se},null,8,["character-masters","gacha-masters"])):Yt("",!0)])):Yt("",!0)]))}};Gb(Yx).mount("#app");
