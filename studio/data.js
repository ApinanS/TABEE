/* TABEE Studio · ค่าคงที่และข้อมูลตัวอย่าง (สมมติทั้งหมด ใช้เพื่อสาธิตหน้าจอเท่านั้น) */
const CRIT=[null,'นิสิตนักศึกษา','วัตถุประสงค์หลักสูตร','ผลลัพธ์การศึกษา','การพัฒนาต่อเนื่อง','รายละเอียดหลักสูตร','คณาจารย์','สิ่งอำนวยความสะดวก','การสนับสนุนของสถาบันการศึกษา'];
const LV={N:'ไม่มีประเด็น',R:'Remark',C:'Concern',W:'Weakness',D:'Deficiency'};
const LVO=['N','R','C','W','D'];
const TRACK={
  EAC:{name:'EAC',full:'หลักสูตรวิศวกรรมศาสตร์',accord:'Washington Accord',cls:'eac',studio:'pevstudio/',training:'pev-training/',
    note:'หลักสูตรปริญญาตรีวิศวกรรมศาสตร์ 4 ปี ประเมินตามเกณฑ์ TABEE EAC'},
  ETC:{name:'ETC',full:'หลักสูตรเทคโนโลยีวิศวกรรม',accord:'Sydney Accord',cls:'etc',studio:'pevstudio-etc/',training:'pev-training-etc/',
    note:'หลักสูตรปริญญาตรีเทคโนโลยีวิศวกรรม ประเมินตามเกณฑ์ TABEE ETAC'}
};
const FIELDS={ME:'เครื่องกล',CE:'โยธา',EE:'ไฟฟ้า',ChE:'เคมี',IE:'อุตสาหการ',ENV:'สิ่งแวดล้อม',MT:'วัสดุ',CPE:'คอมพิวเตอร์',MCT:'เมคคาทรอนิกส์'};
const REQTYPE={first:'รับรองครั้งแรก',renew:'ต่ออายุเมื่อครบวงรอบ',prov:'รับรองชั่วคราว (หลักสูตรใหม่)',follow:'ตรวจติดตามตามเงื่อนไข'};
const FORMAT={normal:'ปกติ',inter:'นานาชาติ',joint:'ร่วมสถาบัน'};
const KINDS=[
  {k:'SER',th:'รายงานประเมินตนเอง (SER)',req:true,hint:'ไฟล์ Word หรือ PDF ที่มีหัวข้อ "เกณฑ์ข้อ 1" ถึง "เกณฑ์ข้อ 8"'},
  {k:'ภาคผนวก',th:'ภาคผนวกและเอกสารแนบของ SER',hint:'ตาราง PO–รายวิชา ผลประเมิน PO รายงานการประชุม ฯลฯ'},
  {k:'เล่มหลักสูตร',th:'เล่มหลักสูตร (มคอ.2)'},
  {k:'ใบระเบียนผลการศึกษา',th:'ตัวอย่างใบระเบียนผลการศึกษา (Transcript)'},
  {k:'ประมวลรายวิชา',th:'ประมวลรายวิชา (Course syllabi)'},
  {k:'ประวัติคณาจารย์',th:'ประวัติคณาจารย์ (CV)'},
  {k:'อื่น ๆ',th:'เอกสารอื่น'}
];
const ELIG={
  EAC:['เป็นหลักสูตรปริญญาตรีวิศวกรรมศาสตร์ 4 ปี','สภามหาวิทยาลัยอนุมัติหลักสูตรแล้ว','มีผู้สำเร็จการศึกษาแล้วอย่างน้อย 1 รุ่น (ยกเว้นคำขอรับรองชั่วคราว)','ผู้บริหารสถาบันเห็นชอบการยื่นคำขอ'],
  ETC:['เป็นหลักสูตรปริญญาตรีเทคโนโลยีวิศวกรรม','สภามหาวิทยาลัยอนุมัติหลักสูตรแล้ว','มีผู้สำเร็จการศึกษาแล้วอย่างน้อย 1 รุ่น (ยกเว้นคำขอรับรองชั่วคราว)','ผู้บริหารสถาบันเห็นชอบการยื่นคำขอ']
};
/* 26 ขั้นตามเอกสารออกแบบ TABEE AMS หัวข้อ 7 · o = ผู้ดำเนินการ · sec = ส่วนของ TABEE Studio ที่ทำขั้นนี้ */
const STEPS=[null,
 {t:'สถาบันยื่นคำขอรับรอง TABEE',o:'สถาบัน',sec:'program'},
 {t:'กรอกข้อมูลและแนบ SER + Web Form 4 ฉบับ',o:'สถาบัน',sec:'program'},
 {t:'ออก Invoice ค่าคำขอ',o:'เจ้าหน้าที่'},
 {t:'สถาบันชำระค่าคำขอ',o:'สถาบัน'},
 {t:'เจ้าหน้าที่ตรวจสอบเอกสารคำขอ',o:'เจ้าหน้าที่'},
 {t:'สถาบันยื่นเอกสารเพิ่มเติม (รอบตรวจเอกสาร)',o:'สถาบัน',opt:1},
 {t:'เจ้าหน้าที่แต่งตั้งคณะกลั่นกรอง',o:'เจ้าหน้าที่'},
 {t:'คณะกลั่นกรองพิจารณาและลงผลคำขอ',o:'คณะกลั่นกรอง',sec:'screen'},
 {t:'สถาบันยื่นเอกสารเพิ่มเติม (รอบกลั่นกรอง)',o:'สถาบัน',opt:1,sec:'program'},
 {t:'เจ้าหน้าที่ลงผลอนุกรรมการ TABEE ออกหนังสือตอบรับ',o:'เจ้าหน้าที่'},
 {t:'เจ้าหน้าที่แต่งตั้งคณะผู้ตรวจประเมิน (PEV)',o:'เจ้าหน้าที่',sec:'team'},
 {t:'คณะ PEV ลงผลก่อนตรวจเยี่ยม',o:'PEV, หัวหน้าคณะ',sec:'pevstudio'},
 {t:'สถาบันยื่นเอกสารเพิ่มเติม (รอบ PEV)',o:'สถาบัน',opt:1},
 {t:'เจ้าหน้าที่ทำนัดตรวจเยี่ยมสถาบัน',o:'เจ้าหน้าที่'},
 {t:'ออก Invoice ค่าตรวจเยี่ยม',o:'เจ้าหน้าที่'},
 {t:'สถาบันชำระค่าตรวจเยี่ยม',o:'สถาบัน'},
 {t:'ประเมินการเลื่อนนัดตรวจเยี่ยม',o:'หัวหน้าคณะ, เจ้าหน้าที่'},
 {t:'ผู้ตรวจประเมินลงผลประเมินขั้นสุดท้าย',o:'PEV, หัวหน้าคณะ',sec:'pevstudio'},
 {t:'เจ้าหน้าที่ตรวจครบถ้วน และส่งต่อกลั่นกรอง',o:'เจ้าหน้าที่'},
 {t:'ประธานคณะกลั่นกรองลงผลประเมินจาก PEV',o:'คณะกลั่นกรอง',sec:'review'},
 {t:'จัดทำใบรับรอง',o:'เจ้าหน้าที่'},
 {t:'เจ้าหน้าที่จัดทำรายงานผลเข้าอนุกรรมการ TABEE',o:'เจ้าหน้าที่',sec:'decision'},
 {t:'หัวหน้าฝ่ายต่างประเทศลงนามรับรองผล',o:'หัวหน้าฝ่ายต่างประเทศ'},
 {t:'เจ้าหน้าที่จัดทำรายงานเข้าที่ประชุมสภาวิศวกร',o:'เจ้าหน้าที่'},
 {t:'หัวหน้าสำนักงานสภาวิศวกรยืนยันผลการประชุมสภา',o:'หัวหน้าสำนักงานสภาวิศวกร'},
 {t:'เสร็จสิ้น สถาบันได้รับใบรับรอง TABEE',o:'ระบบ',sec:'registry'}
];
const STATUS={
  draft:{th:'ร่าง ยังไม่ยื่น',step:2,cls:''},
  submitted:{th:'รอกลั่นกรอง SER',step:8,cls:'warn'},
  more:{th:'รอเอกสารเพิ่มเติมจากหลักสูตร',step:9,cls:'warn'},
  rejected:{th:'ไม่รับคำขอ',step:8,cls:'bad'},
  accepted:{th:'รับคำขอแล้ว รอแต่งตั้งคณะผู้ตรวจ',step:11,cls:'ok'},
  visit:{th:'อยู่ระหว่างตรวจประเมิน',step:12,cls:'ink'},
  reported:{th:'รอตรวจทานผลประเมิน',step:20,cls:'warn'},
  reviewed:{th:'พร้อมเข้า Decision Meeting',step:22,cls:'ok'},
  decided:{th:'มีมติแล้ว',step:26,cls:'ok'}
};
const OUTCOME={
  full:{th:'รับรอง (Full accreditation)',y:6},
  cond:{th:'รับรองแบบมีเงื่อนไข',y:3},
  prov:{th:'รับรองชั่วคราว (หลักสูตรใหม่)',y:3},
  wait:{th:'รอผลการปรับปรุงแก้ไข',y:1},
  no:{th:'ไม่รับรอง หรือยกเลิกการรับรอง',y:0}
};
const ROLES=[
  {k:'all',th:'ดูทั้งระบบ (สาธิต)',secs:null},
  {k:'inst',th:'ผู้ประสานงานหลักสูตร',secs:['home','program','registry']},
  {k:'staff',th:'เจ้าหน้าที่ TABEE',secs:['home','workflow','program','screen','apply','team','review','decision','registry','log']},
  {k:'screen',th:'คณะทำงานกลั่นกรอง',secs:['home','workflow','screen','review','decision']},
  {k:'cand',th:'ผู้สมัคร PEV / PEV',secs:['home','training','apply','portfolio','pevstudio']},
  {k:'chair',th:'หัวหน้าคณะผู้ตรวจ',secs:['home','training','portfolio','pevstudio','decision']},
  {k:'sub',th:'อนุกรรมการ TABEE',secs:['home','workflow','review','decision','registry']}
];
const NAV=[
  {h:'ภาพรวม',items:[['home','หน้าหลัก'],['workflow','Workflow 26 ขั้น']]},
  {h:'1 หลักสูตร',items:[['program','แฟ้มหลักสูตรและการยื่น SER']]},
  {h:'2 กลั่นกรอง',items:[['screen','กลั่นกรอง SER · Auto Check']]},
  {h:'3 PEV',items:[['training','อบรม PEV'],['apply','ลงทะเบียน PEV'],['portfolio','แฟ้มสะสมผลงาน'],['team','เลือกคณะผู้ตรวจ']]},
  {h:'4 ตรวจประเมิน',items:[['pevstudio','PEV Studio']]},
  {h:'5 ตัดสินผล',items:[['review','ตรวจทานผลประเมิน'],['decision','Decision Meeting']]},
  {h:'หลังการรับรอง',items:[['registry','ทะเบียนหลักสูตรที่รับรอง'],['log','บันทึกการใช้งาน']]}
];
const GATES=['รับสมัคร','คัดเลือก','อบรมออนไลน์','Onsite / Mock-up visit','สังเกตการณ์','ขึ้นทะเบียน','คงสถานะ'];
const PEVLV={obs:'ผู้สังเกตการณ์',new:'PEV ใหม่',exp:'PEV มีประสบการณ์',chair:'หัวหน้าคณะผู้ตรวจ',senior:'ผู้ตรวจอาวุโส / วิทยากร'};
const REVIEWCHK=['ข้อสังเกตแต่ละข้ออ้างเกณฑ์ถูกข้อ','มีหลักฐานรองรับข้อสังเกตทุกข้อ','ระดับผล (D/W/C) สอดคล้องกับถ้อยคำ','ผลที่เสนอสอดคล้องกับตารางผลการรับรอง','ไม่มีถ้อยคำที่อาจนำไปสู่ COI หรือการอุทธรณ์'];
const SEEDVER=1;
function SEED(){
  const inst={u1:'มหาวิทยาลัยศรีนภาลัย',u2:'สถาบันเทคโนโลยีธาราวดี',u3:'มหาวิทยาลัยเทคโนโลยีวนาธาร',u4:'มหาวิทยาลัยกรุงรัตนคีรี'};
  const P=(id,o)=>Object.assign({id,campus:'วิทยาเขตหลัก',year:2565,format:'normal',reqType:'renew',elig:[1,1,1,1],files:[],contacts:{},students:{},cycle:2569},o);
  const programs=[
    P('p1',{inst:'u1',faculty:'คณะวิศวกรรมศาสตร์',nameTh:'วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมเครื่องกล',nameEn:'B.Eng. (Mechanical Engineering)',field:'ME',track:'EAC',status:'draft',elig:[1,1,0,0],
      contacts:{dean:'คณบดี (สมมติ)',coord:'ผู้ประสานงาน ME',email:'me@example.ac.th'},students:{intake:80,enrolled:302,grads:71}}),
    P('p2',{inst:'u1',faculty:'คณะวิศวกรรมศาสตร์',nameTh:'วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมวัสดุ',nameEn:'B.Eng. (Materials Engineering)',field:'MT',track:'EAC',status:'submitted',receipt:'TABEE-2569-EAC-002',submittedAt:'2026-11-18T09:20:00+07:00',
      files:[{id:'demo-mt-ser',name:'SER วิศวกรรมวัสดุ (เคสฝึกจาก PEV Studio).docx',kind:'SER',demo:'pevstudio/cases/mt/ser.docx'},{id:'demo-mt-supp',name:'เอกสารแนบ SER.docx',kind:'ภาคผนวก',demo:'pevstudio/cases/mt/supp.docx'},{id:'demo-mt-tr',name:'ตัวอย่างใบระเบียนผลการศึกษา.docx',kind:'ใบระเบียนผลการศึกษา',demo:'pevstudio/cases/mt/tr.docx'}]}),
    P('p3',{inst:'u3',faculty:'คณะเทคโนโลยีวิศวกรรม',nameTh:'เทคโนโลยีบัณฑิต สาขาวิชาเทคโนโลยีวิศวกรรมอุตสาหการ',nameEn:'B.Tech. (Industrial Engineering Technology)',field:'IE',track:'ETC',status:'accepted',receipt:'TABEE-2569-ETC-001',submittedAt:'2026-10-02T10:00:00+07:00',
      screen:{verdict:'accept',by:'ประธานคณะกลั่นกรอง',t:'2026-10-20T14:00:00+07:00'}}),
    P('p4',{inst:'u2',faculty:'คณะวิศวกรรมศาสตร์',nameTh:'วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมไฟฟ้า',nameEn:'B.Eng. (Electrical Engineering)',field:'EE',track:'EAC',status:'visit',receipt:'TABEE-2569-EAC-001',submittedAt:'2026-09-12T10:00:00+07:00',
      screen:{verdict:'accept'},team:{chair:'v03',m1:'v07',m2:'v11'}}),
    P('p5',{inst:'u2',faculty:'คณะวิศวกรรมศาสตร์',nameTh:'วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมเคมี',nameEn:'B.Eng. (Chemical Engineering)',field:'ChE',track:'EAC',status:'reported',receipt:'TABEE-2568-EAC-007',cycle:2568,
      screen:{verdict:'accept'},team:{chair:'v01',m1:'v05',m2:'v09'},
      result:{crit:{1:'N',2:'C',3:'W',4:'C',5:'N',6:'N',7:'R',8:'N'},proposed:'cond',
        notes:{2:'การทบทวน PEO ไม่ได้รับฟังผู้ใช้บัณฑิตครบทุกกลุ่ม',3:'ผลประเมิน PO มีข้อมูลเพียง 1 ปีการศึกษา และไม่ครอบคลุม PO 5 และ PO 7',4:'ยังไม่เห็นการนำผลประเมิน PO ไปใช้ปรับปรุงรายวิชา'}}}),
    P('p6',{inst:'u4',faculty:'คณะวิศวกรรมศาสตร์',nameTh:'วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมอุตสาหการ',nameEn:'B.Eng. (Industrial Engineering)',field:'IE',track:'EAC',status:'reported',receipt:'TABEE-2568-EAC-009',cycle:2568,
      screen:{verdict:'accept'},team:{chair:'v02',m1:'v06',m2:'v12'},
      result:{crit:{1:'N',2:'N',3:'W',4:'N',5:'C',6:'N',7:'N',8:'N'},proposed:'full',
        notes:{3:'ผลประเมิน PO มีข้อมูลเพียง 1 ปีการศึกษา',5:'Capstone project ยังไม่ครอบคลุมข้อจำกัดด้านมาตรฐานวิชาชีพ'}}}),
    P('p7',{inst:'u3',faculty:'คณะเทคโนโลยีวิศวกรรม',nameTh:'เทคโนโลยีบัณฑิต สาขาวิชาเทคโนโลยีวิศวกรรมไฟฟ้า',nameEn:'B.Tech. (Electrical Engineering Technology)',field:'EE',track:'ETC',status:'reviewed',receipt:'TABEE-2568-ETC-002',cycle:2568,
      screen:{verdict:'accept'},team:{chair:'v04',m1:'v08',m2:'v13'},
      result:{crit:{1:'N',2:'R',3:'C',4:'C',5:'N',6:'C',7:'N',8:'N'},proposed:'full',
        notes:{3:'ตัวชี้วัดของ PO บางข้อยังไม่ชัดเจน',4:'วงจรการปรับปรุงยังไม่ครบรอบ',6:'ภาระงานสอนของอาจารย์บางท่านสูงกว่าที่สถาบันกำหนด'}},
      review:{chk:[1,1,1,1,1],verdict:'agree',t:'2026-11-10T10:00:00+07:00'}}),
    P('p8',{inst:'u4',faculty:'คณะวิศวกรรมศาสตร์',nameTh:'วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมสิ่งแวดล้อม',nameEn:'B.Eng. (Environmental Engineering)',field:'ENV',track:'EAC',status:'decided',receipt:'TABEE-2567-EAC-004',cycle:2567,
      result:{crit:{1:'N',2:'N',3:'C',4:'N',5:'N',6:'N',7:'N',8:'N'},proposed:'full'},
      decision:{outcome:'full',from:2568,to:2573,t:'2025-03-14T10:00:00+07:00',mode:'เห็นชอบตามเสนอ'}})
  ];
  const V=(id,name,type,fields,tracks,level,visits,load,coi,o)=>Object.assign({id,name,type,fields,tracks,level,visits,load,coi,confirmed:1,refresher:1,avail:1},o||{});
  const pevs=[
    V('v01','รศ.ดร.กานต์ ธ.','acad',['ChE','ENV'],['EAC'],'chair',14,1,['u1']),
    V('v02','ศ.ดร.ขวัญ ว.','acad',['IE','ME'],['EAC','ETC'],'senior',22,1,['u2']),
    V('v03','รศ.ดร.คณิน ส.','acad',['EE','CPE'],['EAC'],'chair',11,1,['u4']),
    V('v04','ผศ.ดร.จารุ พ.','acad',['EE','MCT'],['EAC','ETC'],'chair',10,1,[]),
    V('v05','ดร.ชลิต อ.','prof',['ChE','MT'],['EAC'],'exp',5,1,[]),
    V('v06','คุณดนัย ร.','prof',['IE'],['EAC','ETC'],'exp',4,1,['u3']),
    V('v07','ผศ.ดร.ทิพา น.','acad',['EE'],['EAC'],'exp',6,1,[]),
    V('v08','คุณธนา ก.','prof',['EE','MCT'],['ETC'],'exp',3,1,[]),
    V('v09','ผศ.ดร.นภา ม.','acad',['ChE','MT'],['EAC'],'new',0,1,[]),
    V('v10','รศ.ดร.บดินทร์ ล.','acad',['CE','MT'],['EAC'],'chair',12,0,['u2']),
    V('v11','คุณปกรณ์ ศ.','prof',['EE','CE'],['EAC'],'exp',7,1,['u1']),
    V('v12','ผศ.ดร.พิมพ์ จ.','acad',['IE'],['EAC','ETC'],'new',1,1,[]),
    V('v13','ดร.ภูมิ ต.','prof',['EE','IE'],['ETC'],'new',0,1,[]),
    V('v14','รศ.ดร.มานะ ย.','acad',['MT','ENV'],['EAC'],'exp',8,0,[]),
    V('v15','คุณรัตนา ห.','prof',['MT'],['EAC'],'exp',3,0,['u1']),
    V('v16','ผศ.ดร.วิชัย บ.','acad',['MT','ME'],['EAC'],'new',0,0,[]),
    V('v17','รศ.ดร.ศิริ ด.','acad',['IE','ME'],['ETC'],'chair',10,0,[]),
    V('v18','คุณสุเมธ ค.','prof',['IE','MCT'],['ETC'],'exp',4,0,[],{confirmed:0}),
    V('v19','ผศ.ดร.อรุณ ป.','acad',['ME','MT'],['EAC','ETC'],'exp',5,0,[],{avail:0}),
    V('v20','ดร.เอก ฉ.','prof',['ME','MT'],['EAC'],'exp',3,0,[],{refresher:0})
  ];
  const apps=[
    {id:'a1',name:'ผศ.ดร.กมล ธ.',type:'acad',fields:['ME'],track:'EAC',degree:1,obe:1,assoc:0,status:'รอคัดเลือก',t:'2026-11-05T09:00:00+07:00',coi:['u1']},
    {id:'a2',name:'คุณจิรา ส.',type:'prof',fields:['CE','ENV'],track:'EAC',degree:1,obe:0,assoc:1,status:'รับเข้าอบรม',t:'2026-11-02T09:00:00+07:00',coi:[]},
    {id:'a3',name:'ดร.ณัฐ พ.',type:'acad',fields:['IE'],track:'ETC',degree:1,obe:1,assoc:0,status:'รอคัดเลือก',t:'2026-11-12T09:00:00+07:00',coi:['u3']}
  ];
  return {v:SEEDVER,role:'all',inst,programs,pevs,apps,
    me:{name:'',type:'acad',fields:[],track:'EAC',coi:[],gate:0,visits:[],avail:{from:'',to:''},confirm:{contact:0,coi:0,ethics:0,secret:0}},
    log:[{t:'2026-11-18T09:20:00+07:00',who:'ผู้ประสานงานหลักสูตร',msg:'ยื่นคำขอ TABEE-2569-EAC-002 (วิศวกรรมวัสดุ)'}],seq:{EAC:2,ETC:1}};
}
