/* SER lab: stepped mock-SER practice for 7 programs (P1 → request letter → P2 → visit plan → mock visit → final findings) */
(function(){
const LV=['N','R','C','W','D'];
const LN={N:'ไม่มีประเด็น',R:'Remark',C:'Concern',W:'Weakness',D:'Deficiency'};
const CR=['นิสิตนักศึกษา','วัตถุประสงค์หลักสูตร','ผลลัพธ์การศึกษา','การพัฒนาต่อเนื่อง','หลักสูตร','คณาจารย์','สิ่งอำนวยความสะดวก','การสนับสนุนของสถาบัน'];
const CRE=['Students','Program educational objectives','Program outcomes','Continuous improvement','Curriculum','Faculty','Facilities','Institutional support'];
const DIS=['แฟ้มรายวิชาของทุกรายวิชาในหลักสูตร','รายงานการประชุมกรรมการบริหารหลักสูตรทุกครั้งย้อนหลัง 3 ปี','ประวัติและผลงานฉบับเต็มของอาจารย์ทุกคน','ข้อสอบและกระดาษคำตอบของทุกรายวิชาในปีการศึกษาล่าสุด'];
const STEPS=[['Pre-visit 1','Pre-visit 1','อ่าน SER แล้วให้ระดับ','Read the SER and rate'],['จดหมายขอเอกสาร','Request letter','เลือกไม่เกิน 8 รายการ','Up to 8 items'],['Pre-visit 2','Pre-visit 2','อ่านซองเอกสาร แล้วปรับระดับ','Read the packet and re-rate'],['แผนตรวจเยี่ยม','Visit plan','เลือกผู้ให้สัมภาษณ์และสถานที่','Pick interviews and sites'],['ตรวจเยี่ยมจำลอง','Mock visit','ข้อมูลที่ได้จากแผนของท่าน','What your plan yields'],['ข้อค้นพบสุดท้าย','Final findings','ให้ระดับสุดท้ายและเทียบเฉลย','Final levels and key']];
const T=(a,b)=>tx(a,b);
const e=s=>esc(String(s==null?'':s));
const md=s=>e(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
const rank=k=>LV.indexOf(k);
const D=()=>window.SERLAB||[];
const INS=(window.SERLAB_MODE||'instructor')==='instructor';
const FILES=()=>window.SERLAB_FILES||{};
let vol=-1, step=0;
const volFix=()=>{if(vol<0){const i=D().findIndex(x=>x.code===((typeof S!=='undefined'&&S.labv)||'MT'));vol=i<0?0:i}return vol};
const st=c=>{S.lab=S.lab||{};return S.lab[c]=S.lab[c]||{lv:[{},{},{}],req:[],reqDone:false,iv:[],pl:[],planDone:false,k:[false,false,false],open:false}};
const key=(v,s,ci)=>{ if(s===2) return v.final[ci][0]; let m='N'; v.issues.forEach(i=>{if(+i.crit===ci+1&&rank(i.path[s])>rank(m))m=i.path[s]}); return m };
const hash=s=>{let h=7;for(const ch of s)h=(h*31+ch.charCodeAt(0))%9973;return h};
const opts=v=>{const a=v.reqs.map((r,i)=>({t:r[0],m:i})).concat(DIS.map((t,i)=>({t,m:-1-i})));return a.map(o=>[hash(v.code+o.t),o]).sort((x,y)=>x[0]-y[0]).map(x=>x[1])};
const docOf=r=>(String(r[2]).match(/ช-\d+/g)||[]);
const css=`<style>
.lab-steps{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}
.lab-step{all:unset;box-sizing:border-box;cursor:pointer;padding:12px 14px;min-height:72px;border-radius:14px;border:1px solid var(--rule);background:var(--sheet);display:flex;flex-direction:column;gap:2px;min-width:0}
.lab-step b{font:600 15px var(--f-d)}.lab-step span{font-size:12px;color:var(--soft)}
.lab-step[aria-current="step"]{border:2px solid var(--brand);background:var(--tint)}
.lab-step.done b::after{content:" ✓";color:var(--ok)}
.lab-step:focus-visible,.lab-pick:focus-visible{outline:2px solid var(--brand);outline-offset:2px}
.lab-crit{padding:14px 0;border-top:1px solid var(--rule)}.lab-crit:first-of-type{border-top:0}
.lab-crit h3{font:700 15.5px var(--f-d);margin:0}
.lab-crit .lv{margin-top:8px}.lab-crit .lv .opt{padding:5px 14px 5px 5px;font-size:14px;min-height:44px}.lab-crit .lv .opt::before{width:28px;height:28px}
.lab-key{margin-top:8px;font-size:14px;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.lab-dot{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:999px;font:700 13px var(--f-d);color:#fff}
.lab-dot[data-k="N"]{background:#2E7D4F}.lab-dot[data-k="R"]{background:#F2C94C;color:#3A2C00}.lab-dot[data-k="C"]{background:#A65A16}.lab-dot[data-k="W"]{background:#1F5AA6}.lab-dot[data-k="D"]{background:#B3242B}
.lab-pick{all:unset;box-sizing:border-box;cursor:pointer;display:flex;gap:10px;align-items:flex-start;padding:12px 14px;min-height:48px;border-radius:12px;border:1.5px solid var(--rule);width:100%}
.lab-pick::before{content:"";flex:none;width:18px;height:18px;border-radius:5px;border:2px solid var(--soft);margin-top:2px}
.lab-pick[aria-pressed="true"]{border-color:var(--brand);background:var(--tint)}
.lab-pick[aria-pressed="true"]::before{background:var(--brand);border-color:var(--brand);box-shadow:inset 0 0 0 3px var(--sheet)}
.lab-pick[disabled]{opacity:.5;cursor:default}
.lab-list{display:grid;gap:8px;margin-top:12px}
.lab-iss{padding:12px 0;border-top:1px solid var(--rule)}.lab-iss h3{font:700 15px var(--f-d);margin:0 0 4px}
.lab-iss ul{margin:6px 0 0 18px;padding:0}.lab-iss li{margin:3px 0}
.lab-doc{border-top:1px solid var(--rule);padding:16px 20px}.lab-doc h3{font:700 16px var(--f-d);margin:0 0 8px;color:var(--brand)}
.lab-doc p{margin:8px 0}.lab-tw{overflow-x:auto;margin:10px 0}
.lab-doc table,.lab-t{font-size:13.5px}.lab-doc caption,.lab-t caption{text-align:left;font-weight:700;padding:4px 0;caption-side:top}
.lab-doc th,.lab-doc td,.lab-t th,.lab-t td{border:1px solid var(--rule);padding:6px 8px;vertical-align:top;text-align:left}
.lab-doc th,.lab-t th{background:var(--tint)}
.lab-role{border:1px solid var(--rule);border-radius:12px;padding:12px 14px;margin-top:10px}.lab-role h3{font:700 15px var(--f-d);margin:0 0 6px}
.lab-role ul{margin:4px 0 8px 18px;padding:0}
.lab-score{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.lab-score div{border:1px solid var(--rule);border-radius:12px;padding:10px 12px}.lab-score b{font:800 22px var(--f-d);display:block}
@media (max-width:820px){.lab-steps{grid-template-columns:repeat(2,minmax(0,1fr))}.lab-score{grid-template-columns:1fr}}
</style>`;
const saved=()=>`<span class="chip ok">${T('บันทึกแล้ว','Saved')}</span>`;
function summary(v,a){const O=opts(v),L=s=>v.final.map((f,ci)=>`${ci+1}:${a.lv[s][ci]||'-'}`).join(' '),t=a.txt||{};
  return [`ชุดฝึก SER จำลอง ${v.name}`,`P1  ${L(0)}`,`จดหมายขอเอกสาร: ${a.req.map(i=>O[i].t).join(' | ')||'-'}`,`P2  ${L(1)}`,
   `ผู้ให้สัมภาษณ์: ${a.iv.map(i=>v.roles[i][0]).join(' | ')||'-'}`,`สถานที่: ${a.pl.map(i=>v.places[i][0]).join(' | ')||'-'}`,
   ...a.iv.map((i,j)=>t['iv'+j]?`[${v.roles[i][0]}] ${t['iv'+j]}`:'').filter(Boolean),...a.pl.map((i,j)=>t['pl'+j]?`[${v.places[i][0]}] ${t['pl'+j]}`:'').filter(Boolean),
   `ระดับสุดท้าย  ${L(2)}`,`ข้อค้นพบ:`,t.find||'-'].join('\n')}
function fileBox(v){const F=FILES()[v.code]||[];if(!F.length)return '';
  return `<div class="row" style="margin-top:10px">${F.map(f=>`<a class="btn ghost" href="${e(f[1])}" download>${e(f[0])} ↓</a>`).join('')}</div>`}
const dot=k=>`<span class="lab-dot" data-k="${k}">${LN[k]}</span>`;
function levelForm(v,a,s){
  const shown=INS||(a.k[s]&&false);
  return v.final.map((f,ci)=>{const p=a.lv[s][ci], k=key(v,s,ci);
    return `<div class="lab-crit"><h3>${T('เกณฑ์ข้อ','Criterion')} ${ci+1} · ${T(CR[ci],CRE[ci])}</h3>
    <div class="lv" role="group" aria-label="${T('ระดับของเกณฑ์ข้อ','Level for criterion')} ${ci+1}">${LV.map(x=>`<button class="opt ${p===x?'pick':''}" data-k="${x}" data-lab="lv" data-s="${s}" data-c="${ci}" aria-pressed="${p===x}">${LN[x]}</button>`).join('')}</div>
    ${shown?`<div class="lab-key">${T('ระดับที่สมเหตุสมผลในจังหวะนี้','Reasonable level at this stage')}: ${dot(k)} ${p?(p===k?`<span class="chip ok">${T('ตรงกัน','Match')}</span>`:`<span class="chip warn">${T('ท่านเลือก','You chose')} ${LN[p]}</span>`):`<span class="chip mute">${T('ยังไม่ได้เลือก','Not rated')}</span>`}</div>`:''}</div>`}).join('');
}
function issueNotes(v,s){
  const tag=['P1','P2','V'][s];
  const L=v.issues.filter(i=>s===2||i.path.slice(0,s+1).some(x=>x!=='N'));
  if(!L.length) return '';
  return L.map(i=>{const lines=s===2?i.lv:i.lv.filter(x=>x.indexOf(tag)>-1||/ทั้ง 3 จังหวะ/.test(x)||(i.lv.length<3&&!/\*\*(P1|P2|V) /.test(x)));
    return `<div class="lab-iss"><h3>${e(i.id)} · ${T('เกณฑ์ข้อ','Criterion')} ${e(i.crit)} · ${e(s<2?String(i.title).replace(/\s*\(ประเด็นหลอก\)/,''):i.title)} ${dot(i.path[s])}</h3>
    <p class="note">${T('ตำแหน่งใน SER','Where in the SER')}: ${e(i.loc)}</p><p>${md(i.what)}</p>
    ${lines.length?`<ul>${lines.map(x=>`<li>${md(x)}</li>`).join('')}</ul>`:''}
    ${s===2?`<p class="note"><b>${T('ข้อผิดพลาดที่พบบ่อย','Common mistake')}:</b> ${md(String(i.err).replace(/^ข้อผิดพลาดที่พบบ่อย:\s*/,''))}</p>`:''}</div>`}).join('');
}
function table(cap,head,rows){return `<div class="lab-tw"><table class="lab-t">${cap?`<caption>${e(cap)}</caption>`:''}<thead><tr>${head.map(h=>`<th scope="col">${e(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${md(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function docHTML(d){return `<div class="lab-doc"><h3>${e(d.code)} · ${e(d.title)}</h3>${d.items.map(x=>x[0]==='p'?`<p>${md(x[1])}</p>`:x[0]==='b'?`<ul style="margin-left:18px">${x[1].map(b=>`<li>${md(b)}</li>`).join('')}</ul>`:table(x[1],x[2],x[3])).join('')}</div>`}
function got(v,a){const set=new Set();opts(v).forEach((o,i)=>{if(a.req.includes(i)&&o.m>=0)docOf(v.reqs[o.m]).forEach(c=>set.add(c))});return set}
function panel(v,a){
  const next=(lbl)=>`<div class="row" style="margin-top:16px"><button class="btn" data-lab="go" data-to="${step+1}">${lbl||T('ไปขั้นถัดไป →','Next step →')}</button></div>`;
  if(step===0) return `<section class="card pad"><h2>${T('Pre-visit 1: อ่าน SER แล้วให้ระดับเบื้องต้น','Pre-visit 1: read the SER and give preliminary levels')}</h2>
    <p>${T('อ่าน SER ฉบับผู้อบรม เอกสารประกอบ และใบระเบียนที่วิทยากรแจกให้ครบก่อน แล้วเลือกระดับของแต่ละเกณฑ์จากหลักฐานที่มีในเล่มเท่านั้น จดตารางหรือหัวข้อที่ใช้อ้างไว้ด้วย','Read the trainee SER file, supporting documents and transcripts from your facilitator first. Then choose a level for each criterion using only evidence in the report, and note the table or section you rely on.')}</p>
    ${levelForm(v,a,0)}
    <div class="row" style="margin-top:16px">${a.k[0]?(INS?'':saved()):`<button class="btn" data-lab="key" data-s="0">${INS?T('ทำเครื่องหมายว่าเสร็จ','Mark done'):T('บันทึกระดับ Pre-visit 1','Save Pre-visit 1 levels')}</button>`}</div></section>
    ${!INS&&a.k[0]?`<section class="card pad">${next()}</section>`:''}
    ${INS?`<section class="card pad"><h2>${T('จุดที่ควรสังเกตได้จากการอ่านเล่ม','What a careful read should surface')}</h2><p class="note">${T('แสดงเฉพาะประเด็นที่เห็นได้จาก SER ระดับในจังหวะนี้เป็นระดับเบื้องต้น ยังเปลี่ยนได้เมื่อได้เอกสารเพิ่ม','Only issues visible in the SER are shown. Levels at this stage are preliminary.')}</p>${issueNotes(v,0)||`<p>${T('ไม่มีประเด็นที่เห็นได้จากเล่ม','Nothing visible from the report.')}</p>`}${next()}</section>`:''}`;
  if(step===1){const O=opts(v), n=a.req.length;
    return `<section class="card pad"><h2>${T('จดหมายขอเอกสารเพิ่มเติม','Request for additional documents')}</h2>
    <p>${T('เลือกรายการที่จะขอจากหลักสูตรได้ไม่เกิน 8 รายการ ทุกรายการควรผูกกับเกณฑ์และประเด็นที่ต้องการตัดสิน รายการที่ไม่ผูกกับประเด็นใดจะไม่ได้เอกสารกลับมา แต่นับเป็นรายการที่ใช้ไปแล้ว','Choose up to 8 items to request. Each should tie to a criterion and an issue you need to decide. Items tied to no issue return nothing but still count.')}</p>
    <p class="note" aria-live="polite">${T('เลือกแล้ว','Selected')} ${n}/8</p>
    <div class="lab-list">${O.map((o,i)=>{const on=a.req.includes(i);return `<button class="lab-pick" data-lab="req" data-i="${i}" aria-pressed="${on}" ${a.reqDone||(!on&&n>=8)?'disabled':''}>${e(o.t)}</button>`}).join('')}</div>
    <div class="row" style="margin-top:16px">${a.reqDone?'':`<button class="btn" data-lab="reqdone">${T('ส่งจดหมาย','Send the letter')}</button>`}</div></section>
    ${a.reqDone?(()=>{const G=got(v,a);const miss=v.reqs.filter((r,m)=>!O.some((o,i)=>o.m===m&&a.req.includes(i)));const dis=O.filter((o,i)=>o.m<0&&a.req.includes(i));
      return `<section class="card pad"><h2>${T('ผลของจดหมาย','Result of your letter')}</h2>
      <p>${T('ท่านได้รับเอกสาร','You receive')} ${G.size} ${T('ฉบับ','document(s)')}${G.size?': '+[...G].sort().join(' · '):''}</p>
      ${dis.length?`<p class="note">${T('รายการที่หลักสูตรตอบว่า "จะเตรียมไว้ให้ดูในวันตรวจเยี่ยม"','Items answered “will be available during the visit”')}: ${dis.map(o=>e(o.t)).join(' · ')}</p>`:''}
      ${INS?table(T('รายการต้นแบบ','Model request list'),[T('รายการที่ควรขอ','Item to request'),T('เกณฑ์และประเด็น','Criterion and issue'),T('เอกสาร','Document'),T('ผลของท่าน','Yours')],v.reqs.map(r=>[r[0],r[1],r[2],miss.includes(r)?'✗ '+T('ไม่ได้ขอ','not requested'):'✓ '+T('ขอแล้ว','requested')])):''}
      ${next()}</section>`})():''}`}
  if(step===2){const G=a.reqDone?got(v,a):new Set(); const docs=v.packet.filter(d=>INS||G.has(d.code));
    return `<section class="card pad"><h2>${T('Pre-visit 2: อ่านเอกสารที่ได้รับ แล้วปรับระดับ','Pre-visit 2: read what you received and re-rate')}</h2>
    ${INS?`<p class="src">${T('โหมดวิทยากร: แสดงเอกสารในซองครบทุกฉบับ ผู้อบรมจะเห็นเฉพาะฉบับที่ขอไว้ในจดหมาย','Instructor mode: all packet documents are shown. Trainees see only what they requested.')}</p>`:a.reqDone?`<p>${T('ด้านล่างคือเอกสารที่หลักสูตรส่งตามจดหมายของท่าน อ่านแล้วปรับระดับของแต่ละเกณฑ์ ประเด็นใดที่เอกสารตอบแล้วให้ปิด ประเด็นใดยังค้างให้เก็บไว้ถามในวันตรวจ','Below are the documents sent in reply to your letter. Re-rate each criterion: close what the documents settle and carry the rest to the visit.')}</p>`:`<p class="src">${T('ท่านยังไม่ได้ส่งจดหมายขอเอกสาร กลับไปทำขั้นที่ 2 ก่อน','You have not sent the request letter yet. Complete step 2 first.')}</p>`}
    </section>
    ${docs.length?`<section class="card"><div class="pad"><h2>${T('ซองเอกสารเพิ่มเติม','Additional documents')} (${docs.length}/${v.packet.length})</h2></div>${docs.map(docHTML).join('')}${v.unavail.length?`<div class="lab-doc">${table(T('รายการที่หลักสูตรแจ้งว่าไม่สามารถจัดส่งได้','Items the program could not provide'),[T('รายการ','Item'),T('คำตอบของหลักสูตร','Program reply')],v.unavail)}</div>`:''}</section>`:''}
    <section class="card pad"><h2>${T('ระดับหลังได้เอกสารเพิ่ม','Levels after the documents')}</h2>${levelForm(v,a,1)}
    <div class="row" style="margin-top:16px">${a.k[1]?(INS?'':saved()):`<button class="btn" data-lab="key" data-s="1" ${a.reqDone||INS?'':'disabled'}>${INS?T('ทำเครื่องหมายว่าเสร็จ','Mark done'):T('บันทึกระดับ Pre-visit 2','Save Pre-visit 2 levels')}</button>`}</div></section>
    ${!INS&&a.k[1]?`<section class="card pad">${next()}</section>`:''}
    ${INS?`<section class="card pad"><h2>${T('สิ่งที่เอกสารเพิ่มเติมบอก','What the documents show')}</h2>${issueNotes(v,1)}${next()}</section>`:''}`}
  if(step===3){const ni=a.iv.length,np=a.pl.length;
    return `<section class="card pad"><h2>${T('แผนตรวจเยี่ยม','Visit plan')}</h2>
    <p>${T('เวลาตรวจเยี่ยมมีจำกัด เลือกผู้ให้สัมภาษณ์ได้ 4 กลุ่ม และสถานที่หรือแหล่งหลักฐานได้ 2 แห่ง เลือกจากประเด็นที่ยังค้างหลัง Pre-visit 2 ไม่ใช่เลือกให้ครบทุกกลุ่ม และเตรียมคำถามของแต่ละกลุ่มไว้ล่วงหน้า','Visit time is limited. Pick 4 interview groups and 2 sites or evidence sources, driven by the issues still open after Pre-visit 2, and prepare your questions.')}</p>
    <h3 style="margin-top:14px">${T('ผู้ให้สัมภาษณ์','Interview groups')} (${ni}/4)</h3>
    <div class="lab-list">${v.roles.map((r,i)=>{const on=a.iv.includes(i);return `<button class="lab-pick" data-lab="iv" data-i="${i}" aria-pressed="${on}" ${a.planDone||(!on&&ni>=4)?'disabled':''}>${e(r[0])}</button>`}).join('')}</div>
    <h3 style="margin-top:18px">${T('สถานที่และแหล่งหลักฐาน','Sites and evidence sources')} (${np}/2)</h3>
    <div class="lab-list">${v.places.map((r,i)=>{const on=a.pl.includes(i);return `<button class="lab-pick" data-lab="pl" data-i="${i}" aria-pressed="${on}" ${a.planDone||(!on&&np>=2)?'disabled':''}>${e(r[0])}</button>`}).join('')}</div>
    <div class="row" style="margin-top:16px">${a.planDone?`<button class="btn" data-lab="go" data-to="4">${T('เริ่มตรวจเยี่ยมจำลอง →','Start the mock visit →')}</button>`:`<button class="btn" data-lab="plandone" ${ni&&np?'':'disabled'}>${T('ยืนยันแผน','Confirm the plan')}</button>`}</div></section>`}
  if(step===4){
    if(!INS){
      if(!a.planDone) return `<section class="card pad"><p class="src">${T('ยังไม่ได้ยืนยันแผนตรวจเยี่ยม กลับไปทำขั้นที่ 4 ก่อน','Confirm your visit plan in step 4 first.')}</p></section>`;
      return `<section class="card pad"><h2>${T('ตรวจเยี่ยมจำลอง','Mock visit')}</h2>
      <p>${T('การตรวจเยี่ยมจำลองทำในวันอบรม Onsite วิทยากรจะสวมบทบาทตามแผนของท่าน และตอบเฉพาะสิ่งที่ถูกถาม เตรียมคำถามของแต่ละกลุ่มไว้ในช่องด้านล่าง แล้วจดสิ่งที่ได้ยินและเห็นระหว่างตรวจ','The mock visit takes place onsite. Facilitators play the roles in your plan and answer only what is asked. Prepare questions for each group below and note what you hear and see.')}</p>
      ${a.iv.map(i=>v.roles[i]).map((r,j)=>`<div class="lab-role"><h3>${e(r[0])}</h3><label class="note" for="q-iv${j}">${T('คำถามที่เตรียมไว้และสิ่งที่ได้','Prepared questions and notes')}</label><textarea id="q-iv${j}" data-labtxt="iv${j}" rows="4" style="width:100%">${e((a.txt||{})['iv'+j]||'')}</textarea></div>`).join('')}
      ${a.pl.map(i=>v.places[i]).map((r,j)=>`<div class="lab-role"><h3>${e(r[0])}</h3><label class="note" for="q-pl${j}">${T('สิ่งที่ต้องการดูและสิ่งที่พบ','What to look for and what you found')}</label><textarea id="q-pl${j}" data-labtxt="pl${j}" rows="3" style="width:100%">${e((a.txt||{})['pl'+j]||'')}</textarea></div>`).join('')}
      ${next(T('ไปให้ระดับสุดท้าย →','Go to final levels →'))}</section>`;}
    const R=v.roles.map((r,i)=>[r,a.iv.includes(i)]), P=v.places.map((r,i)=>[r,a.pl.includes(i)]);
    return `<section class="card pad"><h2>${T('บัตรบทบาทและข้อมูลสถานที่ (วิทยากร)','Role cards and site information (instructor)')}</h2>
    <p>${T('ผู้สวมบทบาทตอบเฉพาะสิ่งที่ถูกถาม ข้อมูลในหัวข้อ "ตอบเมื่อถามตรงประเด็น" ให้เฉพาะเมื่อคำถามตรงเรื่อง รายการที่มีเครื่องหมาย ● คือที่อยู่ในแผนที่บันทึกในเบราว์เซอร์นี้','Role players answer only what is asked; give the “only when asked directly” items only to on-point questions. ● marks items in the plan saved in this browser.')}</p>
    ${R.map(([r,on])=>`<div class="lab-role"><h3>${on?'● ':''}${e(r[0])}</h3><p class="note">${md(r[1])}</p><b>${T('ให้ข้อมูลเอง','Volunteers')}</b><ul>${r[2].map(x=>`<li>${md(x)}</li>`).join('')}</ul><b>${T('ตอบเมื่อถามตรงประเด็น','Only when asked directly')}</b><ul>${r[3].map(x=>`<li>${md(x)}</li>`).join('')}</ul></div>`).join('')}
    <h2 style="margin-top:18px">${T('สิ่งที่เห็นเมื่อเลือกดูสถานที่','What each site shows')}</h2>
    ${P.map(([r,on])=>`<div class="lab-role"><h3>${on?'● ':''}${e(r[0])}</h3><p>${md(r[1])}</p></div>`).join('')}
    ${table(T('แผนตรวจเยี่ยมต้นแบบ','Model visit plan'),[T('ประเด็น','Issue'),T('หลักฐานที่ต้องการ','Evidence needed'),T('แหล่ง','Source'),T('คำถามตัวอย่าง','Sample questions')],v.visit)}<p>${md(v.visit_note)}</p>
    ${next(T('ไปข้อค้นพบสุดท้าย →','Go to final findings →'))}</section>`}
  if(!INS){
    const sum=summary(v,a);
    return `<section class="card pad"><h2>${T('ข้อค้นพบสุดท้าย','Final findings')}</h2>
    <p>${T('ให้ระดับสุดท้ายของแต่ละเกณฑ์จากหลักฐานทั้งหมด แล้วเขียนข้อค้นพบของเกณฑ์ที่มีประเด็น ข้อค้นพบที่ดีมี 3 ส่วน คือข้อของเกณฑ์ สิ่งที่พบพร้อมหลักฐาน และผลต่อการเป็นไปตามเกณฑ์ โดยไม่กำหนดวิธีแก้ เฉลยจะอภิปรายร่วมกับวิทยากรในวันอบรม','Give final levels and write findings for criteria with issues: the criterion, what was found with evidence, and the effect on compliance, without prescribing a fix. The key is discussed with your facilitator onsite.')}</p>
    ${levelForm(v,a,2)}
    <label class="note" for="q-find" style="display:block;margin-top:14px">${T('ข้อค้นพบของท่าน','Your findings')}</label><textarea id="q-find" data-labtxt="find" rows="8" style="width:100%">${e((a.txt||{}).find||'')}</textarea>
    <div class="row" style="margin-top:16px">${a.k[2]?saved():`<button class="btn" data-lab="key" data-s="2">${T('บันทึกระดับสุดท้าย','Save final levels')}</button>`}</div></section>
    <section class="card pad"><h2>${T('สรุปคำตอบสำหรับส่งวิทยากร','Summary to send your facilitator')}</h2><p class="note">${T('คัดลอกข้อความนี้ไปส่งทางอีเมลหรือระบบที่วิทยากรกำหนด','Copy this text and send it the way your facilitator asks.')}</p>
    <textarea id="lab-sum" readonly rows="12" style="width:100%">${e(sum)}</textarea><div class="row" style="margin-top:10px"><button class="btn ghost" data-lab="copy">${T('คัดลอกสรุป','Copy summary')}</button></div></section>`;
  }
  const sc=[0,1,2].map(s=>v.final.filter((f,ci)=>a.lv[s][ci]===key(v,s,ci)).length);
  return `<section class="card pad"><h2>${T('ข้อค้นพบสุดท้าย (เฉลย)','Final findings (key)')}</h2>
    <p>${T('ให้ระดับสุดท้ายของแต่ละเกณฑ์จากหลักฐานทั้งหมดที่ได้ และเขียนข้อค้นพบของเกณฑ์ที่มีประเด็นลงในแบบฟอร์มของคณะผู้ตรวจ ข้อค้นพบที่ดีมี 3 ส่วน คือข้อของเกณฑ์ สิ่งที่พบพร้อมหลักฐาน และผลต่อการเป็นไปตามเกณฑ์ โดยไม่กำหนดวิธีแก้','Give the final level for each criterion from all the evidence, and write the findings on the team form. A good finding states the criterion, what was found with evidence, and the effect on compliance, without prescribing a fix.')}</p>
    ${a.planDone?'':`<p class="src">${T('ท่านยังไม่ได้ทำขั้นตรวจเยี่ยมจำลอง ระดับสุดท้ายของบางเกณฑ์ขึ้นกับข้อมูลวันตรวจ','You have not done the mock visit. Some final levels depend on visit evidence.')}</p>`}
    ${levelForm(v,a,2)}
    </section>
    ${INS?`<section class="card pad"><h2>${T('ผลที่บันทึกในเบราว์เซอร์นี้เทียบกับเฉลย','Your result against the key')}</h2>
      <div class="lab-score"><div><b>${sc[0]}/8</b>${T('ตรงในจังหวะ Pre-visit 1','matches at Pre-visit 1')}</div><div><b>${sc[1]}/8</b>${T('ตรงในจังหวะ Pre-visit 2','matches at Pre-visit 2')}</div><div><b>${sc[2]}/8</b>${T('ตรงในระดับสุดท้าย','matches at final')}</div></div>
      ${table(T('ระดับสุดท้ายรายเกณฑ์','Final level by criterion'),[T('เกณฑ์','Criterion'),T('เฉลย','Key'),T('ของท่าน','Yours'),T('ประเด็นที่ทำให้ได้ระดับนี้','Issue behind the level')],v.final.map((f,ci)=>[(ci+1)+' '+CR[ci],LN[f[0]],a.lv[2][ci]?LN[a.lv[2][ci]]:'–',f[1]]))}
      <p class="note">${T('ระดับในเฉลยเป็นร่างของผู้จัดทำชุดฝึก อยู่ระหว่างรอการรับรองจากผู้ตรวจประเมินอาวุโสของ TABEE','Key levels are drafts by the exercise authors, pending endorsement by senior TABEE evaluators.')}</p></section>
      <section class="card pad"><h2>${T('ข้อค้นพบต้นแบบ','Model finding statements')}</h2>${v.findings.map(x=>`<p>${md(x)}</p>`).join('')}<p class="note">${md(v.overall)}</p></section>
      <section class="card pad"><h2>${T('รายละเอียดรายประเด็น','Issue by issue')}</h2>${issueNotes(v,2)}</section>
      <section class="card pad"><h2>${T('แผนตรวจเยี่ยมต้นแบบ','Model visit plan')}</h2>${table('',[T('ประเด็น','Issue'),T('หลักฐานที่ต้องการ','Evidence needed'),T('แหล่ง','Source'),T('คำถามตัวอย่าง','Sample questions')],v.visit)}<p>${md(v.visit_note)}</p></section>`:''}`;
}
window.serlab=function(){if(!INS&&step>5)step=5;
  const V=D(); if(!V.length) return `<section class="card pad"><p>${T('ไม่พบข้อมูลชุดฝึก','Exercise data not found')}</p></section>`;
  volFix();const v=V[vol], a=st(v.code);
  const done=[a.k[0],a.reqDone,a.k[1],a.planDone,a.planDone&&a.seen,a.k[2]];
  return css+`<div class="crumb"><a href="#analysis">${T('ฝึกวิเคราะห์','Analysis practice')}</a> / ${T('ชุดฝึก SER จำลอง','Mock SER lab')}</div>
  <div><h1>${T('ชุดฝึก SER จำลอง · เลือก 1 หลักสูตร','Mock SER lab · pick one program')}</h1><p class="lead">${T('ฝึกตามลำดับงานจริงของผู้ตรวจประเมิน 6 ขั้น ตั้งแต่อ่านรายงานประเมินตนเองจนถึงให้ระดับข้อค้นพบสุดท้าย แต่ละขั้นจะเห็นแนวคิดของขั้นนั้นเมื่อส่งคำตอบแล้วเท่านั้น','Follow an evaluator’s real sequence in six steps, from reading the self-evaluation report to the final finding levels. Each step shows its reasoning only after you submit.')}</p>${lang==='en'?'<p class="src" style="margin-top:10px">Exercise content is in Thai. An English version has not been prepared yet.</p>':''}</div>
  <section class="card pad"><p class="note" style="margin:0 0 10px">${T('ทำ 1 หลักสูตรก็ครบ หลักสูตรหลักคือเทคโนโลยีวิศวกรรมอุตสาหการ (IET) และฝึกเพิ่มได้อีก 4 หลักสูตร ได้แก่ ไฟฟ้า (EET) โยธา (CET) เคมี (ChET) และเมคคาทรอนิกส์ (MCT)','One program completes this task. The main program is Industrial Engineering Technology (IET); EET, CET, ChET and MCT are optional extra practice.')}</p><div class="tabs" role="tablist" aria-label="${T('หลักสูตร','Program')}">${V.map((x,i)=>{const b=st(x.code);return `<button class="tab" role="tab" aria-selected="${i===vol}" data-lab="vol" data-i="${i}">${e(x.name)}${b.k[2]?' ✓':''}</button>`}).join('')}</div>
  <p class="note" style="margin-top:10px">${T('ไฟล์ของหลักสูตร','Files for')} ${e(v.name)} · ${T('ความก้าวหน้าบันทึกในเบราว์เซอร์นี้','progress is saved in this browser')}</p>${fileBox(v)}</section>
  ${INS?`<p class="src">${T('ฉบับวิทยากร: แสดงเฉลยทุกขั้น ซองเอกสารครบ บัตรบทบาท และข้อมูลสถานที่ ห้ามเผยแพร่ลิงก์นี้ให้ผู้เข้ารับการฝึกอบรม','Instructor edition: keys at every step, the full packet, role cards and site information. Do not share this link with trainees.')}</p>`:''}
  <nav class="lab-steps" aria-label="${T('ขั้นของชุดฝึก','Exercise steps')}">${STEPS.map((s,i)=>`<button class="lab-step ${done[i]?'done':''}" data-lab="go" data-to="${i}" ${i===step?'aria-current="step"':''}><b>${i+1}. ${T(s[0],s[1])}</b><span>${T(s[2],s[3])}</span></button>`).join('')}</nav>
  ${panel(v,a)}
  <div class="row"><button class="btn ghost" data-lab="reset">${T('เริ่มเล่มนี้ใหม่','Restart this program')}</button></div>`;
};
document.addEventListener('input',ev=>{const t=ev.target.closest('[data-labtxt]');if(!t)return;const v=D()[volFix()],a=st(v.code);(a.txt=a.txt||{})[t.dataset.labtxt]=t.value;save()});
window.serlabDone=()=>D().filter(x=>(S.lab||{})[x.code]&&S.lab[x.code].k[2]).length;
document.addEventListener('click',ev=>{
  const t=ev.target.closest('[data-lab]'); if(!t||t.disabled) return; const d=t.dataset, V=D(), v=V[volFix()], a=st(v.code);
  const tog=(arr,i,max)=>{const p=arr.indexOf(i); if(p>-1)arr.splice(p,1); else if(arr.length<max)arr.push(i)};
  let top=false;
  if(d.lab==='vol'){vol=+d.i;step=0;S.labv=V[vol].code}
  else if(d.lab==='go'){step=Math.max(0,Math.min(5,+d.to));top=true;if(step===4&&a.planDone)a.seen=true}
  else if(d.lab==='lv'){const o=a.lv[+d.s]; o[+d.c]=o[+d.c]===d.k?undefined:d.k}
  else if(d.lab==='key'){a.k[+d.s]=true}
  else if(d.lab==='req'){if(!a.reqDone)tog(a.req,+d.i,8)}
  else if(d.lab==='reqdone'){a.reqDone=true}
  else if(d.lab==='open'){a.open=true}
  else if(d.lab==='iv'){if(!a.planDone)tog(a.iv,+d.i,4)}
  else if(d.lab==='pl'){if(!a.planDone)tog(a.pl,+d.i,2)}
  else if(d.lab==='plandone'){a.planDone=true}
  else if(d.lab==='copy'){const x=document.getElementById('lab-sum');x.select();try{navigator.clipboard.writeText(x.value)}catch(_){try{document.execCommand('copy')}catch(__){}}return}
  else if(d.lab==='reset'){delete S.lab[v.code];step=0;top=true}
  save(); render(!top);
});
})();
