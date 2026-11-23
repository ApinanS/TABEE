/* TABEE Studio · ต้นแบบหน้าจอของ TABEE AMS (ทำงานในเบราว์เซอร์ทั้งหมด ไม่มีเซิร์ฟเวอร์ ไม่ส่งข้อมูลออก)
   ข้อมูลเก็บใน localStorage (สถานะ) และ IndexedDB (ไฟล์ที่อัปโหลดและข้อความที่ดึงได้) ของเครื่องผู้ใช้ */
'use strict';
const KEY='tabee-studio-v1';
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const LOC=()=>LANG==='en'?'en-GB':'th-TH';
const fmtD=t=>t?'<span class="dt">'+new Date(t).toLocaleDateString(LOC(),{day:'numeric',month:'short',year:'numeric'})+'</span>':'';
const fmtDT=t=>t?'<span class="dt">'+new Date(t).toLocaleString(LOC(),{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})+'</span>':'';
const fmtS=n=>!n?'':n>1048576?(n/1048576).toFixed(1)+' MB':Math.max(1,Math.round(n/1024))+' KB';
const uid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);

let S;
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.v===SEEDVER)return s}catch(e){}return SEED()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('บันทึกไม่สำเร็จ พื้นที่เก็บข้อมูลของเบราว์เซอร์เต็ม')}}
function roleName(){return ROLES.find(r=>r.k===S.role).th}
function log(msg,en){S.log.unshift({t:new Date().toISOString(),role:S.role,who:roleName(),msg,en});S.log=S.log.slice(0,300)}
function toast(m){const el=$('#toast');el.textContent=t(m);el.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>el.classList.remove('on'),2800)}
const iname=p=>(LANG==='en'&&INST_EN[p.inst])||S.inst[p.inst]||p.instName||'';
const raw=s=>`<span class="th-src">${esc(s)}</span>`;
const vname=v=>(LANG==='en'&&PEV_EN[v.id])||v.name;
const prog=id=>S.programs.find(p=>p.id===id);
const pev=id=>S.pevs.find(v=>v.id===id);
const can=(...roles)=>S.role==='all'||roles.includes(S.role);
const trackTag=t=>`<span class="tag ${TRACK[t].cls}">${t} · ${TRACK[t].accord}</span>`;
const statusTag=p=>`<span class="tag ${STATUS[p.status].cls}">${STATUS[p.status].th}</span>`;
const chip=(r,cls='')=>`<span class="chip ${cls} r-${r||0}" title="${esc(LV[r]||'ยังไม่มีผล')}">${r||'·'}</span>`;
const legend=()=>`<div class="legend">${LVO.map(r=>`<span>${chip(r,'sm')}${LV[r]}</span>`).join('')}</div>`;
const pname=p=>esc(LANG==='en'&&p.nameEn?p.nameEn.replace(/^B\.\w+\.\s*\((.*)\)$/,'$1'):(p.nameTh||'(ยังไม่ตั้งชื่อหลักสูตร)').replace(/^.*สาขาวิชา/,''));
const worst=crit=>{let w=-1;for(const c in crit||{})w=Math.max(w,LVO.indexOf(crit[c]));return w<0?'':LVO[w]};
function stepOf(p){return p.status==='decided'?26:STATUS[p.status].step}
function dots(p){const s=stepOf(p);let h='';for(let i=1;i<=26;i++)h+=`<i class="${i<s||s===26?'d':i===s?'c':''}"></i>`;return `<span class="dots" title="ขั้นที่ ${s} จาก 26">${h}</span>`}
/* กฎเชื่อมระดับข้อค้นพบกับผลที่เสนอ (เอกสารออกแบบ หัวข้อ 8.5) */
function allowed(crit){const w=worst(crit);return w==='D'?['wait','no']:w==='W'?['cond','prov','wait']:['full','prov']}

/* ---------- IndexedDB: ไฟล์และข้อความที่ดึงได้ ---------- */
let _db;
function db(){return _db||(_db=new Promise((res,rej)=>{const r=indexedDB.open('tabee-studio',1);r.onupgradeneeded=()=>r.result.createObjectStore('files',{keyPath:'id'});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}))}
async function idb(mode,fn){const d=await db();return new Promise((res,rej)=>{const tx=d.transaction('files',mode),rq=fn(tx.objectStore('files'));tx.oncomplete=()=>res(rq&&rq.result);tx.onerror=()=>rej(tx.error)})}
const fput=rec=>idb('readwrite',s=>s.put(rec)),fget=id=>idb('readonly',s=>s.get(id)),fdel=id=>idb('readwrite',s=>s.delete(id));

/* ---------- ดึงข้อความจากไฟล์ (ไลบรารีชุดเดียวกับ PEV Studio) ---------- */
const LIB='pevstudio/lib/',libs={};
function lib(url){return libs[url]||(libs[url]=new Promise((res,rej)=>{const s=document.createElement('script');s.src=url;s.onload=res;s.onerror=()=>{delete libs[url];rej(new Error('โหลดไลบรารีไม่สำเร็จ'))};document.head.appendChild(s)}))}
async function extractText(name,blob){const ext=(name.split('.').pop()||'').toLowerCase();
  if(ext==='pdf'){const W=LIB+'pdf.js/3.11.174/pdf.worker.min.js';await lib(LIB+'pdf.js/3.11.174/pdf.min.js');pdfjsLib.GlobalWorkerOptions.workerSrc=W;
    const pdf=await pdfjsLib.getDocument({data:await blob.arrayBuffer(),cMapUrl:LIB+'pdf.js/3.11.174/cmaps/',cMapPacked:true}).promise;let out='';
    for(let p=1;p<=pdf.numPages;p++){const tc=await(await pdf.getPage(p)).getTextContent();out+='\n[หน้า '+p+']\n'+tc.items.map(i=>i.str+(i.hasEOL?'\n':'')).join('')}return out}
  if(ext==='docx'){await lib(LIB+'mammoth/1.6.0/mammoth.browser.min.js');return(await mammoth.extractRawText({arrayBuffer:await blob.arrayBuffer()})).value}
  if(['xlsx','xls','csv'].includes(ext)){await lib(LIB+'xlsx/0.18.5/xlsx.full.min.js');const wb=XLSX.read(await blob.arrayBuffer(),{type:'array'});return wb.SheetNames.map(n=>'[แผ่นงาน '+n+']\n'+XLSX.utils.sheet_to_csv(wb.Sheets[n])).join('\n')}
  if(['md','txt','html'].includes(ext))return blob.text();
  return ''}
async function fileText(f){let rec=await fget(f.id);
  if(!rec&&f.demo){const r=await fetch(f.demo);if(!r.ok)throw new Error('เปิดไฟล์ตัวอย่างไม่สำเร็จ');rec={id:f.id,blob:await r.blob()}}
  if(!rec)return '';
  if(rec.text==null){rec.text=await extractText(f.demo||f.name,rec.blob);await fput(rec)}
  return rec.text}

