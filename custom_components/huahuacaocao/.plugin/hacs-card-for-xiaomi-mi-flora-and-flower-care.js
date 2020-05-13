function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}const e=new WeakMap,i=t=>"function"==typeof t&&e.has(t),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},r={},o={},a=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${a}--\x3e`,d=new RegExp(`${a}|${l}`),c="$lit$";class h{constructor(t,e){this.parts=[],this.element=e;const i=[],s=[],n=document.createTreeWalker(e.content,133,null,!1);let r=0,o=-1,l=0;const{strings:h,values:{length:u}}=t;for(;l<u;){const t=n.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let s=0;for(let t=0;t<i;t++)p(e[t].name,c)&&s++;for(;s-- >0;){const e=h[l],i=f.exec(e)[2],s=i.toLowerCase()+c,n=t.getAttribute(s);t.removeAttribute(s);const r=n.split(d);this.parts.push({type:"attribute",index:o,name:i,strings:r}),l+=r.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),n.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(a)>=0){const s=t.parentNode,n=e.split(d),r=n.length-1;for(let e=0;e<r;e++){let i,r=n[e];if(""===r)i=m();else{const t=f.exec(r);null!==t&&p(t[2],c)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-c.length)+t[3]),i=document.createTextNode(r)}s.insertBefore(i,t),this.parts.push({type:"node",index:++o})}""===n[r]?(s.insertBefore(m(),t),i.push(t)):t.data=n[r],l+=r}}else if(8===t.nodeType)if(t.data===a){const e=t.parentNode;null!==t.previousSibling&&o!==r||(o++,e.insertBefore(m(),t)),r=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(i.push(t),o--),l++}else{let e=-1;for(;-1!==(e=t.data.indexOf(a,e+1));)this.parts.push({type:"node",index:-1}),l++}}else n.currentNode=s.pop()}for(const t of i)t.parentNode.removeChild(t)}}const p=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},u=t=>-1!==t.index,m=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class g{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let r,o=0,a=0,l=n.nextNode();for(;o<i.length;)if(r=i[o],u(r)){for(;a<r.index;)a++,"TEMPLATE"===l.nodeName&&(e.push(l),n.currentNode=l.content),null===(l=n.nextNode())&&(n.currentNode=e.pop(),l=n.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return s&&(document.adoptNode(t),customElements.upgrade(t)),t}}const _=` ${a} `;class b{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let s=0;s<t;s++){const t=this.strings[s],n=t.lastIndexOf("\x3c!--");i=(n>-1||i)&&-1===t.indexOf("--\x3e",n+1);const r=f.exec(t);e+=null===r?t+(i?_:l):t.substr(0,r.index)+r[1]+r[2]+c+r[3]+a}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const y=t=>null===t||!("object"==typeof t||"function"==typeof t),v=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class S{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new w(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(y(t)||!v(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===r||y(t)&&t===this.value||(this.value=t,i(t)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const t=this.value;this.value=r,t(this)}this.value!==r&&this.committer.commit()}}class x{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(m()),this.endNode=t.appendChild(m())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=m()),t.__insert(this.endNode=m())}insertAfterPart(t){t.__insert(this.startNode=m()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}const t=this.__pendingValue;t!==r&&(y(t)?t!==this.value&&this.__commitText(t):t instanceof b?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):v(t)?this.__commitIterable(t):t===o?(this.value=o,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof g&&this.value.template===e)this.value.update(t.values);else{const i=new g(e,t.processor,this.options),s=i._clone();i.update(t.values),this.__commitNode(s),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new x(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){n(this.startNode.parentNode,t.nextSibling,this.endNode)}}class C{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}if(this.__pendingValue===r)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=r}}class P extends S{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends w{}let N=!1;try{const t={get capture(){return N=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class E{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}if(this.__pendingValue===r)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=A(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=r}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const A=t=>t&&(N?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const R=new class{handleAttributeExpressions(t,e,i,s){const n=e[0];return"."===n?new P(t,e.slice(1),i).parts:"@"===n?[new E(t,e.slice(1),s.eventContext)]:"?"===n?[new C(t,e.slice(1),i)]:new S(t,e,i).parts}handleTextExpression(t){return new x(t)}};function k(t){let e=$.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},$.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(a);return void 0===(i=e.keyString.get(s))&&(i=new h(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const $=new Map,O=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const V=(t,...e)=>new b(t,e,"html",R),I=133;function M(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,I,null,!1);let r=z(s),o=s[r],a=-1,l=0;const d=[];let c=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(d.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==o&&o.index===a;)o.index=null!==c?-1:o.index-l,o=s[r=z(s,r)]}d.forEach(t=>t.parentNode.removeChild(t))}const U=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,I,null,!1);for(;i.nextNode();)e++;return e},z=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(u(e))return i}return-1};const j=(t,e)=>`${t}--${e}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const B=t=>e=>{const i=j(e.type,t);let s=$.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},$.set(i,s));let n=s.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(a);if(void 0===(n=s.keyString.get(r))){const i=e.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(i,t),n=new h(e,i),s.keyString.set(r,n)}return s.stringsArray.set(e.strings,n),n},H=["html","svg"],L=new Set,F=(t,e,i)=>{L.add(t);const s=i?i.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(s,t);const o=document.createElement("style");for(let t=0;t<r;t++){const e=n[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{H.forEach(e=>{const i=$.get(j(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),M(t,i)})})})(t);const a=s.content;i?function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const r=document.createTreeWalker(s,I,null,!1);let o=z(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===i&&(a=U(e),i.parentNode.insertBefore(e,i));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=z(n,o);return}o=z(n,o)}}(i,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),M(i,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const W={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},D=(t,e)=>e!==t&&(e==e||t==t),J={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:D},Y=Promise.resolve(!0),G=1,X=4,K=8,Q=16,Z=32,tt="finalized";class et extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=Y,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=J){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const s=this[t];this[i]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(tt)||t.finalize(),this[tt]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=D){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||W,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||W.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Z,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=J){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|K,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~K}}_attributeToProperty(t,e){if(this._updateState&K)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i._classProperties.get(s)||J;this._updateState=this._updateState|Q,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~Q}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,n=s._classProperties.get(t)||J;s._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&Q||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|X;const i=this._updatePromise;this._updatePromise=new Promise((i,s)=>{t=i,e=s});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Z}get _hasRequestedUpdate(){return this._updateState&X}get hasUpdated(){return this._updateState&G}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&G||(this._updateState=this._updateState|G,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~X}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}et[tt]=!0;const it=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}}:Object.assign({},e,{finisher(i){i.createProperty(e.key,t)}}),st=(t,e,i)=>{e.constructor.createProperty(i,t)};function nt(t){return(e,i)=>void 0!==i?st(t,e,i):it(t,e)}const rt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol();class at{constructor(t,e){if(e!==ot)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(rt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const lt=(t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof at)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new at(i,ot)};(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const dt=t=>t.flat?t.flat(1/0):function t(e,i=[]){for(let s=0,n=e.length;s<n;s++){const n=e[s];Array.isArray(n)?t(n,i):i.push(n)}return i}(t);class ct extends et{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){dt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?rt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof b&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}ct.finalized=!0,ct.render=((t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const s=i.scopeName,r=O.has(e),o=q&&11===e.nodeType&&!!e.host,a=o&&!L.has(s),l=a?document.createDocumentFragment():e;if(((t,e,i)=>{let s=O.get(e);void 0===s&&(n(e,e.firstChild),O.set(e,s=new x(Object.assign({templateFactory:k},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,l,Object.assign({templateFactory:B(s)},i)),a){const t=O.get(l);O.delete(l);const i=t.value instanceof g?t.value.template:void 0;F(s,l,i),n(e,e.firstChild),e.appendChild(l),O.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)});let ht=lt`rgb(14, 171, 56)`;const pt=lt`
    ha-card {
        padding: 24px 16px 16px 16px;
        background-repeat: no-repeat;
        background-size: 100% 100% !important;
    }
    
    .banner {
        display: flex;
        align-items: flex-end;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        padding-top: 12px;
        
        background-color: var(--banner-background);
        border-radius: 3px;
    }
    
    .has-plant-image .banner {
        padding-top: 30%;
    }
    
    .header {
        @apply --paper-font-headline;
        line-height: 40px;
        padding: 8px 16px;
        font-weight: 500;
        font-size: 125%;
    }
    
    .has-plant-image .header {
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        padding: 16px;
        color: white;
        width: 100%;
        background: rgba(0, 0, 0, var(--dark-secondary-opacity));
    }
    
    .content {
        display: flex;
        justify-content: space-between;
        padding: 16px 32px 24px 32px;
        background-color: var(--content-background);
        border-radius: 3px;
    }
    
    .has-plant-image .content {
        padding-bottom: 16px;
    }
    
    ha-icon {
        color: var(--paper-item-icon-color);
        margin-bottom: 8px;
    }
    
    .attributes {
        cursor: pointer;
    }
    
    .attributes div {
        text-align: center;
    }
    
    .problem {
        color: var(--google-red-500);
        font-weight: bold;
    }
    
    .uom {
        color: var(--secondary-text-color);
    }
    
    .table-tr-td-border-bottom {
        border-bottom-color: var(--table-tr-td-border-bottom);
        border-bottom: solid 1px;
    }
   
    .div-border-top {
        border-top-color: var(--table-tr-td-border-bottom);
        border-top: solid 1px;
    }
    
    .div-border-bottom >table {
        border-bottom-color: var(--table-tr-td-border-bottom);
        border-bottom: solid 1px;
    }

/* CUSTOM */
   
    table {
        width: 100%;
    }   
     
    table thead {
    
    }
    
    table tr {
      border-top: 1px solid black; 
    }
    
    table tr:first-child {
      border-top: 0;
    }
    
    table tr:first-child {
      border-left: 0; border-right: 0;
    }
    
    table tr:last-child {
      border-bottom: 0;
    }
    
    table tr:last-child{
      border-right: 0;
    }

    .fcasttooltip {
        position: relative;
        display: inline-block;
    }
    
    .fcasttooltip .fcasttooltiptext {
        visibility: hidden;
        
        width: ${400}px;
        background-color: ${lt`rgba(50,50,50,0.85)`};
        color: ${lt`#fff`};
        text-align: center; 
        border-radius: 6px;
        border-style: solid;
        border-color: ${ht};
        border-width: ${1}px;
        padding: 5px 0;
        /* Position the tooltip */
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 0%; 
        margin-left: ${-325}px;
    }
      
    .fcasttooltip .fcasttooltiptext:after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -${5}px;
        border-width: ${5}px;
        border-style: solid;
        border-color: ${ht} transparent transparent transparent;
    }
      
    .fcasttooltip:hover .fcasttooltiptext {
        visibility: ${lt`visible`};
    }
`;console.info("%c XIAOMI-MI-FLORA-AND-FLOWER-CARE-CARD %c 1.2.0 ","color: white; background: green; font-weight: 700;","color: coral; background: white; font-weight: 700;");let ut=class extends ct{constructor(){super(...arguments),this.invalidConfig=!1,this.invalidEntity=!1,this.displayInfo=!1,this.displayMaintenance=!1,this.MOINSTURE="moisture",this.CONDUCTIVITY="conductivity",this.BRIGHTNESS="brightness",this.TEMPERATURE="temperature",this.BATTERY="battery"}setConfig(t){if(console.log({flora_care_card_config:t}),!t)throw this.invalidConfig=!0,new Error("Invalid configuration");if(!t.entity||0==t.entity.length)throw this.invalidEntity=!0,new Error("Entity is required");if(t.display&&t.display.length>0){let e=t.display.map(function(t){return t.toLocaleLowerCase()});this.displayMaintenance=e.includes("maintenance"),this.displayInfo=e.includes("info")}this._config=t}getCardSize(){return 1}static get styles(){return pt}render(){return this.invalidConfig||this.invalidEntity?V`
            <ha-card class="ha-card-waze-travel-time">
                <div class='banner'>
                    <div class="header">xiaomi-mi-flora-and-flower-care-card</div>
                </div>
                <div class='content'>
                    Configuration ERROR!
                </div>
            </ha-card>
        `:this._render()}_render(){this._floraCare=this.hass.states[this._config.entity],this._floraRanges=this._floraCare.attributes.ranges;let t=this.computeContent(),e=""!==t.strings.raw.toString(),i=this.displayInfo&&(this.displayMaintenance||e)?"banner div-border-bottom":"banner",s=this.displayMaintenance&&e?"banner div-border-bottom":"banner";return V`
      <ha-card style="background-image:url(${this._floraCare.attributes.image});background-repeat: no-repeat;background-size: auto !important;">
        <div class='banner'>${this.computeHeader()}
        </div>
        ${this.displayInfo?V`
        <div class='${i}' style="padding-left: 16px;padding-right: 16px;">${this.computeInfoToolTips(this._floraCare.attributes.info)}</div>
        `:V``}
        ${this.displayMaintenance?V`
        <div class='${s}' style="padding-left: 16px;padding-right: 16px;">${this.computeMaintenanceToolTips(this._floraCare.attributes.maintenance)}</div>
        `:V``}
        ${e?V`
        <div class='content'>
            ${t}
        </div>
        `:V``}
      </ha-card>
        `}computeContent(){let t=this.getSensor(this._floraCare.attributes.sensors[this.MOINSTURE]),e=this.getSensor(this._floraCare.attributes.sensors[this.CONDUCTIVITY]),i=this.getSensor(this._floraCare.attributes.sensors[this.BRIGHTNESS]),s=this.getSensor(this._floraCare.attributes.sensors[this.TEMPERATURE]);return t||e||i||s?V`
                ${t?this.computeContentItem(t,this._floraRanges.min_soil_moist,this._floraRanges.max_soil_moist,this.computeAttributeClass(this._floraCare.attributes.problem,t,this.MOINSTURE),"mdi:water-percent"):V``}
                ${e?this.computeContentItem(e,this._floraRanges.min_soil_ec,this._floraRanges.max_soil_ec,this.computeAttributeClass(this._floraCare.attributes.problem,e,this.CONDUCTIVITY),"mdi:flash-circle"):V``}
                ${i?this.computeContentItem(i,this._floraRanges.min_light_lux,this._floraRanges.max_light_lux,this.computeAttributeClass(this._floraCare.attributes.problem,i,this.BRIGHTNESS),"mdi:white-balance-sunny"):V``}
                ${s?this.computeContentItem(s,this._floraRanges.min_temp,this._floraRanges.max_temp,this.computeAttributeClass(this._floraCare.attributes.problem,s,this.TEMPERATURE),"mdi:thermometer"):V``}
            `:V``}computeTitle(){return this._config&&this._config.name}computeContentItem(t,e,i,s,n){if(void 0!==t){let r=t.attributes&&t.attributes.icon?t.attributes.icon:n;return V`
             <div class="attributes" @click=${e=>this.handlePopup(e,t.entity_id)}>
                <div>
                    <ha-icon icon="${r}"></ha-icon>
                </div>
                <div class="${s}">
                    ${-1===t.state.indexOf("unknown")?t.state+" "+t.attributes.unit_of_measurement:"n/a"}
                </div>
                <div class="uom">
                ${null!==e&&null!==i?V`${e}-${i}`:V``}
                </div>            
            </div>           
        `}return V`
            `}computeMaintenanceToolTips(t){return V`
            <table class="s-table-lite">
                <thead>
                    <tr><td colspan="2" class="table-tr-td-border-bottom" style="text-align: center;font-weight: 500;">Maintenance</td></tr>
                </thead>
                <tbody> 
                    ${Object.keys(t).map(e=>V`
                        <tr>
                            <td valign="top" style="width:1%;text-align: left;line-height: 1em;font-weight: 500;font-size: 85%;">${this.capitalize(e)}</td>
                            <td valign="top" style="text-align: left;line-height: 1em;font-weight: normal;font-size: 85%;">${t[e]}</td>
                        </tr>    
                    `)}  
                </tbody>
            </table>      
        `}computeInfoToolTips(t){return V`
            <table is="s-table-lite tabGeral">
                <tbody>
                    ${Object.keys(t).filter(t=>"floral_language"!=t).map(e=>V`
                        <tr>
                            <td valign="top" style="width:1%;text-align: left;line-height: 1em;font-weight: 500;font-size: 85%;">${this.capitalize(e)}</td>
                            <td valign="top" style="text-align: left;line-height: 1em;font-weight: normal;font-size: 85%;">${t[e]}</td>
                        </tr>    
                    `)}                    
                </tbody>
            </table>      
        `}computeHeader(){let t=this.getSensor(this._floraCare.attributes.sensors[this.BATTERY]);return V`
            <table is="s-table-lite">
                <tbody>
                    <tr>
                        <td valign="top" class="header" style="padding-bottom: 0;">${this.computeTitle()}</td>
                        <td>
                            <div class="attributes">
                                <div class="fcasttooltip">
                                    <ha-icon icon="mdi:information-variant"></ha-icon>
                                    <div class="fcasttooltiptext">${this.computeInfoToolTips(this._floraCare.attributes.info)}</div>
                                </div>
                                <div class=""></div>
                                <div class="uom">&nbsp;</div>            
                            </div>                            
                        </td>  
                        <td>
                            <div class="attributes">
                                <div class="fcasttooltip">
                                    <ha-icon icon="mdi:lifebuoy"></ha-icon>
                                    <div class="fcasttooltiptext">${this.computeMaintenanceToolTips(this._floraCare.attributes.maintenance)}</div>
                                </div>
                                <div class=""></div>
                                <div class="uom">&nbsp;</div>            
                            </div>                            
                        </td>                        
                        <td>
                        ${this.computeContentItem(t,null,null,this.computeAttributeClass(this._floraCare.attributes.problem,t,this.BATTERY),"mdi:battery-charging")}  
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="5" class="header table-tr-td-border-bottom" style="text-align: right;padding-right: 8px;padding-top: 6;line-height: 1em;font-weight: normal;font-size: 105%;">${this._config.zone_name}</td>
                    </tr>
                </tbody>
            </table>           
        `}computeAttributeClass(t,e,i){return-1===t.indexOf(i)&&void 0!==e&&-1===e.state.indexOf("unknown")?"":"problem"}getSensor(t){return this.hass.states[t]}capitalize(t){return t.charAt(0).toUpperCase()+t.slice(1)}handlePopup(t,e){t.stopPropagation();let i=new Event("hass-more-info",{composed:!0});i.detail={entityId:e},this.dispatchEvent(i)}};t([nt()],ut.prototype,"hass",void 0),t([nt()],ut.prototype,"_config",void 0),t([nt()],ut.prototype,"_floraCare",void 0),t([nt()],ut.prototype,"_floraRanges",void 0),ut=t([(t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e))("xiaomi-mi-flora-and-flower-care-card")],ut);
