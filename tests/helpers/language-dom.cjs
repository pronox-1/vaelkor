const vm=require('node:vm'),fs=require('node:fs');
function fixture(saved='de',cards={}){
 const observers=[],raf=[],listeners={};let body;
 function text(value){return{nodeType:3,nodeValue:value,parentNode:null,get parentElement(){return this.parentNode;},get isConnected(){return !!this.parentNode?.isConnected;}};}
 function el(tag='div',value=''){const attrs={},events={};const n={nodeType:1,tagName:tag.toUpperCase(),id:'',childNodes:[],parentNode:null,addEventListener:(k,fn)=>{(events[k]??=[]).push(fn);},dispatchEvent:e=>{for(const fn of events[e.type]||[])fn(e);},hasAttribute:k=>Object.hasOwn(attrs,k),getAttribute:k=>attrs[k]??null,setAttribute:(k,v)=>{attrs[k]=String(v);},appendChild:c=>{c.parentNode=n;n.childNodes.push(c);return c;},contains:c=>{while(c){if(c===n)return true;c=c.parentNode;}return false;},get firstChild(){return n.childNodes[0]||null;},get isConnected(){return n===body||!!n.parentNode?.isConnected;},get textContent(){return n.childNodes.map(c=>c.nodeType===3?c.nodeValue:c.textContent).join('');},set textContent(v){n.childNodes=[];n.appendChild(text(String(v)));}};if(value)n.textContent=value;return n;}
 body=el('body');const select=el('select'),caption=el('span','Sprache');select.id='vkLanguage';caption.id='vkLangCaption';body.appendChild(select);body.appendChild(caption);
 const doc={nodeType:9,body,documentElement:el('html'),getElementById:id=>id==='vkLanguage'?select:id==='vkLangCaption'?caption:null,addEventListener:(k,fn)=>{(listeners[k]??=[]).push(fn);}};
 class Observer{constructor(fn){this.fn=fn;observers.push(this);}observe(target){this.target=target;}disconnect(){}}
 const c=vm.createContext({document:doc,localStorage:{getItem:()=>saved,setItem(){}},MutationObserver:Observer,requestAnimationFrame:fn=>raf.push(fn),setTimeout:fn=>raf.push(fn),console,AetherEngine:{BYID:cards}});c.window=c;c.globalThis=c;
 vm.runInContext(fs.readFileSync('js/interface/language-catalog.js','utf8'),c);
 const before=body.appendChild(el('p','Dein Team'));
 vm.runInContext(fs.readFileSync('js/script-04.js','utf8'),c,{timeout:5000});
 return{api:c.VaelkorLanguage,context:c,body,el,text,doc,before,observers,emit(records,which=0){observers[which].fn(records);},flush(){const queue=raf.splice(0);for(const fn of queue)fn();},ready(){for(const fn of listeners.DOMContentLoaded||[])fn();},get queued(){return raf.length;}};
}
module.exports={fixture};
