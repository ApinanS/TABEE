/* TABEE Studio · Auto Check engine (runs in a Web Worker)
   Copied from the Auto Check part of pevstudio/js/app.js so the screening committee gets the same
   evidence check as PEV Studio. The rules and the checklist are NOT copied: worker.js loads
   checklist.js and rules.js straight from pevstudio/ (EAC) or pevstudio-etc/ (ETC).
   When the engine in PEV Studio changes, regenerate this file with studio/build-engine.sh */
const ALL=[];CHECKLIST.forEach(c=>c.groups.forEach(g=>g.items.forEach(it=>ALL.push({c:c.n,g,it}))));
const KW={1:['รับเข้า','คัดเลือก','TCAS','เทียบโอน','อาจารย์ที่ปรึกษา','สำเร็จการศึกษา','ใบระเบียน','Transcript','rerequisite','พ้นสภาพ','อนุมัติจบ'],2:['พันธกิจ','วัตถุประสงค์หลักสูตร','PEO','ผู้มีส่วนได้','IAC','IAB','Mission','ทบทวน'],3:['ผลลัพธ์การศึกษา','PO','PI','ตัวชี้วัด','แบบความรู้','Program Outcome','TK'],4:['ประเมินผลลัพธ์','ทางตรง','ทางอ้อม','CQI','พัฒนาต่อเนื่อง','ระดับความสำเร็จ','Rubric','mbedded','มคอ'],5:['โครงสร้างหลักสูตร','หน่วยกิต','Capstone','สหกิจ','ฝึกงาน','Course Portfolio','ประมวลรายวิชา','omplex','ซับซ้อน','แผนการศึกษา'],6:['คณาจารย์','ภาระงาน','คุณวุฒิ','พัฒนาวิชาชีพ','ผลงานวิชาการ','อาจารย์ประจำ','อาจารย์พิเศษ'],7:['ห้องปฏิบัติการ','ห้องเรียน','ครุภัณฑ์','ความปลอดภัย','ห้องสมุด','เทคโนโลยีสารสนเทศ','ซ่อมบำรุง','สิ่งอำนวยความสะดวก'],8:['งบประมาณ','ผู้บริหาร','สายสนับสนุน','รับสมัครอาจารย์','การเงิน','การสนับสนุนของสถาบัน','คณบดี']};
function skel(raw){const out=[],map=[];for(let i=0;i<raw.length;i++){let ch=raw[i];const cc=raw.charCodeAt(i);
    if(cc===0x0E33)ch='า';else if(cc===0x0E31||(cc>=0x0E34&&cc<=0x0E3A)||(cc>=0x0E47&&cc<=0x0E4E))continue;
    else if(cc<=32||cc===0xA0||cc===0x200B||cc===0xFEFF||',;:()[]{}\'"“”‘’-–—_/\\|*•'.includes(ch))continue;else ch=ch.toLowerCase();
    out.push(ch);map.push(i)}return{s:out.join(''),map}}
function prepKW(k){k=k.trim();if(/^[\x20-\x7E]+$/.test(k)){const cs=/^[A-Z0-9]{2,6}$/.test(k);
    const p=k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\s+/g,'[\\s\\-]*').replace(/([A-Za-z])(\d)/g,'$1[\\s\\-]*$2');
    return{k,re:new RegExp('(?<![A-Za-z0-9])'+p+(/[A-Za-z]$/.test(k)?'s?':'')+'(?![A-Za-z0-9])',cs?'g':'gi')}}
  return{k,sk:skel(k).s}}
