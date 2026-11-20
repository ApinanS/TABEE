'use strict';

/* ---------- helpers ---------- */
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clone=o=>JSON.parse(JSON.stringify(o??null));
const uid=()=>Math.random().toString(36).slice(2,9);
let LANG='th'; try{LANG=localStorage.getItem('pev.lang')||'th'}catch(e){}
const t=(th,en)=>LANG==='th'?th:(en??th);
const fmtDT=ts=>ts?new Date(ts).toLocaleString(LANG==='th'?'th-TH':'en-GB',{day:'numeric',month:'short',year:'2-digit',hour:'2-digit',minute:'2-digit'}):'';
const fmtD=d=>{if(!d)return'';const x=new Date(d);return isNaN(x)?d:x.toLocaleDateString('th-TH',{day:'numeric',month:'long',year:'numeric'})};
function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),3800)}
function setPath(o,path,v){const ks=path.split('.');let x=o;for(let i=0;i<ks.length-1;i++){if(typeof x[ks[i]]!=='object'||x[ks[i]]===null)x[ks[i]]={};x=x[ks[i]]}x[ks[ks.length-1]]=v;return x}
function getPath(o,path){let x=o;for(const k of path.split('.')){if(x==null)return undefined;x=x[k]}return x}
const libs={};
function lib(url){return libs[url]||(libs[url]=new Promise((res,rej)=>{const s=document.createElement('script');s.src=url;s.onload=res;s.onerror=()=>{delete libs[url];rej(new Error('โหลดไลบรารีไม่สำเร็จ'))};document.head.appendChild(s)}))}
const CDN='lib/';const PEV_CMAPS='lib/pdf.js/3.11.174/cmaps/';
const L_ZIP=CDN+'jszip/3.10.1/jszip.min.js',L_XLSX=CDN+'xlsx/0.18.5/xlsx.full.min.js',L_PDF=CDN+'pdf.js/3.11.174/pdf.min.js',L_PDFW=CDN+'pdf.js/3.11.174/pdf.worker.min.js',L_MAM=CDN+'mammoth/1.6.0/mammoth.browser.min.js',L_PPT=CDN+'PptxGenJS/3.12.0/pptxgen.bundle.js';

/* ---------- domain constants ---------- */
CHECKLIST.forEach(c=>c.groups.forEach(g=>g.items.forEach((it,i)=>{if(!it.code)it.code=g.n+(g.items.length>1?'.'+(i+1):'')})));
const ALL=[];CHECKLIST.forEach(c=>c.groups.forEach(g=>g.items.forEach(it=>ALL.push({c:c.n,g,it}))));
const RT={N:{th:'ไม่มีประเด็น',en:'No issue',ch:'✓',sev:0},R:{th:'ข้อสังเกต (Remark)',en:'Remark',ch:'R',sev:1},C:{th:'ข้อวิตกกังวล (Concern)',en:'Concern',ch:'C',sev:2},W:{th:'ข้อด้อย (Weakness)',en:'Weakness',ch:'W',sev:3},D:{th:'ข้อบกพร่อง (Deficiency)',en:'Deficiency',ch:'D',sev:4},S:{th:'ชี้แจงเพียงพอแล้ว (Resolved)',en:'Resolved & satisfied',ch:'S',sev:0}};
const STAGES=[{k:'ai',th:'Auto Check',en:'Auto Check',sh:'Auto'},{k:'pv1',th:'Pre-visit 1',en:'Pre-visit 1',sh:'PV1'},{k:'pv2',th:'Pre-visit 2',en:'Pre-visit 2',sh:'PV2'},{k:'d1',th:'Visit Day 1',en:'Visit Day 1',sh:'Day 1'},{k:'d2',th:'Visit Day 2',en:'Visit Day 2',sh:'Day 2'},{k:'ex',th:'Exit Statement',en:'Exit Statement',sh:'Exit'}];
const SIDX=Object.fromEntries(STAGES.map((s,i)=>[s.k,i]));
const GROUPS=['ผู้บริหารหลักสูตร','อาจารย์ผู้สอน','ศิษย์เก่า','ผู้ใช้บัณฑิต','บัณฑิต','นักศึกษาปี 1','นักศึกษาปี 2','นักศึกษาปี 3','นักศึกษาปี 4','ผู้บริหารสถาบัน','เจ้าหน้าที่สายสนับสนุน','ครูปฏิบัติการ','ผู้รับผิดชอบ Capstone','ที่ปรึกษาภาคอุตสาหกรรม (IAC)'];
const KW={1:['รับเข้า','คัดเลือก','TCAS','เทียบโอน','อาจารย์ที่ปรึกษา','สำเร็จการศึกษา','ใบระเบียน','Transcript','rerequisite','พ้นสภาพ','อนุมัติจบ'],2:['พันธกิจ','วัตถุประสงค์หลักสูตร','PEO','ผู้มีส่วนได้','IAC','IAB','Mission','ทบทวน'],3:['ผลลัพธ์การศึกษา','PO','PI','ตัวชี้วัด','แบบความรู้','Program Outcome','TK'],4:['ประเมินผลลัพธ์','ทางตรง','ทางอ้อม','CQI','พัฒนาต่อเนื่อง','ระดับความสำเร็จ','Rubric','mbedded','มคอ'],5:['โครงสร้างหลักสูตร','หน่วยกิต','Capstone','สหกิจ','ฝึกงาน','Course Portfolio','ประมวลรายวิชา','omplex','ซับซ้อน','แผนการศึกษา'],6:['คณาจารย์','ภาระงาน','คุณวุฒิ','พัฒนาวิชาชีพ','ผลงานวิชาการ','อาจารย์ประจำ','อาจารย์พิเศษ'],7:['ห้องปฏิบัติการ','ห้องเรียน','ครุภัณฑ์','ความปลอดภัย','ห้องสมุด','เทคโนโลยีสารสนเทศ','ซ่อมบำรุง','สิ่งอำนวยความสะดวก'],8:['งบประมาณ','ผู้บริหาร','สายสนับสนุน','รับสมัครอาจารย์','การเงิน','การสนับสนุนของสถาบัน','คณบดี']};
const RESULTS={full:{th:'รับรอง (Full accreditation)',period:'6 ปี',cond:'ไม่มี',find:'ดำเนินการครบตามเกณฑ์การรับรอง แต่อาจมีข้อแนะนำให้ปรับปรุง',oblig:'Interim report (3 ปี) และ/หรือ รายงานประเมินผลการปรับปรุงตามข้อเสนอแนะ',follow:'คณะอนุกรรมการฯ พิจารณารายงานความก้าวหน้า',expect:'ไม่เปลี่ยนแปลงผลการรับรอง เว้นแต่มีการปรับปรุงวัตถุประสงค์หรือผลลัพธ์การศึกษาของหลักสูตร'},
cond:{th:'รับรองแบบมีเงื่อนไข',period:'ไม่เกิน 3 ปี',cond:'คณะผู้ตรวจประเมินฯ ชุดเดิม หรือผู้ตรวจประเมิน 1 คน หรือคณะผู้ตรวจประเมินฯ ชุดใหม่ ประเมินผลการปรับปรุง',find:'มีข้อด้อยในเกณฑ์การรับรองตั้งแต่ 1 เกณฑ์ขึ้นไป ให้ปรับปรุงแก้ไข',oblig:'การปรับปรุงตามข้อเสนอแนะและที่ระบุในเงื่อนไขการรับรอง',follow:'คณะผู้ตรวจประเมินฯ ตามเงื่อนไขประเมินผลการปรับปรุง รายงานผลการประเมินและเสนอให้คณะอนุกรรมการฯ พิจารณาผล',expect:'เมื่อปรับปรุงแก้ไขข้อด้อยแล้ว คณะอนุกรรมการฯ ทบทวนแก้ไขให้รับรองต่อไปจนครบ 6 ปี'},
prov:{th:'รับรองชั่วคราว',period:'ไม่เกิน 3 ปี',cond:'ไม่มี',find:'เป็นหลักสูตรใหม่และยังไม่มีผู้สำเร็จการศึกษา และมีแนวโน้มการดำเนินการตามเกณฑ์การรับรอง',oblig:'ไม่มี',follow:'ไม่มี',expect:'หลักสูตรเตรียมรายงานประเมินตนเองและสมัครขอรับการรับรองเมื่อมีผู้สำเร็จการศึกษาแล้ว 2 รุ่น'},
wait:{th:'รอผลการปรับปรุงแก้ไข',period:'1 ปี',cond:'ไม่มี',find:'มีข้อด้อยให้ปรับปรุงแก้ไขในเกณฑ์การรับรองมากกว่า 1 เกณฑ์',oblig:'ปรับปรุงรายงานประเมินตนเองและเตรียมเอกสารประกอบเพื่อปรับปรุงแก้ไขข้อด้อยต่าง ๆ',follow:'คณะผู้ตรวจประเมินฯ ชุดเดิม ตรวจติดตามและเยี่ยมสถาบันการศึกษาซ้ำ',expect:'พิจารณาไม่รับรอง หรือ ให้การรับรองแบบมีเงื่อนไข'},
no:{th:'ไม่รับรอง หรือ ยกเลิกการรับรอง',period:'ต้องใช้เวลาปรับปรุงไม่น้อยกว่า 2 ปี จึงจะสมัครขอรับการรับรองใหม่',cond:'ไม่มี',find:'ไม่มีการประเมินผลลัพธ์การศึกษาและไม่มีเอกสารรายวิชาให้ตรวจสอบผลลัพธ์การศึกษาของนิสิตนักศึกษา',oblig:'ไม่มี',follow:'ไม่มี',expect:'ไม่มี'}};
const SCHED=[['1','09:45–10:30','ผู้บริหารหลักสูตร และ/หรือ คณาจารย์ผู้รับผิดชอบหลักสูตร',''],['1','13:15–14:45','สัมภาษณ์อาจารย์ผู้สอน 3 คน','อาจารย์ผู้รับผิดชอบรายวิชาที่คณะผู้ตรวจประเมินฯ ระบุ'],['1','14:45–15:00','สัมภาษณ์ศิษย์เก่า 3 คน (online)','สำเร็จการศึกษาแล้ว 5–10 ปี จากภาคอุตสาหกรรมขนาดใหญ่ กลาง และเล็ก อย่างละ 1 คน'],['1','15:00–15:15','สัมภาษณ์ผู้ใช้บัณฑิต 3 คน (online)','จากภาคอุตสาหกรรมขนาดใหญ่ กลาง และเล็ก อย่างละ 1 คน (ไม่ใช่ IAB และไม่ใช่ศิษย์เก่าที่เข้าสัมภาษณ์)'],['1','15:15–15:45','สัมภาษณ์บัณฑิต 6 คน (online)','ศึกษาต่อ 1 คน ทำงานตรงสาขา 1 คน ทำงานไม่ตรงสาขา 1 คน กำลังหางาน 1 คน สำเร็จการศึกษาภายใน 4 ปี 1 คน สำเร็จการศึกษาเกิน 4 ปี 1 คน'],['1','15:45–16:05','สัมภาษณ์นิสิตนักศึกษาชั้นปีที่ 1 จำนวน 6 คน*','เกรดเฉลี่ยต่ำกว่า 2.0 จำนวน 2 คน ระหว่าง 2.0–3.0 จำนวน 2 คน และ 3.0 ขึ้นไป จำนวน 2 คน'],['1','16:05–16:25','สัมภาษณ์นิสิตนักศึกษาชั้นปีที่ 2 จำนวน 6 คน','เกรดเฉลี่ยต่ำกว่า 2.0 จำนวน 2 คน ระหว่าง 2.0–3.0 จำนวน 2 คน และ 3.0 ขึ้นไป จำนวน 2 คน'],['1','16:25–16:45','สัมภาษณ์นิสิตนักศึกษาชั้นปีที่ 3 จำนวน 6 คน','เกรดเฉลี่ยต่ำกว่า 2.0 จำนวน 2 คน ระหว่าง 2.0–3.0 จำนวน 2 คน และ 3.0 ขึ้นไป จำนวน 2 คน'],['1','16:45–17:05','สัมภาษณ์นิสิตนักศึกษาชั้นปีที่ 4 จำนวน 6 คน','เกรดเฉลี่ยต่ำกว่า 2.0 จำนวน 2 คน ระหว่าง 2.0–3.0 จำนวน 1 คน 3.0 ขึ้นไป 1 คน นักศึกษาที่ไปสหกิจ 1 คน และไม่ไปสหกิจ 1 คน'],['2','09:00–10:00','ผู้บริหารสถาบัน','อธิการบดีหรือรองอธิการบดีฝ่ายวิชาการ/ประกันคุณภาพ คณบดี รองคณบดีฝ่ายวิชาการ รองคณบดีฝ่ายบริหาร'],['2','10:00–10:15','สัมภาษณ์เจ้าหน้าที่ (สายธุรการ) 1 คน','เจ้าหน้าที่ที่ดูแลกิจกรรมการเรียนการสอนของหลักสูตรระดับปริญญาบัณฑิต'],['2','10:15–10:45','สัมภาษณ์ครูปฏิบัติการ 2 คน','ครูปฏิบัติการของห้องปฏิบัติการ 1 คน และผู้ช่วยสอนวิชาบรรยาย 1 คน'],['2','10:45–12:00','ผู้รับผิดชอบวิชา Capstone Design Project นำเสนอโครงงานตามรูปแบบที่ TABEE กำหนด และตอบคำถาม','ระบุชื่ออาจารย์และหัวข้อโครงงานที่คณะผู้ตรวจประเมินฯ เลือก'],['2','14:00–15:00','หัวหน้าภาควิชา และผู้บริหารหลักสูตร ประชุมชี้แจงข้อเท็จจริงที่พบ','']];
const CAPSTONE=['นำเสนอโครงงานที่คณะผู้ตรวจประเมินฯ แจ้งมา โครงงานละ 20 นาที','2.1 อธิบายกระบวนการการได้มาของหัวข้อโครงงาน','2.2 อธิบายการตรวจสอบว่าโครงงานนี้เป็นโครงงานที่แก้ไขปัญหาวิศวกรรมที่ซับซ้อน โดยยืนยันด้วยตารางนิยามปัญหาวิศวกรรมที่ซับซ้อน','2.3 ระบุตัวชี้วัดของผลลัพธ์การศึกษาที่ใช้โครงงานดังกล่าวในการประเมินผล (เช่น PI 2.3 ของ PO2, PI 3.1 ของ PO3)','2.4 อธิบายขั้นตอนการดำเนินการของโครงงานที่เกี่ยวข้องกับการออกแบบ และการพิจารณาเรื่อง Soft Skill และ Sustainability ตามเงื่อนไขของ Integrated Design Project ตามข้อกำหนดของ Washington Accord','2.5 อธิบายเนื้อหาของโครงงานโดยย่อ','2.6 แสดงรายละเอียดของ Rubric ทั้งหมดที่ใช้ในการประเมินตัวชี้วัดของผลลัพธ์การศึกษาที่โครงงานรับผิดชอบ','2.7 แสดงผลการประเมินความสามารถจริงของกลุ่มนักศึกษาที่ได้จากการประเมินผลจาก Rubric (ตามรูปแบบตารางแสดงคะแนนการวัดผลโครงงาน)','2.8 สรุปผลสัมฤทธิ์ที่ได้จากโครงงาน'];
const COMPLEX=['เกี่ยวพันกับการใช้เทคโนโลยีและวิศวกรรมที่หลากหลาย หรือมีปัญหาความไม่สอดคล้องทางเทคโนโลยีและวิศวกรรมและประเด็นในการพิจารณาอื่น','ไม่มีผลลัพธ์การแก้ไขปัญหาที่ชัดเจน และต้องการการวิเคราะห์เพื่อหาแบบจำลองของผลลัพธ์ที่เหมาะสม','ต้องใช้ความรู้จากงานวิจัยพัฒนาทางวิศวกรรมเฉพาะสาขาในระดับแนวหน้า และเริ่มจากการวิเคราะห์ด้วยความรู้พื้นฐานทางวิศวกรรม','เป็นประเด็นปัญหาที่ไม่ได้คาดคิดมาก่อน','เป็นปัญหาที่ไม่มีมาตรฐานการปฏิบัติวิชาชีพวิศวกรรมกำกับการทำงาน','เป็นประเด็นปัญหาความขัดแย้งจากความต้องการของผู้มีส่วนได้ส่วนเสียที่หลากหลาย มีผลกระทบสำคัญในวงกว้าง','เป็นปัญหาระดับสูงที่มีองค์ประกอบหลากหลายของงานและปัญหาในระดับรอง'];
const QBANK=[[1,'อาจารย์ผู้สอน','อาจารย์จัดเวลาให้คำปรึกษาผู้เรียนสัปดาห์ละกี่ชั่วโมง และบันทึกติดตามความก้าวหน้าของผู้เรียนตามผลลัพธ์การศึกษาอย่างไร'],[1,'อาจารย์ผู้สอน','เมื่อผู้เรียนมีผลการวัดผลลัพธ์การเรียนรู้ต่ำกว่าเกณฑ์ที่คาดหวัง อาจารย์ให้คำแนะนำและติดตามอย่างไร'],[1,'อาจารย์ผู้สอน','อาจารย์สังเกตได้อย่างไรว่าผู้เรียนมีปัญหาการเรียนหรือการใช้ชีวิตในมหาวิทยาลัย และเมื่อพบแล้วดำเนินการอย่างไร'],[1,'นักศึกษาปี 4','นักศึกษาทราบเป้าหมายผลลัพธ์การเรียนรู้ของหลักสูตร (PO) หรือไม่ และได้รับข้อมูลนี้จากช่องทางใด'],[1,'นักศึกษาปี 4','นักศึกษาวางแผนและเตรียมการทำโครงงาน Capstone Design Project ล่วงหน้าอย่างไร'],[1,'บัณฑิต','ระหว่างเรียน อาจารย์ที่ปรึกษาหรืออาจารย์ผู้สอนแนะนำการพัฒนาความสามารถของท่านอย่างไร และท่านมั่นใจในความสามารถด้านวิชาชีพเมื่อสำเร็จการศึกษาเพียงใด'],[2,'ที่ปรึกษาภาคอุตสาหกรรม (IAC)','ท่านทราบวัตถุประสงค์และเป้าหมายความสำเร็จของหลักสูตรหรือไม่ และมีความเห็นต่อวัตถุประสงค์นั้นอย่างไร'],[2,'ที่ปรึกษาภาคอุตสาหกรรม (IAC)','ท่านมีส่วนให้คำแนะนำแก่หลักสูตรหรือผู้เรียนอย่างไร เมื่อใด และหลักสูตรแจ้งผลการประเมินผลลัพธ์การศึกษาให้ท่านทราบอย่างไร'],[2,'ผู้ใช้บัณฑิต','หลักสูตรปรับปรุงให้บัณฑิตมีความสามารถประกอบวิชาชีพตามความต้องการของท่านอย่างไร และท่านเคยตอบแบบสอบถามของหลักสูตรแล้วได้รับรายงานผลกลับหรือไม่'],[2,'ศิษย์เก่า','ท่านมีโอกาสเสนอความเห็นเพื่อปรับปรุงการเรียนการสอนของหลักสูตรหรือไม่ ในโอกาสใด'],[3,'ผู้บริหารหลักสูตร','หลักสูตรกำหนดตัวชี้วัดความสามารถ (PI) ให้สอดคล้องกับผลลัพธ์การศึกษาและแบบความรู้ (TK) ของ TABEE อย่างไร'],[3,'อาจารย์ผู้สอน','ท่านปรับปรุงการสอนและการประเมินผลลัพธ์การเรียนรู้ในรายวิชาให้สอดคล้องกับตัวชี้วัดความสามารถอย่างไร'],[3,'ผู้รับผิดชอบ Capstone','โปรดอธิบายตัวชี้วัดความสามารถและระดับความสำเร็จของผู้เรียนตามเกณฑ์ Rubric ของ Capstone Design Project'],[4,'ผู้บริหารหลักสูตร','หลักสูตรมีแผนการพัฒนาต่อเนื่องอย่างไร และอาจารย์ในหลักสูตรมีโอกาสแสดงความเห็นต่อแผนนี้อย่างไร'],[4,'อาจารย์ผู้สอน','ผลประเมิน PO ที่รายงานใน มคอ.5 ถูกนำมาหารือในที่ประชุมหลักสูตรอย่างไร และนำไปสู่การปรับปรุงรายวิชาของท่านอย่างไร'],[4,'ผู้บริหารสถาบัน','มหาวิทยาลัยได้รับรายงานแผนการพัฒนาต่อเนื่องของหลักสูตร และสนับสนุนหลักสูตรอย่างไร'],[5,'ผู้บริหารหลักสูตร','หลักสูตรเตรียมความพร้อมและสนับสนุนผู้เรียนในการทำ Capstone Design Project ที่แก้ไขปัญหาทางวิศวกรรมที่ซับซ้อนอย่างไร'],[5,'ผู้รับผิดชอบ Capstone','หลักสูตรเชื่อมโยง Capstone Design Project กับสหกิจศึกษาอย่างไร และประเมิน PO เดียวกันของนักศึกษาที่ไปและไม่ไปสหกิจอย่างไร'],[5,'อาจารย์ผู้สอน','อาจารย์ประชุมร่วมกันเพื่อปรับปรุงเนื้อหา การบ้าน และข้อสอบที่ใช้ประเมินผลลัพธ์การเรียนรู้หรือไม่ และบันทึกไว้ใน Course Portfolio อย่างไร'],[6,'ผู้บริหารสถาบัน','มหาวิทยาลัยหรือคณะสนับสนุนการพัฒนาวิชาชีพและการเพิ่มขีดความสามารถของอาจารย์อย่างไร'],[6,'ผู้บริหารสถาบัน','มีระบบจัดการอย่างไรกับอาจารย์ที่ไม่สามารถพัฒนาการเรียนการสอนตามเป้าหมายและตัวชี้วัดที่กำหนด'],[7,'ผู้บริหารสถาบัน','คณะมีระบบประเมินความเพียงพอและคุณภาพการให้บริการสิ่งอำนวยความสะดวกแก่ผู้เรียนและอาจารย์อย่างไร'],[7,'นักศึกษาปี 3','นักศึกษาพอใจในคุณภาพและความเพียงพอของห้องปฏิบัติการ ห้องสมุด และระบบสารสนเทศหรือไม่ มีข้อเสนอให้ปรับปรุงอย่างไร'],[7,'ครูปฏิบัติการ','การอบรมความปลอดภัยและการซ่อมบำรุงเครื่องมือในห้องปฏิบัติการดำเนินการอย่างไร'],[8,'ผู้บริหารสถาบัน','การสนับสนุนด้านบุคลากรและงบประมาณเป็นผลมาจากการประเมินความสำเร็จของผู้เรียนต่อผลลัพธ์การศึกษาหรือไม่ อย่างไร'],[8,'ผู้บริหารสถาบัน','มหาวิทยาลัยหรือคณะมีระบบบริหารและรายงานผลการพัฒนาคุณภาพการศึกษาแบบ Outcome-based Education จากหลักสูตรต่าง ๆ อย่างไร'],[8,'นักศึกษาปี 2','นักศึกษาได้รับการสนับสนุนด้านทุนการศึกษาหรือความช่วยเหลือเร่งด่วนจากมหาวิทยาลัยเพียงพอหรือไม่']];

/* ---------- state + store ---------- */
const S={pid:null,programs:null,meta:{},parts:{},who:'chair',view:'home',crit:1,filter:'all',cmp:false,busy:'',saving:0,canWrite:true,sync:'…',texts:{},qmode:'crit'};
const DEF={files:()=>({list:[]}),req:()=>({rows:{}}),plan:()=>({items:[]}),appt:()=>({rows:SCHED.map(r=>({id:uid(),day:r[0],time:r[1],group:r[2],detail:r[3]})),docs:[]}),qs:()=>({list:[]}),fact:()=>({}),dec:()=>({}),report:()=>({tbl:{}}),notify:()=>({}),log:()=>({e:[]})};
function P(k){if(!S.parts[k])S.parts[k]=/^c\d$/.test(k)?{items:{}}:(DEF[k]?DEF[k]():{});if(/^c\d$/.test(k)&&!S.parts[k].items)S.parts[k].items={};return S.parts[k]}
const peek=(c,id)=>S.parts['c'+c]?.items?.[id];
const IT=(c,id)=>P('c'+c).items[id]||(P('c'+c).items[id]={});
function setSaving(){const n=Object.keys(Store.dirty).length+Object.values(Store.writing).filter(Boolean).length;const e=$('#savest');if(e)e.textContent=n?t('กำลังบันทึก…','Saving…'):(S.pid?t('บันทึกแล้ว','Saved'):'')}
function log(msg){const l=P('log');l.e.unshift({t:Date.now(),by:whoName(S.who),m:msg});l.e=l.e.slice(0,200);Store.save('log')}

/* ---------- team + ratings ---------- */
function members(){const m=S.meta;const a=[['chair',t('ประธานคณะผู้ตรวจประเมินฯ','Team leader'),m.chair],['pev1',t('ผู้ตรวจประเมินฯ 1','Evaluator 1'),m.pev1],['pev2',t('ผู้ตรวจประเมินฯ 2','Evaluator 2'),m.pev2],['coord',t('อนุกรรมการประสานงานฯ','TABEE coordinator'),m.coord]].filter(x=>x[2]).map(x=>({id:x[0],role:x[1],name:x[2]}));
  return a.length?a:[{id:'chair',role:t('ประธานคณะผู้ตรวจประเมินฯ','Team leader'),name:t('(ยังไม่ระบุชื่อ)','(name not set)')}]}
const whoName=id=>members().find(m=>m.id===id)?.name||id;
const evList=st=>Object.entries(st?.ev||{}).filter(([,v])=>v&&(v.r||v.n));
function autoR(st){let b='';for(const[,v]of evList(st)){if(!v.r)continue;if(!b||RT[v.r].sev>RT[b].sev)b=v.r}return b}
function sumR(c,id,stage){const it=peek(c,id);if(!it)return'';if(stage==='ai')return it.ai?.r||'';const st=it[stage];return st?(st.sr||autoR(st)):''}
function sumN(c,id,stage){const it=peek(c,id);if(!it)return'';if(stage==='ai')return it.ai?.n||'';const st=it[stage];if(!st)return'';if(st.sn)return st.sn;const e=evList(st).filter(([,v])=>v.n);return e.length===1?e[0][1].n:e.map(([k,v])=>whoName(k)+': '+v.n).join('\n')}
const chip=(r,lg)=>`<span class="chip ${lg?'lg ':''}r-${r||'0'}" title="${r?esc(t(RT[r].th,RT[r].en)):t('ยังไม่ประเมิน','Not rated')}">${r?RT[r].ch:'–'}</span>`;
function critStat(c,stage){const its=ALL.filter(x=>x.c===c);let rated=0,worst='';const cnt={};for(const x of its){const r=sumR(c,x.it.id,stage);if(r){rated++;cnt[r]=(cnt[r]||0)+1;if(!worst||RT[r].sev>RT[worst].sev)worst=r}}return{n:its.length,rated,worst,cnt}}
function stageStat(stage){let n=0,rated=0;const cnt={};for(let c=1;c<=8;c++){const s=critStat(c,stage);n+=s.n;rated+=s.rated;for(const k in s.cnt)cnt[k]=(cnt[k]||0)+s.cnt[k]}return{n,rated,cnt}}
const critName=c=>{const x=CHECKLIST[c-1];return t('เกณฑ์ข้อ '+c+' '+x.th,'Criterion '+c+' '+x.en)};
const progTitle=()=>[S.meta.prog,S.meta.field&&('สาขาวิชา'+S.meta.field)].filter(Boolean).join(' ')||t('(ยังไม่ระบุหลักสูตร)','(program not set)');

/* ---------- documents text ---------- */
async function corpus(){const out=[];for(const f of P('files').list){const tx=await Store.getText(f);if(tx)out.push({f,tx})}return out}

/* ---------- storage + downloads: standalone build (GitHub Pages / local) ----------
   Everything is kept in this browser's IndexedDB. Nothing is sent to any server. */
const KV={db:null,
  open(){return this.db||(this.db=new Promise((res,rej)=>{const r=indexedDB.open('pev-studio',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}))},
  async tx(mode,fn){const db=await this.open();return new Promise((res,rej)=>{const x=db.transaction('kv',mode),st=x.objectStore('kv');const out=fn(st);x.oncomplete=()=>res(out&&'result' in out?out.result:undefined);x.onerror=()=>rej(x.error);x.onabort=()=>rej(x.error)})},
  get(k){return this.tx('readonly',s=>s.get(k))},set(k,v){return this.tx('readwrite',s=>{s.put(v,k)})},del(k){return this.tx('readwrite',s=>{s.delete(k)})}};
const Store={dirty:{},timers:{},writing:{},
  async init(){S.sync=t('เก็บในเบราว์เซอร์นี้เท่านั้น','Stored in this browser only');try{await KV.open()}catch(e){S.sync=t('เบราว์เซอร์นี้เก็บข้อมูลไม่ได้','This browser cannot store data');toast(S.sync)}},
  async keys(lo,hi){return this._k(lo,hi)},_k(lo,hi){return KV.tx('readonly',s=>s.getAllKeys(IDBKeyRange.bound(lo,hi)))},
  async list(){const ks=(await this._k('p/','p/\uffff')).filter(k=>/^p\/[^/]+\/meta$/.test(k));const out=[];for(const k of ks){const m=await KV.get(k);if(m)out.push({id:k.split('/')[1],...m})}return out.sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0))},
  async flushAll(){if(!S.pid)return;for(const k of Object.keys(this.dirty)){clearTimeout(this.timers[k]);await this.flush(k)}for(let i=0;i<40&&Object.values(this.writing).some(Boolean);i++)await new Promise(r=>setTimeout(r,50))},
  async open(pid){await this.flushAll();Object.values(this.timers).forEach(clearTimeout);this.dirty={};S.pid=pid;S.parts={};S.meta={};S.texts={};S.autoInfo=null;
    S.meta=await KV.get('p/'+pid+'/meta')||{};for(const key of await this._k('p/'+pid+'/','p/'+pid+'/\uffff')){const k=key.slice(('p/'+pid+'/').length);if(k==='meta'||k.startsWith('t/'))continue;S.parts[k]=await KV.get(key)||{}}
    try{localStorage.setItem('pev.last',pid)}catch(e){}},
  save(k){if(!S.pid)return;this.dirty[k]=1;clearTimeout(this.timers[k]);this.timers[k]=setTimeout(()=>this.flush(k),500);setSaving()},
  async flush(k){if(!S.pid){delete this.dirty[k];return}if(this.writing[k]){this.timers[k]=setTimeout(()=>this.flush(k),300);return}
    this.writing[k]=1;delete this.dirty[k];const pid=S.pid,data=clone(k==='meta'?S.meta:S.parts[k]);
    try{if(k==='meta')data.updatedAt=Date.now();await KV.set('p/'+pid+'/'+k,data);
      if(k!=='meta'&&!(await KV.get('p/'+pid+'/meta')))await KV.set('p/'+pid+'/meta',{...clone(S.meta),updatedAt:Date.now()})}
    catch(e){toast(t('บันทึกไม่สำเร็จ: ','Save failed: ')+(e?.message||e))}
    this.writing[k]=0;setSaving()},
  async putText(fid,text){S.texts[fid]=text;try{await KV.set('p/'+S.pid+'/t/'+fid,text);return 1}catch(e){return 0}},
  async getText(f){if(S.texts[f.id]!=null)return S.texts[f.id];let v='';try{v=await KV.get('p/'+S.pid+'/t/'+f.id)||''}catch(e){}return S.texts[f.id]=v},
  async delText(f){delete S.texts[f.id];if(typeof DOCCACHE!=='undefined')delete DOCCACHE[f.id];try{await KV.del('p/'+S.pid+'/t/'+f.id)}catch(e){}}
};
async function saveFile(filename,data){try{const blob=data instanceof Blob?data:new Blob([data]);const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename.replace(/[\\/:*?"<>|]/g,'_');document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),4000);log('ส่งออกไฟล์ '+filename);return true}
  catch(e){toast(t('บันทึกไฟล์ไม่สำเร็จ: ','Could not save: ')+(e.message||e));return false}}

/* ---------- shell ---------- */
const NAV=[['เตรียมการ','Setup',[['home','ภาพรวม','Overview'],['setup','หลักสูตรและคณะผู้ตรวจ','Program & team'],['files','เอกสารหลักสูตร (SER)','Program documents']]],
['ตรวจเอกสาร','Document review',[['ai','1 · Auto Check','1 · Auto Check'],['pv1','2 · Pre-visit 1','2 · Pre-visit 1'],['req','3 · ขอเอกสารเพิ่มเติม','3 · Document request'],['pv2','4 · Pre-visit 2','4 · Pre-visit 2']]],
['เตรียมตรวจเยี่ยม','Visit preparation',[['plan','5 · แผนตรวจเยี่ยม','5 · Visit plan'],['appt','6 · นัดตรวจเยี่ยมสถาบัน','6 · Visit appointment'],['qs','7 · ประเด็นและคำถาม','7 · Issues & questions']]],
['ตรวจเยี่ยม','Site visit',[['d1','8 · Visit Day 1','8 · Visit Day 1'],['d2','Visit Day 2','Visit Day 2'],['ex','Exit Statement','Exit Statement']]],
['รายงานและตัดสิน','Report & decision',[['fact','9 · Fact Finding Report','9 · Fact Finding Report'],['dec','10 · Decision Meeting','10 · Decision Meeting'],['report','11 · รายงานผลการตรวจรับรอง','11 · Accreditation report'],['notify','12 · แจ้งผลการรับรอง','12 · Result notification']]],
['เครื่องมือ','Tools',[['compare','เปรียบเทียบทุกรอบ','Compare rounds'],['tools','ส่งออก · สำรองข้อมูล','Export · backup']]]];
function status(v){if(SIDX[v]!=null){const s=stageStat(v);return{c:s.rated===0?'':s.rated>=s.n?'done':'part',b:s.rated?s.rated+'/'+s.n:''}}
  const has=x=>x?{c:'done',b:''}:{c:'',b:''};const p=S.parts;
  switch(v){case'setup':return has(S.meta.inst&&S.meta.chair);case'files':{const n=p.files?.list?.length||0;return{c:n?'done':'',b:n?String(n):''}}
    case'req':{const n=Object.values(p.req?.rows||{}).flat().filter(Boolean).length;return{c:n?'done':'',b:n?String(n):''}}
    case'plan':{const n=p.plan?.items?.length||0;return{c:n?'done':'',b:n?String(n):''}}case'appt':return has(p.appt?.date);
    case'qs':{const n=p.qs?.list?.length||0;return{c:n?'done':'',b:n?String(n):''}}
    case'fact':return has(Object.keys(p.fact||{}).length);case'dec':return has(p.dec?.result);case'report':return has(p.report?.date);case'notify':return has(p.notify?.tl?.sent)}
  return{c:'',b:''}}
function renderNav(){$('#nav').innerHTML=`<div class="brand">PEV Studio<small>TABEE · PROGRAM EVALUATION</small></div>`+NAV.map(g=>`<div class="navg"><span>${t(g[0],g[1])}</span>${g[2].map(i=>{const s=status(i[0]);return`<button class="navi ${S.view===i[0]?'on':''}" data-a="go" data-v="${i[0]}"><i class="${s.c}"></i>${t(i[1],i[2])}<b>${s.b}</b></button>`}).join('')}</div>`).join('')}
function renderTop(){const ms=members();if(!ms.find(m=>m.id===S.who))S.who=ms[0].id;
  $('#top').innerHTML=`<div class="grow"><div class="pname">${esc(progTitle())}<small>${esc(S.meta.inst||'')}${S.meta.visit?' · '+esc(S.meta.visit):''}</small></div></div>
  <label class="row small muted" style="gap:6px">${t('ผู้ประเมิน','Evaluator')}<select id="whoSel" data-c="who" style="width:auto;max-width:210px">${ms.map(m=>`<option value="${m.id}" ${m.id===S.who?'selected':''}>${esc(m.name)}</option>`).join('')}</select></label>
  <span class="tiny muted" id="savest"></span><span class="tiny muted" title="${esc(S.sync)}">${S.canWrite?'':t('อ่านอย่างเดียว · ','Read-only · ')}${esc(S.sync)}</span>
  <button class="btn sm" data-a="lang">${LANG==='th'?'EN':'ไทย'}</button><button class="btn sm" data-a="switch">${t('เปลี่ยนหลักสูตร','Switch program')}</button>`;setSaving()}
let pendingRender=false;
function render(keep){if(!S.pid){renderLanding();return}renderNav();renderTop();const el=$('#view'),sc=el.scrollTop;el.innerHTML='<div class="wrap">'+(VIEWS[S.view]||VIEWS.home)()+'</div>';el.scrollTop=keep?sc:0;pendingRender=false}
function softRender(){const a=document.activeElement;if(a&&$('#view').contains(a)&&/TEXTAREA|INPUT|SELECT/.test(a.tagName)){pendingRender=true;return}render(true)}
function renderLanding(){$('#nav').innerHTML=`<div class="brand">PEV Studio<small>TABEE · PROGRAM EVALUATION</small></div>`;$('#top').innerHTML=`<div class="grow"><div class="pname">PEV Studio</div></div><span class="tiny muted">${esc(S.sync)}</span><button class="btn sm" data-a="lang">${LANG==='th'?'EN':'ไทย'}</button>`;
  const ps=S.programs;$('#view').innerHTML=`<div class="wrap" style="max-width:820px">
  <div class="col"><h1>${t('งานตรวจประเมินหลักสูตรตาม PEV Worksheet','Program evaluation on the PEV Worksheet')}</h1><p class="muted" style="margin:0;max-width:65ch">${t('ติดตามการตรวจหนึ่งหลักสูตรตั้งแต่ Auto Check, Pre-visit, ตรวจเยี่ยม จนถึงรายงานผลการรับรอง ตามรายการตรวจ 8 เกณฑ์ 79 ข้อของ TABEE','Follow one program from Auto Check and pre-visits through the site visit to the accreditation report, on TABEE\'s 8 criteria and 79 checklist items.')}</p></div>
  <div class="card col"><h2>${t('หลักสูตรที่กำลังตรวจ','Programs under evaluation')}</h2>${ps===null?`<p class="muted"><span class="spin"></span> ${t('กำลังโหลด…','Loading…')}</p>`:ps.length?ps.map(p=>`<button class="btn" style="justify-content:space-between;padding:10px 14px;white-space:normal;text-align:left" data-a="open" data-id="${p.id}"><span><b>${esc([p.prog,p.field&&'สาขาวิชา'+p.field].filter(Boolean).join(' ')||'(ไม่มีชื่อ)')}</b><br><span class="small muted">${esc(p.inst||'')}${p.visit?' · '+esc(p.visit):''}</span></span><span>→</span></button>`).join(''):`<p class="muted" style="margin:0">${t('ยังไม่มีหลักสูตรในระบบ สร้างรายการแรกด้านล่าง','No program yet. Create the first one below.')}</p>`}</div>
  <div class="card col"><h2>${t('เริ่มตรวจหลักสูตรใหม่','Start a new evaluation')}</h2><div class="grid2">
   <label class="f">${t('ชื่อสถาบันการศึกษา','Institution')}<input type="text" id="n_inst"></label><label class="f">${t('ชื่อหลักสูตร','Program')}<input type="text" id="n_prog" value="หลักสูตรวิศวกรรมศาสตรบัณฑิต"></label><label class="f">${t('สาขาวิชา','Field')}<input type="text" id="n_field"></label></div>
   <div class="row"><button class="btn pri" data-a="create" ${S.canWrite?'':'disabled'}>${t('สร้างรายการตรวจประเมิน','Create evaluation')}</button><button class="btn" data-a="demo" ${S.canWrite?'':'disabled'}>${t('ลองด้วยข้อมูลตัวอย่าง (สมมติ)','Try with fictional sample data')}</button></div></div></div>`}

/* ---------- small builders ---------- */
const inp=(k,p,label,type='text',ph='')=>`<label class="f">${label}<input type="${type}" id="f_${(k+p).replace(/\W/g,'_')}" data-b="${k}:${p}" value="${esc(getPath(k==='meta'?S.meta:P(k),p)??'')}" placeholder="${esc(ph)}"></label>`;
const txa=(k,p,label,ph='',rows=3)=>`<label class="f">${label}<textarea id="f_${(k+p).replace(/\W/g,'_')}" rows="${rows}" data-b="${k}:${p}" placeholder="${esc(ph)}">${esc(getPath(k==='meta'?S.meta:P(k),p)??'')}</textarea></label>`;
const legend=()=>`<div class="legend">${['N','R','C','W','D','S'].map(r=>`<span>${chip(r)} ${t(RT[r].th,RT[r].en)}</span>`).join('')}</div>`;
function listEd(k,p,ph){const arr=getPath(P(k),p)||[];return`<div class="col" style="gap:6px">${arr.map((v,i)=>`<div class="li"><textarea rows="2" id="l_${k}_${p.replace(/\W/g,'_')}_${i}" data-b="${k}:${p}.${i}" placeholder="${esc(ph)}">${esc(v)}</textarea><button class="btn sm ghost" title="${t('ลบ','Delete')}" data-a="ldel" data-k="${k}" data-p="${p}" data-i="${i}">✕</button></div>`).join('')}<div><button class="btn sm" data-a="ladd" data-k="${k}" data-p="${p}">+ ${t('เพิ่มรายการ','Add row')}</button></div></div>`}
const docPane=(name)=>`<div class="card col"><div class="row"><h2>${t('ตัวอย่างเอกสาร','Document preview')}</h2><span class="sp"></span><button class="btn" data-a="copydoc" data-d="${name}">${t('คัดลอกข้อความ','Copy text')}</button><button class="btn pri" data-a="docx" data-d="${name}">${t('ดาวน์โหลด Word (.docx)','Download Word (.docx)')}</button></div><div class="scroll"><div class="doc">${blocksHTML(DOCS[name]().blocks)}</div></div></div>`;
const busyNote=()=>S.busy?`<div class="note info"><span class="spin"></span> ${esc(S.busy)}</div>`:'';

/* ---------- evaluation views ---------- */
function critTabs(stage){return`<div class="tabs">${CHECKLIST.map(c=>{const s=stage?critStat(c.n,stage):null;return`<button class="tab ${S.crit===c.n?'on':''}" data-a="crit" data-c="${c.n}"><b>${c.n} · ${esc(t(c.th,c.en))}</b>${s?`<span>${chip(s.worst)} ${s.rated}/${s.n}</span><span class="bar"><i style="width:${Math.round(100*s.rated/s.n)}%"></i></span>`:''}</button>`}).join('')}</div>`}
function aiBlock(a){return`<div class="col" style="gap:4px;border-top:1px dashed var(--line);padding-top:8px"><div style="white-space:pre-wrap">${esc(a.n)}</div>${a.ev?`<div class="small muted">${t('อ้างอิง','Evidence')}: ${esc(a.ev)}</div>`:''}${a.req?`<div class="small"><b>${t('ควรขอเพิ่ม','Request')}:</b> ${esc(a.req)}</div>`:''}${a.q?`<div class="small"><b>${t('คำถามตอนตรวจเยี่ยม','Visit question')}:</b> ${esc(a.q)}</div>`:''}<div class="tiny muted">${a.algo?t('อัลกอริทึม','Algorithm'):'Claude'} · ${fmtDT(a.t)}</div></div>`}
function rbtn(a,c,id,stage,cur,withS,extra=''){return`<div class="rb">${['N','R','C','W','D'].concat(withS?['S']:[]).map(r=>`<button class="r-${r} ${cur===r?'on':''}" title="${esc(t(RT[r].th,RT[r].en))}" data-a="${a}" data-c="${c}" data-id="${id}" data-st="${stage}" data-r="${r}" ${S.canWrite?'':'disabled'}>${RT[r].ch}</button>`).join('')}${extra}</div>`}
function itemCard(c,it,stage){const d=peek(c,it.id)||{},cur=sumR(c,it.id,stage);
  let h=`<div class="item s-${cur||'0'}"><div class="q"><span class="code">${it.code}</span><p>${esc(it.t)}</p>${chip(cur,1)}</div>`;
  const pri=STAGES.slice(0,SIDX[stage]).map(s=>{const r=sumR(c,it.id,s.k);if(!r)return'';const n=sumN(c,it.id,s.k),a=s.k==='ai'?d.ai:null;const more=a?[a.ev&&t('อ้างอิง: ','Evidence: ')+a.ev,a.req&&t('ควรขอเพิ่ม: ','Request: ')+a.req,a.q&&t('คำถาม: ','Question: ')+a.q].filter(Boolean).join('\n'):'';return`<details><summary>${chip(r)} ${s.sh}${(n||more)?' ▾':''}</summary><div class="pb">${esc([n,more].filter(Boolean).join('\n'))}</div></details>`}).join('');
  if(pri)h+=`<div class="prior">${pri}</div>`;
  if(stage==='ai'){h+=d.ai?aiBlock(d.ai):`<div class="small muted">${t('ยังไม่มีผล Auto Check','No Auto Check result yet')}</div>`;return h+'</div>'}
  const st=d[stage]||{ev:{}},ms=members(),ids=ms.map(m=>m.id).filter(id=>id===S.who||(st.ev?.[id]&&(st.ev[id].r||st.ev[id].n)));
  for(const id of ids){const m=ms.find(x=>x.id===id),e=st.ev?.[id]||{};
    if(id===S.who&&S.canWrite)h+=`<div class="ev"><div class="who">${esc(m.name)}<small>${esc(m.role)}${e.t?' · '+fmtDT(e.t):''}</small></div>${rbtn('rate',c,it.id,stage,e.r,stage!=='pv1')}<textarea id="n_${it.id}_${stage}" data-b="c${c}:items.${it.id}.${stage}.ev.${id}.n" data-ts="1" placeholder="${t('หมายเหตุ / ข้อคิดเห็น','Notes / comments')}">${esc(e.n||'')}</textarea></div>`;
    else h+=`<div class="ev"><div class="who">${esc(m.name)}<small>${esc(m.role)}${e.t?' · '+fmtDT(e.t):''}</small></div><div>${chip(e.r,1)}</div><div class="ro">${esc(e.n||'')}</div></div>`}
  if(evList(st).length>=2)h+=`<div class="sum"><div class="who">${t('สรุปของทีม','Team summary')}<br><button class="btn sm" style="margin-top:4px" data-a="mergeSum" data-c="${c}" data-id="${it.id}" data-st="${stage}">${t('รวมความเห็น','Merge notes')}</button></div><div>${rbtn('rateSum',c,it.id,stage,st.sr||autoR(st),stage!=='pv1')}<div class="tiny muted" style="margin-top:3px">${st.sr?t('ทีมกำหนดเอง','Set by team'):t('อัตโนมัติ: ผลที่หนักที่สุด','Auto: most severe')}</div></div><textarea id="s_${it.id}_${stage}" data-b="c${c}:items.${it.id}.${stage}.sn" placeholder="${t('สรุปความคิดเห็นของทีม','Team summary comment')}">${esc(st.sn||'')}</textarea></div>`;
  return h+'</div>'}
function passFilter(c,id,stage){const r=sumR(c,id,stage);if(S.filter==='issues')return r&&RT[r].sev>0;if(S.filter==='todo')return!r;if(S.filter==='changed'){const prev=STAGES.slice(0,SIDX[stage]).reverse().map(s=>sumR(c,id,s.k)).find(Boolean);return r&&prev&&r!==prev}return true}
function compareTable(c,upto){const sts=STAGES.slice(0,SIDX[upto]+1);return`<div class="card scroll"><table class="t"><tr><th style="min-width:240px">${t('รายการตรวจ','Checklist item')}</th>${sts.map(s=>`<th style="min-width:150px">${t(s.th,s.en)}</th>`).join('')}</tr>${CHECKLIST[c-1].groups.map(g=>`<tr><th colspan="${sts.length+1}">${esc(g.h)}</th></tr>`+g.items.map(it=>`<tr><td><b>${it.code}</b> ${esc(it.t.length>150?it.t.slice(0,150)+'…':it.t)}</td>${sts.map(s=>{const r=sumR(c,it.id,s.k),n=sumN(c,it.id,s.k);return`<td>${chip(r)}<div class="small" style="white-space:pre-wrap;margin-top:3px">${esc(n)}</div></td>`}).join('')}</tr>`).join('')).join('')}</table></div>`}
function evalView(stage){const sd=STAGES[SIDX[stage]],c=S.crit,cr=CHECKLIST[c-1],ss=stageStat(stage),isAI=stage==='ai';
  const files=P('files').list,chars=files.reduce((a,f)=>a+(f.chars||0),0);
  let head=`<div class="card col"><div class="row"><h1>${t(sd.th,sd.en)}</h1><span class="sp"></span><span class="small muted">${t('ประเมินแล้ว','Rated')} ${ss.rated}/${ss.n} ${t('ข้อ','items')}</span></div>`;
  if(isAI)head+=autoHead(c);
  else head+=`<div class="grid2">${inp('meta','dates.'+stage+'.from',t('วันที่เริ่มประเมิน','Start date'),'date')}${inp('meta','dates.'+stage+'.to',t('วันที่สิ้นสุด','End date'),'date')}<div class="f small muted" style="display:flex;flex-direction:column;gap:3px">${t('กำลังลงผลในนาม','Recording as')}<b style="color:var(--ink);font-size:.98rem">${esc(whoName(S.who))}</b><span class="tiny">${t('เปลี่ยนผู้ประเมินได้ที่แถบด้านบน เวลาที่ลงผลบันทึกอัตโนมัติ','Change evaluator in the top bar; time is recorded automatically')}</span></div></div>`;
  head+=(isAI?'':legend())+'</div>';
  const fl=[['all',t('ทั้งหมด','All')],['issues',t('มีประเด็น','With issues')],['todo',t('ยังไม่ประเมิน','Not rated')]].concat(isAI?[]:[['changed',t('เปลี่ยนจากรอบก่อน','Changed')]]);
  const bar=`<div class="row">${fl.map(f=>`<button class="btn sm ${S.filter===f[0]?'pri':''}" data-a="filter" data-f="${f[0]}">${f[1]}</button>`).join('')}<span class="sp"></span>${isAI?'':`<button class="btn sm" data-a="copyPrev" data-st="${stage}" ${S.canWrite?'':'disabled'}>${t('ยืนยันตามรอบก่อน (ข้อที่ยังว่าง)','Carry over previous round (blank items)')}</button><button class="btn sm" data-a="bulkN" data-st="${stage}" ${S.canWrite?'':'disabled'}>${t('ข้อที่ยังว่าง = ไม่มีประเด็น','Blank items = no issue')}</button>`}<button class="btn sm ${S.cmp?'pri':''}" data-a="cmp">${t('ตารางเปรียบเทียบ','Comparison table')}</button></div>`;
  let body='';if(S.cmp)body=compareTable(c,stage);else{for(const g of cr.groups){const its=g.items.filter(it=>passFilter(c,it.id,stage));if(!its.length)continue;body+=`<div class="gh">${g.n}. ${esc(g.h)}</div>`+its.map(it=>itemCard(c,it,stage)).join('')}if(!body)body=`<p class="muted">${t('ไม่มีรายการตามตัวกรองนี้','No items match this filter')}</p>`}
  return head+critTabs(stage)+`<h2>${esc(critName(c))}</h2>`+(isAI&&typeof flagPanel==='function'?flagPanel(c):'')+bar+`<div class="col">${body}</div>`}

/* ---------- views ---------- */
const VIEWS={
home(){const m=S.meta,last=[...STAGES].reverse().find(s=>stageStat(s.k).rated)||STAGES[0],ls=stageStat(last.k);
  const nxt=NAV.flatMap(g=>g[2]).find(i=>!['home','compare','tools'].includes(i[0])&&status(i[0]).c!=='done');
  return`<div class="card col"><div class="row"><div class="col" style="gap:2px"><h1>${esc(progTitle())}</h1><span class="muted">${esc(m.inst||t('ยังไม่ระบุสถาบัน','Institution not set'))}</span></div><span class="sp"></span>${nxt?`<button class="btn pri" data-a="go" data-v="${nxt[0]}">${t('ขั้นถัดไป','Next step')}: ${t(nxt[1],nxt[2])} →</button>`:''}</div>
   <div class="kpi"><div><b>${P('files').list.length}</b><span>${t('ไฟล์เอกสารหลักสูตร','program files')}</span></div>${['R','C','W','D'].map(r=>`<div><b style="color:var(--r${r})">${ls.cnt[r]||0}</b><span>${t(RT[r].th,RT[r].en)} · ${last.sh}</span></div>`).join('')}<div><b>${ls.rated}/${ls.n}</b><span>${t('ข้อที่ประเมินแล้ว','items rated')} · ${last.sh}</span></div></div>
   <div class="small muted">${members().map(x=>esc(x.role)+': '+esc(x.name)).join(' · ')}${m.visit?' · '+t('ตรวจเยี่ยม ','Visit ')+esc(m.visit):''}</div></div>
  <div class="card col"><div class="row"><h2>${t('ผลตามเกณฑ์ในแต่ละรอบ','Results by criterion and round')}</h2><span class="sp"></span><span class="small muted">${t('ช่องแสดงผลที่หนักที่สุดของเกณฑ์ กดเพื่อเปิด','Each cell shows the most severe rating; click to open')}</span></div>
   <div class="scroll"><div class="heat"><div></div>${STAGES.map(s=>`<div class="hh">${s.sh}</div>`).join('')}${CHECKLIST.map(c=>`<div class="hl">${c.n}. ${esc(t(c.th,c.en))}</div>`+STAGES.map(s=>{const x=critStat(c.n,s.k);return`<button class="hc r-${x.worst||'0'}" data-a="cell" data-v="${s.k}" data-c="${c.n}">${x.worst?RT[x.worst].ch:'–'}<small>${x.rated}/${x.n}</small></button>`}).join('')).join('')}</div></div>${legend()}</div>
  <div class="card col"><h2>${t('ความเคลื่อนไหวล่าสุด','Recent activity')}</h2>${P('log').e.slice(0,6).map(e=>`<div class="small"><span class="muted">${fmtDT(e.t)} · ${esc(e.by)}</span> — ${esc(e.m)}</div>`).join('')||`<span class="muted small">${t('ยังไม่มีบันทึก','Nothing yet')}</span>`}</div>`},
setup(){return`<div class="card col"><h1>${t('ข้อมูลหลักสูตรและคณะผู้ตรวจประเมิน','Program and evaluation team')}</h1><p class="muted small" style="margin:0">${t('ตรงกับหน้า Cover ของ PEV Worksheet ชื่อในส่วนนี้ใช้เป็นรายชื่อผู้ประเมินและพิมพ์ลงเอกสารทุกฉบับ','Mirrors the Cover sheet of the PEV Worksheet. Names here become the evaluator list and are printed on every document.')}</p>
   <div class="grid2">${inp('meta','inst',t('ชื่อสถาบันการศึกษา','Institution'))}${inp('meta','campus',t('วิทยาเขต','Campus'))}${inp('meta','prog',t('ชื่อหลักสูตร','Program'))}${inp('meta','field',t('สาขาวิชา','Field'))}${inp('meta','cycle',t('วงรอบการรับรองฯ','Accreditation cycle'))}${inp('meta','visit',t('วันที่ตรวจเยี่ยมสถาบัน','Visit dates'),'text','22–23 ธันวาคม 2568')}</div></div>
  <div class="card col"><h2>${t('คณะผู้ตรวจประเมิน','Evaluation team')}</h2><div class="grid2">${inp('meta','chair',t('ประธานคณะผู้ตรวจประเมินฯ','Team leader'))}${inp('meta','pev1',t('ผู้ตรวจประเมินฯ 1','Evaluator 1'))}${inp('meta','pev2',t('ผู้ตรวจประเมินฯ 2','Evaluator 2'))}${inp('meta','coord',t('อนุกรรมการประสานงานฯ','TABEE coordinating subcommittee member'))}${inp('meta','observers',t('ผู้สังเกตการณ์','Observers'))}${inp('meta','staff',t('เจ้าหน้าที่ผู้ประสานงานสภาวิศวกร','Coordinating staff'))}</div></div>
  <div class="card col"><h2>${t('ช่วงเวลาของแต่ละรอบ','Round dates')}</h2><div class="scroll"><table class="t"><tr><th>${t('รอบ','Round')}</th><th>${t('เริ่ม','From')}</th><th>${t('สิ้นสุด','To')}</th></tr>${STAGES.slice(1).map(s=>`<tr><td>${t(s.th,s.en)}</td><td><input type="date" id="d_${s.k}_f" data-b="meta:dates.${s.k}.from" value="${esc(S.meta.dates?.[s.k]?.from||'')}"></td><td><input type="date" id="d_${s.k}_t" data-b="meta:dates.${s.k}.to" value="${esc(S.meta.dates?.[s.k]?.to||'')}"></td></tr>`).join('')}</table></div></div>`},
files(){const l=P('files').list;const kinds=['SER','เอกสารแนบ','ใบระเบียนผลการศึกษา','เอกสารเพิ่มเติม (หลัง Pre-visit 1)','เอกสารชี้แจงหลัง Fact Finding','อื่น ๆ'];
  return`<div class="card col"><h1>${t('เอกสารของหลักสูตร','Program documents')}</h1><p class="muted" style="margin:0;max-width:75ch">${t('อัปโหลดรายงานประเมินตนเอง (SER) และเอกสารแนบ ระบบดึงข้อความออกมาเก็บไว้ให้ Auto Check ใช้ รองรับ PDF, Word (.docx), Excel, PowerPoint, Markdown และข้อความ ไฟล์ PDF ที่เป็นภาพสแกนอ่านไม่ได้ ถ้าหลักสูตรส่งเอกสารเป็นลิงก์ออนไลน์ ใส่ลิงก์ได้ในช่องถัดไป','Upload the self-evaluation report and attachments. Text is extracted and kept for the Auto Check. PDF, Word (.docx), Excel, PowerPoint, Markdown and text are supported; scanned PDFs cannot be read. If the program sends online links, add them in the next box.')}</p>
   <label class="drop" id="drop"><input type="file" id="fileIn" multiple hidden accept=".pdf,.docx,.xlsx,.xls,.csv,.pptx,.md,.txt,.html,.json" ${S.canWrite?'':'disabled'}><b>${t('ลากไฟล์มาวาง หรือกดเพื่อเลือกไฟล์','Drop files here or click to choose')}</b><div class="small muted">PDF · DOCX · XLSX · PPTX · MD · TXT</div></label>${busyNote()}</div>${typeof lkForm==='function'?lkForm(kinds):''}
  <div class="card scroll"><table class="t"><tr><th>${t('ไฟล์หรือลิงก์','File or link')}</th><th style="width:230px">${t('ประเภท','Type')}</th><th>${t('ข้อความที่อ่านได้','Text read')}</th><th>${t('เพิ่มเมื่อ','Added')}</th><th></th></tr>${l.map((f,i)=>`<tr><td>${esc(f.name)}${typeof lkCell==='function'?lkCell(f):''}${f.warn?`<div class="tiny" style="color:var(--rC)">${esc(f.warn)}</div>`:''}</td><td><select id="fk_${i}" data-b="files:list.${i}.kind">${kinds.map(k=>`<option ${f.kind===k?'selected':''}>${k}</option>`).join('')}</select></td><td style="font-variant-numeric:tabular-nums">${f.url&&!f.chars&&typeof lkText==='function'?lkText(f,i):(f.chars||0).toLocaleString()+' '+t('ตัวอักษร','chars')+(f.url&&f.file?`<div class="tiny muted">${t('จากไฟล์ ','from ')}${esc(f.file)}</div>`:'')}</td><td class="small">${fmtDT(f.at)}<br><span class="muted">${esc(f.by||'')}</span></td><td><button class="btn sm ghost" data-a="fdel" data-i="${i}">✕</button></td></tr>`).join('')||`<tr><td colspan="5" class="muted">${t('ยังไม่มีไฟล์หรือลิงก์','No files or links yet')}</td></tr>`}</table></div>`},
ai:()=>evalView('ai'),pv1:()=>evalView('pv1'),pv2:()=>evalView('pv2'),d1:()=>evalView('d1'),d2:()=>evalView('d2'),ex:()=>evalView('ex'),
compare(){return`<div class="card col"><h1>${t('เปรียบเทียบผลทุกรอบ','Compare all rounds')}</h1><p class="muted small" style="margin:0">${t('Auto Check, Pre-visit 1, Pre-visit 2, Visit Day 1, Day 2 และ Exit Statement วางเทียบกันรายข้อ','All six rounds side by side for each item.')}</p>${legend()}</div>${critTabs('ex')}<h2>${esc(critName(S.crit))}</h2>${compareTable(S.crit,'ex')}`},
req(){const r=P('req');return`<div class="card col"><h1>${t('ขอคำอธิบายและเอกสารประกอบเพิ่มเติม','Request for explanations and additional documents')}</h1><p class="muted small" style="margin:0">${t('ตามแบบรายการขอรับคำอธิบายและเอกสารประกอบเพิ่มเติมจากสถาบันการศึกษา ออกหลัง Pre-visit 1','Follows the TABEE request form, issued after Pre-visit 1.')}</p>
   <div class="grid2">${inp('req','date',t('วันที่ออกเอกสาร','Issue date'),'date')}${inp('req','due',t('ขอให้ส่งภายในวันที่','Reply due'),'date')}</div>
   <div class="row"><button class="btn" data-a="reqPull" ${S.canWrite?'':'disabled'}>${t('ดึงรายการจาก Auto Check และ Pre-visit 1','Pull from Auto Check and Pre-visit 1')}</button></div>${busyNote()}</div>
  ${CHECKLIST.map(c=>`<div class="card col"><h3>${esc(critName(c.n))}</h3>${listEd('req','rows.c'+c.n,t('เช่น ขอใบระเบียนผลการศึกษาของบัณฑิต 2 ปีย้อนหลัง','e.g. transcripts of graduates from the last two years'))}</div>`).join('')}${docPane('req')}`},
plan(){const p=P('plan'),hows=['ตรวจเอกสาร','สัมภาษณ์','เยี่ยมชมสถานที่','ฟังการนำเสนอ','ตรวจ Course Portfolio'];
  return`<div class="card col"><h1>${t('แผนการตรวจเยี่ยม','Visit plan')}</h1><p class="muted small" style="margin:0">${t('สิ่งที่คณะผู้ตรวจต้องการไปดู ตรวจ หรือยืนยัน ณ สถาบัน ผูกกับเกณฑ์และผู้รับผิดชอบ กำหนดการสัมภาษณ์อยู่ในขั้น "นัดตรวจเยี่ยมสถาบัน"','What the team wants to see, check or confirm on site, tied to a criterion and an owner. The interview schedule is in the appointment step.')}</p>
   <div class="row"><button class="btn" data-a="planPull" ${S.canWrite?'':'disabled'}>${t('ดึงประเด็นที่ยังค้างจาก Pre-visit 2','Pull open issues from Pre-visit 2')}</button><button class="btn" data-a="padd" data-k="plan">+ ${t('เพิ่มรายการ','Add row')}</button></div></div>
  <div class="card scroll"><table class="t"><tr><th style="width:80px">${t('เกณฑ์','Crit.')}</th><th style="min-width:260px">${t('สิ่งที่ต้องการไปดู / ยืนยัน','What to see / confirm')}</th><th style="width:170px">${t('วิธี','Method')}</th><th style="min-width:150px">${t('จากใคร / ที่ใด','From whom / where')}</th><th style="width:120px">${t('เมื่อใด','When')}</th><th style="width:170px">${t('ผู้รับผิดชอบ','Owner')}</th><th></th></tr>
   ${p.items.map((x,i)=>`<tr><td><select id="pc${i}" data-b="plan:items.${i}.crit">${[1,2,3,4,5,6,7,8].map(n=>`<option ${+x.crit===n?'selected':''}>${n}</option>`).join('')}</select></td><td><textarea id="pw${i}" rows="2" data-b="plan:items.${i}.what">${esc(x.what||'')}</textarea></td><td><select id="ph${i}" data-b="plan:items.${i}.how">${hows.map(h=>`<option ${x.how===h?'selected':''}>${h}</option>`).join('')}</select></td><td><input type="text" id="pt${i}" data-b="plan:items.${i}.target" value="${esc(x.target||'')}"></td><td><input type="text" id="pn${i}" data-b="plan:items.${i}.when" value="${esc(x.when||'')}" placeholder="Day 1"></td><td><select id="po${i}" data-b="plan:items.${i}.owner"><option value=""></option>${members().map(m=>`<option value="${m.id}" ${x.owner===m.id?'selected':''}>${esc(m.name)}</option>`).join('')}</select></td><td><button class="btn sm ghost" data-a="pdel" data-k="plan" data-p="items" data-i="${i}">✕</button></td></tr>`).join('')||`<tr><td colspan="7" class="muted">${t('ยังไม่มีรายการ','No rows yet')}</td></tr>`}</table></div>${docPane('plan')}`},
appt(){const a=P('appt');return`<div class="card col"><h1>${t('นัดวันตรวจเยี่ยมสถาบันการศึกษา','Site visit appointment')}</h1><p class="muted small" style="margin:0">${t('ตามแบบขอนัดวันตรวจเยี่ยมสถาบันการศึกษา พร้อมรายการสัมภาษณ์ ข้อกำหนดการนำเสนอ Capstone และเอกสารที่ขอให้เตรียมในวันตรวจเยี่ยม','Follows the TABEE visit appointment form, with the interview list, capstone presentation requirements and documents to prepare.')}</p>
   <div class="grid2">${inp('appt','date',t('วันที่นัดตรวจเยี่ยม','Visit dates'),'text',S.meta.visit||'')}${inp('appt','cap',t('โครงงาน Capstone ที่ให้นำเสนอ','Capstone projects to present'),'text',t('เช่น 2 โครงงาน โครงงานละ 20 นาที','e.g. two projects, 20 minutes each'))}</div></div>
  <div class="card col"><div class="row"><h2>${t('รายการสัมภาษณ์และสอบถาม','Interviews and enquiries')}</h2><span class="sp"></span><button class="btn sm" data-a="padd" data-k="appt">+ ${t('เพิ่มแถว','Add row')}</button></div><div class="scroll"><table class="t"><tr><th style="width:70px">Day</th><th style="width:130px">${t('เวลา','Time')}</th><th style="min-width:220px">${t('กลุ่ม / กิจกรรม','Group / activity')}</th><th style="min-width:260px">${t('รายชื่อหรือเงื่อนไขการคัดเลือก','Names or selection criteria')}</th><th></th></tr>
   ${a.rows.map((x,i)=>`<tr><td><select id="ad${i}" data-b="appt:rows.${i}.day"><option ${x.day==='1'?'selected':''}>1</option><option ${x.day==='2'?'selected':''}>2</option></select></td><td><input type="text" id="at${i}" data-b="appt:rows.${i}.time" value="${esc(x.time||'')}"></td><td><textarea id="ag${i}" rows="2" data-b="appt:rows.${i}.group">${esc(x.group||'')}</textarea></td><td><textarea id="ax${i}" rows="2" data-b="appt:rows.${i}.detail">${esc(x.detail||'')}</textarea></td><td><button class="btn sm ghost" data-a="pdel" data-k="appt" data-p="rows" data-i="${i}">✕</button></td></tr>`).join('')}</table></div></div>
  <div class="card col"><div class="row"><h2>${t('เอกสารที่ขอให้เตรียมในช่วงตรวจเยี่ยม','Documents to prepare for the visit')}</h2><span class="sp"></span><button class="btn sm" data-a="apptPull" ${S.canWrite?'':'disabled'}>${t('ดึงจากแผนตรวจเยี่ยม','Pull from visit plan')}</button></div>${listEd('appt','docs',t('เช่น เตรียม Course Portfolio ของแต่ละรายวิชา','e.g. course portfolios for each course'))}</div>${docPane('appt')}`},
qs(){const q=P('qs'),idx=q.list.map((x,i)=>i).sort((a,b)=>S.qmode==='crit'?(q.list[a].crit-q.list[b].crit):String(q.list[a].group).localeCompare(String(q.list[b].group),'th'));
  return`<div class="card col"><h1>${t('ประเด็นที่จะตรวจสอบและคำถามสัมภาษณ์','Issues to verify and interview questions')}</h1><p class="muted small" style="margin:0">${t('เตรียมก่อนตรวจเยี่ยม และใช้ช่องบันทึกคำตอบระหว่างสัมภาษณ์ ข้อเท็จจริงที่บันทึกไว้นำไปเขียน Fact Finding Report ได้','Prepare before the visit and record answers during interviews; the notes feed the Fact Finding Report.')}</p>
   <div class="row"><button class="btn" data-a="qBank">${t('คลังคำถามตัวอย่างของ TABEE','TABEE sample question bank')}</button><button class="btn" data-a="qPull" ${S.canWrite?'':'disabled'}>${t('ดึงคำถามจาก Auto Check','Pull questions from Auto Check')}</button><button class="btn" data-a="qGen" ${S.busy||!S.canWrite?'disabled':''}>${t('สร้างคำถามจากประเด็นที่ค้าง','Draft questions from open issues')}</button><button class="btn" data-a="padd" data-k="qs">+ ${t('เพิ่มเอง','Add row')}</button><span class="sp"></span><button class="btn sm ${S.qmode==='crit'?'pri':''}" data-a="qmode" data-m="crit">${t('เรียงตามเกณฑ์','By criterion')}</button><button class="btn sm ${S.qmode==='grp'?'pri':''}" data-a="qmode" data-m="grp">${t('เรียงตามผู้ถูกสัมภาษณ์','By interviewee')}</button></div>${busyNote()}</div>
  <div class="card scroll"><table class="t"><tr><th style="width:70px">${t('เกณฑ์','Crit.')}</th><th style="width:190px">${t('ผู้ถูกสัมภาษณ์','Interviewee')}</th><th style="min-width:180px">${t('ประเด็นที่ตรวจสอบ','Issue')}</th><th style="min-width:240px">${t('คำถาม','Question')}</th><th style="min-width:220px">${t('บันทึกคำตอบ / ข้อเท็จจริงที่พบ','Answer / facts found')}</th><th></th></tr>
   ${idx.map(i=>{const x=q.list[i];return`<tr><td><select id="qc${i}" data-b="qs:list.${i}.crit">${[1,2,3,4,5,6,7,8].map(n=>`<option ${+x.crit===n?'selected':''}>${n}</option>`).join('')}</select></td><td><select id="qg${i}" data-b="qs:list.${i}.group">${(x.group&&!GROUPS.includes(x.group)?[...GROUPS,x.group]:GROUPS).map(g=>`<option ${x.group===g?'selected':''}>${g}</option>`).join('')}</select></td><td><textarea id="qi${i}" rows="2" data-b="qs:list.${i}.issue">${esc(x.issue||'')}</textarea></td><td><textarea id="qq${i}" rows="2" data-b="qs:list.${i}.q">${esc(x.q||'')}</textarea></td><td><textarea id="qa${i}" rows="2" data-b="qs:list.${i}.ans">${esc(x.ans||'')}</textarea></td><td><button class="btn sm ghost" data-a="pdel" data-k="qs" data-p="list" data-i="${i}">✕</button></td></tr>`}).join('')||`<tr><td colspan="6" class="muted">${t('ยังไม่มีคำถาม','No questions yet')}</td></tr>`}</table></div>${docPane('qs')}`},
fact(){const f=P('fact');return`<div class="card col"><h1>Fact Finding Report</h1><p class="muted small" style="margin:0">${t('ตามแบบรายการรายงานคำแถลงข้อเท็จจริงจากการตรวจเยี่ยมสถาบันการศึกษา เขียนคำแถลงรายหัวข้อของแต่ละเกณฑ์','Follows the TABEE statement-of-facts form, one statement per heading of each criterion.')}</p><div class="row"><button class="btn" data-a="factDraft" ${S.canWrite?'':'disabled'}>${t('ร่างจากผลรอบล่าสุด (เฉพาะช่องที่ยังว่าง)','Draft from the latest round (blank boxes only)')}</button></div></div>
  ${CHECKLIST.map(c=>`<div class="card col"><h3>${esc(critName(c.n))}</h3>${c.groups.map(g=>`<div class="fr"><div class="small"><b>${g.n}. ${esc(g.h)}</b><div class="row" style="gap:4px;margin-top:4px">${g.items.map(it=>`<span title="${it.code}">${chip(finalR(c.n,it.id).r)}</span>`).join('')}</div></div><textarea id="ff_${c.n}_${g.n}" rows="2" data-b="fact:c${c.n}.g${g.n}" placeholder="${t('คำแถลงข้อเท็จจริงที่พบ','Statement of facts found')}">${esc(f['c'+c.n]?.['g'+g.n]||'')}</textarea></div>`).join('')}</div>`).join('')}${docPane('fact')}`},
dec(){const d=P('dec'),cnt=decCounts(),sg=suggest();const rows=[['fact',t('ข้อเท็จจริงที่พบ','Facts found')],['D',t('ข้อบกพร่อง','Deficiency')],['W',t('ข้อด้อย','Weakness')],['C',t('ข้อวิตกกังวล','Concern')],['R',t('ข้อสังเกต','Remark')],['rec',t('ข้อเสนอให้ปรับปรุง','Recommendation')]];
  return`<div class="card col"><h1>${t('สรุปสำหรับ Decision Meeting','Decision Meeting summary')}</h1><p class="muted small" style="margin:0">${t('หนึ่งแผ่นต่อเกณฑ์ ตามรูปแบบสไลด์ Program Decision แล้วปิดด้วยข้อเสนอผลการรับรอง','One sheet per criterion in the Program Decision slide format, closing with the proposed result.')}</p>
   <div class="row"><button class="btn" data-a="decDraft" ${S.canWrite?'':'disabled'}>${t('ร่างจากผล Exit Statement และ Fact Finding (เฉพาะช่องที่ยังว่าง)','Draft from Exit Statement and Fact Finding (blank boxes only)')}</button><span class="sp"></span><button class="btn" data-a="docx" data-d="dec">Word (.docx)</button><button class="btn pri" data-a="pptx">PowerPoint (.pptx)</button></div></div>
  ${CHECKLIST.map(c=>`<div class="slide"><h3>${esc(critName(c.n))}</h3>${rows.map(r=>`<div class="g"><span>${r[1]}</span><div><textarea id="dc_${c.n}_${r[0]}" rows="2" data-b="dec:c${c.n}.${r[0]}" placeholder="${t('ไม่มี','None')}">${esc(d['c'+c.n]?.[r[0]]||'')}</textarea></div></div>`).join('')}</div>`).join('')}
  <div class="card col"><h2>${t('ข้อเสนอผลการรับรองมาตรฐานคุณภาพการศึกษา','Proposed accreditation result')}</h2>
   <div class="scroll"><table class="t" style="font-variant-numeric:tabular-nums"><tr><th></th>${[1,2,3,4,5,6,7,8].map(n=>`<th>Criteria ${n}</th>`).join('')}</tr>${[['D',t('ข้อบกพร่อง','Deficiency')],['W',t('ข้อด้อย','Weakness')],['C',t('ข้อวิตกกังวล','Concern')],['R',t('ข้อสังเกต','Remark')]].map(r=>`<tr><th>${chip(r[0])} ${r[1]}</th>${[1,2,3,4,5,6,7,8].map(n=>`<td>${cnt[n][r[0]]||'–'}</td>`).join('')}</tr>`).join('')}</table></div>
   <div class="note info">${esc(sg)}</div>
   <div class="grid2"><label class="f">${t('ผลการรับรองที่คณะผู้ตรวจเสนอ','Result proposed by the team')}<select id="dres" data-b="dec:result"><option value="">${t('— เลือก —','— choose —')}</option>${Object.entries(RESULTS).map(([k,v])=>`<option value="${k}" ${d.result===k?'selected':''}>${v.th}</option>`).join('')}</select></label>${inp('dec','years',t('ระยะเวลา','Period'),'text',d.result?RESULTS[d.result].period:'')}${inp('dec','from',t('นับตั้งแต่ปีการศึกษา','From academic year'))}${inp('dec','mtg',t('วันที่ประชุม Decision Meeting','Decision Meeting date'),'date')}</div></div>`},
report(){const r=P('report'),k=P('dec').result,R0=k?RESULTS[k]:null;const tf=[['period','ระยะเวลา'],['cond','เงื่อนไข'],['find','สิ่งที่พบจากการประเมินผล'],['oblig','ภาระผูกพันที่หลักสูตรต้องทำ'],['follow','การติดตามผลของสภาวิศวกร'],['expect','ผลลัพธ์ที่คาดจากการติดตามผล']];
  return`<div class="card col"><h1>${t('รายงานผลการตรวจรับรองมาตรฐานคุณภาพการศึกษา','Accreditation evaluation report')}</h1><p class="muted small" style="margin:0">${t('แบบ 1 ของ TABEE ส่วนผลรายเกณฑ์และจำนวนประเด็นดึงจากขั้น Decision Meeting ช่องที่เว้นว่างในตารางผลการรับรองใช้ข้อความมาตรฐานของแบบรายงาน','TABEE Form 1. Per-criterion results come from the Decision Meeting step; blank boxes in the result table use the form\'s standard wording.')}</p>
   ${k?'':`<div class="note">${t('ยังไม่ได้เลือกผลการรับรองในขั้น Decision Meeting','No result chosen yet in the Decision Meeting step.')}</div>`}
   <div class="grid2">${inp('report','date',t('วันที่รายงาน','Report date'),'date')}${inp('report','span',t('ช่วงเวลาการตรวจประเมิน','Evaluation period'),'text',t('เช่น กันยายน 2568 ถึง มกราคม 2569','e.g. September 2025 to January 2026'))}</div></div>
  <div class="card col"><h2>${t('ตารางผลการรับรอง','Result table')}: ${R0?R0.th:'–'}</h2><div class="grid2">${tf.map(f=>txa('report','tbl.'+f[0],f[1],R0?R0[f[0]]:'',2)).join('')}</div>${txa('report','reason',t('ข้อสังเกตประกอบข้อเสนอ / เหตุผลในกรณีที่ยังไม่รับรอง','Observations supporting the proposal'),'',3)}</div>
  <div class="card col"><div class="row"><h2>${t('เนื้อหารายงาน','Report body')}</h2><span class="sp"></span><button class="btn" data-a="execGen" ${S.busy||!S.canWrite?'disabled':''}>${t('ร่างบทสรุปจากข้อมูลในระบบ','Draft summary from the data')}</button></div>${busyNote()}
   ${txa('report','exec',t('บทสรุปสำหรับผู้บริหาร','Executive summary'),'',6)}${txa('report','ack',t('กิตติกรรมประกาศ','Acknowledgements'),'',2)}${txa('report','overview',t('1.1 ข้อมูลทั่วไปของหลักสูตรการศึกษา','1.1 General information'),'',4)}${txa('report','history',t('1.2 ประวัติการขอรับรองมาตรฐานคุณภาพการศึกษา','1.2 Accreditation history'),'',2)}${txa('report','stake',t('1.3 ผู้มีส่วนได้เสียของหลักสูตรการศึกษา','1.3 Stakeholders'),'',3)}${txa('report','acts',t('2.3 กิจกรรมการตรวจประเมิน','2.3 Evaluation activities'),defaultActs(),4)}${txa('report','docs',t('3. เอกสารที่ใช้ประกอบการตรวจประเมิน','3. Documents used'),P('files').list.map((f,i)=>(i+1)+'. '+f.name).join('\n'),4)}${txa('report','s5',t('5. การพิจารณาผลการตรวจรับรองมาตรฐานคุณภาพการศึกษา','5. Consideration of the result'),'',3)}${txa('report','concl',t('6. บทสรุป','6. Conclusion'),'',3)}</div>${docPane('report')}`},
notify(){const n=P('notify'),steps=[['sub',t('ส่งรายงานผลการตรวจรับรองให้คณะอนุกรรมการฯ','Report submitted to the TABEE subcommittee')],['mtg',t('ประชุม Decision Meeting','Decision Meeting held')],['sent',t('แจ้งผลให้สถาบันการศึกษา','Result sent to the institution')],['resp',t('สถาบันตอบรับหรือชี้แจงเพิ่มเติม','Institution acknowledged or responded')],['final',t('ผลการรับรองเป็นที่สิ้นสุด','Result finalised')]];
  return`<div class="card col"><h1>${t('แจ้งผลการรับรองมาตรฐานคุณภาพการศึกษา','Notification of the accreditation result')}</h1><p class="muted small" style="margin:0">${t('หนังสือแจ้งผลถึงสถาบัน แนบรายงานผลการตรวจรับรอง ข้อความปรับแก้ได้ก่อนส่งออก','Result letter to the institution with the report attached; wording can be edited before export.')}</p>
   <div class="grid2">${inp('notify','no',t('เลขที่หนังสือ','Letter no.'))}${inp('notify','date',t('ลงวันที่','Date'),'date')}${inp('notify','to',t('เรียน','To'),'text',t('อธิการบดี','President'))}${inp('notify','signer',t('ผู้ลงนาม','Signed by'))}${inp('notify','signerPos',t('ตำแหน่งผู้ลงนาม','Signer position'),'text','ประธานคณะอนุกรรมการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์')}</div>${txa('notify','extra',t('ข้อความเพิ่มเติมในหนังสือ','Additional paragraph'),'',2)}</div>
  <div class="card col"><h2>${t('ติดตามสถานะ','Status tracking')}</h2><div class="tl">${steps.map(s=>`<div><i class="${n.tl?.[s[0]]?'on':''}"></i><span>${s[1]}</span><input type="date" id="tl_${s[0]}" data-b="notify:tl.${s[0]}" data-rr="1" value="${esc(n.tl?.[s[0]]||'')}"></div>`).join('')}</div>${txa('notify','respNote',t('บันทึกการตอบกลับของสถาบัน','Institution response notes'),'',2)}</div>${docPane('notify')}`},
tools(){return`<div class="card col"><h1>${t('ส่งออกและสำรองข้อมูล','Export and backup')}</h1>
   <div class="row"><button class="btn pri" data-a="xlsx">${t('ส่งออก PEV Worksheet (.xlsx)','Export PEV Worksheet (.xlsx)')}</button><span class="small muted">${t('หน้า Cover และแผ่นเกณฑ์ข้อ 1–8 พร้อมผลและความเห็นทุกรอบ','Cover and Criterion 1–8 sheets with ratings and comments from every round')}</span></div>
   <div class="row"><button class="btn" data-a="backup">${t('สำรองข้อมูลทั้งหมด (.json)','Back up everything (.json)')}</button><label class="btn">${t('กู้คืนจากไฟล์สำรอง','Restore from backup')}<input type="file" id="restoreIn" accept=".json" hidden></label><span class="small muted">${t('การกู้คืนจะแทนที่ข้อมูลของหลักสูตรนี้','Restore replaces this program\'s data')}</span></div></div>
  <div class="card col"><h2>${t('บันทึกการทำงาน','Activity log')}</h2><div class="scroll"><table class="t">${P('log').e.map(e=>`<tr><td class="small" style="white-space:nowrap">${fmtDT(e.t)}</td><td class="small">${esc(e.by)}</td><td>${esc(e.m)}</td></tr>`).join('')||`<tr><td class="muted">${t('ยังไม่มีบันทึก','Nothing yet')}</td></tr>`}</table></div></div>`}
};

/* ---------- derived ---------- */
function finalR(c,id){for(const s of['ex','d2','d1','pv2','pv1','ai']){const r=sumR(c,id,s);if(r)return{r,n:sumN(c,id,s),st:s}}return{r:'',n:'',st:''}}
const countLines=s=>String(s||'').split('\n').filter(l=>l.trim()&&!/^(ไม่มี|-|–|none)\.?$/i.test(l.trim())).length;
function decCounts(){const d=P('dec'),o={};for(let n=1;n<=8;n++){o[n]={};for(const k of['D','W','C','R'])o[n][k]=countLines(d['c'+n]?.[k])}return o}
function suggest(){const c=decCounts(),dC=[],wC=[];let any=false;for(let n=1;n<=8;n++){if(c[n].D)dC.push(n);if(c[n].W)wC.push(n);if(c[n].D||c[n].W||c[n].C||c[n].R)any=true}
  const tail=' ผลสุดท้ายเป็นดุลยพินิจของคณะผู้ตรวจประเมินฯ และคณะอนุกรรมการฯ';
  if(!any&&!Object.keys(P('dec')).some(k=>/^c\d$/.test(k)))return'กรอกหรือร่างผลรายเกณฑ์ก่อน ระบบจะนับจำนวนประเด็นและเทียบกับตารางผลการรับรองในแบบรายงานให้';
  if(dC.length)return'มีข้อบกพร่องในเกณฑ์ข้อ '+dC.join(', ')+' ตามตารางผลการรับรอง ผลที่เข้าข่ายคือ รอผลการปรับปรุงแก้ไข หรือ ไม่รับรอง'+tail;
  if(wC.length>1)return'มีข้อด้อยใน '+wC.length+' เกณฑ์ (ข้อ '+wC.join(', ')+') เข้าข่าย รับรองแบบมีเงื่อนไข (มีข้อด้อยตั้งแต่ 1 เกณฑ์ขึ้นไป) หรือ รอผลการปรับปรุงแก้ไข (มีข้อด้อยมากกว่า 1 เกณฑ์) ขึ้นกับความรุนแรงและความเร่งด่วน'+tail;
  if(wC.length===1)return'มีข้อด้อยในเกณฑ์ข้อ '+wC[0]+' เข้าข่าย รับรองแบบมีเงื่อนไข ระยะเวลาไม่เกิน 3 ปี'+tail;
  return'ไม่มีข้อด้อยหรือข้อบกพร่อง เข้าข่าย รับรอง ระยะเวลา 6 ปี'+tail}
function defaultActs(){const d=S.meta.dates||{},rg=k=>d[k]?.from?fmtD(d[k].from)+(d[k].to&&d[k].to!==d[k].from?' ถึง '+fmtD(d[k].to):''):'';
  return[['pv1','ตรวจเอกสารรายงานประเมินตนเองเบื้องต้น ครั้งที่ 1'],['pv2','ตรวจเอกสารเบื้องต้น ครั้งที่ 2 และเอกสารเพิ่มเติม'],['d1','ตรวจเยี่ยมสถาบันการศึกษา วันที่ 1'],['d2','ตรวจเยี่ยมสถาบันการศึกษา วันที่ 2'],['ex','ประชุมสรุปและแถลงข้อเท็จจริงที่พบ (Exit)']].map(x=>rg(x[0])?x[1]+': '+rg(x[0]):'').filter(Boolean).join('\n')}

/* ---------- documents ---------- */
const bH=x=>({k:'h',x}),bH2=x=>({k:'h2',x}),bP=x=>({k:'p',x}),bT=(rows,w,head)=>({k:'t',rows,w,head});
const num=a=>a.filter(s=>String(s||'').trim()).map((s,i,l)=>(l.length>1?(i+1)+'. ':'')+s).join('\n');
const infoRows=()=>[['ชื่อสถาบันการศึกษา',S.meta.inst||''],['ชื่อหลักสูตร',progTitle()],['ชื่ออนุกรรมการประสานงานฯ',S.meta.coord||''],['ชื่อหัวหน้าคณะผู้ตรวจประเมินฯ',S.meta.chair||''],['ชื่อผู้ตรวจประเมินฯ 1',S.meta.pev1||''],['ชื่อผู้ตรวจประเมินฯ 2',S.meta.pev2||''],['ชื่อเจ้าหน้าที่',S.meta.staff||''],['วันที่ตรวจเยี่ยมสถาบัน',S.meta.visit||'']];
const DOCS={
req(){const r=P('req'),m=S.meta;const rows=[['ลำดับ','หัวข้อ','คำอธิบาย'],['1','วันที่',fmtD(r.date)],['2','หลักสูตร',m.prog||''],['3','สาขาวิชา',m.field||''],['4','สถาบันการศึกษา',m.inst||''],['5','วงรอบการรับรองฯ',m.cycle||''],['6','ชื่อผู้ตรวจเอกสารเบื้องต้น',[m.chair,m.pev1,m.pev2].filter(Boolean).join('\n')],['7','สรุปรายการเอกสารที่ต้องแสดงเพิ่ม',r.due?'ขอให้จัดส่งภายในวันที่ '+fmtD(r.due):'']];
  for(let n=1;n<=8;n++)rows.push(['','เกณฑ์ข้อที่ '+n,num(r.rows['c'+n]||[])||'-']);
  return{file:'แบบรายการขอเอกสารเพิ่มเติม',blocks:[bH('แบบรายการขอรับคำอธิบายและเอกสารประกอบเพิ่มเติมจากสถาบันการศึกษา'),bH('ผลการตรวจเอกสารรายงานประเมินตนเองของสถาบันการศึกษา'),bT(rows,[500,1300,3200],true)]}},
plan(){const p=P('plan');return{file:'แผนการตรวจเยี่ยม',blocks:[bH('แผนการตรวจเยี่ยมสถาบันการศึกษา'),bP(progTitle()+' '+(S.meta.inst||'')+(S.meta.visit?'\nวันที่ตรวจเยี่ยม '+S.meta.visit:'')),bT([['เกณฑ์','สิ่งที่ต้องการไปดู / ยืนยัน','วิธี','จากใคร / ที่ใด','เมื่อใด','ผู้รับผิดชอบ']].concat([...p.items].sort((a,b)=>a.crit-b.crit).map(x=>[String(x.crit||''),x.what||'',x.how||'',x.target||'',x.when||'',x.owner?whoName(x.owner):''])),[400,1900,700,800,500,700],true)]}},
appt(){const a=P('appt'),m=S.meta;const rows=[['ลำดับ','หัวข้อ','รายการ'],['1','วันที่นัดตรวจเยี่ยม',a.date||m.visit||''],['2','ชื่ออนุกรรมการประสานงานตรวจเยี่ยม',m.coord||''],['3','หลักสูตร',m.prog||''],['4','สาขาวิชา',m.field||''],['5','สถาบันการศึกษา',m.inst||''],['6','ประธานคณะผู้ตรวจประเมินฯ',m.chair||''],['7','ผู้ตรวจประเมินฯ 1',m.pev1||''],['8','ผู้ตรวจประเมินฯ 2',m.pev2||''],['9','รายชื่อผู้สังเกตการณ์',m.observers||''],['10','ชื่อเจ้าหน้าที่ผู้ประสานงานสภาวิศวกร',m.staff||''],['11','รายการสัมภาษณ์และสอบถาม','']];
  a.rows.forEach(x=>rows.push(['',(x.group||'')+'\n(Day '+x.day+' – '+(x.time||'')+' น.)',x.detail||'']));
  const b=[bH('แบบขอนัดวันตรวจเยี่ยมสถาบันการศึกษา'),bH('เพื่อการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์'),bT(rows,[500,2000,2500],true),
   bP('หมายเหตุ\n* ในกรณีที่หลักสูตรรับนักศึกษาเข้าในปี 2 ให้ยกเลิกรายการดังกล่าว และขยายเวลาการสัมภาษณ์ให้นักศึกษาปีที่ 2 ถึง 4\nหลักสูตรจัดห้องสัมภาษณ์ 3 ห้อง (ผู้ตรวจประเมินฯ สัมภาษณ์แยก) พร้อมคอมพิวเตอร์และ Zoom สำหรับการสัมภาษณ์ออนไลน์บัณฑิต ศิษย์เก่า และผู้ใช้บัณฑิต และสำหรับการสัมภาษณ์นิสิตนักศึกษา on-site\nหลักสูตรจัดห้องสัมภาษณ์ 1 ห้อง (สัมภาษณ์รวม) สำหรับบุคลากรสายสนับสนุน อาจารย์ และผู้บริหารหลักสูตร\nหลักสูตรจัดห้องรวมสำหรับการสัมภาษณ์ผู้บริหาร และสำหรับการประชุมเตรียม exit meeting ในช่วงบ่ายวันที่สอง'),
   bH2('ข้อกำหนดรูปแบบการนำเสนอโครงงานของวิชา Capstone Design Project'),bP((a.cap?'โครงงานที่ให้นำเสนอ: '+a.cap+'\n':'')+CAPSTONE.join('\n')),
   bP('หลักสูตรต้องแสดงว่าโครงงานมีคุณลักษณะของปัญหาวิศวกรรมที่ซับซ้อน โดยเป็นไปตามข้อที่ 1 และทั้งหมดหรือบางข้อในข้อ 2 ถึง 7'),bT([['คุณลักษณะ','โครงงาน #1','โครงงาน #2']].concat(COMPLEX.map((x,i)=>[(i+1)+'. '+x,'',''])),[3400,800,800],true)];
  if((a.docs||[]).some(Boolean))b.push(bH2('รายละเอียดเอกสารเพิ่มเติมที่ขอให้เตรียมในช่วงการตรวจเยี่ยม'),bP(num(a.docs)));
  return{file:'แบบขอนัดวันตรวจเยี่ยมสถาบันการศึกษา',blocks:b}},
qs(){const q=P('qs'),b=[bH('ประเด็นที่จะตรวจสอบและคำถามสำหรับการสัมภาษณ์'),bP(progTitle()+' '+(S.meta.inst||''))];
  for(let n=1;n<=8;n++){const l=q.list.filter(x=>+x.crit===n);if(!l.length)continue;b.push(bH2(critName(n)),bT([['ผู้ถูกสัมภาษณ์','ประเด็นที่ตรวจสอบ','คำถาม','บันทึกคำตอบ / ข้อเท็จจริงที่พบ']].concat(l.map(x=>[x.group||'',x.issue||'',x.q||'',x.ans||''])),[900,1100,1600,1400],true))}
  return{file:'ประเด็นและคำถามสัมภาษณ์',blocks:b}},
fact(){const f=P('fact'),b=[bH('แบบรายการ'),bH('รายงานคำแถลงข้อเท็จจริงจากการตรวจเยี่ยมสถาบันการศึกษา'),bT(infoRows(),[1800,3200])];
  CHECKLIST.forEach(c=>b.push(bT([['หัวข้อ','คำแถลงข้อเท็จจริงที่พบ'],['เกณฑ์ข้อ '+c.n+' '+c.th]].concat(c.groups.map(g=>[g.h+'\n'+g.items.map(it=>(g.items.length>1?it.code+' ':'- ')+it.t).join('\n'),f['c'+c.n]?.['g'+g.n]||''])),[2700,2300],true)));
  return{file:'รายงานคำแถลงข้อเท็จจริง',blocks:b}},
dec(){const d=P('dec'),cnt=decCounts(),b=[bH('รายงานผลการตรวจรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์'),bP('ชื่อหลักสูตร: '+progTitle()+'\nชื่อสถาบันการศึกษา: '+(S.meta.inst||'')),bT([[S.meta.chair||'','หัวหน้าคณะผู้ตรวจประเมิน'],[S.meta.pev1||'','ผู้ตรวจประเมิน'],[S.meta.pev2||'','ผู้ตรวจประเมิน'],[S.meta.coord||'','อนุกรรมการประสานงาน']],[2500,2500])];
  CHECKLIST.forEach(c=>{const x=d['c'+c.n]||{};b.push(bT([['เกณฑ์ข้อ '+c.n+' '+c.th],['ข้อเท็จจริงที่พบ',x.fact||''],['ข้อบกพร่อง',x.D||'ไม่มี'],['ข้อด้อย',x.W||'ไม่มี'],['ข้อวิตกกังวล',x.C||'ไม่มี'],['ข้อสังเกต',x.R||'ไม่มี'],['ข้อเสนอให้ปรับปรุง',x.rec||'ไม่มี']],[1200,3800]))});
  b.push(bH2('ข้อเสนอผลการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์'),bP('ผลการรับรอง : '+(d.result?RESULTS[d.result].th:'')+(d.years||d.result?' ระยะเวลา '+(d.years||RESULTS[d.result].period):'')+(d.from?'\nปีที่รับรอง : นับตั้งแต่ปีการศึกษา '+d.from:'')),
   bT([['','C1','C2','C3','C4','C5','C6','C7','C8']].concat([['D','ข้อบกพร่อง'],['W','ข้อด้อย'],['C','ข้อวิตกกังวล'],['R','ข้อสังเกต']].map(r=>[r[1]].concat([1,2,3,4,5,6,7,8].map(n=>cnt[n][r[0]]?String(cnt[n][r[0]]):'-')))),[1000,500,500,500,500,500,500,500,500],true));
  return{file:'สรุป Decision Meeting',blocks:b}},
report(){const r=P('report'),d=P('dec'),m=S.meta,k=d.result,R0=k?RESULTS[k]:null,tv=f=>r.tbl?.[f]||(f==='period'&&d.years)||(R0?R0[f]:'');
  const b=[bH('แบบรายงานผลการตรวจรับรองมาตรฐานคุณภาพการศึกษา'),bH('สภาวิศวกร'),bH('รายงานผลการตรวจรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์\nสำหรับ\nการศึกษาวิศวกรรมศาสตร์สาขา'+(m.field||'')+'\n'+(m.inst||'')+(m.campus?'\n'+m.campus:'')),bP('เสนอโดย'),
   bT([[m.chair||'','หัวหน้าคณะผู้ตรวจประเมินฯ','ลงนาม'],[m.pev1||'','ผู้ตรวจประเมินฯ','ลงนาม'],[m.pev2||'','ผู้ตรวจประเมินฯ','ลงนาม'],[m.coord||'','อนุกรรมการประสานงานฯ','ลงนาม']],[2000,1700,1300]),bP(fmtD(r.date)),
   bH2('ข้อเสนอผลการรับรองมาตรฐานคุณภาพการศึกษา'),bP('คณะผู้ตรวจประเมินฯ ซึ่งได้รับการแต่งตั้งจากคณะอนุกรรมการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์ (TABEE) สภาวิศวกร ได้ตรวจประเมินหลักสูตรการศึกษาวิศวกรรมศาสตร์สาขา'+(m.field||'')+' '+(m.inst||'')+' และมีข้อเสนอผลการรับรองดังนี้'),
   bP(Object.entries(RESULTS).map(([kk,v])=>(kk===k?'☑ ':'☐ ')+v.th).join('\n'))];
  if(R0)b.push(bT([['ตารางผลการรับรองมาตรฐานคุณภาพการศึกษา'],['ผลการรับรอง',R0.th],['ระยะเวลา',tv('period')],['เงื่อนไข',tv('cond')],['สิ่งที่พบจากการประเมินผล',tv('find')],['ภาระผูกพันที่หลักสูตรต้องทำ',tv('oblig')],['การติดตามผลของสภาวิศวกร',tv('follow')],['ผลลัพธ์ที่คาดจากการติดตามผล',tv('expect')]],[1700,3300]));
  if(r.reason)b.push(bP('ข้อเสนอผลการรับรองมาตรฐานคุณภาพการศึกษาข้างต้นประมวลจากข้อสังเกตดังต่อไปนี้\n'+r.reason));
  b.push(bH2('บทสรุปสำหรับผู้บริหาร'),bP(r.exec||''),bH2('กิตติกรรมประกาศ'),bP(r.ack||''),bH2('1. ภาพรวมของหลักสูตรการศึกษาโดยย่อ'),bP('1.1 ข้อมูลทั่วไปของหลักสูตรการศึกษา\n'+(r.overview||'')),bP('1.2 ประวัติการขอรับรองมาตรฐานคุณภาพการศึกษา\n'+(r.history||'')),bP('1.3 ผู้มีส่วนได้เสียของหลักสูตรการศึกษา\n'+(r.stake||'')),
   bH2('2. การตรวจประเมินหลักสูตรการศึกษา'),bP('2.1 คณะผู้ตรวจประเมินฯ\n'+[m.chair&&m.chair+' หัวหน้าคณะผู้ตรวจประเมินฯ',m.pev1&&m.pev1+' ผู้ตรวจประเมินฯ',m.pev2&&m.pev2+' ผู้ตรวจประเมินฯ'].filter(Boolean).join('\n')),bP('2.2 อนุกรรมการประสานงานตรวจเยี่ยมสถาบันการศึกษาและการรับรองมาตรฐานคุณภาพการศึกษา\n'+(m.coord||'')),bP('2.3 กิจกรรมการตรวจประเมิน\n'+(r.acts||defaultActs())),
   bH2('3. เอกสารที่ใช้ประกอบการตรวจประเมิน'),bP(r.docs||P('files').list.map((f,i)=>(i+1)+'. '+f.name+(f.url?' (ลิงก์: '+f.url+')':'')).join('\n')),bH2('4. การประเมินผล'));
  CHECKLIST.forEach(c=>{const x=d['c'+c.n]||{};b.push(bT([['4.'+c.n+' เกณฑ์ข้อ '+c.n+' '+c.th],['ข้อเท็จจริงที่พบ',x.fact||''],['ข้อบกพร่อง',x.D||'ไม่มี'],['ข้อด้อย',x.W||'ไม่มี'],['ข้อวิตกกังวล',x.C||'ไม่มี'],['ข้อสังเกต',x.R||'ไม่มี'],['ข้อเสนอให้ปรับปรุง',x.rec||'ไม่มี']],[1200,3800]))});
  b.push(bH2('5. การพิจารณาผลการตรวจรับรองมาตรฐานคุณภาพการศึกษา'),bP(r.s5||''),bH2('6. บทสรุป'),bP(r.concl||''),bH2('เอกสารผนวก: แบบรายการตรวจประเมินมาตรฐานคุณภาพการศึกษา'));
  CHECKLIST.forEach(c=>b.push(bT([['เกณฑ์ข้อ '+c.n+' '+c.th+' — รายการตรวจ','ผล','ความเห็น']].concat(c.groups.flatMap(g=>g.items.map(it=>{const f=finalR(c.n,it.id);return[g.n+(g.items.length>1?' ('+it.code+')':'')+' '+it.t,f.r?(f.r==='N'?'ไม่มีประเด็น':f.r):'',f.n]}))),[2900,500,1600],true)));
  const rq=DOCS.req().blocks[2];b.push(bH2('เอกสารผนวก: รายการขอรับคำอธิบายและเอกสารประกอบเพิ่มเติมจากสถาบันการศึกษา'),rq);
  return{file:'รายงานผลการตรวจรับรองมาตรฐานคุณภาพการศึกษา',blocks:b}},
notify(){const n=P('notify'),d=P('dec'),m=S.meta,k=d.result,R0=k?RESULTS[k]:null;
  return{file:'หนังสือแจ้งผลการรับรอง',blocks:[bP('ที่ '+(n.no||'')+'\nสภาวิศวกร'),bP(fmtD(n.date)),bP('เรื่อง  แจ้งผลการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์'),bP('เรียน  '+(n.to||'อธิการบดี')+' '+(m.inst||'')),bP('สิ่งที่ส่งมาด้วย  รายงานผลการตรวจรับรองมาตรฐานคุณภาพการศึกษา จำนวน 1 ฉบับ'),
   bP('ตามที่'+(m.inst||'')+' ได้ยื่นขอรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์ สำหรับ'+progTitle()+' และคณะผู้ตรวจประเมินฯ ได้ตรวจเยี่ยมสถาบันการศึกษา'+(m.visit?'เมื่อวันที่ '+m.visit:'')+' นั้น'),
   bP('คณะอนุกรรมการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์ (TABEE) ได้พิจารณารายงานผลการตรวจรับรองแล้ว มีมติให้ผลการรับรองดังนี้\nผลการรับรอง: '+(R0?R0.th:'')+'\nระยะเวลา: '+(d.years||(R0?R0.period:''))+(d.from?' นับตั้งแต่ปีการศึกษา '+d.from:'')+(R0&&P('report').tbl?.cond||R0&&R0.cond!=='ไม่มี'?'\nเงื่อนไข: '+(P('report').tbl?.cond||R0.cond):'')),
   ...(n.extra?[bP(n.extra)]:[]),bP('รายละเอียดข้อเท็จจริงที่พบและข้อเสนอให้ปรับปรุงปรากฏตามรายงานที่ส่งมาด้วย จึงเรียนมาเพื่อโปรดทราบและดำเนินการในส่วนที่เกี่ยวข้องต่อไป'),bP('ขอแสดงความนับถือ\n\n\n('+(n.signer||'')+')\n'+(n.signerPos||'ประธานคณะอนุกรรมการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์'))]}}
};
function normRows(b){const n=Math.max(...b.rows.map(r=>r.length));return{n,rows:b.rows.map(r=>r.length===1&&n>1?r:r.concat(Array(n-r.length).fill('')))}}
function blocksHTML(bs){return bs.map(b=>{if(b.k==='h')return`<p class="c b">${esc(b.x)}</p>`;if(b.k==='h2')return`<h4>${esc(b.x)}</h4>`;if(b.k==='p')return`<p>${esc(b.x)}</p>`;const{n,rows}=normRows(b);return`<table>${rows.map((r,i)=>`<tr>${r.map(c=>r.length===1&&n>1?`<th colspan="${n}">${esc(c)}</th>`:(b.head&&i===0?`<th>${esc(c)}</th>`:`<td>${esc(c)}</td>`)).join('')}</tr>`).join('')}</table>`}).join('')}
function blocksText(bs){return bs.map(b=>b.k==='t'?b.rows.map(r=>r.join('\t')).join('\n'):b.x).join('\n\n')}
const xe=s=>String(s??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
function wP(text,o={}){return`<w:p><w:pPr>${o.align?`<w:jc w:val="${o.align}"/>`:''}<w:spacing w:before="${o.before||0}" w:after="${o.after??80}"/></w:pPr>${String(text??'').split('\n').map((l,i)=>`<w:r>${o.bold?'<w:rPr><w:b/><w:bCs/></w:rPr>':''}${i?'<w:br/>':''}<w:t xml:space="preserve">${xe(l)}</w:t></w:r>`).join('')}</w:p>`}
function wT(b){const{n,rows}=normRows(b),w=b.w&&b.w.length===n?b.w:Array(n).fill(Math.floor(5000/n)),tot=w.reduce((a,x)=>a+x,0);
  return`<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>${['top','left','bottom','right','insideH','insideV'].map(x=>`<w:${x} w:val="single" w:sz="4" w:space="0" w:color="000000"/>`).join('')}</w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>${w.map(x=>`<w:gridCol w:w="${Math.round(x/tot*9026)}"/>`).join('')}</w:tblGrid>${rows.map((r,ri)=>{const span=r.length===1&&n>1,hd=span||(b.head&&ri===0);return`<w:tr>${r.map((c,ci)=>`<w:tc><w:tcPr><w:tcW w:w="${span?9026:Math.round(w[ci]/tot*9026)}" w:type="dxa"/>${span?`<w:gridSpan w:val="${n}"/>`:''}${hd?'<w:shd w:val="clear" w:color="auto" w:fill="E7E6E6"/>':''}</w:tcPr>${wP(c,{bold:hd,after:0})}</w:tc>`).join('')}</w:tr>`}).join('')}</w:tbl>${wP('',{after:0})}`}
async function makeDocx(bs){await lib(L_ZIP);const body=bs.map(b=>b.k==='h'?wP(b.x,{bold:true,align:'center'}):b.k==='h2'?wP(b.x,{bold:true,before:200}):b.k==='p'?wP(b.x):wT(b)).join('');
  const ns='xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"',z=new JSZip();
  z.file('[Content_Types].xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>');
  z.file('_rels/.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
  z.file('word/_rels/document.xml.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>');
  z.file('word/styles.xml',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles ${ns}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="TH Sarabun New" w:hAnsi="TH Sarabun New" w:eastAsia="TH Sarabun New" w:cs="TH Sarabun New"/><w:sz w:val="32"/><w:szCs w:val="32"/><w:lang w:val="en-US" w:bidi="th-TH"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="80" w:line="240" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>`);
  z.file('word/document.xml',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${ns}><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`);
  return z.generateAsync({type:'blob',compression:'DEFLATE'})}
const fileBase=()=>(S.meta.inst||'PEV').replace(/[\\/:*?"<>|]/g,'').slice(0,40);

/* ---------- file reading ---------- */
async function extractText(file){const ext=(file.name.split('.').pop()||'').toLowerCase(),buf=()=>file.arrayBuffer();
  if(ext==='pdf'){await lib(L_PDFW);await lib(L_PDF);pdfjsLib.GlobalWorkerOptions.workerSrc=L_PDFW;const pdf=await pdfjsLib.getDocument({data:await buf(),...(typeof PEV_CMAPS!=='undefined'?{cMapUrl:PEV_CMAPS,cMapPacked:true}:{})}).promise;let out='';for(let p=1;p<=pdf.numPages;p++){const tc=await(await pdf.getPage(p)).getTextContent();out+='\n[หน้า '+p+']\n'+tc.items.map(i=>i.str+(i.hasEOL?'\n':'')).join('')}return out}
  if(ext==='docx'){await lib(L_MAM);return(await mammoth.extractRawText({arrayBuffer:await buf()})).value}
  if(['xlsx','xls','csv'].includes(ext)){await lib(L_XLSX);const wb=XLSX.read(await buf(),{type:'array'});return wb.SheetNames.map(n=>'[แผ่นงาน '+n+']\n'+XLSX.utils.sheet_to_csv(wb.Sheets[n])).join('\n')}
  if(ext==='pptx'){await lib(L_ZIP);const z=await JSZip.loadAsync(await buf());const names=Object.keys(z.files).filter(n=>/^ppt\/slides\/slide\d+\.xml$/.test(n)).sort((a,b)=>parseInt(a.match(/\d+/)[0])-parseInt(b.match(/\d+/)[0]));let out='';for(const n of names){const x=await z.file(n).async('string');out+='\n[สไลด์ '+n.match(/\d+/)[0]+']\n'+[...x.matchAll(/<a:t>([^<]*)<\/a:t>/g)].map(m=>m[1]).join(' ')}return out}
  if(['md','txt','html','json'].includes(ext))return file.text();
  throw new Error(t('ไม่รองรับไฟล์ชนิด .','Unsupported file type .')+ext)}
async function handleFiles(fl){if(!S.canWrite)return;const files=[...fl];for(const f of files){S.busy=t('กำลังอ่าน ','Reading ')+f.name+'…';render(true);
    try{const tx=(await extractText(f)).replace(/\u0000/g,'');const id=uid();const chunks=await Store.putText(id,tx);const ext=f.name.split('.').pop().toLowerCase();
      P('files').list.push({id,name:f.name,size:f.size,chars:tx.length,chunks,at:Date.now(),by:whoName(S.who),kind:S.uploadKind?S.uploadKind:/ser|ประเมินตนเอง/i.test(f.name)?'SER':/transcript|ระเบียน/i.test(f.name)?'ใบระเบียนผลการศึกษา':'เอกสารแนบ',warn:ext==='pdf'&&tx.replace(/\s|\[หน้า \d+\]/g,'').length<200?t('อ่านข้อความแทบไม่ได้ อาจเป็นไฟล์สแกน','Almost no text read; this may be a scanned file'):(chunks?'':t('เก็บข้อความไว้ในระบบไม่สำเร็จ ใช้ได้เฉพาะรอบนี้','Text could not be stored; available this session only'))});
      Store.save('files');log('อัปโหลดเอกสาร '+f.name)}catch(e){toast(f.name+': '+(e.message||e))}}
  S.busy='';S.uploadKind='';render(true)}

/* ---------- actions ---------- */
const openIssues=()=>ALL.map(x=>({...x,f:finalR(x.c,x.it.id),ai:peek(x.c,x.it.id)?.ai})).filter(x=>x.f.r&&RT[x.f.r].sev>0);
const stOf=(c,id,st)=>IT(c,id)[st]||(IT(c,id)[st]={ev:{}});
const A={
go(d){S.view=d.v;S.filter='all';try{location.hash=d.v}catch(e){}render()},
cell(d){S.view=d.v;S.crit=+d.c;S.filter='all';try{location.hash=d.v}catch(e){}render()},
crit(d){S.crit=+d.c;render(true)},filter(d){S.filter=d.f;render(true)},cmp(){S.cmp=!S.cmp;render(true)},qmode(d){S.qmode=d.m;render(true)},
lang(){LANG=LANG==='th'?'en':'th';try{localStorage.setItem('pev.lang',LANG)}catch(e){}document.documentElement.lang=LANG;Store.init&&(S.sync=Store.db?t('ข้อมูลร่วมของทีม','Shared team data'):t('บันทึกเฉพาะเครื่องนี้','Saved on this device only'));render(true)},
async switch(){if(Store.flushAll)await Store.flushAll();S.pid=null;S.programs=null;render();S.programs=await Store.list().catch(()=>[]);render()},
async open(d){await Store.open(d.id);S.view='home';render()},
async create(){const inst=$('#n_inst').value.trim(),prog=$('#n_prog').value.trim(),field=$('#n_field').value.trim();if(!inst&&!field){toast(t('กรอกชื่อสถาบันหรือสาขาวิชาก่อน','Enter an institution or field first'));return}
  const pid=uid();await Store.open(pid);S.meta={inst,prog,field,createdAt:Date.now()};Store.save('meta');log('สร้างรายการตรวจประเมิน');S.view='setup';render()},
async demo(){const pid=uid();await Store.open(pid);S.meta={inst:'มหาวิทยาลัยตัวอย่าง (ข้อมูลสมมติ)',prog:'หลักสูตรวิศวกรรมศาสตรบัณฑิต',field:'วิศวกรรมเคมี',chair:'ผู้ตรวจ ก (สมมติ)',pev1:'ผู้ตรวจ ข (สมมติ)',pev2:'ผู้ตรวจ ค (สมมติ)',coord:'อนุกรรมการ ง (สมมติ)',visit:'ยังไม่กำหนด',createdAt:Date.now()};
  const pat=['N','N','R','N','C','N','N','W','N','R'],now=Date.now();ALL.forEach((x,i)=>{const r=pat[i%10];if(x.c<=4){IT(x.c,x.it.id).ai={r,n:r==='N'?'พบคำอธิบายและหลักฐานครบ (ตัวอย่างสมมติ)':'พบคำอธิบายแต่หลักฐานประกอบยังไม่ครบ (ตัวอย่างสมมติ)',ev:'SER ตัวอย่าง',req:r==='N'?'':'ขอหลักฐานประกอบเพิ่มเติม (ตัวอย่างสมมติ)',q:'',t:now}}
    if(x.c<=2){const st=stOf(x.c,x.it.id,'pv1');st.ev.chair={r,n:r==='N'?'':'เห็นตรงกับ Auto Check ขอเอกสารเพิ่ม (ตัวอย่างสมมติ)',t:now};if(i%3===0)st.ev.pev1={r:r==='C'?'W':r,n:'ตรวจแล้ว (ตัวอย่างสมมติ)',t:now}}});
  Store.save('meta');for(let c=1;c<=4;c++)Store.save('c'+c);log('สร้างข้อมูลตัวอย่าง (สมมติ)');S.view='home';render()},
rate(d){const e=stOf(+d.c,d.id,d.st).ev;const x=e[S.who]||(e[S.who]={});x.r=x.r===d.r?'':d.r;x.t=Date.now();Store.save('c'+d.c);render(true)},
rateSum(d){const st=stOf(+d.c,d.id,d.st);st.sr=st.sr===d.r?'':d.r;Store.save('c'+d.c);render(true)},
mergeSum(d){const st=stOf(+d.c,d.id,d.st);st.sn=evList(st).filter(([,v])=>v.n).map(([k,v])=>whoName(k)+': '+v.n).join('\n');Store.save('c'+d.c);render(true)},
bulkN(d){let n=0;ALL.filter(x=>x.c===S.crit).forEach(x=>{const e=stOf(x.c,x.it.id,d.st).ev;if(!e[S.who]?.r){e[S.who]={...(e[S.who]||{}),r:'N',t:Date.now()};n++}});Store.save('c'+S.crit);toast(n+t(' ข้อ ลงผลเป็นไม่มีประเด็น',' items set to no issue'));render(true)},
copyPrev(d){let n=0;const prevs=STAGES.slice(0,SIDX[d.st]).reverse();ALL.filter(x=>x.c===S.crit).forEach(x=>{const e=stOf(x.c,x.it.id,d.st).ev;if(e[S.who]?.r)return;const ps=prevs.find(s=>sumR(x.c,x.it.id,s.k));if(!ps)return;e[S.who]={r:sumR(x.c,x.it.id,ps.k),n:e[S.who]?.n||sumN(x.c,x.it.id,ps.k),t:Date.now()};n++});Store.save('c'+S.crit);toast(n+t(' ข้อ ยืนยันตามรอบก่อน',' items carried over'));render(true)},
aiAll(){A.aiRun([1,2,3,4,5,6,7,8])},aiOne(){A.aiRun([S.crit])},
async fdel(d){const l=P('files').list,f=l[+d.i];if(!f)return;l.splice(+d.i,1);Store.save('files');render(true);await Store.delText(f)},
ladd(d){const root=P(d.k);const a=getPath(root,d.p)||setPath(root,d.p,[])[d.p.split('.').pop()];a.push('');Store.save(d.k);render(true)},
ldel(d){const a=getPath(P(d.k),d.p);a.splice(+d.i,1);Store.save(d.k);render(true)},
padd(d){if(d.k==='plan')P('plan').items.push({crit:S.crit,what:'',how:'ตรวจเอกสาร'});if(d.k==='appt')P('appt').rows.push({id:uid(),day:'1',time:'',group:'',detail:''});if(d.k==='qs')P('qs').list.push({crit:S.crit,group:GROUPS[0],issue:'',q:'',ans:''});Store.save(d.k);render(true)},
pdel(d){P(d.k)[d.p].splice(+d.i,1);Store.save(d.k);render(true)},
reqPull(){const r=P('req');let n=0;ALL.forEach(x=>{const p=sumR(x.c,x.it.id,'pv1')||sumR(x.c,x.it.id,'ai');if(!p||RT[p].sev===0)return;const cand=[];const a=peek(x.c,x.it.id)?.ai;if(a?.req)cand.push(a.req);sumN(x.c,x.it.id,'pv1').split('\n').map(s=>s.replace(/^[\d.\s)]+/,'').replace(/^[^:]{0,40}:\s*/,'').trim()).filter(s=>/^ขอ/.test(s)).forEach(s=>cand.push(s));
    const arr=r.rows['c'+x.c]||(r.rows['c'+x.c]=[]);cand.forEach(s=>{if(!arr.includes(s)){arr.push(s);n++}})});Store.save('req');toast(t('เพิ่ม ','Added ')+n+t(' รายการ',' rows'));render(true)},
planPull(){const p=P('plan');let n=0;openIssues().forEach(x=>{if(x.f.r==='S'||p.items.some(i=>i.src===x.it.id))return;p.items.push({src:x.it.id,crit:x.c,what:'ข้อ '+x.it.code+' ['+x.f.r+'] '+(x.f.n||x.it.t.slice(0,120)),how:'ตรวจเอกสาร',target:'',when:'',owner:''});n++});Store.save('plan');toast(t('เพิ่ม ','Added ')+n+t(' รายการ',' rows'));render(true)},
apptPull(){const a=P('appt');a.docs=a.docs||[];let n=0;P('plan').items.filter(i=>/เอกสาร|Portfolio/.test(i.how||'')&&i.what).forEach(i=>{const s='เกณฑ์ข้อ '+i.crit+': '+i.what;if(!a.docs.includes(s)){a.docs.push(s);n++}});Store.save('appt');toast(t('เพิ่ม ','Added ')+n+t(' รายการ',' rows'));render(true)},
qBank(){$('#modal').innerHTML=`<div class="mc"><div class="row"><h2>${t('คลังคำถามตัวอย่าง','Sample question bank')}</h2><span class="sp"></span><button class="btn sm ghost" data-a="closeModal">✕</button></div><p class="small muted" style="margin:0">${t('เรียบเรียงจากตารางตัวอย่างคำถามที่ผู้ตรวจประเมินควรพิจารณาซักถามของ TABEE เลือกข้อที่ต้องการแล้วปรับถ้อยคำได้ภายหลัง','Adapted from TABEE\'s table of sample questions for evaluators; pick what you need and edit later.')}</p>${[1,2,3,4,5,6,7,8].map(c=>`<h3>${esc(critName(c))}</h3>`+QBANK.map((q,i)=>q[0]===c?`<label class="row small" style="align-items:flex-start;flex-wrap:nowrap"><input type="checkbox" class="qb" value="${i}" style="margin-top:5px"><span><b>${q[1]}</b> — ${esc(q[2])}</span></label>`:'').join('')).join('')}<div class="row"><span class="sp"></span><button class="btn pri" data-a="qAddBank">${t('เพิ่มข้อที่เลือก','Add selected')}</button></div></div>`;$('#modal').classList.add('on')},
qAddBank(){const l=P('qs').list;document.querySelectorAll('.qb:checked').forEach(e=>{const q=QBANK[+e.value];if(!l.some(x=>x.q===q[2]))l.push({crit:q[0],group:q[1],issue:'',q:q[2],ans:''})});Store.save('qs');A.closeModal();render(true)},
closeModal(){$('#modal').classList.remove('on');$('#modal').innerHTML=''},
qPull(){const l=P('qs').list;let n=0;ALL.forEach(x=>{const a=peek(x.c,x.it.id)?.ai;if(!a?.q||l.some(q=>q.q===a.q))return;l.push({crit:x.c,group:GROUPS[0],issue:'ข้อ '+x.it.code+': '+(a.n||'').slice(0,160),q:a.q,ans:''});n++});Store.save('qs');toast(t('เพิ่ม ','Added ')+n+t(' คำถาม',' questions'));render(true)},
factDraft(){const f=P('fact');let n=0;CHECKLIST.forEach(c=>{const fc=f['c'+c.n]||(f['c'+c.n]={});c.groups.forEach(g=>{if(fc['g'+g.n])return;const rs=g.items.map(it=>({it,f:finalR(c.n,it.id)}));if(!rs.some(x=>x.f.r))return;const iss=rs.filter(x=>x.f.r&&RT[x.f.r].sev>0);fc['g'+g.n]=iss.length?iss.map(x=>(g.items.length>1?x.it.code+' ':'')+(x.f.n||RT[x.f.r].th)).join('\n'):'ไม่มีประเด็น';n++})});Store.save('fact');toast(t('ร่างแล้ว ','Drafted ')+n+t(' หัวข้อ',' headings'));render(true)},
decDraft(){const d=P('dec'),f=P('fact');let n=0;CHECKLIST.forEach(c=>{const x=d['c'+c.n]||(d['c'+c.n]={});const rs=ALL.filter(a=>a.c===c.n).map(a=>({a,f:finalR(c.n,a.it.id)}));if(!rs.some(o=>o.f.r))return;
    const by=k=>rs.filter(o=>o.f.r===k).map(o=>o.f.n||('ข้อ '+o.a.it.code)).join('\n');const set=(k,v)=>{if(!x[k]&&v){x[k]=v;n++}};
    const facts=Object.values(f['c'+c.n]||{}).filter(s=>s&&s!=='ไม่มีประเด็น').join('\n');
    set('fact',facts||'การดำเนินงานของหลักสูตรเป็นไปตามเกณฑ์ข้อ '+c.n+' '+c.th+' ของ TABEE');['D','W','C','R'].forEach(k=>set(k,by(k)||'ไม่มี'));
    const need=[by('D')&&'ข้อบกพร่อง',by('W')&&'ข้อด้อย',by('C')&&'ข้อวิตกกังวล'].filter(Boolean);set('rec',need.length?'แก้ไข'+need.join('และ')+'ให้เป็นไปตามเกณฑ์ TABEE':'ไม่มี')});Store.save('dec');toast(t('ร่างแล้ว ','Drafted ')+n+t(' ช่อง',' boxes'));render(true)},
async docx(d){try{const doc=DOCS[d.d]();await saveFile(doc.file+' - '+fileBase()+'.docx',await makeDocx(doc.blocks))}catch(e){toast(e.message||String(e))}},
async copydoc(d){try{await navigator.clipboard.writeText(blocksText(DOCS[d.d]().blocks));toast(t('คัดลอกแล้ว','Copied'))}catch(e){toast(t('คัดลอกไม่สำเร็จ','Copy failed'))}},
async pptx(){try{await lib(L_PPT);const p=new PptxGenJS();p.layout='LAYOUT_WIDE';const d=P('dec'),cnt=decCounts(),ff='TH Sarabun New',hd=x=>({text:x,options:{bold:true,fill:{color:'EDEAF0'}}});
    let s=p.addSlide();s.addText('รายงานผลการตรวจรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์',{x:0.6,y:1.2,w:12.1,h:1,fontSize:32,bold:true,fontFace:ff});s.addText('ชื่อหลักสูตร: '+progTitle()+'\nชื่อสถาบันการศึกษา: '+(S.meta.inst||''),{x:0.6,y:2.4,w:12.1,h:1.2,fontSize:22,fontFace:ff});
    s.addText(members().map(m=>m.name+'    '+m.role).join('\n'),{x:0.6,y:4,w:12.1,h:2,fontSize:20,fontFace:ff});
    CHECKLIST.forEach(c=>{const x=d['c'+c.n]||{};s=p.addSlide();s.addText('เกณฑ์ข้อ '+c.n+' '+c.th,{x:0.5,y:0.3,w:12.3,h:0.7,fontSize:28,bold:true,fontFace:ff});
      s.addTable([[hd(''),hd('คำอธิบาย')],...[['ข้อเท็จจริงที่พบ',x.fact],['ข้อบกพร่อง',x.D],['ข้อด้อย',x.W],['ข้อวิตกกังวล',x.C],['ข้อสังเกต',x.R],['ข้อเสนอให้ปรับปรุง',x.rec]].map(r=>[hd(r[0]),{text:r[1]||'ไม่มี'}])],{x:0.5,y:1.1,w:12.3,colW:[2.6,9.7],fontSize:16,fontFace:ff,border:{type:'solid',pt:1,color:'777777'},autoPage:true,autoPageRepeatHeader:true})});
    s=p.addSlide();s.addText('ข้อเสนอผลการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์',{x:0.5,y:0.3,w:12.3,h:0.7,fontSize:28,bold:true,fontFace:ff});s.addText('ผลการรับรอง : '+(d.result?RESULTS[d.result].th:'')+' ระยะเวลา '+(d.years||(d.result?RESULTS[d.result].period:''))+(d.from?'\nปีที่รับรอง : นับตั้งแต่ปีการศึกษา '+d.from:''),{x:0.5,y:1.1,w:12.3,h:1.1,fontSize:22,fontFace:ff});
    s.addTable([[hd('')].concat([1,2,3,4,5,6,7,8].map(n=>hd('Criteria '+n))),...[['D','ข้อบกพร่อง'],['W','ข้อด้อย'],['C','ข้อวิตกกังวล'],['R','ข้อสังเกต']].map(r=>[hd(r[1])].concat([1,2,3,4,5,6,7,8].map(n=>({text:cnt[n][r[0]]?String(cnt[n][r[0]]):'-',options:{align:'center'}}))))],{x:0.5,y:2.5,w:12.3,fontSize:18,fontFace:ff,border:{type:'solid',pt:1,color:'777777'}});
    await saveFile('Program Decision - '+fileBase()+'.pptx',await p.write({outputType:'blob'}))}catch(e){toast(e.message||String(e))}},
async xlsx(){try{await lib(L_XLSX);const wb=XLSX.utils.book_new(),m=S.meta;
    const cover=[['แบบรายการตรวจประเมินมาตรฐานคุณภาพการศึกษา (Checklist for Program Evaluation)'],['ชื่อสถาบันการศึกษา (Institution Name)',m.inst||''],['ชื่อหลักสูตร (Program Name)',progTitle()],['ชื่ออนุกรรมการประสานงานฯ',m.coord||''],['ชื่อประธานคณะผู้ตรวจประเมินฯ',m.chair||''],['ชื่อผู้ตรวจประเมินฯ 1',m.pev1||''],['ชื่อผู้ตรวจประเมินฯ 2',m.pev2||''],['ชื่อเจ้าหน้าที่',m.staff||''],['วันที่ตรวจเยี่ยมสถาบัน',m.visit||''],[],['สัญลักษณ์ (Symbol)','คำอธิบาย (Description)'],['D','Deficiency (มีข้อบกพร่อง)'],['W','Weakness (มีข้อด้อย)'],['C','Concern (มีข้อกังวล)'],['R','Remark (มีข้อสังเกต)'],['S','Issue has been resolved and satisfied (มีคำอธิบายที่พอเพียง)']];
    let ws=XLSX.utils.aoa_to_sheet(cover);ws['!cols']=[{wch:48},{wch:70}];XLSX.utils.book_append_sheet(wb,ws,'Cover');const dr=k=>{const x=m.dates?.[k];return x?.from?'\n('+x.from+(x.to?' – '+x.to:'')+')':''},sym=r=>r==='N'?'ไม่มีประเด็น':(r||'');
    CHECKLIST.forEach(c=>{const rows=[[...STAGES.map(s=>s.th+dr(s.k))],[]];rows[0].unshift('รายการตรวจ');rows[0].push(...STAGES.map(s=>'Comments '+s.th));rows[1]=['เกณฑ์ข้อ '+c.n+' '+c.th+' (Criterion '+c.n+' '+c.en+')'];
      c.groups.forEach(g=>{rows.push([g.n+'. '+g.h]);g.items.forEach(it=>rows.push([(g.items.length>1?it.code+' ':'- ')+it.t,...STAGES.map(s=>sym(sumR(c.n,it.id,s.k))),...STAGES.map(s=>sumN(c.n,it.id,s.k))]))});
      ws=XLSX.utils.aoa_to_sheet(rows);ws['!cols']=[{wch:70},...STAGES.map(()=>({wch:12})),...STAGES.map(()=>({wch:45}))];XLSX.utils.book_append_sheet(wb,ws,'Criterion '+c.n)});
    await saveFile('PEV-Worksheet - '+fileBase()+'.xlsx',XLSX.write(wb,{bookType:'xlsx',type:'array'}))}catch(e){toast(e.message||String(e))}},
backup(){saveFile('PEV-Studio-backup - '+fileBase()+'.json',JSON.stringify({v:1,meta:S.meta,parts:S.parts},null,1))}
};

/* ---------- events + boot ---------- */
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(el&&!el.disabled&&A[el.dataset.a]){A[el.dataset.a](el.dataset,el);return}if(e.target.id==='modal')A.closeModal()});
document.addEventListener('input',e=>{const el=e.target,b=el.dataset&&el.dataset.b;if(!b||!S.canWrite||el.type==='checkbox')return;const i=b.indexOf(':'),k=b.slice(0,i),p=b.slice(i+1),root=k==='meta'?S.meta:P(k),par=setPath(root,p,el.value);if(el.dataset.ts)par.t=Date.now();Store.save(k);if(el.dataset.rr||(k==='dec'&&p==='result'))render(true)});
document.addEventListener('change',async e=>{const el=e.target;
  if(el.id==='whoSel'){S.who=el.value;render(true);return}
  if(el.id==='fileIn'){const f=el.files;if(f.length)handleFiles(f);return}
  if(el.id==='restoreIn'){try{const o=JSON.parse(await el.files[0].text());if(!o.meta||!o.parts)throw 0;S.meta=o.meta;S.parts=o.parts;Store.save('meta');Object.keys(S.parts).forEach(k=>Store.save(k));log('กู้คืนข้อมูลจากไฟล์สำรอง');render()}catch(x){toast(t('ไฟล์สำรองไม่ถูกต้อง','Not a valid backup file'))}return}
  if(el.dataset&&el.dataset.b){const dp=document.querySelector('.doc');const btn=document.querySelector('[data-a="docx"][data-d]');if(dp&&btn&&DOCS[btn.dataset.d]&&S.view!=='dec')dp.innerHTML=blocksHTML(DOCS[btn.dataset.d]().blocks);patchNav();if(el.dataset.b.startsWith('meta:')){const pn=$('#top .pname');if(pn)pn.innerHTML=esc(progTitle())+'<small>'+esc(S.meta.inst||'')+(S.meta.visit?' · '+esc(S.meta.visit):'')+'</small>'}}});
function patchNav(){document.querySelectorAll('#nav .navi').forEach(b=>{const s=status(b.dataset.v);b.querySelector('i').className=s.c;b.querySelector('b').textContent=s.b})}
document.addEventListener('focusout',()=>{if(pendingRender)setTimeout(()=>{if(pendingRender)softRender()},400)});
document.addEventListener('dragover',e=>{const d=e.target.closest&&e.target.closest('#drop');if(d){e.preventDefault();d.classList.add('over')}});
document.addEventListener('dragleave',e=>{const d=e.target.closest&&e.target.closest('#drop');if(d)d.classList.remove('over')});
document.addEventListener('drop',e=>{const d=e.target.closest&&e.target.closest('#drop');if(d){e.preventDefault();d.classList.remove('over');if(e.dataTransfer.files.length)handleFiles(e.dataTransfer.files)}});
window.addEventListener('hashchange',()=>{const v=location.hash.slice(1);if(S.pid&&VIEWS[v]&&v!==S.view){S.view=v;render()}});

/* ---------- Auto Check: rule-based evidence screening, runs entirely in this browser ---------- */
const ITEMKEY={};ALL.forEach(x=>{ITEMKEY[x.c+'|'+x.it.code]=x});
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
const MAJOR=1500;
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
let DOCCACHE={};
async function preparedDocs(){const out=[];for(const f of P('files').list){if(!DOCCACHE[f.id]){const tx=await Store.getText(f);if(!tx)continue;DOCCACHE[f.id]=prepDoc(f,tx)}DOCCACHE[f.id].f=f;out.push(DOCCACHE[f.id])}return out}
let autoRunSync=function(docs,list){const files=P('files').list;let n=0;
  for(const c of list){for(const x of ALL.filter(a=>a.c===c)){const res=checkItem(docs,c,x,files);if(!res)continue;IT(c,x.it.id).ai={...res,t:Date.now(),algo:true};n++}Store.save('c'+c)}
  S.autoInfo=docs.map(d=>({name:d.f.name,crit:[...new Set(d.hs.map(h=>h[1]))].sort()}));return n};
function ruleBox(c,it){const R=RULES[c+'|'+it.code];if(!R)return'';const g=x=>{const i=x.indexOf(':');return`<li><b>${esc(x.slice(0,i))}</b> <span class="muted">${esc(x.slice(i+1).split('|').join(' · '))}</span></li>`};
  return`<details class="rules"><summary class="tiny muted">${t('กฎที่ใช้ตรวจข้อนี้','Rule used for this item')}</summary><ul class="small">${R.cond?`<li>${t('ใช้เมื่อ','Applies when')}: ${g(R.cond).slice(4,-5)}</li>`:''}${(R.req||[]).map(g).join('')}${R.y?`<li><b>${t('ข้อมูลอย่างน้อย','At least')} ${R.y} ${t('ปีการศึกษา','academic years')}</b></li>`:''}${(R.opt||[]).map(x=>g(x).replace('<b>','<b>'+t('(เสริม) ','(optional) '))).join('')}${R.po?`<li><b>${t('(เสริม) ระบุ PO ครบ','(optional) all POs listed:')} ${R.po} ${t('ข้อ','')}</b></li>`:''}</ul></details>`}
function autoHead(c){const files=P('files').list,chars=files.reduce((a,f)=>a+(f.chars||0),0),dis=S.busy||!S.canWrite?'disabled':'';
  const info=S.autoInfo?`<div class="small muted">${t('หัวข้อเกณฑ์ที่ระบบพบในเอกสาร','Criterion headings found')}: ${S.autoInfo.map(x=>esc(x.name)+' → '+(x.crit.length?t('เกณฑ์ข้อ ','criteria ')+x.crit.join(', '):t('ไม่พบหัวข้อ (นับทั้งไฟล์)','none (whole file counts)'))).join(' · ')}</div>`:'';
  return`<p class="muted" style="margin:0;max-width:78ch">${t('Auto Check ค้นหาหลักฐานที่แต่ละข้อของ PEV Worksheet ต้องการจากเอกสารที่อัปโหลด ตามกฎคำค้นที่กำหนดไว้ แล้วให้ผลตามสัดส่วนหลักฐานที่พบ การตรวจทั้งหมดทำในเบราว์เซอร์นี้ ไม่ส่งข้อมูลของหลักสูตรออกไปที่ใด ผลนี้บอกว่าพบหรือไม่พบหลักฐาน ไม่ได้ตัดสินคุณภาพ คณะผู้ตรวจพิจารณาต่อใน Pre-visit 1','Auto Check searches the uploaded documents for the evidence each PEV Worksheet item needs, using fixed keyword rules, and rates by the share of evidence found. It runs entirely in this browser and sends nothing anywhere. It tells you whether evidence was found, not whether it is good; the team judges that in Pre-visit 1.')}</p>
   <div class="legend"><span>${chip('N')} ${t('พบครบ','all found')}</span><span>${chip('R')} ${t('ครบ ขาดหลักฐานเสริม','optional missing')}</span><span>${chip('C')} ≥ ${Math.round(SCORING.C*100)}%</span><span>${chip('W')} ≥ ${Math.round(SCORING.W*100)}%</span><span>${chip('D')} &lt; ${Math.round(SCORING.W*100)}%</span><span class="tiny">${t('ไม่มีหัวข้อของข้อนั้น หรือพบเฉพาะในเอกสารแนบ นับ','No heading for the item, or found only in an attachment, counts')} ${Math.round(SCORING.NEAR*100)}% · ${t('นอกเกณฑ์นับ','outside the criterion')} ${Math.round(SCORING.OUTSIDE*100)}%</span></div>
   <div class="row"><span class="small mono">${files.length} ${t('ไฟล์','files')} · ${chars.toLocaleString()} ${t('ตัวอักษร','chars')}</span><span class="sp"></span><button class="btn" data-a="go" data-v="files">${t('จัดการเอกสาร','Manage documents')}</button>${typeof aiCheckCrit==='function'?`<button class="btn" data-a="aiClaude" data-c="${c}" ${dis} title="${t('ส่งข้อความบางส่วนของเอกสารให้ Claude อ่าน','Sends document excerpts to Claude')}">${t('ตรวจข้อ ','Check criterion ')+c+t(' ด้วย Claude',' with Claude')}</button>`:''}<button class="btn" data-a="aiOne" ${dis}>${t('ตรวจเฉพาะเกณฑ์ข้อ ','Check criterion ')+c}</button><button class="btn pri" data-a="aiAll" ${dis}>${t('ตรวจทั้ง 8 เกณฑ์','Check all 8 criteria')}</button></div>${info}${busyNote()}${files.length?'':`<div class="note">${t('ยังไม่มีเอกสาร อัปโหลด SER และเอกสารแนบก่อน','Upload the SER and attachments first.')}</div>`}`}
const QGROUP={1:'นักศึกษาปี 4',2:'ที่ปรึกษาภาคอุตสาหกรรม (IAC)',3:'ผู้บริหารหลักสูตร',4:'ผู้บริหารหลักสูตร',5:'ผู้รับผิดชอบ Capstone',6:'อาจารย์ผู้สอน',7:'ครูปฏิบัติการ',8:'ผู้บริหารสถาบัน'};
function itemQuestion(text){const m=text.match(/^ตรวจดูว่า(?:ได้)?(?:มีการ)?(อธิบาย|แสดง|ระบุ|สรุป|วิเคราะห์|จัดทำ|ประเมิน)?(.*)$/);if(!m)return'ขอให้อธิบายเรื่อง '+text.slice(0,160);
  let core=m[2].trim();if(core.length>170)core=core.slice(0,170).replace(/\s\S*$/,'')+'…';return'ขอให้'+(m[1]||'อธิบาย')+core+(m[1]==='แสดง'?'':' และแสดงหลักฐานประกอบ')}
Object.assign(A,{
async aiRun(list){if(!S.canWrite)return;S.busy=t('กำลังตรวจหลักฐานในเอกสาร…','Checking evidence in the documents…');render(true);await new Promise(r=>setTimeout(r,30));
  try{const docs=await preparedDocs();if(!docs.length){toast(t('ยังไม่มีข้อความจากเอกสาร อัปโหลดไฟล์ก่อน','No document text yet; upload files first'))}else{const n=autoRunSync(docs,list);log('Auto Check เกณฑ์ข้อ '+list.join(', ')+' ได้ผล '+n+' ข้อ');toast(t('ตรวจแล้ว ','Checked ')+n+t(' ข้อ',' items'))}}
  catch(e){toast(e.message||String(e))}S.busy='';render(true)},
qGen(){const l=P('qs').list;let n=0;openIssues().filter(x=>x.f.r!=='S').forEach(x=>{const a=peek(x.c,x.it.id)?.ai;const q=(a&&a.q&&sumR(x.c,x.it.id,'ai')===x.f.r)?a.q:itemQuestion(x.it.t);if(l.some(o=>o.q===q))return;
    l.push({crit:x.c,group:QGROUP[x.c],issue:'ข้อ '+x.it.code+' ['+x.f.r+'] '+String(x.f.n||'').split('\n')[0].slice(0,160),q,ans:''});n++});Store.save('qs');toast(t('เพิ่ม ','Added ')+n+t(' คำถาม',' questions'));render(true)},
execGen(){const d=P('dec'),r=P('report'),m=S.meta,cnt=decCounts();if(!Object.keys(d).some(k=>/^c\d$/.test(k))){toast(t('กรอกผลรายเกณฑ์ในขั้น Decision Meeting ก่อน','Fill in the Decision Meeting step first'));return}
  const ok=[],bad={D:[],W:[],C:[],R:[]};for(let c=1;c<=8;c++){let any=false;for(const k of['D','W','C','R'])if(cnt[c][k]){bad[k].push(c+' ('+cnt[c][k]+' ประเด็น)');if(k!=='R')any=true}if(!any)ok.push(c)}
  const p1='ในช่วง'+(r.span||'การตรวจประเมิน')+' คณะผู้ตรวจประเมินฯ ซึ่งได้รับการแต่งตั้งจากคณะอนุกรรมการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์ (TABEE) สภาวิศวกร ประกอบด้วย '+[m.chair,m.pev1,m.pev2].filter(Boolean).join(' ')+' ได้ดำเนินการตรวจประเมิน'+progTitle()+' '+(m.inst||'')+' ตามเกณฑ์การรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์ทั้ง 8 เกณฑ์';
  const acts=(r.acts||defaultActs()).split('\n').filter(Boolean);const p2=acts.length?'คณะผู้ตรวจประเมินฯ ดำเนินกิจกรรมการตรวจประเมิน ได้แก่ '+acts.join(' ')+' โดยพิจารณาจากรายงานประเมินตนเอง เอกสารประกอบ และหลักฐานเชิงประจักษ์ที่ได้รับระหว่างการตรวจเยี่ยมสถาบันการศึกษา':'';
  const parts=[];if(ok.length)parts.push('การดำเนินงานของหลักสูตรเป็นไปตามเกณฑ์ข้อ '+ok.join(', '));if(bad.D.length)parts.push('พบข้อบกพร่องในเกณฑ์ข้อ '+bad.D.join(', '));if(bad.W.length)parts.push('พบข้อด้อยในเกณฑ์ข้อ '+bad.W.join(', '));if(bad.C.length)parts.push('พบข้อวิตกกังวลในเกณฑ์ข้อ '+bad.C.join(', '));if(bad.R.length)parts.push('มีข้อสังเกตในเกณฑ์ข้อ '+bad.R.join(', '));
  const p3='ผลการตรวจประเมินพบว่า '+parts.join(' ')+(bad.D.length||bad.W.length||bad.C.length?' ซึ่งหลักสูตรควรปรับปรุงแก้ไขให้เป็นไปตามเกณฑ์ของ TABEE':'');
  const p4=d.result?'คณะผู้ตรวจประเมินฯ จึงเสนอผลการรับรองมาตรฐานคุณภาพการศึกษาเป็น '+RESULTS[d.result].th+' ระยะเวลา '+(d.years||RESULTS[d.result].period)+(d.from?' นับตั้งแต่ปีการศึกษา '+d.from:''):'';
  r.exec=[p1,p2,p3,p4].filter(Boolean).join('\n\n');Store.save('report');log('ร่างบทสรุปสำหรับผู้บริหารจากข้อมูลในระบบ');render(true)}
});
/* ---------- warning signals: phrases and numbers worth a closer look (do not change ratings) ---------- */
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
const _autoRunSync=autoRunSync;
autoRunSync=function(docs,list){const n=_autoRunSync(docs,list);const fl=P('flags');fl.by=scanFlags(docs);fl.t=Date.now();Store.save('flags');return n};
function flagPanel(c){const l=(P('flags').by||{})[c]||[],o=(P('flags').by||{})[0]||[];if(!P('flags').t)return'';
  const row=(x,i,cc)=>`<div class="flag"><div><b>${esc(x.label)}</b> <span class="tiny muted">${esc(x.where)}</span><div class="small">${esc(x.snip)}</div></div><button class="btn sm" data-a="flagQ" data-c="${cc}" data-i="${i}">+ ${t('คำถาม','Question')}</button></div>`;
  return`<div class="card col"><div class="row"><h3>${t('สัญญาณให้ตรวจเพิ่มในเกณฑ์ข้อ ','Signals to look into, criterion ')+c}</h3><span class="chip">${l.length}</span><span class="sp"></span><span class="tiny muted">${t('ข้อความหรือตัวเลขที่ควรอ่านละเอียด ไม่มีผลต่อสีของข้อ','Phrases or numbers worth reading closely; they do not change any rating')}</span></div>
   ${l.length?l.map((x,i)=>row(x,i,c)).join(''):`<span class="small muted">${t('ไม่พบ','None found')}</span>`}
   ${o.length?`<details><summary class="small muted">${t('จากเอกสารที่ระบุเกณฑ์ไม่ได้','From documents with no criterion')} (${o.length})</summary>${o.map((x,i)=>row(x,i,0)).join('')}</details>`:''}</div>`}
Object.assign(A,{flagQ(d){const x=((P('flags').by||{})[d.c]||[])[+d.i];if(!x)return;const c=+d.c||S.crit;const q='ในเอกสารระบุว่า '+x.snip+' หลักสูตรวิเคราะห์สาเหตุและมีมาตรการอย่างไร';const l=P('qs').list;if(l.some(o=>o.q===q)){toast(t('มีคำถามนี้แล้ว','Already added'));return}
  l.push({crit:c,group:QGROUP[c]||GROUPS[0],issue:x.label+' ('+x.where+')',q,ans:''});Store.save('qs');toast(t('เพิ่มคำถามแล้ว','Question added'))}});
const _qGen=A.qGen;A.qGen=function(){const by=P('flags').by||{};let n=0;const l=P('qs').list;for(const c in by){if(+c===0)continue;by[c].forEach(x=>{const q='ในเอกสารระบุว่า '+x.snip+' หลักสูตรวิเคราะห์สาเหตุและมีมาตรการอย่างไร';if(!l.some(o=>o.q===q)){l.push({crit:+c,group:QGROUP[c],issue:x.label+' ('+x.where+')',q,ans:''});n++}})}if(n)Store.save('qs');_qGen()};

/* ---------- redesigned shell: top bar + phase rail ---------- */
const L_EXC=CDN+'exceljs/4.4.0/exceljs.min.js';
NAV.length=0;NAV.push(
['เตรียมการ','Set up',[['setup','หลักสูตรและคณะผู้ตรวจ','Program & team'],['files','เอกสารหลักสูตร (SER)','Program documents']]],
['ตรวจเอกสาร','Review documents',[['ai','Auto Check','Auto Check'],['pv1','Pre-visit 1','Pre-visit 1'],['req','ขอเอกสารเพิ่มเติม','Document request'],['pv2','Pre-visit 2','Pre-visit 2']]],
['เตรียมตรวจเยี่ยม','Prepare visit',[['plan','แผนตรวจเยี่ยม','Visit plan'],['appt','นัดตรวจเยี่ยมสถาบัน','Visit appointment'],['qs','ประเด็นและคำถาม','Issues & questions']]],
['ตรวจเยี่ยม','Site visit',[['d1','Visit Day 1','Visit Day 1'],['d2','Visit Day 2','Visit Day 2'],['ex','Exit Statement','Exit Statement']]],
['รายงานและตัดสิน','Report & decide',[['fact','Fact Finding Report','Fact Finding Report'],['dec','Decision Meeting','Decision Meeting'],['report','รายงานผลการตรวจรับรอง','Accreditation report'],['notify','แจ้งผลการรับรอง','Result notification']]]);
Object.assign(RT.N,{sh:'ไม่มีประเด็น',she:'No issue'});Object.assign(RT.R,{sh:'Remark'});Object.assign(RT.C,{sh:'Concern'});Object.assign(RT.W,{sh:'Weakness'});Object.assign(RT.D,{sh:'Deficiency'});Object.assign(RT.S,{sh:'Resolved'});
const IC={open:'<path d="M2 5.5V12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6.5a1 1 0 0 0-1-1H8L6.5 3.5H3a1 1 0 0 0-1 1z"/>',save:'<path d="M3 2.5h8l2 2V13a.5.5 0 0 1-.5.5h-9A.5.5 0 0 1 3 13z"/><path d="M5.5 2.5v3h4v-3M5.5 13.5v-4h5v4"/>',reset:'<path d="M3 8a5 5 0 1 0 1.6-3.7"/><path d="M2.5 2.5v3h3"/>',gen:'<path d="M4 1.5h5l3 3v10H4z"/><path d="M9 1.5v3h3M8 7v5M6 10l2 2 2-2"/>',swap:'<path d="M2 5h11l-2.5-2.5M14 11H3l2.5 2.5"/>'};
const ic=n=>`<svg class="ic" viewBox="0 0 16 16" aria-hidden="true">${IC[n]}</svg>`;
const brand=()=>`<button class="brand" data-a="go" data-v="home" title="${t('ภาพรวม','Overview')}"><span class="mk"><i></i><i></i><i></i><i></i></span>PEV Studio</button>`;
function initial(n){let s=String(n||'').replace(/[()\[\]]/g,'').trim();s=s.replace(/^(?:ผู้ตรวจประเมิน|ผู้ตรวจ|อนุกรรมการ|อาจารย์|ประธาน)\s+/,'');s=s.replace(/^(?:รศ\.|ผศ\.|ศ\.|ดร\.|อ\.|นาย|นางสาว|นาง|Dr\.|Prof\.|\s)+/g,'');return(s.match(/[\u0E01-\u0E2EA-Za-z]/)||['•'])[0]}
function renderNav(){const cur=NAV.find(g=>g[2].some(s=>s[0]===S.view));
  $('#nav').innerHTML=`<div class="rail">${NAV.map((g,i)=>{const dn=g[2].filter(s=>status(s[0]).c==='done').length,pt=g[2].some(s=>status(s[0]).c);return`<button class="ph ${g===cur?'on':''} ${dn===g[2].length?'done':pt?'part':''}" data-a="go" data-v="${(g[2].find(s=>status(s[0]).c!=='done')||g[2][0])[0]}"><em>${i+1}</em><span><b>${t(g[0],g[1])}</b><small>${dn}/${g[2].length}</small></span></button>`}).join('<i class="ln"></i>')}</div>`+
  (cur?`<div class="steps">${cur[2].map(i=>{const s=status(i[0]);return`<button class="navi ${S.view===i[0]?'on':''}" data-a="go" data-v="${i[0]}"><i class="${s.c}"></i>${t(i[1],i[2])}<b>${s.b}</b></button>`}).join('')}</div>`:'')}
function renderTop(){const ms=members();if(!ms.find(m=>m.id===S.who))S.who=ms[0].id;const w=S.canWrite?'':'disabled';
  $('#top').innerHTML=`${brand()}<div class="pname">${esc(progTitle())}<small>${esc(S.meta.inst||'')}${S.meta.visit?' · '+esc(S.meta.visit):''}</small></div>
  <label class="who"><span class="av">${esc(initial(whoName(S.who)))}</span><select id="whoSel" aria-label="${t('ผู้ประเมิน','Evaluator')}">${ms.map(m=>`<option value="${m.id}" ${m.id===S.who?'selected':''}>${esc(m.name)}</option>`).join('')}</select></label>
  <span class="tiny muted mono" id="savest" title="${esc(S.sync)}"></span>
  <div class="tools"><button class="btn sm ghost" data-a="go" data-v="home">${t('ภาพรวม','Overview')}</button><button class="btn sm" data-a="pickOpen" ${w}>${ic('open')}Open</button><button class="btn sm" data-a="saveProj">${ic('save')}Save</button><button class="btn sm warn" data-a="resetAsk" ${w}>${ic('reset')}Reset</button><button class="btn sm pri" data-a="go" data-v="tools">${ic('gen')}${t('สร้างเอกสาร','Generate')}</button>
  <button class="btn sm ghost" data-a="go" data-v="compare">${t('เปรียบเทียบ','Compare')}</button><button class="btn sm ghost" data-a="switch" title="${t('เปลี่ยนหลักสูตร','Switch program')}">${ic('swap')}</button><button class="btn sm ghost" data-a="lang">${LANG==='th'?'EN':'ไทย'}</button></div>`;setSaving()}
function renderLanding(){$('#nav').innerHTML='';$('#top').innerHTML=`${brand()}<span class="sp"></span><span class="tiny muted mono">${esc(S.sync)}</span><div class="tools"><button class="btn sm" data-a="pickOpen" ${S.canWrite?'':'disabled'}>${ic('open')}Open</button><button class="btn sm ghost" data-a="lang">${LANG==='th'?'EN':'ไทย'}</button></div>`;
  const ps=S.programs;$('#view').innerHTML=`<div class="wrap" style="max-width:860px">
  <div class="col" style="gap:6px;padding:18px 0 6px"><span class="eyebrow">TABEE · Program Evaluation Workbook</span><h1 style="font-size:2.3rem;max-width:18ch">${t('ตรวจหนึ่งหลักสูตร ตั้งแต่ SER จนถึงผลการรับรอง','One program, from the SER to the accreditation result')}</h1><p class="muted" style="margin:0;max-width:62ch">${t('8 เกณฑ์ 79 ข้อตาม PEV Worksheet ลงผลได้ 6 รอบ คือ Auto Check, Pre-visit 1, Pre-visit 2, Visit Day 1, Day 2 และ Exit Statement แล้วออกเอกสารตามแบบของ TABEE','8 criteria and 79 items from the PEV Worksheet, rated across six rounds, then issued as TABEE documents.')}</p>${legend()}</div>
  <div class="card col"><h2>${t('หลักสูตรที่กำลังตรวจ','Programs under evaluation')}</h2>${ps===null?`<p class="muted"><span class="spin"></span> ${t('กำลังโหลด…','Loading…')}</p>`:ps.length?ps.map(p=>`<button class="btn" style="justify-content:space-between;padding:11px 14px;white-space:normal;text-align:left" data-a="open" data-id="${p.id}"><span><b>${esc([p.prog,p.field&&'สาขาวิชา'+p.field].filter(Boolean).join(' ')||'(ไม่มีชื่อ)')}</b><br><span class="small muted">${esc(p.inst||'')}${p.visit?' · '+esc(p.visit):''}</span></span><span class="mono">→</span></button>`).join(''):`<p class="muted" style="margin:0">${t('ยังไม่มีหลักสูตรในระบบ สร้างรายการแรกด้านล่าง หรือกด Open เพื่อเปิดไฟล์ที่ Save ไว้','No program yet. Create one below, or use Open to load a saved file.')}</p>`}</div>
  <div class="card col"><h2>${t('เริ่มตรวจหลักสูตรใหม่','Start a new evaluation')}</h2><div class="grid2">
   <label class="f">${t('ชื่อสถาบันการศึกษา','Institution')}<input type="text" id="n_inst"></label><label class="f">${t('ชื่อหลักสูตร','Program')}<input type="text" id="n_prog" value="หลักสูตรวิศวกรรมศาสตรบัณฑิต"></label><label class="f">${t('สาขาวิชา','Field')}<input type="text" id="n_field"></label></div>
   <div class="row"><button class="btn pri" data-a="create" ${S.canWrite?'':'disabled'}>${t('สร้างรายการตรวจประเมิน','Create evaluation')}</button><button class="btn" data-a="demo" ${S.canWrite?'':'disabled'}>${t('ลองด้วยข้อมูลตัวอย่าง (สมมติ)','Try with fictional sample data')}</button></div></div></div>`}
function setSaving(){const n=Object.keys(Store.dirty).length+Object.values(Store.writing).filter(Boolean).length;const e=$('#savest');if(e)e.textContent=n?t('กำลังบันทึก…','saving…'):(S.pid?t('บันทึกอัตโนมัติแล้ว','autosaved'):'')}

/* ---------- redesigned evaluation pieces ---------- */
function critTabs(stage){return`<div class="tabs">${CHECKLIST.map(c=>{const s=stage?critStat(c.n,stage):null;return`<button class="tab ${S.crit===c.n?'on':''}" data-a="crit" data-c="${c.n}"><b><em>${c.n}</em>${esc(t(c.th,c.en))}</b>${s?`<span>${chip(s.worst)}${s.rated}/${s.n}</span>`:''}</button>`}).join('')}</div>`}
function rbtn(a,c,id,stage,cur,withS){return`<div class="seg" role="group">${['N','R','C','W','D'].concat(withS?['S']:[]).map(r=>`<button class="r-${r} ${cur===r?'on':''}" title="${esc(t(RT[r].th,RT[r].en))}" data-a="${a}" data-c="${c}" data-id="${id}" data-st="${stage}" data-r="${r}" ${S.canWrite?'':'disabled'}>${LANG==='en'&&RT[r].she?RT[r].she:RT[r].sh}</button>`).join('')}</div>`}
function itemCard(c,it,stage){const d=peek(c,it.id)||{},cur=sumR(c,it.id,stage);
  let h=`<article class="item"><div class="ix r-${cur||'0'}" title="${cur?esc(t(RT[cur].th,RT[cur].en)):t('ยังไม่ประเมิน','Not rated')}"><span>${it.code}</span><b>${cur?RT[cur].ch:'·'}</b></div><div class="ib"><p class="qt">${esc(it.t)}</p>`;
  const pri=STAGES.slice(0,SIDX[stage]).map(s=>{const r=sumR(c,it.id,s.k);if(!r)return'';const n=sumN(c,it.id,s.k),a=s.k==='ai'?d.ai:null;const more=a?[a.ev&&t('อ้างอิง: ','Evidence: ')+a.ev,a.req&&t('ควรขอเพิ่ม: ','Request: ')+a.req,a.q&&t('คำถาม: ','Question: ')+a.q].filter(Boolean).join('\n'):'';return`<details><summary>${chip(r)}${s.sh}${(n||more)?' +':''}</summary><div class="pb">${esc([n,more].filter(Boolean).join('\n'))}</div></details>`}).join('');
  if(pri)h+=`<div class="prior">${pri}</div>`;
  if(stage==='ai'){h+=(d.ai?aiBlock(d.ai):`<div class="small muted">${t('ยังไม่มีผล Auto Check','No Auto Check result yet')}</div>`)+ruleBox(c,it);return h+'</div></article>'}
  const st=d[stage]||{ev:{}},ms=members(),ids=ms.map(m=>m.id).filter(id=>id===S.who||(st.ev?.[id]&&(st.ev[id].r||st.ev[id].n)));
  for(const id of ids){const m=ms.find(x=>x.id===id),e=st.ev?.[id]||{},hd=`<span class="av">${esc(initial(m.name))}</span><b>${esc(m.name)}</b><small>${esc(m.role)}${e.t?' · '+fmtDT(e.t):''}</small><span class="sp"></span>`;
    if(id===S.who&&S.canWrite)h+=`<div class="ev"><div class="evh">${hd}${rbtn('rate',c,it.id,stage,e.r,stage!=='pv1')}</div><textarea id="n_${it.id}_${stage}" data-b="c${c}:items.${it.id}.${stage}.ev.${id}.n" data-ts="1" placeholder="${t('หมายเหตุ / ข้อคิดเห็น','Notes / comments')}">${esc(e.n||'')}</textarea></div>`;
    else h+=`<div class="ev"><div class="evh">${hd}${chip(e.r,1)}</div>${e.n?`<div class="ro">${esc(e.n)}</div>`:''}</div>`}
  if(evList(st).length>=2)h+=`<div class="sum"><div class="evh"><b>${t('สรุปของทีม','Team summary')}</b><small>${st.sr?t('ทีมกำหนดเอง','set by team'):t('อัตโนมัติ: ผลที่หนักที่สุด','auto: most severe')}</small><span class="sp"></span>${rbtn('rateSum',c,it.id,stage,st.sr||autoR(st),stage!=='pv1')}</div><textarea id="s_${it.id}_${stage}" data-b="c${c}:items.${it.id}.${stage}.sn" placeholder="${t('สรุปความคิดเห็นของทีม','Team summary comment')}">${esc(st.sn||'')}</textarea><div><button class="btn sm" data-a="mergeSum" data-c="${c}" data-id="${it.id}" data-st="${stage}">${t('รวมความเห็นของทุกคนลงช่องสรุป','Merge everyone\'s notes into the summary')}</button></div></div>`;
  return h+'</div></article>'}

/* ---------- overview + generate centre ---------- */
VIEWS.home=function(){const m=S.meta,last=[...STAGES].reverse().find(s=>stageStat(s.k).rated)||STAGES[0],ls=stageStat(last.k);
  const nxt=NAV.flatMap(g=>g[2]).find(i=>status(i[0]).c!=='done');
  return`<div class="card hero"><div class="col" style="gap:8px"><span class="eyebrow">${esc(m.inst||t('ยังไม่ระบุสถาบัน','Institution not set'))}${m.visit?' · '+esc(m.visit):''}</span><h1>${esc(progTitle())}</h1><div class="small muted">${members().map(x=>esc(x.name)).join(' · ')}</div>${nxt?`<div><button class="btn pri" data-a="go" data-v="${nxt[0]}">${t('ทำต่อ','Continue')}: ${t(nxt[1],nxt[2])} →</button></div>`:''}</div>
   <div class="col" style="gap:8px"><div class="row" style="align-items:baseline"><span class="big">${ls.rated}<span class="muted" style="font-size:1.3rem">/${ls.n}</span></span><span class="small muted">${t('ข้อที่ประเมินแล้วในรอบ','items rated in')} ${t(last.th,last.en)}</span></div>
   <div class="kpi">${['R','C','W','D'].map(r=>`<div style="--k:var(--r${r})"><b>${ls.cnt[r]||0}</b><span>${RT[r].sh}</span></div>`).join('')}</div></div></div>
  <div class="card col"><div class="row"><h2>${t('ผลตามเกณฑ์ในแต่ละรอบ','Results by criterion and round')}</h2><span class="sp"></span><span class="small muted">${t('แต่ละช่องคือผลที่หนักที่สุดของเกณฑ์ในรอบนั้น กดเพื่อเปิด','Each cell is the most severe rating in that round; click to open')}</span></div>
   <div class="scroll"><div class="heat"><div></div>${STAGES.map(s=>`<div class="hh">${s.sh}</div>`).join('')}${CHECKLIST.map(c=>`<div class="hl"><em>${c.n}</em>${esc(t(c.th,c.en))}</div>`+STAGES.map(s=>{const x=critStat(c.n,s.k);return`<button class="hc r-${x.worst||'0'}" data-a="cell" data-v="${s.k}" data-c="${c.n}">${x.worst?RT[x.worst].ch:'·'}<small>${x.rated}/${x.n}</small></button>`}).join('')).join('')}</div></div>${legend()}</div>
  <div class="card col"><h2>${t('ความเคลื่อนไหวล่าสุด','Recent activity')}</h2>${P('log').e.slice(0,6).map(e=>`<div class="small"><span class="muted mono tiny">${fmtDT(e.t)}</span> ${esc(e.by)} — ${esc(e.m)}</div>`).join('')||`<span class="muted small">${t('ยังไม่มีบันทึก','Nothing yet')}</span>`}</div>`};
const GEN=[['xlsx','x','XLSX','แบบรายการตรวจประเมินมาตรฐานคุณภาพการศึกษา (PEV Worksheet)','หน้า Cover และแผ่น Criterion 1–8 ตามแบบ Checklist for Program Evaluation พร้อมสัญลักษณ์และความเห็นทุกรอบ'],
 ['req','w','DOCX','แบบรายการขอรับคำอธิบายและเอกสารประกอบเพิ่มเติมจากสถาบันการศึกษา','ออกหลัง Pre-visit 1'],
 ['appt','w','DOCX','แบบขอนัดวันตรวจเยี่ยมสถาบันการศึกษา','รายการสัมภาษณ์ ข้อกำหนดการนำเสนอ Capstone และเอกสารที่ขอให้เตรียม'],
 ['plan','w','DOCX','แผนการตรวจเยี่ยม','เอกสารทำงานของคณะผู้ตรวจ (ไม่มีแบบของ TABEE)'],
 ['qs','w','DOCX','ประเด็นที่จะตรวจสอบและคำถามสัมภาษณ์','เอกสารทำงานของคณะผู้ตรวจ พร้อมบันทึกคำตอบ'],
 ['fact','w','DOCX','แบบรายการรายงานคำแถลงข้อเท็จจริงจากการตรวจเยี่ยมสถาบันการศึกษา','Fact Finding Report'],
 ['pptx','p','PPTX','Program Decision','สไลด์สรุปสำหรับ Decision Meeting หนึ่งแผ่นต่อเกณฑ์'],
 ['report','w','DOCX','แบบรายงานผลการตรวจรับรองมาตรฐานคุณภาพการศึกษา (แบบ 1)','พร้อมเอกสารผนวก'],
 ['notify','w','DOCX','หนังสือแจ้งผลการรับรอง','ร่างของระบบ (ไม่มีแบบของ TABEE ในไฟล์ที่ได้รับ)']];
VIEWS.tools=function(){return`<div class="card col"><div class="row"><div class="col" style="gap:4px"><span class="eyebrow">Generate</span><h1>${t('สร้างเอกสารตามแบบของ TABEE','Generate TABEE documents')}</h1></div><span class="sp"></span><button class="btn pri" data-a="genAll" ${S.busy?'disabled':''}>${ic('gen')}${t('สร้างทุกฉบับเป็นไฟล์ .zip','Generate all as .zip')}</button></div>
   <p class="muted small" style="margin:0;max-width:75ch">${t('เอกสารทุกฉบับสร้างจากข้อมูลล่าสุดในระบบ ไฟล์ Word ใช้ TH Sarabun New 16 pt','Every document is built from the latest data. Word files use TH Sarabun New 16 pt.')}</p>${busyNote()}
   <div>${GEN.map(g=>`<div class="gen"><span class="ext ${g[1]}">${g[2]}</span><div><b>${g[3]}</b><div class="small muted">${g[4]}</div></div><button class="btn" data-a="${g[0]==='xlsx'||g[0]==='pptx'?g[0]:'docx'}" data-d="${g[0]}">${ic('gen')}${t('สร้างไฟล์','Generate')}</button></div>`).join('')}</div></div>
  <div class="card col"><h2>${t('ไฟล์งาน','Project file')}</h2><p class="muted small" style="margin:0;max-width:75ch">${t('Save เก็บงานทั้งหมดของหลักสูตรนี้เป็นไฟล์เดียว รวมข้อความจากเอกสารที่อัปโหลด Open เปิดไฟล์นั้นเป็นรายการใหม่โดยไม่ทับงานเดิม Reset ล้างผลประเมินและเอกสารของหลักสูตรนี้','Save writes everything for this program to one file, including uploaded document text. Open loads such a file as a new entry without overwriting anything. Reset clears this program\'s ratings and documents.')}</p>
   <div class="row"><button class="btn" data-a="pickOpen" ${S.canWrite?'':'disabled'}>${ic('open')}Open</button><button class="btn" data-a="saveProj">${ic('save')}Save</button><button class="btn warn" data-a="resetAsk" ${S.canWrite?'':'disabled'}>${ic('reset')}Reset</button></div></div>
  <div class="card col"><h2>${t('บันทึกการทำงาน','Activity log')}</h2><div class="scroll"><table class="t">${P('log').e.map(e=>`<tr><td class="tiny mono" style="white-space:nowrap">${fmtDT(e.t)}</td><td class="small">${esc(e.by)}</td><td>${esc(e.m)}</td></tr>`).join('')||`<tr><td class="muted">${t('ยังไม่มีบันทึก','Nothing yet')}</td></tr>`}</table></div></div>`};

/* ---------- Excel in the PEV Worksheet layout ---------- */
const SYM=[['D','Deficiency (มีข้อบกพร่อง)\nผู้ตรวจประเมินพิจารณาว่าหลักฐานเอกสารและการจัดการหลักสูตรในหัวข้อที่พิจารณา ไม่สอดคล้องกับข้อกำหนดของ TABEE และไม่ผ่านการตรวจประเมิน ทางหลักสูตรจะต้องชี้แจงดำเนินการแก้ไข และแสดงหลักฐานเพื่อปลดสัญลักษณ์นี้'],['W','Weakness (มีข้อด้อย)\nผู้ตรวจประเมินพิจารณาว่าหลักฐานเอกสารและการจัดการหลักสูตรในหัวข้อที่พิจารณายังมีความคลาดเคลื่อนไม่สอดคล้องกับข้อกำหนดบางส่วนของ TABEE และมีผลกระทบต่อความสำเร็จและเป้าหมายผลลัพธ์การศึกษา สมควรได้รับคำชี้แจงจากหลักสูตร หรือให้ปรับปรุง แก้ไข'],['C','Concern (มีข้อกังวล)\nผู้ตรวจประเมินพิจารณาว่าหลักฐานเอกสารและการจัดการหลักสูตรในหัวข้อที่พิจารณาในช่วงที่ตรวจประเมิน สอดคล้องกับข้อกำหนดของ TABEE แต่ยังมีการจัดการบางส่วนที่อาจมีผลกระทบต่อความสำเร็จและเป้าหมายผลลัพธ์การศึกษา และหากไม่ได้การพิจารณาแก้ไขปรับปรุงในอนาคต ข้อวิตกกังวลนี้จะมีสภาพเป็นข้อด้อยต่อไปได้'],['R','Remark (มีข้อสังเกต)\nผู้ตรวจประเมินพิจารณาอยากให้ข้อสังเกตที่พบเห็นแก่หลักสูตรพิจารณา แต่หลักสูตรไม่จำเป็นต้องปฏิบัติตาม'],['S','Issue has been resolved and satisfied (มีคำอธิบายที่พอเพียง)\nผู้ตรวจประเมินพิจารณาว่าหลักฐานเอกสารและการจัดการหลักสูตรในหัวข้อที่พิจารณาที่ได้สอบถามและรับการชี้แจงจากข้อมูลเพิ่มเติมนั้นพอเพียงที่จะได้มีการแก้ไขสัญลักษณ์เดิมที่ให้ไว้ก่อนหน้านี้ จนสามารถผ่านเกณฑ์ได้ในหัวข้อนี้ (ใช้สัญลักษณ์นี้ในกรณีที่หัวข้อที่ประเมินได้รับสัญลักษณ์ D W หรือ C และได้รับข้อมูลเพิ่มเติมจนสามารถตัดสินให้ผ่านเกณฑ์)']];
async function makeXlsx(){await lib(L_EXC);const wb=new ExcelJS.Workbook(),m=S.meta,F={name:'TH Sarabun New',size:14},bd={style:'thin',color:{argb:'FF7F7F7F'}},B={top:bd,left:bd,bottom:bd,right:bd};
  const fill=c=>({type:'pattern',pattern:'solid',fgColor:{argb:'FF'+c}}),COL={N:['2C9A58','FFFFFF'],R:['E8BD0C','000000'],C:['B0611C','FFFFFF'],W:['2460C8','FFFFFF'],D:['D02C2C','FFFFFF'],S:['E1F2E7','1F7A44']};
  const sty=(cell,o={})=>{cell.font={...F,bold:!!o.b,color:o.fc?{argb:'FF'+o.fc}:undefined};cell.alignment={wrapText:true,vertical:o.v||'top',horizontal:o.h||'left'};cell.border=B;if(o.bg)cell.fill=fill(o.bg)};
  const dr=k=>{const x=m.dates?.[k];return x?.from?'\n('+fmtD(x.from)+(x.to&&x.to!==x.from?' – '+fmtD(x.to):'')+')':'\n(date)'};
  let ws=wb.addWorksheet('Cover');ws.columns=[{width:46},{width:22},{width:22},{width:22},{width:22},{width:22}];
  const cov=[['แบบรายการตรวจประเมินมาตรฐานคุณภาพการศึกษา \n(Checklist for Program Evaluation)'],['ชื่อสถาบันการศึกษา\n(Institution Name)',m.inst],['ชื่อหลักสูตร\n(Program Name)',progTitle()],['ชื่ออนุกรรมการประสานงานฯ\n(Designated TABEE Subcommittee for Program Visit Name)',m.coord],['ชื่อประธานคณะผู้ตรวจประเมินฯ\n(Program Evaluator Team Leader Name)',m.chair],['ชื่อผู้ตรวจประเมินฯ 1\n(1st Program Evaluator Name)',m.pev1],['ชื่อผู้ตรวจประเมินฯ 2\n(2nd Program Evaluator Name)',m.pev2],['ชื่อเจ้าหน้าที่\n(Coordinating Staff Name)',m.staff],['วันที่ตรวจเยี่ยมสถาบัน\n(Program Visit Date)',m.visit]];
  cov.forEach((r,i)=>{const row=ws.getRow(i+1);row.getCell(1).value=r[0];row.height=i?40:48;if(i===0){ws.mergeCells(1,1,1,6);sty(row.getCell(1),{b:1,h:'center',v:'middle',bg:'D9D9D9'})}else{row.getCell(2).value=r[1]||'';ws.mergeCells(i+1,2,i+1,6);sty(row.getCell(1),{b:1,v:'middle',bg:'F2F2F2'});for(let c=2;c<=6;c++)sty(row.getCell(c),{v:'middle'})}});
  ws.getCell('A11').value='สัญลักษณ์ที่ใช้ในการตรวจประเมิน \n(Symbols used for program evaluation)';ws.mergeCells('A11:F11');sty(ws.getCell('A11'),{b:1,bg:'D9D9D9'});ws.getRow(11).height=40;
  ws.getCell('A12').value='สัญลักษณ์ (Symbol)';ws.getCell('B12').value='คำอธิบาย (Description)';ws.mergeCells('B12:F12');sty(ws.getCell('A12'),{b:1,h:'center',bg:'F2F2F2'});for(let c=2;c<=6;c++)sty(ws.getRow(12).getCell(c),{b:1,bg:'F2F2F2'});
  SYM.forEach((s,i)=>{const r=13+i,row=ws.getRow(r);row.getCell(1).value=s[0];row.getCell(2).value=s[1];ws.mergeCells(r,2,r,6);row.height=96;sty(row.getCell(1),{b:1,h:'center',v:'middle',bg:COL[s[0]][0],fc:COL[s[0]][1]});for(let c=2;c<=6;c++)sty(row.getCell(c))});
  const heads=['Pre-visit No.1'+dr('pv1'),'Pre-visit No.2'+dr('pv2'),'Day 1'+dr('d1'),'Day 2'+dr('d2'),'Exit Statement'+dr('ex'),'ร่างรายงาน (PEV)'+dr('post'),'หลังกลั่นกรอง','ผลสุดท้าย\n(Decision Meeting)','Comments Pre-visit 1','Comments Pre-visit 2','Comments Visit','Comments Exit','Comments ร่างรายงาน (PEV)','ความเห็นคณะกรรมการกลั่นกรอง / PEV','ความเห็นคณะอนุกรรมการ / PEV','Action ที่เลือก','Attachment','Auto Check','Comments Auto Check'],rk=['pv1','pv2','d1','d2','ex','post','scr','fin'],NC=heads.length+1;
  CHECKLIST.forEach(c=>{ws=wb.addWorksheet('Criterion '+c.n);ws.columns=[{width:62},...Array(8).fill({width:13}),...Array(7).fill({width:40}),{width:40},{width:16},{width:11},{width:42}];
    ws.getCell('A1').value='Checklist for Program Evaluation';ws.getCell('A1').font={...F,bold:true,size:16};
    ['D = Deficiency','W = Weakness','C = Concern','R = Remark','S = Issue has been resolved and satisfied'].forEach((x,i)=>{const cl=ws.getCell(3+i,1);cl.value=x;sty(cl,{b:1})});
    heads.forEach((x,i)=>{ws.getCell(3,i+2).value=x;ws.mergeCells(3,i+2,7,i+2);for(let r=3;r<=7;r++)sty(ws.getCell(r,i+2),{b:1,h:'center',v:'middle',bg:i<8?'DDEBF7':i<15?'FFF2CC':'EDEDED'})});
    let r=8;ws.getCell(r,1).value='เกณฑ์ข้อ '+c.n+' '+c.th+' \n(Criterion '+c.n+' '+c.en+')';for(let k=1;k<=NC;k++)sty(ws.getCell(r,k),{b:1,bg:'BFBFBF'});ws.getRow(r).height=40;r++;
    c.groups.forEach(g=>{ws.getCell(r,1).value=g.n+'. '+g.h;for(let k=1;k<=NC;k++)sty(ws.getCell(r,k),{b:1,bg:'E7E6E6'});r++;
      g.items.forEach(it=>{const put=(col,v,o)=>{const cl=ws.getCell(r,col);cl.value=v||'';sty(cl,o)};put(1,(g.items.length>1?it.code+' ':'- ')+it.t);
        const rc=(col,k)=>{const x=sumR(c.n,it.id,k);put(col,x==='N'?'✓':x,x?{b:1,h:'center',v:'middle',bg:COL[x][0],fc:COL[x][1]}:{h:'center'})};
        rk.forEach((k,i)=>rc(2+i,k));put(10,sumN(c.n,it.id,'pv1'));put(11,sumN(c.n,it.id,'pv2'));put(12,[sumN(c.n,it.id,'d1'),sumN(c.n,it.id,'d2')].filter(Boolean).join('\n'));put(13,sumN(c.n,it.id,'ex'));put(14,sumN(c.n,it.id,'post'));put(15,sumN(c.n,it.id,'scr'));put(16,sumN(c.n,it.id,'fin'));
        put(17,typeof actText==='function'?actText(c.n,it.id):'');put(18,'');rc(19,'ai');const a=peek(c.n,it.id)?.ai;put(20,a?[a.n,a.ev&&'อ้างอิง: '+a.ev].filter(Boolean).join('\n'):'');r++})});
    ws.views=[{state:'frozen',xSplit:1,ySplit:7}]});
  return wb.xlsx.writeBuffer()}
async function makePptx(){await lib(L_PPT);const p=new PptxGenJS();p.layout='LAYOUT_WIDE';const d=P('dec'),cnt=decCounts(),ff='TH Sarabun New',hd=x=>({text:x,options:{bold:true,fill:{color:'E7E6E6'}}}),bdr={type:'solid',pt:1,color:'777777'};
  let s=p.addSlide();s.addText('รายงานผลการตรวจรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์',{x:0.6,y:1.2,w:12.1,h:1,fontSize:32,bold:true,fontFace:ff});s.addText('ชื่อหลักสูตร: '+progTitle()+'\nชื่อสถาบันการศึกษา: '+(S.meta.inst||''),{x:0.6,y:2.4,w:12.1,h:1.2,fontSize:22,fontFace:ff});
  s.addText('โดย\n'+[[S.meta.chair,'หัวหน้าคณะผู้ตรวจประเมิน'],[S.meta.pev1,'ผู้ตรวจประเมิน'],[S.meta.pev2,'ผู้ตรวจประเมิน'],[S.meta.coord,'อนุกรรมการประสานงาน']].filter(x=>x[0]).map(x=>x[0]+'\t\t'+x[1]).join('\n'),{x:0.6,y:3.9,w:12.1,h:2.4,fontSize:20,fontFace:ff});
  CHECKLIST.forEach(c=>{const x=d['c'+c.n]||{};s=p.addSlide();s.addText('เกณฑ์ข้อ '+c.n+' '+c.th,{x:0.5,y:0.3,w:12.3,h:0.7,fontSize:28,bold:true,fontFace:ff});
    s.addTable([[hd(''),hd('คำอธิบาย')],...[['ข้อเท็จจริงที่พบ',x.fact],['ข้อบกพร่อง',x.D],['ข้อด้อย',x.W],['ข้อวิตกกังวล',x.C],['ข้อสังเกต',x.R],['ข้อเสนอให้ปรับปรุง',x.rec]].map(r=>[hd(r[0]),{text:r[1]||'ไม่มี'}])],{x:0.5,y:1.1,w:12.3,colW:[2.6,9.7],fontSize:16,fontFace:ff,border:bdr,autoPage:true,autoPageRepeatHeader:true})});
  s=p.addSlide();s.addText('ข้อเสนอผลการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์',{x:0.5,y:0.3,w:12.3,h:0.7,fontSize:28,bold:true,fontFace:ff});s.addText('ผลการรับรอง : '+(d.result?RESULTS[d.result].th:'')+' ระยะเวลา '+(d.years||(d.result?RESULTS[d.result].period:''))+(d.from?'\nปีที่รับรอง : นับตั้งแต่ปีการศึกษา '+d.from:''),{x:0.5,y:1.1,w:12.3,h:1.1,fontSize:22,fontFace:ff});
  s.addTable([[hd('')].concat([1,2,3,4,5,6,7,8].map(n=>hd('Criteria '+n))),...[['D','ข้อบกพร่อง'],['W','ข้อด้อย'],['C','ข้อวิตกกังวล'],['R','ข้อสังเกต']].map(r=>[hd(r[1])].concat([1,2,3,4,5,6,7,8].map(n=>({text:cnt[n][r[0]]?String(cnt[n][r[0]]):'-',options:{align:'center'}}))))],{x:0.5,y:2.5,w:12.3,fontSize:18,fontFace:ff,border:bdr});
  return p.write({outputType:'blob'})}
const busy=async(msg,fn)=>{S.busy=msg;render(true);try{await fn()}catch(e){toast(e.message||String(e))}S.busy='';render(true)};
Object.assign(A,{
xlsx(){busy(t('กำลังสร้าง PEV Worksheet…','Building the PEV Worksheet…'),async()=>saveFile('PEV-Worksheet Ver.3 - '+fileBase()+'.xlsx',await makeXlsx()))},
pptx(){busy(t('กำลังสร้างสไลด์ Program Decision…','Building Program Decision slides…'),async()=>saveFile('Program Decision - '+fileBase()+'.pptx',await makePptx()))},
genAll(){busy(t('กำลังสร้างเอกสารทุกฉบับ…','Building every document…'),async()=>{await lib(L_ZIP);const z=new JSZip();let i=1;const nn=()=>String(i++).padStart(2,'0')+' ';
  z.file(nn()+'PEV-Worksheet Ver.3.xlsx',await makeXlsx());for(const k of['req','appt','plan','qs','fact']){const d=DOCS[k]();z.file(nn()+d.file+'.docx',await makeDocx(d.blocks))}
  z.file(nn()+'Program Decision.pptx',await makePptx());for(const k of['report','notify']){const d=DOCS[k]();z.file(nn()+d.file+'.docx',await makeDocx(d.blocks))}
  await saveFile('เอกสาร TABEE - '+fileBase()+'.zip',await z.generateAsync({type:'blob',compression:'DEFLATE'}))})},
pickOpen(){$('#openIn').value='';$('#openIn').click()},
async saveProj(){if(!S.pid)return;const texts={};for(const f of P('files').list)texts[f.id]=await Store.getText(f);
  if(await saveFile('PEV Studio - '+fileBase()+'.json',JSON.stringify({app:'pev-studio',v:2,savedAt:Date.now(),meta:S.meta,parts:S.parts,texts})))toast(t('บันทึกไฟล์งานแล้ว','Project file saved'))},
resetAsk(){if(!S.pid)return;$('#modal').innerHTML=`<div class="mc" style="max-width:520px"><h2>${t('Reset หลักสูตรนี้','Reset this program')}</h2><p style="margin:0">${t('ล้างผลประเมินทุกรอบ ผล Auto Check เอกสารที่อัปโหลด จดหมาย แผน คำถาม และรายงานของ','This clears every round of ratings, Auto Check results, uploaded documents, letters, plans, questions and reports for')} <b>${esc(progTitle())}</b> ${t('ข้อมูลหลักสูตรและรายชื่อคณะผู้ตรวจยังอยู่ การล้างนี้ย้อนกลับไม่ได้','Program details and the team list are kept. This cannot be undone.')}</p><div class="note">${t('ถ้ายังต้องใช้ข้อมูลเดิม กด Save เก็บเป็นไฟล์ก่อน','If you may need the current data, Save it to a file first.')}</div><div class="row"><button class="btn" data-a="saveProj">${ic('save')}Save</button><span class="sp"></span><button class="btn" data-a="closeModal">${t('ยกเลิก','Cancel')}</button><button class="btn pri" data-a="resetDo">${t('ล้างข้อมูล','Reset now')}</button></div></div>`;$('#modal').classList.add('on')},
async resetDo(){A.closeModal();const files=[...P('files').list];const keys=new Set([...Object.keys(S.parts),'c1','c2','c3','c4','c5','c6','c7','c8']);keys.forEach(k=>{delete S.parts[k];P(k);Store.save(k)});delete S.meta.dates;Store.save('meta');log('Reset ข้อมูลการประเมิน');S.view='home';render();for(const f of files)await Store.delText(f);toast(t('ล้างข้อมูลแล้ว','Data cleared'))}
});
async function openProject(file){try{const o=JSON.parse(await file.text());if(!o||typeof o.meta!=='object'||typeof o.parts!=='object')throw 0;const pid=uid();await Store.open(pid);S.meta=o.meta;S.parts=o.parts;Store.save('meta');Object.keys(S.parts).forEach(k=>Store.save(k));
    for(const f of P('files').list){const tx=o.texts?.[f.id];if(tx)f.chunks=await Store.putText(f.id,tx)}Store.save('files');log('เปิดไฟล์งาน '+file.name);S.view='home';render();toast(t('เปิดไฟล์งานแล้ว','Project opened'))}
  catch(e){toast(t('ไฟล์นี้ไม่ใช่ไฟล์งานของ PEV Studio','This is not a PEV Studio project file'))}}
document.addEventListener('change',e=>{if(e.target.id==='openIn'&&e.target.files[0])openProject(e.target.files[0])});

/* ---------- HMI rev.3: dark step rail, light work area, rating colours only ---------- */
const chipS=(r,cls='sm')=>`<span class="chip ${cls} r-${r||'0'}" title="${r?esc(t(RT[r].th,RT[r].en)):t('ยังไม่ลงผล','Not rated')}">${r?RT[r].ch:'·'}</span>`;
const avCls=i=>['','a2','a3','a4'][i]||'';
const memIdx=id=>Math.max(0,members().findIndex(m=>m.id===id));
const phaseOf=v=>NAV.find(g=>g[2].some(s=>s[0]===v));
const stepLabel=v=>{const g=phaseOf(v);const s=g&&g[2].find(x=>x[0]===v);return s?t(s[1],s[2]):''};
const MARK='<span class="mk" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>';
const RNAME=r=>LANG==='en'?(RT[r].she||RT[r].en):RT[r].sh;
function railStep(v,label,st){return`<button class="step ${S.view===v?'on':''}" data-a="go" data-v="${v}"${S.view===v?' aria-current="page"':''}><i class="${st.c}"></i><span>${label}</span><b>${st.b}</b></button>`}
function renderNav(){
  $('#nav').innerHTML=`<button class="brand" data-a="go" data-v="home">${MARK}<span><b>PEV Studio</b><small>TABEE · PROGRAM EVALUATION</small></span></button>
  <button class="prog" data-a="switch"><span>${t('หลักสูตรที่กำลังตรวจ ▾','Program under review ▾')}</span><b>${esc(S.meta.field||S.meta.prog||t('ยังไม่ระบุ','Not set'))}</b><small>${esc(S.meta.inst||'')}</small></button>
  <nav aria-label="${t('ขั้นตอนการตรวจ','Evaluation steps')}" style="display:contents">${NAV.map((g,i)=>`<div class="phase"><div class="phase-h"><em>0${i+1}</em>${t(g[0],g[1])}</div>${g[2].map(s=>railStep(s[0],t(s[1],s[2]),status(s[0]))).join('')}</div>`).join('')}</nav>
  <div class="rail-foot">${railStep('home',t('ภาพรวม','Overview'),{c:'',b:''})}${railStep('cal',t('ปฏิทินการรับรอง','Accreditation calendar'),{c:'',b:''})}${railStep('compare',t('เปรียบเทียบทุกรอบ','Compare rounds'),{c:'',b:''})}${railStep('tools',t('สร้างเอกสาร','Generate documents'),{c:'',b:''})}</div>`}
function patchNav(){document.querySelectorAll('#nav .step[data-v]').forEach(b=>{const v=b.dataset.v;if(['home','compare','tools','cal'].includes(v))return;const s=status(v);b.querySelector('i').className=s.c;b.querySelector('b').textContent=s.b})}
function renderTop(){const ms=members();if(!ms.find(m=>m.id===S.who))S.who=ms[0].id;const w=S.canWrite?'':'disabled';const g=phaseOf(S.view);
  const crumb=S.view==='home'?`<b>${t('ภาพรวม','Overview')}</b>`:`<a href="#home" data-a="go" data-v="home" style="color:inherit">${t('ภาพรวม','Overview')}</a><span aria-hidden="true">/</span>${g?`<span>${t(g[0],g[1])}</span><span aria-hidden="true">/</span><b>${stepLabel(S.view)}</b>`:`<b>${S.view==='tools'?t('สร้างเอกสาร','Generate documents'):S.view==='cal'?t('ปฏิทินการรับรอง','Accreditation calendar'):t('เปรียบเทียบทุกรอบ','Compare rounds')}</b>`}`;
  $('#top').innerHTML=`<div class="crumb">${crumb}</div>
  <label class="who"><span class="wl">${t('ลงผลในนาม','Recording as')}</span><span class="pill"><span class="av ${avCls(memIdx(S.who))}">${esc(initial(whoName(S.who)))}</span><select id="whoSel" aria-label="${t('ผู้ประเมิน','Evaluator')}">${ms.map(m=>`<option value="${m.id}" ${m.id===S.who?'selected':''}>${esc(m.name)}</option>`).join('')}</select></span></label>
  <span class="tiny muted mono" id="savest" title="${esc(S.sync)}"></span>
  <div class="tb" role="toolbar" aria-label="${t('ไฟล์งาน','Project file')}"><button class="btn" data-a="pickOpen" aria-label="Open" ${w}>${ic('open')}<span class="lbl">Open</span></button><button class="btn" data-a="saveProj" aria-label="Save">${ic('save')}<span class="lbl">Save</span></button><button class="btn" data-a="resetAsk" aria-label="Reset" ${w}>${ic('reset')}<span class="lbl">Reset</span></button><button class="btn pri" data-a="go" data-v="tools" aria-label="${t('สร้างเอกสาร','Generate')}">${ic('gen')}<span class="lbl">${t('สร้างเอกสาร','Generate')}</span></button><button class="btn ghost" data-a="lang" aria-label="${LANG==='th'?'Switch to English':'เปลี่ยนเป็นภาษาไทย'}">${LANG==='th'?'EN':'ไทย'}</button></div>`;setSaving()}
function renderLanding(){$('#nav').innerHTML=`<div class="brand">${MARK}<span><b>PEV Studio</b><small>TABEE · PROGRAM EVALUATION</small></span></div>`;
  $('#top').innerHTML=`<div class="crumb"><b>${t('หลักสูตรทั้งหมด','All programs')}</b></div><span class="tiny muted mono">${esc(S.sync)}</span><div class="tb"><button class="btn" data-a="pickOpen" ${S.canWrite?'':'disabled'}>${ic('open')}Open</button><button class="btn ghost" data-a="lang">${LANG==='th'?'EN':'ไทย'}</button></div>`;
  const ps=S.programs;$('#view').innerHTML=`<div class="wrap" style="max-width:880px">
  <div class="col" style="gap:8px;padding:12px 0 4px"><span class="eyebrow">TABEE · PEV WORKSHEET VER.3</span><h1 style="font-size:36px;max-width:20ch">${t('ตรวจหนึ่งหลักสูตร ตั้งแต่ SER จนถึงผลการรับรอง','One program, from the SER to the accreditation result')}</h1><p class="muted" style="margin:0;max-width:64ch">${t('8 เกณฑ์ 79 ข้อ ลงผลได้ 6 รอบ คือ Auto Check, Pre-visit 1, Pre-visit 2, Visit Day 1, Day 2 และ Exit Statement แล้วออกเอกสารตามแบบของ TABEE','8 criteria, 79 items, six rounds of ratings, then TABEE documents.')}</p>${legend()}</div>
  <section class="card col"><h2>${t('หลักสูตรที่กำลังตรวจ','Programs under evaluation')}</h2>${ps===null?`<p class="muted"><span class="spin"></span> ${t('กำลังโหลด…','Loading…')}</p>`:ps.length?ps.map(p=>`<button class="issue" style="grid-template-columns:minmax(0,1fr) auto;padding:12px 4px" data-a="open" data-id="${p.id}"><span><b>${esc([p.prog,p.field&&'สาขาวิชา'+p.field].filter(Boolean).join(' ')||'(ไม่มีชื่อ)')}</b><br><span class="small muted">${esc(p.inst||'')}${p.visit?' · '+esc(p.visit):''}</span></span><span class="mono">→</span></button>`).join(''):`<p class="muted" style="margin:0">${t('ยังไม่มีหลักสูตร สร้างรายการแรกด้านล่าง หรือกด Open เพื่อเปิดไฟล์ที่ Save ไว้','No program yet. Create one below, or Open a saved file.')}</p>`}</section>
  <section class="card col"><h2>${t('เริ่มตรวจหลักสูตรใหม่','Start a new evaluation')}</h2><div class="grid2">
   <label class="f">${t('ชื่อสถาบันการศึกษา','Institution')}<input type="text" id="n_inst"></label><label class="f">${t('ชื่อหลักสูตร','Program')}<input type="text" id="n_prog" value="หลักสูตรวิศวกรรมศาสตรบัณฑิต"></label><label class="f">${t('สาขาวิชา','Field')}<input type="text" id="n_field"></label></div>
   <div class="row"><button class="btn pri" data-a="create" ${S.canWrite?'':'disabled'}>${t('สร้างรายการตรวจประเมิน','Create evaluation')}</button><button class="btn" data-a="demo" ${S.canWrite?'':'disabled'}>${t('ลองด้วยข้อมูลตัวอย่าง (สมมติ)','Try with fictional sample data')}</button></div></section></div>`}

/* ---------- overview ---------- */
function curRound(){const r=[...STAGES].reverse().find(s=>stageStat(s.k).rated);return r||STAGES[0]}
function nextStep(){return NAV.flatMap(g=>g[2]).find(s=>status(s[0]).c!=='done')}
VIEWS.home=function(){const m=S.meta,cr=curRound(),cs=stageStat(cr.k),ci=SIDX[cr.k],nx=nextStep();const ms=members();
  const issues=openIssues().filter(x=>x.f.r!=='S').sort((a,b)=>RT[b.f.r].sev-RT[a.f.r].sev||a.c-b.c);
  const d=m.dates||{},rg=k=>d[k]?.from?fmtD(d[k].from)+(d[k].to&&d[k].to!==d[k].from?' – '+fmtD(d[k].to):''):'';
  const sch=[['ai','Auto Check',P('c1').items&&peek(1,ALL[0].it.id)?.ai?fmtD(new Date(peek(1,ALL[0].it.id).ai.t).toISOString().slice(0,10)):''],['pv1','Pre-visit 1',rg('pv1')],['req',t('ส่งจดหมายขอเอกสารเพิ่มเติม','Document request sent'),fmtD(P('req').date)],['pv2','Pre-visit 2',rg('pv2')],['appt',t('นัดตรวจเยี่ยมสถาบัน','Visit appointment'),P('appt').date||m.visit||''],['ex','Exit Statement',rg('ex')],['resp',t('หลักสูตรชี้แจงหลัง FFR','Program response'),fmtD(P('resp').received)],['dec','Decision Meeting',fmtD(P('dec').mtg)],['notify',t('แจ้งผลการรับรอง','Result notified'),fmtD(P('notify').date)]];
  return`<section class="hero"><div class="col" style="gap:6px;flex:1 1 420px"><span class="eyebrow">${esc(m.inst||t('ยังไม่ระบุสถาบัน','Institution not set'))}${m.visit?' · '+t('ตรวจเยี่ยม ','visit ')+esc(m.visit):''}</span><h1>${esc(m.field||progTitle())}</h1>
     <div class="team">${ms.map((x,i)=>`<span><span class="av ${avCls(i)}">${esc(initial(x.name))}</span>${esc(x.name)}${i===0?' ('+t('ประธาน','lead')+')':''}</span>`).join('')}</div></div>
   ${nx?`<button class="next" data-a="go" data-v="${nx[0]}"><span>${t('ทำต่อ','CONTINUE')} · ${t(phaseOf(nx[0])[0],phaseOf(nx[0])[1])}</span><b>${t(nx[1],nx[2])} →</b><small>${status(nx[0]).b?t('ลงผลแล้ว ','rated ')+status(nx[0]).b:t('ยังไม่เริ่ม','not started')}</small></button>`:''}</section>
  <section class="kpis" aria-label="${t('สรุปตัวเลข','Summary')}"><div class="kpi"><span><i></i>${t('ข้อที่ลงผลแล้ว','Items rated')}</span><b>${cs.rated}</b><small>${t('จาก','of')} ${cs.n} · ${t(cr.th,cr.en)}</small></div>${['R','C','W','D'].map(r=>`<div class="kpi" style="--k:var(--r${r})"><span><i></i>${RT[r].sh}</span><b>${cs.cnt[r]||0}</b><small>${t(RT[r].th,RT[r].en).replace(/\s*\(.*\)/,'')}</small></div>`).join('')}</section>
  <section class="card col"><div class="row" style="justify-content:space-between;align-items:baseline"><h2>${t('ผลรายเกณฑ์ในแต่ละรอบ','Results by criterion and round')}</h2><span class="small muted">${t('ช่องแสดงผลที่หนักที่สุดของเกณฑ์ในรอบนั้น กดเพื่อเปิดรายการตรวจ','Each cell is the most severe rating; click to open')}</span></div>
   <div class="scroll"><div class="heat"><span></span>${STAGES.map((s,i)=>`<span class="hh ${i===ci?'cur':''}">${s.sh}</span>`).join('')}${CHECKLIST.map(c=>`<button class="hl" data-a="cell" data-v="${cr.k}" data-c="${c.n}"><em>${c.n}</em>${esc(t(c.th,c.en))}</button>`+STAGES.map((s,i)=>{const x=critStat(c.n,s.k);return`<button class="hc r-${x.worst||'0'} ${i===ci?'cur':''}" data-a="cell" data-v="${s.k}" data-c="${c.n}" aria-label="${t('เกณฑ์','Criterion')} ${c.n} ${s.sh}: ${x.worst?RNAME(x.worst):t('ยังไม่ลงผล','not rated')}">${x.worst?RT[x.worst].ch:'·'}<small>${x.rated}/${x.n}</small></button>`}).join('')).join('')}</div></div>${legend()}</section>
  <div class="split"><section class="card col" style="gap:2px"><div class="row" style="justify-content:space-between;align-items:baseline;margin-bottom:6px"><h2>${t('ประเด็นที่ยังเปิดอยู่','Open issues')}</h2><span class="small muted">${issues.length} ${t('ประเด็น','issues')}</span></div>
     ${issues.slice(0,7).map(x=>`<button class="issue" data-a="openItem" data-v="${x.f.st}" data-c="${x.c}" data-id="${x.it.id}">${chipS(x.f.r,'lg')}<span class="mono">${t('เกณฑ์','Crit.')} ${x.c}<br>${t('ข้อ','Item')} ${x.it.code}</span><p>${esc(String(x.f.n||x.it.t).split('\n')[0].slice(0,170))}</p></button>`).join('')||`<p class="muted small" style="margin:0">${t('ยังไม่มีประเด็น','No open issues')}</p>`}</section>
   <section class="card col" style="gap:2px"><h2 style="margin-bottom:8px">${t('กำหนดการ','Schedule')}</h2>${sch.map(s=>{const st=status(s[0]).c,now=nx&&nx[0]===s[0];return`<div class="sched ${st==='done'?'done':now?'now':''}"><i class="${st==='done'?'done':now?'now':''}"></i><span>${s[1]}</span><span class="mono">${esc(s[2]||'—')}</span></div>`}).join('')}</section></div>`};

/* ---------- review rounds ---------- */
const STAGE_DESC={ai:['ค้นหลักฐานที่ PEV Worksheet ต้องการจาก SER และเอกสารแนบ แล้วให้สีตามสัดส่วนหลักฐานที่พบ บอกได้ว่ามีหรือไม่มีหลักฐาน ไม่ได้ตัดสินคุณภาพ คณะผู้ตรวจพิจารณาต่อใน Pre-visit 1','Finds the evidence each item needs and rates by the share found. It says whether evidence exists, not whether it is good.'],
  pv1:['ตรวจรายงานประเมินตนเองรอบแรก เทียบกับผล Auto Check ได้ในแต่ละข้อ','First review of the SER, with Auto Check results beside each item.'],
  pv2:['ตรวจซ้ำหลังได้รับเอกสารเพิ่มเติม เทียบกับ Auto Check และ Pre-visit 1 ได้ในแต่ละข้อ','Second review after the additional documents arrive.'],
  d1:['บันทึกผลระหว่างตรวจเยี่ยมวันที่ 1','Ratings during visit day 1.'],d2:['บันทึกผลระหว่างตรวจเยี่ยมวันที่ 2','Ratings during visit day 2.'],ex:['ผลที่แถลงในการประชุมปิดการตรวจเยี่ยม','Ratings stated at the exit meeting.']};
function critNav(stage){const isAI=stage==='ai';return`<nav class="cnav ${isAI?'auto':''}" aria-label="${t('เลือกเกณฑ์','Choose criterion')}">${CHECKLIST.map(c=>{const s=critStat(c.n,stage),on=S.crit===c.n;
  if(isAI){const tot=s.n,ok=s.cnt.N||0,iss=s.rated-ok;return`<button class="ccard ${on?'on':''}" data-a="crit" data-c="${c.n}" ${on?'aria-current="true"':''}><span class="t"><em>${c.n}</em><b>${esc(t(c.th,c.en))}</b></span><span class="dist" aria-hidden="true">${['N','R','C','W','D'].filter(r=>s.cnt[r]).map(r=>`<i style="flex:${s.cnt[r]} 1 0;background:var(--r${r})"></i>`).join('')}</span><span class="m">${s.rated?(iss?iss+t(' ข้อควรดู · ',' to check · ')+ok+'/'+tot+t(' พบครบ',' complete'):t('พบครบ ','complete ')+ok+'/'+tot):t('ยังไม่ตรวจ','not checked')}</span></button>`}
  return`<button class="ccard ${on?'on':''}" data-a="crit" data-c="${c.n}" ${on?'aria-current="true"':''}><span class="t"><em>${c.n}</em><b>${esc(t(c.th,c.en))}</b></span><span class="m">${chipS(s.worst)}${s.rated}/${s.n}</span></button>`}).join('')}</nav>`}
function critTabs(stage){return critNav(stage||'ex')}
function priorChips(c,it,stage){const d=peek(c,it.id)||{};return STAGES.slice(0,SIDX[stage]).map(s=>{const r=sumR(c,it.id,s.k);if(!r)return'';let n=sumN(c,it.id,s.k);if(s.k==='ai'&&d.ai?.algo)n=String(d.ai.n||'').split('\n')[0];
  const first=String(n||'').split('\n')[0],short=first.length>60?first.slice(0,60)+'…':first;
  return n?`<details class="pd"><summary class="pchip">${chipS(r)}<span class="mono">${s.sh}</span>${short?'· '+esc(short):''}</summary><div class="pb">${esc(n)}</div></details>`:`<span class="pchip">${chipS(r)}<span class="mono">${s.sh}</span></span>`}).join('')}
function aiBlock(a){if(!a.algo)return`<div class="ro" style="white-space:pre-wrap;font-size:14px">${esc(a.n)}</div>${a.ev?`<div class="small muted">${t('อ้างอิง','Evidence')}: ${esc(a.ev)}</div>`:''}${a.req?`<div class="reqline"><b>${t('ควรขอเพิ่ม','Request')}</b>${esc(a.req)}</div>`:''}<div class="tiny muted">Claude · ${fmtDT(a.t)}</div>`;
  const ls=String(a.n||'').split('\n'),warns=ls.filter(l=>l.startsWith('! ')).map(l=>l.slice(2)),rows=ls.slice(1).filter(l=>/^[✓✗○]/.test(l));
  const cls=c=>c==='✓'?'ok':c==='✗'?'no':'op';
  return`${warns.map(w=>`<div class="warn">${ic('warn')}<span>${esc(w)}</span></div>`).join('')}<ul class="lines">${rows.map(l=>`<li><span class="${cls(l[0])}" aria-hidden="true">${l[0]}</span><span>${esc(l.slice(1).trim())}</span></li>`).join('')}</ul>
   ${a.ev?`<details class="rules"><summary>${t('ข้อความที่พบในเอกสาร','Matched text')}</summary><div class="evd" style="margin-top:6px">${esc(a.ev)}</div></details>`:''}${a.req?`<div class="reqline"><b>${t('ร่างคำขอเอกสาร','Draft request')}</b>${esc(a.req)}</div>`:''}<div class="tiny muted">${t('อัลกอริทึม','Algorithm')} · ${fmtDT(a.t)}</div>`}
function rbtn(a,c,id,stage,cur,withS){return`<div class="seg rseg" role="radiogroup" aria-label="${t('ผลของข้อนี้','Rating')}">${['N','R','C','W','D'].concat(withS?['S']:[]).map(r=>`<button class="r-${r} ${cur===r?'on':''}" role="radio" aria-checked="${cur===r}" title="${esc(t(RT[r].th,RT[r].en))}" data-a="${a}" data-c="${c}" data-id="${id}" data-st="${stage}" data-r="${r}" ${S.canWrite?'':'disabled'}><span class="dot" aria-hidden="true" style="${r==='S'?'box-shadow:inset 0 0 0 1.5px var(--rN)':'background:var(--r'+r+')'}"></span>${RNAME(r)}</button>`).join('')}</div>`}
function itemCard(c,it,stage){const d=peek(c,it.id)||{},cur=sumR(c,it.id,stage),sel=S.sel===it.id;
  let h=`<article class="item ${sel?'sel':''}" id="it_${it.id}"><button class="tab r-${cur||'0'}" data-a="selItem" data-id="${it.id}" aria-label="${t('ข้อ','Item')} ${it.code}: ${cur?RNAME(cur):t('ยังไม่ลงผล','not rated')}"><span>${it.code}</span><b>${cur?RT[cur].ch:'·'}</b>${stage==='ai'&&d.ai?.algo?`<small>${Math.round((d.ai.score||0)*100)}%</small>`:''}</button><div class="ib"><p class="qt">${esc(it.t)}</p>`;
  const pr=priorChips(c,it,stage);if(pr)h+=`<div class="prior">${pr}</div>`;
  if(stage==='ai'){h+=(d.ai?aiBlock(d.ai):`<div class="small muted">${t('ยังไม่มีผล Auto Check','No Auto Check result yet')}</div>`)+ruleBox(c,it);return h+'</div></article>'}
  const st=d[stage]||{ev:{}},ms=members(),ids=ms.map(m=>m.id).filter(id=>id===S.who||(st.ev?.[id]&&(st.ev[id].r||st.ev[id].n)));
  for(const id of ids){const m=ms.find(x=>x.id===id),e=st.ev?.[id]||{},i=memIdx(id),hd=`<span class="av ${avCls(i)}">${esc(initial(m.name))}</span><b>${esc(m.name)}</b><small>${esc(m.role)}${e.t?' · '+fmtDT(e.t):''}</small><span class="sp"></span>`;
    if(id===S.who&&S.canWrite)h+=`<div class="ev"><div class="evh">${hd}${rbtn('rate',c,it.id,stage,e.r,stage!=='pv1')}</div><label class="f">${t('หมายเหตุของท่าน','Your note')}<textarea id="n_${it.id}_${stage}" rows="2" data-b="c${c}:items.${it.id}.${stage}.ev.${id}.n" data-ts="1">${esc(e.n||'')}</textarea></label></div>`;
    else h+=`<div class="ev"><div class="evh">${hd}${e.r?`<span class="chip r-${e.r}" style="padding:0 10px;height:26px;font-family:var(--f-body);font-size:12px">${RNAME(e.r)}</span>`:''}</div>${e.n?`<p class="ro">${esc(e.n)}</p>`:''}</div>`}
  if(evList(st).length>=2)h+=`<div class="sum"><div class="evh"><b>${t('สรุปของทีม','Team summary')}</b><small>${st.sr?t('ทีมกำหนดเอง','set by team'):t('อัตโนมัติจากผลที่หนักที่สุด · แก้ได้','auto: most severe · editable')}</small><span class="sp"></span>${rbtn('rateSum',c,it.id,stage,st.sr||autoR(st),stage!=='pv1')}</div><textarea id="s_${it.id}_${stage}" rows="2" data-b="c${c}:items.${it.id}.${stage}.sn" placeholder="${t('สรุปความคิดเห็นของทีม','Team summary comment')}">${esc(st.sn||'')}</textarea><div><button class="btn sm" data-a="mergeSum" data-c="${c}" data-id="${it.id}" data-st="${stage}">${t('รวมความเห็นของทุกคนลงช่องสรุป','Merge everyone\'s notes')}</button></div></div>`;
  return h+'</div></article>'}
function sidePanel(c,stage){const its=ALL.filter(x=>x.c===c);let x=its.find(a=>a.it.id===S.sel);if(!x)x=its.find(a=>{const r=sumR(c,a.it.id,stage)||finalR(c,a.it.id).r;return r&&RT[r].sev>0})||its[0];const it=x.it,a=peek(c,it.id)?.ai;
  const rows=(P('req').rows||{})['c'+c]||[];
  return`<section class="card" aria-label="${t('ข้อที่เลือก','Selected item')}"><div class="col" style="gap:2px"><span class="eyebrow">${t('ข้อที่เลือก · เกณฑ์ ','SELECTED · CRITERION ')}${c} ${t('ข้อ','ITEM')} ${it.code}</span><h2 style="font-size:19px">${t('หลักฐานและที่มา','Evidence and history')}</h2></div>
   <div class="col" style="gap:6px"><span class="kv">${t('ผลแต่ละรอบ','Each round')}</span><div class="rounds">${STAGES.slice(0,SIDX[stage]+1).map(s=>`<div>${chipS(sumR(c,it.id,s.k),'lg')}<span class="mono">${s.sh}</span></div>`).join('')}</div></div>
   ${a?`<div class="col" style="gap:6px"><span class="kv">${t('Auto Check พบในเอกสาร','Auto Check found')}</span>${a.ev?String(a.ev).split('\n').map(l=>`<div class="evd">${esc(l)}</div>`).join(''):`<span class="small muted">${esc(String(a.n||'').split('\n')[0])}</span>`}${a.req?`<div class="reqline" style="border:0;padding:0"><b>${t('ควรขอเพิ่ม','Request')}</b>${esc(a.req)}</div>`:''}</div>`:''}
   <div class="col" style="gap:6px"><span class="kv">${t('รายการขอเอกสารของเกณฑ์นี้','Requests for this criterion')}</span>${rows.filter(Boolean).slice(0,4).map(r=>`<div class="small">• ${esc(r)}</div>`).join('')||`<span class="small muted">${t('ยังไม่มี','None yet')}</span>`}</div>
   <div class="col" style="gap:8px;padding-top:12px;border-top:1px solid var(--line2)"><span class="kv">${t('ส่งต่อประเด็นนี้','Carry this forward')}</span><div class="row" style="gap:6px"><button class="btn sm" data-a="itemQ" data-c="${c}" data-id="${it.id}">+ ${t('คำถามสัมภาษณ์','Interview question')}</button><button class="btn sm" data-a="itemPlan" data-c="${c}" data-id="${it.id}">+ ${t('แผนตรวจเยี่ยม','Visit plan')}</button></div></div></section>`}
function autoHead(c){return''}
function flagPanel(c){const by=P('flags').by||{},l=by[c]||[],o=by[0]||[];
  const row=(x,i,cc)=>`<div class="flag"><b>${esc(x.label)}</b><p>${esc(x.snip)}</p><div class="row"><span class="tiny mono muted">${esc(x.where)}</span><button class="btn sm" data-a="flagQ" data-c="${cc}" data-i="${i}">+ ${t('คำถามสัมภาษณ์','Question')}</button></div></div>`;
  return`<section class="card" style="gap:2px"><div class="row" style="justify-content:space-between;align-items:baseline"><h2 style="font-size:19px">${t('สัญญาณให้ตรวจเพิ่ม','Signals to check')}</h2><span class="tiny mono muted">${t('เกณฑ์','Crit.')} ${c} · ${l.length}</span></div><p class="small muted" style="margin:0 0 6px">${t('ข้อความหรือตัวเลขที่ควรอ่านละเอียด ไม่มีผลต่อสีของข้อ','Phrases or numbers worth a closer read; they do not change ratings')}</p>
   ${P('flags').t?(l.length?l.map((x,i)=>row(x,i,c)).join(''):`<span class="small muted">${t('ไม่พบในเกณฑ์นี้','None in this criterion')}</span>`):`<span class="small muted">${t('จะแสดงหลังรัน Auto Check','Shown after running Auto Check')}</span>`}
   ${o.length?`<details class="rules" style="margin-top:8px"><summary>${t('จากเอกสารที่ระบุเกณฑ์ไม่ได้','From documents without criteria')} (${o.length})</summary>${o.map((x,i)=>row(x,i,0)).join('')}</details>`:''}</section>`}
function evalView(stage){const sd=STAGES[SIDX[stage]],c=S.crit,cr=CHECKLIST[c-1],ss=stageStat(stage),isAI=stage==='ai',g=phaseOf(stage);
  const d=S.meta.dates?.[stage],range=d?.from?fmtD(d.from)+(d.to&&d.to!==d.from?' – '+fmtD(d.to):''):'',dis=S.busy||!S.canWrite?'disabled':'';
  const files=P('files').list,chars=files.reduce((a,f)=>a+(f.chars||0),0);
  let h=`<section class="phead"><div class="col"><span class="eyebrow">${g?t(g[0],g[1]).toUpperCase():''}${range?' · '+range:''}</span><h1>${t(sd.th,sd.en)}</h1><p>${t(...STAGE_DESC[stage])}</p>${isAI?`<span class="private">${ic('lock')}${typeof aiCheckCrit==='function'?t('ปุ่มตรวจหลักตรวจในเบราว์เซอร์นี้ ไม่ส่งข้อมูลออก','The main check runs in this browser and sends nothing out'):t('ตรวจในเบราว์เซอร์นี้ ไม่ส่งข้อมูลของหลักสูตรออกไปที่ใด','Runs in this browser; program data goes nowhere')}</span>`:''}</div>
   ${isAI?`<div class="row" style="gap:8px">${typeof aiCheckCrit==='function'?`<button class="btn" data-a="aiClaude" data-c="${c}" ${dis} title="${t('ส่งข้อความบางส่วนของเอกสารให้ Claude อ่าน','Sends excerpts to Claude')}">${t('ตรวจข้อ ','Criterion ')+c+t(' ด้วย Claude',' with Claude')}</button>`:''}<button class="btn" data-a="aiOne" ${dis}>${t('ตรวจเฉพาะเกณฑ์ข้อ ','Check criterion ')+c}</button><button class="btn pri lg" data-a="aiAll" ${dis}>${t('ตรวจทั้ง 8 เกณฑ์','Check all 8 criteria')}</button></div>`
    :`<div class="prog-bar"><div class="t"><span>${t('ลงผลแล้ว','Rated')}</span><b>${ss.rated} / ${ss.n}</b></div><div class="bar" aria-hidden="true"><i style="width:${Math.round(100*ss.rated/ss.n)}%"></i></div></div>`}</section>`;
  h+=busyNote();
  if(isAI){h+=`<section class="docs" aria-label="${t('เอกสารที่ใช้ตรวจ','Documents checked')}">${files.map(f=>{const ext=(f.name.split('.').pop()||'').toUpperCase(),cls={DOCX:'w',PDF:'d',XLSX:'x',PPTX:'p'}[ext]||'';const inf=(S.autoInfo||[]).find(x=>x.name===f.name);
      return`<div class="docc"><span class="ext ${cls}">${esc(ext.slice(0,4))}</span><div style="min-width:0"><b>${esc(f.name)}</b><small>${esc(f.kind||'')}${inf?' · '+(inf.crit.length?t('พบหัวข้อเกณฑ์ข้อ ','criteria ')+inf.crit.join(', '):t('ไม่มีหัวข้อเกณฑ์','no criterion headings')):''} · ${(f.chars||0).toLocaleString()} ${t('ตัวอักษร','chars')}</small></div></div>`}).join('')||`<div class="note" style="flex:1">${t('ยังไม่มีเอกสาร อัปโหลด SER และเอกสารแนบก่อน','Upload the SER and attachments first.')} <button class="btn sm" data-a="go" data-v="files">${t('ไปที่เอกสารหลักสูตร','Go to documents')}</button></div>`}</section>`;
    h+=`<div class="legend"><span>${chipS('N')} ${t('พบครบ','all found')}</span><span>${chipS('R')} ${t('ครบ ขาดหลักฐานเสริม','optional missing')}</span><span>${chipS('C')} ≥ ${Math.round(SCORING.C*100)}%</span><span>${chipS('W')} ≥ ${Math.round(SCORING.W*100)}%</span><span>${chipS('D')} &lt; ${Math.round(SCORING.W*100)}%</span><span class="tiny">${t('ไม่มีหัวข้อของข้อนั้น นับไม่เกิน','No heading for the item caps at')} ${Math.round(SCORING.NEAR*100)}% · ${t('ไม่มีส่วนของเกณฑ์ นับไม่เกิน','no section for the criterion caps at')} ${Math.round(SCORING.OUTSIDE*100)}%</span></div>`}
  else h+=`<div class="grid2" style="max-width:560px">${inp('meta','dates.'+stage+'.from',t('เริ่มรอบ','Round starts'),'date')}${inp('meta','dates.'+stage+'.to',t('สิ้นสุดรอบ','Round ends'),'date')}</div>`;
  h+=critNav(stage);
  const fl=[['all',t('ทั้งหมด','All')],['issues',t('มีประเด็น','With issues')],['todo',t('ยังไม่ลงผล','Not rated')]].concat(isAI?[]:[['changed',t('เปลี่ยนจากรอบก่อน','Changed')]]);
  h+=`<div class="row"><div class="seg" role="group" aria-label="${t('ตัวกรอง','Filter')}">${fl.map(f=>`<button class="${S.filter===f[0]?'on':''}" aria-pressed="${S.filter===f[0]}" data-a="filter" data-f="${f[0]}">${f[1]}</button>`).join('')}</div><span class="sp"></span>${isAI?'':`<button class="btn" data-a="copyPrev" data-st="${stage}" ${S.canWrite?'':'disabled'}>${t('ข้อที่ว่าง = ยืนยันตามรอบก่อน','Blank items = previous round')}</button><button class="btn" data-a="bulkN" data-st="${stage}" ${S.canWrite?'':'disabled'}>${t('ข้อที่ว่าง = ไม่มีประเด็น','Blank items = no issue')}</button>`}<button class="btn ${S.cmp?'pri':''}" data-a="cmp" aria-pressed="${!!S.cmp}">${t('ตารางเทียบทุกรอบ','Compare table')}</button></div>`;
  if(S.cmp)return h+`<h2>${esc(critName(c))}</h2>`+compareTable(c,stage);
  let body='';for(const gr of cr.groups){const its=gr.items.filter(it=>passFilter(c,it.id,stage));if(!its.length)continue;body+=`<div class="gh"><em>${gr.n}.</em>${esc(gr.h)}</div>`+its.map(it=>itemCard(c,it,stage)).join('')}
  if(!body)body=`<p class="muted">${t('ไม่มีรายการตามตัวกรองนี้','No items match this filter')}</p>`;
  return h+`<div class="two"><div class="main"><h2 style="margin:4px 0 0">${esc(critName(c))}</h2>${body}</div><aside class="side">${isAI?flagPanel(c):sidePanel(c,stage)}</aside></div>`}
VIEWS.compare=function(){return`<section class="phead"><div class="col"><span class="eyebrow">${t('เครื่องมือ','TOOLS')}</span><h1>${t('เปรียบเทียบทุกรอบ','Compare all rounds')}</h1><p>${t('Auto Check, Pre-visit 1, Pre-visit 2, Visit Day 1, Day 2 และ Exit Statement วางเทียบกันรายข้อ','All six rounds side by side for each item.')}</p></div></section>${legend()}${critNav('ex')}<h2>${esc(critName(S.crit))}</h2>${compareTable(S.crit,'fin')}`};

/* ---------- generate ---------- */
function genStatus(k){const p=S.parts,any=STAGES.some(s=>stageStat(s.k).rated);
  switch(k){case'xlsx':return any?['ok',t('ผลและความเห็นทุกรอบที่ลงไว้','All rounds recorded so far')]:['wait',t('ยังไม่มีผลประเมิน','No ratings yet')];
    case'req':{const n=Object.values(p.req?.rows||{}).flat().filter(Boolean).length;return n?['ok',n+t(' รายการ',' requests')+(p.req?.date?' · '+fmtD(p.req.date):'')]:['part',t('ยังไม่มีรายการขอเอกสาร','No requests yet')]}
    case'appt':return p.appt?.date?(p.appt?.cap?['ok',esc(p.appt.date)]:['part',t('ยังไม่ระบุโครงงาน Capstone ที่ให้นำเสนอ','Capstone projects not chosen')]):['part',t('ยังไม่ระบุวันที่นัดตรวจเยี่ยม','Visit date not set')];
    case'plan':{const l=p.plan?.items||[];const no=l.filter(x=>!x.owner).length;return l.length?(no?['part',l.length+t(' รายการ · ยังไม่ระบุผู้รับผิดชอบ ',' rows · no owner on ')+no]:['ok',l.length+t(' รายการ',' rows')]):['part',t('ยังไม่มีรายการ','No rows yet')]}
    case'qs':{const n=p.qs?.list?.length||0;return n?['ok',n+t(' คำถาม',' questions')]:['part',t('ยังไม่มีคำถาม','No questions yet')]}
    case'fact':return Object.values(p.fact||{}).some(o=>Object.values(o||{}).some(Boolean))?['ok',t('มีคำแถลงข้อเท็จจริงแล้ว','Statements drafted')]:['wait',t('สร้างได้หลัง Exit Statement','After the exit statement')];
    case'pptx':return p.dec?.result?['ok',RESULTS[p.dec.result].th]:['wait',t('หนึ่งแผ่นต่อเกณฑ์ และหน้าข้อเสนอผลการรับรอง','One slide per criterion plus the proposed result')];
    case'report':return p.dec?.result?(p.report?.date?['ok',fmtD(p.report.date)]:['part',t('ยังไม่ระบุวันที่รายงาน','Report date not set')]):['wait',t('ใช้ผลจาก Decision Meeting','Needs the Decision Meeting result')];
    case'notify':return p.notify?.date?['ok',fmtD(p.notify.date)]:['wait',t('ร่างของระบบ ยังไม่มีแบบของ TABEE','System draft; no TABEE form')]}
  return['wait','']}
const GENG=[['ระหว่างตรวจเอกสาร','During document review',[['xlsx','x','XLSX','แบบรายการตรวจประเมิน (PEV Worksheet Ver.3)'],['req','w','DOCX','แบบรายการขอรับคำอธิบายและเอกสารประกอบเพิ่มเติม']]],
 ['เตรียมตรวจเยี่ยม','Preparing the visit',[['appt','w','DOCX','แบบขอนัดวันตรวจเยี่ยมสถาบันการศึกษา'],['plan','w','DOCX','แผนการตรวจเยี่ยม'],['qs','w','DOCX','ประเด็นที่จะตรวจสอบและคำถามสัมภาษณ์']]],
 ['หลังตรวจเยี่ยม','After the visit',[['fact','w','DOCX','แบบรายการรายงานคำแถลงข้อเท็จจริง (Fact Finding Report)'],['pptx','p','PPTX','Program Decision']]],
 ['รายงานและแจ้งผล','Report and notify',[['report','w','DOCX','แบบรายงานผลการตรวจรับรองมาตรฐานคุณภาพการศึกษา (แบบ 1)'],['notify','w','DOCX','หนังสือแจ้งผลการรับรอง']]]];
VIEWS.tools=function(){const stl={ok:t('พร้อม','Ready'),part:t('ข้อมูลยังไม่ครบ','Incomplete'),wait:t('รอขั้นก่อนหน้า','Waiting')};
  return`<section class="phead"><div class="col"><span class="eyebrow">${t('เอกสาร 9 ฉบับตามแบบของ TABEE · WORD ใช้ TH SARABUN NEW 16 PT','9 TABEE DOCUMENTS · WORD IN TH SARABUN NEW 16 PT')}</span><h1>${t('สร้างเอกสาร','Generate documents')}</h1><p>${t('ทุกฉบับสร้างจากข้อมูลล่าสุดในระบบ ฉบับที่ข้อมูลยังไม่ครบสร้างได้ แต่จะมีช่องว่างตามที่ระบุ','Built from the latest data. Incomplete ones still generate, with the gaps shown.')}</p></div><button class="btn pri lg" data-a="genAll" ${S.busy?'disabled':''}>${ic('gen')}${t('สร้างทุกฉบับเป็น .zip','Generate all as .zip')}</button></section>${busyNote()}
  <div class="two"><div class="main" style="gap:16px">${GENG.map((g,i)=>`<section class="card tight"><div class="row" style="padding:12px 0 8px;gap:10px"><span class="mono tiny muted">0${i+1}</span><h2 style="font-size:17px">${t(g[0],g[1])}</h2></div>${g[2].map(d=>{const s=genStatus(d[0]);return`<div class="gen"><span class="ext ${d[1]}">${d[2]}</span><div class="col" style="gap:3px;min-width:0"><b>${d[3]}</b><span class="meta"><span class="st ${s[0]}"><i></i>${stl[s[0]]}</span>${s[1]}</span></div><button class="btn" data-a="${d[0]==='xlsx'||d[0]==='pptx'?d[0]:'docx'}" data-d="${d[0]}">${ic('gen')}${t('สร้างไฟล์','Generate')}</button></div>`}).join('')}</section>`).join('')}</div>
   <aside class="side"><section class="card"><h2 style="font-size:19px">${t('ไฟล์งานของหลักสูตรนี้','This program\'s project file')}</h2><p class="small muted" style="margin:0">${esc(S.sync)}${S.meta.updatedAt?' · '+t('ล่าสุด ','last ')+fmtDT(S.meta.updatedAt):''}</p>
     <button class="fbtn" data-a="saveProj"><span>${ic('save')}</span><span><b>Save</b><small>${t('เก็บงานทั้งหมดเป็นไฟล์ .json ส่งต่อให้ทีมได้','Everything in one .json file to share with the team')}</small></span></button>
     <button class="fbtn" data-a="pickOpen" ${S.canWrite?'':'disabled'}><span>${ic('open')}</span><span><b>Open</b><small>${t('เปิดไฟล์ที่ Save ไว้เป็นรายการใหม่ ไม่ทับงานเดิม','Opens a saved file as a new entry')}</small></span></button>
     <button class="fbtn danger" data-a="resetAsk" ${S.canWrite?'':'disabled'}><span>${ic('reset')}</span><span><b>Reset</b><small>${t('ล้างผลประเมินและเอกสาร เก็บข้อมูลหลักสูตรและทีมไว้','Clears ratings and documents; keeps program and team')}</small></span></button></section>
    <section class="card"><h2 style="font-size:19px">${t('บันทึกการทำงาน','Activity')}</h2>${P('log').e.slice(0,12).map(e=>`<div class="small"><span class="tiny mono muted">${fmtDT(e.t)}</span> ${esc(e.by)} — ${esc(e.m)}</div>`).join('')||`<span class="small muted">${t('ยังไม่มีบันทึก','Nothing yet')}</span>`}</section></aside></div>`};
IC.lock='<rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/>';IC.warn='<path d="M8 2 1.5 13.5h13z"/><path d="M8 6.5v3.2M8 11.6v.1"/>';

/* ---------- actions for the new layout ---------- */
Object.assign(A,{
crit(d){S.crit=+d.c;S.sel=null;render(true)},
cell(d){S.view=d.v;S.crit=+d.c;S.sel=null;S.filter='all';try{location.hash=d.v}catch(e){}render()},
selItem(d){S.sel=d.id;render(true)},
openItem(d){S.view=d.v||'pv1';S.crit=+d.c;S.sel=d.id;S.filter='all';try{location.hash=S.view}catch(e){}render();setTimeout(()=>{const el=document.getElementById('it_'+d.id);if(el)el.scrollIntoView({block:'center'})},30)},
itemQ(d){const x=ALL.find(a=>a.it.id===d.id);if(!x)return;const f=finalR(x.c,x.it.id);const q=itemQuestion(x.it.t),l=P('qs').list;if(l.some(o=>o.q===q)){toast(t('มีคำถามนี้แล้ว','Already added'));return}
  l.push({crit:x.c,group:QGROUP[x.c],issue:t('ข้อ ','Item ')+x.it.code+(f.r?' ['+f.r+'] ':' ')+String(f.n||'').split('\n')[0].slice(0,160),q,ans:''});Store.save('qs');toast(t('เพิ่มคำถามสัมภาษณ์แล้ว','Interview question added'))},
itemPlan(d){const x=ALL.find(a=>a.it.id===d.id);if(!x)return;const p=P('plan');if(p.items.some(i=>i.src===x.it.id)){toast(t('มีในแผนแล้ว','Already in the plan'));return}const f=finalR(x.c,x.it.id);
  p.items.push({src:x.it.id,crit:x.c,what:'ข้อ '+x.it.code+(f.r?' ['+f.r+'] ':' ')+String(f.n||x.it.t).split('\n')[0].slice(0,160),how:'ตรวจเอกสาร',target:'',when:'',owner:''});Store.save('plan');toast(t('เพิ่มในแผนตรวจเยี่ยมแล้ว','Added to the visit plan'))}
});

/* ---------- workflow rev.4: per-item actions, program response after FFR, subcommittee comments, final ratings ---------- */
STAGES.push({k:'post',th:'ผลหลังคำชี้แจง',en:'After response',sh:'Resp'},{k:'fin',th:'ผลสุดท้าย (Decision)',en:'Final (decision)',sh:'Final'});
SIDX.post=6;SIDX.fin=7;
NAV[4][2]=[['fact','Fact Finding Report','Fact Finding Report'],['resp','หลักสูตรชี้แจงหลัง FFR','Program response'],['post','ผลหลังคำชี้แจง','Ratings after response'],['dec','Decision Meeting','Decision Meeting'],['report','รายงานผลการตรวจรับรอง','Accreditation report'],['notify','แจ้งผลการรับรอง','Result notification']];
STAGE_DESC.post=['พิจารณาคำชี้แจงและเอกสารที่หลักสูตรส่งหลังได้รับ Fact Finding Report แล้วลงผลก่อนเข้า Decision Meeting ใช้ S เมื่อคำชี้แจงเพียงพอ','Review the program\'s response to the Fact Finding Report and rate before the Decision Meeting.'];
VIEWS.post=()=>evalView('post');

/* ratings: the final column comes from the Decision Meeting */
const PRE_FIN=['post','ex','d2','d1','pv2','pv1','ai'];
const sumRBase=sumR,sumNBase=sumN;
const decStarted=()=>!!(S.parts.dec?.mtg||ALL.some(x=>peek(x.c,x.it.id)?.dec?.sub));
function chainR(c,id,list){for(const s of list){const r=sumRBase(c,id,s);if(r)return{r,st:s}}return{r:'',st:''}}
function finR(c,id){if(!decStarted())return'';const d=peek(c,id)?.dec,base=chainR(c,id,PRE_FIN).r;
  if(d?.sub?.r){if(d.pev?.v==='agree')return d.sub.r;if(d.pev?.v==='disagree')return base;return''}return base}
sumR=function(c,id,stage){return stage==='fin'?finR(c,id):sumRBase(c,id,stage)};
sumN=function(c,id,stage){if(stage!=='fin')return sumNBase(c,id,stage);const d=peek(c,id)?.dec;if(!d?.sub)return'';
  return[d.sub.n&&'อนุกรรมการ'+(d.sub.r?' ('+RT[d.sub.r].sh+')':'')+': '+d.sub.n,d.pev?.v&&'PEV '+(d.pev.v==='agree'?'เห็นตาม':'เห็นแย้ง')+(d.pev.reason?': '+d.pev.reason:'')].filter(Boolean).join('\n')};
finalR=function(c,id,upto){const all=['fin',...PRE_FIN];const list=upto?all.slice(all.indexOf(upto)):all;for(const s of list){const r=sumR(c,id,s);if(r)return{r,n:sumN(c,id,s),st:s}}return{r:'',n:'',st:''}};

/* ---------- per-item actions while facts are still being gathered ---------- */
const ACT_ST={pv1:['req','doc','int'],pv2:['req','doc','int'],d1:['doc','int']};
const ACT_LBL={req:['ขอเอกสารเพิ่มเติมก่อนวันตรวจเยี่ยม','Request documents before the visit','นำมาปรับผลใน Pre-visit 2','used to update Pre-visit 2'],
  doc:['ดูเอกสารวันตรวจเยี่ยม','Check documents at the visit','Course Portfolio หรือเอกสารอื่นที่เกี่ยวข้อง','course portfolio or other records'],
  int:['สัมภาษณ์วันตรวจเยี่ยม','Interview at the visit','ผูกกับประเด็นและคำถามสัมภาษณ์','linked to the interview questions']};
const DOCWHERE=['Course Portfolio','แฟ้มหลักฐานของหลักสูตร','ห้องปฏิบัติการหรือสถานที่','ระบบสารสนเทศของหลักสูตร','อื่น ๆ'];
const RNDLBL={pv1:'Pre-visit 1',pv2:'Pre-visit 2',d1:'Visit Day 1'};
const needsAct=(c,id,st)=>{const r=ACT_ST[st]&&sumR(c,id,st);return!!r&&!['N','S'].includes(r)};
const actOf=(c,id,st)=>peek(c,id)?.[st]?.act||{};
const hasAct=(c,id,st)=>{const a=actOf(c,id,st);return!!(a.req?.on||a.doc?.on||a.int?.on)};
function actGap(st){let need=0,miss=0;ALL.forEach(x=>{if(needsAct(x.c,x.it.id,st)){need++;if(!hasAct(x.c,x.it.id,st))miss++}});return{need,miss}}
function actList(k){const out=[];ALL.forEach(x=>{for(const st of Object.keys(ACT_ST)){const a=actOf(x.c,x.it.id,st)[k];if(a?.on)out.push({x,st,a,r:sumR(x.c,x.it.id,st)})}});return out}
function actText(c,id){const out=[];for(const st of Object.keys(ACT_ST)){const a=actOf(c,id,st),p=RNDLBL[st];
  if(a.req?.on)out.push(p+' · ขอเอกสาร: '+(a.req.text||''));if(a.doc?.on)out.push(p+' · ดูเอกสาร ('+(a.doc.where||'')+'): '+(a.doc.what||'')+(a.doc.found?' → พบ: '+a.doc.found:''));
  if(a.int?.on)out.push(p+' · สัมภาษณ์ '+(a.int.groups||[]).join(', ')+': '+(a.int.q||'')+(a.int.ans?' → คำตอบ: '+a.int.ans:''))}return out.join('\n')}
const bp=(c,id,st,p)=>`c${c}:items.${id}.${st}.act.${p}`;
function actPanel(c,it,st){const a=actOf(c,it.id,st),ks=ACT_ST[st],d1=st==='d1',any=hasAct(c,it.id,st);
  let h=`<div class="act"><div class="evh"><b>${t('ขั้นต่อไปสำหรับข้อนี้','Next step for this item')}</b><small>${t('เลือกได้มากกว่า 1 ทาง','choose one or more')}</small><span class="sp"></span>${any?'':`<span class="st part"><i></i>${t('ยังไม่ได้เลือก','not chosen')}</span>`}</div><div class="aopts">`;
  h+=ks.map(k=>{const on=!!a[k]?.on,L=ACT_LBL[k];return`<button class="aopt ${on?'on':''}" aria-pressed="${on}" data-a="actT" data-c="${c}" data-id="${it.id}" data-st="${st}" data-k="${k}" ${S.canWrite?'':'disabled'}><span class="cb" aria-hidden="true">${on?'✓':''}</span><span><b>${t(L[0],L[1]).replace('วันตรวจเยี่ยม',d1?'วันตรวจเยี่ยมวันที่ 2':'วันตรวจเยี่ยม')}</b><small>${t(L[2],L[3])}</small></span></button>`}).join('')+'</div>';
  if(a.req?.on)h+=`<label class="f">${t('เอกสารหรือคำอธิบายที่ขอ (เข้าจดหมายขอเอกสารเพิ่มเติม)','Documents or explanation requested (goes into the request letter)')}<textarea id="ar_${it.id}_${st}" rows="2" data-b="${bp(c,it.id,st,'req.text')}">${esc(a.req.text||'')}</textarea></label>`;
  if(a.doc?.on)h+=`<div class="grid2" style="grid-template-columns:minmax(160px,220px) minmax(0,1fr)"><label class="f">${t('ดูที่','Where')}<select id="aw_${it.id}_${st}" data-b="${bp(c,it.id,st,'doc.where')}">${DOCWHERE.map(w=>`<option ${a.doc.where===w?'selected':''}>${w}</option>`).join('')}</select></label><label class="f">${t('เอกสารหรือสิ่งที่จะดู (เข้าแผนตรวจเยี่ยมและจดหมายนัด)','What to check (goes into the visit plan and appointment letter)')}<input type="text" id="ad_${it.id}_${st}" data-b="${bp(c,it.id,st,'doc.what')}" value="${esc(a.doc.what||'')}"></label></div>`;
  if(a.int?.on){const gs=a.int.groups||[];h+=`<div class="col" style="gap:6px"><span class="tiny muted">${t('สัมภาษณ์ใคร','Who to interview')}</span><div class="gchips">${GROUPS.map((g,i)=>`<button class="gchip ${gs.includes(g)?'on':''}" aria-pressed="${gs.includes(g)}" data-a="actG" data-c="${c}" data-id="${it.id}" data-st="${st}" data-g="${i}">${g}</button>`).join('')}</div></div>
    <label class="f">${t('เรื่องที่จะถาม','Topic')}<input type="text" id="at_${it.id}_${st}" data-b="${bp(c,it.id,st,'int.topic')}" value="${esc(a.int.topic||'')}" placeholder="${t('เช่น การมีส่วนร่วมของ IAC ในการทบทวน PEO','e.g. IAC involvement in the PEO review')}"></label>
    <label class="f">${t('คำถาม (เข้าหน้าประเด็นและคำถามสัมภาษณ์)','Question (goes into Issues & questions)')}<textarea id="aq_${it.id}_${st}" rows="2" data-b="${bp(c,it.id,st,'int.q')}">${esc(a.int.q||'')}</textarea></label></div>`}
  return h+'</div>'}
function factBox(c,it,st){const rounds=st==='d2'?['pv1','pv2','d1']:['pv1','pv2'];let rows='';
  for(const r of rounds){const a=actOf(c,it.id,r);
    if(a.doc?.on)rows+=`<div class="fb"><span class="tiny muted">${RNDLBL[r]} · ${t('ดูเอกสาร','Check')} · ${esc(a.doc.where||'')}</span><b>${esc(a.doc.what||'')}</b><label class="f">${t('สิ่งที่พบ','What was found')}<textarea id="ff_${it.id}_${r}" rows="2" data-b="${bp(c,it.id,r,'doc.found')}">${esc(a.doc.found||'')}</textarea></label></div>`;
    if(a.int?.on)rows+=`<div class="fb"><span class="tiny muted">${RNDLBL[r]} · ${t('สัมภาษณ์','Interview')} · ${esc((a.int.groups||[]).join(', '))}</span><b>${esc(a.int.q||a.int.topic||'')}</b><label class="f">${t('คำตอบ / ข้อเท็จจริงที่ได้','Answer / facts')}<textarea id="fa_${it.id}_${r}" rows="2" data-b="${bp(c,it.id,r,'int.ans')}">${esc(a.int.ans||'')}</textarea></label></div>`}
  return rows?`<div class="facts"><b>${t('ข้อเท็จจริงที่ต้องหาในวันตรวจเยี่ยม','Facts to gather at the visit')}</b>${rows}</div>`:''}
const itemCardBase=itemCard;
itemCard=function(c,it,stage){let h=itemCardBase(c,it,stage),x='';
  if(stage==='pv2'){const a=actOf(c,it.id,'pv1');if(a.req?.on)x+=`<div class="info"><b>${t('ขอเอกสารไว้ใน Pre-visit 1','Requested in Pre-visit 1')}</b><span>${esc(a.req.text||'')}</span></div>`}
  if(stage==='d1'||stage==='d2')x+=factBox(c,it,stage);
  if(stage==='post'){const rs=peek(c,it.id)?.resp,fx=finalR(c,it.id,'ex');if(rs?.text||rs?.ref||(fx.r&&RT[fx.r].sev>0))x+=rs?.text||rs?.ref?`<div class="info"><b>${t('คำชี้แจงของหลักสูตร','Program response')}</b><span>${esc(rs.text||'')}</span>${rs.ref?`<span class="tiny muted">${t('เอกสารอ้างอิง','Reference')}: ${esc(rs.ref)}</span>`:''}</div>`:`<div class="info"><span class="muted">${t('หลักสูตรไม่ได้ชี้แจงข้อนี้','No response for this item')}</span></div>`}
  if(needsAct(c,it.id,stage))x+=actPanel(c,it,stage);
  return x?h.replace(/<\/div><\/article>$/,x+'</div></article>'):h};
const evalViewBase=evalView;
evalView=function(stage){let h=evalViewBase(stage);if(!ACT_ST[stage]||S.cmp)return h;const g=actGap(stage);if(!g.need)return h;
  const note=`<div class="note ${g.miss?'':'info'}">${g.miss?t('ข้อที่มีประเด็น ','Items with issues: ')+g.need+t(' ข้อ ยังไม่ได้เลือกขั้นต่อไป ',' · next step not chosen for ')+g.miss+t(' ข้อ',''):t('เลือกขั้นต่อไปครบทุกข้อที่มีประเด็นแล้ว ','Next step chosen for all ')+g.need+t(' ข้อ',' items with issues')} · ${t('ขอเอกสาร','requests')} ${actList('req').filter(a=>a.st===stage).length} · ${t('ดูเอกสาร','checks')} ${actList('doc').filter(a=>a.st===stage).length} · ${t('สัมภาษณ์','interviews')} ${actList('int').filter(a=>a.st===stage).length}</div>`;
  const i=h.indexOf('</section>');return i<0?h:h.slice(0,i+10)+note+h.slice(i+10)};

/* ---------- derived rows in the request letter, visit plan, appointment and interview list ---------- */
const lastDocPane=(h,extra)=>{const k='<div class="card col"><div class="row"><h2>';const i=h.lastIndexOf(k);return i<0?h+extra:h.slice(0,i)+extra+h.slice(i)};
const goItem=a=>`<button class="btn sm ghost" data-a="openItem" data-v="${a.st}" data-c="${a.x.c}" data-id="${a.x.it.id}">${t('แก้ที่ข้อนี้','Edit on item')} →</button>`;
function derivedCard(title,sub,list,row){return`<section class="card col"><div class="row" style="justify-content:space-between;align-items:baseline"><h2 style="font-size:18px">${title}</h2><span class="small muted">${list.length} ${t('รายการ','rows')}</span></div><p class="small muted" style="margin:0">${sub}</p>${list.length?list.map(row).join(''):`<span class="small muted">${t('ยังไม่มี เลือก action ในขั้น Pre-visit','None yet; choose actions in the Pre-visit steps')}</span>`}</section>`}
const vReq=VIEWS.req;VIEWS.req=function(){const h=vReq(),l=actList('req');const card=derivedCard(t('จาก action รายข้อ','From item actions'),t('ข้อที่ PEV เลือก "ขอเอกสารเพิ่มเติมก่อนวันตรวจเยี่ยม" รวมเข้าจดหมายให้อัตโนมัติ แก้ข้อความได้ที่ข้อนั้น','Items set to "request documents" go into the letter automatically.'),l,
  a=>`<div class="arow">${chipS(a.r)}<span class="mono tiny">${t('เกณฑ์','C')} ${a.x.c} · ${a.x.it.code} · ${RNDLBL[a.st]}</span><span>${esc(a.a.text||'')}</span>${goItem(a)}</div>`);
  const i=h.indexOf('<div class="card col"><h3>');return i<0?h+card:h.slice(0,i)+card+h.slice(i)};
const dReq=DOCS.req;DOCS.req=function(){const r=P('req'),orig=r.rows,m={};for(let c=1;c<=8;c++){m['c'+c]=actList('req').filter(a=>a.x.c===c).map(a=>'ข้อ '+a.x.it.code+(a.st==='pv2'?' (Pre-visit 2)':'')+': '+(a.a.text||'')).concat((orig||{})['c'+c]||[])}r.rows=m;try{return dReq()}finally{r.rows=orig}};
const vPlan=VIEWS.plan;VIEWS.plan=function(){const h=vPlan(),l=actList('doc');const card=derivedCard(t('ดูเอกสารวันตรวจเยี่ยม (จาก action รายข้อ)','Documents to check at the visit (from item actions)'),t('บันทึกสิ่งที่พบได้ที่นี่หรือในการ์ดข้อนั้นในขั้น Visit Day','Record what was found here or on the item during the visit days.'),l,
  a=>`<div class="arow wide">${chipS(a.r)}<span class="mono tiny">${t('เกณฑ์','C')} ${a.x.c} · ${a.x.it.code}</span><span><b>${esc(a.a.where||'')}</b> · ${esc(a.a.what||'')}</span>${goItem(a)}<label class="f" style="grid-column:1/-1">${t('สิ่งที่พบ','Found')}<textarea id="pf_${a.x.it.id}_${a.st}" rows="1" data-b="${bp(a.x.c,a.x.it.id,a.st,'doc.found')}">${esc(a.a.found||'')}</textarea></label></div>`);
  const i=h.indexOf('<div class="card scroll">');return i<0?h+card:h.slice(0,i)+card+h.slice(i)};
const dPlan=DOCS.plan;DOCS.plan=function(){const p=P('plan'),orig=p.items;p.items=actList('doc').map(a=>({crit:a.x.c,what:'ข้อ '+a.x.it.code+': '+(a.a.what||'')+(a.a.found?'\nพบ: '+a.a.found:''),how:a.a.where||'ตรวจเอกสาร',target:'',when:'วันตรวจเยี่ยม',owner:''})).concat(orig||[]);try{return dPlan()}finally{p.items=orig}};
const vAppt=VIEWS.appt;VIEWS.appt=function(){const l=actList('doc');return lastDocPane(vAppt(),derivedCard(t('เอกสารที่ขอให้เตรียม (จาก action รายข้อ)','Documents to prepare (from item actions)'),t('รวมเข้าจดหมายนัดตรวจเยี่ยมต่อจากรายการที่พิมพ์เอง','Added to the appointment letter after the typed list.'),l,a=>`<div class="arow">${chipS(a.r)}<span class="mono tiny">${t('เกณฑ์','C')} ${a.x.c} · ${a.x.it.code}</span><span><b>${esc(a.a.where||'')}</b> · ${esc(a.a.what||'')}</span>${goItem(a)}</div>`))};
const dAppt=DOCS.appt;DOCS.appt=function(){const p=P('appt'),orig=p.docs;const add=[...new Set(actList('doc').map(a=>'เกณฑ์ข้อ '+a.x.c+' ข้อ '+a.x.it.code+' – '+(a.a.where||'')+': '+(a.a.what||'')))];p.docs=(orig||[]).concat(add);try{return dAppt()}finally{p.docs=orig}};
const vQs=VIEWS.qs;VIEWS.qs=function(){const h=vQs(),l=actList('int');const card=derivedCard(t('คำถามจาก action รายข้อ','Questions from item actions'),t('ข้อที่ PEV เลือก "สัมภาษณ์วันตรวจเยี่ยม" แก้คำถามได้ที่ข้อนั้น บันทึกคำตอบได้ที่นี่','Items set to "interview". Edit the question on the item; record answers here.'),l,
  a=>`<div class="arow wide">${chipS(a.r)}<span class="mono tiny">${t('เกณฑ์','C')} ${a.x.c} · ${a.x.it.code}</span><span><b>${esc((a.a.groups||[]).join(', ')||t('ยังไม่เลือกผู้ถูกสัมภาษณ์','no interviewee chosen'))}</b>${a.a.topic?' · '+esc(a.a.topic):''}<br>${esc(a.a.q||'')}</span>${goItem(a)}<label class="f" style="grid-column:1/-1">${t('คำตอบ / ข้อเท็จจริงที่พบ','Answer / facts')}<textarea id="qa_${a.x.it.id}_${a.st}" rows="1" data-b="${bp(a.x.c,a.x.it.id,a.st,'int.ans')}">${esc(a.a.ans||'')}</textarea></label></div>`);
  const i=h.indexOf('<div class="card scroll">');return i<0?h+card:h.slice(0,i)+card+h.slice(i)};
const dQs=DOCS.qs;DOCS.qs=function(){const q=P('qs'),orig=q.list;q.list=actList('int').map(a=>({crit:a.x.c,group:(a.a.groups||[]).join(', '),issue:'ข้อ '+a.x.it.code+(a.r?' ['+a.r+']':'')+(a.a.topic?' '+a.a.topic:''),q:a.a.q||'',ans:a.a.ans||''})).concat(orig||[]);try{return dQs()}finally{q.list=orig}};

/* ---------- program response after the Fact Finding Report ---------- */
const respItems=()=>ALL.map(x=>({...x,f:finalR(x.c,x.it.id,'ex')})).filter(x=>x.f.r&&RT[x.f.r].sev>0);
VIEWS.resp=function(){const r=P('resp'),l=respItems(),files=P('files').list.filter(f=>f.kind==='เอกสารชี้แจงหลัง Fact Finding');const done=l.filter(x=>peek(x.c,x.it.id)?.resp?.text).length;
  return`<section class="phead"><div class="col"><span class="eyebrow">${t('รายงานและตัดสิน','REPORT & DECIDE').toUpperCase()}</span><h1>${t('หลักสูตรชี้แจงหลัง Fact Finding Report','Program response to the Fact Finding Report')}</h1><p>${t('บันทึกคำชี้แจงและเอกสารเพิ่มเติมที่หลักสูตรส่งหลังได้รับ Fact Finding Report แล้วไปลงผลในขั้นผลหลังคำชี้แจง ผลตามรายการตรวจจะปิดที่รายงานผลการตรวจรับรอง','Record the program\'s response and documents, then rate in the next step. Checklist results close in the accreditation report.')}</p></div>
   <div class="prog-bar"><div class="t"><span>${t('ประเด็นที่ชี้แจงแล้ว','Issues answered')}</span><b>${done} / ${l.length}</b></div><div class="bar" aria-hidden="true"><i style="width:${l.length?Math.round(100*done/l.length):0}%"></i></div></div></section>
  <section class="card col"><div class="grid2">${inp('resp','sent',t('ส่ง Fact Finding Report ให้หลักสูตร','FFR sent to the program'),'date')}${inp('resp','due',t('กำหนดส่งคำชี้แจง','Response due'),'date')}${inp('resp','received',t('ได้รับคำชี้แจง','Response received'),'date')}</div>
   <label class="drop" id="respDrop"><input type="file" id="respIn" multiple hidden accept=".pdf,.docx,.xlsx,.xls,.csv,.pptx,.md,.txt" ${S.canWrite?'':'disabled'}><b>${t('อัปโหลดเอกสารชี้แจงของหลักสูตร','Upload the program\'s response documents')}</b><div class="small muted">${t('เก็บเป็นประเภท "เอกสารชี้แจงหลัง Fact Finding" ในเอกสารหลักสูตร','Stored as "response after FFR" in program documents')}</div></label>${busyNote()}
   ${files.length?`<div class="docs">${files.map(f=>`<div class="docc"><span class="ext ${({DOCX:'w',PDF:'d',XLSX:'x',PPTX:'p'})[(f.name.split('.').pop()||'').toUpperCase()]||''}">${esc((f.name.split('.').pop()||'').toUpperCase().slice(0,4))}</span><div style="min-width:0"><b>${esc(f.name)}</b><small>${fmtDT(f.at)} · ${(f.chars||0).toLocaleString()} ${t('ตัวอักษร','chars')}</small></div></div>`).join('')}</div>`:''}</section>
  <section class="col" style="gap:10px"><h2>${t('คำชี้แจงรายประเด็น','Response by issue')}</h2>${l.map(x=>{const rs=peek(x.c,x.it.id)?.resp||{};return`<article class="card col" style="gap:8px"><div class="row" style="gap:10px;align-items:flex-start;flex-wrap:nowrap">${chipS(x.f.r,'lg')}<div class="col" style="gap:2px;min-width:0"><span class="mono tiny muted">${t('เกณฑ์','Criterion')} ${x.c} · ${t('ข้อ','item')} ${x.it.code} · ${STAGES[SIDX[x.f.st]].sh}</span><span style="font-size:14px">${esc(x.it.t)}</span>${x.f.n?`<span class="small muted" style="white-space:pre-wrap">${esc(x.f.n)}</span>`:''}</div></div>
     <label class="f">${t('คำชี้แจงของหลักสูตร','Program response')}<textarea id="rs_${x.it.id}" rows="2" data-b="c${x.c}:items.${x.it.id}.resp.text">${esc(rs.text||'')}</textarea></label><label class="f">${t('เอกสารอ้างอิง','Reference document')}<input type="text" id="rr_${x.it.id}" data-b="c${x.c}:items.${x.it.id}.resp.ref" value="${esc(rs.ref||'')}"></label></article>`}).join('')||`<p class="muted">${t('ไม่มีประเด็นค้างหลัง Exit Statement','No open issues after the exit statement')}</p>`}</section>
  <div><button class="btn pri lg" data-a="go" data-v="post">${t('ไปลงผลหลังคำชี้แจง','Rate after response')} →</button></div>`};

/* ---------- Decision Meeting: subcommittee comments, PEV agrees or disagrees with reasons ---------- */
const vDec=VIEWS.dec;VIEWS.dec=function(){const h=vDec(),d=P('dec');
  const list=ALL.map(x=>({...x,b:chainR(x.c,x.it.id,PRE_FIN)})).filter(x=>S.decAll||(x.b.r&&RT[x.b.r].sev>0)||peek(x.c,x.it.id)?.dec?.sub);
  let nC=0,nP=0,nR=0;ALL.forEach(x=>{const s=peek(x.c,x.it.id)?.dec;if(s?.sub&&(s.sub.r||s.sub.n)){nC++;if(!s.pev?.v)nP++;if(s.pev?.v==='disagree'&&!String(s.pev.reason||'').trim())nR++}});
  const card=`<section class="card col"><div class="row" style="justify-content:space-between;align-items:baseline"><h2>${t('ความเห็นของอนุกรรมการ','Subcommittee comments')}</h2><span class="small muted">${t('ความเห็น ','comments ')}${nC} · ${t('รอ PEV ตอบ ','awaiting PEV ')}${nP}${nR?' · '+t('เห็นแย้งแต่ยังไม่ระบุเหตุผล ','disagree without reason ')+nR:''}</span></div>
   <p class="small muted" style="margin:0;max-width:80ch">${t('อนุกรรมการเสนอผลและความเห็นรายข้อ เพื่อให้ผลการรับรองของทุกหลักสูตรอยู่ในมาตรฐานเดียวกัน PEV เห็นตามหรือเห็นแย้งได้ เมื่อเห็นแย้งต้องระบุเหตุผล ผลสุดท้ายของข้อจะเข้ารายงานผลการตรวจรับรองและ PEV Worksheet','The subcommittee proposes a rating and comment per item so results stay consistent across programs. PEVs agree, or disagree with a reason. The final rating goes into the report and the worksheet.')}</p>
   <div class="grid2" style="max-width:560px">${inp('dec','subName',t('อนุกรรมการที่ให้ความเห็น','Subcommittee member(s)'))}</div>
   <div class="row"><div class="seg" role="group"><button class="${S.decAll?'':'on'}" data-a="decAll" data-v="0">${t('เฉพาะข้อที่มีประเด็น','Items with issues')}</button><button class="${S.decAll?'on':''}" data-a="decAll" data-v="1">${t('ทุกข้อ','All items')}</button></div></div>
   ${list.map(x=>{const s=peek(x.c,x.it.id)?.dec||{},sub=s.sub||{},pv=s.pev||{},fr=finR(x.c,x.it.id),has=sub.r||sub.n;
     return`<article class="dcard"><div class="row" style="gap:10px;align-items:flex-start;flex-wrap:nowrap">${chipS(x.b.r,'lg')}<div class="col" style="gap:2px;min-width:0;flex:1"><span class="mono tiny muted">${t('เกณฑ์','Criterion')} ${x.c} · ${t('ข้อ','item')} ${x.it.code} · PEV ${x.b.st?STAGES[SIDX[x.b.st]].sh:''}</span><span style="font-size:14px">${esc(x.it.t.length>200?x.it.t.slice(0,200)+'…':x.it.t)}</span>${sumN(x.c,x.it.id,x.b.st)?`<span class="small muted" style="white-space:pre-wrap">${esc(sumN(x.c,x.it.id,x.b.st).split('\n')[0])}</span>`:''}</div><div class="col" style="gap:2px;align-items:center"><span class="tiny muted">${t('ผลสุดท้าย','Final')}</span>${chipS(fr,'lg')}</div></div>
       <div class="evh"><b>${t('อนุกรรมการเสนอ','Subcommittee proposes')}</b><span class="sp"></span>${rbtn('decSub',x.c,x.it.id,'fin',sub.r,true)}</div>
       <textarea id="ds_${x.it.id}" rows="2" data-b="c${x.c}:items.${x.it.id}.dec.sub.n" placeholder="${t('ความเห็นของอนุกรรมการ เช่น เทียบกับหลักสูตรอื่นที่มีลักษณะเดียวกัน','Subcommittee comment')}">${esc(sub.n||'')}</textarea>
       ${has?`<div class="evh"><b>PEV</b><span class="sp"></span><div class="seg" role="radiogroup" aria-label="PEV"><button class="${pv.v==='agree'?'on':''}" role="radio" aria-checked="${pv.v==='agree'}" data-a="decPev" data-c="${x.c}" data-id="${x.it.id}" data-v="agree">${t('เห็นตาม','Agree')}</button><button class="${pv.v==='disagree'?'on':''}" role="radio" aria-checked="${pv.v==='disagree'}" data-a="decPev" data-c="${x.c}" data-id="${x.it.id}" data-v="disagree">${t('เห็นแย้ง (คงผลของ PEV)','Disagree (keep PEV rating)')}</button></div></div>
         ${pv.v==='disagree'?`<label class="f">${t('เหตุผลที่เห็นแย้ง (จำเป็น)','Reason for disagreeing (required)')}<textarea id="dp_${x.it.id}" rows="2" data-b="c${x.c}:items.${x.it.id}.dec.pev.reason">${esc(pv.reason||'')}</textarea></label>${String(pv.reason||'').trim()?'':`<div class="note">${t('ระบุเหตุผลรองรับก่อนสรุปผล','Give a supporting reason before finalising')}</div>`}`:''}`:''}</article>`}).join('')||`<span class="small muted">${t('ไม่มีข้อที่มีประเด็น','No items with issues')}</span>`}</section>`;
  const i=h.indexOf('<div class="slide">');return i<0?h+card:h.slice(0,i)+card+h.slice(i)};

/* ---------- status ---------- */
const statusBase=status;
status=function(v){if(v==='resp'){const l=respItems(),n=l.filter(x=>peek(x.c,x.it.id)?.resp?.text).length;return{c:P('resp').received?'done':n?'part':'',b:l.length?n+'/'+l.length:''}}
  if(v==='req'){const s=statusBase(v),n=actList('req').length+Object.values(S.parts.req?.rows||{}).flat().filter(Boolean).length;return{c:n?'done':s.c,b:n?String(n):''}}
  if(v==='plan'){const n=actList('doc').length+(S.parts.plan?.items?.length||0);return{c:n?'done':'',b:n?String(n):''}}
  if(v==='qs'){const n=actList('int').length+(S.parts.qs?.list?.length||0);return{c:n?'done':'',b:n?String(n):''}}
  if(v==='dec'){const s=statusBase(v);if(s.c)return s;return{c:decStarted()?'part':'',b:''}}
  return statusBase(v)};

/* ---------- actions ---------- */
Object.assign(A,{
actT(d){const c=+d.c,x=ALL.find(a=>a.it.id===d.id);if(!x)return;const st=stOf(c,d.id,d.st),a=st.act||(st.act={}),k=d.k,cur=a[k]||(a[k]={});cur.on=!cur.on;cur.by=S.who;cur.t=Date.now();
  if(cur.on){const ai=peek(c,d.id)?.ai,note=String(sumN(c,d.id,d.st)||'').split('\n')[0];
    if(k==='req'&&!cur.text)cur.text=ai?.req&&!/^ขอให้ระบุตำแหน่ง/.test(ai.req)?ai.req.replace(/\s*\(เกณฑ์ข้อ.*\)$/,''):'ขอเอกสารหรือคำอธิบายเพิ่มเติมสำหรับเกณฑ์ข้อ '+c+' ข้อ '+x.it.code+(note?' ('+note.slice(0,120)+')':'');
    if(k==='doc'){if(!cur.where)cur.where='Course Portfolio';if(!cur.what)cur.what=(/รายวิชา|Rubric|ประเมิน/.test(x.it.t)?'Course Portfolio ของรายวิชาที่ใช้ประเมินตามข้อ ':'เอกสารหลักฐานของข้อ ')+x.it.code}
    if(k==='int'){if(!cur.groups)cur.groups=[QGROUP[c]];if(!cur.topic&&note)cur.topic=note.slice(0,160);if(!cur.q)cur.q=itemQuestion(x.it.t)}}
  Store.save('c'+c);render(true)},
actG(d){const c=+d.c,st=stOf(c,d.id,d.st),a=(st.act||(st.act={})).int||(st.act.int={on:true});const g=GROUPS[+d.g];a.groups=a.groups||[];const i=a.groups.indexOf(g);if(i>=0)a.groups.splice(i,1);else a.groups.push(g);Store.save('c'+c);render(true)},
decSub(d){const c=+d.c,it=IT(c,d.id),dc=it.dec||(it.dec={}),s=dc.sub||(dc.sub={});s.r=s.r===d.r?'':d.r;s.t=Date.now();s.by=P('dec').subName||'';if(dc.pev)dc.pev.v='';Store.save('c'+c);render(true)},
decPev(d){const c=+d.c,it=IT(c,d.id),dc=it.dec||(it.dec={}),p=dc.pev||(dc.pev={});p.v=p.v===d.v?'':d.v;p.by=S.who;p.t=Date.now();Store.save('c'+c);render(true)},
decAll(d){S.decAll=d.v==='1';render(true)},
factDraft(){const f=P('fact');let n=0;CHECKLIST.forEach(cr=>{const fc=f['c'+cr.n]||(f['c'+cr.n]={});cr.groups.forEach(g=>{if(fc['g'+g.n])return;
    const rs=g.items.map(it=>({it,f:finalR(cr.n,it.id,'ex')}));if(!rs.some(x=>x.f.r))return;
    const iss=rs.filter(x=>x.f.r&&RT[x.f.r].sev>0).map(x=>(g.items.length>1?x.it.code+' ':'')+String(x.f.n||RT[x.f.r].th).split('\n')[0]);
    const facts=[];g.items.forEach(it=>{for(const st of Object.keys(ACT_ST)){const a=actOf(cr.n,it.id,st);if(a.doc?.on&&a.doc.found)facts.push((g.items.length>1?it.code+' ':'')+'จาก '+(a.doc.where||'เอกสาร')+': '+a.doc.found);if(a.int?.on&&a.int.ans)facts.push((g.items.length>1?it.code+' ':'')+'จากการสัมภาษณ์'+((a.int.groups||[]).length?' ('+a.int.groups.join(', ')+')':'')+': '+a.int.ans)}});
    fc['g'+g.n]=[...iss,...facts].join('\n')||'ไม่มีประเด็น';n++})});Store.save('fact');toast(t('ร่างแล้ว ','Drafted ')+n+t(' หัวข้อ',' headings'));render(true)}
});
document.addEventListener('change',e=>{if(e.target.id==='respIn'&&e.target.files.length){S.uploadKind='เอกสารชี้แจงหลัง Fact Finding';handleFiles(e.target.files)}});
document.addEventListener('dragover',e=>{const d=e.target.closest&&e.target.closest('#respDrop');if(d){e.preventDefault();d.classList.add('over')}});
document.addEventListener('drop',e=>{const d=e.target.closest&&e.target.closest('#respDrop');if(d){e.preventDefault();d.classList.remove('over');if(e.dataTransfer.files.length){S.uploadKind='เอกสารชี้แจงหลัง Fact Finding';handleFiles(e.dataTransfer.files)}}});

/* ---------- workflow rev.5: TABEE 18-activity calendar, PEV draft report, screening committee, final decision ---------- */

/* ----- stages: post = PEV draft report, scr = after the screening committee, fin = Decision Meeting ----- */
Object.assign(STAGES[SIDX.post],{th:'ร่างรายงาน (PEV)',en:'Draft report (PEV)',sh:'Draft'});
STAGES.splice(SIDX.fin,0,{k:'scr',th:'หลังกลั่นกรอง',en:'After screening',sh:'Screen'});
Object.assign(STAGES[STAGES.length-1],{th:'ผลสุดท้าย (Decision)',en:'Final (decision)',sh:'Final'});
STAGES.forEach((s,i)=>SIDX[s.k]=i);
NAV[4][2]=[['fact','Fact Finding Report','Fact Finding Report'],['resp','หลักสูตรชี้แจงหลัง FFR','Program response'],['post','PEV ร่างรายงานผลการตรวจรับรอง','PEV draft report'],['screen','คณะกรรมการกลั่นกรอง','Screening committee'],['dec','Decision Meeting','Decision Meeting'],['report','สรุปผลและรายงานผลการตรวจรับรอง','Final report'],['notify','แจ้งผลการรับรอง','Result notification']];
STAGE_DESC.post=['PEV พิจารณาคำชี้แจงและเอกสารที่หลักสูตรส่งหลังได้รับ Fact Finding Report แล้วลงผลรายข้อเพื่อร่างรายงานผลการตรวจรับรองเสนอคณะกรรมการกลั่นกรอง ใช้ S เมื่อคำชี้แจงเพียงพอ','PEVs review the program\'s response, rate each item and draft the accreditation report for the screening committee.'];

/* ----- review layers: the screening chair, then the TABEE accreditation subcommittee; PEV agrees or disagrees ----- */
const REV={
  scr:{key:'scr',st:'scr',part:'screen',name:'chair',
    who:['ประธานคณะกรรมการกลั่นกรอง','Screening committee chair'],title:['ข้อเสนอของคณะกรรมการกลั่นกรอง','Screening committee proposals'],
    sub:['พิจารณาร่างผลการตรวจรับรองรายข้อ ประธานคณะกรรมการกลั่นกรองเสนอผลและความเห็น PEV เลือกเห็นตามหรือเห็นแย้ง เห็นแย้งแล้วผลของ PEV คงไว้และต้องระบุเหตุผล','The chair proposes a rating and comment per item; PEVs agree, or disagree and keep their rating with a reason.']},
  dec:{key:'dec',st:'fin',part:'dec',name:'subName',
    who:['คณะอนุกรรมการรับรองมาตรฐานคุณภาพการศึกษาฯ','TABEE accreditation subcommittee'],title:['ความเห็นของคณะอนุกรรมการรับรองมาตรฐานคุณภาพการศึกษาฯ','Accreditation subcommittee comments'],
    sub:['ประชุมร่วมกับคณะอนุกรรมการรับรองมาตรฐานคุณภาพการศึกษาฯ เพื่อให้ผลการรับรองของทุกหลักสูตรอยู่ในมาตรฐานเดียวกัน ผลตั้งต้นคือผลหลังคณะกรรมการกลั่นกรอง PEV เห็นตามหรือเห็นแย้งได้ เห็นแย้งต้องระบุเหตุผล','Joint meeting with the accreditation subcommittee. Starting point is the post-screening result; PEVs agree, or disagree with a reason.']}};
const revOf=(c,id,key)=>peek(c,id)?.[key]||{};
const revUsed=key=>ALL.some(x=>{const s=revOf(x.c,x.it.id,key).sub;return s&&(s.r||s.n)});
const scrStarted=()=>!!(P('screen').mtg||revUsed('scr'));
function layerR(c,id,key,base){const d=revOf(c,id,key);if(d.sub?.r){if(d.pev?.v==='agree')return d.sub.r;if(d.pev?.v==='disagree')return base;return''}return base}
function scrR(c,id){return scrStarted()?layerR(c,id,'scr',chainR(c,id,PRE_FIN).r):''}
function decBase(c,id){const s=scrR(c,id);return s?{r:s,st:'scr'}:chainR(c,id,PRE_FIN)}
function finR(c,id){return decStarted()?layerR(c,id,'dec',decBase(c,id).r):''}
const revBase=(key,c,id)=>key==='scr'?chainR(c,id,PRE_FIN):decBase(c,id);
const revRes=(key,c,id)=>key==='scr'?scrR(c,id):finR(c,id);
function revNote(c,id,key){const d=revOf(c,id,key),L=REV[key];if(!d.sub)return'';
  return[(d.sub.n||d.sub.r)&&L.who[0]+(d.sub.r?' ('+RT[d.sub.r].sh+')':'')+(d.sub.n?': '+d.sub.n:''),d.pev?.v&&'PEV '+(d.pev.v==='agree'?'เห็นตาม':'เห็นแย้ง')+(d.pev.reason?': '+d.pev.reason:'')].filter(Boolean).join('\n')}
function revGap(key){let n=0,wait=0,noReason=0;ALL.forEach(x=>{const d=revOf(x.c,x.it.id,key);if(d.sub&&(d.sub.r||d.sub.n)){n++;if(!d.pev?.v)wait++;if(d.pev?.v==='disagree'&&!String(d.pev.reason||'').trim())noReason++}});return{n,wait,noReason}}
const sumR7=sumR,sumN7=sumN;
sumR=function(c,id,stage){return stage==='scr'?scrR(c,id):sumR7(c,id,stage)};
sumN=function(c,id,stage){if(stage==='scr')return revNote(c,id,'scr');if(stage==='fin')return revNote(c,id,'dec');return sumN7(c,id,stage)};
finalR=function(c,id,upto){const all=['fin','scr',...PRE_FIN];const list=upto?all.slice(all.indexOf(upto)):all;for(const s of list){const r=sumR(c,id,s);if(r)return{r,n:sumN(c,id,s),st:s}}return{r:'',n:'',st:''}};

function revCard(key){const L=REV[key],o=P(L.part);
  const list=ALL.map(x=>({...x,b:revBase(key,x.c,x.it.id)})).filter(x=>S['revAll_'+key]||(x.b.r&&RT[x.b.r].sev>0)||revOf(x.c,x.it.id,key).sub);
  const g=revGap(key);
  return`<section class="card col" id="rev_${key}"><div class="row" style="justify-content:space-between;align-items:baseline"><h2>${t(L.title[0],L.title[1])}</h2><span class="small muted">${t('ความเห็น ','proposals ')}${g.n} · ${t('รอ PEV ตอบ ','awaiting PEV ')}${g.wait}${g.noReason?' · <b style="color:var(--rD)">'+t('เห็นแย้งแต่ยังไม่ระบุเหตุผล ','disagree without reason ')+g.noReason+'</b>':''}</span></div>
   <p class="small muted" style="margin:0;max-width:84ch">${t(L.sub[0],L.sub[1])}</p>
   ${g.noReason?`<div class="note warn" role="alert">${t('มี ','')}${g.noReason}${t(' ข้อที่ PEV เห็นแย้งแต่ยังไม่ระบุเหตุผล กรุณาระบุเหตุผลรองรับก่อนไปขั้นถัดไป',' item(s) marked disagree without a reason. Add a supporting reason before moving on.')}</div>`:''}
   <div class="grid2" style="max-width:560px">${inp(L.part,L.name,t(L.who[0],L.who[1]))}</div>
   <div class="row"><div class="seg" role="group"><button class="${S['revAll_'+key]?'':'on'}" data-a="revAll" data-k="${key}" data-v="0">${t('เฉพาะข้อที่มีประเด็น','Items with issues')}</button><button class="${S['revAll_'+key]?'on':''}" data-a="revAll" data-k="${key}" data-v="1">${t('ทุกข้อ','All items')}</button></div></div>
   ${list.map(x=>{const d=revOf(x.c,x.it.id,key),sub=d.sub||{},pv=d.pev||{},fr=revRes(key,x.c,x.it.id),has=sub.r||sub.n,bn=x.b.st?sumN(x.c,x.it.id,x.b.st):'';
     return`<article class="dcard ${pv.v==='disagree'&&!String(pv.reason||'').trim()?'bad':''}"><div class="row" style="gap:10px;align-items:flex-start;flex-wrap:nowrap">${chipS(x.b.r,'lg')}<div class="col" style="gap:2px;min-width:0;flex:1"><span class="mono tiny muted">${t('เกณฑ์','Criterion')} ${x.c} · ${t('ข้อ','item')} ${x.it.code} · ${key==='scr'?t('ร่าง PEV','PEV draft'):t('หลังกลั่นกรอง','after screening')}${x.b.st&&x.b.st!=='scr'&&key==='dec'?' ('+STAGES[SIDX[x.b.st]].sh+')':''}</span><span style="font-size:14px">${esc(x.it.t.length>200?x.it.t.slice(0,200)+'…':x.it.t)}</span>${bn?`<span class="small muted" style="white-space:pre-wrap">${esc(bn.split('\n')[0])}</span>`:''}</div><div class="col" style="gap:2px;align-items:center"><span class="tiny muted">${key==='scr'?t('หลังกลั่นกรอง','After screening'):t('ผลสุดท้าย','Final')}</span>${chipS(fr,'lg')}</div></div>
       <div class="evh"><b>${t(L.who[0],L.who[1])} ${t('เสนอ','proposes')}</b><span class="sp"></span>${rbtn('revSub',x.c,x.it.id,key,sub.r,true)}</div>
       <textarea id="rv_${key}_${x.it.id}" rows="2" data-b="c${x.c}:items.${x.it.id}.${key}.sub.n" placeholder="${t('ความเห็นประกอบ','Comment')}">${esc(sub.n||'')}</textarea>
       ${has?`<div class="evh"><b>PEV</b><span class="sp"></span><div class="seg" role="radiogroup" aria-label="PEV"><button class="${pv.v==='agree'?'on':''}" role="radio" aria-checked="${pv.v==='agree'}" data-a="revPev" data-k="${key}" data-c="${x.c}" data-id="${x.it.id}" data-v="agree">${t('เห็นตาม','Agree')}</button><button class="${pv.v==='disagree'?'on':''}" role="radio" aria-checked="${pv.v==='disagree'}" data-a="revPev" data-k="${key}" data-c="${x.c}" data-id="${x.it.id}" data-v="disagree">${t('เห็นแย้ง (คงผลของ PEV)','Disagree (keep PEV rating)')}</button></div></div>
         ${pv.v==='disagree'?`<label class="f">${t('เหตุผลที่เห็นแย้ง (จำเป็น)','Reason for disagreeing (required)')}<textarea id="rp_${key}_${x.it.id}" rows="2" data-b="c${x.c}:items.${x.it.id}.${key}.pev.reason">${esc(pv.reason||'')}</textarea></label>${String(pv.reason||'').trim()?'':`<div class="note warn" role="alert">${t('ยังไม่ได้ระบุเหตุผลที่เห็นแย้ง ผลของ PEV จะคงไว้เมื่อมีเหตุผลรองรับ','No reason given yet. The PEV rating stands only with a supporting reason.')}</div>`}`:''}`:''}</article>`}).join('')||`<span class="small muted">${t('ไม่มีข้อที่มีประเด็น','No items with issues')}</span>`}</section>`}

/* ----- PEV draft report (activity 13) ----- */
const vPost=VIEWS.post;VIEWS.post=function(){const h=vPost();if(S.cmp)return h;
  const card=`<section class="card col"><div class="row" style="justify-content:space-between;align-items:baseline"><h2>${t('ร่างรายงานผลการตรวจรับรอง','Draft accreditation report')}</h2><span class="small muted">${t('ผลรายข้อในขั้นนี้คือร่างที่เสนอคณะกรรมการกลั่นกรอง','Ratings here are the draft sent to the screening committee')}</span></div>
   <div class="grid2" style="max-width:560px">${inp('draft','sent',t('วันที่ส่งร่างรายงานให้คณะกรรมการกลั่นกรอง','Draft sent to the screening committee'),'date')}</div>
   <div class="row"><button class="btn pri" data-a="docx" data-d="report">${ic('gen')}${t('ดาวน์โหลดร่างรายงาน (.docx)','Download draft report (.docx)')}</button><button class="btn" data-a="go" data-v="report">${t('แก้ไขเนื้อหารายงาน','Edit report content')} →</button><span class="sp"></span><button class="btn" data-a="go" data-v="screen">${t('ไปขั้นคณะกรรมการกลั่นกรอง','Go to screening')} →</button></div></section>`;
  const i=h.indexOf('</section>');return i<0?h+card:h.slice(0,i+10)+card+h.slice(i+10)};

/* ----- screening committee (activity 14) ----- */
VIEWS.screen=function(){const g=revGap('scr'),l=ALL.filter(x=>{const b=chainR(x.c,x.it.id,PRE_FIN).r;return b&&RT[b].sev>0});
  return`<section class="phead"><div class="col"><span class="eyebrow">${t('รายงานและตัดสิน','REPORT & DECIDE').toUpperCase()}</span><h1>${t('คณะกรรมการกลั่นกรอง','Screening committee')}</h1><p>${t('ประธานคณะกรรมการกลั่นกรองพิจารณาร่างผลการตรวจรับรองของ PEV และเสนอผลรายข้อ PEV เห็นตามหรือเห็นแย้ง ผลหลังกลั่นกรองเป็นผลตั้งต้นของ Decision Meeting','The screening chair reviews the PEV draft and proposes ratings; PEVs agree or disagree. The result feeds the Decision Meeting.')}</p></div>
   <div class="prog-bar"><div class="t"><span>${t('PEV ตอบแล้ว','PEV answered')}</span><b>${g.n-g.wait} / ${g.n}</b></div><div class="bar" aria-hidden="true"><i style="width:${g.n?Math.round(100*(g.n-g.wait)/g.n):0}%"></i></div></div></section>
  <section class="card col"><div class="grid2">${inp('screen','chair',t('ประธานคณะกรรมการกลั่นกรอง','Screening committee chair'))}${inp('screen','mtg',t('วันที่ประชุมคณะกรรมการกลั่นกรอง','Screening meeting date'),'date')}${inp('screen','members',t('กรรมการที่ร่วมพิจารณา','Members present'))}${inp('screen','back',t('วันที่ PEV ปรับร่างรายงานแล้วเสร็จ','PEV revision completed'),'date')}</div>
   <div class="small muted">${t('ข้อที่มีประเด็นในร่างของ PEV ','Items with issues in the PEV draft: ')}${l.length} ${t('ข้อ','')}</div></section>
  ${revCard('scr')}${docPane('screen')}
  <div><button class="btn pri lg" data-a="goChk" data-k="scr" data-v="dec">${t('ไป Decision Meeting','Go to the Decision Meeting')} →</button></div>`};

/* ----- Decision Meeting with the accreditation subcommittee (activity 15) ----- */
VIEWS.dec=function(){const h=vDec(),card=revCard('dec');const note=`<div class="note info">${t('ผลตั้งต้นของแต่ละข้อมาจากผลหลังคณะกรรมการกลั่นกรอง ถ้ายังไม่มีจะใช้ร่างของ PEV','Each item starts from the post-screening result, or the PEV draft if screening has not rated it.')}</div>`;
  const i=h.indexOf('<div class="slide">');return i<0?h+note+card:h.slice(0,i)+note+card+h.slice(i)};

/* ----- final report: approval by the subcommittee (16) and the council (17) ----- */
const vReport=VIEWS.report;VIEWS.report=function(){const h=vReport();const cnt={N:0,R:0,C:0,W:0,D:0,S:0,'':0};ALL.forEach(x=>{const r=finalR(x.c,x.it.id).r;cnt[r||'']=(cnt[r||'']||0)+1});
  const card=`<section class="card col"><div class="row" style="justify-content:space-between;align-items:baseline"><h2>${t('สรุปผลการตรวจรับรอง','Result summary')}</h2><span class="small muted">${t('ผลรายข้อปิดที่ขั้นนี้ ตามผลของ Decision Meeting','Item results close here, from the Decision Meeting')}</span></div>
   <div class="row" style="gap:8px">${['N','S','R','C','W','D'].map(r=>`<span class="st wait">${chipS(r)} ${RNAME(r)} <b>${cnt[r]}</b></span>`).join('')}${cnt['']?`<span class="st part"><i></i>${t('ยังไม่มีผล ','not rated ')}${cnt['']}</span>`:''}</div>
   <div class="grid2">${inp('report','approveSub',t('คณะอนุกรรมการรับรองมาตรฐานคุณภาพการศึกษาฯ เห็นชอบ','Approved by the accreditation subcommittee'),'date')}${inp('report','approveCouncil',t('คณะกรรมการสภาวิศวกรอนุมัติ','Approved by the Council of Engineers board'),'date')}</div></section>`;
  return card+h};

/* ----- TABEE accreditation calendar (18 activities) ----- */
const TMON=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
const pad2=n=>String(n).padStart(2,'0');
const isoD=(y,m,d)=>{const x=new Date(y,m-1,d);return x.getFullYear()+'-'+pad2(x.getMonth()+1)+'-'+pad2(x.getDate())};
const addD=(s,n)=>{const[y,m,d]=s.split('-').map(Number);return isoD(y,m,d+n)};
const todayISO=()=>{const x=new Date();return isoD(x.getFullYear(),x.getMonth()+1,x.getDate())};
const tsISO=ts=>{const x=new Date(ts);return isNaN(x)?'':isoD(x.getFullYear(),x.getMonth()+1,x.getDate())};
const fmtS=s=>{if(!s)return'';const[y,m,d]=s.split('-').map(Number);return d+' '+TMON[m-1]};
function tlYear(){const o=P('tl');if(+o.year>2400)return+o.year;const a1=P('tl').d?.[1]||tlLinked(1);if(a1)return+a1.slice(0,4)+543-(+a1.slice(5,7)<3?1:0);const m=String(S.meta.cycle||'').match(/25\d\d/);if(m)return+m[0];const x=new Date();return x.getFullYear()+543-(x.getMonth()<4?1:0)}
/* window kinds: w = week n of a month (week 4 runs to month end), m = whole month, r = month range, a = days after another activity */
const TL=[
 [1,'สถาบันการศึกษายื่นใบสมัครพร้อมรายงานการประเมินตนเอง (SER)','สถาบันการศึกษา',{w:[5,0,1]}],
 [2,'คณะทำงานกลั่นกรองฯ กลั่นกรองรายงานการประเมินตนเองและแจ้งตอบรับคำขอ','คณะทำงานกลั่นกรองฯ',{w:[6,0,1]}],
 [3,'สถาบันการศึกษาชำระค่าธรรมเนียมคำขอ','สถาบันการศึกษา',{m:[7,0]}],
 [4,'สภาวิศวกรแต่งตั้งคณะผู้ตรวจประเมินฯ และอนุกรรมการประสานงาน','สภาวิศวกร',{m:[7,0]}],
 [5,'คณะผู้ตรวจประเมินฯ และอนุกรรมการประสานงานตรวจ SER และพิจารณาเอกสารที่ต้องขอเพิ่ม','PEV · อนุกรรมการประสานงาน',{r:[8,0,9,0]}],
 [6,'สภาวิศวกรแจ้งรายการให้ชี้แจงหรือส่งเอกสารเพิ่มเติม และสถาบันการศึกษาส่งกลับ','สภาวิศวกร · สถาบันการศึกษา',{w:[9,0,4]}],
 [7,'คณะผู้ตรวจประเมินฯ ตรวจเอกสารที่ส่งเพิ่ม','PEV',{m:[10,0]}],
 [8,'สภาวิศวกรแจ้งนัดตรวจเยี่ยมและแจ้งชำระค่าใช้จ่ายการตรวจประเมิน','สภาวิศวกร',{w:[10,0,4]}],
 [9,'สถาบันการศึกษาชำระค่าใช้จ่ายการตรวจประเมิน','สถาบันการศึกษา',{m:[11,0]}],
 [10,'คณะผู้ตรวจประเมินฯ ตรวจเยี่ยมสถาบันการศึกษา','PEV',{r:[11,0,12,0]}],
 [11,'คณะผู้ตรวจประเมินฯ เสนอ Fact Finding Report','PEV',{a:[10,7],lbl:['ภายใน 1 สัปดาห์หลังตรวจเยี่ยม','within 1 week after the visit']}],
 [12,'สถาบันการศึกษาส่งเอกสารชี้แจงตาม Fact Finding Report','สถาบันการศึกษา',{a:[11,7],lbl:['ภายใน 1 สัปดาห์หลังได้รับ FFR','within 1 week after the FFR']}],
 [13,'คณะผู้ตรวจประเมินฯ และอนุกรรมการประสานงานเตรียมรายงานผลการรับรองเสนอคณะทำงานกลั่นกรองฯ','PEV · อนุกรรมการประสานงาน',{m:[2,1]}],
 [14,'คณะทำงานกลั่นกรองฯ ประชุมพิจารณาและเสนอแนะให้คณะผู้ตรวจประเมินฯ ปรับปรุง','คณะกรรมการกลั่นกรอง',{m:[3,1]}],
 [15,'สภาวิศวกรจัดประชุม Decision Meeting','สภาวิศวกร · คณะอนุกรรมการรับรองฯ',{m:[3,1]}],
 [16,'คณะอนุกรรมการรับรองมาตรฐานคุณภาพการศึกษาฯ ให้ความเห็นชอบ','คณะอนุกรรมการรับรองฯ',{m:[4,1]}],
 [17,'คณะกรรมการสภาวิศวกรอนุมัติ','คณะกรรมการสภาวิศวกร',{m:[5,1]}],
 [18,'สภาวิศวกรแจ้งผลการรับรองให้สถาบันการศึกษา','สภาวิศวกร',{m:[5,1]}]];
const TLV={setup:[2,3,4],files:[1],ai:[5],pv1:[5],req:[6],pv2:[7],appt:[8,9],plan:[10],qs:[10],d1:[10],d2:[10],ex:[10],fact:[11],resp:[12],post:[13],screen:[14],dec:[15],report:[16,17],notify:[18]};
const TLGO={1:'files',2:'setup',3:'setup',4:'setup',5:'pv1',6:'req',7:'pv2',8:'appt',9:'appt',10:'d1',11:'fact',12:'resp',13:'post',14:'screen',15:'dec',16:'report',17:'report',18:'notify'};
function tlLinked(n){const m=S.meta,d=m.dates||{},rg=k=>d[k]?.to||d[k]?.from||'';
  switch(n){case 1:{const f=(P('files').list||[]).filter(f=>f.kind==='SER').sort((a,b)=>a.at-b.at)[0];return f?tsISO(f.at):''}
    case 5:return rg('pv1');case 7:return rg('pv2');case 10:return rg('ex')||rg('d2')||rg('d1');
    case 11:return P('resp').sent||'';case 12:return P('resp').received||'';case 13:return P('draft').sent||'';case 14:return P('screen').mtg||'';
    case 15:return P('dec').mtg||'';case 16:return P('report').approveSub||'';case 17:return P('report').approveCouncil||'';case 18:return P('notify').date||P('notify').tl?.sent||''}return''}
const tlActual=n=>P('tl').d?.[n]||tlLinked(n);
function tlWin(n,memo={}){if(memo[n])return memo[n];const a=TL[n-1],sp=a[3],Y=tlYear()-543;let s,e,lbl;
  if(sp.w){const[m,yo,w]=sp.w,y=Y+yo,last=new Date(y,m,0).getDate();s=isoD(y,m,(w-1)*7+1);e=isoD(y,m,w===4?last:w*7);lbl=t('สัปดาห์ที่ ','Week ')+w+' '+TMON[m-1]}
  else if(sp.m){const[m,yo]=sp.m,y=Y+yo;s=isoD(y,m,1);e=isoD(y,m+1,0);lbl=TMON[m-1]}
  else if(sp.r){const[m1,y1,m2,y2]=sp.r;s=isoD(Y+y1,m1,1);e=isoD(Y+y2,m2+1,0);lbl=TMON[m1-1]+' – '+TMON[m2-1]}
  else{const[ref,days]=sp.a,prev=tlWin(ref,memo),from=tlActual(ref)||prev.e;s=addD(from,1);e=addD(from,days);lbl=t(sp.lbl[0],sp.lbl[1])}
  return memo[n]={s,e,lbl}}
const TLST={done:['เสร็จแล้ว','Done','ok'],wait:['ยังไม่บันทึก','Not recorded','wait']};
function tlStat(n){const w=tlWin(n),a=tlActual(n);return{...w,a,k:a?'done':'wait'}}
const tlPill=s=>`<span class="tlp ${TLST[s.k][2]}"><i></i>${t(TLST[s.k][0],TLST[s.k][1])}${s.a?' · '+fmtS(s.a):''}</span>`;
function tlRowInput(n){const o=P('tl').d?.[n]||'',ln=tlLinked(n);return`<label class="tld"><span>${t('เสร็จจริง','Done on')}</span><input type="date" id="tl_d${n}" data-b="tl:d.${n}" data-rr="1" value="${esc(o||ln)}" ${S.canWrite?'':'disabled'}>${o&&o!==ln&&ln?`<small class="muted">${t('ในระบบ ','system ')}${fmtS(ln)}</small>`:ln&&!o?`<small class="muted">${t('จากข้อมูลในระบบ','from step data')}</small>`:''}</label>`}
function tlStrip(v){const ns=TLV[v];if(!ns||!S.pid)return'';
  return`<section class="tlstrip" aria-label="${t('กำหนดเวลาตามปฏิทิน TABEE','TABEE calendar timing')}">${ns.map(n=>{const s=tlStat(n),a=TL[n-1];return`<div class="tlc ${TLST[s.k][2]}"><span class="no mono">${pad2(n)}</span><div class="col" style="gap:2px;min-width:0;flex:1"><b>${esc(a[1])}</b><span class="small muted">${esc(a[2])} · ${t('กำหนด','Due')} ${esc(s.lbl)}</span></div>${tlPill(s)}${tlRowInput(n)}</div>`}).join('')}<button class="btn sm ghost" data-a="go" data-v="cal">${t('ปฏิทินทั้งหมด','Full calendar')} →</button></section>`}

VIEWS.cal=function(){const Y=tlYear(),Yc=Y-543,months=[...Array(13)].map((_,i)=>({y:Yc+(i+4>=12?1:0),m:(i+4)%12+1}));const st=TL.map(a=>tlStat(a[0]));
  const done=st.filter(s=>s.k==='done').length,cur=st.findIndex(s=>s.k!=='done');
  const mpos=(d,n)=>{if(!d)return null;const[y,m,dd]=d.split('-').map(Number);let i=(m+7)%12;if(n>=13&&i<4)i+=12;return(i+(dd-1)/new Date(y,m,0).getDate())/13*100};
  const pos=d=>{if(!d)return null;const[y,m,dd]=d.split('-').map(Number);const i=(y-Yc)*12+m-5;return(i+(dd-1)/new Date(y,m,0).getDate())/13*100};
  return`<section class="phead"><div class="col"><span class="eyebrow">${t('ปฏิทินการรับรอง TABEE · 18 กิจกรรม','TABEE ACCREDITATION CALENDAR · 18 ACTIVITIES')}</span><h1>${t('ปฏิทินการรับรอง','Accreditation calendar')}</h1><p>${t('กำหนดการรายเดือนของ TABEE วันที่เสร็จจริงดึงจากข้อมูลในแต่ละขั้นอัตโนมัติ แก้เองได้ทุกกิจกรรม','Monthly TABEE schedule. Actual dates come from each step automatically and can be edited.')}</p></div>
   <div class="row" style="gap:10px;align-items:flex-end"><button class="btn" data-a="docx" data-d="cal">${t('ดาวน์โหลดปฏิทิน (.docx)','Download calendar (.docx)')}</button></div></section>
  <section class="card col" style="gap:8px"><div class="prog-bar" style="max-width:none"><div class="t"><span>${t('กิจกรรมที่บันทึกวันที่เสร็จแล้ว','Activities with a completion date')}</span><b>${done} / ${TL.length}</b></div><div class="bar" aria-hidden="true"><i style="width:${Math.round(100*done/TL.length)}%"></i></div></div><span class="small muted">${t('แถบแสดงช่วงเดือนตามกำหนดการของ TABEE เส้นดำคือวันที่เสร็จจริง ใช้ได้กับทุกปีการรับรอง','Bars show the TABEE month windows; the black mark is the completion date. Works for any accreditation year.')}</span></section>
  <section class="card tight"><div class="scroll"><div class="gantt"><div class="gn-h"><span>${t('กิจกรรม','Activity')}</span><div class="gn-m">${months.map(x=>`<span>${TMON[x.m-1]}</span>`).join('')}</div></div>
   ${TL.map((a,i)=>{const s=st[i],l=pos(s.s),r=pos(addD(s.e,1)),ap=mpos(s.a,a[0]);
     return`<div class="gn-r ${i===cur?'cur':''}"><button class="gn-l" data-a="go" data-v="${TLGO[a[0]]}"><span class="no mono">${pad2(a[0])}</span><span><b>${esc(a[1])}</b><small>${esc(a[2])} · ${esc(s.lbl)}</small></span></button>
       <div class="gn-t">${l!=null?`<i class="gn-w ${TLST[s.k][2]}" style="left:${Math.max(0,l)}%;width:${Math.max(.8,Math.min(100,r)-Math.max(0,l))}%"></i>`:''}${ap!=null&&ap>=0&&ap<=100?`<i class="gn-a" style="left:${ap}%" title="${t('เสร็จจริง ','Done ')}${fmtS(s.a)}"></i>`:''}</div>
       <div class="gn-s">${tlPill(s)}${tlRowInput(a[0])}</div></div>`}).join('')}</div></div></section>`};

/* ----- documents ----- */
DOCS.screen=function(){const sc=P('screen'),rows=[['เกณฑ์/ข้อ','ร่าง PEV','ประธานคณะกรรมการกลั่นกรองเสนอ','PEV','ผลหลังกลั่นกรอง']];
  ALL.forEach(x=>{const d=revOf(x.c,x.it.id,'scr'),b=chainR(x.c,x.it.id,PRE_FIN);if(!(d.sub&&(d.sub.r||d.sub.n))&&!(b.r&&RT[b.r].sev>0))return;
    const r=scrR(x.c,x.it.id);rows.push([x.c+' / '+x.it.code,b.r?RT[b.r].th:'-',(d.sub?.r?RT[d.sub.r].th:'')+(d.sub?.n?'\n'+d.sub.n:''),d.pev?.v?(d.pev.v==='agree'?'เห็นตาม':'เห็นแย้ง'+(d.pev.reason?'\nเหตุผล: '+d.pev.reason:'\n(ยังไม่ระบุเหตุผล)')):'',r?RT[r].th:''])});
  return{file:'สรุปผลการพิจารณาของคณะกรรมการกลั่นกรอง',blocks:[bH('สรุปผลการพิจารณาร่างรายงานผลการตรวจรับรองของคณะกรรมการกลั่นกรอง'),bP('ชื่อหลักสูตร: '+progTitle()+'\nชื่อสถาบันการศึกษา: '+(S.meta.inst||'')+'\nประธานคณะกรรมการกลั่นกรอง: '+(sc.chair||'')+(sc.members?'\nกรรมการที่ร่วมพิจารณา: '+sc.members:'')+'\nวันที่ประชุม: '+fmtD(sc.mtg)),bT(rows,[900,1100,1600,1300,1100],true)]}};
DOCS.cal=function(){const rows=[['ลำดับ','กิจกรรม','ผู้รับผิดชอบ','กำหนด','เสร็จจริง','สถานะ']];TL.forEach(a=>{const s=tlStat(a[0]);rows.push([String(a[0]),a[1],a[2],s.lbl,s.a?fmtD(s.a):'',TLST[s.k][0]])});
  return{file:'ปฏิทินการรับรอง',blocks:[bH('ปฏิทินกิจกรรมการรับรองมาตรฐานคุณภาพการศึกษาวิศวกรรมศาสตร์'),bP('ชื่อหลักสูตร: '+progTitle()+'\nชื่อสถาบันการศึกษา: '+(S.meta.inst||'')+'\nข้อมูล ณ วันที่ '+fmtD(todayISO())),bT(rows,[500,2300,1100,1100,800,900],true)]}};
GENG[2][2].push(['screen','w','DOCX','สรุปผลการพิจารณาของคณะกรรมการกลั่นกรอง']);
GENG[3][2].push(['cal','w','DOCX','ปฏิทินการรับรอง (18 กิจกรรม)']);
const genStatus7=genStatus;genStatus=function(k){if(k==='screen'){const g=revGap('scr');return g.n?(g.wait||g.noReason?['part',g.wait+t(' ข้อรอ PEV ตอบ',' awaiting PEV')+(g.noReason?' · '+g.noReason+t(' ข้อเห็นแย้งไม่มีเหตุผล',' without reason'):'')]:['ok',g.n+t(' ข้อ',' items')+(P('screen').mtg?' · '+fmtD(P('screen').mtg):'')]):['wait',t('หลัง PEV ร่างรายงาน','After the PEV draft')]}
  if(k==='cal'){const d=TL.filter(a=>tlStat(a[0]).k==='done').length;return['ok',t('บันทึกแล้ว ','Recorded ')+d+' / 18']}
  if(k==='report'){const r=genStatus7(k);return r[0]==='wait'&&revUsed('scr')?['part',t('ร่างจากผลหลังกลั่นกรอง','Draft from the post-screening result')]:r}
  return genStatus7(k)};
const vTools=VIEWS.tools;VIEWS.tools=function(){return vTools().replace('เอกสาร 9 ฉบับ','เอกสาร '+GENG.reduce((s,g)=>s+g[2].length,0)+' ฉบับ').replace('9 TABEE DOCUMENTS',GENG.reduce((s,g)=>s+g[2].length,0)+' TABEE DOCUMENTS')};

/* ----- overview: timeline instead of the old schedule list ----- */
const vHome=VIEWS.home;VIEWS.home=function(){const h=vHome();const k='<section class="card col" style="gap:2px"><h2 style="margin-bottom:8px">';const i=h.lastIndexOf(k);if(i<0)return h;const j=h.indexOf('</section>',i)+10;
  const st=TL.map(a=>({a,s:tlStat(a[0])}));let f=st.findIndex(x=>x.s.k!=='done');if(f<0)f=st.length-1;const from=Math.max(0,Math.min(f-2,st.length-7));
  const box=`<section class="card col" style="gap:2px"><div class="row" style="justify-content:space-between;align-items:baseline;margin-bottom:6px"><h2>${t('กำหนดการ TABEE','TABEE schedule')}</h2><button class="btn sm ghost" data-a="go" data-v="cal">${t('ทั้ง 18 กิจกรรม','All 18')} →</button></div>
   ${st.slice(from,from+7).map(({a,s})=>`<button class="sched tl ${s.k}" data-a="go" data-v="${TLGO[a[0]]}"><i class="${s.k==='done'?'done':TL.indexOf(a)===f?'now':''}"></i><span><span class="mono tiny muted">${pad2(a[0])}</span> ${esc(a[1].length>64?a[1].slice(0,64)+'…':a[1])}</span><span class="mono">${s.a?fmtS(s.a):esc(s.lbl)}</span></button>`).join('')}</section>`;
  return h.slice(0,i)+box+h.slice(j)};

/* ----- step strip on mapped views (wrapped last so every earlier wrapper is kept) ----- */
Object.keys(TLV).forEach(v=>{const f=VIEWS[v];if(f)VIEWS[v]=function(){return tlStrip(v)+f.apply(this,arguments)}});

/* ----- status ----- */
const status7=status;
status=function(v){if(v==='screen'){const g=revGap('scr');return{c:g.n&&!g.wait&&!g.noReason&&P('screen').mtg?'done':(g.n||P('screen').mtg)?'part':'',b:g.n?(g.n-g.wait)+'/'+g.n:''}}
  if(v==='dec'){const g=revGap('dec'),s=status7(v);if(g.noReason||g.wait)return{c:'part',b:(g.n-g.wait)+'/'+g.n};return s}
  if(v==='post'){const s=status7(v);return P('draft').sent&&s.c==='part'?{c:'done',b:s.b}:s}
  if(v==='report'){const s=status7(v);return P('report').approveCouncil?{c:'done',b:s.b}:s}
  if(v==='cal')return{c:'',b:''};
  return status7(v)};

/* ----- actions ----- */
const cell7=A.cell,openItem7=A.openItem;
const viewOfStage=v=>v==='scr'?'screen':v==='fin'?'dec':v;
Object.assign(A,{
revSub(d){const c=+d.c,key=d.st,L=REV[key];if(!L)return;const it=IT(c,d.id),o=it[key]||(it[key]={}),s=o.sub||(o.sub={});s.r=s.r===d.r?'':d.r;s.t=Date.now();s.by=P(L.part)[L.name]||'';if(o.pev)o.pev.v='';Store.save('c'+c);render(true)},
revPev(d){const c=+d.c,key=d.k,it=IT(c,d.id),o=it[key]||(it[key]={}),p=o.pev||(o.pev={});p.v=p.v===d.v?'':d.v;p.by=S.who;p.t=Date.now();Store.save('c'+c);
  if(p.v==='disagree'&&!String(p.reason||'').trim())toast(t('เห็นแย้งต้องระบุเหตุผล ผลของ PEV จะคงไว้','A disagreement needs a reason; the PEV rating is kept'));render(true);
  if(p.v==='disagree')setTimeout(()=>{const el=document.getElementById('rp_'+key+'_'+d.id);if(el)el.focus()},30)},
revAll(d){S['revAll_'+d.k]=d.v==='1';render(true)},
decSub(d){A.revSub({...d,st:'dec'})},decPev(d){A.revPev({...d,k:'dec'})},decAll(d){A.revAll({...d,k:'dec'})},
goChk(d){const g=revGap(d.k);if(g.noReason){toast(t('ยังมี ','')+g.noReason+t(' ข้อที่เห็นแย้งแต่ยังไม่ระบุเหตุผล',' disagreement(s) without a reason'));const el=document.querySelector('.dcard.bad');if(el)el.scrollIntoView({block:'center'});return}
  if(g.wait)toast(t('ยังมี ','')+g.wait+t(' ข้อที่ PEV ยังไม่ตอบ',' item(s) still awaiting PEV'));A.go({v:d.v})},
cell(d){cell7({...d,v:viewOfStage(d.v)})},
openItem(d){openItem7({...d,v:viewOfStage(d.v)})},
genAll(){busy(t('กำลังสร้างเอกสารทุกฉบับ…','Building every document…'),async()=>{await lib(L_ZIP);const z=new JSZip();let i=1;const nn=()=>String(i++).padStart(2,'0')+' ';const dx=async k=>{const d=DOCS[k]();z.file(nn()+d.file+'.docx',await makeDocx(d.blocks))};
  z.file(nn()+'PEV-Worksheet Ver.3.xlsx',await makeXlsx());for(const k of['req','appt','plan','qs','iq','fact','screen'])if(DOCS[k])await dx(k);
  z.file(nn()+'Program Decision.pptx',await makePptx());for(const k of['report','notify','cal'])await dx(k);
  await saveFile('เอกสาร TABEE - '+fileBase()+'.zip',await z.generateAsync({type:'blob',compression:'DEFLATE'}))})}
});

/* ----- Reset clears everything of this program: details, team, ratings, files, letters, reports, calendar ----- */
Object.assign(A,{
resetAsk(){if(!S.pid)return;$('#modal').innerHTML=`<div class="mc" style="max-width:540px"><h2>${t('ล้างข้อมูลทั้งหมด','Clear everything')}</h2><p style="margin:0">${t('ล้างทุกส่วนของ','This clears every part of')} <b>${esc(progTitle())}</b> ${t('ทั้งข้อมูลหลักสูตรและสถาบัน รายชื่อคณะผู้ตรวจ เอกสารที่อัปโหลด ผล Auto Check ผลประเมินทุกรอบ action รายข้อ จดหมาย แผน คำถาม Fact Finding คำชี้แจง ผลกลั่นกรอง Decision Meeting รายงาน หนังสือแจ้งผล และปฏิทิน การล้างนี้ย้อนกลับไม่ได้',': program and institution details, the team, uploaded documents, Auto Check, every round of ratings, item actions, letters, plans, questions, fact finding, responses, screening, Decision Meeting, reports, the notification and the calendar. This cannot be undone.')}</p><div class="note">${t('ถ้ายังต้องใช้ข้อมูลเดิม กด Save เก็บเป็นไฟล์ก่อน แล้วเปิดกลับได้ด้วย Open','If you may need the current data, Save it to a file first; Open brings it back.')}</div><div class="row"><button class="btn" data-a="saveProj">${ic('save')}Save</button><span class="sp"></span><button class="btn" data-a="closeModal">${t('ยกเลิก','Cancel')}</button><button class="btn pri" data-a="resetDo">${t('ล้างข้อมูลทั้งหมด','Clear everything')}</button></div></div>`;$('#modal').classList.add('on')},
async resetDo(){A.closeModal();const files=[...(P('files').list||[])];
  const keys=new Set([...Object.keys(S.parts),'c1','c2','c3','c4','c5','c6','c7','c8']);
  keys.forEach(k=>{delete S.parts[k];P(k);Store.save(k)});
  S.meta={createdAt:S.meta.createdAt||Date.now()};Store.save('meta');
  Object.assign(S,{crit:1,sel:null,filter:'all',cmp:false,qmode:undefined,decAll:false,uploadKind:'',autoInfo:null,view:'setup'});
  Object.keys(S).filter(k=>k.startsWith('revAll_')).forEach(k=>delete S[k]);
  try{location.hash='setup'}catch(e){}
  for(const f of files)await Store.delText(f);S.texts={};if(typeof DOCCACHE!=='undefined')Object.keys(DOCCACHE).forEach(k=>delete DOCCACHE[k]);
  log('ล้างข้อมูลทั้งหมด (Reset)');render();toast(t('ล้างข้อมูลทั้งหมดแล้ว กรอกข้อมูลหลักสูตรใหม่ได้เลย','Everything cleared. Enter the new program details.'))}
});

/* ----- interview groups used by programs with co-operative education ----- */
['นักศึกษาสหกิจศึกษา','พนักงานที่ปรึกษา (สถานประกอบการ)','อาจารย์นิเทศ / ผู้ประสานงานสหกิจศึกษา'].forEach(g=>{if(!GROUPS.includes(g))GROUPS.push(g)});

/* ----- Decision Meeting draft: one line per item, finding text from the PEV draft (review comments stay in their own layer) ----- */
A.decDraft=function(){const d=P('dec'),f=P('fact');let n=0;CHECKLIST.forEach(c=>{const x=d['c'+c.n]||(d['c'+c.n]={});const rs=ALL.filter(a=>a.c===c.n).map(a=>({a,f:finalR(c.n,a.it.id)}));if(!rs.some(o=>o.f.r))return;
  const line=o=>{const id=o.a.it.id,late=o.f.st==='fin'||o.f.st==='scr';let n0=stripWho(late?(finalR(c.n,id,'post').n||''):(o.f.n||''));
    if(late){const base=finalR(c.n,id,'post').r;for(const k of['scr','dec']){const d=revOf(c.n,id,k);if(d.sub?.r&&d.pev?.v==='agree'&&d.sub.r===o.f.r&&d.sub.r!==base){n0=(n0?n0+' · ':'')+(k==='scr'?'คณะกรรมการกลั่นกรองเสนอ':'คณะอนุกรรมการฯ เสนอ')+(d.sub.r===finalR(c.n,id,'ex').r?'คงระดับ':'ปรับเป็นระดับ')+RT[d.sub.r].th+(d.sub.n?' เพราะ'+String(d.sub.n).replace(/^เพราะ/,''):'')+' คณะผู้ตรวจประเมินเห็นตาม';break}}}
    return'ข้อ '+o.a.it.code+(n0?': '+String(n0).replace(/\s*\n\s*/g,' · '):'')};
  const by=k=>rs.filter(o=>o.f.r===k).map(line).join('\n');const set=(k,v)=>{if(!x[k]&&v){x[k]=v;n++}};
  const facts=Object.values(f['c'+c.n]||{}).filter(s=>s&&s!=='ไม่มีประเด็น').join('\n');
  set('fact',facts||'การดำเนินงานของหลักสูตรเป็นไปตามเกณฑ์ข้อ '+c.n+' '+c.th+' ของ TABEE');['D','W','C','R'].forEach(k=>set(k,by(k)||'ไม่มี'));
  const need=[by('D')&&'ข้อบกพร่อง',by('W')&&'ข้อด้อย',by('C')&&'ข้อวิตกกังวล'].filter(Boolean);set('rec',need.length?'แก้ไข'+need.join('และ')+'ให้เป็นไปตามเกณฑ์ TABEE':'ไม่มี')});
  Store.save('dec');toast(t('ร่างแล้ว ','Drafted ')+n+t(' ช่อง',' boxes'));render(true)};

/* ----- formal documents do not carry evaluator names in front of findings ----- */
function stripWho(s){const ns=members().map(m=>m.name).filter(Boolean);return String(s||'').split('\n').map(l=>{for(const n of ns){if(l.startsWith(n+': '))return l.slice(n.length+2)}return l}).join('\n')}
A.factDraft=function(){const f=P('fact');let n=0;CHECKLIST.forEach(cr=>{const fc=f['c'+cr.n]||(f['c'+cr.n]={});cr.groups.forEach(g=>{if(fc['g'+g.n])return;
    const rs=g.items.map(it=>({it,f:finalR(cr.n,it.id,'ex')}));if(!rs.some(x=>x.f.r))return;
    const iss=rs.filter(x=>x.f.r&&RT[x.f.r].sev>0).map(x=>(g.items.length>1?x.it.code+' ':'')+stripWho(x.f.n||RT[x.f.r].th).split('\n')[0]);
    const facts=[];g.items.forEach(it=>{for(const st of Object.keys(ACT_ST)){const a=actOf(cr.n,it.id,st);if(a.doc?.on&&a.doc.found)facts.push((g.items.length>1?it.code+' ':'')+'จาก '+(a.doc.where||'เอกสาร')+': '+a.doc.found);if(a.int?.on&&a.int.ans)facts.push((g.items.length>1?it.code+' ':'')+'จากการสัมภาษณ์'+((a.int.groups||[]).length?' ('+a.int.groups.join(', ')+')':'')+': '+a.int.ans)}});
    fc['g'+g.n]=[...iss,...facts].join('\n')||'ไม่มีประเด็น';n++})});Store.save('fact');toast(t('ร่างแล้ว ','Drafted ')+n+t(' หัวข้อ',' headings'));render(true)};

/* ----- landing: sample cases from the TABEE PEV workshop kits ----- */
const SAMPLE_LIST=typeof SAMPLES!=='undefined'?SAMPLES:[];
const renderLanding6=renderLanding;
renderLanding=function(){renderLanding6();const v=$('#view');if(!v)return;
  const demo=v.querySelector('[data-a=demo]');if(demo)demo.remove();
  if(!SAMPLE_LIST.length)return;const RES={full:'รับรอง',cond:'รับรองแบบมีเงื่อนไข',prov:'รับรองชั่วคราว',wait:'รอผลการปรับปรุงแก้ไข',no:'ไม่รับรอง'};
  const sec=document.createElement('section');sec.className='card col';sec.id='samples';
  sec.innerHTML=`<div class="row" style="justify-content:space-between;align-items:baseline"><h2>${t('ตัวอย่างเคสจากชุดฝึกอบรม PEV','Sample cases from the PEV training kits')}</h2><span class="small muted">${t('หลักสูตรสมมติ · มหาวิทยาลัยเทคโนโลยีวนาธาร','Fictional programs · Wanathan University')}</span></div>
   <p class="small muted" style="margin:0;max-width:78ch">${t('แต่ละเคสกรอกครบทุกขั้น ตั้งแต่ Pre-visit 1 จนถึงแจ้งผลการรับรอง ตามประเด็นที่ฝังไว้ใน SER จำลอง กดเปิดแล้วระบบสร้างเป็นรายการใหม่ ไม่ทับรายการที่มีอยู่ ไฟล์ SER ไม่ได้แนบมาด้วย ถ้าต้องการใช้ Auto Check ให้นำเข้าไฟล์จากชุดฝึกอบรมเอง','Each case is filled through every step. Opening one creates a new evaluation and leaves existing ones untouched. SER files are not included.')}</p>
   <div class="smpl">${SAMPLE_LIST.map(s=>`<article class="smc"><div class="row" style="justify-content:space-between;align-items:center;gap:8px"><span class="mono tiny muted">${esc(s.short)}</span>${s.video?`<span class="tlp ok"><i></i>${t('มีวีดีโอสอน','Tutorial video')}</span>`:''}</div>
     <b>${esc(s.field)}</b><p class="small muted">${esc(s.about)}</p>
     <div class="lvs" aria-label="${t('ผลสุดท้ายรายเกณฑ์','Final level by criterion')}">${[1,2,3,4,5,6,7,8].map(c=>`<span title="${t('เกณฑ์ข้อ ','Criterion ')}${c}: ${esc(RNAME(s.lv[c]||'N'))}">${chipS(s.lv[c]||'N')}<small>${c}</small></span>`).join('')}</div>
     <div class="row" style="justify-content:space-between;align-items:center"><span class="small">${esc(RES[s.result]||'')}</span><button class="btn pri sm" data-a="sample" data-k="${esc(s.key)}" ${S.canWrite?'':'disabled'}>${t('เปิดตัวอย่าง','Open sample')} →</button></div></article>`).join('')}</div>`;
  const cards=v.querySelectorAll('section.card');const target=cards[cards.length-1];if(target)target.after(sec);else v.appendChild(sec)};
A.sample=async function(d){const s=SAMPLE_LIST.find(x=>x.key===d.k);if(!s)return;const o=JSON.parse(JSON.stringify(s.data));
  const pid=uid();await Store.open(pid);S.meta=o.meta;S.meta.createdAt=Date.now();S.parts=o.parts;Store.save('meta');Object.keys(S.parts).forEach(k=>Store.save(k));
  log('เปิดเคสตัวอย่าง '+s.field);S.view='home';S.crit=1;render();toast(t('เปิดเคสตัวอย่างแล้ว: ','Sample opened: ')+s.field)};

/* ---------- rev.7: built-in case documents, tutorial video, trainee / instructor editions ---------- */
const ED=typeof PEV_EDITION!=='undefined'?PEV_EDITION:'instructor';
const CASES=(typeof SAMPLES!=='undefined'?SAMPLES:[]).filter(s=>ED==='instructor'||s.key==='mt');
const VIDEO='media/pev-studio-tutorial.mp4';
const CHAPTERS=[[0,'เริ่มต้นและภาพรวม'],[14,'ข้อมูลหลักสูตรและคณะผู้ตรวจ · นำเข้า SER'],[49,'Auto Check'],[69,'Pre-visit 1 · ประเมินหลายคน · เลือก action'],[107,'ขอเอกสารเพิ่มเติม'],[119,'Pre-visit 2 · เปรียบเทียบรอบ'],[143,'แผนตรวจเยี่ยม · นัดตรวจเยี่ยม'],[166,'แนวคำถามสัมภาษณ์รายช่วง · เลือกตามประเด็น'],[198,'Visit Day 1 · บันทึกคำตอบ · ลงผลรายข้อ'],[235,'Visit Day 2 · Exit Statement'],[264,'FFR · คำชี้แจง · ร่างรายงาน'],[298,'คณะกรรมการกลั่นกรอง'],[305,'Decision Meeting'],[317,'รายงานผล · แจ้งผล · ปฏิทิน · สร้างเอกสาร']];
const caseOf=k=>CASES.find(s=>s.key===k);
const docsOf=s=>(s?.docs||[]).filter(d=>ED==='instructor'||d.stage!=='manual');
const fmtMMSS=x=>Math.floor(x/60)+':'+String(x%60).padStart(2,'0');
window.PEV_CASES=window.PEV_CASES||{};
function loadCase(k){if(PEV_CASES[k])return Promise.resolve(PEV_CASES[k]);return new Promise((ok,no)=>{const sc=document.createElement('script');sc.src='cases/'+k+'/case.js';sc.onload=()=>PEV_CASES[k]?ok(PEV_CASES[k]):no(new Error('empty'));sc.onerror=()=>no(new Error('load'));document.head.appendChild(sc)})}
const DOCX_INLINE=typeof PEV_HOST!=='undefined'&&PEV_HOST==='artifact';
const docLinks=(k,d)=>[d.pdf&&(DOCX_INLINE?`<button class="btn sm" data-a="casePdf" data-k="${k}" data-s="${esc(d.pdf)}" data-n="${esc(d.name)}">${t('ดาวน์โหลด PDF','Download PDF')}</button>`:`<a class="btn sm" href="cases/${k}/${d.pdf}" target="_blank" rel="noopener">${t('เปิด PDF','Open PDF')}</a>`),d.docx&&!d.pdf&&(DOCX_INLINE?`<button class="btn sm ghost" data-a="caseDocx" data-k="${k}" data-s="${esc(d.docx)}" data-n="${esc(d.name)}">${t('ดาวน์โหลด .docx','Download .docx')}</button>`:`<a class="btn sm ghost" href="cases/${k}/${d.docx}" download="${esc(d.name)}.docx">${t('ดาวน์โหลด .docx','Download .docx')}</a>`)].filter(Boolean).join('');
window.PEV_DOCX=window.PEV_DOCX||{};
function loadDocx(k){if(PEV_DOCX[k])return Promise.resolve(PEV_DOCX[k]);return new Promise((ok,no)=>{const sc=document.createElement('script');sc.src='cases/'+k+'/docx.js';sc.onload=()=>PEV_DOCX[k]?ok(PEV_DOCX[k]):no(new Error('empty'));sc.onerror=()=>no(new Error('load'));document.head.appendChild(sc)})}
A.caseDocx=function(d){busy(t('กำลังเตรียมไฟล์…','Preparing file…'),async()=>{let m;try{m=await loadDocx(d.k)}catch(e){toast(t('โหลดไฟล์ไม่ได้','Could not load the file'));return}
  const b64=m[d.s];if(!b64){toast(t('ไม่พบไฟล์','File not found'));return}const bin=atob(b64),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  await saveFile(d.n+'.docx',new Blob([u],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'}))})};
A.casePdf=function(d){busy(t('กำลังเตรียมไฟล์…','Preparing file…'),async()=>{try{const r=await fetch('cases/'+d.k+'/'+d.s);if(!r.ok)throw 0;await saveFile(d.n+'.pdf',new Blob([await r.arrayBuffer()],{type:'application/pdf'}))}catch(e){toast(t('โหลดไฟล์ไม่ได้','Could not load the file'))}})};
const STG={start:['เอกสารตั้งต้น (ส่งพร้อม SER)','With the SER'],env:['ซองเอกสารเพิ่มเติม (ให้หลัง Pre-visit 1)','Envelope (after Pre-visit 1)'],resp:['คำชี้แจงหลัง FFR (สมมติ)','Response after FFR (simulated)'],manual:['คู่มือวิทยากร (เฉพาะวิทยากร)','Instructor manual (instructors only)']};
function docList(k,withAdd){const s=caseOf(k);if(!s)return'';const inP=new Set((S.pid?P('files').list:[]).map(f=>f.name.replace(/\.[^.]+$/,'')));
  return Object.keys(STG).map(st=>{const ds=docsOf(s).filter(d=>d.stage===st);if(!ds.length)return'';
    return`<div class="cdg"><span class="tiny muted mono">${t(STG[st][0],STG[st][1])}</span>${ds.map(d=>`<div class="cdr"><span class="nm">${esc(d.name)}</span><span class="row" style="gap:6px;flex-wrap:wrap;justify-content:flex-end">${docLinks(k,d)}${withAdd&&st!=='manual'?(inP.has(d.name)?`<span class="tlp ok"><i></i>${t('อยู่ในโครงการแล้ว','In this evaluation')}</span>`:`<button class="btn sm pri" data-a="caseAdd" data-k="${k}" data-n="${esc(d.name)}" ${S.canWrite?'':'disabled'}>${t('เพิ่มเข้าโครงการ','Add to evaluation')}</button>`):''}</span></div>`).join('')}</div>`}).join('')}

/* ----- tutorial video ----- */
A.video=function(d){$('#modal').innerHTML=`<div class="mc vid"><div class="row" style="justify-content:space-between;align-items:center"><h2>${t('วีดีโอสอนการใช้งาน PEV Studio','PEV Studio tutorial')}</h2><button class="btn ghost" data-a="closeModal">${t('ปิด','Close')}</button></div>
  <video id="tutV" src="${VIDEO}" controls preload="metadata" playsinline></video>
  <p class="small muted" style="margin:0">${t('ตัวอย่างหลักสูตรวิศวกรรมไฟฟ้า (หลักสูตรสมมติ) ตั้งแต่สร้างโครงการจนถึงแจ้งผลการรับรอง 5 นาที 58 วินาที ไม่มีเสียงพากย์ อ่านคำบรรยายบนจอ','Electrical Engineering sample from setup to result notification, 5:58, captions only.')}</p>
  <div class="chs">${CHAPTERS.map(([s,l])=>`<button class="ch" data-a="vSeek" data-v="${s}"><span class="mono">${fmtMMSS(s)}</span>${esc(l)}</button>`).join('')}</div></div>`;$('#modal').classList.add('on');
  const v=$('#tutV');if(v&&d&&d.v)v.currentTime=+d.v};
A.vSeek=function(d){const v=$('#tutV');if(v){v.currentTime=+d.v;v.play().catch(()=>{})}};

/* ----- landing: edition, video, cases ----- */
renderLanding=function(){renderLanding6();const v=$('#view');if(!v)return;const demo=v.querySelector('[data-a=demo]');if(demo)demo.remove();
  const hero=v.querySelector('.wrap > .col');
  if(hero){const b=document.createElement('div');b.className='edbar';b.innerHTML=`<span class="edt ${ED}">${ED==='trainee'?t('ฉบับผู้เข้ารับการอบรม','Trainee edition'):t('ฉบับวิทยากร','Instructor edition')}</span><button class="btn pri" data-a="video">${ic('gen')}${t('วีดีโอสอนการใช้งาน (5:58)','Tutorial video (5:58)')}</button>`;hero.appendChild(b)}
  if(!CASES.length)return;const RES={full:'รับรอง',cond:'รับรองแบบมีเงื่อนไข',prov:'รับรองชั่วคราว',wait:'รอผลการปรับปรุงแก้ไข',no:'ไม่รับรอง'};
  const sec=document.createElement('section');sec.className='card col';sec.id='samples';
  sec.innerHTML=`<div class="row" style="justify-content:space-between;align-items:baseline"><h2>${ED==='trainee'?t('เคสฝึกอบรม: วิศวกรรมวัสดุและโลหการ','Training case: Materials Engineering'):t('เคสจากชุดฝึกอบรม PEV','Cases from the PEV training kits')}</h2><span class="small muted">${t('หลักสูตรสมมติ · มหาวิทยาลัยเทคโนโลยีวนาธาร','Fictional programs · Wanathan University')}</span></div>
   <p class="small muted" style="margin:0;max-width:80ch">${ED==='trainee'?t('"เริ่มฝึก" สร้างรายการใหม่ที่มีเฉพาะ SER และเอกสารประกอบ ให้ประเมินเองตั้งแต่ Auto Check ส่วนซองเอกสารเพิ่มเติม (หลังจดหมายขอเอกสาร) และหนังสือชี้แจงหลัง FFR วิทยากรจะแจกในการอบรมตามลำดับ ให้อัปโหลดเองที่หน้าเอกสารหลักสูตร กดซ้ำได้ทุกเมื่อ ระบบสร้างรายการใหม่โดยไม่ทับรายการเดิม','"Start practice" creates an evaluation with the SER and attachments only; you evaluate from Auto Check on. The facilitator hands out the envelope (after your request letter) and the post-FFR response in turn; upload them on the Program documents page. Each start creates a new entry.'):t('"เริ่มฝึก" สร้างรายการใหม่ที่มีเฉพาะ SER และเอกสารประกอบ ให้ประเมินเองตั้งแต่ Auto Check ส่วนซองเอกสารเพิ่มเติมเพิ่มได้ที่หน้าเอกสารหลักสูตรเมื่อถึง Pre-visit 2 · "ดูตัวอย่างที่กรอกครบ" เปิดเคสที่กรอกทุกขั้นแล้ว ทั้งสองแบบสร้างเป็นรายการใหม่ ไม่ทับรายการเดิม','"Start practice" creates an evaluation with the SER and attachments only. "View completed example" opens a fully filled case. Both create a new evaluation.')}</p>
   <div class="smpl">${CASES.map(s=>`<article class="smc"><div class="row" style="justify-content:space-between;align-items:center;gap:8px"><span class="mono tiny muted">${esc(s.short)}</span>${s.video?`<button class="tlp ok" data-a="video" style="border:0;cursor:pointer"><i></i>${t('ดูวีดีโอสอน','Watch tutorial')}</button>`:''}</div>
     <b>${esc(s.field)}</b><p class="small muted">${esc(s.about)}</p>
     ${s.lv?`<div class="lvs">${[1,2,3,4,5,6,7,8].map(c=>`<span title="${t('เกณฑ์ข้อ ','Criterion ')}${c}">${chipS(s.lv[c]||'N')}<small>${c}</small></span>`).join('')}</div><span class="small">${t('ผลในตัวอย่าง: ','Example result: ')}${esc(RES[s.result]||'')}</span>`:''}
     <details class="cdocs"><summary>${t('เอกสารของเคส','Case documents')} (${docsOf(s).length})</summary>${docList(s.key,false)}</details>
     <div class="row" style="gap:8px;flex-wrap:wrap"><button class="btn pri sm" data-a="sample" data-k="${s.key}" data-m="practice" ${S.canWrite?'':'disabled'}>${t('เริ่มฝึก','Start practice')}</button>${ED==='trainee'?'':`<button class="btn sm" data-a="sample" data-k="${s.key}" data-m="ex" ${S.canWrite?'':'disabled'}>${t('ดูตัวอย่างที่กรอกครบ','View completed example')}</button>`}</div></article>`).join('')}</div>`;
  const cards=v.querySelectorAll('section.card');const target=cards[0];if(target)target.before(sec);else v.appendChild(sec)};

/* ----- open a case: completed example or practice ----- */
A.sample=async function(d){const s=caseOf(d.k);if(!s)return;if(ED==='trainee'&&d.m!=='practice')d={...d,m:'practice'};let c;
  busy(t('กำลังเปิดเคส ','Opening case ')+s.field+'…',async()=>{try{c=await loadCase(d.k)}catch(e){toast(t('โหลดเอกสารของเคสไม่ได้','Could not load the case files'));return}
    const o=JSON.parse(JSON.stringify(c.example));const pid=uid();await Store.open(pid);const prac=d.m==='practice';
    if(prac){const m=o.meta;S.meta={inst:m.inst,prog:m.prog,field:m.field,campus:m.campus,cycle:m.cycle,sample:d.k,practice:true,createdAt:Date.now()};
      const keep=new Set(docsOf(s).filter(x=>x.stage==='start').map(x=>x.name));S.parts={files:{list:o.parts.files.list.filter(f=>keep.has(f.name.replace(/\.[^.]+$/,''))).map(f=>({...f,at:Date.now(),by:''}))}}}
    else{S.meta=o.meta;S.meta.sample=d.k;S.meta.createdAt=Date.now();S.parts=o.parts}
    for(const f of P('files').list){const tx=c.texts[f.name.replace(/\.[^.]+$/,'')];if(tx){f.chunks=await Store.putText(f.id,tx);f.chars=tx.length;delete f.warn}}
    Store.save('meta');Object.keys(S.parts).forEach(k=>Store.save(k));log((prac?'เริ่มฝึกเคส ':'เปิดตัวอย่างที่กรอกครบ ')+s.field);
    S.view=prac?'files':'home';S.crit=1;render();toast(prac?t('เริ่มฝึกแล้ว: นำเข้า SER และเอกสารประกอบให้แล้ว ขั้นต่อไปคือ Auto Check','Practice started. Next: Auto Check'):t('เปิดตัวอย่างที่กรอกครบแล้ว','Completed example opened'))})};
A.caseAdd=async function(d){const k=d.k,s=caseOf(k),doc=docsOf(s).find(x=>x.name===d.n);if(!doc)return;let c;try{c=await loadCase(k)}catch(e){toast(t('โหลดเอกสารของเคสไม่ได้','Could not load the case files'));return}
  const tx=c.texts[doc.name]||'';const f={id:uid(),name:doc.name+(doc.docx?'.docx':'.pdf'),kind:doc.kind,size:0,chars:tx.length,at:Date.now(),by:S.meta[S.who]||''};f.chunks=await Store.putText(f.id,tx);
  P('files').list.push(f);Store.save('files');log('เพิ่มเอกสารของเคส '+f.name);render(true);toast(t('เพิ่มแล้ว: ','Added: ')+doc.name)};

/* ----- files view: case documents panel ----- */
const vFiles9=VIEWS.files;VIEWS.files=function(){const h=vFiles9();const k=S.meta.sample;if(!k||!caseOf(k))return h;const s=caseOf(k);
  const card=`<section class="card col" id="casedocs"><div class="row" style="justify-content:space-between;align-items:baseline"><h2>${t('เอกสารของเคส','Case documents')}: ${esc(s.field)}</h2><span class="small muted">${S.meta.practice?(ED==='trainee'?t('โหมดฝึก: ซองเอกสารและหนังสือชี้แจงรับจากวิทยากร แล้วอัปโหลดที่หน้านี้','Practice: upload the documents you receive from the facilitator'):t('โหมดฝึก: เพิ่มซองเอกสารเพิ่มเติมเมื่อออกจดหมายขอเอกสารแล้ว','Practice: add the envelope after the request letter')):t('ตัวอย่างที่กรอกครบ','Completed example')}</span></div>${docList(k,true)}</section>`;
  return h+card};

/* ----- tools view: video link ----- */
const vTools9=VIEWS.tools;VIEWS.tools=function(){return`<section class="card row" style="justify-content:space-between;align-items:center"><span>${t('ดูขั้นตอนทั้งหมดในวีดีโอสอนการใช้งาน','See every step in the tutorial video')}</span><button class="btn" data-a="video">${t('เปิดวีดีโอ (5:58)','Open video (5:58)')}</button></section>`+vTools9()};

/* ----- rev.7.1: landing rail (menu shows before a program is open) ----- */
const LSTEP=(a,label,attrs='',cls='')=>`<button class="step ${cls}" data-a="${a}"${attrs}><i></i><span>${label}</span><b></b></button>`;
function landingRail(){const ps=S.programs||[],w=S.canWrite?'':' disabled';const c0=CASES.find(c=>c.key==='mt')||CASES[0];
  $('#nav').innerHTML=`<div class="brand">${MARK}<span><b>PEV Studio</b><small>TABEE · PROGRAM EVALUATION</small></span></div>
  <div class="prog lr-prog"><span>${ED==='trainee'?t('ฉบับผู้เข้ารับการอบรม','Trainee edition'):t('ฉบับวิทยากร','Instructor edition')}</span><b>${t('ยังไม่ได้เปิดหลักสูตร','No program open')}</b><small>${t('เลือกเคสฝึก หรือเปิดหลักสูตรที่ตรวจอยู่','Pick a case or open a program')}</small></div>
  <nav aria-label="${t('เมนูเริ่มต้น','Start menu')}" style="display:contents">
  <div class="phase"><div class="phase-h"><em>00</em>${t('เริ่มต้น','Start')}</div>
   ${LSTEP('video',t('วีดีโอสอนการใช้งาน','Tutorial video'))}
   ${c0?LSTEP('sample',t('เริ่มฝึก: ','Practice: ')+esc(c0.short||c0.field),` data-k="${c0.key}" data-m="practice"${w}`)+(ED==='trainee'?'':LSTEP('sample',t('ดูตัวอย่างที่กรอกครบ','Completed example'),` data-k="${c0.key}" data-m="ex"${w}`)):''}
   ${ED==='instructor'&&CASES.length>1?LSTEP('lgo',t('เคสอื่นทั้งหมด','All cases')+` (${CASES.length})`,' data-v="samples"'):''}</div>
  <div class="phase"><div class="phase-h"><em>··</em>${t('หลักสูตรที่กำลังตรวจ','Programs under review')}</div>
   ${ps.length?ps.map(p=>LSTEP('open',esc(p.field||p.prog||'(ไม่มีชื่อ)'),` data-id="${p.id}"`)).join(''):`<span class="lr-empty">${t('ยังไม่มี','None yet')}</span>`}</div>
  ${NAV.map((g,i)=>`<div class="phase lr-pv"><div class="phase-h"><em>0${i+1}</em>${t(g[0],g[1])}</div>${g[2].map(s=>LSTEP('lockStep',t(s[1],s[2]),'','lock')).join('')}</div>`).join('')}
  </nav>
  <div class="rail-foot">${LSTEP('pickOpen',t('เปิดไฟล์ที่ Save ไว้ (Open)','Open saved file'),w)}${LSTEP('lgo',t('เริ่มตรวจหลักสูตรใหม่','Start a new evaluation'),' data-v="new"')}</div>`}
const renderLanding9=renderLanding;renderLanding=function(){renderLanding9();landingRail()};
A.lgo=function(d){const v=$('#view');let el=null;if(d.v==='samples')el=v.querySelector('#samples');else{const i=v.querySelector('#n_inst');el=i&&i.closest('section');if(i)setTimeout(()=>i.focus(),350)}
  if(el)el.scrollIntoView({behavior:'smooth',block:'start'})};
A.lockStep=function(){toast(t('เลือก "เริ่มฝึก" หรือเปิดหลักสูตรก่อน แล้วเมนูขั้นตอนจะกดได้','Start a case or open a program first; then the steps become clickable'));A.lgo({v:'samples'})};

/* ---------- rev.8: interview question guide by visit session ----------
   Bank: TABEE visit schedule and question guides in PEV training Module 16 (M), the ABET E610-based
   prompts quoted there (A), and questions added for this studio (P).
   Row: [session, must(1/0), linked checklist items (short ids, c1-20 -> "1-20"), question, source] */
const IQ_SES=[
 ['s11','1','1-1','09:00–09:45','ประชุมเปิดกับผู้บริหารสถาบัน','Opening meeting with institution leaders','อธิการบดีหรือรองอธิการบดี คณบดี รองคณบดี',['ผู้บริหารสถาบัน'],5],
 ['s12','1','1-2','09:45–10:30','ผู้บริหารหลักสูตรนำเสนอและตอบคำถาม','Program leaders present and answer','หัวหน้าภาควิชา ผู้บริหารหลักสูตร อาจารย์ผู้รับผิดชอบหลักสูตร',['ผู้บริหารหลักสูตร'],14],
 ['s13','1','1-3','10:30–12:00','ตรวจห้องปฏิบัติการ ห้องสมุด และระบบสารสนเทศ','Laboratories, library and IT','ครูปฏิบัติการ เจ้าหน้าที่ห้องสมุดและไอที (ถามระหว่างเดินดู)',[],7],
 ['s15','1','1-5','13:15–14:45','สัมภาษณ์อาจารย์ผู้สอน','Faculty interviews','อาจารย์ผู้รับผิดชอบรายวิชา 3 คน คนละ 30 นาที',['อาจารย์ผู้สอน'],10],
 ['s16','1','1-6','14:45–15:00','สัมภาษณ์ศิษย์เก่า','Alumni interviews','ศิษย์เก่าที่จบ 5–10 ปี 3 คน คนละ 15 นาที',['ศิษย์เก่า','ที่ปรึกษาภาคอุตสาหกรรม (IAC)'],6],
 ['s17','1','1-7','15:00–15:15','สัมภาษณ์ผู้ใช้บัณฑิต','Employer interviews','ผู้ใช้บัณฑิต 3 คน คนละ 15 นาที (ไม่ใช่ IAB และไม่ใช่ศิษย์เก่าที่สัมภาษณ์แล้ว)',['ผู้ใช้บัณฑิต','พนักงานที่ปรึกษา (สถานประกอบการ)'],6],
 ['s18','1','1-8','15:15–15:45','สัมภาษณ์บัณฑิต','Recent-graduate interviews','บัณฑิต 6 คน คนละ 15 นาที',['บัณฑิต'],7],
 ['s19a','1','1-9','15:45–17:05','สัมภาษณ์นักศึกษาปี 1','Year 1 students','นักศึกษาปี 1 คละเกรดเฉลี่ย ไม่มีอาจารย์อยู่ในห้อง',['นักศึกษาปี 1'],5],
 ['s19b','1','1-9','15:45–17:05','สัมภาษณ์นักศึกษาปี 2 และ 3','Year 2–3 students','นักศึกษาปี 2 และ 3 คละเกรดเฉลี่ย ไม่มีอาจารย์อยู่ในห้อง',['นักศึกษาปี 2','นักศึกษาปี 3'],8],
 ['s19c','1','1-9','15:45–17:05','สัมภาษณ์นักศึกษาปี 4','Year 4 students','นักศึกษาปี 4 รวมผู้ที่ไปสหกิจศึกษา',['นักศึกษาปี 4','นักศึกษาสหกิจศึกษา'],7],
 ['s21','2','2-1','09:00–10:00','ประชุมผู้บริหารสถาบันและผู้บริหารหลักสูตร','Institution and program leaders','ผู้บริหารสถาบันชุดเดียวกับวันที่ 1 และผู้บริหารหลักสูตร',['ผู้บริหารสถาบัน'],7],
 ['s22','2','2-2','10:00–10:15','สัมภาษณ์เจ้าหน้าที่สายสนับสนุน','Support-staff interviews','เจ้าหน้าที่ที่ดูแลงานการเรียนการสอนระดับปริญญาตรี',['เจ้าหน้าที่สายสนับสนุน'],5],
 ['s23','2','2-3','10:15–10:45','สัมภาษณ์ครูปฏิบัติการและผู้ช่วยสอน','Lab technicians and teaching assistants','ครูปฏิบัติการ 1 คน และผู้ช่วยสอน 1 คน',['ครูปฏิบัติการ'],7],
 ['s24','2','2-4','10:45–12:00','นำเสนอโครงงาน Capstone Design','Capstone design presentations','อาจารย์ผู้รับผิดชอบวิชาและนักศึกษาผู้นำเสนอ 2 โครงงาน',['ผู้รับผิดชอบ Capstone','อาจารย์นิเทศ / ผู้ประสานงานสหกิจศึกษา'],8],
 ['s26','2','2-6','14:00–15:00','ประชุมหัวหน้าภาควิชาและผู้บริหารหลักสูตร','Head of department and program leaders','หัวหน้าภาควิชาและผู้บริหารหลักสูตร (ขอคำชี้แจงครั้งสุดท้าย)',['ผู้บริหารหลักสูตร'],5]
].map(a=>({k:a[0],day:a[1],code:a[2],time:a[3],th:a[4],en:a[5],who:a[6],groups:a[7],cap:a[8]}));
const IQ_RAW=[
/* 1-1 opening */
['s11',1,'8-10 8-11','นโยบายของสถาบันต่อการรับรองคุณภาพการศึกษาคืออะไร และหลักสูตรดำเนินงานภายใต้นโยบายนั้นอย่างไร','M'],
['s11',1,'8-13 8-15 8-17','งบประมาณทั่วไปและงบประมาณที่เกี่ยวกับการรับรองคุณภาพการศึกษาจัดสรรให้หลักสูตรอย่างไร','M'],
['s11',1,'','หลักสูตรเปลี่ยนแปลงอะไรบ้างตั้งแต่การตรวจครั้งก่อน และตั้งแต่ส่ง SER','A'],
['s11',0,'8-13 8-11 4-18','สถาบันรับรายงานผลการประเมินผลลัพธ์การศึกษาจากหลักสูตรอย่างไร และใช้รายงานนั้นช่วยเหลือหลักสูตรอย่างไร','M'],
['s11',0,'8-25 6-20','สถาบันสนับสนุนการพัฒนาวิชาชีพและขีดความสามารถของอาจารย์อย่างไร','M'],
['s11',0,'8-24 6-15','สถาบันมีแผนรองรับอย่างไรเมื่ออาจารย์เกษียณ ลาศึกษาต่อ หรือลาออก','P'],
['s11',0,'8-25 8-23','ค่าตอบแทนและสวัสดิการดึงดูดและรักษาอาจารย์ที่มีคุณภาพได้เพียงพอหรือไม่','A'],
['s11',0,'7-10 5-10','ถ้ามีการสอนออนไลน์หรือหลายวิทยาเขต ทำอย่างไรให้นักศึกษาทุกคนได้ประสบการณ์เทียบเท่ากัน','A'],
/* 1-2 program leaders */
['s12',1,'1-20 1-21 1-16','ระบบให้คำปรึกษาและระบบเตือนนักศึกษาที่มีปัญหาการเรียนทำงานอย่างไร','M'],
['s12',1,'1-25 1-27','ใครตรวจว่านักศึกษาเรียนครบตามหลักสูตรก่อนอนุมัติจบ ตรวจอย่างไร ขอดูเอกสารของผู้สำเร็จการศึกษา 1 ราย','M'],
['s12',1,'2-12 2-20 2-17','PEO ฉบับปัจจุบันกำหนดและทบทวนครั้งล่าสุดเมื่อไร ใครมีส่วนร่วม ขอดูรายงานการประชุม','P'],
['s12',1,'3-11 3-10 4-10','ขอดูการเชื่อมโยงรายวิชากับ PO/PI และวิชาที่ใช้ประเมินแต่ละ PO','M'],
['s12',1,'4-13 4-16 4-12','ตัวเลขผลประเมิน PO ใน SER คำนวณมาอย่างไร ขอดูการคิดคะแนนย้อนกลับไปถึงคะแนนดิบ 1 ข้อ','M'],
['s12',1,'4-18 4-19 4-20','นำผลการประเมินไปปรับปรุงอย่างไร ขอดูรายงานการประชุมที่พิจารณาผล และตัวอย่างการปรับปรุงที่ทำแล้ว 1 เรื่อง','M'],
['s12',0,'1-10 1-11 1-12 1-13','การรับนักศึกษาแต่ละรอบ (เช่น TCAS แต่ละรอบ) นำผลการเรียนของแต่ละกลุ่มมาวิเคราะห์และปรับเกณฑ์รับอย่างไร','M'],
['s12',0,'1-16 1-12','นักศึกษาที่จบเกิน 4 ปี หลักสูตรวิเคราะห์สาเหตุและแก้ไขอย่างไร','M'],
['s12',0,'1-18 1-23','การรับโอนและเทียบโอนหน่วยกิตอนุมัติอย่างไร ใช้เกณฑ์อะไร','A'],
['s12',0,'2-17 2-18 2-20','แต่งตั้ง IAB อย่างไร ประชุมบ่อยแค่ไหน และหลักสูตรเปลี่ยนอะไรจากข้อเสนอของ IAB','M'],
['s12',0,'2-21 2-15 2-18','นำผลการวิเคราะห์ไปปรับ PEO อย่างไร ให้สอดคล้องกับพันธกิจของสถาบันและความต้องการของผู้มีส่วนได้ส่วนเสีย','M'],
['s12',0,'2-13 2-12','PEO และ PO เผยแพร่ที่ใดบ้าง ข้อความตรงกันทุกแหล่งหรือไม่','P'],
['s12',0,'3-11 3-13','PO หนึ่งมีหลายวิชาในหลายชั้นปี หลักสูตรช่วยให้นักศึกษาบรรลุ PO ตามลำดับวิชาอย่างไร','M'],
['s12',0,'4-10 4-16 5-16','ขอดู Rubric ที่ใช้ประเมินทางตรง และตัวอย่างข้อสอบหรือชิ้นงานที่ใช้ประเมิน PI','M'],
['s12',0,'4-15 4-20 4-13','PO ที่ไม่ถึงเป้า หลักสูตรวิเคราะห์สาเหตุอย่างไร และวัดซ้ำหลังปรับปรุงแล้วหรือยัง','P'],
['s12',0,'4-11 4-14','รอบเวลาการเก็บและประเมินข้อมูลผลลัพธ์เป็นอย่างไร ครบทุก PO ภายในกี่ปี','A'],
['s12',0,'4-12','เป้าหมายระดับความสำเร็จของแต่ละ PO กำหนดจากอะไร','P'],
['s12',0,'4-10 4-11','PO ใดยังประเมินด้วยวิธีทางอ้อมอย่างเดียว และมีแผนเพิ่มการประเมินทางตรงอย่างไร','P'],
['s12',0,'4-19 5-11','การปรับปรุงหลักสูตรรอบใหม่มาจากกระบวนการใด และอนุมัติผ่านขั้นตอนใด','M'],
['s12',0,'4-19 4-20','มีแผนพัฒนาต่อเนื่องเป็นเอกสารไหม ขอดูฉบับจริง','A'],
['s12',0,'5-14','เหตุใดจึงกำหนดให้วิชานั้นเป็น Capstone และเตรียมนักศึกษาก่อนทำ Capstone อย่างไร','M'],
['s12',0,'5-12','บังคับวิชาบังคับก่อนอย่างไร ยกเว้นได้ไหม ใครอนุมัติ และบันทึกไว้ที่ไหน','A'],
['s12',0,'5-15','นักศึกษาสหกิจศึกษาได้รับการประเมินผลลัพธ์เทียบเท่านักศึกษาที่ทำ Capstone ในสถาบันอย่างไร','P'],
['s12',0,'6-15 6-16 6-10','มีอาจารย์พอหรือไม่ และความเชี่ยวชาญของอาจารย์ครอบคลุมทุกกลุ่มวิชาของหลักสูตรอย่างไร','A'],
['s12',0,'6-13 6-23 8-24 6-15','นโยบายรับอาจารย์ ทดแทนอาจารย์ที่เกษียณหรือลาศึกษาต่อ และการกระจายภาระงานเป็นอย่างไร','M'],
['s12',0,'6-19 6-20','อาจารย์มีเวลาและงบสำหรับพัฒนาวิชาชีพเท่าไร ติดตามอย่างไรว่าอาจารย์ทุกคนได้พัฒนา','A'],
['s12',0,'8-13 8-17 8-15','งบประมาณของภาควิชากำหนดอย่างไร ใครดูแล ช่วงหลายปีที่ผ่านมาเพียงพอหรือไม่','A'],
['s12',0,'6-17 1-20','แนะแนวอาชีพและช่วยหางานให้นักศึกษาอย่างไร','A'],
/* 1-3 facilities */
['s13',1,'7-18 7-11','มีคู่มือการใช้อุปกรณ์และคู่มือความปลอดภัยไหม อธิบายให้นักศึกษาอย่างไร ขอดูบันทึกการอบรมความปลอดภัยของปีล่าสุด','M'],
['s13',1,'7-12 7-11','อุปกรณ์พอต่อจำนวนนักศึกษาหรือไม่ กลุ่มละกี่คนต่อชุดทดลอง','M'],
['s13',1,'7-25 7-18','ถังดับเพลิง ที่ล้างตา และฝักบัวฉุกเฉินตรวจบ่อยแค่ไหน มีป้ายวันตรวจล่าสุดครบทุกจุดไหม','A'],
['s13',0,'7-20 8-16','เกณฑ์การซ่อมบำรุงและยกระดับอุปกรณ์คืออะไร ใครตัดสินใจ งบมาจากไหน','M'],
['s13',0,'7-20 7-25 8-16','มีครุภัณฑ์ที่ชำรุดรอซ่อมอยู่กี่รายการ รอมานานเท่าไร','P'],
['s13',0,'7-11 7-14 7-16','มีซอฟต์แวร์อะไรที่นักศึกษาเข้าใช้ได้ จำนวนสิทธิ์ใช้งานพอไหม','M'],
['s13',0,'7-25','มีผู้ตรวจความปลอดภัยไหม ตรวจห้องปฏิบัติการบ่อยแค่ไหน ตรวจอะไรบ้าง','A'],
['s13',0,'7-12 7-15','ห้องปฏิบัติการเปิดให้ใช้ช่วงเย็นและวันหยุดหรือไม่ ใครดูแลขณะใช้','A'],
['s13',0,'7-25 7-18','การจัดการสารเคมี วัสดุอันตราย และของเสียจากห้องปฏิบัติการทำอย่างไร','P'],
['s13',0,'7-15 7-22','เวลาเปิดปิดของห้องสมุดและห้องคอมพิวเตอร์ และระเบียบการยืมเป็นอย่างไร','M'],
['s13',0,'7-22 7-23 7-14','ฐานข้อมูลสืบค้นและ e-book ที่เกี่ยวกับสาขามีอะไรบ้าง นักศึกษาเข้าใช้จากนอกสถาบันได้ไหม','M'],
['s13',0,'7-23 7-16 7-25','สถาบันประเมินความเพียงพอและคุณภาพของบริการห้องสมุดและระบบสารสนเทศอย่างไร','M'],
/* 1-5 faculty */
['s15',1,'3-11 4-10 5-16 6-24','วิชาของท่านรับผิดชอบ PO/PI อะไรบ้าง และประเมินด้วยเครื่องมืออะไร ขอให้ชี้ในแฟ้มรายวิชา','M'],
['s15',1,'4-18 4-20','ท่านปรับอะไรในวิชาของท่านจากผลประเมินปีก่อน และรู้ได้อย่างไรว่าการปรับนั้นได้ผล','A'],
['s15',1,'6-22 4-19 6-24','ท่านมีส่วนร่วมในการประเมินผลลัพธ์การศึกษาและการปรับปรุงหลักสูตรอย่างไร','M'],
['s15',1,'2-20 2-12 3-10','ท่านรู้จัก PEO และ PO ของหลักสูตรไหม เคยมีส่วนร่วมกำหนดหรือทบทวนอย่างไร','A'],
['s15',0,'4-16 4-13','ตัวเลขผลประเมิน PI ของวิชานี้มาจากคะแนนชิ้นใด คำนวณอย่างไร','P'],
['s15',0,'3-11 5-12','ช่วยให้นักศึกษาบรรลุ PO ต่อเนื่องข้ามวิชาและชั้นปีอย่างไร คุยกับผู้สอนวิชาก่อนหน้าและวิชาถัดไปไหม','M'],
['s15',0,'1-15 5-16','ประกาศคะแนน เฉลย และให้ feedback กับนักศึกษาอย่างไร','M'],
['s15',0,'1-20 1-21 6-17','ท่านดูแลนักศึกษาในที่ปรึกษากี่คน พบกันบ่อยแค่ไหน และบันทึกการให้คำปรึกษาอย่างไร','A'],
['s15',0,'1-16 1-20','เมื่อนักศึกษามีผลการเรียนรู้ต่ำกว่าเกณฑ์ ท่านช่วยเหลืออย่างไร','M'],
['s15',0,'6-19 6-20','ใน 3 ปีที่ผ่านมา ท่านได้รับการพัฒนาด้านความเชี่ยวชาญในสาขา และด้านการสอนและการประเมินแบบ OBE อย่างไร','M'],
['s15',0,'6-13 6-23','ภาระงานของท่านเป็นอย่างไร (สอน วิจัย บริการ บริหาร) อาจารย์ใหม่ได้รับมอบหมายงานแบบไหน','M'],
['s15',0,'6-15 6-16','มีอาจารย์พอสำหรับความต่อเนื่องของหลักสูตรและการให้คำปรึกษานักศึกษาหรือไม่','A'],
['s15',0,'6-15 8-24','ถ้าอาจารย์ผู้เชี่ยวชาญเฉพาะด้านไม่อยู่ ใครสอนแทนได้','P'],
['s15',0,'6-25','ท่านติดต่อกับภาคอุตสาหกรรม ผู้ประกอบวิชาชีพ และผู้ใช้บัณฑิตอย่างไร','A'],
['s15',0,'5-12','วิชาบังคับก่อนเตรียมนักศึกษาให้พร้อมสำหรับวิชาของท่านหรือไม่','A'],
['s15',0,'7-12 7-16 7-23','ห้องปฏิบัติการ เครื่องมือ ซอฟต์แวร์ และห้องสมุด เพียงพอต่อการสอนวิชาของท่านหรือไม่','A'],
['s15',0,'8-19','ผู้ช่วยสอนและเจ้าหน้าที่สนับสนุนพอต่อการทำงานของท่านหรือไม่','A'],
['s15',0,'4-13 4-15','ผลประเมินผลลัพธ์สอดคล้องกับความรู้สึกของท่านต่อความสามารถจริงของนักศึกษาหรือไม่','A'],
['s15',0,'6-20 4-19','มีเวทีให้อาจารย์แลกเปลี่ยนแนวปฏิบัติที่ดีด้านการสอนแบบเน้นผลลัพธ์ไหม','M'],
['s15',0,'5-14','กรรมการสอบ Capstone ตรวจลักษณะของปัญหาวิศวกรรมที่ซับซ้อนในโครงงานอย่างไร','P'],
['s15',0,'','จุดแข็งและความต้องการที่สำคัญที่สุดของหลักสูตรคืออะไร ถ้าเปลี่ยนได้หนึ่งอย่างจะเปลี่ยนอะไร','A'],
/* 1-6 alumni */
['s16',1,'2-12 3-13','ปัจจุบันทำงานอะไร งานเกี่ยวข้องกับสาขาที่เรียนอย่างไร','M'],
['s16',1,'3-13 2-18','เมื่อจบใหม่ ความพร้อมในการทำงานเป็นอย่างไร ทักษะใดที่ต้องไปเรียนรู้เพิ่มเอง','M'],
['s16',1,'2-20 2-17 2-18','เคยได้รับแบบสอบถาม หรือได้รับเชิญให้ความเห็นต่อ PEO หรือหลักสูตรไหม ครั้งล่าสุดเมื่อไร','M'],
['s16',0,'2-21 2-20','ช่องว่างที่เจอในงานได้ส่ง feedback ให้หลักสูตรไหม ทางไหน และเห็นการเปลี่ยนแปลงหรือไม่','M'],
['s16',0,'1-16','ใช้เวลาเรียนกี่ปี ถ้าเกิน 4 ปีเพราะอะไร','M'],
['s16',0,'1-20 6-17','ตอนเรียน เข้าหาอาจารย์ที่ปรึกษาง่ายไหม ได้คำแนะนำด้านอาชีพพอไหม','M'],
['s16',0,'2-18 2-12','PEO ของหลักสูตรทันสมัยและตรงกับงานจริงหรือไม่','A'],
['s16',0,'3-13','มีใบอนุญาตประกอบวิชาชีพวิศวกรรมควบคุมหรือยัง หลักสูตรเตรียมเรื่องนี้ให้อย่างไร','M'],
['s16',0,'2-17 6-25 5-14','ท่านเกี่ยวข้องกับหลักสูตรในรูปแบบใด เช่น ประชุมที่ปรึกษา ตัดสิน Capstone บรรยายพิเศษ','A'],
['s16',0,'','จุดแข็งและเรื่องที่น่ากังวลของหลักสูตรคืออะไร','A'],
/* 1-7 employers */
['s17',1,'2-17','รับบัณฑิตจากหลักสูตรนี้กี่คน รับต่อเนื่องหรือไม่','M'],
['s17',1,'3-13 2-18','บัณฑิตจากหลักสูตรนี้มีจุดเด่นและจุดด้อยอะไร ขอตัวอย่างพฤติกรรมจริง','M'],
['s17',1,'2-18 2-21 3-13','ทักษะใดที่บัณฑิตควรมีมากขึ้น','M'],
['s17',0,'2-20 2-17 2-21','เคยมีโอกาสร่วมพัฒนาหลักสูตรหรือให้ความเห็นต่อ PEO ไหม หลักสูตรแจ้งผลการปรับปรุงให้ทราบหรือไม่','M'],
['s17',0,'2-20 4-10','เคยตอบแบบสอบถามความสามารถของบัณฑิตไหม ครั้งล่าสุดเมื่อไร','M'],
['s17',0,'2-18 2-12','PEO ของหลักสูตรตรงกับสิ่งที่องค์กรต้องการจากวิศวกรในช่วง 3–5 ปีแรกหรือไม่','A'],
['s17',0,'5-14 5-15','นักศึกษาฝึกงานหรือสหกิจจากหลักสูตรนี้ทำงานลักษณะใด ใครประเมิน ประเมินอะไร','P'],
['s17',0,'6-25 8-27','องค์กรสนับสนุนหลักสูตรด้านใดบ้าง เช่น โจทย์โครงงาน อุปกรณ์ วิทยากร','P'],
['s17',0,'','มีอะไรแนะนำหลักสูตรเพื่อพัฒนาบัณฑิตให้ดีขึ้น','M'],
/* 1-8 graduates */
['s18',1,'3-10 2-13','รู้จัก PO ของหลักสูตรไหม จบแล้วควรทำอะไรได้บ้าง','M'],
['s18',1,'3-13','จุดแข็งที่ได้จากหลักสูตรคืออะไร ย้อนกลับไปได้อยากพัฒนาทักษะใดมากขึ้น','M'],
['s18',1,'4-10 4-11','ได้รับแบบสอบถามก่อนจบ (Exit survey) จากหลักสูตรไหม','M'],
['s18',0,'1-16 1-20','จบภายใน 4 ปีไหม ถ้าไม่ เพราะอะไร และหลักสูตรช่วยอย่างไร','M'],
['s18',0,'1-20 1-21','ตอนมีปัญหาการเรียน ปรึกษาอาจารย์ได้อย่างไร','M'],
['s18',0,'3-13 2-18','ทักษะใดยังไม่พอต่องาน หลักสูตรฝึกเรื่องนั้นไหม','M'],
['s18',0,'6-17','หลักสูตรช่วยเตรียมการสมัครงานและสัมภาษณ์งานไหม','M'],
['s18',0,'3-11 5-13','ฝึกนำเสนอ เขียนรายงาน ทำงานเป็นทีม และเรียนเรื่องจริยธรรมในวิชาใด','A'],
['s18',0,'5-14 4-16','ใน Capstone ท่านรับผิดชอบส่วนใด คะแนนของท่านต่างจากเพื่อนในกลุ่มไหม','P'],
['s18',0,'1-25','ก่อนจบ ใครตรวจว่าท่านเรียนครบตามหลักสูตร ต้องยื่นเอกสารอะไรบ้าง','P'],
['s18',0,'','ท่านจะแนะนำหลักสูตรนี้ให้คนอื่นหรือไม่ เพราะอะไร','A'],
/* 1-9 year 1 */
['s19a',1,'1-10','ทำไมเลือกเรียนสาขานี้ และทำไมเลือกหลักสูตรนี้','M'],
['s19a',1,'3-10 2-13','รู้ไหมว่าจบแล้วทำอะไรได้ หลักสูตรบอกเรื่อง PO หรือสิ่งที่คาดหวังเมื่อจบตอนไหน','M'],
['s19a',1,'1-20 1-21','รู้จักอาจารย์ที่ปรึกษาไหม พบกันแล้วกี่ครั้ง','P'],
['s19a',0,'7-15 7-22 7-14','ห้องสมุดและห้องคอมพิวเตอร์พอต่อความต้องการไหม ทั้งเวลาเปิดและระเบียบการใช้','M'],
['s19a',0,'7-18 1-20','ได้รับการปฐมนิเทศเรื่องแผนการเรียนและการใช้ระบบสารสนเทศของสถาบันไหม','P'],
['s19a',0,'5-13','วิชาคณิตศาสตร์และวิทยาศาสตร์พื้นฐานสอนให้เชื่อมกับงานวิศวกรรมไหม','A'],
['s19a',0,'','สิ่งที่ชอบและไม่ชอบในหลักสูตร','M'],
/* 1-9 years 2-3 */
['s19b',1,'3-10 3-11 1-15','รู้ไหมว่าผลลัพธ์การเรียนรู้ของแต่ละวิชาคืออะไร และประเมินจากอะไร','M'],
['s19b',1,'1-15 5-16','แต่ละวิชาประกาศคะแนนและเฉลยไหม ได้ feedback จากผู้สอนไหม ใช้เวลานานเท่าไร','M'],
['s19b',1,'1-20 1-21','พบอาจารย์ที่ปรึกษาบ่อยไหม เจอง่ายไหม เวลามีปัญหาคุยกับใคร','M'],
['s19b',1,'7-18 7-25','ได้ปฐมนิเทศความปลอดภัยก่อนเข้าห้องปฏิบัติการไหม ครั้งล่าสุดเมื่อไร','M'],
['s19b',0,'7-12 7-11 7-20','อุปกรณ์ในห้องปฏิบัติการพอไหม กลุ่มหนึ่งกี่คน เครื่องเสียบ่อยไหม','M'],
['s19b',0,'1-16 1-20','ถ้าเกรดต่ำหรือติดวิทยาทัณฑ์ ได้คำแนะนำจากอาจารย์หรือหลักสูตรอย่างไร','M'],
['s19b',0,'1-16 5-12','เรียนตามแผนไหม จะจบใน 4 ปีไหม ติดวิชาไหน','M'],
['s19b',0,'5-12','ลงทะเบียนวิชาที่ต้องเรียนได้ทันตามแผนทุกภาคไหม ระบบตรวจวิชาบังคับก่อนอย่างไร','A'],
['s19b',0,'3-11','รู้ไหมว่าทักษะที่ได้จากแต่ละวิชาส่งต่อกันระหว่างวิชาอย่างไร','M'],
['s19b',0,'1-15','ถ้าสงสัยคะแนนทำอย่างไร มีกระบวนการไหม','M'],
['s19b',0,'3-11 5-13','ฝึกการสื่อสาร การทำงานเป็นทีม และเรียนเรื่องจริยธรรมในวิชาใด','A'],
['s19b',0,'7-14 7-16 7-23 7-10','ซอฟต์แวร์ ห้องคอมพิวเตอร์ ห้องสมุด และพื้นที่ทำงานกลุ่มพอไหม','M'],
['s19b',0,'6-15 6-11','พบอาจารย์นอกเวลาเรียนได้ไหม มีวิชาที่เปลี่ยนผู้สอนบ่อย หรือสอนโดยอาจารย์พิเศษเป็นหลักไหม','P'],
['s19b',0,'4-18 4-10','เคยตอบแบบประเมินรายวิชาไหม เห็นการเปลี่ยนแปลงจากความเห็นของนักศึกษาไหม','P'],
/* 1-9 year 4 */
['s19c',1,'5-14 4-10','Capstone ต้องส่งอะไรบ้าง ประเมินผลลัพธ์ข้อไหน ประชุมกับอาจารย์บ่อยไหม','M'],
['s19c',1,'5-14','โครงงานของคุณมีข้อจำกัดอะไร ใช้มาตรฐานวิศวกรรมใด และใช้ความรู้จากวิชาไหน','A'],
['s19c',1,'5-14 5-15','ฝึกงานหรือสหกิจมีปัญหาไหม หลักสูตรช่วยหาที่และประเมินระหว่างฝึกอย่างไร','M'],
['s19c',1,'3-10 3-13 2-13','รู้จัก PO ของหลักสูตรไหม มั่นใจไหมว่าจบแล้วทำงานได้','M'],
['s19c',0,'5-14 4-16','ในโครงงานกลุ่ม แต่ละคนรับผิดชอบส่วนใด คะแนนรายบุคคลให้อย่างไร','P'],
['s19c',0,'5-14 6-25','หัวข้อโครงงานมาจากไหน อุตสาหกรรมมีส่วนร่วมไหม','M'],
['s19c',0,'5-15','นักศึกษาสหกิจ: โจทย์ที่ทำในสถานประกอบการเป็นงานออกแบบหรือแก้ปัญหาวิศวกรรมหรือไม่ ใครประเมิน','P'],
['s19c',0,'7-12 8-27 7-11','อุปกรณ์ วัสดุ ซอฟต์แวร์ และงบสำหรับโครงงานพอไหม','M'],
['s19c',0,'5-14 3-11','Capstone ฝึกการสื่อสารและการนำเสนออย่างไร','M'],
['s19c',0,'6-17 1-20','หลักสูตรแนะแนวอาชีพและการเรียนต่ออย่างไร','A'],
['s19c',0,'1-25','ก่อนจบต้องตรวจอะไรบ้าง ใครตรวจว่าเรียนครบ','P'],
['s19c',0,'8-27','งบประมาณและการสนับสนุนกิจกรรมนักศึกษาจากภาควิชาและมหาวิทยาลัยพอไหม','M'],
['s19c',0,'','มีอะไรอยากฝากถึงหลักสูตร','M'],
/* 2-1 institution leaders */
['s21',1,'8-13 8-17 8-15','จัดสรรงบประมาณให้แต่ละหลักสูตรด้วยกระบวนการและหลักเกณฑ์อะไร รู้ได้อย่างไรว่าเพียงพอ','M'],
['s21',1,'8-13 8-14 4-18','สนับสนุนบุคลากรและงบประมาณตามผลการประเมินผลลัพธ์และความต้องการพัฒนาต่อเนื่องอย่างไร','M'],
['s21',1,'8-24 8-23 6-15','มีแผนและงบประมาณทดแทนอาจารย์ที่เกษียณ ลาศึกษาต่อ หรือลาออกอย่างไร','P'],
['s21',0,'8-25 8-20 8-21','ยุทธศาสตร์จูงใจอาจารย์ และลดการลาออกของบุคลากรสายสนับสนุนคืออะไร','M'],
['s21',0,'6-20 8-25','มีระบบจัดการอาจารย์ที่ยังพัฒนาการสอนไม่ถึงเป้าอย่างไร','M'],
['s21',0,'8-16 7-20 7-25','ประเมินและจัดการสิ่งอำนวยความสะดวกทางการศึกษาอย่างไร งบซ่อมบำรุงและยกระดับครุภัณฑ์มาจากไหน','M'],
['s21',0,'8-19 8-20','จำนวนเจ้าหน้าที่สำนักงานและเจ้าหน้าที่ห้องปฏิบัติการกำหนดจากอะไร เพียงพอหรือไม่','A'],
['s21',0,'1-25','ตรวจการสำเร็จการศึกษาของนักศึกษาในระดับสถาบันอย่างไร','M'],
['s21',0,'8-13 8-10','ผู้บริหารหลักสูตรควบคุมงบประมาณส่วนใดเอง','A'],
['s21',0,'8-14','มีอะไรรับประกันว่าการสนับสนุนหลักสูตรจะต่อเนื่อง','A'],
['s21',0,'2-17 8-11','มีช่องทางรับฟังความเห็นจากผู้มีส่วนได้ส่วนเสียอะไรบ้าง','M'],
['s21',0,'8-27','สถาบันสนับสนุนกิจกรรมนักศึกษาและแผนพัฒนาของหลักสูตรอย่างไร','P'],
/* 2-2 support staff */
['s22',1,'8-19','ท่านดูแลงานอะไรบ้าง ภาระงานมากเกินไปหรือไม่ คนพอไหม','M'],
['s22',1,'1-25 1-16','งานตรวจการลงทะเบียนและการสำเร็จการศึกษาทำอย่างไร ใช้ระบบอะไร','M'],
['s22',0,'8-21 8-20','ได้รับการอบรมและรู้เส้นทางความก้าวหน้าของตนชัดไหม','M'],
['s22',0,'1-20 1-21','นักศึกษาพบอาจารย์ได้เมื่อต้องการหรือไม่ บันทึกการให้คำปรึกษาเก็บที่ไหน','A'],
['s22',0,'1-23 1-27 1-18','เอกสารเทียบโอนหน่วยกิตและใบระเบียนผลการศึกษาตรวจและจัดเก็บอย่างไร','P'],
['s22',0,'4-16 5-16','ข้อมูลผลการประเมินรายวิชาและแฟ้มรายวิชาเก็บรวบรวมอย่างไร ใครดูแล','P'],
['s22',0,'','มีปัญหาด้านการทำงานที่อยากให้ปรับปรุงไหม','M'],
/* 2-3 lab staff and TAs */
['s23',1,'7-18 7-25','ปฐมนิเทศความปลอดภัยให้นักศึกษาอย่างไร มีบันทึกรายชื่อผู้ผ่านการอบรมไหม','M'],
['s23',1,'7-25','เคยมีอุบัติเหตุไหม จัดการและบันทึกอย่างไร','M'],
['s23',1,'8-19 7-25','ท่านดูแลห้องปฏิบัติการกี่ห้อง ภาระงานเป็นอย่างไร มีเวลาพอดูแลเครื่องมือให้ใช้งานได้ไหม','A'],
['s23',0,'7-20 8-16','เกณฑ์ซ่อมบำรุงและยกระดับอุปกรณ์คืออะไร เสนอเรื่องทางไหน ใช้เวลานานเท่าไรกว่าจะได้ซ่อม','M'],
['s23',0,'7-20 7-12','มีครุภัณฑ์ชำรุดรอซ่อมกี่รายการ กระทบการทดลองวิชาใดบ้าง','P'],
['s23',0,'7-12','ห้องปฏิบัติการใช้งานหนักแค่ไหน เคยแน่นจนรองรับไม่พอไหม','A'],
['s23',0,'7-18 7-11','นักศึกษาเรียนรู้การใช้เครื่องมืออย่างไร มีคู่มือประจำเครื่องไหม','A'],
['s23',0,'8-21 1-15','ผู้ช่วยสอนได้รับการอบรมก่อนสอนไหม ช่วยให้ feedback นักศึกษาอย่างไร','M'],
['s23',0,'8-21','ท่านได้รับการอบรมอะไรสำหรับตำแหน่งนี้','A'],
['s23',0,'7-12 7-15','นักศึกษาเข้าใช้ช่วงเย็นและวันหยุดได้ไหม ใครดูแล','A'],
/* 2-4 capstone */
['s24',1,'5-14','ลักษณะใดของปัญหาวิศวกรรมที่ซับซ้อนที่โครงงานนี้มีจริง ขอให้ชี้หลักฐานในรายงาน','M'],
['s24',1,'5-14 4-10','Rubric แต่ละ PI แบ่งระดับอย่างไร ใครประเมิน มีผู้ประเมินภายนอกไหม','M'],
['s24',1,'5-14 4-16','แยกคะแนนรายบุคคลออกจากคะแนนกลุ่มอย่างไร','M'],
['s24',0,'5-14 6-25','หัวข้อโครงงานมาจากไหน อุตสาหกรรมมีส่วนร่วมหรือคาดหวังอะไร','M'],
['s24',0,'5-14','ทำอย่างไรให้โครงงานมีเนื้อหาการออกแบบเพียงพอ ไม่ใช่การทำซ้ำแบบเดิมหรือการทดลองอย่างเดียว','A'],
['s24',0,'5-14','ทำอย่างไรให้โครงงานใช้มาตรฐานวิศวกรรมที่เหมาะสม และมีข้อจำกัดในทางปฏิบัติหลายด้าน','A'],
['s24',0,'5-14 5-12','ทำอย่างไรให้โครงงานใช้ความรู้และทักษะจากวิชาก่อนหน้า','A'],
['s24',0,'5-15','Capstone เชื่อมกับสหกิจศึกษาอย่างไร โจทย์จากสถานประกอบการผ่านการกลั่นกรองอย่างไร','M'],
['s24',0,'5-14 3-11','นักศึกษาฝึกทำงานเป็นทีม การสื่อสาร และความยั่งยืนในโครงงานอย่างไร','M'],
['s24',0,'4-18 4-20','ผลประเมิน Capstone รอบนี้นำไปปรับวิชาอย่างไร','M'],
['s24',0,'6-22 6-13','อาจารย์กี่คนร่วมดูแล ในบทบาทใด','A'],
['s24',0,'7-12 8-27','มีงบ พื้นที่ เครื่องมือ และซอฟต์แวร์สนับสนุนโครงงานพอไหม','A'],
/* 2-6 closing clarification */
['s26',1,'','ข้อเท็จจริงที่คณะสรุปมีส่วนใดคลาดเคลื่อนไหม','M'],
['s26',1,'','มีหลักฐานเพิ่มเติมสำหรับประเด็นที่ยังค้างไหม เช่น รายงานการประชุมหรือเอกสารที่ยังไม่ได้ส่ง','M'],
['s26',0,'','มีการเปลี่ยนแปลงหรือหลักฐานใหม่อะไรหลังส่ง SER ที่ยังไม่ได้แจ้งคณะ','A'],
['s26',0,'4-19','การนำแนวทาง TABEE มาใช้บริหารหลักสูตรเป็นอย่างไร ได้ประสบการณ์อะไร','M'],
['s26',0,'4-20','หลักสูตรมีแผนแก้ไขประเด็นที่พบแล้วอย่างไร กำหนดเสร็จเมื่อไร','P']];
const IQ=(()=>{const n={};return IQ_RAW.map(r=>{n[r[0]]=(n[r[0]]||0)+1;return{id:r[0]+'_'+n[r[0]],s:r[0],must:!!r[1],it:r[2]?r[2].split(' ').map(x=>'c'+x):[],q:r[3],src:r[4]}})})();
const IQ_SRC={M:['Module 16','Module 16'],A:['ABET E610','ABET E610'],P:['เพิ่มเติม','Added'],U:['PEV เพิ่มเอง','Added by PEV']};
DEF.iq=()=>({sel:{},auto:{},ans:{},custom:[],base:'pv2',at:0,sig:''});
const iqP=()=>{const p=P('iq');['sel','auto','ans'].forEach(k=>{if(!p[k])p[k]={}});if(!p.custom)p.custom=[];if(!p.base)p.base='pv2';return p};
const iqAllOf=s=>IQ.filter(q=>q.s===s).concat(iqP().custom.filter(q=>q.s===s).map(q=>({...q,must:false,it:[],src:'U',user:true})));
const iqItem=id=>ALL.find(x=>x.it.id===id);
const iqItemLbl=x=>t('เกณฑ์ ','C')+x.c+(x.it.code?t(' ข้อ ',' item ')+x.it.code:'');
/* issues known at the chosen round (Pre-visit 2 by default) */
function iqIssues(base){const o={};ALL.forEach(x=>{const f=finalR(x.c,x.it.id,base||iqP().base);if(f.r&&f.r!=='S'&&RT[f.r].sev>0)o[x.it.id]={x,r:f.r,sev:RT[f.r].sev,n:f.n}});return o}
const iqSig=iss=>Object.keys(iss).sort().map(k=>k+iss[k].r).join(',');
/* groups the PEV named in the per-item "interview" action */
function iqActGroups(){const o={};actList('int').forEach(a=>{(o[a.x.it.id]=o[a.x.it.id]||new Set());(a.a.groups||[]).forEach(g=>o[a.x.it.id].add(g))});return o}
/* selection algorithm: must questions always; then, per session, the questions linked to open issues,
   chosen greedily so that each pick covers the most serious issue not yet covered, within the session's time budget;
   W and D issues are asked in at least two sessions when the bank allows (triangulation). */
function iqCompute(base){const iss=iqIssues(base),ag=iqActGroups(),auto={},cover={};
  const score=(q,ses,done)=>{let s=0;q.it.forEach(id=>{const i=iss[id];if(!i)return;s+=(done.has(id)?1:10)*i.sev;if(!done.has(id)&&ag[id]&&ses.groups.some(g=>ag[id].has(g)))s+=25});return s};
  IQ_SES.forEach(ses=>{const qs=IQ.filter(q=>q.s===ses.k),done=new Set();let left=Math.max(0,ses.cap-qs.filter(q=>q.must).length);
    qs.filter(q=>q.must).forEach(q=>q.it.forEach(id=>{if(iss[id]){done.add(id);(auto[q.id]=auto[q.id]||{why:[]}).why.push(id)}}));
    const pool=qs.filter(q=>!q.must&&q.it.some(id=>iss[id]));
    while(left>0&&pool.length){pool.sort((a,b)=>score(b,ses,done)-score(a,ses,done));const q=pool[0];if(!q.it.some(id=>iss[id]&&!done.has(id)))break;
      pool.shift();auto[q.id]={on:1,why:q.it.filter(id=>iss[id])};q.it.forEach(id=>{if(iss[id])done.add(id)});left--}
    done.forEach(id=>{(cover[id]=cover[id]||new Set()).add(ses.k)})});
  Object.values(iss).filter(i=>i.sev>=3).forEach(i=>{const id=i.x.it.id;const have=cover[id]||new Set();if(have.size>=2)return;
    const cand=IQ.filter(q=>!q.must&&!(auto[q.id]&&auto[q.id].on)&&q.it.includes(id)&&!have.has(q.s)).sort((a,b)=>a.it.indexOf(id)-b.it.indexOf(id));
    for(const q of cand){if(have.size>=2)break;if(have.has(q.s))continue;auto[q.id]={on:1,tri:1,why:q.it.filter(x=>iss[x])};have.add(q.s)}
    if(have.size>=2)IQ.forEach(q=>{const a=auto[q.id];if(a&&a.why.includes(id))a.tri=1})});
  return{auto,sig:iqSig(iss),n:Object.keys(iss).length}}
const iqOn=q=>{const p=iqP(),s=p.sel[q.id];if(s===1||s===0)return!!s;if(q.user)return true;return q.must||!!(p.auto[q.id]&&p.auto[q.id].on)};
const iqWhy=q=>{const a=iqP().auto[q.id];return a?a.why||[]:[]};
function iqStat(ses){const l=iqAllOf(ses.k),on=l.filter(iqOn),p=iqP();return{n:l.length,on:on.length,ans:on.filter(q=>(p.ans[q.id]||'').trim()).length,must:l.filter(q=>q.must).length,over:on.length>ses.cap}}
const iqActRows=ses=>actList('int').filter(a=>(a.a.groups||[]).some(g=>ses.groups.includes(g)));
Object.assign(A,{
 iqAuto(){const p=iqP(),r=iqCompute(p.base);p.auto=r.auto;p.sig=r.sig;p.at=Date.now();Store.save('iq');log('เลือกคำถามสัมภาษณ์ตามประเด็น ('+r.n+' ประเด็น)');toast(t('เลือกคำถามตามประเด็นแล้ว ','Questions selected from ')+r.n+t(' ประเด็น · ตรวจและปรับได้ในแต่ละช่วง',' issues · review each session'));render(true)},
 iqT(d){const p=iqP(),q=IQ.find(x=>x.id===d.q)||p.custom.find(x=>x.id===d.q);if(!q)return;const cur=iqOn(q.it?q:{...q,user:true});p.sel[q.id]=cur?0:1;Store.save('iq');render(true)},
 iqReset(){const p=iqP();p.sel={};Store.save('iq');toast(t('คืนค่าตามที่ระบบแนะนำแล้ว','Back to the suggested selection'));render(true)},
 iqBase(d,el){const p=iqP();p.base=(el&&el.value)||d.v||'pv2';Store.save('iq');render(true)},
 iqOpen(d){S.iqOpen=S.iqOpen||{};S.iqOpen[d.s]=!S.iqOpen[d.s];render(true)},
 iqDay(d){S.iqDay=d.d;render(true)},iqShow(d){S.iqShow=d.m;render(true)},
 qtab(d){S.qtab=d.m;render()},
 iqAdd(d){const el=document.getElementById('iqn_'+d.s),v=el&&el.value.trim();if(!v){toast(t('พิมพ์คำถามก่อน','Type a question first'));return}iqP().custom.push({id:'u'+uid(),s:d.s,q:v});Store.save('iq');render(true)},
 iqDel(d){const p=iqP();p.custom=p.custom.filter(q=>q.id!==d.q);delete p.sel[d.q];delete p.ans[d.q];Store.save('iq');render(true)},
 iqGo(d){S.qtab='ses';S.iqDay=d.d||'all';S.iqOpen=S.iqOpen||{};if(d.s)S.iqOpen[d.s]=true;A.go({v:'qs'})}});
document.addEventListener('change',e=>{if(e.target&&e.target.id==='iqBaseSel')A.iqBase({},e.target)});
function iqRow(q,ses){const p=iqP(),on=iqOn(q),why=iqWhy(q),iss=iqIssues(),a=p.auto[q.id]||{},lk=q.it.filter(id=>iss[id]),w=S.canWrite?'':' disabled';
  const tags=[q.must?`<span class="iqt must">${t('ควรถาม','Should ask')}</span>`:'',a.on?`<span class="iqt auto">${t('ระบบเลือกจากประเด็น','Selected from issues')}</span>`:(!q.must&&lk.length?`<span class="iqt rel">${t('เกี่ยวกับประเด็น','Related to an issue')}</span>`:''),a.tri?`<span class="iqt tri">${t('ถามซ้ำหลายกลุ่ม','Triangulate')}</span>`:'',p.sel[q.id]===1&&!q.must&&!a.on?`<span class="iqt pev">${t('PEV เพิ่ม','Added by PEV')}</span>`:'',p.sel[q.id]===0&&(q.must||a.on)?`<span class="iqt off">${t('PEV ตัดออก','Removed by PEV')}</span>`:'',
   `<span class="iqt src">${t(IQ_SRC[q.src][0],IQ_SRC[q.src][1])}</span>`].join('');
  const chips=(why.length?why:lk).map(id=>{const i=iss[id];return i?`<button class="iqi" data-a="openItem" data-v="${p.base==='d1'?'d1':'pv2'}" data-c="${i.x.c}" data-id="${id}" title="${esc((i.n||i.x.it.t).slice(0,240))}">${chipS(i.r)}${iqItemLbl(i.x)}</button>`:''}).join('');
  return`<div class="iqr ${on?'on':''}"><button class="iqc" role="checkbox" aria-checked="${on}" aria-label="${esc(q.q)}" data-a="iqT" data-q="${q.id}"${w}>${on?'✓':''}</button>
   <div class="col" style="gap:5px;min-width:0"><span class="iqq">${esc(q.q)}</span><span class="iqm">${tags}${chips}${q.user?`<button class="btn sm ghost" data-a="iqDel" data-q="${q.id}"${w}>${t('ลบ','Delete')}</button>`:''}</span>
   ${on?`<textarea id="iqa_${q.id}" rows="1" data-b="iq:ans.${q.id}" placeholder="${t('บันทึกคำตอบ / ข้อเท็จจริงที่พบ','Answer / facts found')}"${w}>${esc(p.ans[q.id]||'')}</textarea>`:''}</div></div>`}
function iqCard(ses){const st=iqStat(ses),open=!!(S.iqOpen||{})[ses.k],show=S.iqShow||'all',acts=iqActRows(ses);let l=iqAllOf(ses.k);
  l=l.slice().sort((a,b)=>(b.must-a.must)||((iqOn(b)?1:0)-(iqOn(a)?1:0)));if(show==='on')l=l.filter(iqOn);
  const actsH=acts.map(a=>`<div class="iqr on fix"><span class="iqc fixc">✓</span><div class="col" style="gap:5px;min-width:0"><span class="iqq">${esc(a.a.q||t('(ยังไม่ได้เขียนคำถาม)','(no question written)'))}</span><span class="iqm"><span class="iqt pev">${t('คำถามรายข้อของ PEV','PEV item question')}</span><button class="iqi" data-a="openItem" data-v="${a.st}" data-c="${a.x.c}" data-id="${a.x.it.id}">${chipS(a.r)}${iqItemLbl(a.x)}</button></span>
      <textarea id="iqx_${a.x.it.id}_${a.st}" rows="1" data-b="${bp(a.x.c,a.x.it.id,a.st,'int.ans')}" placeholder="${t('บันทึกคำตอบ / ข้อเท็จจริงที่พบ','Answer / facts found')}">${esc(a.a.ans||'')}</textarea></div></div>`).join('');
  return`<section class="card col iqs" id="iq_${ses.k}"><button class="iqh" data-a="iqOpen" data-s="${ses.k}" aria-expanded="${open}"><span class="mono tiny muted">${t('วันที่ ','Day ')}${ses.day} · ${ses.code} · ${ses.time}</span><b>${t(ses.th,ses.en)}</b><span class="small muted">${esc(ses.who)}</span>
    <span class="row" style="gap:6px;flex-wrap:wrap"><span class="tlp ${st.over?'late':'ok'}"><i></i>${t('เลือก ','Selected ')}${st.on}${t(' ข้อ',' ')} · ${t('แนะนำไม่เกิน ','suggested max ')}${ses.cap}</span>${acts.length?`<span class="tlp now"><i></i>${t('คำถามรายข้อของ PEV ','PEV item questions ')}${acts.length}</span>`:''}${st.ans?`<span class="tlp"><i></i>${t('บันทึกคำตอบ ','Answered ')}${st.ans}/${st.on}</span>`:''}<span class="mono tiny muted">${open?'▲':'▼'}</span></span></button>
   ${open?`${st.over?`<div class="note">${t('เลือกไว้มากกว่าที่เวลาของช่วงนี้รับได้ ตัดข้อที่ไม่ตรงประเด็นออก หรือย้ายไปถามกลุ่มอื่น','More questions than this session has time for; drop or move some.')}</div>`:''}
    ${l.filter(q=>q.must).map(q=>iqRow(q,ses)).join('')}${actsH}${l.filter(q=>!q.must).map(q=>iqRow(q,ses)).join('')}${l.length||acts.length?'':`<span class="small muted">${t('ไม่มีคำถามที่เลือกในช่วงนี้','No selected question in this session')}</span>`}
    <div class="row" style="gap:8px"><input type="text" id="iqn_${ses.k}" placeholder="${t('เพิ่มคำถามของ PEV สำหรับช่วงนี้','Add your own question for this session')}" style="flex:1 1 260px"><button class="btn sm" data-a="iqAdd" data-s="${ses.k}" ${S.canWrite?'':'disabled'}>+ ${t('เพิ่ม','Add')}</button></div>`:''}</section>`}
function iqView(){const p=iqP(),iss=iqIssues(),n=Object.keys(iss).length,day=S.iqDay||'all',stale=p.at&&p.sig!==iqSig(iss),ov=Object.keys(p.sel).length;
  const tot=IQ_SES.reduce((a,s)=>{const x=iqStat(s);a.on+=x.on;a.ans+=x.ans;return a},{on:0,ans:0});
  const sev={D:0,W:0,C:0,R:0};Object.values(iss).forEach(i=>sev[i.r]++);
  return`<div class="card col"><h1>${t('แนวคำถามสัมภาษณ์รายช่วงของวันตรวจเยี่ยม','Interview questions by visit session')}</h1>
   <p class="muted small" style="margin:0;max-width:86ch">${t('คำถามที่ติดป้าย "ควรถาม" เป็นคำถามพื้นฐานเพื่อยืนยันสิ่งที่เขียนใน SER ระบบติ๊กให้ไว้ก่อน จากนั้นกด "เลือกคำถามตามประเด็น" ระบบจะติ๊กคำถามที่เชื่อมกับข้อที่มีประเด็นให้ในช่วงที่เหมาะ PEV ตรวจอีกครั้งแล้วติ๊กเข้าหรือออกได้ทุกข้อ และใช้ช่องใต้คำถามบันทึกคำตอบระหว่างสัมภาษณ์','"Should ask" questions confirm what the SER says and are ticked by default. "Select from issues" ticks the questions linked to items with findings. Review and adjust every tick; record answers under each question.')}</p>
   <div class="row" style="gap:8px;flex-wrap:wrap;align-items:center"><button class="btn pri" data-a="iqAuto" ${S.canWrite?'':'disabled'}>${t('เลือกคำถามตามประเด็น','Select questions from issues')}</button>
    <label class="row small" style="gap:6px;align-items:center">${t('ใช้ประเด็นจาก','Issues from')}<select id="iqBaseSel" style="width:auto"><option value="pv2" ${p.base==='pv2'?'selected':''}>${t('ผลถึง Pre-visit 2 (ก่อนตรวจเยี่ยม)','Up to Pre-visit 2')}</option><option value="d1" ${p.base==='d1'?'selected':''}>${t('ผลถึง Visit Day 1 (เตรียมวันที่ 2)','Up to Visit Day 1')}</option></select></label>
    ${ov?`<button class="btn" data-a="iqReset" ${S.canWrite?'':'disabled'}>${t('คืนค่าตามที่ระบบแนะนำ','Reset to suggested')} (${ov})</button>`:''}</div>
   <div class="row small" style="gap:8px;flex-wrap:wrap"><span>${t('ข้อที่มีประเด็น ','Items with issues: ')}<b>${n}</b></span>${['D','W','C','R'].filter(r=>sev[r]).map(r=>`<span>${chipS(r)} ${sev[r]}</span>`).join('')}<span class="muted">·</span><span>${t('คำถามที่เลือก ','Selected: ')}<b>${tot.on}</b>${t(' จาก ',' of ')}${IQ.length+p.custom.length}</span><span class="muted">·</span><span>${t('บันทึกคำตอบแล้ว ','Answered: ')}<b>${tot.ans}</b></span>${p.at?`<span class="muted">· ${t('เลือกตามประเด็นล่าสุด ','last selected ')}${fmtDT(p.at)}</span>`:''}</div>
   ${!p.at?`<div class="note info">${t('ตอนนี้ติ๊กไว้เฉพาะคำถาม "ควรถาม" ยังไม่ได้เลือกคำถามตามประเด็น','Only the "should ask" questions are ticked so far.')}</div>`:stale?`<div class="note">${t('ผลการประเมินเปลี่ยนไปหลังเลือกคำถามครั้งล่าสุด กด "เลือกคำถามตามประเด็น" อีกครั้งเพื่อปรับ ข้อที่ PEV ติ๊กเข้าหรือออกเองจะคงไว้','Ratings changed since the last selection. Select again; your own ticks are kept.')}</div>`:''}
   <div class="row" style="gap:6px;flex-wrap:wrap">${[['all',t('ทั้ง 2 วัน','Both days')],['1',t('วันที่ 1','Day 1')],['2',t('วันที่ 2','Day 2')]].map(x=>`<button class="btn sm ${day===x[0]?'pri':''}" data-a="iqDay" data-d="${x[0]}">${x[1]}</button>`).join('')}<span class="sp"></span>${[['all',t('แสดงทุกคำถาม','All questions')],['on',t('เฉพาะที่เลือก','Selected only')]].map(x=>`<button class="btn sm ${(S.iqShow||'all')===x[0]?'pri':''}" data-a="iqShow" data-m="${x[0]}">${x[1]}</button>`).join('')}</div></div>
  ${IQ_SES.filter(s=>day==='all'||s.day===day).map(iqCard).join('')}${docPane('iq')}`}
/* step 7 gets two tabs: questions by session (new) and the per-item list (existing) */
const vQs8=VIEWS.qs;VIEWS.qs=function(){const m=S.qtab||'ses';
  const tabs=`<div class="row iqtabs" role="tablist"><button class="btn ${m==='ses'?'pri':''}" role="tab" aria-selected="${m==='ses'}" data-a="qtab" data-m="ses">${t('แนวคำถามรายช่วงสัมภาษณ์','Questions by session')}</button><button class="btn ${m==='iss'?'pri':''}" role="tab" aria-selected="${m==='iss'}" data-a="qtab" data-m="iss">${t('ประเด็นรายข้อและคำถามเพิ่มเติม','Per-item issues and extra questions')}</button></div>`;
  return m==='ses'?tabs+(typeof tlStrip==='function'?tlStrip('qs'):'')+iqView():tabs+vQs8()};
/* visit days: a strip pointing at the day's question guide */
['d1','d2'].forEach(v=>{const f=VIEWS[v];if(!f)return;VIEWS[v]=function(){const day=v==='d1'?'1':'2',ss=IQ_SES.filter(s=>s.day===day),a=ss.reduce((o,s)=>{const x=iqStat(s);o.on+=x.on;o.ans+=x.ans;return o},{on:0,ans:0});
  return`<section class="card row iqstrip" style="justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap"><span><b>${t('แนวคำถามสัมภาษณ์วันที่ ','Interview questions, day ')}${day}</b> <span class="small muted">${ss.length}${t(' ช่วง · เลือกไว้ ',' sessions · selected ')}${a.on}${t(' ข้อ · บันทึกคำตอบแล้ว ',' · answered ')}${a.ans}</span></span><button class="btn sm" data-a="iqGo" data-d="${day}">${t('เปิดแนวคำถามและบันทึกคำตอบ','Open questions and record answers')} →</button></section>`+f.apply(this,arguments)}});
/* Word document */
DOCS.iq=function(){const p=iqP(),iss=iqIssues(),b=[bH('แนวคำถามสัมภาษณ์รายช่วงของวันตรวจเยี่ยม'),bP(progTitle()+' '+(S.meta.inst||'')+(S.meta.visit?'\nวันตรวจเยี่ยม '+S.meta.visit:'')),bP('คำถามที่ระบุ "ควรถาม" เป็นคำถามพื้นฐานเพื่อยืนยันข้อมูลใน SER คำถามที่ระบุข้อของเกณฑ์เป็นคำถามที่เลือกตามประเด็นจากการตรวจเอกสาร')];
  IQ_SES.forEach(ses=>{const rows=[['ที่','คำถาม','ประเภท / ประเด็นที่เชื่อม','บันทึกคำตอบ / ข้อเท็จจริงที่พบ']];let i=0;
    iqActRows(ses).forEach(a=>rows.push([String(++i),a.a.q||'','คำถามรายข้อของ PEV\nเกณฑ์ '+a.x.c+(a.x.it.code?' ข้อ '+a.x.it.code:'')+(a.r?' ['+a.r+']':''),a.a.ans||'']));
    iqAllOf(ses.k).filter(iqOn).sort((a,b)=>b.must-a.must).forEach(q=>{const why=iqWhy(q).map(id=>{const x=iss[id];return x?'เกณฑ์ '+x.x.c+(x.x.it.code?' ข้อ '+x.x.it.code:'')+' ['+x.r+']':''}).filter(Boolean);
      rows.push([String(++i),q.q,[q.must?'ควรถาม':'',q.user?'PEV เพิ่มเอง':'',why.join(', ')].filter(Boolean).join('\n'),p.ans[q.id]||''])});
    if(rows.length>1)b.push(bH2('วันที่ '+ses.day+' · '+ses.time+' · '+ses.th),bP('ผู้ให้สัมภาษณ์: '+ses.who),bT(rows,[400,2500,1300,1800],true))});
  return{file:'แนวคำถามสัมภาษณ์รายช่วง',blocks:b}};
GENG[1][2].push(['iq','w','DOCX','แนวคำถามสัมภาษณ์รายช่วงของวันตรวจเยี่ยม']);
const genStatus8=genStatus;genStatus=function(k){if(k==='iq'){const p=iqP(),a=IQ_SES.reduce((o,s)=>{const x=iqStat(s);o.on+=x.on;o.ans+=x.ans;return o},{on:0,ans:0});return[p.at?'ok':'part',a.on+t(' คำถาม',' questions')+(p.at?'':t(' · ยังไม่ได้เลือกตามประเด็น',' · not yet selected from issues'))+(a.ans?' · '+t('ตอบแล้ว ','answered ')+a.ans:'')]}return genStatus8(k)};

/* ---------- rev.9: program documents as online links (Google Drive, OneDrive, SharePoint, ...) ----------
   A link is kept as a document record with `url`. The page never fetches it (no outbound connection);
   the evaluator opens it in a new tab, and can attach the downloaded file to the same row so Auto Check can read it. */
function lkHost(u){try{const h=new URL(u).hostname.replace(/^www\./,'');if(/(^|\.)google\.com$/.test(h))return'Google Drive';if(/sharepoint\.com$/.test(h))return'SharePoint';if(/onedrive\.live\.com$|1drv\.ms$|onedrive\.com$/.test(h))return'OneDrive';if(/dropbox\.com$/.test(h))return'Dropbox';if(/box\.com$/.test(h))return'Box';return h}catch(e){return''}}
function lkValid(u){try{const x=new URL(u);return x.protocol==='https:'||x.protocol==='http:'}catch(e){return false}}
function lkKind(n){return/ser|ประเมินตนเอง/i.test(n)?'SER':/transcript|ระเบียน/i.test(n)?'ใบระเบียนผลการศึกษา':'เอกสารแนบ'}
function lkForm(kinds){const w=S.canWrite?'':' disabled';
  return`<div class="card col lkf"><h2 style="margin:0">${t('เพิ่มเอกสารเป็นลิงก์ออนไลน์','Add documents as online links')}</h2>
   <p class="small muted" style="margin:0;max-width:80ch">${t('วางลิงก์ Google Drive, OneDrive, SharePoint หรือลิงก์อื่นที่หลักสูตรส่งมา บรรทัดละ 1 ลิงก์ พิมพ์ชื่อเอกสารไว้หน้าลิงก์ได้ เช่น "SER วิศวกรรมเคมี https://drive.google.com/..." ลิงก์โฟลเดอร์ก็ใส่ได้','Paste Google Drive, OneDrive, SharePoint or other links, one per line. A document name may precede the link. Folder links are fine.')}</p>
   <textarea id="lkIn" rows="3" placeholder="${t('ชื่อเอกสาร (ถ้ามี) ตามด้วยลิงก์ https://...','Document name (optional) then https://...')}"${w}></textarea>
   <div class="row" style="gap:8px;flex-wrap:wrap;align-items:center"><label class="row small" style="gap:6px;align-items:center">${t('ประเภท','Type')}<select id="lkKind" style="width:auto"><option value="">${t('เลือกจากชื่อเอกสาร','From the name')}</option>${kinds.map(k=>`<option>${k}</option>`).join('')}</select></label><button class="btn pri" data-a="lkAdd"${w}>+ ${t('เพิ่มลิงก์','Add links')}</button></div>
   <div class="note info">${t('ระบบเก็บลิงก์ไว้ให้เปิดดูและอ้างอิงในรายงาน แต่ไม่ดึงเนื้อหาจากลิงก์ เพราะหน้านี้ไม่เชื่อมต่อออกภายนอกเพื่อรักษาความลับของหลักสูตร ถ้าต้องการให้ Auto Check อ่านเอกสารนั้น ให้ดาวน์โหลดไฟล์จากลิงก์ แล้วกด "แนบไฟล์" ในแถวของลิงก์','Links are kept for opening and for the report, but the page does not read their content: it makes no outbound connection, to keep program data confidential. For Auto Check to read a document, download it and use "Attach file" on its row.')}</div>
   <input type="file" id="lkFile" hidden accept=".pdf,.docx,.xlsx,.xls,.csv,.pptx,.md,.txt,.html,.json"></div>`}
function lkCell(f){return f.url&&lkValid(f.url)?`<div class="lkc"><a class="lka" href="${esc(f.url)}" target="_blank" rel="noopener noreferrer">${t('เปิดลิงก์','Open link')} ↗</a><span class="tiny muted">${esc(lkHost(f.url))}</span></div>`:''}
function lkText(f,i){return`<span class="small muted">${t('ลิงก์ · ยังไม่มีข้อความ','Link · no text yet')}</span><div><button class="btn sm" data-a="lkAttach" data-i="${i}" ${S.canWrite?'':'disabled'}>${t('แนบไฟล์','Attach file')}</button></div>`}
const lkPending=()=>(P('files').list||[]).filter(f=>f.url&&!f.chars);
Object.assign(A,{
 lkAdd(){const el=document.getElementById('lkIn'),ks=document.getElementById('lkKind'),raw=(el&&el.value||'').split(/\n+/).map(x=>x.trim()).filter(Boolean);
  if(!raw.length){toast(t('วางลิงก์ก่อน','Paste a link first'));return}
  const l=P('files').list,have=new Set(l.filter(f=>f.url).map(f=>f.url));let n=0,bad=0,dup=0;
  raw.forEach(line=>{const m=line.match(/https?:\/\/\S+/i);if(!m||!lkValid(m[0])){bad++;return}const url=m[0].replace(/[)\]>,;]+$/,'');if(have.has(url)){dup++;return}
    let name=line.replace(m[0],'').replace(/^[\s\-–—:|·•\d.)]+|[\s\-–—:|·]+$/g,'').trim();if(!name)name=t('เอกสารจาก ','Document on ')+lkHost(url)+' '+(l.filter(f=>f.url).length+1);
    l.push({id:uid(),name,url,size:0,chars:0,chunks:0,at:Date.now(),by:whoName(S.who),kind:(ks&&ks.value)||lkKind(name)});have.add(url);n++});
  if(n){Store.save('files');log('เพิ่มเอกสารแบบลิงก์ '+n+' รายการ')}
  toast((n?t('เพิ่มลิงก์ ','Added ')+n+t(' รายการ',' link(s)'):t('ไม่ได้เพิ่มลิงก์','No link added'))+(dup?' · '+t('ซ้ำ ','duplicate ')+dup:'')+(bad?' · '+t('ไม่ใช่ลิงก์ http/https ','not an http/https link ')+bad:''));
  if(n&&el)el.value='';render(true);if(bad&&el){const e2=document.getElementById('lkIn');if(e2)e2.value=raw.filter(x=>{const m=x.match(/https?:\/\/\S+/i);return!m||!lkValid(m[0])}).join('\n')}},
 lkAttach(d){S.lkTarget=(P('files').list[+d.i]||{}).id;const el=document.getElementById('lkFile');if(el){el.value='';el.click()}}});
document.addEventListener('change',async e=>{const el=e.target;if(!el||el.id!=='lkFile'||!el.files.length)return;const file=el.files[0],f=P('files').list.find(x=>x.id===S.lkTarget);if(!f||!S.canWrite)return;
  S.busy=t('กำลังอ่าน ','Reading ')+file.name+'…';render(true);
  try{const tx=(await extractText(file)).replace(/\u0000/g,'');const chunks=await Store.putText(f.id,tx);const ext=file.name.split('.').pop().toLowerCase();
    Object.assign(f,{chars:tx.length,chunks,size:file.size,file:file.name});if(S.texts)S.texts[f.id]=tx;if(typeof DOCCACHE!=='undefined')delete DOCCACHE[f.id];
    const w=ext==='pdf'&&tx.replace(/\s|\[หน้า \d+\]/g,'').length<200?t('อ่านข้อความแทบไม่ได้ อาจเป็นไฟล์สแกน','Almost no text read; this may be a scanned file'):(chunks?'':t('เก็บข้อความไว้ในระบบไม่สำเร็จ ใช้ได้เฉพาะรอบนี้','Text could not be stored; available this session only'));
    if(w)f.warn=w;else delete f.warn;Store.save('files');log('แนบไฟล์ให้ลิงก์ '+f.name)}catch(err){toast(file.name+': '+(err.message||err))}
  S.busy='';S.lkTarget='';render(true)});
/* Auto Check: say plainly when some documents are links it could not read */
const vAi9=VIEWS.ai;VIEWS.ai=function(){const n=lkPending().length;return(n?`<div class="note lkn">${t('มีเอกสารแบบลิงก์ ','There are ')}${n}${t(' รายการที่ยังไม่ได้แนบไฟล์ Auto Check ไม่ได้อ่านเอกสารเหล่านี้ ผลจึงอาจแสดงว่าไม่พบหลักฐานทั้งที่หลักฐานอยู่ในลิงก์',' link document(s) with no file attached. Auto Check did not read them, so evidence inside them may show as not found.')} <button class="btn sm" data-a="go" data-v="files">${t('ไปแนบไฟล์','Attach files')}</button></div>`:'')+vAi9.apply(this,arguments)};

(async function boot(){document.documentElement.lang=LANG;render();const to=setTimeout(()=>{if(S.programs===null){S.programs=[];render()}},10000);
  await Store.init();try{S.programs=await Store.list()}catch(e){S.programs=[]}clearTimeout(to);
  let last=null;try{last=localStorage.getItem('pev.last')}catch(e){}
  if(last&&S.programs.some(p=>p.id===last)){try{await Store.open(last);const v=location.hash.slice(1);if(VIEWS[v])S.view=v}catch(e){S.pid=null}}
  render()})();

