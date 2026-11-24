/* TABEE Studio · Thai / English
   หน้าจอเขียนเป็นภาษาไทย เมื่อเลือก EN ระบบแปลข้อความบนจอจากตาราง EN ด้านล่าง
   คีย์คือข้อความภาษาไทยที่แทนตัวเลขด้วย # (เช่น 'ขั้นที่ #') ค่าคือคำแปลที่ใช้ # ตามลำดับเดียวกัน
   เก็บภาษาไว้ที่ localStorage 'tabee-lang' ร่วมกับ PEV Training Studio
   ส่วนที่มี class "th-src" (ผล Auto Check จากชุดกฎภาษาไทยและเนื้อหาจาก SER) และข้อมูลที่ผู้ใช้กรอกจะไม่ถูกแปล */
let LANG='th';try{LANG=localStorage.getItem('tabee-lang')==='en'?'en':'th'}catch(e){}
function setLang(l){LANG=l==='en'?'en':'th';try{localStorage.setItem('tabee-lang',LANG)}catch(e){}document.documentElement.lang=LANG}
document.documentElement.lang=LANG;
const TH=/[฀-๿]/,NUM=/\d+(?:[.,]\d+)*/g;
const EN={};
function lookup(s){const nums=[];const k=s.replace(NUM,m=>{nums.push(m);return'#'});const v=EN[k];if(v==null)return null;let i=0;return v.replace(/#/g,()=>nums[i++]??'')}
/* แปลข้อความหนึ่งชิ้น: ทั้งข้อความ → แยกตามตัวคั่น → แยกเฉพาะช่วงภาษาไทย */
function t(s){if(LANG!=='en'||s==null)return s;s=String(s);if(!TH.test(s))return s;
  const lead=s.match(/^\s*/)[0],trail=s.match(/\s*$/)[0],core=s.trim();let r=lookup(core);
  if(r==null){const parts=core.split(/( · |, | \/ |: )/);if(parts.length>1){const out=parts.map(p=>/^( · |, | \/ |: )$/.test(p)||!TH.test(p)?p:(lookup(p.trim())??null));if(out.every(x=>x!=null))r=out.join('')}}
  if(r==null)r=core.replace(/[฀-๿][฀-๿\s.()“”"\-–]*[฀-๿)]|[฀-๿]/g,m=>lookup(m.trim())??m);
  return lead+r+trail}
const SKIP=new Set(['SCRIPT','STYLE','TEXTAREA','INPUT']);
function translateDOM(root){if(LANG!=='en'||!root)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,{acceptNode(n){
    if(n.nodeType===1)return SKIP.has(n.tagName)||n.classList.contains('th-src')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_SKIP;
    return TH.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});
  const ns=[];while(w.nextNode())ns.push(w.currentNode);ns.forEach(n=>{n.nodeValue=t(n.nodeValue)});
  root.querySelectorAll('[title],[placeholder],[aria-label]').forEach(el=>{if(el.closest('.th-src'))return;for(const a of['title','placeholder','aria-label']){const v=el.getAttribute(a);if(v&&TH.test(v))el.setAttribute(a,t(v))}})}