function prepGroup(g){const i=g.indexOf(':');return{label:g.slice(0,i).trim(),kws:g.slice(i+1).split('|').filter(Boolean).map(prepKW)}}
const RX={};for(const k in RULES){const r=RULES[k];RX[k]={req:(r.req||[]).map(prepGroup),opt:(r.opt||[]).map(prepGroup),cond:r.cond?prepGroup(r.cond):null,r}}
const HEAD=/เกณฑ(?:ขอท|ขอ|ท)([1-8])(?![0-9])|criterion([1-8])(?![0-9])/g;
const MAJOR=self.TRACK_MAJOR||1500;
function lineStartOK(raw,ri,max=40){let j=ri-1,pre='';while(j>=0&&raw[j]!=='\n'&&ri-j<max){pre=raw[j]+pre;j--}return pre}
function prepDoc(f,raw){const sk=skel(raw),cand=[],pages=[];let m;HEAD.lastIndex=0;
  while((m=HEAD.exec(sk.s))){const ri=sk.map[m.index];const pre=lineStartOK(raw,ri).replace(/[\u200b\ufeff]/g,'');
    if(/^[\s\d.\-–•#*]*(?:(?:บทที่|ส่วนที่|หมวดที่|Part|Chapter)\s*\d+[\s.:\-–]*)?$/i.test(pre))cand.push([ri,+(m[1]||m[2])])}
  /* keep only headings that open a real section, so a table of contents or a checklist table does not split the book */
  const hs=cand.filter((h,i)=>(i+1<cand.length?cand[i+1][0]:raw.length)-h[0]>=MAJOR);
  const pr=/\[หน้า (\d+)\]/g;while((m=pr.exec(raw)))pages.push([m.index,+m[1]]);
  return{f,raw,sk,hs,pages,headed:hs.length>0,gx:{}}}
function regionAt(d,ri){let c=0;for(const h of d.hs){if(h[0]>ri)break;c=h[1]}return c}
function pageAt(d,ri){let p=0;for(const x of d.pages){if(x[0]>ri)break;p=x[1]}return p}
function skToRaw(d,si){return d.sk.map[Math.min(si,d.sk.map.length-1)]}
function lowerBound(arr,v){let lo=0,hi=arr.length;while(lo<hi){const mid=(lo+hi)>>1;if(arr[mid]<v)lo=mid+1;else hi=mid}return lo}
function critSpans(d,c){const out=[];d.hs.forEach((h,i)=>{if(h[1]===c)out.push([h[0],i+1<d.hs.length?d.hs[i+1][0]:d.raw.length])});return out}
CHECKLIST.forEach(c=>c.groups.forEach(g=>{g.hs=skel(g.h.replace(/^[\d.\s]+/,'').replace(/\(.*?\)/g,'').replace(/บุคคลากร/g,'บุคลากร')).s}));
CHECKLIST.forEach(c=>c.groups.forEach(g=>{let L=10;while(L<g.hs.length&&c.groups.some(o=>o!==g&&o.hs.startsWith(g.hs.slice(0,L))))L++;g.hk=g.hs.slice(0,L)}));
function bigramSim(a,b){a=a.slice(0,40);b=b.slice(0,40);if(a.length<2||b.length<2)return 0;const A=new Map();for(let i=0;i<a.length-1;i++){const k=a.substr(i,2);A.set(k,(A.get(k)||0)+1)}
  let m=0;for(let i=0;i<b.length-1;i++){const k=b.substr(i,2),v=A.get(k);if(v){m++;A.set(k,v-1)}}return 2*m/(a.length+b.length-2)}
/* find the template sub-headings (1. 2. 3. … and 1.1 1.2 …) inside each criterion section */
function groupMap(d,c){if(d.gx[c])return d.gx[c];const cs=critSpans(d,c),res={found:{},items:{}},G=CHECKLIST[c-1].groups;
  for(const [a,b] of cs){const seg=d.raw.slice(a,b),marks=[],got=new Set();let m;
    const re=/(?:^|\n)[\s#*]*([1-9])\.(?!\d)[ \t]*([^\n]{3,150})/g;
    while((m=re.exec(seg))){const g=G.find(x=>x.n===+m[1]);if(!g||got.has(g.n))continue;if(bigramSim(skel(m[2]).s,g.hs)>=0.3){marks.push([a+m.index+(m[0][0]==='\n'?1:0),g.n]);got.add(g.n)}}
    /* headings without numbers (Word auto-numbering is lost when text is extracted): compare each line start with the template wording */
    const ls=/(?:^|\n)[\s#*•\-–]*([^\n]{4,})/g;
    while((m=ls.exec(seg))&&got.size<G.length){const head=skel(m[1].slice(0,60)).s.slice(0,40);if(head.length<6)continue;
      for(const g of G){if(got.has(g.n))continue;const L=Math.min(head.length,g.hs.length,40);if(L<6)continue;
        if(head.startsWith(g.hk)||bigramSim(head.slice(0,L),g.hs.slice(0,L))>=0.5){marks.push([a+m.index+(m[0][0]==='\n'?1:0),g.n]);got.add(g.n);break}}}
    marks.sort((x,y)=>x[0]-y[0]);marks.forEach((mk,k)=>{(res.found[mk[1]]||(res.found[mk[1]]=[])).push([mk[0],k+1<marks.length?marks[k+1][0]:b])})}
  for(const g of G){if(g.items.length<2)continue;for(const [a,b] of(res.found[g.n]||cs)){const seg=d.raw.slice(a,b),re=/(?:^|\n)[\s#*]*(\d\.\d)(?!\d)[ \t]*[\u0E01-\u0E2E\u0E40-\u0E44]/g;let m;
      while((m=re.exec(seg)))if(g.items.some(it=>it.code===m[1]))res.items[m[1]]=1}}
  return d.gx[c]=res}
function hitWeight(d,ri,c,g,headedAny){if(!headedAny)return[1,''];if(!d.headed)return[SCORING.ATTACH,'ในเอกสารแนบ'];
  return regionAt(d,ri)!==c?[SCORING.OUTSIDE,'นอกส่วนของเกณฑ์ข้อ '+c]:[1,'']}
function* hits(d,kw){if(kw.re){kw.re.lastIndex=0;let m,n=0;while((m=kw.re.exec(d.raw))&&n++<400)yield m.index}
  else if(kw.sk){let i=-1,n=0;while((i=d.sk.s.indexOf(kw.sk,i+1))>=0&&n++<400)yield skToRaw(d,i)}}
function findGroup(docs,grp,c,g,headedAny){let best=null;
  for(const d of docs)for(const kw of grp.kws)for(const ri of hits(d,kw)){const [w,why]=hitWeight(d,ri,c,g,headedAny);
      if(!best||w>best.w){best={w,why,d,ri,kw:kw.k};if(w===1)return best}}
  return best}
function regionText(docs,c){return docs.map(d=>{if(!d.headed)return d.raw;let out='';d.hs.forEach((h,i)=>{if(h[1]===c)out+=d.raw.slice(h[0],i+1<d.hs.length?d.hs[i+1][0]:d.raw.length)+'\n'});return out}).join('\n')}
function countYears(tx){const ys=new Set();let m;const a=/(?<!\d)(25[4-7]\d)(?!\d)/g,b=/(?<!\d)(20[0-3]\d)(?!\d)/g,c=/TCAS\s*-?\s*(\d{2})(?!\d)/gi;
  while((m=a.exec(tx)))ys.add(+m[1]);while((m=b.exec(tx)))ys.add(+m[1]+543);while((m=c.exec(tx)))ys.add(2500+ +m[1]);return[...ys].sort()}
const snip=(d,ri)=>{const s=d.raw.slice(Math.max(0,ri-50),ri+110).replace(/\[หน้า \d+\]/g,' ').replace(/\s+/g,' ').trim();return'“…'+s+'…”'};
const where=(d,ri)=>{const p=pageAt(d,ri);return d.f.name+(p?' · หน้า '+p:'')};
function checkItem(docs,c,x,files){const it=x.it,g=x.g,key=c+'|'+it.code,R=RX[key];if(!R)return null;const lines=[],evs=[],miss=[],warn=[];
  const headedAny=docs.some(d=>d.headed),critHere=docs.some(d=>d.headed&&d.hs.some(h=>h[1]===c));let cap=1;
  if(headedAny&&!critHere){warn.push('ไม่พบส่วนที่เป็นเกณฑ์ข้อ '+c+' ในเล่ม');cap=SCORING.OUTSIDE}
  else if(headedAny){const maps=docs.filter(d=>d.headed).map(d=>groupMap(d,c));
    const gFound=maps.some(m=>m.found[g.n]),anyG=maps.some(m=>Object.keys(m.found).length);
    if(!gFound&&anyG){warn.push('ไม่พบหัวข้อ "'+g.n+'. '+g.h.slice(0,60)+'" ในส่วนของเกณฑ์ข้อ '+c);cap=Math.min(cap,SCORING.NEAR)}
    if(g.items.length>2){const sibN=g.items.filter(o=>o.code!==it.code&&maps.some(m=>m.items[o.code])).length,sib=sibN>=Math.ceil((g.items.length-1)/2),me=maps.some(m=>m.items[it.code]);
      if(sib&&!me){warn.push('ไม่พบหัวข้อย่อย '+it.code+' (พบหัวข้อย่อยอื่นในกลุ่มเดียวกัน '+sibN+' หัวข้อ)');cap=Math.min(cap,SCORING.NEAR)}}}
  if(R.cond&&!findGroup(docs,R.cond,c,null,false))return{r:'N',n:'ไม่พบว่าหลักสูตร'+R.cond.label+' จึงถือว่าข้อนี้ไม่เกี่ยวข้อง ขอให้คณะผู้ตรวจยืนยัน',ev:'',req:'',q:'',score:1};
  let sum=0,n=0;
  for(const gr of R.req){n++;let hit=findGroup(docs,gr,c,g,headedAny);
    if(!hit&&R.r.file){const f=files.find(z=>z.kind===R.r.file);if(f){sum+=1;lines.push('✓ '+gr.label+' — มีไฟล์ประเภท'+R.r.file+': '+f.name);continue}}
    if(hit){sum+=Math.min(hit.w,cap);lines.push('✓ '+gr.label+' — พบใน '+where(hit.d,hit.ri)+(hit.why?' ('+hit.why+')':''));if(evs.length<3)evs.push(gr.label+': '+snip(hit.d,hit.ri)+' ('+where(hit.d,hit.ri)+')')}
    else{lines.push('✗ '+gr.label+' — ไม่พบ');miss.push(gr.label)}}
  if(R.r.y){n++;const ys=countYears(regionText(docs,c));const ok=ys.length>=R.r.y;sum+=Math.min(cap,ok?1:ys.length/R.r.y);
    lines.push((ok?'✓ ':'✗ ')+'ข้อมูลอย่างน้อย '+R.r.y+' ปีการศึกษา — พบ '+ys.length+' ปี'+(ys.length?' ('+ys.slice(0,8).join(', ')+')':''));if(!ok)miss.push('ข้อมูลย้อนหลังอย่างน้อย '+R.r.y+' ปีการศึกษา')}
  const optMiss=[];for(const gr of R.opt){const hit=findGroup(docs,gr,c,g,headedAny);if(hit)lines.push('✓ (เสริม) '+gr.label+' — พบใน '+where(hit.d,hit.ri));else{lines.push('○ (เสริม) '+gr.label+' — ไม่พบ');optMiss.push(gr.label)}}
  if(R.r.po){const tx=regionText(docs,c),ns=new Set();let m;const re=/(?<![A-Za-z])P?L?O\s*-?\s*(\d{1,2})(?!\d)/g;while((m=re.exec(tx)))if(+m[1]>=1&&+m[1]<=20)ns.add(+m[1]);
    const ok=ns.size>=R.r.po;lines.push((ok?'✓':'○')+' (เสริม) ระบุ PO ครบ '+R.r.po+' ข้อ — พบ '+ns.size+' ข้อ');if(!ok)optMiss.push('การระบุ PO ครบ '+R.r.po+' ข้อ')}
  if(R.r.fac){const tx=regionText(docs,c);const k=(tx.match(/(?:รศ\.|ผศ\.|ศ\.|อ\.)\s*ดร\.|ศาสตราจารย์|Assoc\.\s*Prof|Asst\.\s*Prof|Dr\./g)||[]).length;
    const ok=k>=R.r.fac;lines.push((ok?'✓':'○')+' (เสริม) รายชื่ออาจารย์ — พบชื่อที่มีตำแหน่งวิชาการ '+k+' ครั้ง');if(!ok)optMiss.push('รายชื่ออาจารย์พร้อมคุณวุฒิ')}
  const score=n?sum/n:1;const r=score>=0.999?(optMiss.length?'R':'N'):score>=SCORING.C?'C':score>=SCORING.W?'W':'D';
  const head={N:'พบหลักฐานครบทุกรายการ',R:'พบหลักฐานหลักครบ แต่ไม่พบหลักฐานเสริมบางรายการ',C:'พบหลักฐานส่วนใหญ่',W:'พบหลักฐานเพียงบางส่วน',D:'ไม่พบหลักฐานที่ต้องการ'}[r];
  return{r,score,n:head+' (คะแนนหลักฐาน '+Math.round(score*100)+'%)\n'+warn.map(w=>'! '+w+'\n').join('')+lines.join('\n'),ev:evs.join('\n'),
    req:miss.length?'ขอ'+miss.join(' และ ')+' (เกณฑ์ข้อ '+c+' ข้อ '+it.code+')':warn.length?'ขอให้ระบุตำแหน่งในเล่มที่อธิบายเกณฑ์ข้อ '+c+' ข้อ '+it.code+' ('+warn[0]+')':(r==='R'?'ขอ'+optMiss.join(' และ ')+' (ถ้ามี)':''),
    q:miss.length?'หลักสูตรดำเนินการเรื่อง'+miss.join(' และ ')+'อย่างไร ขอให้อธิบายพร้อมแสดงหลักฐาน':''}}
const FLAGKW=[['ระบุว่าต่ำกว่าเป้าหมายหรือไม่บรรลุ','ต่ำกว่าเป้าหมาย|ต่ำกว่าระดับที่คาดหวัง|ต่ำกว่าเกณฑ์|ไม่บรรลุ|ยังไม่บรรลุ|ไม่ถึงเป้า|ไม่ผ่านเกณฑ์|บรรลุบางส่วน'],
 ['ครุภัณฑ์ค้างซ่อม เลยกำหนด หรือไม่ได้รับจัดสรร','เลยกำหนด|ค้างซ่อม|รอซ่อม|รอการซ่อม|ชำรุด|ไม่ได้รับการจัดสรร'],
 ['ความเสี่ยงด้านอัตรากำลังอาจารย์','ยังไม่มีผู้สอนแทน|ไม่มีผู้สอนแทน|ไม่มีอาจารย์ทดแทน|จะเกษียณ|ลาไปปฏิบัติงาน|อาจารย์คนเดียว'],
 ['มาตรการยังกว้างหรือยังไม่เริ่ม','กำชับ|อยู่ระหว่างดำเนินการ|อยู่ระหว่างพิจารณา|อยู่ในแผน|ยังไม่ได้ดำเนินการ']].map(f=>({label:f[0],kws:f[1].split('|').map(k=>skel(k).s)}));
const FLAGNUM=[['อัตราตอบกลับต่ำกว่าร้อยละ 30',/(อัตรา(?:การ)?ตอบกลับ|ผู้ตอบแบบ(?:สอบถาม|สำรวจ))[^\n]{0,40}?ร้อยละ\s*(\d+(?:\.\d+)?)/g,m=>+m[2]<30],
 ['สัดส่วนต่ำกว่าร้อยละ 90',/(\d+)\s*จาก\s*(\d+)\s*(คน|ราย|ชุด|ทีม|รายการ|รายวิชา|เครื่อง)/g,(m,raw)=>+m[2]>0&&+m[1]<+m[2]&&+m[1]/+m[2]<0.9&&!/^\s*เป็น/.test(raw.slice(m.index+m[0].length,m.index+m[0].length+8))&&!/(ที่|ครั้ง|รอบ|ข้อ)\s*$/.test(raw.slice(Math.max(0,m.index-8),m.index))]];
function guessCrit(d,ri){if(d.headed)return regionAt(d,ri);const w=d.raw.slice(Math.max(0,ri-300),ri+300);let best=0,bs=0;for(let c=1;c<=8;c++){const s=KW[c].reduce((a,k)=>a+(w.includes(k)?1:0),0);if(s>bs){bs=s;best=c}}return best}
function scanFlags(docs){const by={};const add=(c,label,d,ri)=>{const l=by[c]||(by[c]=[]);if(l.length>=15||l.some(x=>x.doc===d.f.name&&Math.abs(x.ri-ri)<220))return;l.push({label,doc:d.f.name,ri,snip:snip(d,ri),where:where(d,ri)})};
  for(const d of docs){for(const f of FLAGKW)for(const k of f.kws){let i=-1,n=0;while((i=d.sk.s.indexOf(k,i+1))>=0&&n++<60){const ri=skToRaw(d,i);add(guessCrit(d,ri),f.label,d,ri)}}
    for(const [label,re,ok] of FLAGNUM){re.lastIndex=0;let m,n=0;while((m=re.exec(d.raw))&&n++<300)if(ok(m,d.raw))add(guessCrit(d,m.index),label+' ('+m[0].replace(/\s+/g,' ').slice(-40)+')',d,m.index)}}
  for(const c in by)by[c].sort((a,b)=>a.doc.localeCompare(b.doc)||a.ri-b.ri);return by}
