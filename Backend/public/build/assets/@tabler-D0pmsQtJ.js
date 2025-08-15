import{r as d}from"./react-ZtzTtHoT.js";const k="modulepreload",w=function(i){return"/build/"+i},f={},b=function(h,s,p){let a=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),t=(e==null?void 0:e.nonce)||(e==null?void 0:e.getAttribute("nonce"));a=Promise.allSettled(s.map(o=>{if(o=w(o),o in f)return;f[o]=!0;const n=o.endsWith(".css"),l=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${l}`))return;const r=document.createElement("link");if(r.rel=n?"stylesheet":k,n||(r.as="script"),r.crossOrigin="",r.href=o,t&&r.setAttribute("nonce",t),document.head.appendChild(r),n)return new Promise((u,v)=>{r.addEventListener("load",u),r.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${o}`)))})}))}function c(e){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return a.then(e=>{for(const t of e||[])t.status==="rejected"&&c(t.reason);return h().catch(c)})};/**
 * @license @tabler/icons-react v3.26.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var y={outline:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},filled:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"currentColor",stroke:"none"}};/**
 * @license @tabler/icons-react v3.26.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=(i,h,s,p)=>{const a=d.forwardRef(({color:c="currentColor",size:e=24,stroke:t=2,title:o,className:n,children:l,...r},u)=>d.createElement("svg",{ref:u,...y[i],width:e,height:e,className:["tabler-icon",`tabler-icon-${h}`,n].join(" "),strokeWidth:t,stroke:c,...r},[o&&d.createElement("title",{key:"svg-title"},o),...p.map(([v,g])=>d.createElement(v,g)),...Array.isArray(l)?l:[l]]));return a.displayName=`${s}`,a};/**
 * @license @tabler/icons-react v3.26.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var C=m("outline","photo","IconPhoto",[["path",{d:"M15 8h.01",key:"svg-0"}],["path",{d:"M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z",key:"svg-1"}],["path",{d:"M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5",key:"svg-2"}],["path",{d:"M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3",key:"svg-3"}]]);/**
 * @license @tabler/icons-react v3.26.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var P=m("outline","upload","IconUpload",[["path",{d:"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2",key:"svg-0"}],["path",{d:"M7 9l5 -5l5 5",key:"svg-1"}],["path",{d:"M12 4l0 12",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.26.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var x=m("outline","x","IconX",[["path",{d:"M18 6l-12 12",key:"svg-0"}],["path",{d:"M6 6l12 12",key:"svg-1"}]]);export{P as I,b as _,x as a,C as b};