/* ---------- routing ---------- */
function route(){const h=location.hash.replace(/^#\/?/,'').split('/');return{sec:h[0]||'home',id:h[1]||'',tab:h[2]||''}}
const go=h=>{location.hash='#/'+h};
let UI={crit:0,busy:''};
function visibleSecs(){const r=ROLES.find(x=>x.k===S.role);return r.secs}

function renderNav(){const R=route(),vis=visibleSecs();
  const cnt={program:S.programs.filter(p=>['draft','more'].includes(p.status)).length,screen:S.programs.filter(p=>p.status==='submitted').length,
    team:S.programs.filter(p=>p.status==='accepted').length,pevstudio:S.programs.filter(p=>p.status==='visit').length,
    review:S.programs.filter(p=>p.status==='reported').length,decision:S.programs.filter(p=>p.status==='reviewed').length,apply:S.apps.filter(a=>a.status==='รอคัดเลือก').length};
  $('#nav').innerHTML=`<a class="brand" href="#/home"><span class="mk"><i></i><i></i><i></i><i></i><i></i><i></i></span><span><b>TABEE Studio</b><small>ACCREDITATION WORKSPACE</small></span></a>`+
    NAV.map(g=>{const it=g.items.filter(i=>!vis||vis.includes(i[0]));if(!it.length)return'';
      return `<div class="phase"><div class="phase-h">${esc(g.h)}</div>${it.map(i=>`<a class="step${R.sec===i[0]?' on':''}" href="#/${i[0]}"><span>${esc(i[1])}</span>${cnt[i[0]]?`<b>${cnt[i[0]]}</b>`:''}</a>`).join('')}</div>`}).join('')+
    `<div class="rail-foot"><span>ต้นแบบหน้าจอ ข้อมูลตัวอย่างเป็นข้อมูลสมมติ และเก็บในเบราว์เซอร์ของเครื่องนี้เท่านั้น</span><button data-act="reset">ล้างข้อมูลและเริ่มใหม่</button></div>`}
function renderTop(crumbs){$('#top').innerHTML=`<button class="btn sm" id="menuBtn" data-act="menu" aria-label="เมนู">☰</button>
  <div class="crumb">${crumbs.map((c,i)=>i<crumbs.length-1?`<a href="#/${c[0]}">${esc(c[1])}</a><span>/</span>`:`<b>${esc(c[1])}</b>`).join('')}</div>
  <div class="seg lang" role="group" aria-label="Language"><button data-act="lang" data-v="th" class="${LANG==='th'?'on':''}">TH</button><button data-act="lang" data-v="en" class="${LANG==='en'?'on':''}">EN</button></div>
  <div class="who"><span>บทบาท</span><span class="pill"><span class="av">${esc(t(roleName())[0])}</span><select data-act="role" aria-label="บทบาท">${ROLES.map(r=>`<option value="${r.k}"${r.k===S.role?' selected':''}>${esc(r.th)}</option>`).join('')}</select></span></div>`}

const VIEWS={};
let _rn=0;function render(){if(_rn){_rn=2;return}_rn=1;try{renderNow()}finally{const again=_rn===2;_rn=0;if(again)render()}}
function renderNow(){const R=route();document.body.classList.remove('menu');
  if(!VIEWS[R.sec]){go('home');return}
  const out=VIEWS[R.sec](R);renderNav();renderTop(out.crumbs);
  const v=$('#view'),same=render.last===location.hash,keep=same?v.scrollTop:0,wy=window.scrollY;render.last=location.hash;
  v.innerHTML=`<div class="wrap">${out.html}</div>`;translateDOM($('#nav'));translateDOM($('#top'));translateDOM(v);v.scrollTop=keep;window.scrollTo(0,same?wy:0);
  document.title=t(out.crumbs[out.crumbs.length-1][1])+' · TABEE Studio'}
const head=(eyebrow,title,desc,right='')=>`<div class="phead"><div class="col"><span class="eyebrow">${esc(eyebrow)}</span><h1>${title}</h1><p>${desc}</p></div>${right}</div>`;
const field=(label,inner,req)=>`<label class="f"><span>${esc(label)}${req?' <em>*</em>':''}</span>${inner}</label>`;
const inp=(o,path,val,dis,type='text',extra='')=>`<input type="${type}" data-o="${o}" data-b="${path}" value="${esc(val==null?'':val)}"${dis?' disabled':''} ${extra}>`;
const sel=(o,path,val,opts,dis,r)=>`<select data-o="${o}" data-b="${path}"${r?' data-r="1"':''}${dis?' disabled':''}>${Object.entries(opts).map(([k,v])=>`<option value="${esc(k)}"${String(val)===k?' selected':''}>${esc(v)}</option>`).join('')}</select>`;

/* ================= หน้าหลัก ================= */
VIEWS.home=()=>{const n=k=>S.programs.filter(p=>k.includes(p.status)).length;
  const pipe=[['program','1','หลักสูตร','กรอกข้อมูลหลักสูตร เลือก EAC หรือ ETC แล้วยื่น SER และเอกสารแนบ',n(['draft','more'])+' แฟ้มรอหลักสูตรดำเนินการ'],
    ['screen','2','คณะกลั่นกรอง','Auto Check ว่า SER ขาดส่วนใด ควรปรับปรุงส่วนใด แล้วลงผลรับคำขอ',n(['submitted'])+' คำขอรอกลั่นกรอง'],
    ['training','3','PEV','อบรม ลงทะเบียน แฟ้มสะสมผลงาน และการเลือกคณะผู้ตรวจ',n(['accepted'])+' คำขอรอแต่งตั้งคณะผู้ตรวจ'],
    ['pevstudio','4','PEV Studio','ตรวจประเมินตาม PEV Worksheet แยก EAC และ ETC',n(['visit'])+' หลักสูตรอยู่ระหว่างตรวจ'],
    ['decision','5','ตัดสินผล','ตรวจทานผลประเมินของแต่ละหลักสูตรในรอบ แล้วเข้า Decision Meeting',n(['reported','reviewed'])+' หลักสูตรรอพิจารณา']];
  const vis=visibleSecs();
  return{crumbs:[['home','หน้าหลัก']],html:
  head('TABEE Accreditation Workspace','TABEE Studio','ระบบงานรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์ของ TABEE ในที่เดียว ตั้งแต่หลักสูตรยื่น SER การกลั่นกรอง การพัฒนาและเลือกผู้ตรวจประเมิน การตรวจประเมิน จนถึง Decision Meeting')+
  `<span class="note info">หน้านี้เป็นต้นแบบหน้าจอตามเอกสารออกแบบ TABEE AMS ทำงานในเบราว์เซอร์ทั้งหมด ข้อมูลที่กรอกและไฟล์ที่อัปโหลดอยู่ในเครื่องนี้เท่านั้น ไม่ส่งไปที่ใด รายชื่อสถาบัน หลักสูตร และผู้ตรวจที่เห็นเป็นข้อมูลสมมติ เลือก "บทบาท" ที่มุมขวาบนเพื่อดูหน้าจอของแต่ละฝ่าย</span>
  <div class="pipe">${pipe.filter(x=>!vis||vis.includes(x[0])).map(x=>`<a href="#/${x[0]}"><span class="n">ส่วนที่ ${x[1]}</span><b>${x[2]}</b><small>${x[3]}</small><span class="cnt">${x[4]}</span></a>`).join('')}</div>
  <div class="kpis">
    <div class="kpi"><span>คำขอทั้งหมดในระบบ</span><b>${S.programs.length}</b><small>EAC ${S.programs.filter(p=>p.track==='EAC').length} · ETC ${S.programs.filter(p=>p.track==='ETC').length}</small></div>
    <div class="kpi" style="--k:var(--rR)"><span>รอกลั่นกรอง SER</span><b>${n(['submitted'])}</b><small>ขั้นที่ 8</small></div>
    <div class="kpi" style="--k:var(--rW)"><span>อยู่ระหว่างตรวจประเมิน</span><b>${n(['visit'])}</b><small>ขั้นที่ 12–18</small></div>
    <div class="kpi" style="--k:var(--rC)"><span>รอ Decision Meeting</span><b>${n(['reported','reviewed'])}</b><small>ขั้นที่ 20–22</small></div>
    <div class="kpi" style="--k:var(--rN)"><span>PEV พร้อมรับงาน</span><b>${S.pevs.filter(v=>v.confirmed&&v.refresher&&v.avail).length}</b><small>จากทะเบียน ${S.pevs.length} คน</small></div>
  </div>
  <div class="card"><h2>คำขอรับรองในระบบ</h2>${reqTable(S.programs)}</div>`}};
function reqTable(list){return `<div class="tw"><table class="t"><thead><tr><th>หลักสูตร</th><th>สถาบัน</th><th>ประเภท</th><th>สถานะ</th><th>ความคืบหน้า 26 ขั้น</th></tr></thead><tbody>${
  list.map(p=>`<tr><td><a href="#/program/${p.id}">${pname(p)}</a><div class="tiny muted mono">${esc(p.receipt||'ยังไม่ยื่น')}</div></td><td>${esc(iname(p))}</td><td>${trackTag(p.track)}</td><td>${statusTag(p)}</td><td>${dots(p)}</td></tr>`).join('')||'<tr><td colspan="5" class="muted">ยังไม่มีคำขอ</td></tr>'}</tbody></table></div>`}

/* ================= Workflow 26 ขั้น ================= */
VIEWS.workflow=R=>{const p=prog(R.id)||S.programs[0],s=p?stepOf(p):0;
  return{crumbs:[['home','หน้าหลัก'],['workflow','Workflow 26 ขั้น']],html:
  head('ภาพรวม','Workflow การรับรอง 26 ขั้น','คำขอหนึ่งฉบับเดินตาม 26 ขั้นที่ TABEE ใช้อยู่ แต่ละขั้นมีผู้รับผิดชอบ และขั้นถัดไปเปิดเมื่อขั้นก่อนหน้าปิดแล้ว ทุกฝ่ายเห็นแถบความคืบหน้าเดียวกัน',
    `<label class="f" style="min-width:280px"><span>เลือกคำขอ</span><select data-act="pickwf">${S.programs.map(x=>`<option value="${x.id}"${x===p?' selected':''}>${pname(x)} · ${x.track}</option>`).join('')}</select></label>`)+
  (p?`<div class="card"><h2>${pname(p)} ${trackTag(p.track)} ${statusTag(p)}</h2>
   <div class="steps">${STEPS.slice(1).map((st,i)=>{const no=i+1,cls=s===26||no<s?'done':no===s?'cur':'todo';
     return `<div class="st ${cls}"><span class="no">${no}</span><span>${esc(st.t)}${st.opt?' <span class="tiny muted">(ถ้ามี)</span>':''}<div class="tiny muted">${esc(st.o)}</div></span>${st.sec&&cls!=='todo'?`<a class="btn sm ghost" href="#/${st.sec}${['program','screen','team','review'].includes(st.sec)?'/'+p.id:''}">เปิดหน้าจอ</a>`:'<span></span>'}</div>`}).join('')}</div>
   <span class="note info">ต้นแบบนี้ทำหน้าจอของขั้นที่ 1–2, 8–9, 11–12, 18, 20, 22 และ 26 ส่วนขั้นการเงิน การนัดตรวจเยี่ยม และสายอนุมัติหลัง Decision Meeting แสดงเป็นขั้นในแถบความคืบหน้าเท่านั้น</span></div>`:'')}};

/* ================= 1 หลักสูตร ================= */
VIEWS.program=R=>R.id&&prog(R.id)?programView(prog(R.id),R.tab||'info'):{crumbs:[['home','หน้าหลัก'],['program','แฟ้มหลักสูตร']],html:
  head('ส่วนที่ 1 · หลักสูตร','แฟ้มหลักสูตรและการยื่น SER','หลักสูตรหนึ่งมีแฟ้มเดียวตลอดอายุ กรอกรายละเอียดหลักสูตร เลือกประเภทการรับรอง แล้วยื่น SER และเอกสารแนบผ่านระบบช่องทางเดียว',
    can('inst','staff')?`<button class="btn pri lg" data-act="newprog">+ เพิ่มหลักสูตร</button>`:'')+reqTable(S.programs)};
function editable(p){return p.status==='draft'&&can('inst')}
function missing(p){const m=[];if(!p.nameTh)m.push('ชื่อหลักสูตร (ไทย)');if(!(S.inst[p.inst]||p.instName))m.push('ชื่อสถาบัน');if(!p.field)m.push('สาขา');
  if(!(p.contacts||{}).coord)m.push('ชื่อผู้ประสานงาน');if(!(p.contacts||{}).email)m.push('อีเมลผู้ประสานงาน');
  if(!p.files.some(f=>f.kind==='SER'))m.push('ไฟล์ SER');if(ELIG[p.track].some((e,i)=>!p.elig[i]&&!(i===2&&p.reqType==='prov')))m.push('ยืนยันคุณสมบัติก่อนยื่นให้ครบ');return m}
function programView(p,tab){const o='p:'+p.id,ed=editable(p),dis=!ed,c=p.contacts||(p.contacts={}),st=p.students||(p.students={});
  const tabs=[['info','ข้อมูลหลักสูตร'],['people','ผู้ติดต่อและนิสิต'],['submit','ยื่น SER และเอกสารแนบ'],['track','ความคืบหน้า']];
  let body='';
  if(tab==='info')body=`<div class="card"><h2>ประเภทการรับรอง</h2><p class="small muted">เลือกให้ตรงกับประเภทหลักสูตร ระบบจะใช้เกณฑ์ ชุดตรวจ Auto Check และ PEV Studio ของประเภทนั้น</p>
     <div class="tracks">${['EAC','ETC'].map(t=>`<button class="track ${TRACK[t].cls}${p.track===t?' on':''}" data-act="track" data-id="${p.id}" data-v="${t}"${dis?' disabled':''}><b>${t} · ${TRACK[t].accord}</b><span>${TRACK[t].full}</span><small>${TRACK[t].note}</small></button>`).join('')}</div></div>
    <div class="card"><h2>ข้อมูลพื้นฐาน</h2><div class="grid2">
     ${field('ชื่อหลักสูตร (ไทย)',inp(o,'nameTh',p.nameTh,dis),1)}${field('ชื่อหลักสูตร (อังกฤษ)',inp(o,'nameEn',p.nameEn,dis))}
     ${field('สถาบันการศึกษา',inp(o,'instName',S.inst[p.inst]||p.instName,dis||!!S.inst[p.inst]),1)}${field('คณะ / ภาควิชา',inp(o,'faculty',p.faculty,dis))}
     ${field('สาขา',sel(o,'field',p.field,Object.assign({'':'เลือกสาขา'},FIELDS),dis),1)}${field('วิทยาเขต',inp(o,'campus',p.campus,dis))}
     ${field('ปีหลักสูตร (พ.ศ. ที่ปรับปรุง)',inp(o,'year',p.year,dis,'number'))}${field('รูปแบบ',sel(o,'format',p.format,FORMAT,dis))}
    </div></div>`;
  if(tab==='people')body=`<div class="card"><h2>ผู้ติดต่อ</h2><div class="grid2">
     ${field('คณบดี',inp(o,'contacts.dean',c.dean,dis))}${field('หัวหน้าภาควิชา',inp(o,'contacts.head',c.head,dis))}
     ${field('ประธานหลักสูตร',inp(o,'contacts.chair',c.chair,dis))}${field('ผู้ประสานงานหลักสูตร',inp(o,'contacts.coord',c.coord,dis),1)}
     ${field('อีเมลผู้ประสานงาน',inp(o,'contacts.email',c.email,dis,'email'),1)}${field('โทรศัพท์',inp(o,'contacts.phone',c.phone,dis))}</div></div>
    <div class="card"><h2>นิสิตและบัณฑิต</h2><div class="grid2">
     ${field('จำนวนรับต่อปี',inp(o,'students.intake',st.intake,dis,'number'))}${field('จำนวนนิสิตคงอยู่ทุกชั้นปี',inp(o,'students.enrolled',st.enrolled,dis,'number'))}
     ${field('ผู้สำเร็จการศึกษารุ่นล่าสุด',inp(o,'students.grads',st.grads,dis,'number'))}</div></div>`;
  if(tab==='submit'){const miss=missing(p);
    body=(p.status==='more'&&p.screen?`<div class="card"><h2>คณะกลั่นกรองขอเอกสารเพิ่มเติม</h2><p class="small">${raw(p.screen.reason||'')}</p><ol class="plain">${(p.screen.requests||[]).map(r=>`<li>${raw(r)}</li>`).join('')}</ol>
       <p class="small muted">แนบเอกสารเพิ่มเติมในช่องด้านล่าง แล้วกด "ส่งเอกสารเพิ่มเติม"</p>${can('inst')?`<div class="row"><button class="btn pri" data-act="resubmit" data-id="${p.id}">ส่งเอกสารเพิ่มเติม</button></div>`:''}</div>`:'')+
    (p.receipt?`<span class="note ok">ยื่นคำขอแล้ว เลขรับ <b class="mono">${esc(p.receipt)}</b> เมื่อ ${fmtDT(p.submittedAt)} เอกสารถูกล็อก แก้ไขได้เมื่อ TABEE ส่งกลับให้แก้เท่านั้น</span>`:'')+
    `<div class="card"><h2>คำขอ</h2><div class="grid2">${field('ประเภทคำขอ',sel(o,'reqType',p.reqType,REQTYPE,dis,1))}${field('รอบการรับรอง (พ.ศ.)',inp(o,'cycle',p.cycle,dis,'number'))}</div>
      <h3>คุณสมบัติก่อนยื่น ${trackTag(p.track)}</h3>${ELIG[p.track].map((e,i)=>`<label class="ck"><input type="checkbox" data-o="${o}" data-b="elig.${i}" data-r="1"${p.elig[i]?' checked':''}${dis?' disabled':''}><span>${esc(e)}</span></label>`).join('')}</div>
    <div class="card"><h2>SER และเอกสารแนบ</h2><p class="small muted">รับไฟล์ Word, PDF, Excel และข้อความ ควรใช้ไฟล์ Word ของ SER ถ้ามี เพราะ PDF ที่เป็นภาพสแกนดึงข้อความไม่ได้ ไฟล์อยู่ในเบราว์เซอร์ของเครื่องนี้เท่านั้น</p>
     ${KINDS.map(k=>{const fs=p.files.filter(f=>f.kind===k.k),canUp=ed||(p.status==='more'&&can('inst'));
       return `<div class="col" style="gap:6px"><div class="row between"><b class="small">${esc(k.th)}${k.req?' <span style="color:var(--rD)">*</span>':''}</b>${canUp?`<span class="row" style="gap:6px">${k.k==='SER'&&!fs.length?`<button class="btn sm ghost" data-act="sample" data-id="${p.id}">ใช้ SER ตัวอย่าง</button>`:''}<label class="btn sm">+ แนบไฟล์<input type="file" multiple hidden data-up="${p.id}" data-kind="${esc(k.k)}" accept=".pdf,.docx,.xlsx,.xls,.csv,.txt,.md"></label></span>`:''}</div>
        ${k.hint&&!fs.length?`<span class="tiny muted">${esc(k.hint)}</span>`:''}
        <div class="flist">${fs.map(f=>`<div class="frow"><b>${raw(f.name)}</b><span class="tiny muted mono">${fmtS(f.size)}</span>${canUp&&!(p.status==='more'&&!f.extra)?`<button class="btn sm ghost" data-act="rmfile" data-id="${p.id}" data-f="${f.id}">ลบ</button>`:''}</div>`).join('')}</div></div>`}).join('')}</div>
    ${ed?`<div class="card flat"><h2>ตรวจก่อนส่ง</h2>${miss.length?`<span class="note">ยังขาด: ${miss.map(esc).join(' · ')}</span>`:'<span class="note ok">ข้อมูลและเอกสารครบ พร้อมยื่นคำขอ</span>'}
       <div class="row"><button class="btn pri lg" data-act="submit" data-id="${p.id}"${miss.length?' disabled':''}>ยื่นคำขอรับรอง</button><span class="small muted">เมื่อยื่นแล้ว ระบบออกเลขรับ ประทับเวลา และล็อกเอกสาร</span></div></div>`:''}`}
  if(tab==='track'){const s=stepOf(p);body=`<div class="card"><h2>ความคืบหน้า 26 ขั้น</h2><div class="row">${dots(p)}<span class="small">ขั้นที่ <b>${s}</b> ${esc(STEPS[s].t)} <span class="muted">· ผู้ดำเนินการ: ${esc(STEPS[s].o)}</span></span></div>
     <div class="row"><a class="btn" href="#/workflow/${p.id}">ดูทั้ง 26 ขั้น</a></div>
     ${p.decision?`<span class="note ok">มติ: ${esc(OUTCOME[p.decision.outcome].th)}${p.decision.to?` <span>ปีการศึกษา ${p.decision.from}–${p.decision.to}</span>`:''}</span>`:''}</div>`}
  return{crumbs:[['home','หน้าหลัก'],['program','แฟ้มหลักสูตร'],['program/'+p.id,(p.nameTh||'หลักสูตรใหม่').replace(/^.*สาขาวิชา/,'')]],html:
   head(esc(S.inst[p.inst]||p.instName||'สถาบันการศึกษา'),pname(p),`${trackTag(p.track)} ${statusTag(p)} ${p.receipt?`<span class="tag mono">${esc(p.receipt)}</span>`:''}`,
     ed?`<button class="btn danger sm" data-act="delprog" data-id="${p.id}">ลบแฟ้มร่างนี้</button>`:'')+
   (dis&&p.status==='draft'?'<span class="note info">บทบาทนี้ดูแฟ้มได้อย่างเดียว เปลี่ยนเป็น "ผู้ประสานงานหลักสูตร" เพื่อแก้ไข</span>':'')+
   `<div class="tabsbar">${tabs.map(t=>`<a href="#/program/${p.id}/${t[0]}" class="${tab===t[0]?'on':''}">${t[1]}</a>`).join('')}</div>`+body}}

async function addFiles(p,kind,files){for(const f of files){if(f.size>60*1048576){toast(LANG==='en'?f.name+' is larger than 60 MB':'ไฟล์ '+f.name+' ใหญ่เกิน 60 MB');continue}
    const rec={id:uid('f'),name:f.name,kind,size:f.size,t:new Date().toISOString()};if(p.status==='more')rec.extra=1;
    await fput({id:rec.id,blob:f});p.files.push(rec)}
  if(p.auto)p.auto.stale=1;save();render()}

/* ================= 2 กลั่นกรอง SER ================= */
VIEWS.screen=R=>{const p=prog(R.id);if(p&&p.receipt)return screenView(p);
  const q=S.programs.filter(x=>x.status==='submitted'),done=S.programs.filter(x=>x.screen&&x.screen.verdict&&x.status!=='submitted');
  const row=x=>`<tr><td><a href="#/screen/${x.id}">${pname(x)}</a><div class="tiny muted mono">${esc(x.receipt)}</div></td><td>${esc(iname(x))}</td><td>${trackTag(x.track)}</td><td>${fmtD(x.submittedAt)}</td><td>${x.auto?autoBar(x.auto):'<span class="muted small">ยังไม่ได้ตรวจ</span>'}</td><td>${statusTag(x)}</td></tr>`;
  return{crumbs:[['home','หน้าหลัก'],['screen','กลั่นกรอง SER']],html:
  head('ส่วนที่ 2 · คณะกลั่นกรอง','กลั่นกรอง SER ก่อนรับคำขอ','เปิด SER และเอกสารแนบของหลักสูตร ให้ Auto Check บอกว่าเล่มขาดส่วนใดและควรปรับปรุงส่วนใด ด้วยชุดกฎเดียวกับ PEV Studio แล้วลงผล รับคำขอ ขอเอกสารเพิ่ม หรือไม่รับ')+
  `<div class="card"><h2>รอกลั่นกรอง <span class="tag">${q.length}</span></h2><div class="tw"><table class="t"><thead><tr><th>หลักสูตร</th><th>สถาบัน</th><th>ประเภท</th><th>วันที่ยื่น</th><th>Auto Check</th><th>สถานะ</th></tr></thead><tbody>${q.map(row).join('')||'<tr><td colspan="6" class="muted">ไม่มีคำขอรอกลั่นกรอง</td></tr>'}</tbody></table></div></div>
   <div class="card"><h2>ลงผลแล้ว</h2><div class="tw"><table class="t"><thead><tr><th>หลักสูตร</th><th>สถาบัน</th><th>ประเภท</th><th>วันที่ยื่น</th><th>Auto Check</th><th>สถานะ</th></tr></thead><tbody>${done.map(row).join('')||'<tr><td colspan="6" class="muted">ยังไม่มี</td></tr>'}</tbody></table></div></div>`}};
function autoCount(a,c){const o={N:0,R:0,C:0,W:0,D:0};a.items.forEach(i=>{if(!c||i.c===c)o[i.r]++});return o}
function autoBar(a){const o=autoCount(a);return `<span class="row" style="gap:4px">${LVO.map(r=>o[r]?`${chip(r,'sm')}<span class="tiny mono">${o[r]}</span>`:'').join('')}</span>`}
function screenView(p){const a=p.auto,sc=p.screen||(p.screen={}),parts=sc.parts||(sc.parts={}),canEd=can('screen','staff')&&p.status==='submitted';
  let auto='';
  if(UI.busy===p.id)auto=`<div class="card"><h2>Auto Check</h2><div class="row"><span class="spin"></span><span>กำลังอ่านเอกสารและตรวจหลักฐานตามเกณฑ์ 8 ข้อ…</span></div></div>`;
  else if(!a)auto=`<div class="card"><h2>Auto Check</h2><p class="small">ระบบจะหาส่วนของแต่ละเกณฑ์จากหัวข้อ "เกณฑ์ข้อ 1–8" ในเล่ม แล้วค้นหลักฐานที่แต่ละข้อของ PEV Worksheet ต้องการ ผลที่ได้เป็นจุดตั้งต้นให้คณะกลั่นกรองพิจารณา ไม่ใช่ผลการประเมิน</p>
    <div class="row"><button class="btn pri lg" data-act="auto" data-id="${p.id}">เริ่ม Auto Check</button></div></div>`;
  else{const tot=autoCount(a),n=a.items.length,ok=tot.N+tot.R,miss=a.items.filter(i=>i.r==='W'||i.r==='D'),weak=a.items.filter(i=>i.r==='C');
    const noSec=[1,2,3,4,5,6,7,8].filter(c=>!a.info.some(d=>d.crit.includes(c)));
    const fl=Object.entries(a.flags||{}).flatMap(([c,l])=>l.map(x=>Object.assign({c:+c},x)));
    const cur=UI.crit;
    auto=`<div class="card"><h2>Auto Check <span class="tag">${fmtDT(a.t)}</span>${a.stale?'<span class="tag warn">มีไฟล์ใหม่ ควรตรวจซ้ำ</span>':''}<span class="sp"></span><button class="btn sm" data-act="auto" data-id="${p.id}">ตรวจซ้ำ</button></h2>
     <div class="kpis">
      <div class="kpi" style="--k:var(--rN)"><span>พบหลักฐานครบหรือเกือบครบ</span><b>${ok}</b><small>จาก ${n} ข้อ</small></div>
      <div class="kpi" style="--k:var(--rC)"><span>พบหลักฐานส่วนใหญ่</span><b>${tot.C}</b><small>ควรเพิ่มรายละเอียด</small></div>
      <div class="kpi" style="--k:var(--rD)"><span>หลักฐานขาด</span><b>${tot.W+tot.D}</b><small>ต้องขอเพิ่มจากหลักสูตร</small></div>
      <div class="kpi"><span>ส่วนของเกณฑ์ที่พบในเล่ม</span><b>${8-noSec.length}/8</b><small>${noSec.length?'ไม่พบเกณฑ์ข้อ '+noSec.join(', '):'พบครบทุกเกณฑ์'}</small></div>
     </div>
     ${legend()}
     ${LANG==='en'?'<span class="note info">Item wording, evidence notes and SER excerpts come from the Thai rule set and the SER itself, so they are shown in Thai.</span>':''}
     <div class="heat">${[1,2,3,4,5,6,7,8].map(c=>{const its=a.items.filter(i=>i.c===c),k=autoCount(a,c),pc=its.length?Math.round(100*its.reduce((s,i)=>s+i.score,0)/its.length):0;
       return `<button class="hrow${cur===c?' on':''}" data-act="crit" data-v="${c}"><span><b>เกณฑ์ข้อ ${c}</b> <span class="small muted">${CRIT[c]}</span></span><span class="cells">${its.map(i=>chip(i.r,'sm')).join('')}</span><span class="pc">${pc}%</span></button>`+
        (cur===c?`<div class="card flat">${its.map(i=>`<div class="item">${chip(i.r)}<div class="body"><span><b class="mono small">${esc(i.code)}</b> ${raw(i.t)}</span><pre class="ev th-src">${esc(i.n)}</pre></div></div>`).join('')}</div>`:'')}).join('')}</div>
     <span class="tiny muted">คลิกเกณฑ์เพื่อดูผลรายข้อ · เปอร์เซ็นต์คือคะแนนหลักฐานเฉลี่ยของเกณฑ์นั้น</span></div>
    <div class="grid3">
     <div class="card"><h3>ส่วนที่ขาด <span class="tag bad">${miss.length}</span></h3>${miss.length?`<ol class="plain">${miss.slice(0,UI.allMiss?999:8).map(i=>`<li>${i.req?raw(i.req):esc('เกณฑ์ข้อ '+i.c+' ข้อ '+i.code)}</li>`).join('')}</ol>${miss.length>8&&!UI.allMiss?`<button class="btn sm ghost" data-act="allmiss">แสดงทั้งหมด ${miss.length} รายการ</button>`:''}`:'<span class="small muted">ไม่พบข้อที่หลักฐานขาด</span>'}</div>
     <div class="card"><h3>ส่วนที่ควรปรับปรุง <span class="tag warn">${weak.length+fl.length}</span></h3>
      ${weak.length?`<ul class="plain">${weak.slice(0,6).map(i=>`<li>เกณฑ์ข้อ ${i.c} ข้อ ${esc(i.code)}: ${i.req?raw(i.req):'พบหลักฐานแต่ไม่อยู่ในหัวข้อของข้อนี้'}</li>`).join('')}</ul>`:''}
      ${fl.length?`<span class="small muted">ข้อความที่ควรอ่านละเอียด</span><ul class="plain">${fl.slice(0,8).map(x=>`<li>${(lb=>`<b>${esc(lb[0])}</b>${lb.length>1?raw(' ('+lb.slice(1).join(' (')):''}`)(x.label.split(' ('))}${x.c?' · เกณฑ์ข้อ '+x.c:''}<div class="tiny muted">${raw(x.snip+' ('+x.where+')')}</div></li>`).join('')}</ul>`:''}
      ${!weak.length&&!fl.length?'<span class="small muted">ไม่พบ</span>':''}</div>
     <div class="card"><h3>เอกสารที่อ่านได้</h3><div class="flist">${a.info.map(d=>`<div class="frow"><b>${raw(d.name)}</b><span class="tiny muted">${d.chars?(d.headed?'พบเกณฑ์ข้อ '+d.crit.join(', '):'ไม่มีหัวข้อเกณฑ์ (นับเป็นเอกสารแนบ)'):'ดึงข้อความไม่ได้'}</span></div>`).join('')}</div>
      <span class="tiny muted">Auto Check บอกได้ว่ามีหรือไม่มีหลักฐาน แต่ตัดสินคุณภาพของหลักฐานไม่ได้</span></div>
    </div>`}
  const sugg=c=>{if(!a)return null;const its=a.items.filter(i=>i.c===c),sec=a.info.some(d=>d.crit.includes(c)),bad=its.filter(i=>i.r==='W'||i.r==='D').length;return{complete:sec&&bad===0?'y':'n',quality:bad<=its.length/4?'y':'n'}};
  const yn=(c,k,v)=>`<div class="seg">${[['y',k==='complete'?'ครบ':'พอประเมินได้'],['n',k==='complete'?'ไม่ครบ':'ยังไม่พอ']].map(x=>`<button class="${v===x[0]?'on':''}" data-act="part" data-id="${p.id}" data-c="${c}" data-k="${k}" data-v="${x[0]}"${canEd?'':' disabled'}>${x[1]}</button>`).join('')}</div>`;
  const form=`<div class="card"><h2>แบบกลั่นกรอง SER รายส่วน</h2><p class="small muted">แต่ละส่วนตอบ 2 คำถาม คือ มีครบตามแบบรายงานประเมินตนเองหรือไม่ และคุณภาพพอให้ผู้ตรวจประเมินได้หรือไม่ ค่าตั้งต้นมาจาก Auto Check และแก้ได้</p>
    <div class="tw"><table class="t"><thead><tr><th>ส่วนของ SER</th><th>ความครบ</th><th>คุณภาพ</th><th style="min-width:240px">ความเห็น</th></tr></thead><tbody>${[1,2,3,4,5,6,7,8].map(c=>{const s=sugg(c),v=parts[c]||{};
      return `<tr><td><b>เกณฑ์ข้อ ${c}</b><div class="small muted">${CRIT[c]}</div></td><td>${yn(c,'complete',v.complete||(s&&s.complete))}</td><td>${yn(c,'quality',v.quality||(s&&s.quality))}</td><td><input type="text" data-o="p:${p.id}" data-b="screen.parts.${c}.note" value="${esc(v.note||'')}"${canEd?'':' disabled'} placeholder="ความเห็นของผู้กลั่นกรอง"></td></tr>`}).join('')}</tbody></table></div></div>`;
  const reqs=sc.requests||(a?a.items.filter(i=>(i.r==='W'||i.r==='D')&&i.req).map(i=>i.req):[]);
  const verdict=`<div class="card"><h2>ลงผลกลั่นกรอง</h2>
    ${sc.verdict&&p.status!=='submitted'?`<span class="note ${sc.verdict==='accept'?'ok':sc.verdict==='reject'?'warn':''}">ผล: ${{accept:'รับคำขอ',more:'ขอเอกสารเพิ่มเติม',reject:'ไม่รับคำขอ'}[sc.verdict]}${sc.t?' · '+fmtDT(sc.t):''}${sc.reason?' · '+raw(sc.reason):''}</span>`:''}
    ${canEd?`${field('เหตุผลหรือข้อความถึงหลักสูตร',`<textarea data-o="p:${p.id}" data-b="screen.reason">${esc(sc.reason||'')}</textarea>`)}
     ${field('รายการเอกสารที่ขอเพิ่ม (บรรทัดละ 1 รายการ ใช้เมื่อเลือก "ขอเอกสารเพิ่ม")',`<textarea data-act="reqs" data-id="${p.id}" style="min-height:120px">${esc(reqs.join('\n'))}</textarea>`)}
     <div class="row"><button class="btn pri lg" data-act="verdict" data-id="${p.id}" data-v="accept">รับคำขอ</button><button class="btn lg" data-act="verdict" data-id="${p.id}" data-v="more">ขอเอกสารเพิ่ม</button><button class="btn lg danger" data-act="verdict" data-id="${p.id}" data-v="reject">ไม่รับคำขอ</button></div>
     <span class="tiny muted">รับคำขอ = ไปขั้นแต่งตั้งคณะผู้ตรวจ · ขอเอกสารเพิ่ม = เปิดขั้นที่ 9 ให้หลักสูตรตอบ · ไม่รับ = ปิดคำขอพร้อมเหตุผล</span>`
     :p.status==='submitted'?'<span class="note info">บทบาทนี้ดูผลได้อย่างเดียว การลงผลเป็นหน้าที่ของคณะทำงานกลั่นกรอง</span>':''}</div>`;
  return{crumbs:[['home','หน้าหลัก'],['screen','กลั่นกรอง SER'],['screen/'+p.id,(p.nameTh||'').replace(/^.*สาขาวิชา/,'')]],html:
   head(esc(iname(p)),pname(p),`${trackTag(p.track)} ${statusTag(p)} <span class="tag mono">${esc(p.receipt)}</span>`,`<a class="btn" href="#/program/${p.id}/submit">เปิดแฟ้มหลักสูตร</a>`)+
   `<div class="card"><h2>เอกสารที่หลักสูตรยื่น <span class="tag">${p.files.length} ไฟล์</span></h2><div class="flist">${p.files.map(f=>`<div class="frow"><span class="tag">${esc(f.kind)}</span><b>${raw(f.name)}</b>${f.extra?'<span class="tag warn">เอกสารเพิ่มเติม</span>':''}<span class="tiny muted mono">${fmtS(f.size)}</span></div>`).join('')||'<span class="small muted">ไม่มีไฟล์ในเครื่องนี้ (คำขอตัวอย่างบางรายการไม่มีไฟล์แนบ)</span>'}</div></div>`+auto+form+verdict}}
async function runAuto(p){if(!p.files.length){toast('คำขอนี้ไม่มีไฟล์ให้ตรวจ');return}
  UI.busy=p.id;render();
  try{const files=[];for(const f of p.files){let text='';try{text=await fileText(f)}catch(e){}files.push({id:f.id,name:f.name,kind:f.kind,text:text||''})}
    const res=await new Promise((ok,no)=>{const w=new Worker('studio/worker.js');w.onmessage=e=>{w.terminate();e.data.ok?ok(e.data):no(new Error(e.data.error))};w.onerror=e=>{w.terminate();no(new Error(e.message||'worker'))};w.postMessage({track:p.track,files})});
    p.auto={t:new Date().toISOString(),items:res.items.map(i=>({c:i.c,code:i.code,t:i.t,r:i.r,score:Math.round(i.score*100)/100,n:i.n,req:i.req})),flags:res.flags,info:res.info};
    log('Auto Check SER '+p.receipt+' ('+res.items.length+' ข้อ)','Auto Check SER '+p.receipt+' ('+res.items.length+' items)');save();UI.crit=0;UI.allMiss=0}
  catch(e){toast(t('Auto Check ไม่สำเร็จ')+': '+e.message)}
  UI.busy='';render()}

/* ================= 3 PEV ================= */
function trProgress(key){try{const s=JSON.parse(localStorage.getItem(key)||'null');if(!s)return null;const q=Object.values(s.quiz||{});return{pass:q.filter(x=>x&&x.best>=80).length,tried:q.length,done:Object.values(s.done||{}).filter(Boolean).length,watched:Object.values(s.watched||{}).filter(Boolean).length}}catch(e){return null}}
VIEWS.training=()=>{const card=t=>{const T=TRACK[t],pr=trProgress(t==='EAC'?'tabee-tr-v1':'tabee-etc-tr-v1'),sfx=t==='EAC'?'':'-etc';
   return `<div class="card" style="border-top:4px solid var(--${T.cls})"><h2>${t} · ${T.accord}</h2><p class="small muted">${T.full}</p>
    <a class="btn pri lg" href="${T.training}">เปิด PEV Training Studio ${t}</a>
    <p class="small">${pr?`ความคืบหน้าในเครื่องนี้: ผ่านแบบทดสอบ <b>${pr.pass}</b> บท (ทำแล้ว ${pr.tried} บท) · ดูวิดีโอ ${pr.watched} บท · กิจกรรม Onsite ที่ทำแล้ว ${pr.done} รายการ`:'<span class="muted">ยังไม่มีความคืบหน้าในเครื่องนี้</span>'}</p>
    <h3>ช่วง Onsite (จอวิทยากร)</h3>
    <div class="row" style="gap:6px"><span class="small muted">อุ่นเครื่องรายเกณฑ์</span>${[1,2,3,4,5,6,7,8].map(i=>`<a class="btn sm" href="${T.training}assesstrain${sfx}${i}/" title="${CRIT[i]}">${i}</a>`).join('')}</div>
    <div class="row"><a class="btn sm" href="${T.training}assesstrain${sfx}/">การประเมินผลการตรวจ 10 สถานการณ์</a><a class="btn sm" href="brainstorm/">กระดาน Brainstorm</a></div></div>`};
  return{crumbs:[['home','หน้าหลัก'],['training','อบรม PEV']],html:
  head('ส่วนที่ 3 · PEV','อบรมเพื่อขึ้นทะเบียน PEV','เส้นทางอบรมมี 3 ช่วง คือ เรียนล่วงหน้าออนไลน์ งานวิเคราะห์หลักสูตรจำลอง และ Mock-up visit เลือกชุดอบรมให้ตรงกับประเภทหลักสูตรที่จะตรวจ ผลการเรียนจะไปแสดงในแฟ้มสะสมผลงาน')+
  `<div class="grid3">${card('EAC')}${card('ETC')}</div>
   <div class="card"><h2>เส้นทางขึ้นทะเบียน 7 ด่าน</h2><div class="gates">${GATES.map((g,i)=>`<div class="gate"><i>ด่าน ${i+1}</i><b>${g}</b></div>`).join('')}</div>
   <div class="row"><a class="btn" href="#/apply">ลงทะเบียนเป็นผู้สมัคร PEV</a><a class="btn" href="#/portfolio">เปิดแฟ้มสะสมผลงาน</a></div></div>`}};

VIEWS.apply=()=>{const m=S.me,o='me',sent=S.apps.find(a=>a.id==='me');
  const chk=[['degree','มีปริญญาตรีวิศวกรรมศาสตร์ในสาขาที่เกี่ยวข้อง'],['obe','เป็นสายวิชาการที่สอนหรือวิจัยในระบบ OBE'],['prof','เป็นสายวิชาชีพที่มีใบอนุญาตประกอบวิชาชีพ'],['assoc','เป็นสมาชิกสมาคมวิชาชีพ']];
  const okE=m.degree&&(m.obe||m.prof||m.assoc),fieldsOk=m.fields.length>=1&&m.fields.length<=3,ready=m.name&&m.email&&okE&&fieldsOk&&m.pdpa;
  const form=`<div class="card"><h2>ใบสมัครผู้ตรวจประเมิน</h2>${sent?`<span class="note ok">ส่งใบสมัครแล้วเมื่อ ${fmtDT(sent.t)} สถานะ: <b>${esc(sent.status)}</b></span>`:''}
   <div class="grid2">${field('ชื่อ–นามสกุล',inp(o,'name',m.name,sent,'text','data-r="1"'),1)}${field('อีเมล',inp(o,'email',m.email,sent,'email','data-r="1"'),1)}
    ${field('ต้นสังกัด',inp(o,'org',m.org,sent))}${field('ประเภทผู้ตรวจ',sel(o,'type',m.type,{acad:'สายวิชาการ',prof:'สายวิชาชีพ'},sent))}
    ${field('ประเภทหลักสูตรที่ประสงค์ตรวจ',sel(o,'track',m.track,{EAC:'EAC · Washington Accord',ETC:'ETC · Sydney Accord'},sent))}${field('ประสบการณ์ด้าน OBE / ประกันคุณภาพ (ปี)',inp(o,'obeYears',m.obeYears,sent,'number'))}</div>
   <h3>สาขาที่เชี่ยวชาญ <span class="small muted">เลือกได้สูงสุด 3 สาขา</span></h3>
   <div class="row" style="gap:6px">${Object.entries(FIELDS).map(([k,v])=>`<button class="btn sm${m.fields.includes(k)?' pri':''}" data-act="mefield" data-v="${k}"${sent?' disabled':''}>${v}</button>`).join('')}</div>
   <h3>คุณสมบัติ <span class="small muted">ระบบตรวจเทียบกับข้อ 4.3.2 ของเอกสารขั้นตอน TABEE</span></h3>
   ${chk.map(c=>`<label class="ck"><input type="checkbox" data-o="me" data-b="${c[0]}" data-r="1"${m[c[0]]?' checked':''}${sent?' disabled':''}><span>${c[1]}</span></label>`).join('')}
   <span class="note ${okE?'ok':''}">${okE?'ผ่านคุณสมบัติเบื้องต้น':'ต้องมีปริญญาตรีวิศวกรรมศาสตร์ และเป็นสายวิชาการ สายวิชาชีพ หรือสมาชิกสมาคมวิชาชีพอย่างน้อยหนึ่งอย่าง'}</span>
   <h3>ประกาศความเกี่ยวข้องกับสถาบัน (COI) ตั้งต้น</h3><p class="small muted">เลือกสถาบันที่เคยศึกษา ทำงาน เป็นที่ปรึกษา หรือมีผลประโยชน์ ระบบใช้ข้อมูลนี้กันการจัดสรรงานตรวจในภายหลัง</p>
   <div class="row" style="gap:6px">${Object.entries(S.inst).map(([k,v])=>`<button class="btn sm${m.coi.includes(k)?' pri':''}" data-act="mecoi" data-v="${k}"${sent?' disabled':''}>${esc(v)}</button>`).join('')}</div>
   <label class="ck"><input type="checkbox" data-o="me" data-b="pdpa" data-r="1"${m.pdpa?' checked':''}${sent?' disabled':''}><span>ยินยอมให้ TABEE ใช้ข้อมูลส่วนบุคคลในใบสมัครนี้เพื่อการคัดเลือกและขึ้นทะเบียนผู้ตรวจประเมิน</span></label>
   ${sent?'':`<div class="row"><button class="btn pri lg" data-act="sendapp"${ready?'':' disabled'}>ส่งใบสมัคร</button>${ready?'':'<span class="small muted">กรอกชื่อ อีเมล สาขา คุณสมบัติ และความยินยอมให้ครบก่อนส่ง</span>'}</div>`}</div>`;
  const staff=can('staff')?`<div class="card"><h2>ใบสมัครในรอบนี้ <span class="tag">${S.apps.length}</span></h2><div class="tw"><table class="t"><thead><tr><th>ผู้สมัคร</th><th>ประเภท</th><th>สาขา</th><th>หลักสูตรที่ตรวจ</th><th>COI ที่ประกาศ</th><th>วันที่สมัคร</th><th>ผลคัดเลือก</th></tr></thead><tbody>${
    S.apps.map(a=>`<tr><td><b>${raw(a.name)}</b></td><td>${a.type==='acad'?'วิชาการ':'วิชาชีพ'}</td><td>${a.fields.map(f=>FIELDS[f]).join(', ')}</td><td>${trackTag(a.track)}</td><td class="small">${a.coi.map(c=>esc(S.inst[c])).join(', ')||'ไม่มี'}</td><td>${fmtD(a.t)}</td>
     <td><div class="seg">${['รับเข้าอบรม','สำรอง','ไม่รับ'].map(s=>`<button class="${a.status===s?'on':''}" data-act="appst" data-id="${a.id}" data-v="${s}">${s}</button>`).join('')}</div></td></tr>`).join('')}</tbody></table></div></div>`:'';
  return{crumbs:[['home','หน้าหลัก'],['apply','ลงทะเบียน PEV']],html:
  head('ส่วนที่ 3 · PEV','ระบบลงทะเบียนผู้ตรวจประเมิน','ผู้สนใจสมัครเองหรือได้รับการเสนอชื่อ กรอกใบสมัครออนไลน์ ระบบตรวจคุณสมบัติเบื้องต้นให้ทันที จากนั้นเจ้าหน้าที่และคณะทำงานคัดเลือกเข้าอบรม')+
  (can('cand')?form:'')+staff}};

VIEWS.portfolio=()=>{const m=S.me,app=S.apps.find(a=>a.id==='me'),e=trProgress('tabee-tr-v1'),t=trProgress('tabee-etc-tr-v1');
  const gate=m.registered?6:m.visits.length?5:m.onsite?4:((e&&e.pass>=10)||(t&&t.pass>=10))?3:app&&app.status==='รับเข้าอบรม'?2:app?1:0;
  const conf=[['contact','ข้อมูลติดต่อเป็นปัจจุบัน'],['coi','ทบทวนรายการ COI แล้ว'],['ethics','รับรองจรรยาบรรณผู้ตรวจประเมิน: รายงานตามข้อเท็จจริง ไม่รับของกำนัล ไม่ให้คำปรึกษาแก่หลักสูตรที่ตรวจ'],['secret','ยอมรับข้อตกลงรักษาความลับ']];
  const allConf=conf.every(c=>m.confirm[c[0]]);
  const tr=(name,pr,href)=>`<tr><td><b>${name}</b></td><td class="n">${pr?pr.pass:0}</td><td class="n">${pr?pr.tried:0}</td><td class="n">${pr?pr.watched:0}</td><td>${pr&&pr.pass>=10?'<span class="tag ok">ผ่านเกณฑ์เรียนล่วงหน้า</span>':'<span class="tag">ยังไม่ครบ</span>'}</td><td><a class="btn sm" href="${href}">เปิด</a></td></tr>`;
  return{crumbs:[['home','หน้าหลัก'],['portfolio','แฟ้มสะสมผลงาน']],html:
  head('ส่วนที่ 3 · PEV','แฟ้มสะสมผลงาน'+(m.name?' · '+raw(m.name):''),'รวมประวัติอบรม ประวัติการตรวจ ช่วงวันที่ว่าง และการยืนยันประจำปีของผู้ตรวจหนึ่งคน ข้อมูลชุดนี้ใช้ต่อในการเลือกคณะผู้ตรวจ',
    `<button class="btn" data-act="exportme">ส่งออกแฟ้ม (.json)</button>`)+
  `<div class="card"><h2>เส้นทางขึ้นทะเบียน</h2><div class="gates">${GATES.map((g,i)=>`<div class="gate ${i<gate?'done':i===gate?'cur':''}"><i>ด่าน ${i+1}${i<gate?' · ผ่านแล้ว':i===gate?' · ขั้นปัจจุบัน':''}</i><b>${g}</b></div>`).join('')}</div>
    ${!app?'<span class="note info">ยังไม่ได้ส่งใบสมัคร เริ่มที่ <a href="#/apply">ลงทะเบียน PEV</a></span>':''}</div>
   <div class="card"><h2>ประวัติอบรม</h2><div class="tw"><table class="t"><thead><tr><th>ชุดอบรม</th><th>แบบทดสอบที่ผ่าน</th><th>แบบทดสอบที่ทำ</th><th>วิดีโอที่ดู</th><th>สถานะ</th><th></th></tr></thead><tbody>${tr('PEV Training Studio · EAC',e,'pev-training/')}${tr('PEV Training Studio · ETC',t,'pev-training-etc/')}</tbody></table></div>
    <span class="tiny muted">อ่านจากความคืบหน้าของ PEV Training Studio ในเบราว์เซอร์นี้ เกณฑ์ผ่านแบบทดสอบคือร้อยละ 80 ต่อบท</span>
    <label class="ck"><input type="checkbox" data-o="me" data-b="onsite" data-r="1"${m.onsite?' checked':''}><span>ผ่านการอบรม Onsite และ Mock-up visit แล้ว (วิทยากรเป็นผู้ยืนยันในระบบจริง)</span></label></div>
   <div class="card"><h2>ประวัติการตรวจและสังเกตการณ์</h2>
    <div class="tw"><table class="t"><thead><tr><th>ปี</th><th>หลักสูตร / สถาบัน</th><th>บทบาท</th><th></th></tr></thead><tbody>${m.visits.map((v,i)=>`<tr><td class="n">${esc(v.y)}</td><td>${raw(v.p)}</td><td>${esc(v.role)}</td><td><button class="btn sm ghost" data-act="rmvisit" data-v="${i}">ลบ</button></td></tr>`).join('')||'<tr><td colspan="4" class="muted">ยังไม่มีประวัติ</td></tr>'}</tbody></table></div>
    <div class="grid2"><label class="f"><span>ปี (พ.ศ.)</span><input type="number" id="vy" value="2569"></label><label class="f"><span>หลักสูตร / สถาบัน</span><input type="text" id="vp"></label>
     <label class="f"><span>บทบาท</span><select id="vr"><option>ผู้สังเกตการณ์</option><option>ผู้ตรวจประเมิน</option><option>หัวหน้าคณะผู้ตรวจ</option></select></label></div>
    <div class="row"><button class="btn" data-act="addvisit">+ เพิ่มรายการ</button></div></div>
   <div class="grid3"><div class="card"><h2>ช่วงวันที่ว่างสำหรับรอบถัดไป</h2><div class="grid2">${field('ตั้งแต่',inp('me','avail.from',m.avail.from,0,'date'))}${field('ถึง',inp('me','avail.to',m.avail.to,0,'date'))}</div></div>
   <div class="card"><h2>การยืนยันประจำปี ${allConf?'<span class="tag ok">ยืนยันครบ</span>':'<span class="tag warn">ยังไม่ครบ</span>'}</h2>${conf.map(c=>`<label class="ck"><input type="checkbox" data-o="me" data-b="confirm.${c[0]}" data-r="1"${m.confirm[c[0]]?' checked':''}><span>${c[1]}</span></label>`).join('')}
    <span class="tiny muted">ถ้าไม่ยืนยัน ระบบจะไม่เสนอชื่อในการเลือกคณะผู้ตรวจ</span></div></div>`}};

/* ---------- เลือกคณะผู้ตรวจ (เอกสารออกแบบ หัวข้อ 5.4) ---------- */
function candidates(p){return S.pevs.filter(v=>v.tracks.includes(p.track)).map(v=>{const why=[];
    if(!v.fields.includes(p.field))why.push('สาขาไม่ตรง');if(v.coi.includes(p.inst))why.push('มี COI กับสถาบัน');
    if(!v.confirmed)why.push('ยังไม่ยืนยันประจำปี');if(!v.refresher)why.push('ยังไม่ผ่านอบรมทบทวนของรอบ');if(!v.avail)why.push('ไม่ว่างช่วงตรวจเยี่ยม');
    return{v,why,ok:!why.length}}).sort((a,b)=>(b.ok-a.ok)||(a.why.length-b.why.length)||(a.v.load-b.v.load)||(b.v.visits-a.v.visits))}
function teamCheck(p){const t=p.team||{},ids=[t.chair,t.m1,t.m2].filter(Boolean),vs=ids.map(pev),out=[];
  const ch=pev(t.chair);out.push([ids.length===3,'คณะครบ 3 คน: หัวหน้าคณะ 1 และผู้ตรวจ 2']);
  out.push([!!ch&&['chair','senior'].includes(ch.level),'หัวหน้าคณะมีระดับหัวหน้าคณะผู้ตรวจขึ้นไป']);
  out.push([vs.some(v=>v.type==='acad')&&vs.some(v=>v.type==='prof'),'มีทั้งผู้ทรงคุณวุฒิทางการศึกษาและผู้ปฏิบัติวิชาชีพ']);
  out.push([vs.filter(v=>v.level==='new').length<=1,'มี PEV ใหม่ไม่เกิน 1 คน']);
  out.push([ids.length>0&&vs.every(v=>!v.coi.includes(p.inst)),'ไม่มีผู้ที่มี COI กับสถาบัน']);return out}
VIEWS.team=R=>{const p=prog(R.id);
  if(!p||!['accepted','visit'].includes(p.status)){const q=S.programs.filter(x=>['accepted','visit'].includes(x.status));
    return{crumbs:[['home','หน้าหลัก'],['team','เลือกคณะผู้ตรวจ']],html:
    head('ส่วนที่ 3 · PEV','ระบบเลือกคณะผู้ตรวจประเมิน','ระบบเสนอรายชื่อที่เหมาะสมให้เจ้าหน้าที่เลือก ไม่ได้ตัดสินแทน โดยกรองสาขาที่ตรง ตัดผู้ที่มี COI ตรวจสถานะพร้อมรับงาน และเรียงผู้ที่มีภาระงานน้อยขึ้นก่อน')+
    `<div class="card"><h2>คำขอที่รับแล้ว</h2><div class="tw"><table class="t"><thead><tr><th>หลักสูตร</th><th>สถาบัน</th><th>ประเภท</th><th>คณะผู้ตรวจ</th><th></th></tr></thead><tbody>${q.map(x=>{const t=x.team||{};
      return `<tr><td><b>${pname(x)}</b></td><td>${esc(iname(x))}</td><td>${trackTag(x.track)}</td><td class="small">${[t.chair,t.m1,t.m2].filter(Boolean).map(i=>esc(vname(pev(i)))).join(' · ')||'<span class="muted">ยังไม่แต่งตั้ง</span>'}</td><td><a class="btn sm${x.status==='accepted'?' pri':''}" href="#/team/${x.id}">${x.status==='accepted'?'เลือกคณะผู้ตรวจ':'ดูคณะ'}</a></td></tr>`}).join('')||'<tr><td colspan="5" class="muted">ไม่มีคำขอรอแต่งตั้ง</td></tr>'}</tbody></table></div></div>
     <div class="card"><h2>ทะเบียน PEV <span class="tag">${S.pevs.length} คน</span></h2><div class="tw"><table class="t"><thead><tr><th>ผู้ตรวจ</th><th>ระดับ</th><th>ประเภท</th><th>สาขา</th><th>หลักสูตรที่ตรวจได้</th><th class="c">ตรวจสะสม</th><th class="c">งานรอบนี้</th><th>สถานะ</th></tr></thead><tbody>${S.pevs.map(v=>`<tr><td><b>${esc(vname(v))}</b></td><td>${PEVLV[v.level]}</td><td>${v.type==='acad'?'วิชาการ':'วิชาชีพ'}</td><td>${v.fields.map(f=>FIELDS[f]).join(', ')}</td><td>${v.tracks.join(' · ')}</td><td class="c n">${v.visits}</td><td class="c n">${v.load}</td><td>${v.confirmed&&v.refresher&&v.avail?'<span class="tag ok">พร้อมรับงาน</span>':`<span class="tag warn">${!v.confirmed?'ยังไม่ยืนยันประจำปี':!v.refresher?'ยังไม่อบรมทบทวน':'ไม่ว่าง'}</span>`}</td></tr>`).join('')}</tbody></table></div></div>`}}
  const t=p.team||(p.team={}),ed=p.status==='accepted'&&can('staff'),cs=candidates(p),chk=teamCheck(p),okAll=chk.every(c=>c[0]);
  const slot=id=>id===t.chair?'chair':id===t.m1?'m1':id===t.m2?'m2':'';
  return{crumbs:[['home','หน้าหลัก'],['team','เลือกคณะผู้ตรวจ'],['team/'+p.id,(p.nameTh||'').replace(/^.*สาขาวิชา/,'')]],html:
  head(esc(iname(p)),'คณะผู้ตรวจ · '+pname(p),`${trackTag(p.track)} <span class="tag">สาขา${FIELDS[p.field]}</span> ${statusTag(p)}`)+
  `<div class="grid3"><div class="card"><h2>คณะที่เลือก</h2>${[['chair','หัวหน้าคณะ'],['m1','ผู้ตรวจ 1'],['m2','ผู้ตรวจ 2']].map(s=>{const v=pev(t[s[0]]);return `<div class="frow"><span class="tag ${v?'ink':''}">${s[1]}</span><b>${v?esc(vname(v)):'<span class="muted">ยังไม่เลือก</span>'}</b>${v?`<span class="tiny muted">${PEVLV[v.level]} · ${v.type==='acad'?'วิชาการ':'วิชาชีพ'}</span>`:''}${v&&ed?`<button class="btn sm ghost" data-act="unpick" data-id="${p.id}" data-k="${s[0]}">เอาออก</button>`:''}</div>`}).join('')}</div>
   <div class="card"><h2>ตรวจองค์ประกอบคณะ</h2>${chk.map(c=>`<div class="row small" style="gap:8px;flex-wrap:nowrap;align-items:flex-start"><span class="chip sm ${c[0]?'r-N':'r-0'}">${c[0]?'✓':'·'}</span><span>${c[1]}</span></div>`).join('')}
    ${ed?`<div class="row"><button class="btn pri lg" data-act="appoint" data-id="${p.id}"${okAll?'':' disabled'}>ส่งคำเชิญและแต่งตั้งคณะ</button></div><span class="tiny muted">หลังแต่งตั้ง ระบบส่งรายชื่อให้สถาบันยืนยันว่าไม่มี COI แล้วเปิด PEV Studio ให้คณะผู้ตรวจ</span>`:p.status==='visit'?'<span class="note ok">แต่งตั้งแล้ว คณะผู้ตรวจทำงานต่อใน PEV Studio</span>':'<span class="note info">การแต่งตั้งเป็นหน้าที่ของเจ้าหน้าที่ TABEE</span>'}</div></div>
   <div class="card"><h2>รายชื่อที่ระบบเสนอ <span class="tag ok">${cs.filter(c=>c.ok).length} คนเข้าเกณฑ์</span></h2>
   <div class="tw"><table class="t"><thead><tr><th>ผู้ตรวจ</th><th>ระดับ</th><th>ประเภท</th><th>สาขา</th><th class="c">ตรวจสะสม</th><th class="c">งานรอบนี้</th><th>ผลการกรอง</th><th>เลือกเป็น</th></tr></thead><tbody>${cs.map(({v,why,ok})=>{const sl=slot(v.id);
     return `<tr class="${ok?'':'dim'}${sl?' sel':''}"><td><b>${esc(vname(v))}</b></td><td>${PEVLV[v.level]}</td><td>${v.type==='acad'?'วิชาการ':'วิชาชีพ'}</td><td>${v.fields.map(f=>FIELDS[f]).join(', ')}</td><td class="c n">${v.visits}</td><td class="c n">${v.load}</td>
      <td>${ok?'<span class="tag ok">เข้าเกณฑ์</span>':why.map(w=>`<span class="tag ${w.includes('COI')?'bad':'warn'}">${w}</span>`).join(' ')}</td>
      <td>${sl?`<span class="tag ink">${{chair:'หัวหน้าคณะ',m1:'ผู้ตรวจ 1',m2:'ผู้ตรวจ 2'}[sl]}</span>`:ok&&ed?`<span class="row" style="gap:4px">${['chair','senior'].includes(v.level)&&!t.chair?`<button class="btn sm" data-act="pick" data-id="${p.id}" data-k="chair" data-v="${v.id}">หัวหน้าคณะ</button>`:''}${!t.m1||!t.m2?`<button class="btn sm" data-act="pick" data-id="${p.id}" data-k="${!t.m1?'m1':'m2'}" data-v="${v.id}">ผู้ตรวจ</button>`:''}</span>`:''}</td></tr>`}).join('')}</tbody></table></div>
   <span class="tiny muted">เรียงผู้ที่เข้าเกณฑ์และมีงานในรอบนี้น้อยขึ้นก่อน ผู้ที่ไม่เข้าเกณฑ์แสดงเหตุผลไว้เพื่อให้ตรวจย้อนได้</span></div>`}};

/* ================= 4 PEV Studio ================= */
VIEWS.pevstudio=()=>{const q=S.programs.filter(x=>x.status==='visit'),ed=can('chair','staff');
  const card=t=>`<a class="card" href="${TRACK[t].studio}" style="border-top:4px solid var(--${TRACK[t].cls})"><h2>PEV Studio ${t}</h2><p class="small muted">${TRACK[t].full} · ${TRACK[t].accord}</p><p class="small">${t==='EAC'?'PEV Worksheet 8 เกณฑ์ ตั้งแต่ Auto Check, Pre-visit, ตรวจเยี่ยม, Fact Finding Report จนถึงรายงานผลการตรวจรับรอง':'ชุดตรวจสำหรับหลักสูตรเทคโนโลยีวิศวกรรมตามเกณฑ์ TABEE ETAC พร้อมเคสฝึก 6 หลักสูตร'}</p><span class="btn pri" style="align-self:flex-start">เปิด PEV Studio ${t}</span></a>`;
  return{crumbs:[['home','หน้าหลัก'],['pevstudio','PEV Studio']],html:
  head('ส่วนที่ 4 · ตรวจประเมิน','PEV Studio','คณะผู้ตรวจทำงานใน PEV Studio ของประเภทหลักสูตรนั้น เมื่อได้ผลขั้นสุดท้ายแล้ว หัวหน้าคณะบันทึกผลรายเกณฑ์และผลที่เสนอกลับมาที่นี่ เพื่อส่งต่อให้คณะกลั่นกรองตรวจทาน')+
  `<div class="grid3">${card('EAC')}${card('ETC')}</div>
   <div class="card"><h2>หลักสูตรที่อยู่ระหว่างตรวจประเมิน <span class="tag">${q.length}</span></h2>${legend()}
   ${q.map(p=>{const r=p.result||(p.result={crit:{},notes:{}}),t=p.team||{},full=[1,2,3,4,5,6,7,8].every(c=>r.crit[c]),al=allowed(r.crit);
    return `<div class="card flat"><h3>${pname(p)} ${trackTag(p.track)}<span class="sp"></span><a class="btn sm" href="${TRACK[p.track].studio}">เปิด PEV Studio ${p.track}</a></h3>
     <span class="small muted">${esc(iname(p))} · คณะผู้ตรวจ: ${[t.chair,t.m1,t.m2].filter(Boolean).map(i=>esc(vname(pev(i)))).join(' · ')}</span>
     <div class="tw"><table class="t"><thead><tr><th>เกณฑ์</th><th>ผลขั้นสุดท้าย</th><th style="min-width:260px">ข้อสังเกตหลัก</th></tr></thead><tbody>${[1,2,3,4,5,6,7,8].map(c=>`<tr><td><b>${c}</b> <span class="small muted">${CRIT[c]}</span></td>
       <td><div class="seg">${LVO.map(l=>`<button class="r-${l}${r.crit[c]===l?' on':''}" data-act="res" data-id="${p.id}" data-c="${c}" data-v="${l}"${ed?'':' disabled'}>${l}</button>`).join('')}</div></td>
       <td><input type="text" data-o="p:${p.id}" data-b="result.notes.${c}" value="${esc((r.notes||{})[c]||'')}"${ed?'':' disabled'}></td></tr>`).join('')}</tbody></table></div>
     <div class="grid2">${field('ผลที่เสนอ',sel('p:'+p.id,'result.proposed',r.proposed||'',Object.assign({'':'เลือกผลที่เสนอ'},Object.fromEntries(Object.entries(OUTCOME).map(([k,v])=>[k,v.th]))),!ed,1))}</div>
     ${r.proposed&&full&&!al.includes(r.proposed)?`<span class="note">ผลที่เสนอไม่เข้ากับผลรายเกณฑ์ (ระดับสูงสุดที่พบคือ ${LV[worst(r.crit)]}) เสนอได้แต่ต้องเขียนเหตุผล และจะถูกยกขึ้นใน Decision Meeting</span>`:''}
     ${ed?`<div class="row"><button class="btn pri" data-act="report" data-id="${p.id}"${full&&r.proposed?'':' disabled'}>ส่งผลให้คณะกลั่นกรองตรวจทาน</button>${full&&r.proposed?'':'<span class="small muted">ลงผลให้ครบ 8 เกณฑ์และเลือกผลที่เสนอก่อนส่ง</span>'}</div>`:''}</div>`}).join('')||'<span class="small muted">ไม่มีหลักสูตรที่อยู่ระหว่างตรวจประเมิน</span>'}</div>`}};

/* ================= 5 ตรวจทานผล และ Decision Meeting ================= */
const critRow=p=>[1,2,3,4,5,6,7,8].map(c=>`<td class="c">${chip((p.result||{crit:{}}).crit[c])}</td>`).join('');
VIEWS.review=R=>{const p=prog(R.id);
  if(!p||!p.result||!['reported','reviewed'].includes(p.status)){const q=S.programs.filter(x=>['reported','reviewed'].includes(x.status));
    return{crumbs:[['home','หน้าหลัก'],['review','ตรวจทานผลประเมิน']],html:
    head('ส่วนที่ 5 · คณะกลั่นกรอง','ตรวจทานผลประเมินก่อน Decision Meeting','คณะกลั่นกรองเปิดรายงานผลของแต่ละหลักสูตรในรอบ ตรวจว่าข้อสังเกตอ้างเกณฑ์ถูกข้อ ระดับผลสอดคล้องกับถ้อยคำ และผลที่เสนอเข้ากับตารางผลการรับรอง แล้วลงผลเพื่อส่งเข้า Decision Meeting')+
    `<div class="card"><h2>หลักสูตรในรอบ</h2>${legend()}<div class="tw"><table class="t"><thead><tr><th>หลักสูตร</th><th>ประเภท</th>${[1,2,3,4,5,6,7,8].map(c=>`<th class="c" title="${CRIT[c]}">${c}</th>`).join('')}<th>ผลที่เสนอ</th><th>สถานะ</th><th></th></tr></thead><tbody>${q.map(x=>`<tr><td><b>${pname(x)}</b><div class="tiny muted">${esc(iname(x))}</div></td><td>${trackTag(x.track)}</td>${critRow(x)}<td class="small">${esc(OUTCOME[x.result.proposed].th)}</td><td>${statusTag(x)}</td><td><a class="btn sm${x.status==='reported'?' pri':''}" href="#/review/${x.id}">${x.status==='reported'?'ตรวจทาน':'ดู'}</a></td></tr>`).join('')||'<tr><td colspan="13" class="muted">ไม่มีหลักสูตรรอตรวจทาน</td></tr>'}</tbody></table></div></div>`}}
  const r=p.result,rv=p.review||(p.review={chk:[]}),ed=p.status==='reported'&&can('screen'),al=allowed(r.crit);
  const peers=S.programs.filter(x=>x!==p&&x.result&&['reported','reviewed','decided'].includes(x.status));
  const same=[1,2,3,4,5,6,7,8].filter(c=>['C','W','D'].includes(r.crit[c])).map(c=>({c,others:peers.filter(x=>['C','W','D'].includes(x.result.crit[c]))})).filter(x=>x.others.length);
  return{crumbs:[['home','หน้าหลัก'],['review','ตรวจทานผลประเมิน'],['review/'+p.id,(p.nameTh||'').replace(/^.*สาขาวิชา/,'')]],html:
  head(esc(iname(p)),'ตรวจทานผล · '+pname(p),`${trackTag(p.track)} ${statusTag(p)} <span class="tag">ผลที่เสนอ: ${esc(OUTCOME[r.proposed].th)}</span>`)+
  `<div class="card"><h2>ผลรายเกณฑ์จากคณะผู้ตรวจ</h2>${legend()}<div class="tw"><table class="t"><thead><tr><th>เกณฑ์</th><th class="c">ผล</th><th>ข้อสังเกตหลัก</th></tr></thead><tbody>${[1,2,3,4,5,6,7,8].map(c=>`<tr><td><b>${c}</b> <span class="small muted">${CRIT[c]}</span></td><td class="c">${chip(r.crit[c])}</td><td class="small">${raw((r.notes||{})[c]||'')}</td></tr>`).join('')}</tbody></table></div>
    ${al.includes(r.proposed)?`<span class="note ok">ผลที่เสนอเข้ากับผลรายเกณฑ์ (ระดับสูงสุดที่พบคือ ${LV[worst(r.crit)]||'ไม่มีประเด็น'})</span>`:`<span class="note warn"><span>ผลที่เสนอไม่เข้ากับผลรายเกณฑ์: ระดับสูงสุดที่พบคือ ${LV[worst(r.crit)]} ซึ่งตามกฎควรเสนอ</span> ${al.map(k=>`<b>${OUTCOME[k].th}</b>`).join(' <span>หรือ</span> ')}</span>`}</div>
   <div class="card"><h2>ความสม่ำเสมอกับหลักสูตรอื่นในรอบ</h2>${same.length?`<div class="tw"><table class="t"><thead><tr><th>เกณฑ์</th><th>หลักสูตรนี้</th><th>หลักสูตรอื่นที่มีข้อสังเกตในเกณฑ์เดียวกัน</th></tr></thead><tbody>${same.map(s=>`<tr><td><b>${s.c}</b> <span class="small muted">${CRIT[s.c]}</span></td><td>${chip(r.crit[s.c])} <span class="small">${raw((r.notes||{})[s.c]||'')}</span></td><td>${s.others.map(x=>`<div class="small">${chip(x.result.crit[s.c],'sm')} <b>${pname(x)}</b> ${raw((x.result.notes||{})[s.c]||'')}</div>`).join('')}</td></tr>`).join('')}</tbody></table></div><span class="tiny muted">ใช้เทียบว่าข้อสังเกตลักษณะเดียวกันได้ระดับผลเท่ากันหรือไม่</span>`:'<span class="small muted">ไม่มีข้อสังเกตในเกณฑ์เดียวกันกับหลักสูตรอื่น</span>'}</div>
   <div class="card"><h2>Checklist ตรวจทาน</h2>${REVIEWCHK.map((c,i)=>`<label class="ck"><input type="checkbox" data-o="p:${p.id}" data-b="review.chk.${i}" data-r="1"${rv.chk[i]?' checked':''}${ed?'':' disabled'}><span>${c}</span></label>`).join('')}
    ${field('ความเห็นถึงหัวหน้าคณะผู้ตรวจ',`<textarea data-o="p:${p.id}" data-b="review.note"${ed?'':' disabled'}>${esc(rv.note||'')}</textarea>`)}
    ${ed?`<div class="row"><button class="btn pri lg" data-act="rev" data-id="${p.id}" data-v="agree"${REVIEWCHK.every((c,i)=>rv.chk[i])?'':' disabled'}>เห็นชอบ ส่งเข้า Decision Meeting</button><button class="btn lg" data-act="rev" data-id="${p.id}" data-v="back">ส่งกลับให้คณะผู้ตรวจทบทวน</button></div>`
      :rv.verdict?`<span class="note ok">ประธานคณะกลั่นกรองเห็นชอบแล้ว${rv.t?' เมื่อ '+fmtDT(rv.t):''}</span>`:'<span class="note info">การลงผลเป็นหน้าที่ของคณะทำงานกลั่นกรอง</span>'}</div>`}};

VIEWS.decision=()=>{const all=S.programs.filter(x=>x.result&&['reported','reviewed','decided'].includes(x.status)),ed=can('sub','staff');
  const ag=all.filter(x=>x.status==='reviewed');
  return{crumbs:[['home','หน้าหลัก'],['decision','Decision Meeting']],html:
  head('ส่วนที่ 5 · ตัดสินผล','Decision Meeting','ผลของทุกหลักสูตรในรอบถูกพิจารณาพร้อมกัน ตารางความสม่ำเสมอแสดงระดับผลรายเกณฑ์ข้ามหลักสูตร จากนั้นที่ประชุมลงมติทีละหลักสูตร และบันทึกเหตุผลเมื่อมติต่างจากที่เสนอ')+
  `<div class="card"><h2>ตารางความสม่ำเสมอ <span class="tag">${all.length} หลักสูตร</span></h2>${legend()}
   <div class="tw"><table class="t"><thead><tr><th>หลักสูตร</th><th>ประเภท</th>${[1,2,3,4,5,6,7,8].map(c=>`<th class="c" title="${CRIT[c]}">${c}</th>`).join('')}<th>ผลที่เสนอ</th><th>สถานะ</th></tr></thead><tbody>${all.map(x=>`<tr><td><b>${pname(x)}</b><div class="tiny muted">${esc(iname(x))}</div></td><td>${trackTag(x.track)}</td>${critRow(x)}<td class="small">${esc(OUTCOME[x.result.proposed].th)}${allowed(x.result.crit).includes(x.result.proposed)?'':' <span class="tag warn">นอกกฎ</span>'}</td><td>${x.decision?`<span class="tag ok">${esc(OUTCOME[x.decision.outcome].th)}</span>`:statusTag(x)}</td></tr>`).join('')}</tbody></table></div>
   <span class="tiny muted">เกณฑ์ 1 ${CRIT[1]} · 2 ${CRIT[2]} · 3 ${CRIT[3]} · 4 ${CRIT[4]} · 5 ${CRIT[5]} · 6 ${CRIT[6]} · 7 ${CRIT[7]} · 8 ${CRIT[8]}</span></div>
   <div class="card"><h2>วาระพิจารณา <span class="tag">${ag.length}</span></h2><p class="small muted">ระบบดึงหลักสูตรที่ผ่านการตรวจทานของคณะกลั่นกรองแล้วเข้าวาระ ผู้เข้าประชุมที่มี COI กับสถาบันใดไม่มีสิทธิ์ลงมติในวาระนั้น</p>
   ${ag.map(p=>{const d=p.draft||(p.draft={outcome:p.result.proposed}),diff=d.outcome!==p.result.proposed;
     return `<div class="card flat"><h3>${pname(p)} ${trackTag(p.track)}<span class="sp"></span><a class="btn sm ghost" href="#/review/${p.id}">แฟ้มประชุม</a></h3>
      <div class="row small" style="gap:4px">${[1,2,3,4,5,6,7,8].map(c=>chip(p.result.crit[c],'sm')).join('')}<span class="muted" style="margin-left:8px">เสนอ: ${esc(OUTCOME[p.result.proposed].th)}</span></div>
      <label class="ck"><input type="checkbox" data-o="p:${p.id}" data-b="draft.coi" data-r="1"${d.coi?' checked':''}${ed?'':' disabled'}><span>มีผู้เข้าประชุมประกาศ COI กับสถาบันนี้ (ระบบหักออกจากองค์ประชุมของวาระ)</span></label>
      <div class="grid2">${field('มติ',sel('p:'+p.id,'draft.outcome',d.outcome,Object.fromEntries(Object.entries(OUTCOME).map(([k,v])=>[k,v.th])),!ed,1))}
       ${field('เหตุผล'+(diff?' (จำเป็น เพราะมติต่างจากที่เสนอ)':''),inp('p:'+p.id,'draft.reason',d.reason,!ed,'text','data-r="1"'),diff)}</div>
      ${ed?`<div class="row"><button class="btn pri" data-act="decide" data-id="${p.id}"${diff&&!d.reason?' disabled':''}>${diff?'บันทึกมติ (แก้ไขผล)':'เห็นชอบตามเสนอ'}</button><button class="btn" data-act="sendback" data-id="${p.id}">ส่งกลับให้คณะผู้ตรวจทบทวน</button></div>`:''}</div>`}).join('')||'<span class="small muted">ไม่มีวาระรอพิจารณา หลักสูตรที่ยังรอตรวจทานอยู่ที่ <a href="#/review">ตรวจทานผลประเมิน</a></span>'}</div>`}};

/* ================= หลังการรับรอง ================= */
VIEWS.registry=()=>{const l=S.programs.filter(p=>p.decision&&['full','cond','prov'].includes(p.decision.outcome));
  return{crumbs:[['home','หน้าหลัก'],['registry','ทะเบียนหลักสูตรที่รับรอง']],html:
  head('หลังการรับรอง','ทะเบียนหลักสูตรที่ได้รับการรับรอง','รายการที่เผยแพร่สู่สาธารณะหลังมีมติ พร้อมระยะเวลาการรับรองและกำหนดส่ง Interim report ที่ระบบเตือนให้หลักสูตร')+
  `<div class="tw"><table class="t"><thead><tr><th>หลักสูตร</th><th>สถาบัน</th><th>ประเภท</th><th>ผลการรับรอง</th><th>ปีการศึกษาที่รับรอง</th><th>Interim report</th></tr></thead><tbody>${l.map(p=>`<tr><td><b>${esc(LANG==='en'&&p.nameEn||p.nameTh)}</b><div class="tiny muted">${LANG==='en'?raw(p.nameTh):esc(p.nameEn||'')}</div></td><td>${esc(iname(p))}</td><td>${trackTag(p.track)}</td><td><span class="tag ok">${esc(OUTCOME[p.decision.outcome].th)}</span></td><td class="n">${p.decision.from}–${p.decision.to}</td><td class="n">${p.decision.outcome==='full'?'ปีการศึกษา '+(p.decision.from+2):'ตามเงื่อนไข'}</td></tr>`).join('')||'<tr><td colspan="6" class="muted">ยังไม่มีหลักสูตรในทะเบียน</td></tr>'}</tbody></table></div>`}};
VIEWS.log=()=>({crumbs:[['home','หน้าหลัก'],['log','บันทึกการใช้งาน']],html:
  head('ระบบกลาง','บันทึกการใช้งาน','ทุกการยื่น การลงผล และการแต่งตั้งถูกบันทึกว่าใครทำอะไรเมื่อใด เพื่อรองรับการตรวจย้อนและการอุทธรณ์')+
  `<div class="tw"><table class="t"><thead><tr><th>เวลา</th><th>บทบาท</th><th>รายการ</th></tr></thead><tbody>${S.log.map(l=>`<tr><td class="n small">${fmtDT(l.t)}</td><td>${esc(l.role?ROLES.find(r=>r.k===l.role).th:l.who)}</td><td>${LANG==='en'&&l.en?esc(l.en):esc(l.msg)}</td></tr>`).join('')}</tbody></table></div>`});

/* ================= events ================= */
function target(o){if(o==='me')return S.me;if(o.startsWith('p:'))return prog(o.slice(2));return null}
function setPath(obj,path,v){const ks=path.split('.');let x=obj;for(let i=0;i<ks.length-1;i++){if(x[ks[i]]==null)x[ks[i]]=/^\d+$/.test(ks[i+1])&&ks[i]!=='parts'&&ks[i]!=='notes'?[]:{};x=x[ks[i]]}x[ks[ks.length-1]]=v}
document.addEventListener('change',e=>{const el=e.target;
  if(el.dataset.up){const p=prog(el.dataset.up);addFiles(p,el.dataset.kind,[...el.files]);return}
  if(el.dataset.act==='role'){S.role=el.value;save();render();return}
  if(el.dataset.act==='pickwf'){go('workflow/'+el.value);return}
  if(el.dataset.act==='reqs'){const p=prog(el.dataset.id);(p.screen||(p.screen={})).requests=el.value.split('\n').map(s=>s.trim()).filter(Boolean);save();return}
  if(el.dataset.b){const obj=target(el.dataset.o);if(!obj)return;const v=el.type==='checkbox'?(el.checked?1:0):el.type==='number'?(el.value===''?'':+el.value):el.value;
    setPath(obj,el.dataset.b,v);save();if(el.dataset.r)render()}});
document.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(!el||el.tagName==='SELECT'||el.tagName==='TEXTAREA')return;const d=el.dataset,p=d.id&&prog(d.id);
  const A={
   menu(){document.body.classList.toggle('menu')},
   lang(){setLang(d.v);render()},
   reset(){if(confirm(t('ล้างข้อมูลทั้งหมดในเครื่องนี้และกลับไปใช้ข้อมูลตัวอย่างหรือไม่'))){localStorage.removeItem(KEY);indexedDB.deleteDatabase('tabee-studio');_db=null;S=SEED();save();go('home');render()}},
   newprog(){const id=uid('p');S.programs.unshift({id,inst:'',instName:'',nameTh:'',nameEn:'',field:'',track:'EAC',status:'draft',campus:'',year:2569,format:'normal',reqType:'first',elig:[0,0,0,0],files:[],contacts:{},students:{},cycle:2569});save();go('program/'+id)},
   delprog(){if(confirm(t('ลบแฟ้มร่างนี้หรือไม่'))){p.files.forEach(f=>fdel(f.id));S.programs=S.programs.filter(x=>x!==p);save();go('program')}},
   track(){p.track=d.v;p.auto=null;save();render()},
   async sample(){const url=p.track==='ETC'?'pevstudio-etc/cases/iet/ser.docx':'pevstudio/cases/mt/ser.docx';toast('กำลังโหลด SER ตัวอย่าง…');
     try{const r=await fetch(url);if(!r.ok)throw 0;const b=await r.blob();await addFiles(p,'SER',[new File([b],'SER ตัวอย่าง ('+(p.track==='ETC'?'เทคโนโลยีวิศวกรรมอุตสาหการ':'วิศวกรรมวัสดุ')+' จากเคสฝึก PEV Studio).docx')]);toast('แนบ SER ตัวอย่างแล้ว')}catch(x){toast('โหลด SER ตัวอย่างไม่สำเร็จ')}},
   rmfile(){p.files=p.files.filter(f=>f.id!==d.f);fdel(d.f);if(p.auto)p.auto.stale=1;save();render()},
   submit(){if(missing(p).length)return;S.seq[p.track]=(S.seq[p.track]||0)+1;p.receipt=`TABEE-${p.cycle||2569}-${p.track}-${String(S.seq[p.track]).padStart(3,'0')}`;p.submittedAt=new Date().toISOString();p.status='submitted';
     log('ยื่นคำขอ '+p.receipt+' ('+(p.nameTh||'').replace(/^.*สาขาวิชา/,'')+')','Application submitted '+p.receipt+' ('+(p.nameEn||p.nameTh||'')+')');save();toast(t('ยื่นคำขอแล้ว เลขรับ')+' '+p.receipt);render()},
   resubmit(){p.status='submitted';if(p.auto)p.auto.stale=1;log('ส่งเอกสารเพิ่มเติม '+p.receipt,'Additional documents sent '+p.receipt);save();toast('ส่งเอกสารเพิ่มเติมแล้ว');render()},
   auto(){runAuto(p)},
   crit(){UI.crit=UI.crit===+d.v?0:+d.v;render()},
   allmiss(){UI.allMiss=1;render()},
   part(){const sc=p.screen||(p.screen={}),ps=sc.parts||(sc.parts={});(ps[d.c]||(ps[d.c]={}))[d.k]=d.v;save();render()},
   verdict(){const sc=p.screen||(p.screen={});
     if(d.v==='more'&&!(sc.requests||[]).length&&p.auto)sc.requests=p.auto.items.filter(i=>(i.r==='W'||i.r==='D')&&i.req).map(i=>i.req);
     if(d.v==='more'&&!(sc.requests||[]).length){toast('ระบุรายการเอกสารที่ขอเพิ่มอย่างน้อย 1 รายการ');return}
     if(d.v==='reject'&&!sc.reason){toast('การไม่รับคำขอต้องระบุเหตุผล');return}
     sc.verdict=d.v;sc.t=new Date().toISOString();p.status={accept:'accepted',more:'more',reject:'rejected'}[d.v];
     log('ลงผลกลั่นกรอง '+p.receipt+': '+{accept:'รับคำขอ',more:'ขอเอกสารเพิ่มเติม',reject:'ไม่รับคำขอ'}[d.v],'Screening result '+p.receipt+': '+{accept:'application accepted',more:'more documents requested',reject:'application not accepted'}[d.v]);save();toast('บันทึกผลกลั่นกรองแล้ว');go('screen')},
   mefield(){const f=S.me.fields,i=f.indexOf(d.v);if(i>=0)f.splice(i,1);else if(f.length<3)f.push(d.v);else toast('เลือกได้สูงสุด 3 สาขา');save();render()},
   mecoi(){const f=S.me.coi,i=f.indexOf(d.v);i>=0?f.splice(i,1):f.push(d.v);save();render()},
   sendapp(){const m=S.me;S.apps.unshift({id:'me',name:m.name,type:m.type,fields:m.fields.slice(),track:m.track,degree:m.degree,obe:m.obe,assoc:m.assoc,status:'รอคัดเลือก',t:new Date().toISOString(),coi:m.coi.slice()});log('ส่งใบสมัคร PEV: '+m.name,'PEV application sent: '+m.name);save();toast('ส่งใบสมัครแล้ว');render()},
   appst(){const a=S.apps.find(x=>x.id===d.id);a.status=d.v;log('ผลคัดเลือกผู้สมัคร PEV '+a.name+': '+d.v,'PEV applicant '+a.name+': '+({'รับเข้าอบรม':'admitted to training','สำรอง':'reserve','ไม่รับ':'not admitted'}[d.v]||d.v));save();render()},
   addvisit(){const y=$('#vy').value,pp=$('#vp').value.trim();if(!pp){toast('กรอกชื่อหลักสูตรหรือสถาบัน');return}S.me.visits.push({y,p:pp,role:$('#vr').value});save();render()},
   rmvisit(){S.me.visits.splice(+d.v,1);save();render()},
   exportme(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({profile:S.me,training:{EAC:trProgress('tabee-tr-v1'),ETC:trProgress('tabee-etc-tr-v1')}},null,2)],{type:'application/json'}));a.download='PEV-portfolio.json';a.click();URL.revokeObjectURL(a.href)},
   pick(){(p.team||(p.team={}))[d.k]=d.v;save();render()},
   unpick(){delete p.team[d.k];save();render()},
   appoint(){if(!teamCheck(p).every(c=>c[0]))return;const t=p.team;[t.chair,t.m1,t.m2].forEach(i=>pev(i).load++);p.status='visit';p.result={crit:{},notes:{}};
     log('แต่งตั้งคณะผู้ตรวจ '+p.receipt+': '+[t.chair,t.m1,t.m2].map(i=>pev(i).name).join(', '),'Evaluation team appointed '+p.receipt+': '+[t.chair,t.m1,t.m2].map(i=>PEV_EN[i]||pev(i).name).join(', '));save();toast('แต่งตั้งคณะผู้ตรวจแล้ว');go('pevstudio')},
   res(){p.result.crit[d.c]=d.v;save();render()},
   report(){p.status='reported';p.review={chk:[]};log('หัวหน้าคณะส่งผลประเมิน '+p.receipt+' เสนอ '+OUTCOME[p.result.proposed].th,'Team chair sent results '+p.receipt+', proposed: '+OUTCOME[p.result.proposed].en);save();toast('ส่งผลให้คณะกลั่นกรองแล้ว');go('review')},
   rev(){if(d.v==='agree'){p.review.verdict='agree';p.review.t=new Date().toISOString();p.status='reviewed';log('คณะกลั่นกรองเห็นชอบผล '+p.receipt,'Screening committee endorsed results '+p.receipt);toast('ส่งเข้า Decision Meeting แล้ว');save();go('decision')}
     else{p.status='visit';log('คณะกลั่นกรองส่งผล '+p.receipt+' กลับให้คณะผู้ตรวจทบทวน','Screening committee returned '+p.receipt+' to the evaluation team');toast('ส่งกลับให้คณะผู้ตรวจแล้ว');save();go('review')}},
   decide(){const dr=p.draft,o=OUTCOME[dr.outcome],from=(p.cycle||2569)+1;p.decision={outcome:dr.outcome,reason:dr.reason||'',coi:dr.coi||0,from,to:from+Math.max(o.y,1)-1,t:new Date().toISOString(),mode:dr.outcome===p.result.proposed?'เห็นชอบตามเสนอ':'แก้ไขผล'};
     p.status='decided';delete p.draft;log('Decision Meeting '+p.receipt+': '+o.th+' ('+p.decision.mode+')','Decision Meeting '+p.receipt+': '+o.en+' ('+(p.decision.mode==='แก้ไขผล'?'outcome changed':'agreed as proposed')+')');save();toast('บันทึกมติแล้ว');render()},
   sendback(){p.status='visit';delete p.draft;log('Decision Meeting ส่ง '+p.receipt+' กลับให้คณะผู้ตรวจทบทวน','Decision Meeting returned '+p.receipt+' to the evaluation team');save();toast('ส่งกลับให้คณะผู้ตรวจแล้ว');render()}
  };
  if(A[d.act]){e.preventDefault();A[d.act]()}});
document.addEventListener('click',e=>{if(document.body.classList.contains('menu')&&!e.target.closest('#nav')&&!e.target.closest('#menuBtn'))document.body.classList.remove('menu')});
window.addEventListener('hashchange',render);
S=load();render();
